import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, CircleMarker, Polygon, Tooltip, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as d3 from 'd3';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Globe,
  Shield,
  Building,
  Search,
  Moon,
  Sun,
  Home,
  TrendingUp,
  BarChart,
  LineChart,
  DollarSign,
  PieChart
} from "lucide-react";
import { Download, RefreshCw } from 'react-feather';

// Real Estate Market Visualization Component
const ContinentalRealEstateMap = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('1M');
  const [activeView, setActiveView] = useState('map');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  
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
            <RefreshCw size={16} className="text-blue-500" />
          </button>
        </div>
      </div>
    );
  };
  
  // Real estate data by region with ISO country codes
  const realEstateData = {
    "North America": {
      code: "NA",
      borders: [
        [[49, -125], [25, -125], [25, -65], [49, -65]]
      ],
      avgPrice: 450000,  // in USD
      inventory: 1200000,  // number of homes for sale
      marketGrowth: 4.2, // percent annually
      countries: ["United States", "Canada", "Mexico"],
      majorCities: [
        { name: "New York", coordinates: [40.7, -74.0], avgPrice: 850000, inventory: 25000 },
        { name: "Los Angeles", coordinates: [34.0, -118.2], avgPrice: 920000, inventory: 18500 },
        { name: "Toronto", coordinates: [43.7, -79.4], avgPrice: 780000, inventory: 15000 }
      ],
      priceData: generatePriceData(450000, 0.04)
    },
    "South America": {
      code: "SA",
      borders: [
        [[-4, -81], [-4, -35], [-55, -35], [-55, -81]]
      ],
      avgPrice: 180000,
      inventory: 850000,
      marketGrowth: 5.8,
      countries: ["Brazil", "Argentina", "Chile", "Colombia", "Peru"],
      majorCities: [
        { name: "São Paulo", coordinates: [-23.5, -46.6], avgPrice: 320000, inventory: 42000 },
        { name: "Buenos Aires", coordinates: [-34.6, -58.4], avgPrice: 240000, inventory: 18000 },
        { name: "Santiago", coordinates: [-33.4, -70.6], avgPrice: 290000, inventory: 12000 }
      ],
      priceData: generatePriceData(180000, 0.05)
    },
    "Europe": {
      code: "EU",
      borders: [
        [[35, -10], [35, 40], [70, 40], [70, -10]]
      ],
      avgPrice: 380000,
      inventory: 980000,
      marketGrowth: 3.1,
      countries: ["Germany", "France", "UK", "Italy", "Spain"],
      majorCities: [
        { name: "London", coordinates: [51.5, -0.1], avgPrice: 920000, inventory: 28000 },
        { name: "Paris", coordinates: [48.9, 2.3], avgPrice: 780000, inventory: 22000 },
        { name: "Berlin", coordinates: [52.5, 13.4], avgPrice: 520000, inventory: 18000 }
      ],
      priceData: generatePriceData(380000, 0.03)
    },
    "Africa": {
      code: "AF",
      borders: [
        [[35, -18], [35, 50], [-35, 50], [-35, -18]]
      ],
      avgPrice: 120000,
      inventory: 420000,
      marketGrowth: 7.3,
      countries: ["South Africa", "Nigeria", "Egypt", "Morocco", "Kenya"],
      majorCities: [
        { name: "Cape Town", coordinates: [-33.9, 18.4], avgPrice: 210000, inventory: 15000 },
        { name: "Lagos", coordinates: [6.5, 3.4], avgPrice: 180000, inventory: 28000 },
        { name: "Cairo", coordinates: [30.0, 31.2], avgPrice: 150000, inventory: 32000 }
      ],
      priceData: generatePriceData(120000, 0.06)
    },
    "Asia": {
      code: "AS",
      borders: [
        [[35, 40], [35, 145], [0, 145], [0, 90], [10, 40]]
      ],
      avgPrice: 320000,
      inventory: 1850000,
      marketGrowth: 6.8,
      countries: ["China", "Japan", "India", "South Korea", "Singapore"],
      majorCities: [
        { name: "Tokyo", coordinates: [35.7, 139.8], avgPrice: 780000, inventory: 45000 },
        { name: "Singapore", coordinates: [1.3, 103.8], avgPrice: 920000, inventory: 18000 },
        { name: "Shanghai", coordinates: [31.2, 121.5], avgPrice: 650000, inventory: 62000 }
      ],
      priceData: generatePriceData(320000, 0.07)
    },
    "Oceania": {
      code: "OC",
      borders: [
        [[-5, 120], [-5, 180], [-45, 180], [-45, 110], [-15, 110]]
      ],
      avgPrice: 510000,
      inventory: 320000,
      marketGrowth: 5.2,
      countries: ["Australia", "New Zealand"],
      majorCities: [
        { name: "Sydney", coordinates: [-33.9, 151.2], avgPrice: 880000, inventory: 22000 },
        { name: "Melbourne", coordinates: [-37.8, 145.0], avgPrice: 720000, inventory: 19000 },
        { name: "Auckland", coordinates: [-36.8, 174.8], avgPrice: 650000, inventory: 12000 }
      ],
      priceData: generatePriceData(510000, 0.05)
    }
  };
  
  // Generate realistic price data with trends and volatility
  function generatePriceData(basePrice, volatilityFactor) {
    const trendFactors = {
      '1D': { points: 24, trend: 0.001, cycle: 6 },
      '1W': { points: 7, trend: 0.01, cycle: 3 },
      '1M': { points: 30, trend: 0.025, cycle: 8 },
      '1Y': { points: 12, trend: 0.08, cycle: 4 }
    };
    
    const result = {};
    
    Object.keys(trendFactors).forEach(timeframe => {
      const { points, trend, cycle } = trendFactors[timeframe];
      const data = [];
      let price = basePrice;
      
      // Add general trend
      const trendDirection = Math.random() > 0.3 ? 1 : -1; // Real estate usually trends upward
      
      for (let i = 0; i < points; i++) {
        // Add cyclical component
        const cyclical = Math.sin((i / points) * cycle * Math.PI) * basePrice * volatilityFactor * 0.1;
        
        // Add random walk
        const random = (Math.random() - 0.5) * basePrice * volatilityFactor * 0.1;
        
        // Add trend
        const trendComponent = (i / points) * trend * basePrice * trendDirection;
        
        price = basePrice + cyclical + random + trendComponent;
        
        // Calculate daily high/low/open/close
        const dailyVolatility = basePrice * volatilityFactor * 0.01;
        const open = price - (Math.random() - 0.5) * dailyVolatility;
        const close = price;
        const high = Math.max(open, close) + Math.random() * dailyVolatility;
        const low = Math.min(open, close) - Math.random() * dailyVolatility;
        const volume = Math.floor((Math.random() * 0.5 + 0.75) * 1000);
        
        data.push({
          date: i,
          price,
          open,
          high,
          low,
          close,
          volume // number of transactions
        });
      }
      
      result[timeframe] = data;
    });
    
    return result;
  }
  
  // Global averages
  const getGlobalData = () => {
    const regions = Object.keys(realEstateData);
    const globalPriceData = {};
    
    // Calculate global price data
    Object.keys(realEstateData[regions[0]].priceData).forEach(timeframe => {
      const points = realEstateData[regions[0]].priceData[timeframe].length;
      const globalData = [];
      
      for (let i = 0; i < points; i++) {
        const globalPoint = {
          date: i,
          price: 0,
          open: 0,
          high: 0,
          low: Number.MAX_VALUE,
          close: 0,
          volume: 0
        };
        
        regions.forEach(region => {
          const regionData = realEstateData[region].priceData[timeframe][i];
          globalPoint.price += regionData.price;
          globalPoint.open += regionData.open;
          globalPoint.close += regionData.close;
          globalPoint.high = Math.max(globalPoint.high, regionData.high);
          globalPoint.low = Math.min(globalPoint.low, regionData.low);
          globalPoint.volume += regionData.volume;
        });
        
        // Calculate averages
        globalPoint.price /= regions.length;
        globalPoint.open /= regions.length;
        globalPoint.close /= regions.length;
        
        globalData.push(globalPoint);
      }
      
      globalPriceData[timeframe] = globalData;
    });
    
    const totalInventory = regions.reduce((sum, region) => 
      sum + realEstateData[region].inventory, 0);
      
    const averageMarketGrowth = regions.reduce((sum, region) => 
      sum + realEstateData[region].marketGrowth, 0) / regions.length;
      
    const allCities = regions.flatMap(region => 
      realEstateData[region].majorCities.map(city => ({
        ...city,
        region
      }))
    );
    
    return {
      name: "Global",
      code: "GLOBAL",
      color: "#3B82F6", // Blue color for real estate
      avgPrice: regions.reduce((sum, region) => sum + realEstateData[region].avgPrice, 0) / regions.length,
      inventory: totalInventory,
      marketGrowth: averageMarketGrowth,
      majorCities: allCities,
      priceData: globalPriceData
    };
  };
  
  const globalData = getGlobalData();
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  // Format currency
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
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
        return `Day ${index}`;
    }
  };
  
  // Handle region selection
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    
    // If in map view, change to chart view
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
  
  // Render price charts
  const renderCharts = (region = selectedRegion) => {
    if (!chartRef.current) return;
    
    const chartSvg = d3.select(chartRef.current);
    chartSvg.selectAll("*").remove();
    
    const width = chartRef.current.clientWidth;
    const height = 350;
    const margin = { top: 30, right: 60, bottom: 50, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    chartSvg.attr("width", width)
      .attr("height", height);
      
    const chartGroup = chartSvg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
    // Get data for selected region or global
    const chartData = region 
      ? realEstateData[region].priceData[activeTimeframe]
      : globalData.priceData[activeTimeframe];
      
    // Create scales
    const x = d3.scaleLinear()
      .domain([0, chartData.length - 1])
      .range([0, innerWidth]);
      
    const y = d3.scaleLinear()
      .domain([
        d3.min(chartData, d => d.low) * 0.998,
        d3.max(chartData, d => d.high) * 1.002
      ])
      .range([innerHeight, 0]);
      
    const volumeScale = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.volume)])
      .range([innerHeight, innerHeight * 0.8]);
      
    // Create axes
    const xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickFormat(d => formatDate(activeTimeframe, d));
      
    const yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickFormat(d => formatCurrency(d));
      
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
      
    // Add volume bars
    chartGroup.selectAll(".volume-bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "volume-bar")
      .attr("x", (d, i) => x(i) - innerWidth / chartData.length / 2 * 0.8)
      .attr("y", d => volumeScale(d.volume))
      .attr("width", innerWidth / chartData.length * 0.8)
      .attr("height", d => innerHeight - volumeScale(d.volume))
      .attr("fill", (d, i) => {
        return i > 0 && chartData[i].close > chartData[i-1].close
          ? "rgba(59, 130, 246, 0.3)" // Blue for real estate
          : "rgba(239, 68, 68, 0.3)"; // Red for negative
      });
      
    // Add candles
    const candleWidth = Math.max(2, Math.min(15, innerWidth / chartData.length / 2));
    
    // Add stems (high-low lines)
    chartGroup.selectAll(".stem")
      .data(chartData)
      .enter()
      .append("line")
      .attr("class", "stem")
      .attr("x1", (d, i) => x(i))
      .attr("x2", (d, i) => x(i))
      .attr("y1", d => y(d.high))
      .attr("y2", d => y(d.low))
      .attr("stroke", d => d.open > d.close ? "#EF4444" : "#3B82F6")
      .attr("stroke-width", 1);
      
    // Add candle bodies
    chartGroup.selectAll(".candle")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "candle")
      .attr("x", (d, i) => x(i) - candleWidth / 2)
      .attr("y", d => y(Math.max(d.open, d.close)))
      .attr("width", candleWidth)
      .attr("height", d => Math.abs(y(d.open) - y(d.close)))
      .attr("fill", d => d.open > d.close ? "#EF4444" : "#3B82F6");
      
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
            <div class="p-2 rounded-lg bg-gray-900/90 backdrop-blur-md border border-blue-500/30">
              <div class="text-blue-500 font-bold">${formatDate(activeTimeframe, i)}</div>
              <div class="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                <div class="text-xs text-gray-300">Open:</div>
                <div class="text-xs text-blue-100">${formatCurrency(item.open)}</div>
                <div class="text-xs text-gray-300">High:</div>
                <div class="text-xs text-blue-100">${formatCurrency(item.high)}</div>
                <div class="text-xs text-gray-300">Low:</div>
                <div class="text-xs text-blue-100">${formatCurrency(item.low)}</div>
                <div class="text-xs text-gray-300">Close:</div>
                <div class="text-xs text-blue-100">${formatCurrency(item.close)}</div>
                <div class="text-xs text-gray-300">Volume:</div>
                <div class="text-xs text-blue-100">${formatNumber(item.volume)} transactions</div>
              </div>
            </div>
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
          
        // Show crosshair
        chartGroup.selectAll(".crosshair-x").remove();
        chartGroup.selectAll(".crosshair-y").remove();
        chartGroup.selectAll(".crosshair-label").remove();
        
        // Vertical line
        chartGroup.append("line")
          .attr("class", "crosshair-x")
          .attr("x1", x(i))
          .attr("x2", x(i))
          .attr("y1", 0)
          .attr("y2", innerHeight)
          .attr("stroke", "#3B82F6")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");
          
        // Horizontal line
        chartGroup.append("line")
          .attr("class", "crosshair-y")
          .attr("x1", 0)
          .attr("x2", innerWidth)
          .attr("y1", y(item.close))
          .attr("y2", y(item.close))
          .attr("stroke", "#3B82F6")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");
          
        // Price label
        chartGroup.append("text")
          .attr("class", "crosshair-label")
          .attr("x", innerWidth + 5)
          .attr("y", y(item.close) + 4)
          .attr("fill", "#3B82F6")
          .attr("font-size", "10px")
          .text(formatCurrency(item.close));
      })
      .on("mouseleave", function() {
        d3.select(tooltipRef.current).style("visibility", "hidden");
        chartGroup.selectAll(".crosshair-x").remove();
        chartGroup.selectAll(".crosshair-y").remove();
        chartGroup.selectAll(".crosshair-label").remove();
      });
      
    // Add chart title
    chartGroup.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("fill", "#3B82F6")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`${region || 'Global'} Real Estate Prices - ${activeTimeframe} View`);
      
    // Add axes labels
    chartGroup.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .attr("text-anchor", "middle")
      .attr("fill", "#E6E6FA")
      .attr("font-size", "12px")
      .text("Time Period");
      
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .attr("fill", "#E6E6FA")
      .attr("font-size", "12px")
      .text("Property Price (USD)");
  };
  
  // Effect to update charts when timeframe or view changes
  useEffect(() => {
    if (activeView === 'chart') {
      renderCharts();
    }
  }, [activeTimeframe, activeView]);
  
  // Load initial data for legend
  useEffect(() => {
    // Generate legend data
    const legend = d3.select(legendRef.current);
    legend.selectAll("*").remove();
    
    const legendContainer = legend.append("div")
      .attr("class", "grid grid-cols-2 gap-2 p-2 bg-gray-900/50 backdrop-blur-md rounded-lg border border-blue-500/20");
      
    // Price legend
    const priceItems = Object.entries(realEstateData)
      .sort((a, b) => b[1].avgPrice - a[1].avgPrice)
      .map(([region, data]) => ({
        name: region,
        value: data.avgPrice,
        color: data.color
      }));
      
    legendContainer.append("div")
      .attr("class", "col-span-2")
      .html(`<div class="text-xs font-bold text-blue-500 mb-1">Average Property Prices (USD)</div>`);
      
    priceItems.forEach(item => {
      legendContainer.append("div")
        .attr("class", "flex items-center space-x-1")
        .html(`
          <div class="w-3 h-3 rounded-full bg-blue-500"></div>
          <div class="text-xs text-gray-300">${item.name}</div>
        `);
        
      legendContainer.append("div")
        .attr("class", "text-right")
        .html(`<div class="text-xs text-blue-200">${formatCurrency(item.value)}</div>`);
    });
    
    // Add global average
    legendContainer.append("div")
      .attr("class", "col-span-1 mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-gray-300">Global Average:</div>`);
      
    legendContainer.append("div")
      .attr("class", "text-right mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-blue-300">${formatCurrency(globalData.avgPrice)}</div>`);
      
    setIsLoading(false);
  }, []);
  
  // Region details component
  const RegionDetails = () => {
    if (!selectedRegion) return null;
    
    const regionData = realEstateData[selectedRegion];
    return (
      <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-blue-500/20 p-3 mt-4">
        <h4 className="font-bold text-blue-500 mb-2">{selectedRegion} Details</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-300">Average Property Price:</p>
            <p className="text-lg font-semibold text-blue-300">{formatCurrency(regionData.avgPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Annual Growth Rate:</p>
            <p className="text-lg font-semibold text-blue-300">{regionData.marketGrowth}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Property Inventory:</p>
            <p className="text-lg font-semibold text-blue-300">{formatNumber(regionData.inventory)} listings</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-300 mb-1">Major Markets:</p>
            <div className="flex flex-wrap gap-1">
              {regionData.countries.map(country => (
                <span key={country} className="bg-blue-500/10 text-blue-200 text-xs px-2 py-1 rounded">
                  {country}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-2 mt-1">
            <p className="text-sm text-gray-300 mb-1">Top Cities:</p>
            <div className="grid grid-cols-2 gap-2">
              {regionData.majorCities.slice(0, 4).map(city => (
                <div key={city.name} className="bg-gray-800/50 rounded p-2">
                  <div className="font-semibold text-white text-sm">{city.name}</div>
                  <div className="text-xs text-blue-200">{formatCurrency(city.avgPrice)} avg</div>
                  <div className="text-xs text-gray-400">{formatNumber(city.inventory)} listings</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };


  const annualTransactions = Math.round(globalData.inventory * 0.4); // Assuming 40% inventory turnover annually
  
  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-blue-500/20 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-blue-500/20">
        <div className="flex items-center">
          <h3 className="text-xl font-bold text-blue-500">
            Global Real Estate Data
          </h3>
          {selectedRegion && (
            <span className="ml-2 text-sm bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
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
                  ? "bg-blue-500/20 text-blue-500"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
              onClick={() => setActiveTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center p-2 px-4 border-b border-blue-500/10">
        <div className="text-sm text-gray-400">
          {hoveredRegion
            ? `Exploring: ${hoveredRegion}`
            : "Hover over regions to explore"}
        </div>
        <div className="flex space-x-2">
          <button
            className={`p-1 rounded flex items-center space-x-1 ${
              activeView === "map" ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("map")}
            title="Map View"
          >
            <Globe size={16} />
            <span className="text-xs">Map</span>
          </button>
          <button
            className={`p-1 rounded flex items-center space-x-1 ${
              activeView === "chart" ? "text-blue-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("chart")}
            title="Chart View"
          >
            <LineChart size={16} />
            <span className="text-xs">Chart</span>
          </button>
          {selectedRegion && (
            <button
              className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 flex items-center"
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
                attributionControl={false} //remove the "Leaflet" text that appears in the bottom right corner of the map
                center={[20, 0]}
                zoom={2}
                style={{ height: "100%", width: "100%", background: "#0a1428" }}
                zoomControl={false} // Disable the default zoom controls
                maxBounds={[
                  [90, -180],
                  [-90, 180],
                ]} // Restrict the map to a single world view
                maxBoundsViscosity={1.0} // Prevents panning outside the bounds
                whenCreated={(mapInstance) => {
                  mapRef.current = mapInstance;
                }}
              >
                {/* Dark-themed map tiles */}
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  noWrap={true} // Prevents the map from repeating horizontally
                />

                {/* Add region polygons */}
                {Object.entries(realEstateData).map(([region, data]) =>
                  data.borders.map((border, i) => (
                    <Polygon
                      key={`${region}-border-${i}`}
                      positions={border}
                      pathOptions={{
                        fillColor: data.color,
                        fillOpacity: selectedRegion === region ? 0.0 : 0.0,
                        weight: 0.1,
                        color: "#555",
                        opacity: 0.1,
                      }}
                      eventHandlers={{
                        mouseover: (e) => {
                          setHoveredRegion(region);
                          e.target.setStyle({
                            fillOpacity: 0.0,
                          });
                        },
                        mouseout: (e) => {
                          setHoveredRegion(null);
                          e.target.setStyle({
                            fillOpacity: selectedRegion === region ? 0.0 : 0.0,
                          });
                        },
                        click: () => {
                          handleRegionSelect(region);
                        },
                      }}
                    />
                  ))
                )}

                {/* Add major cities */}
                {Object.entries(realEstateData).map(([region, data]) =>
                  data.majorCities.map((city, i) => (
                    <CircleMarker
                      key={`${region}-city-${i}`}
                      center={city.coordinates}
                      radius={Math.log(city.inventory) * 0.3}
                      pathOptions={{
                        fillColor: "#3B82F6",
                        fillOpacity: 0.8,
                        color: "#222",
                        weight: 1,
                      }}
                    >
                      <Tooltip>
                        <div className="p-1">
                          <div className="font-bold text-blue-500">
                            {city.name}
                          </div>
                          <div className="text-sm">
                            Avg Price: {formatCurrency(city.avgPrice)}
                          </div>
                          <div className="text-sm">
                            Inventory: {formatNumber(city.inventory)} listings
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        <div className="bg-gray-900/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-blue-500 font-bold">
              Real Estate Market Overview
            </h4>
            <Search size={16} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="text-sm text-gray-300 mb-1">
                Global Property Transactions
              </h5>
              <div className="text-2xl font-bold text-blue-300">
                {formatNumber(Math.round(globalData.inventory / 1000000))} million listings{" "}
                <span className="text-xs text-green-400">available</span>
              </div>
              <div className="text-xs text-gray-400">
                Based on latest Global Real Estate Index data
              </div>
            </div>

            <div>
              <h5 className="text-sm text-gray-300 mb-1">
                Available Inventory
              </h5>
              <div className="text-2xl font-bold text-blue-300">
                {formatNumber(Math.round(annualTransactions / 1000000))} million{" "}
                <span className="text-xs text-green-400">/ year</span>
              </div>
              <div className="text-xs text-gray-400">
                Properties currently listed for sale
              </div>
            </div>

            <div>
              <h5 className="text-sm text-gray-300 mb-1">
                Current Price Trends
              </h5>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(realEstateData)
                  .slice(0, 4)
                  .map(([region, data]) => {
                    const currentPrice =
                      data.priceData[activeTimeframe][
                        data.priceData[activeTimeframe].length - 1
                      ].price;
                    const previousPrice =
                      data.priceData[activeTimeframe][0].price;
                    const change =
                      ((currentPrice - previousPrice) / previousPrice) * 100;

                    return (
                      <div key={region} className="flex items-center space-x-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: data.color }}
                        ></div>
                        <div className="text-xs text-gray-300">{region}</div>
                        <div
                          className={`text-xs ${
                            change >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {change >= 0 ? "↑" : "↓"}{" "}
                          {Math.abs(change).toFixed(1)}%
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

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

export default ContinentalRealEstateMap;