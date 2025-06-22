import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function BlockchainNetworkVisualization() {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // Check device type on mount and window resize
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  useEffect(() => {
    // Initialize 3D scene
    if (!mountRef.current || !mountRef.current.parentElement) return;
    
    // Clear any existing canvas first
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Scene, camera, and renderer setup with better performance settings
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Add fog for depth effect - changed to darker color
    scene.fog = new THREE.FogExp2(0x050f05, 0.02);
    
    // Use perspective camera with dynamic settings
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 65 : 75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    
    // Configure renderer with performance optimizations
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable antialiasing on mobile for performance
      alpha: true,
      powerPreference: "high-performance"
    });
    
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Changed background color to dark green-black
    renderer.setClearColor(0x050f05, 0.9);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // Limit pixel ratio
    
    // Add ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    // Add directional light for shadows and highlights - changed to green
    const directionalLight = new THREE.DirectionalLight(0x00ff80, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point lights for dynamic glow effects - changed to green colors
    const pointLight1 = new THREE.PointLight(0x00ff80, 1, 50);
    pointLight1.position.set(0, 10, 0);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x10e060, 1, 50);
    pointLight2.position.set(-15, -10, -10);
    scene.add(pointLight2);
    
    // Append renderer to DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    
    // Calculate node count based on device
    const getNodeCount = () => {
      if (isMobile) return 20;
      if (isTablet) return 35;
      return 60;
    };
    
    const nodeCount = getNodeCount();
    const blockCount = Math.floor(nodeCount / 3);
    // New count for triangular prisms
    const triangleCount = Math.floor(nodeCount / 6);
    
    // Array to hold all scene objects
    const nodes = [];
    const nodeConnections = [];
    const blocks = [];
    
    // Create advanced material for nodes with pulsing effect
    const createNodeMaterial = (color = 0x00ff80, intensity = 1) => {
      return new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          baseColor: { value: new THREE.Color(color) },
          intensity: { value: intensity }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            vUv = uv;
            vPosition = position;
            vNormal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 baseColor;
          uniform float intensity;
          varying vec2 vUv;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          vec3 pulse(vec3 color, float rate) {
            float pulseVal = (sin(time * rate) * 0.15 + 0.85) * intensity;
            return color * pulseVal;
          }
          
          void main() {
            // Edge detection based on normals and view
            float edgeFactor = abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
            
            // Holographic edge glow
            float edgeGlow = pow(1.0 - edgeFactor, 3.0) * 0.6;
            
            // Wireframe grid effect
            float gridX = step(0.97, mod(vUv.x * 10.0, 1.0));
            float gridY = step(0.97, mod(vUv.y * 10.0, 1.0));
            float grid = max(gridX, gridY) * 0.4;
            
            // Pulse effect on base color
            vec3 finalColor = pulse(baseColor, 2.0);
            
            // Add edge highlight
            finalColor += vec3(0.5, 1.0, 0.7) * edgeGlow;
            
            // Add grid overlay
            finalColor = mix(finalColor, vec3(1.0, 1.0, 1.0), grid * 0.5);
            
            // Data flow effect
            float dataFlow = step(0.98, fract(vUv.y - time * 0.2));
            finalColor = mix(finalColor, vec3(0.0, 1.0, 0.5), dataFlow * 0.7);
            
            // Calculate alpha - more transparent in middle, more opaque on edges
            float alpha = mix(0.3, 0.8, edgeGlow + grid);
            
            gl_FragColor = vec4(finalColor, alpha * intensity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
    };
    
    // Create material for connections with animated flow effect
    const createLineMaterial = (color = 0x00ff80, opacity = 0.4) => {
      return new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(color) },
          opacity: { value: opacity }
        },
        vertexShader: `
          uniform float time;
          attribute float linePosition;
          varying float vLinePosition;
          
          void main() {
            vLinePosition = linePosition;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          uniform float opacity;
          varying float vLinePosition;
          
          void main() {
            float flow = fract(vLinePosition - time * 0.2);
            float intensity = smoothstep(0.0, 0.1, flow) * smoothstep(0.35, 0.25, flow);
            vec3 finalColor = color * (0.5 + intensity * 0.5);
            gl_FragColor = vec4(finalColor, opacity * (0.6 + intensity * 0.4));
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
    };
    
    // Create blockchain cube material
    const createBlockMaterial = (isHightech = false) => {
      return new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x00ff80) },
          secondaryColor: { value: new THREE.Color(0x10e060) },
          isHightech: { value: isHightech ? 1.0 : 0.0 }
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vNormal;
          
          void main() {
            vPosition = position;
            vUv = uv;
            vNormal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          uniform vec3 secondaryColor;
          uniform float isHightech;
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vNormal;
          
          void main() {
            // Edge detection based on normals and view
            float edgeFactor = abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
            float edgeGlow = pow(1.0 - edgeFactor, 3.0);
            
            // Grid pattern - different density based on type
            float gridSize = isHightech > 0.5 ? 20.0 : 10.0;
            float gridX = step(0.97, mod(vUv.x * gridSize, 1.0));
            float gridY = step(0.97, mod(vUv.y * gridSize, 1.0));
            float grid = max(gridX, gridY) * 0.4;
            
            // Scan line effect for high-tech models
            float scanLine = 0.0;
            if (isHightech > 0.5) {
              scanLine = step(0.98, fract((vUv.y * 2.0) - time * 0.2)) * 0.5;
            }
            
            // Pulse and color blend
            float pulse = sin(time * 1.5) * 0.15 + 0.85;
            vec3 baseColor = mix(color, secondaryColor, sin(time * 0.5 + vPosition.x * 0.1) * 0.5 + 0.5);
            vec3 finalColor = mix(baseColor * pulse, vec3(1.0), grid + scanLine);
            
            // Add edge highlighting
            finalColor += vec3(0.0, 1.0, 0.5) * edgeGlow * 0.5;
            
            // Data circuit pattern for high-tech models
            if (isHightech > 0.5) {
              float circuit1 = step(0.95, sin(vUv.x * 30.0 + vUv.y * 30.0 + time * 0.5) * 0.5 + 0.5);
              float circuit2 = step(0.95, sin(vUv.x * 20.0 - vUv.y * 20.0 - time * 0.3) * 0.5 + 0.5);
              float circuit = max(circuit1, circuit2) * 0.6;
              finalColor = mix(finalColor, vec3(0.0, 1.0, 0.7), circuit);
            }
            
            float alpha = edgeGlow * 0.3 + grid * 0.7 + scanLine * 0.8;
            alpha = min(0.85, alpha + 0.3); // Ensure minimum visibility
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        wireframe: false,
        side: THREE.DoubleSide
      });
    };
    
    // Create special material for triangular prisms
    const createTriangleMaterial = () => {
      return new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x4dffa6) }
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            vPosition = position;
            vNormal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            // Calculate angle for triangle faces
            float edgeFactor = abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
            
            // Create holographic effect on edges
            float edgeGlow = pow(1.0 - edgeFactor, 5.0) * 0.8;
            
            // Create flowing energy lines along the prism
            float energyLine = step(0.93, sin(vPosition.y * 15.0 + time * 2.0) * 0.5 + 0.5);
            
            // Pulse the base color
            float pulse = sin(time * 0.8) * 0.2 + 0.8;
            vec3 baseColor = color * pulse;
            
            // Add edge glow effect
            vec3 finalColor = mix(baseColor, vec3(1.0, 1.0, 1.0), edgeGlow * 0.7);
            
            // Add energy lines
            finalColor = mix(finalColor, vec3(0.0, 1.0, 0.8), energyLine * 0.8);
            
            float alpha = min(0.9, edgeGlow + 0.3 + energyLine * 0.6);
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
    };
    
    // Create node distribution patterns
    const nodePatterns = {
      grid: () => {
        const gridSize = 20;
        const cellSize = gridSize / Math.ceil(Math.sqrt(nodeCount));
        const offset = gridSize / 2 - cellSize / 2;
        
        const x = (Math.random() * gridSize) - offset;
        const y = (Math.random() * gridSize) - (offset / 2);
        const z = (Math.random() * gridSize) - offset;
        
        return new THREE.Vector3(x, y, z);
      },
      cube: () => {
        const spread = 18;
        return new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread
        );
      },
      plane: () => {
        const spread = 25;
        return new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread * 0.5,
          (Math.random() - 0.5) * spread
        );
      }
    };
    
    // Choose pattern based on device for optimal visual effect
    const distributionPattern = isMobile ? nodePatterns.plane : nodePatterns.grid;
    
    // Generate cubes and tetrahedrons as nodes instead of spheres
    for (let i = 0; i < nodeCount; i++) {
      // Randomly choose between cube and tetrahedron for variety
      let geometry;
      let size = 0.2 + Math.random() * 0.3;
      
      if (i % 4 === 0) {
        // Create small octahedron
        geometry = new THREE.OctahedronGeometry(size * 0.8, 0);
      } else {
        // Create cubes with varied sizes and detail
        geometry = new THREE.BoxGeometry(
          size, 
          size, 
          size, 
          1, 1, 1
        );
      }
      
      // Create node with one of three colors for variety
      const colorChoice = Math.random();
      let nodeMaterial;
      
      if (colorChoice < 0.6) {
        nodeMaterial = createNodeMaterial(0x00ff80, 1.0); // Bright green
      } else if (colorChoice < 0.9) {
        nodeMaterial = createNodeMaterial(0x10e060, 0.8); // Medium green
      } else {
        nodeMaterial = createNodeMaterial(0x4dffa6, 0.7); // Light green
      }
      
      const node = new THREE.Mesh(geometry, nodeMaterial);
      
      // Position based on selected pattern
      const position = distributionPattern();
      node.position.copy(position);
      
      // Add random rotation for more dynamic appearance
      node.rotation.x = Math.random() * Math.PI * 2;
      node.rotation.y = Math.random() * Math.PI * 2;
      node.rotation.z = Math.random() * Math.PI * 2;
      
      // Add dynamics to each node
      node.userData = {
        initialPosition: position.clone(),
        initialRotation: new THREE.Vector3(node.rotation.x, node.rotation.y, node.rotation.z),
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01, 
          (Math.random() - 0.5) * 0.01, 
          (Math.random() - 0.5) * 0.01
        ),
        amplitude: 0.5 + Math.random() * 0.5,
        connectionCount: 0,
        size
      };
      
      scene.add(node);
      nodes.push(node);
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      const maxConnections = isMobile ? 2 : 4;
      
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        const maxDistance = isMobile ? 8 : 12;
        
        if (distance < maxDistance && 
            nodes[i].userData.connectionCount < maxConnections && 
            nodes[j].userData.connectionCount < maxConnections) {
          
          // Create a curved path for more organic look
          const midPoint = new THREE.Vector3().addVectors(nodes[i].position, nodes[j].position).multiplyScalar(0.5);
          
          // Add slight random deviation to midpoint for more futuristic data flow look
          midPoint.x += (Math.random() - 0.5) * 2;
          midPoint.y += (Math.random() - 0.5) * 2;
          midPoint.z += (Math.random() - 0.5) * 2;
          
          // Create curve
          const curve = new THREE.QuadraticBezierCurve3(
            nodes[i].position,
            midPoint,
            nodes[j].position
          );
          
          // Generate points along curve
          const points = curve.getPoints(20);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          
          // Add line position attribute for animation
          const linePositions = new Float32Array(points.length);
          for (let k = 0; k < points.length; k++) {
            linePositions[k] = k / (points.length - 1);
          }
          geometry.setAttribute('linePosition', new THREE.BufferAttribute(linePositions, 1));
          
          // Colorize lines based on node colors
          const nodeAColor = nodes[i].material.uniforms.baseColor.value;
          const nodeBColor = nodes[j].material.uniforms.baseColor.value;
          const lineColor = new THREE.Color()
            .addColors(nodeAColor, nodeBColor)
            .multiplyScalar(0.5);
          
          const lineMaterial = createLineMaterial(lineColor, 0.4);
          const line = new THREE.Line(geometry, lineMaterial);
          
          scene.add(line);
          nodeConnections.push({
            line,
            curve,
            nodeA: nodes[i],
            nodeB: nodes[j],
            midPoint
          });
          
          nodes[i].userData.connectionCount++;
          nodes[j].userData.connectionCount++;
        }
      }
    }
    
    // Create advanced futuristic blockchain cubes
    if (!isMobile || isTablet) {
      for (let i = 0; i < blockCount; i++) {
        const size = 1.2 + Math.random() * 1.0;
        
        // Create varied geometries for cubes
        let geometry;
        const geoType = Math.random();
        
        if (geoType < 0.7) {
          // Standard cube
          geometry = new THREE.BoxGeometry(size, size, size);
        } else if (geoType < 0.9) {
          // Beveled cube for high-tech look
          geometry = new THREE.BoxGeometry(size, size, size);
          // We'll use shader effects to create the high-tech look instead of actual beveling
        } else {
          // Elongated cube
          geometry = new THREE.BoxGeometry(size * 0.7, size * 1.3, size * 0.7);
        }
        
        // Alternate between normal and high-tech materials for visual variety
        const material = createBlockMaterial(geoType > 0.5);
        
        const block = new THREE.Mesh(geometry, material);
        
        // Position blocks
        const position = nodePatterns.cube();
        position.multiplyScalar(1.5); // Spread blocks out more
        block.position.copy(position);
        
        // Rotate blocks randomly
        block.rotation.x = Math.random() * Math.PI * 2;
        block.rotation.y = Math.random() * Math.PI * 2;
        block.rotation.z = Math.random() * Math.PI * 2;
        
        block.userData = {
          rotationSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
          ),
          initialPosition: position.clone(),
          size
        };
        
        scene.add(block);
        blocks.push(block);
      }
    }
    
    // Create triangular prisms for advanced futuristic look
    if (!isMobile) {
      for (let i = 0; i < triangleCount; i++) {
        // Create triangular prism
        const size = 1.0 + Math.random() * 0.8;
        const height = 2.0 + Math.random() * 1.0;
        
        // Create custom triangular prism
        const triangleGeometry = new THREE.CylinderGeometry(0, size, height, 3, 1);
        const triangleMaterial = createTriangleMaterial();
        
        const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
        
        // Position triangles in a complementary way to other elements
        const position = nodePatterns.cube();
        position.multiplyScalar(1.3);
        triangle.position.copy(position);
        
        // Rotate to look more dynamic
        triangle.rotation.x = Math.random() * Math.PI * 2;
        triangle.rotation.y = Math.random() * Math.PI * 2;
        triangle.rotation.z = Math.random() * Math.PI * 2;
        
        triangle.userData = {
          rotationSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.01
          ),
          initialPosition: position.clone(),
          size
        };
        
        scene.add(triangle);
        blocks.push(triangle); // Add to blocks array for animation updates
      }
    }
    
    // Add particle system for background atmosphere
    const particleCount = isMobile ? 200 : 500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread particles in a large cube
      const radius = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3+1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3+2] = radius * Math.cos(phi);
      
      particleSizes[i] = 0.05 + Math.random() * 0.1;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x10e060) }
      },
      vertexShader: `
        attribute float size;
        varying float vSize;
        uniform float time;
        
        void main() {
          vSize = size;
          // Slight movement
          vec3 pos = position;
          pos.x += sin(time * 0.2 + position.z * 0.05) * 0.2;
          pos.y += cos(time * 0.15 + position.x * 0.05) * 0.2;
          pos.z += sin(time * 0.1 + position.y * 0.05) * 0.2;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / length(mvPosition.xyz));
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float time;
        varying float vSize;
        
        void main() {
          // Calculate distance from center of point
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          // Discard pixels outside of circle
          if (dist > 0.5) discard;
          
          // Glow effect with pulse
          float pulse = sin(time + vSize * 10.0) * 0.15 + 0.85;
          float alpha = smoothstep(0.5, 0.0, dist) * 0.5 * pulse;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // Position camera
    camera.position.z = isMobile ? 30 : 25;
    
    // Animation loop with performance optimization
    const clock = new THREE.Clock();
    let lastTime = 0;
    const animationSpeed = isMobile ? 0.8 : 1.0; // Slow down animations on mobile
    
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Throttle animations on mobile
      const currentTime = clock.getElapsedTime();
      const deltaTime = currentTime - lastTime;
      
      // Only update on appropriate intervals (mobile gets fewer updates)
      if (isMobile && deltaTime < 0.03) return;
      lastTime = currentTime;
      
      const time = currentTime * animationSpeed;
      
      // Update particle system
      particleSystem.material.uniforms.time.value = time;
      
      // Update node positions and materials with complex motion
      nodes.forEach(node => {
        const userData = node.userData;
        
        // Complex orbital motion
        node.position.x = userData.initialPosition.x + 
                          Math.sin(time * userData.speed + userData.phase) * userData.amplitude;
        node.position.y = userData.initialPosition.y + 
                          Math.cos(time * userData.speed + userData.phase) * userData.amplitude;
        node.position.z = userData.initialPosition.z + 
                          Math.sin(time * userData.speed * 0.5 + userData.phase) * userData.amplitude * 0.5;
        
        // Add rotation for more dynamic movement
        node.rotation.x = userData.initialRotation.x + time * userData.rotationSpeed.x;
        node.rotation.y = userData.initialRotation.y + time * userData.rotationSpeed.y;
        node.rotation.z = userData.initialRotation.z + time * userData.rotationSpeed.z;
        
        // Update shader uniforms
        node.material.uniforms.time.value = time;
      });
      
      // Update connection curves
      nodeConnections.forEach(connection => {
        // Update midpoint for dynamic connections
        connection.midPoint.x += Math.sin(time * 0.3) * 0.01;
        connection.midPoint.y += Math.cos(time * 0.4) * 0.01;
        
        // Update curve
        connection.curve = new THREE.QuadraticBezierCurve3(
          connection.nodeA.position,
          connection.midPoint,
          connection.nodeB.position
        );
        
        // Update line geometry
        const points = connection.curve.getPoints(20);
        connection.line.geometry.setFromPoints(points);
        
        // Update shader uniforms
        connection.line.material.uniforms.time.value = time;
      });
      
      // Update blockchain blocks
      blocks.forEach(block => {
        // Rotate blocks
        block.rotation.x += block.userData.rotationSpeed.x;
        block.rotation.y += block.userData.rotationSpeed.y;
        block.rotation.z += block.userData.rotationSpeed.z;
        
        // Add slight positional movement
        block.position.x = block.userData.initialPosition.x + Math.sin(time * 0.2) * 0.3;
        block.position.y = block.userData.initialPosition.y + Math.cos(time * 0.3) * 0.3;
        
        // Update shader uniforms
        block.material.uniforms.time.value = time;
      });
      
      // Update point lights for dynamic lighting
      pointLight1.position.x = Math.sin(time * 0.2) * 15;
      pointLight1.position.z = Math.cos(time * 0.2) * 15;
      
      pointLight2.position.x = Math.sin(time * 0.1 + Math.PI) * 15;
      pointLight2.position.z = Math.cos(time * 0.1 + Math.PI) * 15;
      
      // Orbit camera slightly
      if (!isMobile) {
        camera.position.x = Math.sin(time * 0.05) * 5;
        camera.position.y = Math.sin(time * 0.04) * 3;
        camera.lookAt(0, 0, 0);
      }
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        
        // Adjust camera for different screen sizes
        if (width < 768) {
          camera.position.z = 30;
        } else {
          camera.position.z = 25;
        }
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Add interaction on mouse move for desktop
    const handleMouseMove = (event) => {
      if (isMobile) return;
      
      // Convert mouse coordinates to normalized device coordinates
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Subtle tilting of the scene based on mouse position
      scene.rotation.y = mouseX * 0.1;
      scene.rotation.x = mouseY * 0.1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add device orientation for mobile tilt effect
    const handleDeviceOrientation = (event) => {
      if (!isMobile || !event.beta || !event.gamma) return;
      
      // Get device orientation angles
      const betaConstrained = Math.max(-20, Math.min(20, event.beta - 40)) / 20;
      const gammaConstrained = Math.max(-20, Math.min(20, event.gamma)) / 20;
      
      // Apply subtle tilt to scene
      scene.rotation.x = betaConstrained * 0.1;
      scene.rotation.y = gammaConstrained * 0.1;
    };
    
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      
      // Check if the component is still mounted before cleaning up
      if (mountRef.current && rendererRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch (error) {
          console.log("Error removing renderer: ", error);
        }
      }
      
      // Dispose all resources
      if (nodes) {
        nodes.forEach(node => {
          if (node.geometry) node.geometry.dispose();
          if (node.material) node.material.dispose();
        });
      }
      
      if (nodeConnections) {
        nodeConnections.forEach(connection => {
          if (connection.line && connection.line.geometry) connection.line.geometry.dispose();
          if (connection.line && connection.line.material) connection.line.material.dispose();
        });
      }
      
      if (blocks) {
        blocks.forEach(block => {
          if (block.geometry) block.geometry.dispose();
          if (block.material) block.material.dispose();
        });
      }
      
      if (particlesGeometry) particlesGeometry.dispose();
      if (particleMaterial) particleMaterial.dispose();
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      
      sceneRef.current = null;
    };
  }, [isMobile, isTablet]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}