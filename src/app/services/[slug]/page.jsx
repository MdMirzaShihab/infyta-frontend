import { notFound } from "next/navigation";
import ServicePageView from "@/views/ServicePageView";
import { services, getService } from "@/content/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServicePageView service={service} />;
}
