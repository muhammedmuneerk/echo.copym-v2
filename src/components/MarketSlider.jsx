import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Box, Typography } from "@mui/material";
import GradientLetters from "./GradientLetters";
import {
  AnimatedCardWrapper,
  InnerCardWrapper,
} from "../ui/AnimatedCardWrapper";

/**
 * MarketSlider component – carousel showcasing featured marketplace assets.
 * Reuses the visual/interaction pattern of TokenizationSlider for consistency.
 */

// ---- Asset data (mirrors Marketplace.jsx mockAssets) ----
const mockAssets = [
  {
    id: "real-estate-1",
    title: "Premium Office Building",
    category: "Real Estate",
    location: "New York, USA",
    expectedRoi: "8.5%",
    price: 250000,
    availableTokens: 750,
    totalTokens: 1000,
    image: "/assets/images/premium-office-building-1.png",
  },
  {
    id: "art-1",
    title: "Digital Art Collection",
    category: "Art",
    location: "Digital",
    expectedRoi: "Variable",
    price: 15000,
    availableTokens: 65,
    totalTokens: 100,
    image: "/assets/images/digital-art-collection-1.png",
  },
  {
    id: "commodities-1",
    title: "Gold Reserve",
    category: "Commodities",
    location: "Secure Vault, Switzerland",
    expectedRoi: "5.2%",
    price: 50000,
    availableTokens: 320,
    totalTokens: 500,
    image: "/assets/images/gold-reserve.png",
  },
  {
    id: "infrastructure-1",
    title: "Solar Farm Project",
    category: "Infrastructure",
    location: "Arizona, USA",
    expectedRoi: "7.3%",
    price: 120000,
    availableTokens: 1800,
    totalTokens: 2000,
    image: "/assets/images/solar-farm-project-2.png",
  },
  {
    id: "startups-1",
    title: "Tech Startup Equity",
    category: "Startups",
    location: "San Francisco, USA",
    expectedRoi: "High Risk/Reward",
    price: 75000,
    availableTokens: 210,
    totalTokens: 300,
    image: "/assets/images/tech-2.png",
  },
  {
    id: "real-estate-2",
    title: "Luxury Apartment Complex",
    category: "Real Estate",
    location: "Miami, USA",
    expectedRoi: "6.8%",
    price: 350000,
    availableTokens: 1200,
    totalTokens: 1500,
    image: "/assets/images/apartment-complex.png",
  },
];

// Map categories to navigation paths (aligned with Marketplace routing)
const categoryToPath = {
  "Real Estate": "/market/real-estate/",
  Art: "/market/art/",
  Commodities: "/market/gold/",
  Infrastructure: "/market/carbon-credits/",
  Startups: "/market/private-equity/",
};

// Visual theming for each category (gradient + border colors)
const categoryColors = {
  "Real Estate": {
    color: "from-blue-400 to-indigo-600",
    bgColor: "from-blue-900/20 to-indigo-900/20",
    borderColor: "#4169E1",
  },
  Art: {
    color: "from-purple-400 to-pink-600",
    bgColor: "from-purple-900/20 to-pink-900/20",
    borderColor: "#8A2BE2",
  },
  Commodities: {
    color: "from-amber-400 to-yellow-600",
    bgColor: "from-amber-900/20 to-yellow-900/20",
    borderColor: "#FFD700",
  },
  Infrastructure: {
    color: "from-teal-400 to-green-600",
    bgColor: "from-teal-900/20 to-green-900/20",
    borderColor: "#00d084",
  },
  Startups: {
    color: "from-orange-400 to-red-600",
    bgColor: "from-orange-900/20 to-red-900/20",
    borderColor: "#FF4500",
  },
  default: {
    color: "from-violet-400 to-purple-600",
    bgColor: "from-violet-900/20 to-purple-900/20",
    borderColor: "#9400D3",
  },
};

// Transform assets into slide-ready card data
const cardData = mockAssets.map((asset) => {
  const colors = categoryColors[asset.category] || categoryColors.default;
  return {
    id: asset.id,
    image: asset.image,
    title: asset.title,
    category: asset.category,
    location: asset.location,
    expectedRoi: asset.expectedRoi,
    price: asset.price,
    availableTokens: asset.availableTokens,
    totalTokens: asset.totalTokens,
    buttonText: "Invest",
    link: categoryToPath[asset.category] || "/marketplace",
    ...colors,
  };
});

const MarketSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 -> next, -1 -> prev
  const [dragStartX, setDragStartX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const navigate = useNavigate();
  const autoplayRef = useRef(null);
  const controls = useAnimation();
  const sliderRef = useRef(null);

  // Autoplay handler
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setTimeout(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    };
  }, [currentIndex, isPaused]);

  // Swipe visual feedback
  useEffect(() => {
    if (swipeDirection === "left") {
      controls.start({ x: -10, opacity: 0.8 }).then(() => {
        controls.start({ x: 0, opacity: 1 });
      });
    } else if (swipeDirection === "right") {
      controls.start({ x: 10, opacity: 0.8 }).then(() => {
        controls.start({ x: 0, opacity: 1 });
      });
    }
  }, [swipeDirection, controls]);

  // Slide navigation helpers
  const nextSlide = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % cardData.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Pointer / touch handlers (mobile focus)
  const handleDragStart = (e) => {
    if (window.innerWidth > 640) return; // only on small screens
    setSwipeDirection(null);
    setDragStartX(e.touches?.[0]?.clientX ?? e.clientX);
    setIsPaused(true);
  };

  const handleDragEnd = (e) => {
    if (window.innerWidth > 640) return;
    const endX = e.changedTouches?.[0]?.clientX ?? e.clientX;
    if (endX === undefined) {
      setIsPaused(false);
      return;
    }

    const diffX = endX - dragStartX;
    const threshold = 50;
    if (diffX > threshold) {
      setSwipeDirection("right");
      prevSlide();
    } else if (diffX < -threshold) {
      setSwipeDirection("left");
      nextSlide();
    }

    setTimeout(() => setIsPaused(false), 1000);
  };

  // Card style calculation (same as TokenizationSlider)
  const getCardStyle = (index) => {
    const diff = (index - currentIndex + cardData.length) % cardData.length;
    if (diff === 0) {
      return { zIndex: 30, scale: 1, opacity: 1, x: 0, rotateY: 0 };
    } else if (diff === 1) {
      return { zIndex: 20, scale: 0.85, opacity: 0.7, x: "40%", rotateY: 15 };
    } else if (diff === 2) {
      return { zIndex: 10, scale: 0.7, opacity: 0.5, x: "70%", rotateY: 30 };
    } else if (diff === cardData.length - 1) {
      return { zIndex: 20, scale: 0.85, opacity: 0.7, x: "-40%", rotateY: -15 };
    } else if (diff === cardData.length - 2) {
      return { zIndex: 10, scale: 0.7, opacity: 0.5, x: "-70%", rotateY: -30 };
    }
    return {
      zIndex: 5,
      scale: 0.5,
      opacity: 0,
      x: diff < cardData.length / 2 ? "100%" : "-100%",
      rotateY: diff < cardData.length / 2 ? 45 : -45,
    };
  };

  return (
    <div className="max-w-full px-4 h-full overflow-hidden rounded-2xl mt-24">
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
            {/* Large Screens */}
            <Box className="hidden lg:block">
              <Box component="div" className="flex flex-wrap justify-center">
                <GradientLetters text="Marketplace Spotlight" keyPrefix="market-lg" />
              </Box>
            </Box>
            {/* Small & Medium Screens */}
            <Box className="block lg:hidden">
              <Box component="div" className="flex flex-wrap justify-center">
                <GradientLetters text="Marketplace Spotlight" keyPrefix="market-sm" />
              </Box>
            </Box>
          </Box>
        </Typography>

        <p className="text-white max-w-2xl mx-auto text-lg">
          Discover featured tokenized assets currently available in our marketplace.
        </p>
        <p className="text-gray-400 text-sm mt-2 block sm:hidden">
          Swipe left or right to navigate
        </p>
      </motion.div>

      {/* Slider */}
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
        {/* Cards Container */}
        <div className="relative h-full flex items-center justify-center">
          {cardData.map((card, index) => {
            const diff = (index - currentIndex + cardData.length) % cardData.length;
            const isSideCard = diff === 1 || diff === cardData.length - 1;

            return (
              <motion.div
                key={card.id}
                className="absolute w-full max-w-lg h-[520px] cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
                animate={getCardStyle(index)}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
                onClick={() => {
                  if (index === currentIndex) {
                    navigate(card.link);
                  } else {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }
                }}
                onMouseEnter={() => {
                  if (window.innerWidth >= 640) {
                    if (diff === 1) nextSlide();
                    else if (diff === cardData.length - 1) prevSlide();
                  }
                }}
              >
                <InnerCardWrapper color={card.borderColor}>
                  <div className="glass-reflection"></div>
                  <div className="card-content">
                    {/* Header image */}
                    <div className="relative h-60 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-30 mix-blend-overlay`}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      />
                      {/* Category badge */}
                      <div className={`absolute top-6 left-6 py-1.5 px-4 rounded-full bg-gradient-to-r ${card.color} text-white text-sm font-medium z-20 shadow-lg`}>
                        {card.category}
                      </div>
                      {/* Asset title */}
                      <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white drop-shadow-md z-20">
                        {card.title}
                      </h3>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-grow p-6 space-y-3">
                      {/* Location */}
                      <p className="text-gray-200 text-base leading-relaxed flex items-center gap-1">
                        <span className="font-semibold">Location:</span> {card.location}
                      </p>

                      {/* ROI */}
                      <p className="text-gray-200 text-base leading-relaxed flex items-center gap-1">
                        <span className="font-semibold">Expected ROI:</span> {card.expectedRoi}
                      </p>

                      {/* Tokens info */}
                      <p className="text-gray-200 text-base leading-relaxed flex items-center gap-1">
                        <span className="font-semibold">Tokens Available:</span> {card.availableTokens}/{card.totalTokens}
                      </p>

                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${card.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(card.availableTokens / card.totalTokens) * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        ></motion.div>
                      </div>

                      {/* Price & Invest row */}
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-2xl font-bold text-white">
                          ${card.price.toLocaleString()}
                        </p>
                        <motion.button
                          className={`px-6 py-2.5 bg-gradient-to-r ${card.color} text-white rounded-lg font-medium shadow-lg transition duration-300 hover:shadow-xl`}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(card.link);
                          }}
                        >
                          {card.buttonText}
                        </motion.button>
                      </div>

                      {/* Know More Button */}
                      <Link
                        to={card.link}
                        className="flex items-center justify-center w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition duration-300 border border-white/20 hover:border-white/30 group"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Know More</span>
                        <ExternalLink size={14} className="ml-2 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </InnerCardWrapper>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default MarketSlider; 