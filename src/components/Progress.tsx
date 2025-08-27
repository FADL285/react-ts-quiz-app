import { useQuiz } from "@/hooks/useQuiz";

export default function Progress() {
  const { questionsLength: total, progress, points, totalPoints } = useQuiz();

  return (
    <div className="progress">
      <progress max={total} value={progress} />
      <p>
        Question <strong>{progress}</strong> / {total}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints} points
      </p>
    </div>
  );
}
