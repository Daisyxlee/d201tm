import { officersData } from '@/lib/dynamic-content';

export default async function OfficersPage() {
  const officers = await officersData.get();

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-tm-navy mb-8">
          District 201 Leadership
        </h1>
        <p className="text-lg text-tm-charcoal mb-12">
          The District Executive Committee provides oversight and direction for all
          District operations.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-tm-maroon mb-6">District Trio</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {officers.trio.map((o) => (
              <div
                key={o.role}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-tm-maroon"
              >
                <h3 className="font-bold text-tm-navy">{o.role}</h3>
                <p className="text-lg font-semibold text-tm-charcoal mt-2">
                  {o.name || 'TBD'}
                </p>
                {o.email && (
                  <a
                    href={`mailto:${o.email}`}
                    className="text-tm-maroon hover:underline text-sm"
                  >
                    {o.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-tm-maroon mb-6">
            Appointed Officers
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {officers.appointed.map((o) => (
              <div
                key={o.role}
                className="bg-white rounded-lg shadow p-4 border border-tm-cream"
              >
                <h3 className="font-semibold text-tm-navy">{o.role}</h3>
                <p className="text-tm-charcoal">{o.name || 'TBD'}</p>
                {o.email && (
                  <a
                    href={`mailto:${o.email}`}
                    className="text-tm-maroon hover:underline text-sm"
                  >
                    {o.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
