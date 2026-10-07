import React, { useState } from 'react';
import { GraduationCap, Briefcase, FileCode, Users, Building, Laptop, ChevronRight, Check } from 'lucide-react';

interface ModuleTrainingProps {
  onCompleteModule: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleTraining: React.FC<ModuleTrainingProps> = ({
  onCompleteModule,
  isCompleted,
  onNextModule,
}) => {
  const [selectedModality, setSelectedModality] = useState(0);

  const MODALIDADES_PRODUCTIVAS = [
    {
      id: 'contrato',
      titulo: 'Contrato de Aprendizaje',
      resumen: 'Vinculación empresarial especial de carácter formativo según la Ley 789 de 2002.',
      detalles:
        'Es la modalidad más tradicional. Una empresa patrocinadora te afilia a la ARL y EPS y te otorga un apoyo de sostenimiento mensual (entre el 75% y el 100% del Salario Mínimo Legal Vigente) mientras realizas tus prácticas en un ambiente laboral real.',
      requisitos: [
        'Registro en el Sistema de Gestión Virtual de Aprendices (SGVA)',
        'No haber tenido contrato de aprendizaje previo en el mismo nivel',
        'Cumplimiento de la jornada acordada con la empresa',
      ],
      icono: Briefcase,
    },
    {
      id: 'proyecto',
      titulo: 'Proyecto Productivo (Emprendimiento)',
      resumen: 'Formulación y puesta en marcha de una idea de negocio viable.',
      detalles:
        'Desarrollas tu propia empresa o prototipo innovador con asesoría del Centro de Desarrollo Empresarial (SBDC) y el Fondo Emprender del SENA. Ideal para aprendices con espíritu emprendedor que desean ser sus propios jefes.',
      requisitos: [
        'Plan de negocio estructurado y validado por el asesor SENA',
        'Registro en la plataforma Fondo Emprender o SENNOVA',
        'Evidencias de validación en el mercado o prototipado técnico',
      ],
      icono: Laptop,
    },
    {
      id: 'pasantia',
      titulo: 'Pasantía en Entidades',
      resumen: 'Práctica concertada en entidades del Estado, ONGs o fundaciones sin ánimo de lucro.',
      detalles:
        'Permite prestar apoyo técnico o tecnológico en organizaciones públicas o comunitarias, aportando soluciones a problemáticas sociales de las regiones.',
      requisitos: [
        'Convenio o acuerdo de pasantía formal firmado',
        'Plan de trabajo con actividades afines al programa',
        'Afiliación a ARL por parte de la entidad o el SENA',
      ],
      icono: Building,
    },
    {
      id: 'monitoria',
      titulo: 'Monitoría Institucional',
      resumen: 'Apoyo académico o técnico en laboratorios y centros del SENA.',
      detalles:
        'Los aprendices con excelente rendimiento académico son seleccionados mediante convocatoria para apoyar a instructores en ambientes de aprendizaje, recibiendo un estímulo económico institucional.',
      requisitos: [
        'Promedio académico sobresaliente en etapa lectiva',
        'Postulación y selección en la convocatoria de monitorías del Centro',
        'Cumplimiento de horas asignadas en los talleres del SENA',
      ],
      icono: Users,
    },
    {
      id: 'laboral',
      titulo: 'Vínculo Laboral o Contractual Previo',
      resumen: 'Homologación de tu empleo actual si desempeñas tareas afines al programa.',
      detalles:
        'Si ya trabajas en una empresa y tus funciones diarias corresponden directamente a las competencias laborales de tu programa de formación, puedes solicitar la convalidación de tu etapa productiva.',
      requisitos: [
        'Certificación laboral detallada emitida por la empresa',
        'Funciones 100% afines a las competencias del programa',
        'Aprobación y visita de seguimiento del instructor asignado',
      ],
      icono: FileCode,
    },
    {
      id: 'familiar',
      titulo: 'Unidad Productiva Familiar',
      resumen: 'Aplicación de conocimientos para fortalecer el negocio de tu familia.',
      detalles:
        'El aprendiz aplica sus competencias técnicas y de gestión para tecnificar, modernizar y hacer crecer la microempresa, taller, finca o negocio familiar.',
      requisitos: [
        'Evidencia de la existencia y actividad del negocio familiar',
        'Diagnóstico inicial y plan de mejoramiento implementado',
        'Seguimiento periódico de resultados por el instructor',
      ],
      icono: GraduationCap,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
          <span>Módulo 3</span>
          <span aria-hidden="true">·</span>
          <span>Pedagogía & Trayectoria</span>
          <span aria-hidden="true">·</span>
          <span>Tiempo estimado: 7 min</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Formación Profesional Integral (FPI) y Etapas
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          El modelo educativo del SENA no es tradicional: aprendes haciendo mediante proyectos reales
          y te integras al sector productivo a través de dos etapas indispensables.
        </p>
      </div>

      {/* Chapter 1: Las Dos Etapas de la FPI */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
              01. Arquitectura Formativa
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Etapa Lectiva y Etapa Productiva
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Aprender Haciendo</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Etapa Lectiva */}
          <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">Fase 1</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Adquisición de Competencias</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Etapa Lectiva</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Desarrollas conocimientos, habilidades técnicas y competencias blandas en ambientes
              de aprendizaje físicos y en la plataforma virtual <strong>Zajuna LMS</strong>.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 pt-2">
              <li className="flex items-start gap-2">
                <span className="text-[#39A900] font-bold">✓</span>
                <span><strong>Guías de Aprendizaje:</strong> Hoja de ruta para cada resultado formativo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39A900] font-bold">✓</span>
                <span><strong>Proyecto Formativo:</strong> Resuelves un problema real durante todo el curso.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39A900] font-bold">✓</span>
                <span><strong>Portafolio del Aprendiz:</strong> Repositorio ordenado de evidencias aprobadas.</span>
              </li>
            </ul>
          </div>

          {/* Etapa Productiva */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Fase 2</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Práctica en el Mundo Real</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Etapa Productiva</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Aplicas lo aprendido directamente en una empresa, proyecto productivo o entidad.
              Es el requisito indispensable para recibir tu título técnico o tecnológico oficial.
            </p>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 pt-2">
              <li className="flex items-start gap-2">
                <span className="text-[#007832] dark:text-emerald-400 font-bold">✓</span>
                <span><strong>Duración:</strong> Generalmente 6 meses de inmersión práctica continua.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007832] dark:text-emerald-400 font-bold">✓</span>
                <span><strong>Bitácoras de Seguimiento:</strong> Reportes quincenales de avance concertado.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#007832] dark:text-emerald-400 font-bold">✓</span>
                <span><strong>Instructor de Seguimiento:</strong> Visitas periódicas y evaluación del desempeño.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Real Workshop Photo Callout */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mt-2">
          <div className="aspect-[21/9] bg-slate-900">
            <img
              src="/src/assets/images/sena_apprentices_workshop_1791319408152.jpg"
              alt="Aprendices SENA trabajando en equipo en talleres tecnificados"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="text-slate-600 dark:text-slate-300">
              Ambientes de Aprendizaje dotados con tecnología de vanguardia para la formación integral.
            </span>
            <span className="font-semibold text-[#007832] dark:text-emerald-400">9 de cada 10 egresados del SENA consiguen empleo formal</span>
          </div>
        </div>
      </section>

      {/* Chapter 2: Las 6 Modalidades de Etapa Productiva */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
              02. Tu Opción de Práctica
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Las 6 Modalidades de Etapa Productiva
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Elige la que mejor se adapte a ti</span>
        </div>

        {/* Modality Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {MODALIDADES_PRODUCTIVAS.map((m, idx) => {
            const isSelected = selectedModality === idx;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedModality(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#39A900] bg-emerald-50/90 dark:bg-emerald-950/60 ring-1 ring-[#39A900]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{m.titulo}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{m.resumen}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Modality Deep-Dive */}
        {(() => {
          const activeMod = MODALIDADES_PRODUCTIVAS[selectedModality];
          const IconComponent = activeMod.icono;
          return (
            <div className="p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#007832] dark:text-emerald-400 shadow-xs">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{activeMod.titulo}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{activeMod.resumen}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                {activeMod.detalles}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Requisitos Clave y Procedimiento:
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  {activeMod.requisitos.map((req) => (
                    <li key={req} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007832] dark:bg-emerald-400" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Completion Bar */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Revisión del Módulo 3
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Has conocido la diferencia entre etapa lectiva y las 6 modalidades de práctica.
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
            <span>Ir al Módulo 4</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
