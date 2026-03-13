import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { adminsData } from '@/lib/admin-users';
import { logAuthAttempt } from '@/lib/auth-log';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'openid email profile',
          ...(process.env.GOOGLE_WORKSPACE_DOMAIN
            ? { hd: process.env.GOOGLE_WORKSPACE_DOMAIN }
            : {}),
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, email }) {
      const effectiveEmail = (email as string | null) ?? (user?.email ?? null);
      const allowed = await adminsData.isAllowed(effectiveEmail);
      await logAuthAttempt({
        email: effectiveEmail,
        status: allowed ? 'success' : 'denied',
        source: 'signIn',
      });
      return !!allowed;
    },
    async session({ session, token }) {
      if (session?.user && token?.email) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin',
    error: '/admin',
  },
};
