import { contactData } from '@/lib/dynamic-content';

export default async function ContactPage() {
  const content = await contactData.get();

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-tm-navy mb-8">Contact District 201</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">District Leadership</h2>
          <p>
            For general district inquiries, please contact the District Director or visit
            the Leadership page.
          </p>
          <a href="/officers" className="btn-primary inline-block mt-4">
            View Leadership Directory
          </a>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">Find a Club</h2>
          <p>
            Visit Toastmasters International to find a club near you or search for clubs
            by location, meeting type, and schedule.
          </p>
          <a
            href="https://www.toastmasters.org/find-a-club"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block mt-4"
          >
            Find a Club
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">Other Information</h2>
          <p className="whitespace-pre-wrap text-tm-charcoal">{content.notes}</p>
        </section>
      </div>
    </div>
  );
}
