import React, { useState, useEffect } from 'react';

const BlockHeight = () => {
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const fetchHeight = async () => {
      try {
        const response = await fetch('https://zenonhub.io/api/nom/ledger/get-frontier-momentum');
        const data = await response.json();
        if (data && data.data && data.data.height) {
          setHeight(data.data.height);
        }
      } catch (error) {
        console.error('Error fetching blockheight:', error);
      }
    };

    fetchHeight();
    const interval = setInterval(fetchHeight, 10000); // 10s update
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group/tooltip">
      <div className="hidden sm:flex items-center gap-2 bg-[#0C0C0C]/50 px-3 py-1.5 rounded-full border border-white/10 transition-all cursor-help hover:bg-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#11FF44] animate-pulse shadow-[0_0_8px_#11FF44]"></span>
        <span className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-bold whitespace-nowrap">
          {height ? `Momentum ${height.toLocaleString()}` : 'Connecting...'}
        </span>
      </div>
      
      {/* Tooltip text balloon */}
      <div className="absolute top-full right-0 mt-3 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none">
        <div className="bg-[#11FF44] text-black text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded shadow-[0_0_20px_rgba(17,255,68,0.4)] whitespace-nowrap relative">
          Current momentum height
          {/* Tooltip arrow */}
          <div className="absolute -top-1 right-5 w-2.5 h-2.5 bg-[#11FF44] rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default BlockHeight;
