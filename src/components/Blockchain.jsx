import React from "react";
import { motion } from "framer-motion";

const Blockchain = () => {
  return (
    <section className=" py-20 px-4">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unified Access to{" "}
            <span className="gradient-text">All Major Blockchains</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {["Solana", "Ethereum", "Binance", "Cardano", "Optimism"].map(
            (chain, index) => (
              <motion.div
                key={chain}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-lighter p-6 rounded-lg text-center"
              >
                <div className="h-16 w-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary">{chain[0]}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{chain}</h3>
                <p className="text-sm text-gray-400">
                  Full support for {chain} ecosystem
                </p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Blockchain;
