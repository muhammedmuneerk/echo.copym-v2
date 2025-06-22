import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Single Node with subtle pulsing and movement
function DynamicNode({ position, index, updatePosition, nodeColor, nodeEmissive }) {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(...position)
    }
  }, [position])

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial 
        color={nodeColor}
        emissive={nodeEmissive}
        emissiveIntensity={0.2}
        metalness={0.6}
        roughness={0.5}
      />
    </mesh>
  )
}

// Lines between connected nodes
function DynamicConnection({ start, end, connectionColor }) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end])
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  return (
    <line geometry={geometry}>
      <lineBasicMaterial 
        color={connectionColor}
        linewidth={2}
        transparent
        opacity={0.3}
      />
    </line>
  )
}

// Main Network Controller
function BlockchainNetwork({ nodeCount, spread, nodeColor, nodeEmissive, connectionColor }) {
  const [positions, setPositions] = useState(() =>
    Array.from({ length: nodeCount }, () => [
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread
    ])
  )

  const updatePosition = (index, newPosition) => {
    setPositions((prev) => {
      const copy = [...prev]
      copy[index] = newPosition
      return copy
    })
  }

  return (
    <>
      {positions.map((pos, i) => (
        <DynamicNode
          key={i}
          position={pos}
          index={i}
          updatePosition={updatePosition}
          nodeColor={nodeColor}
          nodeEmissive={nodeEmissive}
        />
      ))}
      {positions.map((start, i) =>
        positions.map((end, j) =>
          i < j && Math.random() > 0.7 ? (
            <DynamicConnection
              key={`${i}-${j}`}
              start={start}
              end={end}
              connectionColor={connectionColor}
            />
          ) : null
        )
      )}
    </>
  )
}

// Main Canvas
function BlockchainNetworkAnimation({
  nodeColor = '#d4af37',
  nodeEmissive = '#b8860b',
  connectionColor = 'yellow',
  nodeCount = 15,
  spread = 30
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
      <Canvas
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 20], fov: 45 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <BlockchainNetwork
          nodeCount={nodeCount}
          spread={spread}
          nodeColor={nodeColor}
          nodeEmissive={nodeEmissive}
          connectionColor={connectionColor}
        />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  )
}

export default BlockchainNetworkAnimation

