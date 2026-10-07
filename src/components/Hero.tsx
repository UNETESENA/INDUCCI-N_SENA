import React, { useState } from 'react';
import { ModuleId, LearnerProfile } from '../types/induction';
import {
  Calendar,
  Clock,
  Star,
  BarChart3,
  CheckCircle2,
  Bell,
  Heart,
  Shield,
  Plus,
  Play,
  Square,
  Sparkles,
  BookCheck,
  ChevronRight,
  TrendingUp,
  MapPin,
  Flame,
  Award
} from 'lucide-react';
import { anthemSynthesizer } from '../utils/senaAnthemAudio';

interface HeroProps {
  onStartModule: (id: ModuleId) => void;
  learnerProfile: LearnerProfile;
  onOpenProfile: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartModule,
  learnerProfile,
  onOpenProfile,
}) => {
  const [isPlayingMiniAnthem, setIsPlayingMiniAnthem] = useState(false);
  const [sliderLevel, setSliderLevel] = useState(75);
  const [selectedChartRange, setSelectedChartRange] = useState<'semana' | 'modulo' | 'historico'>('modulo');

  const completedCount = learnerProfile.completedModules.length;
  const progressPercent = Math.round((completedCount / 6) * 100);

  const toggleMiniAnthem = () => {
    if (isPlayingMiniAnthem) {
      anthemSynthesizer.stop();
      setIsPlayingMiniAnthem(false);
    } else {
      setIsPlayingMiniAnthem(true);
      anthemSynthesizer.play(
        () => {},
        () => setIsPlayingMiniAnthem(false)
      );
    }
  };

  return (
    <div className="relative bg-[#10141F] text-slate-100 border-b border-white/10 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#39A900]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Top Header Row: Welcome & Top Circular 3D Navigation Badges inspired by uploaded image */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse" />
              <span>SENA · Plataforma de Inducción Institucional 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bienvenido, {learnerProfile.name.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Ficha <strong className="text-emerald-400">{learnerProfile.ficha}</strong> · {learnerProfile.program}
            </p>
          </div>

          {/* 4 Iconic Circular 3D Action Buttons (Directly matching the design inspiration) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0 max-w-full">
            {/* 1. Orange Circle (Calendar / Inducción) */}
            <button
              onClick={() => onStartModule('simbolos')}
              title="Módulo 1: Identidad & Símbolos"
              className="group flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#FF7A00] to-[#E65100] p-0.5 shadow-[0_6px_20px_rgba(255,102,0,0.4)] flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_8px_25px_rgba(255,102,0,0.6)] active:scale-95">
                <div className="w-full h-full rounded-full border border-white/25 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 group-hover:text-orange-400 transition-colors">
                Inducción
              </span>
            </button>

            {/* 2. Lime Green Circle (Cronograma / FPI) */}
            <button
              onClick={() => onStartModule('formacion')}
              title="Módulo 3: Etapas Formativas"
              className="group flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#84E200] to-[#39A900] p-0.5 shadow-[0_6px_20px_rgba(57,169,0,0.4)] flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_8px_25px_rgba(57,169,0,0.6)] active:scale-95">
                <div className="w-full h-full rounded-full border border-white/25 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                Etapas
              </span>
            </button>

            {/* 3. Electric Blue Circle (Valores / Integridad) */}
            <button
              onClick={() => onStartModule('valores')}
              title="Módulo 2: Valores & Ética"
              className="group flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#00D2FF] to-[#0066FF] p-0.5 shadow-[0_6px_20px_rgba(0,102,255,0.4)] flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_8px_25px_rgba(0,102,255,0.6)] active:scale-95">
                <div className="w-full h-full rounded-full border border-white/25 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">
                Valores
              </span>
            </button>

            {/* 4. Vivid Pink Circle (Evaluación / Rendimiento) */}
            <button
              onClick={() => onStartModule('evaluacion')}
              title="Módulo 6: Examen de Inducción"
              className="group flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#FF2E93] to-[#C2005A] p-0.5 shadow-[0_6px_20px_rgba(255,46,147,0.4)] flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_8px_25px_rgba(255,46,147,0.6)] active:scale-95">
                <div className="w-full h-full rounded-full border border-white/25 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 group-hover:text-pink-400 transition-colors">
                Evaluación
              </span>
            </button>
          </div>
        </div>

        {/* MAIN HUD DASHBOARD GRID (Layout directly organized like the reference image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          
          {/* 1. MEDIA PLAYER CARD (Top-Left Inspiration widget) */}
          <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#181D2C]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  Reproductor Institucional
                </span>
                <h3 className="text-lg font-extrabold text-white">Himno Oficial del SENA</h3>
                <p className="text-xs text-slate-400">Marlez & Sánchez · Marcha Patriótica</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMiniAnthem}
                  className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Marcar como himno favorito"
                >
                  <Heart className="w-4 h-4 fill-rose-500/20 text-rose-500" />
                </button>
              </div>
            </div>

            {/* Center Play Button & Equalizer Spectrum */}
            <div className="flex items-center justify-center gap-6 py-2">
              <button
                onClick={toggleMiniAnthem}
                aria-label={isPlayingMiniAnthem ? 'Detener Himno' : 'Reproducir Himno'}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF6600] to-[#FFA726] shadow-[0_0_25px_rgba(255,102,0,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-108 active:scale-95"
              >
                {isPlayingMiniAnthem ? (
                  <Square className="w-6 h-6 text-slate-950 fill-current" />
                ) : (
                  <Play className="w-7 h-7 text-white fill-current ml-1" />
                )}
              </button>

              {/* Animated Equalizer Bars inspired by center widget */}
              <div className="flex items-end gap-1.5 h-10 px-3 py-1 bg-black/30 rounded-xl border border-white/5">
                <div className={`w-1.5 rounded-full bg-orange-400 ${isPlayingMiniAnthem ? 'animate-eq-1' : 'h-2'}`} />
                <div className={`w-1.5 rounded-full bg-amber-400 ${isPlayingMiniAnthem ? 'animate-eq-2' : 'h-4'}`} />
                <div className={`w-1.5 rounded-full bg-[#39A900] ${isPlayingMiniAnthem ? 'animate-eq-3' : 'h-6'}`} />
                <div className={`w-1.5 rounded-full bg-emerald-400 ${isPlayingMiniAnthem ? 'animate-eq-4' : 'h-3'}`} />
                <div className={`w-1.5 rounded-full bg-cyan-400 ${isPlayingMiniAnthem ? 'animate-eq-5' : 'h-5'}`} />
                <div className={`w-1.5 rounded-full bg-pink-400 ${isPlayingMiniAnthem ? 'animate-eq-6' : 'h-2'}`} />
              </div>
            </div>

            {/* Glowing Orange Scrubber Track (as in image) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>00:15</span>
                <span className="text-orange-400">02:30</span>
              </div>
              <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-visible">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                  style={{ width: isPlayingMiniAnthem ? '55%' : '20%' }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-orange-500 shadow-[0_0_10px_rgba(255,102,0,0.8)]"
                  style={{ left: isPlayingMiniAnthem ? '55%' : '20%' }}
                />
              </div>
            </div>

            {/* Bottom Media Controls */}
            <div className="flex items-center justify-between pt-1 text-orange-400 text-xs font-mono">
              <button onClick={() => onStartModule('simbolos')} className="hover:text-white transition-colors">
                « Módulo 1
              </button>
              <button onClick={toggleMiniAnthem} className="hover:text-white transition-colors">
                {isPlayingMiniAnthem ? 'PAUSA' : 'REPRODUCIR'}
              </button>
              <button onClick={() => onStartModule('simbolos')} className="hover:text-white transition-colors flex items-center gap-1">
                <span>Letra Oficial</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. LEARNING ANALYTICS GRADIENT MOUNTAIN CHART (Top-Right Inspiration widget) */}
          <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl bg-[#181D2C]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Analítica de Inducción
                </span>
                <h3 className="text-lg font-extrabold text-white">Curva de Competencias Institucionales</h3>
              </div>
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5 text-[11px]">
                <button
                  onClick={() => setSelectedChartRange('semana')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    selectedChartRange === 'semana' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Fase 1
                </button>
                <button
                  onClick={() => setSelectedChartRange('modulo')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    selectedChartRange === 'modulo' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Módulos
                </button>
                <button
                  onClick={() => setSelectedChartRange('historico')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    selectedChartRange === 'historico' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Meta 100%
                </button>
              </div>
            </div>

            {/* SVG Mountain Chart with multi-color gradient fills */}
            <div className="relative h-36 w-full pt-2">
              <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
                <defs>
                  {/* Multi-stop colorful gradient fill matching the inspiration image */}
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF2E93" stopOpacity="0.85" />
                    <stop offset="35%" stopColor="#FFA726" stopOpacity="0.85" />
                    <stop offset="65%" stopColor="#84E200" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#00C6FF" stopOpacity="0.85" />
                  </linearGradient>
                  <linearGradient id="chartStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF2E93" />
                    <stop offset="35%" stopColor="#FFA726" />
                    <stop offset="65%" stopColor="#84E200" />
                    <stop offset="100%" stopColor="#00C6FF" />
                  </linearGradient>
                </defs>

                {/* Background grid lines */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.1)" />

                {/* Mountain polyline area */}
                <polygon
                  points="20,95 60,65 110,40 160,70 210,20 260,50 310,75 360,30 380,95 20,95"
                  fill="url(#chartGradient)"
                  opacity="0.45"
                />

                {/* Peak line */}
                <polyline
                  points="20,95 60,65 110,40 160,70 210,20 260,50 310,75 360,30 380,95"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data point dots */}
                <circle cx="60" cy="65" r="3.5" fill="#FFA726" stroke="white" strokeWidth="1.5" />
                <circle cx="110" cy="40" r="3.5" fill="#84E200" stroke="white" strokeWidth="1.5" />
                <circle cx="210" cy="20" r="4.5" fill="#FFFFFF" stroke="#00C6FF" strokeWidth="2" />
                <circle cx="260" cy="50" r="3.5" fill="#00C6FF" stroke="white" strokeWidth="1.5" />
                <circle cx="360" cy="30" r="3.5" fill="#FF2E93" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Bottom labels */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-white/5 pt-2">
              <span>Símbolos</span>
              <span>Valores</span>
              <span className="text-cyan-300 font-bold">FPI (Lectiva)</span>
              <span>Reglamento</span>
              <span className="text-emerald-400 font-bold">Zajuna/Certificado</span>
            </div>
          </div>

          {/* 3. REGIONAL CENTERS STATUS (Middle-Left Inspiration widget, like weather/cities list) */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-[#181D2C]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Centros de Formación</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">33 Regionales</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-white font-medium">Distrito Capital (D.C.)</span>
                </div>
                <span className="font-mono font-bold text-emerald-400">18 Centros</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-white font-medium">Regional Antioquia</span>
                </div>
                <span className="font-mono font-bold text-cyan-400">16 Centros</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-white font-medium">Regional Valle del Cauca</span>
                </div>
                <span className="font-mono font-bold text-orange-400">10 Centros</span>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400" />
                  <span className="text-white font-medium">Regional Santander</span>
                </div>
                <span className="font-mono font-bold text-pink-400">8 Centros</span>
              </div>
            </div>
          </div>

          {/* 4. PROGRESS SLIDERS & METRIC GAUGES (Bottom-Left Inspiration widget) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-[#181D2C]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Nivel de Avance
                </span>
                <h4 className="text-sm font-bold text-white">Monitores de Asimilación</h4>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <span>{progressPercent}% Total</span>
              </div>
            </div>

            {/* Slider 1: Green glowing bar with badge (like in image) */}
            <div className="space-y-1.5 p-3 rounded-xl bg-black/30 border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Módulos Completados</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold font-mono text-[11px] border border-emerald-500/30">
                  {progressPercent}%
                </span>
              </div>
              <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#70D600] to-[#39A900] rounded-full shadow-[0_0_12px_rgba(57,169,0,0.5)] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Slider 2: Orange interactive range slider */}
            <div className="space-y-1.5 p-3 rounded-xl bg-black/30 border border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Autodiagnóstico de Valores SENA</span>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold font-mono text-[11px] border border-orange-500/30">
                  {sliderLevel}% {sliderLevel >= 80 ? '· Alto' : '· En proceso'}
                </span>
              </div>
              <div className="space-y-1">
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={sliderLevel}
                  onChange={(e) => setSliderLevel(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF6600]"
                  title="Desliza para autoevaluar tu nivel de apropiación de los 7 valores"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>En Inducción</span>
                  <button
                    onClick={() => onStartModule('valores')}
                    className="text-orange-400 hover:underline"
                  >
                    Repasar Módulo 2 »
                  </button>
                  <span>100% Apropiado</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. 4 NEON QUICK ACTION TILES (Bottom-Right Inspiration widget) */}
          <div className="lg:col-span-3 p-5 rounded-2xl bg-[#181D2C]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Herramientas Rápidas
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Tile 1: Orange outline (Bell / Alertas) */}
              <button
                onClick={() => onStartModule('reglamento')}
                className="p-3 rounded-xl bg-black/40 border border-orange-500/60 hover:border-orange-400 hover:bg-orange-500/10 transition-all flex flex-col items-center justify-center gap-1.5 group"
              >
                <Bell className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-slate-300">Circulares</span>
              </button>

              {/* Tile 2: Cyan outline (Wellness / Bienestar) */}
              <button
                onClick={() => onStartModule('ecosistema')}
                className="p-3 rounded-xl bg-black/40 border border-cyan-500/60 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all flex flex-col items-center justify-center gap-1.5 group"
              >
                <Heart className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-slate-300">Bienestar</span>
              </button>

              {/* Tile 3: Lime outline (Shield / Acuerdo 0009 de 2024) */}
              <button
                onClick={() => onStartModule('reglamento')}
                className="p-3 rounded-xl bg-black/40 border border-emerald-500/60 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all flex flex-col items-center justify-center gap-1.5 group"
                title="Nuevo Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024)"
              >
                <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-slate-300">Acuerdo 0009</span>
              </button>

              {/* Tile 4: Pink outline (Plus / Pasaporte) */}
              <button
                onClick={() => onStartModule('evaluacion')}
                className="p-3 rounded-xl bg-black/40 border border-pink-500/60 hover:border-pink-400 hover:bg-pink-500/10 transition-all flex flex-col items-center justify-center gap-1.5 group"
              >
                <Award className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-slate-300">Certificado</span>
              </button>
            </div>

            <button
              onClick={onOpenProfile}
              className="w-full py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5 flex items-center justify-center gap-1.5"
            >
              <span>Editar Datos de Ficha</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
