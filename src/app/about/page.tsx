import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-tm-navy mb-8">About District 201</h1>

        <section className="prose prose-lg max-w-none mb-12">
          <p>
            District 201 is one of more than 100 districts in Toastmasters International
            worldwide. Toastmasters is a non-profit educational organization committed to
            making effective oral communications a reality the world over. Through its
            member clubs, Toastmasters helps people learn the arts of speaking, listening,
            and thinking — vital skills that enhance leadership ability, foster human
            understanding, and contribute to the betterment of mankind.
          </p>
          <p>
            District 201 is the inaugural district for our region. This website
            (https://d201tm.org) serves as the primary public resource for members and the
            public, per the District 201 Operating Procedures Manual (effective July 1,
            2026).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">District Structure</h2>
          <p>
            District 201 is organized into Divisions, each consisting of multiple Areas.
            Each Area is composed of member clubs. The District Executive Committee
            provides oversight and direction for all District operations.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Divisions:</strong> Assigned at the annual spring council meeting.
              A Division must have a minimum of three Areas.
            </li>
            <li>
              <strong>Areas:</strong> Four to six clubs whenever possible. Clubs are
              assigned based on geographical proximity and club type.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">
            Fully Remote District Leaders
          </h2>
          <p>
            District 201 allows fully remote district leaders to serve in any role. A Fully
            Remote District Leader is defined as any District Executive Committee member
            having a registered domicile outside the boundaries of the district in which
            they serve, and who will not attend onsite events as required by the district.
            This provision is subject to review by the District Council annually.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">Learn More</h2>
          <Link
            href="/resources#operating-manual"
            className="btn-primary inline-block"
          >
            District 201 Operating Procedures Manual
          </Link>
        </section>
      </div>
    </div>
  );
}
