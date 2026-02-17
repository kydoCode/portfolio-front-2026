'use client';

import { useRouter } from 'next/navigation';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education_full.json';

export default function SystemCore() {
  const router = useRouter();
  const latestExperiences = experienceData.experience.slice(0, 3);
  const latestEducation = educationData.education.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050a12] text-white p-8 cursor-none" style={{ backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      
      <button 
        onClick={() => router.push('/')}
        className="fixed top-8 left-8 text-cyan-500 text-xs tracking-widest hover:text-white transition-colors z-50"
      >
        ← RETOUR_SYSTÈME
      </button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 pt-20">
        
        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 animate-[scan_4s_linear_infinite]" />
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            01 // CORE_PROCESSOR
          </span>
          
          <div className="mb-8">
            <p className="text-xs text-cyan-500 tracking-widest mb-2">[SYSTEM_STABLE // ORIGIN: ENS_LYON]</p>
            <h2 className="text-4xl font-bold uppercase">Intellectual_Foundation</h2>
          </div>

          <p className="text-sm opacity-80 mb-8">
            Formation pluridisciplinaire combinant sciences humaines (ENS Lyon, Master Études germaniques) 
            et ingénierie logicielle (DWWM, Apple Foundation Program). Approche analytique appliquée 
            au développement web et à la cybersécurité.
          </p>

          <div className="space-y-4 mb-8">
            {latestEducation.map((edu, i) => (
              <div key={i} className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6">
                <h3 className="text-sm uppercase mb-2">{edu.intitule}</h3>
                <p className="text-xs opacity-70">{edu.etablissement} • {edu.annees.join(' - ')}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => router.push('/education')}
            className="border border-cyan-500 text-cyan-500 px-6 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            VOIR_PARCOURS_COMPLET
          </button>
        </section>

        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            02 // MISSION_HISTORY
          </span>
          
          <h2 className="text-2xl font-bold uppercase mb-8">Expériences_Terrain</h2>

          <div className="space-y-8">
            {latestExperiences.map((exp, i) => (
              <div key={i}>
                <span className="text-xs text-cyan-500 block mb-2">{exp.annees.join(' - ')}</span>
                <h3 className="text-lg uppercase font-bold">{exp.poste}</h3>
                <span className="text-xs opacity-50 block mb-4">{exp.entreprise}</span>
                <ul className="text-xs opacity-70 space-y-1">
                  {exp.details.slice(0, 2).map((detail, j) => (
                    <li key={j} className="before:content-['>_'] before:text-cyan-500">
                      {detail.replace(/<[^>]*>/g, '')}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button 
            onClick={() => router.push('/experience')}
            className="mt-8 border border-cyan-500 text-cyan-500 px-6 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            READ_FULL_LOG
          </button>
        </section>

      </div>

      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => router.push('/capabilities')}
            className="border border-cyan-500/50 text-cyan-500/50 px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all"
          >
            NEXT: CAPABILITIES →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
