import { useContext } from "react";
import { quizContext } from "../contexts/quiz-context";

export function useQuiz() {
  const context = useContext(quizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}