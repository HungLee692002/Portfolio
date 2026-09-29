import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';
import { ExternalLink, Sparkles, Code, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectsShowcase() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const toggleExpand = (id: string) => {
    if (expandedProjectId === id) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(id);
    }
  };

  const handleOpenDemo = (ref: string) => {
    window.open(ref, '_blank');
  };

  return (
    <section id="projects-section" className="py-20 border-b border-slate-200 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Code className="w-4 h-4 text-indigo-600" /> {t('projects.tagline')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-800">
            {t('projects.title')}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('projects.desc')}
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {projectsData.map((project) => {
            const isExpanded = expandedProjectId === project.id;

            return (
              <div
                key={project.id}
                className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Banner representation */}
                <div className="bg-white p-6 border-b border-slate-200 relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial-gradient from-indigo-500/5 to-transparent pointer-events-none"></div>

                  <div className="space-y-2 text-left relative z-10">
                    <div className="text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-100/60 font-bold px-2.5 py-0.5 rounded-full uppercase inline-block">
                      {project.category}
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 font-display leading-tight">{project.title}</h3>
                    <div className="flex items-center gap-1 bg-emerald-50 text-xs font-bold text-emerald-700 px-2.5 py-0.5 border border-emerald-100/50 rounded-full w-max">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>{project.metric.label[language]}: <strong className="font-bold">{project.metric.value}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Core description details */}
                <div className="p-6 space-y-4 text-left">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.shortDesc[language]}
                  </p>

                  {/* Highlights Spec tags */}
                  <div className="space-y-4 pt-3 border-t border-slate-200">
                    <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 font-bold">
                      <span>{t('projects.speedMetrics')}</span>
                      <span className="text-emerald-600 font-bold">{t('projects.excellent')}</span>
                    </div>

                    {/* Simple progress indicators for Lighthouse score */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
                        <div className="text-sm font-extrabold text-emerald-600">{project.specs.lighthousePerformance}</div>
                        <div className="text-[9px] text-slate-500 font-mono mt-0.5">{t('projects.performance')}</div>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
                        <div className="text-sm font-extrabold text-emerald-600">{project.specs.lighthouseSeo}</div>
                        <div className="text-[9px] text-slate-500 font-mono mt-0.5">{t('projects.seo')}</div>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs">
                        <div className="text-sm font-extrabold text-emerald-600">{project.specs.lighthouseBestPractices}</div>
                        <div className="text-[9px] text-slate-500 font-mono mt-0.5">{t('projects.bestPractices')}</div>
                      </div>
                    </div>
                  </div>

                  {/* Built stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono bg-indigo-50/60 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100/50 font-bold">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                        {t('projects.moreTech').replace('{count}', (project.techStack.length - 3).toString())}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Solution Drawer block */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-4 border-t border-slate-200 pt-4 bg-white text-left animate-fade-in">
                    <div className="space-y-4 text-xs leading-relaxed">
                      {/* Problem statement */}
                      <div className="space-y-1">
                        <h4 className="font-bold text-rose-600 uppercase text-[10px] tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                          {t('projects.clientProblem')}
                        </h4>
                        <p className="text-slate-600 bg-rose-50/30 p-2 text-[11px] rounded-lg border border-rose-100 leading-relaxed">
                          {project.problem[language]}
                        </p>
                      </div>

                      {/* Bespoke Solution and Specs breakdown */}
                      <div className="space-y-1">
                        <h4 className="font-bold text-indigo-600 uppercase text-[10px] tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                          {t('projects.mySolution')}
                        </h4>
                        <p className="text-slate-700 bg-indigo-50/30 p-2 text-[11px] rounded-lg border border-indigo-100/40 leading-relaxed">
                          {project.solution[language]}
                        </p>
                      </div>

                      {/* Server speeds technical stack specs list */}
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5 font-mono text-[10.5px] shadow-inner">
                        <div className="flex justify-between border-b border-slate-200 pb-1.5 text-[9px] text-[#059669] font-bold">
                          <span>{t('projects.technicalAnalysis')}</span>
                          <span>{t('projects.stableRuntime')}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 font-semibold">
                          <span>{t('projects.packageSize')}</span>
                          <span className="text-slate-800 font-bold">{project.specs.bundleSize}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 font-semibold">
                          <span>{t('projects.loadTimeLabel')}</span>
                          <span className="text-emerald-700 font-bold">{project.specs.loadTime}</span>
                        </div>
                        <div className="flex justify-between text-slate-500 font-semibold">
                          <span>{t('projects.serverLatencyLabel')}</span>
                          <span className="text-emerald-700 font-bold">{project.specs.serverLatency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons triggers */}
                <div className="p-6 bg-white border-t border-slate-200 grid grid-cols gap-3">
                  {/* Toggle solution case-study detail */}
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="flex items-center justify-center gap-1 bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-600 font-bold py-2.5 rounded-xl transition-all cursor-pointer text-xs"
                  >
                    <span>{t('projects.solutionBtn')}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Open live demo action trigger redirect in a new tab */}
                  {/* <button
                    onClick={() => handleOpenDemo(project.demoRef)}
                    className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl shadow-md cursor-pointer"
                  >
                    <span>{t('projects.openDemoBtn')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button> */}
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic client-hire guarantee block */}
        <div className="mt-16 bg-indigo-50/50 border border-indigo-100 p-8 rounded-3xl text-left flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto shadow-sm">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-indigo-900 font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              {t('projects.promoTitle')}
            </h3>
            <p className="text-xs text-indigo-950/80 leading-relaxed max-w-2xl font-medium">
              {t('projects.promoDesc')}
            </p>
          </div>

          <a
            href="#feedback-section"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-lg shadow-indigo-600/10 cursor-pointer whitespace-nowrap self-center shrink-0 uppercase tracking-wider"
          >
            {t('projects.promoCta')}
          </a>
        </div>

      </div>
    </section>
  );
}
