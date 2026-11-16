import { allPaths } from "@/content/pages";
import { absoluteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap() {
  return allPaths().map((p) => ({ url: absoluteUrl(p), lastModified: new Date() }));
}
