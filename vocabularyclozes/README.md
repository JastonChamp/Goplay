# Vocabulary Cloze Adventure

Vocabulary Cloze Adventure is a browser-based game for practicing vocabulary using fill-in-the-blank passages. Drag or tap words into the blanks, check your answers, and track your progress.

## Running the App

1. Clone or download this repository.
2. Open `index.html` in a modern web browser (no build step is required).

The game works entirely in the browser, so you can run it locally by simply double-clicking `index.html` or serving the folder with any static file server.

## Prerequisites

* [Node.js](https://nodejs.org/) **20** or higher is required to run the test suite.

## Running Tests

Install dependencies once (`npm install`) and run:

```bash
npm test
```

This executes the scripts in `scripts/tests/` using Node's ES module support.

## Using the Controls

- **Hint (💡)** – Get a hint for the current blank. Click highlighted keywords or the small lightbulb next to a blank for additional clues.
- **Clear** – Reset the current passage to its initial state.
- **Share** – Copy a text summary of your current score to the clipboard.
- **Read Passage** – Use the browser's speech synthesis to read the passage aloud.
- **Reset** – Shuffle the word box and start the passage over.
- **Prev/Next** – Navigate between passages in the selected vocabulary category.
- **Sidebar** – Use the sidebar (☰) to switch categories, adjust the timer, pick a voice for text-to-speech, toggle the dyslexia font, change text size, and choose a color theme.
- **Theme Toggle** – Switch between light and dark mode.

## Level Selection

Use the **Level** dropdown in the sidebar to choose between *Apprentice*, *Scholar*, or *Master* difficulty. Passages are grouped by these levels so that easier sentences appear first. Selecting a higher level loads more advanced passages with trickier vocabulary.

Keyboard and mouse/touch interactions are supported. The app relies on the Web Speech API for text-to-speech, so a browser with that feature (such as recent versions of Chrome or Firefox) is recommended.

### Optional Audio

The interface references `correct.mp3` and `incorrect.mp3` for feedback sounds. You may supply your own audio files with these names in the project folder if desired.

## License

This project is licensed under the [Apache License, Version 2.0](LICENSE).
