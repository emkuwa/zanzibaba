import Link from "next/link";

function formatWhatsAppDisplay(num: string): string {
  const digits = num.replace(/\D/g, "");
  if (digits.length >= 9) {
    const country = digits.slice(0, -9) || "255";
    const rest = digits.slice(-9);
    const a = rest.slice(0, 3);
    const b = rest.slice(3, 6);
    const c = rest.slice(6);
    return `+${country} ${a} ${b} ${c}`;
  }
  return digits ? `+${digits}` : "";
}

export function Footer() {
  const year = new Date().getFullYear();
  const companyWhatsApp = process.env.COMPANY_WHATSAPP || "255716002790";
  const waNumber = companyWhatsApp.replace(/\D/g, "");
  const waHref = waNumber ? `https://wa.me/${waNumber}` : "#";
  const waDisplay = formatWhatsAppDisplay(companyWhatsApp);
  return (
    <footer id="contact" className="border-t border-sand-200 bg-sand-100/50">
      <div className="container-tight py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold text-sand-900">Zanzibaba Real Estate</h3>
            <p className="mt-2 text-sm text-sand-600">
              Your trusted partner for land and property in Zanzibar.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sand-900">Quick links</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/#listings" className="text-sand-600 hover:text-brand-600">
                  All properties
                </Link>
              </li>
              <li>
                <a
                  href="https://zanzibaba.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sand-600 hover:text-brand-600"
                >
                  Zanzibaba Group
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="text-sand-600 hover:text-brand-600">
                  Login / Partners
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sand-900">Contact</h3>
            <ul className="mt-2 space-y-1 text-sm text-sand-600">
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-600"
                >
                  WhatsApp: {waDisplay}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sand-900">Location</h3>
            <p className="mt-2 text-sm text-sand-600">Zanzibar, Tanzania</p>
          </div>
        </div>
        <div className="mt-10 border-t border-sand-200 pt-8 text-center text-sm text-sand-500">
          © {year} Zanzibaba Company Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
