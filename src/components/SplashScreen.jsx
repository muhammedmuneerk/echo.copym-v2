import { Box, Typography, Container } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import TokenizationAnimation from "./TokenizationAnimation";

const SplashScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);

    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);




  return (
    <Box className="relative h-screen bg-custom-gradient w-full  text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundSize: isMobile ? '40px 40px' : '60px 60px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 blur-xl"
            style={{
              width: isMobile ? '120px' : '150px',
              height: isMobile ? '120px' : '150px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <Container maxWidth="xl" className="relative z-10 h-full justify-center flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="py-4 flex justify-between items-center"
        >
          
        </motion.div>

        {/* Main Content Grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 gap-8'} items-center h-[calc(100vh-120px)]`}>
          
          
          

        
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative flex items-center justify-center"
          >
            <div className={`relative w-full ${isMobile ? 'h-80' : 'h-96'} flex lg:ml-20 mt-5 pt-5 lg:pl-10 items-center justify-center`}>
              <TokenizationAnimation isMobile={isMobile} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-4"
          >
          
            <div className="space-y-3 items-center text-center">
              
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                className="font-bold leading-tight"
              >
                Welcome to the{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Future
                </span>{" "}
                of Tokenization
              </Typography>
            </div>

          </motion.div>
        </div>
      </Container>
    </Box>
  );
};

export default SplashScreen;
