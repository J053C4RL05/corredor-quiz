import React, { createContext, useContext, useState, useEffect } from 'react';
import questionsData from '../data/questions.json';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [view, setView] = useState('home'); // home, runner, results
  const [theme, setTheme] = useState('dark');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('quizHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentQuiz, setCurrentQuiz] = useState({
    type: null, // 'full' or 'category'
    questions: [],
    currentQuestionIndex: 0,
    answers: {}, // questionId -> answer
    startTime: null,
    endTime: null,
    category: null, // if 'category' type
    failedQuestions: []
  });

  // Calculate stats for home view
  const categories = {};
  questionsData.forEach(q => {
    if (!categories[q.category]) categories[q.category] = 0;
    categories[q.category]++;
  });

  const categoryStats = Object.keys(categories).map(name => ({
    name,
    count: categories[name],
    percentage: (categories[name] / questionsData.length * 100).toFixed(2)
  })).sort((a, b) => a.name.localeCompare(b.name));

  const startFullExam = () => {
    // 100 questions ponderado.
    // Etica 12.5%, Lavado 12.5%, Legislación 21.25%, Operaciones 21.25%,
    // Mate 6.25%, Renta Fija 6.25%, Renta Variable 6.25%, Otros 6.25%, Riesgos 7.5%
    // Simplified distribution for now: take randomly from each category based on weight.
    const distribution = {
      'Ética y Mejores Prácticas': 13,
      'Lavado de Activos': 12,
      'Legislación': 21,
      'Operaciones Procedimientos': 21,
      'Matemáticas Financieras': 6,
      'Renta Fija': 6,
      'Renta Variable': 6,
      'Otros Instrumentos': 6,
      'Riesgos': 8,
      'Economía': 1 // To make 100
    };

    let selectedQuestions = [];
    
    // Group questions by category
    const byCategory = {};
    questionsData.forEach(q => {
      if (!byCategory[q.category]) byCategory[q.category] = [];
      byCategory[q.category].push(q);
    });

    Object.keys(distribution).forEach(cat => {
      if (byCategory[cat]) {
        const shuffled = [...byCategory[cat]].sort(() => 0.5 - Math.random());
        selectedQuestions = selectedQuestions.concat(shuffled.slice(0, distribution[cat]));
      }
    });

    // Fill up to 100 if missing
    if (selectedQuestions.length < 100) {
      const remaining = [...questionsData].filter(q => !selectedQuestions.includes(q)).sort(() => 0.5 - Math.random());
      selectedQuestions = selectedQuestions.concat(remaining.slice(0, 100 - selectedQuestions.length));
    }

    selectedQuestions = selectedQuestions.sort(() => 0.5 - Math.random());

    setCurrentQuiz({
      type: 'full',
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      answers: {},
      startTime: Date.now(),
      endTime: null,
      category: null,
      failedQuestions: []
    });
    setView('runner');
  };

  const startCategoryPractice = (category) => {
    const selectedQuestions = questionsData.filter(q => q.category === category).sort(() => 0.5 - Math.random());
    setCurrentQuiz({
      type: 'category',
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      answers: {},
      startTime: Date.now(),
      endTime: null,
      category: category,
      failedQuestions: []
    });
    setView('runner');
  };

  const answerQuestion = (questionId, answer) => {
    setCurrentQuiz(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  };

  const nextQuestion = () => {
    setCurrentQuiz(prev => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1)
    }));
  };

  const prevQuestion = () => {
    setCurrentQuiz(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0)
    }));
  };

  const finishQuiz = () => {
    const endTime = Date.now();
    const result = {
      id: Date.now(),
      type: currentQuiz.type,
      category: currentQuiz.category,
      score: 0,
      total: currentQuiz.questions.length,
      startTime: currentQuiz.startTime,
      endTime: endTime,
      timeSpent: endTime - currentQuiz.startTime
    };

    let correctCount = 0;
    const failedQuestions = [];
    currentQuiz.questions.forEach(q => {
      if (currentQuiz.answers[q.id] === q.correctAnswer) {
        correctCount++;
      } else {
        failedQuestions.push(q);
      }
    });
    
    result.score = correctCount;
    
    const newHistory = [result, ...history];
    setHistory(newHistory);
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));
    
    setCurrentQuiz(prev => ({ ...prev, endTime, failedQuestions }));
    setView('results');
  };

  const startRetryFailed = () => {
    if (!currentQuiz.failedQuestions || currentQuiz.failedQuestions.length === 0) return;
    
    setCurrentQuiz(prev => ({
      type: 'retry',
      questions: [...prev.failedQuestions].sort(() => 0.5 - Math.random()),
      currentQuestionIndex: 0,
      answers: {},
      startTime: Date.now(),
      endTime: null,
      category: prev.category,
      failedQuestions: []
    }));
    setView('runner');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const value = {
    view, setView,
    theme, toggleTheme,
    history,
    currentQuiz,
    categoryStats,
    startFullExam,
    startCategoryPractice,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    finishQuiz,
    startRetryFailed,
    totalQuestions: questionsData.length
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};
