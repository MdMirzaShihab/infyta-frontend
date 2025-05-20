import { motion } from "framer-motion";
import { FaCode, FaMobileAlt, FaDatabase, FaCloud } from "react-icons/fa";

export default function SoftwareDevelopment() {
  const features = [
    {
      icon: <FaCode className="text-3xl text-blue-500" />,
      title: "Custom Applications",
      description: "Tailored software solutions designed specifically for your business processes."
    },
    {
      icon: <FaMobileAlt className="text-3xl text-blue-500" />,
      title: "Mobile Development",
      description: "Cross-platform mobile apps that work seamlessly on all devices."
    },
    {
      icon: <FaDatabase className="text-3xl text-blue-500" />,
      title: "Database Solutions",
      description: "Efficient data management systems for optimal performance."
    },
    {
      icon: <FaCloud className="text-3xl text-blue-500" />,
      title: "Cloud Integration",
      description: "Seamless cloud connectivity for your applications."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-32">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Software Development
          </motion.h1>
          <p className="text-xl max-w-3xl">
            Building innovative, scalable, and secure software solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Custom Solutions for Your Business</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our software development services are designed to help businesses of all sizes leverage technology to solve complex problems, streamline operations, and drive growth. We combine technical expertise with industry knowledge to deliver solutions that make a real impact.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                From initial concept to final deployment and beyond, we work closely with you to ensure the software we build meets your exact requirements and exceeds your expectations.
              </p>
              
              <h3 className="text-2xl font-bold mt-10 mb-6 text-gray-800">Our Approach</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">Requirement analysis and planning</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">Agile development methodology</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">Quality assurance and testing</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-700">Deployment and ongoing support</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Our Expertise</h3>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {feature.icon}
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-800">{feature.title}</h4>
                        <p className="text-gray-600 mt-1">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to build your custom software solution?</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </motion.button>
        </div>
      </section>
    </div>
  );
}