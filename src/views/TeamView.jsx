"use client";

import { motion } from "framer-motion";
import {
  FaServer,
  FaShieldAlt,
  FaNetworkWired,
  FaCode,
  FaCloud,
  FaDatabase
} from "react-icons/fa";
import FloatingOrbs from "@/components/FloatingOrbs";
import { chiefAdvisor as chiefAdvisorData } from "@/content/team";
import { expertise } from "@/content/expertise";

const EXPERTISE_ICONS = {
  server: FaServer,
  network: FaNetworkWired,
  software: FaCode,
  security: FaShieldAlt,
  cloud: FaCloud,
  database: FaDatabase,
};

export default function TeamView() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <FloatingOrbs count={8} opacityClass="opacity-10" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark via-dark/90 to-primary/80 text-white py-32 z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Dream Team
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto">
            The brilliant minds powering Infyta&apos;s innovative solutions
          </motion.p>
        </div>

        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-dark to-transparent z-20"
        />
      </section>

      {/* Chief Advisor Section */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-dark mb-2">
              Our <span className="text-primary">Chief Advisor</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/3 relative">
              <div className="relative group">
                {/* Enhanced glass morphism container with visible background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-primary/10 backdrop-blur-lg rounded-xl shadow-2xl border-2 border-white/30 -rotate-1 scale-95 group-hover:rotate-1 group-hover:scale-100 transition-all duration-500" />

                {/* Background pattern for glass effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
                </div>

                {/* Image with floating animation */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="relative z-10">
                  <img
                    src={chiefAdvisorData.image}
                    alt={chiefAdvisorData.name}
                    className="w-full h-auto rounded-xl shadow-2xl border-4 border-white/30 bg-dark/10" // Added bg-dark/10 for fallback
                  />
                </motion.div>

                {/* Floating tech badges */}
                {["CCNA", "MTCNA", "MTCRE", "MTCSE"].map((badge, i) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                    className={`absolute z-20 ${
                      i % 2 === 0 ? "bottom-0" : "top-0"
                    } ${
                      i % 3 === 0
                        ? "left-0"
                        : i % 3 === 1
                        ? "right-0"
                        : "left-1/2"
                    } transform -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
                    style={{
                      rotate: i % 2 === 0 ? "-5deg" : "5deg",
                    }}>
                    {badge}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-2/3">
              <motion.h3
                whileHover={{ x: 5 }}
                className="text-4xl font-bold text-dark mb-2">
                {chiefAdvisorData.name}
              </motion.h3>
              <motion.p
                whileHover={{ x: 5 }}
                className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 font-medium">
                {chiefAdvisorData.role}
              </motion.p>

              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-dark">
                  Key Highlights
                </h4>
                <ul className="space-y-3">
                  {chiefAdvisorData.highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start">
                      <span className="text-primary mr-3 mt-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <motion.path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          />
                        </svg>
                      </span>
                      <span className="text-gray-700">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 text-dark">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-3">
                  {chiefAdvisorData.certifications.map((cert, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-dark/10 to-primary/10 text-dark px-4 py-2 rounded-full text-sm font-medium border border-primary/20 hover:border-primary/50 transition-all">
                      {cert}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
<section className="relative py-20 bg-dark text-white z-10">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-2"
      >
        Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Core Expertise
        </span>
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"
      />
      <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
        Comprehensive IT solutions across multiple domains, delivered by certified professionals
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {expertise.map((item, index) => {
        const Icon = EXPERTISE_ICONS[item.key];
        return (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -10 }}
          className="bg-gradient-to-br from-dark/80 to-primary/20 p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-all flex flex-col h-full"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="text-primary mb-4 inline-block"
          >
            <Icon className="text-4xl" />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-300 mb-4 flex-grow">{item.description}</p>
          {item.certs && (
            <div className="mt-auto">
              <div className="text-xs text-primary font-medium mb-1">Certifications/Specialist:</div>
              <div className="flex flex-wrap gap-1">
                {item.certs.map((cert, i) => (
                  <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        );
      })}
    </div>
  </div>
</section>
    </div>
  );
}
