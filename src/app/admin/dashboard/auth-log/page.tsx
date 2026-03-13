'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AuthLogEntry {
  timestamp: string;
  email: string | null;
  status: 'success' | 'denied';
  source: string;
}

export default function AuthLogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [logs, setLogs] = useState<AuthLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin');
      return;
    }
    if (status === 'authenticated') {
      fetch('/api/admin/auth-log')
        .then((r) => {
          if (!r.ok) throw new Error('Failed to load auth log');
          return r.json();
        })
        .then((data) => {
          setLogs(Array.isArray(data) ? data : []);
        })
        .catch(() => setError('Unable to load authentication log.'))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-tm-navy">Authentication Log</h1>
          <Link href="/admin/dashboard" className="text-tm-maroon hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <p className="text-sm text-tm-charcoal/80 mb-4">
          This read-only log shows recent admin authentication attempts, both successful
          and denied. Use it to monitor which email addresses are trying to access the
          admin portal.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{error}</div>
        )}

        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <p>Loading…</p>
          </div>
        ) : logs.length === 0 ? (
          <p className="text-tm-charcoal">No authentication attempts have been logged.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow bg-white border border-tm-charcoal/10">
            <table className="min-w-full text-xs md:text-sm">
              <thead className="bg-tm-cream">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-tm-navy">
                    Time (UTC)
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-tm-navy">
                    Email
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-tm-navy">
                    Status
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-tm-navy">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs
                  .slice()
                  .reverse()
                  .slice(0, 200)
                  .map((entry, idx) => (
                    <tr
                      key={`${entry.timestamp}-${idx}`}
                      className="border-t border-tm-charcoal/10"
                    >
                      <td className="px-3 py-2 whitespace-nowrap">
                        {new Date(entry.timestamp).toISOString().replace('T', ' ').slice(0, 19)}
                      </td>
                      <td className="px-3 py-2">
                        {entry.email || <span className="text-tm-charcoal/60">(unknown)</span>}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            entry.status === 'success'
                              ? 'text-green-700 font-semibold'
                              : 'text-red-700 font-semibold'
                          }
                        >
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">{entry.source}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

