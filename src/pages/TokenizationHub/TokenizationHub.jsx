import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom"; // Added import for navigation links
import TokenizationJourney from "./TokenizationJourney";
import TokenizationComparison from "./TokenizationComparison";
import {
  GlassMorphismCard,
  MorphingButton,
  GradientText,
} from "./UIComponents";
import "./TokenizationHub.css";
import { Typography, Box } from "@mui/material";
import GradientLetters from "../../components/GradientLetters";
import useSectionObserver from "../../hooks/useSectionObserver";
import FloatingNavigation from "../../components/FloatingNavigation";
import BackgroundPattern from "../../ui/BackgroundPattern";
import CustomButton from "../../components/CustomButton";
import ScrollAnimationWrapper from "../../components/ScrollAnimationWrapper";
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Asset categories data with navigation paths
const assetCategories = [
  {
    title: "Real Estate",
    description:
      "Tokenize commercial and residential properties, REITs, and development projects",
    marketSize: "280B+",
    keyBenefits: [
      "Fractional ownership of premium properties",
      "Enhanced liquidity for real estate assets",
      "Access to global real estate markets",
    ],
    color: "#00ff85",
    path: "/tokenization/real-estate", // Added navigation path
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 22V12h6v10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Art & Collectibles",
    description:
      "Digital ownership of fine art, collections, and cultural assets",
    marketSize: "65B+",
    keyBenefits: [
      "Fractional ownership of high-value art",
      "Digital provenance on the blockchain",
      "Access to exclusive art collections",
    ],
    color: "#00e676",
    path: "/tokenization/art", // Added navigation path
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 19l7-7 3 3-7 7-3-3z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 2l7.586 7.586"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 11a2 2 0 11-4 0 2 2 0 014 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Commodities",
    description:
      "Tokenize physical commodities including precious metals and agriculture",
    marketSize: "120B+",
    keyBenefits: [
      "Fractional ownership of commodity supplies",
      "Simplified trading and settlement",
      "Reduced custody costs",
    ],
    color: "#00ff85",
    path: "/tokenization/commodities", // Added navigation path
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 9l-7 4-7-4m14 0l-7-4-7 4m14 0v6l-7 4m-7-10v6l7 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Carbon Credits",
    description:
      "Digital trading of carbon offset credits and environmental assets",
    marketSize: "45B+",
    keyBenefits: [
      "Transparent carbon offset certificates",
      "Streamlined carbon credit trading",
      "Enhanced environmental impact tracking",
    ],
    color: "#00cc66",
    path: "/tokenization/carbon-credits", // Added navigation path
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 22l6-6M17 8l4-4M12 12l4-4M7 7l4-4M22 22l-6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 16l-4 4M8 12l4 4M12 3c.661.087 3.76.792 4 3 .284 2.578-4 6-4 6s-4.284-3.422-4-6c.24-2.208 3.339-2.913 4-3z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Private Equity",
    description:
      "Tokenize private equity funds, venture capital, and business shares",
    marketSize: "175B+",
    keyBenefits: [
      "Access to previously illiquid investments",
      "Reduced minimum investment thresholds",
      "Enhanced secondary market trading",
    ],
    color: "#00e676",
    path: "/tokenization/private-equity", // Added navigation path
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Other Asset Classes",
    description: "Explore additional assets like infrastructure, IP, and more",
    marketSize: "90B+",
    keyBenefits: [
      "Tokenize virtually any asset with value",
      "Custom tokenization frameworks",
      "Innovative asset structures",
    ],
    color: "#00ff85",
    path: "/tokenization/other-assets", // Added navigation path
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

// Main TokenizationHub component
export default function TokenizationHub() {
  // Define sections for navigation
  const sections = [
    { id: "intro", title: "Intro" },
    { id: "assets", title: "Asset Classes" },
    { id: "journey", title: "Tokenization Journey" },
    { id: "comparison", title: "Platform Comparison" },
    { id: "cta", title: "Get Started" },
  ];

  const activeSection = useSectionObserver(sections);

  return (
    <div className="tokenization-hub">
      <BackgroundPattern />
      <ScrollAnimationWrapper>
      {/* Main content */}
      <div className="main-content">
        {/* Header Section */}
        <section id="intro" className="section intro-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="intro-content"
          >
            <div className="icon-container">
              <motion.div
                animate={
                  {
                    // rotate: 360,
                    // scale: [1, 1.1, 1]
                  }
                }
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <motion.div
                className="icon-ring"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </div>

            <Typography
              variant="h1"
              className="w-full text-4xl md:text-5xl lg:text-6xl font-bold mb-4 mt-1 text-center"
            >
              <Box
                component="div"
                className="flex flex-col items-center justify-center w-full"
              >
                {/* Large Screens (2 line) */}
                <Box className="hidden lg:flex lg:justify-center w-full">
                  <GradientLetters
                    text="Complete Echo Asset"
                    keyPrefix="lg-line1"
                  />
                </Box>
                <Box className="hidden lg:flex lg:justify-center w-full">
                  <GradientLetters
                    text="Tokenization Hub"
                    keyPrefix="lg-line2"
                  />
                </Box>

                {/* Small and Medium screens: 2 lines */}
                <Box className="flex flex-col items-center justify-center lg:hidden w-full">
                  <Box component="div" className="flex justify-center w-full">
                    <GradientLetters
                      text="Complete Echo Asset"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                  <Box component="div" className="flex justify-center w-full">
                    <GradientLetters
                      text="Tokenization Hub"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                </Box>
              </Box>
            </Typography>

            <p className="main-description">
              Transform any real-world asset into digital tokens with CopyM's
              comprehensive tokenization platform.
            </p>

            <div className="button-group">
              <div className="relative rounded-full p-[2px]">
                <div className=" rounded-full w-full h-full">
                  <CustomButton
                    label="Explore Platform"

                    // <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //   <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    // </svg>
                  />
                </div>
              </div>

              <div className="relative rounded-full p-[2px]">
                <div className=" rounded-full w-full h-full">
                  <CustomButton
                    label="Watch Demo"

                    // <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //   <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    // </svg>
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="scroll-indicator lg:hidden"
          >
            <p>Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M12 19L5 12M12 19L19 12"
                  stroke="rgba(255, 255, 255, 0.6)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* Asset Categories Section */}
        <section id="assets" className="section assets-section">
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
                    text="Tokenize Any Asset Classes"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small & Medium Screens (2 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Tokenize Any Asset Classes"
                    keyPrefix="sm-line1"
                  />
                </Box>
              </Box>
            </Typography>

            <p className="section-description">
              Our unified platform supports the complete tokenization lifecycle
              for all major asset classes
            </p>
          </motion.div>

          {/* Asset Grid - UPDATED STRUCTURE WITH NAVIGATION LINKS */}
          <div className="asset-grid">
            {assetCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="asset-card-grid-item"
              >
                <GlassMorphismCard
                  className="h-full"
                  color={`rgba(0, 255, 133, ${
                    index % 2 === 0 ? "0.1" : "0.05"
                  })`}
                >
                  <div className="asset-card-content">
                    <motion.div className="asset-icon">
                      {category.icon}
                    </motion.div>

                    <div className="asset-details">
                      <h3 className="asset-title">{category.title}</h3>

                      <p className="asset-description">
                        {category.description}
                      </p>

                      <div className="market-size">
                        <h4 className="market-value">${category.marketSize}</h4>
                        <span className="market-label">Market Size</span>
                      </div>

                      <h5 className="benefits-title">Key Benefits:</h5>

                      <ul className="benefits-list">
                        {category.keyBenefits.map((benefit, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            viewport={{ once: true }}
                            className="benefit-item"
                          >
                            <span
                              className="benefit-icon"
                              style={{ color: category.color }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20 6L9 17L4 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            {benefit}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="asset-actions">
                        <div className="relative rounded-full p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]">
                          <div className="bg-black rounded-full w-full h-full">
                            <button className="rounded-full px-6 py-2 font-semibold w-full text-white backdrop-blur-md bg-white/5 hover:bg-white/10 whitespace-nowrap">
                              View Examples
                            </button>
                          </div>
                        </div>
                        {/* Updated "Learn More" button with Link component */}
                        <div className="relative rounded-full p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]">
                          <div className="bg-black rounded-full w-full h-full">
                            <Link
                              to={category.path}
                              className="rounded-full px-6 py-2 font-semibold w-full text-white backdrop-blur-md bg-white/5 hover:bg-white/10 whitespace-nowrap flex items-center justify-center"
                            >
                              Learn More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassMorphismCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tokenization Journey Section */}
        <TokenizationJourney id="journey" />

        {/* Tokenization Comparison Section */}
        <TokenizationComparison id="comparison" />

        {/* CTA Section */}
        <section id="cta" className="section cta-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="cta-content"
          >
            <div className="icon-container">
              <motion.div
                animate={
                  {
                    // rotate: 360,
                    // scale: [1, 1.1, 1]
                  }
                }
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <motion.div
                className="icon-ring"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            </div>

            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
            >
              <Box component="div" className="flex flex-wrap justify-center">
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Ready to Tokenize Your Assets ?"
                    keyPrefix="lg-line1"
                  />
                </Box>
                {/* Small & Medium Screens (2 lines) */}
                <Box className="block lg:hidden">
                  <GradientLetters
                    text="Ready to Tokenize"
                    keyPrefix="sm-line1"
                  />
                </Box>
                <Box className="block lg:hidden">
                  <GradientLetters text="Your Assets ?" keyPrefix="sm-line1" />
                </Box>
              </Box>
            </Typography>

            <p className="section-description">
              Join thousands of businesses and investors already transforming
              their assets on the CopyM platform.
            </p>

            <div style={{ marginTop: "32px" }}>
              <div className="relative rounded-full p-[2px]">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <CustomButton
                    label=" Contact Our Team"
                    

                    // {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //   <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    // </svg> */}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Floating Navigation */}
        <FloatingNavigation sections={sections} activeSection={activeSection} />
      </div>
      </ScrollAnimationWrapper>
    </div>
  );
}
