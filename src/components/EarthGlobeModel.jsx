import { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, useAnimations } from "@react-three/drei";
import { Box } from "@mui/material";

// Enhanced Model component with animations
function Model() {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/animated_sci-fi_globe/animated_sci-fi_globe.gltf");
  const { actions } = useAnimations(animations, group);
  
  // Play all animations from the model when it loads
  useEffect(() => {
    // Get all animation names
    const animationNames = Object.keys(actions);
    
    // Play each animation
    animationNames.forEach(name => {
      if (actions[name]) {
        actions[name].play();
      }
    });
    
    return () => {
      // Cleanup animations on unmount
      animationNames.forEach(name => {
        if (actions[name]) {
          actions[name].stop();
        }
      });
    };
  }, [actions]);
  
  return (
    <group ref={group}>
      <primitive object={scene} position={[0, 0, 0]} scale={1} />
    </group>
  );
}

// 3D Globe Background Component
export default function EarthGlobeModel() {
  return (
    <Box sx={{ 
      position: "absolute", 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 0, 
      opacity: 0.5, 
      width: "100%",
      height: "600px",
      marginTop: "350px"
    }}>
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 10], fov: 15 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <spotLight 
            position={[0, 15, 15]} 
            angle={0.5} 
            penumbra={0.8} 
            intensity={1.5} 
            castShadow 
          />
          <Model />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </Box>
  );
}

// Preload the 3D model
useGLTF.preload("/models/animated_sci-fi_globe/animated_sci-fi_globe.gltf");