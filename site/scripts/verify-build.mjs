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
  'Veja opções que podem lhe ajudar',
  'class="menu-toggle" type="button"',
  'aria-controls="site-menu"',
  'Encontrar apoio',
  'Lazer',
];

for (const fragment of required) {
  if (!html.includes(fragment)) {
    throw new Error(`Missing landing fragment: ${fragment}`);
  }
}

if (html.includes('<details class="mobile-nav"')) {
  throw new Error('Mobile navigation must use the explicit menu button controller.');
}

const routes = [
  'comece-aqui/index.html',
  'entenda-o-tea/index.html',
  'apoio/index.html',
  'lazer/index.html',
  'direitos/index.html',
  'noticias/index.html',
  'faq/index.html',
  'sugestoes/index.html',
  '404.html',
];

for (const route of routes) {
  const page = await readFile(new URL(`../dist/${route}`, import.meta.url), 'utf8');
  if (!page.includes('TEAPOIO')) {
    throw new Error(`Missing brand in generated route: ${route}`);
  }
}

const rightsPage = await readFile(new URL('../dist/direitos/index.html', import.meta.url), 'utf8');
for (const fragment of [
  'A FUNAD pode ser um próximo passo.',
  'Agendar triagem',
  'Conhecer o SERI',
  'É direito do autista na Paraíba ter acesso a:',
  'É direito do autista em João Pessoa ter acesso a:',
  'comissaopcd.oabpb',
  'defparaiba',
  'ANS — Agência Nacional de Saúde Suplementar',
  'Ministério Público da Paraíba — MPPB',
  'Procon-JP — João Pessoa',
  'Procon-PB — estadual',
  'Paloma Silva',
  'Gratuidade ou meia-entrada em eventos',
  'Lei nº 2.044/2025',
  'Assento preferencial no transporte estadual',
  'Levar alimentos e itens de uso pessoal',
  'Ver a notícia da ALPB',
  'Isenção de IPVA para veículo',
  'Isenção de ICMS na compra de veículo',
  'Cardápio com pictogramas',
  'Símbolo do autismo no atendimento prioritário',
  'Outros direitos para conhecer.',
  'Meia-entrada em eventos culturais e esportivos',
  'IPI e IOF na compra de veículo',
  'Lei nº 14.383/2026',
  'Lei nº 11.090/2018',
  'Carteira estadual de identificação do autista',
  'Lei Estadual nº 11.210/2018',
  'Passe Livre Federal interestadual',
  'Lei Federal nº 8.899/1994',
  'Lei nº 15.676/2025',
  'Lei nº 12.933/2013',
  'Isenções de veículo',
]) {
  if (!rightsPage.includes(fragment)) throw new Error(`Missing rights page fragment: ${fragment}`);
}

const teaPage = await readFile(new URL('../dist/entenda-o-tea/index.html', import.meta.url), 'utf8');
for (const fragment of [
  'Medicamentos tratam sintomas associados, não o autismo.',
  'Risperidona',
  'Aripiprazol',
  'Metilfenidato e outros estimulantes',
  'Guanfacina ou clonidina',
  'Antidepressivos',
  'Anticonvulsivantes',
  'Sobre melatonina e canabidiol',
  'Bulário da Anvisa',
]) {
  if (!teaPage.includes(fragment)) throw new Error(`Missing medication guidance fragment: ${fragment}`);
}

if (teaPage.includes('dose recomendada')) throw new Error('Medication guidance must not publish dosing.');

const faqPage = await readFile(new URL('../dist/faq/index.html', import.meta.url), 'utf8');
for (const fragment of [
  'Ver primeiros passos',
  'Abrir catálogo de apoio',
  'Ver escolas inclusivas',
  'Ver CIPTEA e Passe Livre',
  'Iniciar pedido no Gov.br',
  'Ler orientações sobre medicamentos',
]) {
  if (!faqPage.includes(fragment)) throw new Error(`Missing FAQ action link: ${fragment}`);
}

const supportPage = await readFile(new URL('../dist/apoio/index.html', import.meta.url), 'utf8');
for (const fragment of [
  'Encontre apoio por tipo.',
  'Clínicas e terapias',
  'Órgãos e serviços públicos',
  'Direitos, benefícios e documentos',
  'Escolas inclusivas',
  'Fornecedores de canabidiol',
  'Colégio Polígono',
  'Polígono Kids',
  'IE Colégio e Curso',
  'colegiopoligono',
  'colegioie',
  'Abrace Esperança',
  'Acaflor',
  'Fisio&amp;Estímulos',
  '+55 83 99329-9823',
  '@fisioeestimulos',
  'Abrir localização no Google Maps',
  'Rede Fono com Amor',
  'Pro Kids Clínica',
  'Alcance Desenvolvimento Comportamental',
  'Sentidos Clínica',
  'Dra. Laila Schulz',
  'Dr. Renato Pacheco',
  'Dr. Pedro de Lourenzo Resende',
  'Dra. Marina Cavalcanti',
  '+55 83 99175-6966',
]) {
  if (!supportPage.includes(fragment)) throw new Error(`Missing support page fragment: ${fragment}`);
}

for (const fragment of ['Instituto Lápis de Cera', 'ABC Autismo 123']) {
  if (supportPage.includes(fragment)) throw new Error(`Removed directory entry still present: ${fragment}`);
}

const leisurePage = await readFile(new URL('../dist/lazer/index.html', import.meta.url), 'utf8');
for (const fragment of [
  'Programas para aproveitar com mais previsibilidade.',
  'Game Station — Mangabeira Shopping',
  'Aquário Paraíba',
  'Abrir no Google Maps',
]) {
  if (!leisurePage.includes(fragment)) throw new Error(`Missing leisure page fragment: ${fragment}`);
}

const suggestionsPage = await readFile(new URL('../dist/sugestoes/index.html', import.meta.url), 'utf8');
for (const fragment of [
  'Sua sugestão pode fazer diferença.',
  'Estamos aceitando sugestões',
  'Uma informação que está faltando',
  'Uma dificuldade para navegar',
  'name="suggestion"',
  'Copiar sugestão',
]) {
  if (!suggestionsPage.includes(fragment)) throw new Error(`Missing suggestions page fragment: ${fragment}`);
}

const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const robots = await readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8');
const manifest = await readFile(new URL('../dist/site.webmanifest', import.meta.url), 'utf8');
if (!sitemap.includes('/faq/')) throw new Error('Sitemap is missing the FAQ route.');
if (sitemap.includes('/busca/')) throw new Error('Sitemap still contains the removed search route.');
if (!robots.includes('Sitemap:')) throw new Error('Robots file is missing its sitemap reference.');
if (!manifest.includes('pwa-512.jpg')) throw new Error('Web manifest is missing the large app icon.');

