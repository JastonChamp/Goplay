export function loadVoices(selectEl) {
  function populateVoices() {
    const voices = speechSynthesis.getVoices();
    selectEl.innerHTML = voices
      .filter(v => v.lang.startsWith('en'))
      .map(v => `<option value="${v.name}">${v.name} (${v.lang})</option>`)
      .join('');
  }
  speechSynthesis.onvoiceschanged = populateVoices;
  populateVoices();
}

export function speak(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const selected = document.getElementById('voice-select').value;
  if (selected) {
    utterance.voice = speechSynthesis.getVoices().find(v => v.name === selected);
  }
  speechSynthesis.speak(utterance);
}
