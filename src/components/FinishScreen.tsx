import type { Dispatch } from "react";
import { ActionTypes, type QuizAction } from "../reducers/quiz.reducer";

interface FinishScreenProps {
  dispatch: Dispatch<QuizAction>;
}

export default function FinishScreen({ dispatch }: FinishScreenProps) {
  return (
    <div>
      <p>
        You scored <strong>10</strong> out of <strong>10</strong>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionTypes.RESTART_QUIZ })}
      >
        Restart quiz
      </button>
    </div>
  );
}
