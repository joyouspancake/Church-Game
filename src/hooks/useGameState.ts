import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, DEFAULT_GAME_STATE, LogMessage, Player } from '../types';
import { GENESIS_QUESTIONS } from '../questions';
import { soundEffects } from '../utils/audio';

const STORAGE_KEY = 'genesis_race_game_state';
const CHANNEL_NAME = 'genesis_race_sync';

export function useGameState() {
  const [state, setState] = useState<GameState>(() => {
    // Try to restore from localStorage
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Return saved state with a reset of transient triggers
          return {
            ...parsed,
            lastAction: null,
            actionTimestamp: 0
          };
        }
      } catch (e) {
        console.error("Failed to load game state", e);
      }
    }
    return DEFAULT_GAME_STATE;
  });

  const channelRef = useRef<BroadcastChannel | null>(null);

  // Broadcaster helper
  const broadcastState = useCallback((newState: GameState) => {
    setState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      if (channelRef.current) {
        channelRef.current.postMessage({ type: 'STATE_UPDATE', state: newState });
      }
    } catch (e) {
      console.error("Failed to broadcast state", e);
    }
  }, []);

  // Set up Broadcast Channel for real-time multi-tab synching
  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'STATE_UPDATE') {
        const incoming = event.data.state as GameState;
        setState(incoming);
        // Persist locally too
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
        } catch (e) {
          console.error(e);
        }

        // Trigger local sound effects based on actions of the other tab
        if (incoming.lastAction && incoming.enableSound) {
          if (incoming.lastAction.endsWith('_correct')) {
            soundEffects.playCorrect();
          } else if (incoming.lastAction.endsWith('_wrong')) {
            soundEffects.playWrong();
          } else if (incoming.lastAction === 'reset') {
            soundEffects.playSailing();
          } else if (incoming.lastAction === 'start') {
            soundEffects.playSailing();
          }
        }
      } else if (event.data && event.data.type === 'BUZZ_EVENT') {
        // Handle incoming buzz if this is the active admin/viewer tab
        const { team, playerName, time } = event.data;
        handleIncomingBuzz(team, playerName, time);
      } else if (event.data && event.data.type === 'JOIN_EVENT') {
        const { player } = event.data;
        handleIncomingJoin(player);
      } else if (event.data && event.data.type === 'LEAVE_EVENT') {
        const { playerId } = event.data;
        handleIncomingLeave(playerId);
      }
    };

    channel.addEventListener('message', handleMessage);

    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, [state, broadcastState]);

  // Handle incoming join (across tabs)
  const handleIncomingJoin = (player: Player) => {
    setState((prev) => {
      if (prev.players.some(p => p.id === player.id)) return prev;
      const updatedPlayers = [...prev.players, player];
      const updated = { ...prev, players: updatedPlayers };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleIncomingLeave = (playerId: string) => {
    setState((prev) => {
      const updatedPlayers = prev.players.filter(p => p.id !== playerId);
      const updated = { ...prev, players: updatedPlayers };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleIncomingBuzz = (team: 1 | 2, playerName: string, time: number) => {
    setState((prev) => {
      // If someone already buzzed, ignore
      if (prev.buzzerTeam !== null) return prev;
      
      const updated = {
        ...prev,
        buzzerTeam: team,
        buzzerPlayerName: playerName,
        buzzerTime: time
      };

      if (prev.enableSound) {
        soundEffects.playBuzzer();
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Helper to add logs inside updates
  const createLog = (message: string, type: LogMessage['type']): LogMessage => ({
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toLocaleTimeString(),
    message,
    type
  });

  // Start the Game
  const startGame = useCallback(() => {
    if (state.enableSound) {
      soundEffects.playSailing();
    }
    const updated: GameState = {
      ...state,
      status: 'playing',
      winnerTeam: null,
      group1Progress: 0,
      group2Progress: 0,
      group1Score: 0,
      group2Score: 0,
      currentQuestionIndex: Math.floor(Math.random() * GENESIS_QUESTIONS.length), // Random start question
      questionRevealed: false,
      buzzerTeam: null,
      buzzerPlayerName: null,
      buzzerTime: null,
      lastAction: 'start',
      actionTimestamp: Date.now()
    };
    broadcastState(updated);
  }, [state, broadcastState]);

  // Next Question
  const nextQuestion = useCallback(() => {
    // Select next question (increment with wrap around)
    const nextIndex = (state.currentQuestionIndex + 1) % GENESIS_QUESTIONS.length;
    const updated: GameState = {
      ...state,
      currentQuestionIndex: nextIndex,
      questionRevealed: false,
      buzzerTeam: null,
      buzzerPlayerName: null,
      buzzerTime: null,
      lastAction: 'next',
      actionTimestamp: Date.now()
    };
    broadcastState(updated);
  }, [state, broadcastState]);

  // Mark Team Correct
  const markCorrect = useCallback((team: 1 | 2) => {
    if (state.status !== 'playing') return;

    if (state.enableSound) {
      soundEffects.playCorrect();
    }

    const teamName = team === 1 ? state.group1Name : state.group2Name;
    const currentProgress = team === 1 ? state.group1Progress : state.group2Progress;
    const currentScore = team === 1 ? state.group1Score : state.group2Score;
    
    // Add point and move forward
    const newProgress = Math.min(state.targetDistance, currentProgress + 1);
    const newScore = currentScore + 10;
    
    const isWinner = newProgress >= state.targetDistance;

    const actionType = team === 1 ? 'g1_correct' : 'g2_correct';

    const updated: GameState = {
      ...state,
      group1Progress: team === 1 ? newProgress : state.group1Progress,
      group2Progress: team === 2 ? newProgress : state.group2Progress,
      group1Score: team === 1 ? newScore : state.group1Score,
      group2Score: team === 2 ? newScore : state.group2Score,
      status: isWinner ? 'winner' : 'playing',
      winnerTeam: isWinner ? team : null,
      lastAction: actionType,
      actionTimestamp: Date.now(),
      // Auto reveal question on grading
      questionRevealed: true
    };

    if (isWinner && state.enableSound) {
      setTimeout(() => soundEffects.playWin(), 400);
    }

    broadcastState(updated);
  }, [state, broadcastState]);

  // Mark Team Wrong
  const markWrong = useCallback((team: 1 | 2) => {
    if (state.status !== 'playing') return;

    if (state.enableSound) {
      soundEffects.playWrong();
    }

    const currentProgress = team === 1 ? state.group1Progress : state.group2Progress;
    const currentScore = team === 1 ? state.group1Score : state.group2Score;

    // Hit rock, maybe move backward
    let newProgress = currentProgress;
    if (state.negativePumping) {
      newProgress = Math.max(0, currentProgress - 1);
    }

    // Deduct slightly or keep same
    const newScore = Math.max(0, currentScore - 5);
    const actionType = team === 1 ? 'g1_wrong' : 'g2_wrong';

    const updated: GameState = {
      ...state,
      group1Progress: team === 1 ? newProgress : state.group1Progress,
      group2Progress: team === 2 ? newProgress : state.group2Progress,
      group1Score: team === 1 ? newScore : state.group1Score,
      group2Score: team === 2 ? newScore : state.group2Score,
      lastAction: actionType,
      actionTimestamp: Date.now(),
      // Don't auto-clear buzzer so admin knows who got it wrong, let next handle it or manual clear
    };

    broadcastState(updated);
  }, [state, broadcastState]);

  // Reset Game
  const resetGame = useCallback(() => {
    if (state.enableSound) {
      soundEffects.playSailing();
    }
    const updated: GameState = {
      ...DEFAULT_GAME_STATE,
      group1Name: state.group1Name,
      group2Name: state.group2Name,
      group1Icon: state.group1Icon,
      group2Icon: state.group2Icon,
      group1Color: state.group1Color,
      group2Color: state.group2Color,
      targetDistance: state.targetDistance,
      enableSound: state.enableSound,
      negativePumping: state.negativePumping,
      players: state.players, // keep players connected
      lastAction: 'reset',
      actionTimestamp: Date.now()
    };
    broadcastState(updated);
  }, [state, broadcastState]);

  // Player Buzzes
  const triggerBuzz = useCallback((team: 1 | 2, playerName: string) => {
    const time = Date.now();
    // Update local state first
    handleIncomingBuzz(team, playerName, time);
    // Broadcast buzz event so other tabs register
    try {
      if (channelRef.current) {
        channelRef.current.postMessage({
          type: 'BUZZ_EVENT',
          team,
          playerName,
          time
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const clearBuzzer = useCallback(() => {
    const updated: GameState = {
      ...state,
      buzzerTeam: null,
      buzzerPlayerName: null,
      buzzerTime: null
    };
    broadcastState(updated);
  }, [state, broadcastState]);

  const revealAnswer = useCallback(() => {
    const updated: GameState = {
      ...state,
      questionRevealed: true
    };
    broadcastState(updated);
  }, [state, broadcastState]);

  // Update customize settings
  const updateSettings = useCallback((settings: Partial<GameState>) => {
    const updated: GameState = {
      ...state,
      ...settings
    };
    if (settings.enableSound !== undefined) {
      if (settings.enableSound) {
        soundEffects.enable();
      } else {
        soundEffects.disable();
      }
    }
    broadcastState(updated);
  }, [state, broadcastState]);

  // Join across tabs (player device)
  const joinGame = useCallback((player: Player) => {
    handleIncomingJoin(player);
    try {
      if (channelRef.current) {
        channelRef.current.postMessage({ type: 'JOIN_EVENT', player });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const leaveGame = useCallback((playerId: string) => {
    handleIncomingLeave(playerId);
    try {
      if (channelRef.current) {
        channelRef.current.postMessage({ type: 'LEAVE_EVENT', playerId });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
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
  };
}
