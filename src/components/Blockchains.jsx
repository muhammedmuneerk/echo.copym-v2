import { Container, Typography, Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import SectionImage from "./SectionImages";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";
import GradientLetters from "./GradientLetters";

const blockchains = [
  {
    name: "Solana",
    logo: <img src="/assets/blockchains-logos/solana-logo-white-removebg-preview.png" alt="Solana" className="w-full h-full object-contain" />,
  },
  {
    name: "Polygon",
    logo: <img src="/assets/blockchains-logos/Polygon-removebg-preview.png" alt="Polygon" className="w-full h-full object-contain" />,
  },
  {
    name: "Binance",
    logo: <img src="/assets/blockchains-logos/binance-removebg-preview.png" alt="Binance" className="w-full h-full object-contain" />,
  },
  {
    name: "Cardano",
    logo: <img src="/assets/blockchains-logos/Cardano-Logo.png" alt="Cardano" className="w-full h-full object-contain" />,
  },
  {
    name: "Optimism",
    logo: <img src="/assets/blockchains-logos/Optimism-removebg-preview.png" alt="Optimism" className="w-full h-full object-contain" />,
  },
];

export default function Blockchains() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [key, setKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [slot1Icon, setSlot1Icon] = useState(0);
  const [slot2Icon, setSlot2Icon] = useState(1);
  const [slot3Icon, setSlot3Icon] = useState(2);

  // Function to handle visibility changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setKey(prevKey => prevKey + 1);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('blockchains-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Handle icon rotation
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setSlot1Icon(prev => (prev + 1) % blockchains.length);
        
        setTimeout(() => {
          setSlot2Icon(prev => (prev + 1) % blockchains.length);
        }, 700);
        
        setTimeout(() => {
          setSlot3Icon(prev => (prev + 1) % blockchains.length);
        }, 1400);
        
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Responsive styling variables
  const getGlobePosition = () => {
    if (isMobile) {
      // For mobile, place the globe in the middle (after description, before icons)
      return { 
        position: "relative", 
        height: "260px", 
        marginTop: "-20px",
        marginBottom: "-80px" // Creates overlap with icons below
      };
    }
    if (isTablet) return { 
      right: 0, 
      height: "400px", 
      marginTop: "100px",
      position: "absolute"
    };
    return { 
      right: 0, 
      height: "700px", 
      marginTop: "200px",
      position: "absolute"
    };
  };

  const getSlotSize = () => {
    if (isMobile) return { width: "30%", height: "100px" };
    if (isTablet) return { width: "28%", height: "140px" };
    return { width: "25%", height: "180px" };
  };

  const getIconSize = () => {
    if (isMobile) return "w-20 h-20";
    if (isTablet) return "w-24 h-24";
    return "w-40 h-40";
  };

  const globeStyles = getGlobePosition();
  const slotStyles = getSlotSize();
  const iconSizeClass = getIconSize();

  return (
    <Box
      id="blockchains-section"
      className="py-12 md:py-16 lg:py-10 relative overflow-hidden"
    >
      {/* Blockchain Image - For tablet and desktop only */}
      {!isMobile && (
        <Box sx={{ 
          position: globeStyles.position, 
          top: 0, 
          right: globeStyles.right,
          width: isTablet ? "70%" : "60%",
          bottom: 0, 
          zIndex: 0, 
          opacity: 1,
          height: globeStyles.height,
          marginTop: globeStyles.marginTop,
          pointerEvents: "none",
          display: "flex",
          justifyContent: "flex-end",
          padding: isTablet ? "40px 20px" : "60px 40px"
        }}>
          <img 
            src="/assets/sections/blockchain-4.png" 
            alt="Blockchain" 
            style={{
              width: "90%",
              height: "90%",
              objectFit: "contain"
            }}
          />
        </Box>
      )}

      {/* Content Container */}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={isMobile ? 1 : 2} alignItems="center">
          {/* Text section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8 md:mb-12"
            >
              <Typography
                variant="h2"
                className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-4 pb-1 text-center"
              >
                {/* First Line */}
                <Box component="div" className="flex flex-wrap justify-center">
                  <GradientLetters text="Unified Access to All" keyPrefix="line1" />
                </Box>

                {/* Second Line */}
                <Box component="div" className="flex flex-wrap justify-center mt-1">
                  <GradientLetters text="Major Blockchains" keyPrefix="line2" />
                </Box>
              </Typography>

              <Typography
                variant="body1"
                className="text-text-secondary max-w-2xl mx-auto text-center text-sm sm:text-base px-4"
              >
                Tokenize assets on your preferred blockchain. Copym provides
                seamless integration with all major networks through a single,
                unified platform.
              </Typography>
            </motion.div>
          </Grid>

          {/* Hidden on mobile, visible on desktop */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "block" },
              opacity: "10",
              marginBottom: "-50px",
            }}
          >
            <Box sx={{ position: "relative", width: "100%", height: "700px" }}>
              {/* Space reserved for the 3D model */}
            </Box>
          </Grid>
        </Grid>
        
        {/* Blockchain Image for Mobile - Between description and icons */}
        {isMobile && (
          <Box sx={{ 
            width: "100%",
            zIndex: 0, 
            opacity: 0.5,
            height: globeStyles.height,
            marginTop: "40px",
            marginBottom: "-40px",
            pointerEvents: "none",
            padding: "20px"
          }}>
            <img 
              src="/assets/sections/blockchain-1.png" 
              alt="Blockchain" 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
              }}
            />
          </Box>
        )}

        {/* Blockchain icons display */}
        {/* Blockchain icons display - positioned below the image on mobile */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            mt: isMobile ? 4 : isTablet ? 3 : 1, // Added margin on mobile for proper spacing from image
            mb: isMobile ? 4 : isTablet ? 3 : 1, // Added bottom margin for better spacing
            display: "flex",
            justifyContent: "space-evenly",
            zIndex: isMobile ? 2 : 1, // Higher z-index on mobile to ensure icons appear above the image
            px: isMobile ? 1 : 0
          }}
        >
          {/* Slot 1 */}
          <Box
            sx={{
              width: slotStyles.width,
              position: "relative",
              height: slotStyles.height,
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`slot1-${slot1Icon}-${key}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  duration: 0.8
                }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Box className={iconSizeClass}>
                  {blockchains[slot1Icon].logo}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
          
          {/* Slot 2 */}
          <Box
            sx={{
              width: slotStyles.width,
              position: "relative",
              height: slotStyles.height,
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`slot2-${slot2Icon}-${key}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  duration: 0.8
                }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Box className={iconSizeClass}>
                  {blockchains[slot2Icon].logo}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
          
          {/* Slot 3 */}
          <Box
            sx={{
              width: slotStyles.width,
              position: "relative",
              height: slotStyles.height,
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`slot3-${slot3Icon}-${key}`}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  duration: 0.8
                }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Box className={iconSizeClass}>
                  {blockchains[slot3Icon].logo}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Container>

      {/* Background glow effect commented out as in original code */}
      {/* <BackgroundGlowEffect/> */}
    </Box>
  );
}