import { Container, Typography, Box, Grid, useTheme, useMediaQuery } from "@mui/material";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, ReferenceLine } from 'recharts';
import { useState, useEffect, useRef } from 'react';
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { TrendingUp, Users, Link, BarChart2 } from "lucide-react";
import AnimatedCard from "../ui/AnimatedCard";
import BackgroundGlowEffect from "../ui/BackgroundGlowEffect";
import GradientLetters from "./GradientLetters"; // Added GradientLetters import

// Format numbers with suffixes (B, M, K)
const formatNumber = (num, suffix) => {
  return parseFloat(num).toLocaleString('en-US', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  }) + suffix;
};

// Modified AnimatedCounter component to reset and restart animation when isInView changes
const AnimatedCounter = ({ value, duration = 2, delay = 0, suffix = '', isInView }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const animationRef = useRef(null);
  const valueNum = parseFloat(value.replace(/[^0-9.]/g, ''));
  const valueSuffix = value.replace(/[0-9.]/g, '');
  
  // Reset the counter when isInView changes
  useEffect(() => {
    if (!isInView) {
      setCount(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }
    
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;
    
    const timer = setTimeout(() => {
      const updateCounter = () => {
        const now = Date.now();
        if (now >= endTime) {
          setCount(valueNum);
          return;
        }
        
        const elapsedTime = now - startTime;
        const progress = elapsedTime / (duration * 1000);
        const currentValue = valueNum * progress;
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
  }, [valueNum, duration, delay, isInView]);
  
  // Format the counter value based on the original value's format
  const displayValue = count.toLocaleString('en-US', {
    maximumFractionDigits: 1,
    minimumFractionDigits: valueSuffix === 'B' ? 1 : 0,
  }) + valueSuffix;
  
  return <span ref={countRef}>{displayValue}</span>;
};

// Define metric icons components mapped to each metric
const MetricIcon = ({ type, size = 24 }) => {
  const iconProps = {
    size: size,
    strokeWidth: 1.5, // Thinner lines for a more elegant look
  };
  
  switch (type) {
    case 'assets':
      return <TrendingUp {...iconProps} />;
    case 'users':
      return <Users {...iconProps} />;
    case 'networks':
      return <Link {...iconProps} />;
    case 'transactions':
      return <BarChart2 {...iconProps} />;
    default:
      return <TrendingUp {...iconProps} />;
  }
};

const metrics = [
  {
    value: "1.3B",
    label: "Assets Tokenized",
    growth: "+42%",
    period: "year-over-year",
    iconType: "assets",
  },
  {
    value: "50K",
    label: "Active Users",
    growth: "+78%",
    period: "year-over-year",
    iconType: "users",
  },
  {
    value: "5",
    label: "Blockchain Networks",
    growth: "+3",
    period: "this year",
    iconType: "networks",
  },
  {
    value: "2M",
    label: "Transactions",
    growth: "+53%",
    period: "year-over-year",
    iconType: "transactions",
  },
];

const monthlyData = [
  { name: "Jan", assets: 0.8, users: 30, transactions: 0.9 },
  { name: "Feb", assets: 0.9, users: 32, transactions: 1.0 },
  { name: "Mar", assets: 0.85, users: 35, transactions: 1.1 },
  { name: "Apr", assets: 0.95, users: 38, transactions: 1.2 },
  { name: "May", assets: 1.0, users: 40, transactions: 1.3 },
  { name: "Jun", assets: 1.05, users: 43, transactions: 1.4 },
  { name: "Jul", assets: 1.1, users: 45, transactions: 1.5 },
  { name: "Aug", assets: 1.15, users: 47, transactions: 1.6 },
  { name: "Sep", assets: 1.2, users: 48, transactions: 1.7 },
  { name: "Oct", assets: 1.25, users: 49, transactions: 1.8 },
  { name: "Nov", assets: 1.27, users: 50, transactions: 1.9 },
  { name: "Dec", assets: 1.3, users: 50, transactions: 2.0 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-sm bg-background/90 p-4 border border-gray-200 shadow-lg rounded-lg"
      >
        <p className="font-medium text-lg border-b pb-2 mb-2">{`${label}`}</p>
        {payload.map((entry, index) => {
          const colors = {
            assets: '#8884d8',
            users: '#82ca9d',
            transactions: '#ffc658'
          };
          const labels = {
            assets: 'Assets',
            users: 'Users',
            transactions: 'Transactions'
          };
          const units = {
            assets: 'B',
            users: 'K',
            transactions: 'M'
          };
          
          return (
            <p key={index} className="text-sm flex items-center my-1">
              <span 
                className="inline-block w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: colors[entry.dataKey] }}
              ></span>
              <span className="font-medium mr-2">{labels[entry.dataKey]}:</span>
              <span>{entry.value}{units[entry.dataKey]}</span>
            </p>
          );
        })}
      </motion.div>
    );
  }
  return null;
};

export default function Metrics() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeIndex, setActiveIndex] = useState(null);
  const [chartAnimated, setChartAnimated] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [highlightedMetric, setHighlightedMetric] = useState(null);
  const [visibleMonths, setVisibleMonths] = useState(monthlyData);
  const [isComponentInView, setIsComponentInView] = useState(false);
  
  const controls = useAnimation();
  
  // Restart animations when component comes into view
  const onViewportEnter = () => {
    setIsComponentInView(false);
    // Small delay to ensure state is updated before re-triggering animations
    setTimeout(() => {
      setIsComponentInView(true);
      setChartAnimated(true);
      controls.start({ opacity: 1, y: 0 });
    }, 50);
  };
  
  // Control chart animation
  useEffect(() => {
    if (isComponentInView) {
      const timer = setTimeout(() => {
        setChartAnimated(true);
        controls.start({ opacity: 1, y: 0 });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [controls, isComponentInView]);

  // Handle month selection for filtering chart data
  const handleMonthClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
      setVisibleMonths(monthlyData);
    } else {
      setActiveIndex(index);
      // For a real filter, you'd slice the data, but for demo purposes, we'll just highlight
      setVisibleMonths(monthlyData);
    }
  };

  const chartHeight = isMobile ? 250 : isMedium ? 350 : 450;
  
  const handleMetricHover = (index) => {
    setHighlightedMetric(index);
  };
  
  const handleMetricLeave = () => {
    setHighlightedMetric(null);
  };
  
  return (
    <motion.div
      className="py-24 relative "
      onViewportEnter={onViewportEnter}
      viewport={{ once: false, amount: 0.2 }} // Trigger when 20% of component is in viewport, and every time it enters
    >
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: false }} // Changed to false to re-trigger animation
        >
          <Typography
            variant="overline"
            className="gradient-letter text-primary font-medium tracking-wider block text-center mb-2"
          >
            PLATFORM METRICS
          </Typography>
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: false }} // Changed to false to re-trigger animation
          >
            <Typography
              variant="h2"
              className="text-3xl sm:text-4xl md:text-5xl mb-4 text-center"
            >
              <Box
                component="div"
                className="flex flex-col items-center justify-center leading-snug max-w-xs sm:max-w-xl lg:max-w-4xl mx-auto"
              >
                {/* Large Screens (1 lines) */}
                <Box className="hidden lg:block">
                  <Box component="div" className="flex flex-wrap justify-center">
                    <GradientLetters text="Tokenization at Scale" keyPrefix="lg-line1" />
                  </Box>
                </Box>

                {/* Small & Medium Screens (2 lines) */}
                <Box className="block lg:hidden">
                  <Box component="div" className="flex flex-wrap justify-center">
                    <GradientLetters text="Tokenization at Scale" keyPrefix="sm-line1" />
                  </Box>

                </Box>
              </Box>
            </Typography>
          </motion.div>
          <Typography
            variant="body1"
            className="text-text-secondary text-center mb-16 max-w-2xl mx-auto"
          >
            Powering the global tokenization economy with enterprise-grade
            infrastructure
          </Typography>
        </motion.div>

        <Grid container spacing={4} className="mb-24">
          {metrics.map((metric, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: false }} // Changed to false to re-trigger animation
                className="h-full"
              >
                <AnimatedCard>

                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    onHoverStart={() => handleMetricHover(index)}
                    onHoverEnd={handleMetricLeave}
                    className="text-center card-content"
                  >
                    <motion.div
                      className="mb-2 text-2xl flex justify-center metric-icon"
                      initial={{ rotateY: 0 }}
                      whileHover={{ rotateY: 180 }}
                      transition={{ 
                        duration: 0.7,
                        type: "spring",
                        stiffness: 50,
                        damping: 10
                      }}
                      style={{ 
                        perspective: '800px',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <MetricIcon type={metric.iconType} size={32} />
                    </motion.div>
                    <motion.div
                      key={`metric-${index}-${isComponentInView}`} // Force re-render when viewport status changes
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: index * 0.2 + 0.3 }}
                      viewport={{ once: false }} // Changed to false to re-trigger animation
                    >
                      <Typography variant="h2" className="text-5xl mb-2 font-bold">
                        <AnimatedCounter
                          value={metric.value}
                          duration={2.5}
                          delay={index * 0.2 + 0.5}
                          isInView={isComponentInView} // Pass viewport status to counter
                        />
                      </Typography>
                    </motion.div>
                    <Typography
                      variant="body1"
                      className="text-text-secondary mb-2 font-medium"
                    >
                      {metric.label}
                    </Typography>
                    <motion.div
                      key={`divider-${index}-${isComponentInView}`} // Force re-render when viewport status changes
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.8 }}
                      viewport={{ once: false }} // Changed to false to re-trigger animation
                      className="h-0.5 bg-primary/30 mb-2 mx-auto"
                    />
                    <Typography
                      variant="body2"
                      className="text-primary font-bold inline-flex items-center"
                    >
                      {metric.growth}
                      <motion.span
                        key={`growth-${index}-${isComponentInView}`} // Force re-render when viewport status changes
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "auto", opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
                        viewport={{ once: false }} // Changed to false to re-trigger animation
                        className="text-text-secondary ml-2 font-normal"
                      >
                        {metric.period}
                      </motion.span>
                    </Typography>
                  </motion.div>
                </AnimatedCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Enhanced background gradient highlight with Glow Effect */}
     {/* <BackgroundGlowEffect/> */}

    </motion.div>
  );
}