import Link from "next/link";
import ServiceDetail from "@/components/drawing/ServiceDetail";
import ServiceRow from "@/components/ServiceRow";
import Schedule from "@/components/Schedule";
import EndCta from "@/components/EndCta";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { expertise } from "@/content/expertise";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { splitStep } from "@/lib/steps";

// A service page (mock `serviceView`): headline beside its detail drawing, then overview, approach, technologies,
// questions, related services and the call to action.
export default function ServicePageView({ service }) {
  const technologies = expertise.filter((item) => service.expertiseKeys.includes(item.key));
  const related = service.related.map(getService).filter(Boolean);

  return (
    <>
      <section data-svc={service.slug}>
        <div className="wrap svc-hero">
          <div>
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/services">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{service.name}</span>
            </nav>
            <h1>{service.name}</h1>
            <p className="lede">{service.heroSubtitle}</p>
            <div className="hero__cta">
              <Link className="btn" href="/contact">Get Started Today</Link>
              <a className="btn btn--ghost btn--icon" href={`tel:${site.phone.e164}`}><PhoneIcon />{site.phone.display}</a>
            </div>
          </div>
          <figure className="on-slab"><ServiceDetail slug={service.slug} /></figure>
        </div>
      </section>

      <section className="band band--alt" data-svc={service.slug}>
        <div className="wrap split">
          <div className="prose">
            <h2>Overview</h2>
            {service.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <aside className="spec">
            <h3>What&apos;s Included</h3>
            <ul>
              {service.included.map((item) => (
                <li key={item.title}><b>{item.title}</b><span>{item.description}</span></li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="band inverse" data-svc={service.slug}>
        <div className="wrap">
          <h2>Our Approach</h2>
          <ol className="steps">
            {service.approach.map((step) => {
              const { lead, rest } = splitStep(step);
              return <li key={step}>{lead && <strong>{lead}</strong>}{rest}</li>;
            })}
          </ol>
        </div>
      </section>

      <section className="band" data-svc={service.slug}>
        <div className="wrap">
          <div className="head"><h2>Technologies &amp; Certifications</h2></div>
          <Schedule rows={technologies} caption="Technologies and certifications" headings={false} />
        </div>
      </section>

      <section className="band band--flush" data-svc={service.slug}>
        <div className="wrap split split--faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq">
            {service.faqs.map((faq, i) => (
              <details key={faq.question} open={i === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--flush" data-svc={service.slug}>
        <div className="wrap">
          <div className="head"><h2>Related Services</h2></div>
          <div className="key">
            {related.map((item) => <ServiceRow key={item.slug} service={item} />)}
          </div>
        </div>
      </section>

      <EndCta svc={service.slug} title="Ready to discuss your project?">
        <Link className="btn" href="/contact">Get Started Today</Link>
        <a className="btn btn--ghost btn--icon" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp</a>
      </EndCta>
    </>
  );
}
