// src/components/multiplayer/types.ts

export enum GameStatus {
  WAITING = 'waiting',
  STARTING = 'starting',
  QUESTION = 'question',
  ANSWER_RESULT = 'answer_result',
  FINISHED = 'finished',
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  isHost: boolean;
  isReady: boolean;
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctAnswerId: string;
  explanation: string;
}

export interface GameState {
  status: GameStatus;
  players: Player[];
  currentQuestion: Question | null;
  questionIndex: number;
  totalQuestions: number;
  timePerQuestion: number;
  subject: string;
  difficulty: string;
  hostId: string;
  currentPlayerId: string;
}

export interface GameLobbyProps {
  gameId: string;
  players: Player[];
  onStart: () => void;
  onToggleReady: () => void;
  isHost: boolean;
  onLeave: () => void;
  subject: string;
  difficulty: string;
}

export interface QuestionDisplayProps {
  question: Question;
  onAnswer: (answerId: string) => void;
}

export interface PlayersListProps {
  players: Player[];
  currentPlayerId: string;
}

export interface ResultsBoardProps {
  players: Player[];
  currentPlayerId: string;
}

export interface RoundTimerProps {
  seconds: number;
  onTimeEnd: () => void;
}