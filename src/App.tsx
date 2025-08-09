import { useEffect, useReducer } from "react";
import {
  Header,
  Loader,
  Error,
  StartScreen,
  Question,
  Footer,
  FinishScreen,
} from "./components";
import { fetchQuestions as fetchQuestionsService } from "./services";
import {
  quizReducer,
  initialState,
  ActionTypes,
} from "./reducers/quiz.reducer";

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    quizReducer,
    initialState
  );

  const showNextButton = answer !== null;
  const isLastQuestion = index === questions.length - 1;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        dispatch({ type: ActionTypes.LOAD_START });
        const data = await fetchQuestionsService();
        dispatch({ type: ActionTypes.LOAD_SUCCESS, payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: ActionTypes.LOAD_ERROR });
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsLength={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <div className="progress">
              <progress max={questions.length} value={index + 1} />
              <p>
                Question <strong>{index + 1}</strong> / {questions.length}
              </p>
              <p>
                <strong>{points}</strong> / {questions.length * 10}
              </p>
            </div>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              correctAnswer={questions[index].correctOption}
            />
            <Footer
              showNextButton={showNextButton}
              isLastQuestion={isLastQuestion}
              dispatch={dispatch}
            />
          </>
        )}
        {status === "finished" && <FinishScreen dispatch={dispatch} />}
      </main>
    </div>
  );
}

export default App;
