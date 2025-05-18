import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Import your local images
import DataCenter from '../assets/hero/Data.webp';
import Holographic from '../assets/hero/Holographic.webp';
import Developer from '../assets/hero/Developer.webp';
import Network from '../assets/hero/Network.webp';
import Security from '../assets/hero/Padlock.webp';
import TeamCollaboration from '../assets/hero/Team.webp';

export default function Hero() {
  const heroImages = [
    { 
      src: TeamCollaboration, 
      alt: "Diverse tech team collaborating",
      overlayText: "Expert Teams Delivering Excellence"
    },
    { 
      src: DataCenter, 
      alt: "Modern data center infrastructure",
      overlayText: "Robust Infrastructure Solutions"
    },
    { 
      src: Developer, 
      alt: "Developer coding on advanced setup",
      overlayText: "Cutting-Edge Software Development"
    },
    { 
      src: Network, 
      alt: "Global network connections",
      overlayText: "Seamless Network Integration"
    },
    { 
      src: Security, 
      alt: "Digital security protection",
      overlayText: "Enterprise-Grade Security"
    },
    { 
      src: Holographic, 
      alt: "Futuristic holographic interface",
      overlayText: "Innovative Tech Solutions"
    }
  ];

  return (
    <section className="relative bg-dark text-white min-h-screen flex items-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ 
            delay: 5000,
            disableOnInteraction: false 
          }}
          speed={1500}
          loop={true}
          className="h-full w-full"
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/90 z-10" />
              
              {/* Image with optimized loading */}
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
              />
              
              {/* Optional text overlay per slide (alternative to main content) */}
              <div className="absolute bottom-1/4 left-10 z-20 md:hidden">
                <h2 className="text-3xl font-bold text-primary">
                  {image.overlayText}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-24 relative z-20"
      >
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-primary">Infyta</span> – Limitless Tech Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
          Engineering Tomorrow’s Tech Today
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-secondary px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg"
            >
              Get Started <FiArrowRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white hover:border-primary text-white hover:text-primary px-8 py-3 rounded-full font-bold"
            >
              Explore Solutions
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Slider Pagination (custom style) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <div 
            key={index}
            className="h-2 w-2 rounded-full bg-white/50 hover:bg-white cursor-pointer swiper-pagination-bullet"
            onClick={() => document.querySelector('.swiper').swiper.slideTo(index)}
          />
        ))}
      </div>
    </section>
  );
}