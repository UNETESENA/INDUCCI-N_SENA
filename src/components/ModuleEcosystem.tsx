import React, { useState } from 'react';
import { Laptop, Briefcase, Lightbulb, Heart, BookOpen, ChevronRight, Check } from 'lucide-react';

interface ModuleEcosystemProps {
  onCompleteModule: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleEcosystem: React.FC<ModuleEcosystemProps> = ({
  onCompleteModule,
  isCompleted,
  onNextModule,
}) => {
  const [activeSection, setActiveSection] = useState<'zajuna' | 'ape' | 'fondo' | 'bienestar'>('zajuna');

  return (
    <div className="space-y-10">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
          <span>Módulo 5</span>
          <span aria-hidden="true">·</span>
          <span>Herramientas & Bienestar</span>
          <span aria-hidden="true">·</span>
          <span>Tiempo estimado: 6 min</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ecosistema Digital y Servicios de Apoyo al Aprendiz
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Tu experiencia en el SENA está respaldada por plataformas tecnológicas de punta,
          servicios de empleabilidad, capital semilla de emprendimiento y el programa integral de Bienestar.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveSection('zajuna')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeSection === 'zajuna'
              ? 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 ring-1 ring-[#39A900]'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <Laptop className="w-5 h-5 text-[#007832] dark:text-emerald-400 mb-2" />
          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Zajuna LMS</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Campus Virtual</div>
        </button>

        <button
          onClick={() => setActiveSection('ape')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeSection === 'ape'
              ? 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 ring-1 ring-[#39A900]'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <Briefcase className="w-5 h-5 text-[#007832] dark:text-emerald-400 mb-2" />
          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Agencia de Empleo</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Intermediación APE</div>
        </button>

        <button
          onClick={() => setActiveSection('fondo')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeSection === 'fondo'
              ? 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 ring-1 ring-[#39A900]'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <Lightbulb className="w-5 h-5 text-[#007832] dark:text-emerald-400 mb-2" />
          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Fondo Emprender</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Capital Semilla & SENNOVA</div>
        </button>

        <button
          onClick={() => setActiveSection('bienestar')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeSection === 'bienestar'
              ? 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 ring-1 ring-[#39A900]'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <Heart className="w-5 h-5 text-[#007832] dark:text-emerald-400 mb-2" />
          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Bienestar al Aprendiz</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">Salud, Deportes y Apoyos</div>
        </button>
      </div>

      {/* Selected Section Showcase */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors">
        {activeSection === 'zajuna' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
                  Plataforma Oficial LMS
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Zajuna: Tu Entorno Virtual de Aprendizaje
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">zajuna.sena.edu.co</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Zajuna</strong> es la plataforma LMS de última generación adoptada por el SENA.
              Su nombre proviene de lenguas indígenas colombianas y simboliza el encuentro pedagógico y la sabiduría.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Entrega de Evidencias</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Carga documentos, proyectos y tareas en los buzones de cada resultado de aprendizaje con sellado de fecha y hora.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Foros y Sesiones en Línea</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Interactúa con tus instructores técnicos y compañeros en foros temáticos, de dudas o sesiones síncronas.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Biblioteca Digital SENA</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Acceso gratuito a más de 2 millones de libros digitales, bases de datos científicas internacionales y revistas indexadas.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'ape' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
                  Empleabilidad Nacional
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Agencia Pública de Empleo (APE)
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">ape.sena.edu.co</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              La <strong>Agencia Pública de Empleo del SENA</strong> es el primer servicio público y gratuito
              de intermediación laboral en Colombia, autorizado por el Ministerio del Trabajo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Vacantes Verificadas</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Conexión directa con empresas formales sin intermediarios ni cobros de comisión.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Orientación Ocupacional</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Talleres sobre cómo elaborar una hoja de vida de alto impacto y simulaciones de entrevistas laborales.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Convocatorias Internacionales</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Oportunidades de empleo técnico en países con convenios activos (Canadá, España, Alemania, etc.).
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'fondo' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
                  Emprendimiento & Ciencia
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Fondo Emprender y Ecosistema SENNOVA
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Capital Semilla</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              El SENA financia y asesora a los aprendices que tienen vocación creadora para generar empleo formal y soluciones tecnológicas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 rounded-xl space-y-2">
                <div className="text-xs font-bold text-[#007832] dark:text-emerald-400">Fondo Emprender</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Fondo de capital semilla más grande de América Latina. Otorga recursos no reembolsables a planes de negocio viables estructurados por aprendices o egresados. Si cumples los hitos de empleo convenidos, la deuda se condona al 100%.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                <div className="text-xs font-bold text-slate-800 dark:text-white">SENNOVA (Innovación & Investigación)</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Red de Tecnoparques, Tecnoacademias y Semilleros de Investigación aplicada. Permite a los aprendices crear patentes, prototipos de robótica, biotecnología y software de impacto regional.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'bienestar' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
                  Desarrollo Humano
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Bienestar al Aprendiz: Mucho Más que Clases
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">9 Dimensiones de Apoyo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <strong className="text-slate-900 dark:text-white block">Salud Integral</strong>
                <p className="text-slate-600 dark:text-slate-300">Primeros auxilios, campañas de prevención y orientación psicológica.</p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <strong className="text-slate-900 dark:text-white block">Deporte y Recreación</strong>
                <p className="text-slate-600 dark:text-slate-300">Juegos Zonales y Nacionales SENA, torneos deportivos intercentros.</p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <strong className="text-slate-900 dark:text-white block">Arte y Cultura</strong>
                <p className="text-slate-600 dark:text-slate-300">Grupos de danza, música, teatro y expresiones del folclor colombiano.</p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <strong className="text-slate-900 dark:text-white block">Apoyos de Sostenimiento</strong>
                <p className="text-slate-600 dark:text-slate-300">Subsidios FIC y apoyos económicos para aprendices en condición de vulnerabilidad.</p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <strong className="text-slate-900 dark:text-white block">Alimentación y Transporte</strong>
                <p className="text-slate-600 dark:text-slate-300">Bonos y convenios de apoyo de transporte público y refrigerios según disponibilidad del Centro.</p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <strong className="text-slate-900 dark:text-white block">Liderazgo y Vocería</strong>
                <p className="text-slate-600 dark:text-slate-300">Encuentros nacionales de líderes y voceros elegidos democráticamente.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Completion bar */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Revisión del Módulo 5
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Has descubierto el campus digital Zajuna, APE, Fondo Emprender y los beneficios de Bienestar.
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
            <span>Ir a la Evaluación Final</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
