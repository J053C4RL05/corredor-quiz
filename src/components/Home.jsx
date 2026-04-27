import React from 'react';
import { useQuiz } from '../context/QuizContext';

export default function Home() {
  const { categoryStats, startFullExam, startCategoryPractice, history } = useQuiz();

  const examDistribution = [
    { name: 'Ética y Mejores Prácticas', p: '12.5%' },
    { name: 'Lavado de Activos', p: '12.5%' },
    { name: 'Legislación', p: '21.25%' },
    { name: 'Operaciones Procedimientos', p: '21.25%' },
    { name: 'Matemáticas Financieras', p: '6.25%' },
    { name: 'Otros Instrumentos', p: '6.25%' },
    { name: 'Renta Fija', p: '6.25%' },
    { name: 'Renta Variable', p: '6.25%' },
    { name: 'Riesgos', p: '7.5%' }
  ];

  return (
    <div className="home-container">
      {/* Examen completo */}
      <section className="section-card">
        <div className="section-header">
          <div>
            <h2 className="section-title">Examen completo ponderado</h2>
            <p className="section-subtitle">~100 preguntas · Cronometrado · Mínimo 70% para aprobar</p>
          </div>
          <button className="btn-primary" onClick={startFullExam}>
            Iniciar →
          </button>
        </div>
        
        <div className="exam-distribution">
          {examDistribution.map(item => (
            <div key={item.name} className="dist-item">
              <span className="dist-name">{item.name}</span>
              <span className="dist-val">{item.p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Práctica por categoría */}
      <section className="section-card">
        <h2 className="section-title mb-16">Práctica por categoría</h2>
        <div className="category-grid">
          {categoryStats.map(cat => {
            const dist = examDistribution.find(d => d.name === cat.name);
            return (
              <button key={cat.name} className="cat-card" onClick={() => startCategoryPractice(cat.name)}>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-count">
                  {cat.count} preg {dist && `· ${dist.p}`}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Historial */}
      <section className="section-card">
        <div className="section-header">
          <h2 className="section-title">Historial</h2>
          <div className="hist-actions">
            <button className="btn-secondary">↓ Exportar</button>
            <button className="btn-secondary">↑ Importar</button>
          </div>
        </div>
        
        {history.length === 0 ? (
          <p className="hist-empty">Aún no has completado ningún examen.</p>
        ) : (
          <div className="hist-list">
            {history.map((h, i) => (
              <div key={h.id} className="hist-item">
                <div className="hist-info">
                  <div className="hist-type">{h.type === 'full' ? 'Examen Completo' : `Práctica: ${h.category}`}</div>
                  <div className="hist-date">{new Date(h.endTime).toLocaleString()}</div>
                </div>
                <div className="hist-score">
                  <span className={h.score / h.total >= 0.7 ? 'score-pass' : 'score-fail'}>
                    {h.score} / {h.total}
                  </span>
                  <span className="score-pct">
                    {Math.round((h.score / h.total) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
