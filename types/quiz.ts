export type Question = {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuizSettings = {
  category: number | null;
  difficulty: "easy" | "medium" | "hard" | null;
};

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  isQuizFinished: boolean;
  showStatistics: boolean;
  showLeaderboard: boolean;
  settings: { category: string | null; difficulty: string | null };
  setSettings: (settings: {
    category: string | null;
    difficulty: string | null;
  }) => void;
  startQuiz: (questions: Question[]) => void;
  answerQuestion: (isCorrect: boolean) => void;
  toggleStatistics: () => void;
  toggleLeaderboard: () => void;
  resetQuiz: () => void;
}
