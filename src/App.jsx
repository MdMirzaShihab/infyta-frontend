import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from './pages/Services';
import SoftwareDevelopment from './pages/Services/SoftwareDevelopment';
import NetworkInfrastructure from './pages/Services/NetworkInfrastructure';
import ITSupportConsultancy from './pages/Services/ITSupportConsultancy';
import SecuritySurveillance from './pages/Services/SecuritySurveillance';
import ServerCloudSolutions from './pages/Services/ServerCloudSolutions';
import TrainingCertification from './pages/Services/TrainingCertification';
import Contact from "./pages/Contact";
import Team from './pages/Team';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/software-development" element={<SoftwareDevelopment />} />
        <Route path="/services/network-infrastructure" element={<NetworkInfrastructure />} />
        <Route path="/services/it-support-consultancy" element={<ITSupportConsultancy />} />
        <Route path="/services/security-surveillance" element={<SecuritySurveillance />} />
        <Route path="/services/server-cloud-solutions" element={<ServerCloudSolutions />} />
        <Route path="/services/training-certification" element={<TrainingCertification />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <Footer />
    </Router>
  );
}