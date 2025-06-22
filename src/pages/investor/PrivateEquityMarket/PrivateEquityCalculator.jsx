import React, { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Target,
  PieChart,
  BarChart3,
  Users,
} from "lucide-react";

const PrivateEquityCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(1000000);
  const [holdingPeriod, setHoldingPeriod] = useState(5);
  const [targetIRR, setTargetIRR] = useState(15);
  const [managementFee, setManagementFee] = useState(2);
  const [carriedInterest, setCarriedInterest] = useState(20);
  const [fundType, setFundType] = useState('Growth');
  const [exitMultiple, setExitMultiple] = useState(3);
  const [drawdownSchedule, setDrawdownSchedule] = useState(2); // Years to fully deploy capital
  
  // Calculate investment projections
  const calculateProjections = () => {
    const results = [];
    let cumulativeInvestment = 0;
    let cumulativeManagementFees = 0;
    let cumulativeReturns = 0;
    
    // Fund type modifiers
    const typeModifiers = {
      'Buyout': { riskMultiplier: 0.9, feeMultiplier: 1.0 },
      'Growth': { riskMultiplier: 1.0, feeMultiplier: 1.0 },
      'Venture': { riskMultiplier: 1.5, feeMultiplier: 1.2 },
      'Distressed': { riskMultiplier: 1.3, feeMultiplier: 1.1 },
      'Real Estate PE': { riskMultiplier: 0.8, feeMultiplier: 0.9 }
    };
    
    const modifier = typeModifiers[fundType] || typeModifiers['Growth'];
    const adjustedIRR = targetIRR * modifier.riskMultiplier;
    const adjustedManagementFee = managementFee * modifier.feeMultiplier;
    
    // Calculate year-by-year projections
    for (let i = 1; i <= holdingPeriod; i++) {
      // Capital deployment (front-loaded based on drawdown schedule)
      const deploymentRate = Math.min(i / drawdownSchedule, 1);
      const currentInvestment = initialInvestment * deploymentRate;
      const yearlyInvestment = i === 1 ? currentInvestment : 
        (currentInvestment - cumulativeInvestment);
      
      cumulativeInvestment = currentInvestment;
      
      // Management fees (calculated on committed capital, not deployed)
      const yearlyManagementFee = (initialInvestment * adjustedManagementFee / 100);
      cumulativeManagementFees += yearlyManagementFee;
      
      // Calculate portfolio value growth
      const portfolioValue = cumulativeInvestment * Math.pow(1 + (adjustedIRR / 100), i);
      
      // Calculate distributions (typically back-loaded)
      let distributions = 0;
      if (i >= holdingPeriod - 1) {
        // Major distributions in final years
        const totalReturn = portfolioValue;
        const profit = Math.max(0, totalReturn - cumulativeInvestment);
        const carriedInterestAmount = profit * (carriedInterest / 100);
        distributions = totalReturn - carriedInterestAmount;
        cumulativeReturns = distributions;
      }
      
      results.push({
        year: i,
        yearlyInvestment: yearlyInvestment,
        cumulativeInvestment: cumulativeInvestment,
        yearlyManagementFee: yearlyManagementFee,
        cumulativeManagementFees: cumulativeManagementFees,
        portfolioValue: portfolioValue,
        distributions: distributions,
        cumulativeReturns: cumulativeReturns,
        netReturn: cumulativeReturns - cumulativeInvestment - cumulativeManagementFees
      });
    }
    
    return results;
  };
  
  const projections = calculateProjections();
  const finalProjection = projections[projections.length - 1];
  const totalInvested = finalProjection.cumulativeInvestment + finalProjection.cumulativeManagementFees;
  const totalReturns = finalProjection.cumulativeReturns;
  const netProfit = finalProjection.netReturn;
  const actualIRR = totalReturns > 0 ? 
    (Math.pow(totalReturns / totalInvested, 1 / holdingPeriod) - 1) * 100 : 0;
  const totalMultiple = totalReturns / totalInvested;
  
  // Generate chart data for visualization
  const generateChartData = () => {
    const chartData = [];
    
    // Initial value
    chartData.push({
      year: 0,
      invested: 0,
      portfolioValue: 0,
      distributions: 0
    });
    
    // Calculate for each year
    projections.forEach((projection, i) => {
      chartData.push({
        year: projection.year,
        invested: projection.cumulativeInvestment + projection.cumulativeManagementFees,
        portfolioValue: projection.portfolioValue,
        distributions: projection.cumulativeReturns
      });
    });
    
    return chartData;
  };
  
  const chartData = generateChartData();
  
  // Generate the bar chart for the visualization
  const generateBarChart = () => {
    const maxValue = Math.max(...chartData.map(d => Math.max(d.invested, d.portfolioValue, d.distributions))) * 1.1;
    const chartWidth = 300;
    const chartHeight = 150;
    const barWidth = (chartWidth - 40) / chartData.length;
    const barSpacing = barWidth * 0.1;
    
    return (
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
        {/* Axes */}
        <line 
          x1="40" 
          y1={chartHeight - 20} 
          x2={chartWidth - 10} 
          y2={chartHeight - 20} 
          stroke="#555" 
          strokeWidth="1" 
        />
        
        <line 
          x1="40" 
          y1="10" 
          x2="40" 
          y2={chartHeight - 20} 
          stroke="#555" 
          strokeWidth="1" 
        />
        
        {/* Y axis labels */}
        <text 
          x="35" 
          y="15" 
          textAnchor="end" 
          fill="#999" 
          fontSize="8"
        >
          {formatCurrency(maxValue)}
        </text>
        
        <text 
          x="35" 
          y={chartHeight - 25} 
          textAnchor="end" 
          fill="#999" 
          fontSize="8"
        >
          $0
        </text>
        
        {/* X axis labels */}
        {chartData.map((d, i) => (
          <text 
            key={`x-label-${i}`}
            x={40 + i * barWidth + barWidth / 2} 
            y={chartHeight - 8} 
            textAnchor="middle" 
            fill="#999" 
            fontSize="7"
          >
            Y{d.year}
          </text>
        ))}
        
        {/* Bars */}
        {chartData.map((d, i) => {
          const investedHeight = ((chartHeight - 30) * d.invested) / maxValue;
          const portfolioHeight = ((chartHeight - 30) * d.portfolioValue) / maxValue;
          const distributionsHeight = ((chartHeight - 30) * d.distributions) / maxValue;
          
          return (
            <g key={`bar-${i}`}>
              {/* Invested capital */}
              <rect 
                x={40 + i * barWidth + barSpacing} 
                y={chartHeight - 20 - investedHeight} 
                width={(barWidth - barSpacing * 2) / 3} 
                height={investedHeight} 
                fill="#FF6B6B" 
                opacity="0.7" 
              />
              
              {/* Portfolio value */}
              <rect 
                x={40 + i * barWidth + barSpacing + (barWidth - barSpacing * 2) / 3} 
                y={chartHeight - 20 - portfolioHeight} 
                width={(barWidth - barSpacing * 2) / 3} 
                height={portfolioHeight} 
                fill="#4ECDC4" 
                opacity="0.7" 
              />
              
              {/* Distributions */}
              <rect 
                x={40 + i * barWidth + barSpacing + 2 * (barWidth - barSpacing * 2) / 3} 
                y={chartHeight - 20 - distributionsHeight} 
                width={(barWidth - barSpacing * 2) / 3} 
                height={distributionsHeight} 
                fill="#45B7D1" 
                opacity="0.7" 
              />
            </g>
          );
        })}
        
        {/* Title */}
        <text 
          x={chartWidth / 2} 
          y="10" 
          textAnchor="middle" 
          fill="#45B7D1" 
          fontSize="9" 
          fontWeight="bold"
        >
          Private Equity Investment Progression
        </text>
      </svg>
    );
  };
  
  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };
  
  return (
    <div className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-purple-500/20 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-purple-500">Private Equity Investment Calculator</h3>
          <p className="text-gray-400 text-sm mt-1">Model PE fund performance with IRR, fees, and distributions</p>
        </div>
        <div className="rounded-full bg-purple-500/20 p-2">
          <TrendingUp size={20} className="text-purple-500" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          {/* Initial Investment */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Initial Investment</label>
              <span className="text-purple-500 font-medium">{formatCurrency(initialInvestment)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="10000000"
              step="100000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(parseInt(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Holding Period */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Holding Period</label>
              <span className="text-purple-500 font-medium">{holdingPeriod} years</span>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(parseInt(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Target IRR */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Target IRR</label>
              <span className="text-purple-500 font-medium">{targetIRR}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={targetIRR}
              onChange={(e) => setTargetIRR(parseFloat(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Management Fee */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Management Fee</label>
              <span className="text-purple-500 font-medium">{managementFee}% annually</span>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={managementFee}
              onChange={(e) => setManagementFee(parseFloat(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Carried Interest */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Carried Interest</label>
              <span className="text-purple-500 font-medium">{carriedInterest}% of profits</span>
            </div>
            <input
              type="range"
              min="15"
              max="25"
              step="1"
              value={carriedInterest}
              onChange={(e) => setCarriedInterest(parseFloat(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Drawdown Schedule */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Capital Deployment Period</label>
              <span className="text-purple-500 font-medium">{drawdownSchedule} years</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              step="0.5"
              value={drawdownSchedule}
              onChange={(e) => setDrawdownSchedule(parseFloat(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Exit Multiple */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Target Exit Multiple</label>
              <span className="text-purple-500 font-medium">{exitMultiple}x</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="5"
              step="0.1"
              value={exitMultiple}
              onChange={(e) => setExitMultiple(parseFloat(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Fund Type Selection */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Fund Type</label>
            <select
              value={fundType}
              onChange={(e) => setFundType(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
            >
              <option value="Buyout">Buyout</option>
              <option value="Growth">Growth Equity</option>
              <option value="Venture">Venture Capital</option>
              <option value="Distressed">Distressed/Turnaround</option>
              <option value="Real Estate PE">Real Estate PE</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Results Summary */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10">
            <h4 className="text-purple-500 font-medium mb-3">Investment Returns</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Invested:</span>
                <span className="text-white">{formatCurrency(totalInvested)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Returns:</span>
                <span className="text-green-500 font-medium">{formatCurrency(totalReturns)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Net Profit:</span>
                <span className="text-green-500 font-medium">{formatCurrency(netProfit)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Actual IRR:</span>
                <span className="text-green-400">
                  {formatPercentage(actualIRR)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Multiple:</span>
                <span className="text-blue-400">
                  {totalMultiple.toFixed(2)}x
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Management Fees:</span>
                <span className="text-red-400">
                  {formatCurrency(finalProjection.cumulativeManagementFees)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Carried Interest:</span>
                <span className="text-red-400">
                  {formatCurrency(Math.max(0, (totalReturns - totalInvested) * (carriedInterest / 100)))}
                </span>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10">
            {generateBarChart()}
            
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#FF6B6B] opacity-70 rounded-sm"></div>
                <span className="text-xs text-gray-400">Invested</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#4ECDC4] opacity-70 rounded-sm"></div>
                <span className="text-xs text-gray-400">Portfolio</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#45B7D1] opacity-70 rounded-sm"></div>
                <span className="text-xs text-gray-400">Distributions</span>
              </div>
            </div>
          </div>
          
          {/* Key Insights */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10">
            <h4 className="text-gray-300 font-medium text-sm mb-2">Key Insights</h4>
            
            <ul className="space-y-1 text-xs text-gray-400">
              <li className="flex items-start gap-1">
                <Target size={12} className="text-purple-500 mt-0.5" />
                <span>PE funds typically target 15-25% IRR with 3-5x return multiples over 5-7 years.</span>
              </li>
              <li className="flex items-start gap-1">
                <Users size={12} className="text-purple-500 mt-0.5" />
                <span>Management fees (2%) and carried interest (20%) are standard industry terms.</span>
              </li>
              <li className="flex items-start gap-1">
                <PieChart size={12} className="text-purple-500 mt-0.5" />
                <span>Capital is typically deployed over 2-3 years, with exits concentrated in years 4-6.</span>
              </li>
              <li className="flex items-start gap-1">
                <BarChart3 size={12} className="text-purple-500 mt-0.5" />
                <span>Different fund types have varying risk profiles and return expectations.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateEquityCalculator;