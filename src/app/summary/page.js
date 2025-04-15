"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function ResultsPage() {
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
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      {/* Flashcards Button (Top Right) */}
      <div className="w-full flex justify-end mb-4">
        <Link
          href="/flashcards"
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
        >
          Go to Flashcards
        </Link>
      </div>

      {/* Results Content */}
      <div className="flex flex-col items-center justify-center w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Summary</h1>

        {/* Summary */}
        <div className="p-4 break-words overflow-auto">
          <ReactMarkdown>
            {summary}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
