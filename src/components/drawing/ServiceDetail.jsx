// The 3D-style drawing beside each service page's headline (spec 8.1): that service's island, larger, on a small floor
// with a thin navy base. Each drawing lives in ./detail. They are still pictures: no links, no pins, no motion, and only
// the labels the spec allows. Colour comes from data-svc: the page's sections carry their own service, and a piece
// of another service carries that service's slug.
import * as software from "./detail/Software";
import * as network from "./detail/Network";
import * as itSupport from "./detail/ItSupport";
import * as security from "./detail/Security";
import * as servers from "./detail/Servers";

const DRAWINGS = {
  "software-development": { ...software, label: "Drawing: a web application and a mobile app sharing one database, linked to existing systems." },
  "network-infrastructure": { ...network, label: "Drawing: internet link, router, firewall and switch feeding separate segments for cameras, guest Wi-Fi and staff." },
  "it-support-consultancy": { ...itSupport, label: "Drawing: an office with workstations, a server, an access point and a router inside one boundary." },
  "security-surveillance": { ...security, label: "Drawing: cameras and a recorder, and a door terminal for access control and attendance, on their own network segment." },
  "server-cloud-solutions": { ...servers, label: "Drawing: a rack of servers, a host running virtual machines, and a link to the cloud." },
};

export default function ServiceDetail({ slug }) {
  const drawing = DRAWINGS[slug];
  if (!drawing) return null;
  return (
    <svg className="dwg dwg--detail dwg--iso" viewBox={drawing.viewBox} role="img" aria-label={drawing.label}>
      {drawing.body}
    </svg>
  );
}
