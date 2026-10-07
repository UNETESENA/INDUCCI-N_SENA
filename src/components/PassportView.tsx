import React from 'react';
import { LearnerProfile, ModuleId } from '../types/induction';
import { INDUCTION_MODULES } from '../data/senaData';
import { Award, CheckCircle2, Circle, ArrowRight, ShieldCheck, HeartHandshake, GraduationCap, BookOpen, Layers, Sparkles } from 'lucide-react';

interface PassportViewProps {
  profile: LearnerProfile;
  onSelectModule: (mod: ModuleId) => void;
  onGoToCertificate: () => void;
  onOpenProfile: () => void;
}

export const PassportView: React.FC<PassportViewProps> = ({
  profile,
  onSelectModule,
  onGoToCertificate,
  onOpenProfile,
}) => {
  const completedCount = profile.completedModules.length;
  const progressPercent = Math.round((completedCount / 6) * 100);
  const isAllComplete = completedCount >= 5 && (profile.examScore !== null && profile.examScore >= 70);

  const getModuleIcon = (id: ModuleId) => {
    switch (id) {
      case 'simbolos':
        return ShieldCheck;
      case 'valores':
        return HeartHandshake;
      case 'formacion':
        return GraduationCap;
      case 'reglamento':
        return BookOpen;
      case 'ecosistema':
        return Layers;
      case 'evaluacion':
        return Award;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
          <span>Pasaporte del Aprendiz</span>
          <span aria-hidden="true">·</span>
          <span>Registro de Competencias Institucionales</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tu Ruta de Inducción Institucional
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Monitorea tu avance en cada uno de los 6 pilares de la inducción SENA.
          Al completar todos los módulos y aprobar la evaluación diagnóstica, obtendrás tu Certificado Oficial.
        </p>
      </div>

      {/* Passport Identity Card */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-[#005e26] via-[#007832] to-[#39A900] text-white rounded-3xl shadow-xl relative overflow-hidden">
        {/* Decorative graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-96 h-96 fill-current">
            <circle cx="50" cy="20" r="10" />
            <path d="M50 35 C38 35 32 46 22 55 C19 58 22 62 26 60 C36 52 42 46 47 46 L47 88 C47 91 53 91 53 88 L53 46 C58 46 64 52 74 60 C78 62 81 58 78 55 C68 46 62 35 50 35 Z" />
            <rect x="15" y="92" width="70" height="4" rx="2" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold uppercase tracking-wider">
              <span>SENA · Inducción 2026</span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {profile.name}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5">
                {profile.program}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/90">
              <span>Ficha: <strong>{profile.ficha}</strong></span>
              <span>·</span>
              <span>Doc: <strong>{profile.documentNumber}</strong></span>
              <span>·</span>
              <span>Regional: <strong>{profile.regional}</strong></span>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div className="text-left md:text-right">
              <div className="text-3xl font-black font-mono tabular-nums">
                {progressPercent}%
              </div>
              <div className="text-xs text-emerald-100">
                {completedCount} de 6 módulos completados
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onOpenProfile}
                className="px-3.5 py-1.5 text-xs font-semibold bg-white/15 hover:bg-white/25 rounded-lg transition-colors border border-white/20"
              >
                Actualizar Datos
              </button>
              {isAllComplete && (
                <button
                  onClick={onGoToCertificate}
                  className="px-4 py-1.5 text-xs font-bold bg-white text-[#005e26] hover:bg-emerald-50 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Ver Certificado</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modules Roadmap Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Módulos de la Inducción Institucional
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUCTION_MODULES.map((m, idx) => {
            const isCompleted = profile.completedModules.includes(m.id);
            const IconComp = getModuleIcon(m.id);

            return (
              <div
                key={m.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isCompleted
                          ? 'bg-[#39A900] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      {isCompleted ? (
                        <span className="text-[#007832] dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completado</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <Circle className="w-3.5 h-3.5" />
                          <span>Pendiente</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Módulo 0{idx + 1}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {m.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    {m.estimatedMinutes} min
                  </span>

                  <button
                    onClick={() => onSelectModule(m.id)}
                    className="text-xs font-bold text-[#007832] dark:text-emerald-400 hover:text-[#005e26] dark:hover:text-emerald-300 transition-colors flex items-center gap-1"
                  >
                    <span>{isCompleted ? 'Repasar' : 'Iniciar'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
