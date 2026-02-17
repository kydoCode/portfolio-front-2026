'use client';

import { useRouter } from 'next/navigation';
import educationData from '@/data/education_full.json';
import experienceData from '@/data/experience.json';

export default function SystemCore() {
  const router = useRouter();
  const topEducation = educationData.education.slice(0, 3);
  const topExperience = experienceData.experience.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050a12] text-white p-[4vw] cursor-crosshair overflow-x-hidden" style={{ backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      
      <button 
        onClick={() => router.push('/')}
        className="fixed top-8 left-8 text-cyan-500 text-xs tracking-widest hover:text-white transition-colors z-50"
      >
        ← RETOUR_SYSTÈME
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 max-w-[1400px] mx-auto pt-20">
        
        {/* CORE PROCESSOR */}
        <div className="border border-cyan-500/20 p-12 bg-white/[0.03] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 animate-[scan_4s_linear_infinite]" />
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            01 // CORE_PROCESSOR
          </span>
          
          <div className="mb-8">
            <span className="text-cyan-500 text-xs tracking-[3px] block mb-2">[SYSTEM_STABLE // ORIGIN: ENS_LYON]</span>
            <h2 className="text-4xl font-bold uppercase leading-none">Intellectual_Foundation</h2>
          </div>

          <p className="text-sm opacity-80 mb-8 leading-relaxed">
            Utilisation des structures de pensée complexes pour l'ingénierie logicielle et la cybersécurité. 
            L'analyse textuelle comme précurseur de l'analyse de code.
          </p>

          <div className="space-y-8">
            {topEducation.map((edu, i) => (
              <div key={i} className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6">
                <h3 className="text-sm uppercase mb-2">{edu.intitule}</h3>
                <p className="text-xs opacity-80 leading-relaxed">
                  {edu.etablissement} • {edu.annees.join(' - ')}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 mt-8">
            <h3 className="text-sm uppercase mb-2">Capacité de Synthèse</h3>
            <p className="text-xs opacity-80 leading-relaxed">
              Extraction de structures logiques à partir de volumes de données massifs.
            </p>
          </div>

          <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 mt-8">
            <h3 className="text-sm uppercase mb-2">Architecture Critique</h3>
            <p className="text-xs opacity-80 leading-relaxed">
              Approche rigoureuse de la documentation et de la modélisation système.
            </p>
          </div>
        </div>

        {/* MISSION HISTORY */}
        <div className="border border-cyan-500/20 p-12 bg-white/[0.03] relative">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            02 // MISSION_HISTORY
          </span>
          
          <div className="space-y-10">
            {topExperience.map((exp, i) => (
              <div key={i} className="relative">
                <span className="text-xs text-cyan-500 block mb-2">{exp.annees.join(' - ')}</span>
                <h3 className="text-lg uppercase font-bold">{exp.poste}</h3>
                <span className="text-sm opacity-50 block mb-4">{exp.entreprise}</span>
                <ul className="space-y-1">
                  {exp.details.slice(0, 2).map((detail, j) => (
                    <li key={j} className="text-xs opacity-70 before:content-['>_'] before:text-cyan-500 before:mr-2">
                      {detail.replace(/<[^>]*>/g, '')}
                    </li>
                  ))}
                </ul>
                {i === 0 && (
                  <button 
                    onClick={() => router.push('#')}
                    className="mt-4 bg-transparent border border-cyan-500 text-cyan-500 px-6 py-3 text-xs tracking-[2px] hover:bg-cyan-500 hover:text-[#050a12] transition-all"
                  >
                    READ_FULL_LOG
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto mt-10 flex justify-center">
        <button 
          onClick={() => router.push('/capabilities')}
          className="border border-cyan-500/50 text-cyan-500/50 px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all"
        >
          NEXT: CAPABILITIES →
        </button>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: -5%; }
          100% { top: 105%; }
        }
      `}</style>
    </div>
  );
}
