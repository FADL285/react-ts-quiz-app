import type { Dispatch } from "react";
import { ActionTypes, type QuizAction } from "../reducers/quiz.reducer";
import type { Question as QuestionType } from "../types";

interface QuestionProps {
  question: QuestionType;
  dispatch: Dispatch<QuizAction>;
  correctAnswer: number;
  answer: number | null;
}

export default function Question({
  question,
  dispatch,
  correctAnswer,
  answer,
}: QuestionProps) {
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
