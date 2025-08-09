import { useEffect, useReducer } from "react";
import Header from "./Header";
import { fetchQuestions as fetchQuestionsService } from "./services";
import {
  quizReducer,
  initialState,
  ActionTypes,
} from "./reducers/quiz.reducer";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

function App() {
  const [{ questions, status }, dispatch] = useReducer(
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
          <StartScreen questionsLength={questions.length} />
        )}
      </main>
    </div>
  );
}

export default App;
