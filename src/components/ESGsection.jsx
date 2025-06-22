import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const esgData = [
  {
    title: "Environmental",
    points: [
      "We prioritize sustainably sourced commodities, especially metals like gold, copper, and silver that power renewable energy and eco-innovation.",
      "Our digital infrastructure reduces carbon emissions by removing the need for excessive physical logistics and paper-based processes.",
      "Recycling and circular economy practices are encouraged in the sourcing of tokenized assets.",
    ],
  },
  {
    title: "Social",
    points: [
      "We democratize investing through fractional ownership, enabling broader access across all income levels.",
      "The platform supports ethical sourcing and fair labor in mining, construction, and the arts.",
      "Community development initiatives are woven into our tokenized asset offerings.",
    ],
  },
  {
    title: "Governance",
    points: [
      "Using blockchain, we ensure transparent, immutable records for every transaction.",
      "Smart contracts enforce compliance and streamline ESG-aligned governance.",
      "Our systems align with global ESG frameworks, including ISSB and other reporting standards.",
    ],
  },
];

const ESGBox = ({ title, points }) => {
  const [pointIndex, setPointIndex] = useState(0);

  const nextPoint = () => {
    setPointIndex((pointIndex + 1) % points.length);
  };

  const prevPoint = () => {
    setPointIndex((pointIndex - 1 + points.length) % points.length);
  };

  return (
    <div className="relative bg-white bg-opacity-70 border border-[#00A86B]/20 shadow-xl shadow-[#00A86B]/30 rounded-xl p-6 backdrop-blur-md w-full max-w-sm text-left flex flex-col items-start transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-4 font-futuristic bg-gradient-to-r from-[#00A86B] via-gray-600 to-[#00A86B] text-transparent bg-clip-text">
        {title}
      </h2>

      <div className="h-32 flex items-center justify-start px-1">
        <AnimatePresence mode="wait">
          <motion.p
            key={pointIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-lg text-[#333333] font-futuristic text-left leading-relaxed"
          >
            {points[pointIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-4 self-start">
        <button
          onClick={prevPoint}
          className="bg-[#00A86B]/10 hover:bg-[#00A86B]/20 p-2 rounded-full border border-[#00A86B]/30 transition"
        >
          <ArrowLeft size={20} className="text-[#00A86B]" />
        </button>
        <button
          onClick={nextPoint}
          className="bg-[#00A86B]/10 hover:bg-[#00A86B]/20 p-2 rounded-full border border-[#00A86B]/30 transition"
        >
          <ArrowRight size={20} className="text-[#00A86B]" />
        </button>
      </div>
    </div>


  );
};

const ESGsection = () => {
  return (
    <section className="relative pt-24 px-4 pb-20 bg-white bg-opacity-30 text-text-primary  mx-4">
      {/* Minimal Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-[6px] bg-green-500/10" />
        <div className="absolute top-1/2 left-0 w-full h-[6px] bg-green-500/10" />
        <div className="absolute bottom-1/4 left-0 w-full h-[6px] bg-green-500/10" />
        <div className="absolute inset-y-0 left-1/3 w-[2px] bg-green-500/10" />
        <div className="absolute inset-y-0 right-1/3 w-[2px] bg-green-500/10" />
      </div>

      {/* ESG Heading */}
      <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#00A86B] via-[#4B5563] to-[#00A86B] z-10 relative">
        Our ESG Commitments
      </h1>

      {/* ESG Sections */}
      <div className="z-10 relative flex flex-col md:flex-row gap-8 justify-center items-center mb-16">
        {esgData.map((section, idx) => (
          <ESGBox key={idx} title={section.title} points={section.points} />
        ))}
      </div>

      {/* Final Section */}
      <div className="z-10 relative max-w-4xl mx-auto text-left bg-white bg-opacity-20 p-8 rounded-2xl border border-[#00A86B]/20  shadow-xl shadow-[#00A86B]/30">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 font-futuristic bg-gradient-to-r from-[#00A86B] via-gray-600 to-[#00A86B] text-transparent bg-clip-text">
          Pioneering Role in Green Finance
        </h2>
        <p className="text-lg md:text-xl text-[#333333] font-futuristic leading-relaxed text-justify">
          We are proud to be the first platform to offer <span className="text-[#00A86B] font-medium">green tokenization</span> of metals, setting a new standard for sustainable commodity investments. This groundbreaking step underscores our leadership in merging traditional assets with <span className="text-[#00A86B] font-medium">cutting-edge blockchain infrastructure</span> for a cleaner, more transparent financial future.
        </p>
      </div>

    </section>
  );
};


export default ESGsection;

