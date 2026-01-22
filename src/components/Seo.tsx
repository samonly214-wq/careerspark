import React from 'react';
import { Helmet } from 'react-helmet-async';

type OpenGraph = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
};

type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  og?: OpenGraph;
  children?: React.ReactNode;
};

const SITE_NAME = 'CareerSpark';
const DEFAULT_DESCRIPTION = 'Connect with top employers and discover opportunities that match your skills.';
const DEFAULT_OG_IMAGE = '/og-image.svg';

export function Seo({ title, description, canonical, noindex, og, children }: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Find Jobs & Hire Talent`;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const ogImage = og?.image || DEFAULT_OG_IMAGE;
  const ogTitle = og?.title || fullTitle;
  const ogDescription = og?.description || metaDescription;
  const ogUrl = og?.url || (typeof window !== 'undefined' ? window.location.href : '/');

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}

      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={og?.type || 'website'} />
      <meta property="og:url" content={ogUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Helmet>
  );
}
