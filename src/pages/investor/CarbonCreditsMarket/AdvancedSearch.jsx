import React, { useState, useEffect } from "react";
import { Search, Leaf, Globe, TrendingUp } from "lucide-react";

// Advanced Search Component for Carbon Credits Marketplace
const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  // Sample suggestion data for carbon credits
  const sampleSuggestions = [
    "renewable energy carbon credits",
    "forest conservation offset projects",
    "verified carbon standard projects",
    "blue carbon marine restoration",
    "direct air capture technology credits",
    "sustainable agriculture carbon sequestration",
    "methane capture and destruction projects",
    "nature-based carbon removal solutions"
  ];
  
  // Sample search results for carbon credits
  const generateSearchResults = (query) => {
    if (!query.trim()) return [];
    
    const baseResults = [
      {
        title: "Amazon Rainforest Conservation Project",
        description: "Large-scale forest protection initiative preventing deforestation and supporting indigenous communities while generating high-quality carbon credits.",
        type: "Nature-Based",
        standard: "VCS",
        metrics: { price: "$45/tCO2e", available: "25,000 tCO2e", vintage: "2024", rating: "A+" }
      },
      {
        title: "Solar Farm Development Initiative",
        description: "Utility-scale solar energy project in emerging markets, displacing fossil fuel generation and creating sustainable energy infrastructure.",
        type: "Renewable Energy",
        standard: "Gold Standard",
        metrics: { price: "$38/tCO2e", available: "50,000 tCO2e", vintage: "2023-2024", rating: "A" }
      },
      {
        title: "Direct Air Capture Technology",
        description: "Cutting-edge carbon removal technology permanently capturing CO2 from atmosphere with verified long-term storage solutions.",
        type: "Technology",
        standard: "CDR Verified",
        metrics: { price: "$180/tCO2e", available: "5,000 tCO2e", vintage: "2024", rating: "Premium" }
      },
      {
        title: "Sustainable Agriculture Program",
        description: "Soil carbon sequestration through regenerative farming practices, supporting rural communities and improving food security.",
        type: "Agriculture",
        standard: "VCS + CCB",
        metrics: { price: "$32/tCO2e", available: "15,000 tCO2e", vintage: "2023", rating: "A" }
      },
      {
        title: "Blue Carbon Coastal Restoration",
        description: "Mangrove and seagrass restoration project protecting coastal ecosystems while providing carbon sequestration and community benefits.",
        type: "Blue Carbon",
        standard: "Plan Vivo",
        metrics: { price: "$55/tCO2e", available: "8,000 tCO2e", vintage: "2024", rating: "A+" }
      },
      {
        title: "Landfill Methane Capture",
        description: "Methane destruction project converting harmful emissions into clean energy while preventing potent greenhouse gas release.",
        type: "Waste Management",
        standard: "VCS",
        metrics: { price: "$28/tCO2e", available: "35,000 tCO2e", vintage: "2023-2024", rating: "B+" }
      }
    ];
    
    // Simulate relevance ranking
    return baseResults
      .map(result => {
        // Calculate simple relevance score
        const queryWords = query.toLowerCase().split(' ');
        let relevance = 0;
        
        queryWords.forEach(word => {
          if (result.title.toLowerCase().includes(word)) relevance += 2;
          if (result.description.toLowerCase().includes(word)) relevance += 1;
          if (result.type.toLowerCase().includes(word)) relevance += 1;
          if (result.standard.toLowerCase().includes(word)) relevance += 1;
        });
        
        return { ...result, relevance };
      })
      .sort((a, b) => b.relevance - a.relevance)
      .filter(result => result.relevance > 0);
  };
  
  // Handle search
  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const results = generateSearchResults(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 600);
  };
  
  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    
    // Trigger search with selected suggestion
    setIsSearching(true);
    setTimeout(() => {
      const results = generateSearchResults(suggestion);
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };
  
  // Generate suggestions based on input
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    
    // Filter suggestions based on input
    const filtered = sampleSuggestions.filter(
      suggestion => suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSuggestions(filtered.slice(0, 5));
  }, [searchQuery]);
  
  // Handle key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setSuggestions([]);
    }
  };

  // Get icon for project type
  const getProjectIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'nature-based':
      case 'blue carbon':
        return <Leaf className="text-green-500" size={16} />;
      case 'renewable energy':
        return <TrendingUp className="text-yellow-500" size={16} />;
      case 'technology':
        return <Globe className="text-blue-500" size={16} />;
      default:
        return <Globe className="text-gray-500" size={16} />;
    }
  };

  // Get rating color
  const getRatingColor = (rating) => {
    switch (rating) {
      case 'A+':
      case 'Premium':
        return 'text-green-400 bg-green-400/10';
      case 'A':
        return 'text-blue-400 bg-blue-400/10';
      case 'B+':
        return 'text-yellow-400 bg-yellow-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };
  
  return (
    <div className="bg-gray-900/70 backdrop-blur-xl border border-green-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-green-500/20">
        <div className="flex items-center gap-2">
          <Leaf className="text-green-500" size={24} />
          <h3 className="text-xl font-bold text-green-500">Carbon Credits Marketplace</h3>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          Search for verified carbon offset projects and carbon removal credits
        </p>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500/50 outline-none transition-all"
              placeholder="Search for project types, standards, locations, or methodologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <Search size={18} />
            </div>
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={`suggestion-${index}`}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-300 transition-colors border-b border-gray-700 last:border-0"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center">
                      <Search size={14} className="text-gray-500 mr-2" />
                      <span>{suggestion}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Search Filters */}
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700 hover:border-green-500/30 cursor-pointer transition-colors">
            Project Type ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700 hover:border-green-500/30 cursor-pointer transition-colors">
            Price Range ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700 hover:border-green-500/30 cursor-pointer transition-colors">
            Standard ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700 hover:border-green-500/30 cursor-pointer transition-colors">
            Vintage Year ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700 hover:border-green-500/30 cursor-pointer transition-colors">
            Co-benefits ▾
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="p-4 border-t border-green-500/10">
          <div className="text-sm text-gray-400 mb-3">
            Found {searchResults.length} carbon credit projects for "{searchQuery}"
          </div>
          
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <div 
                key={`result-${index}`}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-green-500/30 transition-all cursor-pointer group animate-in slide-in-from-bottom-4 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getProjectIcon(result.type)}
                      <h4 className="text-green-400 font-medium group-hover:text-green-300 transition-colors">
                        {result.title}
                      </h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{result.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-4">
                    <span className="bg-gray-900/50 text-xs text-gray-400 px-2 py-1 rounded whitespace-nowrap">
                      {result.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${getRatingColor(result.metrics.rating)}`}>
                      {result.metrics.rating}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-gray-900/50 text-xs px-2 py-1 rounded flex items-center">
                      <span className="text-gray-500 mr-1">Standard:</span>
                      <span className="text-green-400">{result.standard}</span>
                    </div>
                    <div className="bg-gray-900/50 text-xs px-2 py-1 rounded flex items-center">
                      <span className="text-gray-500 mr-1">Price:</span>
                      <span className="text-green-400 font-medium">{result.metrics.price}</span>
                    </div>
                    <div className="bg-gray-900/50 text-xs px-2 py-1 rounded flex items-center">
                      <span className="text-gray-500 mr-1">Available:</span>
                      <span className="text-blue-400">{result.metrics.available}</span>
                    </div>
                    <div className="bg-gray-900/50 text-xs px-2 py-1 rounded flex items-center">
                      <span className="text-gray-500 mr-1">Vintage:</span>
                      <span className="text-yellow-400">{result.metrics.vintage}</span>
                    </div>
                  </div>
                  
                  <button className="ml-4 px-3 py-1.5 text-xs border border-green-500/30 text-green-400 rounded hover:bg-green-500/10 hover:border-green-500 transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* No Results State */}
      {searchResults.length === 0 && searchQuery && !isSearching && (
        <div className="p-8 text-center border-t border-green-500/10">
          <Globe className="text-gray-600 mx-auto mb-3" size={48} />
          <p className="text-gray-400 mb-2">No carbon credit projects found</p>
          <p className="text-gray-500 text-sm">
            Try adjusting your search terms or browse our featured projects
          </p>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;