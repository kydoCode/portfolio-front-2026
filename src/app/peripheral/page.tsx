'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import hobbiesData from '@/data/hobbies.json';
import BurgerMenu from '@/components/BurgerMenu';
import BubbleBackground from '@/components/BubbleBackground';
import Cursor from '@/components/Cursor';

export default function PeripheralData() {
  const router = useRouter();
  const [sonarActive, setSonarActive] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [menuOpen]);

  const handleSonarClick = () => {
    setSonarActive(true);
    setMessageSent(true);
    setTimeout(() => {
      setSonarActive(false);
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050a12] text-white overflow-x-hidden" style={{ cursor: 'none' }}>
      <BubbleBackground />
      <Cursor />
      
      {/* BURGER MENU */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-8 right-8 z-[100] flex flex-col gap-1.5 w-8 h-8 justify-center items-center group"
      >
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-cyan-500 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      <BurgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} currentPage="peripheral" />

      <button 
        onClick={() => router.push('/capabilities')}
        className="fixed top-8 left-8 text-cyan-500 text-xs tracking-widest hover:text-white transition-colors z-50"
      >
        ← CAPABILITIES
      </button>

      <section className="max-w-[1400px] mx-auto px-8 py-20">
        
        {/* HOBBIES */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold uppercase mb-8 text-cyan-500">Beyond_Code</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hobbiesData.hobbies.map((hobby, i) => (
              <div key={i} className="border border-cyan-500/20 p-6 bg-white/[0.03] hover:border-cyan-500/50 transition-all">
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
        </div>

        {/* FORMULAIRE TERMINAL */}
        <div className="bg-black/50 border border-cyan-500/30 p-8 font-mono">
          <div className="text-cyan-500 mb-6 text-sm">&gt; INITIATE_CONTACT_PROTOCOL</div>
          
          {/* INPUT ABYSS - NAME */}
          <div className="relative mb-6">
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="peer w-full bg-transparent border-b-2 border-cyan-500/30 text-white px-2 py-3 focus:border-cyan-500 outline-none transition-all"
              placeholder=" "
            />
            <label className="absolute left-2 top-3 text-cyan-500/50 text-xs transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-[:not(:placeholder-shown)]:-top-4">
              &gt; NAME
            </label>
          </div>

          {/* INPUT ABYSS - EMAIL */}
          <div className="relative mb-6">
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="peer w-full bg-transparent border-b-2 border-cyan-500/30 text-white px-2 py-3 focus:border-cyan-500 outline-none transition-all"
              placeholder=" "
            />
            <label className="absolute left-2 top-3 text-cyan-500/50 text-xs transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-[:not(:placeholder-shown)]:-top-4">
              &gt; EMAIL
            </label>
          </div>

          {/* INPUT ABYSS - MESSAGE */}
          <div className="relative mb-6">
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="peer w-full bg-transparent border border-cyan-500/30 text-white p-3 focus:border-cyan-500 outline-none transition-all"
              rows={4}
              placeholder=" "
            />
            <label className="absolute left-3 top-3 text-cyan-500/50 text-xs transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:bg-[#050a12] peer-[:not(:placeholder-shown)]:px-2">
              &gt; MESSAGE
            </label>
          </div>

          {/* BOUTON SONAR */}
          <button 
            onClick={handleSonarClick}
            className="relative overflow-hidden border border-cyan-500 text-cyan-500 px-12 py-4 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            <span className="relative z-10">SEND_TRANSMISSION</span>
            {sonarActive && (
              <div className="absolute inset-0 bg-cyan-500 animate-[implode_0.6s_ease-out]" />
            )}
          </button>
          {messageSent && (
            <div className="mt-4 text-green-500 text-xs font-mono animate-pulse">
              &gt; MESSAGE_SENT_SUCCESSFULLY
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="mt-20 flex justify-center gap-4">
          <button 
            onClick={() => router.push('/capabilities')}
            className="border border-cyan-500/50 text-cyan-500/50 px-8 py-3 text-xs tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all"
          >
            ← CAPABILITIES
          </button>
          <button 
            onClick={() => router.push('/')}
            className="border border-cyan-500 text-cyan-500 px-12 py-4 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            RETOUR_ACCUEIL
          </button>
        </div>
      </section>

      <style jsx>{`
        @keyframes implode {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
