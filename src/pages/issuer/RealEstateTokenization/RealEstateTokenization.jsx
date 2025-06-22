import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Building, BarChart, ShieldCheck, Globe, Landmark, FileCheck, Coins, Repeat } from "lucide-react";
import PropertyCard from "./PropertyCard";
import BackgroundTheme from "../../../ui/GridBackgroundTheme";
import GradientLetters from "../../../components/GradientLetters";
import { Container, Typography, Box, Grid } from "@mui/material";
import BackgroundPattern from "../../../ui/BackgroundPattern";
import FloatingNavigation from '../../../components/FloatingNavigation';
import useSectionObserver from '../../../hooks/useSectionObserver';
import AnimatedCard from "../../../ui/AnimatedCard";
import CustomButton from "../../../components/CustomButton"
import ScrollAnimationWrapper from "../../../components/ScrollAnimationWrapper";

// Custom components to replace MUI

export const Card = ({ children, className, as3D = false }) => {
  return (
    <motion.div
      whileHover={as3D ? { translateY: -10 } : { scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#121212] relative rounded-xl border border-gray-700 ${
        as3D 
          ? "shadow-[0_20px_25px_-5px_rgba(16,185,129,0.15),0_10px_10px_-5px_rgba(16,185,129,0.08)]" 
          : "shadow-md"
      } backdrop-filter backdrop-blur-sm bg-opacity-80 ${className}`}
    >
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100"></div>
      {children}
    </motion.div>
  );
};

// Main component
const RealEstateTokenization = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(0);
  const [animateTokens, setAnimateTokens] = useState(true); // Set to true initially to skip animation

    // Define sections for navigation
  const sections = [
    { id: "hero", title: "Intro" },
    { id: "redefine", title: "Advantages" },
    { id: "tokenization-process", title: "Process" },
    { id: "tokenization-benefits", title: "Benefits" },
    { id: "cta", title: "Get Started" }
  ];

  const activeSection = useSectionObserver(sections);

  // Properties data
  const properties = [
    {
      name: "Skyline Tower",
      location: "New York, USA",
      type: "Commercial",
      value: "28.5M",
      tokens: "285,000",
      investors: "1,240",
      soldPercentage: 92,
      expectedReturns: "8.2% annual",
    },
    {
      name: "Marina Heights",
      location: "Dubai, UAE",
      type: "Mixed-Use",
      value: "42.1M",
      tokens: "421,000",
      investors: "1,890",
      soldPercentage: 85,
      expectedReturns: "9.4% annual",
    },
  ];

  // Removed the useEffect for token animation so it starts immediately

  // Removed animation variants that were used for initial loading

  return (
    <div className="relative">
      <BackgroundPattern />
      <ScrollAnimationWrapper>
      {/* Hero Section */}
      <section id="hero" className="relative container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center  relative z-10">
          {/* Left side - existing content */}
          <div className="max-w-4xl lg:max-w-none">
            <Typography
              variant="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 pb-1 text-center lg:text-left"
            >
              <Box component="div" className="flex flex-wrap justify-center lg:justify-start">
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <GradientLetters
                    text="Real Estate Tokenization"
                    keyPrefix="lg-line1"
                  />
                </Box>

                {/* Small and Medium screens: 3 lines */}
                <Box className="block lg:hidden">
                  <Box component="div" className="flex flex-wrap justify-center">
                    <GradientLetters text="Real Estate" keyPrefix="sm-line1" />
                  </Box>

                  <Box component="div" className="flex flex-wrap justify-center">
                    <GradientLetters text="Tokenization" keyPrefix="sm-line2" />
                  </Box>
                </Box>
              </Box>
            </Typography>

            <h2 className="text-xl md:text-2xl font-medium mb-6 text-gray-300 text-center lg:text-left">
              Transform Property Investment with Blockchain Technology
            </h2>

            <p className="text-gray-400 mb-8 max-w-2xl text-center lg:text-left lg:mx-0 mx-auto">
              Democratize real estate investment through fractional ownership,
              enhanced liquidity, and global accessibility. The future of property
              investment is here.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <CustomButton
                label="Start Tokenizing"
                />

              <CustomButton
                label="Learn More"
                />
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/assets/sections/realestate-tokenization.png"
                alt="Real Estate Tokenization"
                style={{ width: "90%", height: "90%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionize Section */}
      <section id="redefine" className="container mx-auto px-6 py-20">
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
                    text="Revolutionalize Real Estate"
                    keyPrefix="line1"
                  />
                </Box>

                {/* Second Line */}
                <Box component="div" className="flex flex-wrap  mt-1">
                  <GradientLetters text="Investment" keyPrefix="line2" />
                </Box>
              </Typography>
            </div>

            <p className="text-gray-300 mb-10 text-lg">
              Copym enables investors to tokenize and trade real estate assets
              with unprecedented ease, transparency, and efficiency.
            </p>

            {/* Feature Cards with Fixed Border Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Building className="h-6 w-6 text-emerald-400" />,
                  title: "Fractional Property Ownership",
                  desc: "Invest in premium real estate with lower entry barriers and increased liquidity.",
                },
                {
                  icon: <BarChart className="h-6 w-6 text-emerald-400" />,
                  title: "Dynamic Valuation",
                  desc: "Real-time market pricing and transparent asset valuation through blockchain.",
                },
                {
                  icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
                  title: "Comprehensive Compliance",
                  desc: "Automated regulatory checks and investor verification for seamless transactions.",
                },
                {
                  icon: <Globe className="h-6 w-6 text-emerald-400" />,
                  title: "Global Accessibility",
                  desc: "Trade and invest in international real estate markets without geographical limitations.",
                },
              ].map((feature, index) => (
                <AnimatedCard
                  key={index}
                  className="group hover:border-emerald-900 transition-all duration-500 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="mb-1">
                      <div className="w-12 h-12 rounded-md bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                  {/* Border animation now positioned inside the card boundaries */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-600 to-emerald-400 group-hover:w-full transition-all duration-700" />
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Property Card */}
          <div className="lg:w-full">
            <PropertyCard
              property={properties[currentProperty]}
              animateTokens={animateTokens}
              onNext={() =>
                setCurrentProperty((prev) => (prev + 1) % properties.length)
              }
              onPrev={() =>
                setCurrentProperty((prev) =>
                  prev === 0 ? properties.length - 1 : prev - 1
                )
              }
            />
          </div>
        </div>
      </section>

      {/* Tokenization Process Section */}
      <section id="tokenization-process" className="container mx-auto px-6 py-20 relative">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 w-24 h-24 rounded-full bg-emerald-500 filter blur-[80px] opacity-30" />

          <Typography
            variant="h2"
            className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
          >
            <Box component="div" className="flex flex-wrap justify-center">
              {/* Large Screens (1 lines) */}
              <Box className="hidden lg:block">
                <GradientLetters
                  text="Real Estate Tokenization Process"
                  keyPrefix="lg-line1"
                />
              </Box>

              {/* Small & Medium Screens (2 lines) */}
              <Box className="block lg:hidden">
                <GradientLetters
                  text="Real Estate Tokenization"
                  keyPrefix="sm-line1"
                />
              </Box>
              <Box className="block lg:hidden">
                <GradientLetters text="Process" keyPrefix="sm-line2" />
              </Box>
            </Box>
          </Typography>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Our streamlined process makes tokenizing real estate assets simple
            and efficient
          </p>
        </div>

        {/* Process Steps with connecting lines */}
        <div className="relative">
          {/* Connecting line - removed animation */}
          <div className="absolute hidden md:block top-1/2 left-[10%] right-[10%] h-1 bg-gray-800 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              {
                step: 1,
                icon: <Building className="h-6 w-6 text-emerald-400" />,
                title: "Property Onboarding",
                desc: "Register property details, documentation, and ownership verification.",
              },
              {
                step: 2,
                icon: <FileCheck className="h-6 w-6 text-emerald-400" />,
                title: "Legal Structure",
                desc: "Set up the appropriate legal framework based on jurisdiction and property type.",
              },
              {
                step: 3,
                icon: <Coins className="h-6 w-6 text-emerald-400" />,
                title: "Token Issuance",
                desc: "Create property tokens with compliance and regulatory parameters built-in.",
              },
              {
                step: 4,
                icon: <Repeat className="h-6 w-6 text-emerald-400" />,
                title: "Investment & Trading",
                desc: "Enable primary offering and secondary market trading for property tokens.",
              },
            ].map((process, index) => (
              <div key={index} className="flex justify-center">
                <AnimatedCard className="relative w-full">
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0a0a] border-4 border-emerald-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-emerald-500/20"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {process.step}
                  </motion.div>

                  <div className="pt-8 p-1">
                    <div className="mb-1 flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-900 bg-opacity-20 flex items-center justify-center mb-4 mt-0">
                        {process.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 -mt-3 text-white">
                        {process.title}
                      </h3>
                      <p className="text-gray-400">{process.desc}</p>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="tokenization-benefits" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">

        <Typography
            variant="h2"
            className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
          >
            <Box component="div" className="flex flex-wrap justify-center">
              {/* Large Screens (1 lines) */}
              <Box className="hidden lg:block">
                <GradientLetters
                  text="Benefits of Real Estate Tokenization"
                  keyPrefix="lg-line1"
                />
              </Box>

              {/* Small & Medium Screens (2 lines) */}
              <Box className="block lg:hidden">
                <GradientLetters
                  text="Benefits of Real Estate"
                  keyPrefix="sm-line1"
                />
              </Box>
              <Box className="block lg:hidden">
                <GradientLetters text="Tokenization" keyPrefix="sm-line2" />
              </Box>
            </Box>
          </Typography>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "For Property Owners",
              benefits: [
                "Unlock liquidity without full property sale",
                "Access global investor capital",
                "Streamlined property management",
                "Reduced transaction costs",
              ],
            },
            {
              title: "For Investors",
              benefits: [
                "Lower investment minimums",
                "Portfolio diversification",
                "Secondary market liquidity",
                "Automated income distributions",
              ],
            },
          ].map((benefitGroup, groupIndex) => (
            <div key={groupIndex}>
              <Card className="h-full backdrop-blur-sm group">
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-8 text-emerald-400">
                    {benefitGroup.title}
                  </h3>

                  <ul className="space-y-6">
                    {benefitGroup.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <div className="rounded-full p-1 bg-emerald-500 bg-opacity-20 mr-4">
                          <Check className="h-5 w-5 text-emerald-500" />
                        </div>
                        <span className="text-white text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section with enhanced background */}
      <section id="cta" className="container mx-auto px-6 py-20 text-center relative">
        {/* Advanced background glow - keeping animation as it's not a startup animation */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500 filter blur-[100px] opacity-15"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Animated network lines in background - keeping animation as it provides ambient movement */}
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
                <motion.path
                  key={`line-${i}`}
                  d={`M0 ${y1} Q 50 ${y1 < 50 ? y1 + 20 : y1 - 20}, 100 ${y2}`}
                  stroke="#10b981"
                  strokeWidth="0.4"
                  fill="none"
                  initial={{ pathLength: 1, opacity: 0.5 }} // Set initial state to final state
                  animate={{
                    pathLength: 1,
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
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
                  text="Ready to Transform Your"
                  keyPrefix="lg-line1"
                />
              </Box>
              <Box className="hidden lg:block">
                <GradientLetters
                  text="Real Estate Portfolio?"
                  keyPrefix="lg-line2"
                />
              </Box>

              {/* Small & Medium Screens (2 lines) */}
              <Box className="block lg:hidden">
                <GradientLetters
                  text="Ready to Transform Your"
                  keyPrefix="sm-line1"
                />
              </Box>
              <Box className="block lg:hidden">
                <GradientLetters text="Real Estate Portfolio?" keyPrefix="sm-line2" />
              </Box>
            </Box>
          </Typography>

          <p className="text-gray-300 mb-10 text-xl">
            Join thousands of property owners and investors already tokenizing
            real estate on the Copym platform.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            
            <CustomButton label="Start Tokenizing"
            />

            <CustomButton label="Schedule Consultation"
            />
        
          </div>
        </div>
      </section>
      </ScrollAnimationWrapper>
      <FloatingNavigation sections={sections} activeSection={activeSection} />
    </div>
  );
};


export default RealEstateTokenization;