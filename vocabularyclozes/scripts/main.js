import { passages } from './data/passages.js';
import { speak, loadVoices } from './utils/speech.js';

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
  currentCategory: "contextInference",
  currentLevel: "p1",
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
  badges: JSON.parse(localStorage.getItem('badges') || '[]'),
  unlockedThemes: JSON.parse(localStorage.getItem('unlockedThemes') || '[]'),
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
  contextInference: "Learn words from surrounding context clues.",
  definitionMatch: "Match words to their exact definitions.",
  synonymContrast: "Understand synonyms and word contrasts.",
  morphologicalAffix: "Learn word construction with prefixes/suffixes.",
  collocationCloze: "Master common word combinations.",
  grammaticalRole: "Understand parts of speech and grammar.",
  connectorClue: "Learn connecting words and transitions."
};

const categoryNames = {
  contextInference: "Context Inference",
  definitionMatch: "Definition Match",
  synonymContrast: "Synonym Contrast",
  morphologicalAffix: "Morphological Affix",
  collocationCloze: "Collocation Cloze",
  grammaticalRole: "Grammatical Role",
  connectorClue: "Connector Clue"
};

const levelMilestones = [
  { xp: 0, name: 'Apprentice', emoji: '🎓' },
  { xp: 100, name: 'Scholar', emoji: '📚' },
  { xp: 300, name: 'Adept', emoji: '🌟' },
  { xp: 600, name: 'Expert', emoji: '🏅' },
  { xp: 1000, name: 'Master', emoji: '👑' },
  { xp: 2000, name: 'Grandmaster', emoji: '🏆' },
];

const achievements = [
  { id: 'first_perfect', name: 'Perfect Start', desc: 'Complete a passage perfectly', icon: '⭐', condition: () => state.passagesCompleted >= 1 },
  { id: 'streak_3', name: 'On Fire', desc: 'Get a 3-day streak', icon: '🔥', condition: () => state.streak >= 3 },
  { id: 'streak_7', name: 'Week Warrior', desc: 'Get a 7-day streak', icon: '💪', condition: () => state.streak >= 7 },
  { id: 'gems_50', name: 'Gem Collector', desc: 'Collect 50 gems', icon: '💎', condition: () => state.gems >= 50 },
  { id: 'gems_100', name: 'Treasure Hunter', desc: 'Collect 100 gems', icon: '🏴‍☠️', condition: () => state.gems >= 100 },
  { id: 'xp_500', name: 'Rising Star', desc: 'Earn 500 XP', icon: '🌟', condition: () => state.totalXp >= 500 },
  { id: 'xp_1000', name: 'Vocabulary Virtuoso', desc: 'Earn 1000 XP', icon: '🎭', condition: () => state.totalXp >= 1000 },
  { id: 'all_categories', name: 'Jack of All Trades', desc: 'Try all 7 categories', icon: '🎯', condition: () => false },
  { id: 'level_master', name: 'Mastery Unlocked', desc: 'Reach Master level', icon: '👑', condition: () => state.levelIndex >= 4 },
];

// ============================================
// DOM REFERENCES
// ============================================
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

// Main elements
const passageText = $("passage-text");
const wordBox = $("word-box");
const feedbackDisplay = $("feedback");
const submitBtn = $("submit-btn");
const prevBtn = $("prev-btn");
const nextBtn = $("next-btn");
const hintBtn = $("hint-btn");
const readBtn = $("read-passage-btn");
const resetBtn = $("reset-words-btn");
const categorySelect = $("vocab-category");
const timerSelect = $("timer-setting");
const themeSelect = $("theme-select");
const textSizeSlider = $("text-size-slider");

// Sidebar elements
const sidebar = $("sidebar");
const sidebarClose = $("sidebar-close");
const menuToggle = $("menu-toggle");
const levelPills = $("level-pills");
const toggleDyslexiaBtn = $("toggle-dyslexia");
const toggleSoundBtn = $("toggle-sound");
const exportStatsBtn = $("export-stats-btn");
const resetStatsBtn = $("reset-stats-btn");

// Modals
const onboardingModal = $("onboarding-modal");
const startLearningBtn = $("start-learning-btn");
const dailyChallengeModal = $("daily-challenge-modal");
const openDailyChallengeBtn = $("open-daily-challenge");
const closeDailyModalBtn = $("close-daily-modal");
const startDailyBtn = $("start-daily-btn");

// Popups
const achievementPopup = $("achievement-popup");
const achievementName = $("achievement-name");
const streakPopup = $("streak-popup");
const streakPopupCount = $("streak-popup-count");
const xpPopup = $("xp-popup");
const xpAmount = $("xp-amount");
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

function getLevelData() {
  const cat = passages[state.currentCategory];
  if (!cat) return [];
  if (!cat[state.currentLevel]) {
    state.currentLevel = 'p1';
    return cat['p1'] || [];
  }
  return cat[state.currentLevel];
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
  localStorage.setItem('badges', JSON.stringify(state.badges));
  localStorage.setItem('unlockedThemes', JSON.stringify(state.unlockedThemes));
  localStorage.setItem('soundEnabled', state.soundEnabled);
  localStorage.setItem('hasSeenOnboarding', state.hasSeenOnboarding);
  localStorage.setItem('totalStars', state.totalStars);
  localStorage.setItem('passagesCompleted', state.passagesCompleted);
}

function loadStats() {
  const raw = localStorage.getItem('vocabStats');
  return raw ? JSON.parse(raw) : { completed: 0, score: 0, missed: {} };
}

let stats = loadStats();

function saveStats() {
  localStorage.setItem('vocabStats', JSON.stringify(stats));
}

// ============================================
// STREAK MANAGEMENT
// ============================================
function updateStreak() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (state.lastPlayedDate === today) {
    return; // Already played today
  } else if (state.lastPlayedDate === yesterday) {
    state.streak++;
    showStreakPopup();
  } else if (state.lastPlayedDate !== today) {
    if (state.lastPlayedDate) {
      state.streak = 1; // Reset streak
    } else {
      state.streak = 1; // First time playing
    }
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

  // Show XP popup
  xpAmount.textContent = amount;
  xpPopup.classList.add('show');
  setTimeout(() => xpPopup.classList.remove('show'), 1500);

  // Check for level up
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
  achievements.forEach(achievement => {
    if (!state.achievements.includes(achievement.id) && achievement.condition()) {
      state.achievements.push(achievement.id);
      showAchievementPopup(achievement.name);
      state.gems += 25; // Bonus gems for achievement
      saveProgress();
    }
  });
}

function showAchievementPopup(name) {
  achievementName.textContent = name;
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
  const total = getLevelData().length;
  const progressPercent = ((state.currentPassageIndex + 1) / total) * 100;

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

  // Mastery percentage (based on completed passages)
  const totalPassages = 7 * 6 * 10; // 7 categories * 6 levels * ~10 passages
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

  // Category badge and level badge
  const categoryBadge = $("category-badge");
  const levelBadge = $("level-badge");
  if (categoryBadge) categoryBadge.textContent = categoryNames[state.currentCategory] || state.currentCategory;
  if (levelBadge) levelBadge.textContent = `Level ${state.currentLevel.toUpperCase()}`;

  // Category description
  const categoryDesc = $("category-description");
  if (categoryDesc) categoryDesc.textContent = categoryDescriptions[state.currentCategory] || '';

  // Navigation buttons
  if (prevBtn) prevBtn.disabled = state.currentPassageIndex === 0;
  if (nextBtn) nextBtn.disabled = state.currentPassageIndex >= total - 1;

  // Update hidden elements for backward compatibility
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
  const data = getLevelData();

  if (!data.length) {
    passageText.innerHTML = "<p>No passages available for this selection.</p>";
    wordBox.innerHTML = "";
    return;
  }

  const p = data[state.currentPassageIndex];
  state.stars = 0;

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
    const exp = p.explanations ? p.explanations[n - 1].replace(/"/g, '&quot;') : '';
    return `<span class="blank" data-blank="${n}" data-exp="${exp}" tabindex="0"></span>` +
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
        const data = getLevelData()[state.currentPassageIndex];
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
      const data = getLevelData()[state.currentPassageIndex];
      if (data.hints && data.hints[idx]) {
        showFeedback(data.hints[idx]);
        if (state.soundEnabled) speak(data.hints[idx]);
      }
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
  checkSingle(blank);
  state.selectedWord = null;
  $$('.word').forEach(w => w.classList.remove('selected'));

  // Remove used word from word box
  const match = Array.from($$('.word')).find(w => w.textContent === txt);
  if (match) match.remove();
}

function checkSingle(blank) {
  const idx = +blank.dataset.blank - 1;
  const p = getLevelData()[state.currentPassageIndex];
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
  const p = getLevelData()[state.currentPassageIndex];
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
  if (isPerfect) xpEarned += 20; // Perfect bonus
  if (state.streak > 0) xpEarned += state.streak * 2; // Streak bonus

  if (isPerfect) {
    state.score += 10;
    state.gems += 10;
    state.totalStars += state.stars;
    state.passagesCompleted++;

    updateStreak();
    createConfetti();
    showFeedback(`Perfect! +${xpEarned} XP 🎉`, 'success');
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
  // Main game buttons
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
      const total = getLevelData().length;
      if (state.currentPassageIndex < total - 1) {
        state.currentPassageIndex++;
        displayPassage();
      }
    };
  }

  if (hintBtn) {
    hintBtn.onclick = () => {
      const data = getLevelData()[state.currentPassageIndex];
      if (data.hints?.[0]) {
        showFeedback(data.hints[0]);
        if (state.soundEnabled) speak(data.hints[0]);
      }
    };
  }

  if (readBtn) {
    readBtn.onclick = () => {
      const data = getLevelData()[state.currentPassageIndex];
      const text = data.text.replace(/___\s*\(\d\)\s*___/g, 'blank');
      speak(text);
    };
  }

  if (resetBtn) {
    resetBtn.onclick = displayPassage;
  }

  // Category selection
  if (categorySelect) {
    categorySelect.onchange = (e) => {
      state.currentCategory = e.target.value;
      state.currentPassageIndex = 0;
      displayPassage();
    };
  }

  // Level pills
  if (levelPills) {
    levelPills.onclick = (e) => {
      if (e.target.classList.contains('level-pill')) {
        $$('.level-pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        state.currentLevel = e.target.dataset.level;
        state.currentPassageIndex = 0;
        displayPassage();
      }
    };
  }

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
      // Set random category for daily challenge
      const categories = Object.keys(categoryDescriptions);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      state.currentCategory = randomCategory;
      if (categorySelect) categorySelect.value = randomCategory;
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
  // Load voices
  loadVoices($("voice-select"));

  // Update level from saved XP
  updateLevel();

  // Show onboarding if first time
  if (!state.hasSeenOnboarding) {
    onboardingModal?.classList.remove('hidden');
  } else {
    onboardingModal?.classList.add('hidden');
  }

  // Initialize event listeners
  initEventListeners();

  // Display first passage
  displayPassage();

  // Update UI
  updateUI();

  // Hide loading screen
  setTimeout(() => {
    loadingScreen?.classList.add('hidden');
  }, 500);

  // Check for streak
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.lastPlayedDate && state.lastPlayedDate !== today && state.lastPlayedDate !== yesterday) {
    state.streak = 0;
    saveProgress();
  }
});
