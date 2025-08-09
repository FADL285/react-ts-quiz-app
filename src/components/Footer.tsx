import type { Dispatch } from "react";
import { ActionTypes, type QuizAction } from "../reducers/quiz.reducer";
import Timer from "./Timer";

interface FooterProps {
  showNextButton: boolean;
  isLastQuestion: boolean;
  quizDuration: number;
  dispatch: Dispatch<QuizAction>;
}

export default function Footer({
  showNextButton,
  isLastQuestion,
  quizDuration,
  dispatch,
}: FooterProps) {
  return (
    <>
      <Timer quizDuration={quizDuration} dispatch={dispatch} />
      {showNextButton && (
        <footer>
          {isLastQuestion ? (
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: ActionTypes.FINISH_QUIZ })}
            >
              Finish
            </button>
          ) : (
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: ActionTypes.NEXT_QUESTION })}
            >
              Next
            </button>
          )}
        </footer>
      )}
    </>
  );
}
