import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

// Advanced Search Component for Private Equity
const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  // Sample suggestion data for private equity
  const sampleSuggestions = [
    "growth equity opportunities in SaaS",
    "buyout targets with EBITDA over $50M",
    "distressed debt investments healthcare",
    "mid-market manufacturing acquisitions",
    "technology sector venture capital deals",
    "portfolio companies with ESG focus",
    "secondary market fund investments",
    "infrastructure and energy investments"
  ];
  
  // Sample search results for private equity
  const generateSearchResults = (query) => {
    if (!query.trim()) return [];
    
    const baseResults = [
      {
        title: "TechGrowth Partners Fund IV",
        description: "Growth equity fund focused on B2B SaaS companies with $10M+ ARR, targeting 20-40% ownership stakes.",
        type: "Growth Equity",
        metrics: { fundSize: "$750M", targetReturns: "20-25% IRR", holdPeriod: "4-7 years" }
      },
      {
        title: "Industrial Manufacturing Platform",
        description: "Mid-market manufacturing platform with strong cash flow generation, seeking add-on acquisitions.",
        type: "Buyout",
        metrics: { revenue: "$180M TTM", ebitda: "$32M", multiple: "8.5x EBITDA" }
      },
      {
        title: "Healthcare Services Portfolio",
        description: "Diversified healthcare services platform with defensive characteristics and demographic tailwinds.",
        type: "Healthcare PE",
        metrics: { locations: "45+ facilities", growth: "12% CAGR", margins: "28% EBITDA" }
      },
      {
        title: "Distressed Credit Opportunity Fund",
        description: "Opportunistic credit strategy targeting stressed and distressed situations across multiple sectors.",
        type: "Distressed Debt",
        metrics: { targetYield: "15-20%", recovery: "65-85%", duration: "18-36 months" }
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
  
  return (
    <div className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-purple-500/20">
        <h3 className="text-xl font-bold text-purple-500">Private Equity Deal Search</h3>
        <p className="text-gray-400 text-sm mt-1">Search for funds, portfolio companies, and investment opportunities</p>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
              placeholder="Search for investment strategies, sectors, fund sizes, or deal types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <Search size={18} />
            </div>
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Strategy Type ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Fund Size ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Sector Focus ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Geography ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Investment Stage ▾
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="p-4 border-t border-blue-500/10">
          <div className="text-sm text-gray-400 mb-3">
            Found {searchResults.length} results for "{searchQuery}"
          </div>
          
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <div 
                key={`result-${index}`}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500/30 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-blue-500 font-medium">{result.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{result.description}</p>
                  </div>
                  <span className="bg-gray-900/50 text-xs text-gray-400 px-2 py-1 rounded">
                    {result.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-3">
                  {Object.entries(result.metrics).map(([key, value], i) => (
                    <div 
                      key={`metric-${index}-${i}`}
                      className="bg-gray-900/50 text-xs px-2 py-1 rounded flex items-center"
                    >
                      <span className="text-gray-500 mr-1">{key}:</span>
                      <span className="text-blue-500">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;