// One hero slide: overlay, responsive image and mobile caption. Shared by the static first
// slide (server HTML) and the deferred Swiper, without importing Swiper itself.
// `bare` renders the image only (no overlay or caption); see HeroSlider.
function heroSrcSet(base) {
  return `${base}-640.webp 640w, ${base}-1280.webp 1280w, ${base}-1920.webp 1920w`;
}

export default function HeroSlide({ slide, lazy = false, priority = false, bare = false }) {
  return (
    <>
      {/* Dark overlay for text readability */}
      {!bare && <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/90 z-10" />}

      <img
        src={`${slide.base}-1280.webp`}
        srcSet={heroSrcSet(slide.base)}
        sizes="100vw"
        width={slide.width}
        height={slide.height}
        alt={slide.alt}
        className="w-full h-full object-cover"
        loading={lazy ? "lazy" : priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? undefined : "async"}
      />

      {/* Per-slide caption on small screens */}
      {!bare && (
        <div className="absolute bottom-1/4 left-10 z-20 md:hidden">
          <h2 className="text-3xl font-bold text-primary">{slide.overlayText}</h2>
        </div>
      )}
    </>
  );
}
