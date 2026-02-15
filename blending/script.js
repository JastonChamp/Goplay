const DEBUG = false;
const debugLog = (...args) => { if (DEBUG) console.log(...args); };

document.addEventListener('DOMContentLoaded', () => {

  const wordGroups = {
    cvc: {
      a: ['bat', 'cat', 'dad', 'fan', 'hat', 'jam', 'mad', 'nap', 'pan', 'rat', 'sad', 'tan', 'wag', 'zap', 'lap', 'bag', 'cab', 'dab', 'gab', 'lab', 'tab', 'bad', 'had', 'lad', 'pad', 'rad', 'tad'],
      e: ['bed', 'den', 'fed', 'get', 'hen', 'jet', 'leg', 'men', 'net', 'pen', 'red', 'set', 'ten', 'vet', 'web', 'beg', 'peg', 'wed', 'led', 'met', 'pet', 'yet'],
      i: ['big', 'dig', 'fin', 'hit', 'jig', 'kid', 'lip', 'mix', 'nip', 'pig', 'pin', 'sit', 'tin', 'wig', 'zip', 'bin', 'din', 'fib', 'hid', 'lid', 'mid', 'rid', 'win'],
      o: ['box', 'cot', 'dog', 'fog', 'hop', 'job', 'log', 'mop', 'not', 'pod', 'pop', 'pot', 'rot', 'top', 'sob', 'cob', 'dob', 'gob', 'hob', 'lob', 'mob', 'rob'],
      u: ['bug', 'cup', 'cut', 'fun', 'gum', 'hug', 'jug', 'mud', 'nut', 'pup', 'run', 'sun', 'tug', 'bud', 'bus', 'cub', 'dub', 'hub', 'mug', 'rub', 'sub', 'tub']
    },

    ccvc: {
      a: ['brag', 'clap', 'crab', 'drag', 'flag', 'flap', 'glad', 'grab', 'plan', 'slam', 'snap', 'trap', 'flat', 'chat', 'blab', 'clam', 'drab', 'slap', 'stab', 'tram', 'bran'],
      e: ['bled', 'bred', 'fled', 'fret', 'glen', 'pled', 'sled', 'stem', 'step', 'trek', 'prep', 'flex', 'smell', 'blend', 'crest', 'dress', 'press', 'spell', 'swell'],
      i: ['brim', 'clip', 'crib', 'drip', 'flip', 'grin', 'grip', 'skip', 'slim', 'snip', 'spin', 'trip', 'skin', 'swim', 'blip', 'chip', 'slip', 'strip', 'trick'],
      o: ['blot', 'clog', 'crop', 'drop', 'flop', 'frog', 'glob', 'plot', 'prop', 'shop', 'slot', 'stop', 'trot', 'clot', 'spot', 'snot'],
      u: ['club', 'drum', 'grub', 'plug', 'slug', 'snug', 'spun', 'stub', 'stun', 'flub', 'glut', 'plum', 'scum', 'shut', 'flux', 'shun']
    },

    cvcc: {
      a: ['band', 'bank', 'damp', 'hand', 'lamp', 'land', 'pant', 'ramp', 'sand', 'tank'],
      e: ['bend', 'dent', 'felt', 'lend', 'mend', 'nest', 'rest', 'sent', 'tent', 'vest', 'best', 'jest', 'pest', 'test', 'west', 'belt', 'rent', 'went', 'zest', 'left'],
      i: ['film', 'hint', 'lift', 'milk', 'mint', 'pink', 'ring', 'silk', 'sink', 'tilt', 'disk', 'fist', 'list', 'mist', 'wish', 'gilt', 'kilt', 'silt', 'risk'],
      o: ['bond', 'cost', 'fond', 'lost', 'most', 'pond', 'post', 'soft'],
      u: ['bump', 'bunk', 'dust', 'hunt', 'jump', 'just', 'lump', 'must', 'rust', 'dunk', 'fuss', 'gust', 'husk', 'tusk', 'bust', 'musk', 'dusk']
    },

    ccvcc: {
      a: ['brand', 'clamp', 'cramp', 'drank', 'flank', 'frank', 'plank', 'prank', 'stamp', 'stand', 'bland', 'tramp'],
      e: ['blend', 'fleck', 'flesh', 'spend', 'strep', 'swept', 'trend', 'bless', 'crept', 'dress', 'fresh', 'press', 'slept', 'smelt', 'spent'],
      i: ['blink', 'clink', 'crisp', 'drink', 'flint', 'print', 'slink', 'stink', 'twist', 'brisk', 'cling', 'fling', 'shift', 'swift', 'drift', 'grill'],
      o: ['blond', 'chomp', 'frost', 'prompt', 'stomp', 'strong', 'throb', 'clonk', 'floss', 'gloss', 'gross', 'prong', 'scoff'],
      u: ['blunt', 'brunt', 'clump', 'crust', 'drunk', 'flung', 'grunt', 'plump', 'stump', 'trunk', 'brush', 'crush', 'flush', 'shrug']
    },

    digraphs: {
      a: ['chat', 'chap', 'than', 'that', 'bash', 'cash', 'dash', 'lash', 'rash', 'shag', 'sham'],
      e: ['shed', 'them', 'then', 'fetch', 'bench', 'check', 'chess', 'fresh', 'retch', 'shell', 'shred', 'theft'],
      i: ['chip', 'chin', 'thin', 'ship', 'shin', 'chick', 'chill', 'shift', 'thick', 'thing', 'wish'],
      o: ['shop', 'shot', 'chop', 'shock', 'cloth', 'froth', 'notch', 'shod', 'sloth', 'thong', 'chock', 'throb'],
      u: ['shut', 'thud', 'chug', 'chunk', 'thump', 'brush', 'crush', 'flush', 'shrug', 'blush']
    },

    extended: {
      a: ['fantastic', 'smashing', 'crashing', 'stamping', 'clapping', 'tracking', 'snapping', 'flashing', 'grabbing', 'slashing', 'camping'],
      e: ['spelling', 'pressing', 'dressing', 'fetching', 'stretching', 'checking', 'swelling', 'shedding', 'tempting'],
      i: ['blinking', 'drinking', 'tripping', 'flipping', 'snipping', 'skipping', 'swinging', 'slipping', 'twisting'],
      o: ['blocking', 'rocking', 'crossing', 'stopping', 'chopping', 'dropping', 'flopping', 'locking', 'shocking', 'trotting'],
      u: ['jumping', 'bumping', 'hunting', 'rushing', 'crushing', 'brushing', 'dumping', 'hugging', 'running', 'tugging']
    },

    silentE: {
      a: ['spade', 'mate', 'game', 'bake', 'gave', 'rake', 'cake', 'lake', 'made', 'name', 'pale', 'sale', 'take', 'wave', 'base', 'case', 'date', 'fate', 'gate', 'hate'],
      e: ['theme', 'these', 'eve', 'mete', 'pete', 'steve'],
      i: ['bike', 'kite', 'lime', 'mine', 'pine', 'time', 'dive', 'five', 'hive', 'bite', 'site'],
      o: ['home', 'nose', 'rope', 'note', 'cone', 'hope', 'robe', 'stone', 'bone', 'dome', 'pole', 'vote'],
      u: ['cube', 'tune', 'mule', 'rude', 'cute', 'dune', 'june', 'lute', 'mute', 'rule', 'tube']
    },

    softCAndG: {
      soft_c: ['cede', 'scene'],
      soft_g: ['gene']
    },

    diphthongs: {
      oy: ['boy', 'toy', 'joy', 'coy', 'soy', 'ploy', 'troy'],
      ar: ['car', 'bar', 'far', 'jar', 'tar', 'star', 'scar', 'park', 'dark', 'mark'],
      air: ['air', 'fair', 'hair', 'pair', 'stair', 'chair', 'lair'],
      ow: ['cow', 'now', 'how', 'bow', 'vow', 'brow', 'chow'],
      er: ['her', 'per', 'term', 'fern', 'germ', 'herd', 'verb'],
      ear: ['ear', 'dear', 'fear', 'hear', 'near', 'tear', 'year', 'clear']
    },

    // ✅ LONG VOWELS — NOW CONTAINS *EVERY WORD FROM YOUR 6 IMAGES*
    longVowels: {
      // Long A set (from image 1)
      a: [
        'spade','mate','game','afraid',
        'bake','gave','way','grey',
        'rake','great','holiday','Gayle',
        'may','clay','wake','weight',
        'baked','holidays','played','amazed',
        'stayed','stay','against','they'
      ],

      // Long E set (from image 2)
      e: [
        'people','need','eagle','funny','meet',
        'breeze','maybe','breathe','puppy','lazy',
        'leaf','tree','meat','grumpy','peek',
        'released','speaking','revealed','happy','valley',
        'seat','thief','create','believe','seized',
        'green','three','clean','hungry','gleam'
      ],

      // Long I set (from image 3)
      i: [
        'find','right','flight','skies','sight',
        'five','try','height','finally','dive',
        'kind','why','fly','myself','direct',
        'light','by','flies','wild','directly',
        'quite','night','my','ride','realise',
        'live','white','realised','mild','delighted'
      ],

      // Long O + OO set (from image 4 + image 6)
      o: [
        // image 4
        'go','so','ago','Joan','know','road',
        'Owen','low','envelope',"won't",'show','cove',
        'drove','home','propose','wrote','own','Rowan',
        'though','hoped','floated','note','owned','hope',
        'both','nose','only',"don't",'close','spoke',

        // image 6 (oo set)
        'food','soon','bedroom','receive','special',
        'mood','swoop','move','place','especially',
        'room','cool','movie','face','office',
        'suit','truth','soup','decided','distance',
        'through','true','flew','exciting','receipt',
        'cockatoo','kangaroo','grew','chew','blew'
      ],

      // Long U + soft g set (from image 5)
      u: [
        'pure','tune','tuneful','regular','eventually','excuse',
        'value','use','continue','useful','continued','refused',
        'tube','view','few','youth','beautiful','youthful',
        'page','magic','imagine','giant','stage','manage',
        'gently','gentle','magical','original','postage','managed'
      ]
    }
  };

  // Digraph/trigraph detection sets
  const consonantDigraphs = ['sh', 'th', 'ch', 'ng'];
  const vowelPatterns = { trigraphs: ['air', 'ear'], digraphs: ['oy', 'ar', 'ow', 'er'] };

  // Fallback placeholders (wordRenderMap takes priority for complex words)
  const longVowelDigraphs = ['ai', 'ay', 'ea', 'ee', 'ie', 'oa', 'oe', 'ue'];
  const silentLetterOverrides = {};
  const longVowelWordInfo = {};

  // ============================================================
  // COMPREHENSIVE WORD RENDERING DATA
  // Each entry: array of { text, type, diacritic?, sound? }
  // Types: 'vowel', 'consonant', 'digraph', 'silent', 'long-vowel'
  // ============================================================
  const wordRenderMap = {
    // ==================== LONG A WORDS ====================
    'spade': [
      { text: 'sp', type: 'consonant', sound: 'sp' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'e', type: 'silent' }
    ],
    'mate': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'game': [
      { text: 'g', type: 'consonant', sound: 'g' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'e', type: 'silent' }
    ],
    'afraid': [
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'fr', type: 'consonant', sound: 'fr' },
      { text: 'ai', type: 'long-vowel', sound: 'long_a' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'bake': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'e', type: 'silent' }
    ],
    'gave': [
      { text: 'g', type: 'consonant', sound: 'g' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'way': [
      { text: 'w', type: 'consonant', sound: 'w' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent' }
    ],
    'grey': [
      { text: 'gr', type: 'consonant', sound: 'gr' },
      { text: 'e', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent', diacritic: 'ā' }
    ],
    'rake': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'e', type: 'silent' }
    ],
    'great': [
      { text: 'gr', type: 'consonant', sound: 'gr' },
      { text: 'ea', type: 'long-vowel', sound: 'long_a' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'holiday': [
      { text: 'h', type: 'consonant', sound: 'h' },
      { text: 'o', type: 'vowel', sound: 'o' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent' }
    ],
    'gayle': [
      { text: 'G', type: 'consonant', sound: 'g' },
      { text: 'ay', type: 'long-vowel', sound: 'long_a' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'silent' }
    ],
    'may': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent' }
    ],
    'clay': [
      { text: 'cl', type: 'consonant', sound: 'cl' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent' }
    ],
    'wake': [
      { text: 'w', type: 'consonant', sound: 'w' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'e', type: 'silent' }
    ],
    'weight': [
      { text: 'w', type: 'consonant', sound: 'w' },
      { text: 'ei', type: 'long-vowel', sound: 'long_a', diacritic: 'ā' },
      { text: 'gh', type: 'silent' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'baked': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'holidays': [
      { text: 'h', type: 'consonant', sound: 'h' },
      { text: 'o', type: 'vowel', sound: 'o' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent' },
      { text: 's', type: 'consonant', sound: 's' }
    ],
    'played': [
      { text: 'pl', type: 'consonant', sound: 'pl' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'amazed': [
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'z', type: 'consonant', sound: 'z' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'stayed': [
      { text: 'st', type: 'consonant', sound: 'st' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'stay': [
      { text: 'st', type: 'consonant', sound: 'st' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent' }
    ],
    'against': [
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'g', type: 'consonant', sound: 'g' },
      { text: 'ai', type: 'long-vowel', sound: 'long_a' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'they': [
      { text: 'th', type: 'digraph', sound: 'th' },
      { text: 'e', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent' }
    ],

    // ==================== LONG E WORDS ====================
    'people': [
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'eo', type: 'long-vowel', sound: 'long_e' },
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'silent' }
    ],
    'need': [
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'ee', type: 'long-vowel', sound: 'long_e' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'eagle': [
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 'g', type: 'consonant', sound: 'g' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'silent' }
    ],
    'funny': [
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'u', type: 'vowel', sound: 'u' },
      { text: 'nn', type: 'consonant', sound: 'n' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    'meet': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'ee', type: 'long-vowel', sound: 'long_e' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'breeze': [
      { text: 'br', type: 'consonant', sound: 'br' },
      { text: 'ee', type: 'long-vowel', sound: 'long_e' },
      { text: 'z', type: 'consonant', sound: 'z' },
      { text: 'e', type: 'silent' }
    ],
    'maybe': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'y', type: 'silent' },
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'e', type: 'long-vowel', sound: 'long_e' }
    ],
    'breathe': [
      { text: 'br', type: 'consonant', sound: 'br' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 'th', type: 'digraph', sound: 'th' },
      { text: 'e', type: 'silent' }
    ],
    'puppy': [
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'u', type: 'vowel', sound: 'u' },
      { text: 'pp', type: 'consonant', sound: 'p' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    'lazy': [
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'z', type: 'consonant', sound: 'z' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    'leaf': [
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 'f', type: 'consonant', sound: 'f' }
    ],
    'tree': [
      { text: 'tr', type: 'consonant', sound: 'tr' },
      { text: 'ee', type: 'long-vowel', sound: 'long_e' }
    ],
    'meat': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'grumpy': [
      { text: 'gr', type: 'consonant', sound: 'gr' },
      { text: 'u', type: 'vowel', sound: 'u' },
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    'peek': [
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'ee', type: 'long-vowel', sound: 'long_e' },
      { text: 'k', type: 'consonant', sound: 'k' }
    ],
    'released': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'speaking': [
      { text: 'sp', type: 'consonant', sound: 'sp' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'ng', type: 'digraph', sound: 'ng' }
    ],
    'revealed': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'happy': [
      { text: 'h', type: 'consonant', sound: 'h' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'pp', type: 'consonant', sound: 'p' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    'valley': [
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'll', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'long-vowel', sound: 'long_e' },
      { text: 'y', type: 'silent', diacritic: 'ē' }
    ],
    'seat': [
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'thief': [
      { text: 'th', type: 'digraph', sound: 'th' },
      { text: 'ie', type: 'long-vowel', sound: 'long_e' },
      { text: 'f', type: 'consonant', sound: 'f' }
    ],
    'create': [
      { text: 'cr', type: 'consonant', sound: 'cr' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'believe': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'ie', type: 'long-vowel', sound: 'long_e' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'seized': [
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'ei', type: 'long-vowel', sound: 'long_e' },
      { text: 'z', type: 'consonant', sound: 'z' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'green': [
      { text: 'gr', type: 'consonant', sound: 'gr' },
      { text: 'ee', type: 'long-vowel', sound: 'long_e' },
      { text: 'n', type: 'consonant', sound: 'n' }
    ],
    'three': [
      { text: 'th', type: 'digraph', sound: 'th' },
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'ee', type: 'long-vowel', sound: 'long_e' }
    ],
    'clean': [
      { text: 'cl', type: 'consonant', sound: 'cl' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 'n', type: 'consonant', sound: 'n' }
    ],
    'hungry': [
      { text: 'h', type: 'consonant', sound: 'h' },
      { text: 'u', type: 'vowel', sound: 'u' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'gr', type: 'consonant', sound: 'gr' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    'gleam': [
      { text: 'gl', type: 'consonant', sound: 'gl' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 'm', type: 'consonant', sound: 'm' }
    ],

    // ==================== LONG I WORDS ====================
    'find': [
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'right': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'gh', type: 'silent' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'flight': [
      { text: 'fl', type: 'consonant', sound: 'fl' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'gh', type: 'silent' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'skies': [
      { text: 'sk', type: 'consonant', sound: 'sk' },
      { text: 'ie', type: 'long-vowel', sound: 'long_i' },
      { text: 's', type: 'consonant', sound: 's' }
    ],
    'sight': [
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'gh', type: 'silent' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'five': [
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'try': [
      { text: 'tr', type: 'consonant', sound: 'tr' },
      { text: 'y', type: 'long-vowel', sound: 'long_i', diacritic: 'ī' }
    ],
    'height': [
      { text: 'h', type: 'consonant', sound: 'h' },
      { text: 'ei', type: 'long-vowel', sound: 'long_i', diacritic: 'ī' },
      { text: 'gh', type: 'silent' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'finally': [
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'll', type: 'consonant', sound: 'l' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    'dive': [
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'kind': [
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'why': [
      { text: 'wh', type: 'digraph', sound: 'wh' },
      { text: 'y', type: 'long-vowel', sound: 'long_i', diacritic: 'ī' }
    ],
    'fly': [
      { text: 'fl', type: 'consonant', sound: 'fl' },
      { text: 'y', type: 'long-vowel', sound: 'long_i', diacritic: 'ī' }
    ],
    'myself': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'y', type: 'long-vowel', sound: 'long_i', diacritic: 'ī' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'f', type: 'consonant', sound: 'f' }
    ],
    'direct': [
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'light': [
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'gh', type: 'silent' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'by': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'y', type: 'long-vowel', sound: 'long_i', diacritic: 'ī' }
    ],
    'flies': [
      { text: 'fl', type: 'consonant', sound: 'fl' },
      { text: 'ie', type: 'long-vowel', sound: 'long_i' },
      { text: 's', type: 'consonant', sound: 's' }
    ],
    'wild': [
      { text: 'w', type: 'consonant', sound: 'w' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'directly': [
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    'quite': [
      { text: 'qu', type: 'consonant', sound: 'qu' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'night': [
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'gh', type: 'silent' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'my': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'y', type: 'long-vowel', sound: 'long_i', diacritic: 'ī' }
    ],
    'ride': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'e', type: 'silent' }
    ],
    'realise': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' }
    ],
    'live': [
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'white': [
      { text: 'wh', type: 'digraph', sound: 'wh' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'realised': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'ea', type: 'long-vowel', sound: 'long_e' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'mild': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'delighted': [
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'gh', type: 'silent' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],

    // ==================== LONG O WORDS ====================
    'go': [
      { text: 'g', type: 'consonant', sound: 'g' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' }
    ],
    'so': [
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' }
    ],
    'ago': [
      { text: 'a', type: 'vowel', sound: 'a', diacritic: 'ū' },
      { text: 'g', type: 'consonant', sound: 'g' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' }
    ],
    'joan': [
      { text: 'J', type: 'consonant', sound: 'j' },
      { text: 'oa', type: 'long-vowel', sound: 'long_o' },
      { text: 'n', type: 'consonant', sound: 'n' }
    ],
    'know': [
      { text: 'k', type: 'silent' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'ow', type: 'long-vowel', sound: 'long_o' }
    ],
    'road': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'oa', type: 'long-vowel', sound: 'long_o' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'owen': [
      { text: 'O', type: 'long-vowel', sound: 'long_o' },
      { text: 'w', type: 'consonant', sound: 'w' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'n', type: 'consonant', sound: 'n' }
    ],
    'low': [
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'ow', type: 'long-vowel', sound: 'long_o' }
    ],
    'envelope': [
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'e', type: 'silent' }
    ],
    "won't": [
      { text: 'w', type: 'consonant', sound: 'w' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: "n'", type: 'consonant', sound: 'n' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'show': [
      { text: 'sh', type: 'digraph', sound: 'sh' },
      { text: 'ow', type: 'long-vowel', sound: 'long_o' }
    ],
    'cove': [
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'drove': [
      { text: 'dr', type: 'consonant', sound: 'dr' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'home': [
      { text: 'h', type: 'consonant', sound: 'h' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'e', type: 'silent' }
    ],
    'propose': [
      { text: 'pr', type: 'consonant', sound: 'pr' },
      { text: 'o', type: 'vowel', sound: 'o' },
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' }
    ],
    'wrote': [
      { text: 'wr', type: 'consonant', sound: 'r' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'own': [
      { text: 'ow', type: 'long-vowel', sound: 'long_o' },
      { text: 'n', type: 'consonant', sound: 'n' }
    ],
    'rowan': [
      { text: 'R', type: 'consonant', sound: 'r' },
      { text: 'ow', type: 'long-vowel', sound: 'long_o' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'n', type: 'consonant', sound: 'n' }
    ],
    'though': [
      { text: 'th', type: 'digraph', sound: 'th' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'u', type: 'silent' },
      { text: 'gh', type: 'silent' }
    ],
    'hoped': [
      { text: 'h', type: 'consonant', sound: 'h' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'floated': [
      { text: 'fl', type: 'consonant', sound: 'fl' },
      { text: 'oa', type: 'long-vowel', sound: 'long_o' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'note': [
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'owned': [
      { text: 'ow', type: 'long-vowel', sound: 'long_o' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'hope': [
      { text: 'h', type: 'consonant', sound: 'h' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'e', type: 'silent' }
    ],
    'both': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'th', type: 'digraph', sound: 'th' }
    ],
    'nose': [
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' }
    ],
    'only': [
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    "don't": [
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: "n'", type: 'consonant', sound: 'n' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'close': [
      { text: 'cl', type: 'consonant', sound: 'cl' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' }
    ],
    'spoke': [
      { text: 'sp', type: 'consonant', sound: 'sp' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'e', type: 'silent' }
    ],

    // ==================== OO WORDS ====================
    'food': [
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'oo', type: 'long-vowel', sound: 'oo' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'soon': [
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'oo', type: 'long-vowel', sound: 'oo' },
      { text: 'n', type: 'consonant', sound: 'n' }
    ],
    'bedroom': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'oo', type: 'long-vowel', sound: 'oo' },
      { text: 'm', type: 'consonant', sound: 'm' }
    ],
    'receive': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'c', type: 'consonant', sound: 's', diacritic: 's' },
      { text: 'ei', type: 'long-vowel', sound: 'long_e' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'special': [
      { text: 'sp', type: 'consonant', sound: 'sp' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'c', type: 'consonant', sound: 'sh', diacritic: 'sh' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'l', type: 'consonant', sound: 'l' }
    ],
    'mood': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'oo', type: 'long-vowel', sound: 'oo' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'swoop': [
      { text: 'sw', type: 'consonant', sound: 'sw' },
      { text: 'oo', type: 'long-vowel', sound: 'oo' },
      { text: 'p', type: 'consonant', sound: 'p' }
    ],
    'move': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'o', type: 'long-vowel', sound: 'oo', diacritic: 'oo' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'place': [
      { text: 'pl', type: 'consonant', sound: 'pl' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'c', type: 'consonant', sound: 's', diacritic: 's' },
      { text: 'e', type: 'silent' }
    ],
    'especially': [
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'sp', type: 'consonant', sound: 'sp' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'c', type: 'consonant', sound: 'sh', diacritic: 'sh' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'll', type: 'consonant', sound: 'l' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    'room': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'oo', type: 'long-vowel', sound: 'oo' },
      { text: 'm', type: 'consonant', sound: 'm' }
    ],
    'cool': [
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'oo', type: 'long-vowel', sound: 'oo' },
      { text: 'l', type: 'consonant', sound: 'l' }
    ],
    'movie': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'o', type: 'long-vowel', sound: 'oo', diacritic: 'oo' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'ie', type: 'long-vowel', sound: 'long_e' }
    ],
    'face': [
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'c', type: 'consonant', sound: 's', diacritic: 's' },
      { text: 'e', type: 'silent' }
    ],
    'office': [
      { text: 'o', type: 'vowel', sound: 'o' },
      { text: 'ff', type: 'consonant', sound: 'f' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'c', type: 'consonant', sound: 's', diacritic: 's' },
      { text: 'e', type: 'silent' }
    ],
    'suit': [
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'ui', type: 'long-vowel', sound: 'oo' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'truth': [
      { text: 'tr', type: 'consonant', sound: 'tr' },
      { text: 'u', type: 'long-vowel', sound: 'oo', diacritic: 'oo' },
      { text: 'th', type: 'digraph', sound: 'th' }
    ],
    'soup': [
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'ou', type: 'long-vowel', sound: 'oo' },
      { text: 'p', type: 'consonant', sound: 'p' }
    ],
    'decided': [
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'c', type: 'consonant', sound: 's', diacritic: 's' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'distance': [
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'c', type: 'consonant', sound: 's', diacritic: 's' },
      { text: 'e', type: 'silent' }
    ],
    'through': [
      { text: 'th', type: 'digraph', sound: 'th' },
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'ou', type: 'long-vowel', sound: 'oo' },
      { text: 'gh', type: 'silent' }
    ],
    'true': [
      { text: 'tr', type: 'consonant', sound: 'tr' },
      { text: 'ue', type: 'long-vowel', sound: 'oo' }
    ],
    'flew': [
      { text: 'fl', type: 'consonant', sound: 'fl' },
      { text: 'ew', type: 'long-vowel', sound: 'oo' }
    ],
    'exciting': [
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'x', type: 'consonant', sound: 'x' },
      { text: 'c', type: 'consonant', sound: 's', diacritic: 's' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'ng', type: 'digraph', sound: 'ng' }
    ],
    'receipt': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'c', type: 'consonant', sound: 's', diacritic: 's' },
      { text: 'ei', type: 'long-vowel', sound: 'long_e' },
      { text: 'p', type: 'silent' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'cockatoo': [
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'o', type: 'vowel', sound: 'o' },
      { text: 'ck', type: 'consonant', sound: 'k' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'oo', type: 'long-vowel', sound: 'oo' }
    ],
    'kangaroo': [
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'g', type: 'consonant', sound: 'g' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'oo', type: 'long-vowel', sound: 'oo' }
    ],
    'grew': [
      { text: 'gr', type: 'consonant', sound: 'gr' },
      { text: 'ew', type: 'long-vowel', sound: 'oo' }
    ],
    'chew': [
      { text: 'ch', type: 'digraph', sound: 'ch' },
      { text: 'ew', type: 'long-vowel', sound: 'oo' }
    ],
    'blew': [
      { text: 'bl', type: 'consonant', sound: 'bl' },
      { text: 'ew', type: 'long-vowel', sound: 'oo' }
    ],

    // ==================== LONG U + SOFT G WORDS ====================
    'pure': [
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'e', type: 'silent' }
    ],
    'tune': [
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ],
    'tuneful': [
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' },
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'u', type: 'vowel', sound: 'oo', diacritic: 'oo' },
      { text: 'l', type: 'consonant', sound: 'l' }
    ],
    'regular': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'g', type: 'consonant', sound: 'g' },
      { text: 'u', type: 'long-vowel', sound: 'long_u', diacritic: 'ū' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'r', type: 'consonant', sound: 'r' }
    ],
    'eventually': [
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'u', type: 'vowel', sound: 'u' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'll', type: 'consonant', sound: 'l' },
      { text: 'y', type: 'silent' }
    ],
    'excuse': [
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'x', type: 'consonant', sound: 'x' },
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' }
    ],
    'value': [
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'e', type: 'silent' }
    ],
    'use': [
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' }
    ],
    'continue': [
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'o', type: 'vowel', sound: 'o' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'e', type: 'silent' }
    ],
    'useful': [
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' },
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'u', type: 'vowel', sound: 'oo', diacritic: 'oo' },
      { text: 'l', type: 'consonant', sound: 'l' }
    ],
    'continued': [
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'o', type: 'vowel', sound: 'o' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'refused': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],
    'tube': [
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'e', type: 'silent' }
    ],
    'view': [
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'iew', type: 'long-vowel', sound: 'long_u', diacritic: 'ū' }
    ],
    'few': [
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'ew', type: 'long-vowel', sound: 'long_u', diacritic: 'ū' }
    ],
    'youth': [
      { text: 'y', type: 'consonant', sound: 'y' },
      { text: 'ou', type: 'long-vowel', sound: 'oo' },
      { text: 'th', type: 'digraph', sound: 'th' }
    ],
    'beautiful': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'eau', type: 'long-vowel', sound: 'long_u' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'u', type: 'vowel', sound: 'oo', diacritic: 'oo' },
      { text: 'l', type: 'consonant', sound: 'l' }
    ],
    'youthful': [
      { text: 'y', type: 'consonant', sound: 'y' },
      { text: 'ou', type: 'long-vowel', sound: 'oo' },
      { text: 'th', type: 'digraph', sound: 'th' },
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'u', type: 'vowel', sound: 'oo', diacritic: 'oo' },
      { text: 'l', type: 'consonant', sound: 'l' }
    ],
    // Soft G words with 'j' diacritic
    'page': [
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'e', type: 'silent' }
    ],
    'magic': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'c', type: 'consonant', sound: 'k' }
    ],
    'imagine': [
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ],
    'giant': [
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 't', type: 'consonant', sound: 't' }
    ],
    'stage': [
      { text: 'st', type: 'consonant', sound: 'st' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'e', type: 'silent' }
    ],
    'manage': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'e', type: 'silent' }
    ],
    'gently': [
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'y', type: 'long-vowel', sound: 'long_e', diacritic: 'ē' }
    ],
    'gentle': [
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'e', type: 'vowel', sound: 'e' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'silent' }
    ],
    'magical': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'l', type: 'consonant', sound: 'l' }
    ],
    'original': [
      { text: 'o', type: 'vowel', sound: 'o' },
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'i', type: 'vowel', sound: 'i' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'l', type: 'consonant', sound: 'l' }
    ],
    'postage': [
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'e', type: 'silent' }
    ],
    'managed': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'a', type: 'vowel', sound: 'a' },
      { text: 'g', type: 'consonant', sound: 'j', diacritic: 'j' },
      { text: 'e', type: 'silent' },
      { text: 'd', type: 'consonant', sound: 'd' }
    ],

    // ==================== SILENT E WORDS ====================
    // (These use the simple silent-e pattern)
    'cake': [
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'e', type: 'silent' }
    ],
    'lake': [
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'e', type: 'silent' }
    ],
    'made': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'e', type: 'silent' }
    ],
    'name': [
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'e', type: 'silent' }
    ],
    'pale': [
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'silent' }
    ],
    'sale': [
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'silent' }
    ],
    'take': [
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'e', type: 'silent' }
    ],
    'wave': [
      { text: 'w', type: 'consonant', sound: 'w' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'base': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' }
    ],
    'case': [
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' }
    ],
    'date': [
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'fate': [
      { text: 'f', type: 'consonant', sound: 'f' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'gate': [
      { text: 'g', type: 'consonant', sound: 'g' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'hate': [
      { text: 'h', type: 'consonant', sound: 'h' },
      { text: 'a', type: 'long-vowel', sound: 'long_a' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'theme': [
      { text: 'th', type: 'digraph', sound: 'th' },
      { text: 'e', type: 'long-vowel', sound: 'long_e' },
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'e', type: 'silent' }
    ],
    'these': [
      { text: 'th', type: 'digraph', sound: 'th' },
      { text: 'e', type: 'long-vowel', sound: 'long_e' },
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'e', type: 'silent' }
    ],
    'eve': [
      { text: 'e', type: 'long-vowel', sound: 'long_e' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'bike': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'e', type: 'silent' }
    ],
    'kite': [
      { text: 'k', type: 'consonant', sound: 'k' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'lime': [
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'e', type: 'silent' }
    ],
    'mine': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ],
    'pine': [
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ],
    'time': [
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'e', type: 'silent' }
    ],
    'hive': [
      { text: 'h', type: 'consonant', sound: 'h' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'e', type: 'silent' }
    ],
    'bite': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'site': [
      { text: 's', type: 'consonant', sound: 's' },
      { text: 'i', type: 'long-vowel', sound: 'long_i' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'rope': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'e', type: 'silent' }
    ],
    'cone': [
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ],
    'robe': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'e', type: 'silent' }
    ],
    'stone': [
      { text: 'st', type: 'consonant', sound: 'st' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ],
    'bone': [
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ],
    'dome': [
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'e', type: 'silent' }
    ],
    'pole': [
      { text: 'p', type: 'consonant', sound: 'p' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'silent' }
    ],
    'vote': [
      { text: 'v', type: 'consonant', sound: 'v' },
      { text: 'o', type: 'long-vowel', sound: 'long_o' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'cube': [
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'b', type: 'consonant', sound: 'b' },
      { text: 'e', type: 'silent' }
    ],
    'mule': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'silent' }
    ],
    'rude': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'e', type: 'silent' }
    ],
    'cute': [
      { text: 'c', type: 'consonant', sound: 'k' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'dune': [
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ],
    'june': [
      { text: 'j', type: 'consonant', sound: 'j' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ],
    'lute': [
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'mute': [
      { text: 'm', type: 'consonant', sound: 'm' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 't', type: 'consonant', sound: 't' },
      { text: 'e', type: 'silent' }
    ],
    'rule': [
      { text: 'r', type: 'consonant', sound: 'r' },
      { text: 'u', type: 'long-vowel', sound: 'long_u' },
      { text: 'l', type: 'consonant', sound: 'l' },
      { text: 'e', type: 'silent' }
    ],

    // ==================== SOFT C AND G ====================
    'cede': [
      { text: 'c', type: 'consonant', sound: 'soft_c' },
      { text: 'e', type: 'long-vowel', sound: 'long_e' },
      { text: 'd', type: 'consonant', sound: 'd' },
      { text: 'e', type: 'silent' }
    ],
    'scene': [
      { text: 'sc', type: 'consonant', sound: 'soft_c' },
      { text: 'e', type: 'long-vowel', sound: 'long_e' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ],
    'gene': [
      { text: 'g', type: 'consonant', sound: 'soft_g' },
      { text: 'e', type: 'long-vowel', sound: 'long_e' },
      { text: 'n', type: 'consonant', sound: 'n' },
      { text: 'e', type: 'silent' }
    ]
  };

  const state = {
    score: 0, revealedWords: 0, totalWords: 0, usedWords: new Set(),
    currentWord: '', blendingTime: 3000, soundsEnabled: true,
    wordType: 'cvc', vowelFilter: 'all', theme: 'default',
    celebrationMode: false, badges: new Map(), streak: 0,
    // Session tracking
    sessionStartTime: Date.now(),
    sessionWordsCompleted: 0,
    sessionBestStreak: 0,
    // Mastery tracking - words mastered per word type
    masteredWords: {},
    // Premium features
    dailyGoal: 10,
    dailyProgress: 0,
    dailyStreakDays: 0,
    lastPracticeDate: null,
    totalPracticeDays: 0,
    totalWordsAllTime: 0,
    totalTimeMinutes: 0,
    allTimeBestStreak: 0,
    wordHistory: [],
    difficultWords: new Set(),
    weeklyActivity: {},
    unlockedLevels: ['cvc'],
    requireMasteryToUnlock: true,
    sessionTimeLimit: 0,
    difficultyLock: 0,
    goalCompletedToday: false
  };

  // Learning path configuration
  const learningPath = [
    { id: 'cvc', name: 'CVC Words', icon: '🌟', requiredMastery: 0 },
    { id: 'ccvc', name: 'CCVC Words', icon: '🚀', requiredMastery: 50 },
    { id: 'cvcc', name: 'CVCC Words', icon: '🎯', requiredMastery: 50 },
    { id: 'ccvcc', name: 'CCVCC Words', icon: '💎', requiredMastery: 60 },
    { id: 'digraphs', name: 'Digraphs', icon: '🔮', requiredMastery: 60 },
    { id: 'silentE', name: 'Silent E', icon: '✨', requiredMastery: 70 },
    { id: 'extended', name: 'Extended Words', icon: '🏆', requiredMastery: 70 },
    { id: 'diphthongs', name: 'Diphthongs', icon: '👑', requiredMastery: 75 },
    { id: 'softCAndG', name: 'Soft C & G', icon: '🎭', requiredMastery: 75 },
    { id: 'longVowels', name: 'Long Vowels', icon: '🌈', requiredMastery: 80 }
  ];

  const els = {
    spinButton: document.querySelector('#spinButton'),
    repeatButton: document.querySelector('#repeatButton'),
    hintButton: document.querySelector('#hintButton'),
    wordBox: document.querySelector('#wordBox'),
    scoreValue: document.querySelector('#scoreValue'),
    scoreIncrement: document.querySelector('#scoreIncrement'),
    progressText: document.querySelector('#progressText'),
    progressFill: document.querySelector('#progressFill'),
    progressBar: document.querySelector('#progressBar'),
    progressIcon: document.querySelector('#progressIcon'),
    complimentBox: document.querySelector('#complimentBox'),
    screenReaderAnnounce: document.querySelector('#screenReaderAnnounce'),
    blendingTimerContainer: document.querySelector('#blendingTimerContainer'),
    blendingTimer: document.querySelector('#blendingTimer'),
    wordTypeSelector: document.querySelector('#wordTypeSelector'),
    vowelSelector: document.querySelector('#vowelSelector'),
    themeSelector: document.querySelector('#themeSelector'),
    toggleAudioButton: document.querySelector('#toggleAudioButton'),
    blendingTimeDisplay: document.querySelector('#blendingTimeDisplay'),
    increaseTime: document.querySelector('#increaseBlendingTime'),
    decreaseTime: document.querySelector('#decreaseBlendingTime'),
    celebrationModeCheckbox: document.querySelector('#celebrationMode'),
    confettiContainer: document.querySelector('#confettiContainer'),
    tutorialModal: document.querySelector('#tutorialModal'),
    startTutorial: document.querySelector('#startTutorial'),
    skipTutorial: document.querySelector('#skipTutorial'),
    toggleSettingsButton: document.querySelector('#toggleSettingsButton'),
    advancedSettings: document.querySelector('#advancedSettings'),
    badges: document.querySelector('#badges'),
    fullscreenButton: document.querySelector('#fullscreenButton'),
    streakSection: document.querySelector('#streakSection'),
    streakCount: document.querySelector('#streakCount'),
    wordTypeDesc: document.querySelector('#wordTypeDesc'),
    resetProgressButton: document.querySelector('#resetProgressButton'),
    skipButton: document.querySelector('#skipButton'),
    toggleLegend: document.querySelector('#toggleLegend'),
    legendContent: document.querySelector('.legend-content'),
    toggleSessionSummary: document.querySelector('#toggleSessionSummary'),
    sessionDetails: document.querySelector('#sessionDetails'),
    sessionWords: document.querySelector('#sessionWords'),
    sessionTime: document.querySelector('#sessionTime'),
    sessionBestStreak: document.querySelector('#sessionBestStreak'),
    // Premium elements
    dailyGoalWidget: document.querySelector('#dailyGoalWidget'),
    goalRingProgress: document.querySelector('#goalRingProgress'),
    dailyGoalCurrent: document.querySelector('#dailyGoalCurrent'),
    dailyGoalTarget: document.querySelector('#dailyGoalTarget'),
    dailyStreakDays: document.querySelector('#dailyStreakDays'),
    dailyGoalSelect: document.querySelector('#dailyGoalSelect'),
    goalCompleteCelebration: document.querySelector('#goalCompleteCelebration'),
    celebrationWordCount: document.querySelector('#celebrationWordCount'),
    closeCelebration: document.querySelector('#closeCelebration'),
    difficultWordBanner: document.querySelector('#difficultWordBanner'),
    parentDashboardButton: document.querySelector('#parentDashboardButton'),
    parentDashboardModal: document.querySelector('#parentDashboardModal'),
    closeParentDashboard: document.querySelector('#closeParentDashboard'),
    dashTotalDays: document.querySelector('#dashTotalDays'),
    dashTotalWords: document.querySelector('#dashTotalWords'),
    dashBestStreak: document.querySelector('#dashBestStreak'),
    dashTotalTime: document.querySelector('#dashTotalTime'),
    weeklyChart: document.querySelector('#weeklyChart'),
    masteryBars: document.querySelector('#masteryBars'),
    learningPathList: document.querySelector('#learningPathList'),
    wordHistoryList: document.querySelector('#wordHistoryList'),
    sessionTimeLimit: document.querySelector('#sessionTimeLimit'),
    difficultyLock: document.querySelector('#difficultyLock'),
    requireMastery: document.querySelector('#requireMastery')
  };

  const wordTypeDescriptions = {
    cvc: 'e.g. cat, dog, sun',
    ccvc: 'e.g. flag, grab, spin',
    cvcc: 'e.g. hand, lamp, milk',
    ccvcc: 'e.g. brand, drink, frost',
    digraphs: 'e.g. chat, shop, thin',
    extended: 'e.g. jumping, blocking',
    silentE: 'e.g. cake, bike, home',
    softCAndG: 'e.g. cede, gene, scene',
    diphthongs: 'e.g. boy, car, cow',
    longVowels: 'e.g. find, road, tree'
  };

  // Difficulty ratings (1-5 stars)
  const wordTypeDifficulty = {
    cvc: 1,
    ccvc: 2,
    cvcc: 2,
    ccvcc: 3,
    digraphs: 3,
    silentE: 3,
    extended: 4,
    diphthongs: 4,
    softCAndG: 4,
    longVowels: 5
  };

  const compliments = ['Great Job!', 'Awesome!', 'You’re a Star!', 'Well Done!', 'Fantastic!'];
  const badgeNames = {
    cvc: 'CVC Star', ccvc: 'CCVC Hero', cvcc: 'CVCC Champ', ccvcc: 'CCVCC Master',
    digraphs: 'Digraph Ace', extended: 'Word Wizard', silentE: 'Silent E Expert',
    softCAndG: 'Soft Sounds Specialist', diphthongs: 'Diphthong Dynamo',
    longVowels: 'Long Vowel Master'
  };

  async function initSpeech() {
    return new Promise(resolve => {
      const checkVoices = () => {
        if (speechSynthesis.getVoices().length > 0) resolve();
        else speechSynthesis.onvoiceschanged = checkVoices;
      };
      checkVoices();
    });
  }

  function getPreferredFemaleVoice() {
    const voices = speechSynthesis.getVoices();
    const femaleIndicators = ['female', 'samantha', 'kate', 'victoria', 'alice', 'moira', 'tessa', 'zira'];
    let preferredVoice = voices.find(v => v.lang === 'en-GB' && femaleIndicators.some(ind => v.name.toLowerCase().includes(ind)));
    if (!preferredVoice) preferredVoice = voices.find(v => femaleIndicators.some(ind => v.name.toLowerCase().includes(ind)));
    if (!preferredVoice) preferredVoice = voices.find(v => v.lang.startsWith('en'));
    if (!preferredVoice && voices.length > 0) preferredVoice = voices[0];
    return preferredVoice;
  }

  function speakWord(text) {
    if (!state.soundsEnabled) return Promise.resolve();
    const utteranceText = text.toLowerCase() === 'a' ? 'uh' : text;
    const utterance = new SpeechSynthesisUtterance(utteranceText);
    utterance.lang = 'en-GB';
    const bestVoice = getPreferredFemaleVoice();
    if (bestVoice) utterance.voice = bestVoice;
    utterance.pitch = 1.3;
    utterance.rate = 0.7;
    return new Promise(resolve => {
      utterance.onend = resolve;
      utterance.onerror = () => resolve();
      setTimeout(() => speechSynthesis.speak(utterance), 100);
    });
  }

  function playSound(sound) {
    if (!state.soundsEnabled) return Promise.resolve();
    return new Promise(resolve => {
      const audio = new Audio(`${sound}.mp3`);
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      audio.play().catch(() => resolve());
    });
  }

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const announce = text => {
    els.screenReaderAnnounce.textContent = text;
    setTimeout(() => els.screenReaderAnnounce.textContent = '', 1000);
  };

  function updateScore(points = 10) {
    state.score += points;
    els.scoreValue.textContent = state.score;
    els.scoreIncrement.textContent = `+${points}`;
    els.scoreIncrement.classList.add('show');
    setTimeout(() => els.scoreIncrement.classList.remove('show'), 800);
  }

  function updateProgress() {
    state.revealedWords = state.usedWords.size;
    const percent = (state.revealedWords / state.totalWords) * 100 || 0;
    els.progressText.textContent = `${state.revealedWords} / ${state.totalWords} Words`;
    els.progressFill.style.width = `${percent}%`;
    els.progressBar.setAttribute('aria-valuenow', Math.round(percent));
    if (state.revealedWords % 10 === 0 && state.revealedWords > 0) {
      els.progressIcon.classList.add('star-animate');
      setTimeout(() => els.progressIcon.classList.remove('star-animate'), 1000);
      earnBadge(state.wordType);
    }
  }

  function launchConfetti() {
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      els.confettiContainer.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  function launchFireworks() {
    for (let i = 0; i < 15; i++) {
      const firework = document.createElement('div');
      firework.className = 'confetti star';
      firework.style.left = `${Math.random() * 100}vw`;
      firework.style.top = `${Math.random() * 50}vh`;
      firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      els.confettiContainer.appendChild(firework);
      setTimeout(() => firework.remove(), 1500);
    }
  }

  function updateStreak() {
    state.streak++;
    els.streakCount.textContent = state.streak;
    if (state.streak >= 2) {
      els.streakSection.classList.add('visible');
    }

    // Streak milestone celebrations
    const milestones = [3, 5, 10, 15, 20, 25];
    if (milestones.includes(state.streak)) {
      celebrateStreakMilestone(state.streak);
    }
  }

  function celebrateStreakMilestone(streak) {
    // Enhanced visual feedback for milestones
    els.streakSection.classList.add('milestone');
    setTimeout(() => els.streakSection.classList.remove('milestone'), 1500);

    // Play special sound for milestones
    if (state.soundsEnabled) {
      if (streak >= 10) {
        speakWord(`Amazing! ${streak} in a row!`);
      } else if (streak >= 5) {
        speakWord(`Fantastic! ${streak} streak!`);
      } else {
        speakWord(`Great! ${streak} in a row!`);
      }
    }

    // Extra confetti for higher milestones
    if (streak >= 10) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => launchFireworks(), i * 200);
      }
    } else if (streak >= 5) {
      launchFireworks();
      setTimeout(() => launchConfetti(), 300);
    }

    // Show milestone badge notification
    showMilestoneNotification(streak);
  }

  function showMilestoneNotification(streak) {
    const notification = document.createElement('div');
    notification.className = 'milestone-notification';
    notification.innerHTML = `<span class="milestone-icon">🔥</span><span>${streak} Streak!</span>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    }, 2000);
  }

  function resetStreak() {
    state.streak = 0;
    els.streakCount.textContent = '0';
    els.streakSection.classList.remove('visible');
  }

  // Session tracking functions
  function updateSessionStats() {
    state.sessionWordsCompleted++;
    if (state.streak > state.sessionBestStreak) {
      state.sessionBestStreak = state.streak;
    }

    if (els.sessionWords) els.sessionWords.textContent = state.sessionWordsCompleted;
    if (els.sessionBestStreak) els.sessionBestStreak.textContent = state.sessionBestStreak;
  }

  function formatSessionTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function updateSessionTimer() {
    const elapsed = Date.now() - state.sessionStartTime;
    if (els.sessionTime) els.sessionTime.textContent = formatSessionTime(elapsed);
  }

  // Update session timer every second
  setInterval(updateSessionTimer, 1000);

  function showPlaceholder() {
    els.wordBox.innerHTML = '<div class="word-placeholder"><span class="placeholder-icon">🎡</span><span>Press Spin to start!</span></div>';
  }

  function updateWordTypeDesc() {
    if (els.wordTypeDesc) {
      const desc = wordTypeDescriptions[state.wordType] || '';
      const difficulty = wordTypeDifficulty[state.wordType] || 1;
      const stars = '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
      const mastery = getMasteryPercentage(state.wordType);
      const masteryDisplay = mastery > 0 ? ` <span class="mastery-badge" title="Words mastered in this category">${mastery}% mastered</span>` : '';
      els.wordTypeDesc.innerHTML = `<span class="difficulty-stars" title="Difficulty: ${difficulty}/5">${stars}</span> ${desc}${masteryDisplay}`;
    }
  }

  function getMasteryPercentage(wordType) {
    const group = wordGroups[wordType];
    if (!group) return 0;

    const totalWords = Object.values(group).flat().length;
    const masteredSet = state.masteredWords[wordType];
    const masteredCount = masteredSet ? masteredSet.size : 0;

    return totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;
  }

  function trackMasteredWord(word) {
    if (!state.masteredWords[state.wordType]) {
      state.masteredWords[state.wordType] = new Set();
    }
    state.masteredWords[state.wordType].add(word.toLowerCase());
    updateWordTypeDesc();
    savePreferences();
  }

  function showCompliment() {
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    els.complimentBox.textContent = compliment;
    els.complimentBox.classList.add('show');
    if (state.soundsEnabled) speakWord(compliment);
    state.celebrationMode ? launchFireworks() : launchConfetti();
    updateStreak();
    updateSessionStats();
    trackMasteredWord(state.currentWord);
    trackWordCompletion(state.currentWord); // Premium tracking
    setTimeout(() => els.complimentBox.classList.remove('show'), 2000);
  }

  // ✅ PARSER — now supports -igh / -eigh with silent GH,
  // and auto-diacritics for every long-vowel word
  function parseWord(word) {
    const lower = word.toLowerCase();

    // Check explicit rendering data first (for complex words with diacritics)
    if (wordRenderMap[lower]) {
      return wordRenderMap[lower].map(unit => ({
        text: unit.text,
        isVowel: unit.type === 'vowel' || unit.type === 'long-vowel' || unit.type === 'diphthong',
        isLongVowel: unit.type === 'long-vowel',
        isDigraph: unit.type === 'digraph',
        isSilent: unit.type === 'silent',
        isDiphthong: unit.type === 'diphthong',
        isSoft: unit.type === 'soft',
        diacritic: unit.diacritic || null,
        sound: unit.sound || null
      }));
    }

    // Fall back to algorithmic parsing for simple words (CVC, CCVC, etc.)
    const units = [];
    let i = 0;

    while (i < word.length) {
      let unitAdded = false;

      // eigh -> ei (long vowel) + gh (silent)
      const nextFour = word.slice(i, i + 4).toLowerCase();
      if (nextFour === 'eigh') {
        units.push({ text: word.slice(i, i + 2), isDigraph: true, isVowel: true, isLongVowel: true }); // ei
        units.push({ text: word.slice(i + 2, i + 4), isDigraph: true, isSilent: true });              // gh
        i += 4;
        unitAdded = true;
      }

      // igh -> i (long vowel) + gh (silent)
      if (!unitAdded) {
        const nextThree = word.slice(i, i + 3).toLowerCase();
        if (nextThree === 'igh') {
          units.push({ text: word.slice(i, i + 1), isVowel: true, isLongVowel: true });                // i
          units.push({ text: word.slice(i + 1, i + 3), isDigraph: true, isSilent: true });             // gh
          i += 3;
          unitAdded = true;
        }
      }

      // trigraphs (air/ear etc)
      if (!unitAdded) {
        const nextThree = word.slice(i, i + 3).toLowerCase();
        if (vowelPatterns.trigraphs.includes(nextThree)) {
          units.push({ text: word.slice(i, i + 3), isDiphthong: true, isVowel: true });
          i += 3;
          unitAdded = true;
        }
      }

      // digraphs / long vowel digraphs
      if (!unitAdded) {
        const nextTwo = word.slice(i, i + 2).toLowerCase();

        if (
          vowelPatterns.digraphs.includes(nextTwo) ||
          (state.wordType === 'longVowels' && longVowelDigraphs.includes(nextTwo))
        ) {
          units.push({
            text: word.slice(i, i + 2),
            isDigraph: true,
            isVowel: true,
            isLongVowel: state.wordType === 'longVowels'
          });
          i += 2;
          unitAdded = true;
        } else if (consonantDigraphs.includes(nextTwo)) {
          units.push({ text: word.slice(i, i + 2), isDigraph: true });
          i += 2;
          unitAdded = true;
        }
      }

      // single letters
      if (!unitAdded) {
        const letter = word[i];
        let unit = { text: letter, isVowel: /[aeiouAEIOU]/.test(letter) };

        // double letter
        if (!unit.isVowel && i + 1 < word.length && word[i + 1].toLowerCase() === letter.toLowerCase()) {
          unit.text += word[i + 1];
          unit.isDouble = true;
          i++;
        }

        // soft c/g
        const lowerLetter = letter.toLowerCase();
        if (['c', 'g'].includes(lowerLetter) && i + 1 < word.length) {
          if (['e', 'i', 'y'].includes(word[i + 1].toLowerCase())) unit.isSoft = true;
        }

        units.push(unit);
        i++;
      }
    }

    // Silent-e detection
    if (units.length >= 3) {
      const last = units.length - 1;
      const second = last - 1;
      const third = last - 2;
      if (units[last].text.toLowerCase() === 'e' && !units[second].isVowel && units[third].isVowel) {
        units[third].isLongVowel = true;
        units[last].isSilent = true;
      }
    }

    // ✅ Apply diacritic + silent letters for ALL long vowel words
    if (state.wordType === 'longVowels') {
      const info = longVowelWordInfo[lower];
      if (info) {
        // Prefer a true long-vowel unit (digraph/igh/silent-e carrier), else fallback vowel
        const target =
          units.find(u => u.isLongVowel && !u.isSilent) ||
          units.find(u => u.isVowel && !u.isSilent);

        if (target) target.diacritic = info.mark;
      }

      // Grey “silent” letter overrides (y grey etc.)
      const overrides = silentLetterOverrides[lower];
      if (overrides?.length) {
        for (const u of units) {
          if (overrides.includes(u.text.toLowerCase())) u.isSilent = true;
        }
      }
    }

    return units;
  }

  function savePreferences() {
    // Convert masteredWords Sets to Arrays for JSON storage
    const masteredWordsArray = {};
    for (const [type, words] of Object.entries(state.masteredWords)) {
      masteredWordsArray[type] = Array.from(words);
    }

    // Calculate session time to add to total
    const sessionMinutes = Math.floor((Date.now() - state.sessionStartTime) / 60000);

    localStorage.setItem('wordSpinnerPrefs', JSON.stringify({
      ...state,
      usedWords: Array.from(state.usedWords),
      badges: Object.fromEntries(state.badges),
      masteredWords: masteredWordsArray,
      difficultWords: Array.from(state.difficultWords),
      totalTimeMinutes: state.totalTimeMinutes + sessionMinutes
    }));
  }

  function loadPreferences() {
    const prefs = JSON.parse(localStorage.getItem('wordSpinnerPrefs')) || {};

    // Convert masteredWords Arrays back to Sets
    const masteredWords = {};
    if (prefs.masteredWords) {
      for (const [type, words] of Object.entries(prefs.masteredWords)) {
        masteredWords[type] = new Set(words);
      }
    }

    Object.assign(state, {
      wordType: prefs.wordType || 'cvc',
      vowelFilter: prefs.vowelFilter || 'all',
      theme: prefs.theme || 'default',
      blendingTime: prefs.blendingTime || 3000,
      soundsEnabled: prefs.soundsEnabled ?? true,
      celebrationMode: prefs.celebrationMode || false,
      badges: new Map(Object.entries(prefs.badges || {})),
      usedWords: new Set(prefs.usedWords || []),
      masteredWords: masteredWords,
      // Premium features
      dailyGoal: prefs.dailyGoal || 10,
      dailyProgress: prefs.dailyProgress || 0,
      dailyStreakDays: prefs.dailyStreakDays || 0,
      lastPracticeDate: prefs.lastPracticeDate || null,
      totalPracticeDays: prefs.totalPracticeDays || 0,
      totalWordsAllTime: prefs.totalWordsAllTime || 0,
      totalTimeMinutes: prefs.totalTimeMinutes || 0,
      allTimeBestStreak: prefs.allTimeBestStreak || 0,
      wordHistory: prefs.wordHistory || [],
      difficultWords: new Set(prefs.difficultWords || []),
      weeklyActivity: prefs.weeklyActivity || {},
      unlockedLevels: prefs.unlockedLevels || ['cvc'],
      requireMasteryToUnlock: prefs.requireMasteryToUnlock ?? true,
      sessionTimeLimit: prefs.sessionTimeLimit || 0,
      difficultyLock: prefs.difficultyLock || 0,
      goalCompletedToday: prefs.goalCompletedToday || false
    });

    // Check if it's a new day and update streak
    updateDailyStreak();

    document.body.dataset.theme = state.theme;
    els.wordTypeSelector.value = state.wordType;
    els.vowelSelector.value = state.vowelFilter;
    els.themeSelector.value = state.theme;
    els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
    updateAudioButton();
    els.celebrationModeCheckbox.checked = state.celebrationMode;
    updateWordTypeDesc();
    updateDailyGoalUI();

    // Update daily goal selector
    if (els.dailyGoalSelect) {
      els.dailyGoalSelect.value = state.dailyGoal;
    }
  }

  function updateAudioButton() {
    if (state.soundsEnabled) {
      els.toggleAudioButton.textContent = '🔊 Sound On';
      els.toggleAudioButton.classList.remove('audio-toggle-off');
      els.toggleAudioButton.classList.add('audio-toggle-on');
    } else {
      els.toggleAudioButton.textContent = '🔇 Sound Off';
      els.toggleAudioButton.classList.remove('audio-toggle-on');
      els.toggleAudioButton.classList.add('audio-toggle-off');
    }
  }

  function updateBadges() {
    if (!els.badges) return;
    els.badges.innerHTML = '';
    state.badges.forEach((_, type) => {
      const badge = document.createElement('div');
      badge.className = 'badge';
      badge.textContent = badgeNames[type];
      els.badges.appendChild(badge);
    });
  }

  function earnBadge(wordType) {
    if (!state.badges.has(wordType)) {
      state.badges.set(wordType, true);
      updateBadges();
      if (state.soundsEnabled) speakWord(`Congratulations! You earned the ${badgeNames[wordType]} badge!`);
      launchConfetti();
      savePreferences();
    }
  }

  async function revealWord(word, isRepeat = false) {
    els.wordBox.innerHTML = '';
    const units = parseWord(word);

    units.forEach((unit, idx) => {
      const span = document.createElement('span');
      span.textContent = unit.text;
      span.classList.add('letter');

      if (unit.isVowel) span.classList.add('vowel');
      if (unit.isDigraph) span.classList.add('digraph');
      if (unit.isDiphthong) span.classList.add('diphthong');
      if (unit.isLongVowel) span.classList.add('long-vowel');
      if (unit.isSilent) span.classList.add('silent');
      if (unit.isSoft) span.classList.add('soft');
      if (unit.isDouble) span.classList.add('double');

      if (unit.diacritic) {
        span.dataset.diacritic = unit.diacritic;
        span.classList.add('has-diacritic');
      }

      span.style.animationDelay = `${idx * 0.4}s`;
      els.wordBox.appendChild(span);
    });

    // Play unit sounds (skips silent units)
    for (const unit of units) {
      await delay(400);
      if (unit.isSilent) continue;

      // Use explicit sound mapping from wordRenderMap if available
      let sound;
      if (unit.sound) {
        sound = unit.sound;
      } else {
        // Fallback to algorithmic sound mapping for simple words
        sound = unit.text.toLowerCase();
        if (unit.isLongVowel) sound = `long_${sound}`;
        else if (unit.isSoft) sound = `soft_${sound}`;
        else if (unit.isDouble) sound = sound[0];
      }

      await playSound(sound);
    }

    els.blendingTimerContainer.style.display = 'block';
    els.blendingTimer.style.transition = `width ${state.blendingTime / 1000}s linear`;
    els.blendingTimer.style.width = '100%';
    requestAnimationFrame(() => els.blendingTimer.style.width = '0%');

    announce('Blend the letters aloud!');
    await delay(state.blendingTime);

    els.blendingTimerContainer.style.display = 'none';
    if (state.soundsEnabled) speakWord(word);
    announce(`The word is: ${word}`);

    if (!isRepeat) {
      state.usedWords.add(word);
      showCompliment();
      updateScore();
      updateProgress();
      if (state.usedWords.size === state.totalWords) resetGame();
    }

    els.hintButton.hidden = false;
    els.skipButton.hidden = false;
    els.repeatButton.disabled = false;
  }

  function getAvailableWords() {
    const group = wordGroups[state.wordType];
    if (!group) return [];
    if (state.vowelFilter === 'all') return Object.values(group).flat();
    return group[state.vowelFilter] || [];
  }

  function getRandomWord() {
    const words = getAvailableWords().filter(w => !state.usedWords.has(w));
    if (!words.length) {
      if (getAvailableWords().length === 0) return 'No words available';
      state.usedWords.clear();
      return getRandomWord();
    }
    return words[Math.floor(Math.random() * words.length)];
  }

  function resetGame() {
    state.usedWords.clear();
    state.revealedWords = 0;
    state.score = 0;
    state.currentWord = '';
    els.scoreValue.textContent = '0';
    els.repeatButton.disabled = true;
    els.hintButton.hidden = true;
    els.skipButton.hidden = true;
    state.totalWords = getAvailableWords().length;
    updateProgress();
    showPlaceholder();
    resetStreak();
    savePreferences();
  }

  async function spin() {
    els.spinButton.disabled = true;
    state.currentWord = getRandomWord();
    await revealWord(state.currentWord);
    els.spinButton.disabled = false;
  }

  async function repeat() {
    if (!state.currentWord) return;
    els.repeatButton.disabled = true;
    await revealWord(state.currentWord, true);
    els.repeatButton.disabled = false;
  }

  async function hint() {
    if (!state.currentWord) return;
    const units = parseWord(state.currentWord);
    const spans = els.wordBox.querySelectorAll('.letter');

    for (let idx = 0; idx < units.length; idx++) {
      const unit = units[idx];
      if (unit.isSilent) continue;
      const span = spans[idx];

      span.classList.add('highlight');

      let sound = unit.text.toLowerCase();
      if (unit.isLongVowel) sound = `long_${sound}`;
      else if (unit.isDiphthong) sound = sound;
      else if (unit.isSoft) sound = `soft_${sound}`;
      else if (unit.isDouble) sound = sound[0];

      await playSound(sound);
      await delay(400);
      span.classList.remove('highlight');
    }
  }

  async function skip() {
    if (!state.currentWord) return;
    // Track as difficult word when skipped
    state.difficultWords.add(state.currentWord.toLowerCase());
    resetStreak();
    els.skipButton.hidden = true;
    els.hintButton.hidden = true;
    els.repeatButton.disabled = true;
    showPlaceholder();
    announce('Word skipped. Press Spin for a new word.');
    savePreferences();
  }

  // ============================================
  // PREMIUM FEATURES
  // ============================================

  function getTodayString() {
    return new Date().toISOString().split('T')[0];
  }

  function updateDailyGoalUI() {
    if (!els.dailyGoalCurrent) return;

    els.dailyGoalCurrent.textContent = state.dailyProgress;
    els.dailyGoalTarget.textContent = state.dailyGoal;
    els.dailyStreakDays.textContent = `🔥 ${state.dailyStreakDays} day${state.dailyStreakDays !== 1 ? 's' : ''} streak`;

    // Update progress ring
    const circumference = 2 * Math.PI * 45; // r=45
    const progress = Math.min(state.dailyProgress / state.dailyGoal, 1);
    const offset = circumference * (1 - progress);

    if (els.goalRingProgress) {
      els.goalRingProgress.style.strokeDasharray = circumference;
      els.goalRingProgress.style.strokeDashoffset = offset;
      els.goalRingProgress.style.stroke = progress >= 1 ? '#00b894' : '#e94560';
    }
  }

  function checkDailyGoalComplete() {
    if (state.dailyProgress >= state.dailyGoal && !state.goalCompletedToday) {
      state.goalCompletedToday = true;
      showDailyGoalCelebration();
      savePreferences();
    }
  }

  function showDailyGoalCelebration() {
    if (!els.goalCompleteCelebration) return;

    els.celebrationWordCount.textContent = state.dailyGoal;
    els.goalCompleteCelebration.hidden = false;

    // Launch extra confetti
    for (let i = 0; i < 5; i++) {
      setTimeout(() => launchFireworks(), i * 200);
    }

    if (state.soundsEnabled) {
      speakWord('Congratulations! You completed your daily goal!');
    }
  }

  function updateDailyStreak() {
    const today = getTodayString();

    if (state.lastPracticeDate !== today) {
      // Check if yesterday was practiced for streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];

      if (state.lastPracticeDate === yesterdayString) {
        state.dailyStreakDays++;
      } else if (state.lastPracticeDate !== today) {
        state.dailyStreakDays = 1;
      }

      state.lastPracticeDate = today;
      state.totalPracticeDays++;
      state.dailyProgress = 0;
      state.goalCompletedToday = false;
    }
  }

  function trackWordCompletion(word) {
    const today = getTodayString();

    // Update daily progress
    state.dailyProgress++;
    state.totalWordsAllTime++;

    // Update weekly activity
    state.weeklyActivity[today] = (state.weeklyActivity[today] || 0) + 1;

    // Add to word history
    const existingIndex = state.wordHistory.findIndex(h => h.word === word.toLowerCase());
    if (existingIndex >= 0) {
      state.wordHistory[existingIndex].attempts++;
      state.wordHistory[existingIndex].lastPracticed = today;
    } else {
      state.wordHistory.push({
        word: word.toLowerCase(),
        type: state.wordType,
        firstPracticed: today,
        lastPracticed: today,
        attempts: 1,
        mastered: false
      });
    }

    // Remove from difficult words if practiced successfully
    if (state.difficultWords.has(word.toLowerCase())) {
      const historyItem = state.wordHistory.find(h => h.word === word.toLowerCase());
      if (historyItem && historyItem.attempts >= 3) {
        state.difficultWords.delete(word.toLowerCase());
      }
    }

    // Update all-time best streak
    if (state.streak > state.allTimeBestStreak) {
      state.allTimeBestStreak = state.streak;
    }

    updateDailyGoalUI();
    checkDailyGoalComplete();
    checkLevelUnlocks();
    savePreferences();
  }

  function checkLevelUnlocks() {
    if (!state.requireMasteryToUnlock) return;

    for (let i = 0; i < learningPath.length; i++) {
      const level = learningPath[i];

      if (state.unlockedLevels.includes(level.id)) continue;

      // Check if previous level has required mastery
      if (i > 0) {
        const prevLevel = learningPath[i - 1];
        const prevMastery = getMasteryPercentage(prevLevel.id);

        if (prevMastery >= level.requiredMastery) {
          state.unlockedLevels.push(level.id);
          announceUnlock(level);
        }
      }
    }
  }

  function announceUnlock(level) {
    if (state.soundsEnabled) {
      speakWord(`New level unlocked: ${level.name}!`);
    }

    // Show unlock notification
    const notification = document.createElement('div');
    notification.className = 'milestone-notification';
    notification.innerHTML = `<span class="milestone-icon">${level.icon}</span><span>Unlocked: ${level.name}!</span>`;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
    }, 3000);

    launchFireworks();
  }

  function isLevelUnlocked(levelId) {
    if (state.difficultyLock > 0) {
      const levelIndex = learningPath.findIndex(l => l.id === levelId);
      return levelIndex < state.difficultyLock;
    }
    return state.unlockedLevels.includes(levelId);
  }

  // Parent Dashboard Functions
  function openParentDashboard() {
    if (!els.parentDashboardModal) return;

    updateDashboardStats();
    renderWeeklyChart();
    renderMasteryBars();
    renderLearningPath();
    renderWordHistory('all');

    els.parentDashboardModal.showModal();
  }

  function updateDashboardStats() {
    if (els.dashTotalDays) els.dashTotalDays.textContent = state.totalPracticeDays;
    if (els.dashTotalWords) els.dashTotalWords.textContent = state.totalWordsAllTime;
    if (els.dashBestStreak) els.dashBestStreak.textContent = state.allTimeBestStreak;

    // Calculate total time
    const sessionMinutes = Math.floor((Date.now() - state.sessionStartTime) / 60000);
    const totalMins = state.totalTimeMinutes + sessionMinutes;
    if (els.dashTotalTime) {
      els.dashTotalTime.textContent = totalMins >= 60
        ? `${Math.floor(totalMins / 60)}h ${totalMins % 60}m`
        : `${totalMins}m`;
    }
  }

  function renderWeeklyChart() {
    if (!els.weeklyChart) return;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    let maxWords = 1;
    const weekData = [];

    // Get last 7 days data
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const words = state.weeklyActivity[dateStr] || 0;
      weekData.push({ day: days[date.getDay()], words, isToday: i === 0 });
      if (words > maxWords) maxWords = words;
    }

    els.weeklyChart.innerHTML = weekData.map(d => `
      <div class="chart-day">
        <div class="chart-bar" style="height: ${(d.words / maxWords) * 80}px"></div>
        <span class="chart-label">${d.day}</span>
      </div>
    `).join('');
  }

  function renderMasteryBars() {
    if (!els.masteryBars) return;

    const types = ['cvc', 'ccvc', 'cvcc', 'digraphs', 'silentE', 'longVowels'];
    const labels = { cvc: 'CVC', ccvc: 'CCVC', cvcc: 'CVCC', digraphs: 'Digraphs', silentE: 'Silent E', longVowels: 'Long Vowels' };

    els.masteryBars.innerHTML = types.map(type => {
      const percent = getMasteryPercentage(type);
      return `
        <div class="mastery-bar-item">
          <span class="mastery-bar-label">${labels[type]}</span>
          <div class="mastery-bar-track">
            <div class="mastery-bar-fill" style="width: ${percent}%"></div>
          </div>
          <span class="mastery-bar-percent">${percent}%</span>
        </div>
      `;
    }).join('');
  }

  function renderLearningPath() {
    if (!els.learningPathList) return;

    els.learningPathList.innerHTML = learningPath.map((level, index) => {
      const mastery = getMasteryPercentage(level.id);
      const isUnlocked = isLevelUnlocked(level.id);
      const isCurrent = state.wordType === level.id;
      const isComplete = mastery >= 80;

      let status, statusClass;
      if (isComplete) {
        status = '✓ Mastered';
        statusClass = 'complete';
      } else if (isUnlocked) {
        status = `${mastery}% complete`;
        statusClass = '';
      } else {
        status = `🔒 Unlock at ${level.requiredMastery}%`;
        statusClass = 'locked';
      }

      const itemClass = `path-item ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`;

      return `
        <div class="${itemClass}" data-level="${level.id}">
          <span class="path-icon">${level.icon}</span>
          <div class="path-info">
            <span class="path-name">${level.name}</span>
            <span class="path-status ${statusClass}">${status}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderWordHistory(filter) {
    if (!els.wordHistoryList) return;

    let words = [...state.wordHistory].reverse();

    if (filter === 'difficult') {
      words = words.filter(w => state.difficultWords.has(w.word));
    } else if (filter === 'mastered') {
      words = words.filter(w => w.attempts >= 5);
    }

    if (words.length === 0) {
      els.wordHistoryList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No words yet. Start practicing!</p>';
      return;
    }

    els.wordHistoryList.innerHTML = words.slice(0, 50).map(w => {
      const isDifficult = state.difficultWords.has(w.word);
      const isMastered = w.attempts >= 5;
      const status = isDifficult ? '⚠️' : (isMastered ? '⭐' : '📝');

      return `
        <div class="history-item">
          <span class="history-word">${w.word}</span>
          <div class="history-meta">
            <span class="history-type">${w.type.toUpperCase()}</span>
            <span class="history-status">${status}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  function initDashboardTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabContents.forEach(content => {
          content.hidden = content.id !== `tab-${tabId}`;
        });
      });
    });

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderWordHistory(btn.dataset.filter);
      });
    });
  }

  function updateWordTypeSelector() {
    // Disable locked word types in selector
    const options = els.wordTypeSelector.querySelectorAll('option');
    options.forEach(opt => {
      const isUnlocked = isLevelUnlocked(opt.value);
      opt.disabled = !isUnlocked;
      if (!isUnlocked) {
        opt.textContent = opt.textContent.replace(' 🔒', '') + ' 🔒';
      }
    });
  }

  // Event listeners
  els.spinButton.addEventListener('click', spin);
  els.repeatButton.addEventListener('click', repeat);
  els.hintButton.addEventListener('click', hint);
  els.skipButton.addEventListener('click', skip);

  els.toggleLegend.addEventListener('click', () => {
    const isHidden = els.legendContent.hidden;
    els.legendContent.hidden = !isHidden;
    els.toggleLegend.setAttribute('aria-expanded', isHidden);
    els.toggleLegend.textContent = isHidden ? '📖 Hide Guide' : '📖 Color Guide';
  });

  els.toggleSessionSummary.addEventListener('click', () => {
    const isHidden = els.sessionDetails.hidden;
    els.sessionDetails.hidden = !isHidden;
    els.toggleSessionSummary.setAttribute('aria-expanded', isHidden);
    els.toggleSessionSummary.textContent = isHidden ? '📊 Hide Session' : '📊 Session';
  });

  els.wordTypeSelector.addEventListener('change', () => {
    state.wordType = els.wordTypeSelector.value;
    updateWordTypeDesc();
    resetGame();
  });

  els.vowelSelector.addEventListener('change', () => {
    state.vowelFilter = els.vowelSelector.value;
    resetGame();
  });

  els.themeSelector.addEventListener('change', () => {
    state.theme = els.themeSelector.value;
    document.body.dataset.theme = state.theme;
    savePreferences();
  });

  els.toggleAudioButton.addEventListener('click', () => {
    state.soundsEnabled = !state.soundsEnabled;
    updateAudioButton();
    savePreferences();
  });

  els.increaseTime.addEventListener('click', () => {
    if (state.blendingTime < 7000) {
      state.blendingTime += 1000;
      els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
      savePreferences();
    }
  });

  els.decreaseTime.addEventListener('click', () => {
    if (state.blendingTime > 1000) {
      state.blendingTime -= 1000;
      els.blendingTimeDisplay.textContent = state.blendingTime / 1000;
      savePreferences();
    }
  });

  els.celebrationModeCheckbox.addEventListener('change', () => {
    state.celebrationMode = els.celebrationModeCheckbox.checked;
    savePreferences();
  });

  els.toggleSettingsButton.addEventListener('click', (event) => {
    event.preventDefault();
    const isVisible = els.advancedSettings.classList.contains('open');
    els.advancedSettings.classList.toggle('open');
    els.toggleSettingsButton.textContent = isVisible ? '⚙️ Customize' : '⚙️ Hide Settings';
    els.toggleSettingsButton.setAttribute('aria-expanded', !isVisible);
    els.advancedSettings.setAttribute('aria-hidden', isVisible);
  });

  els.startTutorial.addEventListener('click', () => {
    els.tutorialModal.close();
    localStorage.setItem('hasSeenTutorial', 'true');
    if (state.soundsEnabled) playSound('start');
  });

  els.skipTutorial.addEventListener('click', () => {
    els.tutorialModal.close();
    localStorage.setItem('hasSeenTutorial', 'true');
  });

  els.fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(console.warn);
    else document.exitFullscreen().catch(console.warn);
  });

  els.resetProgressButton.addEventListener('click', () => {
    if (confirm('Reset all progress? This will clear your score, badges, word history, and daily goals.')) {
      state.badges.clear();
      state.wordHistory = [];
      state.difficultWords.clear();
      state.weeklyActivity = {};
      state.totalWordsAllTime = 0;
      state.totalPracticeDays = 0;
      state.totalTimeMinutes = 0;
      state.allTimeBestStreak = 0;
      state.dailyProgress = 0;
      state.dailyStreakDays = 0;
      state.unlockedLevels = ['cvc'];
      resetStreak();
      resetGame();
      updateBadges();
      updateDailyGoalUI();
      savePreferences();
      announce('Progress has been reset');
    }
  });

  // Premium feature event listeners
  if (els.parentDashboardButton) {
    els.parentDashboardButton.addEventListener('click', openParentDashboard);
  }

  if (els.closeParentDashboard) {
    els.closeParentDashboard.addEventListener('click', () => {
      els.parentDashboardModal.close();
    });
  }

  if (els.closeCelebration) {
    els.closeCelebration.addEventListener('click', () => {
      els.goalCompleteCelebration.hidden = true;
    });
  }

  if (els.dailyGoalSelect) {
    els.dailyGoalSelect.addEventListener('change', () => {
      state.dailyGoal = parseInt(els.dailyGoalSelect.value);
      updateDailyGoalUI();
      savePreferences();
    });
  }

  if (els.sessionTimeLimit) {
    els.sessionTimeLimit.addEventListener('change', () => {
      state.sessionTimeLimit = parseInt(els.sessionTimeLimit.value);
      savePreferences();
    });
  }

  if (els.difficultyLock) {
    els.difficultyLock.addEventListener('change', () => {
      state.difficultyLock = parseInt(els.difficultyLock.value);
      updateWordTypeSelector();
      savePreferences();
    });
  }

  if (els.requireMastery) {
    els.requireMastery.addEventListener('change', () => {
      state.requireMasteryToUnlock = els.requireMastery.checked;
      savePreferences();
    });
  }

  // Initialize dashboard tabs
  initDashboardTabs();

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
    const key = e.key.toLowerCase();
    if (key === 's' && !els.spinButton.disabled) spin();
    else if (key === 'r' && !els.repeatButton.disabled) repeat();
    else if (key === 'h' && !els.hintButton.hidden) hint();
  });

  (async () => {
    await initSpeech();
    loadPreferences();
    updateBadges();
    resetGame();
    if (!localStorage.getItem('hasSeenTutorial')) els.tutorialModal.showModal();
  })();
});
