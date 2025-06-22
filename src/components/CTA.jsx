import { Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { Box } from "@mui/system";
import BorderImages from "./BorderImages";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";
import GradientLetters from "./GradientLetters";
import CustomButton from "./CustomButton";

export default function CTA() {
  return (
    <Container maxWidth="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center pt-14 mt-24 mb-10 relative z-10"
      >
        <Typography
          variant="h2"
          className="text-3xl sm:text-4xl md:text-5xl mb-4 pb-1 text-center"
        >
          <Box
            component="div"
            className="flex flex-col items-center justify-center leading-snug max-w-xs sm:max-w-xl lg:max-w-4xl mx-auto"
          >
            {/* Large screens: 2 lines */}
            <Box className="hidden lg:block">
              <Box component="div" className="flex flex-wrap justify-center">
                <GradientLetters
                  text="Ready to Transform"
                  keyPrefix="lg-line1"
                />
              </Box>

              <Box component="div" className="flex flex-wrap justify-center">
                <GradientLetters text="Your Assets?" keyPrefix="lg-line2" />
              </Box>
            </Box>

            {/* Small and Medium screens: 3 lines */}
            <Box className="block lg:hidden">
              <Box component="div" className="flex flex-wrap justify-center">
                <GradientLetters
                  text="Ready to Transform"
                  keyPrefix="sm-line1"
                />
              </Box>

              <Box component="div" className="flex flex-wrap justify-center">
                <GradientLetters text=" Your Assets?" keyPrefix="sm-line2" />
              </Box>
            </Box>
          </Box>
        </Typography>

        <Typography
          variant="body1"
          className="text-text-secondary mb-8 max-w-2xl mx-auto"
        >
          Join thousands of individuals and organizations already unlocking the
          value of their assets on the Copym platform.
        </Typography>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CustomButton
            variant="text"
            size="large"
            label="Explore Asset Tokenization"
          />
        </div>

        {/* <BorderImages
          src="/assets/sections/grid-bg-bottom.png"
          alt="Blockchains Banner"
        /> */}
      </motion.div>

      {/* Enhanced background gradient highlight with Glow Effect */}
      {/* <BackgroundGlowEffect/> */}
    </Container>
  );
}
