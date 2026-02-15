/* ═══════════════════════════════════════════════════════
   First Sounds — Premium App Engine
   ═══════════════════════════════════════════════════════ */

// ── Word Database ──
const spinnerItems = {
  A: ['alligator','amulet','anchor','ant','apple','arrow','astronaut','ax'],
  B: ['bag','bat','bed','bell','bird','book','box','bread','bug','bus'],
  C: ['cab','can','cap','car','cat','cod','cot','cub','cup'],
  D: ['dog','duck','dinosaur','drum','doll','door','desk','diamond','die'],
  E: ['egg','elephant','elf','end','enter','envelope','exit'],
  F: ['fish','frog','fan','fire','feather','fork','fox','fence','foot'],
  G: ['goat','gift','girl','guitar','grapes','glasses','goose','gloves'],
  H: ['hat','hen','house','hippo','hammer','hand','helicopter','hamburger'],
  I: ['igloo','insect','ink','iguana','infant','internet'],
  J: ['jam','jelly','jacket','juice','jump','jug','jet','jeep'],
  K: ['kangaroo','kite','key','king','kitten','kettle','kiwi','keyboard','kick'],
  L: ['lion','leaf','lamp','ladder','lemon','lollipop','lock','ladybug','log'],
  M: ['monkey','moon','mouse','mug','map','milk','mop'],
  N: ['nose','nest','net','nail','nap','nine','note','needle'],
  O: ['octopus','ostrich','olive','ox','onion'],
  P: ['pig','pen','pan','pizza','pencil','peach','panda','pumpkin'],
  Q: ['queen','quilt','quail','quick','queue','quiet'],
  R: ['rabbit','robot','rainbow','ring','rose','ruler','rocket','raft'],
  S: ['sun','sock','sandwich','star','seal','soap','snowman'],
  T: ['tiger','tap','top','tooth','tent','tomato','train','tree'],
  U: ['umbrella','up','upset','unzip','upstairs','undo'],
  V: ['van','vase','violin','vegetables','vest','vulture','volcano'],
  W: ['whale','watch','watermelon','web','wagon','worm','witch','window'],
  Y: ['yarn','yam','yawn','yolk','yoyo'],
  Z: ['zebra','zoo','zip','zero','zap','zigzag']
};

const letterGroups = {
  1: ['A','B','C','D','E'],
  2: ['F','G','H','I','J'],
  3: ['K','L','M','N','O'],
  4: ['P','Q','R','S','T'],
  5: ['U','V','W','Y','Z']
};

const AVATARS = [
  '\u{1F431}','\u{1F436}','\u{1F43B}','\u{1F98A}','\u{1F981}',
  '\u{1F427}','\u{1F430}','\u{1F43C}','\u{1F984}','\u{1F99C}'
];

// ── Achievement Definitions ──
const ACHIEVEMENTS = [
  { id: 'first_word',    icon: '\u{1F31F}', name: 'First Word',       desc: 'Get your first word correct',   check: p => p.totalCorrect >= 1 },
  { id: 'ten_words',     icon: '\u{1F4DA}', name: 'Bookworm',         desc: 'Get 10 words correct',          check: p => p.totalCorrect >= 10 },
  { id: 'fifty_words',   icon: '\u{1F3C6}', name: 'Word Champion',    desc: 'Get 50 words correct',          check: p => p.totalCorrect >= 50 },
  { id: 'hundred_words', icon: '\u{1F451}', name: 'Word Royalty',     desc: 'Get 100 words correct',         check: p => p.totalCorrect >= 100 },
  { id: 'streak_3',      icon: '\u{1F525}', name: 'On Fire',          desc: '3 correct in a row',            check: p => p.bestStreak >= 3 },
  { id: 'streak_5',      icon: '\u{2604}\u{FE0F}',  name: 'Unstoppable',     desc: '5 correct in a row',            check: p => p.bestStreak >= 5 },
  { id: 'streak_10',     icon: '\u{1F4AB}', name: 'Perfect 10',       desc: '10 correct in a row',           check: p => p.bestStreak >= 10 },
  { id: 'level_5',       icon: '\u{1F680}', name: 'Rocket Learner',   desc: 'Reach level 5',                 check: p => getLevel(p.xp) >= 5 },
  { id: 'level_10',      icon: '\u{2B50}',  name: 'Shining Star',     desc: 'Reach level 10',                check: p => getLevel(p.xp) >= 10 },
  { id: 'level_20',      icon: '\u{1F48E}', name: 'Diamond Mind',     desc: 'Reach level 20',                check: p => getLevel(p.xp) >= 20 },
  { id: 'all_groups',    icon: '\u{1F30D}', name: 'Explorer',         desc: 'Unlock all letter groups',      check: p => p.unlockedGroups.length >= 5 },
  { id: 'daily_1',       icon: '\u{1F4C5}', name: 'Daily Player',     desc: 'Complete a daily challenge',    check: p => p.dailyStreak >= 1 },
  { id: 'daily_7',       icon: '\u{1F525}', name: 'Week Warrior',     desc: '7 day daily streak',            check: p => p.dailyStreak >= 7 },
  { id: 'five_letters',  icon: '\u{1F4DD}', name: 'Letter Learner',   desc: 'Master 5 different letters',    check: p => Object.values(p.letterStats || {}).filter(s => s.correct >= 3).length >= 5 },
  { id: 'all_letters',   icon: '\u{1F3AF}', name: 'Alphabet Master',  desc: 'Practice all 26 letters',       check: p => Object.keys(p.letterStats || {}).length >= 25 }
];

// ── XP & Level System ──
const XP_PER_CORRECT = 15;
const XP_STREAK_BONUS = 5;
const XP_DAILY_BONUS = 50;
const STARS_TO_UNLOCK = 5;
const GUESS_OPTIONS = 4;

function xpForLevel(level) {
  return Math.floor(80 * Math.pow(1.15, level - 1));
}

function getLevel(xp) {
  let level = 1;
  let remaining = xp;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level++;
  }
  return level;
}

function getXpInLevel(xp) {
  let remaining = xp;
  let level = 1;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level++;
  }
  return { current: remaining, needed: xpForLevel(level), level };
}

// ── Storage ──
function loadProfiles() {
  try {
    return JSON.parse(localStorage.getItem('fs_profiles') || '[]');
  } catch { return []; }
}

function saveProfiles(profiles) {
  localStorage.setItem('fs_profiles', JSON.stringify(profiles));
}

function loadGlobal() {
  try {
    return JSON.parse(localStorage.getItem('fs_global') || '{}');
  } catch { return {}; }
}

function saveGlobal(data) {
  localStorage.setItem('fs_global', JSON.stringify(data));
}

function createProfile(name, avatar) {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name,
    avatar,
    xp: 0,
    stars: 0,
    totalCorrect: 0,
    totalAttempts: 0,
    bestStreak: 0,
    currentStreak: 0,
    unlockedGroups: [1],
    completedWords: [],
    achievements: [],
    letterStats: {},
    dailyStreak: 0,
    lastDailyDate: null,
    lastDailyWord: null,
    activityDays: [],
    recentActivity: [],
    createdAt: new Date().toISOString()
  };
}

// ── App State ──
let profiles = loadProfiles();
let activeProfile = null;
let currentWord = '';
let selectedLetter = 'all';
let selectedGroup = 1;
let selectedVoice = null;
let currentUtterance = null;
let confettiCtx = null;
let confettiParticles = [];
let confettiAnimId = null;

// ── DOM Cache ──
const $ = id => document.getElementById(id);

// ── Screen Management ──
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(screenId).classList.add('active');
}

// ══════════════════════════════════════════════════════════
// PROFILE SCREEN
// ══════════════════════════════════════════════════════════
function renderProfiles() {
  const list = $('profile-list');
  list.innerHTML = '';

  profiles.forEach(p => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    const lvl = getLevel(p.xp);
    card.innerHTML = `
      <div class="avatar">${p.avatar}</div>
      <div class="profile-details">
        <div class="profile-name">${escapeHtml(p.name)}</div>
        <div class="profile-level">Level ${lvl} \u2022 ${p.stars} stars</div>
      </div>
      <div class="profile-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    `;
    card.addEventListener('click', () => startGame(p.id));
    list.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function initAvatarPicker() {
  const picker = $('avatar-picker');
  picker.innerHTML = '';
  AVATARS.forEach((av, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'avatar-option' + (i === 0 ? ' selected' : '');
    btn.textContent = av;
    btn.addEventListener('click', () => {
      picker.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
    picker.appendChild(btn);
  });
}

function setupProfileScreen() {
  $('add-profile-btn').addEventListener('click', () => {
    $('profile-name-input').value = '';
    initAvatarPicker();
    $('new-profile-modal').hidden = false;
  });

  $('cancel-profile-btn').addEventListener('click', () => {
    $('new-profile-modal').hidden = true;
  });

  $('save-profile-btn').addEventListener('click', () => {
    const name = $('profile-name-input').value.trim();
    if (!name) return;
    const selectedAvatar = $('avatar-picker').querySelector('.avatar-option.selected');
    const avatar = selectedAvatar ? selectedAvatar.textContent : AVATARS[0];
    const profile = createProfile(name, avatar);
    profiles.push(profile);
    saveProfiles(profiles);
    renderProfiles();
    $('new-profile-modal').hidden = true;
  });

  $('parent-dashboard-btn').addEventListener('click', () => {
    openDashboard();
  });

  renderProfiles();
}

// ══════════════════════════════════════════════════════════
// GAME SCREEN
// ══════════════════════════════════════════════════════════
function startGame(profileId) {
  activeProfile = profiles.find(p => p.id === profileId);
  if (!activeProfile) return;

  // Record activity
  recordActivity();

  // Update header
  $('player-avatar-small').textContent = activeProfile.avatar;
  $('player-name-display').textContent = activeProfile.name;

  // Restore state
  selectedGroup = 1;
  selectedLetter = 'all';
  currentWord = '';

  updateGameUI();
  setupDailyChallenge();
  showScreen('screen-game');
  preloadAssets(letterGroups[selectedGroup]);
}

function updateGameUI() {
  if (!activeProfile) return;

  const { current, needed, level } = getXpInLevel(activeProfile.xp);
  $('level-display').textContent = level;
  $('star-count').textContent = activeProfile.stars;
  $('xp-bar').style.width = `${(current / needed) * 100}%`;
  $('xp-text').textContent = `${current} / ${needed} XP`;

  // Tab unlock state
  document.querySelectorAll('.tab').forEach(btn => {
    const group = parseInt(btn.dataset.group);
    btn.disabled = !activeProfile.unlockedGroups.includes(group);
    btn.classList.toggle('selected', group === selectedGroup);
  });

  // Update group progress
  updateGroupProgress();

  // Streak display
  if (activeProfile.currentStreak >= 2) {
    $('streak-display').hidden = false;
    $('streak-count').textContent = activeProfile.currentStreak;
    const flames = $('streak-flames');
    flames.innerHTML = '';
    const count = Math.min(activeProfile.currentStreak, 5);
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.textContent = '\u{1F525}';
      flames.appendChild(span);
    }
  } else {
    $('streak-display').hidden = true;
  }
}

function updateGroupProgress() {
  if (!activeProfile) return;
  const letters = letterGroups[selectedGroup];
  const total = letters.reduce((sum, l) => sum + (spinnerItems[l]?.length || 0), 0);
  const completed = letters.reduce((sum, l) => {
    return sum + (spinnerItems[l] || []).filter(w => activeProfile.completedWords.includes(w)).length;
  }, 0);
  const pct = total > 0 ? (completed / total) * 100 : 0;
  $('group-progress-fill').style.width = `${pct}%`;
}

function recordActivity() {
  const today = new Date().toISOString().split('T')[0];
  if (!activeProfile.activityDays.includes(today)) {
    activeProfile.activityDays.push(today);
    // Keep last 90 days
    if (activeProfile.activityDays.length > 90) {
      activeProfile.activityDays = activeProfile.activityDays.slice(-90);
    }
  }
}

// ── Daily Challenge ──
function setupDailyChallenge() {
  const today = new Date().toISOString().split('T')[0];
  const banner = $('daily-challenge-banner');

  if (activeProfile.lastDailyDate === today) {
    banner.hidden = true;
    return;
  }

  // Generate deterministic daily word from date
  const allWords = Object.values(spinnerItems).flat();
  const seed = today.split('-').join('');
  const idx = parseInt(seed) % allWords.length;
  const dailyWord = allWords[idx];

  $('daily-desc').textContent = `Can you guess the first sound of "${dailyWord}"?`;
  banner.hidden = false;

  $('daily-play-btn').onclick = () => {
    banner.hidden = true;
    currentWord = dailyWord;
    showWord(currentWord, true);
  };
}

// ── Spin & Word Display ──
function showWord(word, isDaily) {
  currentWord = word;
  const imgEl = $('word-image');
  const letter = word[0].toLowerCase();
  const baseName = toFilename(word);

  imgEl.classList.add('spinning');
  imgEl.src = `images/${letter}_${baseName}.webp`;
  imgEl.alt = word;
  imgEl.onerror = () => { imgEl.src = `images/${letter}_${baseName}.png`; };

  $('current-word').textContent = word;
  $('question').innerHTML = `What is the first sound of <strong>"${escapeHtml(word)}"</strong>?`;

  // TTS
  speakWord(word);

  // Start guessing
  startGuessing(isDaily);
}

function spinWord() {
  $('answer-feedback').hidden = true;
  if (navigator.vibrate) navigator.vibrate(100);

  const pool = getPool();
  if (!pool.length) {
    $('question').textContent = `All words completed! Try another letter.`;
    $('current-word').textContent = '';
    $('word-image').src = 'images/placeholder.png';
    return;
  }

  const word = pool[Math.floor(Math.random() * pool.length)];
  showWord(word, false);
}

function getPool() {
  let pool = selectedLetter === 'all'
    ? letterGroups[selectedGroup].flatMap(l => spinnerItems[l] || [])
    : spinnerItems[selectedLetter.toUpperCase()] || [];
  pool = pool.filter(w => w.length <= 5);

  let filtered = pool.filter(w => !activeProfile.completedWords.includes(w));
  if (!filtered.length && pool.length) {
    if (selectedLetter === 'all') {
      letterGroups[selectedGroup].forEach(l => resetLetterIfDone(l));
    } else {
      resetLetterIfDone(selectedLetter.toUpperCase());
    }
    filtered = pool.filter(w => !activeProfile.completedWords.includes(w));
    if (!filtered.length) filtered = pool;
  }
  return filtered;
}

function resetLetterIfDone(letter) {
  const words = spinnerItems[letter];
  if (!words) return;
  if (words.every(w => activeProfile.completedWords.includes(w))) {
    activeProfile.completedWords = activeProfile.completedWords.filter(
      w => !words.includes(w)
    );
  }
}

// ── Guessing ──
function startGuessing(isDaily) {
  const guessEl = $('guess-options');
  guessEl.innerHTML = '';
  guessEl.hidden = false;
  $('answer-feedback').hidden = true;

  const correctLetter = currentWord[0].toUpperCase();
  const groupLetters = letterGroups[selectedGroup].filter(l => l !== correctLetter);
  const distractors = shuffle(groupLetters).slice(0, GUESS_OPTIONS - 1);
  const options = shuffle([correctLetter, ...distractors]);

  options.forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'guess-btn';
    btn.textContent = l;
    btn.addEventListener('click', () => handleGuess(btn, l, correctLetter, isDaily));
    guessEl.appendChild(btn);
  });

  $('spin-button').disabled = true;
  $('play-sound-button').disabled = true;
}

function handleGuess(btn, guessed, correct, isDaily) {
  activeProfile.totalAttempts++;

  // Update letter stats
  if (!activeProfile.letterStats[correct]) {
    activeProfile.letterStats[correct] = { correct: 0, attempts: 0 };
  }
  activeProfile.letterStats[correct].attempts++;

  if (guessed === correct) {
    handleCorrectGuess(btn, correct, isDaily);
  } else {
    handleWrongGuess(btn);
  }
}

function handleCorrectGuess(btn, correct, isDaily) {
  btn.classList.add('correct');

  // Disable all guess buttons
  document.querySelectorAll('.guess-btn').forEach(b => { b.disabled = true; });

  activeProfile.totalCorrect++;
  activeProfile.currentStreak++;
  activeProfile.letterStats[correct].correct++;

  if (activeProfile.currentStreak > activeProfile.bestStreak) {
    activeProfile.bestStreak = activeProfile.currentStreak;
  }

  // XP calculation
  let xpGained = XP_PER_CORRECT;
  if (activeProfile.currentStreak >= 3) xpGained += XP_STREAK_BONUS;
  if (isDaily) xpGained += XP_DAILY_BONUS;

  const oldLevel = getLevel(activeProfile.xp);
  activeProfile.xp += xpGained;
  activeProfile.stars++;
  const newLevel = getLevel(activeProfile.xp);

  // Mark completed
  if (!activeProfile.completedWords.includes(currentWord)) {
    activeProfile.completedWords.push(currentWord);
  }

  // Daily challenge tracking
  if (isDaily) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (activeProfile.lastDailyDate === yesterday) {
      activeProfile.dailyStreak++;
    } else if (activeProfile.lastDailyDate !== today) {
      activeProfile.dailyStreak = 1;
    }
    activeProfile.lastDailyDate = today;
  }

  // Add recent activity
  addRecentActivity(`Learned "${currentWord}" (+${xpGained} XP)`);

  // Check group unlock
  checkUnlockNextGroup();

  // Check achievements
  checkAchievements();

  // Save
  saveProfiles(profiles);

  // UI
  showFeedback(true, `/${correct.toLowerCase()}/ is correct! +${xpGained} XP`);
  fireConfetti();

  // Play phoneme audio
  const audio = new Audio(`audio/${correct.toLowerCase()}.mp3`);
  audio.play().catch(() => {});

  // Level up check
  if (newLevel > oldLevel) {
    setTimeout(() => showLevelUp(newLevel), 800);
  }

  // Re-enable after delay
  setTimeout(() => {
    $('guess-options').hidden = true;
    $('spin-button').disabled = false;
    $('play-sound-button').disabled = false;
    updateGameUI();
    updateGroupProgress();
  }, 1500);
}

function handleWrongGuess(btn) {
  btn.classList.add('wrong');
  btn.disabled = true;
  activeProfile.currentStreak = 0;

  if (navigator.vibrate) navigator.vibrate([80, 30, 80]);
  showFeedback(false, 'Not quite! Try again.');
  updateGameUI();
  saveProfiles(profiles);
}

function showFeedback(isCorrect, text) {
  const el = $('answer-feedback');
  el.hidden = false;
  el.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
  $('answer-icon').textContent = isCorrect ? '\u2705' : '\u274C';
  $('answer-text').textContent = text;
}

// ── Confetti System (Canvas-based) ──
function initConfetti() {
  const canvas = $('confetti-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  confettiCtx = canvas.getContext('2d');

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function fireConfetti() {
  const colors = ['#7C5CFC', '#FF7E5F', '#FFD93D', '#26C6DA', '#66BB6A', '#FF6B4A'];

  for (let i = 0; i < 40; i++) {
    confettiParticles.push({
      x: Math.random() * window.innerWidth,
      y: -10,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      life: 1
    });
  }

  if (!confettiAnimId) animateConfetti();
}

function animateConfetti() {
  if (!confettiCtx) return;
  confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  confettiParticles = confettiParticles.filter(p => p.life > 0);

  confettiParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.rotation += p.rotSpeed;
    p.life -= 0.008;

    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.globalAlpha = p.life;
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    confettiCtx.restore();
  });

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(animateConfetti);
  } else {
    confettiAnimId = null;
    confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

// ── Level Up Overlay ──
function showLevelUp(level) {
  fireConfetti();
  const overlay = document.createElement('div');
  overlay.className = 'level-up-overlay';
  overlay.innerHTML = `
    <div class="level-up-card">
      <span class="level-up-icon">\u{1F389}</span>
      <div class="level-up-title">Level ${level}!</div>
      <p class="level-up-desc">Keep learning, you're doing great!</p>
      <button class="btn btn-primary" type="button">Continue</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('button').addEventListener('click', () => {
    overlay.remove();
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });
}

// ── Group Unlocking ──
function checkUnlockNextGroup() {
  const maxUnlocked = Math.max(...activeProfile.unlockedGroups);
  const nextGroup = maxUnlocked + 1;
  if (nextGroup <= 5 && activeProfile.stars >= activeProfile.unlockedGroups.length * STARS_TO_UNLOCK) {
    activeProfile.unlockedGroups.push(nextGroup);
    addRecentActivity(`Unlocked letter group ${nextGroup}!`);
    saveProfiles(profiles);
    updateGameUI();

    // Show notification
    showFeedback(true, `New letters unlocked: Group ${nextGroup}!`);
  }
}

// ── Achievements ──
function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    if (!activeProfile.achievements.includes(a.id) && a.check(activeProfile)) {
      activeProfile.achievements.push(a.id);
      addRecentActivity(`Achievement: ${a.name}`);
      showAchievementPopup(a);
    }
  });
}

function showAchievementPopup(achievement) {
  const popup = $('achievement-popup');
  $('achievement-popup-icon').textContent = achievement.icon;
  $('achievement-popup-title').textContent = 'Achievement Unlocked!';
  $('achievement-popup-desc').textContent = achievement.name;
  popup.hidden = false;
  setTimeout(() => { popup.hidden = true; }, 3500);
}

function renderAchievements() {
  const grid = $('achievements-grid');
  grid.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const unlocked = activeProfile?.achievements?.includes(a.id);
    const card = document.createElement('div');
    card.className = `achievement-card ${unlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <span class="achievement-icon">${unlocked ? a.icon : '\u{1F512}'}</span>
      <div class="achievement-name">${a.name}</div>
      <div class="achievement-desc">${a.desc}</div>
    `;
    grid.appendChild(card);
  });
}

// ── Recent Activity ──
function addRecentActivity(text) {
  activeProfile.recentActivity.unshift({
    text,
    time: new Date().toISOString()
  });
  if (activeProfile.recentActivity.length > 50) {
    activeProfile.recentActivity = activeProfile.recentActivity.slice(0, 50);
  }
}

// ══════════════════════════════════════════════════════════
// PARENT DASHBOARD
// ══════════════════════════════════════════════════════════
function openDashboard(selectedProfileId) {
  showScreen('screen-dashboard');
  renderDashboardProfileSelector(selectedProfileId);
  const pid = selectedProfileId || (profiles[0]?.id);
  if (pid) renderDashboard(pid);
}

function renderDashboardProfileSelector(selectedId) {
  const container = $('dash-profile-selector');
  container.innerHTML = '';
  profiles.forEach(p => {
    const chip = document.createElement('button');
    chip.className = `dash-profile-chip ${p.id === selectedId || (!selectedId && p === profiles[0]) ? 'selected' : ''}`;
    chip.textContent = `${p.avatar} ${p.name}`;
    chip.addEventListener('click', () => {
      container.querySelectorAll('.dash-profile-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      renderDashboard(p.id);
    });
    container.appendChild(chip);
  });
}

function renderDashboard(profileId) {
  const p = profiles.find(pr => pr.id === profileId);
  if (!p) return;

  const level = getLevel(p.xp);
  const accuracy = p.totalAttempts > 0 ? Math.round((p.totalCorrect / p.totalAttempts) * 100) : 0;

  $('dash-total-words').textContent = p.totalCorrect;
  $('dash-accuracy').textContent = accuracy + '%';
  $('dash-streak').textContent = p.bestStreak;
  $('dash-level').textContent = level;

  // Letter mastery chart
  renderLetterMastery(p);

  // Activity calendar
  renderActivityCalendar(p);

  // Recent activity
  renderRecentActivity(p);
}

function renderLetterMastery(profile) {
  const chart = $('letter-mastery-chart');
  chart.innerHTML = '';
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  allLetters.forEach(letter => {
    const stats = profile.letterStats[letter];
    let level = 0;
    if (stats) {
      if (stats.correct >= 10) level = 4;
      else if (stats.correct >= 6) level = 3;
      else if (stats.correct >= 3) level = 2;
      else if (stats.correct >= 1) level = 1;
    }
    const cell = document.createElement('div');
    cell.className = `mastery-cell level-${level}`;
    cell.textContent = letter;
    cell.title = stats ? `${letter}: ${stats.correct} correct / ${stats.attempts} attempts` : `${letter}: Not started`;
    chart.appendChild(cell);
  });
}

function renderActivityCalendar(profile) {
  const cal = $('activity-calendar');
  cal.innerHTML = '';
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Show last 28 days (4 weeks)
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const hasActivity = profile.activityDays?.includes(dateStr);
    const isToday = dateStr === todayStr;

    const cell = document.createElement('div');
    cell.className = `cal-day ${hasActivity ? 'has-activity' : 'empty'} ${isToday ? 'today' : ''}`;
    cell.textContent = d.getDate();
    cal.appendChild(cell);
  }
}

function renderRecentActivity(profile) {
  const list = $('recent-activity');
  list.innerHTML = '';
  const items = (profile.recentActivity || []).slice(0, 10);

  if (!items.length) {
    list.innerHTML = '<div class="recent-item"><span class="recent-text">No activity yet. Start playing!</span></div>';
    return;
  }

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'recent-item';
    const timeAgo = getTimeAgo(new Date(item.time));
    div.innerHTML = `
      <span class="recent-icon">\u{1F4CC}</span>
      <span class="recent-text">${escapeHtml(item.text)}</span>
      <span class="recent-time">${timeAgo}</span>
    `;
    list.appendChild(div);
  });
}

function getTimeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
  return Math.floor(seconds / 86400) + 'd ago';
}

// ══════════════════════════════════════════════════════════
// TTS & Audio
// ══════════════════════════════════════════════════════════
function speakWord(word) {
  if (currentUtterance) speechSynthesis.cancel();
  currentUtterance = new SpeechSynthesisUtterance(word);
  if (selectedVoice) currentUtterance.voice = selectedVoice;
  speechSynthesis.speak(currentUtterance);
}

function speakText(text) {
  if (currentUtterance) speechSynthesis.cancel();
  currentUtterance = new SpeechSynthesisUtterance(text);
  if (selectedVoice) currentUtterance.voice = selectedVoice;
  speechSynthesis.speak(currentUtterance);
}

function chooseDefaultVoice(voices) {
  const femaleIndicators = ['female','woman','girl','emma','susan','libby','hazel','zia','eva','samantha'];
  const isFemale = v => femaleIndicators.some(ind => v.name.toLowerCase().includes(ind));

  const enGBFemale = voices.filter(v => v.lang === 'en-GB' && isFemale(v));
  if (enGBFemale.length) return enGBFemale[0];
  const enGB = voices.filter(v => v.lang === 'en-GB');
  if (enGB.length) return enGB[0];
  const enUSFemale = voices.filter(v => v.lang === 'en-US' && isFemale(v));
  if (enUSFemale.length) return enUSFemale[0];
  const enUS = voices.filter(v => v.lang === 'en-US');
  if (enUS.length) return enUS[0];
  return voices[0] || null;
}

function loadVoices() {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return;

  const storedName = loadGlobal().selectedVoiceName;
  if (storedName) {
    selectedVoice = voices.find(v => v.name === storedName) || chooseDefaultVoice(voices);
  } else {
    selectedVoice = chooseDefaultVoice(voices);
  }

  const select = $('voice-select');
  if (select) {
    select.innerHTML = '';
    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.name;
      opt.textContent = `${v.name} (${v.lang})`;
      select.appendChild(opt);
    });
    if (selectedVoice) select.value = selectedVoice.name;
  }
}

// ── Utilities ──
function toFilename(word) {
  return word.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function preloadAssets(letters) {
  letters.forEach(letter => {
    (spinnerItems[letter] || []).forEach(word => {
      const img = new Image();
      img.src = `images/${letter.toLowerCase()}_${toFilename(word)}.webp`;
    });
  });
}

// ══════════════════════════════════════════════════════════
// THEME
// ══════════════════════════════════════════════════════════
function applyTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  const moonIcon = $('theme-icon-moon');
  const sunIcon = $('theme-icon-sun');
  if (moonIcon && sunIcon) {
    moonIcon.style.display = dark ? 'none' : 'block';
    sunIcon.style.display = dark ? 'block' : 'none';
  }
}

// ══════════════════════════════════════════════════════════
// EVENT LISTENERS
// ══════════════════════════════════════════════════════════
function setupGameEvents() {
  // Back to profiles
  $('back-to-profiles').addEventListener('click', () => {
    activeProfile = null;
    showScreen('screen-profiles');
    renderProfiles();
  });

  // Theme toggle
  $('theme-toggle').addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    applyTheme(isDark);
    const g = loadGlobal();
    g.theme = isDark ? 'dark' : 'light';
    saveGlobal(g);
  });

  // Settings
  $('settings-button').addEventListener('click', () => {
    $('settings-modal').hidden = false;
  });
  $('close-settings').addEventListener('click', () => {
    $('settings-modal').hidden = true;
  });
  $('reset-progress').addEventListener('click', () => {
    if (!activeProfile) return;
    if (!confirm('Reset all progress for ' + activeProfile.name + '?')) return;
    const idx = profiles.findIndex(p => p.id === activeProfile.id);
    if (idx >= 0) {
      const newP = createProfile(activeProfile.name, activeProfile.avatar);
      newP.id = activeProfile.id;
      profiles[idx] = newP;
      activeProfile = profiles[idx];
      saveProfiles(profiles);
      updateGameUI();
      $('settings-modal').hidden = true;
    }
  });
  $('view-achievements').addEventListener('click', () => {
    $('settings-modal').hidden = true;
    renderAchievements();
    showScreen('screen-achievements');
  });

  // Voice select
  $('voice-select').addEventListener('change', () => {
    const voices = speechSynthesis.getVoices();
    const match = voices.find(v => v.name === $('voice-select').value);
    if (match) {
      selectedVoice = match;
      const g = loadGlobal();
      g.selectedVoiceName = match.name;
      saveGlobal(g);
    }
  });

  // Tab buttons
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = parseInt(btn.dataset.group);
      if (!activeProfile?.unlockedGroups.includes(group)) return;

      document.querySelectorAll('.tab').forEach(b => b.classList.remove('selected'));
      document.querySelectorAll('.letter-grid').forEach(g => { g.classList.remove('active'); g.hidden = true; });
      btn.classList.add('selected');
      const grid = $(`group-${group}`);
      grid.classList.add('active');
      grid.hidden = false;

      selectedGroup = group;
      selectedLetter = 'all';
      document.querySelectorAll('.letter-chip').forEach(c => c.classList.remove('selected'));
      const allChip = grid.querySelector('.letter-chip[data-letter="all"]');
      if (allChip) allChip.classList.add('selected');

      preloadAssets(letterGroups[group]);
      updateGroupProgress();
    });
  });

  // Letter chips
  document.querySelectorAll('.letter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedLetter = btn.dataset.letter;
      const parent = btn.closest('.letter-grid');
      parent.querySelectorAll('.letter-chip').forEach(c => c.classList.remove('selected'));
      btn.classList.add('selected');
      new Audio('audio/pop.mp3').play().catch(() => {});
      if (selectedLetter === 'all') {
        preloadAssets(letterGroups[selectedGroup]);
      } else {
        preloadAssets([selectedLetter]);
      }
    });
  });

  // Spin
  $('spin-button').addEventListener('click', spinWord);

  // Hear word
  $('hear-word-button').addEventListener('click', () => {
    if (currentWord) speakWord(currentWord);
  });

  // Play sound (reveal)
  $('play-sound-button').addEventListener('click', () => {
    if (!currentWord) {
      new Audio('audio/instruction.mp3').play().catch(() => {});
      return;
    }
    const letter = currentWord[0].toLowerCase();
    new Audio(`audio/${letter}.mp3`).play().catch(() => {});
  });

  // Read question
  $('read-question-button').addEventListener('click', () => {
    const text = $('question').textContent;
    if (text) speakText(text);
  });

  // Achievements back
  $('back-from-achievements').addEventListener('click', () => {
    if (activeProfile) {
      showScreen('screen-game');
    } else {
      showScreen('screen-profiles');
    }
  });

  // Dashboard back
  $('back-from-dashboard').addEventListener('click', () => {
    showScreen('screen-profiles');
  });

  // Image spin animation end
  $('word-image').addEventListener('animationend', () => {
    $('word-image').classList.remove('spinning');
  });
}

// ══════════════════════════════════════════════════════════
// PWA SERVICE WORKER
// ══════════════════════════════════════════════════════════
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

// ══════════════════════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════════════════════
function init() {
  // Theme
  const globalSettings = loadGlobal();
  applyTheme(globalSettings.theme === 'dark');

  // Voices
  speechSynthesis.addEventListener('voiceschanged', loadVoices);
  loadVoices();

  // Confetti canvas
  initConfetti();

  // Setup screens
  setupProfileScreen();
  setupGameEvents();

  // PWA
  registerServiceWorker();

  // If only one profile, could auto-select (optional)
  showScreen('screen-profiles');
}

init();
