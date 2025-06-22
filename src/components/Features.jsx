import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import AnimatedCard from "../ui/AnimatedCard.jsx";

// Modified features array
const features = [
  {
    title: "Cross-Chain Infrastructure",
    description:
      "Seamlessly bridge assets across all major blockchains through our unified interface.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe text-gray-400">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
      <path d="M2 12h20"></path>
    </svg>
  },
  {
    title: "Comprehensive Compliance",
    description:
      "Built-in KYC/AML, regulatory frameworks, and automated compliance across jurisdictions.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield text-gray-400">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
    </svg>,
  },
  {
    title: "Fractional Ownership",
    description:
      "Divide assets into tradable fractions, democratizing access to previously exclusive investments.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layers text-gray-400">
      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
      <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
      <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
    </svg>,
  },
  {
    title: "Complete Wallet Ecosystem",
    description:
      "Support for custodial, non-custodial, MPC, and hardware wallet solutions.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet text-gray-400">
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
    </svg>,
  },
  {
    title: "End-to-End Marketplace",
    description:
      "Primary issuance, secondary trading, liquidity pools, and OTC services all in one place.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-blocks text-gray-400">
      <rect width="7" height="7" x="14" y="3" rx="1"></rect>
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"></path>
    </svg>,
  },
];

export default function Features() {
  const [screenSize, setScreenSize] = useState("lg");

  // Check screen size on mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("lg");
      } else if (window.innerWidth >= 768) {
        setScreenSize("md");
      } else {
        setScreenSize("sm");
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <Box className="py-24 relative overflow-hidden">
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography
            variant="overline"
            className="gradient-letter"
          >
            ALL-IN-ONE PLATFORM
          </Typography>
          <Typography
            variant="h2"
            className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
          >
            <Box
              component="div"
              className="flex flex-col items-center justify-center leading-snug max-w-xs sm:max-w-xl lg:max-w-5xl mx-auto"
            >
              {/* Small & Medium Screens (3 lines) */}
              <Box className="block lg:hidden">
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("Everything You Need").map((char, idx) => (
                    <Box key={`sm-line1-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("In One Place").map((char, idx) => (
                    <Box key={`sm-line2-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Large Screens (2 lines) */}
              <Box className="hidden lg:block">
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("Everything You Need").map((char, idx) => (
                    <Box key={`lg-line1-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
                <Box component="div" className="flex flex-wrap justify-center">
                  {Array.from("In One Place").map((char, idx) => (
                    <Box key={`lg-line2-${idx}`} component="span" className="gradient-letter">
                      {char === " " ? "\u00A0" : char}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Typography>

          <Typography
            variant="body1"
            className="text-text-secondary max-w-2xl mx-auto"
          >
            No more juggling multiple services or platforms. Copym provides
            end-to-end solutions for the entire tokenization lifecycle.
          </Typography>
        </motion.div>

        {/* Single Row Layout for Features */}
        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <AnimatedCard style={{ perspective: "1000px" }}>
                  
                  {/* Wrap content in a div for 3D effect */}
                  <div className="card-content">
                    <Box
                      className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-2xl card-icon"
                      sx={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(5px)",
                        boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" className="mb-3">
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-text-secondary mb-4"
                    >
                      {feature.description}
                    </Typography>
                    <Button
                      endIcon={<ArrowForward />}
                      className="text-primary hover:bg-primary/5 px-0"
                    >
                      Learn more
                    </Button>
                  </div>
                </AnimatedCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}