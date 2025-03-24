"use client";

import { useEffect, useState } from "react";
import { useQuizStore } from "@/store/quizStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { decodeHTML } from '@/lib/utils';

const TIMER_DURATION = 15;

const QuestionCard = () => {
  const { questions, currentQuestionIndex, answerQuestion } = useQuizStore();
  const question = questions[currentQuestionIndex];
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [sounds, setSounds] = useState<{
    correct: HTMLAudioElement;
    wrong: HTMLAudioElement;
    timesUp: HTMLAudioElement;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSounds({
        correct: new Audio("/sounds/correct.mp3"),
        wrong: new Audio("/sounds/wrong.mp3"),
        timesUp: new Audio("/sounds/timesup.mp3"),
      });
    }
  }, []);

  useEffect(() => {
    const options = [...question.incorrect_answers, question.correct_answer];
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
    setTimeLeft(TIMER_DURATION);
  }, [question]);

  useEffect(() => {
    if (!sounds) return;

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);

    if (timeLeft <= 0) {
      sounds.timesUp.play();
      toast.error("Time is up!", { icon: "⏱️" });
      answerQuestion(false);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft, answerQuestion, sounds]);

  const handleAnswer = (option: string) => {
    if (!sounds) return;

    const isCorrect = option === question.correct_answer;

    toast.dismiss();

    if (isCorrect) {
      sounds.correct.play();
      toast.success("Correct!", {
        duration: 2000,
        position: "top-right",
        icon: <CheckCircle className="text-green-500" />,
      });
    } else {
      sounds.wrong.play();
      toast.error("Wrong!", {
        duration: 2000,
        position: "top-right",
        icon: <XCircle className="text-red-500" />,
      });
    }

    answerQuestion(isCorrect);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl space-y-6"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Question: {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="relative w-24 h-24 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-lg border border-gray-300 dark:border-gray-600">
          <Clock className="absolute top-2 left-2 w-6 h-6 text-black dark:text-white" />
          <span className="text-3xl font-bold font-mono text-black dark:text-white">
            {timeLeft}s
          </span>
        </div>
      </div>

      <Card className="shadow-2xl border-0 w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            {
              decodeHTML
                (question.question)}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress
            value={(timeLeft / TIMER_DURATION) * 100}
            className="h-3 rounded-full"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shuffledOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full py-4 text-base font-medium bg-transparent text-black dark:text-white shadow-sm dark:shadow-md hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200 rounded-lg"
              >
                {decodeHTML(option)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
