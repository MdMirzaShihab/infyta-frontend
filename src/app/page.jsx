import HomeView from "@/views/HomeView";
import JsonLd from "@/components/JsonLd";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo/metadata";
import { webPage } from "@/lib/seo/jsonld";


export const metadata = pageMetadata(pages.home);

export default function Page() {
  return (
    <>
      <JsonLd data={webPage({ ...pages.home, name: pages.home.title })} />
      <HomeView />
    </>
  );
}
