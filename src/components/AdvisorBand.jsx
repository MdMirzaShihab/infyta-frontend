import Link from "next/link";
import Tags from "@/components/Tags";
import { chiefAdvisor } from "@/content/team";

const portrait = (w) => chiefAdvisor.image.replace(".webp", `-${w}.webp`);

// The Chief Advisor band. "Our Chief Advisor" is always the section heading. With `headings`, the highlights and
// certifications get small sub-headings too (the Team page). `cta` shows "View Our Team".
export default function AdvisorBand({ headings = false, cta = true }) {
  return (
    <section className="band inverse" id="advisor">
      <div className="wrap advisor">
        <figure className="portrait">
          {/* A plain <img>: the site is a static export without the image optimiser. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={portrait(640)}
            srcSet={`${portrait(320)} 320w, ${portrait(640)} 640w, ${chiefAdvisor.image} 1200w`}
            sizes="(min-width: 1024px) 400px, 100vw"
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            alt={`${chiefAdvisor.name}, Chief Advisor at Infyta`}
          />
        </figure>
        <div>
          <h2 className="label">Our Chief Advisor</h2>
          <p className="advisor__name">{chiefAdvisor.name}</p>
          <p className="advisor__role">{chiefAdvisor.role}</p>
          {headings && <h3 className="label advisor__sub">Key Highlights</h3>}
          <ul className="ticks">
            {chiefAdvisor.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          {headings && <h3 className="label advisor__sub">Certifications</h3>}
          <Tags items={chiefAdvisor.certifications} />
          {cta && <Link className="btn" href="/team">View Our Team</Link>}
        </div>
      </div>
    </section>
  );
}
