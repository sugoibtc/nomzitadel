import React from 'react';
import { motion } from 'framer-motion';

const HeroText = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,  // Slower stagger (was 0.15)
        delayChildren: 0.2,     // Slightly more initial delay
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 50, damping: 20, duration: 1.5 } // Slower spring easing
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center text-center lg:items-start lg:text-left relative z-20"
    >
      <motion.div variants={item} className="absolute -top-16 lg:-top-14 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 inline-flex items-center gap-3 px-3 py-1 bg-[#1A1A1A]/40 text-[#11FF44] font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase rounded-sm border border-[#11FF44]/20 shadow-[0_0_15px_rgba(17,255,68,0.1)] backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#11FF44] shadow-[0_0_8px_rgba(17,255,68,0.8)] animate-pulse"></span>
        Network Status: Operational
      </motion.div>

      <motion.h1 
        variants={item}
        className="text-4xl sm:text-6xl md:text-8xl xl:text-[7.5rem] font-black text-white mb-8 lg:mb-12 leading-[1.1] lg:leading-[0.9] tracking-tighter"
      >
        Stay Ahead of the <br/>
        <span className="text-[#11FF44] text-glow inline-block mt-4 border-b-[6px] lg:border-b-[10px] border-[#11FF44] pb-2 lg:pb-4 shadow-[#11FF44]/20">Momentum</span>
      </motion.h1>

      <motion.p 
        variants={item}
        className="text-xl xl:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed"
      >
        The definitive resource hub for everything Zenon. Connect, learn, build, and create the future of the Network of Momentum.
      </motion.p>
    </motion.div>
  );
};

export default HeroText;
