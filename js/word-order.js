// ===== Word Order Activity =====

const WordOrder = (() => {
  let questions, current, score;
  let builtWords, shuffledWords;

  function init() {
    questions = shuffle(DATA.wordOrder).slice(0, 8);
    current = 0;
    score = 0;
    updateScore('word-order', 0, 0);
    updateProgress('word-order', 0, questions.length);
    showQuestion();
  }

  function showQuestion() {
    if (current >= questions.length) {
      showResults(score, questions.length);
      return;
    }

    clearFeedback('word-order');
    const q = questions[current];

    builtWords = [];
    shuffledWords = shuffle(q.words);

    document.getElementById('word-order-clear').style.display = 'inline-block';
    renderBank();
    renderBuilt();
  }

  function renderBank() {
    const bank = document.getElementById('word-order-bank');
    bank.innerHTML = '';

    shuffledWords.forEach((word, idx) => {
      const chip = document.createElement('button');
      chip.className = 'word-chip';
      if (builtWords.includes(idx)) chip.classList.add('used');
      chip.textContent = word;
      chip.addEventListener('click', () => {
        if (builtWords.includes(idx)) return;
        builtWords.push(idx);
        renderBank();
        renderBuilt();
        checkAnswer();
      });
      bank.appendChild(chip);
    });
  }

  function renderBuilt() {
    const built = document.getElementById('word-order-built');
    built.innerHTML = '';

    builtWords.forEach((idx, pos) => {
      const chip = document.createElement('button');
      chip.className = 'word-chip';
      chip.textContent = shuffledWords[idx];
      chip.addEventListener('click', () => {
        builtWords.splice(pos, 1);
        renderBank();
        renderBuilt();
      });
      built.appendChild(chip);
    });
  }

  function checkAnswer() {
    const q = questions[current];
    if (builtWords.length !== shuffledWords.length) return;

    const attempt = builtWords.map(i => shuffledWords[i]).join(' ');
    const correct = attempt === q.answer;

    if (correct) {
      score++;
      showFeedback('word-order', true, 'Perfect sentence!');
    } else {
      showFeedback('word-order', false, 'Correct order: ' + q.answer);
    }

    current++;
    updateScore('word-order', score, current);
    updateProgress('word-order', current, questions.length);

    setTimeout(() => showQuestion(), 2000);
  }

  function clearSentence() {
    builtWords = [];
    clearFeedback('word-order');
    renderBank();
    renderBuilt();
  }

  return { init, clearSentence };
})();
