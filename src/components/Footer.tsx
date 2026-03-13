import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-tm-blue text-white py-12 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-bold text-lg mb-2">District 201 Toastmasters</p>
            <p className="text-sm">https://d201tm.org</p>
          </div>
          <div className="flex flex-col md:items-end gap-4">
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
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.facebook.com/DistrictONEToastmasters/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="District 1 on Facebook"
                className="hover:opacity-80"
              >
                <img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/districtonetm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="District 1 on X (Twitter)"
                className="hover:opacity-80"
              >
                <img src="/icons/x.svg" alt="X" className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/district1toastmasters/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="District 1 on Instagram"
                className="hover:opacity-80"
              >
                <img src="/icons/instagram.svg" alt="Instagram" className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@districtonetoastmasters/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="District 1 on YouTube"
                className="hover:opacity-80"
              >
                <img src="/icons/youtube.svg" alt="YouTube" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-8 text-sm border-t border-white/20 pt-6">
          The information on this website is for the sole use of Toastmasters members,
          for Toastmasters business only. It is not to be used for solicitation and
          distribution of non-Toastmasters material or information.
        </p>
        <p className="mt-2 text-sm">
          © {new Date().getFullYear()} Toastmasters International District 201. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
