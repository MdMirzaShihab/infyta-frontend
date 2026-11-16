import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import MapLoader from "@/components/MapLoader";
import { OpenStatus, WeekStrip } from "@/components/OpenStatus";
import { site } from "@/content/site";

export default function ContactView({ emails, email }) {
  return (
    <>
      <PageHeader title="Get In Touch" lede="Let's discuss how we can transform your business with our tech solutions" />
      <section className="band cpage">
        <div className="wrap cpage__grid">
          <div>
            <h2 className="cpage__h">Send Us A Message</h2>
            <ContactForm phoneE164={site.phone.e164} email={email} />
          </div>
          <div>
            <h2 className="cpage__h">Contact Information</h2>
            <div className="panel">
              <div className="hours__state"><OpenStatus variant="long" /></div>
              <p className="label cpage__tz">Dhaka time</p>
              <WeekStrip />
              <dl className="facts">
                <div className="wide">
                  <dt>Our Office</dt>
                  <dd>
                    <address>{site.address.display}</address>
                    <span className="bn" lang="bn">আজিমপুর, ঢাকা</span>{"   "}
                    <a className="textlink" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                  </dd>
                </div>
                <div><dt>Phone</dt><dd><a className="tel" href={`tel:${site.phone.e164}`}>{site.phone.display}</a></dd></div>
                <div><dt>WhatsApp</dt><dd><a className="tel" href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">{site.phone.display}</a></dd></div>
                <div>
                  <dt>Email</dt>
                  <dd>{emails.map((e) => <span className="line" key={e}><a href={`mailto:${e}`}>{e}</a></span>)}</dd>
                </div>
                <div>
                  <dt>Working Hours</dt>
                  <dd>{site.hours.display.map((line) => <span className="line" key={line}>{line}</span>)}</dd>
                </div>
              </dl>
            </div>
            <MapLoader src={site.mapEmbedUrl} title="Infyta Office Location" mapsUrl={site.mapsUrl} address={site.address.display} />
          </div>
        </div>
      </section>
    </>
  );
}
