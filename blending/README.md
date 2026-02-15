# Word Spinner

Word Spinner is a small browser-based phonics game. The page spins through a variety of letter combinations and prompts players to blend the resulting sounds into words. It is designed for quick practice with common consonant-vowel patterns.

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in any modern web browser. No extra build step or server is required, but using a local HTTP server (e.g. with `python -m http.server`) avoids potential browser restrictions on audio playback.
3. Make sure your browser can play audio, as the game uses `.mp3` files for letter sounds and effects.

## Prerequisites

- A modern browser with JavaScript enabled.
- Speakers or headphones to hear the sound assets.

## Customization

The **Customize** panel lets you tailor the game to your needs. You can:

- Choose a **Word Type** (CVC, CCVC, CVCC, CCVCC, digraphs, extended, or silent E).
- Limit spins to a particular **Focus Vowel** or use all vowels.
- Switch between several **Themes** like Space Adventure or High Contrast.

All selections are saved in your browser's `localStorage` so your preferences
persist the next time you open the page.

## Keyboard Shortcuts

- **S** – Spin for a new word
- **R** – Repeat the current word
- **H** – Hear a hint

## Tutorial Modal

The first visit triggers a short tutorial explaining the controls. You can skip
or complete it, and the choice is remembered via `localStorage`. Clear the
`wordSpinnerPrefs` and `hasSeenTutorial` keys to view the tutorial again.
## Audio Assets

The repository contains numerous .mp3 files used for letter pronunciations and sound effects during gameplay.

## License

This project is licensed under the [Apache 2.0 License](LICENSE). All audio files (letter sounds and effects) are included in this repository for demonstration purposes.
