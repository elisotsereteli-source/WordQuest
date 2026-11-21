import React from 'react';
import { Play, Lock, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import type { PlayerProgress } from '../utils/storage';
import { QUESTS } from '../data/vocabulary';
import type { QuestInfo } from '../data/vocabulary';
import { sound } from '../utils/audio';

interface AdventureMapProps {
  progress: PlayerProgress;
  onStartQuest: (questId: string) => void;
  onOpenCodex: (levelFilter?: string) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  progress,
  onStartQuest,
  onOpenCodex,
}) => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-gradient-to-b from-sky-950 via-slate-900 to-indigo-950">
      {/* Map Header & Title Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl px-4 py-2 pointer-events-auto shadow-lg flex items-center gap-2.5">
          <span className="text-xl">🗺️</span>
          <div>
            <h3 className="font-heading font-black text-white text-sm sm:text-base tracking-wide flex items-center gap-1.5">
              <span>The Whispering Archipelago</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 font-bold px-2 py-0.5 rounded-full border border-cyan-700/50">
                5 CEFR Quests
              </span>
            </h3>
            <p className="text-[11px] text-slate-300">
              Clear quests from A1 to C1 to unlock new islands and master 50 English words
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onOpenCodex();
            }}
            className="bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-purple-500/40 text-purple-300 hover:text-white rounded-2xl px-3 py-1.5 pointer-events-auto shadow-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Codex (50)</span>
          </button>
          <div className="bg-slate-900/90 backdrop-blur-md border border-amber-500/30 rounded-2xl px-3 py-1.5 pointer-events-auto shadow-lg flex items-center gap-2">
            <span className="text-xs font-bold text-amber-200">
              {progress.completedQuestIds.length} of {QUESTS.length} Quests Mastered
            </span>
          </div>
        </div>
      </div>

      {/* Illustrated SVG Map Canvas */}
      <div className="relative w-full aspect-[16/9] min-h-[460px] max-h-[620px] select-none">
        <svg
          viewBox="0 0 1000 580"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ocean Gradient */}
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="35%" stopColor="#0c4a6e" />
              <stop offset="70%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Island Gradients */}
            <radialGradient id="islandEmerald" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#047857" />
              <stop offset="100%" stopColor="#022c22" />
            </radialGradient>

            <radialGradient id="islandCyan" cx="45%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="60%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#155e75" />
            </radialGradient>

            <radialGradient id="islandBlue" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#172554" />
            </radialGradient>

            <radialGradient id="islandPurple" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="60%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#3b0764" />
            </radialGradient>

            <radialGradient id="islandGold" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="60%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>
          </defs>

          {/* Ocean Base */}
          <rect width="1000" height="580" fill="url(#oceanGrad)" />

          {/* Ocean waves / currents lines */}
          <g stroke="#38bdf8" strokeOpacity="0.16" strokeWidth="1.5" fill="none" strokeDasharray="8 12">
            <path d="M 50 120 Q 200 90 350 140 T 700 130 T 950 100" />
            <path d="M 30 250 Q 250 290 480 230 T 800 270 T 980 240" />
            <path d="M 80 430 Q 300 390 550 460 T 920 420" />
            <path d="M 120 520 Q 400 480 680 540" />
          </g>

          {/* Compass Rose */}
          <g transform="translate(90, 500) scale(0.55)" opacity="0.6">
            <circle cx="0" cy="0" r="50" fill="none" stroke="#67e8f9" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="40" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <polygon points="0,-60 10,-12 0,0 -10,-12" fill="#fbbf24" />
            <polygon points="0,60 10,12 0,0 -10,12" fill="#d97706" />
            <polygon points="-60,0 -12,-10 0,0 -12,10" fill="#0284c7" />
            <polygon points="60,0 12,-10 0,0 12,10" fill="#38bdf8" />
            <circle cx="0" cy="0" r="6" fill="#fef08a" />
            <text x="0" y="-68" textAnchor="middle" fill="#fef08a" fontSize="14" fontWeight="bold">N</text>
          </g>

          {/* Sailing Ship Icon */}
          <g transform="translate(300, 260) scale(0.7)" opacity="0.75">
            <path d="M -25 8 L 25 8 L 18 20 L -18 20 Z" fill="#78350f" stroke="#b45309" strokeWidth="1.5" />
            <line x1="0" y1="8" x2="0" y2="-22" stroke="#d97706" strokeWidth="2" />
            <path d="M 0 -20 Q 15 -12 0 -2 Z" fill="#f8fafc" opacity="0.9" />
            <path d="M 0 -18 Q -12 -10 0 -2 Z" fill="#e2e8f0" opacity="0.8" />
          </g>

          {/* ISLAND 1: Voyager's Bay (A1 Travel) - Bottom Left */}
          <g id="island-travel">
            <path
              d="M 120 340 C 140 280, 250 260, 310 300 C 360 335, 370 410, 330 460 C 270 515, 170 500, 130 440 C 105 400, 110 365, 120 340 Z"
              fill="url(#islandEmerald)"
              stroke="#34d399"
              strokeWidth="2.5"
            />
            {/* Palm & shore details */}
            <circle cx="170" cy="350" r="14" fill="#059669" opacity="0.9" />
            <circle cx="190" cy="340" r="18" fill="#10b981" opacity="0.8" />
            <circle cx="260" cy="360" r="16" fill="#047857" opacity="0.9" />
          </g>

          {/* ISLAND 2: Sunlit Commons (A2 Daily Conversation) - Top Center-Left */}
          <g id="island-conversation">
            <path
              d="M 330 160 C 360 110, 460 120, 510 160 C 550 200, 540 260, 490 290 C 430 320, 360 290, 330 250 C 310 220, 315 185, 330 160 Z"
              fill="url(#islandCyan)"
              stroke="#22d3ee"
              strokeWidth="2.5"
            />
            {/* Village houses */}
            <rect x="400" y="190" width="16" height="14" fill="#fef08a" />
            <polygon points="396,190 408,178 420,190" fill="#f59e0b" />
            <rect x="425" y="195" width="14" height="12" fill="#bae6fd" />
            <polygon points="421,195 432,185 443,195" fill="#0284c7" />
          </g>

          {/* ISLAND 3: Merchant's Reach (B1 Business and Work) - Bottom Center */}
          <g id="island-business">
            <path
              d="M 520 350 C 550 290, 670 300, 720 350 C 760 400, 740 470, 680 500 C 610 530, 530 490, 510 430 C 495 385, 505 365, 520 350 Z"
              fill="url(#islandBlue)"
              stroke="#60a5fa"
              strokeWidth="2.5"
            />
            {/* Port & Pillars */}
            <rect x="590" y="380" width="8" height="25" fill="#e2e8f0" />
            <rect x="610" y="380" width="8" height="25" fill="#e2e8f0" />
            <polygon points="585,380 609,362 633,380" fill="#93c5fd" />
          </g>

          {/* ISLAND 4: Silicon Spire (B2 Technology) - Top Right */}
          <g id="island-technology">
            <path
              d="M 680 140 C 720 90, 830 100, 870 150 C 910 200, 890 270, 830 290 C 760 310, 690 270, 670 215 C 655 175, 665 155, 680 140 Z"
              fill="url(#islandPurple)"
              stroke="#c084fc"
              strokeWidth="2.5"
            />
            {/* Tech towers */}
            <polygon points="760,130 772,190 748,190" fill="#f0abfc" />
            <polygon points="790,145 800,195 780,195" fill="#a855f7" />
          </g>

          {/* ISLAND 5: Cosmic Caldera (C1 Nature and Science) - Bottom Right */}
          <g id="island-science">
            <path
              d="M 770 390 C 800 330, 920 340, 960 400 C 990 460, 960 520, 900 545 C 830 565, 765 525, 755 465 C 750 425, 758 405, 770 390 Z"
              fill="url(#islandGold)"
              stroke="#fde047"
              strokeWidth="2.5"
            />
            {/* Volcano / Crater Observatory */}
            <polygon points="850,420 870,460 830,460" fill="#fef08a" />
            <circle cx="850" cy="425" r="7" fill="#67e8f9" />
          </g>

          {/* Dotted Adventure Paths connecting the 5 islands in order */}
          {/* Path 1 -> 2 (Travel A1 to Daily Conversation A2) */}
          <path
            d="M 270 340 C 300 260, 340 240, 390 220"
            fill="none"
            stroke="#34d399"
            strokeWidth="3.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Path 2 -> 3 (Daily Conversation A2 to Business B1) */}
          <path
            d="M 460 260 C 500 310, 530 350, 580 390"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Path 3 -> 4 (Business B1 to Technology B2) */}
          <path
            d="M 640 370 C 670 300, 700 260, 740 210"
            fill="none"
            stroke="#818cf8"
            strokeWidth="3.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Path 4 -> 5 (Technology B2 to Nature & Science C1) */}
          <path
            d="M 800 260 C 820 320, 830 360, 850 420"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>

        {/* INTERACTIVE WAYPOINT NODES OVERLAY FOR ALL 5 QUESTS */}
        {QUESTS.map((quest: QuestInfo) => {
          const isUnlocked = progress.unlockedQuestIds.includes(quest.id);
          const isCompleted = progress.completedQuestIds.includes(quest.id);

          // SVG coordinates mapped to percentage
          const leftPercent = (quest.mapCoord.x / 1000) * 100;
          const topPercent = (quest.mapCoord.y / 580) * 100;

          return (
            <div
              key={quest.id}
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center"
            >
              {/* Waypoint Beacon */}
              <div className="relative">
                {isUnlocked && !isCompleted && (
                  <span className="absolute -inset-2.5 rounded-full bg-cyan-400/40 animate-ping" />
                )}

                <button
                  onClick={() => {
                    if (isUnlocked) {
                      sound.playClick();
                      onStartQuest(quest.id);
                    }
                  }}
                  disabled={!isUnlocked}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 shadow-xl flex items-center justify-center transition-all duration-200 ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 border-white hover:scale-110 active:scale-95 cursor-pointer shadow-cyan-500/40 group'
                      : 'bg-slate-900/90 border-slate-700 opacity-70 cursor-not-allowed'
                  }`}
                  title={
                    isUnlocked
                      ? `Click to play ${quest.title} (${quest.level})`
                      : `Locked! Complete previous quest to unlock`
                  }
                >
                  {isUnlocked ? (
                    <span className="text-xl sm:text-2xl transition-transform group-hover:scale-110">
                      {quest.islandEmoji}
                    </span>
                  ) : (
                    <Lock className="w-5 h-5 text-slate-500" />
                  )}
                </button>

                {/* Level Tag Pill on Top */}
                <div
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.2 rounded-full font-heading font-black text-[10px] tracking-wider uppercase border shadow ${
                    isUnlocked
                      ? 'bg-gradient-to-r ' + quest.levelBadgeColor + ' text-slate-950 border-white'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  {quest.level}
                </div>

                {/* Completed Check Badge */}
                {isCompleted && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-slate-900 shadow">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              {/* Waypoint Tooltip Card */}
              <div
                className={`mt-1.5 text-center backdrop-blur-md rounded-2xl p-2 sm:p-2.5 shadow-xl max-w-[170px] sm:max-w-[190px] border transition-all ${
                  isUnlocked
                    ? 'bg-slate-950/90 border-cyan-400/50 hover:border-cyan-300'
                    : 'bg-slate-950/80 border-slate-800 opacity-80'
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-bold text-slate-300">
                  <span>{quest.islandName}</span>
                </div>

                <h4 className="font-heading font-black text-white text-xs sm:text-sm leading-tight mt-0.5">
                  {quest.title}
                </h4>

                <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {quest.theme} • 10 Words
                </p>

                {isUnlocked ? (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onStartQuest(quest.id);
                    }}
                    className={`mt-1.5 w-full py-1 px-2.5 rounded-xl text-slate-950 font-black text-[11px] shadow-md transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      isCompleted
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300'
                        : 'bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300'
                    }`}
                  >
                    <span>{isCompleted ? 'Replay' : 'Enter Quest'}</span>
                    <Play className="w-3 h-3 fill-slate-950" />
                  </button>
                ) : (
                  <div className="mt-1 flex items-center justify-center gap-1 text-[10px] font-bold text-rose-300/80 bg-rose-950/30 rounded-lg py-0.5">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Locked</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Quest Bar: 5 Quests CEFR Level Selector Pill List */}
      <div className="bg-slate-950/95 border-t border-slate-800 p-3 sm:p-4 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quests:
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1">
          {QUESTS.map((q) => {
            const isUnlocked = progress.unlockedQuestIds.includes(q.id);
            const isCompleted = progress.completedQuestIds.includes(q.id);

            return (
              <button
                key={q.id}
                onClick={() => {
                  if (isUnlocked) {
                    sound.playClick();
                    onStartQuest(q.id);
                  }
                }}
                disabled={!isUnlocked}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
                  isUnlocked
                    ? isCompleted
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 hover:bg-emerald-900/60 cursor-pointer'
                      : 'bg-slate-900 border-cyan-500/50 text-white hover:border-cyan-300 cursor-pointer shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-900/40 border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                <span
                  className={`px-1.5 py-0.2 rounded-md font-black text-[10px] uppercase ${
                    isUnlocked
                      ? 'bg-gradient-to-r ' + q.levelBadgeColor + ' text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {q.level}
                </span>

                <span>{q.title}</span>

                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : !isUnlocked ? (
                  <Lock className="w-3 h-3 text-slate-500" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-cyan-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
