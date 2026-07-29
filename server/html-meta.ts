import { getRouteSeo, absoluteUrl, SITE_URL, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT, DEFAULT_OG_IMAGE_WIDTH, DEFAULT_OG_IMAGE_HEIGHT } from '../src/lib/seo.ts';
import { STUDIO_INFO } from '../src/data/studioData.ts';

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

const SITE_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: STUDIO_INFO.brandName,
      description: STUDIO_INFO.tagline,
      inLanguage: 'de-DE',
    },
    {
      '@type': 'HealthClub',
      '@id': `${SITE_URL}/#business`,
      name: STUDIO_INFO.brandName,
      url: SITE_URL,
      email: STUDIO_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: STUDIO_INFO.locationName,
        addressLocality: 'Hamburg',
        postalCode: '20149',
        addressCountry: 'DE',
      },
    },
  ],
});

export function injectRouteHtmlMeta(html: string, pathname: string): string {
  const route = pathname.split('?')[0] || '/';
  const seo = getRouteSeo(route);
  const canonical = absoluteUrl(route);
  const title = escapeAttr(seo.title);
  const description = escapeAttr(seo.description);
  const ogImage = escapeAttr(DEFAULT_OG_IMAGE);
  const ogImageAlt = escapeAttr(DEFAULT_OG_IMAGE_ALT);

  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta property="og:image" content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${ogImage}" />`
    )
    .replace(
      /<meta property="og:image:secure_url" content="[^"]*"\s*\/?>/,
      `<meta property="og:image:secure_url" content="${ogImage}" />`
    )
    .replace(
      /<meta property="og:image:alt" content="[^"]*"\s*\/?>/,
      `<meta property="og:image:alt" content="${ogImageAlt}" />`
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image" content="${ogImage}" />`
    );

  if (!out.includes('application/ld+json')) {
    out = out.replace(
      '</head>',
      `    <script type="application/ld+json">${SITE_JSON_LD}</script>\n  </head>`
    );
  }

  if (!out.includes('<h1')) {
    const h1 = escapeAttr(seo.title.split('|')[0].trim());
    out = out.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    <div id="seo-fallback" hidden><h1>${h1}</h1><p>${description}</p></div>`
    );
  }

  return out;
}
