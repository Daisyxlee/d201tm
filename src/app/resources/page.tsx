import Link from 'next/link';
import { resourcesData } from '@/lib/dynamic-content';

export default async function ResourcesPage() {
  const content = await resourcesData.get();

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-tm-navy mb-8">Resources</h1>

        <section id="operating-manual" className="mb-12">
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">
            Operating Procedures Manual
          </h2>
          <p>
            The District 201 Operating Procedures Manual is permanently available on this
            website. Effective July 1, 2026 — Inaugural Edition.
          </p>
          <p className="mt-2 text-sm text-tm-charcoal/80">
            {content.operatingManualNote}
          </p>
          <a
            href={content.operatingManualUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block mt-4"
          >
            Download Operating Procedures Manual (PDF)
          </a>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">
            Toastmasters International
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="https://www.toastmasters.org/find-a-club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tm-maroon hover:underline"
              >
                Find a Club
              </a>
            </li>
            <li>
              <a
                href="https://www.toastmasters.org/education/pathways"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tm-maroon hover:underline"
              >
                Pathways Learning Experience
              </a>
            </li>
            <li>
              <a
                href="https://www.toastmasters.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tm-maroon hover:underline"
              >
                Toastmasters International
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">Leader Resources</h2>
          <p>
            Resources for club officers, Area Directors, and Division Directors. Contact
            your Area Director or visit the district website for the latest documents.
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>New Club Kit</li>
            <li>Area Director Club Visit Report (TI Form 1471)</li>
            <li>Pathways quick-start guide</li>
            <li>Contest documents</li>
            <li>Proxy/credential form template</li>
          </ul>
        </section>

        <section>
          <Link href="/calendar" className="btn-secondary inline-block">
            View Event Calendar
          </Link>
        </section>
      </div>
    </div>
  );
}
