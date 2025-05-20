import { motion } from "framer-motion";
import { 
  FaLinkedin, 
  FaTwitter, 
  FaGithub,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
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
      links: [
        { name: "Software Development", path: "/services/software-development" },
        { name: "Network Infrastructure", path: "/services/network-infrastructure" },
        { name: "Security & Surveillance", path: "/services/security-surveillance" },
        { name: "Cloud Solutions", path: "/services/server-cloud-solutions" },
        { name: "Training & Certification", path: "/services/training-certification" }
      ]
    },
    {
      title: "Contact",
      links: [
        { name: "+880 1869 976843", icon: <FaPhone className="inline mr-2" /> },
        { name: "184/5/3 Lalbagh Road, Rasulbagh, Dhaka-1211, Bangladesh", icon: <FaMapMarkerAlt className="inline mr-2" /> },
        { name: "info@infyta.com", icon: <FaEnvelope className="inline mr-2" /> }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, url: "https://linkedin.com" },
    { icon: <FaTwitter />, url: "https://twitter.com" },
    { icon: <FaGithub />, url: "https://github.com" }
  ];

  return (
    <footer className="relative bg-dark text-white pt-16 pb-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className="absolute rounded-full opacity-5"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              background: `radial-gradient(circle, #3ac1c2, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

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
                Limitless Tech Solutions for a Digital World
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-xl text-gray-400 hover:text-primary transition-colors"
                  >
                    {social.icon}
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
                    <Link
                      to={link.path || "#"}
                      className="flex items-center text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.icon && <span className="mr-2">{link.icon}</span>}
                      {link.name}
                    </Link>
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
          <p>© {new Date().getFullYear()} Infyta. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Designed with ❤️ by Infyta Team
          </p>
        </motion.div>
      </div>
    </footer>
  );
}