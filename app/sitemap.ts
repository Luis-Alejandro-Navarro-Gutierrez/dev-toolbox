import { MetadataRoute } from 'next';
import { guides } from '@/lib/guidesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.devtools-web.com';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/guides',
    '/json-formatter',
    '/base64-converter',
    '/jwt-decoder',
    '/grid-generator',
    '/markdown-previewer',
    '/sql-formatter',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/guides') ? 0.8 : 0.9,
  }));

  const guideRoutes = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...guideRoutes];
}