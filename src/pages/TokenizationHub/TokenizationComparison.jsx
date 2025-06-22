import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GlassMorphismCard, 
  MorphingButton, 
  GradientText
  // HorizontalScrollContainer removed from import
} from "./UIComponents";
import "./TokenizationHub.css";
import { Typography, Box } from "@mui/material";
import GradientLetters from "../../components/GradientLetters";



/**
 * ComparisonVisualization component
 * Creates a visual comparison chart
 */
const ComparisonVisualization = ({ data }) => {
  const features = data.map(item => item.feature);
  const copymValues = data.map(item => {
    switch (item.copym.status) {
      case "success": return 100;
      case "warning": return 60;
      case "error": return 30;
      default: return 50;
    }
  });
  
  const compAValues = data.map(item => {
    switch (item.competitorA.status) {
      case "success": return 100;
      case "warning": return 60;
      case "error": return 30;
      default: return 50;
    }
  });
  
  const compBValues = data.map(item => {
    switch (item.competitorB.status) {
      case "success": return 100;
      case "warning": return 60;
      case "error": return 30;
      default: return 50;
    }
  });
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchTimeout, setTouchTimeout] = useState(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (touchTimeout) clearTimeout(touchTimeout);
    };
  }, [touchTimeout]);
  
  useEffect(() => {
    // Start animation when component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleFeatureInteraction = (index) => {
    if (isMobile) {
      // For mobile/tablet, toggle on touch
      setSelectedFeature(selectedFeature === index ? null : index);
    } else {
      // For desktop, show on hover
      setSelectedFeature(index);
    }
  };
  
  const handleFeatureLeave = () => {
    if (!isMobile) {
      setSelectedFeature(null);
    }
  };
  
  return (
    <div className="comparison-visualization" style={{ position: "relative", height: isMobile ? "600px" : "480px", width: "100%" }}>
      <div className="comparison-legend" style={{ 
        display: "flex", 
        justifyContent: "center", 
        marginBottom: "20px",
        flexWrap: isMobile ? "wrap" : "nowrap",
        gap: isMobile ? "12px" : "0"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginRight: isMobile ? "0" : "20px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#00ff85", marginRight: "8px" }} />
          <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.8rem" }}>CopyM</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginRight: isMobile ? "0" : "20px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#a2a9b0", marginRight: "8px" }} />
          <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.8rem" }}>Competitor A</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#6a6a6a", marginRight: "8px" }} />
          <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.8rem" }}>Competitor B</span>
        </div>
      </div>
      
      <div className="chart-container" style={{ 
        height: isMobile ? "400px" : "300px", 
        display: "flex", 
        alignItems: "flex-end", 
        justifyContent: "space-around", 
        padding: "0 20px",
        overflowX: isMobile ? "auto" : "visible",
        scrollSnapType: isMobile ? "x mandatory" : "none",
        WebkitOverflowScrolling: "touch"
      }}>
        {features.map((feature, index) => (
          <div 
            key={feature}
            className="feature-group"
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              width: isMobile ? "200px" : `${100 / features.length}%`,
              minWidth: isMobile ? "200px" : "auto",
              scrollSnapAlign: isMobile ? "center" : "none",
              padding: isMobile ? "0 10px" : "0",
              cursor: isMobile ? "pointer" : "default"
            }}
            onMouseEnter={() => !isMobile && handleFeatureInteraction(index)}
            onMouseLeave={handleFeatureLeave}
            onClick={() => isMobile && handleFeatureInteraction(index)}
            onTouchStart={(e) => {
              e.preventDefault(); // Prevent double-tap zoom
              if (isMobile) {
                if (touchTimeout) clearTimeout(touchTimeout);
                const timeout = setTimeout(() => {
                  handleFeatureInteraction(index);
                }, 100);
                setTouchTimeout(timeout);
              }
            }}
          >
            <div style={{ display: "flex", height: "220px", alignItems: "flex-end", marginBottom: "16px" }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: isAnimating ? `${copymValues[index] * 2}px` : 0 }}
                transition={{ duration: 1, delay: index * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  width: isMobile ? "16px" : "20px",
                  backgroundColor: "#00ff85",
                  marginRight: "8px",
                  borderRadius: "4px 4px 0 0",
                  boxShadow: selectedFeature === index ? "0 0 15px rgba(0, 255, 133, 0.7)" : "none",
                  transition: "box-shadow 0.3s ease"
                }}
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: isAnimating ? `${compAValues[index] * 2}px` : 0 }}
                transition={{ duration: 1, delay: index * 0.2 + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  width: isMobile ? "16px" : "20px",
                  backgroundColor: "#a2a9b0",
                  marginRight: "8px",
                  borderRadius: "4px 4px 0 0",
                  boxShadow: selectedFeature === index ? "0 0 15px rgba(162, 169, 176, 0.7)" : "none",
                  transition: "box-shadow 0.3s ease"
                }}
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: isAnimating ? `${compBValues[index] * 2}px` : 0 }}
                transition={{ duration: 1, delay: index * 0.2 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  width: isMobile ? "16px" : "20px",
                  backgroundColor: "#6a6a6a",
                  borderRadius: "4px 4px 0 0",
                  boxShadow: selectedFeature === index ? "0 0 15px rgba(106, 106, 106, 0.7)" : "none",
                  transition: "box-shadow 0.3s ease"
                }}
              />
            </div>
            <div style={{ textAlign: "center", height: "40px" }}>
              <p style={{ 
                fontSize: isMobile ? "0.7rem" : "0.75rem", 
                color: selectedFeature === index ? "#fff" : "rgba(255, 255, 255, 0.7)",
                fontWeight: selectedFeature === index ? 600 : 400,
                transition: "all 0.3s ease"
              }}>
                {feature}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <AnimatePresence>
        {selectedFeature !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="feature-detail"
            style={{
              position: "absolute",
              top: isMobile ? "450px" : "350px",
              left: isMobile ? "10%" : "20%",
              transform: "translateX(0)",
              width: isMobile ? "80%" : "100%",
              maxWidth: "600px",
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "rgba(18, 19, 26, 0.9)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              zIndex: 10,
              pointerEvents: "auto"
            }}
          >
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, auto)",
              columnGap: "20px",
              rowGap: "10px",
              marginBottom: "8px"
            }}>
              <span style={{ color: "#00ff85", fontWeight: 600 }}>
                CopyM: {data[selectedFeature].copym.value}
              </span>
              <span style={{ color: "#a2a9b0" }}>
                Competitor A: {data[selectedFeature].competitorA.value}
              </span>
              <span style={{ color: "#6a6a6a" }}>
                Competitor B: {data[selectedFeature].competitorB.value}
              </span>
            </div>
            <p style={{ 
              color: "rgba(255, 255, 255, 0.8)", 
              fontSize: isMobile ? "0.8rem" : "0.85rem", 
              margin: 0,
              lineHeight: "1.4"
            }}>
              {data[selectedFeature].copym.detail}
            </p>
            {isMobile && (
              <button
                onClick={() => setSelectedFeature(null)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "none",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  padding: "4px"
                }}
              >
                ×
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Comparison data
const comparisonData = [
  {
    feature: "Multi-Chain Support",
    copym: { value: "Comprehensive", status: "success", detail: "Support for 20+ blockchain networks with cross-chain capabilities" },
    competitorA: { value: "Limited", status: "warning", detail: "Only 3 major blockchains supported" },
    competitorB: { value: "Single-chain", status: "error", detail: "Ethereum-only solution" },
  },
  {
    feature: "Compliance Framework",
    copym: { value: "Enterprise-grade", status: "success", detail: "Supports 40+ jurisdictions with automated compliance monitoring" },
    competitorA: { value: "Moderate", status: "warning", detail: "Manual compliance checks for major markets" },
    competitorB: { value: "Basic", status: "error", detail: "Limited to a single jurisdiction" },
  },
  {
    feature: "Asset Types",
    copym: { value: "Unlimited", status: "success", detail: "Any asset class with configurable parameters" },
    competitorA: { value: "Several", status: "warning", detail: "Limited to 4 predefined asset classes" },
    competitorB: { value: "Single focus", status: "error", detail: "Specialized for real estate only" },
  },
  {
    feature: "Token Standards",
    copym: { value: "Multiple", status: "success", detail: "ERC-20, ERC-721, ERC-1155, and custom standards" },
    competitorA: { value: "Basic", status: "warning", detail: "Only ERC-20 and ERC-721 support" },
    competitorB: { value: "Proprietary", status: "error", detail: "Non-standard token implementation" },
  },
  {
    feature: "Tokenization Speed",
    copym: { value: "Rapid", status: "success", detail: "48-hour average deployment time" },
    competitorA: { value: "Standard", status: "warning", detail: "2-week process" },
    competitorB: { value: "Lengthy", status: "error", detail: "4+ week implementation" },
  },
];



// Main TokenizationComparison component
const TokenizationComparison = ({ id = "comparison", className = "", }) => {

  return (
    <section id={id} className={`section comparison-section ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="section-header"
      >
        <Typography
          variant="h2"
          className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
        >
          <Box component="div" className="flex flex-wrap justify-center">
            {/* Large Screens (1 lines) */}
            <Box className="hidden lg:block">
              <GradientLetters
                text="How CopyM Compares"
                keyPrefix="lg-line1"
              />
            </Box>
            {/* Small & Medium Screens (2 lines) */}
            <Box className="block lg:hidden">
              <GradientLetters
                text="How CopyM Compares"
                keyPrefix="sm-line1"
              />
            </Box>
          </Box>
        </Typography>
        
        <p className="section-description">
          See why leading organizations choose CopyM for their tokenization needs
        </p>
      </motion.div>
      
      <div className="comparison-container">
        <GlassMorphismCard>
          <ComparisonVisualization data={comparisonData} />
        </GlassMorphismCard>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="comparison-feature"
        >
          <GlassMorphismCard color="rgba(0, 255, 133, 0.1)">
            <div className="feature-content">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div className="feature-details">
                <h3 className="feature-title">
                  Complete All-in-One Solution
                </h3>
                
                <p className="feature-description">
                  CopyM provides end-to-end tokenization infrastructure in one platform, eliminating 
                  the need to piece together multiple services. From legal structure to token 
                  distribution and management, all aspects of tokenization are covered.
                </p>
              </div>
            </div>
          </GlassMorphismCard>
        </motion.div>
      </div>
    </section>
  );
}

export default TokenizationComparison;