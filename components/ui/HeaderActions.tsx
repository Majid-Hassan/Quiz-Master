"use client";

import ThemeToggle from "@/components/ui/ThemeToggle";
import { useQuizStore } from "@/store/quizStore";
import { Button } from "@/components/ui/button";
import { Trophy, Github } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const HeaderActions = () => {
  const { toggleLeaderboard } = useQuizStore();
  const { theme } = useTheme();

  const iconColor = theme === "dark" ? "#fff" : "#000";

  return (
    <>
      <Link
        href="https://github.com/majid-hassan"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-lg hover:scale-110 transition-transform"
      >
        <Github className="w-6 h-6" color={iconColor} />
      </Link>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLeaderboard}
          aria-label="Leaderboard"
        >
          <Trophy className="w-6 h-6" color={iconColor} />
        </Button>
        <ThemeToggle />
      </div>
    </>
  );
};

export default HeaderActions;
