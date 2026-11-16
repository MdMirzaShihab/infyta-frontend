"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import HeroSlide from "./HeroSlide";

// Loaded lazily by Hero after the page has finished loading, so Swiper's JS and slides 2-6
// never compete with the first paint. Swiper CSS lives in globals.css.
export default function HeroSlider({ slides, onSwiper, onFirstChange }) {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      speed={1500}
      loop={true}
      onSwiper={onSwiper}
      onSlideChangeTransitionStart={onFirstChange}
      className="h-full w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.base}>
          <HeroSlide slide={slide} lazy={index > 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
