import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Save scroll position before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      sessionStorage.setItem('lastPath', pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pathname]);

  // Handle scroll restoration
  useEffect(() => {
    const lastPath = sessionStorage.getItem('lastPath');
    const savedPosition = sessionStorage.getItem('scrollPosition');
    
    // Only restore scroll if we're on the same path and have a saved position
    if (lastPath === pathname && savedPosition) {
      // Use setTimeout to ensure the DOM is fully loaded
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition));
        // Clear the saved position after restoring
        sessionStorage.removeItem('scrollPosition');
        sessionStorage.removeItem('lastPath');
      }, 0);
    } else {
      // For normal navigation, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
} 