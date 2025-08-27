import {
  Header,
  Loader,
  Error,
  StartScreen,
  Question,
  Footer,
  FinishScreen,
  Progress,
} from "@/components";
import { QuizProvider } from "@/providers/quiz-provider";
import { useQuiz } from "@/hooks/useQuiz";

const QUIZ_DURATION_IN_MINUTES = 15;

function QuizContent() {
  const { status } = useQuiz();

  return (
    <main className="main">
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" && (
        <>
          <Progress />
          <Question />
          <Footer quizDuration={QUIZ_DURATION_IN_MINUTES} />
        </>
      )}
      {status === "finished" && <FinishScreen />}
    </main>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <QuizProvider>
        <QuizContent />
      </QuizProvider>
    </div>
  );
}

export default App;
