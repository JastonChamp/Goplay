// ===== Activity Data =====

const DATA = {
  // --- Blending: sounds → blended word ---
  blending: [
    { sounds: ["c", "a", "t"], answer: "cat", options: ["cat", "bat", "cut", "cot"] },
    { sounds: ["d", "o", "g"], answer: "dog", options: ["dig", "dog", "fog", "log"] },
    { sounds: ["s", "u", "n"], answer: "sun", options: ["sun", "run", "fun", "bun"] },
    { sounds: ["p", "i", "g"], answer: "pig", options: ["big", "dig", "pig", "wig"] },
    { sounds: ["h", "a", "t"], answer: "hat", options: ["hat", "hot", "hit", "hut"] },
    { sounds: ["r", "e", "d"], answer: "red", options: ["bed", "red", "led", "fed"] },
    { sounds: ["b", "u", "s"], answer: "bus", options: ["bus", "but", "bug", "bud"] },
    { sounds: ["m", "a", "p"], answer: "map", options: ["cap", "map", "nap", "tap"] },
    { sounds: ["f", "i", "sh"], answer: "fish", options: ["dish", "wish", "fish", "fist"] },
    { sounds: ["sh", "i", "p"], answer: "ship", options: ["chip", "ship", "shop", "skip"] },
  ],

  // --- First Sounds: identify the starting sound ---
  firstSounds: [
    { word: "ball", answer: "b", options: ["b", "d", "p", "t"] },
    { word: "cat", answer: "c", options: ["c", "k", "s", "t"] },
    { word: "fish", answer: "f", options: ["f", "v", "s", "th"] },
    { word: "moon", answer: "m", options: ["n", "m", "w", "b"] },
    { word: "tree", answer: "t", options: ["t", "d", "ch", "tr"] },
    { word: "sun", answer: "s", options: ["s", "z", "sh", "c"] },
    { word: "lamp", answer: "l", options: ["l", "r", "n", "m"] },
    { word: "goat", answer: "g", options: ["g", "k", "j", "d"] },
    { word: "ring", answer: "r", options: ["r", "l", "w", "n"] },
    { word: "jump", answer: "j", options: ["j", "g", "ch", "y"] },
  ],

  // --- Sight Words: pairs for matching ---
  sightWords: [
    "the", "and", "was", "you", "they",
    "said", "have", "like", "come", "some",
    "what", "when", "your", "each", "make",
  ],

  // --- Grammar Cloze: fill in the correct grammar word ---
  grammarCloze: [
    { sentence: "She ___ going to the park.", answer: "is", options: ["is", "are", "am", "be"] },
    { sentence: "They ___ playing in the garden.", answer: "are", options: ["is", "are", "was", "am"] },
    { sentence: "I ___ a student.", answer: "am", options: ["is", "are", "am", "be"] },
    { sentence: "He ___ his homework yesterday.", answer: "did", options: ["do", "did", "does", "done"] },
    { sentence: "We ___ eaten lunch already.", answer: "have", options: ["has", "have", "had", "having"] },
    { sentence: "The cat sat ___ the mat.", answer: "on", options: ["on", "in", "at", "to"] },
    { sentence: "She is taller ___ her brother.", answer: "than", options: ["then", "than", "that", "the"] },
    { sentence: "There ___ many books on the shelf.", answer: "are", options: ["is", "are", "was", "has"] },
    { sentence: "He ___ not like spicy food.", answer: "does", options: ["do", "does", "did", "is"] },
    { sentence: "I will go ___ the store.", answer: "to", options: ["to", "at", "in", "on"] },
  ],

  // --- Vocabulary Cloze: fill in the best vocabulary word ---
  vocabCloze: [
    { sentence: "The ___ shines brightly in the sky.", answer: "sun", options: ["sun", "moon", "star", "cloud"] },
    { sentence: "A ___ has four legs and barks.", answer: "dog", options: ["cat", "dog", "bird", "fish"] },
    { sentence: "We use an ___ to keep the rain off.", answer: "umbrella", options: ["umbrella", "jacket", "hat", "shoe"] },
    { sentence: "The ___ flew high above the trees.", answer: "bird", options: ["fish", "car", "bird", "ball"] },
    { sentence: "She drank a glass of cold ___.", answer: "water", options: ["water", "fire", "sand", "stone"] },
    { sentence: "The farmer grows ___ in the field.", answer: "crops", options: ["toys", "books", "crops", "cars"] },
    { sentence: "A ___ helps you see in the dark.", answer: "torch", options: ["torch", "chair", "spoon", "clock"] },
    { sentence: "The children played on the ___ at the park.", answer: "swing", options: ["desk", "swing", "oven", "lamp"] },
    { sentence: "In winter, we wear a warm ___.", answer: "coat", options: ["coat", "shorts", "sandals", "cap"] },
    { sentence: "The ___ swims in the ocean.", answer: "whale", options: ["eagle", "whale", "tiger", "horse"] },
  ],

  // --- Word Order: rearrange words into correct sentence ---
  wordOrder: [
    { words: ["The", "cat", "sat", "on", "the", "mat."], answer: "The cat sat on the mat." },
    { words: ["I", "like", "to", "eat", "apples."], answer: "I like to eat apples." },
    { words: ["She", "is", "reading", "a", "book."], answer: "She is reading a book." },
    { words: ["We", "went", "to", "the", "park."], answer: "We went to the park." },
    { words: ["The", "dog", "is", "very", "happy."], answer: "The dog is very happy." },
    { words: ["He", "can", "run", "very", "fast."], answer: "He can run very fast." },
    { words: ["They", "are", "playing", "in", "the", "garden."], answer: "They are playing in the garden." },
    { words: ["My", "mother", "bakes", "delicious", "cakes."], answer: "My mother bakes delicious cakes." },
    { words: ["The", "birds", "sing", "in", "the", "morning."], answer: "The birds sing in the morning." },
    { words: ["Please", "close", "the", "door", "quietly."], answer: "Please close the door quietly." },
  ],
};
