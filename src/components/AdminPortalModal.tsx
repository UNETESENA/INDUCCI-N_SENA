import React, { useState, useEffect } from 'react';
import {
  LearnerSubmission,
  QuestionAnswerRecord,
} from '../types/induction';
import { REGULATION_SECTIONS } from '../data/regulationQuestions';
import {
  getAllSubmissions,
  deleteSubmission,
  clearAllSubmissions,
  reseedSampleSubmissions,
  exportSubmissionsToCsv,
  getAdminPin,
  setAdminPin,
  setInstructorAuthenticated,
} from '../services/submissionRegistry';
import {
  googleSignIn,
  logoutGoogle,
  getAccessToken,
  initAuth,
} from '../services/googleAuth';
import {
  findExistingInductionSpreadsheet,
  createInductionSpreadsheet,
  syncSubmissionsToDriveSheet,
  DEFAULT_FILE_NAME,
} from '../services/googleSheets';
import {
  ShieldCheck,
  X,
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  RotateCcw,
  ExternalLink,
  Lock,
  LogOut,
  RefreshCw,
  Award,
  Users,
  Check,
  AlertCircle,
  Key,
  BookOpen,
  ClipboardList,
  Sparkles,
  Info,
  ChevronRight,
  Printer,
  BarChart3,
} from 'lucide-react';
import { User } from 'firebase/auth';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'evaluaciones' | 'drive' | 'plan_trabajo' | 'configuracion'>('evaluaciones');
  const [submissions, setSubmissions] = useState<LearnerSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'aprobados' | 'reprobados' | 'pendientes_drive'>('todos');
  const [fichaFilter, setFichaFilter] = useState<string>('todas');
  const [regionalFilter, setRegionalFilter] = useState<string>('todas');
  const [selectedSubmissionForDetail, setSelectedSubmissionForDetail] = useState<LearnerSubmission | null>(null);

  // Google Drive state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [spreadsheetInfo, setSpreadsheetInfo] = useState<{ id: string; name: string; webViewLink?: string } | null>(null);
  const [isSyncingDrive, setIsSyncingDrive] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // PIN settings state
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load submissions and Google auth state
  useEffect(() => {
    if (isOpen) {
      loadSubmissions();

      const unsubscribe = initAuth(
        (user, t) => {
          setCurrentUser(user);
          setToken(t);
          checkDriveSpreadsheet();
        },
        () => {
          setCurrentUser(null);
          setToken(null);
        }
      );

      // Check current token
      getAccessToken().then((t) => {
        if (t) {
          setToken(t);
          checkDriveSpreadsheet();
        }
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [isOpen]);

  const loadSubmissions = () => {
    const list = getAllSubmissions();
    setSubmissions(list);
  };

  const checkDriveSpreadsheet = async () => {
    try {
      const found = await findExistingInductionSpreadsheet();
      if (found) {
        setSpreadsheetInfo(found);
      }
    } catch {
      // not logged in or error
    }
  };

  if (!isOpen) return null;

  // Extract unique fichas and regionales for filters
  const uniqueFichas = Array.from(new Set(submissions.map((s) => s.ficha).filter(Boolean)));
  const uniqueRegionales = Array.from(new Set(submissions.map((s) => s.regional).filter(Boolean)));

  // Filter submissions
  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      s.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.ficha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.program.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (fichaFilter !== 'todas' && s.ficha !== fichaFilter) return false;
    if (regionalFilter !== 'todas' && s.regional !== regionalFilter) return false;

    if (statusFilter === 'aprobados') return s.isPassed;
    if (statusFilter === 'reprobados') return !s.isPassed;
    if (statusFilter === 'pendientes_drive') return !s.syncedToDrive;
    return true;
  });

  // Analytics Metrics
  const totalSubmissions = submissions.length;
  const passedCount = submissions.filter((s) => s.isPassed).length;
  const failedCount = totalSubmissions - passedCount;
  const passRate = totalSubmissions > 0 ? Math.round((passedCount / totalSubmissions) * 100) : 0;
  const averageScore = totalSubmissions > 0
    ? Math.round(submissions.reduce((acc, curr) => acc + curr.examScore, 0) / totalSubmissions)
    : 0;
  const syncedDriveCount = submissions.filter((s) => s.syncedToDrive).length;
  const pendingDriveCount = totalSubmissions - syncedDriveCount;

  // Section Performance Breakdown from submissions
  const sectionStats = REGULATION_SECTIONS.map((sec, secIdx) => {
    let totalQuestions = 0;
    let correctQuestions = 0;

    submissions.forEach((sub) => {
      // Look for answers belonging to this section either by sectionTitle or question index block (5 questions per section)
      const secAnswers = sub.answers.filter((ans, aIdx) => {
        if (ans.sectionTitle) {
          return ans.sectionTitle.toLowerCase().includes(sec.title.toLowerCase().slice(0, 10));
        }
        return Math.floor(aIdx / 5) === secIdx;
      });

      secAnswers.forEach((ans) => {
        totalQuestions += 1;
        if (ans.isCorrect) correctQuestions += 1;
      });
    });

    const percent = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 100;
    return {
      title: sec.title,
      badge: sec.badge,
      percent,
      totalQuestions,
      correctQuestions,
    };
  });

  // Actions
  const handleGoogleLogin = async () => {
    try {
      setSyncMessage(null);
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setToken(res.accessToken);
        const sheet = await findExistingInductionSpreadsheet();
        if (sheet) {
          setSpreadsheetInfo(sheet);
        }
      }
    } catch (err: any) {
      setSyncMessage({ type: 'error', text: err.message || 'Error al conectar con Google' });
    }
  };

  const handleGoogleLogout = async () => {
    await logoutGoogle();
    setCurrentUser(null);
    setToken(null);
    setSpreadsheetInfo(null);
  };

  const handleCreateNewSpreadsheet = async () => {
    setIsSyncingDrive(true);
    setSyncMessage(null);
    try {
      const created = await createInductionSpreadsheet();
      setSpreadsheetInfo(created);
      setSyncMessage({
        type: 'success',
        text: `Hoja creada con éxito en Google Drive: "${created.name}"`,
      });
    } catch (err: any) {
      setSyncMessage({ type: 'error', text: err.message || 'Error al crear la hoja' });
    } finally {
      setIsSyncingDrive(false);
    }
  };

  const handleSyncAllToDrive = async () => {
    if (!token) {
      setActiveTab('drive');
      setSyncMessage({
        type: 'error',
        text: 'Debes iniciar sesión con tu cuenta de Google del instructor para sincronizar a Drive.',
      });
      return;
    }

    const unsynced = submissions.filter((s) => !s.syncedToDrive);
    const toSync = unsynced.length > 0 ? unsynced : submissions;

    if (toSync.length === 0) {
      setSyncMessage({ type: 'error', text: 'No hay registros disponibles para sincronizar.' });
      return;
    }

    setIsSyncingDrive(true);
    setSyncMessage(null);

    try {
      const result = await syncSubmissionsToDriveSheet(toSync, spreadsheetInfo?.id);
      setSpreadsheetInfo((prev) => ({
        id: result.spreadsheetId,
        name: prev?.name || DEFAULT_FILE_NAME,
        webViewLink: result.fileUrl,
      }));
      loadSubmissions();
      setSyncMessage({
        type: 'success',
        text: `¡Éxito! Se han sincronizado ${result.syncedCount} registro(s) de aprendices a tu hoja de Google Drive.`,
      });
    } catch (err: any) {
      setSyncMessage({
        type: 'error',
        text: err.message || 'Error al sincronizar con Google Sheets en Drive',
      });
    } finally {
      setIsSyncingDrive(false);
    }
  };

  const handleDeleteSubmission = (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el registro de ${name}?`)) {
      deleteSubmission(id);
      loadSubmissions();
      if (selectedSubmissionForDetail?.id === id) {
        setSelectedSubmissionForDetail(null);
      }
    }
  };

  const handleReseed = () => {
    if (window.confirm('¿Deseas restaurar los aprendices de prueba para demostración?')) {
      reseedSampleSubmissions();
      loadSubmissions();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('¿ATENCIÓN: Deseas eliminar TODOS los registros de aprendices? Esta acción vacía la base de datos local para iniciar con una ficha nueva.')) {
      clearAllSubmissions();
      loadSubmissions();
      setSelectedSubmissionForDetail(null);
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeMsg(null);
    const stored = getAdminPin();
    if (currentPinInput.trim().toUpperCase() !== stored.trim().toUpperCase()) {
      setPinChangeMsg({ type: 'error', text: 'La clave actual no coincide.' });
      return;
    }
    if (newPinInput.trim().length < 4) {
      setPinChangeMsg({ type: 'error', text: 'La nueva clave debe tener al menos 4 caracteres.' });
      return;
    }
    setAdminPin(newPinInput.trim());
    setPinChangeMsg({ type: 'success', text: '¡Clave de instructor actualizada con éxito!' });
    setCurrentPinInput('');
    setNewPinInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#007832] dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Portal de Instructor & Administrador SENA
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-full border border-emerald-300 dark:border-emerald-800">
                  Modo Seguro
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Control de respuestas de aprendices, notas de inducción y sincronización con Google Drive
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-800 rounded-xl transition-colors"
              title="Cerrar sesión de administrador"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900 overflow-x-auto shrink-0 gap-1">
          <button
            onClick={() => setActiveTab('evaluaciones')}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'evaluaciones'
                ? 'border-[#39A900] text-[#007832] dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Aprendices & Respuestas ({totalSubmissions})</span>
          </button>

          <button
            onClick={() => setActiveTab('drive')}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'drive'
                ? 'border-[#39A900] text-[#007832] dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Google Drive & Sheets {pendingDriveCount > 0 && `(${pendingDriveCount} pend.)`}</span>
          </button>

          <button
            onClick={() => setActiveTab('plan_trabajo')}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'plan_trabajo'
                ? 'border-[#39A900] text-[#007832] dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Plan de Trabajo & Seguridad</span>
          </button>

          <button
            onClick={() => setActiveTab('configuracion')}
            className={`flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'configuracion'
                ? 'border-[#39A900] text-[#007832] dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Seguridad & Ajustes</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/40">
          {/* TAB 1: EVALUACIONES Y RESPUESTAS */}
          {activeTab === 'evaluaciones' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Evaluados</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">{totalSubmissions}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Aprendices</div>
                </div>

                <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Aprobados (≥70%)</div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">{passedCount}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{passRate}% del total</div>
                </div>

                <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="text-xs font-semibold text-rose-600 dark:text-rose-400">Por Mejorar (&lt;70%)</div>
                  <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono mt-1">{failedCount}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Pendiente repetir</div>
                </div>

                <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Promedio General</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">{averageScore}%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Calificación media</div>
                </div>

                <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs col-span-2 sm:col-span-1">
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">En Google Drive</div>
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono mt-1">{syncedDriveCount}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{pendingDriveCount} sin sincronizar</div>
                </div>
              </div>

              {/* Section Performance Analytics: Mastery by Regulation Chapter */}
              <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#007832] dark:text-emerald-400" />
                      <span>Rendimiento Académico por Sección del Reglamento (Acuerdo 0009 de 2024)</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Diagnóstico consolidado de aciertos de los aprendices en las 5 secciones evaluadas.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
                  {sectionStats.map((st, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 dark:text-slate-300 truncate">{st.badge}</span>
                        <span
                          className={`font-mono font-bold ${
                            st.percent >= 80
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : st.percent >= 60
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {st.percent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            st.percent >= 80 ? 'bg-[#39A900]' : st.percent >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${st.percent}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate" title={st.title}>
                        {st.title.split(' ')[0]} {st.title.split(' ')[1] || ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls Toolbar: Search, Filters & Actions */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
                  {/* Search */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Buscar por aprendiz, cédula, ficha..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="w-full sm:w-auto px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                      <option value="todos">Todos los Estados</option>
                      <option value="aprobados">Solo Aprobados (≥70%)</option>
                      <option value="reprobados">Solo No Aprobados (&lt;70%)</option>
                      <option value="pendientes_drive">Pendientes Drive</option>
                    </select>
                  </div>

                  {/* Ficha Filter */}
                  {uniqueFichas.length > 0 && (
                    <div className="w-full sm:w-auto">
                      <select
                        value={fichaFilter}
                        onChange={(e) => setFichaFilter(e.target.value)}
                        className="w-full sm:w-auto px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                        title="Filtrar por grupo o ficha"
                      >
                        <option value="todas">Todas las Fichas</option>
                        {uniqueFichas.map((f) => (
                          <option key={f} value={f}>
                            Ficha: {f}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Regional Filter */}
                  {uniqueRegionales.length > 0 && (
                    <div className="w-full sm:w-auto">
                      <select
                        value={regionalFilter}
                        onChange={(e) => setRegionalFilter(e.target.value)}
                        className="w-full sm:w-auto px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                        title="Filtrar por regional"
                      >
                        <option value="todas">Todas las Regionales</option>
                        {uniqueRegionales.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Export & Sync Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportSubmissionsToCsv(filteredSubmissions)}
                    disabled={filteredSubmissions.length === 0}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors disabled:opacity-50"
                    title="Descargar archivo Excel CSV para consultar offline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar CSV</span>
                  </button>

                  <button
                    onClick={handleSyncAllToDrive}
                    disabled={isSyncingDrive || totalSubmissions === 0}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors shadow-2xs disabled:opacity-50"
                    title="Sincronizar a tu hoja de cálculo en Drive"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>{isSyncingDrive ? 'Sincronizando...' : 'Sincronizar a Drive'}</span>
                  </button>
                </div>
              </div>

              {/* Status Message if any */}
              {syncMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                    syncMessage.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  {syncMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{syncMessage.text}</span>
                </div>
              )}

              {/* Table of Submissions */}
              <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
                {filteredSubmissions.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 dark:text-slate-400 space-y-3">
                    <Users className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-sm font-semibold">No se encontraron registros de aprendices</p>
                    <p className="text-xs max-w-sm mx-auto">
                      {searchTerm
                        ? 'Prueba con otro término de búsqueda o limpia los filtros.'
                        : 'Cuando los aprendices presenten su inducción o evaluación, sus respuestas aparecerán aquí automáticamente.'}
                    </p>
                    {!searchTerm && (
                      <button
                        onClick={handleReseed}
                        className="mt-2 px-3 py-1.5 text-xs font-semibold text-[#007832] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 dark:border-emerald-800 inline-flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Cargar Registros de Demostración</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                      <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="px-4 py-3">Aprendiz & Cédula</th>
                          <th className="px-4 py-3">Ficha & Programa</th>
                          <th className="px-4 py-3 text-center">Calificación</th>
                          <th className="px-4 py-3 text-center">Gamificación & Tiempo</th>
                          <th className="px-4 py-3">Fecha y Hora</th>
                          <th className="px-4 py-3 text-center">Drive</th>
                          <th className="px-4 py-3 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-sans">
                        {filteredSubmissions.map((sub) => {
                          const correctCount = sub.answers.filter((a) => a.isCorrect).length;
                          return (
                            <tr
                              key={sub.id}
                              className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                            >
                              <td className="px-4 py-3.5">
                                <div className="font-bold text-slate-900 dark:text-white">
                                  {sub.learnerName}
                                </div>
                                <div className="text-[11px] text-slate-500 font-mono">
                                  CC: {sub.documentNumber}
                                </div>
                              </td>

                              <td className="px-4 py-3.5">
                                <div className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[220px]">
                                  {sub.program}
                                </div>
                                <div className="text-[11px] text-slate-500 font-mono">
                                  Ficha: {sub.ficha}
                                </div>
                              </td>

                              <td className="px-4 py-3.5 text-center">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                                    sub.isPassed
                                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                      : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                                  }`}
                                >
                                  {sub.isPassed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                  <span>{sub.examScore}%</span>
                                </span>
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  {correctCount}/{sub.answers.length} correctas
                                </div>
                              </td>

                              <td className="px-4 py-3.5 text-center">
                                <div className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                                  {sub.gamificationPoints ?? sub.examScore * 10} pts
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1 mt-0.5">
                                  <span>⏱ {sub.formattedDuration || (sub.timeTakenSeconds ? `${Math.floor(sub.timeTakenSeconds / 60)}m ${sub.timeTakenSeconds % 60}s` : 'N/A')}</span>
                                  <span>· {sub.mistakesCount ?? sub.answers.filter((a) => !a.isCorrect).length} err</span>
                                </div>
                              </td>

                              <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                <div>{sub.formattedDate || new Date(sub.timestamp).toLocaleDateString('es-CO')}</div>
                                <div className="text-[10px] text-slate-400 font-mono">{sub.certificateCode}</div>
                              </td>

                              <td className="px-4 py-3.5 text-center">
                                {sub.syncedToDrive ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                    <Check className="w-3 h-3" />
                                    <span>En Drive</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                    Pendiente
                                  </span>
                                )}
                              </td>

                              <td className="px-4 py-3.5 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setSelectedSubmissionForDetail(sub)}
                                    className="px-2.5 py-1 text-xs font-semibold text-[#007832] dark:text-emerald-400 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 rounded-lg transition-colors border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
                                    title="Ver preguntas y respuestas completas de esta evaluación"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Ver Respuestas</span>
                                  </button>

                                  <button
                                    onClick={() => handleDeleteSubmission(sub.id, sub.learnerName)}
                                    className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-lg"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE DRIVE Y GOOGLE SHEETS */}
          {activeTab === 'drive' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Educational info on privacy */}
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#007832] dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-emerald-900 dark:text-emerald-200">
                  <div className="font-bold text-sm">Seguridad y Aislamiento de Información Garantizados</div>
                  <p className="leading-relaxed">
                    Esta hoja de cálculo reside en <strong>tu cuenta personal o institucional de Google Drive</strong>. Los aprendices <strong>NO TIENEN ACCESO</strong> al enlace ni a los datos de sus compañeros; su interfaz está 100% libre de credenciales y referencias a Drive. Solo tú como instructor autenticado puedes consultar o sincronizar la información consolidada.
                  </p>
                </div>
              </div>

              {/* Google Account Connection Card */}
              <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Cuenta de Google del Instructor
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Vincula tu cuenta de Google donde se guardará la hoja con las notas de los aprendices.
                    </p>
                  </div>

                  {currentUser ? (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.displayName || 'Instructor SENA'}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{currentUser.email}</div>
                      </div>
                      <button
                        onClick={handleGoogleLogout}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200 dark:border-rose-800"
                      >
                        Desconectar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleGoogleLogin}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors shadow-2xs flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Conectar con Google Drive</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Spreadsheet Status & Actions */}
              <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Hoja de Cálculo en Google Drive
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Nombre oficial: <code className="font-mono font-bold text-slate-700 dark:text-slate-300">{spreadsheetInfo?.name || DEFAULT_FILE_NAME}</code>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {spreadsheetInfo?.webViewLink ? (
                      <a
                        href={spreadsheetInfo.webViewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400" />
                        <span>Abrir Hoja en Google Drive</span>
                      </a>
                    ) : (
                      <button
                        onClick={handleCreateNewSpreadsheet}
                        disabled={!currentUser || isSyncingDrive}
                        className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-xl transition-colors border border-slate-300 dark:border-slate-700 disabled:opacity-50"
                      >
                        Crear Hoja en mi Drive
                      </button>
                    )}

                    <button
                      onClick={handleSyncAllToDrive}
                      disabled={!currentUser || isSyncingDrive}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncingDrive ? 'animate-spin' : ''}`} />
                      <span>{isSyncingDrive ? 'Sincronizando...' : 'Sincronizar Todas a Drive'}</span>
                    </button>
                  </div>
                </div>

                {/* Status Message */}
                {syncMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                      syncMessage.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    {syncMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{syncMessage.text}</span>
                  </div>
                )}

                {/* Structure preview */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Estructura de Columnas Registradas en la Hoja:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Marca Temporal',
                      'Nombre del Aprendiz',
                      'N° Documento',
                      'Programa de Formación',
                      'N° Ficha',
                      'Regional',
                      'Centro de Formación',
                      'Estado Inducción',
                      'Calificación Evaluación (%)',
                      'Código Certificado',
                      'Módulos Completados',
                      'Fecha Inicio',
                    ].map((col, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLAN DE TRABAJO Y SEGURIDAD */}
          {activeTab === 'plan_trabajo' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/70 text-[#007832] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    Plan de Trabajo Oficial · Arquitectura de Seguridad SENA
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    Estrategia de Publicación Segura y Control Docente
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    Diseñado para permitir que el prototipo se comparta libremente con los aprendices para realizar sus inducciones y evaluaciones, garantizando que el acceso a la hoja de cálculo en Drive y las notas consolidadas permanezcan 100% privados y restringidos al instructor.
                  </p>
                </div>

                {/* 5-Phase Plan */}
                <div className="space-y-4">
                  {/* Phase 1 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                      <span className="w-6 h-6 rounded-lg bg-[#39A900] text-white flex items-center justify-center text-xs">1</span>
                      <span>Fase 1: Interfaz Pública Segura para Aprendices (Zero-Exposure)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                      <strong>Acción ejecutada:</strong> Se eliminaron por completo todos los botones visibles de "Registro Drive" y enlaces a Google Sheets de la barra superior (<code className="font-mono text-emerald-700 dark:text-emerald-400">Header</code>), del Pasaporte institucional, de la pantalla de resultados del examen y del Certificado de Inducción. El aprendiz interactúa exclusivamente con sus módulos de formación, su prueba y su certificado sin tener acceso ni sospecha de las conexiones de base de datos.
                    </p>
                  </div>

                  {/* Phase 2 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                      <span className="w-6 h-6 rounded-lg bg-[#39A900] text-white flex items-center justify-center text-xs">2</span>
                      <span>Fase 2: Registro Silencioso y Estructurado de Evaluaciones</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                      <strong>Acción ejecutada:</strong> Al momento en que un aprendiz responde la última pregunta de la evaluación institucional, el sistema calcula su nota, almacena el desglose pregunta por pregunta (opción elegida vs opción correcta), su número de ficha, cédula, fecha y código de certificado en el registro local seguro (<code className="font-mono text-emerald-700 dark:text-emerald-400">submissionRegistry</code>). El estudiante no necesita cuenta de Google ni inicia sesión externa.
                    </p>
                  </div>

                  {/* Phase 3 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                      <span className="w-6 h-6 rounded-lg bg-[#39A900] text-white flex items-center justify-center text-xs">3</span>
                      <span>Fase 3: Control de Acceso por Roles (RBAC Docente / PIN Maestro)</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                      <strong>Acción ejecutada:</strong> Se creó una puerta de enlace restringida para el instructor mediante PIN maestro (<code className="font-mono text-emerald-700 dark:text-emerald-400">{getAdminPin()}</code>) y autenticación con cuenta de Google del docente (<code className="font-mono text-emerald-700 dark:text-emerald-400">gprietogcsf@gmail.com</code>). El acceso está situado discretamente en el pie de página institucional y con un acceso discreto en cabecera.
                    </p>
                  </div>

                  {/* Phase 4 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                      <span className="w-6 h-6 rounded-lg bg-[#39A900] text-white flex items-center justify-center text-xs">4</span>
                      <span>Fase 4: Custodia de Datos y Hoja Maestra en Google Drive Privado</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                      <strong>Acción ejecutada:</strong> Únicamente el instructor autenticado posee los tokens OAuth de Google Workspace para sincronizar los registros a la hoja titulada <code className="font-mono text-emerald-700 dark:text-emerald-400">"SENA - Registro de Aprendices Inducción Institucional"</code>. La hoja está protegida bajo los permisos privados de Drive del docente, cumpliendo las normas de protección de datos (Habeas Data) y evitando modificaciones indebidas.
                    </p>
                  </div>

                  {/* Phase 5 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                      <span className="w-6 h-6 rounded-lg bg-[#39A900] text-white flex items-center justify-center text-xs">5</span>
                      <span>Fase 5: Protocolo de Publicación y Despliegue en Fichas de Aprendices</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                      <strong>Recomendación operativa:</strong> Comparte el enlace de la aplicación pública en plataformas como Zajuna LMS, correo de inducción institucional o grupos de formación. Durante la jornada de inducción, ingresas periódicamente con tu clave de instructor al panel para auditar respuestas, descargar el respaldo CSV o presionar "Sincronizar a Drive" para consolidar los resultados en tu nube.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SEGURIDAD Y AJUSTES */}
          {activeTab === 'configuracion' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Change PIN Form */}
              <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  <Key className="w-4 h-4 text-[#007832] dark:text-emerald-400" />
                  <span>Modificar Clave de Acceso Docente (PIN)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Esta clave protege el acceso al panel docente y a las respuestas de los aprendices.
                </p>

                <form onSubmit={handleChangePin} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Clave Actual
                    </label>
                    <input
                      type="text"
                      value={currentPinInput}
                      onChange={(e) => setCurrentPinInput(e.target.value)}
                      placeholder="Ej. SENA2026"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nueva Clave de Administrador
                    </label>
                    <input
                      type="text"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      placeholder="Mínimo 4 caracteres"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-slate-900 dark:text-white"
                    />
                  </div>

                  {pinChangeMsg && (
                    <div
                      className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                        pinChangeMsg.type === 'success'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200'
                          : 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200'
                      }`}
                    >
                      {pinChangeMsg.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>{pinChangeMsg.text}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#39A900] hover:bg-[#007832] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Guardar Nueva Clave
                  </button>
                </form>
              </div>

              {/* Maintenance Tools */}
              <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Mantenimiento de Base de Datos
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleReseed}
                    className="flex-1 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Recargar Aprendices de Muestra</span>
                  </button>

                  <button
                    onClick={handleClearAll}
                    className="flex-1 px-4 py-2.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 rounded-xl transition-colors border border-rose-200 dark:border-rose-800 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar Base de Datos (Limpiar para Nueva Ficha)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Question Answers Modal / Drawer */}
        {selectedSubmissionForDetail && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                      selectedSubmissionForDetail.isPassed ? 'bg-[#39A900]' : 'bg-rose-600'
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Desglose de Respuestas: {selectedSubmissionForDetail.learnerName}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      CC: {selectedSubmissionForDetail.documentNumber} · Ficha: {selectedSubmissionForDetail.ficha} · Calificación: {selectedSubmissionForDetail.examScore}% ({selectedSubmissionForDetail.isPassed ? 'Aprobado' : 'No Aprobado'})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSubmissionForDetail(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedSubmissionForDetail.answers.map((ans, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-xs space-y-2 ${
                      ans.isCorrect
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {idx + 1}. {ans.questionText}
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                          ans.isCorrect
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                        }`}
                      >
                        {ans.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Correcta</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Incorrecta</span>
                          </>
                        )}
                      </span>
                    </div>

                    <div className="space-y-1 pl-1">
                      {ans.sectionTitle && (
                        <div className="text-[11px] font-semibold text-[#007832] dark:text-emerald-400">
                          Sección: {ans.sectionTitle}
                        </div>
                      )}
                      <div className="text-slate-700 dark:text-slate-300">
                        <span className="font-bold">Respuesta del aprendiz:</span>{' '}
                        <span className={ans.isCorrect ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-rose-700 dark:text-rose-400 font-semibold'}>
                          {ans.selectedOptionText}
                        </span>
                      </div>
                      {!ans.isCorrect && (
                        <div className="text-slate-700 dark:text-slate-300">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">Respuesta correcta institucional:</span>{' '}
                          <span>{ans.correctOptionText}</span>
                        </div>
                      )}
                      {ans.positiveReinforcement && ans.isCorrect && (
                        <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                          Refuerzo Positivo: {ans.positiveReinforcement}
                        </div>
                      )}
                      {ans.errorFeedback && !ans.isCorrect && (
                        <div className="text-[11px] text-rose-700 dark:text-rose-400 font-medium">
                          Retroalimentación de Error: {ans.errorFeedback}
                        </div>
                      )}
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                        Fundamento: {ans.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-end">
                <button
                  onClick={() => setSelectedSubmissionForDetail(null)}
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-colors"
                >
                  Cerrar Detalle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
