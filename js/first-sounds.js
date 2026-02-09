// ===== First Sounds Activity =====

const FirstSounds = (() => {
  let questions, current, score;

  function init() {
    questions = shuffle(DATA.firstSounds).slice(0, 8);
    current = 0;
    score = 0;
    updateScore('first-sounds', 0, 0);
    updateProgress('first-sounds', 0, questions.length);
    showQuestion();
  }

  function showQuestion() {
    if (current >= questions.length) {
      showResults(score, questions.length);
      return;
    }

    clearFeedback('first-sounds');
    const q = questions[current];

    document.getElementById('first-sounds-word').textContent = q.word;

    createOptionButtons('first-sounds-options', shuffle(q.options), (chosen, btn, container) => {
      const correct = chosen === q.answer;
      btn.classList.add(correct ? 'correct' : 'incorrect');

      if (correct) {
        score++;
        showFeedback('first-sounds', true, '"' + q.word + '" starts with /' + q.answer + '/!');
      } else {
        Array.from(container.children).forEach(b => {
          if (b.textContent === q.answer) b.classList.add('correct');
        });
        showFeedback('first-sounds', false, '"' + q.word + '" starts with /' + q.answer + '/.');
      }

      Array.from(container.children).forEach(b => b.disabled = true);

      current++;
      updateScore('first-sounds', score, current);
      updateProgress('first-sounds', current, questions.length);

      setTimeout(() => showQuestion(), 1500);
    });
  }

  return { init };
})();
