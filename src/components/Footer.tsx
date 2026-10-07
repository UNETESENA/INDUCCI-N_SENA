import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface FooterProps {
  onOpenAdminModal?: () => void;
  isAdmin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminModal, isAdmin }) => {
  return (
    <footer className="no-print bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="h-8 px-2 rounded-lg bg-white flex items-center justify-center shadow-xs">
                <img
                  src="/logoSena.svg"
                  alt="Logosímbolo Oficial SENA"
                  className="h-5 w-auto object-contain"
                />
              </div>
              <span className="text-white font-bold text-sm tracking-tight">
                Servicio Nacional de Aprendizaje
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Entidad pública adscrita al Ministerio del Trabajo de Colombia.
              Formación profesional integral gratuita para todos los colombianos.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Plataformas Oficiales
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://zajuna.sena.edu.co"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Zajuna LMS Oficial
                </a>
              </li>
              <li>
                <a
                  href="https://ape.sena.edu.co"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Agencia Pública de Empleo (APE)
                </a>
              </li>
              <li>
                <a
                  href="https://www.fondoemprender.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Fondo Emprender
                </a>
              </li>
              <li>
                <a
                  href="https://biblioteca.sena.edu.co"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Sistema de Bibliotecas SENA
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Normatividad Institucional
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>Acuerdo 0009 de 2024 (Reglamento del Aprendiz SENA · Deroga Acuerdo 07 de 2012)</li>
              <li>Ley 119 de 1994 (Reestructuración del SENA)</li>
              <li>Ley 789 de 2002 (Contrato de Aprendizaje)</li>
              <li>Código de Integridad SENA</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Atención al Ciudadano
            </div>
            <p className="text-xs leading-relaxed">
              Línea gratuita nacional: <strong>01 8000 910 270</strong>
              <br />
              Bogotá: <strong>(601) 343 0111</strong>
              <br />
              Horario: Lunes a Viernes 7:00 a.m. a 7:00 p.m.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} Servicio Nacional de Aprendizaje SENA · Colombia.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Plataforma de Inducción Institucional para Aprendices</span>
            {onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 rounded-md transition-colors border border-slate-800 hover:border-slate-700"
                title="Acceso exclusivo para Instructores y Administradores"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isAdmin ? 'Panel de Administración (Activo)' : 'Acceso Instructor'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
