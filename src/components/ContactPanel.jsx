import { OpenStatus, WeekStrip } from "@/components/OpenStatus";
import { site } from "@/content/site";

// Hours, address, phone and email. The email arrives as a prop: it is read on the server only.
export default function ContactPanel({ email, className }) {
  return (
    <div className={className ? `panel ${className}` : "panel"}>
      <div className="hours__state"><OpenStatus variant="long" /></div>
      <p className="label" style={{ marginTop: 4 }}>Dhaka time</p>
      <WeekStrip />
      <dl className="facts">
        <div className="wide">
          <dt>Our office</dt>
          <dd>
            <address>{site.address.display}</address>
            <span className="bn" lang="bn">আজিমপুর, ঢাকা</span>{"   "}
            <a className="textlink" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
          </dd>
        </div>
        <div><dt>Phone</dt><dd><a className="tel" href={`tel:${site.phone.e164}`}>{site.phone.display}</a></dd></div>
        <div><dt>Email</dt><dd><a href={`mailto:${email}`}>{email}</a></dd></div>
      </dl>
    </div>
  );
}
