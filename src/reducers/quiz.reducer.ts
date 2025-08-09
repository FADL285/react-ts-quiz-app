import type { Question } from "../types";

// Types
interface State {
  questions: Question[];
  status: "loading" | "ready" | "active" | "finished" | "error";
  index: number;
  answer: number | null;
  points: number;
}

// Action types Enum
export const ActionTypes = {
  LOAD_START: "LOAD_START",
  LOAD_SUCCESS: "LOAD_SUCCESS",
  LOAD_ERROR: "LOAD_ERROR",
  START_QUIZ: "START_QUIZ",
} as const;

// Discriminated union ensures exhaustive type checking
export type QuizAction =
  | { type: typeof ActionTypes.LOAD_START }
  | { type: typeof ActionTypes.LOAD_SUCCESS; payload: Question[] }
  | { type: typeof ActionTypes.LOAD_ERROR }
  | { type: typeof ActionTypes.START_QUIZ };

export const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

export const quizReducer = (state: State, action: QuizAction): State => {
  switch (action.type) {
    case ActionTypes.LOAD_START:
      return { ...state, status: "loading" };
    case ActionTypes.LOAD_SUCCESS:
      return { ...state, status: "ready", questions: action.payload };
    case ActionTypes.LOAD_ERROR:
      return { ...state, status: "error" };
    case ActionTypes.START_QUIZ:
      return { ...state, status: "active" };
    default:
      throw new Error("Action type is not supported");
  }
};
