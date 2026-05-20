import React, { useState, useEffect } from 'react';
import { GameState, Player } from '../types';
import { GENESIS_QUESTIONS } from '../questions';
import { Zap, Shield, User, ArrowLeft, Send, Sparkles, Anchor, Trophy, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlayerViewProps {
  state: GameState;
  triggerBuzz: (team: 1 | 2, playerName: string) => void;
  joinGame: (player: Player) => void;
  leaveGame: (playerId: string) => void;
}

export function PlayerView({ state, triggerBuzz, joinGame, leaveGame }: PlayerViewProps) {
  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem('genesis_player_name') || '';
  });
  const [selectedTeam, setSelectedTeam] = useState<1 | 2 | null>(() => {
    const saved = localStorage.getItem('genesis_player_team');
    return saved ? (parseInt(saved) as 1 | 2) : null;
  });
  const [joined, setJoined] = useState(false);
  const [myPlayerId] = useState(() => {
    let id = localStorage.getItem('genesis_player_id');
    if (!id) {
      id = 'p_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('genesis_player_id', id);
    }
    return id;
  });

  const [cheerMessage, setCheerMessage] = useState('');
  const [cheers, setCheers] = useState<{ id: number; char: string; left: number }[]>([]);

  // Automatically check if already joined on render
  useEffect(() => {
    if (playerName && selectedTeam) {
      setJoined(true);
      // Announce join to other tabs
      joinGame({
        id: myPlayerId,
        name: playerName,
        team: selectedTeam,
        joinedAt: Date.now()
      });
    }
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || !selectedTeam) return;

    localStorage.setItem('genesis_player_name', playerName);
    localStorage.setItem('genesis_player_team', selectedTeam.toString());
    setJoined(true);

    joinGame({
      id: myPlayerId,
      name: playerName,
      team: selectedTeam,
      joinedAt: Date.now()
    });
  };

  const handleLeave = () => {
    leaveGame(myPlayerId);
    setJoined(false);
    setSelectedTeam(null);
    localStorage.removeItem('genesis_player_team');
  };

  const executeBuzz = () => {
    if (!joined || !selectedTeam || !playerName) return;
    triggerBuzz(selectedTeam, playerName);
  };

  // Fun client-side visual cheering emojis trigger
  const sendCheer = (emoji: string) => {
    const id = Date.now();
    setCheers((prev) => [...prev, { id, char: emoji, left: Math.random() * 80 + 10 }]);
    setTimeout(() => {
      setCheers((prev) => prev.filter((c) => c.id !== id));
    }, 1500);

    // Also simulate writing a notification or sound
  };

  const currentQuestion = GENESIS_QUESTIONS[state.currentQuestionIndex];
  const teamColor = selectedTeam === 1 ? state.group1Color : state.group2Color;
  const teamName = selectedTeam === 1 ? state.group1Name : state.group2Name;
  const teamIcon = selectedTeam === 1 ? state.group1Icon : state.group2Icon;
  const isOpponentBuzzed = state.buzzerTeam !== null && state.buzzerTeam !== selectedTeam;
  const isWeBuzzed = state.buzzerTeam === selectedTeam;

  return (
    <div className="max-w-md mx-auto bg-white border-8 border-yellow-400 rounded-3xl overflow-hidden min-h-[550px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col relative" id="player-mobile-buzzer">
      {/* Floating Cheers Layer */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {cheers.map((cheer) => (
            <motion.div
              key={cheer.id}
              initial={{ y: '100%', opacity: 1, scale: 0.8 }}
              animate={{ y: '-10%', opacity: 0, scale: 1.8, rotate: [0, 15, -15, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute text-4xl"
              style={{ left: `${cheer.left}%`, bottom: '15%' }}
            >
              {cheer.char}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-850 p-4 text-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400 animate-bounce" />
          <h3 className="font-black text-sm uppercase tracking-wider">Genesis Sailor Buzzer</h3>
        </div>
        {joined && (
          <button
            onClick={handleLeave}
            className="text-xs font-bold text-slate-400 hover:text-rose-400 flex items-center gap-1 cursor-all bg-slate-800 px-2 py-1 rounded-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Leave Team
          </button>
        )}
      </div>

      {/* Setup screen if not joined */}
      {!joined ? (
        <form onSubmit={handleJoin} className="p-6 flex-1 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-4xl">⛵</span>
              <h2 className="text-2xl font-black text-slate-950 mt-2">Board the Vessel</h2>
              <p className="text-slate-500 text-xs mt-1">
                Enter your church camp moniker & enlist with a sailing crew to conquer Genesis 1-44!
              </p>
            </div>

            {/* Input Name */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest block">
                Your Sailor Handle
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  maxLength={15}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border-2 border-slate-200 py-3 pl-11 pr-4 rounded-xl font-bold placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white text-sm"
                  placeholder="e.g. Moses_Jr, SarahSails"
                />
              </div>
            </div>

            {/* Select Team */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-widest block">
                Select Your Sailing Crew
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Team 1 */}
                <button
                  type="button"
                  onClick={() => setSelectedTeam(1)}
                  className={`p-4 rounded-2xl border-2 hover:bg-slate-50 cursor-all text-left flex flex-col justify-between h-28 transition-all relative ${selectedTeam === 1 ? 'border-sky-600 bg-sky-50/50' : 'border-slate-200 bg-white'}`}
                >
                  <span className="text-3xl">{state.group1Icon}</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-sky-950 truncate">{state.group1Name}</h4>
                    <p className="text-[10px] text-sky-700 font-bold">Crew A</p>
                  </div>
                  {selectedTeam === 1 && (
                    <div className="absolute top-2 right-2 bg-sky-600 text-white p-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                </button>

                {/* Team 2 */}
                <button
                  type="button"
                  onClick={() => setSelectedTeam(2)}
                  className={`p-4 rounded-2xl border-2 hover:bg-slate-50 cursor-all text-left flex flex-col justify-between h-28 transition-all relative ${selectedTeam === 2 ? 'border-orange-600 bg-orange-50/50' : 'border-slate-200 bg-white'}`}
                >
                  <span className="text-3xl">{state.group2Icon}</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-orange-950 truncate">{state.group2Name}</h4>
                    <p className="text-[10px] text-orange-700 font-bold">Crew B</p>
                  </div>
                  {selectedTeam === 2 && (
                    <div className="absolute top-2 right-2 bg-orange-600 text-white p-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-8 py-4 bg-slate-900 border border-slate-800 text-amber-100 font-black text-sm rounded-xl transition-all cursor-all hover:bg-slate-950 hover:text-white"
          >
            EMBARK ON THE TRIVIA VOYAGE
          </button>
        </form>
      ) : (
        /* Joined Gameplay Remote Buzzer */
        <div className="flex-1 flex flex-col justify-between bg-slate-50 p-6">
          
          {/* Top Sailor summary banner */}
          <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl p-1 rounded-lg bg-slate-100">{teamIcon}</div>
              <div className="text-left">
                <p className="text-[8px] uppercase tracking-widest text-slate-400 font-black leading-none">Your Crew</p>
                <h4 className="font-extrabold text-xs truncate max-w-[170px]" style={{ color: teamColor }}>
                  {playerName}
                </h4>
                <p className="text-[9px] text-slate-500 font-semibold truncate max-w-[150px]">{teamName}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[8px] uppercase tracking-widest text-slate-400 font-black leading-none">Our Score</p>
              <h4 className="text-sm font-black text-slate-900">
                {selectedTeam === 1 ? state.group1Score : state.group2Score} pts
              </h4>
              <p className="text-[8px] font-bold text-slate-500">
                ({selectedTeam === 1 ? state.group1Progress : state.group2Progress}/{state.targetDistance} steps)
              </p>
            </div>
          </div>

          {/* Current Question Live Display */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-left space-y-2 mb-4">
            <span className="bg-slate-100 text-slate-700 text-[9px] uppercase font-black px-2 py-0.5 rounded-full">
              LIVE BROADCAST QUESTION NO. {state.currentQuestionIndex + 1}
            </span>
            {state.status === 'playing' ? (
              <div>
                <h3 className="text-sm font-bold text-slate-800 line-clamp-3">
                  "{currentQuestion.question}"
                </h3>
                {state.questionRevealed ? (
                  <div className="mt-2 text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 p-1.5 rounded-lg">
                    <span>Reference: {currentQuestion.reference}</span>
                  </div>
                ) : (
                  <div className="mt-2 text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                    <span>⏰ Discuss with your team and BUZZ in!</span>
                  </div>
                )}
              </div>
            ) : state.status === 'winner' ? (
              <div className="text-center py-2">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto animate-bounce mb-1" />
                <h4 className="font-black text-sm text-yellow-905">The Race has ended!</h4>
                <p className="text-[10px] text-slate-500 font-medium">Winner: Team {state.winnerTeam}</p>
              </div>
            ) : (
              <div className="text-center py-2">
                <Anchor className="w-8 h-8 text-slate-400 mx-auto animate-spin mb-1" />
                <h4 className="font-bold text-xs text-slate-500">Waiting for Admin to Start...</h4>
              </div>
            )}
          </div>

          {/* Giant Interactive Buzzer Button */}
          <div className="flex-1 flex items-center justify-center p-4">
            <button
              onClick={executeBuzz}
              disabled={
                state.status !== 'playing' ||
                state.buzzerTeam !== null ||
                state.questionRevealed
              }
              className={`w-48 h-48 rounded-full shadow-2xl flex flex-col items-center justify-center border-8 transition-all duration-300 relative select-none uppercase pointer-events-auto active:scale-90 cursor-all font-sans ${
                state.status !== 'playing' || state.questionRevealed
                  ? 'bg-slate-300 border-slate-200 text-slate-500 cursor-not-allowed shadow-none'
                  : isWeBuzzed
                  ? 'bg-emerald-500 border-emerald-400 text-white ring-8 ring-emerald-400/35 scale-95'
                  : isOpponentBuzzed
                  ? 'bg-slate-400 border-slate-350 text-slate-600 opacity-60 cursor-not-allowed scale-90'
                  : 'bg-rose-500 hover:bg-rose-600 hover:text-white border-rose-450 text-amber-50 shadow-rose-905/30 hover:scale-105 active:scale-95 text-white animate-pulse'
              }`}
            >
              {isWeBuzzed ? (
                <>
                  <Sparkles className="w-10 h-10 mb-1" />
                  <span className="font-extrabold text-xl">WE BUZZED</span>
                  <span className="text-[9px] font-black opacity-80 mt-1">Answer Now!</span>
                </>
              ) : isOpponentBuzzed ? (
                <>
                  <Shield className="w-8 h-8 mb-1" />
                  <span className="font-bold text-xs truncate max-w-[120px]">Opponent</span>
                  <span className="text-[9px] font-black opacity-80">BUZZED FIRST</span>
                </>
              ) : state.status !== 'playing' ? (
                <>
                  <Anchor className="w-8 h-8 mb-1" />
                  <span className="font-black text-sm">LOCKED</span>
                </>
              ) : (
                <>
                  <Zap className="w-12 h-12 mb-1 fill-yellow-200 text-yellow-300" />
                  <span className="font-black text-3xl tracking-tight">BUZZ!</span>
                  <span className="text-[10px] font-black tracking-widest opacity-80 mt-1">TAP FAST</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Interactive Cheers toolbar */}
          <div className="border-t border-slate-200 pt-4 mt-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-extrabold gap-2 uppercase tracking-wide mb-2 select-none">
              <span>Send Cheers</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse fill-rose-500" />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => sendCheer('⛵')}
                className="py-2.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-lg font-black transition-all cursor-all"
                title="Sailboat"
              >
                ⛵
              </button>
              <button
                onClick={() => sendCheer('🌊')}
                className="py-2.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-lg font-black transition-all cursor-all"
                title="Water wave"
              >
                🌊
              </button>
              <button
                onClick={() => sendCheer('🎉')}
                className="py-2.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-lg font-black transition-all cursor-all"
                title="Celebration"
              >
                🎉
              </button>
              <button
                onClick={() => sendCheer('🔥')}
                className="py-2.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-lg font-black transition-all cursor-all"
                title="Fire/Holy Spirit"
              >
                🔥
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
