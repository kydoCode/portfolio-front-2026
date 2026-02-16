export default function SystemCore() {
  return (
    <div className="min-h-screen bg-[#050a12] text-white p-8" style={{ backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
        
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
            Utilisation des structures de pensée complexes pour l'ingénierie logicielle et la cybersécurité. 
            L'analyse textuelle comme précurseur de l'analyse de code.
          </p>

          <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 mb-6">
            <h3 className="text-sm uppercase mb-2">Capacité de Synthèse</h3>
            <p className="text-xs opacity-70">Extraction de structures logiques à partir de volumes de données massifs.</p>
          </div>

          <div className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6">
            <h3 className="text-sm uppercase mb-2">Architecture Critique</h3>
            <p className="text-xs opacity-70">Approche rigoureuse de la documentation et de la modélisation système.</p>
          </div>
        </section>

        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            02 // MISSION_HISTORY
          </span>
          
          <div className="mb-10">
            <span className="text-xs text-cyan-500 block mb-2">2023 - PRESENT</span>
            <h3 className="text-lg uppercase font-bold">Lead_Data_Architect</h3>
            <span className="text-xs opacity-50 block mb-4">PROJECT_SILENT_SYSTEM</span>
            <ul className="text-xs opacity-70 space-y-1">
              <li className="before:content-['>_'] before:text-cyan-500">Design de l'interface utilisateur immersive</li>
              <li className="before:content-['>_'] before:text-cyan-500">Optimisation des schémas Prisma & PostgreSQL</li>
            </ul>
            <button className="mt-4 border border-cyan-500 text-cyan-500 px-6 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all">
              READ_FULL_LOG
            </button>
          </div>

          <div>
            <span className="text-xs text-cyan-500 block mb-2">2021 - 2023</span>
            <h3 className="text-lg uppercase font-bold">Systems_Analyst</h3>
            <span className="text-xs opacity-50 block mb-4">ENS_RESEARCH_HUB</span>
            <ul className="text-xs opacity-70 space-y-1">
              <li className="before:content-['>_'] before:text-cyan-500">Structuration de bases de connaissances</li>
              <li className="before:content-['>_'] before:text-cyan-500">Protocoles de transmission sécurisés</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
