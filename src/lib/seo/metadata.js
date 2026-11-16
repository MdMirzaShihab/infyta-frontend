import { SITE_URL } from '../../content/site.js';
import { pages } from '../../content/pages.js';

export const rootMetadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: pages.home.title, template: '%s | Infyta' },
  description: pages.home.description,
  applicationName: 'Infyta',
  openGraph: { siteName: 'Infyta', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

// Next.js merges openGraph/twitter shallowly, so repeat the shared fields here.
export function pageMetadata({ path, title, description, absoluteTitle = false }) {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: absoluteTitle ? title : `${title} | Infyta`,
      description,
      url: path,
      siteName: 'Infyta',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle ? title : `${title} | Infyta`,
      description,
    },
  };
}
