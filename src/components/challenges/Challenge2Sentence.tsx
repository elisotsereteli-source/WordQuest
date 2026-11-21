import React, { useState } from 'react';
import { Volume2, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import type { SentenceQuestion } from '../../data/vocabulary';
import { sound } from '../../utils/audio';

interface Challenge2SentenceProps {
  questions: SentenceQuestion[];
  onComplete: (score: number, errors: number) => void;
  onEarnXp: (amount: number) => void;
}

export const Challenge2Sentence: React.FC<Challenge2SentenceProps> = ({
  questions,
  onComplete,
  onEarnXp,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [answeredCurrent, setAnsweredCurrent] = useState(false);

  const question = questions[currentIndex] || questions[0];
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  const handleSelectWord = (word: string) => {
    if (answeredCurrent) return;

    setSelectedWord(word);
    setAnsweredCurrent(true);

    const option = question.options.find((opt) => opt.word === word);
    if (option?.isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 25);
      onEarnXp(25);
    } else {
      sound.playIncorrect();
      setTotalErrors((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedWord(null);
      setAnsweredCurrent(false);
      setShowHint(false);
    } else {
      onComplete(score, totalErrors);
    }
  };

  const selectedOpt = question.options.find((opt) => opt.word === selectedWord);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pop">
      {/* Activity Subheader */}
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-black">
            2
          </span>
          <span className="text-purple-300">Challenge 2: Complete the Sentence</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Sentence {currentIndex + 1} of {questions.length}</span>
          <span className="text-amber-400 font-extrabold">+{score} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Sentence Display Card */}
      <div className="card-quest p-6 sm:p-8 relative border-2 border-purple-500/40 bg-gradient-to-b from-slate-900 via-slate-900/95 to-purple-950/20 shadow-2xl">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Fill In The Missing Word</span>
          </span>

          <button
            onClick={() => sound.speak(question.fullSentence)}
            className="w-10 h-10 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow"
            title="Read sentence aloud"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* The Sentence with Gap */}
        <div className="text-lg sm:text-2xl font-medium text-slate-100 leading-relaxed text-center py-4 px-2">
          <span>"{question.sentenceBefore} </span>
          <span
            className={`inline-block px-3 py-1 mx-1.5 rounded-xl border-2 font-heading font-black transition-all ${
              answeredCurrent
                ? selectedOpt?.isCorrect
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'bg-rose-500/20 border-rose-400 text-rose-300'
                : 'bg-slate-800/80 border-dashed border-amber-400 text-amber-300 min-w-[120px]'
            }`}
          >
            {answeredCurrent ? (
              selectedOpt?.isCorrect ? selectedWord : `${selectedWord} ✖ (Answer: ${question.targetWord})`
            ) : (
              '_______'
            )}
          </span>
          <span> {question.sentenceAfter}"</span>
        </div>

        {/* Scaffolding Hint */}
        <div className="mt-3 flex justify-center">
          {!showHint ? (
            <button
              onClick={() => {
                sound.playClick();
                setShowHint(true);
              }}
              className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Show Georgian Meaning Hint</span>
            </button>
          ) : (
            <div className="bg-amber-500/15 border border-amber-500/40 rounded-xl px-4 py-1.5 text-xs sm:text-sm font-bold text-amber-200 animate-pop">
              🇬🇪 {question.georgianHint}
            </div>
          )}
        </div>
      </div>

      {/* 3 Word Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {question.options.map((opt, idx) => {
          let btnStyle = 'bg-slate-900/90 border-slate-700 hover:border-purple-400/80 hover:bg-slate-800 text-white';

          if (answeredCurrent) {
            if (opt.isCorrect) {
              btnStyle = 'bg-emerald-950/90 border-2 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/30';
            } else if (selectedWord === opt.word) {
              btnStyle = 'bg-rose-950/80 border-2 border-rose-400 text-rose-200';
            } else {
              btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-40';
            }
          }

          return (
            <button
              key={idx}
              disabled={answeredCurrent}
              onClick={() => handleSelectWord(opt.word)}
              className={`p-4 sm:p-5 rounded-2xl border-2 font-heading font-black text-xl sm:text-2xl capitalize text-center transition-all duration-200 cursor-pointer ${btnStyle}`}
            >
              {opt.word}
            </button>
          );
        })}
      </div>

      {/* Immediate Bottom Feedback */}
      {answeredCurrent && (
        <div className="card-quest p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-pop border-2 border-purple-500/50 bg-slate-900">
          <div className="flex items-center gap-3">
            {selectedOpt?.isCorrect ? (
              <>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center text-xl">
                  ✨
                </div>
                <div>
                  <p className="font-heading font-black text-emerald-300 text-base">
                    Perfect Fit! (+25 XP)
                  </p>
                  <p className="text-xs text-slate-300">
                    {selectedOpt.explanation}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/50 flex items-center justify-center text-xl">
                  🧭
                </div>
                <div>
                  <p className="font-heading font-black text-amber-300 text-base">
                    Friendly Reminder:
                  </p>
                  <p className="text-xs text-slate-300">
                    {selectedOpt?.explanation || `The right word was "${question.targetWord}".`}
                  </p>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleNext}
            className="btn-quest-primary w-full sm:w-auto px-6 py-2.5 text-sm gap-2"
          >
            <span>{currentIndex + 1 < questions.length ? 'Next Sentence' : 'Proceed to Challenge 3'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
