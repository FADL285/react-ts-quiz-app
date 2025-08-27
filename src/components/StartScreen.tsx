import { ActionTypes } from "../reducers/quiz.reducer";
import { useQuiz } from "@/hooks/useQuiz";

export default function StartScreen() {
  const { questionsLength, dispatch } = useQuiz();

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
