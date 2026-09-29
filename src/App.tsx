/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProjectsShowcase from './components/ProjectsShowcase';
// import FeedbackSection from './components/FeedbackSection';
import AdminDashboard from './components/AdminDashboard';
import DemoSpecHeader from './components/DemoSpecHeader';

// Static projects data
import { projectsData } from './data/projectsData';

// Interactive Demopage files
import GlowStoreDemo from './demos/GlowStoreDemo';
import ApexMetricsDemo from './demos/ApexMetricsDemo';
import TaskFlowDemo from './demos/TaskFlowDemo';

import { Terminal, Shield, Mail, Phone, ChevronUp, Check, Briefcase, Award } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeSection, setActiveSection] = useState('home');
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminRefreshTrigger, setAdminRefreshTrigger] = useState(false);
  const [feedbackRefreshTrigger, setFeedbackRefreshTrigger] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { t } = useLanguage();

  // Monitor path changes for tab redirect
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Monitor scrolling to highlight navbar links and show scroll-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      const about = document.getElementById('about-section');
      const skills = document.getElementById('skills-section');
      const projects = document.getElementById('projects-section');
      // const feedback = document.getElementById('feedback-section');

      const scrollPos = window.scrollY + 200;

      if (projects && scrollPos >= projects.offsetTop) {
        setActiveSection('projects');
      } else if (skills && scrollPos >= skills.offsetTop) {
        setActiveSection('skills');
      } else if (about && scrollPos >= about.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleOpenAdminConsole = () => {
    setShowAdmin(!showAdmin);
    if (!showAdmin) {
      // Scroll down to the Admin board
      setTimeout(() => {
        document.getElementById('admin-anchor')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const syncAdminBoard = () => {
    setAdminRefreshTrigger(!adminRefreshTrigger);
  };

  const syncFeedbackSection = () => {
    setFeedbackRefreshTrigger(!feedbackRefreshTrigger);
  };

  // 1. ROUTE INTERCEPTOR FOR DIRECT TAB DEMOS
  if (currentPath === '/demo/glow') {
    const glowProject = projectsData.find(p => p.id === 'glowstore')!;
    return (
      <div className="flex flex-col min-h-screen">
        <DemoSpecHeader project={glowProject} />
        <div className="flex-1">
          <GlowStoreDemo />
        </div>
      </div>
    );
  }

  if (currentPath === '/demo/apex') {
    const apexProject = projectsData.find(p => p.id === 'apexmetrics')!;
    return (
      <div className="flex flex-col min-h-screen">
        <DemoSpecHeader project={apexProject} />
        <div className="flex-1">
          <ApexMetricsDemo />
        </div>
      </div>
    );
  }

  if (currentPath === '/demo/taskflow') {
    const taskflowProject = projectsData.find(p => p.id === 'taskflow')!;
    return (
      <div className="flex flex-col min-h-screen">
        <DemoSpecHeader project={taskflowProject} />
        <div className="flex-1">
          <TaskFlowDemo />
        </div>
      </div>
    );
  }

  // 2. ROOT PORTFOLIO RENDER LAYOUT
  return (
    <div className="min-h-screen flex flex-col bg-[#0c0f17] text-slate-100 overflow-x-clip selection:bg-indigo-600 selection:text-white">
      {/* Fixed top Navbar */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={navigateToSection} 
        onOpenAdmin={handleOpenAdminConsole} 
      />

      {/* Main Core sections */}
      <main className="flex-grow">
        {/* Hero Segment */}
        <Hero onLearnMore={navigateToSection} />

        {/* Detailed introductory About segment (About Section) */}
        <section id="about-section" className="py-20 border-b border-slate-200 bg-white shadow-xs scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Picture/Aesthetic Representation */}
              <div className="relative flex justify-center items-center">
                <div className="absolute w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl"></div>
                <div className="space-y-4 max-w-md bg-slate-50 p-6 rounded-3xl border border-slate-200 text-left relative z-10 shadow-md">
                  {/* Floating badge */}
                  <div className="absolute -top-3.5 -right-3.5 bg-gradient-to-tr from-amber-500 to-indigo-600 p-2.5 rounded-2xl text-white shadow-md transform rotate-6">
                    <Award className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-800">{t('about.quoteTitle')}</h3>
                  <div className="h-0.5 w-10 bg-indigo-600 rounded"></div>
                  
                  <blockquote className="text-xs text-slate-600 leading-relaxed italic pt-2">
                    "{t('about.quote')}"
                  </blockquote>

                  <div className="space-y-2.5 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Check className="w-4 h-4 text-indigo-600 font-bold" />
                      <span>{t('about.check1')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Check className="w-4 h-4 text-indigo-600 font-bold" />
                      <span>{t('about.check2')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Check className="w-4 h-4 text-indigo-600 font-bold" />
                      <span>{t('about.check3')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text specifications and bio details */}
              <div className="space-y-6 text-left">
                <div className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-indigo-500" /> {t('about.tagline')}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-800">
                  {t('about.title')}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {t('about.desc')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{t('about.card1Title')}</h4>
                    <p className="text-xs text-slate-500 mt-1">{t('about.card1Desc')}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{t('about.card2Title')}</h4>
                    <p className="text-xs text-slate-500 mt-1">{t('about.card2Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical skills segment block */}
        <Skills />

        {/* 3 sample web showcase segment block */}
        <ProjectsShowcase />

        {/* Recruiter CRM status board widget */}
        <div id="admin-anchor">
          {showAdmin && (
            <AdminDashboard 
              onClosed={() => setShowAdmin(false)} 
              triggerRefresh={adminRefreshTrigger} 
              onDbModified={syncFeedbackSection} 
            />
          )}
        </div>

        {/* Dynamic Client feedback section (Temporarily disabled) */}
        {/* <FeedbackSection 
          onFeedbackSubmitted={syncAdminBoard} 
          triggerRefresh={feedbackRefreshTrigger} 
        /> */}
      </main>

      {/* Sleek footer section */}
      <footer className="bg-[#080b13] border-t border-slate-900 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-start">
            {/* Left col */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Terminal className="w-4.5 h-4.5" />
                </div>
                <span className="font-display font-bold text-white text-base tracking-wide">HƯNG LÊ WEB PORTFOLIO</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Mid col: Core details summary */}
            <div className="space-y-2">
              <h4 className="text-white font-bold font-mono text-[10px] tracking-wider uppercase">{t('footer.servicesTitle')}</h4>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li>• {t('footer.service1')}</li>
                <li>• {t('footer.service2')}</li>
                <li>• {t('footer.service3')}</li>
                <li>• {t('footer.service4')}</li>
              </ul>
            </div>

            {/* Right col: Contact parameters */}
            <div className="space-y-2.5">
              <h4 className="text-white font-bold font-mono text-[10px] tracking-wider uppercase">{t('footer.contactTitle')}</h4>
              <div className="space-y-1 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('footer.hotline')}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>hungle692002@gmail.com</span>
                </div>
                <p className="text-[10px] text-slate-500 pt-1">
                  {t('footer.meetup')}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px]">
            <div>
              Hưng Lê © {new Date().getFullYear()}. Crafted visually with React & Tailwind CSS. All rights reserved.
            </div>
            <div className="flex gap-4">
              <span className="text-emerald-400 hover:underline cursor-none">Node: v22 LTS</span>
              <span className="text-indigo-400 hover:underline cursor-none">React 19 Core</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Scroll Top element */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all text-center cursor-pointer"
        >
          <ChevronUp className="w-5 h-5 animate-bounce" />
        </button>
      )}

    </div>
  );
}

