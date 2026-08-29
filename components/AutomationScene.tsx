'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox, Text } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Gear() {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * 0.45 })
  return <group ref={ref} position={[0, 0.35, 0]}><mesh rotation={[0, 0, Math.PI / 8]}><torusGeometry args={[1.05, .2, 12, 8]} /><meshStandardMaterial color="#f36b21" metalness={.7} roughness={.25} /></mesh>{Array.from({ length: 8 }).map((_, i) => <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 1.22, Math.sin(i * Math.PI / 4) * 1.22, 0]} rotation={[0, 0, i * Math.PI / 4]}><boxGeometry args={[.34, .25, .28]} /><meshStandardMaterial color="#f36b21" metalness={.6} /></mesh>)}<mesh><cylinderGeometry args={[.48, .48, .22, 32]} /><meshStandardMaterial color="#151515" metalness={.8} roughness={.2} /></mesh></group>
}

function TaskCard({ position, label, delay }: { position: [number, number, number]; label: string; delay: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => { if (ref.current) ref.current.position.x = position[0] + Math.sin(clock.elapsedTime * .8 + delay) * .08 })
  return <group ref={ref} position={position}><RoundedBox args={[1.7, .75, .08]} radius={.03}><meshStandardMaterial color="#f3efe7" /></RoundedBox><Text position={[-.68, .02, .06]} fontSize={.13} color="#151515" anchorX="left">{label}</Text><mesh position={[.62, .02, .06]}><circleGeometry args={[.1, 16]} /><meshBasicMaterial color="#f36b21" /></mesh></group>
}

function SceneContent() {
  const cards = useMemo(() => [['New lead', [-3.6, 1.65, 0] as [number, number, number]], ['Invoice due', [-3.8, .65, .2] as [number, number, number]], ['Support ticket', [-3.55, -.35, 0] as [number, number, number]], ['Weekly report', [2.7, 1.35, .1] as [number, number, number]], ['Client onboarded', [3.05, .35, 0] as [number, number, number]], ['Task complete', [2.75, -.65, .2] as [number, number, number]]] as const, [])
  return <><ambientLight intensity={1.2} /><directionalLight position={[2, 4, 5]} intensity={3} color="#fff7e8" /><pointLight position={[0, 0, 2]} intensity={8} color="#f36b21" distance={8} /><mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]}><planeGeometry args={[12, 5]} /><meshStandardMaterial color="#242424" roughness={.8} /></mesh><mesh position={[0, -1.08, 0]}><boxGeometry args={[7.8, .12, 1.35]} /><meshStandardMaterial color="#3d3d3d" metalness={.35} /></mesh><mesh position={[0, -1, 0]}><boxGeometry args={[7.3, .04, 1.05]} /><meshStandardMaterial color="#151515" /></mesh>{[-2.5, 0, 2.5].map((x) => <mesh key={x} position={[x, -1.03, .56]}><boxGeometry args={[.08, .04, .15]} /><meshBasicMaterial color="#f36b21" /></mesh>)}<Float speed={1} rotationIntensity={.12} floatIntensity={.18}><Gear /></Float><Text position={[-4.9, 2.25, 0]} fontSize={.18} color="#f36b21" anchorX="left">MANUAL INPUT</Text><Text position={[2.5, 2.25, 0]} fontSize={.18} color="#f36b21" anchorX="left">SYSTEM OUTPUT</Text>{cards.map(([label, position], i) => <TaskCard key={label} label={label} position={position} delay={i} />)}<Text position={[0, -1.62, .2]} fontSize={.16} color="#f3efe7">AUTOMATION CONTROL LAYER</Text></>
}

export function AutomationScene() { return <div className="scene-frame" aria-label="3D illustration of manual tasks entering an automation control layer and becoming organized outputs"><Canvas camera={{ position: [0, 1.2, 10], fov: 35 }} dpr={[1, 1.5]}><SceneContent /><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.35} /></Canvas><div className="scene-caption"><span>INPUT</span><i /> <span>ROUTE</span><i /> <span>OUTPUT</span></div></div> }
