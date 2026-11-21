import React, { useState } from 'react';
import { Volume2, Search, ArrowLeft, CheckCircle, Play } from 'lucide-react';
import { VOCABULARY_LIST, QUESTS } from '../data/vocabulary';
import type { WordItem } from '../data/vocabulary';
import { sound } from '../utils/audio';

interface WordCodexViewProps {
  onBack: () => void;
  onStartQuest: (questId: string) => void;
  masteredWords: string[];
  initialLevelFilter?: string;
}

export const WordCodexView: React.FC<WordCodexViewProps> = ({
  onBack,
  onStartQuest,
  masteredWords,
  initialLevelFilter = 'ALL',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>(initialLevelFilter);
  const [selectedWord, setSelectedWord] = useState<WordItem | null>(null);

  const filteredWords = VOCABULARY_LIST.filter((item) => {
    const matchesLevel = selectedLevel === 'ALL' || item.level === selectedLevel;
    const matchesSearch =
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.georgian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.level.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.speak(text);
  };

  const LEVEL_FILTERS: { id: string; label: string; badge: string; count: number }[] = [
    { id: 'ALL', label: 'All Levels', badge: '50 Words', count: VOCABULARY_LIST.length },
    { id: 'A1', label: 'Travel (A1)', badge: 'A1', count: 10 },
    { id: 'A2', label: 'Daily Chat (A2)', badge: 'A2', count: 10 },
    { id: 'B1', label: 'Business (B1)', badge: 'B1', count: 10 },
    { id: 'B2', label: 'Technology (B2)', badge: 'B2', count: 10 },
    { id: 'C1', label: 'Nature & Science (C1)', badge: 'C1', count: 10 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-pop">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-purple-500/30 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
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
              <span className="text-2xl">📖</span>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Explorer's Word Codex
              </h1>
            </div>
            <p className="text-sm text-slate-300 mt-0.5">
              Study all 50 vocabulary words across 5 CEFR levels (A1 to C1) with audio pronunciation & Georgian translations.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onStartQuest('quest-travel');
          }}
          className="btn-quest-primary px-5 py-2.5 text-sm gap-2 shrink-0"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Play Quests</span>
        </button>
      </div>

      {/* CEFR Level Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {LEVEL_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              sound.playClick();
              setSelectedLevel(f.id);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border cursor-pointer ${
              selectedLevel === f.id
                ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-md shadow-purple-500/20 scale-105'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <span>{f.label}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-slate-800 text-slate-300 font-black">
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search 50 words, English definitions, or Georgian meanings (მაგ. ბილეთი, ალგორითმი)..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 shadow-inner"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWords.map((item) => {
          const isMastered = masteredWords.includes(item.id);
          const quest = QUESTS.find((q) => q.id === item.questId);

          return (
            <div
              key={item.id}
              onClick={() => setSelectedWord(item)}
              className="group card-quest p-5 hover:border-purple-500/70 transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl p-2 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-inner">
                      {item.emoji}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading font-black text-2xl text-white group-hover:text-cyan-300 transition-colors capitalize">
                          {item.word}
                        </h3>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-cyan-700/50">
                          {item.level}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          {item.partOfSpeech}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-purple-300 flex items-center gap-1.5 mt-0.5">
                        <span>🔊</span>
                        <span>{item.phonetic}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleSpeak(item.word, e)}
                      className="w-9 h-9 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-600/50 flex items-center justify-center text-purple-300 hover:text-white transition-all shadow-sm cursor-pointer"
                      title="Listen to pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isMastered && (
                      <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400" title="Word Mastered!">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Georgian Translation Pill */}
                <div className="mb-3 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-500/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">
                    🇬🇪 ქართულად:
                  </span>
                  <span className="text-sm font-bold text-amber-200">
                    {item.georgian}
                  </span>
                </div>

                {/* English Definition */}
                <p className="text-sm text-slate-200 leading-relaxed mb-3">
                  <strong className="text-cyan-300 font-semibold">Meaning: </strong>
                  {item.definition}
                </p>

                {/* Example Sentence */}
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-xs sm:text-sm text-slate-300 italic">
                  "{item.sentence}"
                </div>
              </div>

              {/* Bottom Synonyms & Quest Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-slate-400">Quest:</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-bold">
                    {quest?.title || item.level}
                  </span>
                </div>
                <button
                  onClick={(e) => handleSpeak(item.sentence, e)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Hear Sentence</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-12 bg-slate-900/60 rounded-3xl border border-slate-800 p-8">
          <p className="text-lg text-slate-300">No words match your filter criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedLevel('ALL');
            }}
            className="mt-3 text-sm text-cyan-400 hover:underline font-bold cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Modal Detail for full inspection */}
      {selectedWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-pop">
          <div className="bg-slate-900 border-2 border-purple-500/80 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedWord(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-black w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl p-2 rounded-2xl bg-purple-950/60 border border-purple-700/50">
                {selectedWord.emoji}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-black text-3xl text-white capitalize">
                    {selectedWord.word}
                  </h3>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                    {selectedWord.level}
                  </span>
                </div>
                <span className="text-xs font-mono text-purple-300">
                  {selectedWord.phonetic}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-amber-500/15 border border-amber-500/30 rounded-2xl">
                <span className="text-xs font-bold text-amber-300 block mb-1">
                  Georgian Meaning (ქართული თარგმანი):
                </span>
                <span className="text-base font-bold text-amber-100">
                  {selectedWord.georgian}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
                  Simple English Definition:
                </span>
                <p className="text-base text-slate-100 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                  {selectedWord.definition}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-slate-400 block mb-1">
                  Example Context Sentence:
                </span>
                <p className="text-sm text-cyan-200 italic bg-cyan-950/30 p-3 rounded-2xl border border-cyan-800/40">
                  "{selectedWord.sentence}"
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => sound.speak(selectedWord.word)}
                  className="flex-1 btn-quest-purple py-2.5 text-sm gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Pronounce Word</span>
                </button>
                <button
                  onClick={() => sound.speak(selectedWord.sentence)}
                  className="flex-1 btn-quest-turquoise py-2.5 text-sm gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Read Sentence</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
