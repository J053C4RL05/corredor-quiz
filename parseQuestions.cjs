const fs = require('fs');
const path = require('path');

const mdPath = path.resolve('c:/Users/Jose Carlos/Desktop/Examen SIMV/material_estudio_corredor_valores_v3.md');
const content = fs.readFileSync(mdPath, 'utf-8');

const lines = content.split('\n');

const questions = [];
let currentCategory = '';
let currentQuestion = null;
let currentOptions = [];
let parsingOptions = false;

// We need a deterministic ID for each question
let idCounter = 1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  if (line.startsWith('## ')) {
    currentCategory = line.replace('## ', '').trim();
    // Reset or ignore
  } else if (line.startsWith('### ')) {
    // New question starts
    if (currentQuestion) {
      currentQuestion.options = currentOptions;
      questions.push(currentQuestion);
    }
    
    // Parse part/section from title like "### 1. [PARTE 1 - Q200]"
    const titleMatch = line.match(/\[(.*?)\]/);
    const source = titleMatch ? titleMatch[1] : '';

    currentQuestion = {
      id: idCounter++,
      category: currentCategory,
      source: source,
      text: '',
      options: [],
      correctAnswer: '',
      explanation: ''
    };
    currentOptions = [];
    parsingOptions = false;
  } else if (line.startsWith('**Pregunta:**')) {
    if (currentQuestion) {
      currentQuestion.text = line.replace('**Pregunta:**', '').trim();
      // Handle multiline questions
      let j = i + 1;
      while (j < lines.length && !lines[j].trim().startsWith('**Opciones:**')) {
        if (lines[j].trim() !== '') {
           currentQuestion.text += '\n' + lines[j].trim();
        }
        j++;
      }
      i = j - 1; // Advance
    }
  } else if (line.startsWith('**Opciones:**')) {
    parsingOptions = true;
  } else if (parsingOptions && line.startsWith('- ')) {
    const optText = line.replace('- ', '').trim();
    if (optText.startsWith('✓ ')) {
      const actualOpt = optText.replace('✓ ', '').trim();
      currentOptions.push(actualOpt);
      currentQuestion.correctAnswer = actualOpt;
    } else if (optText.startsWith('· ')) {
      currentOptions.push(optText.replace('· ', '').trim());
    } else {
      currentOptions.push(optText);
    }
  } else if (line.startsWith('**Respuesta correcta:**')) {
    parsingOptions = false;
    // We already have the correct answer from the ✓, but we can verify it here.
    if (currentQuestion && !currentQuestion.correctAnswer) {
        currentQuestion.correctAnswer = line.replace('**Respuesta correcta:**', '').trim();
    }
  } else if (line.startsWith('**Explicación:**')) {
    if (currentQuestion) {
      currentQuestion.explanation = line.replace('**Explicación:**', '').trim();
      // Handle multiline explanations
      let j = i + 1;
      while (j < lines.length && !lines[j].trim().startsWith('### ') && !lines[j].trim().startsWith('## ') && !lines[j].trim().startsWith('---')) {
        if (lines[j].trim() !== '') {
           currentQuestion.explanation += '\n' + lines[j].trim();
        }
        j++;
      }
      i = j - 1; // Advance
    }
  }
}

// push the last one
if (currentQuestion) {
  currentQuestion.options = currentOptions;
  questions.push(currentQuestion);
}

// Clean up: filter out any empty categories or invalid questions
const validQuestions = questions.filter(q => q.category && q.text && q.options.length > 0 && q.correctAnswer);

// Write to src/data/questions.json
const dataDir = path.resolve(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'questions.json'), JSON.stringify(validQuestions, null, 2), 'utf-8');

console.log(`Successfully parsed ${validQuestions.length} questions into src/data/questions.json`);
