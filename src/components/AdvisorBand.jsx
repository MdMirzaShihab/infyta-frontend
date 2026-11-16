import Link from "next/link";
import Tags from "@/components/Tags";
import { chiefAdvisor } from "@/content/team";

const portrait = (w) => chiefAdvisor.image.replace(".webp", `-${w}.webp`);

// The Chief Advisor band. By default "Our Chief Advisor" is the section heading and the name is a line under it;
// with `headings` the name is the heading instead (for a page that already has its own h1). `cta` shows "View Our Team".
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
          {headings ? <p className="label">Our Chief Advisor</p> : <h2 className="label">Our Chief Advisor</h2>}
          {headings ? <h2 className="advisor__name">{chiefAdvisor.name}</h2> : <p className="advisor__name">{chiefAdvisor.name}</p>}
          <p className="advisor__role">{chiefAdvisor.role}</p>
          <ul className="ticks">
            {chiefAdvisor.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <Tags items={chiefAdvisor.certifications} />
          {cta && <Link className="btn" href="/team">View Our Team</Link>}
        </div>
      </div>
    </section>
  );
}
