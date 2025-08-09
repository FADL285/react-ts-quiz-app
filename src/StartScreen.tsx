export default function StartScreen({
  questionsLength,
}: {
  questionsLength: number;
}) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <p>{questionsLength} questions to test your React knowledge.</p>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
}
