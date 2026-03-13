import { eventsData, resourcesData } from '@/lib/dynamic-content';
import Link from 'next/link';

export default async function CalendarPage() {
  const [events, resources] = await Promise.all([
    eventsData.get(),
    resourcesData.get(),
  ]);

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-tm-navy mb-4">
          District 201 Calendar
        </h1>
        <p className="text-lg text-tm-charcoal mb-8">
          Upcoming district events, speech contests, and training sessions.
        </p>

        {resources.googleCalendarEmbedUrl && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-tm-maroon mb-4">
              Full Google Calendar
            </h2>
            <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border border-tm-charcoal/10 shadow bg-white">
              <iframe
                src={resources.googleCalendarEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                title="District 201 Google Calendar"
              />
            </div>
          </section>
        )}

        <section>
          {events.filter((e) => !e.archived).length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-tm-charcoal">
                No upcoming events listed. Check back soon or contact your Area Director.
              </p>
              <p className="mt-4 text-sm text-tm-charcoal/80">
                District Council meetings are held at least twice per year (fall and
                spring). DEC meets typically in July, October, January, and April.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {events
                .filter((e) => !e.archived)
                .map((e, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-tm-maroon"
                >
                  <h3 className="font-bold text-tm-navy text-lg">
                    {e.url ? (
                      <Link
                        href={e.url}
                        className="hover:underline"
                        target={e.url.startsWith('http') ? '_blank' : undefined}
                        rel={e.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {e.title}
                      </Link>
                    ) : (
                      e.title
                    )}
                  </h3>
                  <p className="text-tm-charcoal mt-1">{e.date}</p>
                  {e.location && (
                    <p className="text-sm text-tm-charcoal/80 mt-1">{e.location}</p>
                  )}
                  {e.description && (
                    <p className="mt-2 text-tm-charcoal">{e.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
