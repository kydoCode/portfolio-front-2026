'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import educationData from '@/data/education_full.json';
import experienceData from '@/data/experience.json';
import BurgerMenu from '@/components/BurgerMenu';
import BubbleBackground from '@/components/BubbleBackground';
import Cursor from '@/components/Cursor';

export default function CoreClient() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#050a12] text-white overflow-x-hidden" style={{ cursor: isMobile ? 'auto' : 'none' }}>
      <BubbleBackground />
      {!isMobile && <Cursor />}

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-[100] flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
        aria-label="Menu"
      >
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      <BurgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} currentPage="core" />

      <div className="fixed top-6 left-6 text-3xl md:text-4xl font-black z-50 cursor-pointer" onClick={() => router.push('/')}>S.</div>

      {!isMobile && (
        <div className="fixed right-10 top-1/2 -translate-y-1/2 text-cyan-500 text-[0.7rem] font-mono tracking-[4px] [writing-mode:vertical-rl] border-r border-cyan-500 pr-2.5 z-50 whitespace-nowrap">
          COORD: 43.52N // DEPTH: -2500M
        </div>
      )}

      <section className="h-[50vh] md:h-screen flex flex-col justify-center items-center relative px-6">
        <span className="text-xs tracking-[6px] md:tracking-[10px] text-cyan-500 uppercase mb-4 opacity-80">Core Protocol</span>
        <h1 className="text-[14vw] md:text-[12vw] leading-[0.85] uppercase text-center font-bold">
          SILENT<br />SYSTEM
        </h1>
        <div className="mt-4 text-xs text-cyan-500/50 font-mono">&gt; CONFIGURING_CORE_ASSETS...</div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {[
            { num: '1 // Intellect Asset', title: 'Furtivité Sémantique', desc: "L'expertise littéraire appliquée à la robustesse des systèmes.", rotate: 'rotateY(12deg) rotateX(8deg)' },
            { num: '2 // CyberOps SOC', title: 'Robustesse Abyssale', desc: 'Monitoring furtif et défense périmétrique résiliente.', rotate: 'rotateY(-12deg) rotateX(8deg)' },
          ].map((card) => (
            <div
              key={card.num}
              className="h-[280px] md:h-[420px] group"
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
              onMouseLeave={(e) => {
                if (isMobile) return;
                const inner = e.currentTarget.querySelector('.card-inner') as HTMLElement;
                if (inner) inner.style.transform = card.rotate;
              }}
            >
              <div className="card-inner h-full transition-transform duration-300" style={{ transformStyle: 'preserve-3d', transform: isMobile ? 'none' : card.rotate }}>
                <div className="card-content relative h-full border border-white/10 rounded-[24px] md:rounded-[32px] p-8 md:p-14 bg-white/[0.02] backdrop-blur-xl flex flex-col justify-end overflow-hidden transition-all group-hover:border-cyan-500 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(0,245,255,0.18)_0%,transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <span className="text-[0.65rem] text-cyan-500 tracking-[3px] mb-3 uppercase relative z-10">{card.num}</span>
                  <h3 className="text-2xl md:text-[2.4rem] font-bold mb-3 relative z-10">{card.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed relative z-10">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          <div>
            <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">Formation_Module</h2>
            <div className="relative pl-6 md:pl-8 border-l-2 border-cyan-500/30">
              {educationData.education.slice(0, 5).map((edu, i) => (
                <div key={i} className="relative mb-6 md:mb-8 group pl-3 md:pl-4">
                  <div className="absolute -left-[13px] w-5 h-5 md:w-6 md:h-6 bg-cyan-500 rounded-full border-4 border-[#050a12] group-hover:scale-125 transition-transform z-10" />
                  <span className="text-xs text-cyan-500 block mb-1">{edu.annees.join(' - ')}</span>
                  <h3 className="text-base md:text-lg font-bold group-hover:text-cyan-400 transition-colors">{edu.intitule}</h3>
                  <p className="text-xs opacity-70">{edu.etablissement}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">Mission_History</h2>
            <div className="space-y-4 md:space-y-6">
              {experienceData.experience.slice(0, 3).map((exp, i) => (
                <div key={i} className="border border-cyan-500/20 p-4 md:p-6 hover:bg-white/[0.01] hover:border-cyan-500 transition-all">
                  <span className="text-xs text-cyan-500">{exp.annees.join(' - ')}</span>
                  <h3 className="text-base md:text-lg font-bold uppercase mt-2">{exp.poste}</h3>
                  {'entreprise' in exp && <span className="text-sm opacity-50">{exp.entreprise as string}</span>}
                  <ul className="mt-3 space-y-1">
                    {exp.details.slice(0, 2).map((detail, j) => (
                      <li key={j} className="text-xs opacity-70 before:content-['>_'] before:text-cyan-500 before:mr-2">
                        {detail.replace(/<[^>]*>/g, '')}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-black/50 border border-cyan-500/30 p-4 md:p-6 font-mono text-xs mb-16 md:mb-20">
          <div className="text-cyan-500">&gt; CONFIGURING_CORE_ASSETS...</div>
          <div className="text-green-500">&gt; EDUCATION_MODULE: LOADED</div>
          <div className="text-green-500">&gt; EXPERIENCE_MODULE: LOADED</div>
          <div className="text-cyan-500 animate-pulse">&gt; SYSTEM_READY_</div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
          <button onClick={() => router.push('/')} className="border border-cyan-500/50 text-cyan-500/50 px-6 md:px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all">
            ← HOME
          </button>
          <button onClick={() => router.push('/capabilities')} className="border border-cyan-500 text-cyan-500 px-8 md:px-12 py-3 md:py-4 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all">
            NEXT: CAPABILITIES →
          </button>
        </div>
      </section>
    </div>
  );
}
