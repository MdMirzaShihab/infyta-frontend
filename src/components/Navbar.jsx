import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/logo/infyta-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { 
      name: "Services", 
      submenu: [
        { name: "Software Development", path: "/services/software-development" },
        { name: "Network Infrastructure", path: "/services/network-infrastructure" },
        { name: "IT Support & Consultancy", path: "/services/it-support-consultancy" },
        { name: "Security & Surveillance", path: "/services/security-surveillance" },
        { name: "Server & Cloud Solutions", path: "/services/server-cloud-solutions" },
        { name: "Training & Certification", path: "/services/training-certification" },
        { name: "Mobile Applications", path: "/services/mobile-applications" },
        { name: "Cloud Services", path: "/services/cloud-services" }
      ]
    },
    { name: "Team", path: "/team" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-dark/80 backdrop-blur-md py-2 border-b border-primary/20" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="relative" onClick={closeAllDropdowns}>
              <img 
                src={logo} 
                alt="Infyta Logo" 
                className={`h-12 transition-all ${scrolled ? "h-10" : "h-12"}`}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <div 
                key={link.name} 
                className="relative"
              >
                {link.submenu ? (
                  <>
                    <motion.button 
                      className="flex items-center text-white hover:text-primary font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => toggleDropdown(link.name)}
                    >
                      {link.name}
                      <FiChevronDown className={`ml-1 transition-transform ${
                        activeDropdown === link.name ? "rotate-180" : ""
                      }`} />
                    </motion.button>
                    <motion.div 
                      className="absolute left-0 mt-2 w-56 bg-dark rounded-md shadow-lg py-2 border border-primary/20 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ 
                        opacity: activeDropdown === link.name ? 1 : 0,
                        y: activeDropdown === link.name ? 0 : -10
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ pointerEvents: activeDropdown === link.name ? 'auto' : 'none' }}
                    >
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-4 py-2 text-white/80 hover:text-white hover:bg-primary/10 transition-colors"
                          onClick={closeAllDropdowns}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      to={link.path}
                      className="font-medium text-white hover:text-primary transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(58, 193, 194, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-full font-bold shadow-lg transition-all relative overflow-hidden"
              onClick={closeAllDropdowns}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-2xl z-50 text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 bg-gradient-to-br from-dark to-gray-900 pt-24 px-6 space-y-6 z-40"
        >
          {links.map((link) => (
            <motion.div 
              key={link.name} 
              className="border-b border-white/10 pb-4"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {link.submenu ? (
                <div className="space-y-2">
                  <button 
                    className="text-white font-bold text-lg flex items-center"
                    onClick={() => toggleDropdown(link.name)}
                  >
                    {link.name}
                    <FiChevronDown className={`ml-2 transition-transform ${
                      activeDropdown === link.name ? "rotate-180" : ""
                    }`} />
                  </button>
                  <div className={`pl-4 space-y-2 ${
                    activeDropdown === link.name ? "block" : "hidden"
                  }`}>
                    {link.submenu.map((sub, index) => (
                      <motion.div
                        key={sub.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={sub.path}
                          className="block text-white/80 hover:text-white transition-colors py-2"
                          onClick={closeAllDropdowns}
                        >
                          {sub.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Link
                    to={link.path}
                    className="block text-white font-bold text-lg hover:text-primary transition-colors py-2"
                    onClick={closeAllDropdowns}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              )}
            </motion.div>
          ))}
          <motion.button 
            className="w-full bg-primary text-white py-3 rounded-full font-bold mt-8"
            whileTap={{ scale: 0.95 }}
            onClick={closeAllDropdowns}
          >
            Contact Us
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
}