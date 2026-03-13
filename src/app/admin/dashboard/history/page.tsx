'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HistoryEntryForm {
  id: string;
  year: string;
  title: string;
  description?: string;
  category: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export default function HistoryEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<HistoryEntryForm[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/admin/content/history')
        .then((r) => r.json())
        .then((data) => setItems(data || []))
        .catch(() => setMessage('Failed to load history'));
    }
  }, [status, router]);

  const update = (i: number, field: keyof HistoryEntryForm, value: string) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: value };
    setItems(next);
  };

  const add = () => {
    const id = `entry-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setItems([
      ...items,
      { id, year: new Date().getFullYear().toString(), title: '', category: 'Awards' },
    ]);
  };

  const remove = (i: number) => setItems(items.filter((_, j) => j !== i));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      setMessage(res.ok ? 'Saved history.' : 'Save failed.');
    } catch {
      setMessage('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-tm-navy">Edit History</h1>
          <Link href="/admin/dashboard" className="text-tm-maroon hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">{message}</div>
        )}

        <p className="text-sm text-tm-charcoal/80 mb-6">
          Use this page to add District 201 awards, Hall of Fame entries, and other historical
          records. You can draw inspiration from established districts&apos; Awards &amp;
          Recognition and Hall of Fame pages, but only enter information that is appropriate
          for District 201.
        </p>

        <button onClick={add} className="mb-6 text-tm-maroon hover:underline">
          + Add Record
        </button>

        {items.length === 0 && (
          <p className="text-tm-charcoal mb-4">No history records yet.</p>
        )}

        <div className="space-y-4">
          {items.map((entry, i) => (
            <div key={entry.id} className="bg-white rounded-lg border p-4 space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-tm-navy">Record {i + 1}</span>
                <button
                  onClick={() => remove(i)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="grid md:grid-cols-4 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-tm-charcoal/80">
                    Year
                  </label>
                  <input
                    value={entry.year}
                    onChange={(e) => update(i, 'year', e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-tm-charcoal/80">
                    Title
                  </label>
                  <input
                    value={entry.title}
                    onChange={(e) => update(i, 'title', e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    placeholder="e.g. District Toastmaster of the Year – Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-tm-charcoal/80">
                    Category
                  </label>
                  <input
                    value={entry.category}
                    onChange={(e) => update(i, 'category', e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    placeholder="Awards / Hall of Fame / Leadership"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-tm-charcoal/80">
                  Description
                </label>
                <textarea
                  value={entry.description || ''}
                  onChange={(e) => update(i, 'description', e.target.value)}
                  className="w-full border rounded px-2 py-1 text-sm"
                  rows={3}
                  placeholder="Short description of the award or recognition."
                />
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-tm-charcoal/80">
                    Source URL (optional)
                  </label>
                  <input
                    value={entry.sourceUrl || ''}
                    onChange={(e) => update(i, 'sourceUrl', e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    placeholder="Link to more details, if any."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-tm-charcoal/80">
                    Source Label (optional)
                  </label>
                  <input
                    value={entry.sourceLabel || ''}
                    onChange={(e) => update(i, 'sourceLabel', e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    placeholder="e.g. District 1 Awards & Recognition"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={save} disabled={saving} className="btn-primary mt-8">
          {saving ? 'Saving…' : 'Save All Records'}
        </button>
      </div>
    </div>
  );
}

