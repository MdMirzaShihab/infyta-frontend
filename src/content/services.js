// Service page copy. Sourcing rules: only the services, technologies and certifications in
// expertise.js, the contact details in site.js, and "Infyta's team includes certified engineers
// and instructors" (owner-confirmed). No counts, years, prices, guarantees or response times.
// Claims we wanted but could not source are listed in docs/review-list.md.
export const services = [
  {
    slug: 'software-development',
    worksWith: 'Web and mobile apps, SQL Server, MySQL, MongoDB',
    name: 'Software Development',
    summary: 'Custom solutions tailored to your business needs with cutting-edge technologies.',
    metaTitle: 'Software Development Company in Dhaka',
    metaDescription: 'Custom software, web and mobile app development in Dhaka. Infyta builds secure, scalable applications, databases and integrations for businesses in Bangladesh.',
    heroSubtitle: 'Custom software, web applications and mobile apps for businesses in Dhaka and across Bangladesh.',
    overview: [
      'Infyta builds custom software for businesses in Dhaka and across Bangladesh. That includes web applications, mobile apps, internal business tools and the databases behind them. We also connect new software to the systems you already use, so information moves between them instead of being typed in twice.',
      'We start from how your business actually works, agree on what the first version must do, and build from there in short agile iterations, so you can see and test progress as the software takes shape. Our team includes certified engineers, among them a Certified Scrum Master. For data, we work with SQL Server, MySQL and MongoDB, and we can deploy applications on your own servers or in the cloud. Mobile app development is part of this service rather than a separate one.',
    ],
    included: [
      { title: 'Custom Applications', description: 'Software built around your own business processes, from internal tools to customer-facing systems.' },
      { title: 'Web Development', description: 'Web applications and business websites that work in desktop and mobile browsers.' },
      { title: 'Mobile Apps', description: 'Mobile applications for your staff or customers, connected to the systems your business already runs.' },
      { title: 'Database Solutions', description: 'Database design, administration and optimization on SQL Server, MySQL and MongoDB.' },
      { title: 'System Integration', description: 'Connecting new and existing software, including cloud services, so your systems share data.' },
    ],
    approach: [
      'Requirement analysis and planning: we document what the software must do and agree on priorities with you.',
      'Agile development: we build in short iterations and review working features with you along the way.',
      'Quality assurance and testing before each release.',
      'Deployment and ongoing support after launch.',
    ],
    expertiseKeys: ['software', 'database'],
    faqs: [
      {
        question: 'Do you develop custom software for businesses in Dhaka?',
        answer: 'Yes. Infyta builds custom software for businesses in Dhaka and elsewhere in Bangladesh, including web applications, internal business tools and system integrations. Each project starts with a requirements discussion so the software fits how your business works.',
      },
      {
        question: 'Can Infyta build a mobile app for my business?',
        answer: "Yes. Mobile app development is part of Infyta's software development service. We build mobile apps for staff or customers and can connect them to your existing database or web system.",
      },
      {
        question: 'Which databases do you work with?',
        answer: "Infyta's team works with SQL Server, MySQL and MongoDB. We handle database design, administration and optimization, and we can connect a new application to a database you already run.",
      },
      {
        question: 'Can you integrate new software with the systems we already use?',
        answer: 'Yes. System integration is one of the services our software team provides. We can connect a new application to your existing software, database or cloud services so information is shared between them rather than entered twice.',
      },
      {
        question: 'How does a software project with Infyta usually work?',
        answer: 'We start with requirement analysis and planning, then build the software in agile iterations so you can review progress. Each release goes through quality assurance and testing before deployment. After launch, we provide ongoing support for the software we deliver.',
      },
    ],
    related: ['server-cloud-solutions', 'it-support-consultancy'],
  },
  {
    slug: 'network-infrastructure',
    worksWith: 'MikroTik, Cisco, Fortinet, wireless deployments',
    name: 'Network Infrastructure',
    summary: 'Design, implementation, and maintenance of robust network systems.',
    metaTitle: 'Network Infrastructure & Setup in Dhaka',
    metaDescription: 'Network design and installation in Dhaka: cabling, Wi-Fi, MikroTik, Cisco and Fortinet setups by certified engineers (CCNA, MTCNA).',
    heroSubtitle: 'Design, installation and maintenance of office networks for businesses in Dhaka.',
    overview: [
      'Infyta designs, installs and maintains computer networks for offices and businesses in Dhaka. A typical project covers the wired network, Wi-Fi, switches, routers and firewalls, set up so that staff stay connected and business systems are protected. We work on networks of different sizes, from a single small office to larger enterprise networks.',
      'Our engineers work with MikroTik, Cisco and Fortinet equipment, and the team includes engineers and instructors certified in CCNA, MTCNA, MTCRE and MTCSE. We can build a network for a new office, expand one that has outgrown its original design, or review and fix a network that has become slow or unreliable. Once the network is running, we can maintain it and adjust it as your business changes.',
    ],
    included: [
      { title: 'Network Design', description: 'Planning the layout, equipment and addressing for a new or expanded office network.' },
      { title: 'Structured Cabling', description: 'Structured cabling that connects workstations, switches and other network equipment.' },
      { title: 'Router and Firewall Setup', description: 'Configuration of MikroTik, Cisco and Fortinet routers and firewalls.' },
      { title: 'Wireless Deployments', description: 'Office Wi-Fi planned for coverage across your premises, with separate guest access where needed.' },
      { title: 'VLANs and Segmentation', description: 'Separating departments, guests and devices such as cameras onto their own network segments.' },
      { title: 'Monitoring and Maintenance', description: 'Checking network health and fixing problems as your needs change.' },
    ],
    approach: [
      'Requirement analysis: we review your office layout, users and current equipment with you.',
      'Network design: we plan the cabling, equipment and segmentation before installation begins.',
      'Installation and configuration of cabling, switches, routers, firewalls and Wi-Fi.',
      'Testing and handover, followed by ongoing maintenance.',
    ],
    expertiseKeys: ['network'],
    faqs: [
      {
        question: 'Do you set up office networks in Dhaka?',
        answer: 'Yes. Infyta designs and installs office networks for businesses in Dhaka, including cabling, switches, routers, firewalls and Wi-Fi. We can set up a network for a new office or extend an existing one.',
      },
      {
        question: 'Which network equipment brands do you work with?',
        answer: 'Our engineers work with MikroTik, Cisco and Fortinet equipment for routing, switching and firewalls. The team includes engineers and instructors certified in CCNA, MTCNA, MTCRE and MTCSE.',
      },
      {
        question: 'Can you improve Wi-Fi coverage in our office?',
        answer: 'Yes. Wireless deployment is part of our network infrastructure service. We review where coverage is weak, plan where access points should go and configure the wireless network, including separate guest access if you need it.',
      },
      {
        question: 'Can you fix or upgrade our existing network instead of replacing it?',
        answer: 'Yes. We can review your current network, identify what is causing problems and recommend changes. Where the existing equipment is suitable, we reconfigure and extend it rather than replace it.',
      },
      {
        question: 'Do you maintain networks after installation?',
        answer: "Yes. Maintenance is part of Infyta's network infrastructure service. After installation, we can monitor the network, make configuration changes and troubleshoot problems as your business grows.",
      },
    ],
    related: ['security-surveillance', 'it-support-consultancy'],
  },
  {
    slug: 'it-support-consultancy',
    worksWith: 'Windows and Linux servers, Active Directory, office networks',
    name: 'IT Support & Consultancy',
    summary: 'Expert guidance and support for your IT operations and strategy.',
    metaTitle: 'IT Support & Consultancy in Dhaka',
    metaDescription: "IT support and consultancy for businesses in Dhaka: troubleshooting, maintenance, IT planning and expert advice from Infyta's certified engineers.",
    heroSubtitle: 'Troubleshooting, maintenance and IT planning for businesses in Dhaka.',
    overview: [
      'Infyta provides IT support and consultancy for businesses in Dhaka that need dependable help with their computers, servers and networks. We troubleshoot problems, carry out routine maintenance and help keep systems such as Windows and Linux servers, Active Directory and office networks running.',
      "Consultancy is the planning side of the same service. If you are opening a new office, replacing old equipment or deciding whether to move systems to the cloud, we can review your current setup and give practical advice on what to do next. Infyta's team includes certified engineers and instructors in server and network technologies, and the same team delivers our infrastructure, security and software services, so one team can both advise on the work and carry it out.",
    ],
    included: [
      { title: 'Troubleshooting', description: 'Diagnosing and fixing problems with computers, servers, networks and business software.' },
      { title: 'Preventive Maintenance', description: 'Routine checks and updates that keep servers and network equipment in working order.' },
      { title: 'Server and User Administration', description: 'Managing Windows and Linux servers, Active Directory accounts and access permissions.' },
      { title: 'IT Planning', description: 'Advice on equipment, upgrades and timelines for new offices or growing teams.' },
      { title: 'Technology Assessments', description: 'A review of your current IT setup with clear recommendations on what to keep, fix or replace.' },
    ],
    approach: [
      'Understand your setup: we review your systems, users and current problems.',
      'Advise: we explain the options and recommend a plan for you to approve.',
      'Implement: we carry out the agreed fixes, changes and upgrades.',
      'Support: we provide ongoing troubleshooting and maintenance as needed.',
    ],
    expertiseKeys: ['server', 'network'],
    faqs: [
      {
        question: 'Do you provide IT support for small businesses in Dhaka?',
        answer: 'Yes. Infyta provides IT support for businesses in Dhaka, including troubleshooting, maintenance and help with servers and networks. Support covers both day-to-day problems and longer-term upkeep of your systems.',
      },
      {
        question: 'What kind of IT problems can you help with?',
        answer: 'We help with problems involving computers, Windows and Linux servers, Active Directory, office networks, Wi-Fi and business software. Issues with CCTV, access control or attendance devices are covered by our security and surveillance service.',
      },
      {
        question: 'What does IT consultancy from Infyta include?',
        answer: 'IT consultancy covers planning and advice: reviewing your current systems, recommending upgrades and helping you plan new offices, servers, networks or a move to the cloud. The aim is a clear plan that fits how your business works.',
      },
      {
        question: 'Can you help us plan IT for a new office?',
        answer: 'Yes. We can help plan the network, servers, user accounts and security systems for a new office before you move in. Planning early makes it easier to put cabling and equipment in the right places.',
      },
      {
        question: 'Is your team certified?',
        answer: "Yes. Infyta's team includes certified engineers and instructors. Certifications held across the team include CCNA, MTCNA, MTCRE, MTCSE, MCITP, RHCSA and VMware Certified.",
      },
    ],
    related: ['network-infrastructure', 'server-cloud-solutions'],
  },
  {
    slug: 'security-surveillance',
    worksWith: 'CCTV, access control, biometric attendance',
    name: 'Security & Surveillance',
    summary: 'Comprehensive CCTV, access control, and attendance systems.',
    metaTitle: 'CCTV, Access Control & Attendance Systems in Dhaka',
    metaDescription: 'CCTV installation, access control and biometric attendance systems in Dhaka. Infyta designs and installs security and surveillance systems for businesses.',
    heroSubtitle: 'CCTV, access control and attendance systems for business premises in Dhaka.',
    overview: [
      'Infyta designs and installs security and surveillance systems for offices and other business premises in Dhaka. The service covers CCTV camera systems, door access control, biometric devices and staff attendance management, planned around the layout of your building and the areas you need to protect, such as entrances, stock rooms and work floors.',
      "We choose camera positions, recording storage and access points with you, then install and configure the equipment. Attendance systems record staff check-ins with biometric devices, which gives you attendance records without paper registers. Because Infyta also builds networks, we can connect cameras and access devices to your office network and keep them on a separate network segment. The team's certifications include CCTV Specialist and Access Control Specialist.",
    ],
    included: [
      { title: 'CCTV Systems', description: 'Cameras, recorders and storage, with live and recorded viewing.' },
      { title: 'Access Control', description: 'Door access control, including biometric devices, so only authorized people enter restricted areas.' },
      { title: 'Biometric Devices', description: 'Biometric devices for access control and attendance.' },
      { title: 'Attendance Management', description: 'Systems that record staff check-in and check-out times and keep attendance records.' },
      { title: 'Network Integration', description: 'Connecting cameras and devices to your network on their own segment.' },
    ],
    approach: [
      'Requirement analysis: we review your building layout and the areas you need to cover with you.',
      'System design: we plan camera positions, access points, storage and cabling.',
      'Installation and configuration of cameras, recorders, access control and attendance devices.',
      'Testing and handover, followed by maintenance and support.',
    ],
    expertiseKeys: ['security'],
    faqs: [
      {
        question: 'Do you install CCTV for offices in Dhaka?',
        answer: 'Yes. Infyta designs and installs CCTV systems for offices and other business premises in Dhaka. We plan camera positions and recording storage with you, then install and configure the system.',
      },
      {
        question: 'Can you install biometric attendance systems?',
        answer: 'Yes. We install attendance management systems that use biometric devices to record when staff arrive and leave. The system keeps attendance records you can review instead of relying on paper registers.',
      },
      {
        question: 'What is access control and do we need it?',
        answer: 'Access control limits who can open particular doors, for example by using biometric devices. It is useful for server rooms, store rooms and other areas that only some staff should enter. We can advise whether it suits your building when we discuss your requirements.',
      },
      {
        question: 'Can you add cameras to our existing CCTV system?',
        answer: 'In many cases, yes. We first review the existing recorder, cameras and cabling with you to see whether they can be extended. If parts of the system are outdated, we explain the options before any work starts.',
      },
      {
        question: 'Can CCTV and access control share our office network?',
        answer: 'Yes. Cameras and access devices can run on your office network. Infyta also provides network infrastructure services, so we can place security devices on a separate network segment to keep them apart from everyday office traffic.',
      },
    ],
    related: ['network-infrastructure', 'it-support-consultancy'],
  },
  {
    slug: 'server-cloud-solutions',
    worksWith: 'VMware, Hyper-V, AWS, Azure, Google Cloud',
    name: 'Server & Cloud Solutions',
    summary: 'Scalable server setups and cloud migration services.',
    metaTitle: 'Server & Cloud Solutions in Dhaka',
    metaDescription: 'Windows and Linux servers, virtualization (VMware, Hyper-V) and cloud migration to AWS, Azure and Google Cloud for businesses in Dhaka.',
    heroSubtitle: 'Server setup, virtualization and cloud migration for businesses in Dhaka.',
    overview: [
      'Infyta sets up and manages servers for businesses in Dhaka, both on your premises and in the cloud. On-premises work covers Windows and Linux servers, Active Directory for user accounts, file and application servers, and virtualization with VMware and Hyper-V so one physical machine can run several servers. We can also take over the day-to-day administration of servers you already have.',
      "Cloud services are part of the same offering. We plan and carry out cloud migrations to AWS, Microsoft Azure and Google Cloud, and set up hybrid arrangements where some systems stay in your office and others run in the cloud. We also administer the databases many business applications depend on, including SQL Server, MySQL and MongoDB. The team's certifications include MCITP, RHCSA, VMware Certified and AWS Specialist.",
    ],
    included: [
      { title: 'Server Setup', description: 'Installation and configuration of Windows and Linux servers for files, applications and internal services.' },
      { title: 'Active Directory', description: 'Central management of user accounts, passwords and access permissions across your office.' },
      { title: 'Virtualization', description: 'Running several servers on shared hardware with VMware or Hyper-V.' },
      { title: 'Cloud Migration', description: 'Moving servers, applications and data to AWS, Azure or Google Cloud.' },
      { title: 'Hybrid Cloud', description: 'Combining on-premises servers with cloud services where that suits your workload.' },
      { title: 'Database Administration', description: 'Setup, administration and optimization of SQL Server, MySQL and MongoDB.' },
    ],
    approach: [
      'Assessment of your current servers, applications and data.',
      'Planning the target setup, whether on-premises, cloud or hybrid.',
      'Implementation or migration to the agreed setup.',
      'Testing and ongoing administration.',
    ],
    expertiseKeys: ['server', 'cloud', 'database'],
    faqs: [
      {
        question: 'Can you move our business systems to the cloud?',
        answer: 'Yes. Infyta plans and carries out cloud migrations to AWS, Microsoft Azure and Google Cloud for businesses in Dhaka. We first assess which systems suit the cloud, then plan the move with you.',
      },
      {
        question: 'Should we keep our servers on-premises or move to the cloud?',
        answer: 'It depends on your applications, internet connection, data requirements and budget. Some businesses keep certain systems on local servers and move others to the cloud in a hybrid setup. We can review your current systems and recommend an approach.',
      },
      {
        question: 'Do you set up Windows and Linux servers?',
        answer: "Yes. We install and administer Windows Server and Linux servers, including Active Directory for managing user accounts and permissions. The team's certifications include MCITP and RHCSA.",
      },
      {
        question: 'What is server virtualization?',
        answer: 'Virtualization lets one physical server run several separate virtual servers. It makes better use of hardware and makes servers easier to back up and move. Infyta sets up virtualization with VMware and Hyper-V.',
      },
      {
        question: 'Do you manage databases?',
        answer: "Yes. Infyta's team administers and optimizes SQL Server, MySQL and MongoDB databases. We can set up a database on your own server or in the cloud, depending on what suits the application.",
      },
    ],
    related: ['software-development', 'it-support-consultancy'],
  },
];

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}
