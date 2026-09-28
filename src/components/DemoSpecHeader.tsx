import React, { useState } from 'react';
import { Project } from '../types';
import { ChevronLeft, Zap, Server, Shield, Sparkles, BookOpen, Layers } from 'lucide-react';

interface DemoSpecHeaderProps {
  project: Project;
}

export default function DemoSpecHeader({ project }: DemoSpecHeaderProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleBackToPortfolio = () => {
    window.location.href = '/';
  };

  return (
    <div className="z-50 bg-white border-b border-slate-200 text-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Button to go back */}
        <button
          onClick={handleBackToPortfolio}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-800 px-3 py-1.5 rounded-lg text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-505"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Về Trang Portfolio</span>
        </button>

        {/* Center: Specs Pill */}
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono font-bold text-slate-600">
            DEMO CHẠY THỰC TẾ: <span className="text-emerald-700 font-bold uppercase">{project.id}</span>
          </span>
        </div>

        {/* Action Toggle Info */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-indigo-600 hover:text-indigo-700 font-bold underline cursor-pointer"
        >
          {isOpen ? 'Thu gọn thông số kỹ thuật' : 'Xem thông số kỹ thuật & giải pháp'}
        </button>
      </div>

      {isOpen && (
        <div className="bg-slate-50 border-t border-slate-200 px-4 py-5 animate-fade-in">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Project info, category */}
            <div className="lg:col-span-4 space-y-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{project.category}</span>
                <h2 className="text-xl font-bold font-display tracking-tight text-slate-800 mt-1">{project.title}</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-semibold">{project.shortDesc}</p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-white text-indigo-700 border border-slate-200 px-2 py-0.5 rounded font-bold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4 text-sm">
              <div className="bg-rose-50/50 p-3 rounded-lg border border-rose-100">
                <div className="flex items-center gap-1.5 text-rose-700 font-bold mb-1">
                  <span className="text-xs">⚠️</span> YÊU CẦU / BÀI TOÁN
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">{project.problem}</p>
              </div>

              <div className="bg-indigo-50/20 p-3 rounded-lg border border-indigo-100">
                <div className="flex items-center gap-1.5 text-indigo-700 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  GIẢI PHÁP TỐI ƯU CỦA TÔI
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Lighthouse performance metrics & Server speed stats */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex flex-col justify-between h-full shadow-xs">
                <span className="text-[11px] font-mono text-indigo-600 flex items-center gap-1 font-bold">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> CHỈ SỐ LIGHTHOUSE (SEO/PERF)
                </span>
                
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center p-1 bg-slate-50 border border-slate-100 rounded">
                    <div className="text-emerald-600 font-bold text-base">{project.specs.lighthousePerformance}</div>
                    <div className="text-[9px] text-slate-500 font-medium">Perf</div>
                  </div>
                  <div className="text-center p-1 bg-slate-50 border border-slate-100 rounded">
                    <div className="text-emerald-600 font-bold text-base">{project.specs.lighthouseSeo}</div>
                    <div className="text-[9px] text-slate-500 font-medium">SEO</div>
                  </div>
                  <div className="text-center p-1 bg-slate-50 border border-slate-100 rounded">
                    <div className="text-emerald-600 font-bold text-base">{project.specs.lighthouseBestPractices}</div>
                    <div className="text-[9px] text-slate-500 font-medium">Best</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600 font-mono mt-3 pt-2.5 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Load:</span>
                    <span className="text-slate-800 font-bold">{project.specs.loadTime}</span>
                  </div>
                  <div className="flex justify-between pl-2">
                    <span className="text-slate-500 font-medium">Latency:</span>
                    <span className="text-emerald-600 font-bold">{project.specs.serverLatency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
