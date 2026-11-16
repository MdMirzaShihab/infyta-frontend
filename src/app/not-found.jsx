import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-gradient-to-br from-dark to-primary text-white py-32 min-h-screen flex items-center">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Page not found</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="bg-white text-dark px-8 py-3 rounded-full font-bold shadow-lg"
          >
            Go to Home
          </Link>
          <Link
            href="/services"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold"
          >
            View Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
