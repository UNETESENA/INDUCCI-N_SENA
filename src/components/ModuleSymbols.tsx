import React, { useState, useEffect } from 'react';
import { HIMNO_LETRA } from '../data/senaData';
import { anthemSynthesizer } from '../utils/senaAnthemAudio';
import { Play, Square, Check, Sparkles, Volume2, Shield, Compass, BookOpen, ChevronRight, Heart } from 'lucide-react';

interface ModuleSymbolsProps {
  onCompleteModule: () => void;
  isCompleted: boolean;
  onNextModule: () => void;
}

export const ModuleSymbols: React.FC<ModuleSymbolsProps> = ({
  onCompleteModule,
  isCompleted,
  onNextModule,
}) => {
  const [activeSymbolTab, setActiveSymbolTab] = useState<'escudo' | 'bandera' | 'logosimbolo' | 'himno'>('escudo');
  const [activeHotspot, setActiveHotspot] = useState<'primario' | 'secundario' | 'terciario'>('secundario');
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [currentAnthemLine, setCurrentAnthemLine] = useState<number>(-1);

  useEffect(() => {
    return () => {
      anthemSynthesizer.stop();
    };
  }, []);

  const handleToggleAnthem = () => {
    if (isPlayingAnthem) {
      anthemSynthesizer.stop();
      setIsPlayingAnthem(false);
      setCurrentAnthemLine(-1);
    } else {
      setIsPlayingAnthem(true);
      anthemSynthesizer.play(
        (step) => {
          setCurrentAnthemLine(step);
        },
        () => {
          setIsPlayingAnthem(false);
          setCurrentAnthemLine(-1);
        }
      );
    }
  };

  return (
    <div className="space-y-10">
      {/* Module Title & Context Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
          <span>Módulo 1</span>
          <span aria-hidden="true">·</span>
          <span>Identidad Institucional</span>
          <span aria-hidden="true">·</span>
          <span>Tiempo estimado: 8 min</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Historia, Símbolos Sagrados y Sentido de Pertenencia
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          El Servicio Nacional de Aprendizaje (SENA) nació para transformar la vida productiva de Colombia.
          Explora sus orígenes en 1957 y el profundo significado de su escudo, bandera, logosímbolo e himno oficial.
        </p>
      </div>

      {/* Chapter 1: Fundación y Memoria Histórica */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
              01. Memoria Histórica
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              El Sueño de Rodolfo Martínez Tono (1957)
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Decreto Ley 118 de 1957</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Origen visionario</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Durante una tesis de grado universitaria, el cartagenero <strong>Rodolfo Martínez Tono</strong> concibió
              una entidad estatal que capacitara técnica y profesionalmente a los trabajadores de la industria y el campo.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Alianza Tripartita</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              El 21 de junio de 1957 se firmó su creación con el respaldo conjunto del <strong>Gobierno Nacional</strong>,
              los <strong>Gremios Económicos (ANDI)</strong> y la <strong>Organización Internacional del Trabajo (OIT)</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Misión Permanente</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Brindar <strong>formación profesional integral gratuita</strong> a millones de colombianos para impulsar
              el desarrollo social, tecnológico y productivo del país con equidad.
            </p>
          </div>
        </div>

        {/* Mission & Vision Callout Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 space-y-1">
            <div className="text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">Misión Institucional</div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              El SENA está encargado de cumplir la función del Estado de invertir en el desarrollo social y técnico
              de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral para la incorporación
              de las personas en actividades productivas.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Visión SENA</div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Consolidarse como una entidad de clase mundial en formación profesional integral, innovación y emprendimiento,
              liderando la transformación digital y productiva del país con altos estándares de calidad internacional.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 2: Símbolos Institucionales Interactivos */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 tracking-wider uppercase">
              02. Los Símbolos Sagrados
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Escudo, Bandera, Logosímbolo e Himno
            </h3>
          </div>

          {/* Interactive tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
            <button
              onClick={() => setActiveSymbolTab('escudo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeSymbolTab === 'escudo'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Escudo
            </button>
            <button
              onClick={() => setActiveSymbolTab('bandera')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeSymbolTab === 'bandera'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bandera
            </button>
            <button
              onClick={() => setActiveSymbolTab('logosimbolo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeSymbolTab === 'logosimbolo'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Logosímbolo
            </button>
            <button
              onClick={() => setActiveSymbolTab('himno')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeSymbolTab === 'himno'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Himno Oficial
            </button>
          </div>
        </div>

        {/* Tab 1: Escudo Interactivo */}
        {activeSymbolTab === 'escudo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
            {/* Visual Heraldry Display */}
            <div className="lg:col-span-5 flex flex-col items-center text-center p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="relative w-48 h-48 flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-700 mb-4">
                <img
                  src="/src/assets/images/sena_symbols_crest_1791319399283.jpg"
                  alt="Escudo Institucional SENA con tres sectores productivos"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Escudo de la República y el Trabajo</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Refleja los tres grandes sectores de la economía nacional que dinamiza el SENA.
              </p>
            </div>

            {/* Interactive Hotspots & Sector Explanation */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Haz clic en cada sector económico para examinar su significado:
              </div>

              {/* Sector 1: Primario */}
              <button
                onClick={() => setActiveHotspot('primario')}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeHotspot === 'primario'
                    ? 'border-[#39A900] bg-emerald-50/80 dark:bg-emerald-950/40 ring-1 ring-[#39A900]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    Sector Primario y Extractivo (La Rama de Café)
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Agro & Campo</span>
                </div>
                {activeHotspot === 'primario' && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed animate-in fade-in duration-150">
                    Representado por las <strong>hojas y frutos del café</strong>, rinde tributo a la vocación
                    agrícola, pecuaria y campesina de Colombia. El SENA forma aprendices que tecnifican el agro
                    a través del programa CampeSENA y centros biotecnológicos.
                  </p>
                )}
              </button>

              {/* Sector 2: Secundario */}
              <button
                onClick={() => setActiveHotspot('secundario')}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeHotspot === 'secundario'
                    ? 'border-[#39A900] bg-emerald-50/80 dark:bg-emerald-950/40 ring-1 ring-[#39A900]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#007832]" />
                    Sector Secundario (El Piñón / Rueda Dentada)
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Industria & Manufactura</span>
                </div>
                {activeHotspot === 'secundario' && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed animate-in fade-in duration-150">
                    El <strong>piñón de engranaje</strong> simboliza la fuerza obrera, la ingeniería, la mecatrónica,
                    la construcción y la manufactura tecnificada. Es el motor que impulsa la transformación
                    de materias primas y la infraestructura nacional.
                  </p>
                )}
              </button>

              {/* Sector 3: Terciario */}
              <button
                onClick={() => setActiveHotspot('terciario')}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeHotspot === 'terciario'
                    ? 'border-[#39A900] bg-emerald-50/80 dark:bg-emerald-950/40 ring-1 ring-[#39A900]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    Sector Terciario (El Caduceo y la Antorcha)
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Comercio, Servicios & TIC</span>
                </div>
                {activeHotspot === 'terciario' && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed animate-in fade-in duration-150">
                    El <strong>caduceo asociado a las alas y la antorcha</strong> representa el comercio, la gestión
                    administrativa, el turismo, la salud y la era del software y las tecnologías digitales.
                  </p>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Bandera */}
        {activeSymbolTab === 'bandera' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
            <div className="p-8 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
              {/* Flag representation */}
              <div className="w-full max-w-sm h-48 bg-white border-2 border-slate-300 dark:border-slate-600 shadow-md rounded-md flex items-center justify-center p-4 relative">
                <div className="w-24 h-24 border border-slate-200 rounded-full flex items-center justify-center bg-white shadow-xs p-2">
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#007832] flex items-center justify-center text-white font-black text-xs">
                      SENA
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">
                  Proporción Oficial
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">La Bandera del SENA</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Diseñada sobre un paño <strong>blanco puro</strong> con el escudo institucional ubicado exactamente
                en el centro.
              </p>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white">El Color Blanco:</strong> Simboliza la paz, la tranquilidad,
                  la transparencia, la rectitud en el uso de los recursos públicos y la concordia nacional.
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white">Presencia Institucional:</strong> Se iza en todos los centros
                  de formación junto al pabellón nacional de Colombia en ceremonias cívicas y actos de grado.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Logosímbolo */}
        {activeSymbolTab === 'logosimbolo' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-200">
            <div className="p-8 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
              <div className="w-36 h-36 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center p-4 mb-3">
                <svg viewBox="0 0 100 100" className="w-28 h-28 text-[#39A900] dark:text-emerald-400" fill="currentColor">
                  <circle cx="50" cy="18" r="10" />
                  <path d="M50 34 C36 34 30 46 20 55 C17 58 20 62 24 60 C34 52 40 46 47 46 L47 88 C47 91 53 91 53 88 L53 46 C60 46 66 52 76 60 C80 62 83 58 80 55 C70 46 64 34 50 34 Z" />
                  <rect x="15" y="92" width="70" height="4" rx="2" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">El Aprendiz en Marcha hacia el Futuro</span>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">El Logosímbolo y el Proyecto de Vida</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Creado a comienzos de la década de 1990, representa gráficamente la <strong>figura humana</strong>
                erguida, con los brazos extendidos y en movimiento sobre un camino que proyecta su horizonte.
              </p>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-100 dark:border-emerald-800/60 text-slate-800 dark:text-slate-200">
                  <strong className="text-[#007832] dark:text-emerald-400">El Aprendiz como Protagonista:</strong> El centro de la educación
                  es la persona, su dignidad y su capacidad de transformar la realidad con sus manos y su mente.
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong className="text-slate-900 dark:text-white">El Sendero Inferior:</strong> Simboliza las oportunidades,
                  el progreso socioeconómico y el camino ascendente que recorre cada egresado.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Himno Oficial con Reproductor Neumórfico HUD inspirado en la imagen */}
        {activeSymbolTab === 'himno' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Audio Player Card (Inspired by Top-Left widget in image) */}
            <div className="p-6 sm:p-8 bg-[#181D2C] text-white rounded-3xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-6">
              {/* Header: Track & Icons */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span>MARCHA PATRIÓTICA INSTITUCIONAL</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Himno Oficial del SENA
                  </h3>
                  <p className="text-xs text-slate-400">
                    Letra: <strong>Luis Alfredo Sánchez</strong> · Música: <strong>Daniel Marlez</strong> (1957)
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-400 border border-white/5 transition-all"
                    title="Favorito institucional"
                  >
                    <Heart className="w-5 h-5 fill-rose-500/20 text-rose-500" />
                  </button>
                </div>
              </div>

              {/* Big Circular Orange Play Button + Equalizer bars */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
                <button
                  onClick={handleToggleAnthem}
                  aria-label={isPlayingAnthem ? 'Detener Himno' : 'Reproducir Himno'}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FF6600] to-[#FFA726] shadow-[0_0_35px_rgba(255,102,0,0.55)] flex items-center justify-center transition-all duration-300 hover:scale-108 active:scale-95 group"
                >
                  {isPlayingAnthem ? (
                    <Square className="w-7 h-7 text-slate-950 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-current ml-1 group-hover:scale-110 transition-transform" />
                  )}
                </button>

                {/* Animated Equalizer Waveform Bars */}
                <div className="flex items-end gap-1.5 h-12 px-4 py-2 bg-black/40 rounded-2xl border border-white/5">
                  <div className={`w-2 rounded-full bg-orange-400 ${isPlayingAnthem ? 'animate-eq-1' : 'h-2'}`} />
                  <div className={`w-2 rounded-full bg-amber-400 ${isPlayingAnthem ? 'animate-eq-2' : 'h-4'}`} />
                  <div className={`w-2 rounded-full bg-[#70D600] ${isPlayingAnthem ? 'animate-eq-3' : 'h-7'}`} />
                  <div className={`w-2 rounded-full bg-[#39A900] ${isPlayingAnthem ? 'animate-eq-4' : 'h-3'}`} />
                  <div className={`w-2 rounded-full bg-cyan-400 ${isPlayingAnthem ? 'animate-eq-5' : 'h-6'}`} />
                  <div className={`w-2 rounded-full bg-pink-400 ${isPlayingAnthem ? 'animate-eq-6' : 'h-2'}`} />
                  <div className={`w-2 rounded-full bg-orange-500 ${isPlayingAnthem ? 'animate-eq-2' : 'h-5'}`} />
                </div>
              </div>

              {/* Orange Scrubber Bar with Time Indicators */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-white font-semibold">
                    {isPlayingAnthem ? '00:24' : '00:00'}
                  </span>
                  <span className="text-orange-400 font-semibold">02:30</span>
                </div>
                <div className="relative w-full h-2.5 bg-slate-800 rounded-full overflow-visible">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF6600] to-[#FFA726] rounded-full shadow-[0_0_15px_rgba(255,102,0,0.6)] transition-all duration-300"
                    style={{ width: isPlayingAnthem ? '48%' : '15%' }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-orange-500 shadow-[0_0_12px_rgba(255,102,0,0.9)]"
                    style={{ left: isPlayingAnthem ? '48%' : '15%' }}
                  />
                </div>
              </div>

              {/* Media Control Strip */}
              <div className="flex items-center justify-center gap-8 text-orange-400 pt-2 font-mono text-sm">
                <button
                  onClick={handleToggleAnthem}
                  className="hover:text-white transition-colors"
                  title="Reiniciar estrofa"
                >
                  ⏮
                </button>
                <button
                  onClick={handleToggleAnthem}
                  className="hover:text-white transition-colors text-base"
                  title="Retroceder 5 segundos"
                >
                  ⏪
                </button>
                <button
                  onClick={handleToggleAnthem}
                  className="px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-white font-bold hover:bg-orange-500/30 transition-colors"
                >
                  {isPlayingAnthem ? 'Detener' : 'Reproducir'}
                </button>
                <button
                  onClick={handleToggleAnthem}
                  className="hover:text-white transition-colors text-base"
                  title="Avanzar 5 segundos"
                >
                  ⏩
                </button>
                <button
                  onClick={handleToggleAnthem}
                  className="hover:text-white transition-colors"
                  title="Siguiente estrofa"
                >
                  ⏭
                </button>
              </div>
            </div>

            {/* Lyrics Grid with highlighted active karaoke line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HIMNO_LETRA.map((estrofa, idx) => {
                const isCoro = estrofa.titulo === 'Coro';
                return (
                  <div
                    key={estrofa.titulo}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCoro
                        ? 'bg-gradient-to-b from-emerald-950/40 to-slate-900 border-emerald-500/40 shadow-[0_4px_20px_rgba(57,169,0,0.15)]'
                        : 'bg-[#181D2C] border-white/10'
                    }`}
                  >
                    <div
                      className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-between ${
                        isCoro ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      <span>{estrofa.titulo}</span>
                      {isCoro && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Oficial</span>}
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed font-serif">
                      {estrofa.lineas.map((linea, lineIdx) => {
                        const isLineActive = isPlayingAnthem && isCoro && currentAnthemLine === lineIdx;
                        return (
                          <p
                            key={linea}
                            className={`transition-colors duration-150 ${
                              isLineActive
                                ? 'text-emerald-300 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/40 shadow-xs'
                                : ''
                            }`}
                          >
                            {linea}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Module Completion Action Bar */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
            Revisión del Módulo 1
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            ¿Has comprendido la historia de 1957 y los 3 sectores del escudo del SENA?
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
            <span>Ir al Módulo 2</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
