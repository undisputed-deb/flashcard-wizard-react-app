
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, Star, RotateCcw } from 'lucide-react';
import './FlashcardApp.css';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

const allFlashcardsData: Flashcard[] = [
  { id: 1, question: "What is the capital of France?", answer: "Paris" },
  { id: 2, question: "What is 2 + 2?", answer: "4" },
  { id: 3, question: "What is the largest planet in our solar system?", answer: "Jupiter" },
  { id: 4, question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
  { id: 5, question: "What is the chemical symbol for gold?", answer: "Au" },
  { id: 6, question: "What year did World War II end?", answer: "1945" },
  { id: 7, question: "What is the smallest country in the world?", answer: "Vatican City" },
  { id: 8, question: "What is the square root of 64?", answer: "8" },
  { id: 9, question: "What is the capital of Japan?", answer: "Tokyo" },
  { id: 10, question: "Who wrote Romeo and Juliet?", answer: "William Shakespeare" },
  { id: 11, question: "What is the largest ocean on Earth?", answer: "Pacific Ocean" },
  { id: 12, question: "What gas do plants absorb from the atmosphere?", answer: "Carbon Dioxide" },
  { id: 13, question: "What is 7 × 8?", answer: "56" },
  { id: 14, question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
  { id: 15, question: "In which year did the Titanic sink?", answer: "1912" },
  { id: 16, question: "What is the capital of Australia?", answer: "Canberra" },
  { id: 17, question: "How many sides does a hexagon have?", answer: "6" },
];

const FlashcardApp: React.FC = () => {
  const [activeCards, setActiveCards] = useState<Flashcard[]>([...allFlashcardsData]);
  const [masteredCards, setMasteredCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const currentCard = activeCards[currentCardIndex];

  // Fuzzy matching function
  const fuzzyMatch = (guess: string, answer: string): boolean => {
    const normalizeString = (str: string) => 
      str.toLowerCase()
         .replace(/[^\w\s]/g, '') // Remove punctuation
         .trim();

    const normalizedGuess = normalizeString(guess);
    const normalizedAnswer = normalizeString(answer);

    // Exact match after normalization
    if (normalizedGuess === normalizedAnswer) return true;

    // Partial match (guess contains answer or answer contains guess)
    if (normalizedGuess.includes(normalizedAnswer) || normalizedAnswer.includes(normalizedGuess)) {
      return true;
    }

    // Check if guess matches any significant word in the answer
    const answerWords = normalizedAnswer.split(/\s+/).filter(word => word.length > 2);
    const guessWords = normalizedGuess.split(/\s+/).filter(word => word.length > 2);
    
    return answerWords.some(answerWord => 
      guessWords.some(guessWord => 
        answerWord.includes(guessWord) || guessWord.includes(answerWord)
      )
    );
  };

  const handleGuessSubmit = () => {
    if (!userGuess.trim() || !currentCard) return;

    const isCorrect = fuzzyMatch(userGuess, currentCard.answer);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setHasGuessed(true);
    
    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
      setTimeout(() => {
        setShowAnswer(true);
      }, 1000);
    } else {
      setCurrentStreak(0);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextCard = () => {
    if (currentCardIndex < activeCards.length - 1) {
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

  const handleShuffle = () => {
    const shuffled = [...activeCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setActiveCards(shuffled);
    setCurrentCardIndex(0);
    resetCardState();
  };

  const handleMasterCard = () => {
    if (!currentCard) return;
    
    const updatedActiveCards = activeCards.filter(card => card.id !== currentCard.id);
    setMasteredCards([...masteredCards, currentCard]);
    setActiveCards(updatedActiveCards);
    
    if (updatedActiveCards.length === 0) {
      // All cards mastered
      return;
    }
    
    // Adjust current index if needed
    if (currentCardIndex >= updatedActiveCards.length) {
      setCurrentCardIndex(updatedActiveCards.length - 1);
    }
    
    resetCardState();
  };

  const handleResetAll = () => {
    setActiveCards([...allFlashcardsData]);
    setMasteredCards([]);
    setCurrentCardIndex(0);
    setCurrentStreak(0);
    setLongestStreak(0);
    resetCardState();
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

  if (activeCards.length === 0) {
    return (
      <div className="flashcard-app">
        <div className="app-header">
          <h1>🧠 Flashcard Study App</h1>
          <p className="completion-message">
            🎉 Congratulations! You've mastered all cards!
          </p>
        </div>
        <div className="flashcard-container">
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-label">Cards Mastered:</span>
              <span className="stat-value">{masteredCards.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Longest Streak:</span>
              <span className="stat-value">{longestStreak}</span>
            </div>
          </div>
          <button onClick={handleResetAll} className="reset-all-button">
            <RotateCcw size={20} />
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcard-app">
      <div className="app-header">
        <h1>🧠 Flashcard Study App</h1>
        <div className="header-info">
          <p className="card-counter">
            Card {currentCardIndex + 1} of {activeCards.length}
          </p>
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-label">Current Streak:</span>
              <span className="stat-value current-streak">{currentStreak}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Longest Streak:</span>
              <span className="stat-value longest-streak">{longestStreak}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Mastered:</span>
              <span className="stat-value mastered-count">{masteredCards.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flashcard-container">
        <div className="control-buttons">
          <button onClick={handleShuffle} className="shuffle-button">
            <Shuffle size={20} />
            Shuffle Cards
          </button>
          
          <button onClick={handleMasterCard} className="master-button">
            <Star size={20} />
            Mark as Mastered
          </button>
        </div>

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
            disabled={currentCardIndex === activeCards.length - 1}
            className={`nav-button next-button ${currentCardIndex === activeCards.length - 1 ? 'disabled' : ''}`}
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
