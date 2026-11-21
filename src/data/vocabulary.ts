export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface WordItem {
  id: string;
  word: string;
  definition: string;
  sentence: string;
  georgian: string;
  phonetic: string;
  partOfSpeech: 'verb' | 'noun' | 'adjective';
  synonyms: string[];
  emoji: string;
  questId: string;
  level: CEFRLevel;
}

export interface DefinitionQuestion {
  id: string;
  wordId: string;
  word: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface SentenceQuestion {
  id: string;
  targetWord: string;
  sentenceBefore: string;
  sentenceAfter: string;
  fullSentence: string;
  georgianHint: string;
  options: {
    word: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface StorySegment {
  id: string;
  before: string;
  gapWord: string;
  after: string;
  georgianHint: string;
  choices: string[];
  explanation: string;
}

export interface QuestStory {
  title: string;
  subtitle: string;
  introduction: string;
  segments: StorySegment[];
  conclusion: string;
}

export interface QuestInfo {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  level: CEFRLevel;
  levelBadgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
  islandName: string;
  islandEmoji: string;
  order: number;
  xpReward: number;
  requiredQuestId?: string; // prerequisite quest
  mapCoord: { x: number; y: number }; // coordinate on SVG map (0-1000, 0-580)
  words: WordItem[];
  definitionQuestions: DefinitionQuestion[];
  sentenceQuestions: SentenceQuestion[];
  story: QuestStory;
}

// ==========================================
// QUEST 1: TRAVEL (A1)
// ==========================================
const QUEST_1_WORDS: WordItem[] = [
  {
    id: 'ticket',
    word: 'ticket',
    definition: 'A printed piece of paper or card that allows you to travel on a train, plane, or bus.',
    sentence: 'Please show your train ticket to the conductor before getting on board.',
    georgian: 'ბილეთი',
    phonetic: 'TIK-it (/ˈtɪkɪt/)',
    partOfSpeech: 'noun',
    synonyms: ['pass', 'boarding pass', 'token'],
    emoji: '🎫',
    questId: 'quest-travel',
    level: 'A1',
  },
  {
    id: 'passport',
    word: 'passport',
    definition: 'An official booklet issued by a government identifying you as a citizen for foreign travel.',
    sentence: 'Keep your passport in a safe zippered pocket at the airport.',
    georgian: 'პასპორტი',
    phonetic: 'PASS-port (/ˈpæspɔːrt/)',
    partOfSpeech: 'noun',
    synonyms: ['travel document', 'ID', 'credentials'],
    emoji: '🛂',
    questId: 'quest-travel',
    level: 'A1',
  },
  {
    id: 'airport',
    word: 'airport',
    definition: 'A complex of runways and buildings for airplanes to take off, land, and passengers to board.',
    sentence: 'We arrived at the international airport two hours before our flight.',
    georgian: 'აეროპორტი',
    phonetic: 'AIR-port (/ˈerpɔːrt/)',
    partOfSpeech: 'noun',
    synonyms: ['airfield', 'terminal', 'airstrip'],
    emoji: '✈️',
    questId: 'quest-travel',
    level: 'A1',
  },
  {
    id: 'hotel',
    word: 'hotel',
    definition: 'An establishment providing lodging, meals, and other services for travelers.',
    sentence: 'Our cozy seaside hotel overlooked golden sandy beaches and calm blue waves.',
    georgian: 'სასტუმრო',
    phonetic: 'hoh-TEL (/hoʊˈtel/)',
    partOfSpeech: 'noun',
    synonyms: ['inn', 'lodge', 'resort'],
    emoji: '🏨',
    questId: 'quest-travel',
    level: 'A1',
  },
  {
    id: 'luggage',
    word: 'luggage',
    definition: 'Suitcases or bags packed with personal belongings for traveling.',
    sentence: 'He wheeled his heavy luggage to the check-in desk.',
    georgian: 'ბარგი',
    phonetic: 'LUG-ij (/ˈlʌɡɪdʒ/)',
    partOfSpeech: 'noun',
    synonyms: ['baggage', 'suitcases', 'gear'],
    emoji: '🧳',
    questId: 'quest-travel',
    level: 'A1',
  },
  {
    id: 'arrive',
    word: 'arrive',
    definition: 'To reach a destination at the end of a trip or journey.',
    sentence: 'The high-speed ferry will arrive at the island harbor at noon.',
    georgian: 'ჩამოსვლა, მიღწევა',
    phonetic: 'uh-RYVE (/əˈraɪv/)',
    partOfSpeech: 'verb',
    synonyms: ['reach', 'appear', 'land'],
    emoji: '⚓',
    questId: 'quest-travel',
    level: 'A1',
  },
  {
    id: 'depart',
    word: 'depart',
    definition: 'To leave a place, especially to begin a planned journey.',
    sentence: 'Our morning flight will depart promptly at eight o\'clock.',
    georgian: 'გამგზავრება, გასვლა',
    phonetic: 'dih-PART (/dɪˈpɑːrt/)',
    partOfSpeech: 'verb',
    synonyms: ['leave', 'take off', 'exit'],
    emoji: '🛫',
    questId: 'quest-travel',
    level: 'A1',
  },
  {
    id: 'station',
    word: 'station',
    definition: 'A designated stopping place along a route with buildings for trains or buses.',
    sentence: 'Crowds of travelers stood waiting on platform three at the central railway station.',
    georgian: 'სადგური',
    phonetic: 'STAY-shun (/ˈsteɪʃn/)',
    partOfSpeech: 'noun',
    synonyms: ['terminal', 'stop', 'depot'],
    emoji: '🚉',
    questId: 'quest-travel',
    level: 'A1',
  },
  {
    id: 'tourist',
    word: 'tourist',
    definition: 'A person who travels to visit interesting places for pleasure and sightseeing.',
    sentence: 'The friendly tourist took photos of the ancient castle tower.',
    georgian: 'ტურისტი',
    phonetic: 'TOOR-ist (/ˈtʊrɪst/)',
    partOfSpeech: 'noun',
    synonyms: ['sightseer', 'visitor', 'traveler'],
    emoji: '📸',
    questId: 'quest-travel',
    level: 'A1',
  },
  {
    id: 'map',
    word: 'map',
    definition: 'A visual diagram showing geographical features, roads, landmarks, and routes.',
    sentence: 'We unfolded the pocket map to find the secret path to the lighthouse.',
    georgian: 'რუკა',
    phonetic: 'MAP (/mæp/)',
    partOfSpeech: 'noun',
    synonyms: ['chart', 'guide', 'diagram'],
    emoji: '🗺️',
    questId: 'quest-travel',
    level: 'A1',
  },
];

// ==========================================
// QUEST 2: DAILY CONVERSATION (A2)
// ==========================================
const QUEST_2_WORDS: WordItem[] = [
  {
    id: 'invite',
    word: 'invite',
    definition: 'To politely ask someone to go somewhere or join in an enjoyable activity.',
    sentence: 'I would love to invite all my classmates to my weekend birthday party.',
    georgian: 'დაპატიჟება, მოწვევა',
    phonetic: 'in-VYTE (/ɪnˈvaɪt/)',
    partOfSpeech: 'verb',
    synonyms: ['ask over', 'welcome', 'bid'],
    emoji: '💌',
    questId: 'quest-conversation',
    level: 'A2',
  },
  {
    id: 'borrow',
    word: 'borrow',
    definition: 'To take and use something belonging to someone else with the promise to return it.',
    sentence: 'Can I please borrow your green pencil for our art project?',
    georgian: 'თხოვება, სესხება (აღება)',
    phonetic: 'BOR-oh (/ˈbɑːroʊ/)',
    partOfSpeech: 'verb',
    synonyms: ['take on loan', 'use temporarily'],
    emoji: '🤲',
    questId: 'quest-conversation',
    level: 'A2',
  },
  {
    id: 'lend',
    word: 'lend',
    definition: 'To grant someone the use of something on the agreement that it will be returned.',
    sentence: 'My brother agreed to lend me his umbrella because it was raining.',
    georgian: 'გასესხება, მათხოვრება (მიცემა)',
    phonetic: 'LEND (/lend/)',
    partOfSpeech: 'verb',
    synonyms: ['loan', 'provide', 'give temporarily'],
    emoji: '🤝',
    questId: 'quest-conversation',
    level: 'A2',
  },
  {
    id: 'neighbor',
    word: 'neighbor',
    definition: 'A person living nearby or next door to your house.',
    sentence: 'Our kind neighbor brought over fresh baked cookies to say hello.',
    georgian: 'მეზობელი',
    phonetic: 'NAY-ber (/ˈneɪbər/)',
    partOfSpeech: 'noun',
    synonyms: ['local', 'fellow resident'],
    emoji: '🏡',
    questId: 'quest-conversation',
    level: 'A2',
  },
  {
    id: 'celebrate',
    word: 'celebrate',
    definition: 'To do something special or enjoyable for an important event or holiday.',
    sentence: 'The whole town gathered in the square to celebrate the spring festival.',
    georgian: 'აღნიშვნა, ზეიმი',
    phonetic: 'SEL-uh-brayt (/ˈselɪbreɪt/)',
    partOfSpeech: 'verb',
    synonyms: ['rejoice', 'commemorate', 'cheer'],
    emoji: '🎉',
    questId: 'quest-conversation',
    level: 'A2',
  },
  {
    id: 'polite',
    word: 'polite',
    definition: 'Having or showing respectful, considerate, and courteous manners towards others.',
    sentence: 'It is always polite to say "please" and "thank you" when receiving a gift.',
    georgian: 'თავაზიანი, ზრდილი',
    phonetic: 'puh-LYTE (/pəˈlaɪt/)',
    partOfSpeech: 'adjective',
    synonyms: ['courteous', 'respectful', 'well-mannered'],
    emoji: '🌸',
    questId: 'quest-conversation',
    level: 'A2',
  },
  {
    id: 'apologize',
    word: 'apologize',
    definition: 'To express regret or say sorry for doing something wrong or hurtful.',
    sentence: 'I must apologize for being late to our study group meeting.',
    georgian: 'ბოდიშის მოხდა',
    phonetic: 'uh-POL-uh-jyze (/əˈpɑːlədʒaɪz/)',
    partOfSpeech: 'verb',
    synonyms: ['say sorry', 'express regret'],
    emoji: '🙇',
    questId: 'quest-conversation',
    level: 'A2',
  },
  {
    id: 'suggest',
    word: 'suggest',
    definition: 'To propose an idea, plan, or action for other people to consider.',
    sentence: 'May I suggest we stop for ice cream on our way home?',
    georgian: 'შეთავაზება, რჩევა',
    phonetic: 'suh-JEST (/səɡˈdʒest/)',
    partOfSpeech: 'verb',
    synonyms: ['propose', 'recommend', 'advise'],
    emoji: '💡',
    questId: 'quest-conversation',
    level: 'A2',
  },
  {
    id: 'opinion',
    word: 'opinion',
    definition: 'A personal belief, thought, or viewpoint formed about someone or something.',
    sentence: 'In my opinion, playing outdoor games is the best way to spend sunny afternoons.',
    georgian: 'აზრი, შეხედულება',
    phonetic: 'uh-PIN-yun (/əˈpɪnjən/)',
    partOfSpeech: 'noun',
    synonyms: ['view', 'standpoint', 'belief'],
    emoji: '💭',
    questId: 'quest-conversation',
    level: 'A2',
  },
  {
    id: 'delicious',
    word: 'delicious',
    definition: 'Having a delightful and highly pleasing taste or aroma.',
    sentence: 'The hot homemade soup smelled delicious on a cold windy evening.',
    georgian: 'გემრიელი',
    phonetic: 'dih-LISH-us (/dɪˈlɪʃəs/)',
    partOfSpeech: 'adjective',
    synonyms: ['tasty', 'flavorful', 'yummy'],
    emoji: '🍲',
    questId: 'quest-conversation',
    level: 'A2',
  },
];

// ==========================================
// QUEST 3: BUSINESS AND WORK (B1)
// ==========================================
const QUEST_3_WORDS: WordItem[] = [
  {
    id: 'colleague',
    word: 'colleague',
    definition: 'A person with whom one works alongside in a profession or organization.',
    sentence: 'My colleague and I collaborated on preparing the annual presentation.',
    georgian: 'კოლეგა, თანამშრომელი',
    phonetic: 'KOL-eeg (/ˈkɑːliːɡ/)',
    partOfSpeech: 'noun',
    synonyms: ['coworker', 'associate', 'partner'],
    emoji: '👔',
    questId: 'quest-business',
    level: 'B1',
  },
  {
    id: 'deadline',
    word: 'deadline',
    definition: 'The specified latest time or date by which a project or task must be completed.',
    sentence: 'We worked overtime to ensure our team met Friday\'s strict project deadline.',
    georgian: 'ბოლო ვადა (დედლაინი)',
    phonetic: 'DED-lyne (/ˈdedlaɪn/)',
    partOfSpeech: 'noun',
    synonyms: ['due date', 'time limit', 'cutoff'],
    emoji: '⏰',
    questId: 'quest-business',
    level: 'B1',
  },
  {
    id: 'negotiate',
    word: 'negotiate',
    definition: 'To discuss terms with others in order to reach an agreement or contract.',
    sentence: 'The manager met with the supplier to negotiate a fair price for raw materials.',
    georgian: 'მოლაპარაკების წარმოება',
    phonetic: 'nuh-GOH-shee-ayt (/nɪˈɡoʊʃieɪt/)',
    partOfSpeech: 'verb',
    synonyms: ['bargain', 'confer', 'arbitrate'],
    emoji: '💼',
    questId: 'quest-business',
    level: 'B1',
  },
  {
    id: 'budget',
    word: 'budget',
    definition: 'An estimate of income and planned expenditure over a specified period.',
    sentence: 'The marketing team allocated a generous budget for digital advertising.',
    georgian: 'ბიუჯეტი',
    phonetic: 'BUJ-it (/ˈbʌdʒɪt/)',
    partOfSpeech: 'noun',
    synonyms: ['financial plan', 'allocation', 'funds'],
    emoji: '📊',
    questId: 'quest-business',
    level: 'B1',
  },
  {
    id: 'promote',
    word: 'promote',
    definition: 'To raise someone to a higher position or rank; or to support a product\'s growth.',
    sentence: 'The company decided to promote Elena to senior team director.',
    georgian: 'დაწინაურება',
    phonetic: 'pruh-MOHT (/prəˈmoʊt/)',
    partOfSpeech: 'verb',
    synonyms: ['advance', 'upgrade', 'elevate'],
    emoji: '📈',
    questId: 'quest-business',
    level: 'B1',
  },
  {
    id: 'schedule',
    word: 'schedule',
    definition: 'A timetable of planned events, meetings, or tasks organized by time.',
    sentence: 'The project schedule outlines each milestone from design to final launch.',
    georgian: 'განრიგი, გრაფიკი',
    phonetic: 'SKED-yool (/ˈskedʒuːl/)',
    partOfSpeech: 'noun',
    synonyms: ['timetable', 'agenda', 'calendar'],
    emoji: '🗓️',
    questId: 'quest-business',
    level: 'B1',
  },
  {
    id: 'efficient',
    word: 'efficient',
    definition: 'Achieving maximum productivity with minimum wasted effort, expense, or time.',
    sentence: 'The new digital workflow made team communication substantially more efficient.',
    georgian: 'ეფექტური, ნაყოფიერი',
    phonetic: 'ih-FISH-unt (/ɪˈfɪʃnt/)',
    partOfSpeech: 'adjective',
    synonyms: ['productive', 'streamlined', 'effective'],
    emoji: '⚙️',
    questId: 'quest-business',
    level: 'B1',
  },
  {
    id: 'responsibility',
    word: 'responsibility',
    definition: 'The state or fact of having a duty to manage or take care of something.',
    sentence: 'Managing customer relations is my primary responsibility at the agency.',
    georgian: 'პასუხისმგებლობა',
    phonetic: 'ri-spon-suh-BIL-uh-tee (/rɪˌspɑːnsəˈbɪləti/)',
    partOfSpeech: 'noun',
    synonyms: ['duty', 'obligation', 'task'],
    emoji: '🛡️',
    questId: 'quest-business',
    level: 'B1',
  },
  {
    id: 'contract',
    word: 'contract',
    definition: 'A written or formal legal agreement between two or more parties.',
    sentence: 'Both company executives signed the partnership contract in presence of legal counsel.',
    georgian: 'ხელშეკრულება, კონტრაქტი',
    phonetic: 'KON-trakt (/ˈkɑːntrækt/)',
    partOfSpeech: 'noun',
    synonyms: ['agreement', 'deal', 'accord'],
    emoji: '📜',
    questId: 'quest-business',
    level: 'B1',
  },
  {
    id: 'feedback',
    word: 'feedback',
    definition: 'Helpful criticism or commentary regarding performance or product quality.',
    sentence: 'Constructive client feedback helped us refine and polish the new design.',
    georgian: 'უკუკავშირი',
    phonetic: 'FEED-bak (/ˈfiːdbæk/)',
    partOfSpeech: 'noun',
    synonyms: ['evaluation', 'critique', 'input'],
    emoji: '💬',
    questId: 'quest-business',
    level: 'B1',
  },
];

// ==========================================
// QUEST 4: TECHNOLOGY (B2)
// ==========================================
const QUEST_4_WORDS: WordItem[] = [
  {
    id: 'algorithm',
    word: 'algorithm',
    definition: 'A step-by-step procedure or set of computational rules for solving a specific problem.',
    sentence: 'The search engine uses a sophisticated ranking algorithm to deliver relevant results.',
    georgian: 'ალგორითმი',
    phonetic: 'AL-guh-rith-um (/ˈælɡərɪðəm/)',
    partOfSpeech: 'noun',
    synonyms: ['procedure', 'formula', 'logic routine'],
    emoji: '🔢',
    questId: 'quest-technology',
    level: 'B2',
  },
  {
    id: 'cybersecurity',
    word: 'cybersecurity',
    definition: 'The practices and technologies designed to defend networks and data from attacks.',
    sentence: 'Banks invest millions in cybersecurity to shield customer accounts from hackers.',
    georgian: 'კიბერუსაფრთხოება',
    phonetic: 'SY-ber-suh-kyoor-i-tee (/ˌsaɪbərsɪˈkjʊrəti/)',
    partOfSpeech: 'noun',
    synonyms: ['digital defense', 'information security'],
    emoji: '🔐',
    questId: 'quest-technology',
    level: 'B2',
  },
  {
    id: 'innovative',
    word: 'innovative',
    definition: 'Introducing pioneering methods, novel concepts, or inventive technologies.',
    sentence: 'The tech startup launched an innovative solar-powered battery for laptops.',
    georgian: 'ინოვაციური, სიახლის მომტანი',
    phonetic: 'IN-oh-vay-tiv (/ˈɪnəveɪtɪv/)',
    partOfSpeech: 'adjective',
    synonyms: ['groundbreaking', 'cutting-edge', 'inventive'],
    emoji: '🚀',
    questId: 'quest-technology',
    level: 'B2',
  },
  {
    id: 'bandwidth',
    word: 'bandwidth',
    definition: 'The maximum rate of data transfer across a network or communication channel.',
    sentence: 'Streaming ultra-high-definition video requires substantial internet bandwidth.',
    georgian: 'გამტარუნარიანობა (სიხშირის ზოლი)',
    phonetic: 'BAND-width (/ˈbændwɪdθ/)',
    partOfSpeech: 'noun',
    synonyms: ['capacity', 'data rate', 'throughput'],
    emoji: '📶',
    questId: 'quest-technology',
    level: 'B2',
  },
  {
    id: 'interface',
    word: 'interface',
    definition: 'The visual layout and interactive controls through which a human operates software.',
    sentence: 'The mobile app features an intuitive touchscreen interface for effortless navigation.',
    georgian: 'ინტერფეისი',
    phonetic: 'IN-ter-fays (/ˈɪntərfeɪs/)',
    partOfSpeech: 'noun',
    synonyms: ['UI', 'dashboard', 'control panel'],
    emoji: '🖥️',
    questId: 'quest-technology',
    level: 'B2',
  },
  {
    id: 'encrypt',
    word: 'encrypt',
    definition: 'To convert digital information into unreadable ciphertext to prevent eavesdropping.',
    sentence: 'Messaging applications automatically encrypt all personal chats end-to-end.',
    georgian: 'დაშიფვრა',
    phonetic: 'en-KRIPT (/ɪnˈkrɪpt/)',
    partOfSpeech: 'verb',
    synonyms: ['encode', 'cipher', 'scramble'],
    emoji: '🔒',
    questId: 'quest-technology',
    level: 'B2',
  },
  {
    id: 'automated',
    word: 'automated',
    definition: 'Operated by computerized machinery and autonomous algorithms with minimal human intervention.',
    sentence: 'Modern factories rely on automated robotic arms to assemble vehicle components.',
    georgian: 'ავტომატიზებული',
    phonetic: 'AW-tuh-may-tid (/ˈɔːtəmeɪtɪd/)',
    partOfSpeech: 'adjective',
    synonyms: ['robotic', 'computerized', 'autonomous'],
    emoji: '🤖',
    questId: 'quest-technology',
    level: 'B2',
  },
  {
    id: 'database',
    word: 'database',
    definition: 'An organized, indexed electronic repository of data that can be queried rapidly.',
    sentence: 'The student records are stored securely in a relational cloud database.',
    georgian: 'მონაცემთა ბაზა',
    phonetic: 'DAY-tuh-bays (/ˈdeɪtəbeɪs/)',
    partOfSpeech: 'noun',
    synonyms: ['data bank', 'repository', 'archive'],
    emoji: '🗄️',
    questId: 'quest-technology',
    level: 'B2',
  },
  {
    id: 'wireless',
    word: 'wireless',
    definition: 'Transmitting signals and data over electromagnetic waves rather than physical cables.',
    sentence: 'The classroom is equipped with fast wireless broadband for all student tablets.',
    georgian: 'უსადენო',
    phonetic: 'WYRE-lus (/ˈwaɪərləs/)',
    partOfSpeech: 'adjective',
    synonyms: ['cordless', 'Wi-Fi', 'cellular'],
    emoji: '📡',
    questId: 'quest-technology',
    level: 'B2',
  },
  {
    id: 'compatible',
    word: 'compatible',
    definition: 'Able to coexist or function seamlessly together without hardware or software conflicts.',
    sentence: 'Ensure the wireless headphones are compatible with your current operating system.',
    georgian: 'თავსებადი',
    phonetic: 'kum-PAT-uh-bul (/kəmˈpætəbl/)',
    partOfSpeech: 'adjective',
    synonyms: ['interoperable', 'adaptable', 'congruent'],
    emoji: '🔌',
    questId: 'quest-technology',
    level: 'B2',
  },
];

// ==========================================
// QUEST 5: NATURE AND SCIENCE (C1)
// ==========================================
const QUEST_5_WORDS: WordItem[] = [
  {
    id: 'biodiversity',
    word: 'biodiversity',
    definition: 'The ecological variety and variability of organisms, species, and ecosystems on Earth.',
    sentence: 'Tropical rainforests harbor unparalleled biodiversity critical for biosphere stability.',
    georgian: 'ბიომრავალფეროვნება',
    phonetic: 'by-oh-dy-VER-suh-tee (/ˌbaɪoʊdaɪˈvɜːrsəti/)',
    partOfSpeech: 'noun',
    synonyms: ['ecological diversity', 'species richness'],
    emoji: '🌿',
    questId: 'quest-science',
    level: 'C1',
  },
  {
    id: 'hypothesis',
    word: 'hypothesis',
    definition: 'A proposed empirical explanation tested through rigorous scientific experimentation.',
    sentence: 'The laboratory team devised an experiment to test their revolutionary genetic hypothesis.',
    georgian: 'ჰიპოთეზა',
    phonetic: 'hy-POTH-uh-sis (/haɪˈpɑːθəsɪs/)',
    partOfSpeech: 'noun',
    synonyms: ['supposition', 'postulate', 'theory premise'],
    emoji: '🔬',
    questId: 'quest-science',
    level: 'C1',
  },
  {
    id: 'equilibrium',
    word: 'equilibrium',
    definition: 'A state in which opposing forces, reactions, or ecological factors are perfectly balanced.',
    sentence: 'Predator and prey populations maintain dynamic equilibrium across the arctic tundra.',
    georgian: 'წონასწორობა, ბალანსი',
    phonetic: 'ee-kwuh-LIB-ree-um (/ˌiːkwɪˈlɪbriəm/)',
    partOfSpeech: 'noun',
    synonyms: ['balance', 'homeostasis', 'symmetry'],
    emoji: '⚖️',
    questId: 'quest-science',
    level: 'C1',
  },
  {
    id: 'photosynthesis',
    word: 'photosynthesis',
    definition: 'The biochemical process by which plants use sunlight to synthesize glucose from carbon dioxide.',
    sentence: 'Marine phytoplankton produce the majority of atmospheric oxygen through photosynthesis.',
    georgian: 'ფოტოსინთეზი',
    phonetic: 'foh-toh-SIN-thuh-sis (/ˌfoʊtoʊˈsɪnθəsɪs/)',
    partOfSpeech: 'noun',
    synonyms: ['light synthesis', 'autotrophic assimilation'],
    emoji: '☀️',
    questId: 'quest-science',
    level: 'C1',
  },
  {
    id: 'ecosystem',
    word: 'ecosystem',
    definition: 'A biological community of interacting flora and fauna intertwined with their physical habitat.',
    sentence: 'Coral reefs constitute one of the most fragile aquatic ecosystems on our planet.',
    georgian: 'ეკოსისტემა',
    phonetic: 'EE-koh-sis-tum (/ˈiːkoʊsɪstəm/)',
    partOfSpeech: 'noun',
    synonyms: ['biome', 'ecological niche', 'biosphere'],
    emoji: '🌊',
    questId: 'quest-science',
    level: 'C1',
  },
  {
    id: 'phenomenon',
    word: 'phenomenon',
    definition: 'A remarkable observable natural occurrence or circumstance that manifests empirically.',
    sentence: 'The Aurora Borealis is a breathtaking celestial phenomenon caused by solar particles.',
    georgian: 'ფენომენი, მოვლენა',
    phonetic: 'fuh-NOM-uh-non (/fəˈnɑːmɪnən/)',
    partOfSpeech: 'noun',
    synonyms: ['occurrence', 'marvel', 'manifestation'],
    emoji: '🌌',
    questId: 'quest-science',
    level: 'C1',
  },
  {
    id: 'sustainable',
    word: 'sustainable',
    definition: 'Capable of being maintained over time without depleting natural ecological resources.',
    sentence: 'Harnessing geothermal and wind power is essential for creating sustainable cities.',
    georgian: 'მდგრადი, ეკოლოგიურად უსაფრთხო',
    phonetic: 'suh-STAY-nuh-bul (/səˈsteɪnəbl/)',
    partOfSpeech: 'adjective',
    synonyms: ['renewable', 'viable', 'eco-friendly'],
    emoji: '♻️',
    questId: 'quest-science',
    level: 'C1',
  },
  {
    id: 'celestial',
    word: 'celestial',
    definition: 'Pertaining to astronomical bodies in outer space such as stars, planets, and galaxies.',
    sentence: 'Astronomers used the orbital telescope to observe celestial collisions in distant nebulae.',
    georgian: 'ციური, კოსმოსური',
    phonetic: 'suh-LES-chul (/səˈlestʃl/)',
    partOfSpeech: 'adjective',
    synonyms: ['astronomical', 'stellar', 'cosmic'],
    emoji: '✨',
    questId: 'quest-science',
    level: 'C1',
  },
  {
    id: 'resilience',
    word: 'resilience',
    definition: 'The capacity of an organism, habitat, or ecosystem to recover swiftly from disturbances.',
    sentence: 'The coastal mangrove forest demonstrated remarkable resilience following the tempest.',
    georgian: 'გამძლეობა, მდგრადობა',
    phonetic: 'ri-ZIL-yunce (/rɪˈzɪliəns/)',
    partOfSpeech: 'noun',
    synonyms: ['hardiness', 'durability', 'elasticity'],
    emoji: '🌱',
    questId: 'quest-science',
    level: 'C1',
  },
  {
    id: 'metamorphosis',
    word: 'metamorphosis',
    definition: 'A striking structural transformation that an organism undergoes from immature to adult form.',
    sentence: 'The caterpillar underwent complete biological metamorphosis inside its protective chrysalis.',
    georgian: 'მეტამორფოზა, სახეცვლილება',
    phonetic: 'met-uh-MOR-fuh-sis (/ˌmetəˈmɔːrfəsɪs/)',
    partOfSpeech: 'noun',
    synonyms: ['transformation', 'transmutation', 'evolution'],
    emoji: '🦋',
    questId: 'quest-science',
    level: 'C1',
  },
];

// Combine all 50 words into master vocabulary list
export const VOCABULARY_LIST: WordItem[] = [
  ...QUEST_1_WORDS,
  ...QUEST_2_WORDS,
  ...QUEST_3_WORDS,
  ...QUEST_4_WORDS,
  ...QUEST_5_WORDS,
];

// Helper to generate definition questions for any quest word set
function generateDefinitionQuestions(words: WordItem[]): DefinitionQuestion[] {
  return words.map((w, index) => {
    // Pick two distractors from other words in the same set or other sets
    const otherWords = words.filter((item) => item.id !== w.id);
    const d1 = otherWords[(index + 1) % otherWords.length];
    const d2 = otherWords[(index + 2) % otherWords.length];

    const options = [
      {
        text: w.definition,
        isCorrect: true,
        explanation: `Correct! "${w.word}" means ${w.definition.toLowerCase()}`,
      },
      {
        text: d1.definition,
        isCorrect: false,
        explanation: `Not quite! That is the definition for "${d1.word}". "${w.word}" means ${w.definition.toLowerCase()}`,
      },
      {
        text: d2.definition,
        isCorrect: false,
        explanation: `Not quite! That describes "${d2.word}". "${w.word}" means ${w.definition.toLowerCase()}`,
      },
    ];

    // Shuffle options predictably
    const shuffled = [options[(index * 2) % 3], options[(index * 2 + 1) % 3], options[(index * 2 + 2) % 3]];

    return {
      id: `def-${w.id}`,
      wordId: w.id,
      word: w.word,
      options: shuffled,
    };
  });
}

// Helper to generate sentence questions for any quest word set
function generateSentenceQuestions(words: WordItem[]): SentenceQuestion[] {
  return words.map((w, index) => {
    // Extract before and after blank from the sentence
    const regex = new RegExp(`\\b${w.word}\\b`, 'i');
    const match = w.sentence.match(regex);
    let before = 'In our quest, we need to ';
    let after = ' before continuing.';
    if (match && match.index !== undefined) {
      before = w.sentence.slice(0, match.index).trim();
      after = w.sentence.slice(match.index + match[0].length).trim();
    }

    const otherWords = words.filter((item) => item.id !== w.id);
    const d1 = otherWords[(index + 1) % otherWords.length].word;
    const d2 = otherWords[(index + 3) % otherWords.length].word;

    const rawOptions = [
      { word: w.word, isCorrect: true, explanation: `"${w.word}" fits the context and meaning of the sentence perfectly.` },
      { word: d1, isCorrect: false, explanation: `"${d1}" does not fit the semantic context here.` },
      { word: d2, isCorrect: false, explanation: `"${d2}" does not make grammatical or contextual sense here.` },
    ];

    const shuffled = [rawOptions[(index + 1) % 3], rawOptions[(index + 2) % 3], rawOptions[index % 3]];

    return {
      id: `sent-${w.id}`,
      targetWord: w.word,
      sentenceBefore: before,
      sentenceAfter: after,
      fullSentence: w.sentence,
      georgianHint: `მინიშნება: ${w.georgian}`,
      options: shuffled,
    };
  });
}

// ==========================================
// ALL 5 QUEST DEFINITIONS
// ==========================================
export const QUESTS: QuestInfo[] = [
  {
    id: 'quest-travel',
    title: 'Travel Quest',
    subtitle: 'Voyager\'s Bay Expedition',
    theme: 'Travel',
    level: 'A1',
    levelBadgeColor: 'from-emerald-400 to-teal-500',
    badgeBg: 'bg-emerald-950/80',
    badgeBorder: 'border-emerald-500/50',
    badgeText: 'text-emerald-300',
    description: 'Learn fundamental travel vocabulary: tickets, airports, hotels, and navigation on the open sea.',
    islandName: 'Voyager\'s Bay',
    islandEmoji: '🏝️',
    order: 1,
    xpReward: 250,
    mapCoord: { x: 200, y: 320 },
    words: QUEST_1_WORDS,
    definitionQuestions: generateDefinitionQuestions(QUEST_1_WORDS),
    sentenceQuestions: generateSentenceQuestions(QUEST_1_WORDS),
    story: {
      title: 'The Voyage to Coral Harbor',
      subtitle: 'A travel chronicle in Voyager\'s Bay',
      introduction: 'Two eager backpackers gathered their belongings at dawn to embark on an unforgettable cross-island journey...',
      segments: [
        {
          id: 'story-travel-1',
          before: 'Before boarding the ferry, the traveler showed her validation',
          gapWord: 'ticket',
          after: 'to the harbor officer at the gate.',
          georgianHint: 'ბილეთი (document to board)',
          choices: ['ticket', 'airport', 'hotel'],
          explanation: 'You present a "ticket" to board transport!',
        },
        {
          id: 'story-travel-2',
          before: 'Inside her backpack, she kept her official international',
          gapWord: 'passport',
          after: 'safe and dry in a waterproof pouch.',
          georgianHint: 'პასპორტი (citizenship ID booklet)',
          choices: ['passport', 'station', 'map'],
          explanation: 'An international traveler requires a "passport"!',
        },
        {
          id: 'story-travel-3',
          before: 'The crew assisted with loading all the heavy traveler',
          gapWord: 'luggage',
          after: 'neatly onto the cargo hold of the vessel.',
          georgianHint: 'ბარგი (suitcases and bags)',
          choices: ['tourist', 'luggage', 'hotel'],
          explanation: 'Suitcases and packed bags are called "luggage"!',
        },
        {
          id: 'story-travel-4',
          before: 'They were scheduled to cross the blue bay and',
          gapWord: 'arrive',
          after: 'at the sunny coastal town by midday.',
          georgianHint: 'ჩამოსვლა (reach the destination)',
          choices: ['depart', 'arrive', 'ticket'],
          explanation: 'Reaching a destination is to "arrive"!',
        },
        {
          id: 'story-travel-5',
          before: 'Upon reaching the shore, they unfolded their colorful pocket',
          gapWord: 'map',
          after: 'to locate their reserved seaside hotel.',
          georgianHint: 'რუკა (visual chart of roads)',
          choices: ['airport', 'map', 'station'],
          explanation: 'A visual guide to roads and routes is a "map"!',
        },
      ],
      conclusion: 'With tickets validated, luggage safely unloaded, and maps in hand, our adventurers enjoyed a spectacular holiday in Voyager\'s Bay!',
    },
  },
  {
    id: 'quest-conversation',
    title: 'Daily Conversation',
    subtitle: 'Sunlit Commons Dialogue',
    theme: 'Daily Conversation',
    level: 'A2',
    levelBadgeColor: 'from-cyan-400 to-blue-500',
    badgeBg: 'bg-cyan-950/80',
    badgeBorder: 'border-cyan-500/50',
    badgeText: 'text-cyan-300',
    description: 'Master everyday social dialogues: invitations, polite requests, celebrating holidays, and sharing friendly opinions.',
    islandName: 'Sunlit Commons',
    islandEmoji: '🏡',
    order: 2,
    xpReward: 300,
    requiredQuestId: 'quest-travel',
    mapCoord: { x: 390, y: 190 },
    words: QUEST_2_WORDS,
    definitionQuestions: generateDefinitionQuestions(QUEST_2_WORDS),
    sentenceQuestions: generateSentenceQuestions(QUEST_2_WORDS),
    story: {
      title: 'The Great Neighborhood Festival',
      subtitle: 'A tale of camaraderie in Sunlit Commons',
      introduction: 'Every summer, the lively community of Sunlit Commons gathers in the town park to share food and friendship...',
      segments: [
        {
          id: 'story-conv-1',
          before: 'Niko walked from house to house to warmly',
          gapWord: 'invite',
          after: 'every family on the block to the picnic.',
          georgianHint: 'დაპატიჟება (politely ask to come)',
          choices: ['invite', 'apologize', 'borrow'],
          explanation: 'To ask someone to an event is to "invite" them!',
        },
        {
          id: 'story-conv-2',
          before: 'Their cheerful next-door',
          gapWord: 'neighbor',
          after: 'offered to bring wooden folding tables and fresh lemonade.',
          georgianHint: 'მეზობელი (person living near you)',
          choices: ['neighbor', 'opinion', 'polite'],
          explanation: 'A person living nearby is your "neighbor"!',
        },
        {
          id: 'story-conv-3',
          before: 'The village bakers gathered at the pavilion to',
          gapWord: 'celebrate',
          after: 'the harvest with songs, folk dances, and cheerful toasts.',
          georgianHint: 'აღნიშვნა (rejoice in an event)',
          choices: ['celebrate', 'lend', 'suggest'],
          explanation: 'To honor and enjoy a special occasion is to "celebrate"!',
        },
        {
          id: 'story-conv-4',
          before: 'It is always good manners to speak in a',
          gapWord: 'polite',
          after: 'and kind tone when talking with elders.',
          georgianHint: 'თავაზიანი (respectful and courteous)',
          choices: ['polite', 'delicious', 'neighbor'],
          explanation: 'Showing respectful courtesy is being "polite"!',
        },
        {
          id: 'story-conv-5',
          before: 'Everyone agreed that the grandmother\'s apple pie was truly',
          gapWord: 'delicious',
          after: 'and flavorful down to the very last crumb.',
          georgianHint: 'გემრიელი (highly pleasing taste)',
          choices: ['delicious', 'opinion', 'apologize'],
          explanation: 'Food with a wonderful taste is "delicious"!',
        },
      ],
      conclusion: 'The Sunlit Commons festival brought neighbors together through polite chats, shared laughter, and unforgettable celebrations!',
    },
  },
  {
    id: 'quest-business',
    title: 'Business and Work',
    subtitle: 'Merchant\'s Reach Enterprise',
    theme: 'Business and Work',
    level: 'B1',
    levelBadgeColor: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-950/80',
    badgeBorder: 'border-blue-500/50',
    badgeText: 'text-blue-300',
    description: 'Navigate professional workplace English: deadlines, meetings, negotiation, budgets, contracts, and team efficiency.',
    islandName: 'Merchant\'s Reach',
    islandEmoji: '🏛️',
    order: 3,
    xpReward: 350,
    requiredQuestId: 'quest-conversation',
    mapCoord: { x: 580, y: 380 },
    words: QUEST_3_WORDS,
    definitionQuestions: generateDefinitionQuestions(QUEST_3_WORDS),
    sentenceQuestions: generateSentenceQuestions(QUEST_3_WORDS),
    story: {
      title: 'The Guild Trade Agreement',
      subtitle: 'A commercial saga in Merchant\'s Reach',
      introduction: 'The trade council of Merchant\'s Reach convened to launch an ambitious maritime trade network across the archipelago...',
      segments: [
        {
          id: 'story-bus-1',
          before: 'The senior architect collaborated closely with each trusted',
          gapWord: 'colleague',
          after: 'on the engineering blueprint.',
          georgianHint: 'თანამშრომელი (work associate)',
          choices: ['colleague', 'budget', 'deadline'],
          explanation: 'An associate you work alongside is a "colleague"!',
        },
        {
          id: 'story-bus-2',
          before: 'With only two days left before the shipping',
          gapWord: 'deadline',
          after: ', the harbor logistics staff worked around the clock.',
          georgianHint: 'ბოლო ვადა (cutoff date)',
          choices: ['deadline', 'feedback', 'contract'],
          explanation: 'A time limit for completion is a "deadline"!',
        },
        {
          id: 'story-bus-3',
          before: 'The chief merchant stepped into the conference room to',
          gapWord: 'negotiate',
          after: 'favorable tariffs with international partners.',
          georgianHint: 'მოლაპარაკების წარმოება (discuss terms)',
          choices: ['negotiate', 'promote', 'schedule'],
          explanation: 'Discussing to reach an agreement is to "negotiate"!',
        },
        {
          id: 'story-bus-4',
          before: 'Thanks to modern steam cranes, loading cargo was remarkably',
          gapWord: 'efficient',
          after: 'and finished three hours ahead of schedule.',
          georgianHint: 'ეფექტური (productive with minimum waste)',
          choices: ['efficient', 'budget', 'colleague'],
          explanation: 'Maximizing productivity with minimal wasted time is "efficient"!',
        },
        {
          id: 'story-bus-5',
          before: 'Both trade delegations celebrated by formally signing the bilateral',
          gapWord: 'contract',
          after: 'under the watchful eye of the notary.',
          georgianHint: 'ხელშეკრულება (binding legal agreement)',
          choices: ['contract', 'responsibility', 'feedback'],
          explanation: 'A legally binding agreement is a "contract"!',
        },
      ],
      conclusion: 'Through meticulous scheduling, careful budget analysis, and sharp negotiations, Merchant\'s Reach secured prosperity for the entire realm!',
    },
  },
  {
    id: 'quest-technology',
    title: 'Technology Quest',
    subtitle: 'Silicon Spire Breakthrough',
    theme: 'Technology',
    level: 'B2',
    levelBadgeColor: 'from-purple-500 to-fuchsia-600',
    badgeBg: 'bg-purple-950/80',
    badgeBorder: 'border-purple-500/50',
    badgeText: 'text-purple-300',
    description: 'Explore the high-tech frontier: algorithms, encryption, cloud databases, wireless bandwidth, and cybersecurity systems.',
    islandName: 'Silicon Spire',
    islandEmoji: '⚡',
    order: 4,
    xpReward: 400,
    requiredQuestId: 'quest-business',
    mapCoord: { x: 740, y: 190 },
    words: QUEST_4_WORDS,
    definitionQuestions: generateDefinitionQuestions(QUEST_4_WORDS),
    sentenceQuestions: generateSentenceQuestions(QUEST_4_WORDS),
    story: {
      title: 'The Quantum Core Protocol',
      subtitle: 'A digital expedition atop Silicon Spire',
      introduction: 'High above the clouds, inside the glowing cleanrooms of Silicon Spire, engineers activated the continent\'s first quantum relay...',
      segments: [
        {
          id: 'story-tech-1',
          before: 'The research team programmed a mathematical',
          gapWord: 'algorithm',
          after: 'to optimize data distribution across thousands of servers.',
          georgianHint: 'ალგორითმი (step-by-step logic rules)',
          choices: ['algorithm', 'interface', 'bandwidth'],
          explanation: 'A computational step-by-step procedure is an "algorithm"!',
        },
        {
          id: 'story-tech-2',
          before: 'To safeguard confidential communications, technicians decided to',
          gapWord: 'encrypt',
          after: 'every outgoing transmission with 256-bit keys.',
          georgianHint: 'დაშიფვრა (convert into secret code)',
          choices: ['encrypt', 'automated', 'wireless'],
          explanation: 'Converting data into secure code is to "encrypt" it!',
        },
        {
          id: 'story-tech-3',
          before: 'The network required ultra-broad high-frequency',
          gapWord: 'bandwidth',
          after: 'to handle simultaneous planetary telemetry streams.',
          georgianHint: 'გამტარუნარიანობა (data transfer capacity)',
          choices: ['bandwidth', 'database', 'cybersecurity'],
          explanation: 'The capacity of a data transmission channel is "bandwidth"!',
        },
        {
          id: 'story-tech-4',
          before: 'Specialists tested rigorous protocols in',
          gapWord: 'cybersecurity',
          after: 'to prevent rogue botnets from compromising the mainframe.',
          georgianHint: 'კიბერუსაფრთხოება (defense against cyber attacks)',
          choices: ['cybersecurity', 'interface', 'algorithm'],
          explanation: 'Defending networks from malicious intrusions is "cybersecurity"!',
        },
        {
          id: 'story-tech-5',
          before: 'All sensors and robotic terminals were verified to be fully',
          gapWord: 'compatible',
          after: 'with the next-generation operating system.',
          georgianHint: 'თავსებადი (able to work together smoothly)',
          choices: ['compatible', 'automated', 'encrypt'],
          explanation: 'Devices able to function harmoniously together are "compatible"!',
        },
      ],
      conclusion: 'With encrypted channels, innovative software interfaces, and robust cybersecurity, Silicon Spire ushered in an era of technological wonder!',
    },
  },
  {
    id: 'quest-science',
    title: 'Nature and Science',
    subtitle: 'Cosmic Caldera Discovery',
    theme: 'Nature and Science',
    level: 'C1',
    levelBadgeColor: 'from-amber-400 to-yellow-500',
    badgeBg: 'bg-amber-950/80',
    badgeBorder: 'border-amber-500/50',
    badgeText: 'text-amber-300',
    description: 'Master advanced scientific and ecological vocabulary: biodiversity, dynamic equilibrium, astrophysics, and environmental resilience.',
    islandName: 'Cosmic Caldera',
    islandEmoji: '🌌',
    order: 5,
    xpReward: 500,
    requiredQuestId: 'quest-technology',
    mapCoord: { x: 830, y: 440 },
    words: QUEST_5_WORDS,
    definitionQuestions: generateDefinitionQuestions(QUEST_5_WORDS),
    sentenceQuestions: generateSentenceQuestions(QUEST_5_WORDS),
    story: {
      title: 'The Astral Biosphere Expedition',
      subtitle: 'A scientific odyssey inside Cosmic Caldera',
      introduction: 'At the geothermal rim of Cosmic Caldera, international naturalists discovered a subterranean biosphere untouched for eons...',
      segments: [
        {
          id: 'story-sci-1',
          before: 'The valley exhibited an astonishing degree of rich',
          gapWord: 'biodiversity',
          after: ', home to hundreds of undiscovered botanical varieties.',
          georgianHint: 'ბიომრავალფეროვნება (variety of life forms)',
          choices: ['biodiversity', 'hypothesis', 'equilibrium'],
          explanation: 'A wide variety of plant and animal species is "biodiversity"!',
        },
        {
          id: 'story-sci-2',
          before: 'The chief botanist formulated a testable scientific',
          gapWord: 'hypothesis',
          after: 'concerning how cave ferns captured radiant crystal energy.',
          georgianHint: 'ჰიპოთეზა (proposed scientific explanation)',
          choices: ['hypothesis', 'phenomenon', 'ecosystem'],
          explanation: 'A proposed explanation tested by experiment is a "hypothesis"!',
        },
        {
          id: 'story-sci-3',
          before: 'Even in low light, specialized moss conducted slow',
          gapWord: 'photosynthesis',
          after: 'to convert subterranean radiation into vital carbohydrates.',
          georgianHint: 'ფოტოსინთეზი (light-driven energy conversion)',
          choices: ['photosynthesis', 'resilience', 'sustainable'],
          explanation: 'Synthesizing chemical energy from light is "photosynthesis"!',
        },
        {
          id: 'story-sci-4',
          before: 'The entire subterranean cavern constituted a self-contained',
          gapWord: 'ecosystem',
          after: 'with its own water cycles, nutrients, and microclimate.',
          georgianHint: 'ეკოსისტემა (biological community & habitat)',
          choices: ['ecosystem', 'celestial', 'equilibrium'],
          explanation: 'A community of organisms interacting with their physical habitat is an "ecosystem"!',
        },
        {
          id: 'story-sci-5',
          before: 'Above the caldera opening, the stargazers gazed upon a rare',
          gapWord: 'celestial',
          after: 'alignment of luminous planets across the twilight horizon.',
          georgianHint: 'ციური / კოსმოსური (astronomical / heavenly)',
          choices: ['celestial', 'sustainable', 'metamorphosis'],
          explanation: 'Events and objects observed in outer space are "celestial"!',
        },
      ],
      conclusion: 'The expedition unraveled mysteries of natural resilience, biological equilibrium, and celestial physics, advancing scientific knowledge for all humanity!',
    },
  },
];

export function getQuestById(questId: string): QuestInfo | undefined {
  return QUESTS.find((q) => q.id === questId);
}
