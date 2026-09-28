import React, { useState, useEffect } from 'react';
import { Feedback } from '../types';
import { Star, MessageSquare, Briefcase, Mail, Send, CheckCircle, Flame, User, RotateCcw, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FeedbackSectionProps {
  onFeedbackSubmitted: () => void;
  triggerRefresh: boolean;
}

export default function FeedbackSection({ onFeedbackSubmitted, triggerRefresh }: FeedbackSectionProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language, t } = useLanguage();
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [projectType, setProjectType] = useState('E-Commerce Platform');
  const [message, setMessage] = useState('');
  
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/feedbacks');
      if (res.ok) {
        const data = await res.json();
        setFeedbacks(data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [triggerRefresh]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg(t('feedback.validationMsg'));
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');
      const res = await fetch('/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          company,
          rating,
          projectType,
          message
        })
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        // Reset form
        setName('');
        setEmail('');
        setCompany('');
        setRating(5);
        setMessage('');
        fetchFeedbacks(); // Refresh review board list
        onFeedbackSubmitted(); // Callback for parent to sync dashboard
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || t('feedback.errorMsg'));
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setErrorMsg(t('feedback.networkErrorMsg'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate stats
  const averageRating = feedbacks.length > 0
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1)
    : '5.0';

  const ratingsCount = feedbacks.length;

  return (
    <section id="feedback-section" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-indigo-600" /> {t('feedback.tagline')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-800 animate-fade-in">
            {t('feedback.title')}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('feedback.desc')}
          </p>
        </div>

        {/* Dashboard Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {/* Stat 1 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-slate-800">{averageRating} / 5.0</div>
              <div className="text-xs text-slate-500 font-bold">{t('feedback.avgRating')}</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-slate-800">{ratingsCount}{t('feedback.totalReceivedUnit')}</div>
              <div className="text-xs text-slate-500 font-bold">{t('feedback.totalReceived')}</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 font-bold">{t('feedback.satisfaction')}</div>
            </div>
          </div>
        </div>

        {/* Double Column Layout: Form & Testimonials list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* LEFT: Live Interactive Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl relative shadow-md">
            <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-indigo-700 bg-indigo-50 rounded-bl-2xl rounded-tr-3xl border-l border-b border-slate-200 font-bold">
              SECURE REST API
            </div>

            <h3 className="text-lg font-bold font-display text-slate-800 mb-6 flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-600" />
              {t('feedback.formTitle')}
            </h3>

            {submittedSuccess ? (
              <div className="text-center py-8 space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100/50 border border-emerald-500/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-slate-800">{t('feedback.submitSuccessTitle')}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed px-4">
                    {t('feedback.submitSuccessDesc')}
                  </p>
                </div>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t('feedback.submitAgain')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Banner */}
                {errorMsg && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600" htmlFor="review-name">{t('feedback.nameLabel')} <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      id="review-name"
                      type="text"
                      placeholder={t('feedback.namePlaceholder')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Grid Email / Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-600" htmlFor="review-email">{t('feedback.emailLabel')} <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        id="review-email"
                        type="email"
                        placeholder={t('feedback.emailPlaceholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:bg-white transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-600" htmlFor="review-company">{t('feedback.companyLabel')}</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        id="review-company"
                        type="text"
                        placeholder={t('feedback.companyPlaceholder')}
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating selection: Stars */}
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-600">{t('feedback.ratingLabel')} <span className="text-rose-500">*</span></span>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(null)}
                        className="p-1 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 transition-transform hover:scale-110 ${
                            star <= (hoveredStar ?? rating) 
                              ? 'text-amber-500 fill-amber-500 saturate-150' 
                              : 'text-slate-200 fill-slate-100'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-amber-600 ml-2">
                       {rating}/5 {t('feedback.ratingUnit')}
                    </span>
                  </div>
                </div>

                {/* Project Model */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600" htmlFor="review-project">{t('feedback.projectLabel')}</label>
                  <select
                    id="review-project"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-semibold animate-fade-in"
                  >
                    <option value="E-Commerce Platform">{t('feedback.projectOption1')}</option>
                    <option value="SaaS & Enterprise Data Portal">{t('feedback.projectOption2')}</option>
                    <option value="Productivity & Project Management Tool">{t('feedback.projectOption3')}</option>
                    <option value="Landing Page Optimized">{t('feedback.projectOption4')}</option>
                    <option value="Custom API / Backend Project">{t('feedback.projectOption5')}</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600" htmlFor="review-message">{t('feedback.messageLabel')} <span className="text-rose-500">*</span></label>
                  <textarea
                    id="review-message"
                    rows={4}
                    placeholder={t('feedback.messagePlaceholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:bg-white transition-all leading-relaxed"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{t('feedback.submittingBtn')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('feedback.submitBtn')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Live Feed Testimonials board */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-xs text-slate-600 font-mono flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-indigo-600" /> {t('feedback.realtimeTitle').replace('{count}', feedbacks.length.toString())}
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{t('feedback.autoUpdate')}</span>
            </div>

            {isLoading ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-8 h-8 border-3 border-indigo-100 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-slate-500 font-mono">{t('feedback.fetching')}</p>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white shadow-xs">
                <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-mono">{t('feedback.emptyMsg')}</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
                {feedbacks.map((fb) => (
                  <div 
                    key={fb.id}
                    className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 hover:border-indigo-300 hover:shadow-md transition-all duration-300 animate-fade-in shadow-sm"
                  >
                    {/* Header: user info and score */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                          {fb.name}
                          {fb.status === 'completed' && (
                            <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-100 font-bold">
                              {t('feedback.contractSigned')}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                          {fb.company ? `${fb.company}` : t('feedback.freelancer')}
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < fb.rating ? 'fill-amber-500 text-amber-500 saturate-150' : 'text-slate-200 fill-slate-50'}`} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* Feedback content */}
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{fb.message}"
                    </p>

                    {/* Bottom stats stack metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                      <div>
                        {t('feedback.interestProject')}
                        <span className="text-indigo-600 font-bold">{fb.projectType}</span>
                      </div>
                      <div className="font-medium text-slate-400">
                        {new Date(fb.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
