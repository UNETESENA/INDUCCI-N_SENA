import React, { useState } from 'react';
import { VALORES_INTEGRIDAD, DILEMAS_ETICOS } from '../data/senaData';
import { CheckCircle2, AlertCircle, Sparkles, ChevronRight, Check, HeartHandshake } from 'lucide-react';

interface ModuleValuesProps {
  onCompleteModule: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleValues: React.FC<ModuleValuesProps> = ({
  onCompleteModule,
  isCompleted,
  onNextModule,
}) => {
  const [selectedValor, setSelectedValor] = useState(0);
  const [activeDilemmaIdx, setActiveDilemmaIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);

  const currentDilemma = DILEMAS_ETICOS[activeDilemmaIdx];

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIdx(idx);
  };

  const handleNextDilemma = () => {
    setSelectedOptionIdx(null);
    if (activeDilemmaIdx < DILEMAS_ETICOS.length - 1) {
      setActiveDilemmaIdx(activeDilemmaIdx + 1);
    } else {
      setActiveDilemmaIdx(0);
    }
  };

  return (
    <div className="space-y-10">
      {/* Module Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
          <span>Módulo 2</span>
          <span aria-hidden="true">·</span>
          <span>Ética y Convivencia</span>
          <span aria-hidden="true">·</span>
          <span>Tiempo estimado: 6 min</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Código de Integridad y Valores Institucionales
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          En el SENA, la formación técnica y tecnológica va siempre de la mano con la integridad humana.
          Conoce los 7 valores fundamentales y pon a prueba tu criterio en el simulador de dilemas éticos.
        </p>
      </div>

      {/* Chapter 1: Los 7 Valores del Código de Integridad */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
              01. Código de Integridad
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Los 7 Principios Rectores del Aprendiz
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Función Pública & SENA</span>
        </div>

        {/* Value selector chips */}
        <div className="flex flex-wrap gap-2">
          {VALORES_INTEGRIDAD.map((v, idx) => (
            <button
              key={v.nombre}
              onClick={() => setSelectedValor(idx)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedValor === idx
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {v.nombre}
            </button>
          ))}
        </div>

        {/* Selected Value Spotlight Box */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-400 flex items-center justify-center mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white">
              {VALORES_INTEGRIDAD[selectedValor].nombre}
            </h4>
            <div className="text-xs text-[#007832] dark:text-emerald-400 font-semibold mt-1">
              Valor Oficial SENA
            </div>
          </div>

          <div className="md:col-span-8 space-y-3">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Compromiso del Aprendiz
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              "{VALORES_INTEGRIDAD[selectedValor].descripcion}"
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                <strong>Lema de acción:</strong> {VALORES_INTEGRIDAD[selectedValor].lema}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Simulador de Dilemas Éticos del Aprendiz */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
              02. Simulador Interactivo de Casos
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Dilemas Morales en la Vida del Aprendiz
            </h3>
          </div>
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Caso {activeDilemmaIdx + 1} de {DILEMAS_ETICOS.length}
          </div>
        </div>

        {/* Current Dilemma Situation */}
        <div className="p-5 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/50 rounded-xl space-y-2">
          <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            <span>Situación Real en el Centro de Formación</span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            {currentDilemma.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            {currentDilemma.situation}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            ¿Cómo actuarías tú como aprendiz íntegro del SENA?
          </div>

          {currentDilemma.options.map((opt, optIdx) => {
            const isSelected = selectedOptionIdx === optIdx;
            return (
              <button
                key={opt.text}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm ${
                  isSelected
                    ? opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
                      : 'border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 ring-1 ring-rose-400'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <div className="space-y-2 flex-1">
                    <span>{opt.text}</span>

                    {/* Feedback displayed when selected */}
                    {isSelected && (
                      <div
                        className={`p-3 rounded-lg text-xs leading-relaxed font-normal mt-2 ${
                          opt.isCorrect
                            ? 'bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-rose-100/80 dark:bg-rose-900/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                        }`}
                      >
                        <strong>{opt.isCorrect ? '✓ Respuesta Correcta:' : '⚠ Reflexión:'}</strong>{' '}
                        {opt.feedback}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dilemma navigation */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handleNextDilemma}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Ver Siguiente Dilema</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Completion bar */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Revisión del Módulo 2
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Has explorado los 7 valores institucionales y la resolución ética de conflictos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCompleteModule}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 ${
              isCompleted
                ? 'bg-emerald-100 dark:bg-emerald-950/70 text-[#007832] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Módulo Completado ✓' : 'Marcar como Leído'}</span>
          </button>

          <button
            onClick={onNextModule}
            className="px-4 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>Ir al Módulo 3</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
