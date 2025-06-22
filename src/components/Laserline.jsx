import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

// Laser beam component
function LaserBeam({ direction = "x", color = "#00ff99", speed = 0.02, position = [0, 0, 0] }) {
  const ref = useRef();
  const [scale, setScale] = useState(0);
  const maxLength = 30;
  const range = 10;

  useFrame(({ clock }) => {
    // Move back and forth
    const t = Math.sin(clock.elapsedTime * speed) * range;
    if (ref.current) {
      if (direction === "x") ref.current.position.x = t + position[0];
      else if (direction === "y") ref.current.position.y = t + position[1];

      // Scale up animation
      if (scale < 1) {
        const newScale = Math.min(scale + 0.01, 1);
        ref.current.scale.set(newScale, newScale, newScale);
        setScale(newScale);
      }
    }
  });

  const start = direction === "x"
    ? new THREE.Vector3(-maxLength / 2, 0, 0)
    : new THREE.Vector3(0, -maxLength / 2, 0);
  const end = direction === "x"
    ? new THREE.Vector3(maxLength / 2, 0, 0)
    : new THREE.Vector3(0, maxLength / 2, 0);

  return (
    <group ref={ref} position={position} scale={[0, 0, 0]}>
      <Line points={[start, end]} color={color} lineWidth={4} transparent opacity={0.9} />
      <Line points={[start, end]} color={color} lineWidth={8} transparent opacity={0.2} />
    </group>
  );
}

export default function LaserLines() {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 30], fov: 70 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 10]} color="#00ffcc" intensity={2.5} />

        {/* Horizontal line near bottom */}
        <LaserBeam direction="x" speed={0.015} position={[0, 2, 0]} />

        {/* Vertical line near left */}
        <LaserBeam direction="x" speed={0.02} position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
}


