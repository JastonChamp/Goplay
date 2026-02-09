// ===== Matching Sight Words Activity =====

const SightWords = (() => {
  let cards, selected, matchesFound, totalPairs, attempts;

  function init() {
    // Pick 6 random words, duplicate them for pairs
    const words = shuffle(DATA.sightWords).slice(0, 6);
    totalPairs = words.length;
    matchesFound = 0;
    attempts = 0;
    selected = null;

    cards = shuffle([...words, ...words]);

    updateScore('sight-words', 0, 0);
    updateProgress('sight-words', 0, totalPairs);
    clearFeedback('sight-words');
    renderGrid();
  }

  function renderGrid() {
    const grid = document.getElementById('sight-words-grid');
    grid.innerHTML = '';

    cards.forEach((word, idx) => {
      const card = document.createElement('button');
      card.className = 'match-card';
      card.textContent = word;
      card.dataset.index = idx;
      card.addEventListener('click', () => handleSelect(card, idx));
      grid.appendChild(card);
    });
  }

  function handleSelect(card, idx) {
    if (card.classList.contains('matched') || card.classList.contains('selected')) return;

    card.classList.add('selected');

    if (selected === null) {
      selected = { card, idx };
    } else {
      attempts++;
      const first = selected;
      selected = null;

      if (cards[first.idx] === cards[idx] && first.idx !== idx) {
        // Match!
        matchesFound++;
        first.card.classList.remove('selected');
        card.classList.remove('selected');
        first.card.classList.add('matched');
        card.classList.add('matched');

        updateScore('sight-words', matchesFound, attempts);
        updateProgress('sight-words', matchesFound, totalPairs);

        if (matchesFound === totalPairs) {
          showFeedback('sight-words', true, 'All matched!');
          setTimeout(() => showResults(matchesFound, attempts), 1200);
        }
      } else {
        // No match
        first.card.classList.add('wrong');
        card.classList.add('wrong');

        updateScore('sight-words', matchesFound, attempts);

        setTimeout(() => {
          first.card.classList.remove('selected', 'wrong');
          card.classList.remove('selected', 'wrong');
        }, 600);
      }
    }
  }

  return { init };
})();
