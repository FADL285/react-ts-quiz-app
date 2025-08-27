import { ActionTypes } from "../reducers/quiz.reducer";
import { useQuiz } from "@/hooks/useQuiz";

export default function Question() {
  const { answer, questions, index, dispatch } = useQuiz();
  const question = questions[index];
  const correctAnswer = question.correctOption;

  const hasAnswered = answer !== null;

  return (
    <div className="question">
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={option}
            className={`btn btn-option ${
              hasAnswered && index === correctAnswer
                ? "correct"
                : index === answer
                ? "wrong"
                : ""
            }`}
            disabled={hasAnswered}
            onClick={() =>
              dispatch({ type: ActionTypes.ANSWER, payload: index })
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
