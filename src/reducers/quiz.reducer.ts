import type { Question } from "../types";

// Types
interface State {
  questions: Question[];
  status: "loading" | "ready" | "active" | "finished" | "error";
  index: number;
  answer: number | null;
  points: number;
  totalPoints: number;
  highScore: number;
}

// Action types Enum
export const ActionTypes = {
  LOAD_START: "LOAD_START",
  LOAD_SUCCESS: "LOAD_SUCCESS",
  LOAD_ERROR: "LOAD_ERROR",
  START_QUIZ: "START_QUIZ",
  ANSWER: "ANSWER",
  NEXT_QUESTION: "NEXT_QUESTION",
  FINISH_QUIZ: "FINISH_QUIZ",
  RESTART_QUIZ: "RESTART_QUIZ",
} as const;

// Discriminated union ensures exhaustive type checking
export type QuizAction =
  | { type: typeof ActionTypes.LOAD_START }
  | { type: typeof ActionTypes.LOAD_SUCCESS; payload: Question[] }
  | { type: typeof ActionTypes.LOAD_ERROR }
  | { type: typeof ActionTypes.START_QUIZ }
  | { type: typeof ActionTypes.ANSWER; payload: number }
  | { type: typeof ActionTypes.NEXT_QUESTION }
  | { type: typeof ActionTypes.FINISH_QUIZ }
  | { type: typeof ActionTypes.RESTART_QUIZ };

export const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  totalPoints: 0,
  highScore: localStorage.getItem("highScore")
    ? parseInt(localStorage.getItem("highScore") || "0")
    : 0,
};

export const quizReducer = (state: State, action: QuizAction): State => {
  switch (action.type) {
    case ActionTypes.LOAD_START:
      return { ...state, status: "loading" };
    case ActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        status: "ready",
        questions: action.payload,
        totalPoints: action.payload.reduce((acc, curr) => acc + curr.points, 0),
      };
    case ActionTypes.LOAD_ERROR:
      return { ...state, status: "error" };
    case ActionTypes.START_QUIZ:
      return { ...state, status: "active" };
    case ActionTypes.ANSWER: {
      const isCorrectAnswer =
        action.payload === state.questions[state.index].correctOption;

      return {
        ...state,
        answer: action.payload,
        points:
          state.points +
          (isCorrectAnswer ? state.questions[state.index].points : 0),
      };
    }
    case ActionTypes.NEXT_QUESTION:
      if (state.index === state.questions.length - 1) {
        return { ...state, status: "finished" };
      }
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case ActionTypes.FINISH_QUIZ: {
      const newHighScore =
        state.points > state.highScore ? state.points : state.highScore;
      localStorage.setItem("highScore", newHighScore.toString());
      return {
        ...state,
        status: "finished",
        highScore: newHighScore,
      };
    }
    case ActionTypes.RESTART_QUIZ:
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore,
      };
    default:
      throw new Error("Action type is not supported");
  }
};
