import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white mb-8">
              Let's discuss how Infyta can help you achieve your technology goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-dark px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2"
              >
                Get Started <FiArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold"
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}