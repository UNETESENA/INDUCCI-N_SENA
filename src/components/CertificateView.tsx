import React, { useState } from 'react';
import { LearnerProfile } from '../types/induction';
import { Printer, Copy, Check, Award, ArrowLeft, ShieldCheck, QrCode } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface CertificateViewProps {
  profile: LearnerProfile;
  onBack: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  profile,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(profile.certificateCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentDateFormatted = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top action toolbar (hidden during print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Menú de Módulos</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Código Copiado' : 'Copiar Código'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Certificate Sheet */}
      <div
        id="certificate-sheet"
        className="relative bg-white text-slate-900 p-8 sm:p-14 rounded-3xl border-8 border-double border-[#005e26]/90 shadow-2xl overflow-hidden font-sans print:border-8 print:p-8 print:m-0 print:shadow-none"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-[#39A900]" />
        <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-[#39A900]" />
        <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-[#39A900]" />
        <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-[#39A900]" />

        {/* Certificate Watermark in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <svg viewBox="0 0 100 100" className="w-[600px] h-[600px] text-[#007832]" fill="currentColor">
            <circle cx="50" cy="20" r="10" />
            <path d="M50 35 C38 35 32 46 22 55 C19 58 22 62 26 60 C36 52 42 46 47 46 L47 88 C47 91 53 91 53 88 L53 46 C58 46 64 52 74 60 C78 62 81 58 78 55 C68 46 62 35 50 35 Z" />
            <rect x="15" y="92" width="70" height="4" rx="2" />
          </svg>
        </div>

        {/* Header Block */}
        <div className="text-center space-y-3 pb-8 border-b border-slate-200">
          <div className="flex justify-center">
            <SenaLogo size={52} />
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] uppercase tracking-widest font-extrabold text-[#005e26]">
              República de Colombia · Ministerio del Trabajo
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              Servicio Nacional de Aprendizaje SENA · Dirección General
            </div>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="text-center py-8 space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] font-bold text-[#39A900]">
            Constancia de Culminación Exitosa
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            Certificado de Inducción Institucional
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            El Servicio Nacional de Aprendizaje SENA certifica que el aprendiz:
          </p>
        </div>

        {/* Apprentice Name & Identifiers */}
        <div className="text-center pb-8 space-y-3">
          <div className="text-2xl sm:text-4xl font-black text-[#005e26] tracking-tight font-serif border-b-2 border-emerald-100 inline-block px-8 pb-1">
            {profile.name || 'APRENDIZ SENA'}
          </div>
          <div className="text-xs text-slate-600 font-medium">
            Identificado con Documento No. <strong className="text-slate-900">{profile.documentNumber || '1020304050'}</strong>
          </div>
        </div>

        {/* Description Body */}
        <div className="max-w-2xl mx-auto text-center space-y-4 pb-10 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Culminó satisfactoriamente la totalidad de los módulos y evaluaciones correspondientes al
            <strong> Proceso de Inducción Institucional 2026</strong> para el programa:
          </p>

          <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-100 font-bold text-slate-900 text-sm sm:text-base">
            {profile.program || 'Tecnología en Análisis y Desarrollo de Software (ADSO)'}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-slate-600">
            <span>
              <strong>Ficha:</strong> {profile.ficha || '2874102'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong>Regional:</strong> {profile.regional || 'Distrito Capital'}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <strong>Centro:</strong> {profile.center || 'Centro de Servicios y Gestión Empresarial'}
            </span>
          </div>

          <p className="text-xs text-slate-500 italic pt-1">
            "Desarrollando competencias con calidad, pertinencia y sentido de pertenencia por Colombia."
          </p>
        </div>

        {/* Signatures & QR Section */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
          {/* Signature 1 */}
          <div className="text-center space-y-1">
            <div className="h-12 flex items-center justify-center">
              <span className="font-serif italic text-lg text-slate-600 tracking-wider">
                Jorge Eduardo Londoño
              </span>
            </div>
            <div className="w-48 mx-auto border-t border-slate-400" />
            <div className="text-xs font-bold text-slate-800">Director General</div>
            <div className="text-[10px] text-slate-500">SENA Dirección General</div>
          </div>

          {/* QR Code Validation */}
          <div className="flex flex-col items-center text-center space-y-1.5 py-2">
            <div className="w-20 h-20 bg-white border border-slate-300 rounded-lg p-1.5 shadow-2xs flex items-center justify-center">
              {/* Synthetic Vector QR Code */}
              <svg viewBox="0 0 24 24" className="w-full h-full text-slate-800" fill="currentColor">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm2 4h2v2h-2v-2zm2 2h4v2h-4v-2zm-6 0h2v2h-2v-2zm6-4h2v2h-2v-2zm-2-2h4v2h-4v-2zM5 5h2v2H5V5zm12 0h2v2h-2V5zM5 17h2v2H5v-2z" />
              </svg>
            </div>
            <div className="text-[10px] font-mono font-bold text-slate-700 tracking-wider">
              {profile.certificateCode}
            </div>
            <div className="text-[9px] text-slate-400">Verificable en Zajuna & SofiaPlus</div>
          </div>

          {/* Signature 2 */}
          <div className="text-center space-y-1">
            <div className="h-12 flex items-center justify-center">
              <span className="font-serif italic text-lg text-slate-600 tracking-wider">
                Subdirección de Centro
              </span>
            </div>
            <div className="w-48 mx-auto border-t border-slate-400" />
            <div className="text-xs font-bold text-slate-800">Subdirector de Centro</div>
            <div className="text-[10px] text-slate-500">{profile.center}</div>
          </div>
        </div>

        {/* Bottom Footer Note */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400">
          <span>Expedido el {currentDateFormatted} · República de Colombia</span>
          <span>Calificación Final Obtenida: {profile.examScore ?? 100}%</span>
        </div>
      </div>
    </div>
  );
};
