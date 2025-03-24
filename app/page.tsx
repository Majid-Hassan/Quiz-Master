"use client";

import Quiz from "@/components/quiz/Quiz";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black p-6 transition-colors duration-500">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {!showQuiz ? (
        <motion.div
          className="flex flex-col items-center space-y-8 text-center bg-gray dark:bg-gray-800 rounded-2xl shadow-2xl p-10 max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/logo.png"
            alt="Quiz Logo"
            width={140}
            height={140}
            className="rounded-full shadow-md"
          />
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Welcome to Quizo!
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-md">
            Are you ready to test your knowledge? Choose your category and
            difficulty level, start the fun!
          </p>
          <Button
            size="lg"
            className="text-lg px-6 py-4"
            onClick={() => setShowQuiz(true)}
          >
            Start
          </Button>
        </motion.div>
      ) : (
        <Quiz />
      )}
      <Footer />
    </main>
  );
}
