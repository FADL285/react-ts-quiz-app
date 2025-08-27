import { ActionTypes } from "../reducers/quiz.reducer";
import Timer from "./Timer";
import { useQuiz } from "@/hooks/useQuiz";

interface FooterProps {
  quizDuration: number;
}

export default function Footer({ quizDuration }: FooterProps) {
  const { answer, questionsLength, index, dispatch } = useQuiz();
  const showNextButton = answer !== null;
  const isLastQuestion = index === questionsLength - 1;

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
