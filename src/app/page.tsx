'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setDepth(Math.floor((e.clientY / window.innerHeight) * 500));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-[#050a12] text-white" style={{ backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.15) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      
      <div className="fixed right-12 top-1/2 -translate-y-1/2 text-cyan-500 text-sm font-mono tracking-[5px] [writing-mode:vertical-rl] border-r-2 border-cyan-500 pr-4 z-50">
        STATUS: SCANNING // DEPTH: {depth}M
      </div>

      <div 
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ background: `radial-gradient(circle 320px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(5, 10, 18, 0.98) 100%)` }}
      />

      <div 
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] shadow-[0_0_25px_#00F5FF]"
        style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
      />

      <section className="h-screen flex flex-col justify-center items-center relative z-[9999]">
        <span className="text-sm tracking-[12px] text-cyan-500 uppercase mb-8 opacity-80">Strategic Intelligence</span>
        <h1 className="text-[12vw] leading-[0.8] uppercase text-center tracking-[-5px] font-bold">
          SILENT<br/>SYSTEM
        </h1>
        <button 
          onClick={() => router.push('/core')}
          className="mt-20 px-16 py-6 bg-transparent border border-cyan-500 text-cyan-500 uppercase tracking-[5px] text-lg rounded-sm transition-all hover:bg-cyan-500 hover:text-[#050a12] hover:shadow-[0_0_50px_#00F5FF] hover:scale-105"
        >
          Démarrer l'immersion
        </button>
      </section>
    </div>
  );
}
