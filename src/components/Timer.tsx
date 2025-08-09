import { useEffect, useState, type Dispatch } from "react";
import { ActionTypes, type QuizAction } from "../reducers/quiz.reducer";

interface TimerProps {
  quizDuration: number;
  dispatch: Dispatch<QuizAction>;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export default function Timer({ quizDuration, dispatch }: TimerProps) {
  const [seconds, setSeconds] = useState(quizDuration * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
      if (seconds === 0) {
        dispatch({ type: ActionTypes.FINISH_QUIZ });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds, dispatch]);

  return <div className="timer">{formatTime(seconds)}</div>;
}
