import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { KeyboardArrowDown, Title } from "@mui/icons-material";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";
import GradientLetters from "./GradientLetters";
import Buttons from "./CustomButton";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  // Navigate to the Tokenization page
  const handleExplore = () => navigate("/tokenization");

  // Placeholder for other actions (kept to avoid reference errors)
  const handleAction = () => {};

  return (
    <Box
      className="min-h-screen relative overflow-hidden"
      sx={{
        backgroundImage: "url(/assets/sections/rwa-hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-black/20">
        <Container
          maxWidth="xl"
          className="relative z-20 px-4 sm:px-6 md:px-8" // Added responsive padding
        >
          <motion.div
            className="flex flex-col items-center justify-center min-h-screen text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full" // Added full width for better mobile alignment
            >
              {/* Improved responsive heading with proper text scaling */}

              <Typography
                variant="h1"
                className="mt-16 sm:mt-20 text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight sm:leading-snug text-center"
                sx={{ wordBreak: "break-word" }}
              >
                {/* Large/Medium Screens: Full lines */}
                <Box component="div" className="hidden md:block">
                  <GradientLetters
                    text="One Platform. All Chains."
                    keyPrefix="line1-lg"
                    className="gradient-letter-1"
                  />
                </Box>
                <Box component="div" className="hidden md:block mt-1">
                  <GradientLetters
                    text="No Barriers."
                    keyPrefix="line2-char"
                    className="gradient-letter-1"
                  />
                </Box>

                {/* Tablet Screens: Adjusted lines */}
                <Box component="div" className="hidden sm:block md:hidden">
                  <GradientLetters
                    text="The Complete Ecosystem"
                    keyPrefix="line1-md-1"
                    className="gradient-letter-1"
                  />
                </Box>
                <Box component="div" className="hidden sm:block md:hidden">
                  <GradientLetters
                    text="for Real World"
                    keyPrefix="line1-md-2"
                    className="gradient-letter-1"
                  />
                </Box>
                <Box component="div" className="hidden sm:block md:hidden mt-1">
                  <GradientLetters
                    text="Asset Tokenization"
                    keyPrefix="line2-md-1"
                    className="gradient-letter-1"
                  />
                </Box>

                {/* Mobile Screens: More compact lines */}
                <Box component="div" className="block sm:hidden">
                  <GradientLetters
                    text="Complete Ecosystem"
                    keyPrefix="line1-sm-1"
                    className="gradient-letter-1"
                  />
                </Box>
                <Box component="div" className="block sm:hidden">
                  <GradientLetters
                    text="for Real World Assets"
                    keyPrefix="line1-sm-2"
                    className="gradient-letter-1"
                  />
                </Box>
                <Box component="div" className="block sm:hidden">
                  <GradientLetters
                    text="Tokenization"
                    keyPrefix="line1-sm-3"
                    className="gradient-letter-1"
                  />
                </Box>
              </Typography>

              {/* Improved subtitle with responsive text size and width */}
              <Typography
                variant="body1"
                className="text-text-secondary mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto text-base sm:text-lg text-white/80"
              >
                From issuance to AI-driven investing — Copym unlocks real-world
                asset tokenization for everyone, with no gas, no fees, and no
                limits.
              </Typography>

              {/* Responsive button container with improved spacing */}
              <div className="flex justify-center px-4 sm:px-0">
                <div className="md:flex lg:flex-row gap-3 sm:gap-4">
                  <div className="my-3">
                    <CustomButton
                      label="Explore Asset Tokenization"
                      onClick={handleExplore}
                    />
                  </div>

                  <div className="my-3">
                    <CustomButton
                      label="Start Tokenizing Now"
                      onClick={() => handleAction()}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Improved "Discover More" indicator with better mobile positioning */}
          <motion.div
            className="absolute bottom-14 sm:bottom-6 md:bottom-10 lg:bottom-2 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Typography
              variant="button"
              className="text-white flex flex-col items-center cursor-pointer text-sm sm:text-base"
              onClick={() => {
                const target = document.getElementById("main-content");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({
                    top: window.innerHeight * 1.1,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Discover More
              <KeyboardArrowDown className="mt-1 sm:mt-2" />
            </Typography>
          </motion.div>
        </Container>

        {/* Background glow effect (commented out in original) */}
        {/* <BackgroundGlowEffect /> */}
      </div>
    </Box>
  );
}
