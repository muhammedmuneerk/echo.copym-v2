import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// CustomCursor component removed

/**
 * GlassMorphismCard component
 * Creates a card with glass morphism effect
 */
export const GlassMorphismCard = ({ children, depth = 0.5, color = "rgba(0, 255, 133, 0.1)", border = true, className = "" }) => {
  return (
    <div 
      className={`glass-card ${className}`}
      style={{
        backgroundColor: color,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: `0 8px 32px rgba(0, 0, 0, ${depth})`,
        border: border ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
        height: className.includes("h-full") ? "100%" : "auto",
      }}
    >
      <div 
        className="glass-shine" 
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          right: "-50%",
          bottom: "-50%",
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%)",
          transform: "rotate(45deg)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      {children}
    </div>
  );
};

/**
 * MorphingButton component
 * Creates a button that morphs on hover/press states
 */
export const MorphingButton = ({ children, primary = false, onClick, disabled = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <motion.button
      initial={false}
      animate={{
        scale: isPressed ? 0.97 : isHovered ? 1.03 : 1,
        background: isPressed 
          ? primary ? "linear-gradient(135deg, #00cc66, #008040)" : "rgba(255, 255, 255, 0.08)" 
          : isHovered 
            ? primary ? "linear-gradient(135deg, #00ff85, #00cc66)" : "rgba(255, 255, 255, 0.12)"
            : primary ? "linear-gradient(135deg, #00ff85, #00b359)" : "rgba(255, 255, 255, 0.05)",
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 30
        }
      }}
      style={{
        border: "none",
        borderRadius: "12px",
        padding: primary ? "14px 28px" : "12px 24px",
        color: primary ? "#000" : "rgba(255, 255, 255, 0.9)",
        fontSize: primary ? "0.9rem" : "0.8rem",
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: primary 
          ? "0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px rgba(255, 255, 255, 0.1)" 
          : "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px rgba(255, 255, 255, 0.05)",
        transition: "box-shadow 0.3s ease",
        opacity: disabled ? 0.6 : 1,
        minWidth: "120px", // Add a minimum width to buttons
        whiteSpace: "nowrap",  // Prevent text wrapping
      }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px"
      }}>
        {children}
      </div>
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: isHovered && !disabled ? "100%" : "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
          zIndex: 1,
        }} 
      />
    </motion.button>
  );
};

/**
 * GradientText component
 * Creates text with gradient effect
 */
export const GradientText = ({ children, from = "#00ff85", to = "#00b359", className = "", element = "span", ...props }) => {
  const Component = element;
  
  return (
    <Component
      className={`gradient-text ${className}`}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
        display: "inline-block",
        ...props.style
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * InteractiveTimeline component
 * Creates an interactive timeline for navigation
 */
export const InteractiveTimeline = ({ steps, activeStep, setActiveStep }) => {
  const timelineRef = useRef(null);
  const [hoveredStep, setHoveredStep] = useState(null);
  
  useEffect(() => {
    // Scroll to active step in horizontal timeline
    if (timelineRef.current && activeStep !== null) {
      const stepElements = timelineRef.current.querySelectorAll('.timeline-step');
      if (stepElements[activeStep]) {
        const containerWidth = timelineRef.current.offsetWidth;
        const stepWidth = stepElements[activeStep].offsetWidth;
        const stepLeft = stepElements[activeStep].offsetLeft;
        
        const scrollPosition = stepLeft - (containerWidth / 2) + (stepWidth / 2);
        timelineRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeStep]);
  
  return (
    <div className="timeline-container" style={{ position: "relative", marginBottom: "40px" }}>
      <div 
        className="timeline-track" 
        style={{
          position: "absolute",
          top: "40px",
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "rgba(0, 255, 133, 0.2)",
          zIndex: 0
        }}
      >
        <motion.div 
          className="timeline-progress" 
          initial={{ width: 0 }}
          animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            background: "linear-gradient(90deg, #00ff85, #00cc66)",
            zIndex: 1
          }}
        />
      </div>
      
      <div 
        ref={timelineRef}
        className="timeline-steps" 
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: "20px 0",
          "&::-webkit-scrollbar": {
            display: "none"
          }
        }}
      >
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isPast = index < activeStep;
          
          return (
            <motion.div 
              key={step.label}
              className="timeline-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0 32px",
                cursor: "pointer",
                position: "relative",
                zIndex: 2
              }}
              onClick={() => setActiveStep(index)}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Step node */}
              <motion.div
                className="timeline-node"
                animate={{
                  scale: isActive || hoveredStep === index ? 1.2 : 1,
                  boxShadow: isActive || hoveredStep === index 
                    ? "0 0 20px rgba(0, 255, 133, 0.7)" 
                    : "0 0 5px rgba(0, 255, 133, 0.3)"
                }}
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: isActive || isPast 
                    ? `linear-gradient(135deg, ${step.color || "#00ff85"}, #00b359)` 
                    : "rgba(0, 255, 133, 0.2)",
                  marginBottom: "12px",
                  position: "relative",
                  zIndex: 3,
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  transition: "all 0.3s ease"
                }}
              >
                <motion.div
                  animate={{
                    opacity: isActive || hoveredStep === index ? 1 : 0,
                    scale: isActive || hoveredStep === index ? 1.5 : 1
                  }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    // background: "#fff",
                    // boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)"
                  }}
                />
              </motion.div>
              
              {/* Step label */}
              <motion.div
                animate={{
                  y: hoveredStep === index ? -5 : 0,
                  scale: isActive ? 1.1 : 1
                }}
                className="timeline-label"
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#00ff85" : "rgba(255, 255, 255, 0.7)",
                  textAlign: "center",
                  maxWidth: "120px",
                  transition: "all 0.3s ease"
                }}
              >
                {step.label}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * HorizontalScrollContainer component
 * Creates a scrollable horizontal container
 */
export const HorizontalScrollContainer = ({ children }) => {
  const containerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const handleMouseDown = (e) => {
    if (containerRef.current) {
      setIsScrolling(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };
  
  const handleMouseMove = (e) => {
    if (!isScrolling) return;
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  
  const handleMouseUp = () => {
    setIsScrolling(false);
  };
  
  const handleMouseLeave = () => {
    setIsScrolling(false);
  };
  
  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (containerRef.current) {
      setIsScrolling(true);
      setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };
  
  const handleTouchMove = (e) => {
    if (!isScrolling) return;
    if (containerRef.current) {
      const x = e.touches[0].pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  
  const handleTouchEnd = () => {
    setIsScrolling(false);
  };
  
  return (
    <div 
      ref={containerRef}
      className="horizontal-scroll-container"
      style={{
        display: "flex",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        scrollBehavior: "smooth",
        width: "100%",
        cursor: isScrolling ? "grabbing" : "grab",
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE/Edge
        WebkitScrollbar: { display: "none" }, // WebKit/Chrome/Safari
        padding: "20px 0", // Add some padding for better spacing
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};