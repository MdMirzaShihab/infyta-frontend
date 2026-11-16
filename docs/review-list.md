# Owner review list

New copy written for the Next.js SEO migration. Please read each item and tell us what to change.
All copy uses only facts already on the site: the five services, the technologies and
certifications in the Team page's "Core Expertise", the address, phone, email and hours, and
"Infyta's team includes certified engineers and instructors". The copy lives in
`src/content/services.js` and `src/content/pages.js`.

## 1. Content to review

### Service pages
Each page has: hero subtitle, Overview (2 paragraphs), What's Included, Our Approach,
Technologies & Certifications, Frequently Asked Questions and Related Services.

| Page | Overview | Included | Approach | FAQs |
| --- | --- | --- | --- | --- |
| [Software Development](https://infyta.com/services/software-development) | 2 paragraphs | 5 items | 4 steps | 5 |
| [Network Infrastructure](https://infyta.com/services/network-infrastructure) | 2 paragraphs | 6 items | 4 steps | 5 |
| [IT Support & Consultancy](https://infyta.com/services/it-support-consultancy) | 2 paragraphs | 5 items | 4 steps | 5 |
| [Security & Surveillance](https://infyta.com/services/security-surveillance) | 2 paragraphs | 5 items | 4 steps | 5 |
| [Server & Cloud Solutions](https://infyta.com/services/server-cloud-solutions) | 2 paragraphs | 6 items | 4 steps | 5 |

Points to check on the service pages:
- Mobile app development is described as part of Software Development, and cloud services as
  part of Server & Cloud Solutions (the old separate pages are gone).
- The certifications named in copy (CCNA, MTCNA, MTCRE, MTCSE, MCITP, RHCSA, VMware Certified,
  AWS Specialist, Certified Scrum Master) are presented as held across the team, as confirmed.
  Please confirm each is still held by someone on the team.
- The copy says Infyta can maintain and monitor networks, provide ongoing support and administer
  servers after a project. These follow from the service summaries already on the site; please
  confirm they are services you offer.

### Home page intro
[Home](https://infyta.com/), in the "Our Services" section (replaces the line "Comprehensive IT
solutions designed to propel your business forward."):

> Infyta is an IT solutions company in Azimpur, Dhaka, Bangladesh. We provide software
> development, network infrastructure, IT support and consultancy, security and surveillance, and
> server and cloud solutions. Infyta's team includes certified engineers and instructors, and we
> work with businesses in Dhaka and across Bangladesh.

### About page: "Infyta at a glance"
[About](https://infyta.com/about), between "Our Vision / Our Mission" and "Our Core Values".
Lists: what Infyta does, address, the 5 services (as links), opening hours, phone and email.

### Owner to confirm
- Md. Arif's highlight "Managed 15K+ nodes network infrastructure" is copied unchanged from the
  existing Team page. Please confirm the figure.
- The site already says "Get a free IT consultation" (Contact page description and the Services
  page). Please confirm free consultations are still offered, or tell us to remove the wording.
- Two phrases in the service copy are not in the Team page's expertise data: "live and recorded
  viewing" (CCTV) and "separate guest access" (Wi-Fi). Please confirm both are accurate, or tell
  us to remove them.
- The logo source file is only 200 × 119 px, so the site icon (`icon.png`) and the logo in the
  social sharing (OG) image are upscaled and may look soft. Please supply a high-resolution logo
  (ideally SVG, or PNG at least 1024 px wide).

## 2. Wanted but unsourced

These would help customers and search engines, but we had no source for them, so they are not
on the site. Supply the facts and we can add them.
- Pricing or typical cost ranges for any service, and whether written quotes are free.
- Response times for support requests, and whether emergency or out-of-hours support exists.
- Whether engineers visit sites across all of Dhaka (or outside Dhaka), and any call-out terms.
- Warranty or after-sales terms for installed CCTV, access control and network equipment.
- Specific CCTV, access control and attendance device brands Infyta installs.
- Typical project timelines (for example, how long a network or CCTV installation takes).
- Industries or kinds of businesses Infyta has worked with, and any client names or case studies
  you are happy to publish.
- Year founded or company history.

Service details removed from the copy until you confirm them (tell us which to add back):
- Site visits, site surveys or on-premises assessments before a network or security installation
  (the copy now says only that we review your layout and requirements with you).
- Training your staff at handover, for example how to view CCTV footage and manage users.
- Written network documentation handed over after installation.
- Migrating servers to the cloud in stages to limit disruption to your work.
- Who IT support is for: businesses with no in-house IT staff, or working alongside an existing
  IT team.
- Labeled cabling and network rack installation as part of structured cabling.
- Card and PIN code access control (the site lists only access control and biometric devices).
- Fingerprint readers specifically (the site says only "biometric devices").

## 3. Visible speed changes

Changes made for mobile speed (spec 5.9 trade-offs 1 to 3). Mobile Lighthouse Performance is now
0.99 to 1.00 on the pages tested, so trade-offs 4 and 5 were not needed.
- Home hero: the first slide is a plain image at first. The slider and the other five slides
  load after the page has finished loading, about a second later on a typical connection.
  It looks the same until the slider starts. The first slide change then works as before.
- Home hero: if your device is set to reduce motion, the hero shows only the first slide and
  does not auto-rotate.
- Home hero: the heading block now slides up into place without fading in. It is visible straight away.
- Every page's main heading (Services, each service page, About, Team, Contact) slides into
  place without fading in. The intro line under the heading on Services, About, Team and Contact
  no longer fades in. It is visible straight away.
- The floating background circles (Footer, About, Contact, Team) are no longer shown on
  phones or small tablets (below 768 px wide), or when your device is set to reduce motion.
  On larger screens they stay as before.
- All framer-motion animations (including the floating Team photo and the looping Team
  banner) now respect your device's reduce-motion setting.

Accessibility to decide (not changed, because brand colours must stay): Lighthouse flags low
colour contrast for white text on the teal brand colour (#3ac1c2) (the "Get Started" button),
teal text on white ("Learn more" links, "Touch" highlight), and the small blue tags on service
pages. Accessibility still scores 0.96. A darker teal for text and buttons would fix it.

Note: the slider, the floating circles and the hero animations described above no longer exist.
The redesign (section 4) replaced them, and the speed figures there are the current ones.

## 4. Visible changes in the redesign

What a visitor will notice, in plain words. Please read it and tell us what to change.

### The new look
- The whole site has a new design: a technical drawing look, with thin lines, a grid, small
  labels and one teal accent.
- There are two themes. "Paper" is light and "Blueprint" is dark. The site follows the visitor's
  device setting at first, and a "Theme" switch (Paper, Blueprint) in the header and the footer
  lets them choose. The choice is remembered.
- The old photo slider on the home page is gone. In its place is a line drawing, "Typical office
  network", that draws itself once when the home page loads. If the device is set to reduce
  motion, or the page is printed, it appears complete at once.
- Pages no longer animate as you scroll. Only hover, focus, the FAQ arrows, the header menus
  and the phone menu move.

### The home page
- The drawing, with a strip under it that reads: Drawing "Typical office network"; Drawn by
  "Infyta, Azimpur, Dhaka"; Scale "Not to scale"; Key "1 to 5 are our services. Select any part."
- A list of the five services, each with a short "works with" line and a small drawing.
- A Core Expertise block and the Chief Advisor block, repeated from the Team page.
- WhatsApp and phone buttons, and a contact panel with the live open-hours status.

### The nine calls to check (spec section 12)
1. First visit theme: the site follows the visitor's device, so many first-time visitors will
   see Paper, not Blueprint. The alternative is to show Blueprint to everyone until they switch.
2. Contact form: it now opens WhatsApp or the visitor's email app with the message filled in,
   instead of doing nothing.
3. Logo: the redraw is used as shown in the mockup.
4. Vendor names on the home drawing: the router is labelled MikroTik, the firewall Fortinet and
   the switch Cisco, as an example of a typical setup.
5. Home page additions: Core Expertise and the Chief Advisor block are repeated from the Team
   page. This puts "Managed 15K+ nodes network infrastructure" on the home page; that figure is
   still waiting for your confirmation in section 1.
6. Removals: the footer credit line and the "Contact Sales" button (listed below).
7. Bengali accent: "আজিমপুর, ঢাকা" appears once, beside the address in the contact panel.
8. Home headline: it keeps today's words, "Infyta – Limitless Tech Solutions", so the page's main
   heading does not change for search. The first mockup showed "Limitless tech solutions for a
   digital world" instead; you can choose that.
9. "Open now" and public holidays: the live status follows the weekly hours, so on a holiday it
   is only right if the dates are added to `closedDates` in `src/content/site.js`. The
   alternative is to drop the live status and show the hours as plain text.

### New labels (all the new words on the site)
- Home drawing: Cloud; AWS, Azure, Google Cloud; Internet; Router, MikroTik; Firewall, Fortinet;
  Core switch, Cisco; Staff; Staff workstations; Guest Wi-Fi; Office Wi-Fi, Guest access;
  Cameras; CCTV cameras, Recorder; Doors; Access control, Biometric attendance; Servers;
  Windows, Linux, VMware; Business software; SQL Server, MySQL, MongoDB; Your office; IT Support
  & Consultancy. Numbers 1 to 5 mark our services.
- Service page drawings:
  - Software Development: Web application; Mobile app; Database, SQL Server, MySQL, MongoDB;
    Existing systems.
  - Network Infrastructure: Internet; Router, MikroTik; Firewall, Fortinet; Switch; Cameras; CCTV;
    Guest Wi-Fi; Office Wi-Fi; Staff; Workstations.
  - IT Support & Consultancy: Your office; Router; Workstations; Office Wi-Fi; Servers.
  - Security & Surveillance: Switch; Cameras; Recorder; CCTV cameras; Access control, Biometric
    attendance.
  - Server & Cloud Solutions: Servers, Windows, Linux, Active Directory; Virtual machines,
    VMware, Hyper-V; Cloud, AWS, Azure, Google Cloud.
- "Works with" lines on the service list: Software Development "Web and mobile apps, SQL Server,
  MySQL, MongoDB"; Network Infrastructure "MikroTik, Cisco, Fortinet, wireless deployments"; IT
  Support & Consultancy "Windows and Linux servers, Active Directory, office networks"; Security
  & Surveillance "CCTV, access control, biometric attendance"; Server & Cloud Solutions "VMware,
  Hyper-V, AWS, Azure, Google Cloud".
- Table headings: "Domain", "What we work with", "Certifications and specialists".
- Open-hours status: "Open now, until 6 PM", "Closed, opens 9 AM", "Closed, opens tomorrow 9 AM",
  "Closed, opens Saturday 9 AM", "Closed today", the long forms (for example "Open now. Closes at
  6 PM.") and "Dhaka time".
- Buttons and small labels: "WhatsApp", "Call", "Open in Google Maps", "Show map", "Theme",
  "Paper", "Blueprint", "Skip to content", and the breadcrumb word "Services".
- Contact form: the buttons "Send on WhatsApp" and "Send by email", the message "Write a message
  first." when the Message field is empty, and the text handed to WhatsApp or email ("Hello
  Infyta, this is {First Name} {Last Name}.", then the message, then "Email: {Email}").
- One existing sentence appears somewhere new: the home page's meta description is shown as the
  intro under the headline. It is not rewritten.

### Removed
- The footer credit line "Designed with ❤️ by Infyta Team".
- The "Contact Sales" button on the home page. It pointed to the same page as "Get Started" and is
  replaced by the WhatsApp and phone buttons.

### Calls made while building
- The header logo's wall tip hangs slightly below the logo box (the mockup's crop clipped it; the full shape now shows).
- The browser-tab icon is the cube plus the "i", on a transparent ground, so it is faint on dark browser tabs.
- The detail drawings on service pages are small on phones (labels about 7px at 375px wide); portrait versions could be drawn later.
- Form fields use a slightly stronger border than first planned so they meet contrast rules.
- The security drawing shows the camera recorder and the door terminal on two separate cables, both on the "Cameras" segment.

### Lighthouse (mobile, local build)
Measured on a local build with `npx lighthouse` (Performance, Accessibility), two runs each; the lower of the two is listed.
- Home (`/`): Performance 0.97, Accessibility 0.99.
- Network Infrastructure (`/services/network-infrastructure`): Performance 0.99, Accessibility 0.98.
Both pages meet the targets (Performance 0.95 or more, Accessibility 0.98 or more).
