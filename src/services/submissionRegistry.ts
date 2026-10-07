import { LearnerSubmission, QuestionAnswerRecord, LearnerProfile } from '../types/induction';
import { SECTIONAL_EVALUATION_QUESTIONS } from '../data/regulationQuestions';

const SUBMISSIONS_STORAGE_KEY = 'sena_induction_submissions_registry_v1';
const ADMIN_PIN_KEY = 'sena_induction_admin_pin';
const ADMIN_AUTH_SESSION_KEY = 'sena_induction_admin_auth_session';
export const DEFAULT_ADMIN_PIN = 'SENA2026';

/**
 * Retrieves all stored submissions from localStorage
 */
export const getAllSubmissions = (): LearnerSubmission[] => {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
    if (!raw) {
      // Seed with initial demo submissions so admin can see immediate utility
      const seeded = getInitialSampleSubmissions();
      saveAllSubmissions(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading submissions registry:', err);
    return [];
  }
};

/**
 * Saves all submissions to localStorage
 */
export const saveAllSubmissions = (submissions: LearnerSubmission[]): void => {
  try {
    localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
  } catch (err) {
    console.error('Error saving submissions to storage:', err);
  }
};

/**
 * Adds a new learner submission to the registry with gamification and time tracking
 */
export const recordNewSubmission = (
  profile: LearnerProfile,
  score: number,
  answers: QuestionAnswerRecord[],
  gamificationStats?: {
    timeTakenSeconds?: number;
    formattedDuration?: string;
    gamificationPoints?: number;
    streakBest?: number;
    mistakesCount?: number;
  }
): LearnerSubmission => {
  const all = getAllSubmissions();
  const now = new Date();
  
  const newRecord: LearnerSubmission = {
    id: `SUB-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: now.toISOString(),
    formattedDate: now.toLocaleString('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    learnerName: profile.name || 'Aprendiz SENA',
    documentNumber: profile.documentNumber || 'Sin Documento',
    program: profile.program || 'Programa SENA',
    ficha: profile.ficha || 'Sin Ficha',
    regional: profile.regional || 'Distrito Capital',
    center: profile.center || 'Centro de Formación',
    examScore: score,
    isPassed: score >= 70,
    certificateCode: profile.certificateCode || `SENA-IND-${Date.now().toString().slice(-4)}`,
    completedModules: profile.completedModules || [],
    answers,
    syncedToDrive: false,
    timeTakenSeconds: gamificationStats?.timeTakenSeconds,
    formattedDuration: gamificationStats?.formattedDuration,
    gamificationPoints: gamificationStats?.gamificationPoints,
    streakBest: gamificationStats?.streakBest,
    mistakesCount: gamificationStats?.mistakesCount,
  };

  // Prepend newest first
  const updated = [newRecord, ...all];
  saveAllSubmissions(updated);
  return newRecord;
};

/**
 * Marks specified submissions as synced to Google Drive
 */
export const markSubmissionsAsSynced = (ids: string[]): void => {
  const all = getAllSubmissions();
  const nowString = new Date().toLocaleString('es-CO');
  const updated = all.map((sub) => {
    if (ids.includes(sub.id)) {
      return {
        ...sub,
        syncedToDrive: true,
        driveSyncedAt: nowString,
      };
    }
    return sub;
  });
  saveAllSubmissions(updated);
};

/**
 * Deletes a single submission by ID
 */
export const deleteSubmission = (id: string): void => {
  const all = getAllSubmissions();
  const updated = all.filter((s) => s.id !== id);
  saveAllSubmissions(updated);
};

/**
 * Clears all submissions
 */
export const clearAllSubmissions = (): void => {
  try {
    localStorage.removeItem(SUBMISSIONS_STORAGE_KEY);
  } catch (err) {
    console.error('Error clearing submissions:', err);
  }
};

/**
 * Re-seeds sample submissions for testing
 */
export const reseedSampleSubmissions = (): LearnerSubmission[] => {
  const seeded = getInitialSampleSubmissions();
  saveAllSubmissions(seeded);
  return seeded;
};

/**
 * Checks Admin PIN
 */
export const getAdminPin = (): string => {
  try {
    return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_ADMIN_PIN;
  } catch {
    return DEFAULT_ADMIN_PIN;
  }
};

export const setAdminPin = (newPin: string): void => {
  try {
    localStorage.setItem(ADMIN_PIN_KEY, newPin.trim());
  } catch (err) {
    console.error('Error saving admin pin:', err);
  }
};

export const verifyAdminPin = (enteredPin: string): boolean => {
  const currentPin = getAdminPin();
  return enteredPin.trim().toUpperCase() === currentPin.trim().toUpperCase();
};

/**
 * Admin Authentication state
 */
export const isInstructorAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setInstructorAuthenticated = (auth: boolean): void => {
  try {
    if (auth) {
      sessionStorage.setItem(ADMIN_AUTH_SESSION_KEY, 'true');
    } else {
      sessionStorage.removeItem(ADMIN_AUTH_SESSION_KEY);
    }
  } catch {
    // ignore
  }
};

/**
 * Exports submissions to CSV format and triggers browser download
 */
export const exportSubmissionsToCsv = (submissions: LearnerSubmission[]): void => {
  const headers = [
    'Marca Temporal',
    'Nombre del Aprendiz',
    'N° Documento',
    'Programa de Formación',
    'N° Ficha',
    'Regional',
    'Centro de Formación',
    'Calificación (%)',
    'Puntaje Gamificado',
    'Tiempo Empleado',
    'Errores',
    'Racha Máxima',
    'Estado',
    'Código Certificado',
    'Sincronizado a Drive',
    'Fecha Sincronización',
  ];

  const escapeCsv = (val: any) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = submissions.map((s) => [
    escapeCsv(s.formattedDate),
    escapeCsv(s.learnerName),
    escapeCsv(s.documentNumber),
    escapeCsv(s.program),
    escapeCsv(s.ficha),
    escapeCsv(s.regional),
    escapeCsv(s.center),
    escapeCsv(s.examScore),
    escapeCsv(s.gamificationPoints ?? s.examScore * 10),
    escapeCsv(s.formattedDuration ?? (s.timeTakenSeconds ? `${Math.floor(s.timeTakenSeconds / 60)}m ${s.timeTakenSeconds % 60}s` : 'N/A')),
    escapeCsv(s.mistakesCount ?? s.answers.filter((a) => !a.isCorrect).length),
    escapeCsv(s.streakBest ?? 'N/A'),
    escapeCsv(s.isPassed ? 'APROBADO' : 'NO APROBADO'),
    escapeCsv(s.certificateCode),
    escapeCsv(s.syncedToDrive ? 'SI' : 'NO'),
    escapeCsv(s.driveSyncedAt || 'Pendiente'),
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `SENA_Induccion_Aprendices_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Helper to generate initial sample responses for questions
 */
function createSampleAnswers(allCorrect = true): QuestionAnswerRecord[] {
  return SECTIONAL_EVALUATION_QUESTIONS.map((q, idx) => {
    const selectedIdx = allCorrect ? q.correctAnswer : idx % 3 === 0 ? q.correctAnswer : (q.correctAnswer + 1) % q.options.length;
    const isRight = selectedIdx === q.correctAnswer;
    return {
      questionId: q.id,
      questionText: q.question,
      selectedOptionIndex: selectedIdx,
      selectedOptionText: q.options[selectedIdx],
      correctOptionIndex: q.correctAnswer,
      correctOptionText: q.options[q.correctAnswer],
      isCorrect: isRight,
      explanation: q.explanation,
      sectionTitle: q.sectionTitle,
      positiveReinforcement: q.positiveReinforcement,
      errorFeedback: q.errorFeedback,
      timeSpentSeconds: 12 + (idx % 8),
    };
  });
}

function getInitialSampleSubmissions(): LearnerSubmission[] {
  const d1 = new Date(Date.now() - 3600000 * 4);
  const d2 = new Date(Date.now() - 3600000 * 24);
  const d3 = new Date(Date.now() - 3600000 * 48);

  return [
    {
      id: 'SUB-INIT-001',
      timestamp: d1.toISOString(),
      formattedDate: d1.toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }),
      learnerName: 'Alejandro Gómez Rodríguez',
      documentNumber: '1028471920',
      program: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
      ficha: '2874102',
      regional: 'Distrito Capital',
      center: 'Centro de Servicios y Gestión Empresarial',
      examScore: 100,
      isPassed: true,
      certificateCode: 'SENA-IND-2026-8D62',
      completedModules: ['simbolos', 'valores', 'formacion', 'reglamento', 'ecosistema', 'evaluacion'],
      answers: createSampleAnswers(true),
      syncedToDrive: true,
      driveSyncedAt: d1.toLocaleString('es-CO'),
      timeTakenSeconds: 312,
      formattedDuration: '5m 12s',
      gamificationPoints: 2450,
      streakBest: 25,
      mistakesCount: 0,
    },
    {
      id: 'SUB-INIT-002',
      timestamp: d2.toISOString(),
      formattedDate: d2.toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }),
      learnerName: 'Camila Andrea Morales',
      documentNumber: '1014298451',
      program: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
      ficha: '2874102',
      regional: 'Distrito Capital',
      center: 'Centro de Servicios y Gestión Empresarial',
      examScore: 92,
      isPassed: true,
      certificateCode: 'SENA-IND-2026-9A14',
      completedModules: ['simbolos', 'valores', 'formacion', 'reglamento', 'ecosistema', 'evaluacion'],
      answers: createSampleAnswers(false),
      syncedToDrive: false,
      timeTakenSeconds: 388,
      formattedDuration: '6m 28s',
      gamificationPoints: 2120,
      streakBest: 14,
      mistakesCount: 2,
    },
    {
      id: 'SUB-INIT-003',
      timestamp: d3.toISOString(),
      formattedDate: d3.toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }),
      learnerName: 'Juan David Martínez Torres',
      documentNumber: '1098456123',
      program: 'Tecnología en Gestión Contable e Información Financiera',
      ficha: '2874103',
      regional: 'Antioquia',
      center: 'Centro de Comercio',
      examScore: 68,
      isPassed: false,
      certificateCode: 'SENA-IND-2026-7B42',
      completedModules: ['simbolos', 'valores', 'reglamento', 'evaluacion'],
      answers: createSampleAnswers(false),
      syncedToDrive: false,
      timeTakenSeconds: 520,
      formattedDuration: '8m 40s',
      gamificationPoints: 1240,
      streakBest: 6,
      mistakesCount: 8,
    },
  ];
}
