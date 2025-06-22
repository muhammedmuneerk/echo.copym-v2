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

// WebAssembly Investment Calculator (Simulated)
const InvestmentCalculator = () => {
    const [investment, setInvestment] = useState(10000);
    const [years, setYears] = useState(5);
    const [annualReturn, setAnnualReturn] = useState(7);
    const [taxRate, setTaxRate] = useState(20);
    const [country, setCountry] = useState('United States');
    const [compounding, setCompounding] = useState(1); // 1 = annual, 12 = monthly
    
    // Calculate investment projections
    const calculateProjections = () => {
      // Simulate a complex calculation that would be done in WebAssembly
      const results = [];
      let principal = investment;
      let totalInterest = 0;
      let totalTax = 0;
      
      // Apply different tax treatments based on selected country
      const taxModifier = country === 'Switzerland' ? 0.8 : 
                           country === 'Singapore' ? 0.5 : 
                           country === 'United Arab Emirates' ? 0.1 : 1.0;
      
      const effectiveTaxRate = taxRate * taxModifier;
      
      for (let i = 1; i <= years; i++) {
        // Calculate compound interest
        const interestForYear = principal * (Math.pow(1 + (annualReturn / 100) / compounding, compounding) - 1);
        const taxForYear = interestForYear * (effectiveTaxRate / 100);
        
        totalInterest += interestForYear;
        totalTax += taxForYear;
        
        // Reinvest after tax
        principal += interestForYear - taxForYear;
        
        results.push({
          year: i,
          principal: principal,
          interestForYear: interestForYear,
          taxForYear: taxForYear,
          totalInterest: totalInterest,
          totalTax: totalTax
        });
      }
      
      return results;
    };
    
    const projections = calculateProjections();
    const finalValue = projections.length > 0 ? projections[projections.length - 1].principal : 0;
    
    // Generate chart data for visualization
    const generateChartData = () => {
      const chartData = [];
      let runningValue = investment;
      
      // Initial value
      chartData.push({
        year: 0,
        value: runningValue,
        principal: runningValue,
        interest: 0
      });
      
      // Calculate for each year
      for (let i = 1; i <= years; i++) {
        const projection = projections[i-1];
        const principalDisplay = investment;
        const interestDisplay = projection.principal - investment;
        
        chartData.push({
          year: i,
          value: projection.principal,
          principal: principalDisplay,
          interest: interestDisplay
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
            const principalHeight = ((chartHeight - 30) * d.principal) / maxValue;
            const interestHeight = ((chartHeight - 30) * d.interest) / maxValue;
            
            return (
              <g key={`bar-${i}`}>
                {/* Principal part */}
                <rect 
                  x={40 + i * barWidth + barSpacing / 2} 
                  y={chartHeight - 20 - principalHeight} 
                  width={barWidth - barSpacing} 
                  height={principalHeight} 
                  fill="#B8860B" 
                  opacity="0.7" 
                />
                
                {/* Interest part */}
                {interestHeight > 0 && (
                  <rect 
                    x={40 + i * barWidth + barSpacing / 2} 
                    y={chartHeight - 20 - principalHeight - interestHeight} 
                    width={barWidth - barSpacing} 
                    height={interestHeight} 
                    fill="#FFD700" 
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
            fill="#FFD700" 
            fontSize="9" 
            fontWeight="bold"
          >
            Investment Growth Projection
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
      <div className="bg-gray-900/70 backdrop-blur-xl border border-yellow-500/20 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-yellow-500/20 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-yellow-500">Gold Investment Calculator</h3>
            <p className="text-gray-400 text-sm mt-1">Project returns with multi-jurisdictional tax implications</p>
          </div>
          <div className="rounded-full bg-yellow-500/20 p-2">
            <DollarSign size={20} className="text-yellow-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            {/* Investment Amount */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-gray-300">Initial Investment</label>
                <span className="text-yellow-500 font-medium">{formatCurrency(investment)}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={investment}
                onChange={(e) => setInvestment(parseInt(e.target.value))}
                className="w-full accent-yellow-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
              />
            </div>
            
            {/* Time Horizon */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-gray-300">Investment Period</label>
                <span className="text-yellow-500 font-medium">{years} years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
                className="w-full accent-yellow-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
              />
            </div>
            
            {/* Annual Return */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-gray-300">Expected Annual Return</label>
                <span className="text-yellow-500 font-medium">{annualReturn}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(parseInt(e.target.value))}
                className="w-full accent-yellow-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
              />
            </div>
            
            {/* Tax Rate */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-gray-300">Tax Rate</label>
                <span className="text-yellow-500 font-medium">{taxRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={taxRate}
                onChange={(e) => setTaxRate(parseInt(e.target.value))}
                className="w-full accent-yellow-500 bg-gray-700 h-2 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
              />
            </div>
            
            {/* Jurisdiction Selection */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Jurisdiction</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all"
              >
                <option value="United States">United States</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Singapore">Singapore</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>
            
            {/* Compounding Frequency */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Compounding Frequency</label>
              <select
                value={compounding}
                onChange={(e) => setCompounding(parseInt(e.target.value))}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg p-2 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all"
              >
                <option value={1}>Annual</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
                <option value={365}>Daily</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Results Summary */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-500/10">
              <h4 className="text-yellow-500 font-medium mb-3">Investment Projection</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Initial Investment:</span>
                  <span className="text-white">{formatCurrency(investment)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Final Value:</span>
                  <span className="text-yellow-500 font-medium">{formatCurrency(finalValue)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Growth:</span>
                  <span className="text-green-400">+{formatCurrency(finalValue - investment)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Growth Percentage:</span>
                  <span className="text-green-400">
                    {((finalValue / investment - 1) * 100).toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax Paid:</span>
                  <span className="text-red-400">
                    {formatCurrency(projections[projections.length - 1].totalTax)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Chart */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-500/10">
              {generateBarChart()}
              
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#B8860B] opacity-70 rounded-sm"></div>
                  <span className="text-xs text-gray-400">Principal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#FFD700] opacity-70 rounded-sm"></div>
                  <span className="text-xs text-gray-400">Growth</span>
                </div>
              </div>
            </div>
            
            {/* Key Insights */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-yellow-500/10">
              <h4 className="text-gray-300 font-medium text-sm mb-2">Key Insights</h4>
              
              <ul className="space-y-1 text-xs text-gray-400">
                <li className="flex items-start gap-1">
                  <TrendingUp size={12} className="text-yellow-500 mt-0.5" />
                  <span>Gold has historically grown at an average rate of 7.5% annually since 2000.</span>
                </li>
                <li className="flex items-start gap-1">
                  <Globe size={12} className="text-yellow-500 mt-0.5" />
                  <span>Tax treatment for gold investments varies significantly by jurisdiction.</span>
                </li>
                <li className="flex items-start gap-1">
                  <Shield size={12} className="text-yellow-500 mt-0.5" />
                  <span>Physical gold may be subject to additional storage and insurance costs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };


  export default InvestmentCalculator ;