import type { Question } from "../types";

const BASE_URL =
  "https://my-json-server.typicode.com/FADL285/react-ts-quiz-app";

export const fetchQuestions = async (): Promise<Question[]> => {
  const res = await fetch(`${BASE_URL}/questions`);
  const data = await res.json();
  return data;
};
