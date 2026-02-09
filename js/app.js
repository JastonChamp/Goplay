// ===== Core App Logic =====

let currentActivity = null;
let lastActivity = null;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  if (screen) screen.classList.add('active');
}

function showHome() {
  currentActivity = null;
  showScreen('home-screen');
}

function startActivity(name) {
  currentActivity = name;
  lastActivity = name;
  showScreen(name + '-screen');

  switch (name) {
    case 'blending': Blending.init(); break;
    case 'first-sounds': FirstSounds.init(); break;
    case 'sight-words': SightWords.init(); break;
    case 'grammar-cloze': GrammarCloze.init(); break;
    case 'vocab-cloze': VocabCloze.init(); break;
    case 'word-order': WordOrder.init(); break;
  }
}

function replayActivity() {
  if (lastActivity) startActivity(lastActivity);
}

// --- Utility helpers ---

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function updateProgress(prefix, current, total) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  const bar = document.getElementById(prefix + '-progress');
  if (bar) bar.style.width = pct + '%';
}

function updateScore(prefix, correct, total) {
  const el = document.getElementById(prefix + '-score');
  if (el) el.textContent = correct + ' / ' + total;
}

function showFeedback(prefix, isCorrect, message) {
  const el = document.getElementById(prefix + '-feedback');
  if (!el) return;
  el.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
  el.textContent = message || (isCorrect ? 'Correct!' : 'Try again!');
}

function clearFeedback(prefix) {
  const el = document.getElementById(prefix + '-feedback');
  if (el) {
    el.className = 'feedback';
    el.textContent = '';
  }
}

function showResults(correct, total) {
  showScreen('results-screen');

  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const icon = document.getElementById('results-icon');
  const text = document.getElementById('results-text');
  const stars = document.getElementById('results-stars');

  text.textContent = 'You got ' + correct + ' out of ' + total + ' (' + pct + '%)';

  let starCount = 0;
  if (pct >= 90) starCount = 3;
  else if (pct >= 60) starCount = 2;
  else if (pct >= 30) starCount = 1;

  icon.textContent = pct >= 60 ? '🎉' : '💪';
  stars.textContent = '⭐'.repeat(starCount) + '☆'.repeat(3 - starCount);
}

function createOptionButtons(containerId, options, onSelect) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => onSelect(opt, btn, container));
    container.appendChild(btn);
  });
}
