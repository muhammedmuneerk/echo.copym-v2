import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Collapse,
  IconButton,
  Button
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronRight,
  HelpCircle,
  Wallet
} from "lucide-react";

// Animation variants for main menu - modified for top animation
const menuVariants = {
  closed: {
    opacity: 0,
    y: "-100%", // Slide from top instead of right
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1], // Material ease-out curve
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    },
  },
  open: {
    opacity: 1,
    y: 0, // Final position
    transition: {
      duration: 0.4,
      ease: [0.0, 0.0, 0.2, 1], // Material ease-in curve
      when: "beforeChildren",
      staggerChildren: 0.05,
      delayChildren: 0.1
    },
  },
};

// Animation variants for menu items - modified for top animation
const menuItemVariants = {
  closed: { opacity: 0, y: -20, height: 0 }, // Items slide from top
  open: { 
    opacity: 1, 
    y: 0, 
    height: "auto", 
    transition: { 
      ease: "easeOut", 
      duration: 0.3 
    } 
  },
};

// Animation variants for menu backdrop
const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 }
};

const MobileNavItem = ({ item, depth = 0, onClick, currentPath, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = item.items && item.items.length > 0;
  const isActive = currentPath === item.to;

  const handleToggle = (e) => {
    if (hasSubmenu) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (item.to) {
      e.preventDefault(); // Prevent default link behavior
      navigate(item.to); // Use the navigate function instead
      onClick(); // Close the menu after navigation
    }
  };

  return (
    <>
      <motion.div 
        variants={menuItemVariants}
        className={`relative ${depth > 0 ? 'ml-4' : ''}`}
      >
        <div 
          className={`
            flex items-center justify-between py-3 px-4 rounded-lg my-1
            ${isActive ? 'bg-indigo-900/30 text-indigo-300' : 'hover:bg-white/5'} 
            transition-colors duration-200 cursor-pointer
          `}
          onClick={handleToggle}
        >
          <div className="flex items-center gap-3">
            {item.icon && (
              <div className="flex items-center justify-center w-6">
                {item.icon}
              </div>
            )}
            <Typography 
              className={`font-medium ${isActive ? 'text-indigo-200' : 'text-gray-100'}`}
            >
              {item.label}
            </Typography>
          </div>
          
          {hasSubmenu && (
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={18} className="text-gray-400" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {hasSubmenu && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <div className="border-l-2 border-indigo-600/40 ml-6 my-1">
            {item.items.map((subItem, index) => (
              <MobileNavItem
                key={`${subItem.label}-${index}`}
                item={subItem}
                depth={depth + 1}
                onClick={onClick}
                currentPath={currentPath}
                navigate={navigate}
              />
            ))}
          </div>
        </Collapse>
      )}
    </>
  );
};

export default function HamburgerMenu({ isOpen, onClose, navigationItems }) {
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  
  // Handle clicks outside of the mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Mobile Menu - Modified for top animation */}
          <motion.div
            ref={mobileMenuRef}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 right-0 h-[85%] max-h-screen bg-gradient-to-b from-gray-900 to-black/95 shadow-2xl z-50 overflow-hidden flex flex-col"
            style={{ borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}
          >
            {/* Menu Header */}
            <div className="p-6 flex justify-between items-center border-b mt-8 border-gray-800">
              {/* <Typography variant="h6" className="font-bold text-white flex items-center opacity-0">
                <img
                  src="/assets/icons/logo-svg.svg"
                  alt="COPYM"
                  className="h-8 mr-2"
                />
              </Typography> */}
              
            </div>
            
            {/* Menu Items with nested collapsible sections */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
              <motion.div className="space-y-1">
                {navigationItems.map((item, index) => (
                  <MobileNavItem
                    key={`${item.label}-${index}`}
                    item={item}
                    onClick={onClose}
                    currentPath={location.pathname}
                    navigate={navigate}
                  />
                ))}
              </motion.div>
            </div>
            
            {/* Menu Footer */}
            <div className="p-6 border-t border-gray-800">
              <div className="flex flex-col space-y-3">
                {/* <Button
                  variant="contained"
                  fullWidth
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
                  startIcon={<Wallet size={18} className="text-white" />}
                >
                  Connect Wallet
                </Button> */}
                <Button
                  variant="outlined"
                  fullWidth
                  className="border-gray-600 text-gray-300 py-3 rounded-lg hover:bg-gray-800"
                  startIcon={<HelpCircle size={18} className="text-green-500" />}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}