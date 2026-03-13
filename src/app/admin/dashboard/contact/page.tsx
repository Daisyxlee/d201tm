'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ContactEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/admin/content/contact')
        .then((r) => r.json())
        .then((data) => setNotes(data.notes || ''))
        .catch(() => setMessage('Failed to load'));
    }
  }, [status, router]);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      setMessage(res.ok ? 'Saved.' : 'Save failed.');
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
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-tm-navy">Edit Contact Page</h1>
          <Link href="/admin/dashboard" className="text-tm-maroon hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">{message}</div>
        )}

        <label className="block font-semibold text-tm-navy mb-2">Other Information</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Contact page notes..."
          className="w-full border rounded px-3 py-2 mb-6"
          rows={6}
        />

        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
}
