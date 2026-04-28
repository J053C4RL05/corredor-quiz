import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

export default function QuizRunner() {
  const { currentQuiz, answerQuestion, nextQuestion, prevQuestion, finishQuiz, setView } = useQuiz();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState('/pdfs/EXAMEN PREGUNTAS Y RESPUESTAS 2024.pdf');

  const pdfOptions = [
    { label: 'Examen Resuelto 2024', value: '/pdfs/EXAMEN PREGUNTAS Y RESPUESTAS 2024.pdf' },
    { label: 'Compendio de Estudio', value: '/pdfs/Compedio de Estudio - Examen Corredor de Valores.pdf' },
    { label: 'Ley 155-17', value: '/pdfs/Ley-No.-155-17.pdf' },
    { label: 'Ley 249-17', value: '/pdfs/Ley-No.-249-17.pdf' },
    { label: 'Reglamento AFI', value: '/pdfs/Reglamento AFI..pdf' },
    { label: 'Reglamento Intermediarios', value: '/pdfs/Reglamento para los intermediarios de valores.pdf' }
  ];

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
    if (!selectedAnswer) {
      answerQuestion(question.id, opt);
    }
  };

  const isAnswered = !!selectedAnswer;
  const isCorrect = selectedAnswer === question.correctAnswer;

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
          {question.options.map((opt, i) => {
            let className = 'option-btn';
            if (isAnswered) {
              if (opt === question.correctAnswer) className += ' correct';
              else if (opt === selectedAnswer) className += ' wrong';
              else className += ' disabled';
            } else if (selectedAnswer === opt) {
              className += ' selected';
            }

            return (
              <button 
                key={i} 
                className={className}
                onClick={() => handleSelect(opt)}
                disabled={isAnswered}
              >
                <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                <span className="opt-text">{opt}</span>
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <div className={`feedback-box ${isCorrect ? 'fb-correct' : 'fb-wrong'}`}>
            <h3 className="fb-title">{isCorrect ? '¡Correcto!' : 'Incorrecto'}</h3>
            {question.explanation && (
              <div className="fb-expl">
                <p style={{whiteSpace: 'pre-wrap'}}>{question.explanation}</p>
              </div>
            )}
            {!question.explanation && !isCorrect && (
              <p className="fb-expl">La respuesta correcta es: <strong>{question.correctAnswer}</strong></p>
            )}
            
            <div className="fb-source-bar">
              {question.source && <span className="source-badge">Fuente: {question.source}</span>}
              <button className="btn-secondary btn-sm" onClick={() => setShowViewer(!showViewer)}>
                {showViewer ? 'Ocultar Material' : '📚 Ver Material de Estudio'}
              </button>
            </div>

            {showViewer && (
              <div className="pdf-viewer-container">
                <div className="pdf-viewer-header">
                  <span style={{fontSize: '13px'}}>Selecciona documento:</span>
                  <select 
                    className="pdf-select"
                    value={selectedPdf} 
                    onChange={(e) => setSelectedPdf(e.target.value)}
                  >
                    {pdfOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <iframe src={selectedPdf} className="pdf-iframe" title="Visor de PDF"></iframe>
              </div>
            )}
          </div>
        )}
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
          <button className="btn-primary" onClick={finishQuiz} disabled={!isAnswered}>
            Finalizar Examen
          </button>
        ) : (
          <button className="btn-primary" onClick={nextQuestion} disabled={!isAnswered}>
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
