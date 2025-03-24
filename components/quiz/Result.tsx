"use client";

import { useState, useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Statistics from "./Statistics";
import { toast } from "react-hot-toast";

const avatars = [
  { id: "avatar1", src: "/avatars/avatar1.png" },
  { id: "avatar2", src: "/avatars/avatar2.png" },
  { id: "avatar3", src: "/avatars/avatar3.png" },
];

const Result = () => {
  const {
    score,
    questions,
    resetQuiz,
    toggleLeaderboard,
    showStatistics,
    toggleStatistics,
  } = useQuizStore();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("/avatars/avatar1.png");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAvatar("/avatars/avatar1.png");
  }, []);

  const saveScore = () => {
    if (!name.trim() || !avatar) {
      toast.error("Please enter your name and select an avatar!");
      return;
    }

    const savedScores = localStorage.getItem("leaderboard");
    const leaderboard = savedScores ? JSON.parse(savedScores) : [];

    leaderboard.push({
      name,
      avatar,
      score,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    toast.success("Score saved!");
    setSaved(true);
    toggleLeaderboard();
  };

  if (showStatistics) return <Statistics />;

  return (
    <motion.div
      className="w-full max-w-lg space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-2xl bg-white dark:bg-black">
        <CardHeader className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            <Trophy className="w-16 h-16 text-black dark:text-white" />
          </motion.div>

          <CardTitle className="text-3xl font-bold text-black dark:text-white">
            Quiz Completed!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <div className="text-2xl font-bold text-black dark:text-white">
            Score: {score} / {questions.length}
          </div>

          <Select value={avatar} onValueChange={setAvatar}>
            <SelectTrigger className="w-24 h-12 mx-auto bg-transparent flex justify-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src={avatar} alt="Selected Avatar" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </SelectTrigger>
            <SelectContent
              className="w-80 max-h-26 left-1/2 transform -translate-x-1/2"
              side="bottom"
              align="center"
            >
              <div className="grid grid-cols-3 gap-4 p-2">
                {avatars.map((avt) => (
                  <SelectItem
                    key={avt.id}
                    value={avt.src}
                    className="flex justify-center items-center p-2 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={avt.src} alt="Avatar" />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-center bg-transparent text-black dark:text-white"
          />

          <Button
            onClick={saveScore}
            size="lg"
            disabled={saved}
            className="w-full flex items-center justify-center gap-2 bg-white text-black dark:bg-black dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm dark:shadow-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200 rounded-lg"
          >
            {saved ? "Saved" : "Save Score and See Leaderboard"}
          </Button>

          <Button
            onClick={toggleStatistics}
            size="lg"
            className="w-full bg-transparent text-black dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm dark:shadow-md hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-200 rounded-lg"
          >
            View Statistics
          </Button>

          <Button
            onClick={resetQuiz}
            size="lg"
            className="w-full bg-transparent text-black dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm dark:shadow-md hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-200 rounded-lg"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Result;
