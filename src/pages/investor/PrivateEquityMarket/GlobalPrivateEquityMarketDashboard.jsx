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
  PieChart,
  Users,
  Briefcase,
  Target,
  Activity
} from "lucide-react";
import { Download, RefreshCw } from 'react-feather';

// Private Equity Market Visualization Component
const GlobalPrivateEquityMarketDashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('1Y');
  const [activeView, setActiveView] = useState('map');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [activeMetric, setActiveMetric] = useState('aum');
  
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
  
  // Private equity data by region
  const privateEquityData = {
    "North America": {
      code: "NA",
      borders: [
        [[49, -125], [25, -125], [25, -65], [49, -65]]
      ],
      aum: 2850000, // Assets Under Management in millions USD
      dealCount: 5420,
      avgDealSize: 185, // in millions USD
      irr: 12.8, // Internal Rate of Return percentage
      funds: 1250,
      dryPowder: 850000, // Uninvested capital in millions
      sectors: ["Technology", "Healthcare", "Financial Services", "Energy", "Consumer"],
      majorFunds: [
        { name: "Blackstone", location: [40.7, -74.0], aum: 731000, deals: 45 },
        { name: "KKR", location: [40.7, -74.0], aum: 429000, deals: 38 },
        { name: "Carlyle", location: [38.9, -77.0], aum: 376000, deals: 42 }
      ],
      priceData: {
      '1D': generatePriceData(24, 185),
      '1W': generatePriceData(7, 185),
      '1M': generatePriceData(30, 185),
      '1Y': generatePriceData(12, 185)
    },
      performanceData: generatePerformanceData(12.8, 0.15),
      color: "#8B5CF6" // Purple for PE
    },
    "Europe": {
      code: "EU",
      borders: [
        [[35, -10], [35, 40], [70, 40], [70, -10]]
      ],
      aum: 1650000,
      dealCount: 3280,
      avgDealSize: 125,
      irr: 10.5,
      funds: 890,
      dryPowder: 420000,
      sectors: ["Technology", "Healthcare", "Industrial", "Consumer", "Infrastructure"],
      majorFunds: [
        { name: "CVC Capital", location: [51.5, -0.1], aum: 125000, deals: 28 },
        { name: "Advent", location: [51.5, -0.1], aum: 54000, deals: 22 },
        { name: "EQT", location: [59.3, 18.1], aum: 71000, deals: 31 }
      ],
      performanceData: generatePerformanceData(10.5, 0.12),
      color: "#8B5CF6"
    },
    "Asia Pacific": {
      code: "AP",
      borders: [
        [[35, 70], [35, 145], [-10, 145], [-10, 90], [10, 70]]
      ],
      aum: 980000,
      dealCount: 2150,
      avgDealSize: 95,
      irr: 14.2,
      funds: 620,
      dryPowder: 280000,
      sectors: ["Technology", "Healthcare", "Consumer", "Financial Services", "Real Estate"],
      majorFunds: [
        { name: "Bain Capital Asia", location: [1.3, 103.8], aum: 28000, deals: 18 },
        { name: "TPG Asia", location: [1.3, 103.8], aum: 35000, deals: 24 },
        { name: "Hillhouse Capital", location: [22.3, 114.2], aum: 42000, deals: 15 }
      ],
      performanceData: generatePerformanceData(14.2, 0.18),
      color: "#8B5CF6"
    },
    "Latin America": {
      code: "LA",
      borders: [
        [[-4, -81], [-4, -35], [-55, -35], [-55, -81]]
      ],
      aum: 125000,
      dealCount: 380,
      avgDealSize: 45,
      irr: 15.8,
      funds: 85,
      dryPowder: 35000,
      sectors: ["Consumer", "Technology", "Healthcare", "Infrastructure", "Energy"],
      majorFunds: [
        { name: "Advent Latin America", location: [-23.5, -46.6], aum: 8500, deals: 12 },
        { name: "General Atlantic LatAm", location: [-23.5, -46.6], aum: 6200, deals: 8 },
        { name: "Warburg Pincus LatAm", location: [-34.6, -58.4], aum: 4800, deals: 6 }
      ],
      performanceData: generatePerformanceData(15.8, 0.22),
      color: "#8B5CF6"
    },
    "Middle East & Africa": {
      code: "MEA",
      borders: [
        [[35, -18], [35, 50], [-35, 50], [-35, -18]]
      ],
      aum: 95000,
      dealCount: 285,
      avgDealSize: 38,
      irr: 13.5,
      funds: 65,
      dryPowder: 28000,
      sectors: ["Energy", "Infrastructure", "Financial Services", "Consumer", "Healthcare"],
      majorFunds: [
        { name: "Abraaj (Legacy)", location: [25.2, 55.3], aum: 4500, deals: 8 },
        { name: "Actis", location: [-33.9, 18.4], aum: 8200, deals: 14 },
        { name: "Development Partners", location: [30.0, 31.2], aum: 3100, deals: 5 }
      ],
      performanceData: generatePerformanceData(13.5, 0.20),
      color: "#8B5CF6"
    }
  };

  function generatePriceData(points, basePrice) {
  const data = [];
  for (let i = 0; i < points; i++) {
    const variation = (Math.random() - 0.5) * 0.1; // ±10% variation
    data.push({
      date: i,
      price: basePrice * (1 + variation)
    });
  }
  return data;
}
  
  // Generate realistic performance data with trends and volatility
  function generatePerformanceData(baseIRR, volatilityFactor) {
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
      let irr = baseIRR;
      
      for (let i = 0; i < points; i++) {
        const cyclical = Math.sin((i / points) * cycle * Math.PI) * baseIRR * volatilityFactor * 0.1;
        const random = (Math.random() - 0.5) * baseIRR * volatilityFactor * 0.1;
        const trendComponent = (i / points) * trend * baseIRR;
        
        irr = baseIRR + cyclical + random + trendComponent;
        
        const dealVolume = Math.floor((Math.random() * 0.5 + 0.75) * 50); // Number of deals
        const fundingAmount = Math.floor(irr * dealVolume * 8.5); // Millions USD
        
        data.push({
          date: i,
          irr: Math.max(0, irr),
          dealVolume,
          fundingAmount,
          multiples: irr / baseIRR * 2.2, // Money multiple
          tvpi: irr / baseIRR * 2.1 // Total Value to Paid-In
        });
      }
      
      result[timeframe] = data;
    });
    
    return result;
  }
  
  // Global aggregation
  const getGlobalData = () => {
    const regions = Object.keys(privateEquityData);
    const globalPerformanceData = {};
    
    // Calculate global performance data
    Object.keys(privateEquityData[regions[0]].performanceData).forEach(timeframe => {
      const points = privateEquityData[regions[0]].performanceData[timeframe].length;
      const globalData = [];
      
      for (let i = 0; i < points; i++) {
        const globalPoint = {
          date: i,
          irr: 0,
          dealVolume: 0,
          fundingAmount: 0,
          multiples: 0,
          tvpi: 0
        };
        
        regions.forEach(region => {
          const regionData = privateEquityData[region].performanceData[timeframe][i];
          globalPoint.irr += regionData.irr;
          globalPoint.dealVolume += regionData.dealVolume;
          globalPoint.fundingAmount += regionData.fundingAmount;
          globalPoint.multiples += regionData.multiples;
          globalPoint.tvpi += regionData.tvpi;
        });
        
        // Calculate averages
        globalPoint.irr /= regions.length;
        globalPoint.multiples /= regions.length;
        globalPoint.tvpi /= regions.length;
        
        globalData.push(globalPoint);
      }
      
      globalPerformanceData[timeframe] = globalData;
    });
    
    const totalAUM = regions.reduce((sum, region) => 
      sum + privateEquityData[region].aum, 0);
      
    const totalDeals = regions.reduce((sum, region) => 
      sum + privateEquityData[region].dealCount, 0);
      
    const averageIRR = regions.reduce((sum, region) => 
      sum + privateEquityData[region].irr, 0) / regions.length;
      
    const totalDryPowder = regions.reduce((sum, region) => 
      sum + privateEquityData[region].dryPowder, 0);
      
    const allFunds = regions.flatMap(region => 
      privateEquityData[region].majorFunds.map(fund => ({
        ...fund,
        region
      }))
    );
    
    return {
      name: "Global",
      code: "GLOBAL",
      color: "#8B5CF6",
      aum: totalAUM,
      dealCount: totalDeals,
      irr: averageIRR,
      dryPowder: totalDryPowder,
      majorFunds: allFunds,
      performanceData: globalPerformanceData
    };
  };
  
  const globalData = getGlobalData();
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  // Format currency
  const formatCurrency = (num) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}T`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}B`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num * 1000000);
  };
  
  // Format percentage
  const formatPercent = (num) => {
    return `${num.toFixed(1)}%`;
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
      ? privateEquityData[region].performanceData[activeTimeframe]
      : globalData.performanceData[activeTimeframe];
      
    // Create scales based on active metric
    const x = d3.scaleLinear()
      .domain([0, chartData.length - 1])
      .range([0, innerWidth]);
      
    let y, yAxis, lineGenerator, areaGenerator;
    
    switch (activeMetric) {
      case 'irr':
        y = d3.scaleLinear()
          .domain([0, d3.max(chartData, d => d.irr) * 1.1])
          .range([innerHeight, 0]);
        yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `${d.toFixed(1)}%`);
        lineGenerator = d3.line()
          .x((d, i) => x(i))
          .y(d => y(d.irr))
          .curve(d3.curveMonotoneX);
        areaGenerator = d3.area()
          .x((d, i) => x(i))
          .y0(innerHeight)
          .y1(d => y(d.irr))
          .curve(d3.curveMonotoneX);
        break;
      case 'deals':
        y = d3.scaleLinear()
          .domain([0, d3.max(chartData, d => d.dealVolume) * 1.1])
          .range([innerHeight, 0]);
        yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `${d} deals`);
        lineGenerator = d3.line()
          .x((d, i) => x(i))
          .y(d => y(d.dealVolume))
          .curve(d3.curveMonotoneX);
        areaGenerator = d3.area()
          .x((d, i) => x(i))
          .y0(innerHeight)
          .y1(d => y(d.dealVolume))
          .curve(d3.curveMonotoneX);
        break;
      case 'funding':
        y = d3.scaleLinear()
          .domain([0, d3.max(chartData, d => d.fundingAmount) * 1.1])
          .range([innerHeight, 0]);
        yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `$${(d/1000).toFixed(0)}B`);
        lineGenerator = d3.line()
          .x((d, i) => x(i))
          .y(d => y(d.fundingAmount))
          .curve(d3.curveMonotoneX);
        areaGenerator = d3.area()
          .x((d, i) => x(i))
          .y0(innerHeight)
          .y1(d => y(d.fundingAmount))
          .curve(d3.curveMonotoneX);
        break;
      default:
        y = d3.scaleLinear()
          .domain([0, d3.max(chartData, d => d.multiples) * 1.1])
          .range([innerHeight, 0]);
        yAxis = d3.axisLeft(y).ticks(5).tickFormat(d => `${d.toFixed(1)}x`);
        lineGenerator = d3.line()
          .x((d, i) => x(i))
          .y(d => y(d.multiples))
          .curve(d3.curveMonotoneX);
        areaGenerator = d3.area()
          .x((d, i) => x(i))
          .y0(innerHeight)
          .y1(d => y(d.multiples))
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
      .attr("stop-color", "#8B5CF6")
      .attr("stop-opacity", 0.3);
      
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#8B5CF6")
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
      .attr("stroke", "#8B5CF6")
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
          case 'irr': return y(d.irr);
          case 'deals': return y(d.dealVolume);
          case 'funding': return y(d.fundingAmount);
          default: return y(d.multiples);
        }
      })
      .attr("r", 3)
      .attr("fill", "#8B5CF6")
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
            <div class="p-2 rounded-lg bg-gray-900/90 backdrop-blur-md border border-purple-500/30">
              <div class="text-purple-500 font-bold">${formatDate(activeTimeframe, i)}</div>
              <div class="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                <div class="text-xs text-gray-300">IRR:</div>
                <div class="text-xs text-purple-100">${formatPercent(item.irr)}</div>
                <div class="text-xs text-gray-300">Deals:</div>
                <div class="text-xs text-purple-100">${formatNumber(item.dealVolume)}</div>
                <div class="text-xs text-gray-300">Funding:</div>
                <div class="text-xs text-purple-100">$${(item.fundingAmount/1000).toFixed(1)}B</div>
                <div class="text-xs text-gray-300">Multiple:</div>
                <div class="text-xs text-purple-100">${item.multiples.toFixed(1)}x</div>
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
      .attr("fill", "#8B5CF6")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`${region || 'Global'} PE Performance - ${activeTimeframe} View`);
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
      .attr("class", "grid grid-cols-2 gap-2 p-2 bg-gray-900/50 backdrop-blur-md rounded-lg border border-purple-500/20");
      
    // AUM legend
    const aumItems = Object.entries(privateEquityData)
      .sort((a, b) => b[1].aum - a[1].aum)
      .map(([region, data]) => ({
        name: region,
        value: data.aum,
        color: data.color
      }));
      
    legendContainer.append("div")
      .attr("class", "col-span-2")
      .html(`<div class="text-xs font-bold text-purple-500 mb-1">Assets Under Management</div>`);
      
    aumItems.forEach(item => {
      legendContainer.append("div")
        .attr("class", "flex items-center space-x-1")
        .html(`
          <div class="w-3 h-3 rounded-full bg-purple-500"></div>
          <div class="text-xs text-gray-300">${item.name}</div>
        `);
        
      legendContainer.append("div")
        .attr("class", "text-right")
        .html(`<div class="text-xs text-purple-200">${formatCurrency(item.value)}</div>`);
    });
    
    // Add global total
    legendContainer.append("div")
      .attr("class", "col-span-1 mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-gray-300">Global Total:</div>`);
      
    legendContainer.append("div")
      .attr("class", "text-right mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-purple-300">${formatCurrency(globalData.aum)}</div>`);
      
    setIsLoading(false);
  }, []);
  
  // Region details component
  const RegionDetails = () => {
    if (!selectedRegion) return null;
    
    const regionData = privateEquityData[selectedRegion];
    return (
      <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-purple-500/20 p-3 mt-4">
        <h4 className="font-bold text-purple-500 mb-2">{selectedRegion} PE Market</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-300">Assets Under Management:</p>
            <p className="text-lg font-semibold text-purple-300">{formatCurrency(regionData.aum)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Average IRR:</p>
            <p className="text-lg font-semibold text-purple-300">{formatPercent(regionData.irr)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Active Deals:</p>
            <p className="text-lg font-semibold text-purple-300">{formatNumber(regionData.dealCount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Dry Powder:</p>
            <p className="text-lg font-semibold text-purple-300">{formatCurrency(regionData.dryPowder)}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-300 mb-1">Key Sectors:</p>
            <div className="flex flex-wrap gap-1">
              {regionData.sectors.slice(0, 5).map(sector => (
                <span key={sector} className="bg-purple-500/10 text-purple-200 text-xs px-2 py-1 rounded">
                  {sector}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-2 mt-1">
            <p className="text-sm text-gray-300 mb-1">Major Funds:</p>
            <div className="grid grid-cols-1 gap-2">
              {regionData.majorFunds.slice(0, 3).map(fund => (
                <div key={fund.name} className="bg-gray-800/50 rounded p-2">
                  <div className="font-semibold text-white text-sm">{fund.name}</div>
                  <div className="text-xs text-blue-200">{formatCurrency(fund.avgPrice)} avg</div>
                  <div className="text-xs text-gray-400">{formatNumber(fund.inventory)} listings</div>
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
   <div className="bg-gray-900/80 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-blue-500/20">
        <div className="flex items-center">
          <h3 className="text-xl font-bold text-purple-500">
            Global Private Equity Dashboard
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
                {Object.entries(privateEquityData).map(([region, data]) =>
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
                {Object.entries(privateEquityData).map(([region, data]) =>
                  data.majorFunds.map((fund, i) => (
                    <CircleMarker
                      key={`${region}-fund-${i}`}
                      center={fund.location} //  Use 'location' property
                      radius={Math.log(fund.aum / 10000) * 0.8} //  Use 'aum' for sizing
                      pathOptions={{
                        fillColor: "#8B5CF6", // Use purple for PE
                        fillOpacity: 0.8,
                        color: "#222",
                        weight: 1,
                      }}
                    >
                      <Tooltip>
                        <div className="p-1">
                          <div className="font-bold text-purple-500">
                            {fund.name}
                          </div>
                          <div className="text-sm">
                            AUM: {formatCurrency(fund.aum)}
                          </div>
                          <div className="text-sm">
                            Deals: {formatNumber(fund.deals)}
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
            <h4 className="text-purple-500 font-bold">
              Private Equity Market Overview
            </h4>
            <Search size={16} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="text-sm text-gray-300 mb-1">
                Global Assets Under Management
              </h5>
              <div className="text-2xl font-bold text-purple-300">
                {formatCurrency(globalData.aum)}{" "}
                <span className="text-xs text-green-400">total AUM</span>
              </div>
              <div className="text-xs text-gray-400">
                Based on latest Private Equity Index data
              </div>
            </div>

            <div>
              <h5 className="text-sm text-gray-300 mb-1">Active Deals</h5>
              <div className="text-2xl font-bold text-purple-300">
                {formatNumber(globalData.dealCount)}{" "}
                <span className="text-xs text-green-400">deals</span>
              </div>
              <div className="text-xs text-gray-400">
                Currently active investments
              </div>
            </div>

            <div>
              <h5 className="text-sm text-gray-300 mb-1">Current IRR Trends</h5>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(privateEquityData)
                  .slice(0, 4)
                  .map(([region, data]) => {
                    const currentIRR =
                      data.performanceData[activeTimeframe][
                        data.performanceData[activeTimeframe].length - 1
                      ].irr;
                    const previousIRR =
                      data.performanceData[activeTimeframe][0].irr;
                    const change = currentIRR - previousIRR;

                    return (
                      <div key={region} className="flex items-center space-x-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: data.color }}
                        ></div>
                        <div className="text-xs text-gray-300">
                          {region.slice(0, 8)}
                        </div>
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

export default GlobalPrivateEquityMarketDashboard;