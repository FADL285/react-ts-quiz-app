interface ProgressProps {
  total: number;
  progress: number;
  points: number;
}

export default function Progress({
  total,
  progress,
  points,
}: ProgressProps) {
  return (
    <div className="progress">
      <progress max={total} value={progress} />
      <p>
        Question <strong>{progress}</strong> / {total}
      </p>
      <p>
        <strong>{points}</strong> / {total * 10} points
      </p>
    </div>
  );
}
