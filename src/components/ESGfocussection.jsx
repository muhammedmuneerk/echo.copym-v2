import React from "react";

const ESGFocusSection = () => {
  return (
    <section className="relative px-4 py-20  text-[#333] overflow-hidden z-10 space-y-24">
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-[2px] bg-green-500/10" />
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-green-500/10" />
        <div className="absolute bottom-1/4 left-0 w-full h-[2px] bg-green-500/10" />
        <div className="absolute inset-y-0 left-1/3 w-[2px] bg-green-500/10" />
        <div className="absolute inset-y-0 right-1/3 w-[2px] bg-green-500/10" />
      </div>

      {/* Section 1: Focus on Metals */}
      <div className="z-10 relative max-w-4xl mx-auto text-left bg-white bg-opacity-20 p-8 rounded-2xl border border-[#00A86B]/20  shadow-xl shadow-[#00A86B]/30">
        <div className="md:w-1/2">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00A86B] via-gray-600 to-[#00A86B] text-transparent bg-clip-text font-futuristic mb-4">
            Focus on Metals: Our Core Offering
          </h2>
          <p className="text-lg font-futuristic text-justify mb-4">
            <span className="text-[#00A86B] font-semibold">Metals</span> are at the center of our strategy due to their critical role in sustainable technology:
          </p>
          <p className="text-base font-futuristic text-justify">
            Each tokenized metal is vetted for <span className="text-[#00A86B] font-medium">sustainable sourcing</span>, traceability, and environmental impact, with transparent records across the value chain.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/images/metal-use-case.jpg" alt="Metal Use Case" className="rounded-xl shadow-md" />
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-green-400/10 mx-auto w-3/4" />

      {/* Section 2: Diversified ESG Portfolio */}
      <div className="z-10 relative max-w-4xl mx-auto text-left bg-white bg-opacity-20 p-8 rounded-2xl border border-[#00A86B]/20  shadow-xl shadow-[#00A86B]/30">
        <div className="md:w-1/2">
          <img src="/images/esg-diversified.jpg" alt="Diversified ESG Portfolio" className="rounded-xl shadow-md" />
        </div>
        <div className="md:w-1/2">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00A86B] via-gray-600 to-[#00A86B] text-transparent bg-clip-text font-futuristic mb-4">
            Diversified ESG Commodities Portfolio
          </h2>
          <p className="text-lg font-futuristic text-justify">
            While <span className="text-[#00A86B] font-semibold">metals</span> are our flagship, we are expanding into other ESG-aligned asset categories. This diversified approach ensures investors can build a balanced and impactful <span className="text-[#00A86B] font-medium">ESG portfolio</span>.
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-green-400/10 mx-auto w-3/4" />

      {/* Section 3: Blockchain Role */}
      <div className="z-10 relative max-w-4xl mx-auto text-left bg-white bg-opacity-20 p-8 rounded-2xl border border-[#00A86B]/20  shadow-xl shadow-[#00A86B]/30">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00A86B] via-gray-600 to-[#00A86B] text-transparent bg-clip-text font-futuristic mb-6">
          The Role of Blockchain
        </h2>
        <ul className="text-lg font-futuristic text-justify space-y-2 max-w-3xl mx-auto">
          <li><strong className="text-[#00A86B]">• Traceability:</strong> Every asset’s lifecycle is visible, preventing greenwashing.</li>
          <li><strong className="text-[#00A86B]">• Liquidity:</strong> Tokenized assets are tradable 24/7 with global reach.</li>
          <li><strong className="text-[#00A86B]">• Security:</strong> Smart contracts ensure direct, tamper-proof ownership and compliance.</li>
          <li><strong className="text-[#00A86B]">• Accessibility:</strong> Lower entry points via fractionalization expand participation in ESG investing.</li>
        </ul>
      </div>

      {/* Divider */}
      <hr className="border-t border-green-400/10 mx-auto w-3/4" />

      {/* Section 4: Comparative Snapshot */}
      <div className="relative max-w-6xl mx-auto text-center bg-white bg-opacity-70 p-8 rounded-2xl border border-[#00A86B]/20 backdrop-blur-md shadow-lg shadow-green-300/10">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00A86B] via-gray-600 to-[#00A86B] text-transparent bg-clip-text font-futuristic mb-6">
          Comparative Snapshot: Metals vs. Other ESG Assets
        </h2>
        <img src="/images/metals-vs-esg.jpg" alt="Metals vs ESG Comparison" className="mx-auto rounded-xl shadow-md" />
        <p className="text-lg font-futuristic text-justify mt-4">
          This clear focus ensures <span className="text-[#00A86B] font-semibold">metals</span> lead our impact, with complementary assets scaling the platform’s ESG reach.
        </p>
      </div>
    </section>
  );
};

export default ESGFocusSection;

