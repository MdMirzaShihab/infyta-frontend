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

const OG_IMAGE = { url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Infyta – IT Solutions in Dhaka, Bangladesh' };

// Page-level openGraph/twitter replace the file-based opengraph-image, so the image is repeated here.
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
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle ? title : `${title} | Infyta`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
