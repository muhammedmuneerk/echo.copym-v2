// renderCharts.js
import * as d3 from 'd3';

/**
 * Complete renderCharts utility function with all original functionality preserved
 * 
 * @param {Object} params - Chart rendering parameters
 * @param {React.RefObject} params.chartRef - Chart SVG element ref
 * @param {React.RefObject} params.tooltipRef - Tooltip element ref
 * @param {string} params.region - Region for chart data selection
 * @param {Object} params.goldData - Regional gold data object
 * @param {Object} params.globalData - Global gold data object
 * @param {string} params.activeTimeframe - Current timeframe ('1D', '1W', '1M', etc.)
 * @param {Function} params.formatDate - Date formatter function (timeframe, index) => string
 * @param {Function} params.formatCurrency - Currency formatter function (value) => string
 * @param {Function} params.formatNumber - Number formatter function (value) => string
 * @param {string} params.selectedRegion - Currently selected region
 * @param {Object} params.colors - Optional color scheme override
 */
export function renderCharts({
  chartRef,
  tooltipRef,
  region,
  goldData,
  globalData,
  activeTimeframe,
  formatDate,
  formatCurrency,
  formatNumber,
  selectedRegion,
  colors = {
    bullish: '#32CD32',
    bearish: '#FF4500',
    grid: '#fff',
    text: '#E6E6FA',
    accent: '#FFD700'
  }
}) {
  // Early return if chart reference is not available
  if (!chartRef.current) return;

  const chartSvg = d3.select(chartRef.current);
  chartSvg.selectAll("*").remove();

  // Chart dimensions and margins
  const width = chartRef.current.clientWidth;
  const height = 350;
  const margin = { top: 30, right: 60, bottom: 50, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Set up SVG dimensions
  chartSvg.attr("width", width).attr("height", height);

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

  // Add X-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(xAxis)
    .selectAll("text")
    .attr("fill", colors.text)
    .style("font-size", "10px");

  // Add Y-axis
  chartGroup.append("g")
    .call(yAxis)
    .selectAll("text")
    .attr("fill", colors.text)
    .style("font-size", "10px");

  // Add horizontal grid lines
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
    .attr("stroke", colors.grid);

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

  // Calculate candle width
  const candleWidth = Math.max(2, Math.min(15, innerWidth / chartData.length / 2));

  // Add candle stems (high-low lines)
  chartGroup.selectAll(".stem")
    .data(chartData)
    .enter()
    .append("line")
    .attr("class", "stem")
    .attr("x1", (d, i) => x(i))
    .attr("x2", (d, i) => x(i))
    .attr("y1", d => y(d.high))
    .attr("y2", d => y(d.low))
    .attr("stroke", d => d.open > d.close ? colors.bearish : colors.bullish)
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
    .attr("fill", d => d.open > d.close ? colors.bearish : colors.bullish);

  // Add tooltip interaction area
  chartGroup.append("rect")
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .attr("fill", "transparent")
    .attr("cursor", "crosshair")
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

      // Vertical crosshair line
      chartGroup.append("line")
        .attr("class", "crosshair-x")
        .attr("x1", x(i))
        .attr("x2", x(i))
        .attr("y1", 0)
        .attr("y2", innerHeight)
        .attr("stroke", colors.accent)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3");

      // Horizontal crosshair line
      chartGroup.append("line")
        .attr("class", "crosshair-y")
        .attr("x1", 0)
        .attr("x2", innerWidth)
        .attr("y1", y(item.close))
        .attr("y2", y(item.close))
        .attr("stroke", colors.accent)
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3");

      // Price label
      chartGroup.append("text")
        .attr("class", "crosshair-label")
        .attr("x", innerWidth + 5)
        .attr("y", y(item.close) + 4)
        .attr("fill", colors.accent)
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
    .attr("fill", colors.accent)
    .attr("font-size", "14px")
    .attr("font-weight", "bold")
    .text(`${region || 'Global'} Gold Price - ${activeTimeframe} View`);

  // Add X-axis label
  chartGroup.append("text")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "middle")
    .attr("fill", colors.text)
    .attr("font-size", "12px")
    .text("Time Period");

  // Add Y-axis label
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .attr("fill", colors.text)
    .attr("font-size", "12px")
    .text("Gold Price (USD/oz)");
}



// Example usage in a React component:

// import { renderCharts } from "./renderCharts";

// const MyChartComponent = () => {
//   const chartRef = useRef(null);
//   const tooltipRef = useRef(null);

//   useEffect(() => {
//     renderCharts({
//       chartRef,
//       tooltipRef,
//       region: selectedRegion,
//       goldData,
//       globalData,
//       activeTimeframe,
//       formatDate,
//       formatCurrency,
//       formatNumber,
//       selectedRegion,
//     });
//   }, [selectedRegion, activeTimeframe]);

//   return (
//     <div className="relative">
//       <svg ref={chartRef} className="w-full" />
//       <div
//         ref={tooltipRef}
//         className="absolute pointer-events-none z-10"
//         style={{ visibility: "hidden", opacity: 0 }}
//       />
//     </div>
//   );
// };
