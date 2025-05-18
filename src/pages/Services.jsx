import { motion } from "framer-motion";
import { FaCode, FaServer, FaShieldAlt, FaNetworkWired, FaCloud, FaMobileAlt } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      icon: <FaCode className="text-4xl" />,
      title: "Custom Software Development",
      description: "Tailored solutions for your unique business needs.",
      color: "from-primary to-secondary"
    },
    {
      icon: <FaServer className="text-4xl" />,
      title: "Server Infrastructure",
      description: "High-performance server setups and maintenance.",
      color: "from-dark to-primary"
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Cybersecurity Solutions",
      description: "End-to-end protection for your digital assets.",
      color: "from-secondary to-dark"
    },
    {
      icon: <FaNetworkWired className="text-4xl" />,
      title: "Network Architecture",
      description: "Scalable and secure network infrastructures.",
      color: "from-primary to-dark"
    },
    {
      icon: <FaCloud className="text-4xl" />,
      title: "Cloud Services",
      description: "Migration, management, and optimization.",
      color: "from-dark to-secondary"
    },
    {
      icon: <FaMobileAlt className="text-4xl" />,
      title: "Mobile Applications",
      description: "Cross-platform mobile solutions.",
      color: "from-secondary to-primary"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Our <span className="text-white">Services</span>
          </motion.h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive IT solutions designed to propel your business forward.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className={`bg-gradient-to-r ${service.color} h-2 w-full`}></div>
                <div className="p-8">
                  <div className="text-primary mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-dark">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your IT infrastructure?</h2>
          <button className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full font-bold transition-colors">
            Get a Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}