import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightAlt,
  ExpandMore,
  Palette,
  Language,
  Shield,
  AccountBalance,
} from "@mui/icons-material";
import { Box, Typography, Container, Grid } from "@mui/material";
import { ArrowRight, ArrowLeft, Globe2, Users } from "lucide-react";
import GradientLetters from "../../../components/GradientLetters";
import BackgroundPattern from "../../../ui/BackgroundPattern";
import FloatingNavigation from '../../../components/FloatingNavigation';
import useSectionObserver from '../../../hooks/useSectionObserver';
import AnimatedCard from "../../../ui/AnimatedCard";
import CustomButton from "../../../components/CustomButton"
import ScrollAnimationWrapper from "../../../components/ScrollAnimationWrapper";


const FadeSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="z-10 relative"
  >
    {children}
  </motion.div>
);

const ArtTokenization = () => {
  // Changed initial state from true to false to ensure details are closed on startup
  const [artworkDetails, setArtworkDetails] = useState(false);
  
  // Define sections for navigation
  const sections = [
    { id: "hero", title: "Art Tokenization" },
    { id: "features", title: "Features" },
    { id: "artTypes", title: "Art Types" },
    { id: "invest", title: "Invest Now" }
  ];
  
  const activeSection = useSectionObserver(sections);

  // Function to render an accurate token distribution chart
  const renderTokenDistributionChart = () => {
    const totalColumns = 10;
    const totalRows = 10;
    const soldPercentage = 75;

    // Calculate how many cells should be filled
    const totalCells = totalColumns * totalRows;
    const filledCells = Math.round((soldPercentage / 100) * totalCells);

    // Create the grid cells
    const cells = [];
    let cellCounter = 0;

    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalColumns; col++) {
        cellCounter++;
        cells.push(
          <div
            key={`${row}-${col}`}
            className={`h-3 rounded-sm ${
              cellCounter <= filledCells ? "bg-[#00A86B]" : "bg-[#001a12]/60"
            }`}
          />
        );
      }
    }

    return cells;
  };

  return (
    <div className="text-white min-h-screen relative overflow-hidden font-sans">
      <BackgroundPattern />
      {/* Content sections continue from here */}
      {/* Hero Section */}
      <ScrollAnimationWrapper>
      <section id="hero" className="relative container mx-auto px-6 py-24">
        <FadeSection>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 text-left pt-8">
            {/* Content Section - Left */}
            <div className="relative w-full md:w-1/2 z-10 md:-mt-20">
              <div className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-center md:text-left">
                <Typography
                  variant="h1"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 pb-1 text-center"
                >
                  <Box component="div" className="flex flex-wrap">
                    {/* Large Screens (1 lines) */}
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Art Tokenization"
                        keyPrefix="lg-line1"
                      />
                    </Box>

                    {/* Small and Medium screens: 1 lines */}
                    <Box className="block lg:hidden">
                      <Box component="div" className="flex flex-wrap ">
                        <GradientLetters
                          text="Art Tokenization"
                          keyPrefix="sm-line1"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Typography>
              </div>

              <p className="text-base md:text-lg text-[#CCCCCC] leading-relaxed font-futuristic text-center md:text-left">
                <Globe2 className="inline-block w-5 h-5 text-[#00A86B] mr-2 mb-1" />
                <span className="text-[#00A86B] font-semibold">Transform</span>{" "}
                art ownership through blockchain technology, making
                <span className="text-[#00A86B] font-medium">
                  {" "}
                  valuable art
                </span>{" "}
                accessible to global investors for
                <span className="text-[#00A86B] font-semibold">
                  {" "}
                  fractional ownership
                </span>
                .
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">

                <CustomButton label="Start Tokenizing Art" />
                
                <CustomButton label="Learn More" />
               
              </div>
            </div>

            {/* Art GLB Section Placeholder - Right */}
            <div className="relative w-full md:w-1/2 flex items-start justify-center md:justify-start md:-mt-20">
              <div className="w-[450px] md:w-[600px] h-[450px] md:h-[600px] md:ml-0 flex items-center justify-center">
                <img 
                  src="/assets/sections/art-tokenization-2.png" 
                  alt="Art Tokenization" 
                  className="w-[70%] h-[70%] md:w-[80%] md:h-[80%] object-contain"
                />
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* Features & Artwork */}
      <section id="features" className="relative container mx-auto px-6 py-20">
        <FadeSection>
          <div className="py-16">
            <div className="container mx-auto px-4 md:px-12">
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-1/2 mb-10 lg:mb-0">
                  <Typography
                    variant="h2"
                    className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-4 pb-1 text-center"
                  >
                    {/* First Line */}
                    <Box component="div" className="flex flex-wrap ">
                      <GradientLetters
                        text="Revolutionalize Art"
                        keyPrefix="line1"
                      />
                    </Box>

                    {/* Second Line */}
                    <Box component="div" className="flex flex-wrap  mt-1">
                      <GradientLetters text="Investment" keyPrefix="line2" />
                    </Box>
                  </Typography>

                  <p className="text-[#CCCCCC] mb-6">
                    Empower your art investment strategy with fractional
                    ownership and blockchain technology
                  </p>

                  <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Feature Card 1 */}
                    <AnimatedCard>
                    <div className="  p-6 ">
                      <div className="text-[#00A86B] mb-4">
                        <Palette fontSize="large" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">
                        Fractional Art Ownership
                      </h3>
                      <p className="text-[#CCCCCC]">
                        Invest in high-value art pieces with lower entry
                        barriers
                      </p>
                    </div>
                    </AnimatedCard>

                    {/* Feature Card 2 */}
                    <AnimatedCard>
                    <div className="p-6 ">
                      <div className="text-[#00A86B] mb-4">
                        <Shield fontSize="large" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">
                        Provenance Verification
                      </h3>
                      <p className="text-[#CCCCCC]">
                        Blockchain-backed authenticity and ownership tracking
                      </p>
                    </div>
                    </AnimatedCard>
                    </div>

                    <div className="flex "> {/*  justify-center  */}
                      <div className="w-full md:w-1/2">
                    {/* Feature Card 3 */}
                    <AnimatedCard>
                    <div className="p-6 ">
                      <div className="text-[#00A86B] mb-4">
                        <Language fontSize="large" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">
                        Global Art Market
                      </h3>
                      <p className="text-[#CCCCCC]">
                        Access international art investments seamlessly
                      </p>
                    </div>
                    </AnimatedCard>
                    </div>
                    </div>

                  </div>
                </div>

                {/* Featured Art Card */}
                <div className="lg:w-1/2 lg:pl-10">
                  <div className="bg-[#001a12]/30 backdrop-blur-md border border-[#00A86B]/20 rounded-2xl overflow-hidden">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-[#004b2f] to-[#00A86B] p-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-2xl font-bold text-[#DDFFDD]">
                              Digital Horizon
                            </h3>
                            <p className="text-[#CCCCCC]">
                              Elena Rodriguez • Digital Art NFT
                            </p>
                          </div>
                          <div className="flex">
                            <button className="bg-[#001a12]/30 backdrop-blur-lg p-2.5 rounded-full border border-[#00A86B]/30 transition-all hover:bg-[#001a12]/40 hover:scale-105 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)]">
                              <ArrowLeft className="w-5 h-5 text-[#00A86B]" />
                            </button>
                            <button className="bg-[#001a12]/30 backdrop-blur-lg p-2.5 rounded-full border border-[#00A86B]/30 transition-all hover:bg-[#001a12]/40 hover:scale-105 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] ml-2">
                              <ArrowRight className="w-5 h-5 text-[#00A86B]" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-[#001a12]/30 backdrop-blur-md">
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div>
                            <p className="text-[#999999] text-sm">
                              Artwork Value
                            </p>
                            <p className="text-lg flex items-center">
                              <span className="text-[#00A86B] mr-1">$</span>1.2M
                            </p>
                          </div>
                          <div>
                            <p className="text-[#999999] text-sm">
                              Total Tokens
                            </p>
                            <p className="text-lg flex items-center">
                              <span className="text-[#00A86B] mr-1">#</span>
                              12,000
                            </p>
                          </div>
                          <div>
                            <p className="text-[#999999] text-sm">Investors</p>
                            <p className="text-lg flex items-center">
                              <span className="text-[#00A86B] mr-1">👤</span>420
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between mb-2">
                            <p className="text-[#999999]">Token Distribution</p>
                            <p className="text-[#DDFFDD]">
                              Token Price{" "}
                              <span className="text-[#00A86B]">$100</span>
                            </p>
                          </div>

                          {/* Token Distribution Chart */}
                          <div className="grid grid-cols-10 gap-1 mb-1">
                            {renderTokenDistributionChart()}
                          </div>

                          <div className="flex justify-between mt-1">
                            <p className="text-sm text-[#00A86B]">75% Sold</p>
                            <p className="text-sm text-[#999999]">
                              25% Available
                            </p>
                          </div>
                        </div>

                        <button
                          className="flex justify-between items-center w-full bg-[#001a12]/20 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/30 p-3 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)]"
                          onClick={() => setArtworkDetails(!artworkDetails)}
                        >
                          <span className="font-medium text-[#00A86B] ml-4">
                            Artwork Details
                          </span>
                          <ExpandMore
                            className={`transform transition-transform text-[#00A86B] ${
                              artworkDetails ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {artworkDetails && (
                          <div className="bg-[#001a12]/30 mt-4 mb-4 p-4 rounded-b-md">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-[#999999] text-sm">
                                  Art Style
                                </p>
                                <p className="text-[#DDFFDD]">
                                  Digital Abstract
                                </p>
                              </div>
                              <div>
                                <p className="text-[#999999] text-sm">
                                  Expected Returns
                                </p>
                                <p className="text-[#DDFFDD]">7.5% annual</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-[#999999] text-sm mb-2">
                                Tokenization Benefits
                              </p>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <span className="text-[#00A86B] mr-2">→</span>
                                  <span className="text-[#DDFFDD]">
                                    Fractional ownership starting from $100
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-[#00A86B] mr-2">→</span>
                                  <span className="text-[#DDFFDD]">
                                    Secondary market trading
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-[#00A86B] mr-2">→</span>
                                  <span className="text-[#DDFFDD]">
                                    Verified authenticity and provenance
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-[#00A86B] mr-2">→</span>
                                  <span className="text-[#DDFFDD]">
                                    Transparent ownership records
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}

                        <button className="w-full bg-[#00A86B]/10 backdrop-blur-lg py-3 px-6 mt-4 rounded-full font-medium flex items-center justify-center transition-all border border-[#00A86B]/50 shadow-[0_0_15px_rgba(0,168,107,0.2)] hover:shadow-[0_0_25px_rgba(0,168,107,0.4)] hover:bg-[#00A86B]/20 hover:scale-105">
                          <span className="text-[#00A86B]">
                            View Investment Opportunity
                          </span>
                          <ArrowRightAlt className="ml-2 text-[#00A86B]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* Tokenizable Art Types Section */}
      <section id="artTypes" className="relative container mx-auto px-6 py-20">
        <FadeSection>
          <div className="py-16">
            <div className="container mx-auto px-4 md:px-12 text-center">
              <Typography
                variant="h2"
                className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
              >
                <Box component="div" className="flex flex-wrap justify-center">
                  {/* Large Screens (1 lines) */}
                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Tokenizable Art Types"
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  {/* Small & Medium Screens (2 lines) */}
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Tokenizable Art Types"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                </Box>
              </Typography>

              <p className="text-[#CCCCCC] mb-10 max-w-2xl mx-auto">
                Explore the diverse range of art assets available for
                tokenization
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Fine Art Paintings
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Digital Art NFTs
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Sculptures
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Photography Collections
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Rare Collectibles
                </button>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* Final CTA Section */}
      <section id="invest" className="relative container mx-auto px-6 py-20">
        <FadeSection>
          <div className="py-16">
            <div className="container mx-auto px-4 md:px-12 text-center">

              <Typography
                variant="h2"
                className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
              >
                <Box component="div" className="flex flex-wrap justify-center">
                  {/* Large Screens (1 lines) */}
                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Ready to Invest In "
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Tokenized Art ?"
                      keyPrefix="lg-line2"
                    />
                  </Box>

                  {/* Small & Medium Screens (2 lines) */}
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Ready to Invest In"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="tokenized Art ?"
                      keyPrefix="sm-line2"
                    />
                  </Box>
                </Box>
              </Typography>

              <p className="text-[#CCCCCC] mb-8 max-w-2xl mx-auto">
                Join a new era of art investment with transparent, accessible,
                and fractional ownership
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                
                <CustomButton label="Start Investing" />
                
                <CustomButton label="Learn More" />
                
              </div>
            </div>
          </div>
        </FadeSection>
      </section>
      <FloatingNavigation sections={sections} activeSection={activeSection} />
      </ScrollAnimationWrapper>

      <style jsx global>{`
        .gradient-letter {
          @apply text-transparent bg-clip-text inline-block transition-all duration-300 bg-gradient-to-b from-[#00FFAA] via-[#00A86B] to-[#007d4f];
          animation: pulse-green 5s infinite;
        }

        @keyframes pulse-green {
          0%,
          100% {
            opacity: 0.9;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ArtTokenization;