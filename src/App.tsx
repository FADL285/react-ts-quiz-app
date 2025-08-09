import { useEffect, useReducer } from "react";
import { Header, Loader, Error, StartScreen, Question } from "./components";
import { fetchQuestions as fetchQuestionsService } from "./services";
import {
  quizReducer,
  initialState,
  ActionTypes,
} from "./reducers/quiz.reducer";

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    quizReducer,
    initialState
  );

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
          <Question question={questions[index]} dispatch={dispatch} />
        )}
      </main>
    </div>
  );
}

export default App;
