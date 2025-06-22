import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography, Box } from "@mui/material";
import GradientLetters from "../../components/GradientLetters";
import { TrendingUp, MapPin, Coins, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for navigation
import BackgroundPattern from "../../ui/BackgroundPattern";

const mockAssets = [
  {
    id: 1,
    title: "Premium Office Building",
    category: "Real Estate",
    location: "New York, USA",
    expectedRoi: "8.5%",
    price: 250000,
    availableTokens: 750,
    totalTokens: 1000,
    image: "/assets/images/premium-office-building-1.png",
  },
  {
    id: 2,
    title: "Digital Art Collection",
    category: "Art",
    location: "Digital",
    expectedRoi: "Variable",
    price: 15000,
    availableTokens: 65,
    totalTokens: 100,
    image: "/assets/images/digital-art-collection-1.png",
  },
  {
    id: 3,
    title: "Gold Reserve",
    category: "Commodities",
    location: "Secure Vault, Switzerland",
    expectedRoi: "5.2%",
    price: 50000,
    availableTokens: 320,
    totalTokens: 500,
    image: "/assets/images/gold-reserve.png",
  },
  {
    id: 4,
    title: "Solar Farm Project",
    category: "Infrastructure",
    location: "Arizona, USA",
    expectedRoi: "7.3%",
    price: 120000,
    availableTokens: 1800,
    totalTokens: 2000,
    image: "/assets/images/solar-farm-project-2.png",
  },
  {
    id: 5,
    title: "Tech Startup Equity",
    category: "Startups",
    location: "San Francisco, USA",
    expectedRoi: "High Risk/Reward",
    price: 75000,
    availableTokens: 210,
    totalTokens: 300,
    image: "/assets/images/tech-2.png",
  },
  {
    id: 6,
    title: "Luxury Apartment Complex",
    category: "Real Estate",
    location: "Miami, USA",
    expectedRoi: "6.8%",
    price: 350000,
    availableTokens: 1200,
    totalTokens: 1500,
    image: "/assets/images/apartment-complex.png",
  },
];

const categories = [
  "All Categories",
  "Real Estate",
  "Art",
  "Commodities",
  "Infrastructure",
  "Startups",
];

// Map asset categories to navigation paths
const categoryToPath = {
  "Real Estate": "/market/real-estate",
  "Art": "/market/art",
  "Commodities": "/market/gold",
  "Infrastructure": "/market/carbon-credits", // Closest match from navigation
  "Startups": "/market/private-equity", // Closest match from navigation
  // Default fallback
  "default": "/tokenization"
};

export default function Marketplace() {
  const [searchParams, setSearchParams] = useState({
    query: "",
    category: "All Categories",
    priceRange: [0, 1000000],
    sortBy: "Latest"
  });

  // Format price for display
  const formatPrice = (value) => {
    return `$${value.toLocaleString()}`;
  };

  // Filter and sort assets
  const filteredAssets = useMemo(() => {
    return mockAssets
      .filter((asset) => {
        // Search filter
        const searchLower = searchParams.query.toLowerCase();
        const matchesSearch =
          asset.title.toLowerCase().includes(searchLower) ||
          asset.location.toLowerCase().includes(searchLower) ||
          asset.category.toLowerCase().includes(searchLower);

        // Category filter
        const matchesCategory =
          searchParams.category === "All Categories" ||
          asset.category === searchParams.category;

        // Price range filter
        const matchesPriceRange =
          asset.price >= searchParams.priceRange[0] && 
          asset.price <= searchParams.priceRange[1];

        return matchesSearch && matchesCategory && matchesPriceRange;
      })
      .sort((a, b) => {
        switch (searchParams.sortBy) {
          case "Price: Low to High":
            return a.price - b.price;
          case "Price: High to Low":
            return b.price - a.price;
          case "ROI":
            // Convert ROI strings to numbers for comparison
            const getROIValue = (roi) => {
              if (roi === "Variable" || roi === "High Risk/Reward") return -1;
              return parseFloat(roi.replace("%", ""));
            };
            return getROIValue(b.expectedRoi) - getROIValue(a.expectedRoi);
          case "Latest":
          default:
            return b.id - a.id; // Assuming higher IDs are more recent
        }
      });
  }, [searchParams]);

  // Handle search parameter updates
  const updateSearchParams = (updates) => {
    setSearchParams(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Get the appropriate path for an asset based on its category
  const getAssetPath = (asset) => {
    return categoryToPath[asset.category] || categoryToPath.default;
  };

  // Card appear animation variant
  const cardAnimationVariant = {
    hidden: { 
      opacity: 0, 
      y: 50,
    },
    visible: (index) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      <BackgroundPattern/>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
          className="text-center mb-12 pt-20 relative z-30"
        >
          <Typography
            variant="h1"
            className="w-full text-4xl md:text-5xl lg:text-6xl font-bold mb-4 mt-20 text-center"
          >
            <Box
              component="div"
              className="flex flex-col items-center justify-center w-full"
            >
              {/* Large Screens (1 line) */}
              <Box className="hidden lg:flex lg:justify-center w-full">
                <GradientLetters
                  text="Asset Tokenization Marketplace"
                  keyPrefix="lg-line1"
                />
              </Box>

              {/* Small and Medium screens: 2 lines */}
              <Box className="flex flex-col items-center justify-center lg:hidden w-full">
                <Box component="div" className="flex justify-center w-full">
                  <GradientLetters text="Asset Tokenization" keyPrefix="sm-line1" />
                </Box>

                <Box component="div" className="flex justify-center w-full">
                  <GradientLetters text="Marketplace" keyPrefix="sm-line2" />
                </Box>
              </Box>
            </Box>
          </Typography>

          <Typography
            variant="body1"
            className="text-gray-100/90 text-center max-w-3xl mx-auto mb-12"
          >
            Discover and invest in tokenized assets across various categories.
            Each asset is fractionally divided, allowing for smaller investment
            thresholds.
          </Typography>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
          className="mb-12"
        >
          <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search assets..."
                className="w-full p-3 bg-white/20 rounded-lg border border-white/30 text-white col-span-2 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition duration-300 placeholder-white/60"
                value={searchParams.query}
                onChange={(e) => updateSearchParams({ query: e.target.value })}
              />

              {/* Category Dropdown */}
              <select
                className="w-full p-3 bg-white/20 rounded-lg border border-white/30 text-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition duration-300"
                value={searchParams.category}
                onChange={(e) => updateSearchParams({ category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Price Range */}
              <div className="flex items-center space-x-3">
                <span className="text-sm text-white/70 whitespace-nowrap">
                  ${searchParams.priceRange[1].toLocaleString()}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={searchParams.priceRange[1]}
                  onChange={(e) => updateSearchParams({ 
                    priceRange: [searchParams.priceRange[0], Number(e.target.value)] 
                  })}
                  className="w-full h-2 bg-white/30 rounded-full appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                className="w-full p-3 bg-white/20 rounded-lg border border-white/30 text-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition duration-300"
                value={searchParams.sortBy}
                onChange={(e) => updateSearchParams({ sortBy: e.target.value })}
              >
                {["Latest", "ROI", "Price: Low to High", "Price: High to Low"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="mb-6 text-white/70 font-medium">
          Showing {filteredAssets.length} of {mockAssets.length} assets
        </p>

        {/* Asset Grid */}
        <AnimatePresence>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.2,
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center"
          >
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                custom={index}
                variants={cardAnimationVariant}
                className="w-full max-w-[400px]"
              >
                {/* Glassmorphism Card */}
                <div className="relative w-full overflow-hidden backdrop-blur-2xl bg-white/10 rounded-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
                  {/* Subtle gradient overlay on card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                  
                  {/* Asset Image with gradient overlay */}
                  <div className="w-full aspect-video overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img 
                      src={asset.image} 
                      alt={asset.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category badge positioned on the image */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md bg-emerald-500/30 text-white border border-emerald-400/30">
                        {asset.category}
                      </span>
                    </div>
                  </div>

                  {/* Asset Details */}
                  <div className="p-6 relative">
                    {/* Title */}
                    <h2 className="text-xl font-bold mb-4 text-white">
                      {asset.title}
                    </h2>
                    
                    {/* Info Grid */}
                    <div className="grid grid-cols-1 gap-y-3 mb-6">
                      {/* Location */}
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-emerald-300" />
                        <p className="text-white/80">
                          {asset.location}
                        </p>
                      </div>
                      
                      {/* ROI */}
                      <div className="flex items-center space-x-2">
                        <TrendingUp size={16} className="text-emerald-300" />
                        <p className="text-white/80">
                          Expected ROI: <span className="font-semibold text-emerald-300">{asset.expectedRoi}</span>
                        </p>
                      </div>
                      
                      {/* Token info */}
                      <div className="flex items-center space-x-2">
                        <Coins size={16} className="text-emerald-300" />
                        <p className="text-white/80">
                          {asset.availableTokens}/{asset.totalTokens} tokens available
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mb-6">
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" 
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${(asset.availableTokens / asset.totalTokens) * 100}%`
                          }}
                          transition={{ 
                            duration: 0.8,
                            ease: "easeOut"
                          }}
                        ></motion.div>
                      </div>
                    </div>

                    {/* Price and Invest Button */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-emerald-300/80 uppercase font-medium tracking-wider mb-1">Price</p>
                        <p className="text-2xl font-bold text-white">
                          ${asset.price.toLocaleString()}
                        </p>
                      </div>
                      <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium transition duration-300 hover:shadow-lg hover:shadow-emerald-700/40 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-transparent">
                        Invest
                      </button>
                    </div>
                    
                    {/* Know More Button */}
                    <Link 
                      to={getAssetPath(asset)} 
                      className="flex items-center justify-center w-full py-2.5 mt-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition duration-300 border border-white/20 hover:border-white/30 group"
                    >
                      <span>Know More</span>
                      <ExternalLink size={14} className="ml-2 text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}