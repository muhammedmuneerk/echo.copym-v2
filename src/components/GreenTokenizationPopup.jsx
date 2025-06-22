import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobeAnimation from "./GreenGlobe";

const GreenTokenizationPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000); // Show after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleExploreClick = () => {
    setShowPopup(false);
    navigate("/green-tokenization");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
      <div className="bg-black/90 border border-[#00A86B]/30 shadow-2xl p-6 rounded-2xl max-w-3xl w-full text-white animate-fadeIn backdrop-blur-lg relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-300 hover:text-[#00A86B] text-xl font-bold transition-colors"
          onClick={() => setShowPopup(false)}
        >
          ×
        </button>

        {/* Responsive content layout */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-6">
          {/* Text section */}
          <div className="md:w-1/2 space-y-4 text-left">
            <h2 className="font-orbitron text-xl sm:text-2xl font-bold">
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                {"Green".split("").map((char, i) => (
                  <span key={`title-1-${i}`} className="ultra-smooth-gradient-text">
                    {char}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {"Tokenization".split("").map((char, i) => (
                  <span key={`title-2-${i}`} className="ultra-smooth-gradient-text">
                    {char}
                  </span>
                ))}
              </div>
            </h2>
            <p className="text-base text-[#CCCCCC] leading-relaxed">
              Copym is the world's first platform to introduce green tokenization.
              Empowering sustainability through blockchain. Let's invest for a cleaner,
              greener future.
            </p>
            <div className="flex gap-3">
              <div className="relative rounded-full p-[2px] bg-[linear-gradient(90deg,rgba(1,132,58,0.73)_0%,rgba(0,255,132,0.6)_100%)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,132,0.5)]">
                <div className="bg-black rounded-full w-full h-full">
                  <button
                    onClick={handleExploreClick}
                    className="rounded-full px-6 py-2 font-semibold w-full text-white backdrop-blur-md bg-white/5 hover:bg-white/10 whitespace-nowrap text-sm"
                  >
                    Explore Green Tokenization
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Globe animation (on top for mobile) */}
          <div className="md:w-1/2 flex justify-center">
            <GlobeAnimation size={0.9} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ultra-smooth-gradient-text {
          display: inline-block;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          background-image: linear-gradient(
            90deg,
            rgb(95, 155, 121) 0%,
            rgba(0, 255, 132, 0.6) 100%
          );
        }
      `}</style>
    </div>
  );
};

export default GreenTokenizationPopup;
