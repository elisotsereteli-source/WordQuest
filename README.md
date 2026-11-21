# WordQuest 🧭⚔️
> **"Learn words. Explore worlds. Complete quests."**

WordQuest is a modern, playful, polished English vocabulary learning adventure game designed for school students. It transforms traditional vocabulary study into an interactive fantasy quest where players explore uncharted islands, master 10 essential vocabulary words, conquer 4 diverse challenges, earn XP, and unlock badges.

---

## 🌟 Key Features

### 1. Adventure Game Design & Atmosphere
- **Fantasy World Map**: An interactive illustrated world map of *The Whispering Archipelago*, featuring islands, landmarks, ocean currents, and waypoint beacons.
- **Harmonious Palette**: Deep navy blues, luminous turquoise, royal purple, and warm gold accents with accessible contrast.
- **Playful Animation & Polish**: Gentle floating animations, interactive card pop effects, celebratory confetti explosions, and sound feedback.
- **Accessible & Responsive**: Fully responsive across mobile phones, tablets, and desktop computers.

### 2. The 10 Target Words ("The Lost Words" Quest)
Each vocabulary word features:
- Word title and part of speech (`verb`, `noun`, `adjective`)
- Simple, clear English definition
- Adventure context example sentence
- **Georgian translation (ქართული თარგმანით)** for bilingual scaffolding
- Pronunciation phonetic guide (e.g., `ik-SPLOR (/ɪkˈsplɔːr/)`)
- Interactive **Text-to-Speech audio** (Web Speech API) with slow, clear pronunciation

| Word | Part of Speech | Georgian Meaning | Pronunciation |
| :--- | :--- | :--- | :--- |
| **explore** | verb | გამოკვლევა, დაზვერვა | `ik-SPLOR (/ɪkˈsplɔːr/)` |
| **discover** | verb | აღმოჩენა, პოვნა | `dih-SKUV-er (/dɪˈskʌvər/)` |
| **ancient** | adjective | უძველესი, ძველი | `EYN-shunt (/ˈeɪnʃənt/)` |
| **brave** | adjective | მამაცი, გაბედული | `BRAYV (/breɪv/)` |
| **journey** | noun | მოგზაურობა | `JUR-nee (/ˈdʒɜːrni/)` |
| **mysterious** | adjective | იდუმალი, ამოუცნობი | `mi-STEER-ee-us (/mɪˈstɪəriəs/)` |
| **treasure** | noun | განძი | `TREZH-er (/ˈtreʒər/)` |
| **whisper** | verb | ჩურჩული | `WISS-per (/ˈwɪspər/)` |
| **survive** | verb | გადარჩენა | `ser-VYV (/sərˈvaɪv/)` |
| **hidden** | adjective | დამალული, დაფარული | `HID-n (/ˈhɪdn/)` |

---

### 3. Four Interactive Gameplay Challenges
1. **Challenge 1 — Discover the Word**:
   - Inspect the target word with audio pronunciation and optional Georgian hint.
   - Choose the correct definition among 3 possible options.
   - Immediate educational feedback with cheerful sounds for correct answers and encouraging explanations for mistakes.
2. **Challenge 2 — Complete the Sentence**:
   - Complete contextual sentences with missing blanks (`[ _____ ]`).
   - Listen to sentences read aloud with speech synthesis.
   - Select the fitting word among 3 choices with immediate feedback.
3. **Challenge 3 — Word Match**:
   - Fast, tactile matching game.
   - Connect vocabulary words on the left with their definitions on the right.
   - Instant visual pairing effects, chimes, and smooth two-round progression.
4. **Challenge 4 — Quest Adventure Story ("The Legend of the Sunken Temple")**:
   - Read an illustrated chronicle with multiple story chapters.
   - Solve gaps in the narrative using vocabulary knowledge to unlock the legendary sunken treasure.

---

### 4. Rewards & Persistence
- **Experience Points (XP) & Levels**:
  - Earn +25 to +40 XP per challenge activity.
  - Level up from *Novice Explorer* to *Master Adventurer* and *Legend of WordQuest*.
- **Trophy Room & Badges**:
  - *First Expedition*, *Word Master*, *Grand Chronicler*, *Flawless Seeker*, *Treasury of Knowledge*, and *Pairing Prodigy*.
- **Victory Screen**:
  - Confetti celebration, star rating (1–3 stars), score recap, and full 10-word vocabulary review.
- **Local Storage Persistence**:
  - Automatically saves player level, XP, completed quests, custom character name, chosen avatar emblem, and unlocked badges across page reloads.

---

### 5. Web Audio & Speech Synthesizer
- Built-in Web Audio API tone synthesizer (chimes, clicks, fanfare, and gentle cues) that requires **zero external MP3 files or network calls**.
- Speech synthesis using `window.speechSynthesis` for native English audio pronunciation.
- One-click Sound Mute/Unmute toggle in the top navigation bar.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18+ or 20+)
- npm or pnpm or yarn

### Installation & Run

1. Clone or navigate to the repository folder:
   ```bash
   cd WordQuest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at the displayed local URL (typically `http://localhost:5173/`).

### Building for Production
To generate an optimized production build:
```bash
npm run build
```
Preview the built app locally:
```bash
npm run preview
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Celebration FX**: Canvas Confetti
- **Audio**: Web Audio API + Web Speech API (offline-friendly)
