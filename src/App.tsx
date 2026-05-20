import React, { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { GENESIS_QUESTIONS } from './questions';
import { RaceMap } from './components/RaceMap';
import { QuestionCard } from './components/QuestionCard';
import { AdminControls } from './components/AdminControls';
import { PlayerView } from './components/PlayerView';
import { 
  Compass, 
  Tv, 
  ShieldAlert, 
  Smartphone, 
  HelpCircle, 
  RotateCcw, 
  Trophy, 
  Sparkles, 
  BookOpen, 
  Anchor,
  HelpCircle as QuestionIcon,
  MonitorPlay,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const {
    state,
    startGame,
    nextQuestion,
    markCorrect,
    markWrong,
    resetGame,
    triggerBuzz,
    clearBuzzer,
    revealAnswer,
    updateSettings,
    joinGame,
    leaveGame
  } = useGameState();

  const [activeRole, setActiveRole] = useState<'deck' | 'projector' | 'player'>('deck');
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<{ id: number; char: string; left: number; delay: number; duration: number }[]>([]);

  const currentQuestion = GENESIS_QUESTIONS[state.currentQuestionIndex];

  // Generate victory particles if winner is set
  useEffect(() => {
    if (state.status === 'winner' && state.winnerTeam !== null) {
      const symbols = ['⛵', '🎉', '⭐', '✨', '👑', '🌈', '🐳', '🕊️'];
      const particles = Array.from({ length: 60 }).map((_, idx) => ({
        id: idx,
        char: symbols[Math.floor(Math.random() * symbols.length)],
        left: Math.random() * 95 + 2,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2
      }));
      setConfettiParticles(particles);
    } else {
      setConfettiParticles([]);
    }
  }, [state.status, state.winnerTeam]);

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased relative">
      
      {/* Background nautical grids/textures */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] opacity-25 pointer-events-none" />

      {/* Global Sound Initializer Prompt on Sandbox */}
      {!state.enableSound && (
        <div className="absolute top-3 right-4 z-50">
          <button
            onClick={() => updateSettings({ enableSound: true })}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-755 border border-slate-705 text-slate-300 text-[10px] uppercase font-black tracking-wider rounded-full transition-all cursor-all"
            title="Enable retro sound effects synthesizer"
          >
            <span>🔊 Enable game Sound</span>
          </button>
        </div>
      )}

      {/* Confetti Falling Layer on Победа */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
        <AnimatePresence>
          {confettiParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ y: '-10%', opacity: 1, rotate: 0 }}
              animate={{ y: '110%', opacity: 0.1, rotate: 360 }}
              transition={{
                delay: p.delay,
                duration: p.duration,
                ease: 'linear',
                repeat: Infinity
              }}
              style={{ left: `${p.left}%` }}
              className="absolute text-5xl"
            >
              {p.char}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Top Header Navigation */}
      <header className="border-b-8 border-yellow-400 bg-slate-950 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-yellow-450 p-2.5 rounded-2xl shadow-[0_4px_0_#b45309] border-4 border-yellow-400 flex items-center justify-center animate-bounce">
            <Compass className="w-7 h-7 text-slate-950 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.2)] tracking-tighter uppercase italic leading-none">
              Genesis Race
            </h1>
            <p className="text-[10px] text-yellow-500 uppercase tracking-widest font-black flex items-center gap-1 mt-1 leading-none">
              ⛵ BIBLE CAMP TRIVIA EXPE (CHS. 1–44)
            </p>
          </div>
        </div>

        {/* Unified Role Selecting Toolbar */}
        <div className="flex bg-slate-900 border-2 border-slate-800 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => { setActiveRole('deck'); }}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 uppercase tracking-wide cursor-all ${activeRole === 'deck' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <MonitorPlay className="w-4 h-4" />
            <span className="hidden sm:inline">Admin Arena</span>
          </button>
          
          <button
            onClick={() => { setActiveRole('projector'); }}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 uppercase tracking-wide cursor-all ${activeRole === 'projector' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Tv className="w-4 h-4" />
            <span className="hidden sm:inline">Projector View</span>
          </button>

          <button
            onClick={() => { setActiveRole('player'); }}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 uppercase tracking-wide cursor-all ${activeRole === 'player' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Join Buzzer</span>
          </button>
        </div>

        {/* Quick Instructions CTA Button */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowHowToPlay(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1 cursor-all transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            <span>How to Play</span>
          </button>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6" id="main-content-canvas">
        
        {/* Sync Status Banner */}
        <div className="bg-amber-500/10 border-2 border-amber-500/20 text-xs rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-350 font-semibold select-none">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Local Live Sync Triggered!</strong> Open multiple browser tabs side-by-side to play! Connect a laptop to the Projector, and hand the Admin/remote tab or mobile client to leaders!
            </span>
          </span>
          <div className="flex gap-2">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-300">
              ⚡ Local Sync Active
            </span>
            <span className="bg-indigo-500/15 text-indigo-300 px-2' py-0.5 rounded text-[10px] font-bold px-2">
              {state.players.length} Sailor(s) Boarded
            </span>
          </div>
        </div>

        {/* WINNER SCREEN OVERLAY */}
        <AnimatePresence>
          {state.status === 'winner' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-amber-600 via-amber-700 to-yellow-850 rounded-3xl p-8 text-center text-white border-8 border-yellow-405 shadow-2xl space-y-6 max-w-2xl mx-auto my-12 relative overflow-hidden"
              id="race-winner-victory-card"
            >
              {/* Background shining rings */}
              <div className="absolute inset-0 bg-radial-gradient opacity-10 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce border-4 border-white mb-6">
                  <span className="text-6xl">{state.winnerTeam === 1 ? state.group1Icon : state.group2Icon}</span>
                </div>

                <p className="text-[12px] uppercase font-black tracking-widest text-yellow-200">VICTORY CHAMPION!</p>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none drop-shadow-md">
                  {state.winnerTeam === 1 ? state.group1Name : state.group2Name}
                </h1>
                
                <p className="text-yellow-100 text-sm max-w-md mx-auto font-medium">
                  Has successfully traversed the treacherous ocean waves, dodged the rocky obstacles, answered true questions correctly, and docked at Canaan!
                </p>

                {/* Score Summary */}
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto bg-slate-900/30 p-4 rounded-2xl border border-white/20 mt-6 backdrop-blur">
                  <div>
                    <h5 className="text-[10px] uppercase font-black text-amber-200">{state.group1Name.split(' ')[0]}</h5>
                    <p className="text-xl font-black">{state.group1Score} pts</p>
                    <p className="text-xs text-white/80">{state.group1Progress} milestones</p>
                  </div>
                  <div className="border-l border-white/20">
                    <h5 className="text-[10px] uppercase font-black text-amber-200">{state.group2Name.split(' ')[0]}</h5>
                    <p className="text-xl font-black">{state.group2Score} pts</p>
                    <p className="text-xs text-white/80">{state.group2Progress} milestones</p>
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-6 flex justify-center gap-3">
                  <button
                    onClick={resetGame}
                    className="px-8 py-4 bg-slate-950 hover:bg-black text-yellow-100 border border-slate-800 rounded-2xl font-black flex items-center gap-2 cursor-all transition-all shadow-xl shadow-slate-950/20 active:translate-y-0.5"
                    id="victory-reset-btn"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>DRAIN ANCHORS & RACE AGAIN</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DEFAULT GAME SCREEN LAYOUT (ONLY RENDER IF NOT IN FULL WINNING SCREEN MODAL OR IF ADMIN FORCES DOCK SCREEN ACCORDION) */}
        {state.status !== 'winner' && (
          <div className="space-y-6">
            
            {/* 1. PROJECTOR MONITOR MODE (Clean visual canvas only, no editing sliders buttons) */}
            {activeRole === 'projector' && (
              <div className="space-y-6" id="projector-only-view">
                {/* Scoreboard block of both teams */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
                  {/* Team A stats banner */}
                  <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-850 flex items-center justify-between shadow">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{state.group1Icon}</span>
                      <div className="text-left">
                        <h4 className="font-extrabold text-sm text-slate-205 truncate max-w-[160px]">{state.group1Name}</h4>
                        <span className="text-[10px] uppercase font-black tracking-wider" style={{ color: state.group1Color }}>CREW A</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none font-black mb-1">SCORE</p>
                      <span className="text-xl font-black" style={{ color: state.group1Color }}>{state.group1Score} PTS</span>
                    </div>
                  </div>

                  {/* Team B stats banner */}
                  <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-850 flex items-center justify-between shadow">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{state.group2Icon}</span>
                      <div className="text-left">
                        <h4 className="font-extrabold text-sm text-slate-205 truncate max-w-[160px]">{state.group2Name}</h4>
                        <span className="text-[10px] uppercase font-black tracking-wider" style={{ color: state.group2Color }}>CREW B</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-none font-black mb-1">SCORE</p>
                      <span className="text-xl font-black" style={{ color: state.group2Color }}>{state.group2Score} PTS</span>
                    </div>
                  </div>
                </div>

                {/* Animated Map */}
                <RaceMap state={state} />

                {/* Question Area */}
                {state.status === 'playing' ? (
                  <QuestionCard
                    question={currentQuestion}
                    revealed={state.questionRevealed}
                  />
                ) : (
                  <div className="bg-slate-950 border-4 border-dashed border-slate-800 p-12 text-center rounded-3xl space-y-4">
                    <Anchor className="w-16 h-16 text-slate-650 mx-auto animate-pulse" />
                    <h2 className="text-2xl font-black text-amber-500">READY FOR DEPARTURE?</h2>
                    <p className="text-slate-400 text-xs max-w-sm mx-auto font-medium">
                      Wait for the Game Master to trigger the start. Both sailboat flags will dock, and the voyage across Genesis 1–44 will launch!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 2. ADMIN ARENA MODE (All-in-one control console) */}
            {activeRole === 'deck' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="admin-deck-arena-view">
                
                {/* Left 2 Cols: Game visuals */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Scoreboard row */}
                  <div className="grid grid-cols-2 gap-3 select-none">
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{state.group1Icon}</span>
                        <div className="text-left">
                          <h4 className="font-extrabold text-xs text-slate-350 truncate max-w-[110px]">{state.group1Name}</h4>
                          <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: state.group1Color }}>Group 1</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] text-slate-500 font-extrabold uppercase">SCORE</p>
                        <span className="text-sm font-black text-white">{state.group1Score} PTS</span>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{state.group2Icon}</span>
                        <div className="text-left">
                          <h4 className="font-extrabold text-xs text-slate-350 truncate max-w-[110px]">{state.group2Name}</h4>
                          <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: state.group2Color }}>Group 2</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] text-slate-500 font-extrabold uppercase">SCORE</p>
                        <span className="text-sm font-black text-white">{state.group2Score} PTS</span>
                      </div>
                    </div>
                  </div>

                  {/* Race Map Component */}
                  <RaceMap state={state} />

                  {/* Trivia Card or Startup */}
                  {state.status === 'playing' ? (
                    <QuestionCard
                      question={currentQuestion}
                      revealed={state.questionRevealed}
                      onReveal={revealAnswer}
                      onNext={nextQuestion}
                      isAdmin={true}
                    />
                  ) : (
                    <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950/90 border-4 border-dashed border-slate-800 p-12 text-center rounded-3xl space-y-4">
                      <Anchor className="w-12 h-12 text-slate-650 mx-auto animate-spin" style={{ animationDuration: '40s' }} />
                      <h2 className="text-xl font-extrabold text-amber-500 uppercase tracking-wide">Ready for Departure</h2>
                      <p className="text-slate-400 text-xs max-w-sm mx-auto font-medium">
                        Click the Start button on the right column to draft the first random trivia from Genesis and push off the anchors!
                      </p>
                      <button
                        onClick={startGame}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-505 border-2 border-indigo-500 text-white font-black text-xs rounded-xl uppercase tracking-wider cursor-all active:translate-y-0.5 inline-flex items-center gap-1.5"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Launch Game Screen</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Right 1 Col: Admin controllers */}
                <div className="space-y-6">
                  <AdminControls
                    state={state}
                    startGame={startGame}
                    nextQuestion={nextQuestion}
                    markCorrect={markCorrect}
                    markWrong={markWrong}
                    resetGame={resetGame}
                    clearBuzzer={clearBuzzer}
                    revealAnswer={revealAnswer}
                    updateSettings={updateSettings}
                  />

                  {/* Quick local simulator to allow testing sync immediately on single device */}
                  <div className="bg-indigo-500/5 border border-indigo-500/10 p-5 rounded-3xl text-xs space-y-3">
                    <h5 className="font-bold text-indigo-300 flex items-center gap-1">
                      💡 Offline Testing Sandbox
                    </h5>
                    <p className="text-slate-400 mt-1 leading-relaxed">
                      This game is built with a dual local sync engine. To simulate multiple players:
                    </p>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-400 font-semibold pl-1">
                      <li>Copy of your current Dev URL.</li>
                      <li>Open a new browser tab or browser split-view.</li>
                      <li>Set that tab to <strong className="text-sky-400">Join Buzzer</strong> or <strong className="text-indigo-400">Projector View</strong>.</li>
                      <li>Both tabs will sync instantly! Try clicking BUZZ in client mode to see the admin alert trigger.</li>
                    </ol>
                  </div>
                </div>

              </div>
            )}

            {/* 3. MOBILE BUZZER / PLAYER JOIN CLIENT VIEW */}
            {activeRole === 'player' && (
              <div className="py-2" id="client-view-parent">
                <PlayerView
                  state={state}
                  triggerBuzz={triggerBuzz}
                  joinGame={joinGame}
                  leaveGame={leaveGame}
                />
              </div>
            )}

          </div>
        )}

      </main>

      {/* HOW TO PLAY INSTRUCTIONS MODAL ACCORDION */}
      <AnimatePresence>
        {showHowToPlay && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border-4 border-slate-800 rounded-3xl p-6 max-w-lg w-full text-left text-slate-100 shadow-2xl relative"
            >
              <h3 className="text-xl font-black text-amber-500 uppercase tracking-wide border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-500" />
                <span>HOW TO PLAY THE GENESIS RACE</span>
              </h3>

              <div className="space-y-4 text-xs leading-relaxed text-slate-350">
                <p>
                  <strong>Genesis Race</strong> is an interactive seafaring game testing Bible camp or youth group knowledge of <strong>Genesis 1 to 44</strong> (Creation, Noah's Ark, Abraham, Isaac, Jacob, Esau, and Joseph inside Egypt).
                </p>

                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Gameplay Instructions:</h4>
                  <ul className="list-disc list-inside space-y-1 pl-1 font-semibold text-slate-400">
                    <li>Divide players into <strong className="text-sky-400">Group 1</strong> and <strong className="text-orange-400">Group 2</strong>.</li>
                    <li>Leader acts as Admin, showing the <strong>Projector View</strong> on the big screen.</li>
                    <li>Both teams start with their sailboats docked at EDEN.</li>
                    <li>Admin pulls the first question. Once a player knows the answer, they can <strong>BUZZ IN</strong> via phone, or raise hands!</li>
                    <li>Each correct answer navigates the sailboat <strong>Forward (+1)</strong>!</li>
                    <li>Each wrong answer makes the crew <strong>Hit a Rock!</strong>, causing the ship to shake, lose points, and migrate backward (-1) if penalty is active.</li>
                    <li>The first sailboat to capture all milestones and dock at <strong>Canaan</strong> wins the race!</li>
                  </ul>
                </div>

                <div className="space-y-2 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-amber-400 text-[10px] uppercase">Leader tip:</h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    You can fully customize the team names, anchor distance, toggle live buzzer chimes, and penalties by clicking the <strong className="text-white">Gear (⚙️)</strong> button inside the Admin deck!
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-505 text-white font-black text-xs rounded-xl uppercase tracking-wider cursor-all"
                >
                  Got it, Captain!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Humble Footer containing licensing */}
      <footer className="mt-auto border-t-4 border-slate-800 bg-slate-950/60 p-6 text-center text-xs text-slate-500 font-semibold select-all" id="genesis-race-footer">
        <p>© 2026 Genesis Race — Bible Trivia Sea Expedition. Inspired by Genesis 1–44.</p>
        <p className="text-[10px] text-slate-650 font-mono mt-1">
          Brought to life with React, Tailwind CSS, Local sync engine, and Framer Motion.
        </p>
      </footer>
    </div>
  );
}
