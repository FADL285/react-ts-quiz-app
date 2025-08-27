import { useEffect, useReducer } from "react";
import {
  quizReducer,
  initialState,
  ActionTypes,
} from "@/reducers/quiz.reducer";
import { quizContext } from "@/contexts/quiz-context";
import { fetchQuestions as fetchQuestionsService } from "@/services";

interface QuizProviderProps {
  children: React.ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [
    { questions, status, index, answer, points, totalPoints, highScore },
    dispatch,
  ] = useReducer(quizReducer, initialState);

  const questionsLength = questions.length;
  const progress = answer !== null ? index + 1 : index;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        dispatch({ type: ActionTypes.LOAD_START });
        const data = await fetchQuestionsService();
        dispatch({ type: ActionTypes.LOAD_SUCCESS, payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: ActionTypes.LOAD_ERROR });
      }
    };
    fetchQuestions();
  }, [dispatch]);

  return (
    <quizContext.Provider
      value={{
        questions,
        questionsLength,
        status,
        index,
        answer,
        points,
        totalPoints,
        progress,
        highScore,
        dispatch,
      }}
    >
      {children}
    </quizContext.Provider>
  );
};
