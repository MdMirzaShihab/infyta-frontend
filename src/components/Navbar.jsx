import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/logo/infyta-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

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
        { name: "Software Dev", path: "/services/software" },
        { name: "Cloud Solutions", path: "/services/cloud" },
        { name: "Security", path: "/services/security" }
      ]
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

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
          {/* Logo with playful animation and glow effect */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="relative">
              <img 
                src={logo} 
                alt="Infyta Logo" 
                className={`h-12 transition-all ${scrolled ? "h-10" : "h-12"}`}
              />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredItem === "logo" ? 0.3 : 0 }}
                className="absolute inset-0 bg-primary rounded-full blur-md"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => setHoveredItem(link.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {link.submenu ? (
                  <>
                    <motion.button 
                      className="flex items-center text-white hover:text-primary font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {link.name}
                      <FiChevronDown className="ml-1 group-hover:rotate-180 transition-transform" />
                    </motion.button>
                    <motion.div 
                      className="absolute left-0 mt-2 w-48 bg-dark rounded-md shadow-lg py-2 border border-primary/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: hoveredItem === link.name ? 1 : 0,
                        y: hoveredItem === link.name ? 0 : 10
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="block px-4 py-2 text-white/80 hover:text-white hover:bg-primary/10 transition-colors"
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
                    >
                      {link.name}
                    </Link>
                    {hoveredItem === link.name && (
                      <motion.div 
                        layoutId="navUnderline"
                        className="h-0.5 bg-primary mt-1"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </motion.div>
                )}
              </div>
            ))}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-full font-bold shadow-lg transition-all relative overflow-hidden"
            >
              <motion.span 
                className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"
              />
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
          className="md:hidden fixed inset-0 bg-gradient-to-br from-dark to-gray-900 pt-24 px-6 space-y-6"
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
                  <p className="text-white font-bold text-lg">{link.name}</p>
                  <div className="pl-4 space-y-2">
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
                          onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
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
          >
            Contact Us
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
}