import React from 'react';
import { motion } from 'framer-motion';
import { Link, Scales, LockKeyOpen, Lightning } from '@phosphor-icons/react';

const values = [
  {
    icon: Link,
    number: "01",
    title: "Bitcoin Alignment",
    description: "Zenon doesn't compete with Bitcoin. It extends its reach. By anchoring to Bitcoin's proof-of-work, NoM inherits its security without replicating its limitations."
  },
  {
    icon: Scales,
    number: "02",
    title: "Fairness",
    description: "No premine. No VC allocation. No trusted setup. ZNN and QSR entered circulation through community participation alone — the way it should be."
  },
  {
    icon: LockKeyOpen,
    number: "03",
    title: "Permissionless",
    description: "Anyone can run a node, build a dApp, or submit a funding proposal. Accelerator-Z puts governance and capital in the hands of the community, not a foundation."
  },
  {
    icon: Lightning,
    number: "04",
    title: "Feeless by Design",
    description: "The Plasma mechanism eliminates transaction fees without compromising security. Building on NoM shouldn't cost you anything."
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const HeaderVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30, y: 30, scale: 0.9 },
  show: { 
    opacity: 1, 
    x: 0,
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 } 
  }
};

const VisionValues = () => {
  return (
    <motion.div 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: false, amount: 0.1, margin: "-100px" }}
    >
      <motion.div variants={HeaderVariants} className="mb-12">
        <h3 className="text-xl font-mono text-white tracking-widest uppercase pb-6 border-b border-white/10 flex items-center gap-3">
          VALUES
          <div className="w-12 h-[1px] bg-gradient-to-r from-[#11FF44] to-transparent"></div>
        </h3>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative"
      >
        {values.map((val, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-10 rounded-lg bg-[#11FF44]/10 border border-[#11FF44]/20 flex items-center justify-center group-hover:bg-[#11FF44] group-hover:border-[#11FF44] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(17,255,68,0.5)]">
                <val.icon weight="duotone" className="w-6 h-6 text-[#11FF44] group-hover:text-black transition-colors" />
              </div>
              <span className="text-xs font-mono text-gray-500 tracking-widest font-bold group-hover:text-[#11FF44] transition-colors">
                {val.number}
              </span>
            </div>
            <h4 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-[#11FF44] transition-colors duration-300">
              {val.title}
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light">
              {val.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default VisionValues;
