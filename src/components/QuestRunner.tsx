import React, { useState } from 'react';
import { ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { Challenge1Discover } from './challenges/Challenge1Discover';
import { Challenge2Sentence } from './challenges/Challenge2Sentence';
import { Challenge3Match } from './challenges/Challenge3Match';
import { Challenge4QuestStory } from './challenges/Challenge4QuestStory';
import { QuestCompletion } from './QuestCompletion';
import { getQuestById, QUESTS } from '../data/vocabulary';
import type { QuestInfo } from '../data/vocabulary';
import { sound } from '../utils/audio';

interface QuestRunnerProps {
  questId: string;
  onBackToHome: () => void;
  onOpenCodex: (levelFilter?: string) => void;
  onQuestFinished: (questId: string, score: number, totalErrors: number) => void;
  currentXp: number;
  unlockedNextQuest?: QuestInfo;
  onStartNextQuest?: (nextQuestId: string) => void;
}

export const QuestRunner: React.FC<QuestRunnerProps> = ({
  questId,
  onBackToHome,
  onOpenCodex,
  onQuestFinished,
  currentXp,
  unlockedNextQuest,
  onStartNextQuest,
}) => {
  const quest: QuestInfo = getQuestById(questId) || QUESTS[0];

  // Stages:
  // 0: Intro Briefing
  // 1: Challenge 1 (Discover Word)
  // 2: Challenge 2 (Complete Sentence)
  // 3: Challenge 3 (Word Match)
  // 4: Challenge 4 (Quest Story Challenge)
  // 5: Completion Screen
  const [stage, setStage] = useState<number>(0);
  const [questScore, setQuestScore] = useState<number>(0);
  const [totalErrors, setTotalErrors] = useState<number>(0);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);

  const handleEarnXp = (amount: number) => {
    setQuestScore((prev) => prev + amount);
  };

  const handleStageComplete = (_stageScore: number, stageErrors: number) => {
    setTotalErrors((prev) => prev + stageErrors);

    if (stage === 1) {
      setStage(2);
    } else if (stage === 2) {
      setStage(3);
    } else if (stage === 3) {
      setStage(4);
    } else if (stage === 4) {
      // Completed full quest!
      const finalScore = questScore;
      const finalErrors = totalErrors + stageErrors;
      onQuestFinished(quest.id, finalScore, finalErrors);
      setStage(5);
    }
  };

  const handleRestartQuest = () => {
    setStage(0);
    setQuestScore(0);
    setTotalErrors(0);
  };

  const STAGE_NAMES = [
    { id: 1, name: 'Discover', icon: '🔍' },
    { id: 2, name: 'Sentence', icon: '✍️' },
    { id: 3, name: 'Match', icon: '⚡' },
    { id: 4, name: 'Story', icon: '📜' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Quest Bar (hidden on final completion screen) */}
      {stage > 0 && stage < 5 && (
        <div className="card-quest p-4 flex flex-wrap items-center justify-between gap-3 border-cyan-500/30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Quit to Map"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-sm sm:text-base text-white">
                  {quest.title}
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase bg-gradient-to-r ${quest.levelBadgeColor} text-slate-950`}>
                  {quest.level}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {quest.theme} • 10 Words to Master
              </p>
            </div>
          </div>

          {/* Step Pills */}
          <div className="flex items-center gap-1 sm:gap-2">
            {STAGE_NAMES.map((s) => (
              <div
                key={s.id}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  stage === s.id
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-105'
                    : stage > s.id
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800/80 text-slate-400'
                }`}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.name}</span>
                {stage > s.id && <span>✓</span>}
              </div>
            ))}
          </div>

          {/* Current Quest Score */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 fill-amber-400" />
            <span>{questScore} XP</span>
          </div>
        </div>
      )}

      {/* Confirmation Modal when quitting */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-pop">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center">
            <span className="text-4xl block mb-2">{quest.islandEmoji}</span>
            <h4 className="font-heading font-black text-xl text-white mb-1">
              Leave {quest.title}?
            </h4>
            <p className="text-xs text-slate-300 mb-5">
              Your current quest run will pause. Any XP earned so far has already been saved to your character!
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowExitConfirm(false);
                  onBackToHome();
                }}
                className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Yes, Return to Map
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Keep Playing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 0: QUEST BRIEFING */}
      {stage === 0 && (
        <div className="card-quest p-6 sm:p-10 border-2 border-cyan-500/40 bg-gradient-to-b from-slate-900 via-slate-900/95 to-cyan-950/30 shadow-2xl animate-pop text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 border-4 border-cyan-200 shadow-xl shadow-cyan-500/30 flex items-center justify-center text-4xl mb-4 animate-float">
            {quest.islandEmoji}
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              {quest.theme} Quest
            </span>
            <span className={`px-3 py-0.5 rounded-full font-black text-xs uppercase bg-gradient-to-r ${quest.levelBadgeColor} text-slate-950`}>
              CEFR {quest.level}
            </span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-wide">
            {quest.title}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mt-2 leading-relaxed">
            {quest.description}
          </p>

          {/* 4 Challenges Roadmap Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto my-6 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-2xl p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                🔍
              </span>
              <div>
                <h4 className="font-heading font-bold text-white text-sm">
                  1. Discover the Word
                </h4>
                <p className="text-xs text-slate-400">
                  Pick the correct meaning from 3 definitions.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-2xl p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-800/40">
                ✍️
              </span>
              <div>
                <h4 className="font-heading font-bold text-white text-sm">
                  2. Complete the Sentence
                </h4>
                <p className="text-xs text-slate-400">
                  Select the missing word to finish sentences.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-2xl p-2 rounded-xl bg-teal-950 text-teal-400 border border-teal-800/40">
                ⚡
              </span>
              <div>
                <h4 className="font-heading font-bold text-white text-sm">
                  3. Word Match
                </h4>
                <p className="text-xs text-slate-400">
                  Connect words directly to their definitions.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-2xl p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/40">
                📜
              </span>
              <div>
                <h4 className="font-heading font-bold text-white text-sm">
                  4. Quest Adventure Story
                </h4>
                <p className="text-xs text-slate-400">
                  Fill in gaps to complete "{quest.story.title}"!
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setStage(1);
              }}
              className="btn-quest-primary w-full sm:w-auto px-8 py-3.5 text-base gap-2"
            >
              <span>Begin Quest Challenge ⚔️</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenCodex(quest.level);
              }}
              className="btn-quest-outline w-full sm:w-auto px-6 py-3.5 text-sm gap-2"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Review Words First</span>
            </button>
          </div>
        </div>
      )}

      {/* STAGE 1: CHALLENGE 1 */}
      {stage === 1 && (
        <Challenge1Discover
          questions={quest.definitionQuestions}
          words={quest.words}
          questTitle={quest.title}
          onComplete={(s, e) => handleStageComplete(s, e)}
          onEarnXp={handleEarnXp}
        />
      )}

      {/* STAGE 2: CHALLENGE 2 */}
      {stage === 2 && (
        <Challenge2Sentence
          questions={quest.sentenceQuestions}
          onComplete={(s, e) => handleStageComplete(s, e)}
          onEarnXp={handleEarnXp}
        />
      )}

      {/* STAGE 3: CHALLENGE 3 */}
      {stage === 3 && (
        <Challenge3Match
          words={quest.words}
          onComplete={(s, e) => handleStageComplete(s, e)}
          onEarnXp={handleEarnXp}
        />
      )}

      {/* STAGE 4: CHALLENGE 4 */}
      {stage === 4 && (
        <Challenge4QuestStory
          story={quest.story}
          onComplete={(s, e) => handleStageComplete(s, e)}
          onEarnXp={handleEarnXp}
        />
      )}

      {/* STAGE 5: QUEST COMPLETION */}
      {stage === 5 && (
        <QuestCompletion
          quest={quest}
          score={questScore}
          totalErrors={totalErrors}
          newXp={currentXp}
          unlockedNextQuest={unlockedNextQuest}
          onPlayAgain={handleRestartQuest}
          onBackToHome={onBackToHome}
          onStartNextQuest={onStartNextQuest}
          onOpenCodex={onOpenCodex}
        />
      )}
    </div>
  );
};
