'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/admin');
      return;
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Loading…</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-tm-navy">Content Dashboard</h1>
          <Link href="/admin" className="text-tm-maroon hover:underline">
            ← Back to Admin
          </Link>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
            {message}
          </div>
        )}

        <p className="text-tm-charcoal mb-8">
          Edit dynamic content that appears on the public website. Changes are saved to
          the data files and will appear on the next site update.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/admin/dashboard/officers"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md border-l-4 border-tm-maroon"
          >
            <h2 className="font-bold text-tm-navy text-lg">Officers</h2>
            <p className="text-sm text-tm-charcoal mt-1">
              District Trio and Appointed Officers
            </p>
          </Link>
          <Link
            href="/admin/dashboard/events"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md border-l-4 border-tm-navy"
          >
            <h2 className="font-bold text-tm-navy text-lg">Events</h2>
            <p className="text-sm text-tm-charcoal mt-1">
              Calendar events and district meetings
            </p>
          </Link>
          <Link
            href="/admin/dashboard/resources"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md border-l-4 border-tm-gold"
          >
            <h2 className="font-bold text-tm-navy text-lg">Resources</h2>
            <p className="text-sm text-tm-charcoal mt-1">
              Operating manual URL and notes
            </p>
          </Link>
          <Link
            href="/admin/dashboard/contact"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md border-l-4 border-tm-maroon"
          >
            <h2 className="font-bold text-tm-navy text-lg">Contact</h2>
            <p className="text-sm text-tm-charcoal mt-1">
              Contact page content and notes
            </p>
          </Link>
          <Link
            href="/admin/dashboard/history"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md border-l-4 border-tm-gold"
          >
            <h2 className="font-bold text-tm-navy text-lg">History</h2>
            <p className="text-sm text-tm-charcoal mt-1">
              Awards, Hall of Fame, and past recognition
            </p>
          </Link>
          <Link
            href="/admin/dashboard/auth-log"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md border-l-4 border-tm-maroon"
          >
            <h2 className="font-bold text-tm-navy text-lg">Auth Log</h2>
            <p className="text-sm text-tm-charcoal mt-1">
              View recent admin sign-in attempts (read-only)
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
