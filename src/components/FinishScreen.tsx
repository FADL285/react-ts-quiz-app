import { ActionTypes } from "../reducers/quiz.reducer";
import { useQuiz } from "@/hooks/useQuiz";

export default function FinishScreen() {
  const { highScore, points, totalPoints, dispatch } = useQuiz();

  const percentage = (points / totalPoints) * 100;
  let emoji = "🎉";
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80 && percentage < 100) emoji = "🥳";
  else if (percentage >= 70 && percentage < 80) emoji = "🎊";
  else if (percentage >= 50 && percentage < 70) emoji = "🤔";
  else if (percentage >= 30 && percentage < 50) emoji = "🤨";
  else if (percentage >= 0 && percentage < 30) emoji = "🤷";
  else emoji = "🤦";

  return (
    <div className="finish">
      <p className="result">
        <span className="emoji">{emoji}</span> You scored{" "}
        <strong>{points}</strong> out of <strong>{totalPoints}</strong> points (
        {Math.round(percentage)}%)
      </p>
      <p className="highscore">
        High Score: <strong>{highScore}</strong>
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
