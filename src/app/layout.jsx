import "./globals.css";
import { primaryEmail } from "@/content/email";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MotionProvider from "@/components/MotionProvider";
import { rootMetadata } from "@/lib/seo/metadata";
import { businessGraph } from "@/lib/seo/jsonld";

export const metadata = rootMetadata;

export const viewport = { themeColor: "#1f2c62" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={businessGraph()} />
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer email={primaryEmail()} />
        </MotionProvider>
      </body>
    </html>
  );
}
