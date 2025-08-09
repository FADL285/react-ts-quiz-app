import type { Question } from "../types";

// Read API base URL from environment and validate at runtime
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

if (!API_BASE_URL) {
  throw new Error(
    "Missing VITE_API_BASE_URL. Create an .env file (see .env.example) and set VITE_API_BASE_URL to your questions API base URL."
  );
}

export const fetchQuestions = async (): Promise<Question[]> => {
  const res = await fetch(`${API_BASE_URL}/questions`);
  const data = await res.json();
  return data;
};
