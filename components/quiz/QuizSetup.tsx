"use client";
import { useState, useEffect } from "react";
import { fetchCategories, fetchQuestions } from "@/lib/triviaApi";
import { useQuizStore } from "@/store/quizStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";

const QuizSetup = () => {
  const { setSettings, startQuiz, settings } = useQuizStore();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      const fetched = await fetchCategories();
      setCategories(fetched);
    };
    loadCategories();
  }, []);

  const handleStartQuiz = async () => {
    if (!settings.category || !settings.difficulty) {
      toast.error("Please select category and difficulty!");
      return;
    }

    setLoading(true);

    const questions = await fetchQuestions(
      10,
      parseInt(settings.category, 10),
      settings.difficulty
    );


    if (questions.length) {
      startQuiz(questions);
      toast.success("Quiz is starting!");
    } else {
      toast.error("No questions found! Choose another category or challenge.");
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-center">Quiz Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          onValueChange={
            (value) => setSettings({ ...settings, category: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setSettings({
              ...settings,
              difficulty: value as "easy" | "medium" | "hard",
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full" onClick={handleStartQuiz} disabled={loading}>
          {loading ? "Loading..." : "Start 🚀"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizSetup;
