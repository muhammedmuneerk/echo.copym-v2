import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coins } from "lucide-react";

const GoldTokenizationPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 60000); // Show after 35 seconds (slightly after green popup)

    return () => clearTimeout(timer);
  }, []);

  const handleExploreClick = () => {
    setShowPopup(false);
    navigate("/gold-tokenization");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
      <div className="bg-black/90 border border-amber-500/30 shadow-2xl p-8 rounded-2xl max-w-4xl w-full text-white animate-fadeIn backdrop-blur-lg relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-amber-400 text-2xl font-bold transition-colors"
          onClick={() => setShowPopup(false)}
        >
          ×
        </button>

        {/* Responsive content layout */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Text section */}
          <div className="md:w-1/2 space-y-6 text-left">
            <h2 className="font-orbitron text-2xl sm:text-3xl font-bold">
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                {"Gold".split("").map((char, i) => (
                  <span key={`title-1-${i}`} className="ultra-smooth-gradient-text-gold">
                    {char}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {"Tokenization".split("").map((char, i) => (
                  <span key={`title-2-${i}`} className="ultra-smooth-gradient-text-gold">
                    {char}
                  </span>
                ))}
              </div>
            </h2>
            <p className="text-lg text-[#CCCCCC] leading-relaxed">
              Transform physical gold into digital assets with Copym's gold tokenization platform.
              Experience secure, liquid, and transparent gold investment for the digital age.
            </p>
            <div className="flex gap-4">
              <div className="relative rounded-full p-[2px] bg-[linear-gradient(90deg,rgba(218,165,32,0.7)_0%,rgba(255,215,0,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]">
                <div className="bg-black rounded-full w-full h-full">
                  <button
                    onClick={handleExploreClick}
                    className="rounded-full px-8 py-3 font-semibold w-full text-white backdrop-blur-md bg-white/5 hover:bg-white/10 whitespace-nowrap"
                  >
                    Explore Gold Tokenization
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gold Icon Animation */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-400/20 rounded-full animate-pulse"></div>
              <Coins className="w-24 h-24 text-amber-400 animate-float" />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ultra-smooth-gradient-text-gold {
          display: inline-block;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          background-image: linear-gradient(
            90deg,
            rgb(218, 165, 32) 0%,
            rgba(255, 215, 0, 0.8) 100%
          );
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GoldTokenizationPopup;
