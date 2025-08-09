import type { Question } from "../types";

const BASE_URL = "http://localhost:8000";

export const fetchQuestions = async (): Promise<Question[]> => {
  const res = await fetch(`${BASE_URL}/questions`);
  const data = await res.json();
  return data;
};
