import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameState } from '../types';
import { Anchor, Flag, HelpCircle, Trophy } from 'lucide-react';

interface RaceMapProps {
  state: GameState;
}

export function RaceMap({ state }: RaceMapProps) {
  const {
    group1Progress,
    group2Progress,
    group1Name,
    group2Name,
    group1Icon,
    group2Icon,
    group1Color,
    group2Color,
    targetDistance,
    lastAction,
  } = state;

  // Calculate percentage along the track
  const getPercent = (progress: number) => {
    return (progress / targetDistance) * 82 + 5; // offset 5% start to 87% end
  };

  // Generate rock positions along the map
  const rocks = [20, 40, 60, 80];

  // Specific boat animation states
  const isG1Shaking = lastAction === 'g1_wrong';
  const isG2Shaking = lastAction === 'g2_wrong';
  const isG1Jumping = lastAction === 'g1_correct';
  const isG2Jumping = lastAction === 'g2_correct';

  return (
    <div className="relative w-full h-80 bg-gradient-to-b from-blue-400 to-blue-700 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border-8 border-yellow-400" id="genesis-race-map">
      {/* Wave Grid Dot Pattern from Design HTML */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Sky & clouds */}
      <div className="absolute top-0 left-0 w-full h-24 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-4 left-10 w-48 h-12 bg-white rounded-full blur-[4px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-8 right-20 w-32 h-10 bg-white rounded-full blur-[4px] animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute top-2 left-1/3 w-24 h-8 bg-white rounded-full blur-[4px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Sun/Compass Ambient Light source */}
      <div className="absolute top-4 right-10 w-20 h-20 bg-yellow-300 rounded-full blur-xl opacity-40 pointer-events-none" />

      {/* Islands / Obstacles - Tactile Labels */}
      <div className="absolute top-1/4 left-[22%] w-16 h-8 bg-amber-400 rounded-full border-4 border-amber-500 shadow-lg flex items-center justify-center pointer-events-none rotate-6">
        <span className="text-[9px] text-amber-950 font-black tracking-tight uppercase">⛰️ SINAI</span>
      </div>
      <div className="absolute top-1/3 right-[30%] w-20 h-9 bg-emerald-500 rounded-full border-4 border-emerald-600 shadow-lg flex items-center justify-center pointer-events-none -rotate-3">
        <span className="text-[9px] text-white font-black tracking-tight uppercase">🏝️ ARARAT</span>
      </div>

      {/* Finishing line area */}
      <div className="absolute right-3 top-10 bottom-10 w-12 border-r-4 border-dashed border-amber-200/50 flex flex-col justify-between items-center z-10 py-6 pointer-events-none">
        <div className="bg-amber-100 text-amber-900 border-2 border-amber-600 p-1.5 rounded-full shadow-lg flex items-center justify-center animate-bounce">
          <Trophy className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="text-[10px] text-amber-100 uppercase tracking-widest font-black bg-amber-900/40 px-2 py-0.5 rounded-full">
          CANAAN
        </div>
        <div className="bg-amber-100 text-amber-900 border-2 border-amber-600 p-1 rounded-full shadow-lg">
          <Flag className="w-4 h-4 text-red-500 fill-red-500" />
        </div>
      </div>

      {/* Rock icons along the path */}
      {rocks.map((percent, index) => (
        <div
          key={index}
          className="absolute text-slate-700 font-bold pointer-events-none select-none z-10 transition-all duration-300"
          style={{
            left: `${percent}%`,
            top: index % 2 === 0 ? '42%' : '66%',
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl drop-shadow-lg filter saturate-50 hover:saturate-100">🪨</span>
            <span className="text-[8px] text-white/70 bg-black/30 px-1 rounded">Rock</span>
          </div>
        </div>
      ))}

      {/* Group 1 / Boat 1 Track (Upper half of the sea) */}
      <div className="absolute top-20 left-0 right-16 h-20 border-b border-sky-200/35 flex items-center">
        {/* Start Line */}
        <div className="absolute left-4 h-12 border-l-2 border-white/60 flex flex-col justify-between">
          <span className="text-[8px] text-white/70 font-semibold uppercase -translate-y-4">EDEN</span>
        </div>

        {/* Sail 1 */}
        <motion.div
          className="absolute z-20 flex flex-col items-center "
          style={{ left: `${getPercent(group1Progress)}%` }}
          animate={{
            y: isG1Jumping ? [-15, 0, -5, 0] : [0, -3, 0],
            rotate: isG1Shaking ? [-10, 10, -10, 10, -5, 5, 0] : isG1Jumping ? [0, 5, 0] : [0, 1, 0, -1, 0],
            scale: isG1Shaking ? [1, 0.9, 1.1, 1] : 1,
          }}
          transition={{
            y: isG1Jumping ? { duration: 0.6 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            rotate: isG1Shaking ? { duration: 0.5 } : { duration: 3, repeat: Infinity, ease: "easeInOut" },
            duration: isG1Shaking ? 0.5 : 1
          }}
        >
          {/* Flag / Tag */}
          <div className="bg-white/95 px-2 py-0.5 rounded-md shadow-md text-[10px] font-black tracking-tight whitespace-nowrap mb-1 flex items-center gap-1 border border-sky-600" style={{ color: group1Color }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: group1Color }}></span>
            {group1Name.split(' ')[0]} ({group1Progress}/{targetDistance})
          </div>

          {/* Sub-container containing the boat and ripple */}
          <div className="relative">
            {/* Animated splash/ripple below the boat */}
            <div className="absolute -bottom-2 -left-2 right-0 h-2 bg-white/40 rounded-full blur-[2px] animate-pulse" />
            
            <div 
              className="text-4xl drop-shadow-md select-none transform hover:scale-110 active:scale-95 transition-transform"
              style={{ filter: `drop-shadow(2px 4px 6px rgba(0,0,0,0.25))` }}
            >
              {group1Icon}
            </div>
            
            {/* Splash animation for failures */}
            {isG1Shaking && (
              <motion.span 
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                className="absolute -top-2 left-2 text-xl"
              >
                💥
              </motion.span>
            )}
            
            {/* Star animation for correctness */}
            {isG1Jumping && (
              <motion.span 
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.6, opacity: 0, y: -20 }}
                className="absolute -top-4 left-3 text-xl"
              >
                ⭐
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Group 2 / Boat 2 Track (Lower half of the sea) */}
      <div className="absolute top-44 left-0 right-16 h-20 flex items-center">
        {/* Start Line */}
        <div className="absolute left-4 h-12 border-l-2 border-white/60 flex flex-col justify-between">
          <span className="text-[8px] text-white/70 font-semibold uppercase -translate-y-4">EDEN</span>
        </div>

        {/* Sail 2 */}
        <motion.div
          className="absolute z-20 flex flex-col items-center"
          style={{ left: `${getPercent(group2Progress)}%` }}
          animate={{
            y: isG2Jumping ? [-15, 0, -5, 0] : [0, -3, 0],
            rotate: isG2Shaking ? [-10, 10, -10, 10, -5, 5, 0] : isG2Jumping ? [0, -5, 0] : [0, -1, 0, 1, 0],
            scale: isG2Shaking ? [1, 0.9, 1.1, 1] : 1,
          }}
          transition={{
            y: isG2Jumping ? { duration: 0.6 } : { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: isG2Shaking ? { duration: 0.5 } : { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
            duration: isG2Shaking ? 0.5 : 1
          }}
        >
          {/* Flag / Tag */}
          <div className="bg-white/95 px-2 py-0.5 rounded-md shadow-md text-[10px] font-black tracking-tight whitespace-nowrap mb-1 flex items-center gap-1 border border-orange-600" style={{ color: group2Color }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: group2Color }}></span>
            {group2Name.split(' ')[0]} ({group2Progress}/{targetDistance})
          </div>

          {/* Sub-container containing the boat and ripple */}
          <div className="relative">
            {/* Animated splash/ripple below the boat */}
            <div className="absolute -bottom-2 -left-2 right-0 h-2 bg-white/40 rounded-full blur-[2px] animate-pulse" />

            <div 
              className="text-4xl drop-shadow-md select-none transform hover:scale-110 active:scale-95 transition-transform"
              style={{ filter: `drop-shadow(2px 4px 6px rgba(0,0,0,0.25))` }}
            >
              {group2Icon}
            </div>

            {/* Splash animation for failures */}
            {isG2Shaking && (
              <motion.span 
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                className="absolute -top-2 left-2 text-xl"
              >
                💥
              </motion.span>
            )}

            {/* Star animation for correctness */}
            {isG2Jumping && (
              <motion.span 
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.6, opacity: 0, y: -20 }}
                className="absolute -top-4 left-3 text-xl"
              >
                ⭐
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Decorative Wavy Ocean Animation (SVG Overlay at the bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden pointer-events-none opacity-40 z-30">
        <svg className="w-[300%] h-full text-blue-700 fill-current animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 C1150,90 1350,30 1500,60 C1650,90 1850,30 2000,60 C2150,90 2350,30 2500,60 C2650,90 2850,30 3000,60 L3000,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* Waves animations inside css */}
      <style>{`
        @keyframes waveAnimation {
          0% { transform: translateX(0); }
          50% { transform: translateX(-25%); }
          100% { transform: translateX(-50%); }
        }
        .animate-wave {
          animation: waveAnimation 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
