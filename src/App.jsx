import React from 'react';
import { useQuiz } from './context/QuizContext';
import Home from './components/Home';
import QuizRunner from './components/QuizRunner';
import Results from './components/Results';

function App() {
  const { view, theme, toggleTheme, totalQuestions } = useQuiz();

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div>
            <h1 className="main-title">Simulador de Examen</h1>
            <p className="subtitle">Corredor de Valores · República Dominicana · {totalQuestions} preguntas</p>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </div>
      </header>

      <main className="main-content">
        {view === 'home' && <Home />}
        {view === 'runner' && <QuizRunner />}
        {view === 'results' && <Results />}
      </main>
    </div>
  );
}

export default App;
