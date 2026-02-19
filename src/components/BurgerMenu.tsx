'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: 'home' | 'core' | 'capabilities' | 'peripheral';
}

export default function BurgerMenu({ isOpen, onClose, currentPage }: BurgerMenuProps) {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('soundMuted');
    setIsMuted(saved === 'true');
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('soundMuted', String(newMuted));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-[99] flex flex-col justify-center items-center gap-8">
      <button 
        onClick={() => { router.push('/'); onClose(); }} 
        className={`text-2xl tracking-widest transition-colors ${currentPage === 'home' ? 'text-white' : 'text-cyan-500 hover:text-white'}`}
      >
        HOME
      </button>
      <button 
        onClick={() => { router.push('/core'); onClose(); }} 
        className={`text-2xl tracking-widest transition-colors ${currentPage === 'core' ? 'text-white' : 'text-cyan-500 hover:text-white'}`}
      >
        CORE
      </button>
      <button 
        onClick={() => { router.push('/capabilities'); onClose(); }} 
        className={`text-2xl tracking-widest transition-colors ${currentPage === 'capabilities' ? 'text-white' : 'text-cyan-500 hover:text-white'}`}
      >
        CAPABILITIES
      </button>
      <button 
        onClick={() => { router.push('/peripheral'); onClose(); }} 
        className={`text-2xl tracking-widest transition-colors ${currentPage === 'peripheral' ? 'text-white' : 'text-cyan-500 hover:text-white'}`}
      >
        PERIPHERAL
      </button>
      <div className="h-px w-32 bg-cyan-500/30 my-4" />
      <button 
        onClick={toggleMute}
        className="text-lg text-cyan-500 hover:text-white transition-colors tracking-widest flex items-center gap-3"
      >
        <span>{isMuted ? 'SOUND_OFF' : 'SOUND_ON'}</span>
        <span className="text-xs opacity-50">[{isMuted ? 'MUTED' : 'ACTIVE'}]</span>
      </button>
      <a 
        href="/cv.pdf" 
        target="_blank" 
        className="text-lg text-cyan-500 hover:text-white transition-colors tracking-widest"
      >
        DOWNLOAD_CV
      </a>
    </div>
  );
}
