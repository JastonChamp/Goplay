// =======================
// Grammar Cloze Passages
// Organized by Primary Level (P1-P6)
// =======================

export const passages = {

  // ============================================================
  // PRIMARY 1 (Age 6-7) - Simple sentences, basic grammar
  // Focus: basic prepositions, simple conjunctions, common verbs
  // ============================================================
  P1: [
    {
      text: "The cat sat ___(1)___ the mat. It looked ___(2)___ the window. The sun was shining ___(3)___ the sky. The cat was happy ___(4)___ warm.",
      wordBox: ["on", "out", "in", "and", "but", "at"],
      answers: ["on", "out", "in", "and"],
      clueWords: [
        ["cat", "mat"],
        ["looked", "window"],
        ["sun", "sky"],
        ["happy", "warm"]
      ],
      hints: [
        "The cat is resting on top of something.",
        "The cat is looking through the window to the outside.",
        "The sun is up above, inside the sky.",
        "The cat feels two good things at the same time."
      ],
      hint: "Think about where things are and how they connect."
    },
    {
      text: "Tom went ___(1)___ the shop. He wanted ___(2)___ buy some bread. He walked ___(3)___ the road carefully. His mother waited ___(4)___ home.",
      wordBox: ["to", "across", "at", "in", "for", "with"],
      answers: ["to", "to", "across", "at"],
      clueWords: [
        ["went", "shop"],
        ["wanted", "buy"],
        ["walked", "road"],
        ["waited", "home"]
      ],
      hints: [
        "Tom is going toward the shop.",
        "He wanted something — what word comes before 'buy'?",
        "He had to go from one side of the road to the other.",
        "His mother stayed in one place — at home."
      ],
      hint: "These words tell you where Tom goes and what he does."
    },
    {
      text: "I like apples ___(1)___ oranges. My sister likes grapes ___(2)___ she does not like bananas. We eat fruit ___(3)___ school. It is good ___(4)___ us.",
      wordBox: ["and", "but", "at", "for", "with", "in"],
      answers: ["and", "but", "at", "for"],
      clueWords: [
        ["apples", "oranges"],
        ["likes", "does not like"],
        ["eat", "school"],
        ["good", "us"]
      ],
      hints: [
        "You like both fruits — which word joins two things you like?",
        "She likes one thing but not another — a contrast word.",
        "Where do you eat the fruit? At a place.",
        "Fruit is good — this word shows who benefits."
      ],
      hint: "Look for joining words and place words."
    },
    {
      text: "The dog ran ___(1)___ the garden. It jumped ___(2)___ the fence. Then it sat ___(3)___ a tree. The dog was tired ___(4)___ thirsty.",
      wordBox: ["in", "over", "under", "and", "but", "to"],
      answers: ["in", "over", "under", "and"],
      clueWords: [
        ["dog", "garden"],
        ["jumped", "fence"],
        ["sat", "tree"],
        ["tired", "thirsty"]
      ],
      hints: [
        "The dog is running inside the garden.",
        "The dog jumped above the fence to the other side.",
        "The dog rested below the tree for shade.",
        "The dog feels two things — both tired and thirsty."
      ],
      hint: "Think about where the dog is and how it feels."
    },
    {
      text: "Sara put her bag ___(1)___ the table. She took out a book ___(2)___ started reading. The story was ___(3)___ a brave girl. Sara read ___(4)___ it was time for bed.",
      wordBox: ["on", "and", "about", "until", "in", "but"],
      answers: ["on", "and", "about", "until"],
      clueWords: [
        ["bag", "table"],
        ["took out", "started"],
        ["story", "girl"],
        ["read", "bed"]
      ],
      hints: [
        "The bag is placed on top of the table.",
        "She did two things — took out a book then started reading.",
        "The story tells us the topic — it is on the subject of a girl.",
        "Sara kept reading up to the point when it was bedtime."
      ],
      hint: "Notice where things are placed and what happens next."
    }
  ],

  // ============================================================
  // PRIMARY 2 (Age 7-8) - Slightly longer, more varied grammar
  // Focus: prepositions, conjunctions, simple tenses
  // ============================================================
  P2: [
    {
      text: "Last week, Ali ___(1)___ to the zoo with his family. They ___(2)___ many animals there. A monkey ___(3)___ swinging from a tree. Ali ___(4)___ very excited because he had never seen a real lion before.",
      wordBox: ["went", "saw", "was", "is", "felt", "were"],
      answers: ["went", "saw", "was", "felt"],
      clueWords: [
        ["Last week", "zoo"],
        ["many", "animals"],
        ["monkey", "swinging"],
        ["excited", "lion"]
      ],
      hints: [
        "This happened last week — use the past tense of 'go'.",
        "They looked at animals — past tense of 'see'.",
        "One monkey doing something — past tense of 'is'.",
        "Ali had a feeling — past tense of 'feel'."
      ],
      hint: "This story happened in the past. Use past tense words."
    },
    {
      text: "Every morning, Mei Ling ___(1)___ up early. She ___(2)___ her teeth and ___(3)___ her breakfast. After that, she walks ___(4)___ school with her brother.",
      wordBox: ["wakes", "brushes", "eats", "ate", "to", "at"],
      answers: ["wakes", "brushes", "eats", "to"],
      clueWords: [
        ["Every morning", "early"],
        ["teeth"],
        ["breakfast"],
        ["walks", "school"]
      ],
      hints: [
        "'Every morning' means this happens regularly — present tense.",
        "What do you do with teeth every day?",
        "What do you do with breakfast every day?",
        "She walks in the direction of school."
      ],
      hint: "This is about a daily routine — use present tense."
    },
    {
      text: "The children played ___(1)___ the park ___(2)___ it started to rain. They ran ___(3)___ the shelter quickly. ___(4)___ they were wet, they were still laughing.",
      wordBox: ["in", "until", "to", "Although", "Because", "under"],
      answers: ["in", "until", "to", "Although"],
      clueWords: [
        ["played", "park"],
        ["started", "rain"],
        ["ran", "shelter"],
        ["wet", "laughing"]
      ],
      hints: [
        "Where did the children play? Inside the park.",
        "They played up to the point when it rained.",
        "They ran toward the shelter.",
        "They were wet but still happy — a contrast word at the start."
      ],
      hint: "Think about where, when, and contrast."
    },
    {
      text: "My grandmother ___(1)___ delicious cookies every Sunday. She ___(2)___ us to help her ___(3)___ the kitchen. We always have fun ___(4)___ we bake together.",
      wordBox: ["bakes", "asks", "in", "when", "at", "baked"],
      answers: ["bakes", "asks", "in", "when"],
      clueWords: [
        ["every Sunday", "cookies"],
        ["us", "help"],
        ["kitchen"],
        ["fun", "together"]
      ],
      hints: [
        "'Every Sunday' means it happens regularly.",
        "Grandmother wants us to help — she requests it.",
        "Where is the baking done? Inside the kitchen.",
        "We have fun at the time that we bake together."
      ],
      hint: "This is a regular activity — use present tense words."
    },
    {
      text: "During the class trip, the students ___(1)___ a farm. They ___(2)___ how to milk a cow ___(3)___ feed the chickens. Everyone ___(4)___ that it was the best trip ever.",
      wordBox: ["visited", "learned", "and", "agreed", "but", "or"],
      answers: ["visited", "learned", "and", "agreed"],
      clueWords: [
        ["class trip", "farm"],
        ["how", "cow"],
        ["milk", "feed"],
        ["Everyone", "best"]
      ],
      hints: [
        "The trip already happened — past tense of 'visit'.",
        "They gained new knowledge — past tense of 'learn'.",
        "They did two things — milk a cow and also feed chickens.",
        "All students had the same opinion — past tense of 'agree'."
      ],
      hint: "This is about a past event. Use past tense verbs."
    }
  ],

  // ============================================================
  // PRIMARY 3 (Age 8-9) - Moderate complexity
  // Focus: mixed grammar, prepositions, conjunctions, tenses
  // ============================================================
  P3: [
    {
      text: "The farmer ___(1)___ his crops every morning before the sun ___(2)___. He carries a heavy basket ___(3)___ his back and walks ___(4)___ the muddy field. His dog always follows ___(5)___ him faithfully.",
      wordBox: ["waters", "rises", "on", "across", "behind", "into", "with", "under"],
      answers: ["waters", "rises", "on", "across", "behind"],
      clueWords: [
        ["farmer", "crops", "morning"],
        ["sun"],
        ["basket", "back"],
        ["walks", "field"],
        ["dog", "faithfully"]
      ],
      hints: [
        "What does a farmer do to crops regularly? He gives them water.",
        "What does the sun do in the morning? It comes up.",
        "The basket rests on top of his back.",
        "He moves from one side of the field to the other.",
        "The dog walks after him, staying close at the back."
      ],
      hint: "Think about daily farming activities and positions."
    },
    {
      text: "Although Ravi studied hard ___(1)___ his test, he ___(2)___ not do well. His teacher told him that he ___(3)___ try again ___(4)___ not give up. Ravi ___(5)___ to work even harder next time.",
      wordBox: ["for", "did", "should", "and", "decided", "could", "but", "was"],
      answers: ["for", "did", "should", "and", "decided"],
      clueWords: [
        ["studied", "test"],
        ["not", "well"],
        ["teacher", "try"],
        ["try", "give up"],
        ["harder", "next time"]
      ],
      hints: [
        "He studied in preparation for his test.",
        "He was unable to do well — past tense of 'do'.",
        "The teacher gave advice — what word means 'ought to'?",
        "Two actions joined: try again plus not give up.",
        "Ravi made a choice — past tense of 'decide'."
      ],
      hint: "This passage is about effort and not giving up."
    },
    {
      text: "The library ___(1)___ a quiet place where students can read ___(2)___ study. Books ___(3)___ arranged neatly on the shelves. ___(4)___ you want to borrow a book, you need a library card. The librarian ___(5)___ always ready to help.",
      wordBox: ["is", "and", "are", "If", "was", "or", "has", "being"],
      answers: ["is", "and", "are", "If", "is"],
      clueWords: [
        ["library", "quiet place"],
        ["read", "study"],
        ["Books", "shelves"],
        ["want", "borrow"],
        ["librarian", "help"]
      ],
      hints: [
        "The library is one place — use singular present tense.",
        "Students do two activities: read and also study.",
        "Books is plural — which verb agrees with plural subjects?",
        "This is a condition — what word starts a conditional sentence?",
        "The librarian is one person — use singular present tense."
      ],
      hint: "Check whether subjects are singular or plural."
    },
    {
      text: "Last Saturday, my family ___(1)___ to the beach. My brother and I ___(2)___ sandcastles while our parents ___(3)___ under an umbrella. We stayed ___(4)___ the sun set. It was one of the ___(5)___ days of the holidays.",
      wordBox: ["went", "built", "rested", "until", "best", "good", "sat", "before"],
      answers: ["went", "built", "rested", "until", "best"],
      clueWords: [
        ["Last Saturday", "beach"],
        ["brother", "sandcastles"],
        ["parents", "umbrella"],
        ["stayed", "sun set"],
        ["one of the", "days"]
      ],
      hints: [
        "Past tense of 'go' — they travelled to the beach.",
        "Past tense — they made sandcastles.",
        "The parents relaxed — past tense of 'rest'.",
        "They stayed up to the time the sun went down.",
        "'One of the' signals a superlative — the most good."
      ],
      hint: "Everything happened last Saturday — use past tense."
    },
    {
      text: "Siti ___(1)___ her homework every day after school. She ___(2)___ not like to leave it ___(3)___ the last minute. Her mother is proud ___(4)___ her because she is very ___(5)___.",
      wordBox: ["does", "do", "till", "of", "responsible", "for", "responsibly", "did"],
      answers: ["does", "does", "till", "of", "responsible"],
      clueWords: [
        ["homework", "every day"],
        ["not like", "leave"],
        ["last minute"],
        ["proud", "her"],
        ["is", "very"]
      ],
      hints: [
        "Siti is one person doing this regularly — third person singular.",
        "She is one person — 'does not like', not 'do not like'.",
        "She doesn't wait — up to the last minute.",
        "Proud is followed by which preposition? Proud ___ her.",
        "After 'is very', we need an adjective, not an adverb."
      ],
      hint: "Pay attention to subject-verb agreement and word forms."
    },
    {
      text: "The school concert ___(1)___ held last Friday. Many parents ___(2)___ to watch their children perform. The choir ___(3)___ beautifully and the audience ___(4)___ loudly. Everyone ___(5)___ that it was a wonderful show.",
      wordBox: ["was", "came", "sang", "clapped", "agreed", "were", "come", "sing"],
      answers: ["was", "came", "sang", "clapped", "agreed"],
      clueWords: [
        ["concert", "last Friday"],
        ["parents", "watch"],
        ["choir", "beautifully"],
        ["audience", "loudly"],
        ["Everyone", "wonderful"]
      ],
      hints: [
        "The concert is singular and this was in the past.",
        "Parents arrived — past tense of 'come'.",
        "The choir performed songs — past tense of 'sing'.",
        "The audience showed approval — past tense of 'clap'.",
        "Everyone had the same thought — past tense of 'agree'."
      ],
      hint: "This happened last Friday — all verbs should be past tense."
    },
    {
      text: "The weather today is ___(1)___ than yesterday. Dark clouds have gathered ___(2)___ the sky. Mother told us to bring ___(3)___ umbrellas in case it ___(4)___. We should also wear ___(5)___ jackets to keep warm.",
      wordBox: ["worse", "in", "our", "rains", "thick", "worst", "on", "rained"],
      answers: ["worse", "in", "our", "rains", "thick"],
      clueWords: [
        ["weather", "than yesterday"],
        ["clouds", "sky"],
        ["us", "umbrellas"],
        ["in case", "it"],
        ["wear", "jackets"]
      ],
      hints: [
        "Comparing today to yesterday — comparative form of 'bad'.",
        "Clouds are located inside the sky.",
        "The umbrellas belong to us — which possessive pronoun?",
        "'In case' talks about a possible future event — use present tense.",
        "What kind of jackets keep you warm? A describing word."
      ],
      hint: "Look at comparisons, possessives, and describing words."
    },
    {
      text: "My neighbour, Mr Tan, ___(1)___ a kind man. He often ___(2)___ the elderly carry their groceries. ___(3)___ he is busy, he still makes time to help others. Everyone in the neighbourhood ___(4)___ him. He ___(5)___ lived here for twenty years.",
      wordBox: ["is", "helps", "Even though", "likes", "has", "Although", "help", "like"],
      answers: ["is", "helps", "Even though", "likes", "has"],
      clueWords: [
        ["Mr Tan", "kind man"],
        ["often", "elderly", "groceries"],
        ["busy", "still", "help"],
        ["Everyone", "him"],
        ["lived", "twenty years"]
      ],
      hints: [
        "Mr Tan is one person — singular 'is'.",
        "He does this often — third person singular present.",
        "He is busy BUT still helps — a contrast phrase.",
        "Everyone is singular — takes singular verb.",
        "For twenty years — present perfect tense with 'has'."
      ],
      hint: "Check subject-verb agreement and contrast words."
    },
    {
      text: "The zookeeper feeds the animals ___(1)___ a day. The lions eat ___(2)___ meat than the monkeys. She ___(3)___ careful not to go too ___(4)___ to the crocodile enclosure. Working at the zoo is the ___(5)___ job she has ever had.",
      wordBox: ["twice", "more", "is", "close", "best", "two", "most", "closely"],
      answers: ["twice", "more", "is", "close", "best"],
      clueWords: [
        ["feeds", "a day"],
        ["lions", "than", "monkeys"],
        ["careful", "crocodile"],
        ["too", "enclosure"],
        ["ever had", "job"]
      ],
      hints: [
        "How many times a day? Two times = ?",
        "'Than' signals a comparison — comparative form of 'much'.",
        "She is one person — which form of 'be'?",
        "After 'too', we need an adjective — near the enclosure.",
        "'Ever had' signals superlative — the most good."
      ],
      hint: "Watch for comparisons and correct word forms."
    },
    {
      text: "During recess, the children ___(1)___ to the canteen eagerly. Some of ___(2)___ bought noodles while others ___(3)___ sandwiches. They ___(4)___ their food together at a long table. Recess is the time ___(5)___ everyone looks forward to.",
      wordBox: ["rushed", "them", "preferred", "shared", "that", "they", "those", "sharing"],
      answers: ["rushed", "them", "preferred", "shared", "that"],
      clueWords: [
        ["children", "canteen", "eagerly"],
        ["Some of", "bought"],
        ["others", "sandwiches"],
        ["food", "together"],
        ["time", "everyone"]
      ],
      hints: [
        "They went quickly — past tense of 'rush'.",
        "'Some of' is followed by an object pronoun.",
        "Others chose something different — past tense of 'prefer'.",
        "They ate together — past tense of 'share'.",
        "'The time' needs a relative pronoun to connect the clause."
      ],
      hint: "This happened during recess — use past tense."
    }
  ],

  // ============================================================
  // PRIMARY 4 (Age 9-10) - Longer passages, more grammar variety
  // Focus: tenses, conjunctions, subject-verb agreement, pronouns
  // ============================================================
  P4: [
    {
      text: "The science experiment ___(1)___ more interesting than we had expected. Our teacher ___(2)___ us to mix two chemicals together. ___(3)___ we added the second chemical, the liquid ___(4)___ bubbling. None of the students ___(5)___ ever seen anything like it before.",
      wordBox: ["was", "told", "When", "started", "had", "were", "After", "has"],
      answers: ["was", "told", "When", "started", "had"],
      clueWords: [
        ["experiment", "more interesting"],
        ["teacher", "us", "mix"],
        ["added", "second chemical"],
        ["liquid", "bubbling"],
        ["students", "before"]
      ],
      hints: [
        "The experiment is singular — 'was' not 'were'.",
        "The teacher gave instructions — past tense of 'tell'.",
        "At the time that we added — which time word?",
        "The liquid began to bubble — past tense of 'start'.",
        "'Before' signals past perfect — 'had' not 'has'."
      ],
      hint: "Pay attention to singular/plural and past tense forms."
    },
    {
      text: "Neither the boys ___(1)___ the girls wanted to clean the classroom. The teacher said that ___(2)___ of them had to take responsibility. ___(3)___ much complaining, they finally started sweeping the floor. By the time the bell ___(4)___, the room looked ___(5)___ cleaner than before.",
      wordBox: ["nor", "all", "After", "rang", "much", "or", "every", "rung"],
      answers: ["nor", "all", "After", "rang", "much"],
      clueWords: [
        ["Neither", "boys", "girls"],
        ["them", "responsibility"],
        ["complaining", "finally"],
        ["bell"],
        ["cleaner", "than"]
      ],
      hints: [
        "'Neither' is always paired with which word?",
        "Every single one of them — which word means 'every one'?",
        "First there was complaining, then they started — time sequence.",
        "The bell made a sound — past tense of 'ring'.",
        "How much cleaner? A word that intensifies the comparison."
      ],
      hint: "Look for word pairs and correct tenses."
    },
    {
      text: "If I ___(1)___ a bird, I would fly ___(2)___ the clouds. I would visit every country and ___(3)___ new friends everywhere. ___(4)___, I am just a boy who can only dream ___(5)___ such adventures.",
      wordBox: ["were", "above", "make", "However", "of", "am", "about", "over"],
      answers: ["were", "above", "make", "However", "of"],
      clueWords: [
        ["If", "bird"],
        ["fly", "clouds"],
        ["visit", "friends"],
        ["just a boy", "dream"],
        ["dream", "adventures"]
      ],
      hints: [
        "'If I ___ a bird' — this is imaginary, use 'were' not 'was'.",
        "Flying higher than the clouds — which preposition?",
        "'Would visit and ___' — base form of the verb.",
        "The reality is different from the dream — a contrast word.",
        "Dream of something — which preposition follows 'dream'?"
      ],
      hint: "This passage mixes imagination with reality."
    },
    {
      text: "The old house at the end of the street ___(1)___ abandoned for many years. Vines ___(2)___ crept up its crumbling walls. ___(3)___ its frightening appearance, some curious children still ___(4)___ to explore it. They ___(5)___ that it might be haunted.",
      wordBox: ["had been", "had", "Despite", "wanted", "believed", "has been", "have", "Although"],
      answers: ["had been", "had", "Despite", "wanted", "believed"],
      clueWords: [
        ["old house", "many years"],
        ["Vines", "walls"],
        ["frightening", "still"],
        ["curious", "explore"],
        ["haunted"]
      ],
      hints: [
        "The house was empty for many years — past perfect passive.",
        "The vines already climbed up — past perfect.",
        "The appearance was scary but children still came — which word means 'in spite of'?",
        "The children had a desire — past tense of 'want'.",
        "They thought something — past tense of 'believe'."
      ],
      hint: "This story is set in the past. Look for contrast words."
    },
    {
      text: "My sister, ___(1)___ is a doctor, works at the General Hospital. She ___(2)___ been working there ___(3)___ she graduated five years ago. ___(4)___ of her patients trust her because she is ___(5)___ caring and skilled.",
      wordBox: ["who", "has", "since", "Most", "both", "which", "had", "Many"],
      answers: ["who", "has", "since", "Most", "both"],
      clueWords: [
        ["sister", "doctor"],
        ["working", "there"],
        ["graduated", "five years ago"],
        ["patients", "trust"],
        ["caring", "skilled"]
      ],
      hints: [
        "We need a pronoun for a person — 'who' not 'which'.",
        "She started in the past and continues now — present perfect.",
        "From the time she graduated — which word?",
        "A large number of her patients — which word fits?",
        "She has two qualities — caring and skilled."
      ],
      hint: "Pay attention to pronouns and present perfect tense."
    },
    {
      text: "The team ___(1)___ practising hard for the competition next month. Each player ___(2)___ to give their best effort. The coach, together with the players, ___(3)___ determined to win. ___(4)___ they win or lose, the experience will be ___(5)___.",
      wordBox: ["has been", "needs", "is", "Whether", "valuable", "have been", "need", "are"],
      answers: ["has been", "needs", "is", "Whether", "valuable"],
      clueWords: [
        ["team", "practising"],
        ["Each player", "effort"],
        ["coach", "together with", "players"],
        ["win", "lose"],
        ["experience", "will be"]
      ],
      hints: [
        "'The team' is singular — use 'has been'.",
        "'Each player' is singular — needs not need.",
        "'Together with' does not change the subject — coach is singular.",
        "Two possibilities: win or lose — which word introduces alternatives?",
        "After 'will be' we need an adjective — worth a lot."
      ],
      hint: "Subject-verb agreement can be tricky with collective nouns."
    },
    {
      text: "The little girl ___(1)___ beside her mother, watching the parade go by. Colourful floats ___(2)___ slowly down the street. She clapped her hands ___(3)___ whenever the dancers ___(4)___ past. It was the ___(5)___ exciting event she had attended that year.",
      wordBox: ["stood", "moved", "excitedly", "went", "most", "stands", "more", "excited"],
      answers: ["stood", "moved", "excitedly", "went", "most"],
      clueWords: [
        ["girl", "beside", "mother"],
        ["floats", "slowly", "street"],
        ["clapped", "hands"],
        ["dancers", "past"],
        ["event", "that year"]
      ],
      hints: [
        "This is past tense — past tense of 'stand'.",
        "The floats travelled slowly — past tense of 'move'.",
        "How did she clap? We need an adverb to modify 'clapped'.",
        "The dancers passed by — past tense of 'go'.",
        "Superlative — the event had the highest level of excitement."
      ],
      hint: "Use past tense and check adjective vs adverb forms."
    },
    {
      text: "Before the guests ___(1)___, Mother had already ___(2)___ the table. She had ___(3)___ cooked a delicious meal. Father helped ___(4)___ arranging the chairs. ___(5)___ the house was small, it felt warm and welcoming.",
      wordBox: ["arrived", "set", "also", "by", "Although", "arrive", "too", "with"],
      answers: ["arrived", "set", "also", "by", "Although"],
      clueWords: [
        ["Before", "guests"],
        ["had already", "table"],
        ["had", "cooked"],
        ["helped", "arranging"],
        ["small", "warm", "welcoming"]
      ],
      hints: [
        "'Before' tells us the guests came — past tense of 'arrive'.",
        "Past participle of 'set' — it stays the same.",
        "An additional action — she cooked as well.",
        "Father helped in the activity of arranging — which preposition?",
        "The house is small but still welcoming — a contrast word."
      ],
      hint: "Look for past perfect and contrast language."
    },
    {
      text: "The museum ___(1)___ one of the most popular attractions in the city. Thousands of tourists ___(2)___ it every year. ___(3)___ of the exhibits are interactive, which ___(4)___ them more enjoyable. Visitors are not allowed to ___(5)___ the displays.",
      wordBox: ["is", "visit", "Many", "makes", "touch", "are", "visits", "make"],
      answers: ["is", "visit", "Many", "makes", "touch"],
      clueWords: [
        ["museum", "one"],
        ["tourists", "every year"],
        ["exhibits", "interactive"],
        ["which", "enjoyable"],
        ["not allowed", "displays"]
      ],
      hints: [
        "'The museum' is singular — use 'is'.",
        "'Thousands of tourists' is plural — use plural verb.",
        "A large number of exhibits — which word?",
        "'Which' refers to the singular fact — use 'makes'.",
        "After 'allowed to', use the base form of the verb."
      ],
      hint: "Watch for subject-verb agreement with different subjects."
    },
    {
      text: "The fisherman ___(1)___ his net into the river and waited ___(2)___. After what ___(3)___ like hours, he finally felt a strong tug. He ___(4)___ the net out and found the ___(5)___ fish he had ever caught.",
      wordBox: ["cast", "patiently", "seemed", "pulled", "biggest", "casted", "patient", "biggest"],
      answers: ["cast", "patiently", "seemed", "pulled", "biggest"],
      clueWords: [
        ["fisherman", "net", "river"],
        ["waited"],
        ["like hours"],
        ["net out", "found"],
        ["ever caught", "fish"]
      ],
      hints: [
        "Past tense of 'cast' — it stays the same!",
        "How did he wait? We need an adverb modifying 'waited'.",
        "It appeared to be hours — past tense of 'seem'.",
        "He took the net out — past tense of 'pull'.",
        "'Ever caught' signals superlative — the most big."
      ],
      hint: "Check adverb forms and irregular past tenses."
    }
  ],

  // ============================================================
  // PRIMARY 5 (Age 10-11) - Complex passages, challenging grammar
  // Focus: advanced tenses, conditionals, relative clauses, modals
  // ============================================================
  P5: [
    {
      text: "Had the students ___(1)___ harder, they would have passed the examination. The teacher, who ___(2)___ disappointed by the results, urged them to ___(3)___ their mistakes. She reminded them that success ___(4)___ only to those who ___(5)___ willing to persevere.",
      wordBox: ["studied", "was", "review", "comes", "are", "had", "were", "reviewing"],
      answers: ["studied", "was", "review", "comes", "are"],
      clueWords: [
        ["Had", "would have passed"],
        ["teacher", "disappointed"],
        ["urged", "mistakes"],
        ["success"],
        ["those", "persevere"]
      ],
      hints: [
        "Past perfect in a conditional — 'Had they ___'.",
        "The teacher is singular — 'was' not 'were'.",
        "After 'urged them to' we need the base form.",
        "A general truth about success — present simple.",
        "'Those who' is plural — present tense plural."
      ],
      hint: "Mix of past conditionals and general truths."
    },
    {
      text: "The hikers, ___(1)___ had been trekking since dawn, finally reached the summit. Not only ___(2)___ the view breathtaking, ___(3)___ the sense of achievement was overwhelming. ___(4)___ of them had expected the trail to be as challenging as it ___(5)___.",
      wordBox: ["who", "was", "but", "None", "was", "which", "and", "Few"],
      answers: ["who", "was", "but", "None", "was"],
      clueWords: [
        ["hikers", "trekking"],
        ["Not only", "view"],
        ["Not only", "but"],
        ["expected", "challenging"],
        ["trail", "it"]
      ],
      hints: [
        "A pronoun for people — 'who' not 'which'.",
        "'Not only ___ the view' — inverted subject, view is singular.",
        "'Not only ... but (also)' is a paired conjunction.",
        "'None of them' takes singular verb in formal English.",
        "The trail is singular — 'as it ___'."
      ],
      hint: "Pay attention to inversions and correlative conjunctions."
    },
    {
      text: "By the time the rescue team ___(1)___, the flood waters had already ___(2)___ significantly. The villagers, most of ___(3)___ had lost their homes, were grateful for the assistance. It was essential that aid ___(4)___ distributed fairly. The government ___(5)___ since pledged to rebuild the affected areas.",
      wordBox: ["arrived", "receded", "whom", "be", "has", "arrives", "recede", "who"],
      answers: ["arrived", "receded", "whom", "be", "has"],
      clueWords: [
        ["By the time", "rescue team"],
        ["had already", "waters"],
        ["most of", "villagers"],
        ["essential that", "distributed"],
        ["since", "pledged"]
      ],
      hints: [
        "'By the time' followed by past simple.",
        "Past perfect — the waters had already done what?",
        "'Most of ___' needs an object pronoun — 'whom' not 'who'.",
        "'It was essential that' triggers subjunctive — base form 'be'.",
        "Present perfect — the government has done this since then."
      ],
      hint: "Complex tenses and the subjunctive mood appear here."
    },
    {
      text: "The athlete, ___(1)___ determination was admired by many, trained ___(2)___ than any of her competitors. She ___(3)___ have won the gold medal had she not injured ___(4)___ during the final lap. Nevertheless, her effort ___(5)___ not go unnoticed.",
      wordBox: ["whose", "harder", "would", "herself", "did", "who", "more", "her"],
      answers: ["whose", "harder", "would", "herself", "did"],
      clueWords: [
        ["determination", "admired"],
        ["trained", "than"],
        ["won", "had she not"],
        ["injured", "she"],
        ["effort", "not go unnoticed"]
      ],
      hints: [
        "Possessive relative pronoun — the determination belongs to her.",
        "'Than' signals comparison — comparative of 'hard'.",
        "Conditional perfect — she ___ have won.",
        "She hurt herself — reflexive pronoun.",
        "Her effort was noticed — past simple 'did'."
      ],
      hint: "Look for possessive pronouns and conditional structures."
    },
    {
      text: "Hardly had the concert ___(1)___ when the audience erupted in applause. The lead singer, along with the band members, ___(2)___ overwhelmed by the response. Not until they ___(3)___ backstage did they realise how ___(4)___ the performance had gone. Each of the musicians ___(5)___ grateful for the support.",
      wordBox: ["ended", "was", "went", "well", "was", "begun", "were", "good"],
      answers: ["ended", "was", "went", "well", "was"],
      clueWords: [
        ["Hardly had", "concert"],
        ["singer", "along with"],
        ["backstage", "realise"],
        ["how", "performance"],
        ["Each", "musicians"]
      ],
      hints: [
        "'Hardly had the concert ___' — past participle.",
        "'Along with' does not affect the subject — singer is singular.",
        "They moved backstage — past tense of 'go'.",
        "Modifying a verb (had gone) — use an adverb, not adjective.",
        "'Each of' takes a singular verb."
      ],
      hint: "Tricky subjects and adverb vs adjective distinctions."
    },
    {
      text: "If the government ___(1)___ to invest in renewable energy now, future generations will benefit greatly. Experts suggest that more funds ___(2)___ allocated to solar and wind power. ___(3)___ the initial costs are high, the long-term savings ___(4)___ the investment worthwhile. Every citizen ___(5)___ a role to play in protecting the environment.",
      wordBox: ["were", "be", "Although", "make", "has", "was", "are", "have"],
      answers: ["were", "be", "Although", "make", "has"],
      clueWords: [
        ["If", "now", "will benefit"],
        ["suggest that", "funds"],
        ["costs", "high", "savings"],
        ["savings", "worthwhile"],
        ["Every citizen", "role"]
      ],
      hints: [
        "'If the government ___' — subjunctive for hypothetical.",
        "'Suggest that' triggers subjunctive — base form 'be'.",
        "Costs are high but savings are good — contrast word.",
        "Savings is plural — which verb agrees?",
        "'Every citizen' is singular — use 'has'."
      ],
      hint: "Subjunctive mood and subject-verb agreement are key."
    },
    {
      text: "The detective, having ___(1)___ all the evidence, concluded that the suspect ___(2)___ not have committed the crime alone. There must have been an accomplice ___(3)___ helped him. ___(4)___ the suspect denied any involvement, the evidence suggested ___(5)___.",
      wordBox: ["examined", "could", "who", "Although", "otherwise", "examining", "would", "whom"],
      answers: ["examined", "could", "who", "Although", "otherwise"],
      clueWords: [
        ["having", "evidence"],
        ["suspect", "committed", "alone"],
        ["accomplice", "helped"],
        ["denied", "evidence"],
        ["denied", "suggested"]
      ],
      hints: [
        "'Having ___' needs a past participle.",
        "Expressing possibility — 'could not have committed'.",
        "The accomplice is a person who performed an action — subject pronoun.",
        "The suspect denied but evidence says differently — contrast.",
        "The evidence suggested the opposite of what he said."
      ],
      hint: "Modal verbs and relative pronouns are tested here."
    },
    {
      text: "No sooner had the ship ___(1)___ port than a violent storm ___(2)___. The captain, a man of great experience, ___(3)___ his crew to remain calm. Had they ___(4)___ earlier, they would have avoided the storm entirely. Fortunately, the ship ___(5)___ strong enough to withstand the rough seas.",
      wordBox: ["left", "struck", "ordered", "departed", "was", "leave", "strikes", "were"],
      answers: ["left", "struck", "ordered", "departed", "was"],
      clueWords: [
        ["No sooner had", "port"],
        ["storm"],
        ["captain", "crew", "calm"],
        ["Had they", "earlier"],
        ["ship", "strong enough"]
      ],
      hints: [
        "'No sooner had' + past participle.",
        "The storm came suddenly — past tense of 'strike'.",
        "The captain gave a command — past tense of 'order'.",
        "'Had they ___' — past participle for conditional.",
        "The ship is singular — 'was' not 'were'."
      ],
      hint: "Inverted conditionals and formal narrative tenses."
    },
    {
      text: "The novel, ___(1)___ was written by a local author, has sold ___(2)___ copies than any other book this year. Critics have praised it for ___(3)___ vivid characters and compelling plot. It is the kind of book ___(4)___ stays with you long after you ___(5)___ finished reading it.",
      wordBox: ["which", "more", "its", "that", "have", "who", "it", "most"],
      answers: ["which", "more", "its", "that", "have"],
      clueWords: [
        ["novel", "written"],
        ["copies", "than"],
        ["characters", "plot"],
        ["kind of book", "stays"],
        ["after", "finished"]
      ],
      hints: [
        "A pronoun for a thing (novel) — 'which' not 'who'.",
        "'Than' means comparison — comparative form.",
        "The characters belong to the book — possessive pronoun.",
        "'The kind of book ___' — defining relative pronoun.",
        "'After you ___' — present perfect with 'have'."
      ],
      hint: "Relative pronouns and possessives are key."
    },
    {
      text: "Were it not for the teacher's ___(1)___, the student would never have discovered her talent for painting. It was the teacher who first ___(2)___ her potential. ___(3)___ then, she has won numerous awards. Neither fame ___(4)___ fortune has changed her humble nature. She remains as ___(5)___ as she was when she first started.",
      wordBox: ["encouragement", "recognised", "Since", "nor", "dedicated", "encouraged", "From", "or"],
      answers: ["encouragement", "recognised", "Since", "nor", "dedicated"],
      clueWords: [
        ["teacher's", "discovered"],
        ["teacher", "first", "potential"],
        ["then", "won", "awards"],
        ["Neither", "fame", "fortune"],
        ["remains", "as", "first started"]
      ],
      hints: [
        "After 'teacher's' we need a noun — the act of encouraging.",
        "The teacher saw her potential — past tense of 'recognise'.",
        "From that time to now — which word?",
        "'Neither' pairs with which word?",
        "'As ___ as' — she stayed the same — an adjective."
      ],
      hint: "Word forms (noun/verb/adjective) and paired conjunctions."
    }
  ],

  // ============================================================
  // PRIMARY 6 (Age 11-12) - Most complex, PSLE-level grammar
  // Focus: all grammar types, nuanced usage, exam-style passages
  // ============================================================
  P6: [
    {
      text: "Scarcely had the chairman ___(1)___ his speech when a commotion broke out at the back of the hall. Several attendees, ___(2)___ had been waiting impatiently, demanded that the issue ___(3)___ addressed immediately. The chairman, ___(4)___ composure never wavered, assured them that their concerns would be ___(5)___ into consideration.",
      wordBox: ["begun", "who", "be", "whose", "taken", "began", "which", "took"],
      answers: ["begun", "who", "be", "whose", "taken"],
      clueWords: [
        ["Scarcely had", "speech"],
        ["attendees", "waiting"],
        ["demanded that", "addressed"],
        ["composure", "chairman"],
        ["would be", "consideration"]
      ],
      hints: [
        "'Scarcely had' requires a past participle.",
        "The attendees are people — subject pronoun 'who'.",
        "'Demanded that' triggers subjunctive — use base form 'be'.",
        "The composure belongs to the chairman — possessive 'whose'.",
        "'Would be ___' — past participle for passive voice."
      ],
      hint: "Formal grammar: subjunctive, inversions, and passives."
    },
    {
      text: "Not only ___(1)___ the pollution levels risen sharply, ___(2)___ the wildlife in the area has also been severely affected. The authorities, along with environmental groups, ___(3)___ been working to address the crisis. It is imperative that stricter measures ___(4)___ implemented without delay. Only then ___(5)___ we hope to reverse the damage.",
      wordBox: ["have", "but", "has", "be", "can", "had", "and", "will"],
      answers: ["have", "but", "has", "be", "can"],
      clueWords: [
        ["Not only", "pollution levels"],
        ["Not only", "but"],
        ["authorities", "along with"],
        ["imperative that", "measures"],
        ["Only then", "hope"]
      ],
      hints: [
        "'Pollution levels' is plural — use 'have'.",
        "'Not only ... but (also)' is the correlative conjunction pair.",
        "'Along with' does not change the subject — 'authorities' takes 'has'? No — 'authorities' is plural, so 'has' is tricky here. Actually 'the authorities' is the subject.",
        "'It is imperative that' triggers subjunctive — base form.",
        "'Only then' causes inversion — 'can we hope'."
      ],
      hint: "Inversions, subjunctive mood, and complex agreement."
    },
    {
      text: "The manuscript, ___(1)___ had lain undiscovered for centuries, was finally ___(2)___ to light by a team of archaeologists. So remarkable ___(3)___ the discovery that scholars from around the world ___(4)___ to examine it. Had the team not been so ___(5)___, this priceless artefact might never have been found.",
      wordBox: ["which", "brought", "was", "flocked", "meticulous", "that", "were", "meticulously"],
      answers: ["which", "brought", "was", "flocked", "meticulous"],
      clueWords: [
        ["manuscript", "undiscovered"],
        ["light", "archaeologists"],
        ["So remarkable", "discovery"],
        ["scholars", "examine"],
        ["team", "not been so"]
      ],
      hints: [
        "A pronoun for a thing (manuscript) — 'which'.",
        "'Was ___ to light' — past participle of 'bring'.",
        "'So remarkable ___ the discovery' — inverted 'was'.",
        "Scholars came in large numbers — past tense of 'flock'.",
        "'Had the team not been so ___' — needs an adjective."
      ],
      hint: "Inversion after 'so' and participial phrases."
    },
    {
      text: "Little ___(1)___ the students know that their teacher had once been a professional athlete. She rarely ___(2)___ about her past achievements, preferring to let her teaching speak for ___(3)___. It was only when a former teammate ___(4)___ the school that the truth came to light. The students, ___(5)___ admiration for her grew even more, looked at her with newfound respect.",
      wordBox: ["did", "spoke", "itself", "visited", "whose", "do", "speaks", "who"],
      answers: ["did", "spoke", "itself", "visited", "whose"],
      clueWords: [
        ["Little", "students know"],
        ["rarely", "past achievements"],
        ["teaching", "speak for"],
        ["former teammate", "school"],
        ["admiration", "students"]
      ],
      hints: [
        "'Little ___' causes inversion — auxiliary verb before subject.",
        "She usually didn't talk — past tense of 'speak'.",
        "The teaching represents itself — reflexive pronoun.",
        "The teammate came to the school — past tense of 'visit'.",
        "The admiration belongs to the students — possessive 'whose'."
      ],
      hint: "Negative inversion and reflexive/possessive pronouns."
    },
    {
      text: "The committee recommended that the proposal ___(1)___ revised before ___(2)___ submitted to the board. Each member was asked to provide ___(3)___ feedback in writing. ___(4)___ the proposal was generally well-received, several areas ___(5)___ improvement were identified.",
      wordBox: ["be", "being", "their", "While", "for", "is", "it", "of"],
      answers: ["be", "being", "their", "While", "for"],
      clueWords: [
        ["recommended that", "proposal"],
        ["before", "submitted"],
        ["Each member", "feedback"],
        ["generally", "well-received", "several areas"],
        ["areas", "improvement"]
      ],
      hints: [
        "'Recommended that' triggers subjunctive — base form 'be'.",
        "'Before ___' — a gerund form is needed here.",
        "Each member's own feedback — possessive pronoun.",
        "Generally positive but some issues — a contrast word.",
        "Areas ___ improvement — which preposition?"
      ],
      hint: "Subjunctive, gerunds, and formal preposition usage."
    },
    {
      text: "Seldom ___(1)___ one encounter such generosity in today's world. The philanthropist, ___(2)___ donations have funded numerous schools, insists that ___(3)___ of the credit should go to the volunteers. Were it not ___(4)___ their tireless efforts, none of these projects would have ___(5)___ possible.",
      wordBox: ["does", "whose", "most", "for", "been", "did", "who", "all"],
      answers: ["does", "whose", "most", "for", "been"],
      clueWords: [
        ["Seldom", "encounter"],
        ["donations", "philanthropist"],
        ["credit", "volunteers"],
        ["Were it not", "efforts"],
        ["would have", "possible"]
      ],
      hints: [
        "'Seldom ___' causes inversion — present tense auxiliary.",
        "The donations belong to the philanthropist — possessive.",
        "The greater part of the credit — which word?",
        "'Were it not ___' — which preposition means 'because of'?",
        "'Would have ___' — past participle of 'be'."
      ],
      hint: "Formal inversions and conditional structures."
    },
    {
      text: "The lecture, ___(1)___ the professor had spent weeks preparing, turned out to be far more ___(2)___ than anyone had anticipated. So ___(3)___ were the students that they requested a follow-up session. Never before ___(4)___ a talk generated such enthusiasm among the student body. The professor herself was ___(5)___ moved by their response.",
      wordBox: ["which", "engaging", "captivated", "had", "deeply", "for which", "engaged", "has"],
      answers: ["for which", "engaging", "captivated", "had", "deeply"],
      clueWords: [
        ["lecture", "preparing"],
        ["far more", "anticipated"],
        ["So", "students"],
        ["Never before", "talk"],
        ["moved", "professor"]
      ],
      hints: [
        "The professor prepared FOR the lecture — 'for which'.",
        "'More ___' — adjective form meaning interesting and absorbing.",
        "'So ___ were they' — past participle as adjective.",
        "'Never before ___' — inversion with past perfect.",
        "How was she moved? We need an adverb — 'deeply'."
      ],
      hint: "Preposition + relative pronoun and inverted structures."
    },
    {
      text: "By the time the firefighters ___(1)___ the scene, the blaze had already ___(2)___ to the adjacent buildings. ___(3)___ the intense heat, the firefighters bravely entered the building to search for survivors. It was later revealed that ___(4)___ an electrical fault nor human negligence had caused the fire — it ___(5)___ been started by lightning.",
      wordBox: ["reached", "spread", "Despite", "neither", "had", "reaching", "spreaded", "Although"],
      answers: ["reached", "spread", "Despite", "neither", "had"],
      clueWords: [
        ["By the time", "firefighters"],
        ["had already", "buildings"],
        ["intense heat", "bravely"],
        ["nor", "caused"],
        ["started", "lightning"]
      ],
      hints: [
        "'By the time' followed by past simple.",
        "Past participle of 'spread' — it stays the same!",
        "In spite of the heat — which preposition?",
        "'___ ... nor' — the paired conjunction.",
        "'It ___ been started' — past perfect passive."
      ],
      hint: "Irregular verbs and correlative conjunctions."
    },
    {
      text: "The research findings, ___(1)___ validity has been questioned by some experts, ___(2)___ published in a prestigious journal last month. ___(3)___ controversial the findings may be, they have undeniably ___(4)___ to important discussions in the field. Only time ___(5)___ tell whether the conclusions are accurate.",
      wordBox: ["whose", "were", "However", "led", "will", "which", "was", "lead"],
      answers: ["whose", "were", "However", "led", "will"],
      clueWords: [
        ["validity", "findings"],
        ["findings", "published"],
        ["controversial", "may be"],
        ["discussions", "important"],
        ["time", "tell"]
      ],
      hints: [
        "The validity belongs to the findings — possessive relative pronoun.",
        "'Findings' is plural — use 'were'.",
        "___ controversial they may be — a concession adverb.",
        "Past participle of 'lead' — irregular verb.",
        "Future prediction — 'time will tell'."
      ],
      hint: "Possessive relative clauses and concessive structures."
    },
    {
      text: "No sooner ___(1)___ the results been announced than celebrations erupted across the country. The team captain, to ___(2)___ much of the credit was due, remained characteristically humble. She insisted that her teammates ___(3)___ equally deserving of praise. It was ___(4)___ collective effort, not individual brilliance, that ___(5)___ brought them victory.",
      wordBox: ["had", "whom", "were", "their", "had", "who", "was", "its"],
      answers: ["had", "whom", "were", "their", "had"],
      clueWords: [
        ["No sooner", "been announced"],
        ["credit", "due", "captain"],
        ["insisted that", "teammates"],
        ["collective effort"],
        ["effort", "brought", "victory"]
      ],
      hints: [
        "'No sooner ___' — past perfect auxiliary for inversion.",
        "'To ___' — object of preposition, use 'whom' not 'who'.",
        "'Insisted that' triggers subjunctive — 'were' for plural subject.",
        "The effort belongs to the team — possessive pronoun.",
        "'It was ___ that' — past perfect showing earlier action."
      ],
      hint: "Formal inversions, subjunctive, and emphasis structures."
    }
  ]
};
