# Grammar Cloze Adventure

Grammar Cloze Adventure is an interactive browser-based game for practicing grammar skills. It presents passages with missing words and allows players to drag or tap words into the blanks. Hints, a timer and challenge modes are included, along with optional audio cues and dyslexia-friendly fonts.

## Features

- **Interactive drag-or-drop play** with instant feedback
- **Hints and semantic clues** to guide the player
- **Challenge and practice modes** with an optional countdown timer
- **Adjustable text size** and **dyslexia-friendly font** toggle
- **Light/Dark theme** switch and progress tracking with levels
- **Built‑in text-to-speech** so passages can be read aloud
- **Share button** to boast your score with friends

## Running

Open `index.html` directly in any modern web browser. No build step or server is required. Simply double-click the file or open it via `File > Open` in your browser.
If your browser blocks module loading from the file system, run a quick local server:

```bash
python3 -m http.server
```

Then visit <http://localhost:8000> in your browser.

## Optional Dependencies

The project can make use of additional assets when present:

- **Fonts**: `styles.css` references the `OpenDyslexic` font files located under `fonts/`. If these fonts are missing, the page will fall back to standard fonts.
- **Sound files**: `index.html` expects `correct.mp3` and `incorrect.mp3` for sound effects. If these files are absent, the game will run without audio feedback.

## Development

The passages used in the game live in `scripts/data/passages.js`.  Feel free to
edit or add new passages to tailor the challenge for your classroom or friends.
No build step is necessary—just reload the page after editing.

## License

This project is released under the terms of the [GNU General Public License version 3](LICENSE).
