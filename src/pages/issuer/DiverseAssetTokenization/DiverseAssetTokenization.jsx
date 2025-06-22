import React, { useState } from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import GradientLetters from "../../../components/GradientLetters";
import BackgroundPattern from "../../../ui/BackgroundPattern";
import FloatingNavigation from '../../../components/FloatingNavigation';
import useSectionObserver from '../../../hooks/useSectionObserver';
import AnimatedCard from "../../../ui/AnimatedCard";
import CustomButton from "../../../components/CustomButton"
import ScrollAnimationWrapper from "../../../components/ScrollAnimationWrapper";

// Custom SVG Icons - Keeping original icons
const TokenizationIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="xs:w-10 xs:h-10 w-8 h-8">
    <path d="M20 5L26.7942 8.2918L33.5885 11.5836L33.5885 18.1672L33.5885 24.7508L26.7942 28.0426L20 31.3344L13.2058 28.0426L6.41154 24.7508L6.41154 18.1672L6.41154 11.5836L13.2058 8.2918L20 5Z" stroke="url(#paint0_linear)" strokeWidth="1.5"/>
    <circle cx="20" cy="18" r="6" stroke="url(#paint1_linear)" strokeWidth="1.5"/>
    <defs>
      <linearGradient id="paint0_linear" x1="6.41154" y1="5" x2="33.5885" y2="31.3344" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#065F46"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="14" y1="12" x2="26" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399"/>
        <stop offset="1" stopColor="#059669"/>
      </linearGradient>
    </defs>
  </svg>
);

const GlobalIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="xs:w-10 xs:h-10 w-8 h-8">
    <circle cx="20" cy="20" r="14" stroke="url(#paint0_linear)" strokeWidth="1.5"/>
    <path d="M20 6C20 6 10 14.5 10 20C10 25.5 10 34 10 34M20 6C20 6 30 14.5 30 20C30 25.5 30 34 30 34M20 6V34M7 20H33" stroke="url(#paint1_linear)" strokeWidth="1.5"/>
    <defs>
      <linearGradient id="paint0_linear" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#065F46"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="7" y1="6" x2="33" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#065F46"/>
      </linearGradient>
    </defs>
  </svg>
);

const SecurityIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="xs:w-10 xs:h-10 w-8 h-8">
    <path d="M20 5L32 9V17C32 24.1797 27.2157 30.4545 20 32C12.7843 30.4545 8 24.1797 8 17V9L20 5Z" stroke="url(#paint0_linear)" strokeWidth="1.5"/>
    <path d="M15 19L18 22L25 15" stroke="url(#paint1_linear)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear" x1="8" y1="5" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981"/>
        <stop offset="1" stopColor="#065F46"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="15" y1="15" x2="25" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399"/>
        <stop offset="1" stopColor="#059669"/>
      </linearGradient>
    </defs>
  </svg>
);


const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
    <path d="M4.16667 15.8333L15.8333 4.16667M15.8333 4.16667H7.5M15.8333 4.16667V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Asset Type Button with tooltip
const AssetTypeButton = ({ label }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  // Tooltip text based on label
  const tooltipContent = {
    "Intellectual Property": "Tokenize patents, trademarks, and copyrights for fractional ownership",
    "Infrastructure Projects": "Transform large-scale projects into liquid investment opportunities",
    "Revenue Streams": "Convert predictable future income into tradable digital assets",
    "Supply Chain Assets": "Tokenize inventory, warehousing and logistics resources",
    "Digital Rights": "Create verifiable ownership for digital content and services",
    "Creative Works": "Enable fractional ownership of art, music, and entertainment",
    "Specialized Equipment": "Tokenize industrial machinery and specialized tools",
    "Government Contracts": "Transform government agreements into investable assets"
  }[label] || "Explore innovative tokenization opportunities";

  return (
    <div className="relative inline-block">
      <button
        className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-2 xs:px-3 sm:px-5 py-1 xs:py-1.5 sm:py-2 text-[10px] xs:text-xs sm:text-sm flex items-center gap-1 border border-[#00A86B]/30 rounded-full transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0.5"
        style={{ boxShadow: "0 0 15px rgba(0,168,107,0.1)" }}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        <span className="relative z-10">{label}</span>
      </button>

      {isTooltipVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 sm:w-60 p-2 sm:p-3 backdrop-blur-lg bg-[#121212] rounded-lg border border-gray-700 shadow-md text-gray-300 text-xs sm:text-sm transition-opacity duration-200">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 backdrop-blur-lg bg-[#121212] border-r border-b border-gray-700"></div>
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

// Feature Card with hover effects - adapted to match Real Estate theme
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-[#121212] relative rounded-xl border border-gray-700 shadow-md backdrop-filter backdrop-blur-sm bg-opacity-80 p-3 xs:p-4 md:p-6 overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100"></div>
      
      <motion.div 
        className="mb-3 xs:mb-4 relative z-10"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-12 h-12 rounded-md bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-300 transition-colors duration-300">{title}</h3>
      
      <p className="text-gray-400">
        {description}
      </p>
      
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-600 to-emerald-400 group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
};

// Card component from Real Estate page
const Card = ({ children, className, as3D = false }) => {
  return (
    <div
      className={`bg-[#121212] relative rounded-xl border border-gray-700 ${
        as3D 
          ? "shadow-[0_20px_25px_-5px_rgba(16,185,129,0.15),0_10px_10px_-5px_rgba(16,185,129,0.08)]" 
          : "shadow-md"
      } backdrop-filter backdrop-blur-sm bg-opacity-80 ${className}`}
    >
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100"></div>
      {children}
    </div>
  );
};

// Main component
const DiverseAssetTokenization = () => {
  // Define sections for navigation
  const sections = [
    { id: "intro", title: "Intro" },
    { id: "assets", title: "Asset Types" },
    { id: "cta", title: "Get Started" }
  ];

  const activeSection = useSectionObserver(sections);
  
  return (
    <div className="text-white min-h-screen relative overflow-hidden font-sans">
      <ScrollAnimationWrapper>
        <FloatingNavigation sections={sections} activeSection={activeSection} />
        {/* Header Section */}
        <div className="relative overflow-hidden">
          <section id="intro" className="relative container mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left side – headline & CTA */}
              <div className="max-w-4xl lg:max-w-none relative">
                <div className="h-px bg-gradient-to-r from-emerald-500 to-transparent absolute -top-4 left-0 w-[60%]" />
                <div className="h-px bg-gradient-to-r from-emerald-500 to-transparent absolute -top-8 left-0 w-[30%]" />

                <div className="flex items-center gap-6 mb-4">
                  <Typography
                    variant="h1"
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 pb-1 text-center"
                  >
                    <Box component="div" className="flex flex-wrap">
                      {/* Large Screens (1 lines) */}
                      <Box className="hidden lg:block">
                        <GradientLetters
                          text="Diverse Asset"
                          keyPrefix="lg-line1"
                        />
                      </Box>
                      <Box className="hidden lg:block">
                        <GradientLetters
                          text="Tokenization"
                          keyPrefix="lg-line1"
                        />
                      </Box>

                      {/* Small and Medium screens: 3 lines */}
                      <Box className="block lg:hidden">
                        <Box component="div" className="flex flex-wrap ">
                          <GradientLetters
                            text="Diverse Asset"
                            keyPrefix="sm-line1"
                          />
                        </Box>
                        <Box component="div" className="flex flex-wrap ">
                          <GradientLetters
                            text="Tokenization"
                            keyPrefix="sm-line2"
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Typography>
                </div>

                <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-300">
                  Tokenize Beyond Traditional Boundaries
                </h2>

                <p className="text-gray-400 mb-8 max-w-2xl">
                  Democratize asset ownership through fractional tokenization,
                  enhanced liquidity, and global accessibility. The future of
                  diversified investment is here.
                </p>

                <div className="flex flex-wrap gap-4">
                  <CustomButton label="Explore Solutions" />
                  <CustomButton label="Learn More" />
                </div>
              </div>

              {/* Right side – illustrative graphic */}
              <div className="flex justify-center lg:justify-end mt-20 lg:mt-0">
                <div className="relative">
                  <img
                    src="/assets/sections/otherassets-tokenization-2.png"
                    alt="Diverse Asset Tokenization"
                    style={{ width: "90%", height: "90%" }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Main Content */}
        <section className="container mx-auto px-6 py-20" id="assets">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="relative mb-8">
                <div className="absolute left-0 top-0 h-12 w-1 bg-emerald-500 opacity-80" />

                <Typography
                  variant="h2"
                  className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-4 pb-1 text-center pl-6"
                >
                  {/* First Line */}
                  <Box component="div" className="flex flex-wrap ">
                    <GradientLetters
                      text="Unlimited Tokenization"
                      keyPrefix="line1"
                    />
                  </Box>

                  {/* Second Line */}
                  <Box component="div" className="flex flex-wrap  mt-1">
                    <GradientLetters text="Possibilities" keyPrefix="line2" />
                  </Box>
                </Typography>
              </div>

              <p className="text-gray-300 mb-10 text-lg">
                Our platform enables investors to tokenize and trade a diverse
                range of assets with unprecedented ease, transparency, and
                efficiency.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedCard>
                  <div className="p-1 ">
                    <div className="mb-3 xs:mb-4 relative z-10">
                      <div className="w-12 h-12 rounded-md bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4 transition-transform duration-300">
                        <TokenizationIcon />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white transition-colors duration-300">Flexible Tokenization</h3>
                    <p className="text-gray-400">
                      Tokenize virtually any asset with unique blockchain solutions tailored to your specific requirements
                    </p>
                  </div>
                </AnimatedCard>
                
                <AnimatedCard>
                  <div className="p-1 ">
                    <div className="mb-3 xs:mb-4 relative z-10">
                      <div className="w-12 h-12 rounded-md bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4 transition-transform duration-300">
                        <GlobalIcon />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white transition-colors duration-300">Global Accessibility</h3>
                    <p className="text-gray-400">
                      Open up new investment opportunities across diverse asset types with worldwide accessibility
                    </p>
                  </div>
                </AnimatedCard>
                
                <div className="col-span-1 md:col-span-2  w-full md:w-1/2">
                  <AnimatedCard>
                    <div className="p-1 ">
                      <div className="mb-3 xs:mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-md bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4 transition-transform duration-300">
                          <SecurityIcon />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white transition-colors duration-300">Comprehensive Compliance</h3>
                      <p className="text-gray-400">
                        Robust legal and regulatory frameworks for diverse asset types with built-in verification systems
                      </p>
                    </div>
                  </AnimatedCard>
                </div>
              </div>
            </div>

            {/* Right Side - Asset Types with Interactive Elements */}
            <div className="lg:w-full">
              <Card as3D={true} className="group overflow-hidden">
                <div className="relative">
                  <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 p-6">
                    <h3 className="text-2xl font-bold">Innovative Asset Types</h3>
                    <p className="text-emerald-100">
                      Transform unique assets into tradable tokens
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
                    <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-3 relative z-10 mb-6">
                      <AssetTypeButton label="Intellectual Property" />
                      <AssetTypeButton label="Infrastructure Projects" />
                      <AssetTypeButton label="Revenue Streams" />
                      <AssetTypeButton label="Supply Chain Assets" />
                      <AssetTypeButton label="Digital Rights" />
                      <AssetTypeButton label="Creative Works" />
                      <AssetTypeButton label="Specialized Equipment" />
                      <AssetTypeButton label="Government Contracts" />
                    </div>

                    <button className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105 w-full group">
                      <span className="flex items-center justify-center">
                        Explore Asset Types
                        <ArrowIcon className="ml-2" />
                      </span>
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 text-center relative" id="cta">
          {/* Advanced background glow */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500 filter blur-[100px] opacity-15" />

          {/* Animated network lines in background */}
          <div className="absolute inset-0 overflow-hidden opacity-15">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {Array.from({ length: 8 }).map((_, i) => {
                const y1 = 20 + i * 10;
                const y2 = 25 + i * 8;
                return (
                  <path
                    key={`line-${i}`}
                    d={`M0 ${y1} Q 50 ${y1 < 50 ? y1 + 20 : y1 - 20}, 100 ${y2}`}
                    stroke="#10b981"
                    strokeWidth="0.4"
                    fill="none"
                  />
                );
              })}
            </svg>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>

            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
            >
              <Box component="div" className="flex flex-wrap justify-center">
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Can't find your asset type?"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (1 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Can't find your asset type?"
                    keyPrefix="sm-line1"
                  />
                </Box>
              </Box>
            </Typography>

            <p className="text-gray-300 mb-10 text-xl">
              Our team can create a custom tokenization solution tailored to your
              unique needs.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <CustomButton label="Explore Custom Solutions" />
              <CustomButton label="Speak with Experts" />
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default DiverseAssetTokenization;