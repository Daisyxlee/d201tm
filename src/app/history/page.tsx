import { historyData } from '@/lib/dynamic-content';
import Link from 'next/link';

export default async function HistoryPage() {
  const entries = await historyData.get();

  const grouped = entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    const key = entry.category || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});

  Object.values(grouped).forEach((list) =>
    list.sort((a, b) => b.year.localeCompare(a.year)),
  );

  const categories = Object.keys(grouped).sort();

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-tm-navy mb-4">District 201 History</h1>
        <p className="text-lg text-tm-charcoal mb-8">
          Awards, recognition, and historical milestones for District 201 Toastmasters.
          This page is inspired by the Awards &amp; Recognition and Hall of Fame sections
          from established districts, and will grow as new records are added each year.
        </p>

         {/* District History table */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">District History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-white rounded-lg shadow border border-tm-charcoal/10">
              <thead className="bg-tm-cream">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-tm-navy">
                    District
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-tm-navy">
                    Founded
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-4 py-2">District 1</td>
                  <td className="px-4 py-2">July 1, 1938</td>
                </tr>
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-4 py-2">District 52</td>
                  <td className="px-4 py-2">July 1, 1957</td>
                </tr>
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-4 py-2">District 100</td>
                  <td className="px-4 py-2">July 1, 2014</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Hall of Fame – District 1 reference table (user-provided data) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-tm-maroon mb-4">
            Hall of Fame – District 1
          </h2>
          <p className="text-sm text-tm-charcoal/80 mb-3">
            Reference table of key awards and recognition from District 1, shared here for
            historical context. District 201 will build a similar Hall of Fame over time.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs md:text-sm bg-white rounded-lg shadow border border-tm-charcoal/10">
              <thead className="bg-tm-cream">
                <tr>
                  <th className="px-2 py-2 text-left font-semibold text-tm-navy">Year</th>
                  <th className="px-2 py-2 text-left font-semibold text-tm-navy">
                    Toastmaster of the Year
                  </th>
                  <th className="px-2 py-2 text-left font-semibold text-tm-navy">
                    Area Director of the Year
                  </th>
                  <th className="px-2 py-2 text-left font-semibold text-tm-navy">
                    Division Director of the Year
                  </th>
                  <th className="px-2 py-2 text-left font-semibold text-tm-navy">
                    Roy D. Graham Lifetime Achievement
                  </th>
                  <th className="px-2 py-2 text-left font-semibold text-tm-navy">
                    Lydia Boyd Leadership Legacy
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* 2025 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2025</td>
                  <td className="px-2 py-2">Jacob Daley</td>
                  <td className="px-2 py-2">Anastazya Wada</td>
                  <td className="px-2 py-2">Sha&apos;Dona Brewer</td>
                  <td className="px-2 py-2">
                    Jonathan Eckman; Ann Guintivano; Daisy Li; Ana Lopez
                  </td>
                  <td className="px-2 py-2">Daisy Li; Ana Lopez</td>
                </tr>
                {/* 2024 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2024</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">
                    Camille Davis; Cynthia Moore; Patricia Titus
                  </td>
                  <td className="px-2 py-2">Carol Otters</td>
                </tr>
                {/* 2023 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2023</td>
                  <td className="px-2 py-2">Daisy Li</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">Angel Estrada</td>
                  <td className="px-2 py-2">Lola! Love</td>
                </tr>
                {/* 2022 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2022</td>
                  <td className="px-2 py-2">Ana Lopez</td>
                  <td className="px-2 py-2">Victoria Trabosh</td>
                  <td className="px-2 py-2">Daisy Li</td>
                  <td className="px-2 py-2">Brad Stauffer</td>
                  <td className="px-2 py-2">Donna Robinson</td>
                </tr>
                {/* 2021 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2021</td>
                  <td className="px-2 py-2">Evelyn Woolridge</td>
                  <td className="px-2 py-2">Yolanda Callegari Burton</td>
                  <td className="px-2 py-2">Crystal Gillispie</td>
                  <td className="px-2 py-2">Jacquelyn Deloatch</td>
                  <td className="px-2 py-2">Lydia Martinez</td>
                </tr>
                {/* 2020 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2020</td>
                  <td className="px-2 py-2">Jacob Daley</td>
                  <td className="px-2 py-2">Ellen DeLeston</td>
                  <td className="px-2 py-2">Janell Carla Williams</td>
                  <td className="px-2 py-2">
                    Alexander Denk; Karen Persip; Larry Lee; Miyo Yamauchi
                  </td>
                  <td className="px-2 py-2">Keith Jackson</td>
                </tr>
                {/* 2019 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2019</td>
                  <td className="px-2 py-2">Jessica Allen</td>
                  <td className="px-2 py-2">Patrick Verebely</td>
                  <td className="px-2 py-2">Alexander Denk</td>
                  <td className="px-2 py-2">Carol Otters; Jessica Allen</td>
                  <td className="px-2 py-2">Everette Williams</td>
                </tr>
                {/* 2018 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2018</td>
                  <td className="px-2 py-2">Giovanna Dottore</td>
                  <td className="px-2 py-2">Alexander Denk</td>
                  <td className="px-2 py-2">Andrew Citron</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">Sonya Vasquez</td>
                </tr>
                {/* 2017 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2017</td>
                  <td className="px-2 py-2">Donna Robinson</td>
                  <td className="px-2 py-2">Yvette Ferrer</td>
                  <td className="px-2 py-2">Yuko Oshimo</td>
                  <td className="px-2 py-2">
                    Choon Mah-Meggett; Grace Weltman; Joyce Howard; Keith Jackson; Sonya
                    Vasquez
                  </td>
                  <td className="px-2 py-2">Catherine Magruder</td>
                </tr>
                {/* 2016 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2016</td>
                  <td className="px-2 py-2">Brad Stauffer</td>
                  <td className="px-2 py-2">Kathleen Dean</td>
                  <td className="px-2 py-2">Diane Markham</td>
                  <td className="px-2 py-2">
                    Everette Williams; James Paget; Marya Banniza; Theresa Hight
                  </td>
                  <td className="px-2 py-2">Margaret Mitchell</td>
                </tr>
                {/* 2015 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2015</td>
                  <td className="px-2 py-2">Karen Persip; Patti Titus</td>
                  <td className="px-2 py-2">Miyo Yamauchi</td>
                  <td className="px-2 py-2">Susan Cameron</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">Julie Broady</td>
                </tr>
                {/* 2014 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2014</td>
                  <td className="px-2 py-2">Elissa Rosenberg</td>
                  <td className="px-2 py-2">Patti Titus</td>
                  <td className="px-2 py-2">Jessie Moore; Kevin Gray</td>
                  <td className="px-2 py-2">Regina Rhymes; Rodger Cota</td>
                  <td className="px-2 py-2">Award established May 2014</td>
                </tr>
                {/* 2013 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2013</td>
                  <td className="px-2 py-2">Joyce Howard</td>
                  <td className="px-2 py-2">Padmarajan Ilangovan</td>
                  <td className="px-2 py-2">Andrew Chiu</td>
                  <td className="px-2 py-2">
                    Bonny Kamen; Chiuhing Casey; David Kitchen; Donna O&apos;Connell; Evelyn
                    Woolridge; Julie Broady; Margaret Mitchell; Maria Ruiz; Murphy
                    Witherspoon; Patsy Bellah
                  </td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2012 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2012</td>
                  <td className="px-2 py-2">Evelyn Woolridge</td>
                  <td className="px-2 py-2">Philip Wiest</td>
                  <td className="px-2 py-2">Jessica Allen</td>
                  <td className="px-2 py-2">
                    Claudette Payne; Joan Lewis; Ron Dowell; Tina Tomiyama
                  </td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2011 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2011</td>
                  <td className="px-2 py-2">Julie Broady</td>
                  <td className="px-2 py-2">Michael Petran</td>
                  <td className="px-2 py-2">Keith Jackson</td>
                  <td className="px-2 py-2">Mary G. Russell</td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2010 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2010</td>
                  <td className="px-2 py-2">Regina Rhymes</td>
                  <td className="px-2 py-2">Angel Estrada</td>
                  <td className="px-2 py-2">Camille Rivera; Grace Weltman</td>
                  <td className="px-2 py-2">
                    Ann Hastings; Giovanna Dottore; Gloria Davis
                  </td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2009 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2009</td>
                  <td className="px-2 py-2">Donna Oja</td>
                  <td className="px-2 py-2">Rick Shigio</td>
                  <td className="px-2 py-2">Kareem Muhammad</td>
                  <td className="px-2 py-2">Donna Oja; Larry Savell; Michael Jue</td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2008 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2008</td>
                  <td className="px-2 py-2">Giovanna Dottore</td>
                  <td className="px-2 py-2">K. C. Converse</td>
                  <td className="px-2 py-2">Tina Tomiyama</td>
                  <td className="px-2 py-2">Catherine Magruder; Philip Stewart</td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2007 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2007</td>
                  <td className="px-2 py-2">Jon Caplan</td>
                  <td className="px-2 py-2">Rochelle Hall</td>
                  <td className="px-2 py-2">Aliyah Levin</td>
                  <td className="px-2 py-2">
                    Dorothy Jones; Johnny Ponder; Maria-Isabel Soto
                  </td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2006 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2006</td>
                  <td className="px-2 py-2">Penny Post</td>
                  <td className="px-2 py-2">Susan Roth</td>
                  <td className="px-2 py-2">Bonny Kamen</td>
                  <td className="px-2 py-2">
                    Betty Colston; Penny Post; Sandy Dunning
                  </td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2005 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2005</td>
                  <td className="px-2 py-2">Gloria Davis</td>
                  <td className="px-2 py-2">Lisa Gaines</td>
                  <td className="px-2 py-2">Dannette Montague</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2004 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2004</td>
                  <td className="px-2 py-2">Michael Jue</td>
                  <td className="px-2 py-2">Dannette Montague</td>
                  <td className="px-2 py-2">Gloria Davis</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2003 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2003</td>
                  <td className="px-2 py-2">Rodger Cota</td>
                  <td className="px-2 py-2">Nipa Dunn</td>
                  <td className="px-2 py-2">Donna Oja</td>
                  <td className="px-2 py-2">Steve Loeb; Toni Berkowitz</td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2002 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2002</td>
                  <td className="px-2 py-2">Linda Coverdale</td>
                  <td className="px-2 py-2">Donna Oja</td>
                  <td className="px-2 py-2">Don Wells</td>
                  <td className="px-2 py-2">
                    Laura Bayne; Marsha Davis; Phil Taylor; Robert O&apos;Donnell
                  </td>
                  <td className="px-2 py-2">Award not in place</td>
                </tr>
                {/* 2001 */}
                <tr className="border-t border-tm-charcoal/10">
                  <td className="px-2 py-2">2001</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">—</td>
                  <td className="px-2 py-2">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {categories.length === 0 && (
          <p className="text-tm-charcoal">
            No history records have been added yet. District leaders can add entries from
            the admin portal.
          </p>
        )}

        <div className="space-y-10">
          {categories.map((cat) => (
            <section key={cat}>
              <h2 className="text-2xl font-bold text-tm-maroon mb-4">{cat}</h2>
              <div className="space-y-3">
                {grouped[cat].map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-lg shadow p-4 border-l-4 border-tm-maroon"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-tm-navy text-lg">
                        {entry.title}
                      </h3>
                      <span className="text-sm text-tm-charcoal/80">{entry.year}</span>
                    </div>
                    {entry.description && (
                      <p className="mt-2 text-tm-charcoal whitespace-pre-wrap">
                        {entry.description}
                      </p>
                    )}
                    {entry.sourceUrl && (
                      <p className="mt-2 text-xs text-tm-charcoal/70">
                        Source:{' '}
                        <a
                          href={entry.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tm-maroon hover:underline"
                        >
                          {entry.sourceLabel || entry.sourceUrl}
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

