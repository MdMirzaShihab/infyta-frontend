import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ServiceCard({ icon, title, description, color, url }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <Link to={url}>
        <div className={`bg-gradient-to-r ${color} h-2 w-full`}></div>
        <div className="p-8">
          <div className="text-primary mb-4">{icon}</div>
          <h3 className="text-xl font-bold mb-2 text-dark">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <div className="mt-4 text-primary font-semibold flex items-center">
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}