'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import educationData from '@/data/education_full.json';
import experienceData from '@/data/experience.json';

export default function SystemCore() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050a12] text-white overflow-x-hidden" style={{ backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.15) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      
      {/* BURGER MENU */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-8 right-8 z-[100] flex flex-col gap-1.5 w-8 h-8 justify-center items-center group"
      >
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/95 z-[99] flex flex-col justify-center items-center gap-8">
          <button onClick={() => { router.push('/'); setMenuOpen(false); }} className="text-2xl text-cyan-500 hover:text-white transition-colors tracking-widest">HOME</button>
          <button onClick={() => setMenuOpen(false)} className="text-2xl text-white tracking-widest">CORE</button>
          <button onClick={() => { router.push('/capabilities'); setMenuOpen(false); }} className="text-2xl text-cyan-500 hover:text-white transition-colors tracking-widest">CAPABILITIES</button>
          <button onClick={() => { router.push('/peripheral'); setMenuOpen(false); }} className="text-2xl text-cyan-500 hover:text-white transition-colors tracking-widest">PERIPHERAL</button>
        </div>
      )}

      <button 
        onClick={() => router.push('/')}
        className="fixed top-8 left-8 text-cyan-500 text-xs tracking-widest hover:text-white transition-colors z-50"
      >
        ← HOME
      </button>

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center relative">
        <span className="text-xs tracking-[10px] text-cyan-500 uppercase mb-4 opacity-80">Core Protocol</span>
        <h1 className="text-[12vw] leading-[0.85] uppercase text-center font-bold">
          SILENT<br/>SYSTEM
        </h1>
        <div className="mt-4 text-xs text-cyan-500/50 font-mono">&gt; CONFIGURING_CORE_ASSETS...</div>
      </section>

      <section className="max-w-[1400px] mx-auto px-8 pb-20">
        
        {/* 3D CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="relative h-[420px] group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full border border-cyan-500/30 group-hover:border-cyan-500 p-8 bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.3)]">
              <span className="text-xs text-cyan-500 tracking-widest">1 // Intellect Asset</span>
              <h3 className="text-3xl font-bold mt-4 mb-4 group-hover:text-cyan-400 transition-colors">Furtivité Sémantique</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                L'expertise littéraire appliquée à la robustesse des systèmes. 
                Analyse textuelle comme précurseur de l'analyse de code.
              </p>
              <div className="absolute bottom-8 left-8 text-xs text-cyan-500/50 group-hover:text-cyan-500 transition-colors">ENS LYON // MASTER</div>
            </div>
          </div>

          <div className="relative h-[420px] group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full border border-cyan-500/30 group-hover:border-cyan-500 p-8 bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.3)]">
              <span className="text-xs text-cyan-500 tracking-widest">2 // CyberOps SOC</span>
              <h3 className="text-3xl font-bold mt-4 mb-4 group-hover:text-cyan-400 transition-colors">Robustesse Abyssale</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Monitoring furtif et défense périmétrique résiliente. 
                Architecture sécurisée et tests de pénétration.
              </p>
              <div className="absolute bottom-8 left-8 text-xs text-cyan-500/50 group-hover:text-cyan-500 transition-colors">LA PLATEFORME_ // DWWM</div>
            </div>
          </div>
        </div>

        {/* FORMATION + EXPERIENCE CÔTE À CÔTE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          <div>
            <h2 className="text-2xl font-bold uppercase mb-8 text-cyan-500">Formation_Module</h2>
            <div className="relative pl-8 border-l-2 border-cyan-500/30">
              {educationData.education.slice(0, 5).map((edu, i) => (
                <div key={i} className="relative mb-8 group">
                  <div className="absolute -left-[13px] w-6 h-6 bg-cyan-500 rounded-full border-4 border-[#050a12] group-hover:scale-125 transition-transform" />
                  <span className="text-xs text-cyan-500">{edu.annees.join(' - ')}</span>
                  <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">{edu.intitule}</h3>
                  <p className="text-xs opacity-70">{edu.etablissement}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold uppercase mb-8 text-cyan-500">Mission_History</h2>
            <div className="space-y-6">
              {experienceData.experience.slice(0, 3).map((exp, i) => (
                <div key={i} className="border border-cyan-500/20 p-6 bg-white/[0.03] hover:border-cyan-500/50 hover:bg-white/[0.05] transition-all">
                  <span className="text-xs text-cyan-500">{exp.annees.join(' - ')}</span>
                  <h3 className="text-lg font-bold uppercase mt-2">{exp.poste}</h3>
                  <span className="text-sm opacity-50">{exp.entreprise}</span>
                  <ul className="mt-4 space-y-2">
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

        {/* SYSTEM LOG */}
        <div className="bg-black/50 border border-cyan-500/30 p-6 font-mono text-xs mb-20">
          <div className="text-cyan-500">&gt; CONFIGURING_CORE_ASSETS...</div>
          <div className="text-green-500">&gt; EDUCATION_MODULE: LOADED</div>
          <div className="text-green-500">&gt; EXPERIENCE_MODULE: LOADED</div>
          <div className="text-cyan-500 animate-pulse">&gt; SYSTEM_READY_</div>
        </div>

        {/* NAVIGATION */}
        <div className="mt-20 flex justify-center">
          <button 
            onClick={() => router.push('/capabilities')}
            className="border border-cyan-500 text-cyan-500 px-12 py-4 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            NEXT: CAPABILITIES →
          </button>
        </div>
      </section>
    </div>
  );
}
