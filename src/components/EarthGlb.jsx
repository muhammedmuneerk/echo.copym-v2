import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const RotatingEarth = () => {
  const { scene } = useGLTF('/models/earth-new/earth.glb');
  const earthRef = useRef();
  const { camera, size } = useThree();

  useEffect(() => {
    if (earthRef.current) {
      const box = new THREE.Box3().setFromObject(earthRef.current);
      const center = box.getCenter(new THREE.Vector3());
      earthRef.current.position.sub(center);

      const sizeBox = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(sizeBox.x, sizeBox.y, sizeBox.z);

      const fov = camera.fov * (Math.PI / 180); // convert fov to radians
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.4; // zoom out factor
      
      camera.position.z = cameraZ;
      camera.near = maxDim / 100;
      camera.far = maxDim * 100;
      camera.updateProjectionMatrix();
    }
  }, [scene, camera, size]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <group position={[-0.5, 0.5, 0]}>
      {/* Move Earth left (-X) and up (+Y) */}
      <primitive ref={earthRef} object={scene} scale={1.5} />
    </group>
  );
};

const EarthGlb = () => {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ fov: 45, near: 0.1, far: 1000 }}
    >
      <ambientLight intensity={1.2} />
      <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={1.8} />
      <directionalLight position={[10, 10, 10]} intensity={2.5} />
      <directionalLight position={[-10, -10, 5]} intensity={2.0} />
      <directionalLight position={[-10, 10, 10]} intensity={1.5} />
      <directionalLight position={[10, -10, 5]} intensity={1.5} />
      <pointLight position={[0, 15, 20]} intensity={1.0} />
      <pointLight position={[0, -15, -20]} intensity={1.0} />
      
      <RotatingEarth />
    </Canvas>
  );
};

export default EarthGlb;
