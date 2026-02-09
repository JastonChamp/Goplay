// ===== Vocabulary Cloze Activity =====

const VocabCloze = (() => {
  let questions, current, score;

  function init() {
    questions = shuffle(DATA.vocabCloze).slice(0, 8);
    current = 0;
    score = 0;
    updateScore('vocab-cloze', 0, 0);
    updateProgress('vocab-cloze', 0, questions.length);
    showQuestion();
  }

  function showQuestion() {
    if (current >= questions.length) {
      showResults(score, questions.length);
      return;
    }

    clearFeedback('vocab-cloze');
    const q = questions[current];

    const display = document.getElementById('vocab-cloze-sentence');
    display.innerHTML = q.sentence.replace('___', '<span class="blank">___</span>');

    createOptionButtons('vocab-cloze-options', shuffle(q.options), (chosen, btn, container) => {
      const correct = chosen === q.answer;
      btn.classList.add(correct ? 'correct' : 'incorrect');

      if (correct) {
        score++;
        display.innerHTML = q.sentence.replace('___', '<span class="blank">' + q.answer + '</span>');
        showFeedback('vocab-cloze', true);
      } else {
        Array.from(container.children).forEach(b => {
          if (b.textContent === q.answer) b.classList.add('correct');
        });
        display.innerHTML = q.sentence.replace('___', '<span class="blank">' + q.answer + '</span>');
        showFeedback('vocab-cloze', false, 'The answer is "' + q.answer + '".');
      }

      Array.from(container.children).forEach(b => b.disabled = true);

      current++;
      updateScore('vocab-cloze', score, current);
      updateProgress('vocab-cloze', current, questions.length);

      setTimeout(() => showQuestion(), 1800);
    });
  }

  return { init };
})();
