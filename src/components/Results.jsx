import React from 'react';
import { useQuiz } from '../context/QuizContext';

export default function Results() {
  const { history, setView } = useQuiz();
  const lastResult = history[0];

  if (!lastResult) return null;

  const pct = lastResult.score / lastResult.total;
  const passed = pct >= 0.7;

  return (
    <div className="results-container">
      <div className="section-card text-center" style={{ padding: '40px 20px' }}>
        <h2 className="section-title" style={{ fontSize: '24px', marginBottom: '8px' }}>
          {lastResult.type === 'full' ? 'Resultados del Examen' : `Resultados: ${lastResult.category}`}
        </h2>
        
        <div className={`results-score ${passed ? 'passed' : 'failed'}`}>
          {Math.round(pct * 100)}%
        </div>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Respondiste correctamente {lastResult.score} de {lastResult.total} preguntas.
          <br/>
          {passed ? '¡Felicidades, has aprobado!' : 'Necesitas un mínimo de 70% para aprobar. ¡Sigue practicando!'}
        </p>

        <button className="btn-primary" onClick={() => setView('home')}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
