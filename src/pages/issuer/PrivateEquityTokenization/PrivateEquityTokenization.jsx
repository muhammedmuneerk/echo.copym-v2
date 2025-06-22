import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LockIcon from "@mui/icons-material/Lock";
import { ArrowRightAlt } from "@mui/icons-material";
import {Box, Typography,Grid, } from "@mui/material";
import { Globe2, ChartBar, Shield, Building2, BarChart3 } from "lucide-react";
import BackgroundTheme from "../../../ui/GridBackgroundTheme";
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

const PrivateEquityTokenization = () => {
  const [investmentDetails, setInvestmentDetails] = useState(false);
  
  // Define sections for navigation
  const sections = [
    { id: "hero", title: "Overview" },
    { id: "features", title: "Features" },
    { id: "types", title: "Asset Types" },
    { id: "investment", title: "Investment" },
    { id: "benefits", title: "Benefits" },
    { id: "cta", title: "Get Started" }
  ];
  
  const activeSection = useSectionObserver(sections);

  return (
    <div className="text-white min-h-screen relative overflow-hidden font-sans">
      <BackgroundPattern/>

      <ScrollAnimationWrapper>
      {/* Floating Navigation */}
      <FloatingNavigation sections={sections} activeSection={activeSection} />

      {/* Content */}
      <div className="relative z-10 px-6 pt-24 pb-24 space-y-24">
        {/* Hero Section */}
        <FadeSection>
          <div id="hero" className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 text-left">
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
                        text="Private Equity"
                        keyPrefix="lg-line1"
                      />
                    </Box>
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Tokenization"
                        keyPrefix="lg-line2"
                      />
                    </Box>

                    {/* Small and Medium screens: 1 lines */}
                    <Box className="block lg:hidden">
                      <Box component="div" className="flex flex-wrap ">
                        <GradientLetters
                          text="Private Equity"
                          keyPrefix="sm-line1"
                        />
                      </Box>
                      <Box component="div" className="flex flex-wrap ">
                        <GradientLetters
                          text="Tokenization"
                          keyPrefix="sm-line1"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Typography>
              </div>

              <p className="text-base md:text-lg text-[#CCCCCC] leading-relaxed font-futuristic text-center md:text-left">
                <Globe2 className="inline-block w-5 h-5 text-[#00A86B] mr-2 mb-1" />
                <span className="text-[#00A86B] font-semibold">Transform</span> private equity investing through blockchain technology, making 
                <span className="text-[#00A86B] font-medium"> premium opportunities</span> accessible to global investors with 
                <span className="text-[#00A86B] font-semibold"> increased liquidity</span>.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">

                <CustomButton label="Unlock Investment Horizons" />
                
                <CustomButton label="Learn More" />
                
              </div>
            </div>

            {/* Chart Icon - Right */}
            <div className="relative w-full md:w-1/2 flex items-start justify-center md:justify-start md:-mt-20">
              <div className="w-[450px] md:w-[600px] h-[450px] md:h-[600px] md:ml-0 flex items-center justify-center">
                <img 
                  src="/assets/sections/privateequity-tokenization-1.png" 
                  alt="Private Equity Tokenization" 
                  className="w-[70%] h-[70%] md:w-[80%] md:h-[80%] object-contain"
                />
              </div>
            </div>
          </div>
        </FadeSection>

        {/* Features Section */}
        <FadeSection>
          <div id="features" className="container mx-auto">
            
          <Typography
                variant="h2"
                className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
              >
                <Box component="div" className="flex flex-wrap justify-center">
                  {/* Large Screens (1 lines) */}
                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Key Features"
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  {/* Small & Medium Screens (2 lines) */}
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Key Features"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                </Box>
              </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <AnimatedCard>
              <div className=" p-6 ">
                <div className="text-[#00A86B] mb-4">
                  <TrendingUpIcon fontSize="large" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Increased Liquidity</h3>
                <p className="text-[#CCCCCC]">
                  Transform illiquid private equity investments into tradable assets
                </p>
              </div>
              </AnimatedCard>

              {/* Card 2 */}
              <AnimatedCard>
              <div className=" p-6 ">
                <div className="text-[#00A86B] mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Regulatory Compliance</h3>
                <p className="text-[#CCCCCC]">
                  Comprehensive legal frameworks for secure tokenization
                </p>
              </div>
              </AnimatedCard>

              {/* Card 3 */}
              <AnimatedCard>
              <div className=" p-6 ">
                <div className="text-[#00A86B] mb-4">
                  <Globe2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Global Accessibility</h3>
                <p className="text-[#CCCCCC]">
                Democratize access to premium investment opportunities
                </p>
              </div>
              </AnimatedCard>
            </div>
          </div>
        </FadeSection>

        {/* Tokenizable Types */}
        <FadeSection>
          <div id="types" className="py-16">
            <div className="container mx-auto px-4 md:px-12 text-center">

            <Typography
                variant="h2"
                className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
              >
                <Box component="div" className="flex flex-wrap justify-center">
                  {/* Large Screens (1 lines) */}
                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Tokenizable Private Equity Types"
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  {/* Small & Medium Screens (2 lines) */}
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Tokenizable Private"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Equity Types"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                </Box>
              </Typography>
              
              <p className="text-[#CCCCCC] mb-10 max-w-2xl mx-auto">
                Explore the diverse range of private equity assets available for tokenization
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Venture Capital Funds
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Private Business Equity
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Private Debt
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Revenue Sharing Agreements
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Growth Equity Investments
                </button>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* Featured Investment Card */}
        <FadeSection>
          <div id="investment" className="py-16">
            <div className="container mx-auto px-4 md:px-12">
              <div className="max-w-4xl mx-auto">
                <div className="bg-[#001a12]/30 backdrop-blur-md border border-[#00A86B]/20 rounded-2xl overflow-hidden">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-[#004b2f] to-[#00A86B] p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-2xl font-bold text-[#DDFFDD]">Tech Growth Fund</h3>
                          <p className="text-[#CCCCCC]">
                            Series B • SaaS Focus
                          </p>
                        </div>
                        <div>
                          <Building2 className="w-12 h-12 text-[#DDFFDD]/50" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-[#001a12]/30 backdrop-blur-md">
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        <div>
                          <p className="text-[#999999] text-sm">Fund Size</p>
                          <p className="text-lg flex items-center">
                            <span className="text-[#00A86B] mr-1">$</span>50M
                          </p>
                        </div>
                        <div>
                          <p className="text-[#999999] text-sm">Total Tokens</p>
                          <p className="text-lg flex items-center">
                            <span className="text-[#00A86B] mr-1">#</span>500,000
                          </p>
                        </div>
                        <div>
                          <p className="text-[#999999] text-sm">Investors</p>
                          <p className="text-lg flex items-center">
                            <span className="text-[#00A86B] mr-1">👤</span>380
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-[#00A86B] font-medium mb-2">Investment Highlights</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-[#00A86B] mr-2">→</span>
                              <span className="text-[#DDFFDD]">
                                Portfolio of 12 high-growth SaaS companies
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-[#00A86B] mr-2">→</span>
                              <span className="text-[#DDFFDD]">
                                Average annual return of 18.5% over 5 years
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-[#00A86B] mr-2">→</span>
                              <span className="text-[#DDFFDD]">
                                Quarterly distributions via smart contracts
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-[#00A86B] mr-2">→</span>
                              <span className="text-[#DDFFDD]">
                                Secondary market trading available
                              </span>
                            </li>
                          </ul>
                        </div>

                        <button className="w-full bg-[#00A86B]/10 backdrop-blur-lg py-3 px-6 rounded-full font-medium flex items-center justify-center transition-all border border-[#00A86B]/50 shadow-[0_0_15px_rgba(0,168,107,0.2)] hover:shadow-[0_0_25px_rgba(0,168,107,0.4)] hover:bg-[#00A86B]/20 hover:scale-105">
                          <span className="text-[#00A86B]">View Investment Opportunity</span>
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

        {/* Benefits Section */}
        <FadeSection>
          <div id="benefits" className="container mx-auto">

          <Typography
                variant="h2"
                className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
              >
                <Box component="div" className="flex flex-wrap justify-center">
                  {/* Large Screens (1 lines) */}
                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Benefits of Private Equity Tokenization"
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  {/* Small & Medium Screens (2 lines) */}
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Benefits of Private "
                      keyPrefix="sm-line1"
                    />
                  </Box>
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Equity Tokenization"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                </Box>
              </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <AnimatedCard>
              <div className=" p-6 ">
                <div className="text-[#00A86B] mb-4">
                  <TrendingUpIcon fontSize="large" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Increased Liquidity</h3>
                <p className="text-[#CCCCCC]">
                  Transform illiquid private equity investments into tradable assets
                </p>
              </div>
              </AnimatedCard>

              {/* Card 2 */}
              <AnimatedCard>
              <div className=" p-6 ">
                <div className="text-[#00A86B] mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Regulatory Compliance</h3>
                <p className="text-[#CCCCCC]">
                  Comprehensive legal frameworks for secure tokenization
                </p>
              </div>
              </AnimatedCard>

              {/* Card 3 */}
              <AnimatedCard>
              <div className=" p-6 ">
                <div className="text-[#00A86B] mb-4">
                  <Globe2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Global Accessibility</h3>
                <p className="text-[#CCCCCC]">
                Democratize access to premium investment opportunities
                </p>
              </div>
              </AnimatedCard>
            </div>
          </div>
        </FadeSection>

        {/* CTA Section */}
        <FadeSection>
          <div id="cta" className="relative">
            <div className="absolute "></div>
            <div className="container mx-auto text-center relative z-10 px-6 py-24">

            <Typography
                variant="h2"
                className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
              >
                <Box component="div" className="flex flex-wrap justify-center">
                  {/* Large Screens (1 lines) */}
                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Ready to Get Started ?"
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  {/* Small & Medium Screens (2 lines) */}
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Ready to Get Started ?"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                </Box>
              </Typography>


              <p className="text-lg mb-12 max-w-2xl mx-auto text-[#CCCCCC]">
                Join the future of private equity investment. Start tokenizing your assets today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                
                <CustomButton label="Start Investing" />
                
                <CustomButton label="Contact Us" />
                
              </div>
            </div>
          </div>
        </FadeSection>
      </div>
      </ScrollAnimationWrapper>
      
      <style jsx global>{`
        .gradient-letter {
          @apply text-transparent bg-clip-text inline-block transition-all duration-300 bg-gradient-to-b from-[#00FFAA] via-[#00A86B] to-[#007d4f];
          animation: pulse-green 5s infinite;
        }
        
        @keyframes pulse-green {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PrivateEquityTokenization;