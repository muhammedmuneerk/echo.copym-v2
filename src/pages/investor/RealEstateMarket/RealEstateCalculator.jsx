import React, { useState } from "react";
import {
  Building,
  TrendingUp,
  Globe,
  Shield,
  DollarSign,
} from "lucide-react";

const RealEstateCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [years, setYears] = useState(10);
  const [annualAppreciation, setAnnualAppreciation] = useState(5);
  const [rentalYield, setRentalYield] = useState(4);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(3.5);
  const [propertyType, setPropertyType] = useState('Residential');
  const [maintenanceCost, setMaintenanceCost] = useState(1);
  
  // Calculate investment projections
  const calculateProjections = () => {
    const results = [];
    let currentPropertyValue = propertyValue;
    let totalRentalIncome = 0;
    let totalMortgagePayments = 0;
    let totalMaintenance = 0;
    
    // Mortgage calculations
    const downPaymentAmount = propertyValue * (downPayment / 100);
    const loanAmount = propertyValue - downPaymentAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = years * 12;
    
    // Calculate monthly mortgage payment (P&I only)
    const monthlyMortgagePayment = loanAmount * (
      monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)
    ) / (
      Math.pow(1 + monthlyInterestRate, totalPayments) - 1
    );
    
    // Apply different appreciation rates based on property type
    const appreciationModifier = 
      propertyType === 'Commercial' ? 0.8 : 
      propertyType === 'Industrial' ? 1.2 : 
      propertyType === 'Vacation' ? 1.3 : 1.0;
    
    const effectiveAppreciation = annualAppreciation * appreciationModifier;
    
    // Calculate yearly growth and returns
    for (let i = 1; i <= years; i++) {
      // Property appreciation
      currentPropertyValue = currentPropertyValue * (1 + (effectiveAppreciation / 100));
      
      // Annual rental income
      const annualRentalIncome = (propertyValue * (rentalYield / 100)) * 
        Math.pow(1 + (effectiveAppreciation / 200), i); // Rents increase at half the appreciation rate
      
      // Annual mortgage payments
      const annualMortgagePayment = monthlyMortgagePayment * 12;
      
      // Annual maintenance costs
      const annualMaintenanceCost = propertyValue * (maintenanceCost / 100) * 
        Math.pow(1 + (effectiveAppreciation / 200), i); // Maintenance increases with property value
      
      totalRentalIncome += annualRentalIncome;
      totalMortgagePayments += annualMortgagePayment;
      totalMaintenance += annualMaintenanceCost;
      
      results.push({
        year: i,
        propertyValue: currentPropertyValue,
        rentalIncome: annualRentalIncome,
        mortgagePayment: annualMortgagePayment,
        maintenanceCost: annualMaintenanceCost,
        totalRentalIncome: totalRentalIncome,
        totalMortgagePayments: totalMortgagePayments,
        totalMaintenance: totalMaintenance,
        equity: currentPropertyValue - (loanAmount - (i / years) * loanAmount)
      });
    }
    
    return results;
  };
  
  const projections = calculateProjections();
  const finalPropertyValue = projections.length > 0 ? projections[projections.length - 1].propertyValue : 0;
  const finalEquity = projections.length > 0 ? projections[projections.length - 1].equity : 0;
  const totalRentalIncome = projections.length > 0 ? projections[projections.length - 1].totalRentalIncome : 0;
  const totalExpenses = projections.length > 0 ? projections[projections.length - 1].totalMortgagePayments + projections[projections.length - 1].totalMaintenance : 0;
  const netCashFlow = totalRentalIncome - totalExpenses;
  
  // Generate chart data for visualization
  const generateChartData = () => {
    const chartData = [];
    
    // Initial value
    chartData.push({
      year: 0,
      value: propertyValue,
      propertyValue: propertyValue,
      equity: propertyValue * (downPayment / 100),
      rental: 0
    });
    
    // Calculate for each year
    for (let i = 1; i <= years; i++) {
      const projection = projections[i-1];
      chartData.push({
        year: i,
        value: projection.propertyValue,
        propertyValue: projection.propertyValue,
        equity: projection.equity,
        rental: projection.totalRentalIncome - projection.totalMortgagePayments - projection.totalMaintenance
      });
    }
    
    return chartData;
  };
  
  const chartData = generateChartData();
  
  // Generate the bar chart for the visualization
  const generateBarChart = () => {
    const maxValue = Math.max(...chartData.map(d => d.value)) * 1.1; // 10% headroom
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
          const barHeight = ((chartHeight - 30) * d.value) / maxValue;
          const equityHeight = ((chartHeight - 30) * d.equity) / maxValue;
          const mortgageHeight = barHeight - equityHeight > 0 ? barHeight - equityHeight : 0;
          
          return (
            <g key={`bar-${i}`}>
              {/* Equity part */}
              <rect 
                x={40 + i * barWidth + barSpacing / 2} 
                y={chartHeight - 20 - equityHeight} 
                width={barWidth - barSpacing} 
                height={equityHeight} 
                fill="#4CAF50" 
                opacity="0.7" 
              />
              
              {/* Mortgage part */}
              {mortgageHeight > 0 && (
                <rect 
                  x={40 + i * barWidth + barSpacing / 2} 
                  y={chartHeight - 20 - barHeight} 
                  width={barWidth - barSpacing} 
                  height={mortgageHeight} 
                  fill="#90CAF9" 
                  opacity="0.7" 
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
          fill="#4CAF50" 
          fontSize="9" 
          fontWeight="bold"
        >
          Real Estate Value Projection
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
    <div className="bg-gray-900/70 backdrop-blur-xl border border-blue-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-blue-500/20 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-blue-500">Real Estate Investment Calculator</h3>
          <p className="text-gray-400 text-sm mt-1">Project returns with property appreciation and rental income</p>
        </div>
        <div className="rounded-full bg-blue-500/20 p-2">
          <Building size={20} className="text-blue-500" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          {/* Property Value */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Property Value</label>
              <span className="text-blue-500 font-medium">{formatCurrency(propertyValue)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="2000000"
              step="50000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(parseInt(e.target.value))}
              className="w-full accent-blue-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
          </div>
          
          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Down Payment</label>
              <span className="text-blue-500 font-medium">{downPayment}% ({formatCurrency(propertyValue * downPayment / 100)})</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={downPayment}
              onChange={(e) => setDownPayment(parseInt(e.target.value))}
              className="w-full accent-blue-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
          </div>
          
          {/* Mortgage Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Mortgage Interest Rate</label>
              <span className="text-blue-500 font-medium">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full accent-blue-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
          </div>
          
          {/* Holding Period */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Holding Period</label>
              <span className="text-blue-500 font-medium">{years} years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full accent-blue-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
          </div>
          
          {/* Annual Appreciation */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Annual Appreciation</label>
              <span className="text-blue-500 font-medium">{annualAppreciation}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={annualAppreciation}
              onChange={(e) => setAnnualAppreciation(parseFloat(e.target.value))}
              className="w-full accent-blue-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
          </div>
          
          {/* Rental Yield */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Annual Rental Yield</label>
              <span className="text-blue-500 font-medium">{rentalYield}% ({formatCurrency(propertyValue * rentalYield / 100)} / year)</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={rentalYield}
              onChange={(e) => setRentalYield(parseFloat(e.target.value))}
              className="w-full accent-blue-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
          </div>
          
          {/* Maintenance Cost */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-gray-300">Annual Maintenance (% of property value)</label>
              <span className="text-blue-500 font-medium">{maintenanceCost}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.25"
              value={maintenanceCost}
              onChange={(e) => setMaintenanceCost(parseFloat(e.target.value))}
              className="w-full accent-blue-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
          </div>
          
          {/* Property Type Selection */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500/50 outline-none transition-all"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Vacation">Vacation</option>
              <option value="Land">Land</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Results Summary */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/10">
            <h4 className="text-green-500 font-medium mb-3">Investment Projection</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Initial Investment:</span>
                <span className="text-white">{formatCurrency(propertyValue * (downPayment / 100))}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Final Property Value:</span>
                <span className="text-green-500 font-medium">{formatCurrency(finalPropertyValue)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Final Equity:</span>
                <span className="text-green-500 font-medium">{formatCurrency(finalEquity)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Equity Growth:</span>
                <span className="text-green-400">
                  {((finalEquity / (propertyValue * (downPayment / 100)) - 1) * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Rental Income:</span>
                <span className="text-blue-400">
                  {formatCurrency(totalRentalIncome)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Expenses:</span>
                <span className="text-red-400">
                  {formatCurrency(totalExpenses)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Net Cash Flow:</span>
                <span className={netCashFlow >= 0 ? "text-green-400" : "text-red-400"}>
                  {formatCurrency(netCashFlow)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/10">
            {generateBarChart()}
            
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#4CAF50] opacity-70 rounded-sm"></div>
                <span className="text-xs text-gray-400">Equity</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#90CAF9] opacity-70 rounded-sm"></div>
                <span className="text-xs text-gray-400">Mortgage</span>
              </div>
            </div>
          </div>
          
          {/* Key Insights */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-green-500/10">
            <h4 className="text-gray-300 font-medium text-sm mb-2">Key Insights</h4>
            
            <ul className="space-y-1 text-xs text-gray-400">
              <li className="flex items-start gap-1">
                <TrendingUp size={12} className="text-green-500 mt-0.5" />
                <span>Real estate has historically appreciated at an average rate of 3-5% annually in most markets.</span>
              </li>
              <li className="flex items-start gap-1">
                <Globe size={12} className="text-green-500 mt-0.5" />
                <span>Location significantly impacts both appreciation rates and rental yields.</span>
              </li>
              <li className="flex items-start gap-1">
                <Shield size={12} className="text-green-500 mt-0.5" />
                <span>Real estate can provide tax advantages through depreciation and mortgage interest deductions.</span>
              </li>
              <li className="flex items-start gap-1">
                <DollarSign size={12} className="text-green-500 mt-0.5" />
                <span>Leverage through mortgages can significantly amplify returns but also increases risk.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateCalculator;