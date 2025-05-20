import { motion } from "framer-motion";
import { FaCode, FaServer, FaShieldAlt, FaNetworkWired, FaCloud, FaChalkboardTeacher } from "react-icons/fa";
import ServiceCard from "../../components/ServiceCard";

export default function Services() {
  const services = [
    {
      icon: <FaCode className="text-4xl" />,
      title: "Software Development",
      description: "Custom solutions tailored to your business needs with cutting-edge technologies.",
      color: "from-blue-500 to-purple-500",
      url: "/services/software-development"
    },
    {
      icon: <FaNetworkWired className="text-4xl" />,
      title: "Network Infrastructure",
      description: "Design, implementation, and maintenance of robust network systems.",
      color: "from-green-500 to-blue-500",
      url: "/services/network-infrastructure"
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "IT Support & Consultancy",
      description: "Expert guidance and support for your IT operations and strategy.",
      color: "from-yellow-500 to-orange-500",
      url: "/services/it-support-consultancy"
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Security & Surveillance",
      description: "Comprehensive CCTV, access control, and attendance systems.",
      color: "from-red-500 to-pink-500",
      url: "/services/security-surveillance"
    },
    {
      icon: <FaServer className="text-4xl" />,
      title: "Server & Cloud Solutions",
      description: "Scalable server setups and cloud migration services.",
      color: "from-purple-500 to-indigo-500",
      url: "/services/server-cloud-solutions"
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl" />,
      title: "Training & Certification",
      description: "Professional IT training programs and certification courses.",
      color: "from-indigo-500 to-blue-500",
      url: "/services/training-certification"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-6"
          >
            Our <span className="text-blue-400">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Cutting-edge IT solutions designed to drive your business forward in the digital age.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                color={service.color}
                url={service.url}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Ready to transform your business with our expertise?
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
          >
            Get a Free Consultation
          </motion.button>
        </div>
      </section>
    </div>
  );
}