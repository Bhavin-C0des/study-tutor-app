"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    // Load flashcards from localStorage
    const storedFlashcards = localStorage.getItem("flashcards");
    if (storedFlashcards) {
      try {
        const parsed = JSON.parse(storedFlashcards);
        if (parsed && Array.isArray(parsed.flashcards)) {
          setFlashcards(parsed.flashcards);
        } else if (Array.isArray(parsed)) {
          setFlashcards(parsed);
        }
      } catch (error) {
        console.error("Error parsing flashcards:", error);
      }
    }
  }, []);

  const handleCardClick = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  if (flashcards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Flashcards</h1>
        <p className="text-foreground">No flashcards available</p>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center max-h-screen p-8">
      <div className="w-full flex justify-end mb-4">
        <Link
          href="/summary"
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
        >
          Go to Summary
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8">Flashcards</h1>

      {/* Center content with flex-grow */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div
          className="cursor-pointer p-8 border rounded-lg shadow-md max-w-xl text-center bg-card border-border"
          onClick={handleCardClick}
        >
          <p className="text-2xl font-semibold mb-4 text-foreground">{currentCard.question}</p>
          {showAnswer ? (
            <p className="text-lg text-foreground">{currentCard.answer}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Click to reveal answer</p>
          )}
        </div>

        <div className="mt-8 flex space-x-4">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
