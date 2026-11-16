import Link from "next/link";
import OfficeNetwork from "@/components/drawing/OfficeNetwork";
import ServiceRow from "@/components/ServiceRow";
import Schedule from "@/components/Schedule";
import TitleBlock from "@/components/TitleBlock";
import AdvisorBand from "@/components/AdvisorBand";
import ContactPanel from "@/components/ContactPanel";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { services } from "@/content/services";
import { expertise } from "@/content/expertise";
import { pages, homeIntro } from "@/content/pages";
import { site } from "@/content/site";

const DRAWING_NOTES = [
  { label: "Drawing", value: "Typical office network" },
  { label: "Drawn by", value: "Infyta, Azimpur, Dhaka" },
  { label: "Scale", value: "Not to scale" },
  { label: "Key", value: "1 to 5 are our services. Select any part." },
];

export default function HomeView({ email }) {
  return (
    <>
      <section className="hero hero--sheet">
        <div className="wrap">
          <div className="sheet sheet--hero">
            <div className="tb">
              <div className="tb__title">
                <h1>{pages.home.heading}</h1>
                <div className="hero__cta">
                  <Link className="btn" href="/contact">Get Started</Link>
                  <Link className="btn btn--ghost" href="/services">Explore Solutions</Link>
                </div>
              </div>
              <div className="tb__lede"><p className="lede">{pages.home.description}</p></div>
            </div>
            <figure className="sheet__fig">
              <div className="sheet__dwg"><OfficeNetwork /></div>
            </figure>
            <TitleBlock items={DRAWING_NOTES} />
          </div>
        </div>
      </section>

      <section className="band" id="services">
        <div className="wrap">
          <div className="head"><h2>Our Services</h2><p>{homeIntro}</p></div>
          <div className="key">
            {services.map((service) => <ServiceRow key={service.slug} service={service} />)}
          </div>
          <div className="after"><Link className="btn btn--ghost" href="/services">Explore All Services</Link></div>
        </div>
      </section>

      <section className="band band--flush" id="expertise">
        <div className="wrap">
          <div className="head">
            <h2>Our Core Expertise</h2>
            <p>Comprehensive IT solutions across multiple domains, delivered by certified professionals</p>
          </div>
          <Schedule rows={expertise} caption="Core expertise, technologies and certifications" />
        </div>
      </section>

      <AdvisorBand />

      <section className="band" id="contact">
        <div className="wrap contact">
          <div>
            <h2>Ready to Transform Your Business?</h2>
            <p className="lede">Let&apos;s discuss how Infyta can help you achieve your technology goals.</p>
            <div className="contact__cta">
              <Link className="btn" href="/contact">Get Started</Link>
              <a className="btn btn--ghost btn--icon" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp</a>
              <a className="btn btn--ghost btn--icon" href={`tel:${site.phone.e164}`}><PhoneIcon />{site.phone.display}</a>
            </div>
          </div>
          <ContactPanel email={email} />
        </div>
      </section>
    </>
  );
}
