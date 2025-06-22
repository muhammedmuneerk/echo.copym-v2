import React, { useState } from "react";
import {
  Leaf,
  TrendingUp,
  Globe,
  Shield,
  DollarSign,
  Zap,
} from "lucide-react";

const CarbonCreditsCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [years, setYears] = useState(10);
  const [annualPriceGrowth, setAnnualPriceGrowth] = useState(12);
  const [creditPrice, setCreditPrice] = useState(25);
  const [portfolioType, setPortfolioType] = useState('Mixed');
  const [riskTolerance, setRiskTolerance] = useState('Medium');
  const [reinvestmentRate, setReinvestmentRate] = useState(50);
  const [managementFee, setManagementFee] = useState(1.5);
  
  // Calculate investment projections
  const calculateProjections = () => {
    const results = [];
    let currentPortfolioValue = initialInvestment;
    let totalCreditsOwned = initialInvestment / creditPrice;
    let totalFeesPaid = 0;
    let totalReinvested = 0;
    let cumulativeCO2Offset = 0;
    
    // Apply different growth rates based on portfolio type and risk tolerance
    const portfolioModifier = 
      portfolioType === 'Forestry' ? 1.1 : 
      portfolioType === 'Renewable Energy' ? 0.9 : 
      portfolioType === 'Technology' ? 1.4 : 
      portfolioType === 'Agriculture' ? 1.2 : 1.0; // Mixed
    
    const riskModifier = 
      riskTolerance === 'Conservative' ? 0.7 : 
      riskTolerance === 'Aggressive' ? 1.5 : 1.0; // Medium
    
    const effectiveGrowthRate = annualPriceGrowth * portfolioModifier * riskModifier;
    
    // Calculate yearly growth and returns
    for (let i = 1; i <= years; i++) {
      // Price appreciation with volatility
      const volatilityFactor = 1 + (Math.sin(i * 0.5) * 0.1 * riskModifier); // Simulate market volatility
      const newCreditPrice = creditPrice * Math.pow(1 + (effectiveGrowthRate / 100), i) * volatilityFactor;
      
      // Portfolio value growth
      currentPortfolioValue = totalCreditsOwned * newCreditPrice;
      
      // Annual management fees
      const annualFee = currentPortfolioValue * (managementFee / 100);
      totalFeesPaid += annualFee;
      currentPortfolioValue -= annualFee;
      totalCreditsOwned = currentPortfolioValue / newCreditPrice;
      
      // Reinvestment opportunity (new credits purchased)
      const reinvestmentAmount = (currentPortfolioValue * (reinvestmentRate / 100)) / 100; // Small percentage for realistic reinvestment
      const newCredits = reinvestmentAmount / newCreditPrice;
      totalCreditsOwned += newCredits;
      totalReinvested += reinvestmentAmount;
      currentPortfolioValue += reinvestmentAmount;
      
      // Calculate CO2 offset (1 credit = 1 ton CO2)
      const annualCO2Offset = totalCreditsOwned;
      cumulativeCO2Offset += annualCO2Offset;
      
      results.push({
        year: i,
        portfolioValue: currentPortfolioValue,
        creditPrice: newCreditPrice,
        creditsOwned: totalCreditsOwned,
        annualFee: annualFee,
        totalFeesPaid: totalFeesPaid,
        totalReinvested: totalReinvested,
        annualCO2Offset: annualCO2Offset,
        cumulativeCO2Offset: cumulativeCO2Offset,
        totalReturn: ((currentPortfolioValue - initialInvestment - totalReinvested) / initialInvestment) * 100
      });
    }
    
    return results;
  };
  
  const projections = calculateProjections();
  const finalPortfolioValue = projections.length > 0 ? projections[projections.length - 1].portfolioValue : 0;
  const finalCreditsOwned = projections.length > 0 ? projections[projections.length - 1].creditsOwned : 0;
  const totalReturn = projections.length > 0 ? projections[projections.length - 1].totalReturn : 0;
  const totalCO2Offset = projections.length > 0 ? projections[projections.length - 1].cumulativeCO2Offset : 0;
  const totalFeesPaid = projections.length > 0 ? projections[projections.length - 1].totalFeesPaid : 0;
  
  // Generate chart data for visualization
  const generateChartData = () => {
    const chartData = [];
    
    // Initial value
    chartData.push({
      year: 0,
      portfolioValue: initialInvestment,
      co2Offset: 0,
      creditPrice: creditPrice
    });
    
    // Calculate for each year
    projections.forEach((projection, i) => {
      chartData.push({
        year: i + 1,
        portfolioValue: projection.portfolioValue,
        co2Offset: projection.cumulativeCO2Offset,
        creditPrice: projection.creditPrice
      });
    });
    
    return chartData;
  };
  
  const chartData = generateChartData();
  
  // Generate the dual-axis chart for portfolio value and CO2 offset
  const generateDualChart = () => {
    const maxPortfolioValue = Math.max(...chartData.map(d => d.portfolioValue)) * 1.1;
    const maxCO2Offset = Math.max(...chartData.map(d => d.co2Offset)) * 1.1;
    const chartWidth = 320;
    const chartHeight = 160;
    const barWidth = (chartWidth - 60) / chartData.length;
    
    return (
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
        {/* Axes */}
        <line x1="50" y1={chartHeight - 25} x2={chartWidth - 10} y2={chartHeight - 25} stroke="#555" strokeWidth="1" />
        <line x1="50" y1="15" x2="50" y2={chartHeight - 25} stroke="#555" strokeWidth="1" />
        <line x1={chartWidth - 50} y1="15" x2={chartWidth - 50} y2={chartHeight - 25} stroke="#555" strokeWidth="1" />
        
        {/* Left Y axis labels (Portfolio Value) */}
        <text x="45" y="20" textAnchor="end" fill="#4CAF50" fontSize="8">
          {formatCurrency(maxPortfolioValue)}
        </text>
        <text x="45" y={chartHeight - 30} textAnchor="end" fill="#4CAF50" fontSize="8">$0</text>
        
        {/* Right Y axis labels (CO2 Offset) */}
        <text x={chartWidth - 45} y="20" textAnchor="start" fill="#2196F3" fontSize="8">
          {Math.round(maxCO2Offset).toLocaleString()}t
        </text>
        <text x={chartWidth - 45} y={chartHeight - 30} textAnchor="start" fill="#2196F3" fontSize="8">0t</text>
        
        {/* X axis labels */}
        {chartData.map((d, i) => (
          <text key={`x-label-${i}`} x={50 + i * barWidth + barWidth / 2} y={chartHeight - 10} textAnchor="middle" fill="#999" fontSize="7">
            {d.year}
          </text>
        ))}
        
        {/* Portfolio value bars */}
        {chartData.map((d, i) => {
          const barHeight = ((chartHeight - 40) * d.portfolioValue) / maxPortfolioValue;
          return (
            <rect 
              key={`portfolio-bar-${i}`}
              x={50 + i * barWidth + 2} 
              y={chartHeight - 25 - barHeight} 
              width={barWidth - 8} 
              height={barHeight} 
              fill="#4CAF50" 
              opacity="0.7" 
            />
          );
        })}
        
        {/* CO2 offset line */}
        <polyline
          points={chartData.map((d, i) => 
            `${50 + i * barWidth + barWidth / 2},${chartHeight - 25 - ((chartHeight - 40) * d.co2Offset) / maxCO2Offset}`
          ).join(' ')}
          fill="none"
          stroke="#2196F3"
          strokeWidth="2"
          opacity="0.8"
        />
        
        {/* CO2 offset points */}
        {chartData.map((d, i) => (
          <circle
            key={`co2-point-${i}`}
            cx={50 + i * barWidth + barWidth / 2}
            cy={chartHeight - 25 - ((chartHeight - 40) * d.co2Offset) / maxCO2Offset}
            r="2"
            fill="#2196F3"
          />
        ))}
        
        {/* Title */}
        <text x={chartWidth / 2} y="12" textAnchor="middle" fill="#4CAF50" fontSize="10" fontWeight="bold">
          Portfolio Value & CO₂ Impact
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
  
  // Format large numbers
  const formatNumber = (value) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return Math.round(value).toLocaleString();
  };
  
  return (
    <div className="bg-gray-900/70 backdrop-blur-xl border border-green-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-green-500/20 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-green-500">Carbon Credits Investment Calculator</h3>
          <p className="text-gray-400 text-sm mt-1">Project returns while offsetting your carbon footprint</p>
        </div>
        <div className="rounded-full bg-green-500/20 p-2">
          <Leaf size={20} className="text-green-500" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          {/* Initial Investment */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Initial Investment</label>
              <span className="text-green-500 font-medium">{formatCurrency(initialInvestment)}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(parseInt(e.target.value))}
              className="w-full accent-green-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
            />
          </div>
          
          {/* Credit Price */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Current Credit Price</label>
              <span className="text-green-500 font-medium">${creditPrice}/ton CO₂</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={creditPrice}
              onChange={(e) => setCreditPrice(parseInt(e.target.value))}
              className="w-full accent-green-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
            />
          </div>
          
          {/* Investment Period */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Investment Period</label>
              <span className="text-green-500 font-medium">{years} years</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full accent-green-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
            />
          </div>
          
          {/* Annual Price Growth */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Annual Price Growth</label>
              <span className="text-green-500 font-medium">{annualPriceGrowth}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={annualPriceGrowth}
              onChange={(e) => setAnnualPriceGrowth(parseInt(e.target.value))}
              className="w-full accent-green-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
            />
          </div>
          
          {/* Reinvestment Rate */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Annual Reinvestment</label>
              <span className="text-green-500 font-medium">{reinvestmentRate}% of gains</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={reinvestmentRate}
              onChange={(e) => setReinvestmentRate(parseInt(e.target.value))}
              className="w-full accent-green-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
            />
          </div>
          
          {/* Management Fee */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Annual Management Fee</label>
              <span className="text-green-500 font-medium">{managementFee}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.25"
              value={managementFee}
              onChange={(e) => setManagementFee(parseFloat(e.target.value))}
              className="w-full accent-green-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500"
            />
          </div>
          
          {/* Portfolio Type Selection */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Portfolio Type</label>
            <select
              value={portfolioType}
              onChange={(e) => setPortfolioType(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500/50 outline-none transition-all"
            >
              <option value="Mixed">Mixed Portfolio</option>
              <option value="Forestry">Forestry & Reforestation</option>
              <option value="Renewable Energy">Renewable Energy</option>
              <option value="Technology">Technology & Innovation</option>
              <option value="Agriculture">Sustainable Agriculture</option>
            </select>
          </div>
          
          {/* Risk Tolerance Selection */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Risk Tolerance</label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500/50 outline-none transition-all"
            >
              <option value="Conservative">Conservative</option>
              <option value="Medium">Medium</option>
              <option value="Aggressive">Aggressive</option>
            </select>
          </div>
          {/* Environmental Impact */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/10">
            <h4 className="text-green-500 font-medium text-sm mb-3">Environmental Impact</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">{formatNumber(totalCO2Offset)}</div>
                <div className="text-xs text-gray-400">Tons CO₂ Offset</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">{Math.round(totalCO2Offset * 2.47).toLocaleString()}</div>
                <div className="text-xs text-gray-400">Cars Off Road*</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">{Math.round(totalCO2Offset * 16.5).toLocaleString()}</div>
                <div className="text-xs text-gray-400">Trees Planted*</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400">{Math.round(totalCO2Offset * 1.2).toLocaleString()}</div>
                <div className="text-xs text-gray-400">Homes Powered*</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">*Equivalent annual impact</div>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Results Summary */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/10">
            <h4 className="text-green-500 font-medium mb-3">Investment Projection</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Initial Investment:</span>
                <span className="text-white">{formatCurrency(initialInvestment)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Final Portfolio Value:</span>
                <span className="text-green-500 font-medium">{formatCurrency(finalPortfolioValue)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Return:</span>
                <span className="text-green-400">
                  {totalReturn.toFixed(1)}%
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Credits Owned:</span>
                <span className="text-blue-400">
                  {formatNumber(finalCreditsOwned)} tons
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total CO₂ Offset:</span>
                <span className="text-green-400">
                  {formatNumber(totalCO2Offset)} tons
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Management Fees:</span>
                <span className="text-red-400">
                  {formatCurrency(totalFeesPaid)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/10">
            {generateDualChart()}
            
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#4CAF50] opacity-70 rounded-sm"></div>
                <span className="text-xs text-gray-400">Portfolio Value</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#2196F3] rounded-full"></div>
                <span className="text-xs text-gray-400">CO₂ Offset</span>
              </div>
            </div>
          </div>
          
          
          
          {/* Key Insights */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/10">
            <h4 className="text-gray-300 font-medium text-sm mb-2">Key Insights</h4>
            
            <ul className="space-y-1 text-xs text-gray-400">
              <li className="flex items-start gap-1">
                <TrendingUp size={12} className="text-green-500 mt-0.5" />
                <span>Carbon credit prices have grown 140% annually in some markets, driven by corporate net-zero commitments.</span>
              </li>
              <li className="flex items-start gap-1">
                <Globe size={12} className="text-green-500 mt-0.5" />
                <span>Voluntary carbon markets are expected to grow 15x by 2030 as regulation increases.</span>
              </li>
              <li className="flex items-start gap-1">
                <Shield size={12} className="text-green-500 mt-0.5" />
                <span>Nature-based solutions typically offer higher returns but with greater verification complexity.</span>
              </li>
              <li className="flex items-start gap-1">
                <Zap size={12} className="text-green-500 mt-0.5" />
                <span>Technology-based credits (DAC, BECCS) command premium prices for permanence.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditsCalculator;