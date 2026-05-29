export default function Footer() {
  return (
    <footer className="bg-[#061b44] text-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        <div>
          <h2 className="text-2xl font-light mb-4">
            Zanzibaba Real Estate
          </h2>

          <p className="text-white/70 leading-7">
            Premium real estate investment opportunities in Zanzibar for
            international investors, diaspora buyers and hospitality developers.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-yellow-400 uppercase tracking-[0.2em] text-sm">
            Navigation
          </h3>

          <ul className="space-y-3 text-white/70">
            <li><a href="/">Home</a></li>
            <li><a href="/properties">Properties</a></li>
            <li><a href="/investments">Investments</a></li>
            <li><a href="/areas">Areas</a></li>
            <li><a href="/why-zanzibar">Why Zanzibar</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-yellow-400 uppercase tracking-[0.2em] text-sm">
            Contact
          </h3>

          <ul className="space-y-3 text-white/70">
            <li>info@zanzibaba.com</li>
            <li>+255 716 002 790</li>
            <li>Paje, Zanzibar</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-yellow-400 uppercase tracking-[0.2em] text-sm">
            Investors
          </h3>

          <p className="text-white/70 mb-6">
            Looking for beachfront investment opportunities in Zanzibar?
          </p>

          <a
            href="https://wa.me/255716002790"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-full"
          >
            Talk to Advisor
          </a>
        </div>

      </div>

      <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/40 text-sm">
        © 2026 Zanzibaba Real Estate. All rights reserved.
      </div>
    </footer>
  );
}
