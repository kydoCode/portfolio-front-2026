'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Hobby } from '@prisma/client';
import { useUnderwaterSound } from '@/hooks/useUnderwaterSound';
import BurgerMenu from '@/components/BurgerMenu';
import BubbleBackground from '@/components/BubbleBackground';
import Cursor from '@/components/Cursor';

interface Props {
  hobbies: Hobby[];
}

export default function PeripheralClient({ hobbies }: Props) {
  const router = useRouter();
  const [sonarActive, setSonarActive] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const { play } = useUnderwaterSound();
  const visibleHobbies = hobbies;

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [menuOpen]);

  const handleSonarClick = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setSendError('> CHAMPS_INCOMPLETS');
      return;
    }
    setSending(true);
    setSendError('');
    setSonarActive(true);
    play('sonar');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setMessageSent(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSendError('> TRANSMISSION_FAILED — réessaie ou contacte directement par email');
    } finally {
      setSending(false);
      setTimeout(() => setSonarActive(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#050a12] text-white overflow-x-hidden" style={{ cursor: isMobile ? 'auto' : 'none' }}>
      <BubbleBackground />
      {!isMobile && <Cursor />}

      {/* BURGER TRIGGER */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-[100] flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
        aria-label="Menu"
      >
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      <BurgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} currentPage="peripheral" />

      <button
        onClick={() => router.push('/capabilities')}
        className="fixed top-6 left-6 text-cyan-500 text-xs tracking-widest hover:text-white transition-colors z-50"
      >
        ← CAPABILITIES
      </button>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 pt-24">

        {/* HOBBIES */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">{t('peripheral.hobbiesTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {visibleHobbies.map((hobby) => (
              <div key={hobby.id} className="border border-cyan-500/20 p-4 md:p-6 hover:bg-white/[0.01] hover:border-cyan-500 transition-all">
                <h3 className="text-xs md:text-sm uppercase mb-2 md:mb-3 text-cyan-500">{hobby.name}</h3>
                <p className="text-xs opacity-70">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FORMULAIRE TERMINAL */}
        <div className="bg-black/50 border border-cyan-500/30 p-6 md:p-8 font-mono">
          <div className="text-cyan-500 mb-6 text-sm">&gt; {t('peripheral.contactTitle')}</div>

          <div className="relative mb-6">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="peer w-full bg-transparent border-b-2 border-cyan-500/30 text-white px-2 py-3 focus:border-cyan-500 outline-none transition-all text-sm"
              placeholder=" "
            />
            <label className="absolute left-2 top-3 text-cyan-500/50 text-xs transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-[:not(:placeholder-shown)]:-top-4">
              &gt; {t('peripheral.labelName')}
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="peer w-full bg-transparent border-b-2 border-cyan-500/30 text-white px-2 py-3 focus:border-cyan-500 outline-none transition-all text-sm"
              placeholder=" "
            />
            <label className="absolute left-2 top-3 text-cyan-500/50 text-xs transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-[:not(:placeholder-shown)]:-top-4">
              &gt; {t('peripheral.labelEmail')}
            </label>
          </div>

          <div className="relative mb-6">
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="peer w-full bg-transparent border border-cyan-500/30 text-white p-3 focus:border-cyan-500 outline-none transition-all text-sm resize-none"
              rows={4}
              placeholder=" "
            />
            <label className="absolute left-3 top-3 text-cyan-500/50 text-xs transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:bg-[#050a12] peer-[:not(:placeholder-shown)]:px-2">
              &gt; {t('peripheral.labelMessage')}
            </label>
          </div>

          <button
            onClick={handleSonarClick}
            disabled={sending}
            className="relative overflow-hidden border border-cyan-500 text-cyan-500 px-8 md:px-12 py-3 md:py-4 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            <span className="relative z-10">{sending ? t('peripheral.sending') : t('peripheral.send')}</span>
            {sonarActive && (
              <div className="absolute inset-0 bg-cyan-500 animate-[implode_0.6s_ease-out]" />
            )}
          </button>

          {messageSent && (
            <div className="mt-4 text-green-500 text-xs font-mono">
              &gt; {t('peripheral.successMsg')}
            </div>
          )}
          {sendError && (
            <div className="mt-4 text-red-400 text-xs font-mono">{sendError === '> CHAMPS_INCOMPLETS' ? `> ${t('peripheral.errorIncomplete').replace('> ','')}` : `> ${t('peripheral.errorFailed').replace('> ','')}`}</div>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
          <button
            onClick={() => router.push('/capabilities')}
            className="border border-cyan-500/50 text-cyan-500/50 px-6 md:px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all"
          >
            {t('peripheral.prevPage')}
          </button>
          <button
            onClick={() => router.push('/')}
            className="border border-cyan-500 text-cyan-500 px-8 md:px-12 py-3 md:py-4 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            {t('peripheral.backHome')}
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes implode { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }
      `}</style>
    </div>
  );
}
