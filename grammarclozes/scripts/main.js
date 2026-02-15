import { passages } from './data/passages.js';
import { speak, loadVoices } from './utils/speech.js';

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
  currentGrammarType: "P1",
  currentPassageIndex: 0,
  score: 0,
  stars: 0,
  xp: Number(localStorage.getItem('xp')) || 0,
  totalXp: Number(localStorage.getItem('totalXp')) || 0,
  streak: Number(localStorage.getItem('streak')) || 0,
  lastPlayedDate: localStorage.getItem('lastPlayedDate') || null,
  hintUsage: {},
  selectedWord: null,
  timeLeft: 60,
  timerInterval: null,
  level: "Apprentice",
  levelIndex: 0,
  achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
  gems: Number(localStorage.getItem('gems')) || 0,
  soundEnabled: localStorage.getItem('soundEnabled') !== 'false',
  hasSeenOnboarding: localStorage.getItem('hasSeenOnboarding') === 'true',
  dailyChallengeCompleted: localStorage.getItem('dailyChallengeDate') === new Date().toDateString(),
  totalStars: Number(localStorage.getItem('totalStars')) || 0,
  passagesCompleted: Number(localStorage.getItem('passagesCompleted')) || 0,
};

// ============================================
// CONSTANTS
// ============================================
const categoryDescriptions = {
  P1: "Basic prepositions, conjunctions, and common verbs.",
  P2: "Simple tenses, prepositions, and conjunctions.",
  P3: "Mixed grammar with moderate complexity.",
  P4: "Tenses, conjunctions, subject-verb agreement, and pronouns.",
  P5: "Advanced tenses, conditionals, relative clauses, and modals.",
  P6: "PSLE-level grammar: inversions, subjunctive, and complex structures."
};

const categoryNames = {
  P1: "Primary 1",
  P2: "Primary 2",
  P3: "Primary 3",
  P4: "Primary 4",
  P5: "Primary 5",
  P6: "Primary 6"
};

const levelMilestones = [
  { xp: 0, name: 'Apprentice', emoji: '🎓' },
  { xp: 100, name: 'Scholar', emoji: '📚' },
  { xp: 300, name: 'Adept', emoji: '🌟' },
  { xp: 600, name: 'Expert', emoji: '🏅' },
  { xp: 1000, name: 'Master', emoji: '👑' },
  { xp: 2000, name: 'Grandmaster', emoji: '🏆' },
];

const achievementDefs = [
  { id: 'first_perfect', name: 'Perfect Start', desc: 'Complete a passage perfectly', icon: '⭐', condition: () => state.passagesCompleted >= 1 },
  { id: 'streak_3', name: 'On Fire', desc: 'Get a 3-day streak', icon: '🔥', condition: () => state.streak >= 3 },
  { id: 'streak_7', name: 'Week Warrior', desc: 'Get a 7-day streak', icon: '💪', condition: () => state.streak >= 7 },
  { id: 'gems_50', name: 'Gem Collector', desc: 'Collect 50 gems', icon: '💎', condition: () => state.gems >= 50 },
  { id: 'gems_100', name: 'Treasure Hunter', desc: 'Collect 100 gems', icon: '🏴‍☠️', condition: () => state.gems >= 100 },
  { id: 'xp_500', name: 'Rising Star', desc: 'Earn 500 XP', icon: '🌟', condition: () => state.totalXp >= 500 },
  { id: 'xp_1000', name: 'Grammar Virtuoso', desc: 'Earn 1000 XP', icon: '🎭', condition: () => state.totalXp >= 1000 },
  { id: 'level_master', name: 'Mastery Unlocked', desc: 'Reach Master level', icon: '👑', condition: () => state.levelIndex >= 4 },
];

// ============================================
// DOM REFERENCES
// ============================================
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

const passageText = $("passage-text");
const wordBox = $("word-box");
const feedbackDisplay = $("feedback");
const submitBtn = $("submit-btn");
const prevBtn = $("prev-btn");
const nextBtn = $("next-btn");
const hintBtn = $("hint-btn");
const readBtn = $("read-passage-btn");
const resetBtn = $("reset-words-btn");
const grammarSelect = $("grammar-type");
const timerSelect = $("timer-setting");
const themeSelect = $("theme-select");
const textSizeSlider = $("text-size-slider");

const sidebar = $("sidebar");
const sidebarClose = $("sidebar-close");
const menuToggle = $("menu-toggle");
const toggleDyslexiaBtn = $("toggle-dyslexia");
const toggleSoundBtn = $("toggle-sound");
const exportStatsBtn = $("export-stats-btn");
const resetStatsBtn = $("reset-stats-btn");

const onboardingModal = $("onboarding-modal");
const startLearningBtn = $("start-learning-btn");
const dailyChallengeModal = $("daily-challenge-modal");
const openDailyChallengeBtn = $("open-daily-challenge");
const closeDailyModalBtn = $("close-daily-modal");
const startDailyBtn = $("start-daily-btn");

const achievementPopup = $("achievement-popup");
const achievementNameEl = $("achievement-name");
const streakPopup = $("streak-popup");
const streakPopupCount = $("streak-popup-count");
const xpPopup = $("xp-popup");
const xpAmountEl = $("xp-amount");
const loadingScreen = $("loading-screen");
const confettiContainer = $("confetti-container");

// ============================================
// UTILITY FUNCTIONS
// ============================================
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getPassages() {
  const cat = passages[state.currentGrammarType];
  return cat || [];
}

function setActiveLevel(level) {
  document.querySelectorAll('.level-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.level === level);
  });
}

// ============================================
// SAVE/LOAD
// ============================================
function saveProgress() {
  localStorage.setItem('gems', state.gems);
  localStorage.setItem('xp', state.xp);
  localStorage.setItem('totalXp', state.totalXp);
  localStorage.setItem('streak', state.streak);
  localStorage.setItem('lastPlayedDate', state.lastPlayedDate);
  localStorage.setItem('achievements', JSON.stringify(state.achievements));
  localStorage.setItem('soundEnabled', state.soundEnabled);
  localStorage.setItem('hasSeenOnboarding', state.hasSeenOnboarding);
  localStorage.setItem('totalStars', state.totalStars);
  localStorage.setItem('passagesCompleted', state.passagesCompleted);
}

function loadStats() {
  const raw = localStorage.getItem('grammarStats');
  return raw ? JSON.parse(raw) : { completed: 0, score: 0, missed: {} };
}

let stats = loadStats();

function saveStats() {
  localStorage.setItem('grammarStats', JSON.stringify(stats));
}

// ============================================
// STREAK MANAGEMENT
// ============================================
function updateStreak() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (state.lastPlayedDate === today) {
    return;
  } else if (state.lastPlayedDate === yesterday) {
    state.streak++;
    showStreakPopup();
  } else {
    state.streak = 1;
  }

  state.lastPlayedDate = today;
  saveProgress();
}

function showStreakPopup() {
  if (state.streak > 1 && state.streak % 3 === 0) {
    streakPopupCount.textContent = state.streak;
    streakPopup.classList.add('show');
    setTimeout(() => streakPopup.classList.remove('show'), 2000);
  }
}

// ============================================
// XP & LEVELING SYSTEM
// ============================================
function addXp(amount) {
  state.xp += amount;
  state.totalXp += amount;

  xpAmountEl.textContent = amount;
  xpPopup.classList.add('show');
  setTimeout(() => xpPopup.classList.remove('show'), 1500);

  updateLevel();
  updateUI();
  saveProgress();
}

function updateLevel() {
  for (let i = levelMilestones.length - 1; i >= 0; i--) {
    if (state.totalXp >= levelMilestones[i].xp) {
      if (state.levelIndex < i) {
        state.levelIndex = i;
        state.level = levelMilestones[i].name;
        showAchievementPopup(`Level Up: ${state.level}!`);
      } else {
        state.levelIndex = i;
        state.level = levelMilestones[i].name;
      }
      break;
    }
  }
}

function getXpForNextLevel() {
  const nextLevel = levelMilestones[state.levelIndex + 1];
  return nextLevel ? nextLevel.xp : levelMilestones[levelMilestones.length - 1].xp;
}

function getXpProgress() {
  const currentLevelXp = levelMilestones[state.levelIndex].xp;
  const nextLevelXp = getXpForNextLevel();
  const progress = (state.totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp);
  return Math.min(progress * 100, 100);
}

// ============================================
// ACHIEVEMENTS
// ============================================
function checkAchievements() {
  achievementDefs.forEach(achievement => {
    if (!state.achievements.includes(achievement.id) && achievement.condition()) {
      state.achievements.push(achievement.id);
      showAchievementPopup(achievement.name);
      state.gems += 25;
      saveProgress();
    }
  });
}

function showAchievementPopup(name) {
  achievementNameEl.textContent = name;
  achievementPopup.classList.add('show');
  setTimeout(() => achievementPopup.classList.remove('show'), 3000);
}

// ============================================
// CONFETTI
// ============================================
function createConfetti() {
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================
function updateUI() {
  const total = getPassages().length;
  const progressPercent = total ? ((state.currentPassageIndex + 1) / total) * 100 : 0;

  // Top bar stats
  const topStreak = $("top-streak");
  const topGems = $("top-gems");
  const topStars = $("top-stars");
  const passageProgress = $("passage-progress");
  const progressFillMini = $("progress-fill-mini");

  if (topStreak) topStreak.textContent = state.streak;
  if (topGems) topGems.textContent = state.gems;
  if (topStars) topStars.textContent = `${state.stars}/3`;
  if (passageProgress) passageProgress.textContent = `${state.currentPassageIndex + 1} / ${total}`;
  if (progressFillMini) progressFillMini.style.width = `${progressPercent}%`;

  // Sidebar stats
  const streakCount = $("streak-count");
  const gemsCount = $("gems-count");
  const totalStarsEl = $("total-stars");
  const masteryPercent = $("mastery-percent");
  const userLevel = $("user-level");
  const xpFill = $("xp-fill");
  const xpText = $("xp-text");
  const levelProgressRing = $("level-progress-ring");

  if (streakCount) streakCount.textContent = state.streak;
  if (gemsCount) gemsCount.textContent = state.gems;
  if (totalStarsEl) totalStarsEl.textContent = state.totalStars;

  // Mastery percentage (P1:5 + P2:5 + P3:10 + P4:10 + P5:10 + P6:10 = 50)
  const totalPassages = 50;
  const mastery = Math.min(Math.round((state.passagesCompleted / totalPassages) * 100), 100);
  if (masteryPercent) masteryPercent.textContent = `${mastery}%`;

  // User level and XP
  if (userLevel) userLevel.textContent = state.level;

  const xpProgress = getXpProgress();
  if (xpFill) xpFill.style.width = `${xpProgress}%`;

  const currentLevelXp = levelMilestones[state.levelIndex].xp;
  const nextLevelXp = getXpForNextLevel();
  if (xpText) xpText.textContent = `${state.totalXp - currentLevelXp} / ${nextLevelXp - currentLevelXp} XP`;

  if (levelProgressRing) {
    levelProgressRing.setAttribute('stroke-dasharray', `${xpProgress}, 100`);
  }

  // Category badge
  const categoryBadge = $("category-badge");
  if (categoryBadge) categoryBadge.textContent = categoryNames[state.currentGrammarType] || state.currentGrammarType;

  // Category description
  const categoryDesc = $("category-description");
  if (categoryDesc) categoryDesc.textContent = categoryDescriptions[state.currentGrammarType] || '';

  // Navigation buttons
  if (prevBtn) prevBtn.disabled = state.currentPassageIndex === 0;
  if (nextBtn) nextBtn.disabled = state.currentPassageIndex >= total - 1;

  // Hidden elements for backward compatibility
  const scoreEl = $("score");
  const starsEl = $("stars");
  const coinsEl = $("coins");
  const streakEl = $("streak");
  const levelEl = $("level");
  const progressEl = $("progress");

  if (scoreEl) scoreEl.textContent = state.score;
  if (starsEl) starsEl.textContent = `${state.stars}/3`;
  if (coinsEl) coinsEl.textContent = state.gems;
  if (streakEl) streakEl.textContent = state.streak;
  if (levelEl) levelEl.textContent = state.level;
  if (progressEl) progressEl.textContent = `Passage ${state.currentPassageIndex + 1}/${total}`;
}

function showFeedback(message, type = 'neutral') {
  feedbackDisplay.textContent = message;
  feedbackDisplay.classList.remove('success', 'error');
  if (type === 'success') feedbackDisplay.classList.add('success');
  if (type === 'error') feedbackDisplay.classList.add('error');
}

// ============================================
// TIMER
// ============================================
function startTimer() {
  clearInterval(state.timerInterval);
  const dur = timerSelect.value;
  const timerFill = $("timer-fill");
  const timerText = $("timer-text");
  const timerSection = $("timer-section");

  if (dur === "off") {
    state.timeLeft = 0;
    if (timerSection) timerSection.style.display = 'none';
    return;
  }

  if (timerSection) timerSection.style.display = 'flex';
  state.timeLeft = +dur;
  if (timerFill) timerFill.style.width = "100%";
  if (timerText) timerText.textContent = `${state.timeLeft}s`;

  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    const percent = (state.timeLeft / +dur) * 100;

    if (timerFill) {
      timerFill.style.width = `${percent}%`;
      timerFill.classList.remove('warning', 'danger');
      if (percent <= 30 && percent > 10) timerFill.classList.add('warning');
      if (percent <= 10) timerFill.classList.add('danger');
    }

    if (timerText) timerText.textContent = `${state.timeLeft}s`;

    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      checkAnswers();
    }
  }, 1000);
}

// ============================================
// PASSAGE DISPLAY
// ============================================
function displayPassage() {
  clearInterval(state.timerInterval);
  const data = getPassages();

  if (!data.length) {
    passageText.innerHTML = "<p>No passages available for this selection.</p>";
    wordBox.innerHTML = "";
    return;
  }

  const p = data[state.currentPassageIndex];
  state.stars = 0;
  state.hintUsage = {};
  state.selectedWord = null;

  // Process passage text with blanks and keywords
  let html = p.text;

  // Highlight clue words
  if (p.clueWords) {
    p.clueWords.forEach((clues, i) => {
      clues.forEach(w => {
        const regex = new RegExp(`\\b${w}\\b`, 'g');
        html = html.replace(regex, `<span class="keyword kw-${i + 1}">${w}</span>`);
      });
    });
  }

  // Replace blanks
  html = html.replace(/___\s*\((\d)\)\s*___/g, (_, n) => {
    const semHint = p.semanticHints ? (p.semanticHints[n - 1] || '').replace(/"/g, '&quot;') : '';
    return `<span class="blank" data-blank="${n}" data-exp="${semHint}" tabindex="0"></span>` +
           `<button class="hint-for-blank" data-blank="${n}">💡</button>`;
  });

  passageText.innerHTML = html;

  // Create word bank
  const pairs = p.wordBox.map((w, i) => ({
    word: w,
    def: p.hints ? p.hints[i] || '' : ''
  }));

  wordBox.innerHTML = shuffle(pairs)
    .map(({ word, def }) =>
      `<div class="word" draggable="true" tabindex="0"><span data-def="${def}">${word}</span></div>`
    )
    .join("");

  feedbackDisplay.textContent = "";
  feedbackDisplay.classList.remove('success', 'error');

  startTimer();
  updateUI();
  bindInteractions();
}

// ============================================
// INTERACTIONS
// ============================================
function bindInteractions() {
  // Word selection and drag
  $$('.word').forEach(w => {
    w.onclick = () => selectWord(w);
    w.ondragstart = e => {
      e.dataTransfer.setData('text/plain', w.textContent);
      w.classList.add('dragging');
    };
    w.ondragend = () => w.classList.remove('dragging');
  });

  // Blank interactions
  $$('.blank').forEach(b => {
    b.onclick = () => {
      if (state.selectedWord) {
        placeWord(b, state.selectedWord.textContent);
      }
    };
    b.ondragover = e => e.preventDefault();
    b.ondrop = e => {
      e.preventDefault();
      placeWord(b, e.dataTransfer.getData('text/plain'));
    };
  });

  // Keyword hints
  $$('.keyword').forEach(el => {
    el.onclick = () => {
      const match = el.className.match(/kw-(\d+)/);
      if (match) {
        const idx = +match[1] - 1;
        const data = getPassages()[state.currentPassageIndex];
        if (data.hints && data.hints[idx]) {
          showFeedback(data.hints[idx]);
          if (state.soundEnabled) speak(data.hints[idx]);
        }
      }
    };
  });

  // Per-blank hint buttons
  $$('.hint-for-blank').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const idx = +btn.dataset.blank - 1;
      const data = getPassages()[state.currentPassageIndex];
      if (data.hints && data.hints[idx]) {
        showFeedback(data.hints[idx]);
        if (state.soundEnabled) speak(data.hints[idx]);
        // Track hint usage
        if (!state.hintUsage[btn.dataset.blank]) {
          state.hintUsage[btn.dataset.blank] = true;
        }
      }
      // Highlight keywords
      $$('.kw-' + (idx + 1)).forEach(el => el.classList.add('highlighted'));
      setTimeout(() => $$('.kw-' + (idx + 1)).forEach(el => el.classList.remove('highlighted')), 3000);
    };
  });
}

function selectWord(el) {
  $$('.word').forEach(w => w.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedWord = el;
}

function placeWord(blank, txt) {
  blank.textContent = txt;
  blank.classList.add('filled');
  checkSingle(blank);
  state.selectedWord = null;
  $$('.word').forEach(w => w.classList.remove('selected'));

  // Remove used word from word box
  const match = Array.from($$('.word')).find(w => w.textContent === txt);
  if (match) match.remove();
}

function checkSingle(blank) {
  const idx = +blank.dataset.blank - 1;
  const p = getPassages()[state.currentPassageIndex];
  const correct = p.answers[idx];

  if (blank.textContent.toLowerCase() === correct.toLowerCase()) {
    blank.classList.add('correct');
    blank.classList.remove('incorrect');
    showFeedback('Correct! ✓', 'success');
    if (state.soundEnabled) speak('Correct');

    // Remove existing explanation
    const after = blank.nextElementSibling?.classList.contains('hint-for-blank')
      ? blank.nextElementSibling : blank;
    const span = after.nextElementSibling;
    if (span?.classList.contains('explanation')) span.remove();

    // Remove keyword highlighting
    $$('.kw-' + (idx + 1)).forEach(el => el.classList.remove('highlighted'));
  } else {
    blank.classList.add('incorrect');
    blank.classList.remove('correct');
    showFeedback('Try again!', 'error');
    if (state.soundEnabled) speak('Try again');

    // Show explanation
    const exp = blank.dataset.exp;
    if (exp) {
      const after = blank.nextElementSibling?.classList.contains('hint-for-blank')
        ? blank.nextElementSibling : blank;
      let span = after.nextElementSibling;
      if (!span?.classList.contains('explanation')) {
        span = document.createElement('span');
        span.className = 'explanation';
        after.insertAdjacentElement('afterend', span);
      }
      span.textContent = exp;
    }

    // Highlight keywords
    $$('.kw-' + (idx + 1)).forEach(el => el.classList.add('highlighted'));
  }
}

// ============================================
// ANSWER CHECKING
// ============================================
function checkAnswers() {
  clearInterval(state.timerInterval);
  const p = getPassages()[state.currentPassageIndex];
  const blanks = $$('.blank');
  let correctCount = 0;

  blanks.forEach((b, i) => {
    const ans = p.answers[i];
    if (b.textContent.toLowerCase() === ans.toLowerCase()) {
      b.classList.add('correct');
      b.classList.remove('incorrect');
      correctCount++;
    } else {
      b.classList.add('incorrect');
      b.classList.remove('correct');

      // Track missed words
      const clue = p.clueWords?.[i]?.[0] || `blank${i + 1}`;
      stats.missed[clue] = (stats.missed[clue] || 0) + 1;
    }

    // Show explanations
    const exp = b.dataset.exp;
    if (exp) {
      const after = b.nextElementSibling?.classList.contains('hint-for-blank')
        ? b.nextElementSibling : b;
      let span = after.nextElementSibling;
      if (!span?.classList.contains('explanation')) {
        span = document.createElement('span');
        span.className = 'explanation';
        after.insertAdjacentElement('afterend', span);
      }
      span.textContent = exp;
    }
  });

  const totalBlanks = blanks.length;
  const accuracy = Math.round((correctCount / totalBlanks) * 100);
  const isPerfect = correctCount === totalBlanks;

  // Calculate stars
  if (accuracy >= 100) state.stars = 3;
  else if (accuracy >= 80) state.stars = 2;
  else if (accuracy >= 60) state.stars = 1;
  else state.stars = 0;

  // Calculate XP earned
  let xpEarned = correctCount * 10;
  if (isPerfect) xpEarned += 20;
  if (state.streak > 0) xpEarned += state.streak * 2;
  // Bonus for no hints
  if (Object.keys(state.hintUsage).length === 0) xpEarned += 10;

  if (isPerfect) {
    state.score += 10;
    state.gems += 10;
    state.totalStars += state.stars;
    state.passagesCompleted++;

    updateStreak();
    createConfetti();
    showFeedback(`Perfect! +${xpEarned} XP`, 'success');
    if (state.soundEnabled) speak('Excellent work!');

    stats.completed++;
  } else if (accuracy >= 60) {
    state.gems += 5;
    state.totalStars += state.stars;
    showFeedback(`Good job! ${accuracy}% correct. +${xpEarned} XP`, 'success');
    if (state.soundEnabled) speak('Good job!');
  } else {
    showFeedback(`Keep practicing! ${accuracy}% correct.`, 'error');
    if (state.soundEnabled) speak('Keep practicing!');
  }

  addXp(xpEarned);
  checkAchievements();

  stats.score = state.score;
  saveStats();
  saveProgress();
  updateUI();
}

// ============================================
// EVENT LISTENERS
// ============================================
function initEventListeners() {
  if (submitBtn) submitBtn.onclick = checkAnswers;

  if (prevBtn) {
    prevBtn.onclick = () => {
      if (state.currentPassageIndex > 0) {
        state.currentPassageIndex--;
        displayPassage();
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      const total = getPassages().length;
      if (state.currentPassageIndex < total - 1) {
        state.currentPassageIndex++;
        displayPassage();
      }
    };
  }

  if (hintBtn) {
    hintBtn.onclick = () => {
      const data = getPassages()[state.currentPassageIndex];
      if (data.hints?.[0]) {
        showFeedback(data.hints[0]);
        if (state.soundEnabled) speak(data.hints[0]);
      }
    };
  }

  if (readBtn) {
    readBtn.onclick = () => {
      const data = getPassages()[state.currentPassageIndex];
      const text = data.text.replace(/___\s*\(\d\)\s*___/g, 'blank');
      speak(text);
    };
  }

  if (resetBtn) {
    resetBtn.onclick = displayPassage;
  }

  // Level pill selection
  $$('.level-pill').forEach(pill => {
    pill.onclick = () => {
      state.currentGrammarType = pill.dataset.level;
      state.currentPassageIndex = 0;
      setActiveLevel(pill.dataset.level);
      displayPassage();
    };
  });

  // Timer
  if (timerSelect) {
    timerSelect.onchange = startTimer;
  }

  // Theme
  if (themeSelect) {
    themeSelect.onchange = (e) => {
      document.body.className = e.target.value === 'default' ? '' : e.target.value;
    };
  }

  // Text size
  if (textSizeSlider) {
    textSizeSlider.oninput = (e) => {
      const size = e.target.value;
      if (passageText) passageText.style.fontSize = `${size}rem`;
    };
  }

  // Sidebar toggle
  if (menuToggle) {
    menuToggle.onclick = () => sidebar?.classList.add('open');
  }

  if (sidebarClose) {
    sidebarClose.onclick = () => sidebar?.classList.remove('open');
  }

  // Dyslexia font toggle
  if (toggleDyslexiaBtn) {
    toggleDyslexiaBtn.onclick = () => {
      document.body.classList.toggle('dyslexia');
      toggleDyslexiaBtn.classList.toggle('active');
    };
  }

  // Sound toggle
  if (toggleSoundBtn) {
    toggleSoundBtn.onclick = () => {
      state.soundEnabled = !state.soundEnabled;
      toggleSoundBtn.classList.toggle('active', state.soundEnabled);
      saveProgress();
    };
    toggleSoundBtn.classList.toggle('active', state.soundEnabled);
  }

  // Export stats
  if (exportStatsBtn) {
    exportStatsBtn.onclick = () => {
      const data = {
        stats,
        state: {
          gems: state.gems,
          xp: state.totalXp,
          streak: state.streak,
          level: state.level,
          achievements: state.achievements,
          passagesCompleted: state.passagesCompleted,
          totalStars: state.totalStars,
        }
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        showFeedback('Progress exported to clipboard!', 'success');
      }
    };
  }

  // Reset stats
  if (resetStatsBtn) {
    resetStatsBtn.onclick = () => {
      if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.clear();
        location.reload();
      }
    };
  }

  // Onboarding modal
  if (startLearningBtn) {
    startLearningBtn.onclick = () => {
      onboardingModal?.classList.add('hidden');
      state.hasSeenOnboarding = true;
      saveProgress();
    };
  }

  // Daily challenge
  if (openDailyChallengeBtn) {
    openDailyChallengeBtn.onclick = () => {
      const dailyDate = $("daily-date");
      if (dailyDate) {
        dailyDate.textContent = new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      dailyChallengeModal?.classList.remove('hidden');
    };
  }

  if (closeDailyModalBtn) {
    closeDailyModalBtn.onclick = () => {
      dailyChallengeModal?.classList.add('hidden');
    };
  }

  if (startDailyBtn) {
    startDailyBtn.onclick = () => {
      dailyChallengeModal?.classList.add('hidden');
      const levels = Object.keys(categoryDescriptions);
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      state.currentGrammarType = randomLevel;
      setActiveLevel(randomLevel);
      state.currentPassageIndex = 0;
      displayPassage();
    };
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') hintBtn?.click();
    if (e.key === 'Enter' && e.ctrlKey) submitBtn?.click();
    if (e.key === 'ArrowRight' && e.ctrlKey) nextBtn?.click();
    if (e.key === 'ArrowLeft' && e.ctrlKey) prevBtn?.click();
  });
}

// ============================================
// INITIALIZATION
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  loadVoices($("voice-select"));
  updateLevel();

  if (!state.hasSeenOnboarding) {
    onboardingModal?.classList.remove('hidden');
  } else {
    onboardingModal?.classList.add('hidden');
  }

  initEventListeners();
  displayPassage();
  updateUI();

  setTimeout(() => {
    loadingScreen?.classList.add('hidden');
  }, 500);

  // Check for streak reset
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.lastPlayedDate && state.lastPlayedDate !== today && state.lastPlayedDate !== yesterday) {
    state.streak = 0;
    saveProgress();
  }
});
