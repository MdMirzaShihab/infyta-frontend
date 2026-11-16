"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from "react-icons/fa";
import FloatingOrbs from "@/components/FloatingOrbs";
import { site } from "@/content/site";

export default function ContactView({ emails }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark to-primary text-white py-32 overflow-hidden">
        {/* Animated background elements */}
        <FloatingOrbs count={5} opacityClass="opacity-10" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">Touch</span>
          </motion.h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Let&apos;s discuss how we can transform your business with our tech solutions
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 text-dark">
                Send Us <span className="text-primary">A Message</span>
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block text-gray-700 mb-2 font-medium">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="John"
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <label className="block text-gray-700 mb-2 font-medium">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-gray-700 mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-gray-700 mb-2 font-medium">Message</label>
                  <textarea 
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </motion.div>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-dark/90 to-primary/90 text-white p-8 md:p-10 rounded-xl shadow-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Our Office</h4>
                      <address className="not-italic text-white/90">
                        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {site.address.display}
                        </a>
                      </address>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <FaPhoneAlt className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Phone</h4>
                      <p className="text-white/90">
                        <a href={`tel:${site.phone.e164}`} className="hover:underline">{site.phone.display}</a>
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      {emails.map((email) => (
                        <p key={email} className="text-white/90">
                          <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                        </p>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-start"
                  >
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <FaClock className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Working Hours</h4>
                      {site.hours.display.map((line) => (
                        <p key={line} className="text-white/90">{line}</p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Map */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-gray-200 h-64 md:h-80 rounded-xl overflow-hidden shadow-lg border border-white/20"
              >
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src={site.mapEmbedUrl}
                  className="filter grayscale(30%) hover:grayscale(0%) transition-all duration-500"
                  title="Infyta Office Location"
                  loading="lazy"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}