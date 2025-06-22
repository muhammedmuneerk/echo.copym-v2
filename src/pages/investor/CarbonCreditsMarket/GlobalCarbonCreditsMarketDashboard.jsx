import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, CircleMarker, Polygon, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from 'd3';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Globe,
  Leaf,
  Building,
  Search,
  Moon,
  Sun,
  Home,
  TrendingUp,
  BarChart,
  LineChart,
  DollarSign,
  PieChart,
  Users,
  Briefcase,
  Target,
  Activity,
  Zap,
  TreePine,
  Wind,
  Factory
} from "lucide-react";
import { RefreshCw } from 'lucide-react';

// Carbon Credits Market Visualization Component
const GlobalCarbonCreditsMarketDashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('1Y');
  const [activeView, setActiveView] = useState('map');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [activeMetric, setActiveMetric] = useState('price');
  
  const tooltipRef = useRef(null);
  const chartRef = useRef(null);
  const legendRef = useRef(null);
  const mapRef = useRef(null);
  
  // Map Reset Control Component
  const MapResetControl = ({ resetMapView }) => {
    const map = useMap();
    
    const handleReset = () => {
      map.setView([20, 0], 2);
      resetMapView();
    };
    
    return (
      <div className="leaflet-top leaflet-right" style={{ marginTop: '50px' }}>
        <div className="leaflet-control leaflet-bar">
          <button 
            className="bg-gray-800/80 hover:bg-gray-700/80 p-1 rounded-full"
            onClick={handleReset}
            title="Reset Map View"
          >
            <RefreshCw size={16} className="text-green-500" />
          </button>
        </div>
      </div>
    );
  };
  
  // Carbon credits data by region
  const carbonCreditsData = {
    "North America": {
      code: "NA",
      borders: [
        [[49, -125], [25, -125], [25, -65], [49, -65]]
      ],
      totalCredits: 285000000, // Total credits issued (tCO2e)
      tradingVolume: 142000000, // Annual trading volume (tCO2e)
      avgPrice: 24.50, // Average price per credit (USD/tCO2e)
      priceRange: { min: 8.20, max: 45.80 },
      activeProjects: 1250,
      offsetDemand: 89000000, // Corporate offset demand
      projectTypes: ["Forestry", "Renewable Energy", "Methane Capture", "Direct Air Capture", "Soil Carbon"],
      majorMarkets: [
        { name: "California Cap-and-Trade", location: [34.0, -118.2], volume: 85000000, avgPrice: 28.40 },
        { name: "RGGI (Northeast)", location: [41.2, -73.2], volume: 42000000, avgPrice: 13.85 },
        { name: "Quebec Cap-and-Trade", location: [46.8, -71.2], volume: 15000000, avgPrice: 26.70 }
      ],
      performanceData: generatePerformanceData(24.50, 0.35), // Green for carbon credits
    },
    "Europe": {
      code: "EU",
      borders: [
        [[35, -10], [35, 40], [70, 40], [70, -10]]
      ],
      totalCredits: 420000000,
      tradingVolume: 285000000,
      avgPrice: 85.20,
      priceRange: { min: 15.40, max: 98.60 },
      activeProjects: 890,
      offsetDemand: 195000000,
      projectTypes: ["Renewable Energy", "Forestry", "Industrial Efficiency", "Carbon Capture", "Blue Carbon"],
      majorMarkets: [
        { name: "EU ETS", location: [50.8, 4.4], volume: 245000000, avgPrice: 87.30 },
        { name: "UK ETS", location: [51.5, -0.1], volume: 28000000, avgPrice: 75.20 },
        { name: "Voluntary Carbon Market", location: [48.9, 2.3], volume: 12000000, avgPrice: 45.80 }
      ],
      performanceData: generatePerformanceData(85.20, 0.28),
    },
    "Asia": {
      code: "AP",
      borders: [
        // [[35, 70], [35, 145], [-10, 145], [-10, 90], [10, 70]]
        // [[45, 60], [45, 155], [-20, 155], [-20, 80], [20, 60]]
        [[55, 50], [65, 175], [-20, 155], [-20, 80], [30, 50]]
      ],
      totalCredits: 180000000,
      tradingVolume: 95000000,
      avgPrice: 12.80,
      priceRange: { min: 2.50, max: 28.90 },
      activeProjects: 1850,
      offsetDemand: 125000000,
      projectTypes: ["Renewable Energy", "Methane Avoidance", "Cookstoves", "Forestry", "Waste Management"],
      majorMarkets: [
        { name: "China National ETS", location: [39.9, 116.4], volume: 48000000, avgPrice: 7.20 },
        { name: "Korea K-ETS", location: [37.6, 126.9], volume: 18000000, avgPrice: 22.40 },
        { name: "Tokyo Cap-and-Trade", location: [35.7, 139.7], volume: 8500000, avgPrice: 35.60 }
      ],
      performanceData: generatePerformanceData(12.80, 0.42),
    },
    "Latin America": {
      code: "LA",
      borders: [
        [[-4, -81], [-4, -35], [-55, -35], [-55, -81]]
      ],
      totalCredits: 95000000,
      tradingVolume: 28000000,
      avgPrice: 8.50,
      priceRange: { min: 1.80, max: 22.30 },
      activeProjects: 425,
      offsetDemand: 15000000,
      projectTypes: ["Forestry & REDD+", "Renewable Energy", "Cookstoves", "Waste Management", "Agriculture"],
      majorMarkets: [
        { name: "Brazil REDD+ Projects", location: [-15.8, -47.9], volume: 12000000, avgPrice: 6.50 },
        { name: "Colombia VCS Projects", location: [4.7, -74.1], volume: 8500000, avgPrice: 9.20 },
        { name: "Mexico Pilot ETS", location: [19.4, -99.1], volume: 4200000, avgPrice: 14.80 }
      ],
      performanceData: generatePerformanceData(8.50, 0.38),
    },
    "Africa": {
      code: "AF",
      borders: [
        [[37, -18], [37, 50], [-35, 50], [-35, -18]]
      ],
      totalCredits: 45000000,
      tradingVolume: 18000000,
      avgPrice: 5.80,
      priceRange: { min: 0.85, max: 18.50 },
      activeProjects: 680,
      offsetDemand: 8500000,
      projectTypes: ["Cookstoves", "Renewable Energy", "Forestry", "Waste Management", "Agriculture"],
      majorMarkets: [
        { name: "Kenya Cookstove Projects", location: [-1.3, 36.8], volume: 6500000, avgPrice: 4.20 },
        { name: "South Africa Renewables", location: [-25.7, 28.2], volume: 5200000, avgPrice: 8.90 },
        { name: "Ghana Gold Standard", location: [7.9, -1.0], volume: 3800000, avgPrice: 6.40 }
      ],
      performanceData: generatePerformanceData(5.80, 0.45),
    }
  };

  // Generate realistic performance data with trends and volatility
  function generatePerformanceData(basePrice, volatilityFactor) {
    const trendFactors = {
      '1D': { points: 24, trend: 0.002, cycle: 3 },
      '1W': { points: 7, trend: 0.015, cycle: 2 },
      '1M': { points: 30, trend: 0.08, cycle: 6 },
      '1Y': { points: 12, trend: 0.25, cycle: 3 }
    };
    
    const result = {};
    
    Object.keys(trendFactors).forEach(timeframe => {
      const { points, trend, cycle } = trendFactors[timeframe];
      const data = [];
      let price = basePrice;
      
      for (let i = 0; i < points; i++) {
        const cyclical = Math.sin((i / points) * cycle * Math.PI) * basePrice * volatilityFactor * 0.15;
        const random = (Math.random() - 0.5) * basePrice * volatilityFactor * 0.2;
        const trendComponent = (i / points) * trend * basePrice;
        
        price = basePrice + cyclical + random + trendComponent;
        price = Math.max(0.1, price); // Ensure positive prices
        
        const tradingVolume = Math.floor((Math.random() * 0.6 + 0.7) * 2500000); // Trading volume
        const projectCount = Math.floor((Math.random() * 0.4 + 0.8) * 25); // New projects
        
        data.push({
          date: i,
          price: price,
          tradingVolume,
          projectCount,
          offsetDemand: Math.floor(price * tradingVolume * 0.85), // Demand correlation
          verification: Math.random() * 0.3 + 0.7 // Verification rate (70-100%)
        });
      }
      
      result[timeframe] = data;
    });
    
    return result;
  }
  
  // Global aggregation
  const getGlobalData = () => {
    const regions = Object.keys(carbonCreditsData);
    const globalPerformanceData = {};
    
    // Calculate global performance data
    Object.keys(carbonCreditsData[regions[0]].performanceData).forEach(timeframe => {
      const points = carbonCreditsData[regions[0]].performanceData[timeframe].length;
      const globalData = [];
      
      for (let i = 0; i < points; i++) {
        const globalPoint = {
          date: i,
          price: 0,
          tradingVolume: 0,
          projectCount: 0,
          offsetDemand: 0,
          verification: 0
        };
        
        let totalWeight = 0;
        regions.forEach(region => {
          const regionData = carbonCreditsData[region].performanceData[timeframe][i];
          const weight = carbonCreditsData[region].tradingVolume;
          
          globalPoint.price += regionData.price * weight;
          globalPoint.tradingVolume += regionData.tradingVolume;
          globalPoint.projectCount += regionData.projectCount;
          globalPoint.offsetDemand += regionData.offsetDemand;
          globalPoint.verification += regionData.verification * weight;
          totalWeight += weight;
        });
        
        // Calculate weighted averages
        globalPoint.price /= totalWeight;
        globalPoint.verification /= totalWeight;
        
        globalData.push(globalPoint);
      }
      
      globalPerformanceData[timeframe] = globalData;
    });
    
    const totalCredits = regions.reduce((sum, region) => 
      sum + carbonCreditsData[region].totalCredits, 0);
      
    const totalVolume = regions.reduce((sum, region) => 
      sum + carbonCreditsData[region].tradingVolume, 0);
      
    const weightedAvgPrice = regions.reduce((sum, region) => 
      sum + (carbonCreditsData[region].avgPrice * carbonCreditsData[region].tradingVolume), 0) / totalVolume;
      
    const totalDemand = regions.reduce((sum, region) => 
      sum + carbonCreditsData[region].offsetDemand, 0);
      
    const allMarkets = regions.flatMap(region => 
      carbonCreditsData[region].majorMarkets.map(market => ({
        ...market,
        region
      }))
    );
    
    return {
      name: "Global",
      code: "GLOBAL",
      color: "#10B981",
      totalCredits: totalCredits,
      tradingVolume: totalVolume,
      avgPrice: weightedAvgPrice,
      offsetDemand: totalDemand,
      majorMarkets: allMarkets,
      performanceData: globalPerformanceData
    };
  };
  
  const globalData = getGlobalData();
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  // Format carbon credits volume
  const formatVolume = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M tCO₂e`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K tCO₂e`;
    }
    return `${num.toLocaleString()} tCO₂e`;
  };
  
  // Format currency
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(num);
  };
  
  // Format percentage
  const formatPercent = (num) => {
    return `${(num * 100).toFixed(1)}%`;
  };
  
  // Format date based on timeframe
  const formatDate = (timeframe, index) => {
    const now = new Date();
    let date;
    
    switch (timeframe) {
      case '1D':
        date = new Date(now);
        date.setHours(Math.floor(index * (24 / 23)));
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '1W':
        date = new Date(now);
        date.setDate(now.getDate() - 6 + index);
        return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      case '1M':
        date = new Date(now);
        date.setDate(now.getDate() - 29 + index);
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      case '1Y':
        date = new Date(now);
        date.setMonth(now.getMonth() - 11 + index);
        return date.toLocaleDateString([], { month: 'short', year: 'numeric' });
      default:
        return `Period ${index}`;
    }
  };
  
  // Handle region selection
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    
    if (activeView === 'map') {
      setActiveView('chart');
    } else {
      renderCharts(region);
    }
  };
  
  // Reset map view and selection
  const handleResetMapView = () => {
    setSelectedRegion(null);
  };
  
  // Reset selection
  const handleResetSelection = () => {
    setSelectedRegion(null);
    setActiveView('map');
    if (mapRef.current) {
      mapRef.current.setView([20, 0], 2);
    }
  };
  
  // Render performance charts
  const renderCharts = (region = selectedRegion) => {
    if (!chartRef.current) return;
    
    const chartSvg = d3.select(chartRef.current);
    chartSvg.selectAll("*").remove();
    
    const width = chartRef.current.clientWidth;
    const height = 350;
    const margin = { top: 30, right: 60, bottom: 50, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    chartSvg.attr("width", width).attr("height", height);
      
    const chartGroup = chartSvg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
    // Get data for selected region or global
    const chartData = region 
      ? carbonCreditsData[region].performanceData[activeTimeframe]
      : globalData.performanceData[activeTimeframe];
      
    // Create scales based on active metric
    const x = d3.scaleLinear()
      .domain([0, chartData.length - 1])
      .range([0, innerWidth]);
      
    let y, yAxis, lineGenerator, areaGenerator;
    
    switch (activeMetric) {
      case 'price':
        y = d3.scaleLinear()
          .domain([0, d3.max(chartData, d => d.price) * 1.1])
          .range([innerHeight, 0]);
        yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `$${d.toFixed(1)}`);
        lineGenerator = d3.line()
          .x((d, i) => x(i))
          .y(d => y(d.price))
          .curve(d3.curveMonotoneX);
        areaGenerator = d3.area()
          .x((d, i) => x(i))
          .y0(innerHeight)
          .y1(d => y(d.price))
          .curve(d3.curveMonotoneX);
        break;
      case 'volume':
        y = d3.scaleLinear()
          .domain([0, d3.max(chartData, d => d.tradingVolume) * 1.1])
          .range([innerHeight, 0]);
        yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `${(d/1000000).toFixed(1)}M`);
        lineGenerator = d3.line()
          .x((d, i) => x(i))
          .y(d => y(d.tradingVolume))
          .curve(d3.curveMonotoneX);
        areaGenerator = d3.area()
          .x((d, i) => x(i))
          .y0(innerHeight)
          .y1(d => y(d.tradingVolume))
          .curve(d3.curveMonotoneX);
        break;
      case 'projects':
        y = d3.scaleLinear()
          .domain([0, d3.max(chartData, d => d.projectCount) * 1.1])
          .range([innerHeight, 0]);
        yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `${d} projects`);
        lineGenerator = d3.line()
          .x((d, i) => x(i))
          .y(d => y(d.projectCount))
          .curve(d3.curveMonotoneX);
        areaGenerator = d3.area()
          .x((d, i) => x(i))
          .y0(innerHeight)
          .y1(d => y(d.projectCount))
          .curve(d3.curveMonotoneX);
        break;
      default:
        y = d3.scaleLinear()
          .domain([0, d3.max(chartData, d => d.verification) * 1.1])
          .range([innerHeight, 0]);
        yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `${(d*100).toFixed(0)}%`);
        lineGenerator = d3.line()
          .x((d, i) => x(i))
          .y(d => y(d.verification))
          .curve(d3.curveMonotoneX);
        areaGenerator = d3.area()
          .x((d, i) => x(i))
          .y0(innerHeight)
          .y1(d => y(d.verification))
          .curve(d3.curveMonotoneX);
    }
      
    const xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickFormat(d => formatDate(activeTimeframe, d));
      
    // Add axes
    chartGroup.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("fill", "#E6E6FA")
      .style("font-size", "10px");
      
    chartGroup.append("g")
      .call(yAxis)
      .selectAll("text")
      .attr("fill", "#E6E6FA")
      .style("font-size", "10px");
      
    // Add grid lines
    chartGroup.append("g")
      .attr("class", "grid")
      .attr("opacity", 0.1)
      .selectAll("line")
      .data(y.ticks(5))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .attr("stroke", "#fff");
      
    // Add area gradient
    const gradient = chartSvg.append("defs")
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", 0).attr("y2", innerHeight);
      
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#10B981")
      .attr("stop-opacity", 0.3);
      
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#10B981")
      .attr("stop-opacity", 0.05);
      
    // Add area
    chartGroup.append("path")
      .datum(chartData)
      .attr("fill", "url(#area-gradient)")
      .attr("d", areaGenerator);
      
    // Add line
    chartGroup.append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "#10B981")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);
      
    // Add data points
    chartGroup.selectAll(".data-point")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", (d, i) => x(i))
      .attr("cy", d => {
        switch (activeMetric) {
          case 'price': return y(d.price);
          case 'volume': return y(d.tradingVolume);
          case 'projects': return y(d.projectCount);
          default: return y(d.verification);
        }
      })
      .attr("r", 3)
      .attr("fill", "#10B981")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);
      
    // Add tooltip interaction area
    chartGroup.append("rect")
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("fill", "transparent")
      .on("mousemove", function(event) {
        const mouseX = d3.pointer(event)[0];
        const i = Math.min(
          chartData.length - 1,
          Math.max(0, Math.round(x.invert(mouseX)))
        );
        
        const item = chartData[i];
        if (!item) return;
        
        // Show tooltip
        const tooltip = d3.select(tooltipRef.current);
        tooltip.style("visibility", "visible")
          .style("opacity", 1)
          .html(`
            <div class="p-2 rounded-lg bg-gray-900/90 backdrop-blur-md border border-green-500/30">
              <div class="text-green-500 font-bold">${formatDate(activeTimeframe, i)}</div>
              <div class="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                <div class="text-xs text-gray-300">Price:</div>
                <div class="text-xs text-green-100">${formatCurrency(item.price)}</div>
                <div class="text-xs text-gray-300">Volume:</div>
                <div class="text-xs text-green-100">${formatVolume(item.tradingVolume)}</div>
                <div class="text-xs text-gray-300">Projects:</div>
                <div class="text-xs text-green-100">${formatNumber(item.projectCount)}</div>
                <div class="text-xs text-gray-300">Verification:</div>
                <div class="text-xs text-green-100">${formatPercent(item.verification)}</div>
              </div>
            </div>
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseleave", function() {
        d3.select(tooltipRef.current).style("visibility", "hidden");
      });
      
    // Add chart title
    chartGroup.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("fill", "#10B981")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`${region || 'Global'} Carbon Credits Market - ${activeTimeframe} View`);
  };
  
  // Effect to update charts when timeframe or view changes
  useEffect(() => {
    if (activeView === 'chart') {
      setTimeout(() => renderCharts(), 100);
    }
  }, [activeTimeframe, activeView, activeMetric]);
  
  // Load initial data for legend
  useEffect(() => {
    const legend = d3.select(legendRef.current);
    legend.selectAll("*").remove();
    
    const legendContainer = legend.append("div")
      .attr("class", "grid grid-cols-2 gap-2 p-2 bg-gray-900/50 backdrop-blur-md rounded-lg border border-green-500/20");
      
    // Volume legend
    const volumeItems = Object.entries(carbonCreditsData)
      .sort((a, b) => b[1].tradingVolume - a[1].tradingVolume)
      .map(([region, data]) => ({
        name: region,
        value: data.tradingVolume,
        color: data.color
      }));
      
    legendContainer.append("div")
      .attr("class", "col-span-2")
      .html(`<div class="text-xs font-bold text-green-500 mb-1">Trading Volume (tCO₂e)</div>`);
      
    volumeItems.forEach(item => {
      legendContainer.append("div")
        .attr("class", "flex items-center space-x-1")
        .html(`
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <div class="text-xs text-gray-300">${item.name}</div>
        `);
        
      legendContainer.append("div")
        .attr("class", "text-right")
        .html(`<div class="text-xs text-green-200">${formatVolume(item.value)}</div>`);
    });
    
    // Add global total
    legendContainer.append("div")
      .attr("class", "col-span-1 mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-gray-300">Global Total:</div>`);
      
    legendContainer.append("div")
      .attr("class", "text-right mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-green-300">${formatVolume(globalData.tradingVolume)}</div>`);
      
    setIsLoading(false);
  }, []);
  
  // Region details component
  const RegionDetails = () => {
    if (!selectedRegion) return null;
    
    const regionData = carbonCreditsData[selectedRegion];
    return (
      <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-green-500/20 p-3 mt-4">
        <h4 className="font-bold text-green-500 mb-2">{selectedRegion} Carbon Credits Market</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-300">Total Credits Issued:</p>
            <p className="text-lg font-semibold text-green-300">{formatVolume(regionData.totalCredits)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Average Price:</p>
            <p className="text-lg font-semibold text-green-300">{formatCurrency(regionData.avgPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Trading Volume:</p>
            <p className="text-lg font-semibold text-green-300">{formatVolume(regionData.tradingVolume)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Active Projects:</p>
            <p className="text-lg font-semibold text-green-300">{formatNumber(regionData.activeProjects)}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-300 mb-1">Project Types:</p>
            <div className="flex flex-wrap gap-1">
              {regionData.projectTypes.slice(0, 5).map(type => (
                <span key={type} className="bg-green-500/10 text-green-200 text-xs px-2 py-1 rounded">
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-2 mt-1">
            <p className="text-sm text-gray-300 mb-1">Major Markets:</p>
            <div className="grid grid-cols-1 gap-2">
              {regionData.majorMarkets.slice(0, 3).map(market => (
                <div key={market.name} className="bg-gray-800/50 rounded p-2">
                  <div className="font-semibold text-white text-sm">{market.name}</div>
                  <div className="text-xs text-green-200">{formatCurrency(market.avgPrice)} avg</div>
                  <div className="text-xs text-gray-400">{formatVolume(market.volume)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const annualTransactions = Math.round(globalData.tradingVolume * 0.4); // Assuming 40% trading volume turnover annually
  
  return (
   <div className="bg-gray-900/80 backdrop-blur-xl border border-green-500/20 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-green-500/20">
        <div className="flex items-center">
          <h3 className="text-xl font-bold text-green-500">
            Global Carbon Credits Dashboard
          </h3>
          {selectedRegion && (
            <span className="ml-2 text-sm bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
              {selectedRegion}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          {["1D", "1W", "1M", "1Y"].map((timeframe) => (
            <button
              key={timeframe}
              className={`px-3 py-1 text-sm rounded-md transition-all ${
                activeTimeframe === timeframe
                  ? "bg-green-500/20 text-green-500"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
              onClick={() => setActiveTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center p-2 px-4 border-b border-green-500/10">
        <div className="text-sm text-gray-400">
          {hoveredRegion
            ? `Exploring: ${hoveredRegion}`
            : "Hover over regions to explore carbon credits markets"}
        </div>
        <div className="flex space-x-2">
          <button
            className={`p-1 rounded flex items-center space-x-1 ${
              activeView === "map" ? "text-green-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("map")}
            title="Map View"
          >
            <Globe size={16} />
            <span className="text-xs">Map</span>
          </button>
          <button
            className={`p-1 rounded flex items-center space-x-1 ${
              activeView === "chart" ? "text-green-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("chart")}
            title="Chart View"
          >
            <LineChart size={16} />
            <span className="text-xs">Chart</span>
          </button>
          {activeView === "chart" && (
            <div className="flex space-x-1 ml-2">
              {[
                { key: 'price', icon: DollarSign, label: 'Price' },
                { key: 'volume', icon: BarChart, label: 'Volume' },
                { key: 'projects', icon: Building, label: 'Projects' },
                { key: 'verification', icon: Check, label: 'Verification' }
              ].map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  className={`p-1 rounded flex items-center space-x-1 ${
                    activeMetric === key ? "text-green-500 bg-green-500/10" : "text-gray-400"
                  }`}
                  onClick={() => setActiveMetric(key)}
                  title={`${label} Chart`}
                >
                  <Icon size={14} />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          )}
          {selectedRegion && (
            <button
              className="px-2 py-1 text-xs rounded bg-green-500/10 text-green-500 hover:bg-green-500/20 flex items-center"
              onClick={handleResetSelection}
            >
              <Globe size={12} className="mr-1" />
              Global View
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div
          className={`relative md:col-span-2 ${isLoading ? "opacity-50" : ""}`}
        >
          {activeView === "map" ? (
            <div className="relative h-[525px] bg-gray-900/30 rounded-lg overflow-hidden">
              <MapContainer
                attributionControl={false}
                center={[20, 0]}
                zoom={2}
                style={{ height: "100%", width: "100%", background: "#0a1428" }}
                zoomControl={false}
                maxBounds={[
                  [90, -180],
                  [-90, 180],
                ]}
                maxBoundsViscosity={1.0}
                whenCreated={(mapInstance) => {
                  mapRef.current = mapInstance;
                }}
              >
                {/* Dark-themed map tiles */}
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  noWrap={true}
                />

                {/* Add region polygons */}
                {Object.entries(carbonCreditsData).map(([region, data]) =>
                  data.borders.map((border, i) => (
                    <Polygon
                      key={`${region}-border-${i}`}
                      positions={border}
                      pathOptions={{
                        fillColor: data.color,
                        fillOpacity: selectedRegion === region ? 0.0 : 0.00,
                        opacity: selectedRegion === region ? 0.0 : 0.0,
                      }}
                      eventHandlers={{
                        mouseover: (e) => {
                          setHoveredRegion(region);
                          e.target.setStyle({
                            fillOpacity: 0.0,
                            opacity: 0.0,
                          });
                        },
                        mouseout: (e) => {
                          setHoveredRegion(null);
                          e.target.setStyle({
                            fillOpacity: selectedRegion === region ? 0.0 : 0.00,
                            weight: selectedRegion === region ? 0 : 0,
                            opacity: selectedRegion === region ? 0.0 : 0.0,
                          });
                        },
                        click: () => {
                          handleRegionSelect(region);
                        },
                      }}
                    />
                  ))
                )}

                {/* Add major carbon credit markets */}
                {Object.entries(carbonCreditsData).map(([region, data]) =>
                  data.majorMarkets.map((market, i) => (
                    <CircleMarker
                      key={`${region}-market-${i}`}
                      center={market.location}
                      radius={Math.log(market.volume / 1000000) * 2 + 3}
                      pathOptions={{
                        fillOpacity: 0.0,
                        color: "#065F46",
                      }}
                    >
                      <Tooltip>
                        <div className="p-1">
                          <div className="font-bold text-green-500">
                            {market.name}
                          </div>
                          <div className="text-sm">
                            Volume: {formatVolume(market.volume)}
                          </div>
                          <div className="text-sm">
                            Avg Price: {formatCurrency(market.avgPrice)}
                          </div>
                          <div className="text-sm">Region: {region}</div>
                        </div>
                      </Tooltip>
                    </CircleMarker>
                  ))
                )}

                {/* Custom controls */}
                <MapResetControl resetMapView={handleResetMapView} />
              </MapContainer>
            </div>
          ) : (
            <div>
              <svg
                ref={chartRef}
                width="100%"
                height="350"
                className="bg-gray-900/30 rounded-lg"
              ></svg>
              {selectedRegion && <RegionDetails />}
            </div>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          )}
        </div>

        <div className="bg-gray-900/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-green-500 font-bold">
              Carbon Credits Market Overview
            </h4>
            <Leaf size={16} className="text-green-400" />
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="text-sm text-gray-300 mb-1">
                Global Credits Issued
              </h5>
              <div className="text-2xl font-bold text-green-300">
                {formatVolume(globalData.totalCredits)}{" "}
                <span className="text-xs text-green-400">total issued</span>
              </div>
              <div className="text-xs text-gray-400">
                Verified carbon offset credits
              </div>
            </div>

            <div>
              <h5 className="text-sm text-gray-300 mb-1">Trading Volume</h5>
              <div className="text-2xl font-bold text-green-300">
                {formatVolume(globalData.tradingVolume)}{" "}
                <span className="text-xs text-green-400">annual</span>
              </div>
              <div className="text-xs text-gray-400">
                Active market transactions
              </div>
            </div>

            {/* <div>
              <h5 className="text-sm text-gray-300 mb-1">Global Avg Price</h5>
              <div className="text-2xl font-bold text-green-300">
                {formatCurrency(globalData.avgPrice)}{" "}
                <span className="text-xs text-gray-400">per tCO₂e</span>
              </div>
              <div className="text-xs text-gray-400">
                Weighted average price
              </div>
            </div> */}

            <div>
              <h5 className="text-sm text-gray-300 mb-1">Regional Price Trends</h5>
              <div className="grid grid-cols-2 gap-1 mt-2">
                {Object.entries(carbonCreditsData)
                  .slice(0, 4)
                  .map(([region, data]) => {
                  const currentPrice =
                    data.performanceData[activeTimeframe][
                      data.performanceData[activeTimeframe].length - 1
                    ].price;
                  const previousPrice =
                    data.performanceData[activeTimeframe][0].price;
                  const change = ((currentPrice - previousPrice) / previousPrice) * 100;

                  return (
                    <div key={region} className="flex items-center justify-between p-1">
                      <div className="flex items-center space-x-2">
                        <div className="text-xs text-gray-300">
                          {region}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`text-xs ${
                            change >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {change >= 0 ? "↑" : "↓"}{" "}
                          {Math.abs(change).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* <div>
              <h5 className="text-sm text-gray-300 mb-1">Project Types Distribution</h5>
              <div className="space-y-1 mt-2">
                {["Forestry & REDD+", "Renewable Energy", "Methane Avoidance", "Direct Air Capture", "Blue Carbon"].map((type, i) => {
                  const percentage = [35, 28, 15, 12, 10][i];
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <div className="text-xs text-gray-300">{type}</div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-1">
                          <div 
                            className="bg-green-500 h-1 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-green-300 w-8 text-right">{percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div> */}

            <div ref={legendRef} className="mt-4"></div>
          </div>
        </div>
      </div>

      <div
        ref={tooltipRef}
        className="fixed pointer-events-none transition-all duration-100 opacity-0 z-50"
      ></div>
    </div>
  );
};

export default GlobalCarbonCreditsMarketDashboard;