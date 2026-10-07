import React, { useState } from 'react';
import { LearnerProfile } from '../types/induction';
import { REGIONALES_COLOMBIA, PROGRAMAS_POPULARES, CENTROS_DEFAULT } from '../data/senaData';
import { X, Check, User, Hash, MapPin, Building2, BookOpen } from 'lucide-react';

interface LearnerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: LearnerProfile;
  onSaveProfile: (updated: LearnerProfile) => void;
}

export const LearnerProfileModal: React.FC<LearnerProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<LearnerProfile>({ ...profile });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#005e26] to-[#007832] text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Ficha de Identificación del Aprendiz</h3>
            <p className="text-xs text-emerald-100">
              Personaliza tus datos institucionales para el registro de inducción y tu certificado.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Nombres y Apellidos */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400" />
              Nombres y Apellidos Completos
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej. Juan Carlos Ramírez Morales"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
          </div>

          {/* Documento y Ficha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400" />
                No. Documento de Identidad
              </label>
              <input
                type="text"
                required
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                placeholder="Ej. 1020304050"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-800 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400" />
                Número de Ficha de Caracterización
              </label>
              <input
                type="text"
                required
                value={formData.ficha}
                onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                placeholder="Ej. 2874102"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-800 transition-all"
              />
            </div>
          </div>

          {/* Programa de Formación */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400" />
              Programa de Formación
            </label>
            <input
              type="text"
              list="programas-list"
              required
              value={formData.program}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              placeholder="Selecciona o escribe tu programa..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
            <datalist id="programas-list">
              {PROGRAMAS_POPULARES.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </div>

          {/* Regional y Centro de Formación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400" />
                Regional SENA
              </label>
              <select
                value={formData.regional}
                onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-800 transition-all"
              >
                {REGIONALES_COLOMBIA.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#007832] dark:text-emerald-400" />
                Centro de Formación
              </label>
              <input
                type="text"
                list="centros-list"
                required
                value={formData.center}
                onChange={(e) => setFormData({ ...formData, center: e.target.value })}
                placeholder="Nombre del centro..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:bg-white dark:focus:bg-slate-800 transition-all"
              />
              <datalist id="centros-list">
                {CENTROS_DEFAULT.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#007832] rounded-lg transition-colors shadow-xs flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Guardar Datos de Ficha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
