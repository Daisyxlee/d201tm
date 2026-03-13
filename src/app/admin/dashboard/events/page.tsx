'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Event {
  title: string;
  date: string;
  location?: string;
  description?: string;
  url?: string;
  archived?: boolean;
}

export default function EventsEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/admin/content/events')
        .then((r) => r.json())
        .then(setEvents)
        .catch(() => setMessage('Failed to load events'));
    }
  }, [status, router]);

  const update = (i: number, field: keyof Event, value: string) => {
    const next = [...events];
    next[i] = { ...next[i], [field]: value };
    setEvents(next);
  };

  const add = () => setEvents([...events, { title: '', date: '' }]);
  const remove = (i: number) => setEvents(events.filter((_, j) => j !== i));
  const toggleArchive = (i: number) => {
    const next = [...events];
    next[i] = { ...next[i], archived: !next[i].archived };
    setEvents(next);
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(events),
      });
      setMessage(res.ok ? 'Saved successfully.' : 'Save failed.');
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
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-tm-navy">Edit Events</h1>
          <Link href="/admin/dashboard" className="text-tm-maroon hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">{message}</div>
        )}

        {events.map((e, i) => (
          <div key={i} className="mb-6 p-4 bg-white rounded border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-tm-navy">
                Event {i + 1}{' '}
                {e.archived && (
                  <span className="ml-2 text-xs text-tm-charcoal/70">(Archived)</span>
                )}
              </span>
              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => toggleArchive(i)}
                  className="text-tm-maroon hover:underline"
                >
                  {e.archived ? 'Unarchive' : 'Archive'}
                </button>
                <button onClick={() => remove(i)} className="text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            </div>
            <input
              value={e.title}
              onChange={(ev) => update(i, 'title', ev.target.value)}
              placeholder="Title"
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              value={e.date}
              onChange={(ev) => update(i, 'date', ev.target.value)}
              placeholder="Date (e.g. March 15, 2026)"
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              value={e.location || ''}
              onChange={(ev) => update(i, 'location', ev.target.value)}
              placeholder="Location"
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              value={e.url || ''}
              onChange={(ev) => update(i, 'url', ev.target.value)}
              placeholder="Optional link URL (e.g. /events/spring-conference or https://...)"
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <textarea
              value={e.description || ''}
              onChange={(ev) => update(i, 'description', ev.target.value)}
              placeholder="Description"
              className="w-full border rounded px-3 py-2"
              rows={2}
            />
          </div>
        ))}

        <button onClick={add} className="mb-6 text-tm-maroon hover:underline">
          + Add Event
        </button>
        <br />
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
