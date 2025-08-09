interface ProgressProps {
  questionsLength: number;
  currentQuestion: number;
  points: number;
}

export default function Progress({
  questionsLength,
  currentQuestion,
  points,
}: ProgressProps) {
  return (
    <div className="progress">
      <progress max={questionsLength} value={currentQuestion} />
      <p>
        Question <strong>{currentQuestion}</strong> / {questionsLength}
      </p>
      <p>
        <strong>{points}</strong> / {questionsLength * 10} points
      </p>
    </div>
  );
}
