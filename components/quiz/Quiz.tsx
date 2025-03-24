"use client";
import { useQuizStore } from "@/store/quizStore";
import QuizSetup from "./QuizSetup";
import QuestionCard from "./QuestionCard";
import Result from "./Result";
import { Button } from "@/components/ui/button";

const Quiz = () => {
  const { questions, isQuizFinished, resetQuiz } = useQuizStore();

  if (!questions.length) return <QuizSetup />;
  if (isQuizFinished)
    return (
      <>
        <Result />
      </>
    );

  return (
    <>
      <QuestionCard />
      <div className="flex justify-center mt-6">
        <Button onClick={resetQuiz} variant="outline" className="px-4 py-2">
          Reset Quiz
        </Button>
      </div>
    </>
  );
};

export default Quiz;
