import { motion } from "framer-motion";
import { FaUsers, FaGlobe, FaLightbulb } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-dark text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            About <span className="text-primary">Infyta</span>
          </motion.h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're a global team of innovators building technology solutions that push boundaries.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-dark mb-12 text-center">
            Our <span className="text-primary">Values</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaUsers size={40} />, title: "Collaboration", desc: "We believe in teamwork across borders." },
              { icon: <FaGlobe size={40} />, title: "Global Mindset", desc: "Solutions designed for worldwide impact." },
              { icon: <FaLightbulb size={40} />, title: "Innovation", desc: "Constantly pushing technological boundaries." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl text-center"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}