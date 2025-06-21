
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './FlashcardApp.css';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

const flashcardsData: Flashcard[] = [
  { id: 1, question: "What is the capital of France?", answer: "Paris" },
  { id: 2, question: "What is 2 + 2?", answer: "4" },
  { id: 3, question: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { id: 4, question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  { id: 5, question: "What is the chemical symbol for gold?", answer: "Au" },
  { id: 6, question: "What year did World War II end?", answer: "1945" },
  { id: 7, question: "What is the smallest country in the world?", answer: "Vatican City" },
  { id: 8, question: "What is the square root of 64?", answer: "8" },
];

const FlashcardApp: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [hasGuessed, setHasGuessed] = useState(false);

  const currentCard = flashcardsData[currentCardIndex];

  const handleGuessSubmit = () => {
    if (!userGuess.trim()) return;

    const isCorrect = userGuess.toLowerCase().trim() === currentCard.answer.toLowerCase().trim();
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setHasGuessed(true);
    
    if (isCorrect) {
      setTimeout(() => {
        setShowAnswer(true);
      }, 1000);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextCard = () => {
    if (currentCardIndex < flashcardsData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      resetCardState();
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      resetCardState();
    }
  };

  const resetCardState = () => {
    setUserGuess('');
    setShowAnswer(false);
    setFeedback(null);
    setHasGuessed(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGuessSubmit();
    }
  };

  return (
    <div className="flashcard-app">
      <div className="app-header">
        <h1>🧠 Flashcard Study App</h1>
        <p className="card-counter">
          Card {currentCardIndex + 1} of {flashcardsData.length}
        </p>
      </div>

      <div className="flashcard-container">
        <div className={`flashcard ${showAnswer ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <h2>Question</h2>
            <p className="question-text">{currentCard.question}</p>
          </div>
          
          <div className="flashcard-back">
            <h2>Answer</h2>
            <p className="answer-text">{currentCard.answer}</p>
          </div>
        </div>

        {!showAnswer && (
          <div className="guess-section">
            <div className="input-group">
              <label htmlFor="guess-input" className="input-label">
                Your Guess:
              </label>
              <input
                id="guess-input"
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer here..."
                className={`guess-input ${feedback ? `feedback-${feedback}` : ''}`}
                disabled={hasGuessed && feedback === 'correct'}
              />
            </div>
            
            <div className="button-group">
              <button 
                onClick={handleGuessSubmit}
                className="submit-button"
                disabled={!userGuess.trim() || (hasGuessed && feedback === 'correct')}
              >
                Submit Guess
              </button>
              
              {hasGuessed && feedback === 'incorrect' && (
                <button 
                  onClick={handleShowAnswer}
                  className="show-answer-button"
                >
                  Show Answer
                </button>
              )}
            </div>

            {feedback && (
              <div className={`feedback-message ${feedback}`}>
                {feedback === 'correct' ? '✅ Correct! Great job!' : '❌ Incorrect. Try again or show the answer.'}
              </div>
            )}
          </div>
        )}

        <div className="navigation-controls">
          <button
            onClick={handlePreviousCard}
            disabled={currentCardIndex === 0}
            className={`nav-button prev-button ${currentCardIndex === 0 ? 'disabled' : ''}`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          <button
            onClick={resetCardState}
            className="reset-button"
          >
            Reset Card
          </button>
          
          <button
            onClick={handleNextCard}
            disabled={currentCardIndex === flashcardsData.length - 1}
            className={`nav-button next-button ${currentCardIndex === flashcardsData.length - 1 ? 'disabled' : ''}`}
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardApp;
