import { useState, useEffect } from 'react';

/**
 * Custom hook to track active sections based on scroll position
 * 
 * @param {Array} sections - Array of section objects with id property
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - IntersectionObserver threshold (default: 0.5)
 * @param {string} options.rootMargin - IntersectionObserver rootMargin (default: '0px 0px -50% 0px')
 * @returns {number} - Index of the currently active section
 */
const useSectionObserver = (sections, options = {}) => {
  const {
    threshold = 0.3,
    rootMargin = '0px 0px -50% 0px' // This helps with better section detection
  } = options;
  
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Get section elements from the DOM
    const sectionElements = sections.map(section => 
      document.getElementById(section.id)
    ).filter(Boolean);

    if (sectionElements.length === 0) return;

    // Map to store which sections are currently intersecting
    const intersectingSections = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionIndex = sectionElements.findIndex(
          element => element === entry.target
        );
        
        if (sectionIndex !== -1) {
          if (entry.isIntersecting) {
            intersectingSections.set(sectionIndex, entry.intersectionRatio);
          } else {
            intersectingSections.delete(sectionIndex);
          }
        }
      });

      // Find the section with highest intersection ratio
      // If no sections are intersecting, keep the current active section
      if (intersectingSections.size > 0) {
        const mostVisibleSection = Array.from(intersectingSections.entries())
          .reduce((max, [index, ratio]) => 
            ratio > max.ratio ? { index, ratio } : max, 
            { index: 0, ratio: 0 }
          );
        
        setActiveSection(mostVisibleSection.index);
      }
    }, { 
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin 
    });
    
    // Observe all section elements
    sectionElements.forEach(element => observer.observe(element));
    
    // Cleanup function
    return () => {
      sectionElements.forEach(element => observer.unobserve(element));
    };
  }, [sections, threshold, rootMargin]);

  return activeSection;
};

export default useSectionObserver;