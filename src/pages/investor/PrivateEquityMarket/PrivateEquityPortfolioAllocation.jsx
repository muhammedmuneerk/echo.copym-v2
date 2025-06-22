import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, TrendingUp, DollarSign, PieChart, Users, Briefcase } from "lucide-react";

// Private Equity Portfolio Allocation Component
const PrivateEquityPortfolioAllocation = () => {
  const [allocation, setAllocation] = useState({
    buyout: 35,
    growth: 25,
    venture: 20,
    distressed: 10,
    secondaries: 10
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
      buyout: 4,
      growth: 6,
      venture: 9,
      distressed: 8,
      secondaries: 3
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
      buyout: { low: 8, avg: 12, high: 18 },
      growth: { low: 10, avg: 15, high: 25 },
      venture: { low: -20, avg: 18, high: 45 },
      distressed: { low: -10, avg: 16, high: 35 },
      secondaries: { low: 6, avg: 10, high: 15 }
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
    { name: "Buyout", value: allocation.buyout, color: "#1E40AF" }, // Blue
    { name: "Growth", value: allocation.growth, color: "#059669" }, // Green
    { name: "Venture Capital", value: allocation.venture, color: "#DC2626" }, // Red
    { name: "Distressed", value: allocation.distressed, color: "#B45309" }, // Amber
    { name: "Secondaries", value: allocation.secondaries, color: "#7C3AED" } // Purple
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
  
  // Reset allocation to default values
  const resetAllocation = () => {
    setAllocation({
      buyout: 35,
      growth: 25,
      venture: 20,
      distressed: 10,
      secondaries: 10
    });
  };
  
  // Calculate total allocation to show remaining
  const totalAllocation = Object.values(allocation).reduce((sum, val) => sum + val, 0);
  const remainingAllocation = 100 - totalAllocation;
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900/60 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden shadow-xl">
      <div className="p-4 border-b border-purple-500/20 bg-white/2">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-purple-500" />
          <h3 className="text-xl font-bold text-purple-500">Private Equity Portfolio Allocation</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">Optimize your private equity investment strategy</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div>
          {/* Allocation Controls */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Allocated: {totalAllocation}%
              </span>
              {remainingAllocation > 0 && (
                <span className="text-sm text-orange-500">
                  Remaining: {remainingAllocation}%
                </span>
              )}
            </div>
            
            {Object.entries({
              buyout: "Buyout Funds",
              growth: "Growth Equity",
              venture: "Venture Capital",
              distressed: "Distressed/Special Situations",
              secondaries: "Secondary Market"
            }).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{label}</span>
                  <span className="text-purple-500 font-medium">{allocation[key]}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={allocation[key]}
                    onChange={(e) => handleAllocationChange(key, parseInt(e.target.value))}
                    className="w-full accent-purple-500 bg-gray-200 dark:bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Risk Metrics */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-purple-500/10">
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Risk & Return Analysis
            </h4>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">Portfolio Risk Level</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level} 
                    className={`w-5 h-5 rounded-full ${
                      level <= riskLevel 
                        ? level < 3 
                          ? 'bg-green-500' 
                          : level === 3 
                            ? 'bg-purple-500' 
                            : 'bg-red-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Conservative IRR</span>
                <span className={`text-sm font-medium ${returns.low < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {returns.low > 0 ? '+' : ''}{returns.low}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Expected IRR</span>
                <span className={`text-sm font-medium ${returns.avg < 0 ? 'text-red-500' : 'text-purple-500'}`}>
                  {returns.avg > 0 ? '+' : ''}{returns.avg}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Optimistic IRR</span>
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
            <div className="relative">
              <svg viewBox="0 0 200 200" width="200" height="200">
                {generatePieChart()}
              </svg>
              {totalAllocation === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <PieChart className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-1 gap-2 mt-4 w-full">
              {pieChartData.map((item, index) => (
                <div key={`legend-${index}`} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 mr-2 rounded-sm" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Strategy Characteristics */}
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-purple-500/10">
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Strategy Characteristics
            </h4>
            
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-gray-500 dark:text-gray-400 font-medium">Strategy</div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">Risk</div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">Hold Period</div>
              <div className="text-gray-500 dark:text-gray-400 font-medium">Liquidity</div>
              
              <div className="text-gray-700 dark:text-gray-300">Buyout</div>
              <div className="text-yellow-500">●●●○○</div>
              <div className="text-blue-500">3-7 years</div>
              <div className="text-red-500">●○○○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Growth</div>
              <div className="text-yellow-500">●●●●○</div>
              <div className="text-blue-500">3-5 years</div>
              <div className="text-red-500">●○○○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Venture</div>
              <div className="text-red-500">●●●●●</div>
              <div className="text-blue-500">7-10 years</div>
              <div className="text-red-500">●○○○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Distressed</div>
              <div className="text-red-500">●●●●○</div>
              <div className="text-blue-500">2-5 years</div>
              <div className="text-red-500">●○○○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Secondaries</div>
              <div className="text-green-500">●●○○○</div>
              <div className="text-blue-500">2-4 years</div>
              <div className="text-yellow-500">●●○○○</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-indigo-500/20 bg-white/5 dark:bg-gray-900/30 flex justify-between">
        <button 
          onClick={resetAllocation}
          className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-lg px-4 py-2 rounded-full border border-indigo-500/30 hover:bg-gray-200 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300 transition-all hover:text-black dark:hover:text-white text-sm"
        >
          Reset Allocation
        </button>
        <button className="bg-indigo-500/10 backdrop-blur-lg px-4 py-2 rounded-full border border-indigo-500/50 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 transition-all hover:text-indigo-900 dark:hover:text-indigo-300 text-sm">
          Save Portfolio Strategy
        </button>
      </div>
    </div>
  );
};

export default PrivateEquityPortfolioAllocation;