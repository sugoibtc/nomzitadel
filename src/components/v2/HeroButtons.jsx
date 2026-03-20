import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';

const HeroButtons = () => {
  const handleWhyZenon = (e) => {
    e.preventDefault();
    const visionSection = document.getElementById('vision');
    if (visionSection) {
      // Dynamic transition using native smooth scroll
      visionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex flex-col sm:flex-row gap-5 w-full"
    >
      <motion.a
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(17,255,68,0.6)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        href="#vision"
        onClick={handleWhyZenon}
        className="px-10 py-4 bg-[#11FF44] text-[#0C0C0C] font-bold text-center text-lg rounded transition-all flex-1 sm:flex-none shadow-[0_0_20px_rgba(17,255,68,0.4)] flex items-center justify-center gap-2 group"
      >
        <Sparkle weight="fill" className="w-5 h-5 text-[#0C0C0C] group-hover:rotate-12 transition-transform" />
        Why Zenon?
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.05, borderColor: "rgba(17,255,68,0.8)", backgroundColor: "rgba(17,255,68,0.1)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        href="/build"
        className="px-10 py-4 border border-[#1C7C54] text-[#DEF4C6] bg-transparent font-bold text-center text-lg rounded transition-all flex-1 sm:flex-none flex items-center justify-center gap-3 group"
      >
        Start Building
        <ArrowRight weight="bold" className="w-5 h-5 text-[#11FF44] group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
      </motion.a>
    </motion.div>
  );
};

export default HeroButtons;
