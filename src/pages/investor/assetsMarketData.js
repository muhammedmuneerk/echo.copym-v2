// goldData.js

function generatePriceData(basePrice, volatilityFactor) {
  const trendFactors = {
    '1D': { points: 24, trend: 0.02, cycle: 6 },
    '1W': { points: 7, trend: 0.1, cycle: 3 },
    '1M': { points: 30, trend: 0.4, cycle: 10 },
    '1Y': { points: 12, trend: 1.2, cycle: 4 }
  };

  const result = {};

  Object.keys(trendFactors).forEach(timeframe => {
    const { points, trend, cycle } = trendFactors[timeframe];
    const data = [];
    let price = basePrice;
    const trendDirection = Math.random() > 0.5 ? 1 : -1;

    for (let i = 0; i < points; i++) {
      const cyclical = Math.sin((i / points) * cycle * Math.PI) * basePrice * volatilityFactor;
      const random = (Math.random() - 0.5) * basePrice * volatilityFactor;
      const trendComponent = (i / points) * trend * basePrice * trendDirection;
      price = basePrice + cyclical + random + trendComponent;

      const dailyVolatility = basePrice * volatilityFactor * 0.2;
      const open = price - (Math.random() - 0.5) * dailyVolatility;
      const close = price;
      const high = Math.max(open, close) + Math.random() * dailyVolatility;
      const low = Math.min(open, close) - Math.random() * dailyVolatility;
      const volume = (Math.random() * 0.5 + 0.75) * (basePrice / 1000);

      data.push({
        date: i,
        price,
        open,
        high,
        low,
        close,
        volume
      });
    }

    result[timeframe] = data;
  });

  return result;
}


  // Generate realistic performance data with trends and volatility
  function generatePerformanceData(baseIRR, volatilityFactor) {
    const trendFactors = {
      '1D': { points: 24, trend: 0.001, cycle: 6 },
      '1W': { points: 7, trend: 0.01, cycle: 3 },
      '1M': { points: 30, trend: 0.025, cycle: 8 },
      '1Y': { points: 12, trend: 0.08, cycle: 4 }
    };
    
    const result = {};
    
    Object.keys(trendFactors).forEach(timeframe => {
      const { points, trend, cycle } = trendFactors[timeframe];
      const data = [];
      let irr = baseIRR;
      
      for (let i = 0; i < points; i++) {
        const cyclical = Math.sin((i / points) * cycle * Math.PI) * baseIRR * volatilityFactor * 0.1;
        const random = (Math.random() - 0.5) * baseIRR * volatilityFactor * 0.1;
        const trendComponent = (i / points) * trend * baseIRR;
        
        irr = baseIRR + cyclical + random + trendComponent;
        
        const dealVolume = Math.floor((Math.random() * 0.5 + 0.75) * 50); // Number of deals
        const fundingAmount = Math.floor(irr * dealVolume * 8.5); // Millions USD
        
        data.push({
          date: i,
          irr: Math.max(0, irr),
          dealVolume,
          fundingAmount,
          multiples: irr / baseIRR * 2.2, // Money multiple
          tvpi: irr / baseIRR * 2.1 // Total Value to Paid-In
        });
      }
      
      result[timeframe] = data;
    });
    
    return result;
  }



//Gold Data 
export const goldData = {
  "North America": {
    code: "NA",
    borders: [
      [[49, -125], [25, -125], [25, -65], [49, -65]]
    ],
    reserves: 11400,
    production: 330,
    countries: ["United States", "Canada", "Mexico"],
    majorMines: [
      { name: "Nevada Gold Mines", coordinates: [40.8, -116.5], production: 115 },
      { name: "Peñasquito", coordinates: [24.1, -101.9], production: 34 },
      { name: "Canadian Malartic", coordinates: [48.1, -78.1], production: 25 }
    ],
    priceData: generatePriceData(1880, 0.05)
  },
  "South America": {
    code: "SA",
    borders: [
      [[-4, -81], [-4, -35], [-55, -35], [-55, -81]]
    ],
    reserves: 8700,
    production: 520,
    countries: ["Peru", "Brazil", "Chile", "Colombia", "Argentina"],
    majorMines: [
      { name: "Yanacocha", coordinates: [-6.9, -78.5], production: 28 },
      { name: "Cerro Vanguardia", coordinates: [-48.3, -68.2], production: 16 },
      { name: "Pueblo Viejo", coordinates: [18.9, -70.2], production: 48 }
    ],
    priceData: generatePriceData(1875, 0.06)
  },
  "Europe": {
    code: "EU",
    borders: [
      [[35, -10], [35, 40], [70, 40], [70, -10]]
    ],
    reserves: 2400,
    production: 140,
    countries: ["Russia", "Finland", "Sweden", "Turkey"],
    majorMines: [
      { name: "Kupol", coordinates: [66.6, 169.1], production: 21 },
      { name: "Kittila", coordinates: [67.9, 25.4], production: 14 },
      { name: "Olimpiada", coordinates: [59.2, 92.9], production: 32 }
    ],
    priceData: generatePriceData(1890, 0.04)
  },
  "Africa": {
    code: "AF",
    borders: [
      [[35, -18], [35, 50], [-35, 50], [-35, -18]]
    ],
    reserves: 19800,
    production: 870,
    countries: ["South Africa", "Ghana", "Sudan", "Mali", "Tanzania"],
    majorMines: [
      { name: "Tarkwa", coordinates: [5.3, -1.9], production: 42 },
      { name: "Kibali", coordinates: [3.1, 29.6], production: 31 },
      { name: "Loulo-Gounkoto", coordinates: [13.0, -11.5], production: 27 }
    ],
    priceData: generatePriceData(1860, 0.07)
  },
  "Asia": {
    code: "AS",
    borders: [
      [[35, 40], [35, 145], [0, 145], [0, 90], [10, 40]]
    ],
    reserves: 23500,
    production: 930,
    countries: ["China", "Indonesia", "Kazakhstan", "Uzbekistan", "Philippines"],
    majorMines: [
      { name: "Muruntau", coordinates: [41.5, 64.6], production: 66 },
      { name: "Grasberg", coordinates: [-4.1, 137.1], production: 49 },
      { name: "Telfer", coordinates: [-21.7, 122.2], production: 18 }
    ],
    priceData: generatePriceData(1870, 0.08)
  },
  "Oceania": {
    code: "OC",
    borders: [
      [[-5, 120], [-5, 180], [-45, 180], [-45, 110], [-15, 110]]
    ],
    reserves: 10100,
    production: 380,
    countries: ["Australia", "Papua New Guinea"],
    majorMines: [
      { name: "Cadia Valley", coordinates: [-33.4, 149.0], production: 38 },
      { name: "Boddington", coordinates: [-32.7, 116.3], production: 27 },
      { name: "Tanami", coordinates: [-19.9, 129.7], production: 16 }
    ],
    priceData: generatePriceData(1865, 0.05)
  }
};


  // Private equity data by region
  export const privateEquityData = {
    "North America": {
      code: "NA",
      borders: [
        [[49, -125], [25, -125], [25, -65], [49, -65]]
      ],
      aum: 2850000, // Assets Under Management in millions USD
      dealCount: 5420,
      avgDealSize: 185, // in millions USD
      irr: 12.8, // Internal Rate of Return percentage
      funds: 1250,
      dryPowder: 850000, // Uninvested capital in millions
      sectors: ["Technology", "Healthcare", "Financial Services", "Energy", "Consumer"],
      majorFunds: [
        { name: "Blackstone", location: [40.7, -74.0], aum: 731000, deals: 45 },
        { name: "KKR", location: [40.7, -74.0], aum: 429000, deals: 38 },
        { name: "Carlyle", location: [38.9, -77.0], aum: 376000, deals: 42 }
      ],
      priceData: {
      '1D': generatePriceData(24, 185),
      '1W': generatePriceData(7, 185),
      '1M': generatePriceData(30, 185),
      '1Y': generatePriceData(12, 185)
    },
      performanceData: generatePerformanceData(12.8, 0.15),
      color: "#8B5CF6" // Purple for PE
    },
    "Europe": {
      code: "EU",
      borders: [
        [[35, -10], [35, 40], [70, 40], [70, -10]]
      ],
      aum: 1650000,
      dealCount: 3280,
      avgDealSize: 125,
      irr: 10.5,
      funds: 890,
      dryPowder: 420000,
      sectors: ["Technology", "Healthcare", "Industrial", "Consumer", "Infrastructure"],
      majorFunds: [
        { name: "CVC Capital", location: [51.5, -0.1], aum: 125000, deals: 28 },
        { name: "Advent", location: [51.5, -0.1], aum: 54000, deals: 22 },
        { name: "EQT", location: [59.3, 18.1], aum: 71000, deals: 31 }
      ],
      performanceData: generatePerformanceData(10.5, 0.12),
      color: "#8B5CF6"
    },
    "Asia Pacific": {
      code: "AP",
      borders: [
        [[35, 70], [35, 145], [-10, 145], [-10, 90], [10, 70]]
      ],
      aum: 980000,
      dealCount: 2150,
      avgDealSize: 95,
      irr: 14.2,
      funds: 620,
      dryPowder: 280000,
      sectors: ["Technology", "Healthcare", "Consumer", "Financial Services", "Real Estate"],
      majorFunds: [
        { name: "Bain Capital Asia", location: [1.3, 103.8], aum: 28000, deals: 18 },
        { name: "TPG Asia", location: [1.3, 103.8], aum: 35000, deals: 24 },
        { name: "Hillhouse Capital", location: [22.3, 114.2], aum: 42000, deals: 15 }
      ],
      performanceData: generatePerformanceData(14.2, 0.18),
      color: "#8B5CF6"
    },
    "Latin America": {
      code: "LA",
      borders: [
        [[-4, -81], [-4, -35], [-55, -35], [-55, -81]]
      ],
      aum: 125000,
      dealCount: 380,
      avgDealSize: 45,
      irr: 15.8,
      funds: 85,
      dryPowder: 35000,
      sectors: ["Consumer", "Technology", "Healthcare", "Infrastructure", "Energy"],
      majorFunds: [
        { name: "Advent Latin America", location: [-23.5, -46.6], aum: 8500, deals: 12 },
        { name: "General Atlantic LatAm", location: [-23.5, -46.6], aum: 6200, deals: 8 },
        { name: "Warburg Pincus LatAm", location: [-34.6, -58.4], aum: 4800, deals: 6 }
      ],
      performanceData: generatePerformanceData(15.8, 0.22),
      color: "#8B5CF6"
    },
    "Middle East & Africa": {
      code: "MEA",
      borders: [
        [[35, -18], [35, 50], [-35, 50], [-35, -18]]
      ],
      aum: 95000,
      dealCount: 285,
      avgDealSize: 38,
      irr: 13.5,
      funds: 65,
      dryPowder: 28000,
      sectors: ["Energy", "Infrastructure", "Financial Services", "Consumer", "Healthcare"],
      majorFunds: [
        { name: "Abraaj (Legacy)", location: [25.2, 55.3], aum: 4500, deals: 8 },
        { name: "Actis", location: [-33.9, 18.4], aum: 8200, deals: 14 },
        { name: "Development Partners", location: [30.0, 31.2], aum: 3100, deals: 5 }
      ],
      performanceData: generatePerformanceData(13.5, 0.20),
      color: "#8B5CF6"
    }
  };



    // Real estate data by region with ISO country codes
  export const realEstateData = {
    "North America": {
      code: "NA",
      borders: [
        [[49, -125], [25, -125], [25, -65], [49, -65]]
      ],
      avgPrice: 450000,  // in USD
      inventory: 1200000,  // number of homes for sale
      marketGrowth: 4.2, // percent annually
      countries: ["United States", "Canada", "Mexico"],
      majorCities: [
        { name: "New York", coordinates: [40.7, -74.0], avgPrice: 850000, inventory: 25000 },
        { name: "Los Angeles", coordinates: [34.0, -118.2], avgPrice: 920000, inventory: 18500 },
        { name: "Toronto", coordinates: [43.7, -79.4], avgPrice: 780000, inventory: 15000 }
      ],
      priceData: generatePriceData(450000, 0.04)
    },
    "South America": {
      code: "SA",
      borders: [
        [[-4, -81], [-4, -35], [-55, -35], [-55, -81]]
      ],
      avgPrice: 180000,
      inventory: 850000,
      marketGrowth: 5.8,
      countries: ["Brazil", "Argentina", "Chile", "Colombia", "Peru"],
      majorCities: [
        { name: "São Paulo", coordinates: [-23.5, -46.6], avgPrice: 320000, inventory: 42000 },
        { name: "Buenos Aires", coordinates: [-34.6, -58.4], avgPrice: 240000, inventory: 18000 },
        { name: "Santiago", coordinates: [-33.4, -70.6], avgPrice: 290000, inventory: 12000 }
      ],
      priceData: generatePriceData(180000, 0.05)
    },
    "Europe": {
      code: "EU",
      borders: [
        [[35, -10], [35, 40], [70, 40], [70, -10]]
      ],
      avgPrice: 380000,
      inventory: 980000,
      marketGrowth: 3.1,
      countries: ["Germany", "France", "UK", "Italy", "Spain"],
      majorCities: [
        { name: "London", coordinates: [51.5, -0.1], avgPrice: 920000, inventory: 28000 },
        { name: "Paris", coordinates: [48.9, 2.3], avgPrice: 780000, inventory: 22000 },
        { name: "Berlin", coordinates: [52.5, 13.4], avgPrice: 520000, inventory: 18000 }
      ],
      priceData: generatePriceData(380000, 0.03)
    },
    "Africa": {
      code: "AF",
      borders: [
        [[35, -18], [35, 50], [-35, 50], [-35, -18]]
      ],
      avgPrice: 120000,
      inventory: 420000,
      marketGrowth: 7.3,
      countries: ["South Africa", "Nigeria", "Egypt", "Morocco", "Kenya"],
      majorCities: [
        { name: "Cape Town", coordinates: [-33.9, 18.4], avgPrice: 210000, inventory: 15000 },
        { name: "Lagos", coordinates: [6.5, 3.4], avgPrice: 180000, inventory: 28000 },
        { name: "Cairo", coordinates: [30.0, 31.2], avgPrice: 150000, inventory: 32000 }
      ],
      priceData: generatePriceData(120000, 0.06)
    },
    "Asia": {
      code: "AS",
      borders: [
        [[35, 40], [35, 145], [0, 145], [0, 90], [10, 40]]
      ],
      avgPrice: 320000,
      inventory: 1850000,
      marketGrowth: 6.8,
      countries: ["China", "Japan", "India", "South Korea", "Singapore"],
      majorCities: [
        { name: "Tokyo", coordinates: [35.7, 139.8], avgPrice: 780000, inventory: 45000 },
        { name: "Singapore", coordinates: [1.3, 103.8], avgPrice: 920000, inventory: 18000 },
        { name: "Shanghai", coordinates: [31.2, 121.5], avgPrice: 650000, inventory: 62000 }
      ],
      priceData: generatePriceData(320000, 0.07)
    },
    "Oceania": {
      code: "OC",
      borders: [
        [[-5, 120], [-5, 180], [-45, 180], [-45, 110], [-15, 110]]
      ],
      avgPrice: 510000,
      inventory: 320000,
      marketGrowth: 5.2,
      countries: ["Australia", "New Zealand"],
      majorCities: [
        { name: "Sydney", coordinates: [-33.9, 151.2], avgPrice: 880000, inventory: 22000 },
        { name: "Melbourne", coordinates: [-37.8, 145.0], avgPrice: 720000, inventory: 19000 },
        { name: "Auckland", coordinates: [-36.8, 174.8], avgPrice: 650000, inventory: 12000 }
      ],
      priceData: generatePriceData(510000, 0.05)
    }
  };



    // Carbon credits data by region
  export const carbonCreditsData = {
    "North America": {
      code: "NA",
      borders: [
        [[49, -125], [25, -125], [25, -65], [49, -65]]
      ],
      totalCredits: 285000000, // Total credits issued (tCO2e)
      tradingVolume: 142000000, // Annual trading volume (tCO2e)
      avgPrice: 24.50, // Average price per credit (USD/tCO2e)
      priceRange: { min: 8.20, max: 45.80 },
      activeProjects: 1250,
      offsetDemand: 89000000, // Corporate offset demand
      projectTypes: ["Forestry", "Renewable Energy", "Methane Capture", "Direct Air Capture", "Soil Carbon"],
      majorMarkets: [
        { name: "California Cap-and-Trade", location: [34.0, -118.2], volume: 85000000, avgPrice: 28.40 },
        { name: "RGGI (Northeast)", location: [41.2, -73.2], volume: 42000000, avgPrice: 13.85 },
        { name: "Quebec Cap-and-Trade", location: [46.8, -71.2], volume: 15000000, avgPrice: 26.70 }
      ],
      performanceData: generatePerformanceData(24.50, 0.35), // Green for carbon credits
    },
    "Europe": {
      code: "EU",
      borders: [
        [[35, -10], [35, 40], [70, 40], [70, -10]]
      ],
      totalCredits: 420000000,
      tradingVolume: 285000000,
      avgPrice: 85.20,
      priceRange: { min: 15.40, max: 98.60 },
      activeProjects: 890,
      offsetDemand: 195000000,
      projectTypes: ["Renewable Energy", "Forestry", "Industrial Efficiency", "Carbon Capture", "Blue Carbon"],
      majorMarkets: [
        { name: "EU ETS", location: [50.8, 4.4], volume: 245000000, avgPrice: 87.30 },
        { name: "UK ETS", location: [51.5, -0.1], volume: 28000000, avgPrice: 75.20 },
        { name: "Voluntary Carbon Market", location: [48.9, 2.3], volume: 12000000, avgPrice: 45.80 }
      ],
      performanceData: generatePerformanceData(85.20, 0.28),
    },
    "Asia": {
      code: "AP",
      borders: [
        // [[35, 70], [35, 145], [-10, 145], [-10, 90], [10, 70]]
        // [[45, 60], [45, 155], [-20, 155], [-20, 80], [20, 60]]
        [[55, 50], [65, 175], [-20, 155], [-20, 80], [30, 50]]
      ],
      totalCredits: 180000000,
      tradingVolume: 95000000,
      avgPrice: 12.80,
      priceRange: { min: 2.50, max: 28.90 },
      activeProjects: 1850,
      offsetDemand: 125000000,
      projectTypes: ["Renewable Energy", "Methane Avoidance", "Cookstoves", "Forestry", "Waste Management"],
      majorMarkets: [
        { name: "China National ETS", location: [39.9, 116.4], volume: 48000000, avgPrice: 7.20 },
        { name: "Korea K-ETS", location: [37.6, 126.9], volume: 18000000, avgPrice: 22.40 },
        { name: "Tokyo Cap-and-Trade", location: [35.7, 139.7], volume: 8500000, avgPrice: 35.60 }
      ],
      performanceData: generatePerformanceData(12.80, 0.42),
    },
    "Latin America": {
      code: "LA",
      borders: [
        [[-4, -81], [-4, -35], [-55, -35], [-55, -81]]
      ],
      totalCredits: 95000000,
      tradingVolume: 28000000,
      avgPrice: 8.50,
      priceRange: { min: 1.80, max: 22.30 },
      activeProjects: 425,
      offsetDemand: 15000000,
      projectTypes: ["Forestry & REDD+", "Renewable Energy", "Cookstoves", "Waste Management", "Agriculture"],
      majorMarkets: [
        { name: "Brazil REDD+ Projects", location: [-15.8, -47.9], volume: 12000000, avgPrice: 6.50 },
        { name: "Colombia VCS Projects", location: [4.7, -74.1], volume: 8500000, avgPrice: 9.20 },
        { name: "Mexico Pilot ETS", location: [19.4, -99.1], volume: 4200000, avgPrice: 14.80 }
      ],
      performanceData: generatePerformanceData(8.50, 0.38),
    },
    "Africa": {
      code: "AF",
      borders: [
        [[37, -18], [37, 50], [-35, 50], [-35, -18]]
      ],
      totalCredits: 45000000,
      tradingVolume: 18000000,
      avgPrice: 5.80,
      priceRange: { min: 0.85, max: 18.50 },
      activeProjects: 680,
      offsetDemand: 8500000,
      projectTypes: ["Cookstoves", "Renewable Energy", "Forestry", "Waste Management", "Agriculture"],
      majorMarkets: [
        { name: "Kenya Cookstove Projects", location: [-1.3, 36.8], volume: 6500000, avgPrice: 4.20 },
        { name: "South Africa Renewables", location: [-25.7, 28.2], volume: 5200000, avgPrice: 8.90 },
        { name: "Ghana Gold Standard", location: [7.9, -1.0], volume: 3800000, avgPrice: 6.40 }
      ],
      performanceData: generatePerformanceData(5.80, 0.45),
    }
  };


    // Art & Collectibles data by region
  export const artCollectiblesData = {
    "North America": {
      code: "NA",
      borders: [
        [[49, -125], [25, -125], [25, -65], [49, -65]]
      ],
      avgPrice: 850000,  // in USD
      inventory: 450000,  // number of artworks/collectibles for sale
      marketGrowth: 8.5, // percent annually
      categories: ["Contemporary Art", "Classic Cars", "Fine Wine", "Vintage Watches", "Comics"],
      majorCities: [
        { name: "New York", coordinates: [40.7, -74.0], avgPrice: 1500000, inventory: 85000, specialty: "Contemporary Art" },
        { name: "Los Angeles", coordinates: [34.0, -118.2], avgPrice: 920000, inventory: 42000, specialty: "Hollywood Memorabilia" },
        { name: "Chicago", coordinates: [41.9, -87.6], avgPrice: 650000, inventory: 28000, specialty: "Modern Art" }
      ],
      priceData: generatePriceData(850000, 0.12),
    },
    "South America": {
      code: "SA",
      borders: [
        [[-4, -81], [-4, -35], [-55, -35], [-55, -81]]
      ],
      avgPrice: 280000,
      inventory: 180000,
      marketGrowth: 12.3,
      categories: ["Pre-Columbian Art", "Modern Latin Art", "Silver Artifacts", "Gemstones", "Folk Art"],
      majorCities: [
        { name: "São Paulo", coordinates: [-23.5, -46.6], avgPrice: 420000, inventory: 35000, specialty: "Brazilian Modern Art" },
        { name: "Buenos Aires", coordinates: [-34.6, -58.4], avgPrice: 320000, inventory: 22000, specialty: "Tango Memorabilia" },
        { name: "Bogotá", coordinates: [4.7, -74.1], avgPrice: 180000, inventory: 15000, specialty: "Emeralds & Gold" }
      ],
      priceData: generatePriceData(280000, 0.15),
    },
    "Europe": {
      code: "EU",
      borders: [
        [[35, -10], [35, 40], [70, 40], [70, -10]]
      ],
      avgPrice: 1200000,
      inventory: 680000,
      marketGrowth: 6.2,
      categories: ["Old Masters", "Impressionist", "Antique Furniture", "Rare Books", "Classical Sculptures"],
      majorCities: [
        { name: "London", coordinates: [51.5, -0.1], avgPrice: 2100000, inventory: 120000, specialty: "Old Masters" },
        { name: "Paris", coordinates: [48.9, 2.3], avgPrice: 1800000, inventory: 95000, specialty: "Impressionist Art" },
        { name: "Zurich", coordinates: [47.4, 8.5], avgPrice: 1650000, inventory: 45000, specialty: "Private Collections" }
      ],
      priceData: generatePriceData(1200000, 0.08),
    },
    "Asia": {
      code: "AS",
      borders: [
        [[35, 40], [35, 145], [0, 145], [0, 90], [10, 40]]
      ],
      avgPrice: 950000,
      inventory: 820000,
      marketGrowth: 18.2,
      categories: ["Chinese Antiquities", "Japanese Art", "Jade & Porcelain", "Calligraphy", "Buddha Sculptures"],
      majorCities: [
        { name: "Hong Kong", coordinates: [22.3, 114.2], avgPrice: 1800000, inventory: 95000, specialty: "Chinese Antiquities" },
        { name: "Tokyo", coordinates: [35.7, 139.8], avgPrice: 1200000, inventory: 75000, specialty: "Japanese Art" },
        { name: "Singapore", coordinates: [1.3, 103.8], avgPrice: 1400000, inventory: 42000, specialty: "Southeast Asian Art" }
      ],
      priceData: generatePriceData(950000, 0.16),
    },
    "Africa": {
      code: "AF",
      borders: [
        [[35, -18], [35, 50], [-35, 50], [-35, -18]]
      ],
      avgPrice: 180000,
      inventory: 120000,
      marketGrowth: 15.8,
      categories: ["African Tribal Art", "Contemporary African Art", "Precious Stones", "Masks & Sculptures", "Textiles"],
      majorCities: [
        { name: "Cape Town", coordinates: [-33.9, 18.4], avgPrice: 280000, inventory: 18000, specialty: "Contemporary African Art" },
        { name: "Lagos", coordinates: [6.5, 3.4], avgPrice: 220000, inventory: 25000, specialty: "Yoruba Art" },
        { name: "Marrakech", coordinates: [31.6, -8.0], avgPrice: 150000, inventory: 15000, specialty: "Islamic Art" }
      ],
      priceData: generatePriceData(180000, 0.18),
    },
    "Oceania": {
      code: "OC",
      borders: [
        [[-5, 120], [-5, 180], [-45, 180], [-45, 110], [-15, 110]]
      ],
      avgPrice: 420000,
      inventory: 85000,
      marketGrowth: 9.7,
      categories: ["Aboriginal Art", "Pacific Island Art", "Contemporary Australian Art", "Opals", "Tribal Artifacts"],
      majorCities: [
        { name: "Sydney", coordinates: [-33.9, 151.2], avgPrice: 650000, inventory: 32000, specialty: "Aboriginal Art" },
        { name: "Melbourne", coordinates: [-37.8, 145.0], avgPrice: 580000, inventory: 28000, specialty: "Contemporary Art" },
        { name: "Auckland", coordinates: [-36.8, 174.8], avgPrice: 380000, inventory: 15000, specialty: "Maori Art" }
      ],
      priceData: generatePriceData(420000, 0.11),
    }
  };