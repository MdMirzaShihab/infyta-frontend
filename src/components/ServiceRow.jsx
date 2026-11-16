import Link from "next/link";
import ServiceMini from "@/components/drawing/ServiceMini";
import Tags from "@/components/Tags";
import { CALLOUT } from "@/components/drawing/callouts";
import { certsFor } from "@/lib/certs";

// One row of the key to the drawing. Hovering or focusing it lights the matching part of the hero drawing (drawing.css).
// `level` is the name's heading level: 3 under a section heading, 2 where the rows follow the page's <h1> directly.
export default function ServiceRow({ service, level = 3 }) {
  const Name = `h${level}`;
  return (
    <Link className="key__row" href={`/services/${service.slug}`} data-svc={service.slug}>
      <span className="num">{CALLOUT[service.slug]}</span>
      <div>
        <Name>{service.name}</Name>
        <p>{service.summary}</p>
      </div>
      <div className="key__with">
        <span className="label">{service.worksWith}</span>
        <Tags items={certsFor(service.expertiseKeys)} />
      </div>
      <ServiceMini slug={service.slug} />
    </Link>
  );
}
