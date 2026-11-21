import React, { useState } from 'react';
import { Volume2, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import type { QuestStory } from '../../data/vocabulary';
import { sound } from '../../utils/audio';

interface Challenge4QuestStoryProps {
  story: QuestStory;
  onComplete: (score: number, errors: number) => void;
  onEarnXp: (amount: number) => void;
}

export const Challenge4QuestStory: React.FC<Challenge4QuestStoryProps> = ({
  story,
  onComplete,
  onEarnXp,
}) => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [chosenWords, setChosenWords] = useState<{ [key: string]: string }>({});
  const [answeredSegments, setAnsweredSegments] = useState<{ [key: string]: boolean }>({});
  const [score, setScore] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const segments = story.segments;
  const currentSegment = segments[activeSegmentIndex] || segments[0];
  const isCurrentAnswered = !!answeredSegments[currentSegment.id];
  const progressPercent = Math.round(((activeSegmentIndex) / segments.length) * 100);

  const handleSelectChoice = (word: string) => {
    if (isCurrentAnswered) return;

    const isCorrect = word === currentSegment.gapWord;
    setChosenWords((prev) => ({ ...prev, [currentSegment.id]: word }));
    setAnsweredSegments((prev) => ({ ...prev, [currentSegment.id]: true }));

    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 40);
      onEarnXp(40);
    } else {
      sound.playIncorrect();
      setTotalErrors((prev) => prev + 1);
    }
  };

  const handleNextSegment = () => {
    sound.playClick();
    if (activeSegmentIndex + 1 < segments.length) {
      setActiveSegmentIndex((prev) => prev + 1);
      setShowHint(false);
    } else {
      // Completed all segments!
      sound.playFanfare();
      onComplete(score, totalErrors);
    }
  };

  const currentChoiceWord = chosenWords[currentSegment.id];
  const isCorrectChoice = currentChoiceWord === currentSegment.gapWord;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pop">
      {/* Activity Subheader */}
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-black">
            4
          </span>
          <span className="text-amber-300">
            Challenge 4: Quest Adventure Story
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Gap {activeSegmentIndex + 1} of {segments.length}</span>
          <span className="text-amber-400 font-extrabold">+{score} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-200 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Chronicle Header Card */}
      <div className="card-quest p-6 sm:p-7 border-2 border-amber-500/50 bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-900/90 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-amber-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner">
              📜
            </div>
            <div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-amber-200">
                {story.title}
              </h3>
              <p className="text-xs text-slate-300">
                {story.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => sound.speak(story.introduction)}
            className="self-start sm:self-auto text-xs font-bold text-amber-300 hover:text-amber-100 flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Narrate Intro</span>
          </button>
        </div>

        {/* Narrative Box */}
        <p className="text-xs sm:text-sm text-slate-300 italic mb-5 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          "{story.introduction}"
        </p>

        {/* Interactive Story Segments Flow */}
        <div className="space-y-4">
          {segments.map((seg, idx) => {
            const isPast = idx < activeSegmentIndex;
            const isCurrent = idx === activeSegmentIndex;
            const wordChosen = chosenWords[seg.id];
            const answered = !!answeredSegments[seg.id];

            return (
              <div
                key={seg.id}
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 ${
                  isCurrent
                    ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/10'
                    : isPast
                    ? 'bg-slate-900/50 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-40'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-black text-[10px]">
                    #{idx + 1}
                  </span>
                  <span>Chapter {idx + 1}</span>
                  {isPast && (
                    <span className="text-emerald-400 text-xs flex items-center gap-1 ml-auto font-bold lowercase">
                      <CheckCircle2 className="w-3.5 h-3.5" /> completed
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-slate-100">
                  {seg.before}{' '}
                  <span
                    className={`inline-block px-3 py-0.5 mx-1 rounded-xl border-2 font-heading font-black capitalize transition-all ${
                      answered
                        ? wordChosen === seg.gapWord
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                          : 'bg-rose-500/20 border-rose-400 text-rose-300'
                        : isCurrent
                        ? 'bg-amber-500/20 border-dashed border-amber-400 text-amber-200 animate-pulse'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}
                  >
                    {answered ? wordChosen : '[ Choose Word ]'}
                  </span>{' '}
                  {seg.after}
                </p>

                {/* Scaffolding Hint button for current active segment */}
                {isCurrent && !isCurrentAnswered && (
                  <div className="mt-3 flex items-center gap-2">
                    {!showHint ? (
                      <button
                        onClick={() => {
                          sound.playClick();
                          setShowHint(true);
                        }}
                        className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Georgian clue</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-amber-200 bg-amber-500/20 border border-amber-500/40 px-3 py-1 rounded-xl animate-pop">
                        🇬🇪 {seg.georgianHint}
                      </span>
                    )}

                    <button
                      onClick={() => sound.speak(`${seg.before} ... ${seg.after}`)}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Read aloud</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Word Options for the Current Active Segment */}
      {!isCurrentAnswered ? (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300 text-center">
            Choose the word that fits Chapter {activeSegmentIndex + 1}:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentSegment.choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleSelectChoice(choice)}
                className="p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border-2 border-slate-700 hover:border-amber-400 font-heading font-black text-xl sm:text-2xl text-white capitalize text-center shadow-lg transition-all duration-150 active:scale-95 cursor-pointer"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Feedback Card & Next Segment Button */
        <div className="card-quest p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pop border-2 border-amber-500/60 bg-slate-900">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl ${
                isCorrectChoice
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                  : 'bg-amber-500/20 border-amber-500/50 text-amber-400'
              }`}
            >
              {isCorrectChoice ? '⭐' : '💡'}
            </div>
            <div>
              <h4
                className={`font-heading font-black text-lg ${
                  isCorrectChoice ? 'text-emerald-300' : 'text-amber-300'
                }`}
              >
                {isCorrectChoice
                  ? 'Story Chapter Unlocked! (+40 XP)'
                  : 'Friendly Clue:'}
              </h4>
              <p className="text-xs text-slate-300">
                {currentSegment.explanation}
              </p>
            </div>
          </div>

          <button
            onClick={handleNextSegment}
            className="btn-quest-primary w-full sm:w-auto px-6 py-3 text-sm gap-2"
          >
            <span>
              {activeSegmentIndex + 1 < segments.length
                ? 'Continue Adventure'
                : 'Claim Quest Victory! 🏆'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
