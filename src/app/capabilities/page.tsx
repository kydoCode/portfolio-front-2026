'use client';

import { useRouter } from 'next/navigation';
import projectsData from '@/data/projects.json';

export default function SystemCapabilities() {
  const router = useRouter();

  const techStack = [
    { category: 'Frontend', skills: ['React', 'Next.js 16', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
    { category: 'Backend', skills: ['Node.js', 'PostgreSQL', 'Prisma', 'API REST', 'Django'] },
    { category: 'DevOps', skills: ['Git', 'Docker', 'Vercel', 'CI/CD', 'GitHub Actions'] },
    { category: 'Mobile', skills: ['Swift', 'SwiftUI', 'iOS Development'] },
    { category: 'Tools', skills: ['VS Code', 'Figma', 'Postman', 'Notion'] },
    { category: 'Cyber', skills: ['OWASP', 'Sécurité Web', 'Audit', 'RGPD'] }
  ];

  return (
    <div className="min-h-screen bg-[#050a12] text-white p-8 cursor-none" style={{ backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      
      <button 
        onClick={() => router.push('/core')}
        className="fixed top-8 left-8 text-cyan-500 text-xs tracking-widest hover:text-white transition-colors z-50"
      >
        ← CORE_PROCESSOR
      </button>

      <div className="max-w-7xl mx-auto pt-20">
        
        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative mb-10">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            03 // SYSTEM_CAPABILITIES
          </span>
          
          <h2 className="text-4xl font-bold uppercase mb-8">Technical_Arsenal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, i) => (
              <div key={i} className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 hover:bg-cyan-500/10 transition-all">
                <h3 className="text-sm uppercase mb-3 text-cyan-500">{tech.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.skills.map((skill, j) => (
                    <span key={j} className="text-xs opacity-70 bg-cyan-500/10 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            04 // PROJECT_ARCHIVE
          </span>
          
          <h2 className="text-4xl font-bold uppercase mb-8">Mission_Logs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.projets.map((project, i) => (
              <div key={i} className="border border-cyan-500/20 p-6 hover:border-cyan-500/50 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg uppercase font-bold group-hover:text-cyan-500 transition-colors">
                    {project.nom}
                  </h3>
                  <span className="text-xs text-cyan-500/50">{project.year}</span>
                </div>
                <p className="text-xs opacity-70 mb-4">{project.context}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="text-xs bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-xs opacity-50">{project.role}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => router.push('/projects')}
            className="mt-8 border border-cyan-500 text-cyan-500 px-6 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            VIEW_ALL_PROJECTS
          </button>
        </section>

      </div>

      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => router.push('/core')}
            className="border border-cyan-500/50 text-cyan-500/50 px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all"
          >
            ← CORE
          </button>
          <button 
            onClick={() => router.push('/peripheral')}
            className="border border-cyan-500/50 text-cyan-500/50 px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all"
          >
            NEXT: PERIPHERAL →
          </button>
        </div>
      </div>
    </div>
  );
}
