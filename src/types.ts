export interface LogMessage {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'correct' | 'wrong' | 'system';
}

export interface Player {
  id: string;
  name: string;
  team: 1 | 2;
  joinedAt: number;
}

export interface GameState {
  status: 'setup' | 'playing' | 'winner';
  winnerTeam: 1 | 2 | null;
  
  // Teams' metrics
  group1Score: number;
  group2Score: number;
  group1Progress: number; // 0 to 100
  group2Progress: number; // 0 to 100
  
  // Names
  group1Name: string;
  group2Name: string;
  
  // Team customization
  group1Color: string;
  group2Color: string;
  group1Icon: string; // emoji icon for boat
  group2Icon: string; // emoji icon for boat
  
  // Trivia state
  currentQuestionIndex: number;
  questionRevealed: boolean;
  
  // Settings
  targetDistance: number; // number of steps to win (e.g. 10)
  enableSound: boolean;
  negativePumping: boolean; // whether wrong answers move boat backward
  
  // Buzzer/Multi-tab state
  buzzerTeam: 1 | 2 | null;
  buzzerPlayerName: string | null;
  buzzerTime: number | null;
  
  // UI triggers
  lastAction: 'g1_correct' | 'g1_wrong' | 'g2_correct' | 'g2_wrong' | 'start' | 'reset' | 'next' | null;
  actionTimestamp: number;
  
  // Player count simulation or cross-tab players
  players: Player[];
}

export const DEFAULT_GAME_STATE: GameState = {
  status: 'setup',
  winnerTeam: null,
  group1Score: 0,
  group2Score: 0,
  group1Progress: 0,
  group2Progress: 0,
  group1Name: "Group 1 (Noah's Ark)",
  group2Name: "Group 2 (Eden Explorers)",
  group1Color: "#0284c7", // Sky blue
  group2Color: "#ea580c", // Orange
  group1Icon: "⛵",
  group2Icon: "🛶",
  currentQuestionIndex: 0,
  questionRevealed: false,
  targetDistance: 10,
  enableSound: false,
  negativePumping: true,
  buzzerTeam: null,
  buzzerPlayerName: null,
  buzzerTime: null,
  lastAction: null,
  actionTimestamp: 0,
  players: []
};
