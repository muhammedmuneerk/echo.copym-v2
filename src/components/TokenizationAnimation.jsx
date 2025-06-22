import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Modern Asset Icons with improved design
const AssetIcons = {
  RealEstate: ({ size = 20, color = "#3B82F6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path 
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      <path 
        d="M9 22V12h6v10" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  ),
  Finance: ({ size = 20, color = "#10B981" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path 
        d="M12 2L2 7l10 5 10-5-10-5z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill={`${color}20`}
      />
      <path 
        d="M2 17l10 5 10-5M2 12l10 5 10-5" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  ),
  Commodities: ({ size = 20, color = "#F59E0B" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth="2" 
        fill={`${color}20`}
      />
      <path 
        d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  ),
  Technology: ({ size = 20, color = "#8B5CF6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect 
        x="2" 
        y="3" 
        width="20" 
        height="14" 
        rx="2" 
        ry="2" 
        stroke={color} 
        strokeWidth="2"
        fill={`${color}20`}
      />
      <line 
        x1="8" 
        y1="21" 
        x2="16" 
        y2="21" 
        stroke={color} 
        strokeWidth="2"
      />
      <line 
        x1="12" 
        y1="17" 
        x2="12" 
        y2="21" 
        stroke={color} 
        strokeWidth="2"
      />
    </svg>
  ),
  Art: ({ size = 20, color = "#EC4899" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect 
        x="3" 
        y="3" 
        width="18" 
        height="18" 
        rx="2" 
        ry="2" 
        stroke={color} 
        strokeWidth="2" 
        fill={`${color}20`}
      />
      <circle cx="8.5" cy="8.5" r="1.5" fill={color}/>
      <path 
        d="M21 15l-5-5L5 21" 
        stroke={color} 
        strokeWidth="2"
      />
    </svg>
  ),
  Energy: ({ size = 20, color = "#06B6D4" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path 
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill={`${color}20`}
      />
    </svg>
  )
};

// Floating Token Component
const FloatingToken = ({ 
  startPos, 
  endPos, 
  delay = 0, 
  color = "#10B981", 
  duration = 2,
  onComplete 
}) => (
  <motion.div
    initial={{ 
      x: startPos.x, 
      y: startPos.y, 
      scale: 0, 
      opacity: 0 
    }}
    animate={{ 
      x: endPos.x, 
      y: endPos.y, 
      scale: [0, 1.2, 1], 
      opacity: [0, 1, 0.8] 
    }}
    transition={{ 
      duration, 
      delay,
      ease: "easeInOut"
    }}
    onAnimationComplete={onComplete}
    className="absolute w-2 h-2 rounded-full"
    style={{
      background: `radial-gradient(circle, ${color} 0%, ${color}80 100%)`,
      boxShadow: `0 0 8px ${color}60`,
    }}
  />
);

// Investor Node Component
const InvestorNode = ({ x, y, delay = 0, index, total }) => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];
  const color = colors[index % colors.length];
  
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className="absolute w-8 h-8 rounded-full flex items-center justify-center"
      style={{ 
        left: x - 16, 
        top: y - 16,
        background: `linear-gradient(135deg, ${color}40, ${color}20)`,
        border: `2px solid ${color}`,
        boxShadow: `0 0 15px ${color}30`
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-4 h-4 rounded-full"
        style={{ background: `radial-gradient(circle, ${color}, ${color}80)` }}
      />
    </motion.div>
  );
};

// Connection Line Component
const ConnectionLine = ({ start, end, delay = 0, color = "#10B981" }) => (
  <motion.line
    x1={start.x}
    y1={start.y}
    x2={end.x}
    y2={end.y}
    stroke={`${color}60`}
    strokeWidth="1.5"
    strokeDasharray="3,3"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.6 }}
    transition={{ duration: 1.5, delay, ease: "easeInOut" }}
  />
);

const TokenizationAnimation = ({ isMobile = false }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [activeTokens, setActiveTokens] = useState([]);
  const [showConnections, setShowConnections] = useState(false);

  // Compact sizing for better fit
  const centerX = isMobile ? 160 : 200;
  const centerY = isMobile ? 160 : 200;
  const radius = isMobile ? 80 : 100;

  // Asset configuration
  const assets = [
    { icon: AssetIcons.RealEstate, color: "#3B82F6", name: "Real Estate" },
    { icon: AssetIcons.Finance, color: "#10B981", name: "Finance" },
    { icon: AssetIcons.Commodities, color: "#F59E0B", name: "Commodities" },
    { icon: AssetIcons.Technology, color: "#8B5CF6", name: "Technology" },
    { icon: AssetIcons.Art, color: "#EC4899", name: "Art" },
    { icon: AssetIcons.Energy, color: "#06B6D4", name: "Energy" }
  ];

  // Calculate positions
  const assetPositions = assets.map((_, index) => {
    const angle = (index * 360) / assets.length;
    const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  });

  const investorPositions = Array.from({ length: 6 }, (_, index) => {
    const angle = (index * 360) / 6 + 30; // Offset for better positioning
    const investorRadius = radius + (isMobile ? 60 : 75);
    const x = centerX + investorRadius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + investorRadius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  });

  // Animation sequence
  useEffect(() => {
    const sequence = [
      { delay: 0, action: () => setAnimationPhase(1) }, // Show assets
      { delay: 1500, action: () => setAnimationPhase(2) }, // Start tokenization
      { delay: 3000, action: () => setAnimationPhase(3) }, // Show investors
      { delay: 4500, action: () => setShowConnections(true) }, // Show network
      { delay: 7000, action: () => { // Reset
        setAnimationPhase(0);
        setActiveTokens([]);
        setShowConnections(false);
      }},
    ];

    const timeouts = sequence.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Generate flowing tokens
  useEffect(() => {
    if (animationPhase === 2) {
      const tokenGenerationInterval = setInterval(() => {
        const assetIndex = Math.floor(Math.random() * assets.length);
        const investorIndex = Math.floor(Math.random() * investorPositions.length);
        const tokenId = Date.now() + Math.random();

        setActiveTokens(prev => [...prev, {
          id: tokenId,
          startPos: assetPositions[assetIndex],
          endPos: investorPositions[investorIndex],
          color: assets[assetIndex].color,
          delay: 0
        }]);

        // Remove token after animation
        setTimeout(() => {
          setActiveTokens(prev => prev.filter(token => token.id !== tokenId));
        }, 2500);
      }, 400);

      return () => clearInterval(tokenGenerationInterval);
    }
  }, [animationPhase, assetPositions, investorPositions, assets]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated rings */}
        {[1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-emerald-400/20"
            style={{
              width: radius * 2 * ring * 0.5,
              height: radius * 2 * ring * 0.5,
              left: centerX - (radius * ring * 0.5),
              top: centerY - (radius * ring * 0.5),
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: ring * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Central glow */}
        <motion.div
          className="absolute rounded-full bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 blur-xl"
          style={{
            width: isMobile ? 60 : 80,
            height: isMobile ? 60 : 80,
            left: centerX - (isMobile ? 30 : 40),
            top: centerY - (isMobile ? 30 : 40),
          }}
          animate={{
            scale: animationPhase >= 2 ? [1, 1.3, 1] : 1,
            opacity: animationPhase >= 1 ? [0.5, 0.8, 0.5] : 0
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Central COPYM Hub */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: animationPhase >= 1 ? 1 : 0,
          opacity: animationPhase >= 1 ? 1 : 0,
          rotate: animationPhase >= 2 ? 360 : 0
        }}
        transition={{ 
          scale: { duration: 1 },
          opacity: { duration: 1 },
          
        }}
        className="absolute z-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-2xl"
        style={{
          width: isMobile ? 48 : 60,
          height: isMobile ? 48 : 60,
          left: centerX - (isMobile ? 24 : 30),
          top: centerY - (isMobile ? 24 : 30),
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)'
        }}
      >
        <img
          src="/assets/copym/logo-icon.png"
          alt="COPYM"
          className={`${isMobile ? "w-10 h-10" : "w-15 h-15"} filter brightness-0 invert m-2 p-2`}
        />
      </motion.div>

      {/* Asset Nodes */}
      {assets.map((asset, index) => (
        <motion.div
          key={asset.name}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: animationPhase >= 1 ? 1 : 0,
            opacity: animationPhase >= 1 ? 1 : 0,
            y: animationPhase >= 2 ? [0, -3, 0] : 0
          }}
          transition={{ 
            scale: { duration: 0.8, delay: index * 0.1 },
            opacity: { duration: 0.8, delay: index * 0.1 },
            y: { duration: 2, repeat: Infinity, delay: index * 0.3 }
          }}
          className="absolute z-10 rounded-xl backdrop-blur-sm flex items-center justify-center"
          style={{
            width: isMobile ? 36 : 44,
            height: isMobile ? 36 : 44,
            left: assetPositions[index].x - (isMobile ? 18 : 22),
            top: assetPositions[index].y - (isMobile ? 18 : 22),
            background: `linear-gradient(135deg, ${asset.color}20, ${asset.color}10)`,
            border: `2px solid ${asset.color}`,
            boxShadow: `0 0 15px ${asset.color}40`
          }}
        >
          <asset.icon 
            size={isMobile ? 16 : 18} 
            color={asset.color} 
          />
        </motion.div>
      ))}

      {/* Energy Beams */}
      {animationPhase >= 2 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
          {assets.map((asset, index) => (
            <motion.line
              key={`beam-${index}`}
              x1={assetPositions[index].x}
              y1={assetPositions[index].y}
              x2={centerX}
              y2={centerY}
              stroke={`url(#gradient-${index})`}
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Gradients for beams */}
          <defs>
            {assets.map((asset, index) => (
              <linearGradient key={index} id={`gradient-${index}`}>
                <stop offset="0%" stopColor={asset.color} stopOpacity="0" />
                <stop offset="50%" stopColor={asset.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
              </linearGradient>
            ))}
          </defs>
        </svg>
      )}

      {/* Floating Tokens */}
      <AnimatePresence>
        {activeTokens.map((token) => (
          <FloatingToken
            key={token.id}
            startPos={token.startPos}
            endPos={token.endPos}
            color={token.color}
            delay={token.delay}
          />
        ))}
      </AnimatePresence>

      {/* Investor Network */}
      {animationPhase >= 3 && investorPositions.map((pos, index) => (
        <InvestorNode
          key={`investor-${index}`}
          x={pos.x}
          y={pos.y}
          delay={index * 0.1}
          index={index}
          total={investorPositions.length}
        />
      ))}

      {/* Network Connections */}
      {showConnections && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {investorPositions.map((pos, index) => 
            investorPositions.slice(index + 1, index + 3).map((nextPos, nextIndex) => (
              <ConnectionLine
                key={`connection-${index}-${nextIndex}`}
                start={pos}
                end={nextPos}
                delay={index * 0.1}
                color="#10B981"
              />
            ))
          )}
        </svg>
      )}

      {/* Floating Data Particles */}
      {animationPhase >= 2 && [...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-60"
          style={{
            left: centerX + Math.random() * (radius * 1.5) - (radius * 0.75),
            top: centerY + Math.random() * (radius * 1.5) - (radius * 0.75),
          }}
          animate={{
            x: [0, Math.random() * 30 - 15],
            y: [0, Math.random() * 30 - 15],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default TokenizationAnimation;