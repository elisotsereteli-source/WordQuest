import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Volume2 } from 'lucide-react';
import type { WordItem } from '../../data/vocabulary';
import { sound } from '../../utils/audio';

interface Challenge3MatchProps {
  words: WordItem[];
  onComplete: (score: number, errors: number) => void;
  onEarnXp: (amount: number) => void;
}

interface MatchPair {
  id: string;
  word: string;
  definition: string;
  emoji: string;
  georgian: string;
}

export const Challenge3Match: React.FC<Challenge3MatchProps> = ({
  words,
  onComplete,
  onEarnXp,
}) => {
  // Split the 10 words into two enjoyable rounds of 5 words
  const [round, setRound] = useState<1 | 2>(1);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [selectedDefId, setSelectedDefId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchError, setMismatchError] = useState(false);
  const [score, setScore] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [shuffledDefs, setShuffledDefs] = useState<{ id: string; definition: string }[]>([]);

  // Words for current round (first 5 in round 1, next 5 in round 2)
  const currentWords: MatchPair[] = (
    round === 1 ? words.slice(0, 5) : words.slice(5, 10)
  ).map((v) => ({
    id: v.id,
    word: v.word,
    definition: v.definition,
    emoji: v.emoji,
    georgian: v.georgian,
  }));

  // Shuffle definitions when round or words change
  useEffect(() => {
    const defs = currentWords.map((w) => ({ id: w.id, definition: w.definition }));
    for (let i = defs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [defs[i], defs[j]] = [defs[j], defs[i]];
    }
    setShuffledDefs(defs);
    setSelectedWordId(null);
    setSelectedDefId(null);
    setMatchedIds([]);
  }, [round, words]);

  const handleWordClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    sound.playClick();
    setSelectedWordId(id);
    setMismatchError(false);

    if (selectedDefId) {
      checkPair(id, selectedDefId);
    }
  };

  const handleDefClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    sound.playClick();
    setSelectedDefId(id);
    setMismatchError(false);

    if (selectedWordId) {
      checkPair(selectedWordId, id);
    }
  };

  const checkPair = (wordId: string, defId: string) => {
    if (wordId === defId) {
      // Match!
      sound.playCorrect();
      setMatchedIds((prev) => [...prev, wordId]);
      setSelectedWordId(null);
      setSelectedDefId(null);
      setScore((prev) => prev + 25);
      onEarnXp(25);
    } else {
      // Mismatch!
      sound.playIncorrect();
      setMismatchError(true);
      setTotalErrors((prev) => prev + 1);
      setTimeout(() => {
        setSelectedWordId(null);
        setSelectedDefId(null);
        setMismatchError(false);
      }, 700);
    }
  };

  const isRoundComplete = matchedIds.length === currentWords.length;

  const handleNextRound = () => {
    sound.playClick();
    if (round === 1) {
      setRound(2);
    } else {
      onComplete(score, totalErrors);
    }
  };

  const totalMatchedAcrossRounds = (round === 1 ? 0 : 5) + matchedIds.length;
  const progressPercent = Math.round((totalMatchedAcrossRounds / words.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pop">
      {/* Activity Subheader */}
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-black">
            3
          </span>
          <span className="text-teal-300">
            Challenge 3: Word Match (Round {round} of 2)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{matchedIds.length} of {currentWords.length} Pairs Matched</span>
          <span className="text-amber-400 font-extrabold">+{score} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-amber-400 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Instruction banner */}
      <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">⚡</span>
          <div>
            <h4 className="font-heading font-black text-white text-sm sm:text-base">
              Link the Words to their Definitions
            </h4>
            <p className="text-xs text-slate-300">
              Tap a word on the left, then tap its matching meaning on the right!
            </p>
          </div>
        </div>

        {mismatchError && (
          <span className="text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-xl animate-wiggle">
            Try again! Not a match.
          </span>
        )}
      </div>

      {/* Two Columns: Words Column & Definitions Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Words */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5 px-1">
            <span>Vocabulary Words</span>
            <span className="text-[10px] bg-teal-950 text-teal-300 px-2 py-0.5 rounded-md border border-teal-800/40">
              Pick One
            </span>
          </h4>

          {currentWords.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedWordId === item.id;

            let cardStyle = 'bg-slate-900/90 border-slate-700 hover:border-teal-400/70 hover:bg-slate-800/80';
            if (isMatched) {
              cardStyle = 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200 shadow-md shadow-emerald-500/10 opacity-80 cursor-default';
            } else if (isSelected) {
              cardStyle = mismatchError
                ? 'bg-rose-950/70 border-rose-400 animate-wiggle text-rose-200'
                : 'bg-teal-950/80 border-2 border-teal-300 text-teal-100 shadow-lg shadow-teal-500/30 scale-[1.02]';
            }

            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleWordClick(item.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${cardStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <span className="font-heading font-black text-lg sm:text-xl capitalize block text-white">
                      {item.word}
                    </span>
                    <span className="text-xs text-amber-300 font-semibold">
                      🇬🇪 {item.georgian}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.speak(item.word);
                    }}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                    title="Pronounce word"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  {isMatched && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Definitions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 px-1">
            <span>English Meanings</span>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-800/40">
              Match It
            </span>
          </h4>

          {shuffledDefs.map((defItem) => {
            const isMatched = matchedIds.includes(defItem.id);
            const isSelected = selectedDefId === defItem.id;

            let cardStyle = 'bg-slate-900/90 border-slate-700 hover:border-cyan-400/70 hover:bg-slate-800/80 text-slate-200';
            if (isMatched) {
              cardStyle = 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200 shadow-md shadow-emerald-500/10 opacity-80 cursor-default';
            } else if (isSelected) {
              cardStyle = mismatchError
                ? 'bg-rose-950/70 border-rose-400 animate-wiggle text-rose-200'
                : 'bg-cyan-950/80 border-2 border-cyan-300 text-cyan-100 shadow-lg shadow-cyan-500/30 scale-[1.02]';
            }

            return (
              <button
                key={defItem.id}
                disabled={isMatched}
                onClick={() => handleDefClick(defItem.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start justify-between gap-3 min-h-[72px] cursor-pointer ${cardStyle}`}
              >
                <p className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                  {defItem.definition}
                </p>

                {isMatched && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Round Complete Banner */}
      {isRoundComplete && (
        <div className="card-quest p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pop border-2 border-teal-500/60 bg-gradient-to-r from-teal-950/40 via-slate-900 to-cyan-950/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/50 flex items-center justify-center text-2xl">
              🎉
            </div>
            <div>
              <h4 className="font-heading font-black text-xl text-teal-300">
                {round === 1 ? 'Round 1 Cleared! (+125 XP)' : 'All Pairs Matched! (+250 XP total)'}
              </h4>
              <p className="text-xs text-slate-300">
                {round === 1
                  ? 'Fantastic matching skills! Ready for the next 5 words?'
                  : 'You have mastered every single definition pairing! Ready for the Quest Story!'}
              </p>
            </div>
          </div>

          <button
            onClick={handleNextRound}
            className="btn-quest-primary w-full sm:w-auto px-6 py-3 text-sm gap-2"
          >
            <span>{round === 1 ? 'Start Round 2' : 'Proceed to Quest Challenge 📜'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
