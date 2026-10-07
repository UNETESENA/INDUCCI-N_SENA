import React, { useState } from 'react';
import { CASOS_DISCIPLINARIOS } from '../data/senaData';
import {
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Check,
  ChevronRight,
  Gavel,
  UserCheck,
  FileText,
  HeartHandshake,
  Sparkles,
  Lock,
  Award
} from 'lucide-react';

interface ModuleRegulationsProps {
  onCompleteModule: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleRegulations: React.FC<ModuleRegulationsProps> = ({
  onCompleteModule,
  isCompleted,
  onNextModule,
}) => {
  const [activeTab, setActiveTab] = useState<'marco' | 'derechos' | 'deberes' | 'prohibiciones' | 'faltas' | 'simulador'>('marco');
  const [activeRightsCategory, setActiveRightsCategory] = useState<'academicos' | 'dignidad' | 'bienestar' | 'participacion'>('academicos');
  const [caseIdx, setCaseIdx] = useState(0);
  const [selectedCaseOption, setSelectedCaseOption] = useState<number | null>(null);

  const currentCase = CASOS_DISCIPLINARIOS[caseIdx];

  const handleNextCase = () => {
    setSelectedCaseOption(null);
    if (caseIdx < CASOS_DISCIPLINARIOS.length - 1) {
      setCaseIdx(caseIdx + 1);
    } else {
      setCaseIdx(0);
    }
  };

  // Categorized 24 Rights from Acuerdo 0009 de 2024 (Artículo 5)
  const DERECHOS_ACUERDO_0009 = {
    academicos: [
      {
        num: 1,
        title: 'Formación Integral y Pertinente',
        desc: 'Recibir formación profesional integral gratuita, con calidad técnica, humana y pedagógica acorde al diseño curricular.',
      },
      {
        num: 2,
        title: 'Inducción Institucional Oportuna',
        desc: 'Participar activamente en la inducción presencial y virtual que permita apropiar el valor y principios del SENA.',
      },
      {
        num: 3,
        title: 'Acceso a Ambientes y Recursos TIC',
        desc: 'Utilizar laboratorios, talleres, maquinaria especializada, bibliotecas físicas/digitales y el campus virtual Zajuna.',
      },
      {
        num: 4,
        title: 'Conocimiento Previo de la Evaluación',
        desc: 'Conocer oportunamente el plan de trabajo formativo, las guías de aprendizaje y los criterios e instrumentos de evaluación.',
      },
      {
        num: 5,
        title: 'Retroalimentación y Revisión de Evidencias',
        desc: 'Ser evaluado objetivamente y solicitar revisión justificada de resultados de aprendizaje dentro de los tiempos reglamentarios.',
      },
      {
        num: 6,
        title: 'Concertación de Etapa Productiva',
        desc: 'Recibir asesoría y acompañamiento oportuno para concertar y legalizar cualquiera de las 6 modalidades válidas de etapa productiva.',
      },
    ],
    dignidad: [
      {
        num: 7,
        title: 'Trato Digno y No Discriminación',
        desc: 'Ser respetado en su dignidad humana, sin discriminación alguna por razones de etnia, género, religión, ideología o condición social.',
      },
      {
        num: 8,
        title: 'Protección contra el Acoso y Violencia',
        desc: 'Ambientes de aprendizaje 100% seguros y libres de acoso sexual, hostigamiento laboral o cualquier forma de violencia basada en género.',
      },
      {
        num: 9,
        title: 'Debido Proceso Constitucional',
        desc: 'Garantía irrestricta de presunción de inocencia, derecho a ser escuchado, presentar descargos, pruebas y recursos legales.',
      },
      {
        num: 10,
        title: 'Expresión Libre y Respetuosa',
        desc: 'Expresar libremente pensamientos, ideas y opiniones de forma pacífica, constructiva y respetuosa de los derechos de los demás.',
      },
      {
        num: 11,
        title: 'Carné Institucional Oficial',
        desc: 'Portar el carné oficial del SENA que acredita su condición de aprendiz y permite el libre ingreso a las sedes y servicios nacionales.',
      },
      {
        num: 12,
        title: 'Seguridad y Salud en el Trabajo',
        desc: 'Ambientes formativos que cuenten con protocolos de bioseguridad, primeros auxilios y elementos de protección necesarios.',
      },
    ],
    bienestar: [
      {
        num: 13,
        title: 'Servicios de Bienestar al Aprendiz',
        desc: 'Beneficiarse de las 9 dimensiones del plan de Bienestar: salud, deporte, arte, cultura, liderazgo y acompañamiento psicosocial.',
      },
      {
        num: 14,
        title: 'Apoyos de Sostenimiento y Monitorías',
        desc: 'Postularse en convocatorias públicas para apoyos regulares, Fondo FIC y monitorías remuneradas en laboratorios del Centro.',
      },
      {
        num: 15,
        title: 'Reconocimiento y Estímulos al Mérito',
        desc: 'Ser exaltado por excelencia académica, proyectos de innovación en SENNOVA, eventos WorldSkills o liderazgo social.',
      },
      {
        num: 16,
        title: 'Afiliación y Cobertura de Riesgos (ARL)',
        desc: 'Estar afiliado a riesgos laborales de acuerdo con la normatividad nacional durante sus prácticas formativas en talleres o empresas.',
      },
      {
        num: 17,
        title: 'Orientación Ocupacional y Empleo (APE)',
        desc: 'Acceso prioritario a talleres de hoja de vida, intermediación laboral en la Agencia Pública de Empleo y Fondo Emprender.',
      },
      {
        num: 18,
        title: 'Certificación Oportuna y Gratuita',
        desc: 'Obtener oportunamente y sin costo el título técnico, tecnológico o certificación al culminar con éxito la etapa lectiva y productiva.',
      },
    ],
    participacion: [
      {
        num: 19,
        title: 'Representación Democrática en el Centro',
        desc: 'Elegir y ser elegido democráticamente como vocero de ficha o representante general de los aprendices ante el Consejo de Centro.',
      },
      {
        num: 20,
        title: 'Acompañamiento en Procesos Disciplinarios',
        desc: 'Contar con la presencia y acompañamiento de su vocero o representante estudiantil en las sesiones del Comité de Evaluación.',
      },
      {
        num: 21,
        title: 'Asociación y Redes de Aprendices',
        desc: 'Conformar grupos de estudio, semilleros de investigación SENNOVA, clubes de robótica o colectivos culturales autorizados.',
      },
      {
        num: 22,
        title: 'Canales de Quejas y Peticiones (PQRSD)',
        desc: 'Interponer peticiones respetuosas a las autoridades del SENA y recibir respuesta motivada dentro de los términos de ley.',
      },
      {
        num: 23,
        title: 'Traslados, Aplazamientos y Reingresos',
        desc: 'Solicitar novedades de centro o programa ante fuerza mayor justificada, garantizando la continuidad de su ruta formativa.',
      },
      {
        num: 24,
        title: 'Acceso a la Información Pública',
        desc: 'Consultar libremente circulares, resoluciones, acuerdos y normatividad vigente expedida por el Consejo Directivo Nacional.',
      },
    ],
  };

  return (
    <div className="space-y-10">
      {/* Module Title & Context Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
          <span>Módulo 4</span>
          <span aria-hidden="true">·</span>
          <span>Marco Normativo Actualizado</span>
          <span aria-hidden="true">·</span>
          <span>Acuerdo 0009 de 2024</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Nuevo Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024)
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Estatuto oficial expedido por el Consejo Directivo Nacional que rige la vida formativa, académica y convivencial
          en todas las sedes del país. <strong className="text-emerald-600 dark:text-emerald-400">Deroga expresamente los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.</strong>
        </p>
      </div>

      {/* Main interactive tabs */}
      <div className="bg-white dark:bg-[#181D2C] rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-6 transition-colors shadow-md">
        
        {/* Navigation bar with tab switchers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
              Vigencia Plena 2024 - 2026
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Acuerdo 0009 de 2024: Deberes, Derechos y Régimen Disciplinario
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('marco')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'marco'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Marco Legal
            </button>
            <button
              onClick={() => setActiveTab('derechos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'derechos'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              24 Derechos
            </button>
            <button
              onClick={() => setActiveTab('deberes')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'deberes'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Deberes (Art. 8)
            </button>
            <button
              onClick={() => setActiveTab('prohibiciones')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'prohibiciones'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Prohibiciones (Art. 9)
            </button>
            <button
              onClick={() => setActiveTab('faltas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'faltas'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Faltas & Sanciones
            </button>
            <button
              onClick={() => setActiveTab('simulador')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'simulador'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Simulador del Comité
            </button>
          </div>
        </div>

        {/* Tab 0: Marco Legal & Derogatorias */}
        {activeTab === 'marco' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Highlighted Derogation Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/30 text-white space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Normatividad Vigente del Aprendiz SENA</span>
              </div>
              <h4 className="text-lg font-bold text-white">
                Acuerdo Número 0009 de 2024 (Reglamento del Aprendiz)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Este nuevo marco actualiza los estándares pedagógicos, de convivencia pacífica, inclusión y debido proceso en la entidad.
                Sustituye y deroga de manera expresa en el ordenamiento jurídico institucional:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-rose-300 font-medium">
                  ✗ Acuerdo 07 de 2012
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-rose-300 font-medium">
                  ✗ Acuerdo 02 de 2014
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-rose-300 font-medium">
                  ✗ Acuerdo 06 de 2023
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-rose-300 font-medium">
                  ✗ Acuerdo 02 de 2024
                </div>
              </div>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#39A900]/15 text-[#007832] dark:text-emerald-400 flex items-center justify-center font-bold">
                  24
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Derechos Fundamentales</h5>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ampliación del catálogo de garantías: formación integral, ambientes seguros, no discriminación, acceso a tecnología y debido proceso.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center font-bold">
                  ⚖
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Debido Proceso Estricto</h5>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ninguna sanción se aplica de plano. Se garantiza presunción de inocencia, descargos orales o escritos y recurso de reposición ante el Subdirector.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center font-bold">
                  🛡
                </div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Prevención de Violencias</h5>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Inclusión formal y sanción rigurosa de conductas asociadas al acoso sexual, discriminación de género y ciberacoso en plataformas del SENA.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Los 24 Derechos del Aprendiz (Artículo 5) */}
        {activeTab === 'derechos' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <strong>Artículo 5: Catálogo de Derechos del Aprendiz SENA.</strong>
                <span className="block mt-0.5 text-slate-600 dark:text-slate-300">
                  El Acuerdo 0009 de 2024 formaliza y amplía a 24 los derechos inalienables para garantizar la excelencia formativa y la dignidad humana.
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#39A900] text-white font-bold text-xs shrink-0 self-start sm:self-auto">
                24 Derechos
              </span>
            </div>

            {/* Category Sub-tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveRightsCategory('academicos')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeRightsCategory === 'academicos'
                    ? 'bg-[#39A900] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                1. Académicos & TIC (1 al 6)
              </button>
              <button
                onClick={() => setActiveRightsCategory('dignidad')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeRightsCategory === 'dignidad'
                    ? 'bg-[#39A900] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                2. Dignidad, Convivencia & Debido Proceso (7 al 12)
              </button>
              <button
                onClick={() => setActiveRightsCategory('bienestar')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeRightsCategory === 'bienestar'
                    ? 'bg-[#39A900] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                3. Bienestar, Apoyos & Certificación (13 al 18)
              </button>
              <button
                onClick={() => setActiveRightsCategory('participacion')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeRightsCategory === 'participacion'
                    ? 'bg-[#39A900] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                4. Participación & Ciudadanía (19 al 24)
              </button>
            </div>

            {/* Rights Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DERECHOS_ACUERDO_0009[activeRightsCategory].map((d) => (
                <div
                  key={d.num}
                  className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 hover:border-[#39A900] dark:hover:border-emerald-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#39A900]/20 text-[#007832] dark:text-emerald-400 text-xs font-bold flex items-center justify-center">
                      #{d.num}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Art. 5</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {d.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Deberes (Artículo 8) */}
        {activeTab === 'deberes' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Artículo 8: Deberes del Aprendiz SENA.</strong> Son compromisos de corresponsabilidad ética, formativa y ciudadana que asume todo aprendiz al firmar su matrícula.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-850 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#007832] dark:text-emerald-400" />
                  <span>Porte Obligatorio del Carné Institucional</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Portar el carné en lugar visible durante toda la permanencia en las instalaciones físicas y en los ambientes de formación externa autorizados.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-850 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#007832] dark:text-emerald-400" />
                  <span>Puntualidad y Asistencia Continua</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Asistir a las sesiones programadas. Si se presenta inasistencia, aportar soporte médico o de fuerza mayor dentro de los siguientes 3 días hábiles.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-850 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#007832] dark:text-emerald-400" />
                  <span>Integridad Académica y No Plagio</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Elaborar evidencias personales y colaborativas con honestidad intelectual, citando fuentes conforme a normas de rigor y sin recurrir a suplantaciones.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-850 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#007832] dark:text-emerald-400" />
                  <span>Cuidado de Bienes e Infraestructura</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Hacer uso responsable de herramientas, maquinaria, equipos de cómputo y plataformas digitales asignadas para el aprendizaje.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-850 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#007832] dark:text-emerald-400" />
                  <span>Seguridad y Salud en el Trabajo (SST)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Utilizar la dotación y elementos de protección personal (EPP) obligatorios y cumplir rigurosamente los protocolos en talleres y laboratorios.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-850 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#007832] dark:text-emerald-400" />
                  <span>Respeto por la Convivencia y Diversidad</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Tratar con consideración y empatía a instructores, compañeros y personal de servicios, respetando la pluralidad y la dignidad humana.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Prohibiciones (Artículo 9) */}
        {activeTab === 'prohibiciones' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs text-rose-950 dark:text-rose-200 leading-relaxed">
              <strong>Artículo 9: Prohibiciones del Aprendiz SENA.</strong> Conductas expresamente vedadas por el Acuerdo 0009 de 2024 para salvaguardar la integridad de la comunidad educativa y el patrimonio institucional.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-2">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Acoso Sexual o Violencia de Género</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Cualquier acto de hostigamiento, acoso sexual físico, verbal o digital, o violencia motivada en razones de género u orientación sexual.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-2">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Sustancias Psicoactivas y Alcohol</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ingresar, comercializar, portar o consumir bebidas embriagantes o sustancias psicoactivas dentro de los centros o en estado de alteración.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-2">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Porte de Armas o Explosivos</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Portar armas de fuego, cortopunzantes o elementos contundentes y artefactos peligrosos que pongan en riesgo la vida de la comunidad.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-2">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Suplantación y Fraude Informático</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Suplantar identidad en Zajuna o SofiaPlus, falsificar certificados, compartir credenciales personales o alterar bases de datos oficiales.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-2">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Hurto o Daño Doloso a Bienes</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Sustraer sin autorización herramientas, partes electrónicas, insumos del SENA o de compañeros, o destruir deliberadamente equipos.
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-2">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Prácticas Corruptas o Soborno</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ofrecer dinero, dádivas o favores indebidos a instructores o coordinadores a cambio de aprobación de resultados de aprendizaje.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Faltas, Régimen Sancionatorio & Debido Proceso */}
        {activeTab === 'faltas' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                  Faltas Leves
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Incumplimientos esporádicos o descuidos menores que no vulneran gravemente la formación ni causan daño irreparable.
                </p>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                  <strong>Medida Formativa:</strong> Llamado de atención por escrito con compromiso pedagógico suscrito por el aprendiz.
                </div>
              </div>

              <div className="p-5 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl space-y-2">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                  Faltas Graves
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Conductas que alteran gravemente la convivencia, reiteración injustificada de faltas leves, plagio de evidencias o daño a bienes.
                </p>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800/60 text-xs text-slate-700 dark:text-slate-300">
                  <strong>Sanción:</strong> Condicionamiento de matrícula con plan de mejoramiento estricto supervisado por la coordinación.
                </div>
              </div>

              <div className="p-5 bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 rounded-xl space-y-2">
                <div className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                  Faltas Gravísimas
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Acoso sexual, violencia física, tráfico de estupefacientes, porte de armas, fraude en Zajuna o sabotaje a la infraestructura.
                </p>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800/60 text-xs text-slate-700 dark:text-slate-300">
                  <strong>Sanción:</strong> Cancelación definitiva de matrícula e inhabilidad temporal para ingresar al SENA (de 1 a 3 años).
                </div>
              </div>
            </div>

            {/* Debido Proceso Box */}
            <div className="p-5 bg-slate-100/70 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-3">
              <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
                <span>Ruta del Debido Proceso y Comité de Evaluación y Seguimiento</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong>1. Reporte & Citación:</strong> Notificación escrita con claridad de hechos y normas presuntamente vulneradas.
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong>2. Sesión del Comité:</strong> El aprendiz presenta descargos y testimonios acompañado de su vocero de ficha.
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong>3. Recomendación:</strong> El Comité emite acta motivada y recomienda la medida justa al Subdirector de Centro.
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong>4. Resolución & Reposición:</strong> Se expide acto administrativo con derecho al Recurso de Reposición.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Simulador del Comité de Evaluación */}
        {activeTab === 'simulador' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-5 bg-slate-900 text-white rounded-2xl flex items-center justify-between border border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Gavel className="w-4 h-4" />
                  Simulador de Casos · Acuerdo 0009 de 2024
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  Caso {caseIdx + 1}: {currentCase.title}
                </h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {caseIdx + 1} de {CASOS_DISCIPLINARIOS.length}
              </span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 text-xs">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Contexto:</strong> {currentCase.context}
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Incidente:</strong> {currentCase.incident}
              </p>
              <p className="text-slate-900 dark:text-white font-bold pt-1">
                {currentCase.question}
              </p>
            </div>

            {/* Case Options */}
            <div className="space-y-3">
              {currentCase.options.map((opt, optIdx) => {
                const isSelected = selectedCaseOption === optIdx;
                return (
                  <button
                    key={opt.title}
                    onClick={() => setSelectedCaseOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm ${
                      isSelected
                        ? opt.isOptimal
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
                          : 'border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 ring-1 ring-rose-400'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <div className="space-y-1.5 flex-1">
                        <div className="font-bold text-slate-900 dark:text-white">{opt.title}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Medida: {opt.measure} · Tipificación: {opt.classification}
                        </div>

                        {isSelected && (
                          <div
                            className={`p-3 rounded-lg text-xs font-normal mt-2 leading-relaxed ${
                              opt.isOptimal
                                ? 'bg-emerald-100/90 dark:bg-emerald-900/40 text-emerald-950 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-rose-100/90 dark:bg-rose-900/40 text-rose-950 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                            }`}
                          >
                            <strong>{opt.isOptimal ? '✓ Decisión Conforme a Norma:' : '⚠ Inconsistencia con el Reglamento:'}</strong>{' '}
                            {opt.feedback}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                onClick={handleNextCase}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Siguiente Caso del Comité</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Completion bar */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Revisión del Módulo 4
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Has revisado los 24 derechos, deberes, prohibiciones y el debido proceso del nuevo Acuerdo 0009 de 2024.
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
            <span>Ir al Módulo 5</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
