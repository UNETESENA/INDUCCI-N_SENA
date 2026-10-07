import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, AlertCircle, Eye, EyeOff, X, CheckCircle2 } from 'lucide-react';
import { verifyAdminPin, getAdminPin, DEFAULT_ADMIN_PIN, setInstructorAuthenticated } from '../services/submissionRegistry';
import { googleSignIn } from '../services/googleAuth';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!pin.trim()) {
      setError('Por favor ingresa la clave de administrador.');
      return;
    }

    if (verifyAdminPin(pin)) {
      setInstructorAuthenticated(true);
      onLoginSuccess();
      setPin('');
      setError(null);
    } else {
      setError('Clave de administrador incorrecta. Verifica e intenta nuevamente.');
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoadingGoogle(true);
    setError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setInstructorAuthenticated(true);
        onLoginSuccess();
        setPin('');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al autenticar con Google');
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const currentPin = getAdminPin();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center text-[#007832] dark:text-emerald-400 shadow-2xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Portal de Instructor / Administrador
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
              Acceso restringido para revisar respuestas de aprendices, calificaciones y gestión de la hoja en Google Drive.
            </p>
          </div>
        </div>

        {/* Security Banner */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Privacidad y Seguridad:</span> Este portal está oculto para los aprendices. Los enlaces y controles de Google Drive solo se administran aquí.
          </div>
        </div>

        {/* PIN Form */}
        <form onSubmit={handlePinSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Clave de Acceso Docente (PIN)
            </label>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Ingresa tu clave de instructor"
                autoFocus
                className="w-full px-4 py-3 pl-10 pr-11 text-sm bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:border-transparent transition-all font-mono"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label={showPin ? 'Ocultar clave' : 'Mostrar clave'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-2 font-medium">
                {error}
              </p>
            )}
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              <span>Clave por defecto: <code className="font-mono font-bold text-[#007832] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1 py-0.5 rounded">{currentPin}</code></span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#39A900] hover:bg-[#007832] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Ingresar al Panel Docente</span>
          </button>
        </form>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
          <span className="bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 uppercase tracking-wider shrink-0">
            o autenticar con Google
          </span>
        </div>

        {/* Google Direct Sign-In */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoadingGoogle}
          className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl border border-slate-300 dark:border-slate-700 transition-colors flex items-center justify-center gap-2 shadow-2xs disabled:opacity-60"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{isLoadingGoogle ? 'Autenticando...' : 'Iniciar como Administrador con Google'}</span>
        </button>
      </div>
    </div>
  );
};
