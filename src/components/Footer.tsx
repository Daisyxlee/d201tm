import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-tm-navy text-white py-12 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-bold text-lg mb-2">District 201 Toastmasters</p>
            <p className="text-sm opacity-90">https://d201tm.org</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/resources" className="hover:underline">
              Resources
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link
              href="https://www.toastmasters.org/find-a-club"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Find a Club
            </Link>
          </div>
        </div>
        <p className="mt-8 text-sm opacity-80 border-t border-white/20 pt-6">
          The information on this website is for the sole use of Toastmasters members,
          for Toastmasters business only. It is not to be used for solicitation and
          distribution of non-Toastmasters material or information.
        </p>
        <p className="mt-2 text-sm opacity-80">
          © {new Date().getFullYear()} Toastmasters International District 201. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
