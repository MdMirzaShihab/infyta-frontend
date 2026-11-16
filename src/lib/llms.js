import { site, SITE_URL, publicEmails } from '../content/site.js';
import { pages } from '../content/pages.js';
import { services } from '../content/services.js';

export function buildLlmsTxt(s = site, svc = services) {
  const lines = [
    `# ${s.name}`,
    '',
    `> ${pages.home.description}`,
    '',
    '## Key facts',
    '',
    `- Address: ${s.address.display}`,
    `- Phone: ${s.phone.display}`,
    `- Email: ${publicEmails(s).join(', ')}`,
    `- Hours: ${s.hours.display.join('; ')}`,
    '- Area served: Dhaka, Bangladesh',
    '',
    '## Services',
    '',
    ...svc.map((x) => `- [${x.name}](${SITE_URL}/services/${x.slug}): ${x.summary}`),
    '',
    '## Company',
    '',
    `- [About](${SITE_URL}/about): ${pages.about.description}`,
    `- [Team](${SITE_URL}/team): ${pages.team.description}`,
    '',
    '## Contact',
    '',
    `- [Contact](${SITE_URL}/contact): ${pages.contact.description}`,
    '',
  ];
  return lines.join('\n');
}
