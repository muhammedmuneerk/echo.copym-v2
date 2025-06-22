import React, { useState } from "react";
import {
  Palette,
  TrendingUp,
  Star,
  Shield,
  DollarSign,
} from "lucide-react";

const ArtCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(50000);
  const [years, setYears] = useState(10);
  const [annualAppreciation, setAnnualAppreciation] = useState(8);
  const [artistReputation, setArtistReputation] = useState('Established');
  const [condition, setCondition] = useState('Excellent');
  const [storageCost, setStorageCost] = useState(2);
  const [insuranceCost, setInsuranceCost] = useState(1);
  const [marketTrend, setMarketTrend] = useState('Growing');
  const [authenticity, setAuthenticity] = useState('Certified');
  
  // Calculate investment projections
  const calculateProjections = () => {
    const results = [];
    let currentValue = purchasePrice;
    let totalStorageCosts = 0;
    let totalInsuranceCosts = 0;
    let totalMaintenanceCosts = 0;
    
    // Apply modifiers based on various factors
    const reputationModifier = 
      artistReputation === 'Emerging' ? 1.5 : 
      artistReputation === 'Mid-Career' ? 1.2 : 
      artistReputation === 'Established' ? 1.0 : 
      artistReputation === 'Blue Chip' ? 0.8 : 1.0; // Blue chip grows slower but more stable
    
    const conditionModifier = 
      condition === 'Poor' ? 0.3 : 
      condition === 'Fair' ? 0.6 : 
      condition === 'Good' ? 0.8 : 
      condition === 'Very Good' ? 0.9 : 1.0;
    
    const trendModifier = 
      marketTrend === 'Declining' ? 0.5 : 
      marketTrend === 'Stable' ? 0.8 : 
      marketTrend === 'Growing' ? 1.0 : 
      marketTrend === 'Hot' ? 1.4 : 1.0;
    
    const authenticityModifier = 
      authenticity === 'Questionable' ? 0.2 : 
      authenticity === 'Attributed' ? 0.6 : 
      authenticity === 'Documented' ? 0.9 : 1.0;
    
    const effectiveAppreciation = annualAppreciation * reputationModifier * conditionModifier * trendModifier * authenticityModifier;
    
    // Calculate yearly growth and costs
    for (let i = 1; i <= years; i++) {
      // Art appreciation with volatility simulation
      const volatility = Math.sin(i * 0.5) * 0.1; // Simulate market volatility
      const yearlyAppreciation = effectiveAppreciation + (volatility * effectiveAppreciation);
      currentValue = currentValue * (1 + (yearlyAppreciation / 100));
      
      // Annual costs
      const annualStorageCost = purchasePrice * (storageCost / 100);
      const annualInsuranceCost = currentValue * (insuranceCost / 100);
      const annualMaintenanceCost = purchasePrice * 0.5 / 100; // 0.5% maintenance/conservation
      
      totalStorageCosts += annualStorageCost;
      totalInsuranceCosts += annualInsuranceCost;
      totalMaintenanceCosts += annualMaintenanceCost;
      
      results.push({
        year: i,
        value: currentValue,
        storageCost: annualStorageCost,
        insuranceCost: annualInsuranceCost,
        maintenanceCost: annualMaintenanceCost,
        totalStorageCosts: totalStorageCosts,
        totalInsuranceCosts: totalInsuranceCosts,
        totalMaintenanceCosts: totalMaintenanceCosts,
        netValue: currentValue - totalStorageCosts - totalInsuranceCosts - totalMaintenanceCosts
      });
    }
    
    return results;
  };
  
  const projections = calculateProjections();
  const finalValue = projections.length > 0 ? projections[projections.length - 1].value : 0;
  const finalNetValue = projections.length > 0 ? projections[projections.length - 1].netValue : 0;
  const totalCosts = projections.length > 0 ? 
    projections[projections.length - 1].totalStorageCosts + 
    projections[projections.length - 1].totalInsuranceCosts + 
    projections[projections.length - 1].totalMaintenanceCosts : 0;
  
  // Generate chart data for visualization
  const generateChartData = () => {
    const chartData = [];
    
    // Initial value
    chartData.push({
      year: 0,
      value: purchasePrice,
      netValue: purchasePrice,
      costs: 0
    });
    
    // Calculate for each year
    for (let i = 1; i <= years; i++) {
      const projection = projections[i-1];
      chartData.push({
        year: i,
        value: projection.value,
        netValue: projection.netValue,
        costs: projection.totalStorageCosts + projection.totalInsuranceCosts + projection.totalMaintenanceCosts
      });
    }
    
    return chartData;
  };
  
  const chartData = generateChartData();
  
  // Generate the bar chart for the visualization
  const generateBarChart = () => {
    const maxValue = Math.max(...chartData.map(d => d.value)) * 1.1;
    const chartWidth = 300;
    const chartHeight = 150;
    const barWidth = (chartWidth - 40) / chartData.length;
    const barSpacing = barWidth * 0.2;
    
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
            {d.year}
          </text>
        ))}
        
        {/* Stacked bars */}
        {chartData.map((d, i) => {
          const totalBarHeight = ((chartHeight - 30) * d.value) / maxValue;
          const netBarHeight = ((chartHeight - 30) * d.netValue) / maxValue;
          const costsHeight = totalBarHeight - netBarHeight;
          
          return (
            <g key={`bar-${i}`}>
              {/* Net value part */}
              <rect 
                x={40 + i * barWidth + barSpacing / 2} 
                y={chartHeight - 20 - netBarHeight} 
                width={barWidth - barSpacing} 
                height={netBarHeight} 
                fill="#9C27B0" 
                opacity="0.8" 
              />
              
              {/* Costs part */}
              {costsHeight > 0 && (
                <rect 
                  x={40 + i * barWidth + barSpacing / 2} 
                  y={chartHeight - 20 - totalBarHeight} 
                  width={barWidth - barSpacing} 
                  height={costsHeight} 
                  fill="#FF9800" 
                  opacity="0.6" 
                />
              )}
            </g>
          );
        })}
        
        {/* Title */}
        <text 
          x={chartWidth / 2} 
          y="10" 
          textAnchor="middle" 
          fill="#9C27B0" 
          fontSize="9" 
          fontWeight="bold"
        >
          Art & Collectibles Value Projection
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
  
  return (
    <div className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-purple-500/20 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-purple-500">Art & Collectibles Investment Calculator</h3>
          <p className="text-gray-400 text-sm mt-1">Project returns on art, antiques, and collectible investments</p>
        </div>
        <div className="rounded-full bg-purple-500/20 p-2">
          <Palette size={20} className="text-purple-500" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          {/* Purchase Price */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Purchase Price</label>
              <span className="text-purple-500 font-medium">{formatCurrency(purchasePrice)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="500000"
              step="5000"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(parseInt(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Holding Period */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Holding Period</label>
              <span className="text-purple-500 font-medium">{years} years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Annual Appreciation */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Base Annual Appreciation</label>
              <span className="text-purple-500 font-medium">{annualAppreciation}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={annualAppreciation}
              onChange={(e) => setAnnualAppreciation(parseFloat(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Storage Cost */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Annual Storage Cost (% of purchase price)</label>
              <span className="text-purple-500 font-medium">{storageCost}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={storageCost}
              onChange={(e) => setStorageCost(parseFloat(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Insurance Cost */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Annual Insurance (% of current value)</label>
              <span className="text-purple-500 font-medium">{insuranceCost}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.25"
              value={insuranceCost}
              onChange={(e) => setInsuranceCost(parseFloat(e.target.value))}
              className="w-full accent-purple-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
            />
          </div>
          
          {/* Artist Reputation */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Artist/Creator Reputation</label>
            <select
              value={artistReputation}
              onChange={(e) => setArtistReputation(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
            >
              <option value="Emerging">Emerging Artist (High Growth Potential)</option>
              <option value="Mid-Career">Mid-Career Artist</option>
              <option value="Established">Established Artist</option>
              <option value="Blue Chip">Blue Chip/Master (Stable Growth)</option>
            </select>
          </div>
          
          {/* Condition */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
            >
              <option value="Poor">Poor</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
              <option value="Very Good">Very Good</option>
              <option value="Excellent">Excellent</option>
            </select>
          </div>
          
          {/* Market Trend */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Market Trend</label>
            <select
              value={marketTrend}
              onChange={(e) => setMarketTrend(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
            >
              <option value="Declining">Declining Market</option>
              <option value="Stable">Stable Market</option>
              <option value="Growing">Growing Market</option>
              <option value="Hot">Hot/Trending Market</option>
            </select>
          </div>
          
          {/* Authenticity */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Authenticity Status</label>
            <select
              value={authenticity}
              onChange={(e) => setAuthenticity(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
            >
              <option value="Questionable">Questionable</option>
              <option value="Attributed">Attributed</option>
              <option value="Documented">Well Documented</option>
              <option value="Certified">Certified/Authenticated</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Results Summary */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10">
            <h4 className="text-purple-500 font-medium mb-3">Investment Projection</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Initial Investment:</span>
                <span className="text-white">{formatCurrency(purchasePrice)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Projected Value:</span>
                <span className="text-purple-500 font-medium">{formatCurrency(finalValue)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Costs:</span>
                <span className="text-orange-400">{formatCurrency(totalCosts)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Net Value:</span>
                <span className="text-purple-400 font-medium">{formatCurrency(finalNetValue)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Return:</span>
                <span className={finalNetValue > purchasePrice ? "text-green-400" : "text-red-400"}>
                  {((finalNetValue / purchasePrice - 1) * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Annualized Return:</span>
                <span className={finalNetValue > purchasePrice ? "text-green-400" : "text-red-400"}>
                  {((Math.pow(finalNetValue / purchasePrice, 1/years) - 1) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10">
            {generateBarChart()}
            
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-600 opacity-80 rounded-sm"></div>
                <span className="text-xs text-gray-400">Net Value</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 opacity-60 rounded-sm"></div>
                <span className="text-xs text-gray-400">Costs</span>
              </div>
            </div>
          </div>
          
          {/* Key Insights */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-purple-500/10">
            <h4 className="text-gray-300 font-medium text-sm mb-2">Key Insights</h4>
            
            <ul className="space-y-1 text-xs text-gray-400">
              <li className="flex items-start gap-1">
                <TrendingUp size={12} className="text-purple-500 mt-0.5" />
                <span>Art markets can be highly volatile with periods of rapid growth and decline.</span>
              </li>
              <li className="flex items-start gap-1">
                <Star size={12} className="text-purple-500 mt-0.5" />
                <span>Artist reputation and market trends significantly impact appreciation potential.</span>
              </li>
              <li className="flex items-start gap-1">
                <Shield size={12} className="text-purple-500 mt-0.5" />
                <span>Condition and authenticity are crucial factors that greatly affect value.</span>
              </li>
              <li className="flex items-start gap-1">
                <DollarSign size={12} className="text-purple-500 mt-0.5" />
                <span>Storage, insurance, and conservation costs can significantly impact net returns.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtCalculator;