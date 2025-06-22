import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./RealEstateTokenization"; // Import Card from main file

const PropertyCard = ({ 
  property,
  animateTokens,
  onNext,
  onPrev
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Reset details when property changes
  useEffect(() => {
    setIsDetailsOpen(false);
  }, [property]);

  const renderTokenDistributionChart = () => {
    const totalColumns = 10;
    const totalRows = 10;
    const soldPercentage = property.soldPercentage;
    const totalCells = totalColumns * totalRows;
    const filledCells = Math.round((soldPercentage / 100) * totalCells);
    const cells = [];
    let cellCounter = 0;

    for (let row = 0; row < totalRows; row++) {
      for (let col = 0; col < totalColumns; col++) {
        cellCounter++;
        cells.push(
          <motion.div
            key={`${row}-${col}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              backgroundColor: cellCounter <= filledCells 
                ? "#10b981" 
                : "rgba(107, 114, 128, 0.3)" 
            }}
            transition={{ 
              duration: 0.5, 
              delay: cellCounter * 0.004 * (animateTokens ? 1 : 0) 
            }}
            className="h-4 rounded-sm backdrop-blur-sm"
          />
        );
      }
    }
    return cells;
  };

  return (
    <Card as3D={true} className="group overflow-hidden">
      <div className="relative">
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">{property.name}</h3>
              <p className="text-emerald-100">
                {property.location} • {property.type}
              </p>
            </div>
            <div className="flex">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black bg-opacity-30 p-2 rounded-full mr-2 hover:bg-opacity-50 transition-all duration-300"
                onClick={onPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all duration-300"
                onClick={onNext}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <p className="text-gray-500 text-sm">Property Value</p>
              <p className="text-lg flex items-center text-white">
                <span className="text-emerald-500 mr-1">$</span>
                {property.value}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Tokens</p>
              <p className="text-lg text-white">{property.tokens}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Investors</p>
              <p className="text-lg flex items-center text-white">
                <span className="text-emerald-500 mr-1">👤</span>
                {property.investors}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <p className="text-gray-400">Token Distribution</p>
              <p className="text-white">
                Token Price <span className="text-emerald-500">$100</span>
              </p>
            </div>

            <div className="grid grid-cols-10 gap-1 mb-2 p-1 rounded-md bg-black bg-opacity-40">
              {renderTokenDistributionChart()}
            </div>

            <div className="flex justify-between mt-2">
              <p className="text-sm text-emerald-500">
                {property.soldPercentage}% Sold
              </p>
              <p className="text-sm text-gray-400">
                {100 - property.soldPercentage}% Available
              </p>
            </div>
          </div>

          <motion.button
            className="flex justify-between items-center w-full bg-[#1a1a1a] hover:bg-[#222] p-4 rounded-md mb-4 transition-all duration-300"
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            whileHover={{ backgroundColor: "rgba(40, 40, 40, 0.8)" }}
          >
            <span className="font-medium">Property Details</span>
            <motion.div
              animate={{ rotate: isDetailsOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isDetailsOpen ? "auto" : 0,
              opacity: isDetailsOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-[#1a1a1a] -mt-4 mb-4 p-5 rounded-b-md">
              <div className="mb-4">
                <p className="text-gray-400 text-sm">Expected Returns</p>
                <p className="text-white">{property.expectedReturns}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-3">Tokenization Benefits</p>
                <ul className="space-y-2">
                  {[
                    "Fractional ownership starting from $100",
                    "Secondary market trading for liquidity",
                    "Automated dividend distributions",
                    "Transparent ownership records",
                  ].map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <span className="text-emerald-500 mr-2">→</span>
                      <span className="text-gray-300">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <button className="bg-[#001a12]/10 backdrop-blur-lg text-[#DDFFDD] px-8 py-3 rounded-full font-medium transition-all border border-[#00A86B]/30 shadow-[0_0_15px_rgba(0,168,107,0.1)] hover:shadow-[0_0_25px_rgba(0,168,107,0.2)] hover:bg-[#001a12]/20 hover:scale-105 w-full group">
            <span className="flex items-center justify-center">
              View Investment Opportunity
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </Card>
  );
};




export default PropertyCard;