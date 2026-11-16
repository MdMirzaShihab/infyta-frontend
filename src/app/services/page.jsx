import ServicesIndexView from "@/views/ServicesIndexView";
import JsonLd from "@/components/JsonLd";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo/metadata";
import { webPage, breadcrumbList, serviceItemList } from "@/lib/seo/jsonld";


export const metadata = pageMetadata(pages.services);

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          webPage({ ...pages.services, name: pages.services.title }),
          breadcrumbList([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
          serviceItemList(),
        ]}
      />
      <ServicesIndexView />
    </>
  );
}
