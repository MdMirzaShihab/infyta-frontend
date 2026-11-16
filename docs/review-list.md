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
