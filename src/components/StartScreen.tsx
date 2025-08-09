import type { Dispatch } from "react";
import { ActionTypes, type QuizAction } from "../reducers/quiz.reducer";

interface StartScreenProps {
  questionsLength: number;
  dispatch: Dispatch<QuizAction>;
}

export default function StartScreen({
  questionsLength,
  dispatch,
}: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <p>{questionsLength} questions to test your React knowledge.</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionTypes.START_QUIZ })}
      >
        Let's start
      </button>
    </div>
  );
}
