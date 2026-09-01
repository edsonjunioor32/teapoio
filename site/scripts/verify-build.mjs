import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const required = [
  'Um próximo passo',
  'TEAPOIO',
  'Comece por aqui',
  'Encontre apoio',
  'NOTÍCIAS SEM COMPLICAÇÃO',
  'Informação clara. Apoio perto.',
];

for (const fragment of required) {
  if (!html.includes(fragment)) {
    throw new Error(`Missing landing fragment: ${fragment}`);
  }
}

const routes = [
  'comece-aqui/index.html',
  'entenda-o-tea/index.html',
  'apoio/index.html',
  'noticias/index.html',
  'faq/index.html',
  '404.html',
];

for (const route of routes) {
  const page = await readFile(new URL(`../dist/${route}`, import.meta.url), 'utf8');
  if (!page.includes('TEAPOIO')) {
    throw new Error(`Missing brand in generated route: ${route}`);
  }
}

const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const robots = await readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8');
if (!sitemap.includes('/faq/')) throw new Error('Sitemap is missing the FAQ route.');
if (!robots.includes('Sitemap:')) throw new Error('Robots file is missing its sitemap reference.');
