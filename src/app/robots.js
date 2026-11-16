import { ALLOWED_CRAWLERS } from "@/lib/seo/crawlers";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...ALLOWED_CRAWLERS.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: "https://infyta.com/sitemap.xml",
    host: "https://infyta.com",
  };
}
