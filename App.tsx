import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  Volume2,
  RotateCcw,
  Trophy,
  Eye,
  EyeOff,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  ChevronRight,
  Timer,
  Play,
  Pause,
  Flame,
  Check,
  Languages,
  GraduationCap,
} from 'lucide-react';

import {
  SER_ESTAR_RULES,
  SER_ESTAR_EXERCISES,
  COLORS_GUIDE,
  COLORS_EXERCISES,
  COLORS_EXCEPTIONS_EXERCISES,
  ADJECTIVES_FILL_EXERCISES,
  PLURAL_EXERCISES,
  ERROR_EXERCISES,
  SPEAKING_PRACTICE,
  FULL_DIALOGUE,
} from './data.ts';
import { playSpanishAudio } from './audio.ts';

type TabType =
  | 'dialogue'
  | 'ser_estar_rules'
  | 'ser_estar_practice'
  | 'colors'
  | 'adjectives'
  | 'find_errors'
  | 'speaking_builder';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dialogue');

  // Popover / Modal with Russian translation and pronunciation
  const [modalData, setModalData] = useState<{
    es: string;
    ru: string;
    note?: string;
  } | null>(null);

  // Score & Streak tracking
  const [score, setScore] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);

  // Dialogue states
  const [revealedDialogueRu, setRevealedDialogueRu] = useState<Record<number, boolean>>({});
  const [showAllDialogueTranslations, setShowAllDialogueTranslations] = useState<boolean>(false);
  const [dialogueFilter, setDialogueFilter] = useState<'all' | 'Ana' | 'Pablo'>('all');

  // Ser/Estar Exercise state
  const [serEstarAnswers, setSerEstarAnswers] = useState<Record<number, string>>({});

  // Colors Exercises state
  const [colorsAnswers, setColorsAnswers] = useState<Record<number, string>>({});
  const [colorsExceptionsAnswers, setColorsExceptionsAnswers] = useState<Record<number, string>>({});

  // Adjectives Exercises state
  const [adjFillAnswers, setAdjFillAnswers] = useState<Record<number, string>>({});
  const [pluralAnswers, setPluralAnswers] = useState<Record<number, string>>({});

  // Find Error state
  const [errorFixed, setErrorFixed] = useState<Record<number, boolean>>({});

  // Speaking constructor states
  const [builderStep, setBuilderStep] = useState<number>(1);
  const [revealedBuilderAnswers, setRevealedBuilderAnswers] = useState<Record<string, boolean>>({});
  const [customSpeakingSeconds, setCustomSpeakingSeconds] = useState<number>(30);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Timer for 30s speaking game
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && customSpeakingSeconds > 0) {
      interval = setInterval(() => {
        setCustomSpeakingSeconds((prev) => prev - 1);
      }, 1000);
    } else if (customSpeakingSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, customSpeakingSeconds]);

  // Click on any Spanish phrase helper
  const handleSpanishClick = (es: string, ru: string, note?: string) => {
    playSpanishAudio(es);
    setModalData({ es, ru, note });
  };

  // Toggle dialogue line translation
  const handleDialogueLineClick = (lineId: number, es: string, ru: string) => {
    playSpanishAudio(es);
    setRevealedDialogueRu((prev) => ({ ...prev, [lineId]: !prev[lineId] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 text-base leading-relaxed">
      {/* Top Banner */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Languages className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">Español Activo</h1>
                <span className="text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  🇪🇸 Испанский ➔ 🇷🇺 Русский
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Нажми на испанский текст для перевода на русский 🇷🇺 и озвучки 🔊
              </p>
            </div>
          </div>

          {/* Quick Stats & Badges */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm font-semibold text-slate-800">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Очки: <strong className="text-amber-700 font-extrabold">{score}</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-800">
              <Flame className="w-5 h-5 text-emerald-600" />
              <span>Решено: {totalAttempts}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none py-2.5 border-t border-slate-100">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => setActiveTab('dialogue')}
              className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-bold rounded-xl transition-all ${
                activeTab === 'dialogue'
                  ? 'bg-red-600 text-white shadow-md shadow-red-500/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Диалог Ana & Pablo</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-900 font-bold">Клик = перевод</span>
            </button>

            <button
              onClick={() => setActiveTab('ser_estar_rules')}
              className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-bold rounded-xl transition-all ${
                activeTab === 'ser_estar_rules'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-500/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>1. Правило SER / ESTAR</span>
            </button>

            <button
              onClick={() => setActiveTab('ser_estar_practice')}
              className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-bold rounded-xl transition-all ${
                activeTab === 'ser_estar_practice'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>2. Тест SER / ESTAR (15)</span>
            </button>

            <button
              onClick={() => setActiveTab('colors')}
              className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-bold rounded-xl transition-all ${
                activeTab === 'colors'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>3-5. Цвета (+ жёлтый, оранжевый)</span>
            </button>

            <button
              onClick={() => setActiveTab('adjectives')}
              className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-bold rounded-xl transition-all ${
                activeTab === 'adjectives'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>6-8. Прилагательные</span>
            </button>

            <button
              onClick={() => setActiveTab('find_errors')}
              className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-bold rounded-xl transition-all ${
                activeTab === 'find_errors'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>9. Найди ошибку (8)</span>
            </button>

            <button
              onClick={() => setActiveTab('speaking_builder')}
              className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-bold rounded-xl transition-all ${
                activeTab === 'speaking_builder'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Разговорный конструктор 🗣️</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        {/* TAB 1: DIALOGUE (Ana & Pablo) */}
        {activeTab === 'dialogue' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-7 text-white shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
                    <MessageSquare className="w-4 h-4" />
                    <span>Живой диалог: Ana & Pablo</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                    🇪🇸 Diálogo / 🇷🇺 Диалог
                  </h2>
                  <p className="mt-2 text-red-100 text-base sm:text-lg max-w-2xl leading-relaxed">
                    <strong>Инструкция:</strong> Нажми на любую испанскую фразу — она прозвучит вслух 🔊, и откроется её русский перевод!
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      const newState = !showAllDialogueTranslations;
                      setShowAllDialogueTranslations(newState);
                      const allDict: Record<number, boolean> = {};
                      FULL_DIALOGUE.forEach((d) => (allDict[d.id] = newState));
                      setRevealedDialogueRu(allDict);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 text-sm sm:text-base font-bold shadow-md hover:bg-red-50 transition-colors"
                  >
                    {showAllDialogueTranslations ? <EyeOff className="w-5 h-5 text-red-600" /> : <Eye className="w-5 h-5 text-emerald-600" />}
                    <span>{showAllDialogueTranslations ? 'Скрыть перевод' : 'Показать весь перевод'}</span>
                  </button>

                  <div className="flex items-center bg-black/25 rounded-xl p-1 text-sm font-bold">
                    <button
                      onClick={() => setDialogueFilter('all')}
                      className={`px-3.5 py-2 rounded-lg transition-all ${dialogueFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'}`}
                    >
                      Все (22)
                    </button>
                    <button
                      onClick={() => setDialogueFilter('Ana')}
                      className={`px-3.5 py-2 rounded-lg transition-all ${dialogueFilter === 'Ana' ? 'bg-white text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'}`}
                    >
                      Ана
                    </button>
                    <button
                      onClick={() => setDialogueFilter('Pablo')}
                      className={`px-3.5 py-2 rounded-lg transition-all ${dialogueFilter === 'Pablo' ? 'bg-white text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'}`}
                    >
                      Пабло
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dialogue Messages List */}
            <div className="space-y-5">
              {FULL_DIALOGUE.filter((d) => dialogueFilter === 'all' || d.speaker === dialogueFilter).map((line) => {
                const isAna = line.speaker === 'Ana';
                const isRevealedRu = revealedDialogueRu[line.id] || showAllDialogueTranslations;

                return (
                  <div
                    key={line.id}
                    className={`flex flex-col ${isAna ? 'items-start' : 'items-end'} transition-all`}
                  >
                    <div className="flex items-center gap-2 mb-1.5 px-1.5">
                      <span className={`text-sm sm:text-base font-extrabold uppercase tracking-wider ${isAna ? 'text-rose-600' : 'text-indigo-600'}`}>
                        {isAna ? '👩 Ana' : '👦 Pablo'}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-400 font-semibold">#{line.id}</span>
                    </div>

                    <div
                      onClick={() => handleDialogueLineClick(line.id, line.es, line.ru)}
                      className={`group cursor-pointer relative max-w-3xl rounded-3xl p-5 sm:p-6 shadow-sm border transition-all hover:shadow-md hover:scale-[1.008] ${
                        isAna
                          ? 'bg-rose-50/80 border-rose-200/90 hover:border-rose-400'
                          : 'bg-indigo-50/80 border-indigo-200/90 hover:border-indigo-400'
                      }`}
                    >
                      {/* Spanish sentence (Clickable, Large Font) */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playSpanishAudio(line.es);
                            }}
                            className="p-2.5 rounded-full bg-white text-slate-700 hover:text-red-600 shadow-xs hover:scale-110 transition-transform shrink-0"
                            title="Прослушать произношение"
                          >
                            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                          <p className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-red-700 transition-colors leading-snug">
                            {line.es}
                          </p>
                        </div>
                        <span className="text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200 text-slate-600 whitespace-nowrap shrink-0">
                          {isRevealedRu ? 'Русский открыт' : 'Кликни'}
                        </span>
                      </div>

                      {/* Russian translation (Large Font) */}
                      {isRevealedRu && (
                        <div className="mt-3.5 pt-3.5 border-t border-slate-200/70 flex items-start gap-2.5 text-base sm:text-lg text-slate-800 bg-white/90 p-3 rounded-2xl animate-fadeIn">
                          <span className="text-lg sm:text-xl shrink-0">🇷🇺</span>
                          <span className="font-semibold leading-relaxed">{line.ru}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 2: SER / ESTAR RULES */}
        {activeTab === 'ser_estar_rules' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-7 text-white shadow-lg">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
                  <BookOpen className="w-4 h-4" />
                  <span>Раздел 1: Теория и шпаргалка</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  SER vs ESTAR — Шпаргалка с крупным шрифтом и озвучкой
                </h2>
                <p className="mt-2 text-amber-100 text-base sm:text-lg leading-relaxed">
                  <strong>SER</strong> — постоянные качества, суть, происхождение, время. <br />
                  <strong>ESTAR</strong> — местонахождение, временные состояния и эмоции.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SER_ESTAR_RULES.map((rule) => (
                <div
                  key={rule.verb}
                  className={`rounded-3xl border bg-white p-7 shadow-sm ${
                    rule.verb === 'SER' ? 'border-amber-200 hover:border-amber-400' : 'border-blue-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-4 py-1.5 text-base font-black tracking-wider rounded-xl ${
                        rule.verb === 'SER' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      Глагол {rule.verb}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400 font-bold">Кликни для 🇷🇺 перевода</span>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">
                    {rule.ruleRu}
                  </p>

                  <div className="space-y-3.5">
                    {rule.examples.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSpanishClick(item.es, item.ru, `Использование: ${item.usage}`)}
                        className="group p-4 rounded-2xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 transition-all cursor-pointer bg-slate-50/60"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playSpanishAudio(item.es);
                              }}
                              className="text-slate-400 hover:text-amber-600 p-1"
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>
                            <span className="font-extrabold text-slate-900 group-hover:text-amber-900 text-lg sm:text-xl">
                              {item.es}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-lg bg-white text-slate-600 border border-slate-200">
                            {item.usage}
                          </span>
                        </div>

                        <div className="mt-2 text-sm sm:text-base text-slate-700 flex items-center gap-2 font-medium">
                          <span>🇷🇺</span>
                          <span>{item.ru}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick summary formula banner */}
            <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <Lightbulb className="w-7 h-7 text-amber-600 shrink-0" />
                <div className="text-base sm:text-lg text-amber-950 font-medium">
                  <strong className="block text-lg sm:text-xl font-bold mb-1">Лайфхак для запоминания:</strong>
                  <strong>SER</strong> — постоянные свойства, профессия, национальность, время. <br />
                  <strong>ESTAR</strong> — где находится объект или как он себя чувствует прямо сейчас.
                </div>
              </div>
              <button
                onClick={() => setActiveTab('ser_estar_practice')}
                className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm sm:text-base shadow-md shrink-0 flex items-center gap-2"
              >
                <span>Перейти к тесту (15 заданий)</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {/* TAB 3: SER / ESTAR 15 EXERCISES */}
        {activeTab === 'ser_estar_practice' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-7 text-white shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
                    <GraduationCap className="w-4 h-4" />
                    <span>Раздел 2: Практика (15 вопросов)</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                    SER / ESTAR — переведи с русского на испанский
                  </h2>
                  <p className="mt-2 text-indigo-100 text-base sm:text-lg">
                    Заполни пропуски правильной формой глагола. Крупный шрифт и моментальная проверка!
                  </p>
                </div>

                <button
                  onClick={() => setSerEstarAnswers({})}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm sm:text-base font-bold transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Сбросить ответы</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SER_ESTAR_EXERCISES.map((item) => {
                const selected = serEstarAnswers[item.id];
                const isCorrect = selected === item.correct;
                const isAnswered = Boolean(selected);

                return (
                  <div
                    key={item.id}
                    className={`p-6 rounded-3xl border transition-all bg-white shadow-xs ${
                      isAnswered
                        ? isCorrect
                          ? 'border-emerald-300 ring-2 ring-emerald-100'
                          : 'border-rose-300 ring-2 ring-rose-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-400">Вопрос #{item.id}</span>
                      <span className="text-sm sm:text-base font-bold text-indigo-800 bg-indigo-50 px-3 py-1 rounded-lg">
                        🇷🇺 {item.promptRu}
                      </span>
                    </div>

                    <div className="text-xl sm:text-2xl font-black text-slate-900 my-4 flex items-center justify-between">
                      <span>{item.templateEs}</span>
                      <button
                        type="button"
                        onClick={() => playSpanishAudio(item.fullEs)}
                        className="text-slate-400 hover:text-indigo-600 p-1.5"
                        title="Прослушать"
                      >
                        <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>

                    {/* Options Buttons */}
                    <div className="grid grid-cols-4 gap-2.5 mb-3">
                      {item.options.map((opt) => {
                        const isThisChosen = selected === opt;
                        const isThisCorrect = opt === item.correct;

                        let btnStyle = 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200';
                        if (isAnswered) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-extrabold';
                          } else if (isThisChosen) {
                            btnStyle = 'bg-rose-500 text-white border-rose-500 font-extrabold';
                          }
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isAnswered}
                            onClick={() => {
                              setSerEstarAnswers((prev) => ({ ...prev, [item.id]: opt }));
                              setTotalAttempts((prev) => prev + 1);
                              if (opt === item.correct) {
                                setScore((prev) => prev + 10);
                                playSpanishAudio(item.fullEs);
                              }
                            }}
                            className={`py-3 px-3 text-base sm:text-lg font-bold rounded-xl border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback */}
                    {isAnswered && (
                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-sm sm:text-base font-extrabold">
                            {isCorrect ? (
                              <span className="text-emerald-600 flex items-center gap-1.5">
                                <CheckCircle2 className="w-5 h-5" /> Верно! ({item.fullEs})
                              </span>
                            ) : (
                              <span className="text-rose-600 flex items-center gap-1.5">
                                <XCircle className="w-5 h-5" /> Правильно: {item.correct}
                              </span>
                            )}
                          </div>
                        </div>

                        <div
                          onClick={() => handleSpanishClick(item.fullEs, item.promptRu, item.explanation)}
                          className="cursor-pointer p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-sm sm:text-base text-amber-950 font-semibold hover:bg-amber-100/70 transition-all"
                        >
                          <span>💡 {item.explanation}</span>
                          <span className="text-amber-800 underline shrink-0 ml-3">Слушать 🔊</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 4: COLORS & EXCEPTIONS (WITH DETAILED YELLOW & ORANGE) */}
        {activeTab === 'colors' && (
          <section className="space-y-8">
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 rounded-3xl p-7 text-white shadow-lg">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>Разделы 3, 4 и 5: Цвета в испанском</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Цвета — Род, Число, Жёлтый (Amarillo) и Оранжевый (Naranja)
                </h2>
                <p className="mt-2 text-white/95 text-base sm:text-lg leading-relaxed">
                  Подробное руководство: как изменяется <strong>жёлтый цвет</strong> (-o/-a) и почему <strong>оранжевый цвет</strong> никогда не меняется по родам!
                </p>
              </div>
            </div>

            {/* Special Highlight for Yellow and Orange */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Yellow Guide Card */}
              <div className="bg-amber-50/80 rounded-3xl border-2 border-amber-300 p-6 sm:p-7 shadow-sm">
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-amber-500 shadow-xs flex items-center justify-center font-bold text-amber-950 text-base">
                    ☀️
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-amber-950">{COLORS_GUIDE.yellowSpecialRule.title}</h3>
                    <span className="text-sm sm:text-base font-bold text-amber-800">Меняется по родам и числам (-o / -a / -os / -as)</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-amber-900 mb-5 leading-relaxed bg-white/90 p-4 rounded-2xl border border-amber-200">
                  {COLORS_GUIDE.yellowSpecialRule.explanation}
                </p>

                <div className="space-y-2.5">
                  <div className="text-sm sm:text-base font-extrabold text-amber-950">Примеры (нажми для озвучки и перевода):</div>
                  {COLORS_GUIDE.yellowSpecialRule.examples.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSpanishClick(item.es, item.ru)}
                      className="cursor-pointer p-3.5 rounded-2xl bg-white border border-amber-200 hover:border-amber-400 hover:bg-amber-100/50 flex items-center justify-between text-base transition-all"
                    >
                      <span className="font-extrabold text-slate-900 text-base sm:text-lg">{item.es}</span>
                      <span className="text-slate-600 font-semibold text-sm sm:text-base">🇷🇺 {item.ru}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Orange Guide Card */}
              <div className="bg-orange-50/80 rounded-3xl border-2 border-orange-300 p-6 sm:p-7 shadow-sm">
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-orange-600 shadow-xs flex items-center justify-center font-bold text-white text-base">
                    🍊
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-orange-950">{COLORS_GUIDE.orangeSpecialRule.title}</h3>
                    <span className="text-sm sm:text-base font-bold text-orange-800">НЕ меняется по родам! (Всегда naranja)</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-orange-900 mb-5 leading-relaxed bg-white/90 p-4 rounded-2xl border border-orange-200">
                  {COLORS_GUIDE.orangeSpecialRule.explanation}
                </p>

                <div className="space-y-2.5">
                  <div className="text-sm sm:text-base font-extrabold text-orange-950">Примеры (нажми для озвучки и перевода):</div>
                  {COLORS_GUIDE.orangeSpecialRule.examples.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSpanishClick(item.es, item.ru)}
                      className="cursor-pointer p-3.5 rounded-2xl bg-white border border-orange-200 hover:border-orange-400 hover:bg-orange-100/50 flex items-center justify-between text-base transition-all"
                    >
                      <span className="font-extrabold text-slate-900 text-base sm:text-lg">{item.es}</span>
                      <span className="text-slate-600 font-semibold text-sm sm:text-base">🇷🇺 {item.ru}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colors Rule Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Changeable colors */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  Цвета на -o (меняются на -a в женском роде)
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {COLORS_GUIDE.ruleChange.map((col) => (
                    <div
                      key={col.m}
                      onClick={() => handleSpanishClick(`${col.m} / ${col.f}`, col.ru)}
                      className="cursor-pointer p-3.5 rounded-2xl border border-slate-100 hover:border-emerald-300 bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-base sm:text-lg font-bold text-slate-900">
                          {col.m} → {col.f}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 font-medium">{col.ru}</div>
                      </div>
                      <div
                        className="w-6 h-6 rounded-full border border-slate-300 shadow-xs"
                        style={{ backgroundColor: col.hex }}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm sm:text-base text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="font-extrabold text-slate-900">Примеры в речи (нажми для озвучки):</div>
                  {COLORS_GUIDE.examplesChange.map((ex, i) => (
                    <div
                      key={i}
                      onClick={() => handleSpanishClick(ex.es, ex.ru)}
                      className="cursor-pointer hover:text-emerald-700 flex items-center justify-between py-1"
                    >
                      <span className="font-bold">{ex.es}</span>
                      <span className="text-slate-500">🇷🇺 {ex.ru}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invariable by gender colors */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-teal-500"></span>
                  Цвета, которые НЕ меняются по роду
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {COLORS_GUIDE.ruleNoChangeGender.map((col) => (
                    <div
                      key={col.es}
                      onClick={() => handleSpanishClick(`${col.es} (pl: ${col.pl})`, col.ru)}
                      className="cursor-pointer p-3.5 rounded-2xl border border-slate-100 hover:border-teal-300 bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-base sm:text-lg font-bold text-slate-900">
                          {col.es} <span className="text-xs text-slate-400">({col.pl})</span>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 font-medium">{col.ru}</div>
                      </div>
                      <div
                        className="w-6 h-6 rounded-full border border-slate-300 shadow-xs shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Test 4: Choose correct form (12 items) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Раздел 4: Выбери правильную форму цвета (12)</h3>
                  <p className="text-sm sm:text-base text-slate-500">Включая жёлтый и оранжевый цвета</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COLORS_EXERCISES.map((item) => {
                  const selected = colorsAnswers[item.id];
                  const isAnswered = Boolean(selected);
                  const isCorrect = selected === item.correct;

                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-rose-50/50 border-rose-200'
                          : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base sm:text-lg font-bold text-slate-900">{item.prompt}</span>
                        <span className="text-xs sm:text-sm text-slate-500 font-semibold">🇷🇺 {item.ru}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.options.map((opt) => {
                          const isOptionCorrect = opt.key === item.correct;
                          const isOptionChosen = selected === opt.key;

                          let btnStyle = 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100';
                          if (isAnswered) {
                            if (isOptionCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-extrabold';
                            else if (isOptionChosen) btnStyle = 'bg-rose-500 text-white border-rose-500 font-extrabold';
                          }

                          return (
                            <button
                              key={opt.key}
                              disabled={isAnswered}
                              onClick={() => {
                                setColorsAnswers((prev) => ({ ...prev, [item.id]: opt.key }));
                                setTotalAttempts((prev) => prev + 1);
                                if (opt.key === item.correct) {
                                  setScore((prev) => prev + 10);
                                  playSpanishAudio(item.fullEs);
                                }
                              }}
                              className={`flex-1 py-2.5 px-4 text-sm sm:text-base font-bold rounded-xl border transition-all ${btnStyle}`}
                            >
                              {opt.key}) {opt.text}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 text-sm flex items-center justify-between">
                          <span className="text-slate-700 font-medium">{item.explanation}</span>
                          <button
                            type="button"
                            onClick={() => playSpanishAudio(item.fullEs)}
                            className="text-emerald-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5"
                          >
                            <Volume2 className="w-4 h-4" />
                            {item.fullEs}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Test 5: Exceptions & tricky cases (10 items) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Раздел 5: Исключения и сложные случаи с цветами (10)</h3>
                  <p className="text-sm sm:text-base text-slate-500">naranja, rosa, beige, amarillas, marrones, azules, grises</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COLORS_EXCEPTIONS_EXERCISES.map((item) => {
                  const selected = colorsExceptionsAnswers[item.id];
                  const isAnswered = Boolean(selected);
                  const isCorrect = selected === item.correct;

                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-rose-50/50 border-rose-200'
                          : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base sm:text-lg font-bold text-slate-900">{item.prompt}</span>
                        <span className="text-xs sm:text-sm text-slate-500 font-semibold">🇷🇺 {item.ru}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.options.map((opt) => {
                          const isOptionCorrect = opt.key === item.correct;
                          const isOptionChosen = selected === opt.key;

                          let btnStyle = 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100';
                          if (isAnswered) {
                            if (isOptionCorrect) btnStyle = 'bg-teal-600 text-white border-teal-600 font-extrabold';
                            else if (isOptionChosen) btnStyle = 'bg-rose-500 text-white border-rose-500 font-extrabold';
                          }

                          return (
                            <button
                              key={opt.key}
                              disabled={isAnswered}
                              onClick={() => {
                                setColorsExceptionsAnswers((prev) => ({ ...prev, [item.id]: opt.key }));
                                setTotalAttempts((prev) => prev + 1);
                                if (opt.key === item.correct) {
                                  setScore((prev) => prev + 10);
                                  playSpanishAudio(item.fullEs);
                                }
                              }}
                              className={`flex-1 py-2.5 px-4 text-sm sm:text-base font-bold rounded-xl border transition-all ${btnStyle}`}
                            >
                              {opt.key}) {opt.text}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 text-sm flex items-center justify-between">
                          <span className="text-slate-700 font-medium">{item.explanation}</span>
                          <button
                            type="button"
                            onClick={() => playSpanishAudio(item.fullEs)}
                            className="text-teal-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5"
                          >
                            <Volume2 className="w-4 h-4" />
                            {item.fullEs}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* TAB 5: ADJECTIVES & PLURALS */}
        {activeTab === 'adjectives' && (
          <section className="space-y-8">
            <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl p-7 text-white shadow-lg">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
                  <BookOpen className="w-4 h-4" />
                  <span>Разделы 6, 7 и 8: Прилагательные и Множественное число</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Прилагательные — Мужской, Женский род и Множественное число
                </h2>
                <p className="mt-2 text-sky-100 text-base sm:text-lg">
                  Прилагательные на <strong>-o</strong> имеют женский род <strong>-a</strong>. На <strong>-e</strong> и согласный (inteligente, amable, fácil) не меняются по роду.
                </p>
              </div>
            </div>

            {/* Test 7: Fill correct adjective form (10 items) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Раздел 7: Заполни правильную форму прилагательного (10)</h3>
                  <p className="text-sm sm:text-base text-slate-500">Нажми на правильный вариант для мгновенной проверки</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ADJECTIVES_FILL_EXERCISES.map((item) => {
                  const selected = adjFillAnswers[item.id];
                  const isAnswered = Boolean(selected);
                  const isCorrect = selected === item.correct;

                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-sky-50/50 border-sky-300'
                            : 'bg-rose-50/50 border-rose-300'
                          : 'bg-slate-50/50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base text-slate-800 font-bold">#{item.id} — 🇷🇺 {item.promptRu}</span>
                      </div>

                      <div className="font-black text-slate-900 text-lg sm:text-xl mb-3.5 flex items-center justify-between">
                        <span>{item.templateEs}</span>
                        <button
                          type="button"
                          onClick={() => playSpanishAudio(item.fullEs)}
                          className="text-slate-400 hover:text-sky-600 p-1"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {item.options.map((opt) => {
                          const isOptCorrect = opt === item.correct;
                          const isOptChosen = selected === opt;

                          let style = 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100';
                          if (isAnswered) {
                            if (isOptCorrect) style = 'bg-sky-600 text-white border-sky-600 font-extrabold';
                            else if (isOptChosen) style = 'bg-rose-500 text-white border-rose-500 font-extrabold';
                          }

                          return (
                            <button
                              key={opt}
                              disabled={isAnswered}
                              onClick={() => {
                                setAdjFillAnswers((prev) => ({ ...prev, [item.id]: opt }));
                                setTotalAttempts((prev) => prev + 1);
                                if (opt === item.correct) {
                                  setScore((prev) => prev + 10);
                                  playSpanishAudio(item.fullEs);
                                }
                              }}
                              className={`py-2 px-3 text-sm sm:text-base font-bold rounded-xl border transition-all ${style}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 text-sm text-slate-700 flex items-center justify-between">
                          <span>{item.explanation}</span>
                          <span className="font-extrabold text-sky-800">{item.fullEs}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Test 8: Plural adjectives (8 items) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Раздел 8: Согласуй прилагательное во множественном числе (8)</h3>
                  <p className="text-sm sm:text-base text-slate-500">Прибавление -s или -es, согласование по роду</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PLURAL_EXERCISES.map((item) => {
                  const selected = pluralAnswers[item.id];
                  const isAnswered = Boolean(selected);
                  const isCorrect = selected === item.correct;

                  return (
                    <div
                      key={item.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-blue-50/50 border-blue-300'
                            : 'bg-rose-50/50 border-rose-300'
                          : 'bg-slate-50/50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base text-slate-800 font-bold">#{item.id} — 🇷🇺 {item.promptRu}</span>
                      </div>

                      <div className="font-black text-slate-900 text-lg sm:text-xl mb-3.5 flex items-center justify-between">
                        <span>{item.templateEs}</span>
                        <button
                          type="button"
                          onClick={() => playSpanishAudio(item.fullEs)}
                          className="text-slate-400 hover:text-blue-600 p-1"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {item.options.map((opt) => {
                          const isOptCorrect = opt === item.correct;
                          const isOptChosen = selected === opt;

                          let style = 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100';
                          if (isAnswered) {
                            if (isOptCorrect) style = 'bg-blue-600 text-white border-blue-600 font-extrabold';
                            else if (isOptChosen) style = 'bg-rose-500 text-white border-rose-500 font-extrabold';
                          }

                          return (
                            <button
                              key={opt}
                              disabled={isAnswered}
                              onClick={() => {
                                setPluralAnswers((prev) => ({ ...prev, [item.id]: opt }));
                                setTotalAttempts((prev) => prev + 1);
                                if (opt === item.correct) {
                                  setScore((prev) => prev + 10);
                                  playSpanishAudio(item.fullEs);
                                }
                              }}
                              className={`py-2 px-3 text-sm sm:text-base font-bold rounded-xl border transition-all ${style}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 text-sm text-slate-700 flex items-center justify-between">
                          <span>{item.explanation}</span>
                          <span className="font-extrabold text-blue-800">{item.fullEs}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* TAB 6: FIND ERROR (8 items) */}
        {activeTab === 'find_errors' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl p-7 text-white shadow-lg">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
                  <HelpCircle className="w-4 h-4" />
                  <span>Раздел 9: Найди и исправь ошибку (8)</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Детектив грамматики: Найди ошибку!
                </h2>
                <p className="mt-2 text-rose-100 text-base sm:text-lg">
                  В каждом предложении допущена типичная ошибка. Нажми «Исправить», чтобы увидеть правильную форму с объяснением!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ERROR_EXERCISES.map((item) => {
                const isFixed = errorFixed[item.id];

                return (
                  <div
                    key={item.id}
                    className={`p-6 rounded-3xl border transition-all ${
                      isFixed
                        ? 'bg-emerald-50/40 border-emerald-300 ring-2 ring-emerald-100'
                        : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-slate-400">Задание #{item.id}</span>
                      <span className="text-sm sm:text-base text-slate-700 font-extrabold">🇷🇺 {item.ru}</span>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs sm:text-sm text-slate-500 font-bold mb-1">С ошибкой:</div>
                      <div className="text-lg sm:text-xl font-black text-rose-700 bg-rose-50 px-4 py-3 rounded-2xl border border-rose-200 flex items-center justify-between">
                        <span>
                          {item.incorrectSentence.split(item.wrongWord)[0]}
                          <span className="underline decoration-wavy decoration-rose-500 font-black">
                            {item.wrongWord}
                          </span>
                          {item.incorrectSentence.split(item.wrongWord)[1]}
                        </span>
                        <span className="text-xs font-black text-rose-600 uppercase px-2 py-0.5 rounded-md bg-white border border-rose-200">
                          Ошибка!
                        </span>
                      </div>
                    </div>

                    {!isFixed ? (
                      <button
                        onClick={() => {
                          setErrorFixed((prev) => ({ ...prev, [item.id]: true }));
                          setScore((prev) => prev + 10);
                          setTotalAttempts((prev) => prev + 1);
                          playSpanishAudio(item.correctSentence);
                        }}
                        className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm sm:text-base font-extrabold transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5 text-emerald-400" />
                        <span>Исправить ошибку</span>
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                            <div>
                              <span className="text-xs font-bold text-emerald-900 block">Правильно:</span>
                              <span className="text-lg sm:text-xl font-black text-slate-900">{item.correctSentence}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => playSpanishAudio(item.correctSentence)}
                            className="p-2 rounded-full bg-white text-emerald-700 shadow-xs hover:scale-110 transition-transform"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>

                        <p className="text-sm sm:text-base text-slate-800 bg-slate-100 p-3 rounded-2xl">
                          💡 <strong>Почему:</strong> {item.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 7: CONVERSATIONAL BUILDER (10 Interactive Stages + 30s Speech Game) */}
        {activeTab === 'speaking_builder' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 rounded-3xl p-7 text-white shadow-lg">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs sm:text-sm font-bold tracking-wide uppercase mb-3">
                  <Flame className="w-4 h-4" />
                  <span>Разговорная практика-конструктор (10 интерактивных этапов)</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Тренажёр живой разговорной речи 🗣️
                </h2>
                <p className="mt-2 text-orange-100 text-base sm:text-lg">
                  Переходи от правил к построению настоящих испанских фраз. Кликни на любую фразу для русского перевода 🇷🇺 и озвучки 🔊.
                </p>
              </div>

              {/* Stage Stepper Tabs */}
              <div className="mt-6 flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                {[
                  { step: 1, label: '1. Разминка' },
                  { step: 2, label: '2. SER или ESTAR?' },
                  { step: 3, label: '3. Один человек — 2 состояния' },
                  { step: 4, label: '4. Опиши футболиста ⚽' },
                  { step: 5, label: '5. Цвета в фразах' },
                  { step: 6, label: '6. «Я вижу...»' },
                  { step: 7, label: '7. Elige y habla' },
                  { step: 8, label: '8. Исправь меня' },
                  { step: 9, label: '9. Диалог в магазине 👕' },
                  { step: 10, label: '10. Конструктор из 4' },
                  { step: 11, label: '11. 30-секундный спич ⏱️' },
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setBuilderStep(s.step)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                      builderStep === s.step
                        ? 'bg-white text-orange-950 shadow-md scale-105'
                        : 'bg-black/25 text-white/90 hover:bg-black/35'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* STAGE 1: Warmup */}
            {builderStep === 1 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-900">1. Разминка — Completa la frase</h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">
                    Учитель задаёт вопрос — ответь полным предложением, а не одним словом!
                  </p>
                </div>

                <div className="space-y-4">
                  {SPEAKING_PRACTICE.warmup.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:border-orange-300 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => playSpanishAudio(item.qEs)}
                            className="p-1.5 rounded-full bg-white text-orange-600 hover:scale-110 shadow-xs"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                          <span
                            onClick={() => handleSpanishClick(item.qEs, item.qRu)}
                            className="cursor-pointer text-lg sm:text-xl font-black text-slate-900 hover:text-orange-700"
                          >
                            🇪🇸 {item.qEs}
                          </span>
                        </div>
                        <span className="text-sm sm:text-base text-slate-800 font-bold bg-white px-3 py-1 rounded-xl border border-slate-200">
                          🇷🇺 {item.qRu}
                        </span>
                      </div>

                      <div className="text-sm sm:text-base text-slate-700 mb-3">
                        💡 Подсказка: <strong className="text-slate-900 font-bold">{item.hintEs}</strong>
                      </div>

                      <div className="flex flex-wrap gap-2.5 pt-2.5 border-t border-slate-200/70">
                        {item.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              playSpanishAudio(opt);
                              handleSpanishClick(opt, item.exampleRu);
                            }}
                            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-orange-400 hover:bg-orange-50 text-sm sm:text-base font-bold text-slate-800 transition-all flex items-center gap-2"
                          >
                            <Volume2 className="w-4 h-4 text-orange-500" />
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 2: Ser vs Estar sentence builder */}
            {builderStep === 2 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-900">2. SER или ESTAR? Ученик строит предложение сам</h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">
                    Даны опорные слова. Собери фразу и ответь: ¿Por qué SER o por qué ESTAR?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SPEAKING_PRACTICE.builderSerEstar.map((item, idx) => {
                    const isRevealed = revealedBuilderAnswers[`s2_${idx}`];

                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-slate-400">#{idx + 1}</span>
                          <span className="text-sm sm:text-base font-black px-3 py-1 rounded-xl bg-amber-100 text-amber-950">
                            {item.words}
                          </span>
                        </div>

                        {!isRevealed ? (
                          <button
                            onClick={() => {
                              setRevealedBuilderAnswers((prev) => ({ ...prev, [`s2_${idx}`]: true }));
                              playSpanishAudio(item.sentence);
                            }}
                            className="mt-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-sm"
                          >
                            <Eye className="w-5 h-5 text-amber-400" />
                            <span>Показать предложение</span>
                          </button>
                        ) : (
                          <div className="mt-4 space-y-2.5 pt-2.5 border-t border-slate-200">
                            <div className="flex items-center justify-between">
                              <span className="text-lg sm:text-xl font-black text-slate-900">{item.sentence}</span>
                              <button
                                type="button"
                                onClick={() => playSpanishAudio(item.sentence)}
                                className="text-orange-600 hover:scale-110 p-1"
                              >
                                <Volume2 className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="text-sm sm:text-base text-slate-700 bg-white p-3 rounded-xl border border-slate-200 font-medium">
                              💡 <strong>Почему:</strong> {item.whyRu} ({item.whyEs})
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STAGE 3: One person - two sentences */}
            {builderStep === 3 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-900">3. Один человек — два разных предложения (SER ≠ ESTAR)</h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">
                    Почувствуй контраст: постоянная черта характера (SER) против состояния сейчас (ESTAR).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {SPEAKING_PRACTICE.twoSentences.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg sm:text-xl font-black text-slate-900">{item.name}</h4>
                        <span className="text-sm text-slate-500 font-mono">({item.words})</span>
                      </div>

                      <div className="space-y-2.5">
                        <div
                          onClick={() => handleSpanishClick(item.sentence1, item.sentence1Ru)}
                          className="cursor-pointer p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-400 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-extrabold text-amber-900 text-base sm:text-lg block">{item.sentence1}</span>
                            <span className="text-sm text-slate-600">🇷🇺 {item.sentence1Ru}</span>
                          </div>
                          <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">SER</span>
                        </div>

                        <div
                          onClick={() => handleSpanishClick(item.sentence2, item.sentence2Ru)}
                          className="cursor-pointer p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-extrabold text-blue-900 text-base sm:text-lg block">{item.sentence2}</span>
                            <span className="text-sm text-slate-600">🇷🇺 {item.sentence2Ru}</span>
                          </div>
                          <span className="text-xs font-black text-blue-800 bg-blue-100 px-2.5 py-1 rounded-lg">ESTAR</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300 text-base">
                        <div className="font-extrabold text-amber-950 flex items-center justify-between text-base sm:text-lg">
                          <span>{item.summary}</span>
                          <button
                            type="button"
                            onClick={() => playSpanishAudio(item.summary)}
                            className="text-amber-800"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="text-amber-900 mt-1 font-semibold text-sm sm:text-base">🇷🇺 {item.summaryRu}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 4: Footballer Game */}
            {builderStep === 4 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">4. Игра: Describe al futbolista ⚽</h3>
                    <p className="text-sm sm:text-base text-slate-600 mt-1">
                      Схема описания: Es... / Tiene... / Lleva... / Está...
                    </p>
                  </div>
                  <span className="text-base font-extrabold px-4 py-1.5 rounded-2xl bg-emerald-100 text-emerald-900">
                    {SPEAKING_PRACTICE.footballerGame.hero}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SPEAKING_PRACTICE.footballerGame.schema.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSpanishClick(item.text, item.ru)}
                      className="cursor-pointer p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-extrabold px-3 py-1 rounded-lg bg-emerald-600 text-white">
                          {item.verb}
                        </span>
                        <Volume2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-lg sm:text-xl font-black text-slate-900">{item.text}</div>
                      <div className="text-sm sm:text-base text-slate-600 mt-1.5 font-medium">🇷🇺 {item.ru}</div>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-bold text-emerald-900 block">Финальный связный ответ ученика:</span>
                    <span className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                      «{SPEAKING_PRACTICE.footballerGame.fullParagraph}»
                    </span>
                    <div className="text-base text-emerald-950 mt-1 font-semibold">
                      🇷🇺 {SPEAKING_PRACTICE.footballerGame.fullParagraphRu}
                    </div>
                  </div>
                  <button
                    onClick={() => playSpanishAudio(SPEAKING_PRACTICE.footballerGame.fullParagraph)}
                    className="px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm sm:text-base font-extrabold flex items-center gap-2 shadow-md shrink-0"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>Слушать всё</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 5: Color sentences (including yellow and orange) */}
            {builderStep === 5 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-900">5. Цвета — заставляем строить целое предложение</h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">
                    Включая жёлтое платье, жёлтую юбку, оранжевую футболку и оранжевую машину!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {SPEAKING_PRACTICE.colorSentences.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSpanishClick(item.sentence, item.ru)}
                      className="cursor-pointer p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:border-orange-400 hover:bg-orange-50/50 transition-all flex flex-col justify-between"
                    >
                      <div className="text-xs sm:text-sm text-slate-400 font-mono mb-1">
                        {item.noun} + {item.color}
                      </div>
                      <div className="text-base sm:text-lg font-black text-slate-900 my-1">{item.sentence}</div>
                      <div className="text-xs sm:text-sm text-slate-600 font-medium">🇷🇺 {item.ru}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 6: Veo una mesa (Game) */}
            {builderStep === 6 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-900">6. Игра «Я вижу…» (Veo una mesa...)</h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">
                    Опиши предметы вокруг себя: цвет (род) + estar (местонахождение).
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      es: 'Veo una camiseta amarilla. La camiseta está sobre la mesa.',
                      ru: 'Я вижу жёлтую футболку. Футболка лежит на столе.',
                      level: 'Жёлтый цвет + женский род (amarilla)',
                    },
                    {
                      es: 'Veo un coche naranja. El coche está en la calle.',
                      ru: 'Я вижу оранжевую машину. Машина на улице.',
                      level: 'Оранжевый цвет (naranja не меняется по родам)',
                    },
                    {
                      es: 'Veo una mochila negra. La mochila está en la silla.',
                      ru: 'Я вижу чёрный рюкзак. Рюкзак на стуле.',
                      level: 'Род (negra) + место (ESTAR)',
                    },
                    {
                      es: 'Veo unos zapatos rojos. Los zapatos están en el suelo.',
                      ru: 'Я вижу красные туфли. Туфли на полу.',
                      level: 'Множественное число (rojos)',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSpanishClick(item.es, item.ru)}
                      className="cursor-pointer p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-amber-400 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md uppercase">
                          {item.level}
                        </span>
                        <div className="text-lg sm:text-xl font-black text-slate-900 mt-1.5">{item.es}</div>
                        <div className="text-sm sm:text-base text-slate-600 mt-1 font-medium">🇷🇺 {item.ru}</div>
                      </div>
                      <Volume2 className="w-6 h-6 text-amber-600 shrink-0 ml-4" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 7: Elige y habla */}
            {builderStep === 7 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-900">7. Elige y habla — выбери и продолжи</h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">
                    Учитель даёт 3 слова — собери предложение и согласуй окончания!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SPEAKING_PRACTICE.chooseAndSpeak.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSpanishClick(item.sentence, item.ru)}
                      className="cursor-pointer p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-sky-400 transition-all"
                    >
                      <div className="text-xs sm:text-sm font-mono text-slate-400 mb-1">Слова: {item.words}</div>
                      <div className="text-lg sm:text-xl font-black text-sky-950">{item.sentence}</div>
                      <div className="text-sm sm:text-base text-slate-600 mt-1 font-medium">🇷🇺 {item.ru}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 8: Corrígeme */}
            {builderStep === 8 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-900">8. «Исправь меня» — тренировка спонтанной речи</h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">
                    Учитель нарочно делает ошибку, а ученик мгновенно исправляет вслух!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { bad: 'La falda es amarillo.', good: 'No, se dice: La falda es amarilla.', ru: 'Нет, говорят: Юбка жёлтая (falda — ж. род).' },
                    { bad: 'El zumo es naranjo.', good: 'No, se dice: El zumo es naranja.', ru: 'Нет, говорят: Сок оранжевый (naranja не меняется).' },
                    { bad: 'La camiseta es rojo.', good: 'No, se dice: La camiseta es roja.', ru: 'Нет, говорят: Футболка красная.' },
                    { bad: 'La chica es alto.', good: 'No, se dice: La chica es alta.', ru: 'Нет, говорят: Девушка высокая.' },
                    { bad: 'Los zapatos son negra.', good: 'No, se dice: Los zapatos son negros.', ru: 'Нет, говорят: Туфли чёрные.' },
                    { bad: 'Madrid es en España.', good: 'No, se dice: Madrid está en España.', ru: 'Нет, говорят: Мадрид в Испании (место = ESTAR).' },
                    { bad: 'Yo soy cansado hoy.', good: 'No, se dice: Yo estoy cansado hoy.', ru: 'Нет, говорят: Я устал сегодня (состояние = ESTAR).' },
                    { bad: 'Nosotros es en casa.', good: 'No, se dice: Nosotros estamos en casa.', ru: 'Нет, говорят: Мы дома.' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSpanishClick(item.good, item.ru)}
                      className="cursor-pointer p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-rose-400 transition-all space-y-2.5"
                    >
                      <div className="text-sm text-rose-600 font-bold line-through">
                        👨‍🏫 Ошибка: {item.bad}
                      </div>
                      <div className="text-base sm:text-lg font-black text-slate-900 flex items-center justify-between">
                        <span>{item.good}</span>
                        <Volume2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-sm text-slate-600 font-medium">🇷🇺 {item.ru}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 9: Shop mini dialog */}
            {builderStep === 9 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-900">9. Мини-диалог в магазине 👕</h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">
                    Покупка жёлтой или оранжевой футболки. Нажми на любую реплику для перевода и озвучки.
                  </p>
                </div>

                <div className="space-y-4">
                  {SPEAKING_PRACTICE.shopDialog.map((item, idx) => {
                    const isProf = item.speaker === 'Profesor';

                    return (
                      <div
                        key={idx}
                        onClick={() => handleSpanishClick(item.es, item.ru)}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all ${
                          isProf ? 'bg-amber-50/70 border-amber-200 ml-0 mr-8' : 'bg-blue-50/70 border-blue-200 ml-8 mr-0'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-sm font-extrabold ${isProf ? 'text-amber-800' : 'text-blue-800'}`}>
                            {isProf ? '👨‍🏫 Profesor' : '🙋‍♂️ Alumno'}
                          </span>
                          <Volume2 className="w-5 h-5 text-slate-500" />
                        </div>
                        <div className="text-lg sm:text-xl font-black text-slate-900">{item.es}</div>
                        <div className="text-sm sm:text-base text-slate-700 mt-1 font-semibold">🇷🇺 {item.ru}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STAGE 10: 4 elements builder */}
            {builderStep === 10 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    10. «Сделай предложение сам» — 4 элемента (Persona + Lugar + Estado + Característica)
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-1">
                    Из четырёх опорных слов строй связный рассказ.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {SPEAKING_PRACTICE.fourElements.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                    >
                      <div className="text-sm font-black text-orange-900 bg-orange-100 px-3 py-1 rounded-xl inline-block">
                        {item.elements}
                      </div>

                      <div className="space-y-2 pt-1">
                        {item.sentences.map((sent, sIdx) => (
                          <div
                            key={sIdx}
                            onClick={() => handleSpanishClick(sent, item.ru)}
                            className="cursor-pointer text-base sm:text-lg font-extrabold text-slate-900 hover:text-orange-700 flex items-center justify-between p-2 rounded-xl hover:bg-white"
                          >
                            <span>• {sent}</span>
                            <Volume2 className="w-4 h-4 text-slate-400" />
                          </div>
                        ))}
                      </div>

                      <div className="text-sm sm:text-base text-slate-700 pt-2 border-t border-slate-200 font-semibold">
                        🇷🇺 {item.ru}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STAGE 11: 30-sec speaking timer game */}
            {builderStep === 11 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">
                      Финальная разговорная игра: 30 секунд без остановки!
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mt-1">
                      🇪🇸 «Ahora habla durante 30 segundos sobre una persona.»
                    </p>
                  </div>

                  {/* Timer widget */}
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-black text-orange-600 bg-orange-50 px-5 py-2.5 rounded-2xl border border-orange-200 flex items-center gap-2">
                      <Timer className="w-7 h-7 animate-pulse" />
                      <span>{customSpeakingSeconds}s</span>
                    </div>

                    <button
                      onClick={() => setTimerRunning(!timerRunning)}
                      className={`px-5 py-3 rounded-2xl text-sm sm:text-base font-extrabold text-white flex items-center gap-2 shadow-sm transition-all ${
                        timerRunning ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      {timerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      <span>{timerRunning ? 'Пауза' : 'Старт (30 сек)'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setTimerRunning(false);
                        setCustomSpeakingSeconds(30);
                      }}
                      className="p-3 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-600"
                      title="Сброс таймера"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold uppercase tracking-wider text-amber-900">
                      Образец монолога (с жёлтым и оранжевым)
                    </span>
                    <button
                      onClick={() => playSpanishAudio(SPEAKING_PRACTICE.final30SecTemplate.exampleEs)}
                      className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-sm font-extrabold text-amber-900 flex items-center gap-2 shadow-xs"
                    >
                      <Volume2 className="w-5 h-5" />
                      <span>Слушать весь монолог</span>
                    </button>
                  </div>

                  <p className="text-xl sm:text-2xl font-black text-slate-900 leading-relaxed">
                    «{SPEAKING_PRACTICE.final30SecTemplate.exampleEs}»
                  </p>

                  <div className="pt-3 border-t border-amber-200">
                    <div className="text-base sm:text-lg text-slate-800 font-bold">
                      🇷🇺 {SPEAKING_PRACTICE.final30SecTemplate.exampleRu}
                    </div>
                  </div>
                </div>

                {/* Helpful Checklist */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm sm:text-base">
                  {[
                    'Es... (характеристика / профессия)',
                    'Está... (состояние / где он)',
                    'Tiene... (что у него есть)',
                    'Lleva... una camiseta amarilla / naranja',
                    'Sus zapatos son blancos',
                    'Está en el campo / en casa',
                  ].map((check, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-700 flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* POPUP MODAL WITH RUSSIAN TRANSLATION AND SPANISH AUDIO (LARGE FONT) */}
      {modalData && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-7 shadow-2xl border border-slate-100 animate-slideUp space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-bold">🇪🇸 ➔ 🇷🇺</span>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">Перевод и произношение</h3>
              </div>
              <button
                onClick={() => setModalData(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Spanish target with audio */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase block mb-1">🇪🇸 Испанский:</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{modalData.es}</span>
              </div>
              <button
                type="button"
                onClick={() => playSpanishAudio(modalData.es)}
                className="p-3 rounded-2xl bg-white shadow-xs text-amber-700 hover:scale-110 transition-transform shrink-0"
                title="Повторить произношение"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            {/* Russian Translation */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md">
              <span className="text-xs sm:text-sm font-bold tracking-wide uppercase opacity-90 block mb-1">🇷🇺 Русский перевод:</span>
              <p className="text-xl sm:text-2xl font-black leading-snug">
                {modalData.ru}
              </p>
            </div>

            {/* Grammar note if exists */}
            {modalData.note && (
              <div className="text-sm sm:text-base text-slate-700 italic bg-slate-100 p-3 rounded-2xl font-medium">
                💡 {modalData.note}
              </div>
            )}

            <button
              onClick={() => setModalData(null)}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-extrabold text-base hover:bg-slate-800 transition-colors shadow-sm"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-5 mt-12 text-center text-sm text-slate-500 font-medium">
        <p>Español Activo • Интерактивный курс испанского языка (Русский 🇷🇺 ➔ Испанский 🇪🇸)</p>
      </footer>
    </div>
  );
}
