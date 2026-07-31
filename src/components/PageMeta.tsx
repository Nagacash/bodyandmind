import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, getRouteSeo, SITE_URL, type PageSeo, DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_ALT, DEFAULT_OG_IMAGE_WIDTH, DEFAULT_OG_IMAGE_HEIGHT, SEO_KEYWORDS } from '../lib/seo';
import { STUDIO_INFO } from '../data/studioData';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

interface PageMetaProps extends Partial<PageSeo> {
  path?: string;
}

export function PageMeta({ title, description, answerLead, keywords, path }: PageMetaProps) {
  const { pathname } = useLocation();
  const route = path ?? pathname;
  const seo = getRouteSeo(route);
  const resolvedTitle = title ?? seo.title;
  const resolvedDescription = description ?? seo.description;
  const resolvedKeywords = keywords ?? seo.keywords;
  const canonical = absoluteUrl(route.split('?')[0] || '/');

  useEffect(() => {
    document.title = resolvedTitle;
    upsertMeta('name', 'description', resolvedDescription);
    if (resolvedKeywords) {
      upsertMeta('name', 'keywords', resolvedKeywords);
    }
    upsertMeta('property', 'og:title', resolvedTitle);
    upsertMeta('property', 'og:description', resolvedDescription);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:locale', 'de_DE');
    upsertMeta('property', 'og:site_name', STUDIO_INFO.brandName);
    upsertMeta('property', 'og:image', DEFAULT_OG_IMAGE);
    upsertMeta('property', 'og:image:secure_url', DEFAULT_OG_IMAGE);
    upsertMeta('property', 'og:image:type', 'image/webp');
    upsertMeta('property', 'og:image:width', DEFAULT_OG_IMAGE_WIDTH);
    upsertMeta('property', 'og:image:height', DEFAULT_OG_IMAGE_HEIGHT);
    upsertMeta('property', 'og:image:alt', DEFAULT_OG_IMAGE_ALT);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:image', DEFAULT_OG_IMAGE);
    upsertMeta('name', 'twitter:image:alt', DEFAULT_OG_IMAGE_ALT);
    upsertMeta('name', 'twitter:title', resolvedTitle);
    upsertMeta('name', 'twitter:description', resolvedDescription);
    if (answerLead ?? seo.answerLead) {
      upsertMeta('name', 'abstract', (answerLead ?? seo.answerLead)!);
    }
    upsertLink('canonical', canonical);
  }, [resolvedTitle, resolvedDescription, resolvedKeywords, canonical, answerLead, seo.answerLead]);

  return null;
}

export function SiteStructuredData() {
  const homeSeo = getRouteSeo('/');
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: STUDIO_INFO.brandName,
        description: homeSeo.description,
        inLanguage: 'de-DE',
        keywords: SEO_KEYWORDS.join(', '),
      },
      {
        '@type': 'HealthClub',
        '@id': `${SITE_URL}/#business`,
        name: STUDIO_INFO.brandName,
        url: SITE_URL,
        email: STUDIO_INFO.email,
        telephone: STUDIO_INFO.phoneTel,
        description: homeSeo.answerLead ?? homeSeo.description,
        knowsAbout: [...SEO_KEYWORDS],
        address: {
          '@type': 'PostalAddress',
          streetAddress: STUDIO_INFO.locationName,
          addressLocality: 'Hamburg',
          postalCode: '20149',
          addressCountry: 'DE',
        },
        areaServed: {
          '@type': 'City',
          name: 'Hamburg',
        },
        priceRange: '€€€',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: 'Natalie Zimmermann',
        jobTitle: 'Box-Weltmeisterin, Speakerin & Mental Coach',
        worksFor: { '@id': `${SITE_URL}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqStructuredData({ items }: { items: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
