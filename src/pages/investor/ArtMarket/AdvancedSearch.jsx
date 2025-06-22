import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

// Advanced Search Component for Art & Collectibles
const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  // Sample suggestion data for art and collectibles
  const sampleSuggestions = [
    "contemporary paintings by emerging artists",
    "vintage collectible coins and currency",
    "rare books and first edition manuscripts",
    "mid-century modern furniture and design",
    "antique jewelry and precious stones",
    "sports memorabilia and trading cards",
    "fine art photography prints",
    "ceramic pottery and sculptural works",
    "vintage posters and advertising art",
    "investment grade art under $10,000"
  ];
  
  // Sample search results for art and collectibles
  const generateSearchResults = (query) => {
    if (!query.trim()) return [];
    
    const baseResults = [
      {
        title: "Contemporary Abstract Oil Painting",
        description: "Original abstract expressionist oil painting by emerging artist, featuring bold colors and dynamic composition.",
        type: "Fine Art",
        metrics: { medium: "Oil on Canvas", size: "36\" x 48\"", year: "2023", condition: "Excellent" }
      },
      {
        title: "Rare 1st Edition Hemingway Collection",
        description: "First edition copies of Hemingway's major works including 'The Sun Also Rises' and 'A Farewell to Arms'.",
        type: "Books & Manuscripts",
        metrics: { condition: "Near Fine", provenance: "Documented", rarity: "Very Rare", value: "$15,000-$25,000" }
      },
      {
        title: "Mid-Century Eames Lounge Chair",
        description: "Authentic Herman Miller Eames Lounge Chair and Ottoman in original black leather with rosewood veneer.",
        type: "Design & Furniture",
        metrics: { year: "1960s", manufacturer: "Herman Miller", condition: "Restored", authenticity: "Verified" }
      },
      {
        title: "Vintage Baseball Card Collection",
        description: "Premium collection of 1950s-60s baseball cards including Mickey Mantle and Willie Mays rookie cards.",
        type: "Sports Memorabilia",
        metrics: { era: "1950s-60s", grade: "PSA 8-9", quantity: "127 cards", featured: "Hall of Fame Players" }
      },
      {
        title: "Art Deco Silver Jewelry Set",
        description: "Exquisite 1920s Art Deco sterling silver necklace and earring set with geometric design and marcasite accents.",
        type: "Jewelry & Accessories",
        metrics: { material: "Sterling Silver", era: "1920s", style: "Art Deco", hallmark: "Authenticated" }
      },
      {
        title: "Limited Edition Photography Print",
        description: "Ansel Adams 'Moonrise, Hernandez' limited edition gelatin silver print, numbered and estate stamped.",
        type: "Photography",
        metrics: { edition: "75/250", size: "16\" x 20\"", technique: "Gelatin Silver", estate: "Authenticated" }
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
    <div className="bg-gray-900 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-purple-500/20">
        <h3 className="text-xl font-bold text-purple-400">Art & Collectibles Search</h3>
        <p className="text-gray-400 text-sm mt-1">Discover fine art, vintage collectibles, and investment-grade pieces</p>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
              placeholder="Search for artists, mediums, periods, styles, or specific pieces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <Search size={18} />
            </div>
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
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
            Category ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Price Range ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Time Period ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Medium ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Condition ▾
          </div>
          <div className="bg-gray-800/50 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-700">
            Provenance ▾
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="p-4 border-t border-purple-500/10">
          <div className="text-sm text-gray-400 mb-3">
            Found {searchResults.length} results for "{searchQuery}"
          </div>
          
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <div 
                key={`result-${index}`}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-purple-500/30 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-purple-400 font-medium">{result.title}</h4>
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
                      <span className="text-gray-500 mr-1 capitalize">{key}:</span>
                      <span className="text-purple-400">{value}</span>
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