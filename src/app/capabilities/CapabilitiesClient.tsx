'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Project, Certification, Skill } from '@prisma/client';

type Localized = Record<string, unknown>;
function loc<T>(obj: Localized, field: string, lang: string): T {
  const val = obj[`${field}_${lang}`];
  return (val ?? obj[field]) as T;
}
import { useUnderwaterSound } from '@/hooks/useUnderwaterSound';
import BurgerMenu from '@/components/BurgerMenu';
import BubbleBackground from '@/components/BubbleBackground';
import Cursor from '@/components/Cursor';

interface Props {
  projects: Project[];
  certifications: Certification[];
  skills: Skill[];
}

const STATE_CONFIG: Record<string, { label: string; color: string }> = {
  ACTIVE:  { label: 'CERTIFIÉ',   color: 'text-green-400 border-green-400 bg-green-400/10' },
  PENDING: { label: 'EN COURS',   color: 'text-yellow-400 border-yellow-400 bg-yellow-400/10' },
  EXPIRED: { label: 'EXPIRÉ',     color: 'text-white/30 border-white/20 bg-white/5' },
};

export default function CapabilitiesClient({ projects, certifications, skills }: Props) {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = ['en', 'de', 'zh'].includes(i18n.language) ? i18n.language : 'fr';
  const { play } = useUnderwaterSound();

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
        else if (selectedCert) setSelectedCert(null);
        else if (menuOpen) setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [menuOpen, selectedProject, selectedCert]);

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

        {/* SKILLS — groupés par catégorie depuis DB */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">{t('capabilities.skillsTitle')}</h2>
          <div className="space-y-6">
            {Object.entries(
              skills.reduce<Record<string, Skill[]>>((acc, s) => {
                if (!acc[s.category]) acc[s.category] = [];
                acc[s.category].push(s);
                return acc;
              }, {})
            ).map(([category, items]) => (
              <div key={category}>
                <span className="text-xs text-cyan-500/60 tracking-[3px] uppercase mb-3 block">{category}</span>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill.id} className="text-xs border border-cyan-500/20 text-white/70 px-3 py-1">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold uppercase mb-6 md:mb-8 text-cyan-500">{t('capabilities.certificationsTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert) => {
              const stateConf = STATE_CONFIG[(cert as unknown as { state: string }).state] ?? STATE_CONFIG.ACTIVE;
              return (
                <div
                  key={cert.id}
                  className="border border-cyan-500/20 p-4 cursor-pointer hover:border-cyan-500 transition-colors group"
                  onClick={() => { setSelectedCert(cert); play('bubble'); }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-sm font-bold leading-tight group-hover:text-cyan-400 transition-colors">{cert.nom}</h3>
                    <span className={`text-[0.6rem] px-2 py-0.5 border rounded whitespace-nowrap flex-shrink-0 ${stateConf.color}`}>
                      {stateConf.label}
                    </span>
                  </div>
                  <p className="text-xs opacity-50 mb-3">{cert.organisme}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cyan-500">{new Date(cert.date).getFullYear()}</span>
                    <span className="text-xs text-cyan-500/40 tracking-widest">→ DÉTAILS</span>
                  </div>
                </div>
              );
            })}
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
                onClick={() => { setSelectedProject(project); play('bubble'); }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,245,255,0.18)_0%,transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10">
                  {project.featured && (
                    <span className="text-[0.6rem] text-orange-400 border border-orange-400/50 px-2 py-0.5 rounded mb-2 inline-block tracking-widest">FEATURED</span>
                  )}
                  <h3 className="text-base md:text-xl font-bold uppercase mb-2">{project.name}</h3>
                  <p className="text-xs opacity-70 mb-3 line-clamp-2">{loc<string>(project as Localized, 'context', lang) ?? loc<string>(project as Localized, 'description', lang)}</p>
                  <div className="flex flex-wrap gap-1.5">
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

      {/* MODALE CERTIF */}
      {selectedCert && (() => {
        const stateConf = STATE_CONFIG[(selectedCert as unknown as { state: string }).state] ?? STATE_CONFIG.ACTIVE;
        return (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedCert(null)}>
            <div
              className="border border-cyan-500 bg-[#050a12] p-6 md:p-8 max-w-md w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[scan_2s_linear_infinite]" />
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-base md:text-xl font-bold uppercase leading-tight pr-4">{selectedCert.nom}</h3>
                <span className={`text-[0.6rem] px-2 py-0.5 border rounded whitespace-nowrap flex-shrink-0 mt-1 ${stateConf.color}`}>{stateConf.label}</span>
              </div>
              <p className="text-xs text-cyan-500/60 mb-2 tracking-widest">{selectedCert.organisme}</p>
              <p className="text-xs text-white/40 mb-4">{new Date(selectedCert.date).getFullYear()}</p>
              {selectedCert.description && <p className="text-xs opacity-70 mb-4 leading-relaxed">{selectedCert.description}</p>}
              <div className="flex gap-4 pt-4 border-t border-cyan-500/20">
                {selectedCert.url ? (
                  <a href={selectedCert.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-500 hover:text-white transition-colors tracking-widest">
                    → {t('core.verify')}
                  </a>
                ) : (
                  <span className="text-xs text-white/20 tracking-widest">→ VÉRIFICATION N/A</span>
                )}
              </div>
              <button onClick={() => setSelectedCert(null)} className="mt-6 border border-cyan-500 text-cyan-500 px-6 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all">
                {t('capabilities.modalClose')}
              </button>
            </div>
          </div>
        );
      })()}

      {/* MODALE PROJET — fix scroll + github + demo toujours présents */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedProject(null)}>
          <div
            className="border border-cyan-500 bg-[#050a12] p-6 md:p-8 max-w-2xl w-full relative overflow-y-auto overflow-x-hidden"
            style={{ maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[scan_2s_linear_infinite]" />

            <h3 className="text-lg md:text-2xl font-bold uppercase mb-6 pr-8">
              DATA_TRANSFER // {selectedProject.name}
            </h3>

            <div className="space-y-4 text-sm">
              {loc<string>(selectedProject as Localized, 'context', lang) && (
                <div>
                  <span className="text-cyan-500 text-xs tracking-widest">{t('capabilities.modalContext')}</span>
                  <p className="mt-1 opacity-80 text-sm leading-relaxed">{loc<string>(selectedProject as Localized, 'context', lang)}</p>
                </div>
              )}

              <div>
                <span className="text-cyan-500 text-xs tracking-widest">{t('capabilities.modalTools')}</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="text-xs bg-cyan-500/20 border border-cyan-500/30 px-2 py-1 rounded">{tech}</span>
                  ))}
                </div>
              </div>

              {loc<string[]>(selectedProject as Localized, 'learnings', lang).length > 0 && (
                <div>
                  <span className="text-cyan-500 text-xs tracking-widest">{t('capabilities.modalHighlights')}</span>
                  <ul className="mt-2 space-y-1">
                    {loc<string[]>(selectedProject as Localized, 'learnings', lang).map((h, i) => (
                      <li key={i} className="text-xs opacity-70 before:content-['>_'] before:text-cyan-500 before:mr-2">{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* LIENS — toujours affichés */}
              <div className="flex gap-4 pt-2 border-t border-cyan-500/20">
                {selectedProject.githubUrl ? (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-500 hover:text-white transition-colors tracking-widest">
                    {t('capabilities.modalGithub')}
                  </a>
                ) : (
                  <span className="text-xs text-white/20 tracking-widest">→ GITHUB N/A</span>
                )}
                {selectedProject.liveUrl ? (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-500 hover:text-white transition-colors tracking-widest">
                    {t('capabilities.modalDemo')}
                  </a>
                ) : (
                  <span className="text-xs text-white/20 tracking-widest">→ DEMO N/A</span>
                )}
              </div>
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
