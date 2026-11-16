import ContactView from "@/views/ContactView";
import JsonLd from "@/components/JsonLd";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo/metadata";
import { webPage, breadcrumbList } from "@/lib/seo/jsonld";


export const metadata = pageMetadata(pages.contact);

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPage({ ...pages.contact, name: pages.contact.title, type: "ContactPage" }),
          breadcrumbList([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
        ]}
      />
      <ContactView />
    </>
  );
}
