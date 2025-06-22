import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion"; // Added import for motion component
import { Container, Typography, Box, Grid } from "@mui/material";
import GradientLetters from "../../../components/GradientLetters";
import BackgroundPattern from "../../../ui/BackgroundPattern";
import FloatingNavigation from '../../../components/FloatingNavigation';
import useSectionObserver from '../../../hooks/useSectionObserver';
import AnimatedCard from "../../../ui/AnimatedCard";
import CustomButton from "../../../components/CustomButton"
import ScrollAnimationWrapper from "../../../components/ScrollAnimationWrapper";

// Custom Card component with glass-morphism effect
const GlassCard = ({ children, className, hoverEffect = false }) => {
  return (
    <div
      className={`relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-800 rounded-xl shadow-2xl overflow-hidden ${
        hoverEffect ? "transition-transform duration-300 hover:scale-[1.02] hover:shadow-emerald-900/20" : ""
      } ${className}`}
    >
      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-xl border border-emerald-500/10"></div>
      
      {/* Card content */}
      {children}
      
      {/* Glass highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
    </div>
  );
};

// Token distribution visualization component
const TokenDistribution = ({ percentageSold = 68 }) => {
  const totalBlocks = 100;
  const soldBlocks = Math.floor(totalBlocks * (percentageSold / 100));
  
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300">Token Distribution</span>
        <span className="text-right">
          <span className="text-gray-400 text-sm">Token Price</span>
          <br />
          <span className="font-semibold text-white">$100</span>
        </span>
      </div>

      {/* Token distribution grid with animation */}
      <div className="grid grid-cols-10 gap-1 mb-2">
        {Array(totalBlocks).fill(0).map((_, i) => (
          <div
            key={`token-${i}`}
            className={`h-4 rounded-sm transition-all duration-500 ${
              i < soldBlocks 
                ? "bg-gradient-to-r from-emerald-600 to-emerald-500 animate-pulse-subtle" 
                : "bg-gray-700"
            }`}
            style={{ 
              animationDelay: `${i * 10}ms`,
              opacity: i < soldBlocks ? 1 : 0.5
            }}
          ></div>
        ))}
      </div>

      <div className="flex justify-between mt-2 text-sm">
        <span className="text-emerald-500 font-medium">{percentageSold}% Sold</span>
        <span className="text-gray-400">{100 - percentageSold}% Available</span>
      </div>
    </div>
  );
};

// Animated underline component
const AnimatedUnderline = ({ width = "w-24", color = "bg-emerald-500" }) => (
  <div className="relative h-0.5 mt-2 mb-6">
    <div className={`absolute ${width} ${color} h-full rounded-full`}></div>
    <div className={`absolute ${width} ${color} h-full rounded-full opacity-50 blur-sm`}></div>
  </div>
);

// 3D rotating golden coin effect
const GoldenCoin = () => {
  return (
    <div className="relative w-16 h-16 animate-slow-spin perspective">
      {/* Coin face */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-lg transform-gpu rotate-y-0 backface-hidden">
        <div className="absolute inset-2 rounded-full border border-yellow-300/30"></div>
      </div>
      
      {/* Coin edge */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-700 to-yellow-800 shadow-lg transform-gpu rotate-y-180 backface-hidden">
        <div className="absolute inset-2 rounded-full border border-yellow-600/30"></div>
      </div>
    </div>
  );
};

// Feature card component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <AnimatedCard>
    <div className="group relative  p-4 overflow-hidden">
      {/* Border glow overlay */}
      
      <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2 text-gray-200 group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>
    </div>
    </AnimatedCard>
  );
};

// Main component
const CommoditiesTokenization = () => {
  const [detailsOpen, setDetailsOpen] = useState(false); // Set to false to start closed
  const [activeTab, setActiveTab] = useState("preciousMetals");
  const heroRef = useRef(null);
  
  // Define sections for navigation
  const sections = [
    { id: "hero", title: "Intro" },
    { id: "redefine", title: "Benefits" },
    { id: "commodity-types", title: "Assets" },
    { id: "tokenization-benefits", title: "Advantages" },
    { id: "cta", title: "Get Started" }
  ];

  const activeSection = useSectionObserver(sections);
  
  const toggleDetails = () => {
    setDetailsOpen(prevState => !prevState);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <BackgroundPattern />
      <ScrollAnimationWrapper>
      <div className="relative z-10">
        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          className="px-8 py-24 md:px-16 lg:px-24 min-h-[90vh] flex flex-col justify-center relative"
        >
          {/* Background elements without parallax */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-emerald-500/10 filter blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-emerald-700/10 filter blur-3xl"></div>
          </div>

          {/* Hero content and image side by side */}
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
            {/* Left: Content */}
            <div className="w-full md:w-1/2">
              <Typography
                variant="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 pb-1 text-center md:text-left"
              >
                <Box component="div" className="flex flex-wrap">
                  {/* Large Screens (1 lines) */}
                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Commodities"
                      keyPrefix="lg-line1"
                    />
                  </Box>
                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Tokenization"
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  {/* Small and Medium screens: 2 lines */}
                  <Box className="block lg:hidden">
                    <Box component="div" className="flex flex-wrap ">
                      <GradientLetters text="Commodities" keyPrefix="sm-line1" />
                    </Box>
                    <Box component="div" className="flex flex-wrap ">
                      <GradientLetters text="Tokenization" keyPrefix="sm-line2" />
                    </Box>
                  </Box>
                </Box>
              </Typography>

              <h3 className="text-1xl md:text-2xl text-gray-300 mb-4 font-light text-center md:text-left">
                Transforming Physical Assets into{" "}
                <span className="text-emerald-400">Digital Investments</span>
              </h3>

              <AnimatedUnderline width="w-32" />

              <p className="text-gray-400 mb-8 max-w-2xl text-lg text-center md:text-left">
                Unlock new investment opportunities in global commodity markets
                through advanced blockchain technology and decentralized ownership
                structures.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <CustomButton label="Start Investing" />
                <CustomButton label="Learn More" />
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative w-full md:w-1/2 flex items-center justify-center md:justify-start md:-mt-20">
              <div className="w-[450px] md:w-[600px] h-[450px] md:h-[600px] md:ml-0 flex items-center justify-center md:pt-20">
                <img 
                  src="/assets/sections/commodites-tokenization-1.png" 
                  alt="Commodities Tokenization" 
                  className="w-[70%] h-[70%] md:w-[90%] md:h-[90%] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Redefine Commodity Investment Section */}
        <section id="redefine" className="px-8 py-16 lg:mt-20 md:px-16 lg:px-24 flex flex-col md:flex-row relative">
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/10 rounded-full filter blur-3xl"></div>

          <div className="md:w-1/2">
            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl md:mb-4 pb-1 text-center "
            >
              {/* First Line */}
              <Box component="div" className="flex flex-wrap ">
                <GradientLetters text="Redefine Commodity" keyPrefix="line1" />
              </Box>

              {/* Second Line */}
              <Box component="div" className="flex flex-wrap ">
                <GradientLetters text="Investment" keyPrefix="line2" />
              </Box>
            </Typography>

            <AnimatedUnderline width="w-32" />

            <p className="text-gray-400 mb-8 max-w-lg">
              Leverage blockchain technology to transform traditional commodity
              investing with unprecedented accessibility, transparency, and
              efficiency.
            </p>

            {/* Feature Boxes Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FeatureCard
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 18L12 22L16 18" />
                    <path d="M12 2V22" />
                    <path d="M3 9H21" />
                    <path d="M3 15H21" />
                  </svg>
                }
                title="Commodity Liquidity"
                description="Transform physical commodities into tradable digital assets with high liquidity"
              />

              <FeatureCard
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                }
                title="Risk Mitigation"
                description="Diversify investment portfolios across global commodity markets"
              />

              <FeatureCard
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                }
                title="Global Access"
                description="Invest in commodities from around the world without geographical barriers"
              />

              <FeatureCard
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                }
                title="Market Analytics"
                description="Access real-time market data and advanced analytics for informed decisions"
              />
            </div>
          </div>

          {/* Featured Tokenized Commodity Card */}
          <div className="md:w-1/2 mt-12 md:mt-0 md:pl-10">
            <GlassCard
              className="transform perspective-1000 transition-all duration-500 hover:rotate-y-5"
              hoverEffect={true}
            >
              {/* Green Header with Logo */}
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 p-6 relative">
                <div className="flex justify-between items-center">
                  <button className="text-white absolute left-4 bg-white/20 hover:bg-white/30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="ml-10">
                    <div className="flex items-center">
                      <GoldenCoin />
                      <div className="ml-4">
                        <h3 className="text-2xl font-bold text-white">
                          Golden Reserves
                        </h3>
                        <p className="text-emerald-100">Precious Metals</p>
                      </div>
                    </div>
                  </div>

                  <button className="text-white absolute right-4 bg-white/20 hover:bg-white/30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="text-white p-6">
                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <p className="text-gray-400 text-sm">Total Value</p>
                    <p className="text-xl font-semibold flex items-center">
                      <span className="inline-flex w-5 h-5 mr-1 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 items-center justify-center text-xs shadow-lg shadow-emerald-500/20">
                        $
                      </span>
                      15.6M
                    </p>
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <p className="text-gray-400 text-sm">Total Tokens</p>
                    <p className="text-xl font-semibold flex items-center">
                      <span className="inline-flex w-5 h-5 mr-1 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 items-center justify-center text-xs shadow-lg shadow-blue-500/20">
                        ↗
                      </span>
                      156,000
                    </p>
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-105">
                    <p className="text-gray-400 text-sm">Investors</p>
                    <p className="text-xl font-semibold flex items-center">
                      <span className="inline-flex w-5 h-5 mr-1 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 items-center justify-center text-xs shadow-lg shadow-purple-500/20">
                        ★
                      </span>
                      520
                    </p>
                  </div>
                </div>

                {/* Token Distribution */}
                <TokenDistribution percentageSold={68} />

                {/* Investment Details - Redesigned */}
                <div className="border-t border-gray-700/50 pt-4">
                  {/* Toggle Button */}
                  <button
                    className="flex justify-between items-center cursor-pointer py-3 px-4 w-full text-left hover:bg-gray-800/30 rounded transition-all duration-300 ease-in-out bg-gray-800/20"
                    onClick={() => setDetailsOpen(!detailsOpen)}
                    aria-expanded={detailsOpen}
                  >
                    <div className="flex items-center">
                      <h4 className="font-semibold">Investment Details</h4>
                      <span className="ml-2 text-xs text-emerald-500">
                        {detailsOpen ? "Hide" : "Show"}
                      </span>
                    </div>
                    <span
                      className={`text-white bg-emerald-600 hover:bg-emerald-500 rounded-full w-7 h-7 flex items-center justify-center transition-transform duration-300 ${
                        detailsOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Details Content with height animation */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      detailsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="py-4 px-4">
                      <div className="mb-4">
                        <p className="text-gray-400 text-sm">
                          Expected Returns
                        </p>
                        <p className="font-semibold text-white">6.7% annual</p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-2">
                          Tokenization Benefits
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Fractional ownership starting from $100",
                            "Global market access",
                            "Transparent trading",
                            "Diversification opportunities",
                          ].map((benefit, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="text-emerald-500 mr-2">→</span>
                              <span className="text-gray-300">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105 w-full mt-4 group">
                    View Investment Opportunity
                    <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Tokenizable Commodity Types */}
        <section id="commodity-types" className="px-8 py-16 md:px-16 lg:px-24 text-center relative">
          {/* Background effect */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-900/20 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl text-center"
            >
              <Box component="div" className="flex flex-wrap justify-center">
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Tokenizable Commodity Types"
                    keyPrefix="lg-line1"
                  />
                </Box>
                {/* Small & Medium Screens (2 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters text="Tokenizable" keyPrefix="sm-line1" />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Commodity Types"
                    keyPrefix="sm-line2"
                  />
                </Box>
              </Box>
            </Typography>

            <AnimatedUnderline width="w-48" className="mx-auto" />

            <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
              Explore a diverse range of commodity assets ready for fractional
              ownership through our advanced tokenization platform
            </p>

            {/* Commodity type tabs */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { id: "preciousMetals", label: "Precious Metals" },
                  { id: "energy", label: "Energy Resources" },
                  { id: "agriculture", label: "Agricultural Products" },
                  { id: "industrial", label: "Industrial Metals" },
                  { id: "rare", label: "Rare Earth Elements" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative rounded-full px-6 py-2 transition-all duration-300 ${
                      activeTab === item.id
                        ? "text-white border border-emerald-500 bg-emerald-500/10"
                        : "text-gray-400 border border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {item.label}
                    {activeTab === item.id && (
                      <span className="absolute inset-0 rounded-full bg-emerald-500/5 animate-pulse-slow"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Commodity details based on active tab */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {activeTab === "preciousMetals" && (
                <>
                  <AnimatedCard
                    className="p-6 text-left transform transition-all duration-500 hover:translate-y-[-8px]"
                    hoverEffect
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">Au</span>
                      </div>
                      <h3 className="text-xl font-bold">Gold</h3>
                    </div>
                    <p className="text-gray-400 mb-4">
                      Premium physical gold reserves tokenized for fractional
                      investment with secure storage.
                    </p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Min. Investment</span>
                      <span className="text-white">$100</span>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard
                    className="p-6 text-left transform transition-all duration-500 hover:translate-y-[-8px]"
                    hoverEffect
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">Ag</span>
                      </div>
                      <h3 className="text-xl font-bold">Silver</h3>
                    </div>
                    <p className="text-gray-400 mb-4">
                      Industrial and investment-grade silver bullion with high
                      purity certification.
                    </p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Min. Investment</span>
                      <span className="text-white">$50</span>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard
                    className="p-6 text-left transform transition-all duration-500 hover:translate-y-[-8px]"
                    hoverEffect
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">Pt</span>
                      </div>
                      <h3 className="text-xl font-bold">Platinum</h3>
                    </div>
                    <p className="text-gray-400 mb-4">
                      Rare platinum resources with industrial applications and
                      investment potential.
                    </p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Min. Investment</span>
                      <span className="text-white">$150</span>
                    </div>
                  </AnimatedCard>
                </>
              )}

              {/* Other tabs would display similar structures with different content */}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="tokenization-benefits" className="px-8 py-16 md:px-16 lg:px-24 text-center relative">
          <div className="relative z-10">
            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl text-center"
            >
              <Box component="div" className="flex flex-wrap justify-center">
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Benefits of Commodity Tokenization"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (2 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters text="Benefits of" keyPrefix="sm-line1" />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Commodity Tokenization"
                    keyPrefix="sm-line2"
                  />
                </Box>
              </Box>
            </Typography>

            <AnimatedUnderline width="w-48" className="mx-auto" />

            <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
              Unlock new investment possibilities with blockchain-powered
              commodity assets for both investors and asset owners
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <GlassCard className="p-8 text-left">
                <h3 className="text-xl text-emerald-500 font-semibold mb-6 flex items-center">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </span>
                  For Investors
                </h3>
                <ul className="space-y-4">
                  {[
                    "Low minimum investment thresholds enabling broader market participation",
                    "Enhanced market liquidity with 24/7 trading capabilities",
                    "Diversification across commodity classes to optimize portfolio performance",
                    "Transparent and secure transactions verified on blockchain networks",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start group">
                      <span className="text-emerald-500 mr-3 mt-1 transition-transform duration-300 transform group-hover:scale-125">
                        ✓
                      </span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-8 text-left">
                <h3 className="text-xl text-emerald-500 font-semibold mb-6 flex items-center">
                  <span className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="2"
                        y="7"
                        width="20"
                        height="14"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </span>
                  For Commodity Owners
                </h3>
                <ul className="space-y-4">
                  {[
                    "Fractional asset monetization allowing partial liquidity while maintaining control",
                    "Global investor access expanding potential capital sources",
                    "Reduced liquidity constraints for typically illiquid physical assets",
                    "Efficient capital management with programmable distribution of proceeds",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start group">
                      <span className="text-emerald-500 mr-3 mt-1 transition-transform duration-300 transform group-hover:scale-125">
                        ✓
                      </span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="cta" className="px-8 py-20 md:px-16 lg:px-24 text-center relative">
          {/* Advanced background glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500 filter blur-[100px] opacity-15"
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10">

            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
            >
              <Box component="div" className="flex flex-wrap justify-center">
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Ready to Revolutionize Your "
                    keyPrefix="lg-line1"
                  />
                </Box>
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Commodity Investments?"
                    keyPrefix="lg-line2"
                  />
                </Box>

                {/* Small & Medium Screens (2 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Ready to Revolutionize"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters
                    text=" Your Commodity"
                    keyPrefix="sm-line2"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Investments?"
                    keyPrefix="sm-line3"
                  />
                </Box>
              </Box>
            </Typography>

            <AnimatedUnderline width="w-24" className="mx-auto" />

            <p className="text-gray-400 mb-10 max-w-3xl mx-auto text-lg">
              Join the future of commodity investing with our blockchain-powered
              tokenization platform and unlock new possibilities today
            </p>

            <div className="flex flex-wrap justify-center gap-4">

              <CustomButton label="Start Investing" />

              <CustomButton label="Learn More" />
              
            </div>

          </div>
        </section>
      </div>
      <FloatingNavigation sections={sections} activeSection={activeSection} />
      </ScrollAnimationWrapper>

    </div>
  );
};

export default CommoditiesTokenization;