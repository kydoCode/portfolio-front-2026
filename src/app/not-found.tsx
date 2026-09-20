'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#050a12] text-white flex flex-col items-center justify-center font-mono px-6">
      <div className="text-cyan-500 text-xs tracking-[6px] uppercase mb-4 opacity-70">ERROR_NODE // SIGNAL_LOST</div>
      <div className="text-[clamp(5rem,20vw,14rem)] font-black leading-none text-white/10 select-none">404</div>
      <div className="text-cyan-500 text-sm tracking-widest mt-2 mb-8">&gt; PAGE_NOT_FOUND</div>
      <p className="text-xs text-white/40 max-w-xs text-center mb-10 leading-relaxed">
        Ce nœud n&apos;existe pas dans le système. La transmission a été perdue.
      </p>
      <button
        onClick={() => router.push('/')}
        className="border border-cyan-500 text-cyan-500 px-10 py-4 text-xs tracking-[4px] uppercase hover:bg-cyan-500 hover:text-[#050a12] transition-all"
      >
        ← RETOUR_SURFACE
      </button>
    </div>
  );
}
