import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Sparkles, Volume2, RotateCcw, Home, CheckCircle2, ChevronRight } from 'lucide-react';
import type { QuestInfo } from '../data/vocabulary';
import { sound } from '../utils/audio';
import { calculateLevel } from '../utils/storage';

interface QuestCompletionProps {
  quest: QuestInfo;
  score: number;
  totalErrors: number;
  newXp: number;
  unlockedNextQuest?: QuestInfo;
  onPlayAgain: () => void;
  onBackToHome: () => void;
  onStartNextQuest?: (questId: string) => void;
  onOpenCodex: (levelFilter?: string) => void;
}

export const QuestCompletion: React.FC<QuestCompletionProps> = ({
  quest,
  score,
  totalErrors,
  newXp,
  unlockedNextQuest,
  onPlayAgain,
  onBackToHome,
  onStartNextQuest,
  onOpenCodex,
}) => {
  useEffect(() => {
    // Play celebratory victory fanfare
    sound.playFanfare();

    // Trigger confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#F59E0B', '#FBBF24', '#FEF08A'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#06B6D4', '#22D3EE', '#67E8F9'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#8B5CF6', '#A855F7', '#C084FC'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  // Calculate stars
  let stars = 3;
  if (totalErrors > 4) stars = 1;
  else if (totalErrors > 1) stars = 2;

  const levelInfo = calculateLevel(newXp);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pop">
      {/* Victory Banner */}
      <div className="card-quest p-8 sm:p-10 text-center relative overflow-hidden border-2 border-amber-400 bg-gradient-to-b from-slate-900 via-indigo-950/60 to-purple-950/80 shadow-2xl">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 border-4 border-amber-200 shadow-xl shadow-amber-500/40 flex items-center justify-center text-4xl sm:text-5xl animate-bounce-slow">
            {quest.islandEmoji}
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs sm:text-sm font-black uppercase tracking-widest">
              Quest Completed!
            </span>
            <span
              className={`px-3 py-0.5 rounded-full font-black text-xs uppercase bg-gradient-to-r ${quest.levelBadgeColor} text-slate-950 shadow-sm`}
            >
              Level {quest.level}
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-wide">
            "{quest.title}" Conquered!
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2 leading-relaxed">
            Magnificent work, Adventurer! You mastered all 10 words of the <strong>{quest.theme}</strong> quest on {quest.islandName}.
          </p>

          {/* Star Rating */}
          <div className="flex justify-center items-center gap-3 my-6">
            {[1, 2, 3].map((starIdx) => (
              <div
                key={starIdx}
                className={`transition-all duration-300 ${
                  starIdx <= stars
                    ? 'text-amber-400 scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]'
                    : 'text-slate-700 scale-90'
                }`}
              >
                <Star className="w-9 h-9 sm:w-11 sm:h-11 fill-current" />
              </div>
            ))}
          </div>

          {/* Score & XP Earned Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto mb-6">
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3.5 shadow-inner">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Quest Score
              </span>
              <span className="font-heading font-black text-2xl sm:text-3xl text-cyan-400">
                {score} pts
              </span>
            </div>

            <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-3.5 shadow-inner bg-amber-500/5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                XP Earned
              </span>
              <span className="font-heading font-black text-2xl sm:text-3xl text-amber-400 flex items-center justify-center gap-1">
                <Sparkles className="w-5 h-5 fill-amber-400" />
                +{score + quest.xpReward}
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-3.5 shadow-inner">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Accuracy
              </span>
              <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-400">
                {totalErrors === 0 ? '100% ⭐' : totalErrors <= 2 ? 'Great!' : 'Good Effort'}
              </span>
            </div>
          </div>

          {/* Level Progress Indicator */}
          <div className="max-w-md mx-auto bg-slate-950/70 border border-purple-500/30 rounded-2xl p-4 text-left">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="text-purple-300">
                Current Level: {levelInfo.level} ({levelInfo.rankTitle})
              </span>
              <span className="text-amber-400 font-extrabold">{newXp} Total XP</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>

          {/* UNLOCKED NEXT QUEST NOTICE BANNER */}
          {unlockedNextQuest && (
            <div className="mt-6 max-w-lg mx-auto bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border-2 border-emerald-400/70 rounded-2xl p-4 text-center shadow-lg animate-pop">
              <span className="text-xs uppercase font-black tracking-wider text-emerald-400 flex items-center justify-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 fill-emerald-400" />
                <span>Next Difficulty Level Unlocked!</span>
              </span>
              <h3 className="font-heading font-black text-xl text-white">
                {unlockedNextQuest.title} ({unlockedNextQuest.level}) — {unlockedNextQuest.theme}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                On island: {unlockedNextQuest.islandName} {unlockedNextQuest.islandEmoji}
              </p>
              {onStartNextQuest && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onStartNextQuest(unlockedNextQuest.id);
                  }}
                  className="mt-3 btn-quest-primary py-2 px-6 text-sm gap-2 w-full sm:w-auto"
                >
                  <span>Enter {unlockedNextQuest.level} Quest Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <button
              onClick={() => {
                sound.playClick();
                onPlayAgain();
              }}
              className="btn-quest-primary w-full sm:w-auto px-8 py-3.5 text-base gap-2.5"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Replay Quest</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onBackToHome();
              }}
              className="btn-quest-outline w-full sm:w-auto px-8 py-3.5 text-base gap-2.5"
            >
              <Home className="w-5 h-5" />
              <span>Adventure Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vocabulary Learned Recap Gallery */}
      <div className="card-quest p-6 sm:p-8 border border-slate-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{quest.islandEmoji}</span>
              <h3 className="font-heading font-black text-2xl text-white">
                {quest.theme} Vocabulary (10 Words • {quest.level})
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Review all 10 words, Georgian meanings, definitions, and pronunciation!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenCodex(quest.level);
            }}
            className="btn-quest-purple px-4 py-2 text-xs font-bold gap-1.5 self-start sm:self-auto"
          >
            <span>Open Codex ({quest.level})</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {quest.words.map((wordItem) => (
            <div
              key={wordItem.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/70 hover:border-slate-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{wordItem.emoji}</span>
                    <span className="font-heading font-black text-xl text-white capitalize">
                      {wordItem.word}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {wordItem.partOfSpeech}
                    </span>
                  </div>

                  <button
                    onClick={() => sound.speak(wordItem.word)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 flex items-center justify-center transition-colors cursor-pointer"
                    title="Pronounce"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Georgian Translation */}
                <div className="text-xs font-bold text-amber-300 mb-1.5">
                  🇬🇪 {wordItem.georgian}
                </div>

                {/* English definition */}
                <p className="text-xs text-slate-200 leading-relaxed mb-2">
                  {wordItem.definition}
                </p>

                {/* Sentence */}
                <p className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  "{wordItem.sentence}"
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-purple-300">
                <span>{wordItem.phonetic}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mastered
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
