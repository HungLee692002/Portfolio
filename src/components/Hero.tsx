import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Milestone, ArrowRight, Zap, Target, Gauge } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onLearnMore: (set: string) => void;
}

export default function Hero({ onLearnMore }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden border-b border-slate-200 bg-slate-50">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-45"></div>

      {/* Dynamic Glowing Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Introductions & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100 text-xs font-semibold text-indigo-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{t('hero.tagline')}</span>
            </div>

            {/* Main Catchy Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-slate-800 leading-tight">
              {t('hero.titleLine1')} <br />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-600 bg-clip-text text-transparent">
                {t('hero.titleLine2')}
              </span>
            </h1>

            {/* Elevator Pitch */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t('hero.bio')}
            </p>

            {/* Basic Info & Real-Time Contact Grid */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm shadow-sm">
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">{t('hero.contactInfo')}</h4>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Phone className="w-4 h-4 text-indigo-600" />
                  <a href="tel:0969200202" className="hover:text-indigo-600 hover:underline transition-all">0984-870-920</a>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold font-mono">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  <a href="mailto:hungle692002@gmail.com" className="hover:text-indigo-600 hover:underline transition-all">hungle692002@gmail.com</a>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">{t('hero.personalInfo')}</h4>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>{t('hero.location')}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Milestone className="w-4 h-4 text-sky-500" />
                  <span>{t('hero.locationSub')}</span>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onLearnMore('projects')}
                className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-indigo-500/20 active:scale-95 cursor-pointer"
              >
                <span>{t('hero.ctaProjects')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* <button
                onClick={() => onLearnMore('feedback')}
                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all shadow-sm cursor-pointer"
              >
                <span>{t('hero.ctaFeedback')}</span>
              </button> */}
            </div>
          </div>

          {/* Right Column: Key Professional Stats / Interactive Bento Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">

            {/* Stat Card 1: Load Speed */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl relative group hover:border-indigo-300 shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold font-display text-slate-800">&lt; 1.0s</div>
              <div className="text-xs font-bold text-indigo-600 mt-1 uppercase tracking-wide">{t('hero.statLoadTime')}</div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                {t('hero.statLoadTimeDesc')}
              </p>
            </div>

            {/* Stat Card 2: Lighthouse Metrics */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl relative group hover:border-[#10b981]/50 shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                <Gauge className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold font-display text-emerald-600">99/100</div>
              <div className="text-xs font-bold text-emerald-600 mt-1 uppercase tracking-wide">{t('hero.statLighthouse')}</div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                {t('hero.statLighthouseDesc')}
              </p>
            </div>

            {/* Stat Card 3: Experience */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl relative group hover:border-indigo-300 shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold font-display text-slate-800">40%+</div>
              <div className="text-xs font-bold text-purple-600 mt-1 uppercase tracking-wide">{t('hero.statConversion')}</div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                {t('hero.statConversionDesc')}
              </p>
            </div>

            {/* Stat Card 4: Quality Commitment */}
            <div className="bg-indigo-600 border border-indigo-700 p-6 rounded-2xl relative group flex flex-col justify-between text-white shadow-md">
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-indigo-100 font-bold uppercase tracking-widest">{t('hero.statCommitment')}</div>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {t('hero.statCommitmentDesc')}
                </h3>
              </div>
              <div className="text-[10px] text-indigo-200 font-mono mt-3">
                {t('hero.statCommitmentSub')}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
