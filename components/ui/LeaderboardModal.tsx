"use client";

import { useQuizStore } from "@/store/quizStore";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Medal, Trophy, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface LeaderboardEntry {
  name: string;
  avatar: string;
  score: number;
  date: string;
}

const LeaderboardModal = () => {
  const { showLeaderboard, toggleLeaderboard } = useQuizStore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const savedScores = localStorage.getItem("leaderboard");
    if (savedScores) {
      const parsedScores = JSON.parse(savedScores) as LeaderboardEntry[];
      setLeaderboard(parsedScores.sort((a, b) => b.score - a.score));
    }
  }, [showLeaderboard]);

  const getModalBgClass = () => {
    return theme === "dark"
      ? "bg-gray-900 text-gray-200"
      : "bg-gray-50 text-gray-800";
  };

  const getRankIcon = (index: number) => {
    const iconProps = "w-4 h-4";

    const colors = [
      theme === "dark" ? "#B8860B" : "#FFD700",
      theme === "dark" ? "#8A8A8A" : "#C0C0C0",
      theme === "dark" ? "#A0522D" : "#CD7F32",
    ];

    switch (index) {
      case 0:
        return <Trophy className={iconProps} color={colors[0]} />;
      case 1:
        return <Award className={iconProps} color={colors[1]} />;
      case 2:
        return <Medal className={iconProps} color={colors[2]} />;
      default:
        return null;
    }
  };

  const getRankStyle = (index: number) => {
    const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
    const baseStyles = `font-semibold ${textColor}`;

    const bgColors = [
      theme === "dark" ? "bg-yellow-600/30" : "bg-yellow-100",
      theme === "dark" ? "bg-gray-600/30" : "bg-gray-200",
      theme === "dark" ? "bg-orange-600/30" : "bg-orange-100",
    ];

    return index < 3
      ? `${bgColors[index]} ${baseStyles}`
      : `bg-gray-100 dark:bg-gray-700/30 ${baseStyles}`;
  };

  return (
    <Dialog open={showLeaderboard} onOpenChange={toggleLeaderboard}>
      <DialogContent
        className={`max-w-lg z-50 rounded-lg shadow-lg ${getModalBgClass()}`}
      >
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl font-bold">Leaderboard</DialogTitle>
        </DialogHeader>

        {leaderboard.length > 0 ? (
          <ul className="space-y-2">
            {leaderboard.map((entry, index) => (
              <li
                key={index}
                className={`flex justify-between items-center px-4 py-2 rounded-md shadow-sm ${getRankStyle(
                  index
                )}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm w-6 text-center">
                    {index + 1}.
                  </span>
                  {getRankIcon(index)}
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={entry.avatar}
                      alt={`${entry.name}'s avatar`}
                    />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                  <span className="text-black dark:text-white font-medium text-sm">
                    {entry.name}
                  </span>
                </div>
                <span className="text-black dark:text-white font-semibold text-sm">
                  {entry.score} Point
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            There is no score record yet.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeaderboardModal;
