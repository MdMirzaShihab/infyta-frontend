import { FaCode, FaNetworkWired, FaHeadset, FaVideo, FaServer } from "react-icons/fa";

const ICONS = {
  "software-development": FaCode,
  "network-infrastructure": FaNetworkWired,
  "it-support-consultancy": FaHeadset,
  "security-surveillance": FaVideo,
  "server-cloud-solutions": FaServer,
};

export default function ServiceIcon({ slug, className }) {
  const Icon = ICONS[slug] ?? FaCode;
  return <Icon className={className} aria-hidden="true" />;
}
