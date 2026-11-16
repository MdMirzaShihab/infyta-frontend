// The small decorative drawing in each service row (mock/diagram.mjs `minis`), 168 x 60.
const MINIS = {
  "software-development": (
    <>
      <use href="#d-app" transform="translate(18 6) scale(.84)" />
      <path d="M89 30H112" />
      <use href="#d-db" x="112" y="12" />
    </>
  ),
  "network-infrastructure": (
    <>
      <path className="wan" d="M0 30H14" />
      <use href="#d-router" transform="translate(14 17) scale(.72)" />
      <path d="M72 30H92" />
      <use href="#d-firewall" transform="translate(92 17) scale(.72)" />
      <path d="M150 30H168" />
    </>
  ),
  "it-support-consultancy": (
    <>
      <rect className="boundary" x="6" y="5" width="156" height="50" rx="8" />
      <use href="#d-pc" x="22" y="17" />
      <use href="#d-server" transform="translate(64 21) scale(.92)" />
    </>
  ),
  "security-surveillance": (
    <>
      <use href="#d-nvr" x="14" y="6" />
      <path d="M52 34V46H104" />
      <use href="#d-dome" x="104" y="20" />
      <path d="M116 8V20" />
      <use href="#d-bullet" x="134" y="30" />
    </>
  ),
  "server-cloud-solutions": (
    <>
      <use href="#d-server" transform="translate(10 12) scale(.9)" />
      <use href="#d-server" transform="translate(10 32) scale(.9)" />
      <path className="wan" d="M89 30H106" />
      <use href="#d-cloud" transform="translate(102 6) scale(.72)" />
    </>
  ),
};

export default function ServiceMini({ slug }) {
  return (
    <svg className="dwg dwg--mini" viewBox="0 0 168 60" aria-hidden="true" focusable="false">
      {MINIS[slug]}
    </svg>
  );
}
