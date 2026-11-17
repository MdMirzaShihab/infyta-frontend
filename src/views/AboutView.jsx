import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import TitleBlock from "@/components/TitleBlock";
import { about } from "@/content/about";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function AboutView({ email }) {
  const facts = [
    {
      label: "What we do",
      value: `${site.name} is an IT solutions company providing software, network, server and cloud, security and IT support services to businesses in Dhaka and across Bangladesh.`,
    },
    { label: "Where we are", value: <address>{site.address.display}</address> },
    {
      label: "Services",
      value: (
        <ul>
          {services.map((service) => (
            <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.name}</Link></li>
          ))}
        </ul>
      ),
    },
    {
      label: "Opening hours",
      value: site.hours.display.map((line) => <span className="line" key={line}>{line}</span>),
    },
    { label: "Phone", value: <a href={`tel:${site.phone.e164}`}>{site.phone.display}</a> },
    { label: "Email", value: <a href={`mailto:${email}`}>{email}</a> },
  ];

  return (
    <>
      <PageHeader title="About Infyta" lede={site.slogan} />

      <section className="band band--alt">
        <div className="wrap statements">
          <div>
            <h2>Our Vision</h2>
            <p>{about.vision}</p>
          </div>
          <div>
            <h2>Our Mission</h2>
            <p>{about.mission}</p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="head"><h2>Infyta at a glance</h2></div>
          <TitleBlock items={facts} className="titleblock--facts" />
        </div>
      </section>

      <section className="band band--tint">
        <div className="wrap">
          <div className="head"><h2>Our Core Values</h2></div>
          <ul className="values">
            {about.values.map((value) => (
              <li key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band inverse">
        <div className="wrap endcta">
          <div>
            <h2>{about.teamCta.title}</h2>
            <p className="lede">{about.teamCta.text}</p>
          </div>
          <Link className="btn" href="/team">{about.teamCta.button}</Link>
        </div>
      </section>
    </>
  );
}
