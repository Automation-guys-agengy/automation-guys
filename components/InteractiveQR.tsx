'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { QrCode, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react'

interface InteractiveQRProps {
  gridSize?: number // 32x32 modules
  duration?: number // duration in ms (400-600ms)
  autoRevertDelay?: number // ms before auto-reverting to State A
}

export function InteractiveQR({
  gridSize = 32,
  duration = 500,
  autoRevertDelay = 8000,
}: InteractiveQRProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasReducedMotion, setHasReducedMotion] = useState(false)

  const imgARef = useRef<HTMLImageElement | null>(null)
  const imgBRef = useRef<HTMLImageElement | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const autoRevertTimerRef = useRef<NodeJS.Timeout | null>(null)
  const cellDelaysRef = useRef<number[][]>([])

  // Initialize random cell delays for the dissolve effect once
  useEffect(() => {
    const delays: number[][] = []
    for (let r = 0; r < gridSize; r++) {
      const row: number[] = []
      for (let c = 0; c < gridSize; c++) {
        row.push(Math.random() * 0.4)
      }
      delays.push(row)
    }
    cellDelaysRef.current = delays

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setHasReducedMotion(mediaQuery.matches)
    }
  }, [gridSize])

  // Load and cache images efficiently
  useEffect(() => {
    let isMounted = true
    let loadedCount = 0

    const imgA = new Image()
    const imgB = new Image()

    imgA.decoding = 'async'
    imgB.decoding = 'async'

    imgA.src = '/state-a-tree.png'
    imgB.src = '/state-b-code.png'

    const handleLoad = () => {
      loadedCount++
      if (loadedCount === 2 && isMounted) {
        imgARef.current = imgA
        imgBRef.current = imgB
        setIsLoaded(true)
      }
    }

    if (imgA.complete && imgB.complete) {
      imgARef.current = imgA
      imgBRef.current = imgB
      setIsLoaded(true)
    } else {
      imgA.onload = handleLoad
      imgB.onload = handleLoad
    }

    return () => {
      isMounted = false
      imgA.onload = null
      imgB.onload = null
    }
  }, [])

  // Render static state cleanly without any per-cell blending
  const renderStaticState = useCallback((revealed: boolean) => {
    if (!canvasRef.current || !imgARef.current || !imgBRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 1
    ctx.filter = 'none'

    const img = revealed ? imgBRef.current : imgARef.current
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }, [])

  // Draw initial canvas frame when loaded
  useEffect(() => {
    if (!isLoaded) return
    renderStaticState(isRevealed)
  }, [isLoaded, isRevealed, renderStaticState])

  // Per-module dissolve render loop
  const renderDissolveFrame = useCallback(
    (globalProgress: number) => {
      if (!canvasRef.current || !imgARef.current || !imgBRef.current) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d', { willReadFrequently: false })
      if (!ctx) return

      const width = canvas.width
      const height = canvas.height
      const cellW = width / gridSize
      const cellH = height / gridSize
      const delays = cellDelaysRef.current

      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = 1
      ctx.drawImage(imgARef.current, 0, 0, width, height)

      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const delay = delays[r]?.[c] ?? 0
          const cellProgress = Math.max(
            0,
            Math.min(1, (globalProgress - delay) / 0.6)
          )

          if (cellProgress > 0) {
            ctx.globalAlpha = cellProgress
            const sx = (c / gridSize) * imgBRef.current.width
            const sy = (r / gridSize) * imgBRef.current.height
            const sw = imgBRef.current.width / gridSize
            const sh = imgBRef.current.height / gridSize

            const dx = c * cellW
            const dy = r * cellH

            ctx.drawImage(imgBRef.current, sx, sy, sw, sh, dx, dy, cellW, cellH)
          }
        }
      }
      ctx.globalAlpha = 1
    },
    [gridSize]
  )

  // Trigger state toggle and animation
  const toggleState = useCallback(
    (targetState?: boolean) => {
      const nextState = targetState !== undefined ? targetState : !isRevealed
      if (nextState === isRevealed && !isAnimating) return

      if (autoRevertTimerRef.current) {
        clearTimeout(autoRevertTimerRef.current)
        autoRevertTimerRef.current = null
      }

      if (hasReducedMotion) {
        setIsRevealed(nextState)
        renderStaticState(nextState)
        return
      }

      setIsAnimating(true)
      setIsRevealed(nextState)

      const startTime = performance.now()
      const startProgress = nextState ? 0 : 1
      const endProgress = nextState ? 1 : 0

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const linearProgress = Math.min(elapsed / duration, 1)

        const currentGlobalProgress =
          startProgress + (endProgress - startProgress) * linearProgress

        renderDissolveFrame(currentGlobalProgress)

        if (linearProgress < 1) {
          animFrameRef.current = requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
          renderStaticState(nextState)

          if (nextState && autoRevertDelay > 0) {
            autoRevertTimerRef.current = setTimeout(() => {
              toggleState(false)
            }, autoRevertDelay)
          }
        }
      }

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
      animFrameRef.current = requestAnimationFrame(animate)
    },
    [
      isRevealed,
      isAnimating,
      hasReducedMotion,
      duration,
      autoRevertDelay,
      renderDissolveFrame,
      renderStaticState,
    ]
  )

  // Clean up animation frames and timers on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (autoRevertTimerRef.current) clearTimeout(autoRevertTimerRef.current)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleState()
    }
  }

  const handleMouseLeave = () => {
    if (isRevealed && !isAnimating) {
      if (autoRevertTimerRef.current) clearTimeout(autoRevertTimerRef.current)
      autoRevertTimerRef.current = setTimeout(() => {
        toggleState(false)
      }, 1500)
    }
  }

  return (
    <div
      id="icqr-cta"
      className="qr-card-panel group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#3B82F6] transition-all duration-300 shadow-2xl focus-within:ring-2 focus-within:ring-[#3B82F6] focus-within:outline-none cursor-pointer select-none"
      onClick={() => toggleState()}
      onKeyDown={handleKeyDown}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={
        isRevealed
          ? 'Scannable QR Code active. Click to return to tree view.'
          : 'Interactive artistic QR code. Click or tap to reveal scannable QR code.'
      }
      aria-expanded={isRevealed}
    >
      {/* Top Badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-[#1c1c1c] border border-[#333333] rounded-full flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#8C8C88] shadow-md z-10 transition-colors group-hover:border-[#3B82F6]/50">
        <span
          className={`w-2 h-2 rounded-full ${
            isRevealed
              ? 'bg-[#3B82F6] animate-pulse shadow-[0_0_8px_#3B82F6]'
              : 'bg-[#3B82F6] animate-ping opacity-75'
          }`}
        />
        <span className="text-[#F2F2F0]">{isRevealed ? 'SCANNER READY' : 'TAP TO REVEAL'}</span>
      </div>

      {/* Canvas Container */}
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square rounded-xl overflow-hidden bg-[#F6F1E7] border border-[#262626] flex items-center justify-center mt-2">
        <canvas
          ref={canvasRef}
          width={512}
          height={512}
          className="w-full h-full object-contain block"
        />

        <noscript>
          <img
            src="/state-b-code.png"
            alt="Scannable QR Code"
            className="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </noscript>

        {/* Floating Hint Overlay on State A */}
        {!isRevealed && !isAnimating && (
          <div className="absolute inset-x-3 bottom-3 px-3.5 py-2.5 rounded-lg bg-[#0A0A0A]/95 backdrop-blur-md border border-[#3B82F6]/40 text-[#F2F2F0] flex items-center justify-between text-xs font-mono shadow-xl transition-all transform group-hover:scale-[1.02] group-hover:border-[#3B82F6]">
            <div className="flex items-center gap-2 text-[#3B82F6]">
              <QrCode className="w-4 h-4 animate-bounce" />
              <span className="font-bold text-[#F2F2F0]">Tap to scan</span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
          </div>
        )}

        {/* Active Scan Indicator on State B */}
        {isRevealed && (
          <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-[#3B82F6]/15 border border-[#3B82F6]/40 text-[#3B82F6] text-[10px] font-mono tracking-wide flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3 h-3" />
            <span>SCANNABLE</span>
          </div>
        )}
      </div>

      {/* Action Footer Hint */}
      <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[#8C8C88] group-hover:text-[#3B82F6] transition-colors">
        <RotateCcw className="w-3.5 h-3.5 opacity-70" />
        <span>
          {isRevealed
            ? 'Tap code or leave to return to artistic view'
            : 'Per-module pixel dissolve without distortion'}
        </span>
      </div>
    </div>
  )
}
