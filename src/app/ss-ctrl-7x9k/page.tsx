'use client';

import { useState, useEffect, useCallback } from 'react';

type Item = { id: string; visible: boolean; featured: boolean; [key: string]: unknown };
type DataStore = Record<string, { [listKey: string]: Item[] }>;

const COLLECTIONS = ['projects', 'experience', 'education', 'hobbies', 'certifications'] as const;
type Collection = typeof COLLECTIONS[number];

const LABELS: Record<Collection, { list: string; nameKey: string }> = {
  projects:       { list: 'projets',        nameKey: 'name' },
  experience:     { list: 'experience',     nameKey: 'poste' },
  education:      { list: 'education',      nameKey: 'diplome' },
  hobbies:        { list: 'hobbies',        nameKey: 'name' },
  certifications: { list: 'certifications', nameKey: 'nom' },
};

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<DataStore>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Collection>('projects');

  const load = useCallback(async (t: string) => {
    const res = await fetch('/api/ss-ctrl-7x9k', { headers: { 'x-admin-token': t } });
    if (!res.ok) { setError('> AUTH_FAILED'); return; }
    setData(await res.json());
    setAuthed(true);
  }, []);

  const toggle = async (collection: Collection, id: string, field: 'visible' | 'featured', value: boolean) => {
    const key = `${collection}-${id}-${field}`;
    setSaving(key);
    const res = await fetch('/api/ss-ctrl-7x9k', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ collection, id, field, value }),
    });
    if (res.ok) {
      setData(prev => {
        const next = structuredClone(prev);
        const listKey = LABELS[collection].list;
        const item = next[collection][listKey].find((i: Item) => i.id === id);
        if (item) item[field] = value;
        return next;
      });
    }
    setSaving(null);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050a12] text-white flex flex-col items-center justify-center font-mono">
        <div className="border border-cyan-500/30 p-8 w-full max-w-sm">
          <div className="text-cyan-500 mb-6 text-sm">&gt; ADMIN_ACCESS_REQUIRED</div>
          <input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && load(token)}
            placeholder="ENTER_SECRET_KEY"
            className="w-full bg-transparent border-b border-cyan-500/30 text-white px-2 py-2 text-sm focus:border-cyan-500 outline-none mb-6 placeholder:text-white/20"
          />
          {error && <div className="text-red-400 text-xs mb-4">{error}</div>}
          <button
            onClick={() => load(token)}
            className="w-full border border-cyan-500 text-cyan-500 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            AUTHENTICATE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a12] text-white font-mono p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-cyan-500 text-xs mb-1">&gt; ADMIN_PANEL // SILENT_SYSTEM</div>
            <h1 className="text-2xl font-bold">Content_Editor</h1>
          </div>
          <button onClick={() => setAuthed(false)} className="text-xs text-white/30 hover:text-white transition-colors tracking-widest">
            LOGOUT
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {COLLECTIONS.map(col => (
            <button
              key={col}
              onClick={() => setActiveTab(col)}
              className={`px-4 py-2 text-xs tracking-widest border transition-all ${
                activeTab === col
                  ? 'border-cyan-500 text-cyan-500 bg-cyan-500/10'
                  : 'border-white/20 text-white/40 hover:border-cyan-500/50'
              }`}
            >
              {col.toUpperCase()}
            </button>
          ))}
        </div>

        {/* TABLE */}
        {data[activeTab] && (() => {
          const listKey = LABELS[activeTab].list;
          const nameKey = LABELS[activeTab].nameKey;
          const items: Item[] = data[activeTab][listKey] ?? [];

          return (
            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_80px_80px] gap-4 text-xs text-white/30 px-4 mb-2">
                <span>ENTRY</span>
                <span className="text-center">VISIBLE</span>
                <span className="text-center">FEATURED</span>
              </div>
              {items.map((item) => {
                const name = (item[nameKey] as string) ?? item.id;
                return (
                  <div key={item.id} className={`grid grid-cols-[1fr_80px_80px] gap-4 items-center border px-4 py-3 transition-all ${
                    item.visible ? 'border-cyan-500/20' : 'border-white/5 opacity-40'
                  }`}>
                    <span className="text-sm truncate">{name}</span>

                    <div className="flex justify-center">
                      <button
                        onClick={() => toggle(activeTab, item.id, 'visible', !item.visible)}
                        disabled={saving === `${activeTab}-${item.id}-visible`}
                        className={`w-10 h-5 rounded-full border transition-all relative ${
                          item.visible ? 'bg-cyan-500/30 border-cyan-500' : 'bg-white/5 border-white/20'
                        }`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                          item.visible ? 'left-5 bg-cyan-500' : 'left-0.5 bg-white/30'
                        }`} />
                      </button>
                    </div>

                    <div className="flex justify-center">
                      <button
                        onClick={() => toggle(activeTab, item.id, 'featured', !item.featured)}
                        disabled={saving === `${activeTab}-${item.id}-featured`}
                        className={`w-10 h-5 rounded-full border transition-all relative ${
                          item.featured ? 'bg-orange-500/30 border-orange-500' : 'bg-white/5 border-white/20'
                        }`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                          item.featured ? 'left-5 bg-orange-500' : 'left-0.5 bg-white/30'
                        }`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

        <div className="mt-8 text-xs text-white/20">
          &gt; Modifications persistées en DB — effet immédiat en prod.
        </div>
      </div>
    </div>
  );
}
