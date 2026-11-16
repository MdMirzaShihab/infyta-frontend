"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import HeroSlide from "./HeroSlide";

// Loaded lazily by Hero after the page has finished loading, so Swiper's JS and slides 2-6
// never compete with the first paint. Swiper CSS lives in globals.css.
// While Hero's static first slide is still mounted, its overlay and caption (z-10/z-20 outside
// the .swiper stacking context) already sit above the slider, so slide 1 renders bare to avoid
// drawing them twice. firstSlideBare turns false in the same commit that removes the static layer.
export default function HeroSlider({ slides, onSwiper, onFirstChange, firstSlideBare }) {
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
          <HeroSlide slide={slide} lazy={index > 0} bare={index === 0 && firstSlideBare} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
