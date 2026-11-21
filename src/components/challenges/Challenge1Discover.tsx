import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import type { DefinitionQuestion, WordItem } from '../../data/vocabulary';
import { sound } from '../../utils/audio';

interface Challenge1DiscoverProps {
  questions: DefinitionQuestion[];
  words: WordItem[];
  questTitle: string;
  onComplete: (score: number, errors: number) => void;
  onEarnXp: (amount: number) => void;
}

export const Challenge1Discover: React.FC<Challenge1DiscoverProps> = ({
  questions,
  words,
  onComplete,
  onEarnXp,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showGeorgianHint, setShowGeorgianHint] = useState(false);
  const [score, setScore] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [answeredCurrent, setAnsweredCurrent] = useState(false);

  const question = questions[currentIndex] || questions[0];
  const vocabItem = words.find((v) => v.word === question.word);
  const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

  const handleSelectOption = (index: number) => {
    if (answeredCurrent) return;

    setSelectedOption(index);
    setAnsweredCurrent(true);

    const option = question.options[index];
    if (option.isCorrect) {
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
      setSelectedOption(null);
      setAnsweredCurrent(false);
      setShowGeorgianHint(false);
    } else {
      onComplete(score, totalErrors);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pop">
      {/* Activity Subheader & Mini-Progress */}
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-black">
            1
          </span>
          <span className="text-cyan-300">Challenge 1: Discover the Word</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span className="text-amber-400 font-extrabold">+{score} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Target Word Card */}
      <div className="card-quest p-6 sm:p-8 text-center relative overflow-hidden border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900 via-slate-900/95 to-cyan-950/20 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Identify The Meaning</span>
        </div>

        {/* Word Display with Speaker Button */}
        <div className="flex items-center justify-center gap-3 my-2 flex-wrap">
          <span className="text-4xl sm:text-5xl">{vocabItem?.emoji || '✨'}</span>
          <h2 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-wide capitalize">
            {question.word}
          </h2>
          <button
            onClick={() => sound.speak(question.word)}
            className="w-11 h-11 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
            title="Listen to pronunciation"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Phonetic spelling */}
        {vocabItem && (
          <p className="text-xs sm:text-sm font-mono text-cyan-300/80 mt-1">
            Pronounced: {vocabItem.phonetic}
          </p>
        )}

        {/* Georgian Scaffolding Hint Toggle */}
        <div className="mt-4 flex justify-center">
          {!showGeorgianHint ? (
            <button
              onClick={() => {
                sound.playClick();
                setShowGeorgianHint(true);
              }}
              className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Need a hint? (ქართული მინიშნება)</span>
            </button>
          ) : (
            <div className="bg-amber-500/15 border border-amber-500/40 rounded-2xl px-4 py-2 text-xs sm:text-sm font-bold text-amber-200 animate-pop flex items-center gap-2">
              <span>🇬🇪 ქართულად:</span>
              <span className="text-white text-base">{vocabItem?.georgian}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3 Definition Choices */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          let cardStyle = 'bg-slate-900/90 border-slate-700 hover:border-cyan-400/60 hover:bg-slate-800/80 text-slate-200';
          let letterBg = 'bg-slate-800 text-slate-300 border-slate-600';

          if (answeredCurrent) {
            if (opt.isCorrect) {
              cardStyle = 'bg-emerald-950/80 border-2 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/20';
              letterBg = 'bg-emerald-500 text-slate-950 border-emerald-300 font-black';
            } else if (selectedOption === idx) {
              cardStyle = 'bg-rose-950/70 border-2 border-rose-400 text-rose-200';
              letterBg = 'bg-rose-500 text-white border-rose-300 font-black';
            } else {
              cardStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50';
            }
          }

          const letter = String.fromCharCode(65 + idx);

          return (
            <button
              key={idx}
              disabled={answeredCurrent}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${cardStyle}`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 border ${letterBg}`}>
                {answeredCurrent && opt.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-slate-950" />
                ) : answeredCurrent && selectedOption === idx ? (
                  <XCircle className="w-5 h-5 text-white" />
                ) : (
                  letter
                )}
              </span>

              <div className="flex-1">
                <p className="text-sm sm:text-base font-semibold leading-relaxed">
                  {opt.text}
                </p>

                {/* Explanation text when revealed */}
                {answeredCurrent && (opt.isCorrect || selectedOption === idx) && (
                  <p
                    className={`mt-2 text-xs sm:text-sm font-medium pt-2 border-t ${
                      opt.isCorrect
                        ? 'border-emerald-700/50 text-emerald-300'
                        : 'border-rose-700/50 text-rose-300'
                    }`}
                  >
                    {opt.explanation}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Immediate Bottom Feedback & Next Button */}
      {answeredCurrent && (
        <div className="card-quest p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-pop border-2 border-cyan-500/50 bg-slate-900">
          <div className="flex items-center gap-2.5">
            {question.options[selectedOption!].isCorrect ? (
              <>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center text-xl">
                  🎉
                </div>
                <div>
                  <p className="font-heading font-black text-emerald-300 text-base">
                    Brilliant Discovery! (+25 XP)
                  </p>
                  <p className="text-xs text-slate-300">
                    You chose the exact matching definition!
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/50 flex items-center justify-center text-xl">
                  💡
                </div>
                <div>
                  <p className="font-heading font-black text-amber-300 text-base">
                    Keep exploring!
                  </p>
                  <p className="text-xs text-slate-300">
                    The highlighted green card shows the correct definition.
                  </p>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleNext}
            className="btn-quest-primary w-full sm:w-auto px-6 py-2.5 text-sm gap-2"
          >
            <span>{currentIndex + 1 < questions.length ? 'Next Word' : 'Proceed to Challenge 2'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
