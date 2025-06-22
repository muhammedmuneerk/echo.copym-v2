import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const GreenGlobeMesh = ({ size }) => {
  const globeRef = useRef();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={globeRef} scale={size}>
      <sphereGeometry args={[1.2, 28, 28]} />
      <meshBasicMaterial
        color="#007744"
        wireframe
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </mesh>
  );
};

const GreenGlobe = ({ size = 1 }) => {
  return (
    <div
      className="pointer-events-none w-full"
      style={{ height: `${350 * size}px` }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5] }}
        className="pointer-events-none"
      >
        <ambientLight intensity={0.3} />
        <GreenGlobeMesh size={size} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate />
      </Canvas>
    </div>
  );
};

export default GreenGlobe;
