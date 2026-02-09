// ===== Grammar Cloze Activity =====

const GrammarCloze = (() => {
  let questions, current, score;

  function init() {
    questions = shuffle(DATA.grammarCloze).slice(0, 8);
    current = 0;
    score = 0;
    updateScore('grammar-cloze', 0, 0);
    updateProgress('grammar-cloze', 0, questions.length);
    showQuestion();
  }

  function showQuestion() {
    if (current >= questions.length) {
      showResults(score, questions.length);
      return;
    }

    clearFeedback('grammar-cloze');
    const q = questions[current];

    // Render sentence with blank
    const display = document.getElementById('grammar-cloze-sentence');
    display.innerHTML = q.sentence.replace('___', '<span class="blank">___</span>');

    createOptionButtons('grammar-cloze-options', shuffle(q.options), (chosen, btn, container) => {
      const correct = chosen === q.answer;
      btn.classList.add(correct ? 'correct' : 'incorrect');

      if (correct) {
        score++;
        display.innerHTML = q.sentence.replace('___', '<span class="blank">' + q.answer + '</span>');
        showFeedback('grammar-cloze', true);
      } else {
        Array.from(container.children).forEach(b => {
          if (b.textContent === q.answer) b.classList.add('correct');
        });
        display.innerHTML = q.sentence.replace('___', '<span class="blank">' + q.answer + '</span>');
        showFeedback('grammar-cloze', false, 'The answer is "' + q.answer + '".');
      }

      Array.from(container.children).forEach(b => b.disabled = true);

      current++;
      updateScore('grammar-cloze', score, current);
      updateProgress('grammar-cloze', current, questions.length);

      setTimeout(() => showQuestion(), 1800);
    });
  }

  return { init };
})();
