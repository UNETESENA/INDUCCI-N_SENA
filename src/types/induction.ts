export interface LearnerProfile {
  name: string;
  documentNumber: string;
  program: string;
  ficha: string;
  regional: string;
  center: string;
  completedModules: string[];
  examScore: number | null;
  certificateCode: string;
  startedAt: string;
}

export type ModuleId = 'simbolos' | 'valores' | 'formacion' | 'reglamento' | 'ecosistema' | 'evaluacion';

export interface InductionModuleInfo {
  id: ModuleId;
  title: string;
  shortDesc: string;
  iconName: string;
  estimatedMinutes: number;
}

export interface QuestionAnswerRecord {
  questionId: number;
  questionText: string;
  selectedOptionIndex: number;
  selectedOptionText: string;
  correctOptionIndex: number;
  correctOptionText: string;
  isCorrect: boolean;
  explanation: string;
  sectionTitle?: string;
  positiveReinforcement?: string;
  errorFeedback?: string;
  timeSpentSeconds?: number;
}

export interface LearnerSubmission {
  id: string;
  timestamp: string;
  formattedDate: string;
  learnerName: string;
  documentNumber: string;
  program: string;
  ficha: string;
  regional: string;
  center: string;
  examScore: number;
  isPassed: boolean;
  certificateCode: string;
  completedModules: string[];
  answers: QuestionAnswerRecord[];
  syncedToDrive: boolean;
  driveSyncedAt?: string;
  // Gamification & Ranking Metrics
  timeTakenSeconds?: number;
  formattedDuration?: string;
  gamificationPoints?: number;
  streakBest?: number;
  mistakesCount?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface EthicalCase {
  id: number;
  title: string;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface DisciplinaryCase {
  id: number;
  title: string;
  context: string;
  incident: string;
  question: string;
  options: {
    title: string;
    classification: 'Falta Leve' | 'Falta Grave' | 'Falta Gravísima' | 'No constituye falta';
    measure: string;
    isOptimal: boolean;
    feedback: string;
  }[];
}
