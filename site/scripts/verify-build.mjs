import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const required = [
  'Orientação clara para o próximo passo',
  'TEAPOIO',
  'Ver primeiros passos',
  'O que você precisa agora?',
  'Encontre o que precisa.',
  'Tipo de ajuda',
  'Localidade',
  'Atualizações recentes',
  'Dúvidas frequentes',
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
  'direitos/index.html',
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
const manifest = await readFile(new URL('../dist/site.webmanifest', import.meta.url), 'utf8');
if (!sitemap.includes('/faq/')) throw new Error('Sitemap is missing the FAQ route.');
if (sitemap.includes('/busca/')) throw new Error('Sitemap still contains the removed search route.');
if (!robots.includes('Sitemap:')) throw new Error('Robots file is missing its sitemap reference.');
if (!manifest.includes('pwa-512.jpg')) throw new Error('Web manifest is missing the large app icon.');
