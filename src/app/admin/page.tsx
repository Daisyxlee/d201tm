'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function AdminInner() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-tm-charcoal">Loading…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-tm-navy mb-4">Admin Sign In</h1>
          {error === 'AccessDenied' && (
            <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">
              You are not authorized to access the admin portal. Please contact a district
              admin to request access.
            </div>
          )}
          <p className="text-tm-charcoal mb-6">
            Sign in with your approved Google account to manage District 201 website
            content.
          </p>
          <button
            onClick={() => signIn('google', { callbackUrl: '/admin/dashboard' })}
            className="btn-primary w-full"
          >
            Sign in with Google
          </button>
          <p className="mt-4 text-sm text-tm-charcoal/80">
            Only approved admin email addresses can access the admin portal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-tm-navy mb-4">Admin Portal</h1>
        <p className="text-tm-charcoal mb-6">
          Welcome, {session.user?.email}. Manage dynamic website content below.
        </p>
        <div className="grid gap-4">
          <Link
            href="/admin/dashboard"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md border-l-4 border-tm-maroon"
          >
            <span className="font-semibold text-tm-navy">Dashboard</span>
            <p className="text-sm text-tm-charcoal mt-1">
              Edit officers, events, resources, and contact info
            </p>
          </Link>
          <Link
            href="/admin/users"
            className="block p-6 bg-white rounded-lg shadow hover:shadow-md border-l-4 border-tm-navy"
          >
            <span className="font-semibold text-tm-navy">User Management</span>
            <p className="text-sm text-tm-charcoal mt-1">
              Superadmin only: add or remove admin users
            </p>
          </Link>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin' })}
          className="mt-8 text-tm-maroon hover:underline"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><p className="text-tm-charcoal">Loading…</p></div>}>
      <AdminInner />
    </Suspense>
  );
}
