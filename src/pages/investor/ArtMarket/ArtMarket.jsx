import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Container, Typography, Button, Box } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polygon,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import GradientLetters from "../../../components/GradientLetters";
import * as d3 from "d3";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Globe,
  Shield,
  Building,
  Search,
  Moon,
  Sun,
  Fingerprint,
  Lock,
  TrendingUp,
  BarChart,
  LineChart,
  DollarSign,
  PieChart,
} from "lucide-react";
import { Download, RefreshCw } from "react-feather";
import GlobalArtMarketDashboard from "./GlobalArtMarketDashboard";
import ArtCalculator from "./ArtCalculator";
import BackgroundPattern from "../../../ui/BackgroundPattern";
import FloatingNavigation from "../../../components/FloatingNavigation";
import useSectionObserver from "../../../hooks/useSectionObserver";
import CustomButton from "../../../components/CustomButton";
import ArtPortfolioAllocation from "./ArtPortfolioAllocation";
import AdvancedSearch from "./AdvancedSearch";
import ScrollAnimationWrapper from "../../../components/ScrollAnimationWrapper";

// The main RealEstate Tokenization component
const ArtMarket = () => {
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Define sections for navigation
  const sections = [
    { id: "hero", title: "Overview" },
    { id: "analytics", title: "Analytics" },
    { id: "portfolio", title: "Portfolio" },
    { id: "calculator", title: "Calculator" },
    { id: "opportunities", title: "Opportunities" },
  ];

  const activeSection = useSectionObserver(sections);

  // Use spring for smooth scrollbar
  const scaleX = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen relative text-white">
      <BackgroundPattern />
      <ScrollAnimationWrapper>
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white "
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <GradientLetters
                  text="Tokenized Art &"
                  keyPrefix="line1-char"
                />
              </motion.h1>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <GradientLetters
                  text="Collectibles Revolution"
                  keyPrefix="line2-char"
                />
              </motion.h1>

              <motion.p
                className="text-lg text-gray-300 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Democratize art ownership through blockchain technology. Invest in 
                blue-chip artworks, rare collectibles, and cultural treasures 
                through fractional ownership and secure digital authentication.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <CustomButton label="Get Started" />
                <CustomButton label="Learn More" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center"
            >
              <img
                src="/assets/sections/art-market.png"
                alt="Art & Collectibles Market"
                style={{ width: "90%", height: "auto" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section id="analytics" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl text-center mb-4 pb-1"
            >
              <Box
                component="div"
                className="flex flex-col flex-wrap justify-center"
              >
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Global Art Market Intelligence"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (3 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Global Art Market"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters text="Intelligence" keyPrefix="sm-line2" />
                </Box>
              </Box>
            </Typography>

            <p className="text-gray-400">
              Track auction results, price indices, and market trends across 
              contemporary art, vintage collectibles, and emerging digital assets.
            </p>
          </div>

          <GlobalArtMarketDashboard />
        </div>
      </section>

      {/* Portfolio Allocation Section */}
      <section id="portfolio" className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl text-center mb-4 pb-1"
            >
              <Box
                component="div"
                className="flex flex-col flex-wrap justify-center"
              >
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Curate Your Art & Collectibles Portfolio"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (3 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Curate Your Art &"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters text="Collectibles Portfolio" keyPrefix="sm-line1" />
                </Box>
              </Box>
            </Typography>

            <p className="text-gray-400">
              Build a diversified collection spanning fine art, rare wines, 
              vintage watches, sports memorabilia, and digital collectibles.
            </p>
          </div>

          <ArtPortfolioAllocation />
        </div>
      </section>

      {/* Investment Calculator Section */}
      <section id="calculator" className="py-16 ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl text-center mb-4 pb-1"
            >
              <Box
                component="div"
                className="flex flex-col flex-wrap justify-center"
              >
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Art Investment Valuation Calculator"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (3 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Art Investment Valuation"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Calculator"
                    keyPrefix="sm-line1"
                  />
                </Box>
              </Box>
            </Typography>

            <p className="text-gray-400">
              Estimate potential returns, authentication costs, storage fees, 
              and insurance requirements for your art and collectibles investments.
            </p>
          </div>

          <ArtCalculator />
        </div>
      </section>

      {/* Search Interface Section */}
      <section id="opportunities" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl text-center mb-4 pb-1"
            >
              <Box
                component="div"
                className="flex flex-col flex-wrap justify-center"
              >
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Discover Premium Art & Collectibles"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (3 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Discover Premium Art &"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Collectibles"
                    keyPrefix="sm-line1"
                  />
                </Box>
              </Box>
            </Typography>

            <p className="text-gray-400">
              Explore authenticated pieces from renowned artists, limited edition 
              collectibles, and emerging digital art across all major categories.
            </p>
          </div>

          <AdvancedSearch />
        </div>
      </section>
      <FloatingNavigation sections={sections} activeSection={activeSection} />
      </ScrollAnimationWrapper>
    </div>
  );
};

export default ArtMarket;
