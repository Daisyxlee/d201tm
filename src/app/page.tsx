import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-tm-blue to-tm-maroon text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            District 201 Toastmasters
          </h1>
          <p className="text-xl md:text-2xl mb-2 opacity-95">
            Where Leaders Are Made
          </p>
          <p className="text-lg opacity-90 mb-8">
            We build new clubs and support all clubs in achieving excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://www.toastmasters.org/find-a-club"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-tm-maroon hover:bg-tm-yellow"
            >
              Find a Club
            </Link>
            <Link
              href="/about"
              className="btn-secondary border-2 border-white hover:border-tm-yellow"
            >
              About District 201
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-tm-navy mb-8 text-center">
            Toastmasters International Mission
          </h2>
          <p className="text-lg text-center text-tm-charcoal mb-12">
            We empower individuals to become more effective communicators and leaders.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-tm-maroon">
              <h3 className="font-bold text-tm-maroon mb-2">District Mission</h3>
              <p>We build new clubs and support all clubs in achieving excellence.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-tm-navy">
              <h3 className="font-bold text-tm-navy mb-2">Club Mission</h3>
              <p>
                We provide a supportive and positive learning experience in which members
                are empowered to develop communication and leadership skills, resulting in
                greater self-confidence and personal growth.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-tm-gold">
              <h3 className="font-bold text-tm-gold mb-2">Core Values</h3>
              <p>Integrity • Respect • Service • Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 bg-tm-cream/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-tm-navy mb-8 text-center">
            Explore District 201
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/about"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-center"
            >
              <span className="font-semibold text-tm-maroon">About</span>
              <p className="text-sm text-tm-charcoal mt-1">Our district story</p>
            </Link>
            <Link
              href="/officers"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-center"
            >
              <span className="font-semibold text-tm-maroon">Leadership</span>
              <p className="text-sm text-tm-charcoal mt-1">District officers</p>
            </Link>
            <Link
              href="/resources"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-center"
            >
              <span className="font-semibold text-tm-maroon">Resources</span>
              <p className="text-sm text-tm-charcoal mt-1">Tools & documents</p>
            </Link>
            <Link
              href="/calendar"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-center"
            >
              <span className="font-semibold text-tm-maroon">Calendar</span>
              <p className="text-sm text-tm-charcoal mt-1">Events & contests</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
