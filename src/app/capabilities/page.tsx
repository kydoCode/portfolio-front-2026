'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import projectsData from '@/data/projects.json';
import BurgerMenu from '@/components/BurgerMenu';

export default function SystemCapabilities() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [menuOpen]);

  const techStack = [
    { name: 'React/TypeScript', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'PostgreSQL', level: 70 },
    { name: 'Docker', level: 65 },
    { name: 'Swift/iOS', level: 60 }
  ];

  const certifications = [
    { name: 'DWWM', status: 'CRITICAL', year: 2025 },
    { name: 'Apple Foundation', status: 'NORMAL', year: 2023 }
  ];

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

      <BurgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} currentPage="capabilities" />

      <button 
        onClick={() => router.push('/core')}
        className="fixed top-8 left-8 text-cyan-500 text-xs tracking-widest hover:text-white transition-colors z-50"
      >
        ← CORE
      </button>

      <section className="max-w-[1400px] mx-auto px-8 py-20">
        
        {/* PROGRESS BARS SKILLS */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold uppercase mb-8 text-cyan-500">Technical_Stack</h2>
          <div className="space-y-6">
            {techStack.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{skill.name}</span>
                  <span className="text-sm text-cyan-500">{skill.level}%</span>
                </div>
                <div className="h-2 bg-cyan-500/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 shadow-[0_0_10px_#00F5FF] transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BADGES CERTIFICATIONS */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold uppercase mb-8 text-cyan-500">Certifications</h2>
          <div className="flex gap-4">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`px-4 py-2 border text-xs rounded ${
                  cert.status === 'CRITICAL' 
                    ? 'bg-red-500/20 border-red-500 text-red-500' 
                    : 'bg-cyan-500/20 border-cyan-500 text-cyan-500'
                }`}>
                  {cert.status}
                </span>
                <div>
                  <div className="text-sm font-bold">{cert.name}</div>
                  <div className="text-xs opacity-50">{cert.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GRILLE PROJETS AVEC SPOTLIGHT */}
        <div>
          <h2 className="text-2xl font-bold uppercase mb-8 text-cyan-500">Project_Archive</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.projets.map((project, i) => (
              <div 
                key={i}
                className="relative border border-cyan-500/20 p-6 bg-white/[0.03] hover:border-cyan-500/50 transition-all cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,255,0.18)_0%,transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold uppercase mb-2">{project.nom}</h3>
                  <p className="text-xs opacity-70 mb-4">{project.context}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, j) => (
                      <span key={j} className="text-xs bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="mt-20 flex justify-center gap-4">
          <button 
            onClick={() => router.push('/core')}
            className="border border-cyan-500/50 text-cyan-500/50 px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all"
          >
            ← CORE
          </button>
          <button 
            onClick={() => router.push('/peripheral')}
            className="border border-cyan-500 text-cyan-500 px-12 py-4 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            NEXT: PERIPHERAL →
          </button>
        </div>
      </section>

      {/* MODALE DATA TRANSFER */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="border border-cyan-500 bg-[#050a12] p-8 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[scan_2s_linear_infinite]" />
            <h3 className="text-2xl font-bold uppercase mb-6">DATA_TRANSFER // {selectedProject.nom}</h3>
            <div className="space-y-4 text-sm">
              <div><span className="text-cyan-500">CONTEXT:</span> {selectedProject.context}</div>
              <div><span className="text-cyan-500">ROLE:</span> {selectedProject.role}</div>
              <div><span className="text-cyan-500">YEAR:</span> {selectedProject.year}</div>
              <div>
                <span className="text-cyan-500">TOOLS:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProject.technologies.map((tech: string, i: number) => (
                    <span key={i} className="text-xs bg-cyan-500/20 px-2 py-1 rounded">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setSelectedProject(null)}
              className="mt-6 border border-cyan-500 text-cyan-500 px-6 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
