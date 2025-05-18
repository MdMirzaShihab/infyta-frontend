import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">Infyta</span>
            </h3>
            <p className="text-gray-400">
              Limitless Tech Solutions for a Digital World
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary">Home</a></li>
              <li><a href="#" className="hover:text-primary">Services</a></li>
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary">Software Dev</a></li>
              <li><a href="#" className="hover:text-primary">IT Security</a></li>
              <li><a href="#" className="hover:text-primary">Cloud Solutions</a></li>
              <li><a href="#" className="hover:text-primary">Consulting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-primary"><FaLinkedin /></a>
              <a href="#" className="text-2xl hover:text-primary"><FaTwitter /></a>
              <a href="#" className="text-2xl hover:text-primary"><FaGithub /></a>
            </div>
            <p className="mt-4 text-gray-400">info@infyta.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Infyta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}