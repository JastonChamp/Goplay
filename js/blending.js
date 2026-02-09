// ===== Blending Activity =====

const Blending = (() => {
  let questions, current, score;

  function init() {
    questions = shuffle(DATA.blending).slice(0, 8);
    current = 0;
    score = 0;
    updateScore('blending', 0, 0);
    updateProgress('blending', 0, questions.length);
    showQuestion();
  }

  function showQuestion() {
    if (current >= questions.length) {
      showResults(score, questions.length);
      return;
    }

    clearFeedback('blending');
    const q = questions[current];

    // Display sounds with separators
    const display = document.getElementById('blending-sounds');
    display.innerHTML = q.sounds
      .map(s => '<span>' + s + '</span>')
      .join('<span class="divider">-</span>');

    // Options
    createOptionButtons('blending-options', shuffle(q.options), (chosen, btn, container) => {
      const correct = chosen === q.answer;
      btn.classList.add(correct ? 'correct' : 'incorrect');

      if (correct) {
        score++;
        showFeedback('blending', true, 'Yes! The word is "' + q.answer + '"!');
      } else {
        // highlight correct answer
        Array.from(container.children).forEach(b => {
          if (b.textContent === q.answer) b.classList.add('correct');
        });
        showFeedback('blending', false, 'The word is "' + q.answer + '".');
      }

      // disable all buttons
      Array.from(container.children).forEach(b => b.disabled = true);

      current++;
      updateScore('blending', score, current);
      updateProgress('blending', current, questions.length);

      setTimeout(() => showQuestion(), 1500);
    });
  }

  return { init };
})();
