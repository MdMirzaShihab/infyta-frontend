import { motion } from "framer-motion";
import { 
  FaCode, 
  FaServer, 
  FaShieldAlt, 
  FaNetworkWired, 
  FaCloud, 
  FaMobileAlt,
  FaChalkboardTeacher,
  FaVideo
} from "react-icons/fa";
import React from "react";

const services = [
  {
    icon: FaCode,
    title: "Software Development",
    desc: "Custom solutions tailored to your business needs.",
    color: "from-blue-500 to-purple-500"
  },
  {
    icon: FaNetworkWired,
    title: "Network Infrastructure",
    desc: "Robust network design and implementation.",
    color: "from-green-500 to-blue-500"
  },
  {
    icon: FaShieldAlt,
    title: "IT Support & Consultancy",
    desc: "Expert guidance for your IT operations.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: FaVideo,
    title: "Security & Surveillance",
    desc: "Comprehensive CCTV and access control systems.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: FaServer,
    title: "Server & Cloud Solutions",
    desc: "Scalable server and cloud services.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: FaChalkboardTeacher,
    title: "Training & Certification",
    desc: "Professional IT training programs.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Applications",
    desc: "Cross-platform mobile solutions.",
    color: "from-teal-500 to-green-500"
  },
  {
    icon: FaCloud,
    title: "Cloud Services",
    desc: "Cloud migration and management.",
    color: "from-amber-500 to-red-500"
  }
];

// Define your primary and secondary colors here to ensure they match with referenced values
const colors = {
  primary: "#3B82F6", // blue-500
  secondary: "#8B5CF6", // purple-500
};

export default function Services() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-100 to-white overflow-hidden">
      {/* Enhanced background with more visible particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Enhanced dot pattern with higher opacity and larger dots */}
        <div className="absolute inset-0 opacity-30" 
          style={{ 
            backgroundImage: `radial-gradient(circle, ${colors.primary} 2px, transparent 2px), radial-gradient(circle, ${colors.secondary} 2px, transparent 2px)`,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px"
          }} 
        />
        
        {/* Semi-transparent overlay to create depth and contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-gray-100/40 backdrop-blur-sm" />
        
        {/* Additional accent patterns for more visual interest */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-secondary/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Services</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"
          />
          <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
            Comprehensive IT solutions designed to propel your business forward.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Enhanced glass card with better contrast against background */}
              <div className="relative h-full backdrop-blur-xl bg-white/70 rounded-xl overflow-hidden border border-white/80 shadow-xl group-hover:shadow-2xl transition-all">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${service.color}`} />
                
                {/* Glass reflections */}
                <div className="absolute inset-0">
                  {/* Top-left to bottom-right light reflection */}
                  <div className="absolute -inset-x-20 -inset-y-20 bg-white/20 rotate-45 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                  
                  {/* Bottom shine */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/30 to-transparent" />
                  
                  {/* Edge highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-white/80" />
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-white/80" />
                </div>
                
                <div className="p-6 h-full flex flex-col relative">
                  {/* Icon with proper color rendering */}
                  <div className={`mb-4`}>
                    {React.createElement(service.icon, { 
                      size: 24, 
                      className: `text-gradient-${index}` // Using dynamic class for gradient
                    })}
                    
                    {/* Dynamic gradient styles for each icon */}
                    <style dangerouslySetInnerHTML={{
                      __html: `
                        .text-gradient-${index} {
                          color: ${getGradientColor(service.color)};
                        }
                      `
                    }} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-dark mb-3">{service.title}</h3>
                  <p className="text-gray-600 flex-grow">{service.desc}</p>
                  
                  {/* Learn more link */}
                  <div className="mt-4">
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center text-primary font-medium"
                    >
                      <span>Learn more</span>
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-bold shadow-lg overflow-hidden"
          >
            <span className="relative z-10">Explore All Services</span>
            <motion.span 
              className="absolute inset-0 bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Helper function to get a solid color from gradient class
function getGradientColor(gradientClass) {
  // Extract the first color from the gradient class
  if (gradientClass.includes('blue-500')) return colors.primary;
  if (gradientClass.includes('green-500')) return '#10B981';
  if (gradientClass.includes('yellow-500')) return '#F59E0B';
  if (gradientClass.includes('red-500')) return '#EF4444';
  if (gradientClass.includes('purple-500')) return colors.secondary;
  if (gradientClass.includes('indigo-500')) return '#6366F1';
  if (gradientClass.includes('teal-500')) return '#14B8A6';
  if (gradientClass.includes('amber-500')) return '#F59E0B';
  
  // Default color if no match
  return colors.primary;
}