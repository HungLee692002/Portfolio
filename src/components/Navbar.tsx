import React from 'react';
import { Mail, Phone, Code, Terminal, MessageSquare, ShieldCheck, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ activeSection, onNavigate, onOpenAdmin }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-all">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-slate-800 leading-none block">HƯNG LÊ</span>
            <span className="text-[10px] font-mono text-indigo-600 tracking-wider font-semibold">FULLSTACK DEVELOPER</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex gap-6 text-sm font-semibold">
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors cursor-pointer ${activeSection === 'about' ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            {t('navbar.about')}
          </button>
          <button
            onClick={() => onNavigate('skills')}
            className={`transition-colors cursor-pointer ${activeSection === 'skills' ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            {t('navbar.skills')}
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className={`transition-colors cursor-pointer ${activeSection === 'projects' ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            {t('navbar.demos')}
          </button>
          {/* <button
            onClick={() => onNavigate('feedback')}
            className={`transition-colors cursor-pointer ${activeSection === 'feedback' ? 'text-indigo-600 font-bold' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            {t('navbar.feedback')}
          </button> */}
        </nav>

        {/* Contact info details & Admin view */}
        <div className="flex items-center gap-3">
          {/* Contact Details (Basic and contact information requirement) */}
          <div className="hidden lg:flex flex-col text-right text-xs border-r border-slate-200 pr-4">
            <div className="flex items-center justify-end gap-1.5 text-slate-700 font-semibold">
              <Phone className="w-3 h-3 text-indigo-600" />
              <span>0984-870-920</span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-slate-500 mt-0.5 font-mono">
              <Mail className="w-3 h-3 text-indigo-500" />
              <span>hungle692002@gmail.com</span>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-[10px] font-bold">
            <button
              onClick={() => setLanguage('vi')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${language === 'vi'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              VI
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${language === 'en'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              EN
            </button>
          </div>

          {/* Recruiter / Admin Shortcut */}
          {/* <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 font-semibold"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>{t('navbar.adminCrm')}</span>
          </button> */}

          {/* Quick Contact CTA */}
          <button
            onClick={() => onNavigate('projects')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4.5 py-1.5 rounded-lg shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all text-center cursor-pointer"
          >
            {t('navbar.hireMe')}
          </button>
        </div>
      </div>
    </header>
  );
}
