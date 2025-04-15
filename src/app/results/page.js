"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function ResultsPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const storedSummary = localStorage.getItem("summary");
    if (storedSummary) {
      try {
        const parsedSummary = JSON.parse(storedSummary);
        setSummary(parsedSummary);
      } catch {
        setSummary(storedSummary);
      }
    }

    const storedFlashcards = localStorage.getItem("flashcards");
    if (storedFlashcards) {
      try {
        const parsed = JSON.parse(storedFlashcards);
        if (Array.isArray(parsed.flashcards)) {
          setFlashcards(parsed.flashcards);
        } else if (Array.isArray(parsed)) {
          setFlashcards(parsed);
        } else {
          setFlashcards([]);
        }
      } catch {
        setFlashcards([]);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Results</h1>

      <div className="mb-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <div className="prose">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      </div>

      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-2">Flashcards</h2>
        {flashcards.length > 0 ? (
          <ul>
            {flashcards.map((card, index) => (
              <li key={index} className="mb-4 p-4 border rounded-lg">
                <p className="font-semibold">Question: {card.question}</p>
                <p>Answer: {card.answer}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flashcards available</p>
        )}
      </div>
    </div>
  );
}