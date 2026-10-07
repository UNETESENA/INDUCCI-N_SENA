import React, { useState, useEffect, useRef } from 'react';
import {
  SECTIONAL_EVALUATION_QUESTIONS,
  REGULATION_SECTIONS,
  SectionalQuizQuestion,
} from '../data/regulationQuestions';
import { LearnerProfile, QuestionAnswerRecord } from '../types/induction';
import {
  recordNewSubmission,
  getAllSubmissions,
} from '../services/submissionRegistry';
import { REGIONALES_COLOMBIA, PROGRAMAS_POPULARES, CENTROS_DEFAULT } from '../data/senaData';
import { soundFx } from '../utils/quizSounds';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Check,
  Timer,
  Trophy,
  Flame,
  Zap,
  Sparkles,
  UserCheck,
  BookOpen,
  ArrowLeft,
  Crown,
  Medal,
  Clock,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Target,
  BarChart3,
  Scale,
  RefreshCw,
  FileSpreadsheet,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface ModuleEvaluationProps {
  learnerProfile: LearnerProfile;
  onUpdateProfile?: (updated: LearnerProfile) => void;
  onUpdateScore: (score: number) => void;
  onGoToCertificate: () => void;
}

type EvaluationStep = 'registration' | 'quiz' | 'result' | 'leaderboard';

export const ModuleEvaluation: React.FC<ModuleEvaluationProps> = ({
  learnerProfile,
  onUpdateProfile,
  onUpdateScore,
  onGoToCertificate,
}) => {
  // Step state
  const [step, setStep] = useState<EvaluationStep>(
    learnerProfile.examScore !== null ? 'result' : 'registration'
  );

  // Registration Form State (Pre-filled with learnerProfile, editable)
  const [formData, setFormData] = useState<LearnerProfile>({ ...learnerProfile });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Quiz questions: 25 questions (5 for each of the 5 sections)
  const [questions] = useState<SectionalQuizQuestion[]>(SECTIONAL_EVALUATION_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(Array(SECTIONAL_EVALUATION_QUESTIONS.length).fill(-1));
  const [questionTimes, setQuestionTimes] = useState<number[]>(Array(SECTIONAL_EVALUATION_QUESTIONS.length).fill(0));
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);

  // Timer & Gamification State
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const questionStartTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<any>(null);

  // Sync / Registry State
  const [isSavedInRegistry, setIsSavedInRegistry] = useState(learnerProfile.examScore !== null);
  const [lastSubmissionId, setLastSubmissionId] = useState<string | null>(null);

  // Sound State
  const [isSoundEnabled, setIsSoundEnabled] = useState(soundFx.isEnabled());

  // Synchronize form when learnerProfile changes externally
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: learnerProfile.name || prev.name,
      documentNumber: learnerProfile.documentNumber || prev.documentNumber,
      program: learnerProfile.program || prev.program,
      ficha: learnerProfile.ficha || prev.ficha,
      regional: learnerProfile.regional || prev.regional,
      center: learnerProfile.center || prev.center,
    }));
  }, [learnerProfile]);

  // Stopwatch effect
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Form Validation & Start Quiz
  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.name?.trim()) errors.name = 'El nombre completo es obligatorio';
    if (!formData.documentNumber?.trim()) errors.documentNumber = 'El número de documento es obligatorio';
    if (!formData.ficha?.trim()) errors.ficha = 'El número de ficha es obligatorio';
    if (!formData.program?.trim()) errors.program = 'El programa de formación es obligatorio';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    if (onUpdateProfile) {
      onUpdateProfile(formData);
    }

    // Reset quiz states
    setCurrentIdx(0);
    setUserAnswers(Array(questions.length).fill(-1));
    setQuestionTimes(Array(questions.length).fill(0));
    setHasCheckedAnswer(false);
    setElapsedSeconds(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setMistakesCount(0);
    setTotalPoints(0);
    questionStartTimeRef.current = Date.now();
    setIsTimerRunning(true);
    setStep('quiz');
  };

  const currentQuestion = questions[currentIdx];
  const selectedOption = userAnswers[currentIdx];

  // Current Section details
  const currentSectionMeta = REGULATION_SECTIONS.find(
    (sec) => sec.key === currentQuestion?.sectionKey
  );

  const handleSelectOption = (optIdx: number) => {
    if (hasCheckedAnswer) return;
    const nextAnswers = [...userAnswers];
    nextAnswers[currentIdx] = optIdx;
    setUserAnswers(nextAnswers);
  };

  // Confirmation of answer: calculates speed bonus, streak, and feedback
  const handleConfirmAnswer = () => {
    if (selectedOption === -1) return;

    const timeSpentOnThisQuestion = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
    const nextTimes = [...questionTimes];
    nextTimes[currentIdx] = timeSpentOnThisQuestion;
    setQuestionTimes(nextTimes);

    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      const nextStreak = currentStreak + 1;
      setCurrentStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);

      // Points formula: Base 100 pts + Speed Bonus (up to 50 pts if answered under 20s) + Streak bonus (15 pts * streak)
      const speedBonus = Math.max(0, Math.round((25 - Math.min(timeSpentOnThisQuestion, 25)) * 2));
      const streakBonus = (nextStreak - 1) * 15;
      const questionScore = 100 + speedBonus + streakBonus;

      setTotalPoints((prev) => prev + questionScore);

      // Sound FX
      soundFx.playSuccess();

      // Mini-burst for correct answer
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.8 },
          colors: ['#39A900', '#007832', '#FFD700'],
        });
      } catch {
        // ignore
      }
    } else {
      setCurrentStreak(0);
      setMistakesCount((prev) => prev + 1);
      // Sound FX for mistake
      soundFx.playMistake();
    }

    setHasCheckedAnswer(true);
  };

  const handleNextQuestion = () => {
    setHasCheckedAnswer(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      questionStartTimeRef.current = Date.now();
    } else {
      // Quiz Finished!
      setIsTimerRunning(false);

      // Calculate final score
      let correct = 0;
      const recordedAnswers: QuestionAnswerRecord[] = [];

      userAnswers.forEach((ans, idx) => {
        const q = questions[idx];
        const isRight = ans === q.correctAnswer;
        if (isRight) correct += 1;

        recordedAnswers.push({
          questionId: q.id,
          questionText: q.question,
          selectedOptionIndex: ans,
          selectedOptionText: ans >= 0 && ans < q.options.length ? q.options[ans] : 'Sin respuesta',
          correctOptionIndex: q.correctAnswer,
          correctOptionText: q.options[q.correctAnswer],
          isCorrect: isRight,
          explanation: q.explanation,
          sectionTitle: q.sectionTitle,
          positiveReinforcement: q.positiveReinforcement,
          errorFeedback: q.errorFeedback,
          timeSpentSeconds: questionTimes[idx] || 0,
        });
      });

      const scorePercentage = Math.round((correct / questions.length) * 100);
      onUpdateScore(scorePercentage);

      // Final Gamification Bonus: 0 errors bonus + completion speed bonus
      let finalPoints = totalPoints;
      if (mistakesCount === 0) {
        finalPoints += 500; // Flawless bonus
      }

      const totalDurationStr = `${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s`;

      // Save automatically in institutional registry
      try {
        const newSub = recordNewSubmission(
          {
            ...formData,
            examScore: scorePercentage,
          },
          scorePercentage,
          recordedAnswers,
          {
            timeTakenSeconds: elapsedSeconds,
            formattedDuration: totalDurationStr,
            gamificationPoints: finalPoints,
            streakBest: bestStreak,
            mistakesCount: mistakesCount,
          }
        );
        setIsSavedInRegistry(true);
        setLastSubmissionId(newSub.id);
      } catch (err) {
        console.error('Error saving submission to registry:', err);
      }

      setStep('result');

      if (scorePercentage >= 70) {
        soundFx.playTriumph();
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const handleRetake = () => {
    setStep('registration');
    setHasCheckedAnswer(false);
    setIsSavedInRegistry(false);
  };

  // Ranking data calculation
  const allSubmissions = getAllSubmissions();
  // Sort submissions: Highest score first, then highest gamification points, then lowest time
  const rankedSubmissions = [...allSubmissions].sort((a, b) => {
    if (b.examScore !== a.examScore) return b.examScore - a.examScore;
    const pointsA = a.gamificationPoints ?? a.examScore * 10;
    const pointsB = b.gamificationPoints ?? b.examScore * 10;
    if (pointsB !== pointsA) return pointsB - pointsA;
    const timeA = a.timeTakenSeconds ?? 9999;
    const timeB = b.timeTakenSeconds ?? 9999;
    return timeA - timeB;
  });

  // Current learner's position in ranking
  const currentRankIndex = rankedSubmissions.findIndex(
    (s) => s.documentNumber === formData.documentNumber
  );

  // ==========================================================
  // VIEW 1: REGISTRATION FORM BEFORE EVALUATION
  // ==========================================================
  if (step === 'registration') {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
        {/* Module Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Módulo 6 · Evaluación Unificada Institucional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Ingreso de Datos y Evaluación del Aprendiz SENA
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Ingresa tus datos institucionales para iniciar la prueba diagnóstica oficial de inducción.
            Tus respuestas y resultados se sincronizarán directamente con la hoja de control institucional.
          </p>
        </div>

        {/* Info Highlights Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#39A900]/15 text-[#007832] dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">
              25
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">5 Preguntas por Sección</div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                Marco legal, 24 derechos, deberes, prohibiciones y régimen disciplinario.
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center shrink-0 font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Cronómetro Activo</div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                Lleva la cuenta exacta de tu tiempo para bonificaciones y ranking.
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0 font-bold">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Ranking Gamificado</div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                Gana puntos por responder rápido, sin fallar y manteniendo rachas.
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#005e26] to-[#007832] text-white flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" />
                <span>Registro Oficial de Inducción</span>
              </div>
              <h3 className="text-xl font-bold mt-1">Ficha de Identificación del Aprendiz</h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                Estos datos se guardarán junto a tus 25 respuestas en el archivo de hoja de cálculo institucional.
              </p>
            </div>
          </div>

          <form onSubmit={handleStartQuiz} className="p-6 sm:p-8 space-y-5">
            {/* Nombres y Apellidos */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Nombres y Apellidos Completos *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Alejandro Gómez Rodríguez"
                className={`w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors ${
                  formErrors.name
                    ? 'border-rose-400 text-rose-900'
                    : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                }`}
              />
              {formErrors.name && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formErrors.name}
                </p>
              )}
            </div>

            {/* Documento y Ficha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Número de Cédula / Documento *
                </label>
                <input
                  type="text"
                  value={formData.documentNumber}
                  onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                  placeholder="Ej. 1028471920"
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors ${
                    formErrors.documentNumber
                      ? 'border-rose-400 text-rose-900'
                      : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                  }`}
                />
                {formErrors.documentNumber && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formErrors.documentNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Número de Ficha de Caracterización *
                </label>
                <input
                  type="text"
                  value={formData.ficha}
                  onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                  placeholder="Ej. 2874102"
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors ${
                    formErrors.ficha
                      ? 'border-rose-400 text-rose-900'
                      : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                  }`}
                />
                {formErrors.ficha && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formErrors.ficha}
                  </p>
                )}
              </div>
            </div>

            {/* Programa de Formación */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Programa de Formación *
              </label>
              <input
                type="text"
                list="programasList"
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                placeholder="Ej. Tecnología en Análisis y Desarrollo de Software (ADSO)"
                className={`w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors ${
                  formErrors.program
                    ? 'border-rose-400 text-rose-900'
                    : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                }`}
              />
              <datalist id="programasList">
                {PROGRAMAS_POPULARES.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
              {formErrors.program && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formErrors.program}
                </p>
              )}
            </div>

            {/* Regional & Centro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Regional SENA
                </label>
                <select
                  value={formData.regional}
                  onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                >
                  {REGIONALES_COLOMBIA.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Centro de Formación
                </label>
                <input
                  type="text"
                  list="centrosList"
                  value={formData.center}
                  onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                  placeholder="Ej. Centro de Servicios y Gestión Empresarial"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                />
                <datalist id="centrosList">
                  {CENTROS_DEFAULT.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                🔒 Tus datos están protegidos y sólo son accesibles por el instructor administrador.
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-[#39A900] hover:bg-[#007832] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Comenzar Evaluación de 25 Preguntas</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick link to see current leaderboard */}
        <div className="text-center">
          <button
            onClick={() => setStep('leaderboard')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#007832] dark:hover:text-emerald-400 transition-colors"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Consultar Tabla de Clasificación y Ranking de Aprendices</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // VIEW 2: ACTIVE GAMIFIED QUIZ WITH CLOCK AND ANIMATIONS
  // ==========================================================
  if (step === 'quiz') {
    const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);
    const sectionIndex = Math.floor(currentIdx / 5);
    const questionInSection = (currentIdx % 5) + 1;

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
        {/* Top HUD Gamification Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Learner Info */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                {formData.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="truncate">
                <div className="font-bold text-slate-900 dark:text-white truncate">{formData.name}</div>
                <div className="text-[10px] text-slate-500 font-mono">Ficha: {formData.ficha}</div>
              </div>
            </div>

            {/* Live Gamification Metrics */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Sound toggle button */}
              <button
                type="button"
                onClick={() => setIsSoundEnabled(soundFx.toggle())}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title={isSoundEnabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido'}
              >
                {isSoundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Active Stopwatch */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold text-slate-900 dark:text-white">
                <Timer className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span>{formatTime(elapsedSeconds)}</span>
              </div>

              {/* Current Streak */}
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 font-bold text-xs">
                <Flame className={`w-3.5 h-3.5 ${currentStreak > 0 ? 'animate-bounce' : ''}`} />
                <span>Racha: {currentStreak}</span>
              </div>

              {/* Total Points */}
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold text-xs">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{totalPoints} pts</span>
              </div>
            </div>
          </div>

          {/* Section Breadcrumb & Progress Bar */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#007832] dark:text-emerald-400 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-[#39A900]/15 text-[11px] font-bold">
                  Sección {sectionIndex + 1} de 5
                </span>
                <span>{currentQuestion.sectionTitle}</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                Pregunta {currentIdx + 1} de {questions.length} ({questionInSection}/5 de esta sección)
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-[#39A900] to-[#70D600] dark:from-emerald-600 dark:to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Interactive Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
          {/* Section context badge */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {currentSectionMeta?.articleRef}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Valor: 100 pts + Bonificación de velocidad
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-relaxed">
            {currentQuestion.question}
          </h3>

          {/* Options List */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt, optIdx) => {
              const isChosen = selectedOption === optIdx;
              const isCorrect = currentQuestion.correctAnswer === optIdx;

              let optionStyle =
                'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200';

              if (hasCheckedAnswer) {
                if (isCorrect) {
                  optionStyle =
                    'border-emerald-500 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500 font-bold';
                } else if (isChosen) {
                  optionStyle =
                    'border-rose-400 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 ring-2 ring-rose-400';
                } else {
                  optionStyle =
                    'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/40 text-slate-400 dark:text-slate-500 opacity-60';
                }
              } else if (isChosen) {
                optionStyle =
                  'border-[#39A900] dark:border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/50 text-slate-900 dark:text-white ring-2 ring-[#39A900] dark:ring-emerald-500 font-semibold';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={hasCheckedAnswer}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                      hasCheckedAnswer && isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : hasCheckedAnswer && isChosen
                        ? 'bg-rose-600 text-white border-rose-600'
                        : isChosen
                        ? 'bg-[#39A900] text-white border-[#39A900]'
                        : 'border-slate-300 dark:border-slate-600 text-slate-500'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Animated Feedback Box upon confirming */}
          {hasCheckedAnswer && (
            <div
              className={`p-5 rounded-2xl border animate-in fade-in zoom-in-95 duration-200 text-xs sm:text-sm leading-relaxed space-y-2 ${
                selectedOption === currentQuestion.correctAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                  : 'bg-rose-50 dark:bg-rose-950/70 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-extrabold flex items-center gap-2">
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <>
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-emerald-700 dark:text-emerald-300 text-sm">
                        ¡Respuesta Correcta! {currentStreak > 1 ? `🔥 Racha x${currentStreak}` : ''}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center">
                        <XCircle className="w-5 h-5" />
                      </div>
                      <span className="text-rose-700 dark:text-rose-300 text-sm">
                        Respuesta Incorrecta · Identifica en qué fallaste
                      </span>
                    </>
                  )}
                </div>

                <span className="text-[11px] font-mono font-bold">
                  {selectedOption === currentQuestion.correctAnswer ? '+Puntos otorgados' : '0 pts'}
                </span>
              </div>

              {/* Dynamic reinforcement */}
              <div className="pt-1">
                {selectedOption === currentQuestion.correctAnswer ? (
                  <p className="font-medium text-emerald-900 dark:text-emerald-200">
                    {currentQuestion.positiveReinforcement}
                  </p>
                ) : (
                  <p className="font-medium text-rose-900 dark:text-rose-200">
                    {currentQuestion.errorFeedback}
                  </p>
                )}
              </div>

              {/* Official legal grounding */}
              <div className="pt-2 border-t border-current/15 text-xs text-slate-600 dark:text-slate-300">
                <strong>Fundamento del Acuerdo 0009 de 2024:</strong> {currentQuestion.explanation}
              </div>
            </div>
          )}

          {/* Bottom Actions Row */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono">
              {currentIdx + 1} de {questions.length} completadas
            </span>

            {!hasCheckedAnswer ? (
              <button
                type="button"
                onClick={handleConfirmAnswer}
                disabled={selectedOption === -1}
                className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  selectedOption !== -1
                    ? 'bg-[#39A900] hover:bg-[#007832] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-xs cursor-pointer'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                Confirmar Respuesta
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>{currentIdx < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar y Calificar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // VIEW 3: RESULTS SCREEN & POSITIVE REINFORCEMENT
  // ==========================================================
  if (step === 'result') {
    const finalScore = learnerProfile.examScore ?? 100;
    const isPassed = finalScore >= 70;
    const correctCount = Math.round((finalScore / 100) * questions.length);

    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
        {/* Results Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 text-center space-y-6 shadow-sm transition-colors">
          <div
            className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center border ${
              isPassed
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-[#007832] dark:text-emerald-400'
                : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400'
            }`}
          >
            {isPassed ? <Award className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#007832] dark:text-emerald-400">
              Evaluación Final Unificada · Acuerdo 0009 de 2024
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              {isPassed ? '¡Felicitaciones, Has Aprobado la Inducción!' : 'Sigue Preparándote para Superar la Prueba'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-lg mx-auto leading-relaxed">
              {isPassed
                ? `¡Excelente desempeño, ${formData.name}! Has demostrado un amplio dominio del Acuerdo 0009 de 2024, sus 24 derechos, deberes, prohibiciones y el debido proceso.`
                : `Has obtenido ${finalScore}%. Recuerda que se requiere al menos un 70% de aprobación para certificar tu inducción y generar el pasaporte institucional.`}
            </p>
          </div>

          {/* Gamified Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                {finalScore}%
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-bold mt-0.5">
                {correctCount} de 25 Correctas
              </div>
            </div>

            <div className="p-4 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 dark:text-amber-300 font-mono">
                {totalPoints > 0 ? totalPoints : finalScore * 10}
              </div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 uppercase font-bold mt-0.5">
                Puntos Ganados
              </div>
            </div>

            <div className="p-4 bg-blue-50/80 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-300 font-mono">
                {elapsedSeconds > 0 ? formatTime(elapsedSeconds) : '5m 12s'}
              </div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 uppercase font-bold mt-0.5">
                Tiempo Total
              </div>
            </div>

            <div className="p-4 bg-orange-50/80 dark:bg-orange-950/40 rounded-2xl border border-orange-200 dark:border-orange-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-orange-700 dark:text-orange-300 font-mono">
                {mistakesCount}
              </div>
              <div className="text-[11px] text-orange-600 dark:text-orange-400 uppercase font-bold mt-0.5">
                {mistakesCount === 0 ? '¡Cero Errores!' : 'Errores'}
              </div>
            </div>
          </div>

          {/* Institutional spreadsheet record status */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-[#007832] dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Registro Guardado Exitosamente en el Sistema de Inducción</div>
              <div className="mt-0.5 text-emerald-800 dark:text-emerald-300">
                Se han guardado tus datos institucionales (CC: {formData.documentNumber}, Ficha: {formData.ficha}) y
                el desglose de tus 25 respuestas en el registro institucional. El instructor administrador puede visualizarlo
                y sincronizarlo en su hoja de cálculo de Google Drive.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {isPassed ? (
              <button
                onClick={onGoToCertificate}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-[#39A900] hover:bg-[#007832] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Ver y Descargar Certificado Oficial</span>
              </button>
            ) : (
              <button
                onClick={handleRetake}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Presentar Nuevamente la Prueba</span>
              </button>
            )}

            <button
              onClick={() => setStep('leaderboard')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Ver Ranking Gamificado</span>
            </button>

            {isPassed && (
              <button
                onClick={handleRetake}
                className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                Repetir para Mejorar Puntos y Tiempo
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // VIEW 4: GAMIFIED LEADERBOARD & RANKING
  // ==========================================================
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setStep(learnerProfile.examScore !== null ? 'result' : 'registration')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la evaluación</span>
          </button>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <span>Ranking Gamificado de Aprendices SENA</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Clasificación oficial basada en precisión, puntos ganados, menores errores y velocidad de respuesta.
          </p>
        </div>

        {/* Current user rank indicator */}
        {currentRankIndex >= 0 && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-[#39A900] text-white flex items-center justify-center font-black text-sm">
              #{currentRankIndex + 1}
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Tu Posición Actual</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {formData.name.split(' ')[0]} · {rankedSubmissions[currentRankIndex]?.gamificationPoints ?? 0} pts
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
          <span>Top Aprendices Destacados ({rankedSubmissions.length} Evaluados)</span>
          <span>Reglamento Acuerdo 0009 de 2024</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-slate-50/60 dark:bg-slate-850 text-[11px] font-bold uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 text-center w-12">Puesto</th>
                <th className="px-4 py-3">Aprendiz & Ficha</th>
                <th className="px-4 py-3">Programa</th>
                <th className="px-4 py-3 text-center">Calificación</th>
                <th className="px-4 py-3 text-center">Puntos</th>
                <th className="px-4 py-3 text-center">Tiempo</th>
                <th className="px-4 py-3 text-center">Errores</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rankedSubmissions.map((sub, idx) => {
                const isMe = sub.documentNumber === formData.documentNumber;
                return (
                  <tr
                    key={sub.id}
                    className={`transition-colors ${
                      isMe
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/40 font-semibold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="px-4 py-3.5 text-center">
                      {idx === 0 ? (
                        <div className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold mx-auto text-xs shadow-xs">
                          🥇
                        </div>
                      ) : idx === 1 ? (
                        <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-900 flex items-center justify-center font-extrabold mx-auto text-xs">
                          🥈
                        </div>
                      ) : idx === 2 ? (
                        <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-extrabold mx-auto text-xs">
                          🥉
                        </div>
                      ) : (
                        <span className="font-mono font-bold text-slate-400">#{idx + 1}</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{sub.learnerName}</span>
                        {isMe && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-600 text-white font-bold">
                            Tú
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Ficha: {sub.ficha} · CC: {sub.documentNumber}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300 truncate max-w-[200px]">
                      {sub.program}
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                          sub.isPassed
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                        }`}
                      >
                        {sub.isPassed ? <Check className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{sub.examScore}%</span>
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                        {sub.gamificationPoints ?? sub.examScore * 10} pts
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-center font-mono text-slate-600 dark:text-slate-400">
                      {sub.formattedDuration || (sub.timeTakenSeconds ? `${Math.floor(sub.timeTakenSeconds / 60)}m ${sub.timeTakenSeconds % 60}s` : '5m 12s')}
                    </td>

                    <td className="px-4 py-3.5 text-center font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          (sub.mistakesCount ?? 0) === 0
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {sub.mistakesCount ?? sub.answers.filter((a) => !a.isCorrect).length}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
