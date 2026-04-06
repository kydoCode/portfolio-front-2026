'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUnderwaterSound } from '@/hooks/useUnderwaterSound';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: 'home' | 'core' | 'capabilities' | 'peripheral';
}

const LANGS = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export default function BurgerMenu({ isOpen, onClose, currentPage }: BurgerMenuProps) {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const { t, i18n } = useTranslation();
  const { play } = useUnderwaterSound();

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

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-[99] flex flex-col justify-center items-center gap-8">
      {/* NAV */}
      {[
        { path: '/', label: t('nav.home'), page: 'home' },
        { path: '/core', label: t('nav.core'), page: 'core' },
        { path: '/capabilities', label: t('nav.capabilities'), page: 'capabilities' },
        { path: '/peripheral', label: t('nav.peripheral'), page: 'peripheral' },
      ].map(({ path, label, page }) => (
        <button
          key={page}
          onClick={() => { play('transition'); setTimeout(() => { router.push(path); onClose(); }, 200); }}
          className={`text-2xl tracking-widest transition-colors ${currentPage === page ? 'text-white' : 'text-cyan-500 hover:text-white'}`}
        >
          {label}
        </button>
      ))}

      <div className="h-px w-32 bg-cyan-500/30 my-2" />

      {/* LANG SWITCHER */}
      <div className="flex gap-3">
        {LANGS.map(({ code, label, flag }) => (
          <button
            key={code}
            onClick={() => changeLang(code)}
            className={`text-xs tracking-widest px-3 py-1.5 border transition-all ${
              i18n.language === code
                ? 'border-cyan-500 text-cyan-500 bg-cyan-500/10'
                : 'border-white/20 text-white/40 hover:border-cyan-500/50 hover:text-cyan-500/70'
            }`}
          >
            {flag} {label}
          </button>
        ))}
      </div>

      <div className="h-px w-32 bg-cyan-500/30 my-2" />

      {/* SOUND + CV */}
      <button
        onClick={toggleMute}
        className="text-sm text-cyan-500 hover:text-white transition-colors tracking-widest flex items-center gap-3"
      >
        <span>{isMuted ? t('nav.soundOff') : t('nav.soundOn')}</span>
        <span className="text-xs opacity-50">[{isMuted ? 'MUTED' : 'ACTIVE'}]</span>
      </button>
      <a
        href="/cv.pdf"
        target="_blank"
        className="text-sm text-cyan-500 hover:text-white transition-colors tracking-widest"
      >
        {t('nav.downloadCv')}
      </a>
    </div>
  );
}
