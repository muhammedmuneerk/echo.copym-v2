import { Box } from "@mui/material";

const BorderImages = ({ src, alt }) => {
  return (
    <Box className="w-full py-8">
      <Box className="flex justify-center">
        <img
          src={src}
          alt={alt}
          className="w-full animate-fade-loop"
        />
      </Box>
    </Box>
  );
};

export default BorderImages;
