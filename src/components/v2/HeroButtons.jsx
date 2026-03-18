import React from 'react';
import { motion } from 'framer-motion';

const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 w-full">
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        href="#learn"
        className="px-10 py-4 bg-[#11FF44] text-[#0C0C0C] font-bold text-center text-lg rounded transition-all flex-1 sm:flex-none shadow-[0_0_20px_rgba(17,255,68,0.4)]"
      >
        Why Zenon?
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        href="/build"
        className="px-10 py-4 border border-[#1C7C54] text-[#DEF4C6] bg-transparent font-bold text-center text-lg rounded hover:border-[#11FF44]/50 hover:bg-[#11FF44]/5 transition-all flex-1 sm:flex-none flex items-center justify-center gap-3 group"
      >
        Start Building
        <svg className="w-5 h-5 text-[#11FF44] group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </motion.a>
    </div>
  );
};

export default HeroButtons;
