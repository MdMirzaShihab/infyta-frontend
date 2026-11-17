import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ServiceRow from "@/components/ServiceRow";
import EndCta from "@/components/EndCta";
import { services } from "@/content/services";

// The services index (spec 7.3): headline, the five service rows, and the call to action. The rows' names are
// <h2> here because no other heading sits between them and the page's <h1>.
export default function ServicesIndexView() {
  return (
    <>
      <PageHeader title="Our Services" lede="Cutting-edge IT solutions designed to drive your business forward in the digital age." />
      <section className="band band--alt">
        <div className="wrap">
          <div className="key">
            {services.map((service) => <ServiceRow key={service.slug} service={service} level={2} />)}
          </div>
        </div>
      </section>
      <EndCta flush={false} title="Ready to transform your business with our expertise?">
        <Link className="btn" href="/contact">Get a Free Consultation</Link>
      </EndCta>
    </>
  );
}
