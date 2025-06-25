import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Container,
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  IconButton
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { motion } from "framer-motion";
import { 
  X, 
  Menu as MenuIcon, 
  ArrowRight,
  Leaf, 
  RefreshCw, 
  BarChart3, 
  Coins, 
  Building2, 
  Palette, 
  Droplet, 
  Recycle, 
  Briefcase, 
  Link as LinkIcon, 
  Store, 
  Home
} from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";

// Navigation structure with Home button, which will be conditionally displayed
const navigationItems = [
  {
    label: "Home",
    to: "/",
    icon: <Home size={18} className="text-green-500" />
  },
  {
    label: "Go Green",
    to: "/green-tokenization",
    icon: <Leaf size={18} className="text-green-500" />
  },
  {
    label: "Tokenization",
    icon: <RefreshCw size={18} className="text-green-500" />,
    to:"/tokenization",
    // items: [
    //   { label: "Echo Asset Tokenization", to: "/tokenization", icon: <BarChart3 size={18} className="text-green-500" /> },
    //   { label: "Gold Tokenization Hub", to: "/tokenization/gold", icon: <Coins size={18} className="text-green-500" /> },
    //   { label: "Real Estate", to: "/tokenization/real-estate", icon: <Building2 size={18} className="text-green-500" /> },
    //   { label: "Art & Collectibles", to: "/tokenization/art", icon: <Palette size={18} className="text-green-500" /> },
    //   { label: "Commodities", to: "/tokenization/commodities", icon: <Droplet size={18} className="text-green-500" /> },
    //   { label: "Carbon Credits", to: "/tokenization/carbon-credits", icon: <Recycle size={18} className="text-green-500" /> },
    //   { label: "Private Equity", to: "/tokenization/private-equity", icon: <Briefcase size={18} className="text-green-500" /> },
    //   { label: "Other Asset Classes", to: "/tokenization/other-assets", icon: <LinkIcon size={18} className="text-green-500" /> },
    // ],
  },
  {
    label: "Marketplace",
    to: "/marketplace",
    icon: <Store size={18} className="text-green-500" />
  },
];

// Animation variants for hamburger menu icon
const hamburgerIconVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180 }
};

// Animation variants for logo
const logoVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

// Base nav button styles (no circle until hover)
const baseDesktopNavButtonStyles = {
  position: "relative",
  borderRadius: "8px",
  transition: "color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "primary.main",
  },
};

// Additional styles to apply when the nav item is active (shows the circle even without hover)
const activeDesktopNavButtonStyles = {
  color: "primary.main",
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeMenu, setActiveMenu] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const hamburgerRef = useRef(null);
  // Refs and state for moving underline indicator (desktop)
  const navContainerRef = useRef(null);
  const navItemRefs = useRef([]); // array of DOM nodes
  const [indicatorProps, setIndicatorProps] = useState({ left: 0, width: 0 });
  
  // Check if current page is homepage
  const isHomePage = location.pathname === "/";

  // Filter navigation items to remove Home button on homepage (must be declared before effects)
  const filteredNavigationItems = navigationItems.filter(
    (item) => !(item.label === "Home" && isHomePage)
  );

  // Callback to move the underline indicator (declared early so effects can reference it)
  const updateIndicator = useCallback((el) => {
    if (!el || !navContainerRef.current) return;
    const containerRect = navContainerRef.current.getBoundingClientRect();
    const itemRect = el.getBoundingClientRect();
    setIndicatorProps({
      left: itemRect.left - containerRect.left,
      width: itemRect.width,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Determine active nav index based on current route and update indicator
  useEffect(() => {
    const activeIndex = filteredNavigationItems.findIndex(
      (itm) => itm.to && itm.to === location.pathname
    );
    if (activeIndex !== -1) {
      const activeEl = navItemRefs.current[activeIndex];
      updateIndicator(activeEl);
    } else {
      // hide indicator when no active match
      setIndicatorProps({ left: 0, width: 0 });
    }
  }, [location.pathname, updateIndicator]);

  // Update indicator on window resize to keep alignment
  useEffect(() => {
    const handleResize = () => {
      // try to align with currently stored left by re-evaluating element under same index (approx)
      const activeIndex = filteredNavigationItems.findIndex(
        (itm) => itm.to && itm.to === location.pathname
      );
      if (activeIndex !== -1) {
        updateIndicator(navItemRefs.current[activeIndex]);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname, updateIndicator]);

  const handleMenuOpen = (event, label) => {
    setMenuAnchor(event.currentTarget);
    setActiveMenu(label);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setActiveMenu("");
  };

  // Function to handle navigation without using Link component
  const handleNavigation = (to) => {
    navigate(to);
    handleMenuClose();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // When opening menu, prevent body scroll
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <AppBar 
        position="absolute"
        color="transparent"
        elevation={scrolled ? 0 : 0} // No shadow/elevation when scrolled because of value 0 
        sx={{
          backdropFilter: scrolled ? "none" : "none",
          backgroundColor: scrolled ? "transparent" : "transparent",
          borderBottom: scrolled ? "none" : "none",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Container maxWidth="xl">
          <Box className="flex items-center justify-between py-4 px-4">
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex-shrink-0"
            >
              {/* Use onClick instead of Link component for more reliable navigation */}
              <Typography
                component="div"
                onClick={() => navigate("/")}
                variant="h6"
                className="font-bold text-2xl tracking-tight flex items-center no-underline text-inherit cursor-pointer"
              >
                <img
                  src="/copym/png/Copym-01-1.png"
                  alt="COPYM"
                  className="h-16 w-auto sm:h-16 md:h-20 object-contain"
                />
              </Typography>
            </motion.div>

            {/* Desktop Navigation - On the right */}
            <Box
              ref={navContainerRef}
              className="hidden lg:flex items-center space-x-1 ml-auto relative"
              onMouseLeave={() => {
                // revert to active route
                const activeIndex = filteredNavigationItems.findIndex(
                  (itm) => itm.to && itm.to === location.pathname
                );
                if (activeIndex !== -1) {
                  updateIndicator(navItemRefs.current[activeIndex]);
                } else {
                  setIndicatorProps({ left: 0, width: 0 });
                }
              }}
            >
              {/* moving underline indicator */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: indicatorProps.left,
                  width: indicatorProps.width,
                  height: "2px",
                  backgroundColor: "primary.main",
                  transition: "left 0.35s ease, width 0.35s ease",
                }}
              />
              {filteredNavigationItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {item.items ? (
                    <>
                      <Button
                        color="inherit"
                        aria-controls={activeMenu === item.label ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={activeMenu === item.label ? "true" : undefined}
                        onClick={(e) => handleMenuOpen(e, item.label)}
                        endIcon={
                          <motion.div
                            animate={{ rotate: activeMenu === item.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <KeyboardArrowDown />
                          </motion.div>
                        }
                        className="text-text-secondary hover:text-white px-4 py-2"
                        sx={
                          item.to && item.to === location.pathname
                            ? { ...baseDesktopNavButtonStyles, ...activeDesktopNavButtonStyles }
                            : baseDesktopNavButtonStyles
                        }
                        ref={(el) => (navItemRefs.current[index] = el)}
                        onMouseEnter={() => updateIndicator(navItemRefs.current[index])}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.label}
                      </Button>
                      <Menu
                        id={`${item.label}-menu`}
                        anchorEl={menuAnchor}
                        open={activeMenu === item.label}
                        onClose={handleMenuClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        PaperProps={{
                          elevation: 8,
                          sx: {
                            backgroundColor: "rgba(18, 19, 26, 0.95)",
                            backdropFilter: "blur(16px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            color: "white",
                            minWidth: 240,
                            mt: 1,
                            "& .MuiList-root": {
                              padding: "8px",
                            },
                            overflow: "hidden",
                            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                          },
                        }}
                        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                      >
                        <Box className="grid grid-cols-1 gap-1 p-1">
                          {item.items.map((subItem) => (
                            <MenuItem
                              key={typeof subItem === "string" ? subItem : subItem.label}
                              onClick={() => handleNavigation(subItem.to)}
                              sx={{
                                borderRadius: "8px",
                                padding: "8px 16px",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                                },
                              }}
                            >
                              <div className="flex items-center gap-3">
                                {subItem.icon && (
                                  <span className="text-lg">{subItem.icon}</span>
                                )}
                                <span>
                                  {typeof subItem === "string" ? subItem : subItem.label}
                                </span>
                              </div>
                              <ArrowRight size={14} className="ml-auto text-green-500" />
                            </MenuItem>
                          ))}
                        </Box>
                      </Menu>
                    </>
                  ) : item.to ? (
                    <Button
                      onClick={() => navigate(item.to)}
                      color="inherit"
                      className="text-text-secondary hover:text-white px-4 py-2"
                      sx={
                        item.to && item.to === location.pathname
                          ? { ...baseDesktopNavButtonStyles, ...activeDesktopNavButtonStyles }
                          : baseDesktopNavButtonStyles
                      }
                      ref={(el) => (navItemRefs.current[index] = el)}
                      onMouseEnter={() => updateIndicator(navItemRefs.current[index])}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </Button>
                  ) : (
                    <Button
                      color="inherit"
                      className="text-text-secondary hover:text-white px-4 py-2"
                      sx={
                        item.to && item.to === location.pathname
                          ? { ...baseDesktopNavButtonStyles, ...activeDesktopNavButtonStyles }
                          : baseDesktopNavButtonStyles
                      }
                      ref={(el) => (navItemRefs.current[index] = el)}
                      onMouseEnter={() => updateIndicator(navItemRefs.current[index])}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </Button>
                  )}
                </motion.div>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <motion.div
              ref={hamburgerRef}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden"
            >
              <IconButton
                color="inherit"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="rounded-full p-2 bg-black/20 backdrop-blur-sm"
              >
                <motion.div
                  variants={hamburgerIconVariants}
                  animate={mobileMenuOpen ? "open" : "closed"}
                  transition={{ duration: 0.3 }}
                >
                  {mobileMenuOpen ? (
                    <X size={24} className="text-white" />
                  ) : (
                    <MenuIcon size={24} className="text-white" />
                  )}
                </motion.div>
              </IconButton>
            </motion.div>
          </Box>
        </Container>
      </AppBar>

      {/* Mobile Hamburger Menu Component */}
      <HamburgerMenu 
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        navigationItems={filteredNavigationItems}
      />
    </>
  );
}