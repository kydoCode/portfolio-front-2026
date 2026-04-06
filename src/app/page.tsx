'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Cursor from '@/components/Cursor';

export default function Home() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [depth, setDepth] = useState(0);
  const [glitchText, setGlitchText] = useState('SILENT');
  const [mounted, setMounted] = useState(false);
  const [torchActive, setTorchActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setDepth(Math.floor((e.clientY / window.innerHeight) * 500));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
      const randomGlitch = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      setGlitchText(randomGlitch);
      setTimeout(() => setGlitchText('SILENT'), 50);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div
      className="relative h-screen overflow-hidden bg-[#050a12] text-white"
      style={{
        cursor: isMobile ? 'auto' : 'none',
        backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.15) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}
    >
      {!isMobile && <Cursor />}

      {/* Indicateur latéral — desktop only */}
      {!isMobile && (
        <div className="fixed right-10 top-1/2 -translate-y-1/2 text-cyan-500 text-[0.7rem] font-mono tracking-[4px] [writing-mode:vertical-rl] border-r border-cyan-500 pr-2.5 z-50 whitespace-nowrap">
          STATUS: SCANNING // DEPTH: {depth}M
        </div>
      )}

      {/* Status top-left — desktop only */}
      {!isMobile && (
        <div className="fixed top-8 left-8 text-xs text-cyan-500/50 font-mono z-50">
          <div>SYSTEM_ID: SS-2026-ALPHA</div>
          {mounted && <div>UPTIME: {new Date().toLocaleTimeString()}</div>}
          <div className="mt-2 flex gap-2">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            <span>OPERATIONAL</span>
          </div>
        </div>
      )}

      {/* Effet torche — desktop only */}
      {torchActive && !isMobile && (
        <div
          className="fixed inset-0 pointer-events-none z-[9998]"
          style={{ background: `radial-gradient(circle 320px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(5, 10, 18, 0.98) 100%)` }}
        />
      )}

      <section className="h-screen flex flex-col justify-center items-center relative z-[9999] px-6 pt-16 md:pt-32">
        <span className="text-xs md:text-sm tracking-[6px] md:tracking-[12px] text-cyan-500 uppercase mb-6 md:mb-12 opacity-80 animate-[fadeIn_1s_ease-in] text-center">
          {t('landing.tagline')}
        </span>

        <h1
          className="text-[18vw] md:text-[12vw] leading-[0.85] uppercase text-center tracking-[-2px] md:tracking-[-5px] font-bold relative"
          onMouseEnter={() => !isMobile && setTorchActive(true)}
          onMouseLeave={() => !isMobile && setTorchActive(false)}
        >
          <span className="block animate-[slideDown_0.8s_ease-out]">{glitchText}</span>
          <span className="block animate-[slideUp_0.8s_ease-out_0.2s_both]">SYSTEM</span>
        </h1>

        <p className="mt-6 md:mt-8 text-xs md:text-sm text-cyan-500/70 max-w-xs md:max-w-md text-center tracking-wide animate-[fadeIn_1s_ease-in_0.5s_both]">
          {t('landing.subtitle')}
        </p>

        <button
          onClick={() => router.push('/core')}
          className="mt-10 md:mt-20 px-8 md:px-16 py-4 md:py-6 bg-transparent border border-cyan-500 text-cyan-500 uppercase tracking-[3px] md:tracking-[5px] text-sm md:text-lg rounded-sm transition-all hover:bg-cyan-500 hover:text-[#050a12] hover:shadow-[0_0_50px_#00F5FF] animate-[fadeIn_1s_ease-in_0.8s_both] relative overflow-hidden group flex items-center justify-center"
        >
          <span className="relative z-10">{t('landing.cta')}</span>
          <div className="absolute inset-0 bg-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </button>

        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-xs text-cyan-500/50 animate-[fadeIn_1s_ease-in_1s_both]">
          {['CORE_PROCESSOR', 'CAPABILITIES', 'PERIPHERAL_DATA'].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-cyan-500 rounded-full" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
