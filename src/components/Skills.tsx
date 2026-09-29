import React, { useState } from 'react';
import { Layers, Server, ShieldCheck, Cpu, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type TabType = 'frontend' | 'backend' | 'devops';

interface SkillItem {
  name: string;
  level: number; // 0-100
  desc: string;
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<TabType>('frontend');
  const { t } = useLanguage();

  const frontendSkills: SkillItem[] = [
    { name: t('skills.items.react.name'), level: 95, desc: t('skills.items.react.desc') },
    { name: t('skills.items.ts.name'), level: 90, desc: t('skills.items.ts.desc') },
    { name: t('skills.items.tailwind.name'), level: 96, desc: t('skills.items.tailwind.desc') },
    { name: t('skills.items.motion.name'), level: 88, desc: t('skills.items.motion.desc') }
  ];

  const backendSkills: SkillItem[] = [
    { name: t('skills.items.node.name'), level: 92, desc: t('skills.items.node.desc') },
    { name: t('skills.items.db.name'), level: 86, desc: t('skills.items.db.desc') },
    { name: t('skills.items.security.name'), level: 85, desc: t('skills.items.security.desc') }
  ];

  const devopsSkills: SkillItem[] = [
    { name: t('skills.items.lighthouse.name'), level: 98, desc: t('skills.items.lighthouse.desc') },
    { name: t('skills.items.git.name'), level: 90, desc: t('skills.items.git.desc') },
    { name: t('skills.items.seo.name'), level: 94, desc: t('skills.items.seo.desc') }
  ];

  const getSkillsByTab = () => {
    switch (activeTab) {
      case 'frontend': return frontendSkills;
      case 'backend': return backendSkills;
      case 'devops': return devopsSkills;
    }
  };

  const getTabIcon = (tab: TabType) => {
    switch (tab) {
      case 'frontend': return <Layers className="w-4 h-4" />;
      case 'backend': return <Server className="w-4 h-4" />;
      case 'devops': return <ShieldCheck className="w-4 h-4" />;
    }
  };

  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case 'frontend': return t('skills.tabs.frontend');
      case 'backend': return t('skills.tabs.backend');
      case 'devops': return t('skills.tabs.devops');
    }
  };

  return (
    <section id="skills-section" className="py-20 border-b border-slate-200 bg-slate-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Cpu className="w-4 h-4 text-indigo-600" /> {t('skills.techThinking')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-800">
            {t('skills.title')}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('skills.desc')}
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex justify-center p-1 bg-white rounded-xl border border-slate-200 shadow-sm max-w-xl mx-auto mb-10">
          {(['frontend', 'backend', 'devops'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center justify-center gap-2 flex-1 py-2.5 px-4 rounded-lg text-xs tracking-wide font-bold transition-all duration-200 uppercase cursor-pointer ${
                activeTab === tab 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
              }`}
            >
              {getTabIcon(tab)}
              <span>{getTabLabel(tab)}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto animate-fade-in" key={activeTab}>
          {getSkillsByTab().map((skill, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    {skill.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/60">
                    {skill.level}%
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  {skill.desc}
                </p>
              </div>

              {/* Progress Bar Container */}
              <div className="mt-5">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Assurance */}
        <div className="mt-14 max-w-3xl mx-auto bg-white border border-slate-200 shadow-sm rounded-2xl p-5 text-center flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="text-left space-y-1">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> {t('skills.bottomTitle')}
            </h4>
            <p className="text-xs text-slate-500">
              {t('skills.bottomDesc')}
            </p>
          </div>
          <div className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-lg font-mono tracking-wide uppercase self-center shrink-0 font-bold">
            {t('skills.bottomTag')}
          </div>
        </div>

      </div>
    </section>
  );
}
