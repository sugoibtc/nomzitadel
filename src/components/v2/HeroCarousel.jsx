import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Featured', 'Build', 'Resources'];

const HeroCarousel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [lastTab, setLastTab] = useState(0);

  // Auto-rotate every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setLastTab(activeTab);
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [activeTab]);

  const slideVariants = {
    hidden: (direction) => ({
      opacity: 0,
      y: 10,
    }),
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: (direction) => ({
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: 'easeIn' },
    }),
  };

  const direction = activeTab > lastTab ? 1 : -1;

  const handleTabChange = (index) => {
    setLastTab(activeTab);
    setActiveTab(index);
  };

  const nextTab = () => {
    setLastTab(activeTab);
    setActiveTab((prev) => (prev + 1) % tabs.length);
  };

  const prevTab = () => {
    setLastTab(activeTab);
    setActiveTab((prev) => (prev + tabs.length - 1) % tabs.length);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 sm:gap-8 pt-2 pb-2 group/carousel px-4 lg:px-0">
      
      {/* Content Panel (Cards) */}
      <div className="flex-1 relative min-h-[460px] sm:min-h-[500px]">
        {/* Navigation Arrows (Outside the box) */}
        <button 
          onClick={prevTab}
          className="absolute left-[-30px] lg:left-[-64px] top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#0C0C0C]/80 border border-white/10 flex items-center justify-center text-white hover:text-[#11FF44] hover:border-[#11FF44]/40 transition-all opacity-0 group-hover/carousel:opacity-100 backdrop-blur-md hidden sm:flex"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>

        <button 
          onClick={nextTab}
          className="absolute right-[-30px] lg:right-[-64px] top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#0C0C0C]/80 border border-white/10 flex items-center justify-center text-white hover:text-[#11FF44] hover:border-[#11FF44]/40 transition-all opacity-0 group-hover/carousel:opacity-100 backdrop-blur-md hidden sm:flex"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </button>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full"
          >
            {/* 0 = Featured Updates */}
            {activeTab === 0 && (
              <div className="flex flex-col gap-4 sm:gap-6 w-full h-full">
                {/* Large Card (Top) */}
                <a href="#research" className="flex-1 relative group rounded-2xl sm:rounded-3xl overflow-hidden border border-[#1C7C54]/40 bg-[#0a0a0a] hover:border-[#11FF44]/50 transition-all min-h-[200px] block shadow-2xl">
                  <img src="/hero-city.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700 mix-blend-screen" alt="Architecture" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-black/40 to-transparent z-10"></div>
                  
                  {/* Read Time & Arrow */}
                  <div className="absolute top-5 right-5 z-20 flex items-center gap-3">
                     <span className="text-xs text-white/80 font-medium bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">5 min read</span>
                     <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-[#11FF44]/50 group-hover:bg-[#11FF44]/10 transition-colors">
                       <svg className="w-4 h-4 text-white group-hover:text-[#11FF44]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                     </div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 sm:p-8 z-20 w-full">
                    <span className="inline-block text-[10px] sm:text-xs font-bold text-black bg-[#11FF44] uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-[0_0_15px_rgba(17,255,68,0.4)]">Architecture</span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-[#11FF44] transition-colors leading-[1.15] max-w-xl">The Road to Phase Z: Scaling Decentralization</h3>
                  </div>
                </a>

                {/* Bottom Row: 2 Small Cards */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 h-[180px] sm:h-[200px] shrink-0">
                  {/* Small Card 1 */}
                  <a href="#research" className="col-span-1 relative group rounded-2xl sm:rounded-[1.25rem] overflow-hidden border border-[#1C7C54]/30 bg-[#080808] hover:border-[#11FF44]/40 transition-all h-full block shadow-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(17,255,68,0.06)_0%,transparent_70%))]"></div>
                    <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end z-20">
                      <div className="mb-auto">
                        <span className="text-[9px] sm:text-[10px] font-bold text-[#11FF44] uppercase tracking-widest border border-[#11FF44]/20 bg-[#11FF44]/5 px-2.5 py-1 rounded-full">BTC + Zenon</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#11FF44] transition-colors leading-tight mb-2">Why New Tokens?</h3>
                      <p className="text-xs sm:text-sm text-[#A1A1AA] line-clamp-2 hidden sm:block">What Zenon Has to Do With Bitcoin answered.</p>
                    </div>
                  </a>
                  {/* Small Card 2 */}
                  <a href="#research" className="col-span-1 relative group rounded-2xl sm:rounded-[1.25rem] overflow-hidden border border-[#1C7C54]/30 bg-[#080808] hover:border-[#11FF44]/40 transition-all h-full block shadow-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(17,255,68,0.06)_0%,transparent_70%))]"></div>
                    <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end z-20">
                      <div className="mb-auto">
                        <span className="text-[9px] sm:text-[10px] font-bold text-[#11FF44] uppercase tracking-widest border border-[#11FF44]/20 bg-[#11FF44]/5 px-2.5 py-1 rounded-full">Interop</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#11FF44] transition-colors leading-tight mb-2">Bitcoin Interpol</h3>
                      <p className="text-xs sm:text-sm text-[#A1A1AA] line-clamp-2 hidden sm:block">The Security of Dual-Ledger.</p>
                    </div>
                  </a>
                </div>
              </div>
            )}

            {/* 1 = Build */}
            {activeTab === 1 && (
              <div className="flex flex-col h-full rounded-2xl sm:rounded-3xl border border-[#1C7C54]/30 bg-[#0C0C0C]/80 p-6 sm:p-8 shadow-xl backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(17,255,68,0.03)_0%,transparent_80%))]"></div>
                <div className="relative z-10 w-full">
                  <div className="font-mono text-xs uppercase text-[#11FF44] tracking-widest mb-4">Open Bounties</div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center p-4 bg-[#080808] border border-[#1C7C54]/20 rounded-xl hover:border-[#11FF44]/40 cursor-pointer transition-colors group">
                      <span className="text-sm font-semibold text-[#DEF4C6] group-hover:text-[#11FF44]">Rust SDK WebSocket Integration</span>
                      <span className="text-xs font-mono text-[#11FF44] font-bold bg-[#11FF44]/10 px-3 py-1 rounded-md">2,000 ZNN</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#080808] border border-[#1C7C54]/20 rounded-xl hover:border-[#11FF44]/40 cursor-pointer transition-colors group">
                      <span className="text-sm font-semibold text-[#DEF4C6] group-hover:text-[#11FF44]">SPV Wallet Implementation</span>
                      <span className="text-xs font-mono text-[#11FF44] font-bold bg-[#11FF44]/10 px-3 py-1 rounded-md">5,000 ZNN</span>
                    </div>
                  </div>

                  <div className="border-t border-[#1C7C54]/20 my-8"></div>

                  <div className="font-mono text-xs uppercase text-[#11FF44] tracking-widest mb-3">Get Funded Via AZ</div>
                  <p className="text-[#A1A1AA] text-sm mb-6 leading-relaxed">
                    Submit your proposals to Accelerator-Z to get community-backed funding directly from the protocol.
                  </p>
                  <a href="#fund" className="inline-flex items-center gap-2 text-black bg-[#11FF44] hover:bg-white text-sm font-bold uppercase tracking-widest transition-colors group px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(17,255,68,0.3)]">
                    Learn how to apply
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            )}

            {/* 2 = Resources */}
            {activeTab === 2 && (
              <div className="flex flex-col h-full rounded-2xl sm:rounded-3xl border border-[#1C7C54]/30 bg-[#0C0C0C]/80 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 items-start relative z-10 w-full h-full content-center">
                  {[
                    { label: 'Whitepaper', sub: 'Protocol Specs' },
                    { label: 'SDK Docs', sub: 'Dart, Go, Rust' },
                    { label: 'GitHub', sub: 'Core Repos' },
                    { label: 'Zenon Wiki', sub: 'Ecosystem Docs' },
                    { label: 'AZ Portal', sub: 'Funding Grants' },
                    { label: 'Dev Commons', sub: 'HC1 Forum' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-center group cursor-pointer p-3 rounded-xl border border-transparent hover:border-[#1C7C54]/50 hover:bg-[#1C7C54]/10 transition-colors">
                      <div className="w-12 h-12 shrink-0 rounded-full bg-[#080808] border border-[#1C7C54]/30 flex items-center justify-center group-hover:border-[#11FF44]/50 group-hover:shadow-[0_0_10px_rgba(17,255,68,0.2)] transition-all">
                         <svg className="w-5 h-5 text-[#11FF44]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                      </div>
                      <div>
                        <div className="text-[#DEF4C6] text-sm sm:text-base font-bold group-hover:text-[#11FF44] transition-colors">{item.label}</div>
                        <div className="text-[#A1A1AA] font-mono text-[10px] sm:text-xs mt-1">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Horizontal Nav Bar (Bottom) */}
      <div className="w-full flex justify-center items-center gap-8 sm:gap-12 overflow-x-auto hide-scrollbar z-20 pt-4 pb-0">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => handleTabChange(idx)}
            className="flex flex-col items-center gap-3 group relative cursor-pointer"
          >
            {/* Dot Indicator */}
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeTab === idx 
                ? 'bg-[#11FF44] shadow-[0_0_12px_#11FF44] scale-150' 
                : 'bg-[#0a0a0a] border border-[#1C7C54]/50 group-hover:bg-[#1C7C54]/50'
            }`}></div>
            
            <span 
              className={`text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${
                activeTab === idx 
                  ? 'text-[#11FF44] drop-shadow-[0_0_8px_rgba(17,255,68,0.5)]' 
                  : 'text-[#52525B] group-hover:text-[#A1A1AA]'
              }`}
            >
              {tab}
            </span>
          </button>
        ))}
      </div>
      
    </div>
  );
};

export default HeroCarousel;
