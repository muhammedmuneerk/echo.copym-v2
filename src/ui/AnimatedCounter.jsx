import { useState, useRef, useEffect } from "react";

// Animated counter component for numbers
const AnimatedCounter = ({ value, duration = 2, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const animationRef = useRef(null);

  // Handle different formats of values
  const isCurrency = value.startsWith("$");
  const isPercentage = value.includes("%");

  // Extract the numeric part
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));

  // Extract the prefix and suffix
  const prefix = isCurrency ? "$" : "";
  const suffix = isPercentage ? "%" : "";

  // Reset and restart counter animation when triggerCount changes
  useEffect(() => {
    setCount(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const timer = setTimeout(() => {
      const updateCounter = () => {
        const now = Date.now();
        if (now >= endTime) {
          setCount(numericValue);
          return;
        }

        const elapsedTime = now - startTime;
        const progress = elapsedTime / (duration * 1000);
        const currentValue = numericValue * progress;
        setCount(currentValue);

        animationRef.current = requestAnimationFrame(updateCounter);
      };

      // Start the animation
      animationRef.current = requestAnimationFrame(updateCounter);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [numericValue, duration, delay]);

  // Format the display value
  const displayValue = () => {
    // Format based on the type of value
    if (isCurrency) {
      return `${prefix}${count.toFixed(1)}${value.includes("B") ? "B" : ""}`;
    } else if (isPercentage) {
      return `+${count.toFixed(0)}${suffix}`;
    } else {
      return count.toFixed(0);
    }
  };

  return <span ref={countRef}>{displayValue()}</span>;
};

export default AnimatedCounter;