import "./globals.css";
import "@/styles/tokens.css";
import "@/styles/base.css";
import { Archivo } from "next/font/google";
import { themeScript, THEME_COLORS } from "@/lib/theme-script";
import { primaryEmail } from "@/content/email";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MotionProvider from "@/components/MotionProvider";
import { rootMetadata } from "@/lib/seo/metadata";
import { businessGraph } from "@/lib/seo/jsonld";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], display: "swap", variable: "--font-archivo" });

export const metadata = rootMetadata;

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
