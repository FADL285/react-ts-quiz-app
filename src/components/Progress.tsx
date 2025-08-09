interface ProgressProps {
  total: number;
  progress: number;
  points: number;
  totalPoints: number;
}

export default function Progress({
  total,
  progress,
  points,
  totalPoints,
}: ProgressProps) {
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
