import Link from "next/link";
import Logo from "@/components/Logo";
import { PhoneIcon } from "@/components/Icons";
import { MainLinks, MobileMenu } from "@/components/NavMenus";
import { OpenStatus } from "@/components/OpenStatus";
import { ThemeButton } from "@/components/ThemeControls";
import { services } from "@/content/services";
import { site } from "@/content/site";

// Only names and links reach the client menus; the rest of the service copy stays on the server.
const SERVICE_LINKS = services.map((s) => ({ href: `/services/${s.slug}`, label: s.name }));

// Sticky header. Below 1040px: logo, a call button and the menu button.
export default function Nav() {
  const tel = `tel:${site.phone.e164}`;
  return (
    <header className="nav">
      <div className="wrap nav__in">
        <Link className="logo" href="/" aria-label="Infyta, home">
          <Logo />
        </Link>
        <nav aria-label="Main">
          <MainLinks serviceLinks={SERVICE_LINKS} />
        </nav>
        <div className="nav__meta">
          <OpenStatus className="label" />
          <a className="tel" href={tel}>{site.phone.display}</a>
          <ThemeButton />
          <Link className="btn btn--sm" href="/contact">Get Started</Link>
        </div>
        <a className="nav__call" href={tel} aria-label={`Call ${site.phone.display}`}>
          <PhoneIcon />
        </a>
        <MobileMenu logo={<Logo />} serviceLinks={SERVICE_LINKS} />
      </div>
    </header>
  );
}
