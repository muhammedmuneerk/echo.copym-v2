import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FloatingNavigation - A reusable floating navigation component
 * 
 * @param {Object} props
 * @param {Array} props.sections - Array of section objects with id and title
 * @param {number} props.activeSection - Index of the currently active section
 * @param {function} props.onSectionChange - Optional callback when section changes
 * @param {boolean} props.hideOnMobile - Whether to hide on mobile devices (default: true)
 * @param {boolean} props.hideOnFirstSection - Whether to hide when first section is active (default: true)
 * @param {Object} props.style - Optional additional styles for the container
 */
const FloatingNavigation = ({
  sections,
  activeSection,
  onSectionChange,
  hideOnMobile = true,
  hideOnFirstSection = true,
  style = {}
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Hide conditions
  const shouldHide = (isMobile && hideOnMobile) || (hideOnFirstSection && activeSection === 0);
  
  const handleClick = (index, id) => {
    if (onSectionChange) {
      onSectionChange(index);
    }
  };
  
  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.div
          key="floating-nav"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          style={{
            position: "fixed",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            padding: "8px",
            borderRadius: "16px",
            backgroundColor: "rgba(18, 19, 26, 0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            zIndex: 100,
            ...style
          }}
        >
          {sections.map((section, index) => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(index, section.id);
                // Smooth scroll to section
                document.getElementById(section.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center transition-all duration-300 no-underline"
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                margin: "0 4px",
                backgroundColor: activeSection === index ? "rgba(0, 255, 133, 0.2)" : "transparent",
              }}
            >
              <span 
                className="text-xs font-medium transition-colors duration-300"
                style={{
                  fontWeight: activeSection === index ? 600 : 400,
                  color: activeSection === index ? "#00ff85" : "rgba(255, 255, 255, 0.7)",
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                {section.title}
              </span>
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNavigation;

  {/* Floating Navigation --> EXAMPLE USAGE */}
  // <FloatingNavigation
  //   sections={sections}
  //   activeSection={activeSection}
  //   onSectionChange={handleSectionChange}
  //   hideOnFirstSection={false} // Show even on first section
  //   hideOnMobile={true} // Show on mobile
  //   style={{ bottom: "20px" }} // Custom positioning
  // />;