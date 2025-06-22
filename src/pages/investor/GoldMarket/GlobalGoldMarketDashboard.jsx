import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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
  Fingerprint,
  Lock,
  TrendingUp,
  BarChart,
  LineChart,
  DollarSign,
  PieChart
} from "lucide-react";
import { Download, RefreshCw } from 'react-feather';
import { goldData } from '../assetsMarketData';



// Market Data Visualization Component
const GlobalGoldMarketDashboard = () => {
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
            <RefreshCw size={16} className="text-yellow-500" />
          </button>
        </div>
      </div>
    );
  };
  
  // Global averages
  const getGlobalData = () => {
    const regions = Object.keys(goldData);
    const globalPriceData = {};
    
    // Calculate global price data
    Object.keys(goldData[regions[0]].priceData).forEach(timeframe => {
      const points = goldData[regions[0]].priceData[timeframe].length;
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
          const regionData = goldData[region].priceData[timeframe][i];
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
    
    const totalReserves = regions.reduce((sum, region) => 
      sum + goldData[region].reserves, 0);
      
    const totalProduction = regions.reduce((sum, region) => 
      sum + goldData[region].production, 0);
      
    const allMines = regions.flatMap(region => 
      goldData[region].majorMines.map(mine => ({
        ...mine,
        region
      }))
    );
    
    return {
      name: "Global",
      code: "GLOBAL",
      color: "#FFD700",
      reserves: totalReserves,
      production: totalProduction,
      majorMines: allMines,
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
      minimumFractionDigits: 2
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
      ? goldData[region].priceData[activeTimeframe]
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
          ? "rgba(50, 205, 50, 0.3)"
          : "rgba(255, 69, 0, 0.3)";
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
      .attr("stroke", d => d.open > d.close ? "#FF4500" : "#32CD32")
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
      .attr("fill", d => d.open > d.close ? "#FF4500" : "#32CD32");
      
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
            <div class="p-2 rounded-lg bg-gray-900/90 backdrop-blur-md border border-yellow-500/30">
              <div class="text-yellow-500 font-bold">${formatDate(activeTimeframe, i)}</div>
              <div class="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                <div class="text-xs text-gray-300">Open:</div>
                <div class="text-xs text-yellow-100">${formatCurrency(item.open)}</div>
                <div class="text-xs text-gray-300">High:</div>
                <div class="text-xs text-yellow-100">${formatCurrency(item.high)}</div>
                <div class="text-xs text-gray-300">Low:</div>
                <div class="text-xs text-yellow-100">${formatCurrency(item.low)}</div>
                <div class="text-xs text-gray-300">Close:</div>
                <div class="text-xs text-yellow-100">${formatCurrency(item.close)}</div>
                <div class="text-xs text-gray-300">Volume:</div>
                <div class="text-xs text-yellow-100">${formatNumber(item.volume.toFixed(1))} tons</div>
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
          .attr("stroke", "#FFD700")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");
          
        // Horizontal line
        chartGroup.append("line")
          .attr("class", "crosshair-y")
          .attr("x1", 0)
          .attr("x2", innerWidth)
          .attr("y1", y(item.close))
          .attr("y2", y(item.close))
          .attr("stroke", "#FFD700")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");
          
        // Price label
        chartGroup.append("text")
          .attr("class", "crosshair-label")
          .attr("x", innerWidth + 5)
          .attr("y", y(item.close) + 4)
          .attr("fill", "#FFD700")
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
      .attr("fill", "#FFD700")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`${region || 'Global'} Gold Price - ${activeTimeframe} View`);
      
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
      .text("Gold Price (USD/oz)");
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
      .attr("class", "grid grid-cols-2 gap-2 p-2 bg-gray-900/50 backdrop-blur-md rounded-lg border border-yellow-500/20");
      
    // Production legend
    const productionItems = Object.entries(goldData)
      .sort((a, b) => b[1].production - a[1].production)
      .map(([region, data]) => ({
        name: region,
        value: data.production,
        color: data.color
      }));
      
    legendContainer.append("div")
      .attr("class", "col-span-2")
      .html(`<div class="text-xs font-bold text-yellow-500 mb-1">Annual Gold Production (tons)</div>`);
      
    productionItems.forEach(item => {
      legendContainer.append("div")
        .attr("class", "flex items-center space-x-1")
        .html(`
          <div class="w-3 h-3 rounded-full" style="background-color: ${item.color}"></div>
          <div class="text-xs text-gray-300">${item.name}</div>
        `);
        
      legendContainer.append("div")
        .attr("class", "text-right")
        .html(`<div class="text-xs text-yellow-200">${formatNumber(item.value)}</div>`);
    });
    
    // Add global total
    legendContainer.append("div")
      .attr("class", "col-span-1 mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-gray-300">Global Total:</div>`);
      
    legendContainer.append("div")
      .attr("class", "text-right mt-1 border-t border-gray-600 pt-1")
      .html(`<div class="text-xs font-semibold text-yellow-300">${formatNumber(globalData.production)}</div>`);
      
    setIsLoading(false);
  }, []);
  
  // Region details component
  const RegionDetails = () => {
    if (!selectedRegion) return null;
    
    const regionData = goldData[selectedRegion];
    return (
      <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-yellow-500/20 p-3 mt-4">
        <h4 className="font-bold text-yellow-500 mb-2">{selectedRegion} Details</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-300">Gold Reserves:</p>
            <p className="text-lg font-semibold text-yellow-300">{formatNumber(regionData.reserves)} tons</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Annual Production:</p>
            <p className="text-lg font-semibold text-yellow-300">{formatNumber(regionData.production)} tons</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-300 mb-1">Major Producers:</p>
            <div className="flex flex-wrap gap-1">
              {regionData.countries.map(country => (
                <span key={country} className="bg-yellow-500/10 text-yellow-200 text-xs px-2 py-1 rounded">
                  {country}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-2 mt-1">
            <p className="text-sm text-gray-300 mb-1">Top Mines:</p>
            <div className="grid grid-cols-2 gap-2">
              {regionData.majorMines.slice(0, 4).map(mine => (
                <div key={mine.name} className="bg-gray-800/50 rounded p-2">
                  <div className="font-semibold text-white text-sm">{mine.name}</div>
                  <div className="text-xs text-yellow-200">{mine.production} tons/year</div>
                  <div className="text-xs text-gray-400">({mine.coordinates[0].toFixed(1)}°, {mine.coordinates[1].toFixed(1)}°)</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-yellow-500/20 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-yellow-500/20">
        <div className="flex items-center">
          <h3 className="text-xl font-bold text-yellow-500">
            Global Gold Data
          </h3>
          {selectedRegion && (
            <span className="ml-2 text-sm bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
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
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
              onClick={() => setActiveTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center p-2 px-4 border-b border-yellow-500/10">
        <div className="text-sm text-gray-400">
          {hoveredRegion
            ? `Exploring: ${hoveredRegion}`
            : "Hover over regions to explore"}
        </div>
        <div className="flex space-x-2">
          <button
            className={`p-1 rounded flex items-center space-x-1 ${
              activeView === "map" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("map")}
            title="Map View"
          >
            <Globe size={16} />
            <span className="text-xs">Map</span>
          </button>
          <button
            className={`p-1 rounded flex items-center space-x-1 ${
              activeView === "chart" ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => setActiveView("chart")}
            title="Chart View"
          >
            <LineChart size={16} />
            <span className="text-xs">Chart</span>
          </button>
          {selectedRegion && (
            <button
              className="px-2 py-1 text-xs rounded bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 flex items-center"
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
                {Object.entries(goldData).map(([region, data]) =>
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

                {/* Add gold mines */}
                {Object.entries(goldData).map(([region, data]) =>
                  data.majorMines.map((mine, i) => (
                    <CircleMarker
                      key={`${region}-mine-${i}`}
                      center={mine.coordinates}
                      radius={Math.log(mine.production) * 1.2}
                      pathOptions={
                        {
                          // fillColor: '#FFD700',
                          // fillOpacity: 0.8,
                          // color: '#222',
                          // weight: 1
                        }
                      }
                    >
                      <Tooltip>
                        <div className="p-1">
                          <div className="font-bold text-yellow-500">
                            {mine.name}
                          </div>
                          <div className="text-sm">
                            Production: {mine.production} tons/year
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            </div>
          )}
        </div>

        <div className="bg-gray-900/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-yellow-500 font-bold">Gold Market Overview</h4>
            <Search size={16} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="text-sm text-gray-300 mb-1">
                Global Gold Production
              </h5>
              <div className="text-2xl font-bold text-yellow-300">
                {formatNumber(globalData.production)} tons{" "}
                <span className="text-xs text-green-400">/ year</span>
              </div>
              <div className="text-xs text-gray-400">
                Based on latest World Gold Council data
              </div>
            </div>

            <div>
              <h5 className="text-sm text-gray-300 mb-1">Known Reserves</h5>
              <div className="text-2xl font-bold text-yellow-300">
                {formatNumber(globalData.reserves)} tons
              </div>
              <div className="text-xs text-gray-400">
                Economically viable at current prices
              </div>
            </div>

            <div>
              <h5 className="text-sm text-gray-300 mb-1">
                Current Price Trends
              </h5>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(goldData)
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

export default GlobalGoldMarketDashboard ;