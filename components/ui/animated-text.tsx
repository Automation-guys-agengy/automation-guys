'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 40,
  className = '',
}: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!isInView) return

    let currentIndex = 0
    const delayTimer = setTimeout(() => {
      setIsTyping(true)
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          setIsTyping(false)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [isInView, text, speed, delay])

  return (
    <span ref={ref} className={`inline-flex items-center ${className}`}>
      <span>{displayedText}</span>
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-[2px] h-[1em] bg-[#3B82F6] ml-1 font-mono"
        />
      )}
    </span>
  )
}

interface BlurRevealHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BlurRevealHeading({
  children,
  className = '',
  delay = 0.1,
}: BlurRevealHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(12px)', y: 24 }}
      animate={
        isInView
          ? { opacity: 1, filter: 'blur(0px)', y: 0 }
          : { opacity: 0, filter: 'blur(12px)', y: 24 }
      }
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function WordReveal({ text, className = '', delay = 0 }: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')

  return (
    <p ref={ref} className={`flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 14, filter: 'blur(4px)' }
          }
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: 'easeOut',
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
}
