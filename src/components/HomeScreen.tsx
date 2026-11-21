import React from 'react';
import { Play, Sparkles, BookOpen, Award, Compass, ChevronRight, User, Lock, CheckCircle2 } from 'lucide-react';
import { AdventureMap } from './AdventureMap';
import type { PlayerProgress } from '../utils/storage';
import { calculateLevel, ALL_BADGES } from '../utils/storage';
import { QUESTS, VOCABULARY_LIST } from '../data/vocabulary';
import type { QuestInfo } from '../data/vocabulary';
import { sound } from '../utils/audio';

interface HomeScreenProps {
  progress: PlayerProgress;
  onStartQuest: (questId?: string) => void;
  onOpenCodex: (levelFilter?: string) => void;
  onOpenBadges: () => void;
  onOpenProfile: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  progress,
  onStartQuest,
  onOpenCodex,
  onOpenBadges,
  onOpenProfile,
}) => {
  const levelInfo = calculateLevel(progress.xp);

  // Find next playable quest
  const firstUnfinishedQuest =
    QUESTS.find((q) => progress.unlockedQuestIds.includes(q.id) && !progress.completedQuestIds.includes(q.id)) ||
    QUESTS.find((q) => progress.unlockedQuestIds.includes(q.id)) ||
    QUESTS[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-slate-700/80 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>5 Difficulty Levels • A1 to C1</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              WordQuest
            </h1>
            <p className="font-heading font-semibold text-lg sm:text-2xl text-amber-300 mt-2">
              Learn words. Explore worlds. Complete quests.
            </p>

            <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed max-w-xl">
              Journey through 5 thematic quests across the Whispering Archipelago! Master 50 essential English words from beginner to advanced (A1–C1) with audio pronunciation and Georgian translations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
              <button
                onClick={() => {
                  sound.playClick();
                  onStartQuest(firstUnfinishedQuest.id);
                }}
                className="btn-quest-primary px-8 py-4 text-base sm:text-lg gap-3 w-full sm:w-auto glow-gold"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>
                  Start Adventure ({firstUnfinishedQuest.level} - {firstUnfinishedQuest.theme})
                </span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenCodex();
                }}
                className="btn-quest-purple px-6 py-4 text-sm sm:text-base gap-2 w-full sm:w-auto"
              >
                <BookOpen className="w-5 h-5" />
                <span>Word Codex (50 Words)</span>
              </button>
            </div>
          </div>

          {/* Hero Character Card */}
          <div className="w-full max-w-xs sm:max-w-sm">
            <div className="card-quest p-5 border-amber-500/40 bg-slate-900/90 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Explorer Profile</span>
                </span>
                <button
                  onClick={onOpenProfile}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>

              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-3xl shadow-md border-2 border-amber-200">
                  {progress.avatar}
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-white">
                    {progress.playerName}
                  </h3>
                  <p className="text-xs font-bold text-amber-300">
                    Level {levelInfo.level} • {levelInfo.rankTitle}
                  </p>
                </div>
              </div>

              {/* Progress bar in Hero card */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">XP to Next Rank</span>
                  <span className="text-amber-400">{levelInfo.currentLevelXp} / {levelInfo.xpForNextLevel}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-300"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-slate-800/80">
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total XP</span>
                  <span className="font-heading font-black text-amber-400 text-base">{progress.xp}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Quests Cleared</span>
                  <span className="font-heading font-black text-cyan-400 text-base">
                    {progress.completedQuestIds.length} / {QUESTS.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Thematic Quests Showcase Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🗺️</span>
            <div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                5 CEFR Quests & Thematic Worlds
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Complete each level to unlock the next quest and earn XP rewards.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {QUESTS.map((q: QuestInfo) => {
            const isUnlocked = progress.unlockedQuestIds.includes(q.id);
            const isCompleted = progress.completedQuestIds.includes(q.id);

            return (
              <div
                key={q.id}
                className={`card-quest p-4 flex flex-col justify-between transition-all duration-200 border-2 ${
                  isUnlocked
                    ? isCompleted
                      ? 'border-emerald-500/50 bg-slate-900/90 shadow-md shadow-emerald-500/10'
                      : 'border-cyan-500/60 bg-slate-900/95 shadow-lg shadow-cyan-500/15'
                    : 'border-slate-800 bg-slate-950/60 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded-full font-black text-[11px] uppercase tracking-wider ${
                        isUnlocked
                          ? 'bg-gradient-to-r ' + q.levelBadgeColor + ' text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {q.level}
                    </span>

                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Cleared</span>
                      </span>
                    ) : !isUnlocked ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                        +{q.xpReward} XP
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{q.islandEmoji}</span>
                    <h3 className="font-heading font-black text-base text-white leading-tight">
                      {q.title}
                    </h3>
                  </div>

                  <p className="text-xs text-amber-300 font-bold mb-1">
                    {q.theme}
                  </p>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {q.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800">
                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        sound.playClick();
                        onStartQuest(q.id);
                      }}
                      className={`w-full py-1.5 px-3 rounded-xl text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300'
                          : 'bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300'
                      }`}
                    >
                      <span>{isCompleted ? 'Replay Quest' : 'Start Quest'}</span>
                      <Play className="w-3 h-3 fill-slate-950" />
                    </button>
                  ) : (
                    <div className="py-1 text-center text-[10px] font-semibold text-slate-500 bg-slate-900 rounded-lg">
                      Complete previous level
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Adventure Map Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🗺️</span>
            <div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Archipelago Map & Sea Routes
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Click any unlocked island node to embark on its vocabulary quest.
              </p>
            </div>
          </div>
        </div>

        {/* The Illustrated Map */}
        <AdventureMap
          progress={progress}
          onStartQuest={(id) => onStartQuest(id)}
          onOpenCodex={onOpenCodex}
        />
      </section>

      {/* "My Progress" Dashboard Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              My Progress & Mastery
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Track your level, XP points, completed quests, and vocabulary badges.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Level & Rank */}
          <div className="card-quest p-5 border-purple-500/30 bg-gradient-to-br from-purple-950/20 via-slate-900 to-slate-900">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Explorer Level
              </span>
              <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-black">
                {levelInfo.level}
              </span>
            </div>
            <h3 className="font-heading font-black text-2xl text-white">
              {levelInfo.rankTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {levelInfo.currentLevelXp} / {levelInfo.xpForNextLevel} XP to next level
            </p>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700 mt-3">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Card 2: Total XP Points */}
          <div className="card-quest p-5 border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Total XP Points
              </span>
              <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <h3 className="font-heading font-black text-3xl text-amber-300">
              {progress.xp} <span className="text-sm font-semibold text-slate-400">XP</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Earned across vocabulary challenges
            </p>
          </div>

          {/* Card 3: Completed Quests */}
          <div className="card-quest p-5 border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-slate-900 to-slate-900">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Quests Cleared
              </span>
              <Compass className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="font-heading font-black text-3xl text-cyan-300">
              {progress.completedQuestIds.length} / {QUESTS.length}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Thematic expeditions mastered
            </p>
          </div>

          {/* Card 4: Badges */}
          <div
            onClick={onOpenBadges}
            className="card-quest p-5 border-amber-500/30 hover:border-amber-400/60 transition-all cursor-pointer bg-gradient-to-br from-amber-950/15 via-slate-900 to-slate-900 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Badges & Trophies
              </span>
              <Award className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="font-heading font-black text-3xl text-white">
              {progress.unlockedBadges.length} / {ALL_BADGES.length}
            </h3>
            <p className="text-xs text-cyan-400 font-bold mt-1 group-hover:underline flex items-center gap-1">
              <span>View Trophy Room</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </p>
          </div>
        </div>
      </section>

      {/* Vocabulary Showcase Teaser */}
      <section className="card-quest p-6 sm:p-8 border-slate-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white flex items-center gap-2">
              <span>Featured Vocabulary (Click to Hear)</span>
              <span className="text-xs bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full border border-purple-700/50">
                50 Words Total
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Click any word to test text-to-speech audio pronunciation with Georgian translations.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenCodex();
            }}
            className="btn-quest-outline px-4 py-2 text-xs font-bold gap-1.5 self-start sm:self-auto"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Open Study Codex</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {VOCABULARY_LIST.slice(0, 10).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                sound.speak(item.word);
              }}
              className="p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400/60 transition-all text-left group cursor-pointer shadow-sm hover:-translate-y-0.5"
              title={`Click to listen: ${item.word}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-black bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  {item.level}
                </span>
              </div>
              <span className="font-heading font-bold text-base text-white group-hover:text-cyan-300 capitalize block">
                {item.word}
              </span>
              <span className="text-[11px] font-semibold text-amber-300 block truncate mt-0.5">
                {item.georgian}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
