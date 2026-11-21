import React, { useState } from 'react';
import { Trash2, X, Check } from 'lucide-react';
import type { PlayerProgress } from '../utils/storage';
import { calculateLevel } from '../utils/storage';
import { sound } from '../utils/audio';

interface ProfileModalProps {
  progress: PlayerProgress;
  onClose: () => void;
  onUpdateProfile: (name: string, avatar: string) => void;
  onResetProgress: () => void;
}

const AVATAR_OPTIONS = [
  { emoji: '🧭', label: 'Scout Explorer' },
  { emoji: '🧙', label: 'Rune Wizard' },
  { emoji: '⚔️', label: 'Valiant Knight' },
  { emoji: '🏹', label: 'Forest Ranger' },
  { emoji: '🦉', label: 'Wise Scholar' },
  { emoji: '✨', label: 'Mystic Seeker' },
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  progress,
  onClose,
  onUpdateProfile,
  onResetProgress,
}) => {
  const [name, setName] = useState(progress.playerName);
  const [avatar, setAvatar] = useState(progress.avatar);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const levelInfo = calculateLevel(progress.xp);

  const handleSave = () => {
    sound.playClick();
    onUpdateProfile(name.trim() || 'Valiant Explorer', avatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-pop">
      <div className="bg-slate-900 border-2 border-slate-700/80 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-2xl shadow-md">
            {avatar}
          </div>
          <div>
            <h3 className="font-heading font-black text-xl text-white">
              Adventurer Profile
            </h3>
            <p className="text-xs text-amber-300 font-bold">
              Level {levelInfo.level} • {levelInfo.rankTitle}
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 mb-5 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total XP</span>
            <span className="font-heading font-black text-amber-400 text-lg">{progress.xp}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Quests</span>
            <span className="font-heading font-black text-cyan-400 text-lg">{progress.completedQuests}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Words Mastered</span>
            <span className="font-heading font-black text-purple-400 text-lg">{progress.masteredWords.length}/50</span>
          </div>
        </div>

        {/* Name input */}
        <div className="mb-4">
          <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">
            Explorer Name:
          </label>
          <input
            type="text"
            maxLength={25}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white font-bold focus:outline-none focus:border-cyan-400"
            placeholder="Enter your hero name..."
          />
        </div>

        {/* Avatar selection */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
            Select Avatar Emblem:
          </label>
          <div className="grid grid-cols-6 gap-2">
            {AVATAR_OPTIONS.map((opt) => (
              <button
                key={opt.emoji}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setAvatar(opt.emoji);
                }}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                  avatar === opt.emoji
                    ? 'bg-amber-400/20 border-2 border-amber-400 shadow-md scale-105'
                    : 'bg-slate-800 hover:bg-slate-700/80 border border-slate-700'
                }`}
                title={opt.label}
              >
                {opt.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 btn-quest-primary py-2.5 text-sm gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Save Profile</span>
          </button>
        </div>

        {/* Reset progress */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
          {!showConfirmReset ? (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="text-xs text-rose-400/80 hover:text-rose-400 flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Game Progress</span>
            </button>
          ) : (
            <div className="bg-rose-950/40 border border-rose-600/40 rounded-xl p-3 text-center">
              <p className="text-xs text-rose-200 mb-2">
                Are you sure? This will reset all your XP, levels, and badges.
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    onResetProgress();
                    setShowConfirmReset(false);
                    onClose();
                  }}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
