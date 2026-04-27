import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

export default function QuizRunner() {
  const { currentQuiz, answerQuestion, nextQuestion, prevQuestion, finishQuiz, setView } = useQuiz();
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - currentQuiz.startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuiz.startTime]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
  const selectedAnswer = currentQuiz.answers[question.id];

  const handleSelect = (opt) => {
    answerQuestion(question.id, opt);
  };

  return (
    <div className="runner-container">
      <div className="runner-header">
        <button className="btn-text" onClick={() => setView('home')}>← Salir</button>
        <div className="runner-progress">
          Pregunta {currentQuiz.currentQuestionIndex + 1} de {currentQuiz.questions.length}
        </div>
        <div className="runner-time">{formatTime(timeElapsed)}</div>
      </div>

      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${((currentQuiz.currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="question-card">
        <span className="question-cat">{question.category}</span>
        <h2 className="question-text">{question.text}</h2>

        <div className="options-list">
          {question.options.map((opt, i) => (
            <button 
              key={i} 
              className={`option-btn ${selectedAnswer === opt ? 'selected' : ''}`}
              onClick={() => handleSelect(opt)}
            >
              <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
              <span className="opt-text">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="runner-footer">
        <button 
          className="btn-secondary" 
          onClick={prevQuestion} 
          disabled={currentQuiz.currentQuestionIndex === 0}
        >
          ← Anterior
        </button>

        {currentQuiz.currentQuestionIndex === currentQuiz.questions.length - 1 ? (
          <button className="btn-primary" onClick={finishQuiz}>
            Finalizar Examen
          </button>
        ) : (
          <button className="btn-primary" onClick={nextQuestion}>
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
