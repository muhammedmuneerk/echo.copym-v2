import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building, HomeIcon, TrendingUp, DollarSign, PieChart } from "lucide-react";


// Real Estate Portfolio Allocation Component
const RealEstatePortfolioAllocation = () => {
  const [allocation, setAllocation] = useState({
    residential: 40,
    commercial: 20,
    reits: 15,
    landDevelopment: 15,
    crowdfunding: 10
  });
  
  const [riskLevel, setRiskLevel] = useState(3); // 1-5 scale
  
  const handleAllocationChange = (type, value) => {
    // Calculate remaining allocation space
    const currentTotal = Object.values(allocation).reduce((sum, val) => sum + val, 0);
    const currentTypeValue = allocation[type];
    const remaining = 100 - currentTotal + currentTypeValue;
    
    // Make sure new value doesn't exceed 100% total
    const newValue = Math.min(value, remaining);
    
    setAllocation({
      ...allocation,
      [type]: newValue
    });
    
    // Recalculate risk based on allocation
    calculateRiskMetrics();
  };
  
  // Calculate risk metrics based on allocation
  const calculateRiskMetrics = () => {
    // Risk factors for each type (scale of 1-10)
    const riskFactors = {
      residential: 3,
      commercial: 5,
      reits: 4,
      landDevelopment: 7,
      crowdfunding: 8
    };
    
    // Calculate weighted risk
    let weightedRisk = 0;
    Object.keys(allocation).forEach(type => {
      weightedRisk += (allocation[type] / 100) * riskFactors[type];
    });
    
    // Scale to 1-5
    setRiskLevel(Math.max(1, Math.min(5, Math.round(weightedRisk / 2))));
  };
  
  // Potential returns based on allocation and risk
  const getProjectedReturns = () => {
    const baseReturns = {
      residential: { low: 3, avg: 5, high: 8 },
      commercial: { low: 2, avg: 7, high: 12 },
      reits: { low: 4, avg: 6, high: 9 },
      landDevelopment: { low: -3, avg: 10, high: 25 },
      crowdfunding: { low: -5, avg: 8, high: 18 }
    };
    
    let lowReturn = 0;
    let avgReturn = 0;
    let highReturn = 0;
    
    Object.keys(allocation).forEach(type => {
      lowReturn += (allocation[type] / 100) * baseReturns[type].low;
      avgReturn += (allocation[type] / 100) * baseReturns[type].avg;
      highReturn += (allocation[type] / 100) * baseReturns[type].high;
    });
    
    return {
      low: lowReturn.toFixed(1),
      avg: avgReturn.toFixed(1),
      high: highReturn.toFixed(1)
    };
  };
  
  const returns = getProjectedReturns();
  
  // Chart data for allocation
  const pieChartData = [
    { name: "Residential", value: allocation.residential, color: "#4F46E5" }, // Indigo
    { name: "Commercial", value: allocation.commercial, color: "#0369A1" }, // Blue
    { name: "REITs", value: allocation.reits, color: "#047857" }, // Green
    { name: "Land Development", value: allocation.landDevelopment, color: "#B45309" }, // Amber
    { name: "Crowdfunding", value: allocation.crowdfunding, color: "#9333EA" } // Purple
  ];
  
  // Generate segments for pie chart
  const generatePieChart = () => {
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    
    let startAngle = 0;
    const segments = [];
    
    pieChartData.forEach((segment, index) => {
      if (segment.value === 0) return;
      
      const angle = (segment.value / 100) * 360;
      const endAngle = startAngle + angle;
      
      // Calculate coordinates
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      // Flag for large arc
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      // Path for segment
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`
      ].join(' ');
      
      // Slightly pull out the segment for hover effect
      const midRad = (startRad + endRad) / 2;
      const pullOut = 0;
      
      segments.push(
        <path
          key={`segment-${index}`}
          d={pathData}
          fill={segment.color}
          stroke="#333"
          strokeWidth="1"
          transform={`translate(${Math.cos(midRad) * pullOut} ${Math.sin(midRad) * pullOut})`}
          className="transition-all hover:brightness-110 hover:translate-x-1 hover:translate-y-1 hover:drop-shadow-lg"
        >
          <title>{segment.name}: {segment.value}%</title>
        </path>
      );
      
      // Add labels
      if (segment.value >= 5) {
        const labelRad = (startRad + endRad) / 2;
        const labelDist = radius * 0.7;
        const labelX = centerX + labelDist * Math.cos(labelRad);
        const labelY = centerY + labelDist * Math.sin(labelRad);
        
        segments.push(
          <text
            key={`label-${index}`}
            x={labelX}
            y={labelY}
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fontWeight="bold"
          >
            {segment.value}%
          </text>
        );
      }
      
      startAngle = endAngle;
    });
    
    return segments;
  };
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900/60 backdrop-blur-xl border border-blue-500/20 rounded-xl overflow-hidden shadow-xl">
      <div className="p-4 border-b border-blue-500/20 bg-white/2">
        <h3 className="text-xl font-bold text-blue-500">Real Estate Portfolio Allocation</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">Customize your real estate investment strategy</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div>
          {/* Allocation Controls */}
          <div className="space-y-4">
            {Object.entries({
              residential: "Residential Properties",
              commercial: "Commercial Properties",
              reits: "Real Estate Investment Trusts",
              landDevelopment: "Land Development",
              crowdfunding: "Real Estate Crowdfunding"
            }).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{label}</span>
                  <span className="text-blue-500">{allocation[key]}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={allocation[key]}
                    onChange={(e) => handleAllocationChange(key, parseInt(e.target.value))}
                    className="w-full accent-blue-500 bg-gray-200 dark:bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Risk Metrics */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-blue-500/10">
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-2">Risk Analysis</h4>
            
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Risk Level</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level} 
                    className={`w-5 h-5 rounded-full ${
                      level <= riskLevel 
                        ? level < 3 
                          ? 'bg-green-500' 
                          : level === 3 
                            ? 'bg-blue-500' 
                            : 'bg-red-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Conservative Projection</span>
                <span className={`text-sm font-medium ${returns.low < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {returns.low > 0 ? '+' : ''}{returns.low}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Average Projection</span>
                <span className={`text-sm font-medium ${returns.avg < 0 ? 'text-red-500' : 'text-blue-500'}`}>
                  {returns.avg > 0 ? '+' : ''}{returns.avg}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Optimistic Projection</span>
                <span className={`text-sm font-medium ${returns.high < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {returns.high > 0 ? '+' : ''}{returns.high}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          {/* Pie Chart Visualization */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" width="200" height="200">
              {generatePieChart()}
            </svg>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
              {pieChartData.map((item, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div 
                    className="w-3 h-3 mr-2 rounded-sm" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Performance Metrics */}
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-blue-500/10">
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-2">Asset Class Characteristics</h4>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-gray-500 dark:text-gray-400">Asset Type</div>
              <div className="text-gray-500 dark:text-gray-400">Liquidity</div>
              <div className="text-gray-500 dark:text-gray-400">Volatility</div>
              
              <div className="text-gray-700 dark:text-gray-300">Residential</div>
              <div className="text-blue-500">●●○○○</div>
              <div className="text-green-500">●●○○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Commercial</div>
              <div className="text-blue-500">●○○○○</div>
              <div className="text-yellow-500">●●●○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">REITs</div>
              <div className="text-blue-500">●●●●●</div>
              <div className="text-yellow-500">●●●○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Land Dev.</div>
              <div className="text-blue-500">●○○○○</div>
              <div className="text-red-500">●●●●○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Crowdfunding</div>
              <div className="text-blue-500">●●○○○</div>
              <div className="text-red-500">●●●●○</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-blue-500/20 bg-white/5 dark:bg-gray-900/30 flex justify-between">
        <button className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-lg px-4 py-2 rounded-full border border-blue-500/30 hover:bg-gray-200 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300 transition-all hover:text-black dark:hover:text-white text-sm">
          Reset Allocation
        </button>
        <button className="bg-blue-500/10 backdrop-blur-lg px-4 py-2 rounded-full border border-blue-500/50 hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 transition-all hover:text-blue-900 dark:hover:text-blue-300 text-sm">
          Save Portfolio Strategy
        </button>
      </div>
    </div>
  );
};

export default RealEstatePortfolioAllocation;