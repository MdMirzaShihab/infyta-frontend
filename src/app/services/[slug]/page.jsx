import { notFound } from "next/navigation";
import ServicePageView from "@/views/ServicePageView";
import JsonLd from "@/components/JsonLd";
import { services, getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo/metadata";
import { webPage, breadcrumbList, serviceSchema, faqPage } from "@/lib/seo/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({
    path: `/services/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const path = `/services/${service.slug}`;
  const data = [
    webPage({ path, name: service.metaTitle, description: service.metaDescription }),
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.name, path },
    ]),
    serviceSchema(service),
  ];
  if (service.faqs.length) data.push(faqPage(service.faqs));
  return (
    <>
      <JsonLd data={data} />
      <ServicePageView service={service} />
    </>
  );
}
