'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ResourcesEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [operatingManualUrl, setOperatingManualUrl] = useState('');
  const [operatingManualNote, setOperatingManualNote] = useState('');
  const [googleCalendarEmbedUrl, setGoogleCalendarEmbedUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/admin/content/resources')
        .then((r) => r.json())
        .then((data) => {
          setOperatingManualUrl(data.operatingManualUrl || '');
          setOperatingManualNote(data.operatingManualNote || '');
          setGoogleCalendarEmbedUrl(data.googleCalendarEmbedUrl || '');
        })
        .catch(() => setMessage('Failed to load'));
    }
  }, [status, router]);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operatingManualUrl,
          operatingManualNote,
          googleCalendarEmbedUrl,
        }),
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
          <h1 className="text-3xl font-bold text-tm-navy">Edit Resources</h1>
          <Link href="/admin/dashboard" className="text-tm-maroon hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">{message}</div>
        )}

        <div className="space-y-4 mb-6">
          <label className="block font-semibold text-tm-navy">
            Operating Manual PDF URL
          </label>
          <input
            value={operatingManualUrl}
            onChange={(e) => setOperatingManualUrl(e.target.value)}
            placeholder="/District201_Operation_Manual.pdf"
            className="w-full border rounded px-3 py-2"
          />
          <label className="block font-semibold text-tm-navy">Note (display text)</label>
          <textarea
            value={operatingManualNote}
            onChange={(e) => setOperatingManualNote(e.target.value)}
            placeholder="Effective July 1, 2026 — Inaugural Edition."
            className="w-full border rounded px-3 py-2"
            rows={2}
          />
        </div>

        <div className="space-y-2 mb-6">
          <label className="block font-semibold text-tm-navy">
            Google Calendar Embed URL
          </label>
          <input
            value={googleCalendarEmbedUrl}
            onChange={(e) => setGoogleCalendarEmbedUrl(e.target.value)}
            placeholder="https://calendar.google.com/calendar/embed?src=..."
            className="w-full border rounded px-3 py-2 text-xs"
          />
          <p className="text-xs text-tm-charcoal/70">
            In Google Calendar: Settings &gt; Settings for my calendars &gt; Integrate calendar &gt;
            copy the <strong>Embed code</strong> URL (the <code>src=...</code> value) and paste
            it here.
          </p>
        </div>

        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
}
