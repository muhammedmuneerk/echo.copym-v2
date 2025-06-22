import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BackgroundPattern = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed w-full h-screen overflow-hidden pointer-events-none" >
      {/* Dynamic gradient overlay that follows mouse */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(0, 162, 255, 0.1), transparent 60%)`,
          transition: 'background 0.3s ease-out'
        }}
      />
      
      {/* Circuit board patterns */}
      <CircuitNetwork />
      
      {/* Scanning lines */}
      <ScanningLines />

      {/* Transparent blurred overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none backdrop-blur-[3px]"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
      />

      {/* Content overlay */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        {/* Content goes here */}
      </div>
    </div>
  );
};

// Enhanced Circuit network component with realistic PCB design
const CircuitNetwork = () => {
  // Track width so our mirror transform always uses the current viewport size
  const [svgWidth, setSvgWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  useEffect(() => {
    const onResize = () => setSvgWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // More realistic circuit traces with proper connections
  const horizontalTraces = [
    { path: "M50,150 L200,150 L220,130 L350,130 L370,150 L500,150 L520,170 L650,170 L670,150 L800,150", y: 150 },
    { path: "M80,220 L180,220 L200,200 L320,200 L340,220 L450,220 L470,240 L580,240 L600,220 L720,220", y: 220 },
    { path: "M30,290 L150,290 L170,270 L280,270 L300,290 L420,290 L440,310 L550,310 L570,290 L690,290", y: 290 },
    { path: "M100,360 L220,360 L240,340 L350,340 L370,360 L480,360 L500,380 L620,380 L640,360 L760,360", y: 360 },
    { path: "M60,430 L190,430 L210,410 L330,410 L350,430 L470,430 L490,450 L600,450 L620,430 L750,430", y: 430 },
    { path: "M40,500 L160,500 L180,480 L300,480 L320,500 L440,500 L460,520 L570,520 L590,500 L710,500", y: 500 }
  ];

  const verticalTraces = [
    { path: "M200,80 L200,130 L220,150 L220,200 L200,220 L200,270 L220,290 L220,340 L200,360 L200,410", x: 200 },
    { path: "M350,60 L350,130 L370,150 L370,200 L350,220 L350,270 L370,290 L370,340 L350,360 L350,420", x: 350 },
    { path: "M520,90 L520,170 L500,190 L500,240 L520,260 L520,310 L500,330 L500,380 L520,400 L520,450", x: 520 },
    { path: "M650,70 L650,170 L670,190 L670,240 L650,260 L650,310 L670,330 L670,380 L650,400 L650,460", x: 650 }
  ];

  // Connection points (pads/vias)
  const connectionPoints = [
    // Intersections and endpoints
    { x: 200, y: 150, type: 'via' },
    { x: 350, y: 130, type: 'pad' },
    { x: 520, y: 170, type: 'via' },
    { x: 650, y: 170, type: 'pad' },
    { x: 180, y: 220, type: 'via' },
    { x: 320, y: 200, type: 'pad' },
    { x: 450, y: 220, type: 'via' },
    { x: 580, y: 240, type: 'pad' },
    { x: 150, y: 290, type: 'via' },
    { x: 280, y: 270, type: 'pad' },
    { x: 420, y: 290, type: 'via' },
    { x: 550, y: 310, type: 'pad' },
    { x: 220, y: 360, type: 'via' },
    { x: 350, y: 340, type: 'pad' },
    { x: 480, y: 360, type: 'via' },
    { x: 620, y: 380, type: 'pad' },
    { x: 190, y: 430, type: 'via' },
    { x: 330, y: 410, type: 'pad' },
    { x: 470, y: 430, type: 'via' },
    { x: 600, y: 450, type: 'pad' },
    { x: 160, y: 500, type: 'via' },
    { x: 300, y: 480, type: 'pad' },
    { x: 440, y: 500, type: 'via' },
    { x: 570, y: 520, type: 'pad' }
  ];

  // Component outlines (IC packages, resistors, capacitors)
  const components = [
    { x: 280, y: 180, width: 40, height: 20, type: 'resistor' },
    { x: 450, y: 250, width: 60, height: 40, type: 'ic' },
    { x: 120, y: 320, width: 30, height: 15, type: 'capacitor' },
    { x: 580, y: 390, width: 50, height: 30, type: 'ic' },
    { x: 350, y: 460, width: 25, height: 12, type: 'resistor' },
    { x: 680, y: 280, width: 35, height: 35, type: 'ic' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-80">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          {/* Circuit trace gradient */}
          <linearGradient id="traceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 162, 255, 0.1)" />
            <stop offset="30%" stopColor="rgba(0, 162, 255, 0.8)" />
            <stop offset="70%" stopColor="rgba(0, 162, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(0, 162, 255, 0.1)" />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="circuitGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Via pattern */}
          <radialGradient id="viaGradient">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="50%" stopColor="rgba(0, 162, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 162, 255, 0.9)" />
          </radialGradient>
          
          {/* Pad pattern */}
          <radialGradient id="padGradient">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="60%" stopColor="rgba(0, 162, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(0, 162, 255, 0.8)" />
          </radialGradient>
        </defs>

        {/* Render LEFT + RIGHT (mirrored) groups */}
        {["left", "right"].map((side, idxSide) => {
          const isMirror = idxSide === 1;
          const transform = isMirror ? `translate(${svgWidth},0) scale(-1 1)` : undefined;
          const keyPrefix = isMirror ? "m-" : "";

          return (
            <g key={side} transform={transform}>
              {/* Horizontal traces */}
              <g filter="url(#circuitGlow)">
                {horizontalTraces.map((trace, idx) => (
                  <motion.path
                    key={`${keyPrefix}h-${idx}`}
                    d={trace.path}
                    fill="none"
                    stroke="url(#traceGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
                    transition={{
                      pathLength: { duration: 3, delay: idx * 0.2 },
                      opacity: { duration: 4, delay: idx * 0.3, repeat: Infinity, repeatType: "reverse" }
                    }}
                  />
                ))}
              </g>

              {/* Vertical traces */}
              <g filter="url(#circuitGlow)">
                {verticalTraces.map((trace, idx) => (
                  <motion.path
                    key={`${keyPrefix}v-${idx}`}
                    d={trace.path}
                    fill="none"
                    stroke="url(#traceGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
                    transition={{
                      pathLength: { duration: 3, delay: idx * 0.3 + 1 },
                      opacity: { duration: 5, delay: idx * 0.4, repeat: Infinity, repeatType: "reverse" }
                    }}
                  />
                ))}
              </g>

              {/* Connection points */}
              <g>
                {connectionPoints.map((point, i) => (
                  <motion.g key={`${keyPrefix}pt-${i}`}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={point.type === 'via' ? '3' : '4'}
                      fill={point.type === 'via' ? 'url(#viaGradient)' : 'url(#padGradient)'}
                      stroke="rgba(0, 162, 255, 0.5)"
                      strokeWidth="0.5"
                    />
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r="8"
                      fill="none"
                      stroke="rgba(0, 162, 255, 0.3)"
                      strokeWidth="1"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.5, 0], opacity: [0, 0.6, 0] }}
                      transition={{ duration: 3, delay: i * 0.1, repeat: Infinity, ease: 'easeOut' }}
                    />
                  </motion.g>
                ))}
              </g>

              {/* Components */}
              <g stroke="rgba(0, 162, 255, 0.4)" strokeWidth="1" fill="none">
                {components.map((comp, i) => (
                  <motion.g key={`${keyPrefix}comp-${i}`}>
                    <rect
                      x={comp.x}
                      y={comp.y}
                      width={comp.width}
                      height={comp.height}
                      rx={comp.type === 'ic' ? '2' : '1'}
                      fill="rgba(0, 162, 255, 0.05)"
                      stroke="rgba(0, 162, 255, 0.4)"
                      strokeWidth="1"
                    />
                    {comp.type === 'ic' && (
                      <g>
                        {[...Array(Math.floor(comp.width / 10))].map((_, pinIdx) => (
                          <g key={`${keyPrefix}pin-${i}-${pinIdx}`}>
                            <rect x={comp.x + 5 + pinIdx * 10} y={comp.y - 2} width="3" height="4" fill="rgba(0, 162, 255, 0.6)" />
                            <rect x={comp.x + 5 + pinIdx * 10} y={comp.y + comp.height - 2} width="3" height="4" fill="rgba(0, 162, 255, 0.6)" />
                          </g>
                        ))}
                      </g>
                    )}
                    <text
                      x={comp.x + comp.width / 2}
                      y={comp.y + comp.height / 2 + 3}
                      textAnchor="middle"
                      fontSize="8"
                      fill="rgba(0, 162, 255, 0.6)"
                      fontFamily="monospace">
                      {comp.type === 'ic' ? 'IC' : comp.type === 'resistor' ? 'R' : 'C'}
                    </text>
                  </motion.g>
                ))}
              </g>

              {/* Data-flow animation on first three traces */}
              <g>
                {horizontalTraces.slice(0, 3).map((trace, idx) => (
                  <motion.circle
                    key={`${keyPrefix}flow-${idx}`}
                    r="2"
                    fill="rgba(0, 255, 255, 0.8)"
                    filter="url(#circuitGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, delay: idx * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <animateMotion dur="4s" repeatCount="indefinite" begin={`${idx * 0.7}s`}>
                      <mpath href={`#trace-${idx}`} />
                    </animateMotion>
                  </motion.circle>
                ))}
              </g>
            </g>
          );
        })}

        {/* Hidden paths for animation */}
        <defs>
          {horizontalTraces.slice(0, 3).map((trace, idx) => (
            <path key={`trace-${idx}`} id={`trace-${idx}`} d={trace.path} fill="none" stroke="none" />
          ))}
        </defs>
      </svg>
    </div>
  );
};

// Enhanced scanning lines effect
const ScanningLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(2)].map((_, i) => (
      <motion.div 
        key={i}
        className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        style={{
          top: `${15 + i * 35}%`,
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3)'
        }}
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ 
          x: '100%', 
          opacity: [0, 0.8, 0.8, 0] 
        }}
        transition={{
          x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          delay: i * 3
        }}
      />
    ))}
  </div>
);

export default BackgroundPattern;

