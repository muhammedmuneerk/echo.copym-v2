import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GlowingCylinder = ({ x, color }) => {
  const ref = useRef();

  useFrame(() => {
    ref.current.position.y += 0.05;
    if (ref.current.position.y > 15) {
      ref.current.position.y = -15;
    }
  });

  return (
    <mesh ref={ref} position={[x, 0, 0]}>
      <cylinderGeometry args={[0.05, 0.05, 20, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

const GlowingWall = () => {
  const count = 200; // increase for denser spread
  const spacing = 0.3;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = (i - count / 2) * spacing;
        const color = new THREE.Color().setHSL(Math.random(), 1, 0.6);
        return <GlowingCylinder key={i} x={x} color={color} />;
      })}
    </>
  );
};

const NeonLinesBackground = () => {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 50], fov: 80 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 0, 30]} intensity={2} />
        <GlowingWall />
      </Canvas>
    </div>
  );
};

export default NeonLinesBackground;


