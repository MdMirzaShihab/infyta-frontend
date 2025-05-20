import { motion } from "framer-motion";
import { FaUsers, FaGlobe, FaLightbulb, FaRocket, FaShieldAlt, FaHandshake } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";

export default function About() {
  // Define your primary and secondary colors to ensure consistency
  const colors = {
    primary: "#3B82F6", // blue-500
    secondary: "#3AC1C2", // custom teal 
    dark: "#1F2937", // gray-800
  };

  const values = [
    { 
      icon: FaUsers, 
      title: "Collaboration", 
      desc: "We believe in teamwork across borders to deliver exceptional results.",
      color: "blue-500",
      gradient: "from-blue-500 to-purple-500"
    },
    { 
      icon: FaGlobe, 
      title: "Global Mindset", 
      desc: "Solutions designed for worldwide impact and local relevance.",
      color: "green-500",
      gradient: "from-green-500 to-teal-500"
    },
    { 
      icon: FaLightbulb, 
      title: "Innovation", 
      desc: "Constantly pushing technological boundaries to stay ahead.",
      color: "yellow-500",
      gradient: "from-yellow-500 to-orange-500"
    },
    { 
      icon: FaRocket, 
      title: "Agility", 
      desc: "Quick adaptation to market changes and emerging technologies.",
      color: "red-500",
      gradient: "from-red-500 to-pink-500"
    },
    { 
      icon: FaShieldAlt, 
      title: "Integrity", 
      desc: "Uncompromising ethics in all our business dealings.",
      color: "purple-500",
      gradient: "from-purple-500 to-indigo-500"
    },
    { 
      icon: FaHandshake, 
      title: "Partnership", 
      desc: "Building long-term relationships based on mutual success.",
      color: "indigo-500",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  // Function to get color based on value
  const getColor = (colorName) => {
    switch(colorName) {
      case "blue-500": return "#3B82F6";
      case "green-500": return "#10B981";
      case "yellow-500": return "#F59E0B";
      case "red-500": return "#EF4444";
      case "purple-500": return "#8B5CF6";
      case "indigo-500": return "#6366F1";
      default: return "#3B82F6";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark to-primary text-white py-32 overflow-hidden">
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
              className="absolute rounded-full opacity-10"
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                background: `radial-gradient(circle, ${colors.secondary}, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">Infyta</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Engineering Tomorrow's Tech Today
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-dark to-primary text-white p-8 md:p-10 rounded-xl shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <FaGlobe className="text-2xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg md:text-xl text-white/90">
                "To be the most trusted global partner for transformative IT solutions, empowering businesses to thrive in a digitally limitless world."
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">
                  <FaRocket className="text-2xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-dark">Our Mission</h2>
              </div>
              <p className="text-lg md:text-xl text-gray-600">
                "We deliver cutting-edge, secure, and scalable IT solutions—from software to infrastructure—helping businesses overcome challenges with innovation and excellence. Our commitment is to make technology an enabler, not a barrier, for growth."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Core Values</span>
            </h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} p-0.5 rounded-xl shadow-lg`}></div>
                
                {/* Card content */}
                <div className="relative bg-white p-8 rounded-xl h-full border border-gray-100 group-hover:border-transparent">
                  {/* Fixed icon with visible color instead of text-transparent */}
                  <div className="mb-4" style={{ color: getColor(value.color) }}>
                    {React.createElement(value.icon, { 
                      className: "text-4xl"
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-16 bg-gradient-to-br from-dark to-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-6"
          >
            Meet Our <span className="text-secondary">Expert Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto mb-8"
          >
            The brilliant minds behind our innovative solutions
          </motion.p>
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(58, 193, 194, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-dark hover:bg-gray-100 px-8 py-3 rounded-full font-bold shadow-lg transition-all"
          >
            <Link to="/team">View Our Team</Link>
          </motion.button>
        </div>
      </section>
    </div>
  );
}