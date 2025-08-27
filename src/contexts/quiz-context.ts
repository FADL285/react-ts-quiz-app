import { createContext } from "react";
import type { QuizAction } from "../reducers/quiz.reducer";
import type { State } from "../reducers/quiz.reducer";

// Define the context type by extending the existing State
type QuizContextType = State & {
  dispatch: React.Dispatch<QuizAction>;
  questionsLength: number
  progress: number
};

export const quizContext = createContext<QuizContextType | undefined>(undefined);
export type { QuizContextType };