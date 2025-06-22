import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightAlt,
  CheckCircleOutline,
  Security,
} from "@mui/icons-material";
import { Leaf, Globe2, Shield, Users } from "lucide-react";
import { Box, Typography, Grid, Container } from "@mui/material";
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



const CarbonCreditsTokenization = () => {
  
  // Define sections for navigation
  const sections = [
    { id: "hero", title: "Overview" },
    { id: "features", title: "Features" },
    { id: "types", title: "Credit Types" },
    { id: "benefits", title: "Benefits" },
    { id: "cta", title: "Get Started" }
  ];
  
const activeSection = useSectionObserver(sections);

  return (
    <div className="text-white min-h-screen relative overflow-hidden font-sans">
      <BackgroundPattern />
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
                    {/* Large Screens (2 lines) */}
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Carbon Credits"
                        keyPrefix="lg-line1"
                      />
                    </Box>
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Tokenization"
                        keyPrefix="lg-line2"
                      />
                    </Box>

                    {/* Small and Medium screens: 2 lines */}
                    <Box className="block lg:hidden">
                      <Box component="div" className="flex flex-wrap ">
                        <GradientLetters
                          text="Carbon Credits"
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

              <p className="text-base md:text-lg text-[#CCCCCC] leading-relaxed font-futuristic text-center md:text-left">
                <Globe2 className="inline-block w-5 h-5 text-[#00A86B] mr-2 mb-1" />
                <span className="text-[#00A86B] font-semibold">Revolutionize</span> environmental 
                investment through blockchain technology, making <span className="text-[#00A86B] font-medium">carbon offset</span> projects accessible
                to global investors for <span className="text-[#00A86B] font-semibold">positive climate impact</span>.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">

                <CustomButton label="Start Green Investment" />
                
                <CustomButton label="Speak with Experts" />
                
              </div>
            </div>

            {/* Leaf Icon - Right */}
            <div className="relative w-full md:w-1/2 flex items-start justify-center md:justify-start md:-mt-20">
              <div className="w-[450px] md:w-[600px] h-[450px] md:h-[600px] md:ml-0 flex items-center justify-center">
                <img 
                  src="/assets/sections/carboncredits-tokenization-1.png" 
                  alt="Carbon Credits Tokenization" 
                  className="w-[70%] h-[70%] md:w-[80%] md:h-[80%] object-contain"
                />
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="relative container mx-auto px-6 py-20">
        <FadeSection>
          <div className="py-16">
            <div className="container mx-auto">

            <Typography
                variant="h2"
                className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
              >
                <Box component="div" className="flex flex-wrap justify-center">
                  {/* Large Screens (1 lines) */}
                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Revolutionize Environmental Investment"
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  {/* Small & Medium Screens (2 lines) */}
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Revolutionize"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Environmental Investment"
                      keyPrefix="sm-line2"
                    />
                  </Box>
                </Box>
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <AnimatedCard>
                <div className=" p-6 ">
                  <div className="text-[#00A86B] mb-4">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Environmental Impact</h3>
                  <p className="text-[#CCCCCC]">
                    Direct investment in carbon offset and sustainability projects
                  </p>
                </div>
                </AnimatedCard>

                {/* Card 2 */}
                <AnimatedCard>
                <div className=" p-6 ">
                  <div className="text-[#00A86B] mb-4">
                    <Globe2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Global Marketplace</h3>
                  <p className="text-[#CCCCCC]">
                Trade carbon credits across international markets
              </p>
            </div>
            </AnimatedCard>

                {/* Card 3 */}
                <AnimatedCard>
                <div className=" p-6 ">
                  <div className="text-[#00A86B] mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#DDFFDD]">Verified Compliance</h3>
                  <p className="text-[#CCCCCC]">
                    Blockchain-verified carbon credit authenticity and tracking
                  </p>
                </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* Tokenizable Carbon Credit Types */}
      <section id="types" className="relative container mx-auto px-6 py-20">
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
                      text="Tokenizable Carbon Credit Types"
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  {/* Small & Medium Screens (2 lines) */}
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Tokenizable Carbon"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Credit Types"
                      keyPrefix="sm-line2"
                    />
                  </Box>
                </Box>
              </Typography>

              <p className="text-[#CCCCCC] mb-10 max-w-2xl mx-auto">
                Explore the diverse range of carbon credit assets available for tokenization
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Voluntary Carbon Offsets
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Compliance Carbon Credits
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Renewable Energy Certificates
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Forestry Conservation
                </button>
                <button className="bg-[#001a12]/10 backdrop-blur-lg border border-[#00A86B]/30 hover:bg-[#001a12]/20 text-[#DDFFDD] px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:scale-105">
                  Clean Technology Projects
                </button>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative container mx-auto px-6 py-20">
        <FadeSection>
          <div className="py-16">
            <div className="max-w-6xl mx-auto bg-[#001a12]/30 backdrop-blur-x4 border border-[#00A86B]/20 p-4 sm:p-8 rounded-2xl shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 text-center sm:text-left">
                <Users className="w-8 h-8 text-[#00A86B]" />

                <Typography
                variant="h2"
                className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
              >
                <Box component="div" className="flex flex-wrap justify-center">
                  {/* Large Screens (1 lines) */}
                  <Box className="hidden lg:block">
                    <GradientLetters
                      text="Key Benefits of Carbon Credit Tokenization"
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  {/* Small & Medium Screens (2 lines) */}
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Key Benefits of Carbon"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Credit Tokenization"
                      keyPrefix="sm-line2"
                    />
                  </Box>
                </Box>
              </Typography>

              </div>
              <p className="text-[#CCCCCC] text-center mb-8 max-w-3xl mx-auto">
                Unlock the potential of sustainable investments through blockchain technology
              </p>
              <ul className="text-sm sm:text-base font-futuristic text-left space-y-4 max-w-3xl mx-auto leading-normal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Transparent and verifiable carbon credit tracking</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Real-time market pricing and liquidity</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Fractional ownership of environmental projects</span>
            </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Automated compliance and reporting</span>
            </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Democratized access to sustainability investments</span>
            </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutline className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[#DDFFDD]">Direct positive impact on climate change</span>
            </div>
                </li>
              </ul>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative container mx-auto px-6 py-20">
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
                      text="Ready to Make a Sustainable Impact ?"
                      keyPrefix="lg-line1"
                    />
                  </Box>

                  {/* Small & Medium Screens (2 lines) */}
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Ready to Make a"
                      keyPrefix="sm-line1"
                    />
                  </Box>
                  <Box className="block lg:hidden">
                    <GradientLetters
                      text="Sustainable Impact ?"
                      keyPrefix="sm-line2"
                    />
                  </Box>
                </Box>
              </Typography>

              <p className="text-[#CCCCCC] mb-8 max-w-2xl mx-auto">
                Join the future of environmental investment by tokenizing carbon credits 
                and supporting global sustainability efforts.
              </p>
          <div className="flex flex-wrap justify-center gap-4">
            
                <CustomButton label="Start Your Green Investment Journey" />
                  {/* <ArrowRightAlt className="ml-2 text-[#00A86B]" /> */}
            
                <CustomButton label="Speak with Experts" />
            
          </div>
        </div>
      </div>
        </FadeSection>
      </section>
      
      {/* Floating Navigation */}
      <FloatingNavigation sections={sections} activeSection={activeSection} />
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

export default CarbonCreditsTokenization;