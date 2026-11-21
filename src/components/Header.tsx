import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Compass, Award } from 'lucide-react';
import type { PlayerProgress } from '../utils/storage';
import { calculateLevel } from '../utils/storage';
import { sound } from '../utils/audio';

interface HeaderProps {
  progress: PlayerProgress;
  activeView: 'home' | 'codex' | 'quest' | 'badges';
  onNavigate: (view: 'home' | 'codex' | 'quest' | 'badges') => void;
  onOpenProfile: () => void;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  activeView,
  onNavigate,
  onOpenProfile,
  onToggleSound,
}) => {
  const levelInfo = calculateLevel(progress.xp);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('home');
          }}
          className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer transition-transform hover:scale-105 active:scale-95"
          title="Return to Home Screen"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:shadow-cyan-400/30 transition-all flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <span className="text-xl sm:text-2xl animate-float">🧭</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-cyan-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                WordQuest
              </span>
              <span className="hidden md:inline-flex px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-purple-900/60 text-purple-300 border border-purple-700/50">
                Adventure
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Vocabulary Learning Game
            </p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('home');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'home'
                ? 'bg-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Map</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('codex');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'codex'
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Codex</span>
            <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded-full border border-purple-700/40">
              50
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('badges');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'badges'
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Badges</span>
            {progress.unlockedBadges.length > 0 && (
              <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded-full border border-amber-700/40 font-bold">
                {progress.unlockedBadges.length}
              </span>
            )}
          </button>
        </nav>

        {/* Player Status & Settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* XP & Level Badge */}
          <div
            onClick={onOpenProfile}
            className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-1.5 sm:px-3 sm:py-1.5 cursor-pointer hover:border-slate-500 transition-all shadow-sm"
            title="Click to view player stats & customize character"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs sm:text-sm shadow-sm">
              {progress.avatar}
            </div>
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-amber-300">
                  Lvl {levelInfo.level}
                </span>
                <span className="text-[10px] text-slate-400">
                  • {levelInfo.rankTitle}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-200">
                <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{progress.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={progress.soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={progress.soundEnabled ? 'Sound is ON' : 'Sound is MUTED'}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
