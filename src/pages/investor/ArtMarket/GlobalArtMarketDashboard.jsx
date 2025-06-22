
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
  Palette,
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
  Crown,
  Star,
  Gem
} from "lucide-react";
import { Download, RefreshCw } from 'react-feather';

// Art & Collectibles Market Visualization Component
const GlobalArtMarketDashboard = () => {
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
            <RefreshCw size={16} className="text-purple-500" />
          </button>
        </div>
      </div>
    );
  };
  
  // Art & Collectibles data by region
  const artCollectiblesData = {
    "North America": {
      code: "NA",
      borders: [
        [[49, -125], [25, -125], [25, -65], [49, -65]]
      ],
      avgPrice: 850000,  // in USD
      inventory: 450000,  // number of artworks/collectibles for sale
      marketGrowth: 8.5, // percent annually
      categories: ["Contemporary Art", "Classic Cars", "Fine Wine", "Vintage Watches", "Comics"],
      majorCities: [
        { name: "New York", coordinates: [40.7, -74.0], avgPrice: 1500000, inventory: 85000, specialty: "Contemporary Art" },
        { name: "Los Angeles", coordinates: [34.0, -118.2], avgPrice: 920000, inventory: 42000, specialty: "Hollywood Memorabilia" },
        { name: "Chicago", coordinates: [41.9, -87.6], avgPrice: 650000, inventory: 28000, specialty: "Modern Art" }
      ],
      priceData: generatePriceData(850000, 0.12),
    },
    "South America": {
      code: "SA",
      borders: [
        [[-4, -81], [-4, -35], [-55, -35], [-55, -81]]
      ],
      avgPrice: 280000,
      inventory: 180000,
      marketGrowth: 12.3,
      categories: ["Pre-Columbian Art", "Modern Latin Art", "Silver Artifacts", "Gemstones", "Folk Art"],
      majorCities: [
        { name: "São Paulo", coordinates: [-23.5, -46.6], avgPrice: 420000, inventory: 35000, specialty: "Brazilian Modern Art" },
        { name: "Buenos Aires", coordinates: [-34.6, -58.4], avgPrice: 320000, inventory: 22000, specialty: "Tango Memorabilia" },
        { name: "Bogotá", coordinates: [4.7, -74.1], avgPrice: 180000, inventory: 15000, specialty: "Emeralds & Gold" }
      ],
      priceData: generatePriceData(280000, 0.15),
    },
    "Europe": {
      code: "EU",
      borders: [
        [[35, -10], [35, 40], [70, 40], [70, -10]]
      ],
      avgPrice: 1200000,
      inventory: 680000,
      marketGrowth: 6.2,
      categories: ["Old Masters", "Impressionist", "Antique Furniture", "Rare Books", "Classical Sculptures"],
      majorCities: [
        { name: "London", coordinates: [51.5, -0.1], avgPrice: 2100000, inventory: 120000, specialty: "Old Masters" },
        { name: "Paris", coordinates: [48.9, 2.3], avgPrice: 1800000, inventory: 95000, specialty: "Impressionist Art" },
        { name: "Zurich", coordinates: [47.4, 8.5], avgPrice: 1650000, inventory: 45000, specialty: "Private Collections" }
      ],
      priceData: generatePriceData(1200000, 0.08),
    },
    "Asia": {
      code: "AS",
      borders: [
        [[35, 40], [35, 145], [0, 145], [0, 90], [10, 40]]
      ],
      avgPrice: 950000,
      inventory: 820000,
      marketGrowth: 18.2,
      categories: ["Chinese Antiquities", "Japanese Art", "Jade & Porcelain", "Calligraphy", "Buddha Sculptures"],
      majorCities: [
        { name: "Hong Kong", coordinates: [22.3, 114.2], avgPrice: 1800000, inventory: 95000, specialty: "Chinese Antiquities" },
        { name: "Tokyo", coordinates: [35.7, 139.8], avgPrice: 1200000, inventory: 75000, specialty: "Japanese Art" },
        { name: "Singapore", coordinates: [1.3, 103.8], avgPrice: 1400000, inventory: 42000, specialty: "Southeast Asian Art" }
      ],
      priceData: generatePriceData(950000, 0.16),
    },
    "Africa": {
      code: "AF",
      borders: [
        [[35, -18], [35, 50], [-35, 50], [-35, -18]]
      ],
      avgPrice: 180000,
      inventory: 120000,
      marketGrowth: 15.8,
      categories: ["African Tribal Art", "Contemporary African Art", "Precious Stones", "Masks & Sculptures", "Textiles"],
      majorCities: [
        { name: "Cape Town", coordinates: [-33.9, 18.4], avgPrice: 280000, inventory: 18000, specialty: "Contemporary African Art" },
        { name: "Lagos", coordinates: [6.5, 3.4], avgPrice: 220000, inventory: 25000, specialty: "Yoruba Art" },
        { name: "Marrakech", coordinates: [31.6, -8.0], avgPrice: 150000, inventory: 15000, specialty: "Islamic Art" }
      ],
      priceData: generatePriceData(180000, 0.18),
    },
    "Oceania": {
      code: "OC",
      borders: [
        [[-5, 120], [-5, 180], [-45, 180], [-45, 110], [-15, 110]]
      ],
      avgPrice: 420000,
      inventory: 85000,
      marketGrowth: 9.7,
      categories: ["Aboriginal Art", "Pacific Island Art", "Contemporary Australian Art", "Opals", "Tribal Artifacts"],
      majorCities: [
        { name: "Sydney", coordinates: [-33.9, 151.2], avgPrice: 650000, inventory: 32000, specialty: "Aboriginal Art" },
        { name: "Melbourne", coordinates: [-37.8, 145.0], avgPrice: 580000, inventory: 28000, specialty: "Contemporary Art" },
        { name: "Auckland", coordinates: [-36.8, 174.8], avgPrice: 380000, inventory: 15000, specialty: "Maori Art" }
      ],
      priceData: generatePriceData(420000, 0.11),
    }
  };
  
  // Generate realistic price data with trends and volatility
  function generatePriceData(basePrice, volatilityFactor) {
    const trendFactors = {
      '1D': { points: 24, trend: 0.002, cycle: 6 },
      '1W': { points: 7, trend: 0.015, cycle: 3 },
      '1M': { points: 30, trend: 0.035, cycle: 8 },
      '1Y': { points: 12, trend: 0.12, cycle: 4 }
    };
    
    const result = {};
    
    Object.keys(trendFactors).forEach(timeframe => {
      const { points, trend, cycle } = trendFactors[timeframe];
      const data = [];
      let price = basePrice;
      
      // Art market usually trends upward with high volatility
      const trendDirection = Math.random() > 0.2 ? 1 : -1;
      
      for (let i = 0; i < points; i++) {
        // Add cyclical component (seasonal effects)
        const cyclical = Math.sin((i / points) * cycle * Math.PI) * basePrice * volatilityFactor * 0.15;
        
        // Add random walk (high volatility in art market)
        const random = (Math.random() - 0.5) * basePrice * volatilityFactor * 0.2;
        
        // Add trend
        const trendComponent = (i / points) * trend * basePrice * trendDirection;
        
        price = basePrice + cyclical + random + trendComponent;
        
        // Calculate daily high/low/open/close with higher volatility
        const dailyVolatility = basePrice * volatilityFactor * 0.03;
        const open = price - (Math.random() - 0.5) * dailyVolatility;
        const close = price;
        const high = Math.max(open, close) + Math.random() * dailyVolatility;
        const low = Math.min(open, close) - Math.random() * dailyVolatility;
        const volume = Math.floor((Math.random() * 0.4 + 0.6) * 500); // Lower transaction volume than real estate
        
        data.push({
          date: i,
          price,
          open,
          high,
          low,
          close,
          volume // number of sales/auctions
        });
      }
      
      result[timeframe] = data;
    });
    
    return result;
  }
  
  // Global averages
  const getGlobalData = () => {
    const regions = Object.keys(artCollectiblesData);
    const globalPriceData = {};
    
    // Calculate global price data
    Object.keys(artCollectiblesData[regions[0]].priceData).forEach(timeframe => {
      const points = artCollectiblesData[regions[0]].priceData[timeframe].length;
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
          const regionData = artCollectiblesData[region].priceData[timeframe][i];
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
      sum + artCollectiblesData[region].inventory, 0);
      
    const averageMarketGrowth = regions.reduce((sum, region) => 
      sum + artCollectiblesData[region].marketGrowth, 0) / regions.length;
      
    const allCities = regions.flatMap(region => 
      artCollectiblesData[region].majorCities.map(city => ({
        ...city,
        region
      }))
    );
    
    return {
      name: "Global",
      code: "GLOBAL",
      color: "#8B5CF6",
      avgPrice: regions.reduce((sum, region) => sum + artCollectiblesData[region].avgPrice, 0) / regions.length,
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
      ? artCollectiblesData[region].priceData[activeTimeframe]
      : globalData.priceData[activeTimeframe];
      
    // Create scales
    const x = d3.scaleLinear()
      .domain([0, chartData.length - 1])
      .range([0, innerWidth]);
      
    const y = d3.scaleLinear()
      .domain([
        d3.min(chartData, d => d.low) * 0.995,
        d3.max(chartData, d => d.high) * 1.005
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
          ? "rgba(139, 92, 246, 0.3)" // Purple for art market
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
      .attr("stroke", d => d.open > d.close ? "#EF4444" : "#8B5CF6")
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
      .attr("fill", d => d.open > d.close ? "#EF4444" : "#8B5CF6");
      
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
            <div class="p-2 rounded-lg bg-gray-900/90 backdrop-blur-md border border-purple-500/30">
              <div class="text-purple-500 font-bold">${formatDate(activeTimeframe, i)}</div>
              <div class="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                <div class="text-xs text-gray-300">Open:</div>
                <div class="text-xs text-purple-100">${formatCurrency(item.open)}</div>
                <div class="text-xs text-gray-300">High:</div>
                <div class="text-xs text-purple-100">${formatCurrency(item.high)}</div>
                <div class="text-xs text-gray-300">Low:</div>
                <div class="text-xs text-purple-100">${formatCurrency(item.low)}</div>
                <div class="text-xs text-gray-300">Close:</div>
                <div class="text-xs text-purple-100">${formatCurrency(item.close)}</div>
                <div class="text-xs text-gray-300">Volume:</div>
                <div class="text-xs text-purple-100">${formatNumber(item.volume)} sales</div>
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
          .attr("stroke", "#8B5CF6")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");
          
        // Horizontal line
        chartGroup.append("line")
          .attr("class", "crosshair-y")
          .attr("x1", 0)
          .attr("x2", innerWidth)
          .attr("y1", y(item.close))
          .attr("y2", y(item.close))
          .attr("stroke", "#8B5CF6")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");
          
        // Price label
        chartGroup.append("text")
          .attr("class", "crosshair-label")
          .attr("x", innerWidth + 5)
          .attr("y", y(item.close) + 4)
          .attr("fill", "#8B5CF6")
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
      .attr("fill", "#8B5CF6")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`${region || 'Global'} Art & Collectibles Prices - ${activeTimeframe} View`);
      
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
      .text("Average Price (USD)");
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
      .attr("class", "grid grid-cols-2 gap-2 p-2 bg-gray-900/50 backdrop-blur-md rounded-lg border border-purple-500/20");
      
    // Price legend
    const priceItems = Object.entries(artCollectiblesData)
      .sort((a, b) => b[1].avgPrice - a[1].avgPrice)
      .map(([region, data]) => ({
        name: region,
        value: data.avgPrice,
        color: data.color
      }));
      
    legendContainer.append("div")
      .attr("class", "col-span-2")
      .html(`<div class="text-xs font-bold text-purple-500 mb-1">Average Art & Collectibles Prices (USD)</div>`);
      
    priceItems.forEach(item => {
      legendContainer.append("div")
        .attr("class", "flex items-center space-x-1")
        .html(`
          <div class="w-3 h-3 rounded-full" style="background-color: ${item.color}"></div>
          <div class="text-xs text-gray-300">${item.name}</div>
        `);
        
      legendContainer.append("div")
        .attr("class", "text-right")
        .html(`<div class="text-xs text-purple-200">${formatCurrency(item.value)}</div>`);
    });
    
    // Add global average
    legendContainer.append("div")
      .attr("class", "col-span-1 mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-gray-300">Global Average:</div>`);
      
    legendContainer.append("div")
      .attr("class", "text-right mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-purple-300">${formatCurrency(globalData.avgPrice)}</div>`);
      
    setIsLoading(false);
  }, []);
  
  
  // Region details component
  const RegionDetails = () => {
    if (!selectedRegion) return null;
    
    const regionData = artCollectiblesData[selectedRegion];
    return (
      <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-purple-500/20 p-3 mt-4">
        <h4 className="font-bold text-purple-500 mb-2 flex items-center">
          <Palette className="mr-2" size={16} />
          {selectedRegion} Art Market Details
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-300">Average Artwork Price:</p>
            <p className="text-lg font-semibold text-purple-300">{formatCurrency(regionData.avgPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Annual Growth Rate:</p>
            <p className="text-lg font-semibold text-purple-300">{regionData.marketGrowth}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Available Inventory:</p>
            <p className="text-lg font-semibold text-purple-300">{formatNumber(regionData.inventory)} pieces</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-300 mb-1">Popular Categories:</p>
            <div className="flex flex-wrap gap-1">
              {regionData.categories.map(category => (
                <span key={category} className="bg-purple-500/10 text-purple-200 text-xs px-2 py-1 rounded">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-2 mt-1">
            <p className="text-sm text-gray-300 mb-1">Major Art Centers:</p>
            <div className="grid grid-cols-2 gap-2">
              {regionData.majorCities.slice(0, 4).map(city => (
                <div key={city.name} className="bg-gray-800/50 rounded p-2">
                  <div className="font-semibold text-white text-sm">{city.name}</div>
                  <div className="text-xs text-purple-200">{formatCurrency(city.avgPrice)} avg</div>
                  <div className="text-xs text-gray-400">{formatNumber(city.inventory)} pieces</div>
                  <div className="text-xs text-purple-300">{city.specialty}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const annualSales = Math.round(globalData.inventory * 0.25); // Assuming 25% inventory turnover annually
  
  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-purple-500/20">
        <div className="flex items-center">
          <Palette className="mr-2 text-purple-500" size={20} />
          <h3 className="text-xl font-bold text-purple-500">
            Global Art & Collectibles Market
          </h3>
          {selectedRegion && (
            <span className="ml-2 text-sm bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
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
                  ? "bg-purple-500/20 text-purple-500"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
              onClick={() => setActiveTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center p-2 px-4 border-b border-purple-500/10">
        <div className="text-sm text-gray-400">
          {hoveredRegion
            ? `Exploring: ${hoveredRegion} Art Market`
            : "Hover over regions to explore art markets"}
        </div>
        <div className="flex space-x-2">
          <button
            className={`p-1 rounded flex items-center space-x-1 ${
              activeView === "map" ? "text-purple-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("map")}
            title="Map View"
          >
            <Globe size={16} />
            <span className="text-xs">Map</span>
          </button>
          <button
            className={`p-1 rounded flex items-center space-x-1 ${
              activeView === "chart" ? "text-purple-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("chart")}
            title="Chart View"
          >
            <LineChart size={16} />
            <span className="text-xs">Chart</span>
          </button>
          {selectedRegion && (
            <button
              className="px-2 py-1 text-xs rounded bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 flex items-center"
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
                {Object.entries(artCollectiblesData).map(([region, data]) =>
                  data.borders.map((border, i) => (
                    <Polygon
                      key={`${region}-border-${i}`}
                      positions={border}
                      pathOptions={{
                        fillColor: data.color,
                        fillOpacity: selectedRegion === region ? 0 : 0,
                        weight: 0,
                        color: data.color,
                        opacity: 0,
                      }}
                      eventHandlers={{
                        mouseover: (e) => {
                          setHoveredRegion(region);
                          e.target.setStyle({
                          });
                        },
                        mouseout: (e) => {
                          setHoveredRegion(null);
                          e.target.setStyle({
                          });
                        },
                        click: () => {
                          handleRegionSelect(region);
                        },
                      }}
                    />
                  ))
                )}

                {/* Add major art centers */}
                {Object.entries(artCollectiblesData).map(([region, data]) =>
                  data.majorCities.map((city, i) => (
                    <CircleMarker
                      key={`${region}-city-${i}`}
                      center={city.coordinates}
                      radius={Math.log(city.inventory) * 0.4}
                    >
                      <Tooltip>
                        <div className="p-2">
                          <div className="font-bold text-purple-600 flex items-center">
                            <Crown size={14} className="mr-1" />
                            {city.name}
                          </div>
                          <div className="text-sm">
                            Avg Price: {formatCurrency(city.avgPrice)}
                          </div>
                          <div className="text-sm">
                            Inventory: {formatNumber(city.inventory)} pieces
                          </div>
                          <div className="text-sm">Specialty: {city.specialty}</div>
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}
        </div>

        <div className="bg-gray-900/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-purple-500 font-bold flex items-center">
              <Gem className="mr-2" size={16} />
              Art Market Overview
            </h4>
            <Search size={16} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="text-sm text-gray-300 mb-1 flex items-center">
                <Star className="mr-1" size={12} />
                Global Art Inventory
              </h5>
              <div className="text-2xl font-bold text-purple-300">
                {formatNumber(Math.round(globalData.inventory / 1000))}K pieces{" "}
                <span className="text-xs text-green-400">available</span>
              </div>
              <div className="text-xs text-gray-400">
                Based on major auction houses & galleries
              </div>
            </div>

            <div>
              <h5 className="text-sm text-gray-300 mb-1 flex items-center">
                <TrendingUp className="mr-1" size={12} />
                Annual Sales Volume
              </h5>
              <div className="text-2xl font-bold text-purple-300">
                {formatNumber(Math.round(annualSales / 1000))}K sales{" "}
                <span className="text-xs text-green-400">/ year</span>
              </div>
              <div className="text-xs text-gray-400">
                Estimated market transactions annually
              </div>
            </div>

            <div>
              <h5 className="text-sm text-gray-300 mb-1">
                Regional Performance
              </h5>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(artCollectiblesData)
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
                      <div key={region} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: data.color }}
                          ></div>
                          <div className="text-xs text-gray-300">{region}</div>
                        </div>
                        <div
                          className={`text-xs font-semibold ${
                            change >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {change >= 0 ? "↗" : "↘"}{" "}
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

export default GlobalArtMarketDashboard;