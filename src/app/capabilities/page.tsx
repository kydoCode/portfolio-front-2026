export default function SystemCapabilities() {
  return (
    <div className="min-h-screen bg-[#050a12] text-white p-8" style={{ backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      <div className="max-w-7xl mx-auto">
        
        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative mb-10">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            03 // SYSTEM_CAPABILITIES
          </span>
          
          <h2 className="text-4xl font-bold uppercase mb-8">Technical_Arsenal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6">
              <h3 className="text-sm uppercase mb-2">Frontend</h3>
              <p className="text-xs opacity-70">React, Next.js, TypeScript, Tailwind CSS</p>
            </div>
            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6">
              <h3 className="text-sm uppercase mb-2">Backend</h3>
              <p className="text-xs opacity-70">Node.js, PostgreSQL, Prisma, API REST</p>
            </div>
            <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6">
              <h3 className="text-sm uppercase mb-2">DevOps</h3>
              <p className="text-xs opacity-70">Git, Docker, Vercel, CI/CD</p>
            </div>
          </div>
        </section>

        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            04 // PROJECT_ARCHIVE
          </span>
          
          <h2 className="text-4xl font-bold uppercase mb-8">Mission_Logs</h2>
          
          <div className="space-y-6">
            <div className="border border-cyan-500/20 p-6">
              <h3 className="text-lg uppercase font-bold mb-2">Portfolio 2026</h3>
              <p className="text-xs opacity-70 mb-4">Next.js 16 + React 19 + TypeScript + Neon DB</p>
              <button className="border border-cyan-500 text-cyan-500 px-4 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all">
                VIEW_PROJECT
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
