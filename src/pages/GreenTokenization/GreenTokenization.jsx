import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Box, Typography, Container, Grid  } from "@mui/material";
import { ArrowLeft, ArrowRight, Leaf, Users, Shield, Coins, Recycle, LineChart, Globe2, TreePine, Building2, Lock, Sparkles } from "lucide-react";
import GreenGlobe from "../../components/GreenGlobe";
import EarthGlb from "../../components/EarthGlb";
import ComparativeSnapshot from "./ComparisonCard";
import GradientLetters from "../../components/GradientLetters";
import FloatingNavigation from '../../components/FloatingNavigation';
import useSectionObserver from '../../hooks/useSectionObserver';
import BackgroundPattern from "../../ui/BackgroundPattern";
import CustomButton from "../../components/CustomButton"
import ScrollAnimationWrapper from "../../components/ScrollAnimationWrapper";
const esgData = [
  {
    title: "Environmental",
    icon: <Leaf className="w-8 h-8 text-[#00A86B] mb-4" />,
    points: [
      "We champion sustainable innovation by tokenizing responsibly sourced commodities like gold and copper, reducing emissions through digital infrastructure, and promoting circular economy practices in asset creation.",
    ],
  },
  {
    title: "Social",
    icon: <Users className="w-8 h-8 text-[#00A86B] mb-4" />,
    points: [
      "Our platform fosters inclusive finance through fractional ownership, supports ethical labor practices, and drives community development by embedding social impact into every tokenized asset.",
    ],
  },
  {
    title: "Governance",
    icon: <Shield className="w-8 h-8 text-[#00A86B] mb-4" />,
    points: [
      "With blockchain transparency, smart contract automation, and alignment to global ESG standards, we deliver secure, verifiable governance across all tokenized investments.",
    ],
  },
];

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

const GreenTokenization = () => {
  // Define sections for navigation
  const sections = [
    { id: "hero", title: "Overview" },
    { id: "esg-commitments", title: "ESG" },
    { id: "metals", title: "Metals" },
    { id: "portfolio", title: "Portfolio" },
    { id: "blockchain", title: "Blockchain" },
    { id: "comparison", title: "Comparison" },
    // { id: "cta", title: "Start" },
  ];
  
  // Use the custom hook to track active section
  const activeSection = useSectionObserver(sections);

  return (
    <>
      <div className="text-white min-h-screen relative overflow-hidden font-sans">
        <BackgroundPattern />
        {/* Floating Navigation */}
        <FloatingNavigation sections={sections} activeSection={activeSection} />
        <ScrollAnimationWrapper>
       
        {/* Hero Section */}
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
                          text="Green Tokenization"
                          keyPrefix="lg-line1"
                        />
                      </Box>
                      <Box className="hidden lg:block">
                        <GradientLetters
                          text="& ESG Integration"
                          keyPrefix="lg-line2"
                        />
                      </Box>

                      {/* Small and Medium screens: 3 lines */}
                      <Box className="block lg:hidden">
                        <Box component="div" className="flex flex-wrap ">
                          <GradientLetters
                            text="Green Tokenization"
                            keyPrefix="sm-line1"
                          />
                        </Box>
                        <Box component="div" className="flex flex-wrap ">
                          <GradientLetters
                            text="& ESG Integration"
                            keyPrefix="sm-line3"
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Typography>
                </div>

                <p className="text-base md:text-lg text-[#CCCCCC] leading-relaxed font-futuristic text-center md:text-left">
                  <Globe2 className="inline-block w-5 h-5 text-[#00A86B] mr-2 mb-1" />
                  <span className="text-[#00A86B] font-semibold">Copym</span> revolutionizes sustainable investing by converting real-world
                  assets into secure digital tokens. From <span className="text-[#00A86B] font-medium">metals</span> to ESG-aligned funds,
                  our blockchain-powered approach ensures transparency, access, and
                  lasting impact — aligning your values with{" "}
                  <span className="text-[#00A86B] font-semibold">futuristic finance</span>.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                  <CustomButton
                  label="Start Green Investing"/>
                    
                  <CustomButton
                  label="Learn More"/>
                    
                  
                </div>
              </div>

              {/* Go Green Image Section - Right */}
              <div className="relative w-full md:w-1/2 flex items-center justify-center md:justify-end">
                <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] overflow-visible">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="/assets/sections/gogreen.png" 
                      alt="Go Green" 
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>
        </section>

        {/* ESG Commitment Boxes */}
        <section id="esg-commitments" className="relative container mx-auto px-6 py-20">
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
                  text="Our ESG Commitments"
                  keyPrefix="lg-line1"
                />
              </Box>

              {/* Small & Medium Screens (1 lines) */}
              <Box className="block lg:hidden">
                <GradientLetters
                  text="Our ESG Commitments"
                  keyPrefix="sm-line1"
                />
              </Box>
            </Box>
          </Typography>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-16">
                  {esgData.map((section, idx) => (
                    <div
                      key={idx}
                      className="flex-1 relative rounded-2xl p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]"
                    >
                      <div className="bg-black/90 backdrop-blur-md rounded-2xl p-6 space-y-4 text-center shadow-lg flex flex-col h-full">
                        <div className="flex flex-col items-center justify-center">
                          {section.icon}
                          <h2 className="text-xl font-bold text-[#00A86B] font-orbitron mt-2">
                            {section.title}
                          </h2>
                        </div>
                        <ul className="text-[#CCCCCC] font-futuristic text-sm space-y-2 flex-grow leading-relaxed">
                          {section.points.map((point, i) => (
                            <li key={i} className="text-left">• {point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>
        </section>

        {/* Other Sections */}
        <FadeSection>
          <section className="space-y-32 text-[#CCCCCC] px-4">
            {/* Metals */}
            <div id="metals" className="max-w-6xl mx-auto">
              <div className="p-8 grid md:grid-cols-2 gap-8 sm:gap-12">
                <div className="order-2 md:order-1">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                    <Coins className="w-8 h-8 text-[#00A86B] flex-shrink-0" />

                <Typography
                  variant="h2"
                  className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
                  >
                  <Box component="div" className="flex flex-wrap ">
                    {/* Large Screens (1 lines) */}
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Focus on Metals:"
                        keyPrefix="lg-line1"
                      />
                    </Box>
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Our Core Offering"
                        keyPrefix="lg-line1"
                      />
                    </Box>

                    {/* Small & Medium Screens (1 lines) */}
                    <Box className="block lg:hidden">
                      <GradientLetters
                        text="Focus on Metals:"
                        keyPrefix="sm-line1"
                      />
                    </Box>
                    <Box className="block lg:hidden">
                      <GradientLetters
                        text="Our Core Offering"
                        keyPrefix="sm-line1"
                      />
                    </Box>
                  </Box>
                </Typography>

                  </div>
                  <div className="space-y-4">
                    <p className="text-base sm:text-lg font-futuristic text-left leading-relaxed">
                      <span className="text-[#00A86B] font-semibold">Metals</span> are at the center of our strategy due to their critical role in sustainable technology.
                    </p>
                    <p className="text-base sm:text-lg font-futuristic text-left leading-relaxed">
                      Each tokenized metal is vetted for <span className="text-[#00A86B] font-medium">sustainable sourcing</span>, traceability, and environmental impact, with transparent records across the value chain.
                    </p>
                  </div>
                </div>
                <div className="relative h-[300px] md:h-full min-h-[300px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2">
                  <img 
                    src="assets/images/sustainable-metals.jpeg" 
                    alt="Sustainable Metals Mining" 
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div id="portfolio" className="p-8 grid md:grid-cols-2 gap-6">
              <img src="assets/images/Diversified-ESG-Portfolio.jpeg" alt="Diversified ESG Portfolio" className="rounded-xl shadow-md" />
              <div>
                <div className="flex items-center gap-3 mb-4 lg:mt-14">
                  <LineChart className="w-8 h-8 text-[#00A86B]" />

                  <Typography
                  variant="h2"
                  className="text-2xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
                  >
                  <Box component="div" className="flex flex-wrap ">
                    {/* Large Screens (1 lines) */}
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Diversified ESG"
                        keyPrefix="lg-line1"
                      />
                    </Box>
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Commodities Portfolio"
                        keyPrefix="lg-line1"
                      />
                    </Box>

                    {/* Small & Medium Screens (1 lines) */}
                    <Box className="block lg:hidden">
                      <GradientLetters
                        text="Diversified ESG"
                        keyPrefix="sm-line1"
                      />
                    </Box>
                    <Box className="block lg:hidden">
                      <GradientLetters
                        text="Commodities Portfolio"
                        keyPrefix="sm-line1"
                      />
                    </Box>
                  </Box>
                </Typography>

                </div>
                <p className="text-base font-futuristic text-left leading-normal">
                  While <span className="text-[#00A86B] font-semibold">metals</span> are our flagship, we are expanding into other ESG-aligned asset categories. This diversified approach ensures investors can build a balanced and impactful <span className="text-[#00A86B] font-medium">ESG portfolio</span>.
                </p>
              </div>
            </div>

            {/* Blockchain Role */}
            <div id="blockchain" className="rounded-2xl p-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 text-center sm:text-left">
                <Lock className="w-8 h-8 text-[#00A86B]" />

                <Typography
                  variant="h2"
                  className="text-3xl sm:text-4xl md:text-5xl text-center"
                  >
                  <Box component="div" className="flex flex-wrap justify-center">
                    {/* Large Screens (1 lines) */}
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="The Role of Blockchain"
                        keyPrefix="lg-line1"
                      />
                    </Box>

                    {/* Small & Medium Screens (1 lines) */}
                    <Box className="block lg:hidden">
                      <GradientLetters
                        text="The Role of Blockchain"
                        keyPrefix="sm-line1"
                      />
                    </Box>
                  </Box>
                </Typography>
                
              </div>
              <ul className="text-sm sm:text-base font-futuristic text-left space-y-4 max-w-3xl mx-auto leading-normal">
                <li className="flex items-start sm:items-center gap-2">
                  <Recycle className="w-5 h-5 text-[#00A86B] mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div>
                    <strong className="text-[#00A86B] block sm:inline">Traceability:</strong>
                    <span className="block sm:inline sm:ml-1">Every asset's lifecycle is visible, preventing greenwashing.</span>
                  </div>
                </li>
                <li className="flex items-start sm:items-center gap-2">
                  <Coins className="w-5 h-5 text-[#00A86B] mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div>
                    <strong className="text-[#00A86B] block sm:inline">Liquidity:</strong>
                    <span className="block sm:inline sm:ml-1">Tokenized assets are tradable 24/7 with global reach.</span>
                  </div>
                </li>
                <li className="flex items-start sm:items-center gap-2">
                  <Shield className="w-5 h-5 text-[#00A86B] mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div>
                    <strong className="text-[#00A86B] block sm:inline">Security:</strong>
                    <span className="block sm:inline sm:ml-1">Smart contracts ensure direct, tamper-proof ownership and compliance.</span>
                  </div>
                </li>
                <li className="flex items-start sm:items-center gap-2">
                  <Users className="w-5 h-5 text-[#00A86B] mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div>
                    <strong className="text-[#00A86B] block sm:inline">Accessibility:</strong>
                    <span className="block sm:inline sm:ml-1">Lower entry points via fractionalization expand participation in ESG investing.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Comparison */}
            <div id="comparison" className="max-w-6xl mx-auto relative rounded-2xl p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]">
              <div className="bg-black/90 backdrop-blur-md rounded-2xl p-8 text-center">

              <Typography
                  variant="h2"
                  className="text-3xl sm:text-4xl md:text-5xl text-center"
                  >
                  <Box component="div" className="flex flex-col flex-wrap justify-center">
                    {/* Large Screens (1 lines) */}
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Comparative Snapshot:"
                        keyPrefix="lg-line1"
                      />
                    </Box>
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Metals vs. Other ESG Assets"
                        keyPrefix="lg-line2"
                      />
                    </Box>

                    {/* Small & Medium Screens (3 lines) */}
                    <Box className="block lg:hidden">
                      <GradientLetters
                        text="Comparative Snapshot:"
                        keyPrefix="sm-line1"
                      />
                    </Box>
                    <Box className="block lg:hidden">
                      <GradientLetters
                        text="Metals vs. Other ESG"
                        keyPrefix="sm-line2"
                      />
                    </Box>
                    <Box className="block lg:hidden">
                      <GradientLetters
                        text="Assets"
                        keyPrefix="sm-line3"
                      />
                    </Box>
                  </Box>
                </Typography>

                <div className="overflow-x-auto">
                  <ComparativeSnapshot />
                </div>
                <p className="text-sm sm:text-base font-futuristic text-left mt-4 leading-normal max-w-2xl mx-auto px-2">
                  This clear focus ensures <span className="text-[#00A86B] font-semibold">metals</span> lead our impact, with complementary assets scaling the platform's ESG reach.
                </p>
              </div>
            </div>
          </section>
        </FadeSection>

        {/* Final CTA Section */}
        <section id="cta" className="relative container mx-auto px-6 py-20">
          <FadeSection>
            <div className="py-16">
              <div className="container mx-auto px-4 md:px-12 text-center">

              <Typography
                  variant="h2"
                  className="text-3xl sm:text-4xl md:text-5xl text-center mb-4 pb-1"
                  >
                  <Box component="div" className="flex flex-col flex-wrap justify-center">
                    {/* Large Screens (1 lines) */}
                    <Box className="hidden lg:block">
                      <GradientLetters
                        text="Transform Your Investment Impact"
                        keyPrefix="lg-line1"
                      />
                    </Box>

                    {/* Small & Medium Screens (3 lines) */}
                    <Box className="block lg:hidden">
                      <GradientLetters
                        text="Transform Your"
                        keyPrefix="sm-line1"
                      />
                    </Box>
                    <Box className="block lg:hidden">
                      <GradientLetters
                        text="Investment Impact"
                        keyPrefix="sm-line2"
                      />
                    </Box>
                  </Box>
                </Typography>

                <p className="text-[#CCCCCC] mb-8 max-w-2xl mx-auto">
                  Join the sustainable revolution in asset tokenization.
                  <br/> 
                  Make your investments count for the planet.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                 
                 <CustomButton
                 label="Start Green Investing"/>
                    
                 
                   <CustomButton
                 label="Learn More"/>
                    
                  
                </div>
              </div>
            </div>
          </FadeSection>
        </section>
        </ScrollAnimationWrapper>
      </div>
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
    </>
  );
};

export default GreenTokenization;