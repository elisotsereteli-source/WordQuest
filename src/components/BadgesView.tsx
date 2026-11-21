import React from 'react';
import { Award, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import type { PlayerProgress } from '../utils/storage';
import { ALL_BADGES } from '../utils/storage';
import { sound } from '../utils/audio';

interface BadgesViewProps {
  progress: PlayerProgress;
  onBack: () => void;
  onStartQuest: () => void;
}

export const BadgesView: React.FC<BadgesViewProps> = ({
  progress,
  onBack,
  onStartQuest,
}) => {
  const unlockedCount = progress.unlockedBadges.length;
  const totalCount = ALL_BADGES.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBack();
            }}
            className="w-10 h-10 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Back to Adventure Map"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Explorer Badges & Trophies
              </h1>
            </div>
            <p className="text-sm text-slate-300 mt-0.5">
              Celebrate your vocabulary triumphs and unlock heroic quest accolades!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onStartQuest();
          }}
          className="btn-quest-primary px-5 py-2.5 text-sm gap-2"
        >
          <span>Earn Badges</span>
        </button>
      </div>

      {/* Progress Card */}
      <div className="card-quest p-6 border-amber-500/20 bg-gradient-to-r from-amber-950/20 via-slate-900 to-purple-950/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-heading font-bold text-lg text-white">
              Trophy Room Progress
            </span>
          </div>
          <span className="font-bold text-amber-300">
            {unlockedCount} of {totalCount} Unlocked ({percentage}%)
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ALL_BADGES.map((badge) => {
          const isUnlocked = progress.unlockedBadges.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/50 border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${
                      isUnlocked
                        ? 'bg-amber-500/20 border-amber-500/40 shadow-inner'
                        : 'bg-slate-800/80 border-slate-700 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-full">
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-black text-lg text-white mb-1">
                  {badge.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-medium text-slate-400">
                {isUnlocked ? 'Accomplished by Explorer' : 'Complete quest challenges to earn'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
