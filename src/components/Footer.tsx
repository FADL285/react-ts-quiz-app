import type { Dispatch } from "react";
import { ActionTypes, type QuizAction } from "../reducers/quiz.reducer";

interface FooterProps {
  showNextButton: boolean;
  isLastQuestion: boolean;
  dispatch: Dispatch<QuizAction>;
}

export default function Footer({
  showNextButton,
  isLastQuestion,
  dispatch,
}: FooterProps) {
  return (
    showNextButton && (
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
    )
  );
}
