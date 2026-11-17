# Infyta website: colour and 3D-style drawings (Design)

Date: 2026-11-17. Status: written, waiting for the owner's approval. Branch: `colour-levels`.

This design builds on `2026-11-16-visual-redesign-design.md` (called "the first design" below), which is
live on `master`. Everything in the first design still holds unless section 14 of this document says it
is replaced.

## 1. Intent

The redesign shipped on 2026-11-17. The owner likes its concept, and said two things about it:

- It is "full monotone and basic pen-paper design without high graphic visuals", which "may seem dull to
  mass people in our demography (Bangladesh)".
- "The software is less highlighted in the hero diagram, but software is our major strength."

Measured on the light theme, the home page is roughly three-quarters pale paper, a quarter navy, and under
1% bright colour. Every drawing is outline only.

This design keeps the rule "nothing fake" and adds colour and depth to it:

1. Colour is used at about 60% ground, 30% navy, 10% bright, and every bright colour has one meaning.
2. The home hero becomes a 3D-style (isometric) drawing of the office, with one colour-coded zone per
   service, and software as its largest, warmest part.
3. The same colours carry through the service list and the service pages.

## 2. What the owner decided

| Decision | Owner's words or choice |
| --- | --- |
| Direction | Shown three levels in a mockup (colour pass; coloured drawings; illustrated). "Liked Level 3 … I liked this concept really!" |
| Software | "Software is our major strength", so it must lead the hero drawing. |
| Group highlight | "If you hover over any number, all the components related is not getting highlighted." It must. |
| Colour coding | "Everything is not properly separated and color coded … I am talking about the Hero drawing." It must be. |
| Build | The owner will run the implementation in a new session, "using sonets and haiku where it will not impact the quality of output and Opus where needed". |

The first two feedback points were raised on mockup version 1. Version 2 of the mockup answers them and is
what this document describes. Everything else here is a design call made on the owner's behalf; the calls
the owner should check are in section 13.

## 3. Goals, non-goals, anti-goals

### Goals

1. All ten routes and the 404 page take the colour system in section 6, in both themes.
2. The home hero is the 3D-style drawing in section 7, at every screen width.
3. In the hero drawing, each service has one colour, its equipment stands on its own island, and pointing
   at any piece of a service lights the whole service and dims the others.
4. Each service page takes its service's colour, and its drawing is that service's island, larger.
5. Wording, claims, URLs, titles, meta descriptions and structured data stay as they are.
6. Mobile Lighthouse stays at Performance 0.95 or better and Accessibility 0.98 or better on `/` and
   `/services/software-development`.
7. Text contrast stays at WCAG AA (4.5:1) in both themes, and lines that carry meaning reach 3:1.
8. Every page is still fully readable with JavaScript off. The drawings need no JavaScript at all.

### Non-goals

- New sections, new pages, new copy or new claims. A "software we build" band was discussed and is not
  part of this work.
- A separate phone-only drawing. Phones get the same scene (section 7.6).
- Redrawing the small drawings in the service list in 3D. They stay flat and gain colour (section 8.2).
- Photos, a CMS, a form backend, Bengali translation, analytics.

### Anti-goals (the work has failed if any of these ship)

- Everything in the first design's anti-goals that is not replaced in section 14: no stock or generated
  photos, no invented numbers, no fake technical decoration, no gradient text, no glass, no glows, no
  reveal-on-scroll, no hover that scales or bounces.
- A service colour used for another service. Teal and amber also have the site-wide uses listed in
  section 6.1, and no others.
- Soft shadows, blur or gradients. Depth comes from flat faces and from solid offset slabs only.
- Motion that runs for more than five seconds without the visitor asking for it.
- A drawing that is unreadable, or links that stop working, when CSS animation or `:has()` is missing.

## 4. Constraints

Unchanged from the first design: Next.js 16 App Router, React 19, `output: 'export'`, Cloudflare Pages, no
server code; `npm run check` must pass; `src/content/email.js` stays server-only; no `Math.random()` or
`Date.now()` in source.

Rules the existing tests encode and this work must keep or deliberately replace (section 11):

- One `<h1>` per page, and its text is unchanged. The home headline may contain a `<span>`; its text
  content must still read "Infyta – Limitless Tech Solutions".
- `<main>` on the home page contains an `<svg>` with a link to each of the five service pages, and each
  link's accessible name starts with the service's name.
- Each service page has `figure svg.dwg--detail[role="img"]` with today's `aria-label`, and every `<text>`
  in it is one of today's approved labels (the `DETAIL` table in `tests/build/services.test.mjs`).
- No element carries an inline `opacity:0`. No Tailwind palette class.
- The test that reads `src/styles/tokens.css` understands only `#RRGGBB`, `rgba(r,g,b,a)` and
  `var(--x)`; every token redefined for dark or inverse must exist on `:root` and be reset in the print
  block.
- `color-mix()` is not used in shipped CSS. The mockup uses it for speed; the site uses the fixed values
  in section 6.3, so the page looks the same in older phone browsers.
- A rule from the first build that no test enforces yet: new colours go in `tokens.css`, and components
  and other stylesheets use tokens. Today's exceptions stay as they are: the logo's own colours in
  `src/components/Logo.jsx`, and four translucent halos in `shell.css` and `base.css`. One of those, the
  closed dot's halo in `shell.css` (`rgba(233,162,59,.25)`), must follow the new amber:
  `rgba(245,166,35,.25)`.
- `<main>` is rendered by `src/app/layout.jsx`, and `shell.css` has rules that look at `<main>`'s direct
  children (`main:has(>.inverse:last-child)+.foot`). Do not wrap a page's sections in an extra element.

## 5. Approaches considered

### 5.1 How far to go

| | Approach | Trade-off | Outcome |
| --- | --- | --- | --- |
| 1 | **Colour pass.** Same outline drawings; colour on buttons, tags, bands. | Small. Fixes "monotone", not "pen and paper". Software stays small in the hero. | Kept as the base layer of level 3. |
| 2 | **Coloured drawings.** Level 1, plus the flat drawings filled in and colour-coded. | Medium. Fixes both, but the hero is still a flat schematic. | Kept for the small flat drawings only. |
| 3 | **Illustrated.** Level 2, with the hero redrawn in a 3D style and a bigger headline beside it. | Largest. Most graphic. Risk of looking like stock isometric art, answered by drawing only Infyta's five services with Infyta's labels. | **Picked by the owner.** |

### 5.2 Named styles that were rejected

| Style | Why not |
| --- | --- |
| Neumorphism | Low contrast and one colour by design: it would deepen the monotone problem and is hard to read on budget phones in daylight. |
| Neo-brutalism, in full | Loud and playful; wrong for a company selling networks, CCTV and servers on trust. Two traits are borrowed: flat solid colour, and crisp offset slabs with no blur. |
| Glass, gradients, glows | What the pre-redesign site had and what template sites look like. |

### 5.3 The hero drawing, version 1 against version 2

Version 1 kept one carpet per area and mixed colours inside areas (grey desks, amber screens in the teal
area, an amber database beside the blue servers), and each piece highlighted alone. The owner rejected
both. Version 2 gives every zone a raised island in one colour, puts only that service's equipment on it
in that colour, and makes IT Support the navy base under the whole office.

## 6. The colour system

The mockup is the visual source of truth for sections 6 to 8:
`docs/superpowers/specs/2026-11-17-colour-levels-assets/mockup-colour-levels.html` (home) and
`mockup-service-page.html` (Software Development), both at level 3. Open them in a browser; the bar at
the bottom switches level, theme and page. They are built by `build.mjs` from the real export in `out/`,
with `levels.css` (styles) and `iso.mjs` (the 3D drawings). Where this document and the mockup disagree,
this document wins. Where this document is silent, the mockup at level 3 decides.

### 6.1 What each colour means

| Colour | Meaning | Where |
| --- | --- | --- |
| Navy (ink) | The brand ground and the line. Also **IT Support & Consultancy**: it wraps everything else. | Text, outlines, inverse bands, the hero title block, the base of every 3D drawing. |
| Teal (signal) | The brand's bright colour, and **Network Infrastructure**. | Network zones and cables; site accents: heading bars, tags, slabs, the call-to-action band, lights. |
| Amber | **Software Development**, and the main action. | Software zone, screen and cables; primary buttons; and, as today, the "closed" status dot. Nothing else. |
| Azure | **Server & Cloud Solutions**. | Servers zone, the cloud, their cable and link. |
| Violet | **Security & Surveillance**. | Security zone, camera, door terminal, their cables. |

Software and "the thing to click" share amber on purpose: every other colour is cool, so the eye lands on
software first and on the button second.

On a page that is not about one service, the decorative accent is teal. On a service page it is that
service's colour, in exactly the places section 9.2 lists. The `--accent` token itself (links and the
focus ring) does not change on any page.

### 6.2 Brand constants

Unchanged: `--paper #F4F6FA`, `--white #FFFFFF`, `--ink #1F2C62`, `--ink-deep #172050`, `--ink-lift
#27367B`, `--signal #3AC1C2`, `--signal-deep #0B7378`, `--cyan #14B9DA`.

Changed: `--amber` goes from `#E9A23B` to `#F5A623`. It is still the "closed" status dot.

New: `--amber-hover #FFB83D`.

### 6.3 Service tokens

Each service has eight tokens. Names are for the builder to settle; the table uses the prefix `sw`, `net`,
`sec`, `srv`. Values are fixed colours, worked out from the mockup's mixes.

Paper (light), on white:

| Token | Use | Software | Network | Security | Server & Cloud |
| --- | --- | --- | --- | --- | --- |
| solid | Cable flags, bars on screens, slabs, page accent | `#F5A623` | `#3AC1C2` | `#8A70F2` | `#4D8EF7` |
| line | Cables and dashed links | `#C27500` | `#0E8F93` | `#5E45CC` | `#2563DB` |
| wash | Row hover, small-drawing tile | `#FEF3E2` | `#E5F7F7` | `#F0ECFD` | `#E8F0FE` |
| floor | Island top; tile on hover | `#FDEDD3` | `#D8F3F3` | `#E8E2FC` | `#DBE8FD` |
| top | Top face of equipment | `#FCE7C4` | `#CAEEEF` | `#DFD8FB` | `#CFE0FD` |
| left | Left face of equipment and islands; number badges and pins; flat-drawing device fill | `#FAD391` | `#9DE0E1` | `#C5B8F9` | `#A6C7FB` |
| right | Right face of equipment and islands | `#F8BD5C` | `#6DD1D2` | `#A895F5` | `#7BABF9` |
| chip | Number badges and pins | same as left | same as left | same as left | same as left |

Blueprint (dark), on navy:

| Token | Software | Network | Security | Server & Cloud |
| --- | --- | --- | --- | --- |
| solid | `#F5A623` | `#3AC1C2` | `#A996FF` | `#6EA4FF` |
| line | same as solid | same as solid | same as solid | same as solid |
| wash | `#464257` | `#244773` | `#383F7E` | `#2D427E` |
| floor | `#6D5C5D` | `#2D6593` | `#5357A8` | `#3F5BA8` |
| top | `#E09A29` | `#37B2B8` | `#9B8BEF` | `#6698EF` |
| left | `#AC7D38` | `#318EA1` | `#7A72CA` | `#537BCA` |
| right | `#7D6246` | `#2B6E8C` | `#5C5BA7` | `#4261A7` |
| chip | same as solid | same as solid | same as solid | same as solid |

IT Support has no hue. Its solid, line and chip are `--fg` (navy on Paper, white on Blueprint), its wash is
`#E2E4EB` on Paper and `#47527E` on Blueprint, and the text on its chip is `--bg`.

**Inside an inverse band** (navy in both themes) every service token takes its Blueprint value, and IT
Support's is white. So a number on a service chip is always navy on a bright colour, 5.2:1 or better,
whatever the theme. Text on any other service chip is `--ink`.

An element marked `data-svc="<slug>"` maps its service's eight tokens to `--svc`, `--svc-line`,
`--svc-wash`, `--svc-floor`, `--svc-top`, `--svc-left`, `--svc-right`, `--svc-chip`. Everything inside
reads only the `--svc-*` names.

Measured contrast: navy text on every Paper chip is 7.2:1 or better; navy text on every Blueprint chip is
5.2:1 or better; navy on amber is 6.5:1; navy on teal is 6.0:1; every Paper line on white is 3.6:1 or
better; every Blueprint solid on navy is 5.2:1 or better.

### 6.4 Other new tokens

| Token | Paper | Blueprint | Use |
| --- | --- | --- | --- |
| `--band-alt` | `#FFFFFF` | `#1A2556` | The second ground, so bands stop sharing one colour |
| `--band-tint` | `rgba(58,193,194,.11)` | same | Teal-tinted band, laid over the page ground |
| `--tag-bg` | `rgba(58,193,194,.17)` | same | Certification tag fill, on any ground |
| `--tag-line` | `rgba(58,193,194,.62)` | same | Certification tag border |
| `--dw-floor` | `#FFFFFF` | `#27367B` | Office floor in the 3D drawings |
| `--dw-wall-a` / `--dw-wall-b` | `#EEF1F8` / `#E0E6F2` | `#243270` / `#1C2860` | Left wall / right wall |
| `--dw-n-top` / `-left` / `-right` | `#FFFFFF` / `#E4E9F4` / `#CCD4E7` | `#3A4A96` / `#2B3A80` / `#1B2759` | Neutral faces: wall tops and ends, "Existing systems", the IT Support page's equipment |
| `--dw-base-b` | `#4C5681` | `#D2D5E0` | The base's right face. Its left face is `--fg`. |

The solid teal call-to-action band (section 6.5) sets its own text tokens: text `--ink`, secondary text
`rgba(31,44,98,.88)` (4.8:1 on teal), rules `rgba(31,44,98,.28)`, focus ring `--ink`.

### 6.5 The colour pass: what changes on every page

| Element | Change |
| --- | --- |
| Primary button | Amber fill, navy text, in every theme and band. Hover: `--amber-hover`; the dot turns solid navy. Exception: inside the teal call-to-action band the primary button is navy with white text. |
| Secondary (outlined) button | Unchanged. |
| Header | A 4px teal line along its top edge. |
| Section heading | A teal bar, 52 × 7px, above every section `<h2>` that opens a band (not above the small label headings). On a service page it takes the service colour. |
| Number badge (service rows) | 28px, filled with the service's chip colour, navy number. |
| Certification tag | `--tag-bg` fill and `--tag-line` border; text unchanged. |
| Text link | `--accent` colour. |
| Slab | A solid block offset 12px right and 12px down behind an element, no blur (16px behind the portrait). Used in exactly these places: the home hero sheet (teal), the advisor portrait (teal), the contact card in the call-to-action band (navy), a service page's drawing and its end panel (service colour), the services index end panel and the contact page's information panel (teal). Inside the drawings, the app window and its phone each have a 9px and a 6px amber slab. Nowhere else. |
| Advisor band | The role line is teal. |
| Call-to-action band (home) | A solid teal band in both themes, navy text. The contact card inside it is always a white card with navy text, a 1.5px navy border and a navy slab. |
| Bands | The grounds in section 9. |

Slabs do not print (`box-shadow: none` in print).

## 7. The home hero

### 7.1 Layout

The hero is still one sheet with a 1.5px frame, now on a teal slab.

- **1180px and wider:** two columns, 4.8 to 7.2. Left: the title block, filled navy (inverse tokens) in
  both themes, holding the headline, then the intro, then the two buttons, centred vertically. Right: the
  drawing, with a 1.5px rule between them. Under both, across the full width: the four-cell strip, also
  navy.
- **Below 1180px:** the title block comes first (as today: headline and buttons, then the intro), then
  the drawing at full width (never wider than 944px, centred), then the strip.
- The headline is `clamp(2.1rem, 3.3vw, 2.95rem)` in the two-column layout and today's size otherwise. The
  word "Limitless" is teal (`--signal`, 6.0:1 on navy). In the two-column layout it sits on its own line,
  so the headline reads "Infyta –" / "Limitless" / "Tech Solutions".
- In the HTML the headline block still comes before the drawing.

The strip's text is unchanged: Drawing "Typical office network"; Drawn by "Infyta, Azimpur, Dhaka"; Scale
"Not to scale"; Key "1 to 5 are our services. Select any part."

### 7.2 The drawing kit

All 3D drawings share one projection, one face rule and one set of parts. The geometry source of truth is
`iso.mjs` in the assets folder; port its coordinates as they are.

- **Projection.** World units; `x` runs down-right, `y` down-left, `z` up. Screen x = origin x + (x − y) ×
  34.64. Screen y = origin y + (x + y) × 20 − z × 40. No perspective.
- **Faces.** A box shows three faces: top, left (the +y face) and right (the +x face). Equipment uses the
  service's `top`, `left` and `right` tokens. An island uses `floor`, `left`, `right`. Panels on a face
  (rack units, screens, the door) are filled with `--sheet`.
- **Line.** 1.5px in `--fg`, round joins, non-scaling, as in the flat drawings. Fine detail is 1.1px.
- **Lights.** Status lights and lit ports are `--signal` in every zone, as today: teal still means "on".
- **Island.** A platform 0.14 units high in its service's colour. Only that service's equipment stands on
  it, and all of it takes that service's colour.
- **Paint order.** Base, walls, floor, cables, islands with their painted labels, then equipment sorted
  back to front (by x + y), then what floats above (cloud, app window, their links), then upright labels
  and pins.

### 7.3 The hero scene

Origin (440, 168), `viewBox="0 0 944 660"`. The floor is 12 × 10 units with two back walls 2.6 high. It
stands on a base 0.78 high.

| Zone | Service | Island: back corner, size | Equipment, all in the service colour |
| --- | --- | --- | --- |
| Network core | Network | (0.35, 0.15), 2.8 × 2.4 | One rack, 1.6 × 1.0 × 2.45, with three units on its front: router (four ports and a light), firewall, core switch (two rows of seven ports, four lit) |
| Software | Software | (4.2, 0.15), 7.4 × 2.4 | Two databases (cylinders) and one large screen on a stand showing a bar chart |
| Servers | Server & Cloud | (0.15, 3.45), 3.0 × 2.9 | Two racks against the left wall, 2.6 and 2.25 high, with server units on their fronts |
| Staff | Network | (4.2, 3.45), 7.4 × 2.9 | Three desks, each with a monitor and a keyboard |
| Security | Security | (0.15, 7.05), 5.2 × 2.8 | A recorder against the left wall, a camera on the wall above it, a door in the wall, and the access terminal beside the door |
| Guest Wi-Fi | Network | (6.4, 7.05), 5.2 × 2.8 | A bench, a low table, and an access point on a pole with three arcs above it |

Outside and above:

- **IT Support** is the base: its two visible faces are navy on Paper and white on Blueprint. "Your office"
  is written on the left face and "IT Support & Consultancy" on the right face, in the plane of each face,
  with pin 3 after it.
- **The cloud** (azure) floats above the left wall, over the servers, joined to the tall rack by a dashed
  azure link.
- **The internet line** (teal, dashed) runs from the cloud to the top of the network rack.
- **The app window** is the one flat object: a 250 × 158 dashboard with an amber title bar, three tiles
  and eight bars, a phone screen overlapping its lower right corner, and an amber slab behind each. It
  floats above the right wall, over the software island, joined by two amber links: one from the first
  database, one from the screen. It is the largest single object in the drawing.

Cables run on the floor in the aisles between islands, each in its segment's `line` colour, all starting
at the network rack: azure to the servers, amber to the first database, teal to the three desks with a
branch to the access point, violet to the recorder. No cable crosses an island of another colour.

### 7.4 Labels and pins

Words are today's hero labels, regrouped. No new words.

| Where | Text | Style |
| --- | --- | --- |
| Above, left | "Cloud" / "AWS, Azure, Google Cloud"; "Servers" / "Windows, Linux, VMware" with a leader to the rack | Upright |
| Above, centre | "Router, firewall, core switch" / "MikroTik, Fortinet, Cisco" with a leader to the rack; "Internet" by the dashed line | Upright |
| Above, right, under the app window | "Business software" / "SQL Server, MySQL, MongoDB" | Upright |
| Painted on the Staff island | "Staff workstations" | Lying on the island, along x |
| Painted on the Security island | "CCTV cameras" / "Recorder"; "Access control" / "Biometric attendance" | Lying |
| Painted on the Guest Wi-Fi island | "Office Wi-Fi" / "Guest access" | Lying |
| On the base | "Your office"; "IT Support & Consultancy" | In the face plane |

Painted labels are drawn with their island, before equipment, so they can never spill over an island
edge. Sizes in drawing units: upright 17.5 and 15.5; painted 18.5 and 16; base 16.5.

Pins are the numbered circles, 12.5 radius, filled with the service's chip colour, with a navy number: 1
on the app window's corner, 2 on the network rack, 3 on the base, 4 on the recorder, 5 on the cloud and on
the tall server rack. Pin 3 sits on the base, which is its own colour, so it is drawn the other way
round: filled with `--sheet`, number in `--fg`. Two more network pins (on the Staff island and on the access point) show only below 720px.

### 7.5 Links, group highlight and keyboard

- The drawing holds **exactly five links**, one per service, in the order of `services`. Each link's
  accessible name is the service's name (for IT Support: "IT Support & Consultancy: the whole office").
- A link is drawn last and contains that service's pins, its upright labels and transparent hit shapes
  that together cover every visible piece of the service: its islands, the equipment that rises above
  them, its cables and links (a wide transparent stroke), and its floating objects. For IT Support: the
  base. So a click, tap or hover on any piece of a service reaches its link, and the five links are the
  only tab stops. Where two services' hit shapes overlap, the one nearer the viewer is drawn later.
- The visible pieces (islands, equipment, cables, painted labels) are plain groups marked
  `data-svc="<slug>"` and hidden from assistive technology.
- **Group highlight.** While one service's link is hovered or focused, every piece of the other four
  services drops to 24% opacity. Walls and floor never dim. The same happens while that service's row in
  the list below is hovered or focused. Hovering or focusing a service in the drawing marks its row with
  the row's own hover look (section 8.2); today's white mark would not show on the new white ground.
- Focus shows a 2px `--accent` outline around the service's pin.
- This is CSS only (`:has()`), like today's row-and-drawing highlight. Without `:has()` nothing dims and
  every link still works.

The mockup takes a shortcut here: it wraps every piece in its own link. Build it as this section says.

### 7.6 Small screens

One drawing serves every width.

- **720px and wider:** all labels show.
- **Below 720px:** upright labels, painted labels and the base text are hidden. Pins grow to 2.3 times
  their size and the two extra network pins appear. The numbered list under the hero is the key, and each
  link's accessible name still names its service.

### 7.7 Motion

- **On load, once:** the zones appear in turn (network core, then servers and software, then staff, then
  security and guest Wi-Fi), each a 0.3s fade, all within 1.8s. Then one dot travels each cable and link
  twice, 1.5s a pass on every cable whatever its length. The whole sequence ends within five seconds.
  Nothing loops after that.
- **On hover or focus of a service** (in the drawing or in the list): the dots on that service's cables
  travel while it is held.
- Reduced motion and print: the drawing is complete and still, and there are no dots.
- CSS only. The headline is never part of the sequence.
- Lit ports do not blink.
- The mockup's dots loop forever at their own speeds, and its zones do not fade in. Those are mockup
  shortcuts; build the timings above.

## 8. The other drawings

### 8.1 Service page drawings

Each service page's drawing becomes that service's island, larger, on a small floor with a thin navy base
(0.4 high, no text). It keeps `class="dwg dwg--detail"`, `role="img"`, today's `aria-label`, and only
today's approved labels. It has no links, no pins and no highlight. Its links (dots) follow section 7.7's
hover rule only if the builder finds it cheap; otherwise it is still.

Software Development is drawn in the mockup (`isoSoftwareDetail` in `iso.mjs`, `viewBox="0 0 590 450"`):
the software island with its two databases and screen; the app window above, labelled "Web application",
and its phone, labelled "Mobile app"; "Database" / "SQL Server, MySQL, MongoDB" painted on the island; and
a neutral rack off the island, joined by a dashed amber link and labelled "Existing systems".

The other four are for the builder to draw with the same kit, and for the owner to review:

| Service | What the drawing shows | Labels (all from today's list) |
| --- | --- | --- |
| Network Infrastructure | The network core island with the internet line coming in, and cables out to three small islands: one desk pair (teal), an access point (teal), and a camera on a pole on a violet island | Internet; Router, MikroTik; Firewall, Fortinet; flags Cameras, Guest Wi-Fi, Staff; CCTV; Office Wi-Fi; Workstations. The switch has no label on this page. |
| IT Support & Consultancy | A small office on the navy base, with "Your office" on the base. One rack, two desks, an access point and a server rack stand on the floor in the neutral faces: no islands, because this service is the base itself | Your office; Router; Workstations; Office Wi-Fi; Servers |
| Security & Surveillance | The security island as in the hero, fed by a violet cable from a small teal box | Switch; Cameras; CCTV cameras; Recorder; Access control, Biometric attendance |
| Server & Cloud Solutions | The servers island: one rack; a second rack as a host with three small flat cards floating above it; the cloud above, on a dashed azure link | Servers, Windows, Linux, Active Directory; Virtual machines, VMware, Hyper-V; Cloud, AWS, Azure, Google Cloud |

A camera on another service's page keeps violet, and a switch keeps teal: a colour always means its
service.

### 8.2 The small flat drawings

The five small drawings in service rows stay flat, with today's symbols. They gain colour:

- Device bodies are filled with the service's `left` token (IT Support: `--sheet`).
- In a service row the drawing sits on a tile: 196px wide, 10px radius, 12px 14px padding, filled with the
  service's `wash`; on row hover, `floor`. The row's hover ground is the service's `wash`.
- The dashed internet lines take the service's `line` colour.
- The row no longer turns the drawing teal on hover.

Symbols that nothing uses after the flat hero is removed may be deleted.

## 9. Pages

Grounds, top to bottom. "Paper" means the page ground `--bg`.

| Page | Bands |
| --- | --- |
| Home | Hero on paper. Our Services on `--band-alt`. Our Core Expertise on `--band-tint`, with full top padding. Chief Advisor inverse. Call to action: the solid teal band. Footer inverse. |
| Services index | Page header on paper. Service rows on `--band-alt`. End panel on paper, with a teal slab. |
| Service page | Hero on paper, drawing on a slab. Overview and What's Included on `--band-alt`, with full padding. Our Approach inverse. The rest on paper, unchanged. End panel with a slab. |
| About | Page header on paper. Vision and Mission on `--band-alt`. "Infyta at a glance" on paper. Core Values on `--band-tint`. Team call to action inverse. |
| Team | Page header on paper. Chief Advisor inverse, portrait on a slab. Core Expertise on `--band-tint`. |
| Contact | Page header on paper. Form and information on `--band-alt`; the information panel has a teal slab. Map sheet unchanged. |
| 404 | On paper. Its buttons take the colour pass. It has no drawing today and gains none. |

### 9.1 Home

1. The hero (section 7).
2. Our Services: rows with coloured badges and tiles (sections 6.5, 8.2).
3. Our Core Expertise: schedule unchanged; tags filled.
4. Chief Advisor: portrait slab; role in teal; "View Our Team" amber.
5. Call to action: section 6.5.

### 9.2 Service pages

Every section of a service page is marked with the service's slug, so the page reads `--svc-*`:

- The heading bars, the drawing's slab and the end panel's slab take the service's solid colour. The step
  numbers in "Our Approach" are filled with the service's chip colour, with a navy number. This list is
  complete: nothing else on the page changes with the service.
- "Our Approach" is an inverse band, so its heading bar and step numbers use the Blueprint values
  (section 6.3). On the IT Support page the accent is navy on Paper and white on Blueprint and in the
  inverse band, where its step numbers are white with a navy number.
- Buttons stay amber. Related Services rows keep their own services' colours.

## 10. Accessibility and performance

- Contrast: section 6.3's measurements, guarded by tests (section 11).
- The hero drawing is a labelled group with five links; pieces are hidden from assistive technology
  (section 7.5). Detail drawings are single images with today's descriptions.
- Colour is never the only carrier: every zone also has a number, a place and (from 720px) a name.
- Touch targets stay 44px or larger; a zone's hit shape is far larger.
- Motion: section 7.7.
- No new client JavaScript. The drawings are server-rendered SVG. No new font, no new image file.
- The 3D hero is about 30KB of markup in the mockup; it replaces two flat drawings (wide and tall).
- Targets: goal 6.

## 11. Tests

Replace:

- `tests/build/home.test.mjs`, "hero drawing links to every service, in both layouts": the home `<main>`
  has one hero drawing `<svg>` with an `aria-label`; it contains exactly five `<a>`, one per service, in
  order, each `aria-label` starting with the service's name; no other element in it is focusable.
- `tests/unit/drawing-css.test.mjs`: keep the two highlight-rule checks in whatever form the new
  selectors take (a rule per service for row-to-drawing and drawing-to-row). Rewrite the motion checks
  for section 7.7: under reduced motion and under print, every animated class in the hero drawing has
  `animation: none` and full opacity, and the travelling dots are not displayed.
- `tests/unit/tokens.test.mjs`, "brand constants": `--amber` is `#F5A623`.

Add:

- Unit, tokens: every value in sections 6.3 and 6.4 is present with the right value in Paper and
  Blueprint, the dark values match between the media query and `data-theme`, and print resets them.
- Unit, contrast: `--ink` on each service's chip in Paper, Blueprint and the inverse band, `--ink` on
  `--amber` and on `--amber-hover`, `--ink` on `--signal`, and the call-to-action band's secondary text
  on `--signal`, each 4.5:1 or better; each service's `line` on `--sheet` in both themes, 3:1 or better.
- Unit: no file under `src/` contains `color-mix(`, and none except `src/styles/tokens.css`,
  `src/lib/theme-script.js` and `src/components/Logo.jsx` contains a hex colour.
- Build, home: the headline's text content is unchanged; the drawing's `<text>` nodes are only the words
  in section 7.4 and the pin numbers 1 to 5.
- Build, services: unchanged tests must pass against the new drawings (same class, role, label and words).
- Build: every section in a service page's `<main>` carries that page's `data-svc`.

All other tests pass unchanged.

## 12. Words

No visible wording changes. For the owner's review list:

- Hero labels are regrouped: "Router", "Firewall" and "Core switch" become one label, "Router, firewall,
  core switch", with "MikroTik, Fortinet, Cisco" under it.
- Five small cable labels leave the hero drawing, because each zone now has its own island and name:
  "Staff", "Guest Wi-Fi", "Cameras", "Doors" and the second "Servers".
- All other hero labels are as they are today.
- Words only screen readers announce: the hero drawing's description becomes "3D-style drawing of a
  typical office. Each coloured zone links to the Infyta service that builds it."

## 13. Calls made for the owner to check

1. **Hero layout.** Headline on the left, drawing on the right, on wide screens. This replaces "drawing
   first, headline under it", which the owner approved on 2026-11-16.
2. **"Limitless" in teal**, on its own line on wide screens.
3. **Strict colour coding.** Staff screens are teal, not amber: showing software on those screens would
   put amber inside a network zone. Software's presence comes from its own island and the app window.
4. **Picture-only objects.** The guest zone has a bench and a table; the software zone has a large screen
   and two databases. They carry no labels and make no claim.
5. **The drawing's name** stays "Typical office network", although software now leads. "Typical office"
   would fit better and is a wording change the owner can ask for.
6. **Small drawings in the service list stay flat**, as icons, and gain colour.
7. **Four service drawings are not in the mockup** (section 8.1). The owner sees them after the build.
8. **Phones:** labels are hidden in the hero drawing; numbered pins and the list below are the key.
9. **Motion:** dots run briefly on load and while a service is pointed at. Nothing runs forever.
10. **Amber buttons everywhere**, a solid teal call-to-action band in both themes, and the advisor's role
    line back in teal.
11. **Brighter amber.** `#F5A623` replaces `#E9A23B`, including the "closed" dot.
12. **Service pages take their service's colour.** The IT Support page is navy.
13. **Inside navy bands**, service colours use their brighter Blueprint shades, so numbers on them stay
    readable in both themes.
14. **Five small cable labels leave the hero** (section 12).

## 14. What this replaces in the first design

| First design | Now |
| --- | --- |
| Principle 4: "Navy is ink. Teal means 'on' … Nothing else is coloured." | Section 6.1. Teal lights still mean "on". |
| Principle 5: rules and rows instead of shadowed cards | Still true, plus the slabs listed in section 6.5. No soft shadow anywhere. |
| Anti-goal: "a different accent colour per card" | A colour per service, used only for that service (section 3). |
| Section 5.2 and 7.2.1: the sheet hero, drawing above the headline | Section 7.1. |
| Section 6.6, Button: filled navy, dot lights teal | Section 6.5. |
| Section 6.6, Service row: hover turns the drawing teal | Section 8.2. |
| Section 6.7: flat hero drawing in two layouts; flat detail drawings | Sections 7 and 8. Small drawings stay flat. |
| Section 6.8: one load sequence, everything else still | Section 7.7. |
| Section 7.4.3: "Our Approach" numbers outlined | Filled with the service colour (section 9.2). |

## 15. Left to the builder

- How the kit is written for the site: a small geometry module with server components, or another shape.
  It must render the same SVG the mockup shows and ship no client JavaScript.
- Token names, and how `data-svc` maps to `--svc-*`.
- How each service-page section gets `data-svc` (a prop to each section is enough).
- The four remaining service drawings, within section 8.1, and their `viewBox`.
- The travelling dots: CSS `offset-path` or another CSS-only way that meets section 7.7.
- The hit shapes in section 7.5.
- Which unused flat symbols to delete.
- The order of work, as long as the branch ships all pages together.

## 16. Rollout

Work continues on `colour-levels`, which already holds the mockup and this document. It is finished when
`npm run check` passes and the Lighthouse targets hold on a local build. Then add a "Colour and 3D
drawings" part to section 4 of `docs/review-list.md` with the calls in section 13 and the words in
section 12.

The implementation plan will name a model for each task (cheaper models where the result does not depend
on judgement, the strongest where it does: the drawing kit, the four new drawings and the final review)
and will checkpoint after every phase, as the owner asked. Merging to `master` and pushing are the
owner's steps.

To rebuild the mockup, from the repository root after `npm run build`:

```sh
node docs/superpowers/specs/2026-11-17-colour-levels-assets/build.mjs "$PWD" docs/superpowers/specs/2026-11-17-colour-levels-assets
```
