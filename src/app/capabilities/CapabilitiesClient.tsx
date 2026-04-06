'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Project, Certification, Skill } from '@prisma/client';
import BurgerMenu from '@/components/BurgerMenu';
import BubbleBackground from '@/components/BubbleBackground';
import Cursor from '@/components/Cursor';

interface Props {
  projects: Project[];
  certifications: Certification[];
  skills: Skill[];
}

export default function CapabilitiesClient({ projects, certifications, skills }: Props) {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        else if (menuOpen) setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [menuOpen, selectedProject]);

  const techStack = skills.length > 0
    ? skills.slice(0, 8).map((s, i) => ({ name: s.name, level: s.level || Math.max(60, 92 - i * 5) }))
    : [
        { name: 'React / Next.js', level: 88 },
        { name: 'TypeScript', level: 85 },
        { name: 'Node.js', level: 78 },
        { name: 'PostgreSQL / Prisma', level: 72 },
        { name: 'Swift / SwiftUI', level: 65 },
        { name: 'Tailwind CSS / UI Design', level: 90 },
      ];

  return (
    <div className="min-h-screen bg-[#050a12] text-white overflow-x-hidden" style={{ cursor: isMobile ? 'auto' : 'none' }}>
      <BubbleBackground />
      {!isMobile && <Cursor />}

      <button onClick={() => setMenuOpen(!menuOpen)} className="fixed top-6 right-6 z-[100] flex flex-col gap-1.5 w-8 h-8 justify-center items-center" aria-label="Menu">
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      <BurgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} currentPage="capabilities" />

      <button onClick={() => router.push('/core')} className="fixed top-6 left-6 text-cyan-500 text-xs tracking-widest hover:text-white transition-colors z-50">
        ← CORE
      </button>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20 pt-24">

        {/* SKILLS */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">{t('capabilities.skillsTitle')}</h2>
          <div className="space-y-4 md:space-y-6">
            {techStack.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-xs md:text-sm">{skill.name}</span>
                  <span className="text-xs md:text-sm text-cyan-500">{skill.level}%</span>
                </div>
                <div className="h-1.5 md:h-2 bg-cyan-500/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 shadow-[0_0_10px_#00F5FF] transition-all duration-1000" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">{t('capabilities.certificationsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="border border-cyan-500/20 p-4 hover:bg-white/[0.01] hover:border-cyan-500 transition-all">
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold">{cert.nom}</h3>
                    <p className="text-xs opacity-50 mt-1">{cert.organisme}</p>
                  </div>
                  <span className={`px-2 py-1 border text-xs rounded whitespace-nowrap flex-shrink-0 ${
                    cert.featured ? 'bg-orange-500/20 border-orange-500 text-orange-500' : 'bg-cyan-500/20 border-cyan-500 text-cyan-500'
                  }`}>
                    {cert.featured ? 'HIGH' : 'NORMAL'}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-cyan-500">{new Date(cert.date).getFullYear()}</span>
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-500 hover:text-white transition-colors">
                      Vérifier →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROJETS */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">{t('capabilities.projectsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative border border-cyan-500/20 p-4 md:p-6 hover:bg-white/[0.01] hover:border-cyan-500 transition-all cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,255,0.18)_0%,transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-base md:text-xl font-bold uppercase mb-2">{project.name}</h3>
                  <p className="text-xs opacity-70 mb-3 md:mb-4 line-clamp-2">{project.context ?? project.description}</p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.technologies.slice(0, 4).map((tech, j) => (
                      <span key={j} className="text-xs bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded">{tech}</span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs text-cyan-500/50">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="mt-16 md:mt-20 flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
          <button onClick={() => router.push('/core')} className="border border-cyan-500/50 text-cyan-500/50 px-6 md:px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all">
            {t('capabilities.prevPage')}
          </button>
          <button onClick={() => router.push('/peripheral')} className="border border-cyan-500 text-cyan-500 px-8 md:px-12 py-3 md:py-4 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all">
            {t('capabilities.nextPage')}
          </button>
        </div>
      </section>

      {/* MODALE */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedProject(null)}>
          <div className="border border-cyan-500 bg-[#050a12] p-6 md:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[scan_2s_linear_infinite]" />
            <h3 className="text-lg md:text-2xl font-bold uppercase mb-4 md:mb-6 pr-8">DATA_TRANSFER // {selectedProject.name}</h3>
            <div className="space-y-3 text-sm">
              {selectedProject.context && <div><span className="text-cyan-500">{t('capabilities.modalContext')}</span> <span className="opacity-80">{selectedProject.context}</span></div>}
              {selectedProject.liveUrl && <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="block text-cyan-500 hover:text-white text-xs tracking-widest transition-colors">{t('capabilities.modalDemo')}</a>}
              {selectedProject.githubUrl && <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="block text-cyan-500 hover:text-white text-xs tracking-widest transition-colors">{t('capabilities.modalGithub')}</a>}
              <div>
                <span className="text-cyan-500">{t('capabilities.modalTools')}</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="text-xs bg-cyan-500/20 px-2 py-1 rounded">{tech}</span>
                  ))}
                </div>
              </div>
              {selectedProject.learnings.length > 0 && (
                <div>
                  <span className="text-cyan-500">{t('capabilities.modalHighlights')}</span>
                  <ul className="mt-2 space-y-1">
                    {selectedProject.learnings.map((h, i) => (
                      <li key={i} className="text-xs opacity-70 before:content-['>_'] before:text-cyan-500 before:mr-2">{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button onClick={() => setSelectedProject(null)} className="mt-6 border border-cyan-500 text-cyan-500 px-6 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all">
              {t('capabilities.modalClose')}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}
