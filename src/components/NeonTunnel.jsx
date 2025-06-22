import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function DotsTunnel({ count = 4000, isAnimating }) {
  const meshRef = useRef()
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.random() * 2
      const angle = Math.random() * Math.PI * 2
      const z = -Math.random() * 100
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius
      pos[i * 3 + 2] = z
    }
    return pos
  })

  useFrame(() => {
    if (meshRef.current && isAnimating) {
      meshRef.current.rotation.z += 0.001
      meshRef.current.position.z += 0.6
    }
  })

  return (
    <points ref={meshRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.2}
        sizeAttenuation
        depthWrite={false}
        transparent
      />
    </points>
  )
}

const NeonTunnelSplash = () => {
  const [isAnimating, setIsAnimating] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Stop animation after 5 seconds
    const stopTimer = setTimeout(() => {
      setIsAnimating(false)
      // Smooth fade-out
      const fadeInterval = setInterval(() => {
        setOpacity((prev) => {
          if (prev > 0) return prev - 0.05
          clearInterval(fadeInterval)
          return 0
        })
      }, 50)
    }, 5000)

    return () => clearTimeout(stopTimer)
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: -1, opacity }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 10]} intensity={1.2} />
        <DotsTunnel count={1200} isAnimating={isAnimating} />
      </Canvas>
    </div>
  )
}

export default NeonTunnelSplash
