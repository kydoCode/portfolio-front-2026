'use client';

import { useRouter } from 'next/navigation';
import hobbiesData from '@/data/hobbies.json';

export default function PeripheralData() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050a12] text-white p-8 cursor-none" style={{ backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      
      <button 
        onClick={() => router.push('/capabilities')}
        className="fixed top-8 left-8 text-cyan-500 text-xs tracking-widest hover:text-white transition-colors z-50"
      >
        ← CAPABILITIES
      </button>

      <div className="max-w-7xl mx-auto pt-20">
        
        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative mb-10">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            05 // PERIPHERAL_DATA
          </span>
          
          <h2 className="text-4xl font-bold uppercase mb-8">Beyond_Code</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hobbiesData.hobbies.map((hobby, i) => (
              <div key={i} className="bg-cyan-500/5 border-l-4 border-cyan-500 p-6 hover:bg-cyan-500/10 transition-all">
                <h3 className="text-sm uppercase mb-3 text-cyan-500">{hobby.categorie}</h3>
                <ul className="space-y-1">
                  {hobby.details.map((detail, j) => (
                    <li key={j} className="text-xs opacity-70 before:content-['>_'] before:text-cyan-500 before:mr-2">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button 
            onClick={() => router.push('/hobbies')}
            className="mt-8 border border-cyan-500 text-cyan-500 px-6 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            EXPLORE_MORE
          </button>
        </section>

        <section className="border border-cyan-500/20 bg-white/[0.03] p-12 relative">
          <span className="absolute -top-3 left-5 bg-[#050a12] px-3 text-xs text-cyan-500 tracking-widest">
            06 // CONTACT_PROTOCOL
          </span>
          
          <h2 className="text-4xl font-bold uppercase mb-8">Initiate_Connection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm uppercase text-cyan-500 mb-4">Canaux de Communication</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs opacity-70">
                  <span className="text-cyan-500">EMAIL:</span>
                  <span>contact@silentsystem.dev</span>
                </div>
                <div className="flex items-center gap-3 text-xs opacity-70">
                  <span className="text-cyan-500">GITHUB:</span>
                  <span>github.com/kydoCode</span>
                </div>
                <div className="flex items-center gap-3 text-xs opacity-70">
                  <span className="text-cyan-500">LINKEDIN:</span>
                  <span>linkedin.com/in/sylvain-clement</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm uppercase text-cyan-500 mb-4">Disponibilité</h3>
              <div className="space-y-2 text-xs opacity-70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Ouvert aux opportunités</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>Freelance disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>Collaboration open-source</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm opacity-80 mb-6">
            Pour toute collaboration, projet ou demande d'information, n'hésitez pas à me contacter. 
            Réponse sous 24-48h.
          </p>
          
          <button 
            onClick={() => router.push('/contact')}
            className="border border-cyan-500 text-cyan-500 px-8 py-3 text-sm tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all hover:shadow-[0_0_30px_#00F5FF]"
          >
            SEND_MESSAGE
          </button>
        </section>

      </div>

      <div className="max-w-7xl mx-auto mt-10">
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => router.push('/capabilities')}
            className="border border-cyan-500/50 text-cyan-500/50 px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all"
          >
            ← CAPABILITIES
          </button>
          <button 
            onClick={() => router.push('/')}
            className="border border-cyan-500/50 text-cyan-500/50 px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all"
          >
            RETOUR_ACCUEIL
          </button>
        </div>
      </div>
    </div>
  );
}
