import React, { useEffect, useRef } from 'react';

const asciiArt = [
  "  ,zzzzzzzzzzzzzzzzzzzzzzzz,      ",
  "  ,zzzzzzzzzzzzzzzzzzzzzzzz,      ",
  "              .:1zzzzzzzzz.       ",
  "            .:qqzzzzqqq,          ",
  "         ,;1zzzzzqqq,             ",
  "      ,;1zzzzzqqq,                ",
  "   ,;qzzzzz1qq,                   ",
  "  ,zzzzzzzzzzzzzzzzzzzzzzzz,      ",
  "  ,zzzzzzzzzzzzzzzzzzzzzzzz,      ",
  "  ,zzzzzq;.           1zzzz,      ",
  "  ,zzzzzzzzq,         1zzzz,      ",
  "  ,zzzzzzzzzz1:       1zzzz,      ",
  "  ,zzzzq:1zzzzzq;.    1zzzz,      ",
  "  ,zzzzq  ,qzzzzzz1,  1zzzz,      ",
  "  ,zzzzq    .;qzzzzzq:1zzzz,      ",
  "  ,zzzzq       ,qzzzzzzzzzz,      ",
  "  ,zzzzq         .;qzzzzzzz,      ",
  "  ,zzzzq         .;qzzzzzzz,      "
];

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set initial canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Use characters exclusively from the 4 Treasure Hunt OP_RETURN codes
    const opCodes = ";tVMd3L1CKM4wFmyxEEEUV2bY;;BynQtpeUyWTXKGTrGhdV2Q==;,vtv3f5aKY0jGQglP9a1AGw==.;4Fdzw1k=zzzzzzzzzzzzzzzz;";
    const characters = Array.from(new Set(opCodes.split('')));
    const fontSize = 16;
    // Standard monospace aspect ratio typically ~0.6 of font size
    const charWidth = 9.6; 
    let columns = Math.floor(canvas.width / charWidth);
    let rows = Math.floor(canvas.height / fontSize);
    let drops = [];
    
    for (let x = 0; x < columns; x++) {
      // Stagger the initial drops so they fall at different times
      drops[x] = Math.floor(Math.random() * -50);
    }

    let logoFinishedTime = null;
    let sentenceFinishedTime = null;
    let sentenceCycleEndTime = null;
    const rabbitPhrase = "follow the green rabbit . . . ";
    const totalLogoChars = asciiArt.reduce((sum, line) => sum + line.split('').filter(c => c !== ' ').length, 0);
    const nonSpaceRabbitChars = rabbitPhrase.split('').filter(c => c !== ' ').length;
    let revealedAscii = new Set();
    let revealedEgg = new Set(); // Tracks revealed rabbit phrase columns
    
    const draw = () => {
      // Slower fade effect for older raindrops
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate start offsets for centering the ASCII art without distortion
      const asciiWidth = Math.max(...asciiArt.map(line => line.length));
      const asciiHeight = asciiArt.length;
      
      const startCol = Math.floor((columns - asciiWidth) / 2);
      const startRow = Math.floor((rows - asciiHeight) / 2);
      
      const rabbitXStart = startCol + Math.floor((asciiWidth - rabbitPhrase.length) / 2);
      const rabbitY = Math.floor(startRow / 2); // Middle of the top screen and the logo
      
      if (!logoFinishedTime && revealedAscii.size >= totalLogoChars * 0.98) {
         logoFinishedTime = Date.now();
         // Send a wave of drops to rapidly form the sentence for the very first time
         for (let c = 0; c < rabbitPhrase.length; c++) {
             drops[rabbitXStart + c] = Math.min(drops[rabbitXStart + c], rabbitY - 5 - Math.floor(Math.random() * 15));
         }
      }
      
      // Cycle logic (8s wait -> reset)
      if (sentenceCycleEndTime && Date.now() > sentenceCycleEndTime) {
         revealedEgg.clear();
         sentenceFinishedTime = null;
         sentenceCycleEndTime = null;
         // Send a synchronized wave of drops just above the phrase so it forms rapidly and elegantly
         for (let c = 0; c < rabbitPhrase.length; c++) {
             drops[rabbitXStart + c] = rabbitY - 5 - Math.floor(Math.random() * 10);
         }
      }
      
      ctx.fillStyle = '#11FF44'; // Neon Green rain
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        let text = characters[Math.floor(Math.random() * characters.length)];
        const charY = drops[i];
        
        const asciiCol = i - startCol;
        const asciiRow = charY - startRow;
        
        // Unveil the ASCII logo bit by bit as the rain passes coordinates
        if (asciiRow >= 0 && asciiRow < asciiArt.length && asciiCol >= 0 && asciiCol < asciiArt[asciiRow].length) {
           const asciiChar = asciiArt[asciiRow][asciiCol];
           // Ignore tracking empty spaces
           if (asciiChar && asciiChar !== ' ') {
              text = asciiChar; // The falling drop temporarily takes the shape of the ASCII char as it passes!
              revealedAscii.add(`${asciiCol},${asciiRow}`);
           }
        }
        
        // Rabbit Phrase reveal logic (organic drop morphing)
        if (logoFinishedTime && !sentenceCycleEndTime) {
           const rCol = i - rabbitXStart;
           if (charY === rabbitY && rCol >= 0 && rCol < rabbitPhrase.length) {
              const rChar = rabbitPhrase[rCol];
              if (rChar && rChar !== ' ') {
                 text = rChar; // morph the falling drop into the phrase character
                 // Only add if it's not already fading
                 if (!sentenceFinishedTime || Date.now() < sentenceFinishedTime + 2000) {
                    revealedEgg.add(i);
                 }
              }
           }
        }

        ctx.fillText(text, i * charWidth, charY * fontSize);

        // Randomly reset a drop, fewer resets for slower appearance
        if (charY * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Draw all revealed ASCII characters solidly
      ctx.fillStyle = '#11FF44'; 
      ctx.font = `bold ${fontSize}px monospace`;
      
      for (const key of revealedAscii) {
         const [colStr, rowStr] = key.split(',');
         const c = parseInt(colStr);
         const r = parseInt(rowStr);
         
         const drawX = (startCol + c) * charWidth;
         const drawY = (startRow + r) * fontSize;
         
         // Using the original ASCII character instead of the Matrix random chars
         // To make it look incredibly cool forming out of the noise.
         ctx.fillText(asciiArt[r][c], drawX, drawY);
      }
      
      // Sentence animation state machine
      if (logoFinishedTime && !sentenceFinishedTime && revealedEgg.size >= nonSpaceRabbitChars) {
          sentenceFinishedTime = Date.now();
      }
      
      if (logoFinishedTime) {
         ctx.fillStyle = '#11FF44'; 
         ctx.font = `bold ${fontSize}px monospace`;
         
         let alpha = 1.0;
         if (sentenceFinishedTime) {
             const elapsedSinceFinish = Date.now() - sentenceFinishedTime;
             if (elapsedSinceFinish > 2000) {
                 // Matrix dissolve: randomly remove characters from the revealedEgg
                 const entries = Array.from(revealedEgg);
                 const dissolveRate = Math.floor(entries.length * 0.1) + 1;
                 for (let k = 0; k < dissolveRate; k++) {
                    if (revealedEgg.size > 0) {
                        const randomIdx = Math.floor(Math.random() * entries.length);
                        revealedEgg.delete(entries[randomIdx]);
                    }
                 }
                 
                 if (revealedEgg.size === 0) {
                     if (!sentenceCycleEndTime) {
                        sentenceCycleEndTime = Date.now() + 4000; // Trigger the 4 second wait loop
                     }
                 }
             }
         }
         
         if (rabbitY >= 0) {
            ctx.globalAlpha = 1.0; 
            for (const col of revealedEgg) {
               const rCol = col - rabbitXStart;
               if (rCol >= 0 && rCol < rabbitPhrase.length) {
                  ctx.fillText(rabbitPhrase[rCol], col * charWidth, rabbitY * fontSize);
               }
            }
         }
      }
    };
    
    // Smoother speed interval per user request
    const interval = setInterval(draw, 60);
    
    // Handle container resizes
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / charWidth);
      rows = Math.floor(canvas.height / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }
      revealedEgg.clear();
      // Keep revealed characters but they will instantly redraw at new center
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="group relative w-full h-[500px] min-h-[500px] lg:h-[700px] lg:min-h-[700px] border border-white/5 rounded-2xl overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] bg-black transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(17,255,68,0.2)] hover:border-[#11FF44]/30">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
      
      {/* Subliminal hovering text */}
      <div className="absolute bottom-4 left-0 w-full text-center opacity-40 pointer-events-none">
        <span className="text-[10px] text-[#11FF44]/40 font-mono tracking-widest">
          SYSTEM_ACCESS_GRANTED
        </span>
      </div>
    </div>
  );
};

export default MatrixRain;
