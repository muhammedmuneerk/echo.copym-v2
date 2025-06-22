import React, { useState, useEffect } from "react";
import { Leaf, TreePine, Factory, Wind, Sun } from "lucide-react";

// Carbon Credits Portfolio Allocation Component
const CarbonCreditsPortfolioAllocation = () => {
  const [allocation, setAllocation] = useState({
    forestry: 35,
    renewable: 25,
    industrial: 15,
    agriculture: 15,
    technology: 10
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
  };
  
  // Calculate risk metrics based on allocation
  const calculateRiskMetrics = () => {
    // Risk factors for each type (scale of 1-10)
    const riskFactors = {
      forestry: 4,
      renewable: 3,
      industrial: 6,
      agriculture: 5,
      technology: 8
    };
    
    // Calculate weighted risk
    let weightedRisk = 0;
    Object.keys(allocation).forEach(type => {
      weightedRisk += (allocation[type] / 100) * riskFactors[type];
    });
    
    // Scale to 1-5
    setRiskLevel(Math.max(1, Math.min(5, Math.round(weightedRisk / 2))));
  };
  
  useEffect(() => {
    calculateRiskMetrics();
  }, [allocation]);
  
  // Potential returns based on allocation and risk
  const getProjectedReturns = () => {
    const baseReturns = {
      forestry: { low: 5, avg: 12, high: 25 },
      renewable: { low: 8, avg: 15, high: 30 },
      industrial: { low: -5, avg: 18, high: 45 },
      agriculture: { low: 3, avg: 14, high: 28 },
      technology: { low: -10, avg: 25, high: 60 }
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
    { name: "Forestry & REDD+", value: allocation.forestry, color: "#22C55E" }, // Green
    { name: "Renewable Energy", value: allocation.renewable, color: "#3B82F6" }, // Blue
    { name: "Industrial Capture", value: allocation.industrial, color: "#F59E0B" }, // Amber
    { name: "Agriculture & Soil", value: allocation.agriculture, color: "#84CC16" }, // Lime
    { name: "Technology & DAC", value: allocation.technology, color: "#8B5CF6" } // Purple
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
  
  const resetAllocation = () => {
    setAllocation({
      forestry: 35,
      renewable: 25,
      industrial: 15,
      agriculture: 15,
      technology: 10
    });
  };
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900/60 backdrop-blur-xl border border-green-500/20 rounded-xl overflow-hidden shadow-xl">
      <div className="p-4 border-b border-green-500/20 bg-white/2">
        <h3 className="text-xl font-bold text-green-500 flex items-center gap-2">
          <Leaf className="w-6 h-6" />
          Carbon Credits Portfolio Allocation
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">Optimize your environmental impact investment strategy</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div>
          {/* Allocation Controls */}
          <div className="space-y-4">
            {Object.entries({
              forestry: "Forestry & REDD+ Projects",
              renewable: "Renewable Energy Credits",
              industrial: "Industrial Carbon Capture",
              agriculture: "Agriculture & Soil Carbon",
              technology: "Technology & Direct Air Capture"
            }).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{label}</span>
                  <span className="text-green-500">{allocation[key]}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={allocation[key]}
                    onChange={(e) => handleAllocationChange(key, parseInt(e.target.value))}
                    className="w-full accent-green-500 bg-gray-200 dark:bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Risk Metrics */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-green-500/10">
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

          {/* Environmental Impact */}
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-500/20">
            <h4 className="text-green-700 dark:text-green-300 font-medium mb-2 flex items-center gap-2">
              <TreePine className="w-4 h-4" />
              Estimated Annual Impact
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-600 dark:text-green-400 block">CO₂ Offset</span>
                <span className="text-lg font-bold text-green-700 dark:text-green-300">
                  {(Object.values(allocation).reduce((sum, val) => sum + val, 0) * 0.5).toFixed(1)} tonnes
                </span>
              </div>
              <div>
                <span className="text-green-600 dark:text-green-400 block">Forest Area</span>
                <span className="text-lg font-bold text-green-700 dark:text-green-300">
                  {(allocation.forestry * 0.1).toFixed(1)} acres
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
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 mt-4">
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
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-green-500/10">
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-2">Credit Type Characteristics</h4>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-gray-500 dark:text-gray-400">Credit Type</div>
              <div className="text-gray-500 dark:text-gray-400">Verification</div>
              <div className="text-gray-500 dark:text-gray-400">Volatility</div>
              
              <div className="text-gray-700 dark:text-gray-300">Forestry</div>
              <div className="text-green-500">●●●●○</div>
              <div className="text-green-500">●●○○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Renewable</div>
              <div className="text-green-500">●●●●●</div>
              <div className="text-green-500">●●○○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Industrial</div>
              <div className="text-green-500">●●●○○</div>
              <div className="text-yellow-500">●●●○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Agriculture</div>
              <div className="text-green-500">●●●○○</div>
              <div className="text-yellow-500">●●●○○</div>
              
              <div className="text-gray-700 dark:text-gray-300">Technology</div>
              <div className="text-blue-500">●●○○○</div>
              <div className="text-red-500">●●●●○</div>
            </div>
          </div>
          
          
        </div>
      </div>
      
      <div className="p-4 border-t border-green-500/20 bg-white/5 dark:bg-gray-900/30 flex justify-between">
        <button 
          onClick={resetAllocation}
          className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-lg px-4 py-2 rounded-full border border-green-500/30 hover:bg-gray-200 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300 transition-all hover:text-black dark:hover:text-white text-sm"
        >
          Reset Allocation
        </button>
        <button className="bg-green-500/10 backdrop-blur-lg px-4 py-2 rounded-full border border-green-500/50 hover:bg-green-500/20 text-green-700 dark:text-green-400 transition-all hover:text-green-900 dark:hover:text-green-300 text-sm">
          Save Climate Strategy
        </button>
      </div>
    </div>
  );
};

export default CarbonCreditsPortfolioAllocation;