import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassMorphismCard, InteractiveTimeline } from "./UIComponents";
import { Typography, Box } from "@mui/material";
import GradientLetters from "../../components/GradientLetters";

// Step feature icons
const featureIcons = {
  documentation: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3v4a1 1 0 001 1h4M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  verification: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12l2 2 4-4m5.618-4.016a11.955 11.955 0 01-2.622 7.655c-1.552 2.022-3.547 3.715-5.14 4.59-1.594-.875-3.589-2.568-5.14-4.59a11.955 11.955 0 01-2.622-7.655C5.094 4.95 8.65 3 12.004 3c3.354 0 6.91 1.95 6.91 6.984z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  compliance: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 14l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  framework: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0l-4-4M5 21H3m2 0l4-4M12 3v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  template: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 21V5a2 2 0 012-2h12a2 2 0 012 2v16M4 21L8 17H16L20 21M4 21H20M12 11V3M12 11L8 7M12 11L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  selection: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5zM5 12h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  governance: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  portal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 6H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-9 0V5a2 2 0 012-2h10a2 2 0 012 2v1m-4 15v-4m-4 0l4 4m-4 0l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  payment: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 002 2h2a2 2 0 002-2M3 11h18M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  pool: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7v10m0-10C5.5 5 7 4 12 4c5 0 6.5 1 8 3m-16 0c1.5 2 3 3 8 3s6.5-1 8-3m0 0v10m0-10c-1.5 2-3 3-8 3s-6.5-1-8-3m16 10c-1.5 2-3 3-8 3s-6.5-1-8-3m16-10c-1.5-2-3-3-8-3s-6.5 1-8 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3H3v7h7V3zM21 3h-7v7h7V3zM21 14h-7v7h7v-7zM10 14H3v7h7v-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  communications: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  monitoring: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

// Tokenization journey steps data
const tokenizationSteps = [
  {
    label: "Asset Registration",
    description: "Register your physical asset with comprehensive documentation and validation.",
    features: [
      { text: "Ownership verification", icon: "verification" },
      { text: "Asset appraisal", icon: "documentation" },
      { text: "Documentation upload", icon: "documentation" },
      { text: "KYC/AML compliance", icon: "compliance" },
      { text: "Jurisdictional framework selection", icon: "framework" },
    ],
    color: "#00ff85",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    label: "Legal Structure",
    description: "Apply the appropriate legal framework based on your asset class and jurisdiction.",
    features: [
      { text: "Automated legal templates", icon: "template" },
      { text: "Compliance checks", icon: "compliance" },
      { text: "Regulatory reporting setup", icon: "documentation" },
      { text: "Investor qualification", icon: "verification" },
      { text: "Disclaimer and disclosure generation", icon: "documentation" },
    ],
    color: "#00e676",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    label: "Smart Contract",
    description: "Deploy secure, audited smart contracts on your chosen blockchain.",
    features: [
      { text: "Token standard selection", icon: "selection" },
      { text: "Configurable token parameters", icon: "selection" },
      { text: "Multi-chain deployment options", icon: "selection" },
      { text: "Automated contract verification", icon: "verification" },
      { text: "On-chain governance setup", icon: "governance" },
    ],
    color: "#00cc66",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7h-9m3-3l-3 3 3 3M4 17h9m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    label: "Token Distribution",
    description: "Distribute tokens through public or private offerings.",
    features: [
      { text: "Customizable offering structures", icon: "selection" },
      { text: "Investor onboarding portal", icon: "portal" },
      { text: "Payment processing", icon: "payment" },
      { text: "Vesting schedules", icon: "monitoring" },
      { text: "Distribution automation", icon: "governance" },
    ],
    color: "#00ff85",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3H5a2 2 0 00-2 2v14a2 2 0 002 2h3m4-18h3a2 2 0 012 2v14a2 2 0 01-2 2h-3M16 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    label: "Market",
    description: "Enable trading of your tokenized assets.",
    features: [
      { text: "Built-in exchange mechanism", icon: "governance" },
      { text: "External exchange integration", icon: "portal" },
      { text: "Liquidity pool setup", icon: "pool" },
      { text: "OTC trading capabilities", icon: "payment" },
      { text: "Market data analytics", icon: "dashboard" },
    ],
    color: "#00e676",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    label: "Management",
    description: "Manage your tokenized asset with governance tools and reporting.",
    features: [
      { text: "Dividend/distribution automation", icon: "payment" },
      { text: "Governance proposal system", icon: "governance" },
      { text: "Reporting dashboard", icon: "dashboard" },
      { text: "Investor communications", icon: "communications" },
      { text: "Compliance monitoring", icon: "monitoring" },
    ],
    color: "#00cc66",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8c-2.68 0-4.5-1.12-4.5-2.5S9.32 3 12 3s4.5 1.12 4.5 2.5c0 1.23-1.53 2.26-3.86 2.47M19 10v4m-4-2H5m9 6.5c0 1.38-1.82 2.5-4.5 2.5S5 19.88 5 18.5 6.82 16 9.5 16s4.5 1.12 4.5 2.5zm-4.5-7c-2.68 0-4.5 1.12-4.5 2.5S6.82 16 9.5 16 14 14.88 14 13.5 12.18 11 9.5 11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
];

/**
 * TokenizationJourney Component
 * A reusable component that displays the tokenization journey process
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Section ID for navigation
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.customSteps - Optional custom steps data to override default
 * @returns {JSX.Element} TokenizationJourney component
 */
const TokenizationJourney = ({ id = "journey", className = "", customSteps = null }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = customSteps || tokenizationSteps;
  
  // Next/Previous step handlers
  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  
  return (
    <section id={id} className={`section journey-section ${className}`}>
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
                    text="Complete Tokenization Journey"
                    keyPrefix="lg-line1"
                  />
                </Box>
                {/* Small & Medium Screens (2 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Complete Tokenization"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Journey"
                    keyPrefix="sm-line1"
                  />
                </Box>
              </Box>
            </Typography>
        
        <p className="section-description">
          CopyM guides you through every step of the tokenization process with
          our comprehensive platform
        </p>
      </motion.div>
      
      <div className="journey-container">
        <InteractiveTimeline steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="journey-detail"
          >
            <GlassMorphismCard color={`rgba(0, 255, 133, ${activeStep % 2 === 0 ? '0.1' : '0.05'})`}>
              <div className="step-content">
                <div className="step-icon" style={{ color: steps[activeStep].color }}>
                  {steps[activeStep].icon}
                </div>
                
                <div className="step-details">
                  <div className="step-header">
                    <h3 className="step-title" style={{ color: steps[activeStep].color }}>
                      {steps[activeStep].label}
                    </h3>
                    
                    <p className="step-description">
                      {steps[activeStep].description}
                    </p>
                  </div>
                  
                  <div className="feature-grid">
                    {steps[activeStep].features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{
                          backgroundColor: `rgba(0, 255, 133, 0.1)`,
                          y: -5,
                          boxShadow: `0 10px 25px -5px rgba(0, 255, 133, 0.2)`
                        }}
                        className="feature-item"
                      >
                        <span className="feature-icon" style={{ color: steps[activeStep].color }}>
                          {featureIcons[feature.icon] || (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                            </svg>
                          )}
                        </span>
                        <span className="feature-text">
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="step-navigation">
                  <button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    className={`nav-button ${activeStep === 0 ? 'disabled' : ''}`}
                    aria-label="Previous step"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={activeStep === steps.length - 1}
                    className={`nav-button ${activeStep === steps.length - 1 ? 'disabled' : ''}`}
                    aria-label="Next step"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </GlassMorphismCard>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <style jsx>{`
        .journey-section {
          min-height: 100vh;
          padding: 80px 5% 100px;
          position: relative;
        }
        
        .journey-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .journey-detail {
          margin-top: 40px;
        }
        
        .step-content {
          display: flex;
          align-items: flex-start;
          gap: 24px;
        }
        
        @media (max-width: 768px) {
          .step-content {
            flex-direction: column;
          }
        }
        
        .step-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(0, 255, 133, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--color, #00ff85);
        }
        
        .step-details {
          flex: 1;
        }
        
        .step-header {
          margin-bottom: 16px;
        }
        
        .step-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #00ff85;
          text-shadow: 0 0 10px rgba(0, 255, 133, 0.5);
        }
        
        .step-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }
        
        @media (max-width: 768px) {
          .feature-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          }
        }
        
        .feature-item {
          background: rgba(18, 19, 26, 0.7);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
          min-height: 62px;
        }
        
        .feature-icon {
          display: inline-flex;
          color: var(--color, #00ff85);
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
        }
        
        .feature-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.85rem;
        }
        
        .step-navigation {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        @media (max-width: 768px) {
          .step-navigation {
            flex-direction: row;
            justify-content: center;
            margin-top: 16px;
          }
        }
        
        .nav-button {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .nav-button:hover:not(.disabled) {
          background-color: rgba(0, 255, 133, 0.1);
          color: #00ff85;
        }
        
        .nav-button.disabled {
          background-color: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #00ff85, #00b359);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          display: inline-block;
        }
      `}</style>
    </section>
  );
};

export default TokenizationJourney;