import React, { useState, useRef, useEffect } from 'react';
import { ModuleId, LearnerProfile } from '../types/induction';
import {
  UserCheck,
  Award,
  Moon,
  Sun,
  ShieldCheck,
  Lock,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Layers,
  Shield,
  Home,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { INDUCTION_MODULES } from '../data/senaData';

interface HeaderProps {
  activeModule: ModuleId | 'inicio' | 'pasaporte';
  onSelectModule: (module: ModuleId | 'inicio' | 'pasaporte') => void;
  learnerProfile: LearnerProfile;
  onOpenProfileModal: () => void;
  isAdmin: boolean;
  onOpenAdminModal: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule,
  onSelectModule,
  learnerProfile,
  onOpenProfileModal,
  isAdmin,
  onOpenAdminModal,
  darkMode,
  onToggleDarkMode,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModulesDropdownOpen, setIsModulesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const completedCount = learnerProfile.completedModules.length;
  const progressPercent = Math.round((completedCount / 6) * 100);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModulesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to get module icon component
  const getModuleIcon = (id: string) => {
    switch (id) {
      case 'simbolos':
        return Shield;
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
        return Home;
    }
  };

  const handleModuleClick = (mod: ModuleId | 'inicio' | 'pasaporte') => {
    onSelectModule(mod);
    setIsMobileMenuOpen(false);
    setIsModulesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Main Top Navigation Row - selector 2: div#root > div > header > div */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-4 min-w-0">
        
        {/* GRUPO 1: IDENTIDAD INSTITUCIONAL & MARCA SENA */}
        {/* Brand wordmark & SOFIA Plus logo - selector 1: button:nth-of-type(1) > span:nth-of-type(1) */}
        <button
          onClick={() => handleModuleClick('inicio')}
          className="flex items-center gap-2 sm:gap-2.5 text-left group focus-visible:outline-2 focus-visible:outline-[#39A900] rounded-lg shrink-0 min-w-0"
          title="Ir al Inicio de la Inducción Institucional SENA"
        >
          <div className="h-10 sm:h-[46px] px-2 sm:px-2.5 rounded-lg bg-white dark:bg-white/95 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs overflow-hidden transition-all group-hover:border-[#39A900] dark:group-hover:border-emerald-400 shrink-0">
            <img
              src="/logoSena.svg"
              alt="Logosímbolo Oficial SENA"
              className="h-7 sm:h-[34px] w-auto max-w-[105px] sm:max-w-[145px] object-contain transition-transform group-hover:scale-105"
              loading="eager"
            />
          </div>
          <span className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#007832] dark:group-hover:text-emerald-400 transition-colors truncate max-w-[125px] xs:max-w-[185px] sm:max-w-[260px] md:max-w-none">
            Inducción Institucional SENA
          </span>
        </button>

        {/* GRUPO 2: NAVEGACIÓN MODULAR ACADÉMICA (Pantallas amplias xl+) */}
        <nav
          className="hidden xl:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/80 dark:border-slate-750"
          aria-label="Ruta formativa de inducción"
        >
          <button
            onClick={() => handleModuleClick('inicio')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeModule === 'inicio'
                ? 'bg-white dark:bg-slate-700 text-[#007832] dark:text-emerald-400 shadow-2xs font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
            title="Página principal de inducción"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </button>

          {INDUCTION_MODULES.map((m) => {
            const isCompleted = learnerProfile.completedModules.includes(m.id);
            const isActive = activeModule === m.id;
            const Icon = getModuleIcon(m.id);

            return (
              <button
                key={m.id}
                onClick={() => handleModuleClick(m.id)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 relative whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-[#007832] dark:text-emerald-400 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
                title={m.title}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#007832] dark:text-emerald-400' : 'text-slate-400'}`} />
                <span>{m.title.split(',')[0].split('&')[0].trim()}</span>
                {isCompleted && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] dark:bg-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* GRUPO 2B: SELECTOR DESPLEGABLE DE MÓDULOS (Pantallas medianas md a lg) */}
        <div className="hidden md:flex xl:hidden relative" ref={dropdownRef}>
          <button
            onClick={() => setIsModulesDropdownOpen(!isModulesDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            title="Seleccionar módulo de estudio"
            aria-expanded={isModulesDropdownOpen}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400" />
            <span className="font-semibold">Módulos</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#39A900]/15 text-[#007832] dark:text-emerald-300 font-bold">
              {completedCount}/6
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isModulesDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isModulesDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 z-50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-2.5 py-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Ruta de Inducción
              </div>
              <button
                onClick={() => handleModuleClick('inicio')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                  activeModule === 'inicio'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-300 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Home className="w-4 h-4 text-slate-400" />
                <span>Inicio / General</span>
              </button>
              {INDUCTION_MODULES.map((m) => {
                const isCompleted = learnerProfile.completedModules.includes(m.id);
                const isActive = activeModule === m.id;
                const Icon = getModuleIcon(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => handleModuleClick(m.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-300 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#007832] dark:text-emerald-400' : 'text-slate-400'}`} />
                      <span className="truncate">{m.title}</span>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] dark:text-emerald-400 shrink-0" />
                    ) : (
                      <span className="text-[10px] text-slate-400 shrink-0 font-mono">{m.estimatedMinutes}m</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ACCIONES AGRUPADAS POR AFINIDAD (Evitan desbordamiento horizontal) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* GRUPO 3: ESPACIO DEL APRENDIZ (Ficha & Pasaporte agrupados) */}
          <div className="flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-0.5 sm:p-1 rounded-xl border border-slate-200/90 dark:border-slate-700 shadow-2xs">
            {/* 3A: Botón de Perfil del Aprendiz */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"
              title={`Ficha: ${learnerProfile.ficha} · ${learnerProfile.name} (Clic para editar datos)`}
              aria-label="Perfil del aprendiz"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400 shrink-0" />
              <span className="hidden sm:inline max-w-[85px] md:max-w-[110px] truncate font-semibold">
                {learnerProfile.name ? learnerProfile.name.split(' ')[0] : 'Aprendiz'}
              </span>
            </button>

            {/* Separador sutil */}
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-650 mx-0.5" />

            {/* 3B: Botón de Pasaporte de Aprendizaje */}
            <button
              onClick={() => handleModuleClick('pasaporte')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                activeModule === 'pasaporte'
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700'
              }`}
              title={`Pasaporte de Aprendizaje: ${progressPercent}% completado`}
              aria-label="Pasaporte de inducción"
            >
              <Award className={`w-3.5 h-3.5 ${activeModule === 'pasaporte' ? 'text-white' : 'text-amber-500'}`} />
              <span className="hidden xs:inline">Pasaporte</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-500/20 text-[#007832] dark:text-emerald-300 dark:bg-emerald-500/30">
                {progressPercent}%
              </span>
            </button>
          </div>

          {/* GRUPO 4: HERRAMIENTAS DEL SISTEMA & DOCENCIA */}
          <div className="flex items-center gap-1 shrink-0">
            {/* 4A: Acceso Docente / Instructor */}
            {isAdmin ? (
              <button
                onClick={onOpenAdminModal}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-bold text-emerald-950 dark:text-emerald-100 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/80 dark:hover:bg-emerald-800 border border-emerald-300 dark:border-emerald-600 rounded-lg transition-colors whitespace-nowrap shadow-xs animate-pulse-subtle"
                title="Panel de Control Docente e Instructores SENA"
                aria-label="Panel Docente"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-300 shrink-0" />
                <span className="hidden md:inline">Panel Docente</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminModal}
                className="flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                title="Acceso Instructor / Administrador SENA"
                aria-label="Acceso Docente"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            {/* 4B: Alternador de Modo Claro / Oscuro */}
            <button
              onClick={onToggleDarkMode}
              aria-label={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              title={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              className="flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg border transition-all duration-200 bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-200 dark:border-slate-700 focus-visible:outline-2 focus-visible:outline-[#39A900] shrink-0"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* 4C: Botón de Menú Móvil (Solo visible en pantallas móviles < md) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* GRUPO 5: MENÚ MÓVIL DESPLEGABLE (Evita todo desbordamiento en teléfonos y tablets) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl px-4 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-3 duration-200 shadow-xl">
          
          {/* Tarjeta de Resumen del Aprendiz en Menú Móvil */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {learnerProfile.name || 'Aprendiz SENA'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Ficha {learnerProfile.ficha} · {learnerProfile.program}
              </div>
            </div>
            <button
              onClick={() => {
                onOpenProfileModal();
                setIsMobileMenuOpen(false);
              }}
              className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shrink-0"
            >
              Editar Ficha
            </button>
          </div>

          {/* Lista de Módulos Formativos */}
          <div className="space-y-1">
            <div className="px-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Módulos de Aprendizaje ({completedCount} de 6)
            </div>

            <button
              onClick={() => handleModuleClick('inicio')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                activeModule === 'inicio'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>Inicio y Bienvenida</span>
            </button>

            {INDUCTION_MODULES.map((m) => {
              const isCompleted = learnerProfile.completedModules.includes(m.id);
              const isActive = activeModule === m.id;
              const Icon = getModuleIcon(m.id);

              return (
                <button
                  key={m.id}
                  onClick={() => handleModuleClick(m.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#007832] dark:text-emerald-400' : 'text-slate-400'}`} />
                    <span className="truncate">{m.title}</span>
                  </div>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[10px] text-[#39A900] dark:text-emerald-400 font-bold shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Listo
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                      {m.estimatedMinutes} min
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Accesos Rápidos de Pasaporte & Docente en Móvil */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleModuleClick('pasaporte')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] transition-colors shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>Pasaporte ({progressPercent}%)</span>
            </button>

            <button
              onClick={() => {
                onOpenAdminModal();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Panel Docente</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span>Acceso Docente</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

