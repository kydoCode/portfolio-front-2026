'use client';

import { useEffect, useRef, useState } from 'react';

export default function UnderwaterAmbience() {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const [active, setActive] = useState(false);
  const [started, setStarted] = useState(false);

  const start = () => {
    if (started) return;
    try {
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      const nodes: AudioNode[] = [];

      // Rumble grave — fond océanique
      const rumble = ctx.createOscillator();
      const rumbleGain = ctx.createGain();
      const rumbleFilter = ctx.createBiquadFilter();
      rumble.type = 'sine';
      rumble.frequency.value = 42;
      rumbleFilter.type = 'lowpass';
      rumbleFilter.frequency.value = 80;
      rumbleGain.gain.value = 0.04;
      rumble.connect(rumbleFilter);
      rumbleFilter.connect(rumbleGain);
      rumbleGain.connect(ctx.destination);
      rumble.start();
      nodes.push(rumble, rumbleGain, rumbleFilter);

      // Bruit blanc filtré — eau qui circule
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 200;
      noiseFilter.Q.value = 0.5;
      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.015;
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();
      nodes.push(noise, noiseGain, noiseFilter);

      // LFO sur le rumble — pulsation lente comme une respiration
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.08;
      lfoGain.gain.value = 0.02;
      lfo.connect(lfoGain);
      lfoGain.connect(rumbleGain.gain);
      lfo.start();
      nodes.push(lfo, lfoGain);

      // Ping sonar aléatoire toutes les 8-20s
      const schedulePing = () => {
        const delay = 8000 + Math.random() * 12000;
        setTimeout(() => {
          if (!ctxRef.current) return;
          const c = ctxRef.current;
          const now = c.currentTime;
          const osc = c.createOscillator();
          const g = c.createGain();
          const f = c.createBiquadFilter();
          osc.connect(f); f.connect(g); g.connect(c.destination);
          f.type = 'bandpass'; f.frequency.value = 800; f.Q.value = 8;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(660, now);
          osc.frequency.exponentialRampToValueAtTime(220, now + 1.2);
          g.gain.setValueAtTime(0.06, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          osc.start(now); osc.stop(now + 1.2);
          schedulePing();
        }, delay);
      };
      schedulePing();

      nodesRef.current = nodes;
      setStarted(true);
      setActive(true);
    } catch {}
  };

  const toggle = () => {
    if (!started) { start(); return; }
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (active) {
      ctx.suspend();
      setActive(false);
    } else {
      ctx.resume();
      setActive(true);
    }
  };

  // Démarrage au premier clic utilisateur sur la page
  useEffect(() => {
    const handleFirstInteraction = () => {
      start();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  useEffect(() => {
    return () => {
      ctxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      title={active ? 'Couper ambiance' : 'Activer ambiance'}
      className="fixed bottom-6 right-6 z-50 w-8 h-8 flex items-center justify-center text-cyan-500/40 hover:text-cyan-500 transition-colors"
      aria-label="Toggle underwater ambience"
    >
      {active ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zM6 5.5v5l4-2.5-4-2.5z"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zM6 5h4v6H6V5z"/>
        </svg>
      )}
    </button>
  );
}
