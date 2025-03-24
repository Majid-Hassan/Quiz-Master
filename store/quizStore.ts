import { create } from "zustand";
import { QuizState, Question } from "@/types/quiz";

export const useQuizStore = create<QuizState>((set) => ({
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  isQuizFinished: false,
  showStatistics: false,
  showLeaderboard: false,
  settings: { category: null, difficulty: null },

  setSettings: (settings) => set({ settings }),

  startQuiz: (questions: Question[]) =>
    set({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      isQuizFinished: false,
      showStatistics: false,
      showLeaderboard: false,
    }),

  answerQuestion: (isCorrect) =>
    set((state) => ({
      score: isCorrect ? state.score + 1 : state.score,
      currentQuestionIndex: state.currentQuestionIndex + 1,
      isQuizFinished: state.currentQuestionIndex + 1 >= state.questions.length,
    })),

  toggleStatistics: () =>
    set((state) => ({ showStatistics: !state.showStatistics })),

  toggleLeaderboard: () =>
    set((state) => ({ showLeaderboard: !state.showLeaderboard })),

  resetQuiz: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      isQuizFinished: false,
      showStatistics: false,
      showLeaderboard: false,
      settings: { category: null, difficulty: null },
    }),
}));
