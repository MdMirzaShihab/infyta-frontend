"use client";

import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaFacebook,
  FaGlobe,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock
} from "react-icons/fa";
import Link from "next/link";
import FloatingOrbs from "@/components/FloatingOrbs";
import { site, primaryEmail } from "@/content/site";
import { services } from "@/content/services";

const SOCIAL_ICONS = [
  ["linkedin.com", FaLinkedin],
  ["twitter.com", FaTwitter],
  ["x.com", FaTwitter],
  ["github.com", FaGithub],
  ["facebook.com", FaFacebook],
];

function socialIcon(url) {
  const match = SOCIAL_ICONS.find(([host]) => url.includes(host));
  const Icon = match ? match[1] : FaGlobe;
  return <Icon />;
}

export default function Footer() {
  const email = primaryEmail();
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Team", path: "/team" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" }
      ]
    },
    {
      title: "Services",
      links: services.map((s) => ({ name: s.name, path: `/services/${s.slug}` }))
    },
    {
      title: "Contact",
      links: [
        { name: site.phone.display, href: `tel:${site.phone.e164}`, icon: <FaPhone className="inline mr-2" /> },
        { name: site.address.display, href: site.mapsUrl, external: true, icon: <FaMapMarkerAlt className="inline mr-2" /> },
        { name: email, href: `mailto:${email}`, icon: <FaEnvelope className="inline mr-2" /> },
        ...site.hours.display.map((line) => ({ name: line, icon: <FaClock className="inline mr-2" /> }))
      ]
    }
  ];

  return (
    <footer className="relative bg-dark text-white pt-16 pb-8 overflow-hidden">
      {/* Animated background elements */}
      <FloatingOrbs count={6} opacityClass="opacity-5" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Infyta</span>
              </h3>
              <p className="text-gray-400 mb-6">
                {site.tagline}
              </p>
              <div className="flex space-x-4">
                {site.socials.map((social) => (
                  <motion.a
                    key={social.url}
                    href={social.url}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-xl text-gray-400 hover:text-primary transition-colors"
                  >
                    {socialIcon(social.url)}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="lg:col-span-1"
            >
              <h4 className="text-lg font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.path ? (
                      <Link
                        href={link.path}
                        className="flex items-center text-gray-400 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : link.href ? (
                      <a
                        href={link.href}
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center text-gray-400 hover:text-primary transition-colors"
                      >
                        {link.icon && <span className="mr-2">{link.icon}</span>}
                        {link.name}
                      </a>
                    ) : (
                      <span className="flex items-center text-gray-400">
                        {link.icon && <span className="mr-2">{link.icon}</span>}
                        {link.name}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
        >
          <p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> Infyta. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Designed with ❤️ by Infyta Team
          </p>
        </motion.div>
      </div>
    </footer>
  );
}