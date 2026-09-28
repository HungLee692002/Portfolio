import React, { useState, useEffect } from 'react';
import { Feedback } from '../types';
import { Mail, Phone, Calendar, RefreshCcw, Building, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AdminDashboardProps {
  onClosed: () => void;
  triggerRefresh: boolean;
  onDbModified: () => void;
}

export default function AdminDashboard({ onClosed, triggerRefresh, onDbModified }: AdminDashboardProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'contacted' | 'completed'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const { language, t } = useLanguage();

  const fetchAdminData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/feedbacks');
      if (res.ok) {
        const data = await res.json();
        setFeedbacks(data);
      }
    } catch (e) {
      console.error('Error fetching admin details:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [triggerRefresh]);

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'contacted' | 'completed') => {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/feedbacks/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        fetchAdminData();
        onDbModified(); // Signal root to sync main feeds
      }
    } catch (error) {
      console.error('Error updating feedback status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleResetDb = async () => {
    if (!window.confirm(t('admin.resetConfirm'))) {
      return;
    }
    
    try {
      setResetting(true);
      const res = await fetch('/api/feedbacks/reset', { method: 'POST' });
      if (res.ok) {
        fetchAdminData();
        onDbModified();
      }
    } catch (error) {
      console.error('Error resetting databases:', error);
    } finally {
      setResetting(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter((fb) => {
    if (activeTab === 'all') return true;
    return fb.status === activeTab;
  });

  // Calculate quick values
  const countPending = feedbacks.filter((f) => f.status === 'pending').length;
  const countContacted = feedbacks.filter((f) => f.status === 'contacted').length;
  const countCompleted = feedbacks.filter((f) => f.status === 'completed').length;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative animate-fade-in my-10 max-w-6xl mx-auto">
      {/* Ribbon */}
      <div className="absolute top-0 left-12 transform -translate-y-1/2 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white font-mono font-bold text-[10px] tracking-widest px-4 py-1 rounded-full shadow-md border border-indigo-950/20">
        {t('admin.tagline')}
      </div>

      {/* Header Admin */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
        <div className="space-y-1.5 text-left">
          <h3 className="text-xl font-bold font-display text-slate-805 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            {t('admin.title')}
          </h3>
          <p className="text-xs text-slate-605">
            {t('admin.desc')}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Reset Demo Database button */}
          <button
            onClick={handleResetDb}
            disabled={resetting}
            className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-red-300 hover:bg-red-50 text-xs font-bold text-slate-600 hover:text-red-700 py-2 px-3 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-xs"
          >
            {resetting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCcw className="w-3.5 h-3.5" />
            )}
            <span>{t('admin.resetBtn')}</span>
          </button>

          {/* Close admin */}
          <button
            onClick={onClosed}
            className="bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-700 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            {t('admin.closeBtn')}
          </button>
        </div>
      </div>

      {/* Stats Counter Rows */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide font-bold">{t('admin.statPending')}</div>
          <div className="text-2xl font-bold font-display text-rose-600 mt-1">{countPending}</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide font-bold">{t('admin.statContacted')}</div>
          <div className="text-2xl font-bold font-display text-sky-600 mt-1">{countContacted}</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide font-bold">{t('admin.statCompleted')}</div>
          <div className="text-2xl font-bold font-display text-emerald-600 mt-1">{countCompleted}</div>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left w-full">
          <div className="text-[10px] font-mono text-indigo-605 uppercase tracking-wide font-bold">{t('admin.statSuccessRate')}</div>
          <div className="text-2xl font-bold font-display text-indigo-600 mt-1">
            {feedbacks.length > 0 ? `${Math.round((countCompleted / feedbacks.length) * 100)}%` : '0%'}
          </div>
        </div>
      </div>

      {/* Tabs list for filter */}
      <div className="flex border-b border-slate-200 gap-1.5 mb-4 text-xs font-bold pb-px overflow-x-auto text-left">
        {(['all', 'pending', 'contacted', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2.5 px-4 translate-y-px border-b-2 font-mono tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab
                ? 'border-indigo-600 text-indigo-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab === 'all' && t('admin.tabAll').replace('{count}', feedbacks.length.toString())}
            {tab === 'pending' && t('admin.tabPending').replace('{count}', countPending.toString())}
            {tab === 'contacted' && t('admin.tabContacted').replace('{count}', countContacted.toString())}
            {tab === 'completed' && t('admin.tabCompleted').replace('{count}', countCompleted.toString())}
          </button>
        ))}
      </div>

      {/* Live Table */}
      {isLoading ? (
        <div className="py-12 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <span className="text-xs text-slate-500 font-mono">{t('admin.loadingText')}</span>
        </div>
      ) : filteredFeedbacks.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50">
          <p className="text-xs text-slate-500 font-mono">{t('admin.emptyTable')}</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-mono text-slate-500 uppercase text-[10px] tracking-wide">
                <th className="p-4 font-bold">{t('admin.thClient')}</th>
                <th className="p-4 font-bold">{t('admin.thDetails')}</th>
                <th className="p-4 font-bold">{t('admin.thMessage')}</th>
                <th className="p-4 font-bold text-center">{t('admin.thRating')}</th>
                <th className="p-4 font-bold text-center">{t('admin.thStatus')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFeedbacks.map((fb) => (
                <tr key={fb.id} className="hover:bg-slate-50/40 transition-all">
                  
                  {/* Customer info */}
                  <td className="p-4 space-y-1.5 min-w-[180px]">
                    <div className="font-bold text-slate-800 text-sm">{fb.name}</div>
                    <div className="space-y-0.5 text-slate-500 font-semibold">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-indigo-600" />
                        <span className="font-mono">{fb.email}</span>
                      </div>
                      {fb.company && (
                        <div className="flex items-center gap-1 text-[11px]">
                          <Building className="w-3 h-3 text-slate-400" />
                          <span>{fb.company}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Built request type */}
                  <td className="p-4 min-w-[150px]">
                    <div className="font-bold text-indigo-600">{fb.projectType}</div>
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] font-mono mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(fb.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}</span>
                    </div>
                  </td>

                  {/* Text statement */}
                  <td className="p-4 min-w-[280px] max-w-[400px]">
                    <p className="text-slate-600 leading-relaxed line-clamp-3 italic">
                      "{fb.message}"
                    </p>
                  </td>

                  {/* Rating display */}
                  <td className="p-4 text-center">
                    <span className="inline-block bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded font-mono font-bold">
                      {fb.rating}★
                    </span>
                  </td>

                  {/* Drop-in Status Actions */}
                  <td className="p-4 min-w-[200px]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* Status Pills */}
                        {fb.status === 'pending' && (
                          <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-100 font-bold uppercase text-[9px] tracking-wide">
                            {t('admin.statusPending')}
                          </span>
                        )}
                        {fb.status === 'contacted' && (
                          <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-100 font-bold uppercase text-[9px] tracking-wide">
                            {t('admin.statusContacted')}
                          </span>
                        )}
                        {fb.status === 'completed' && (
                          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 font-bold uppercase text-[9px] tracking-wide">
                            {t('admin.statusCompleted')}
                          </span>
                        )}
                      </div>

                      {/* Drop-in Status Actions to update */}
                      <div className="flex gap-1.5">
                        {fb.status !== 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(fb.id, 'pending')}
                            disabled={updatingId === fb.id}
                            className="bg-slate-50 hover:bg-slate-100 text-[10px] font-mono text-slate-600 hover:text-slate-800 px-2 py-1 rounded border border-slate-200 transition-all cursor-pointer font-bold shadow-xs"
                          >
                            {t('admin.btnNew')}
                          </button>
                        )}
                        {fb.status !== 'contacted' && (
                          <button
                            onClick={() => handleUpdateStatus(fb.id, 'contacted')}
                            disabled={updatingId === fb.id}
                            className="bg-slate-50 hover:bg-sky-50 text-[10px] font-mono text-slate-600 hover:text-sky-700 px-2 py-1 rounded border border-slate-200 hover:border-sky-205 transition-all cursor-pointer font-bold shadow-xs"
                          >
                            {t('admin.btnConsulting')}
                          </button>
                        )}
                        {fb.status !== 'completed' && (
                          <button
                            onClick={() => handleUpdateStatus(fb.id, 'completed')}
                            disabled={updatingId === fb.id}
                            className="bg-slate-50 hover:bg-emerald-50 text-[10px] font-mono text-slate-600 hover:text-emerald-700 px-2 py-1 rounded border border-slate-200 hover:border-emerald-205 transition-all cursor-pointer font-bold shadow-xs"
                          >
                            {t('admin.btnSigned')}
                          </button>
                        )}
                      </div>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
