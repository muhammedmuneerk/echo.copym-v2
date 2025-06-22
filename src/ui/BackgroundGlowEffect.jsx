import { Box } from "@mui/material";

const BackgroundGlowEffect = ({ src, alt }) => {
  return (
    <Box
      className="absolute inset-0 pointer-events-none"
      sx={{
        opacity: "0.2",
        background:
          "linear-gradient(90deg,rgba(11, 26, 161, 1) 0%, rgba(9, 121, 43, 1) 38%, rgba(24, 204, 14, 1) 100%)",
      }}
    />
  );
};

export default BackgroundGlowEffect;

// Enhanced Background Glow Effect --> gradient highlight with pulse animation
// put at the bottom of the component
