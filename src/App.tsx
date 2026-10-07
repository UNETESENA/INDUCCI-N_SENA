/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LearnerProfile, ModuleId } from './types/induction';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ModuleSymbols } from './components/ModuleSymbols';
import { ModuleValues } from './components/ModuleValues';
import { ModuleTraining } from './components/ModuleTraining';
import { ModuleRegulations } from './components/ModuleRegulations';
import { ModuleEcosystem } from './components/ModuleEcosystem';
import { ModuleEvaluation } from './components/ModuleEvaluation';
import { PassportView } from './components/PassportView';
import { CertificateView } from './components/CertificateView';
import { LearnerProfileModal } from './components/LearnerProfileModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { isInstructorAuthenticated, setInstructorAuthenticated } from './services/submissionRegistry';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'sena_induction_learner_profile_v1';
const THEME_KEY = 'sena_induction_theme_mode';

const DEFAULT_PROFILE: LearnerProfile = {
  name: 'Alejandro Gómez Rodríguez',
  documentNumber: '1028471920',
  program: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  ficha: '2874102',
  regional: 'Distrito Capital',
  center: 'Centro de Servicios y Gestión Empresarial',
  completedModules: [],
  examScore: null,
  certificateCode: 'SENA-IND-2026-8D62',
  startedAt: new Date().toISOString(),
};

export default function App() {
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROFILE;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== null) {
        return saved === 'dark';
      }
      return true;
    } catch {
      return true;
    }
  });

  const [isThemeBlurring, setIsThemeBlurring] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<ModuleId | 'inicio' | 'pasaporte' | 'certificado'>('inicio');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => isInstructorAuthenticated());
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdminPortalModalOpen, setIsAdminPortalModalOpen] = useState(false);

  // Sync theme with HTML document root
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch {
      // ignore
    }
  }, [darkMode]);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(learnerProfile));
    } catch {
      // ignore
    }
  }, [learnerProfile]);

  const handleToggleDarkMode = () => {
    setIsThemeBlurring(true);
    setDarkMode((prev) => !prev);
    window.setTimeout(() => {
      setIsThemeBlurring(false);
    }, 450);
  };

  const handleSaveProfile = (updated: LearnerProfile) => {
    setLearnerProfile(updated);
  };

  const handleCompleteModule = (moduleId: string) => {
    if (!learnerProfile.completedModules.includes(moduleId)) {
      setLearnerProfile((prev) => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
      }));
    }
  };

  const handleUpdateScore = (score: number) => {
    setLearnerProfile((prev) => ({
      ...prev,
      examScore: score,
      completedModules: prev.completedModules.includes('evaluacion')
        ? prev.completedModules
        : [...prev.completedModules, 'evaluacion'],
    }));
  };

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setIsAdminPortalModalOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminLoginModalOpen(false);
    setIsAdminPortalModalOpen(true);
  };

  const handleAdminLogout = () => {
    setInstructorAuthenticated(false);
    setIsAdminAuthenticated(false);
    setIsAdminPortalModalOpen(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B111E] text-slate-800 dark:text-slate-100 transition-colors duration-200 ${
        isThemeBlurring ? 'theme-transition-blur' : ''
      }`}
    >
      {/* Top Bar Navigation */}
      <Header
        activeModule={activeView === 'certificado' ? 'pasaporte' : activeView}
        onSelectModule={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        learnerProfile={learnerProfile}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        isAdmin={isAdminAuthenticated}
        onOpenAdminModal={handleOpenAdmin}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeView === 'inicio' && (
          <div className="space-y-12">
            <Hero
              onStartModule={(id) => {
                setActiveView(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              learnerProfile={learnerProfile}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />

            {/* In-page Passport Quick Access Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <PassportView
                profile={learnerProfile}
                onSelectModule={(mod) => {
                  setActiveView(mod);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onGoToCertificate={() => {
                  setActiveView('certificado');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenProfile={() => setIsProfileModalOpen(true)}
              />
            </div>
          </div>
        )}

        {activeView === 'simbolos' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ModuleSymbols
              onCompleteModule={() => handleCompleteModule('simbolos')}
              isCompleted={learnerProfile.completedModules.includes('simbolos')}
              onNextModule={() => {
                handleCompleteModule('simbolos');
                setActiveView('valores');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeView === 'valores' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ModuleValues
              onCompleteModule={() => handleCompleteModule('valores')}
              isCompleted={learnerProfile.completedModules.includes('valores')}
              onNextModule={() => {
                handleCompleteModule('valores');
                setActiveView('formacion');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeView === 'formacion' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ModuleTraining
              onCompleteModule={() => handleCompleteModule('formacion')}
              isCompleted={learnerProfile.completedModules.includes('formacion')}
              onNextModule={() => {
                handleCompleteModule('formacion');
                setActiveView('reglamento');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeView === 'reglamento' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ModuleRegulations
              onCompleteModule={() => handleCompleteModule('reglamento')}
              isCompleted={learnerProfile.completedModules.includes('reglamento')}
              onNextModule={() => {
                handleCompleteModule('reglamento');
                setActiveView('ecosistema');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeView === 'ecosistema' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ModuleEcosystem
              onCompleteModule={() => handleCompleteModule('ecosistema')}
              isCompleted={learnerProfile.completedModules.includes('ecosistema')}
              onNextModule={() => {
                handleCompleteModule('ecosistema');
                setActiveView('evaluacion');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeView === 'evaluacion' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ModuleEvaluation
              learnerProfile={learnerProfile}
              onUpdateProfile={handleSaveProfile}
              onUpdateScore={handleUpdateScore}
              onGoToCertificate={() => {
                setActiveView('certificado');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeView === 'pasaporte' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <PassportView
              profile={learnerProfile}
              onSelectModule={(mod) => {
                setActiveView(mod);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToCertificate={() => {
                setActiveView('certificado');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />
          </div>
        )}

        {activeView === 'certificado' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <CertificateView
              profile={learnerProfile}
              onBack={() => {
                setActiveView('pasaporte');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </main>

      {/* Global Learner Profile Customization Modal */}
      <LearnerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={learnerProfile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Admin Login Authentication Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Master Instructor & Admin Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalModalOpen}
        onClose={() => setIsAdminPortalModalOpen(false)}
        onLogout={handleAdminLogout}
      />

      {/* Official Institutional Footer */}
      <Footer
        onOpenAdminModal={handleOpenAdmin}
        isAdmin={isAdminAuthenticated}
      />
    </div>
  );
}
