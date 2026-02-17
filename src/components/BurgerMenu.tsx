'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: 'home' | 'core' | 'capabilities' | 'peripheral';
}

export default function BurgerMenu({ isOpen, onClose, currentPage }: BurgerMenuProps) {
  const router = useRouter();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

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
