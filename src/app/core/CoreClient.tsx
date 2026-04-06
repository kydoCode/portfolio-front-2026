'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { Experience, Education, Certification } from '@prisma/client';
import BurgerMenu from '@/components/BurgerMenu';
import BubbleBackground from '@/components/BubbleBackground';
import Cursor from '@/components/Cursor';

interface Props {
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}

const STATE_CONFIG: Record<string, { label: string; color: string }> = {
  ACTIVE:  { label: 'CERTIFIÉ',  color: 'text-green-400 border-green-400 bg-green-400/10' },
  PENDING: { label: 'EN COURS',  color: 'text-yellow-400 border-yellow-400 bg-yellow-400/10' },
  EXPIRED: { label: 'EXPIRÉ',    color: 'text-white/30 border-white/20 bg-white/5' },
};

export default function CoreClient({ experience, education, certifications }: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllEdu, setShowAllEdu] = useState(false);
  const [showAllExp, setShowAllExp] = useState(false);
  const [depth, setDepth] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => setDepth(Math.floor((e.clientY / window.innerHeight) * 2500));
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && menuOpen) setMenuOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [menuOpen]);

  const playBubble = () => {
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(); osc.stop(ctx.currentTime + 0.15);
    } catch {}
  };

  const allEdu = education;
  const allExp = experience;
  const visibleEdu = showAllEdu ? allEdu : allEdu.slice(0, 5);
  const visibleExp = showAllExp ? allExp : allExp.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050a12] text-white overflow-x-hidden" style={{ cursor: isMobile ? 'auto' : 'none' }}>
      <BubbleBackground />
      {!isMobile && <Cursor />}

      <button onClick={() => setMenuOpen(!menuOpen)} className="fixed top-6 right-6 z-[100] flex flex-col gap-1.5 w-8 h-8 justify-center items-center" aria-label="Menu">
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      <BurgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} currentPage="core" />
      <div className="fixed top-6 left-6 text-3xl md:text-4xl font-black z-50 cursor-pointer" onClick={() => router.push('/')}>S.</div>

      {!isMobile && (
        <div className="fixed right-10 top-1/2 -translate-y-1/2 text-cyan-500 text-[0.7rem] font-mono tracking-[4px] [writing-mode:vertical-rl] border-r border-cyan-500 pr-2.5 z-50 whitespace-nowrap">
          COORD: 43.52N // DEPTH: -{depth}M
        </div>
      )}

      {/* HERO — fix mobile: hauteur auto, padding top pour éviter chevauchement avec nav */}
      <section className="flex flex-col justify-center items-center relative px-6 pt-24 pb-12 md:h-screen md:pt-0 md:pb-0">
        <span className="text-xs tracking-[6px] md:tracking-[10px] text-cyan-500 uppercase mb-4 opacity-80 text-center">{t('core.protocol')}</span>
        <h1 className="text-[clamp(3rem,14vw,10rem)] leading-[0.85] uppercase text-center font-bold">
          SILENT<br />SYSTEM
        </h1>
        <div className="mt-4 text-xs text-cyan-500/50 font-mono">&gt; {t('core.booting')}</div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20">

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {[
            { labelKey: 'core.card1Label', titleKey: 'core.card1Title', descKey: 'core.card1Desc', rotate: 'rotateY(12deg) rotateX(8deg)' },
            { labelKey: 'core.card2Label', titleKey: 'core.card2Title', descKey: 'core.card2Desc', rotate: 'rotateY(-12deg) rotateX(8deg)' },
          ].map((card) => (
            <div
              key={card.labelKey}
              className="h-[240px] md:h-[420px] group"
              style={{ perspective: '1200px' }}
              onMouseMove={(e) => {
                if (isMobile) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const inner = e.currentTarget.querySelector('.card-inner') as HTMLElement;
                const content = e.currentTarget.querySelector('.card-content') as HTMLElement;
                if (inner) inner.style.transform = `rotateX(${(rect.height / 2 - y) / 20}deg) rotateY(${(x - rect.width / 2) / 20}deg)`;
                if (content) { content.style.setProperty('--x', `${x}px`); content.style.setProperty('--y', `${y}px`); }
              }}
              onMouseEnter={playBubble}
              onMouseLeave={(e) => {
                if (isMobile) return;
                const inner = e.currentTarget.querySelector('.card-inner') as HTMLElement;
                if (inner) inner.style.transform = card.rotate;
              }}
            >
              <div className="card-inner h-full transition-transform duration-300" style={{ transformStyle: 'preserve-3d', transform: isMobile ? 'none' : card.rotate }}>
                <div className="card-content relative h-full border border-white/10 rounded-[20px] md:rounded-[32px] p-6 md:p-14 bg-white/[0.02] backdrop-blur-xl flex flex-col justify-end overflow-hidden transition-all group-hover:border-cyan-500 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(0,245,255,0.18)_0%,transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <span className="text-[0.65rem] text-cyan-500 tracking-[3px] mb-2 uppercase relative z-10">{t(card.labelKey)}</span>
                  <h3 className="text-xl md:text-[2.4rem] font-bold mb-2 relative z-10">{t(card.titleKey)}</h3>
                  <p className="text-xs md:text-sm opacity-70 leading-relaxed relative z-10">{t(card.descKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FORMATION + EXPERIENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          <div>
            <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">{t('core.formationTitle')}</h2>
            <div className="relative pl-6 md:pl-8 border-l-2 border-cyan-500/30">
              {visibleEdu.map((edu) => (
                <div key={edu.id} className="relative mb-6 group pl-3 md:pl-4">
                  <div className="absolute -left-[13px] w-5 h-5 md:w-6 md:h-6 bg-cyan-500 rounded-full border-4 border-[#050a12] group-hover:scale-125 transition-transform z-10" />
                  <span className="text-xs text-cyan-500 block mb-1">
                    {edu.annees && edu.annees.length > 0 ? edu.annees.join(' — ') : '—'}
                  </span>
                  {edu.url ? (
                    <a href={edu.url} target="_blank" rel="noopener noreferrer" onClick={playBubble}
                      className="text-base md:text-lg font-bold group-hover:text-cyan-400 transition-colors hover:underline underline-offset-2 block">
                      {edu.diplome}
                    </a>
                  ) : (
                    <h3 className="text-base md:text-lg font-bold group-hover:text-cyan-400 transition-colors">{edu.diplome}</h3>
                  )}
                  <p className="text-xs opacity-70">{edu.etablissement}</p>
                  {edu.mention && <span className="text-xs text-cyan-500/60 mt-1 block">Mention : {edu.mention}</span>}
                </div>
              ))}
            </div>
            {allEdu.length > 5 && (
              <button onClick={() => setShowAllEdu(!showAllEdu)} className="mt-4 text-xs text-cyan-500 tracking-widest hover:text-white transition-colors border border-cyan-500/30 px-4 py-2 hover:border-cyan-500">
                {showAllEdu ? t('core.seeLess') : `${t('core.seeAll')} (${allEdu.length} ${t('core.entries')})`}
              </button>
            )}
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">{t('core.experienceTitle')}</h2>
            <div className="space-y-4 md:space-y-6">
              {visibleExp.map((exp) => (
                <div key={exp.id} className="border border-cyan-500/20 p-4 md:p-6 hover:bg-white/[0.01] hover:border-cyan-500 transition-all">
                  <span className="text-xs text-cyan-500">{exp.annees.join(' — ')}</span>
                  <h3 className="text-base md:text-lg font-bold uppercase mt-2">{exp.poste}</h3>
                  {exp.entreprise && <span className="text-sm opacity-50">{exp.entreprise}</span>}
                  <ul className="mt-3 space-y-1">
                    {(exp.details as string[]).slice(0, 3).map((detail, j) => (
                      <li key={j} className="text-xs opacity-70 before:content-['>_'] before:text-cyan-500 before:mr-2">
                        {detail.replace(/<[^>]*>/g, '')}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {allExp.length > 3 && (
              <button onClick={() => setShowAllExp(!showAllExp)} className="mt-4 text-xs text-cyan-500 tracking-widest hover:text-white transition-colors border border-cyan-500/30 px-4 py-2 hover:border-cyan-500">
                {showAllExp ? t('core.seeLess') : `${t('core.seeAll')} (${allExp.length} ${t('core.posts')})`}
              </button>
            )}
          </div>
        </div>

        {/* CERTIFICATIONS avec state */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">{t('core.certificationsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert) => {
              const stateConf = STATE_CONFIG[(cert as unknown as { state: string }).state] ?? STATE_CONFIG.ACTIVE;
              return (
                <div key={cert.id} className="border border-cyan-500/20 p-4 md:p-5 hover:bg-white/[0.01] hover:border-cyan-500 transition-all">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-sm font-bold leading-tight">{cert.nom}</h3>
                    <span className={`text-[0.6rem] px-2 py-0.5 border rounded whitespace-nowrap flex-shrink-0 ${stateConf.color}`}>
                      {stateConf.label}
                    </span>
                  </div>
                  <p className="text-xs opacity-50 mb-3">{cert.organisme}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cyan-500">{new Date(cert.date).getFullYear()}</span>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-500 hover:text-white transition-colors">
                        {t('core.verify')}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SYSTEM LOG */}
        <div className="bg-black/50 border border-cyan-500/30 p-4 md:p-6 font-mono text-xs mb-16 md:mb-20">
          <div className="text-cyan-500">&gt; {t('core.booting')}</div>
          <div className="text-green-500">&gt; {t('core.logEducation')} ({allEdu.length})</div>
          <div className="text-green-500">&gt; {t('core.logExperience')} ({allExp.length})</div>
          <div className="text-green-500">&gt; {t('core.logCertifications')} ({certifications.length})</div>
          <div className="text-cyan-500 animate-pulse">&gt; {t('core.logReady')}</div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
          <button onClick={() => router.push('/')} className="border border-cyan-500/50 text-cyan-500/50 px-6 md:px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all">
            ← {t('nav.home')}
          </button>
          <button onClick={() => router.push('/capabilities')} className="border border-cyan-500 text-cyan-500 px-8 md:px-12 py-3 md:py-4 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all">
            {t('core.nextPage')}
          </button>
        </div>
      </section>
    </div>
  );
}
