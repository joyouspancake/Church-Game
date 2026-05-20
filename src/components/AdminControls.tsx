import React, { useState } from 'react';
import { GameState } from '../types';
import { Play, RotateCcw, Check, X, Shield, Volume2, VolumeX, Eye, ArrowRight, Settings, Plus, Minus, Edit, Anchor, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminControlsProps {
  state: GameState;
  startGame: () => void;
  nextQuestion: () => void;
  markCorrect: (team: 1 | 2) => void;
  markWrong: (team: 1 | 2) => void;
  resetGame: () => void;
  clearBuzzer: () => void;
  revealAnswer: () => void;
  updateSettings: (settings: Partial<GameState>) => void;
}

export function AdminControls({
  state,
  startGame,
  nextQuestion,
  markCorrect,
  markWrong,
  resetGame,
  clearBuzzer,
  revealAnswer,
  updateSettings
}: AdminControlsProps) {
  const [showConfig, setShowConfig] = useState(false);
  const [tempG1Name, setTempG1Name] = useState(state.group1Name);
  const [tempG2Name, setTempG2Name] = useState(state.group2Name);
  
  const boatOptions = ['⛵', '🛶', '🚢', '🛥️', '🚤', '🐳', '🦖', '🦁'];
  const colorOptions = ['#0284c7', '#ea580c', '#059669', '#dc2626', '#7c3aed', '#db2777', '#ca8a04', '#475569'];

  const triggerNameUpdate = () => {
    updateSettings({
      group1Name: tempG1Name || "Group 1",
      group2Name: tempG2Name || "Group 2",
    });
  };

  return (
    <div className="bg-slate-900 border-4 border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100" id="admin-controls-panel">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-black uppercase tracking-wider text-indigo-200">
            Admin Game deck
          </h3>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] uppercase font-black px-2 py-0.5 rounded-full animate-pulse">
            Locked on Sync
          </span>
        </div>

        <button
          onClick={() => setShowConfig(!showConfig)}
          className={`p-2 rounded-xl border transition-all duration-300 cursor-all ${showConfig ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-100 font-medium'}`}
          title="Tweak Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Panel Accordion */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-slate-800 pb-4 mb-4 text-xs space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Team 1 customization */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-sky-450 uppercase tracking-widest text-[10px] flex items-center gap-1">
                  Team A Customize
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempG1Name}
                    onChange={(e) => setTempG1Name(e.target.value)}
                    onBlur={triggerNameUpdate}
                    className="flex-1 bg-slate-905 border border-slate-800 text-slate-100 p-2 rounded-xl text-xs font-bold focus:outline-none focus:border-sky-500"
                    placeholder="Noah's Ark"
                  />
                </div>
                {/* Boat icon selector */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-slate-500 font-bold mr-1">Flag:</span>
                  {boatOptions.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => updateSettings({ group1Icon: icon })}
                      className={`text-lg p-1.5 rounded-lg border transition-all cursor-all ${state.group1Icon === icon ? 'bg-sky-600/30 border-sky-500' : 'bg-slate-901 border-slate-800 hover:border-slate-700'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                {/* Brand color selector */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-slate-500 font-bold mr-1">Color:</span>
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateSettings({ group1Color: color })}
                      className="w-5 h-5 rounded-full border border-slate-800 relative shadow transition-all scale-95 hover:scale-110 cursor-all"
                      style={{ backgroundColor: color }}
                    >
                      {state.group1Color === color && (
                        <div className="absolute inset-0 bg-white m-1.5 rounded-full opacity-80" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team 2 customization */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-orange-450 uppercase tracking-widest text-[10px] flex items-center gap-1">
                  Team B Customize
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempG2Name}
                    onChange={(e) => setTempG2Name(e.target.value)}
                    onBlur={triggerNameUpdate}
                    className="flex-1 bg-slate-905 border border-slate-800 text-slate-100 p-2 rounded-xl text-xs font-bold focus:outline-none focus:border-orange-500"
                    placeholder="Eden Explorers"
                  />
                </div>
                {/* Boat icon selector */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-slate-500 font-bold mr-1">Flag:</span>
                  {boatOptions.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => updateSettings({ group2Icon: icon })}
                      className={`text-lg p-1.5 rounded-lg border transition-all cursor-all ${state.group2Icon === icon ? 'bg-orange-600/30 border-orange-5001' : 'bg-slate-901 border-slate-800 hover:border-slate-700'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                {/* Brand color selector */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-slate-500 font-bold mr-1">Color:</span>
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateSettings({ group2Color: color })}
                      className="w-5 h-5 rounded-full border border-slate-800 relative shadow transition-all scale-95 hover:scale-110 cursor-all"
                      style={{ backgroundColor: color }}
                    >
                      {state.group2Color === color && (
                        <div className="absolute inset-0 bg-white m-1.5 rounded-full opacity-80" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* General Settings */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Target Steps */}
              <div className="space-y-2">
                <label className="text-slate-400 font-bold block mb-1">Winning Anchor Distance</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateSettings({ targetDistance: Math.max(5, state.targetDistance - 1) })}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 cursor-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-black text-white">{state.targetDistance} steps</span>
                  <button
                    onClick={() => updateSettings({ targetDistance: Math.min(25, state.targetDistance + 1) })}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 cursor-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sound Settings */}
              <div className="space-y-2">
                <label className="text-slate-400 font-bold block mb-1">Sound Audio Engine</label>
                <button
                  onClick={() => updateSettings({ enableSound: !state.enableSound })}
                  className={`px-4 py-2 rounded-xl flex items-center justify-center gap-2 border transition-all w-full cursor-all font-bold ${state.enableSound ? 'bg-emerald-600/15 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                  {state.enableSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>{state.enableSound ? 'Audio Active' : 'Muted'}</span>
                </button>
              </div>

              {/* Negative Pumping */}
              <div className="space-y-2">
                <label className="text-slate-400 font-bold block mb-1">Wrong Answer Penalty</label>
                <button
                  onClick={() => updateSettings({ negativePumping: !state.negativePumping })}
                  className={`px-4 py-2 rounded-xl flex items-center justify-center gap-2 border transition-all w-full cursor-all font-bold ${state.negativePumping ? 'bg-rose-600/15 border-rose-500/30 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                  <Waves className="w-4 h-4 text-rose-400" />
                  <span>{state.negativePumping ? 'Sails Back (-1)' : 'No Penalty (0)'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buzzer Alert Notification Alert */}
      <AnimatePresence>
        {state.status === 'playing' && state.buzzerTeam !== null && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="mb-5 bg-yellow-500 text-slate-900 font-black p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border-2 border-yellow-400 animate-pulse shadow-lg"
          >
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest leading-none mb-1 opacity-80">🔥 Team Buzzed First!</p>
              <h4 className="text-xl font-extrabold">
                {state.buzzerPlayerName || 'Someone'} on{' '}
                <span className="underline decoration-double decoration-slate-950">
                  {state.buzzerTeam === 1 ? state.group1Name : state.group2Name}
                </span>
              </h4>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearBuzzer}
                className="px-4 py-2 bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 text-xs font-black rounded-xl border border-slate-900/20 cursor-all active:translate-y-0.5 transition-all"
              >
                Clear Buzz
              </button>
              <button
                onClick={() => {
                  markCorrect(state.buzzerTeam!);
                  clearBuzzer();
                }}
                className="px-4 py-2 bg-slate-900 text-yellow-100 text-xs font-black rounded-xl cursor-all active:translate-y-0.5 hover:bg-slate-950 transition-all flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Correct
              </button>
              <button
                onClick={() => {
                  markWrong(state.buzzerTeam!);
                  clearBuzzer();
                }}
                className="px-4 py-2 bg-slate-900/45 hover:bg-slate-900/60 text-white text-xs font-black rounded-xl cursor-all active:translate-y-0.5 transition-all flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Incorrect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Gameplay Command Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* State Toggle actions */}
        <div className="flex flex-col gap-3 justify-center">
          {state.status === 'setup' ? (
            <button
              onClick={startGame}
              className="px-6 py-5 bg-indigo-600 hover:bg-indigo-500 hover:text-white border-2 border-indigo-500/20 text-slate-100 font-black text-lg rounded-2xl cursor-all transition-all shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2"
              id="admin-start-game-btn"
            >
              <Play className="w-6 h-6 fill-white" />
              <span>START GENESIS RACE</span>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={revealAnswer}
                disabled={state.questionRevealed}
                className={`py-4 px-3 font-black rounded-2xl text-xs flex items-center justify-center gap-2 border transition-all uppercase cursor-all ${state.questionRevealed ? 'bg-slate-800 border-slate-800 text-slate-500' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-indigo-300'}`}
              >
                <Eye className="w-4 h-4" />
                <span>Reveal Answer</span>
              </button>

              <button
                onClick={nextQuestion}
                className="py-4 px-3 bg-indigo-600/15 hover:bg-indigo-600/25 border-2 border-indigo-500/20 text-indigo-300 font-black rounded-2xl text-xs flex items-center justify-center gap-2 transition-all uppercase cursor-all"
                id="admin-next-question-btn"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Next Question</span>
              </button>
            </div>
          )}

          <button
            onClick={resetGame}
            className="py-3 px-4 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:text-white text-slate-400 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 cursor-all transition-all uppercase"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESET ALL SHIP DATA</span>
          </button>
        </div>

        {/* Manual Grading Buttons (Facilitator Controls) */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-4">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] border-b border-slate-900 pb-1 flex items-center gap-1.5">
            <Anchor className="w-3 h-3" /> Manual Ship controller
          </h4>

          {/* Group 1 Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold px-1 select-none">
              <span className="truncate max-w-[150px]" style={{ color: state.group1Color }}>
                A: {state.group1Name}
              </span>
              <span className="font-mono text-slate-400 font-extrabold">POSITION: {state.group1Progress} / {state.targetDistance}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={state.status !== 'playing'}
                onClick={() => markCorrect(1)}
                className="bg-green-600 hover:bg-green-500 text-white font-black py-2.5 rounded-xl text-xs border-b-4 border-green-800 active:border-b-0 hover:translate-y-[2px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-45 disabled:pointer-events-none flex items-center justify-center gap-1.5 shadow-lg shadow-green-950/25"
                title="Sails Forward"
                id="mark-group-1-correct"
              >
                <Check className="w-4 h-4 shrink-0" />
                <span>CORRECT</span>
              </button>
              <button
                disabled={state.status !== 'playing'}
                onClick={() => markWrong(1)}
                className="bg-red-650 hover:bg-red-500 text-white font-black py-2.5 rounded-xl text-xs border-b-4 border-red-800 active:border-b-0 hover:translate-y-[2px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-45 disabled:pointer-events-none flex items-center justify-center gap-1.5 shadow-lg shadow-red-950/25"
                title="Clash Rock"
                id="mark-group-1-wrong"
              >
                <X className="w-4 h-4 shrink-0" />
                <span>WRONG</span>
              </button>
            </div>
          </div>

          {/* Group 2 Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold px-1 select-none">
              <span className="truncate max-w-[150px]" style={{ color: state.group2Color }}>
                B: {state.group2Name}
              </span>
              <span className="font-mono text-slate-400 font-extrabold">POSITION: {state.group2Progress} / {state.targetDistance}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={state.status !== 'playing'}
                onClick={() => markCorrect(2)}
                className="bg-green-600 hover:bg-green-500 text-white font-black py-2.5 rounded-xl text-xs border-b-4 border-green-800 active:border-b-0 hover:translate-y-[2px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-45 disabled:pointer-events-none flex items-center justify-center gap-1.5 shadow-lg shadow-green-950/25"
                title="Sails Forward"
                id="mark-group-2-correct"
              >
                <Check className="w-4 h-4 shrink-0" />
                <span>CORRECT</span>
              </button>
              <button
                disabled={state.status !== 'playing'}
                onClick={() => markWrong(2)}
                className="bg-red-650 hover:bg-red-500 text-white font-black py-2.5 rounded-xl text-xs border-b-4 border-red-800 active:border-b-0 hover:translate-y-[2px] active:translate-y-[4px] transition-all cursor-pointer disabled:opacity-45 disabled:pointer-events-none flex items-center justify-center gap-1.5 shadow-lg shadow-red-950/25"
                title="Clash Rock"
                id="mark-group-2-wrong"
              >
                <X className="w-4 h-4 shrink-0" />
                <span>WRONG</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
