'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Officer {
  role: string;
  name?: string;
  email?: string;
}

interface OfficersContent {
  trio: Officer[];
  appointed: Officer[];
}

export default function OfficersEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<OfficersContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/admin/content/officers')
        .then((r) => r.json())
        .then(setData)
        .catch(() => setMessage('Failed to load officers'));
    }
  }, [status, router]);

  const update = (section: 'trio' | 'appointed', index: number, field: string, value: string) => {
    if (!data) return;
    const next = { ...data };
    const arr = [...next[section]];
    arr[index] = { ...arr[index], [field]: value };
    next[section] = arr;
    setData(next);
  };

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content/officers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage('Saved successfully.');
      } else {
        setMessage('Save failed.');
      }
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

  if (!data) {
    return (
      <div className="py-16 px-4 text-center">
        <p className="text-tm-charcoal">{message || 'Loading…'}</p>
        <Link href="/admin/dashboard" className="text-tm-maroon mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-tm-navy">Edit Officers</h1>
          <Link href="/admin/dashboard" className="text-tm-maroon hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">{message}</div>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-bold text-tm-maroon mb-4">District Trio</h2>
          {data.trio.map((o, i) => (
            <div key={i} className="mb-4 p-4 bg-white rounded border">
              <label className="block font-semibold text-tm-navy mb-2">{o.role}</label>
              <input
                type="text"
                value={o.name || ''}
                onChange={(e) => update('trio', i, 'name', e.target.value)}
                placeholder="Name"
                className="w-full border rounded px-3 py-2 mb-2"
              />
              <input
                type="email"
                value={o.email || ''}
                onChange={(e) => update('trio', i, 'email', e.target.value)}
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-tm-maroon mb-4">Appointed Officers</h2>
          {data.appointed.map((o, i) => (
            <div key={i} className="mb-4 p-4 bg-white rounded border">
              <label className="block font-semibold text-tm-navy mb-2">{o.role}</label>
              <input
                type="text"
                value={o.name || ''}
                onChange={(e) => update('appointed', i, 'name', e.target.value)}
                placeholder="Name"
                className="w-full border rounded px-3 py-2 mb-2"
              />
              <input
                type="email"
                value={o.email || ''}
                onChange={(e) => update('appointed', i, 'email', e.target.value)}
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
        </section>

        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
