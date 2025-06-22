import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const GoldParticles = () => {
  const pointsRef = useRef();
  const count = 400; 

  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 6 + 1.5; 
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5; 
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFD700"
        size={0.12} // ⬆️ Slightly larger particles
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const GoldSwirl = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}> {/* ⬆️ Taller canvas */}
      <Canvas camera={{ position: [0, 0, 10] }}> {/* ⬅️ Pull camera back for spread */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} color="#FFD700" />
        <GoldParticles />
      </Canvas>
    </div>
  );
};

export default GoldSwirl;
