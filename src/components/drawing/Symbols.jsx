// The shared device symbols (mock/diagram.mjs `symbols`). Rendered once at the start of <body>, hidden;
// every drawing pulls from it with <use>. Part classes (.body, .thin, .led, .port, .lit, .dots) are styled in drawing.css.
export default function DrawingSymbols() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <g id="d-router"><rect className="body" width="80" height="36" rx="5" /><circle className="led" cx="13" cy="18" r="2.8" /><g className="port"><rect x="27" y="13" width="9" height="10" rx="1.2" /><rect x="40" y="13" width="9" height="10" rx="1.2" /><rect x="53" y="13" width="9" height="10" rx="1.2" /><rect x="66" y="13" width="9" height="10" rx="1.2" /></g></g>
        <g id="d-firewall"><rect className="body" width="80" height="36" rx="5" /><g className="thin"><rect x="10" y="8" width="39" height="20" rx="1" /><path d="M10 18h39M23 8v10M36 8v10M16.5 18v10M29.5 18v10M42.5 18v10" /></g><circle className="led" cx="65" cy="18" r="2.8" /></g>
        <g id="d-pc"><rect className="body" width="30" height="20" rx="2.5" /><path d="M15 20v5M8 25.5h14" /></g>
        <g id="d-nvr"><rect className="body" width="76" height="28" rx="4" /><g className="thin"><rect x="8" y="8" width="20" height="12" rx="1.5" /><rect x="33" y="8" width="20" height="12" rx="1.5" /></g><circle className="led" cx="65" cy="14" r="2.6" /></g>
        <g id="d-dome"><path d="M0 0h24" /><path className="body" d="M2 0a10 10 0 0 0 20 0z" /><circle className="led" cx="12" cy="4.4" r="2.2" /></g>
        <g id="d-bullet"><path d="M5 0v6" /><rect className="body" x="0" y="6" width="28" height="12" rx="3" /><path className="thin" d="M21 6v12" /><circle className="led" cx="24.6" cy="12" r="1.7" /></g>
        <g id="d-server"><rect className="body" width="88" height="18" rx="3" /><path className="thin" d="M10 5.5v7M15.5 5.5v7M21 5.5v7M26.5 5.5v7M42 7h22M42 11h22" /><circle className="led" cx="77" cy="9" r="2.4" /></g>
        <g id="d-cloud"><path className="body" d="M22 50h46a15 15 0 0 0 1.5-29.9a21 21 0 0 0-40.6-5.6a18.5 18.5 0 0 0-6.9 35.5z" /></g>
        <g id="d-app"><rect className="body" width="84" height="56" rx="4" /><path d="M0 12h84" /><g className="dots"><circle cx="8" cy="6" r="1.5" /><circle cx="14.5" cy="6" r="1.5" /><circle cx="21" cy="6" r="1.5" /></g><path className="thin" d="M10 23h34M10 32h52M10 41h26M56 44v-9h8v9M68 44V26h8v18" /></g>
        <g id="d-db"><path className="body" d="M0 6v22a18 6 0 0 0 36 0V6" /><ellipse className="body" cx="18" cy="6" rx="18" ry="6" /><path className="thin" d="M0 17a18 6 0 0 0 36 0" /></g>
      </defs>
    </svg>
  );
}
