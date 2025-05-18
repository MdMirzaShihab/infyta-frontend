import { FaServer, FaShieldAlt, FaCode, FaNetworkWired } from "react-icons/fa";

const services = [
  { icon: <FaCode size={40} />, title: "Software Dev", desc: "Custom solutions for your business." },
  { icon: <FaNetworkWired size={40} />, title: "Networking", desc: "Scalable infrastructure." },
  { icon: <FaShieldAlt size={40} />, title: "Security", desc: "End-to-end protection." },
  { icon: <FaServer size={40} />, title: "Cloud & Servers", desc: "High-availability setups." },
];

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-dark mb-12 text-center">
          Our <span className="text-primary">Solutions</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-dark to-primary p-0.5 rounded-xl group"
            >
              <div className="bg-white p-6 rounded-xl h-full group-hover:bg-opacity-5 group-hover:text-white transition-all">
                <div className="text-primary group-hover:text-white mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-200">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}