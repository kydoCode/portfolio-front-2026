'use client';

import { useState, useEffect, useCallback } from 'react';

type Item = { id: string; visible: boolean; featured: boolean; order: number; [key: string]: unknown };
type DataStore = Record<string, { [listKey: string]: Item[] }>;

const COLLECTIONS = ['projects', 'experience', 'education', 'skills', 'hobbies', 'certifications'] as const;
type Collection = typeof COLLECTIONS[number];

const LABELS: Record<Collection, { list: string; nameKey: string; fields: { key: string; label: string; type: string }[] }> = {
  projects: {
    list: 'projets', nameKey: 'name',
    fields: [
      { key: 'name', label: 'Nom', type: 'text' },
      { key: 'description', label: 'Description', type: 'text' },
      { key: 'context', label: 'Contexte', type: 'textarea' },
      { key: 'githubUrl', label: 'GitHub URL', type: 'text' },
      { key: 'liveUrl', label: 'Demo URL', type: 'text' },
      { key: 'technologies', label: 'Technologies (virgule)', type: 'text' },
      { key: 'learnings', label: 'Highlights (virgule)', type: 'text' },
    ],
  },
  experience: {
    list: 'experience', nameKey: 'poste',
    fields: [
      { key: 'poste', label: 'Poste', type: 'text' },
      { key: 'entreprise', label: 'Entreprise', type: 'text' },
      { key: 'annees', label: 'Années (virgule)', type: 'text' },
      { key: 'details', label: 'Détails (une ligne = un item)', type: 'textarea' },
      { key: 'url', label: 'URL', type: 'text' },
    ],
  },
  education: {
    list: 'education', nameKey: 'diplome',
    fields: [
      { key: 'diplome', label: 'Diplôme', type: 'text' },
      { key: 'etablissement', label: 'Établissement', type: 'text' },
      { key: 'annees', label: 'Années (virgule)', type: 'text' },
      { key: 'mention', label: 'Mention', type: 'text' },
      { key: 'url', label: 'URL', type: 'text' },
    ],
  },
  skills: {
    list: 'skills', nameKey: 'name',
    fields: [
      { key: 'name', label: 'Nom', type: 'text' },
      { key: 'category', label: 'Catégorie', type: 'text' },
    ],
  },
  hobbies: {
    list: 'hobbies', nameKey: 'name',
    fields: [
      { key: 'name', label: 'Nom', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  certifications: {
    list: 'certifications', nameKey: 'nom',
    fields: [
      { key: 'nom', label: 'Nom', type: 'text' },
      { key: 'organisme', label: 'Organisme', type: 'text' },
      { key: 'date', label: 'Date (YYYY-MM-DD)', type: 'text' },
      { key: 'url', label: 'URL vérification', type: 'text' },
      { key: 'state', label: 'État (ACTIVE/PENDING/EXPIRED)', type: 'text' },
    ],
  },
};

const SKILL_CATEGORIES = [
  'Front-end',
  'Back-end',
  'iOS Native',
  'UI/UX & Design',
  'Outils & Méthodes',
  'IA Générative',
  'Réseaux & Systèmes (TSSR)',
] as const;

const ARRAY_FIELDS = ['technologies', 'learnings', 'annees', 'details'];

function serializeForForm(item: Item, fields: { key: string }[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const f of fields) {
    const v = item[f.key];
    if (Array.isArray(v)) {
      out[f.key] = f.key === 'details' ? (v as string[]).join('\n') : (v as string[]).join(', ');
    } else {
      out[f.key] = v != null ? String(v) : '';
    }
  }
  return out;
}

function deserializeFromForm(formVals: Record<string, string>, fields: { key: string }[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (ARRAY_FIELDS.includes(f.key)) {
      out[f.key] = f.key === 'details'
        ? formVals[f.key].split('\n').map(s => s.trim()).filter(Boolean)
        : formVals[f.key].split(',').map(s => s.trim()).filter(Boolean);
    } else if (f.key === 'date') {
      out[f.key] = new Date(formVals[f.key]).toISOString();
    } else {
      out[f.key] = formVals[f.key] || null;
    }
  }
  return out;
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<DataStore>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<Collection>('projects');
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [editVals, setEditVals] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [dumping, setDumping] = useState(false);

  const dumpDb = async () => {
    setDumping(true);
    const res = await fetch('/api/ss-ctrl-7x9k', { headers: { 'x-admin-token': token } });
    const json = await res.json();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `db_dump_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDumping(false);
  };

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

  const reorder = async (collection: Collection, id: string, direction: 'up' | 'down') => {
    const listKey = LABELS[collection].list;
    const items = [...(data[collection]?.[listKey] ?? [])].sort((a, b) => a.order - b.order);
    const idx = items.findIndex(i => i.id === id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;

    const a = items[idx];
    const b = items[swapIdx];
    setSaving(`order-${id}`);

    await Promise.all([
      fetch('/api/ss-ctrl-7x9k', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ action: 'update', collection, id: a.id, data: { order: b.order } }),
      }),
      fetch('/api/ss-ctrl-7x9k', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: JSON.stringify({ action: 'update', collection, id: b.id, data: { order: a.order } }),
      }),
    ]);

    await load(token);
    setSaving(null);
  };

  const openEdit = (item: Item) => {
    setIsCreating(false);
    setEditItem(item);
    setEditVals(serializeForForm(item, LABELS[activeTab].fields));
  };

  const openCreate = () => {
    setIsCreating(true);
    setEditItem(null);
    const empty: Record<string, string> = {};
    for (const f of LABELS[activeTab].fields) empty[f.key] = '';
    setEditVals(empty);
  };

  const saveEdit = async () => {
    setSaving('form');
    const payload = deserializeFromForm(editVals, LABELS[activeTab].fields);
    const action = isCreating ? 'create' : 'update';
    const body = isCreating
      ? { action, collection: activeTab, data: { ...payload, visible: true, featured: false, order: 0 } }
      : { action, collection: activeTab, id: editItem!.id, data: payload };

    const res = await fetch('/api/ss-ctrl-7x9k', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      await load(token);
      setEditItem(null);
      setIsCreating(false);
    }
    setSaving(null);
  };

  const deleteItem = async (id: string) => {
    setSaving(`delete-${id}`);
    await fetch('/api/ss-ctrl-7x9k', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ action: 'delete', collection: activeTab, id }),
    });
    await load(token);
    setDeleteConfirm(null);
    setSaving(null);
  };

  useEffect(() => {
    setEditItem(null);
    setIsCreating(false);
    setDeleteConfirm(null);
  }, [activeTab]);

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

  const listKey = LABELS[activeTab].list;
  const nameKey = LABELS[activeTab].nameKey;
  const items: Item[] = [...(data[activeTab]?.[listKey] ?? [])].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-[#050a12] text-white font-mono p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-cyan-500 text-xs mb-1">&gt; ADMIN_PANEL // SILENT_SYSTEM</div>
            <h1 className="text-2xl font-bold">Content_Editor</h1>
          </div>
          <button onClick={() => setAuthed(false)} className="text-xs text-white/30 hover:text-white transition-colors tracking-widest">
            LOGOUT
          </button>
        </div>
        <div className="flex justify-end mb-6">
          <button
            onClick={dumpDb}
            disabled={dumping}
            className="border border-white/20 text-white/40 px-4 py-2 text-xs tracking-widest hover:border-cyan-500/50 hover:text-cyan-500/70 transition-all disabled:opacity-30"
          >
            {dumping ? 'EXPORT...' : '↓ DB_DUMP'}
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

        {/* TOOLBAR */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-white/30">{items.length} entrée{items.length > 1 ? 's' : ''}</span>
          <button
            onClick={openCreate}
            className="border border-cyan-500 text-cyan-500 px-4 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all"
          >
            + NOUVEAU
          </button>
        </div>

        {/* TABLE */}
        <div className="space-y-2 mb-8">
          <div className="grid grid-cols-[24px_1fr_80px_80px_120px] gap-3 text-xs text-white/30 px-4 mb-2">
            <span></span>
            <span>ENTRY</span>
            <span className="text-center">VISIBLE</span>
            <span className="text-center">FEATURED</span>
            <span className="text-center">ACTIONS</span>
          </div>
          {items.map((item, idx) => {
            const name = (item[nameKey] as string) ?? item.id;
            const sub = activeTab === 'skills' ? (item.category as string) : null;
            return (
              <div key={item.id} className={`grid grid-cols-[24px_1fr_80px_80px_120px] gap-3 items-center border px-4 py-3 transition-all ${
                item.visible ? 'border-cyan-500/20' : 'border-white/5 opacity-40'
              }`}>
                {/* ORDER ARROWS */}
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => reorder(activeTab, item.id, 'up')}
                    disabled={idx === 0 || saving === `order-${item.id}`}
                    className="text-cyan-500/40 hover:text-cyan-500 disabled:opacity-20 text-[10px] leading-none"
                  >▲</button>
                  <button
                    onClick={() => reorder(activeTab, item.id, 'down')}
                    disabled={idx === items.length - 1 || saving === `order-${item.id}`}
                    className="text-cyan-500/40 hover:text-cyan-500 disabled:opacity-20 text-[10px] leading-none"
                  >▼</button>
                </div>

                <div className="min-w-0">
                  <span className="text-sm truncate block">{name}</span>
                  {sub && <span className="text-[10px] text-cyan-500/40 truncate block">{sub}</span>}
                </div>

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

                <div className="flex justify-center gap-2">
                  <button onClick={() => openEdit(item)} className="text-xs text-cyan-500 hover:text-white transition-colors">EDIT</button>
                  <button onClick={() => setDeleteConfirm(item.id)} className="text-xs text-red-400/60 hover:text-red-400 transition-colors">DEL</button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs text-white/20">
          &gt; Modifications persistées en DB — effet immédiat en prod.
        </div>
      </div>

      {/* MODALE EDIT / CREATE */}
      {(editItem || isCreating) && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => { setEditItem(null); setIsCreating(false); }}>
          <div
            className="border border-cyan-500 bg-[#050a12] p-6 md:p-8 w-full max-w-xl overflow-y-auto"
            style={{ maxHeight: '85vh' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-cyan-500 text-xs mb-6 tracking-widest">
              {isCreating ? '> CREATE_ENTRY' : '> EDIT_ENTRY'}
            </div>
            <div className="space-y-4">
              {LABELS[activeTab].fields.map(f => (
                <div key={f.key}>
                  <label className="text-xs text-cyan-500/60 block mb-1 tracking-widest">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea
                      value={editVals[f.key] ?? ''}
                      onChange={e => setEditVals(v => ({ ...v, [f.key]: e.target.value }))}
                      rows={4}
                      className="w-full bg-transparent border border-cyan-500/30 text-white p-2 text-sm focus:border-cyan-500 outline-none resize-none"
                    />
                  ) : activeTab === 'skills' && f.key === 'category' ? (
                    <select
                      value={editVals[f.key] ?? ''}
                      onChange={e => setEditVals(v => ({ ...v, [f.key]: e.target.value }))}
                      className="w-full bg-[#050a12] border-b border-cyan-500/30 text-white px-2 py-2 text-sm focus:border-cyan-500 outline-none"
                    >
                      <option value="">-- choisir --</option>
                      {SKILL_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={editVals[f.key] ?? ''}
                      onChange={e => setEditVals(v => ({ ...v, [f.key]: e.target.value }))}
                      className="w-full bg-transparent border-b border-cyan-500/30 text-white px-2 py-2 text-sm focus:border-cyan-500 outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={saveEdit}
                disabled={saving === 'form'}
                className="border border-cyan-500 text-cyan-500 px-6 py-2 text-xs tracking-widest hover:bg-cyan-500 hover:text-[#050a12] transition-all disabled:opacity-50"
              >
                {saving === 'form' ? 'SAVING...' : 'SAVE'}
              </button>
              <button
                onClick={() => { setEditItem(null); setIsCreating(false); }}
                className="border border-white/20 text-white/40 px-6 py-2 text-xs tracking-widest hover:border-white/50 hover:text-white/70 transition-all"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="border border-red-400 bg-[#050a12] p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="text-red-400 text-xs mb-4 tracking-widest">&gt; CONFIRM_DELETE</div>
            <p className="text-sm text-white/70 mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button
                onClick={() => deleteItem(deleteConfirm)}
                disabled={saving === `delete-${deleteConfirm}`}
                className="border border-red-400 text-red-400 px-6 py-2 text-xs tracking-widest hover:bg-red-400 hover:text-[#050a12] transition-all disabled:opacity-50"
              >
                {saving === `delete-${deleteConfirm}` ? 'DELETING...' : 'CONFIRM'}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="border border-white/20 text-white/40 px-6 py-2 text-xs tracking-widest hover:border-white/50 transition-all"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
