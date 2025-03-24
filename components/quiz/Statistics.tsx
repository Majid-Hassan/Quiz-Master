"use client";
import { useQuizStore } from "@/store/quizStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const Statistics = () => {
  const { score, questions, toggleStatistics } = useQuizStore();
  const data = [
    { name: "Correct", value: score },
    { name: "Wrong", value: questions.length - score },
  ];

  return (
    <motion.div
      className="w-full max-w-lg space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-2xl">
        <CardHeader className="flex flex-col items-center space-y-4">
          <CardTitle className="text-2xl font-bold text-center">
            Quiz Statistics
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <Button
            onClick={toggleStatistics}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            Return to Result
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Statistics;
