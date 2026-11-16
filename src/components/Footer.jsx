import Link from "next/link";
import Logo from "@/components/Logo";
import { OpenStatus } from "@/components/OpenStatus";
import { ThemeSwitch } from "@/components/ThemeControls";
import { site } from "@/content/site";
import { services } from "@/content/services";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

// The footer is a title block: four cells, then the copyright line, open-hours status and theme switch.
// `email` comes from the server (src/content/email.js is server-only).
export default function Footer({ email }) {
  const year = new Date().getFullYear();
  return (
    <footer className="foot inverse">
      <div className="wrap">
        <div className="foot__grid">
          <div>
            <Link className="logo" href="/" aria-label="Infyta, home">
              <Logo tagline />
            </Link>
            <p className="small">{site.tagline}</p>
            {site.socials.length > 0 && (
              <ul>
                {site.socials.map((social) => (
                  <li key={social.url}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">{social.name}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a className="tel" href={`tel:${site.phone.e164}`}>{site.phone.display}</a>
              </li>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">{site.address.display}</a>
              </li>
              {site.hours.display.map((line) => (
                <li key={line} className="small">{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="foot__end">
          <span>{`© ${year} Infyta. All rights reserved.`}</span>
          <OpenStatus />
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
