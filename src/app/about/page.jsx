import AboutView from "@/views/AboutView";
import JsonLd from "@/components/JsonLd";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo/metadata";
import { webPage, breadcrumbList } from "@/lib/seo/jsonld";

export const metadata = pageMetadata(pages.about);

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPage({ ...pages.about, name: pages.about.title, type: "AboutPage" }),
          breadcrumbList([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
        ]}
      />
      <AboutView />
    </>
  );
}
