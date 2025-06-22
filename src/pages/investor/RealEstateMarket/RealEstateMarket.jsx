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
import GlobalRealEstateMarketDashboard from "./GlobalRealEstateMarketDashboard";
import RealEstateCalculator from "./RealEstateCalculator";
import BackgroundPattern from "../../../ui/BackgroundPattern";
import FloatingNavigation from "../../../components/FloatingNavigation";
import useSectionObserver from "../../../hooks/useSectionObserver";
import CustomButton from "../../../components/CustomButton";
import RealEstatePortfolioAllocation from "./RealEstatePortfolioAllocation";
import AdvancedSearch from "./AdvancedSearch";
import ScrollAnimationWrapper from "../../../components/ScrollAnimationWrapper";

// The main RealEstate Tokenization component
const RealEstateMarket = () => {
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
                  text="Tokenized RealEstate"
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
                  text="for the Digital Age"
                  keyPrefix="line2-char"
                />
              </motion.h1>

              <motion.p
                className="text-lg text-gray-300 mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Secure, divisible, and globally accessible real estate tokens
                backed by tangible property assets. Trade, invest, and grow your
                wealth with the enduring value of real estate in a modern
                digital format.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <CustomButton label="Get Started" />
                {/* <ArrowRight size={18} /> */}

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
                src="/assets/sections/real-estate-market.png"
                alt="RealEstate Market"
                style={{ width: "90%", height: "auto" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Scrolldown indicator */}
        {/* <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-gray-400 text-sm mb-2">Scroll to explore</div>
          <ChevronDown size={24} className="text-yellow-500" />
        </motion.div> */}
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
                    text="Real-Time RealEstate Market Analytics"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (3 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Real-Time RealEstate Market"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters text="Analytics" keyPrefix="sm-line2" />
                </Box>
              </Box>
            </Typography>

            <p className="text-gray-400">
              Stay informed with up-to-date market data, charts, and trends to
              optimize your RealEstate investment strategy.
            </p>
          </div>

          <GlobalRealEstateMarketDashboard />
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
                    text="Optimize Your RealEstate Portfolio"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (3 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Optimize Your RealEstate"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters text="Portfolio" keyPrefix="sm-line1" />
                </Box>
              </Box>
            </Typography>

            <p className="text-gray-400">
              Design a balanced RealEstate investment strategy tailored to your
              risk tolerance and financial goals.
            </p>
          </div>

          <RealEstatePortfolioAllocation />
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
                    text="Advanced RealEstate Investment Calculator"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (3 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Advanced RealEstate"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Investment Calculator"
                    keyPrefix="sm-line1"
                  />
                </Box>
              </Box>
            </Typography>

            <p className="text-gray-400">
              Project your returns with tax-optimized, jurisdiction-specific
              real estate investment simulations.
            </p>
          </div>

          <RealEstateCalculator />
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
                    text="Discover RealEstate Investment Opportunities"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (3 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Discover Real Estate"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Investment Opportunities"
                    keyPrefix="sm-line1"
                  />
                </Box>
              </Box>
            </Typography>

            <p className="text-gray-400">
              Explore and analyze a wide range of real estate investment
              vehicles, from residential properties to commercial REITs.
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

export default RealEstateMarket;
