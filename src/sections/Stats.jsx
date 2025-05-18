import { motion } from "framer-motion";
import { FaGlobe, FaUserTie, FaProjectDiagram, FaServer } from "react-icons/fa";

export default function Stats() {
  const stats = [
    { icon: <FaGlobe className="text-4xl" />, number: "50+", label: "Countries Served" },
    { icon: <FaUserTie className="text-4xl" />, number: "200+", label: "Expert Engineers" },
    { icon: <FaProjectDiagram className="text-4xl" />, number: "500+", label: "Projects Completed" },
    { icon: <FaServer className="text-4xl" />, number: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-dark to-primary text-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm"
            >
              <div className="text-white mb-4 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
              <p className="text-gray-200">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}