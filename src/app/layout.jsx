import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { rootMetadata } from "@/lib/seo/metadata";

export const metadata = rootMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
