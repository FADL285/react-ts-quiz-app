import type { Dispatch } from "react";
import type { QuizAction } from "../reducers/quiz.reducer";
import type { Question as QuestionType } from "../types";

interface QuestionProps {
  question: QuestionType;
  dispatch: Dispatch<QuizAction>;
}

export default function Question({ question, dispatch }: QuestionProps) {
  return (
    <div className="question">
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={option}
            className="btn btn-option"
            onClick={() => console.log(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
