import type { APIRoute } from 'astro';

const routes = [
  '/',
  '/comece-aqui/',
  '/entenda-o-tea/',
  '/apoio/',
  '/direitos/',
  '/noticias/',
  '/faq/',
];

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const origin = site ?? new URL('http://localhost:4321');
  const urls = routes.map((route) => `  <url><loc>${new URL(`${base}${route}`, origin).href}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
