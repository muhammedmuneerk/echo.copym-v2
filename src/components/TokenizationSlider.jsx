import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Box, Grid, Typography } from "@mui/material";
import GradientLetters from "./GradientLetters";
import {
  AnimatedCardWrapper,
  InnerCardWrapper,
} from "../ui/AnimatedCardWrapper";

// Enhanced card data with additional fields
const cardData = [
  {
    id: "gold",
    image: "/assets/sliders/gold-slider.png",
    title: "Gold Tokenization",
    description: "Tokenized Gold for the Digital Age",
    detailText:
      "Access fractional ownership of gold assets with blockchain security and liquidity.",
    buttonText: "View Details",
    link: "/market/gold/",
    color: "from-amber-400 to-yellow-600",
    bgColor: "from-amber-900/20 to-yellow-900/20",
    borderColor: "#FFD700",
  },
  {
    id: "green",
    image: "/assets/sliders/green-slider.png",
    title: "Green Tokenization",
    description: "Sustainable ESG Integration",
    detailText:
      "Invest in green projects with transparent impact tracking and reporting.",
    buttonText: "View Details",
    link: "/green-tokenization",
    color: "from-emerald-400 to-green-600",
    bgColor: "from-emerald-900/20 to-green-900/20",
    borderColor: "#00FF85",
  },
  {
    id: "realestate",
    image: "/assets/sliders/realestate-slider.png",
    title: "Real Estate",
    description: "Real Estate Tokenization",
    detailText:
      "Fractional ownership of premium properties with global market access.",
    buttonText: "Explore",
    link: "/tokenization/real-estate/",
    color: "from-blue-400 to-indigo-600",
    bgColor: "from-blue-900/20 to-indigo-900/20",
    borderColor: "#4169E1",
  },
  {
    id: "art",
    image: "/assets/sliders/art-slider.png",
    title: "Art & Collectibles",
    description: "Art & Collectibles Tokenization",
    detailText:
      "Own fractions of museum-quality art and rare collectibles with provenance.",
    buttonText: "View Details",
    link: "/tokenization/art",
    color: "from-purple-400 to-pink-600",
    bgColor: "from-purple-900/20 to-pink-900/20",
    borderColor: "#8A2BE2",
  },
  {
    id: "commodities",
    image: "/assets/sliders/commodites-slider.png",
    title: "Commodities",
    description: "Commodities Tokenization",
    detailText:
      "Trade tokenized commodities with higher liquidity and lower fees.",
    buttonText: "View Details",
    link: "/tokenization/Commodities",
    color: "from-orange-400 to-red-600",
    bgColor: "from-orange-900/20 to-red-900/20",
    borderColor: "#FF4500",
  },
  {
    id: "carbon",
    image: "/assets/sliders/carboncredits-slider.png",
    title: "Carbon Credits",
    description: "Carbon Credits Tokenization",
    detailText:
      "Trade verified carbon offsets with transparent impact metrics.",
    buttonText: "View Details",
    link: "/tokenization/carbon-credits",
    color: "from-teal-400 to-cyan-600",
    bgColor: "from-teal-900/20 to-cyan-900/20",
    borderColor: "#00CED1",
  },
  {
    id: "equity",
    image: "/assets/sliders/privateequity-slider.png",
    title: "Private Equity",
    description: "Private Equity Tokenization",
    detailText:
      "Access institutional-grade private equity investments with lower minimums.",
    buttonText: "View Details",
    link: "/tokenization/private-equity",
    color: "from-gray-500 to-slate-700",
    bgColor: "from-gray-900/20 to-slate-900/20",
    borderColor: "#708090",
  },
  {
    id: "diverse",
    image: "/assets/sliders/otherassets-slider.png",
    title: "Alternative Assets",
    description: "Diverse Asset Tokenization",
    detailText:
      "Explore unique alternative assets with blockchain-powered ownership.",
    buttonText: "View Details",
    link: "/tokenization/other-assets",
    color: "from-violet-400 to-purple-600",
    bgColor: "from-violet-900/20 to-purple-900/20",
    borderColor: "#9400D3",
  },
];

const TokenizationSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [dragStartX, setDragStartX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const navigate = useNavigate();
  const autoplayRef = useRef(null);
  const controls = useAnimation();
  const sliderRef = useRef(null);

  // Handle autoplay
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [currentIndex, isPaused]);

  // Visual indicator for swipe
  useEffect(() => {
    if (swipeDirection === 'left') {
      controls.start({ x: -10, opacity: 0.8 }).then(() => {
        controls.start({ x: 0, opacity: 1 });
      });
    } else if (swipeDirection === 'right') {
      controls.start({ x: 10, opacity: 0.8 }).then(() => {
        controls.start({ x: 0, opacity: 1 });
      });
    }
  }, [swipeDirection, controls]);

  const nextSlide = () => {
    if (isAnimating) return;

    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;

    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // Handle swipe gestures
  const handleDragStart = (e) => {
    if (window.innerWidth > 640) return; // Only enable on small screens
    
    // Reset swipe direction
    setSwipeDirection(null);
    
    // For touch events
    if (e.touches && e.touches[0]) {
      setDragStartX(e.touches[0].clientX);
    } 
    // For mouse events
    else if (e.clientX) {
      setDragStartX(e.clientX);
    }
    
    // Pause autoplay during dragging
    setIsPaused(true);
  };

  const handleDragEnd = (e) => {
    if (window.innerWidth > 640) return; // Only enable on small screens
    
    let endX;
    
    // For touch events
    if (e.changedTouches && e.changedTouches[0]) {
      endX = e.changedTouches[0].clientX;
    } 
    // For mouse events
    else if (e.clientX) {
      endX = e.clientX;
    } else {
      // Resume autoplay if we can't determine drag end
      setIsPaused(false);
      return;
    }
    
    const diffX = endX - dragStartX;
    const threshold = 50; // Minimum swipe distance
    
    if (diffX > threshold) {
      // Swiped right - go to previous slide
      setSwipeDirection('right');
      prevSlide();
    } else if (diffX < -threshold) {
      // Swiped left - go to next slide
      setSwipeDirection('left');
      nextSlide();
    }
    
    // Resume autoplay after dragging
    setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  // Calculate positions for each card
  const getCardStyle = (index) => {
    const diff = (index - currentIndex + cardData.length) % cardData.length;

    // Main card (current)
    if (diff === 0) {
      return {
        zIndex: 30,
        scale: 1,
        opacity: 1,
        x: 0,
        rotateY: 0,
      };
    }
    // Card immediately to the right
    else if (diff === 1) {
      return {
        zIndex: 20,
        scale: 0.85,
        opacity: 0.7,
        x: "40%",
        rotateY: 15,
      };
    }
    // Card two positions to the right
    else if (diff === 2) {
      return {
        zIndex: 10,
        scale: 0.7,
        opacity: 0.5,
        x: "70%",
        rotateY: 30,
      };
    }
    // Card immediately to the left
    else if (diff === cardData.length - 1) {
      return {
        zIndex: 20,
        scale: 0.85,
        opacity: 0.7,
        x: "-40%",
        rotateY: -15,
      };
    }
    // Card two positions to the left
    else if (diff === cardData.length - 2) {
      return {
        zIndex: 10,
        scale: 0.7,
        opacity: 0.5,
        x: "-70%",
        rotateY: -30,
      };
    }
    // Other cards (hidden)
    else {
      return {
        zIndex: 5,
        scale: 0.5,
        opacity: 0,
        x: diff < cardData.length / 2 ? "100%" : "-100%",
        rotateY: diff < cardData.length / 2 ? 45 : -45,
      };
    }
  };

  // Calculate indicator positions
  const getIndicatorStyle = (index) => {
    const isActive = index === currentIndex;
    return {
      scale: isActive ? 1.5 : 1,
      opacity: isActive ? 1 : 0.5,
      backgroundColor: isActive
        ? "rgb(255, 255, 255)"
        : "rgba(255, 255, 255, 0.3)",
    };
  };

  return (
    <div className="max-w-full px-4 h-full overflow-hidden rounded-2xl">
      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
           <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl mb-4 text-center"
            >
              <Box
                component="div"
                className="flex flex-col items-center justify-center leading-snug max-w-xs sm:max-w-xl lg:max-w-4xl mx-auto"
              >
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <Box component="div" className="flex flex-wrap justify-center">
                    <GradientLetters text="Tokenization Ecosystem" keyPrefix="lg-line1" />
                  </Box>
                </Box>

                {/* Small & Medium Screens (2 lines) */}
                <Box className="block lg:hidden">
                  <Box component="div" className="flex flex-wrap justify-center">
                    <GradientLetters text="Tokenization Ecosystem" keyPrefix="sm-line1" />
                  </Box>
                </Box>
              </Box>
            </Typography>

          <p className="text-white max-w-2xl mx-auto text-lg">
            Discover our premium tokenization solutions across diverse asset
            classes
          </p>
          
          {/* Mobile swipe instruction - only show on small screens */}
          <p className="text-gray-400 text-sm mt-2 block sm:hidden">
            Swipe left or right to navigate
          </p>
        </motion.div>

        {/* Main slider area */}
        <motion.div
          ref={sliderRef}
          className="relative h-[550px] perspective-1000"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          animate={controls}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Visual swipe feedback indicator */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-50 sm:hidden"
            initial={{ opacity: 0 }}
            animate={controls}
          />

          {/* Cards container */}
          <div className="relative h-full flex items-center justify-center">
            {cardData.map((card, index) => {
              const diff = (index - currentIndex + cardData.length) % cardData.length;
              // Determine if this is a side card (immediately to the left or right)
              const isSideCard = diff === 1 || diff === cardData.length - 1;
              
              return (
                <motion.div
                  key={card.id}
                  className="absolute w-full max-w-lg h-[480px] cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={getCardStyle(index)}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 1,
                  }}
                  onClick={() => {
                    if (index === currentIndex) {
                      navigate(card.link);
                    } else {
                      // If clicking a side card, make it the active card
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }
                  }}
                  // Trigger slide on hover for side cards (desktop only)
                  onMouseEnter={() => {
                    // Only slide on hover for big screens
                    if (window.innerWidth >= 640) {
                      if (diff === 1) { // Right card
                        nextSlide();
                      } else if (diff === cardData.length - 1) { // Left card
                        prevSlide();
                      }
                    }
                  }}
                >
                  <InnerCardWrapper color={card.borderColor}>
                    {/* Glass reflection effect */}
                    <div className="glass-reflection"></div>

                    {/* Card content */}
                    <div className="card-content">
                      {/* Card header/image section */}
                      <div className="relative h-60 overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-30 mix-blend-overlay`}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>

                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        />

                        {/* Label badge */}
                        <div
                          className={`absolute top-6 left-6 py-1.5 px-4 rounded-full bg-gradient-to-r ${card.color} text-white text-sm font-medium z-20 shadow-lg`}
                        >
                          {card.title}
                        </div>

                        {/* Card Title */}
                        <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white drop-shadow-md z-20">
                          {card.description}
                        </h3>
                      </div>

                      {/* Card content */}
                      <div className="flex flex-col flex-grow p-6 space-y-6">
                        <p className="text-gray-200 text-base flex-grow leading-relaxed">
                          {card.detailText}
                        </p>

                        {/* Features list */}
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-center space-x-2">
                            <span
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`}
                            ></span>
                            <span>Fractional ownership</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <span
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`}
                            ></span>
                            <span>Blockchain secured</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <span
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color}`}
                            ></span>
                            <span>Instant liquidity</span>
                          </li>
                        </ul>

                        {/* CTA Button */}
                        <motion.button
                          className={`w-full bg-gradient-to-r ${card.color} text-white py-3 px-6 rounded-xl font-medium text-base flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(card.link);
                          }}
                        >
                          {card.buttonText}
                          <ExternalLink
                            size={18}
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                          />
                        </motion.button>
                      </div>

                      {/* Card background accent */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`}
                      ></div>
                    </div>
                  </InnerCardWrapper>
                </motion.div>
              );
            })}
          </div>
          
          {/* Pagination dots - enhanced for small screens */}
          {/* <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-40">
            {cardData.map((_, index) => (
              <motion.button
                key={`dot-${index}`}
                className="w-3 h-3 rounded-full bg-white/30"
                animate={getIndicatorStyle(index)}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default TokenizationSlider;