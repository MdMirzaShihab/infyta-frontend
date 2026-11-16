import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="band notfound">
      <div className="wrap">
        <h1>Page not found</h1>
        <p className="lede">The page you are looking for does not exist or has moved.</p>
        <div className="contact__cta">
          <Link className="btn" href="/">Go to Home</Link>
          <Link className="btn btn--ghost" href="/services">View Our Services</Link>
        </div>
      </div>
    </section>
  );
}
