export const pages = {
  home: {
    path: '/',
    title: 'Infyta – IT Solutions Company in Dhaka, Bangladesh',
    description: 'Infyta is an IT solutions company in Dhaka offering software development, network setup, servers and cloud, CCTV and IT support for businesses in Bangladesh.',
    absoluteTitle: true,
  },
  services: {
    path: '/services',
    title: 'IT Services in Dhaka',
    description: 'IT services in Dhaka from Infyta: custom software, network infrastructure, IT support, CCTV and access control, and server and cloud solutions.',
    absoluteTitle: false,
  },
  about: {
    path: '/about',
    title: 'About Infyta – IT Company in Dhaka',
    description: 'Infyta is a Dhaka-based IT company delivering secure, scalable software and infrastructure solutions. Our mission, vision and values.',
    absoluteTitle: true,
  },
  team: {
    path: '/team',
    title: 'Our Team – Certified IT Experts',
    description: "Meet Infyta's IT experts in Dhaka, led by Chief Advisor Md. Arif: 28+ years in ICT infrastructure, CCNA, MTCNA, MTCRE and MTCSE certified.",
    absoluteTitle: false,
  },
  contact: {
    path: '/contact',
    title: 'Contact Infyta – Azimpur, Dhaka',
    description: 'Visit Infyta at Swarnolota, Bottola, Azimpur, Dhaka, or call +880 1318 121558. Open Saturday–Thursday, 9 AM–6 PM. Get a free IT consultation.',
    absoluteTitle: true,
  },
};

export const homeIntro =
  "Infyta is an IT solutions company in Azimpur, Dhaka, Bangladesh. We provide software development, network infrastructure, IT support and consultancy, security and surveillance, and server and cloud solutions. Infyta's team includes certified engineers and instructors, and we work with businesses in Dhaka and across Bangladesh.";

export function allPaths() {
  return [
    '/',
    '/services',
    '/services/software-development',
    '/services/network-infrastructure',
    '/services/it-support-consultancy',
    '/services/security-surveillance',
    '/services/server-cloud-solutions',
    '/about',
    '/team',
    '/contact',
  ];
}
