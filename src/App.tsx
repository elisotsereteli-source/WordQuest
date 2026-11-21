import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { WordCodexView } from './components/WordCodexView';
import { BadgesView } from './components/BadgesView';
import { ProfileModal } from './components/ProfileModal';
import { QuestRunner } from './components/QuestRunner';
import type { PlayerProgress } from './utils/storage';
import {
  loadProgress,
  saveProgress,
  resetProgress,
} from './utils/storage';
import { sound } from './utils/audio';
import { QUESTS, getQuestById } from './data/vocabulary';
import type { QuestInfo } from './data/vocabulary';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<PlayerProgress>(() => loadProgress());
  const [activeView, setActiveView] = useState<'home' | 'codex' | 'quest' | 'badges'>('home');
  const [selectedQuestId, setSelectedQuestId] = useState<string>('quest-travel');
  const [codexLevelFilter, setCodexLevelFilter] = useState<string>('ALL');
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [unlockedNextQuest, setUnlockedNextQuest] = useState<QuestInfo | undefined>(undefined);

  // Sync sound controller with saved preference
  useEffect(() => {
    sound.enabled = progress.soundEnabled;
  }, [progress.soundEnabled]);

  // Save progress whenever it updates
  const updateProgress = (updater: (prev: PlayerProgress) => PlayerProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  };

  const handleToggleSound = () => {
    sound.playClick();
    updateProgress((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  const handleUpdateProfile = (name: string, avatar: string) => {
    updateProgress((prev) => ({
      ...prev,
      playerName: name,
      avatar: avatar,
    }));
  };

  const handleReset = () => {
    const reset = resetProgress();
    setProgress(reset);
    setSelectedQuestId('quest-travel');
    setActiveView('home');
  };

  const handleStartQuest = (questId: string = 'quest-travel') => {
    setSelectedQuestId(questId);
    setUnlockedNextQuest(undefined);
    setActiveView('quest');
  };

  const handleOpenCodex = (levelFilter?: string) => {
    setCodexLevelFilter(levelFilter || 'ALL');
    setActiveView('codex');
  };

  const handleQuestFinished = (finishedQuestId: string, score: number, totalErrors: number) => {
    const currentQuest = getQuestById(finishedQuestId);
    if (!currentQuest) return;

    // Find if there is a next quest in order to unlock
    const nextQuest = QUESTS.find((q) => q.order === currentQuest.order + 1);

    updateProgress((prev) => {
      const newXp = prev.xp + score + currentQuest.xpReward;
      const newCompletedCount = prev.completedQuests + 1;
      const newHighScore = Math.max(prev.highScore, score);

      // Track completed quest IDs
      const completedSet = new Set([...prev.completedQuestIds, finishedQuestId]);
      const completedQuestIds = Array.from(completedSet);

      // Unlock next quest ID if available
      const unlockedSet = new Set(prev.unlockedQuestIds);
      let nextUnlocked: QuestInfo | undefined = undefined;

      if (nextQuest && !unlockedSet.has(nextQuest.id)) {
        unlockedSet.add(nextQuest.id);
        nextUnlocked = nextQuest;
      }
      const unlockedQuestIds = Array.from(unlockedSet);

      // Add words from this quest to masteredWords
      const questWordIds = currentQuest.words.map((w) => w.id);
      const updatedMastered = Array.from(new Set([...prev.masteredWords, ...questWordIds]));

      // Check badges to unlock
      const unlocked = [...prev.unlockedBadges];
      if (!unlocked.includes('first_quest')) unlocked.push('first_quest');
      if (!unlocked.includes('storyteller')) unlocked.push('storyteller');

      // Specific level badges
      if (finishedQuestId === 'quest-travel' && !unlocked.includes('a1_cleared')) {
        unlocked.push('a1_cleared');
      }
      if (finishedQuestId === 'quest-conversation' && !unlocked.includes('a2_cleared')) {
        unlocked.push('a2_cleared');
      }
      if (finishedQuestId === 'quest-business' && !unlocked.includes('b1_cleared')) {
        unlocked.push('b1_cleared');
      }
      if (finishedQuestId === 'quest-technology' && !unlocked.includes('b2_cleared')) {
        unlocked.push('b2_cleared');
      }
      if (finishedQuestId === 'quest-science' && !unlocked.includes('c1_cleared')) {
        unlocked.push('c1_cleared');
      }

      if (!unlocked.includes('word_master') && updatedMastered.length >= 30) {
        unlocked.push('word_master');
      }
      if (!unlocked.includes('perfectionist') && totalErrors === 0) {
        unlocked.push('perfectionist');
      }
      if (!unlocked.includes('xp_hunter') && newXp >= 500) {
        unlocked.push('xp_hunter');
      }

      setUnlockedNextQuest(nextUnlocked);

      return {
        ...prev,
        xp: newXp,
        completedQuests: newCompletedCount,
        highScore: newHighScore,
        masteredWords: updatedMastered,
        unlockedBadges: unlocked,
        unlockedQuestIds,
        completedQuestIds,
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <Header
        progress={progress}
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
        onOpenProfile={() => {
          sound.playClick();
          setShowProfileModal(true);
        }}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 max-w-6xl mx-auto w-full">
        {activeView === 'home' && (
          <HomeScreen
            progress={progress}
            onStartQuest={(questId) => handleStartQuest(questId)}
            onOpenCodex={(level) => handleOpenCodex(level)}
            onOpenBadges={() => setActiveView('badges')}
            onOpenProfile={() => setShowProfileModal(true)}
          />
        )}

        {activeView === 'quest' && (
          <QuestRunner
            questId={selectedQuestId}
            onBackToHome={() => setActiveView('home')}
            onOpenCodex={(level) => handleOpenCodex(level)}
            onQuestFinished={handleQuestFinished}
            currentXp={progress.xp}
            unlockedNextQuest={unlockedNextQuest}
            onStartNextQuest={(nextId) => handleStartQuest(nextId)}
          />
        )}

        {activeView === 'codex' && (
          <WordCodexView
            onBack={() => setActiveView('home')}
            onStartQuest={(questId) => handleStartQuest(questId)}
            masteredWords={progress.masteredWords}
            initialLevelFilter={codexLevelFilter}
          />
        )}

        {activeView === 'badges' && (
          <BadgesView
            progress={progress}
            onBack={() => setActiveView('home')}
            onStartQuest={() => handleStartQuest('quest-travel')}
          />
        )}
      </main>

      {/* Character Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          progress={progress}
          onClose={() => setShowProfileModal(false)}
          onUpdateProfile={handleUpdateProfile}
          onResetProgress={handleReset}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🧭</span>
            <span className="font-heading font-black text-slate-400">WordQuest</span>
            <span>• 5 CEFR Levels (A1, A2, B1, B2, C1)</span>
          </div>
          <p className="text-slate-400">
            5 Thematic Quests • 50 Words with Audio & Georgian Translations (ქართული თარგმანით)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
