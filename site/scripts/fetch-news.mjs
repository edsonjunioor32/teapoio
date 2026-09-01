import { readFile, writeFile } from 'node:fs/promises';

const outputUrl = new URL('../src/data/news.json', import.meta.url);

const feeds = [
  {
    scope: 'Nacional',
    url: 'https://news.google.com/rss/search?q=autismo+Brasil&hl=pt-BR&gl=BR&ceid=BR%3Apt-419',
  },
  {
    scope: 'Nacional',
    url: 'https://agenciabrasil.ebc.com.br/rss/saude/feed.xml',
  },
  {
    scope: 'Regional',
    url: 'https://news.google.com/rss/search?q=autismo+Para%C3%ADba&hl=pt-BR&gl=BR&ceid=BR%3Apt-419',
  },
  {
    scope: 'Regional',
    url: 'https://news.google.com/rss/search?q=site%3Afunad.pb.gov.br+autismo&hl=pt-BR&gl=BR&ceid=BR%3Apt-419',
  },
  {
    scope: 'Local',
    url: 'https://news.google.com/rss/search?q=autismo+%22Jo%C3%A3o+Pessoa%22&hl=pt-BR&gl=BR&ceid=BR%3Apt-419',
  },
  {
    scope: 'Local',
    url: 'https://news.google.com/rss/search?q=autismo+Jo%C3%A3o+Pessoa+site%3Ajoaopessoa.pb.gov.br&hl=pt-BR&gl=BR&ceid=BR%3Apt-419',
  },
];

const relevantWords = /autis|TEA|neurodiv|inclus[aã]o|defici[eê]ncia/i;
const maxAgeMs = 1000 * 60 * 60 * 24 * 240;

function decodeEntities(value = '') {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return value
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
      if (entity.startsWith('#x')) return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
      if (entity.startsWith('#')) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
      return named[entity.toLowerCase()] ?? match;
    })
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function cleanText(value = '') {
  let text = value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');

  for (let iteration = 0; iteration < 3; iteration += 1) {
    text = decodeEntities(text).replace(/<[^>]*>/g, ' ');
  }

  return text.replace(/\s+/g, ' ').trim();
}

function readTag(block, tag) {
  const expression = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i');
  return block.match(expression)?.[1] ?? '';
}

function shorten(value, max = 180) {
  const text = cleanText(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function sourceFrom(title, source) {
  const cleanSource = cleanText(source);
  if (cleanSource) return cleanSource;
  const pieces = cleanText(title).split(' - ');
  return pieces.length > 1 ? pieces.at(-1) : 'Fonte original';
}

function titleWithoutSource(title, source) {
  const cleanTitle = cleanText(title);
  const cleanSource = cleanText(source);
  if (cleanSource && cleanTitle.endsWith(` - ${cleanSource}`)) {
    return cleanTitle.slice(0, -(cleanSource.length + 3));
  }
  return cleanTitle;
}

function parseFeed(xml, scope) {
  return xml
    .split(/<item(?:\s[^>]*)?>/i)
    .slice(1)
    .map((block) => {
      const rawTitle = readTag(block, 'title');
      const source = sourceFrom(rawTitle, readTag(block, 'source'));
      const title = titleWithoutSource(rawTitle, source);
      const link = cleanText(readTag(block, 'link'));
      const summary = shorten(readTag(block, 'description'));
      const dateValue = cleanText(readTag(block, 'pubDate') || readTag(block, 'published') || readTag(block, 'updated'));
      const date = new Date(dateValue);

      if (!title || !/^https?:\/\//i.test(link) || !relevantWords.test(`${title} ${summary}`)) return null;
      if (Number.isNaN(date.valueOf()) || Date.now() - date.valueOf() > maxAgeMs) return null;

      return {
        id: `${scope}-${title.toLowerCase().replace(/[^a-z0-9]+/gi, '-').slice(0, 70)}`,
        scope,
        title,
        summary: summary || 'Leia a publicação original para conhecer os detalhes e a fonte completa.',
        source,
        link,
        publishedAt: date.toISOString(),
      };
    })
    .filter(Boolean);
}

async function fetchFeed(feed) {
  const response = await fetch(feed.url, { signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'TEAPOIO-news-feed/1.0' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return parseFeed(await response.text(), feed.scope);
}

let existing = { updatedAt: null, items: [], errors: [] };
try {
  existing = JSON.parse(await readFile(outputUrl, 'utf8'));
} catch {
  // The first run creates the file below.
}

const results = await Promise.allSettled(feeds.map(fetchFeed));
const items = [];
const seen = new Set();
const errors = [];

for (const [index, result] of results.entries()) {
  if (result.status === 'rejected') {
    errors.push(`${feeds[index].scope}: feed indisponível`);
    continue;
  }
  for (const item of result.value) {
    const key = item.title.toLowerCase().replace(/\W+/g, ' ').trim();
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(item);
  }
}

items.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
const freshItems = items.slice(0, 18);
const payload = {
  updatedAt: new Date().toISOString(),
  items: freshItems.length > 0 ? freshItems : existing.items ?? [],
  errors,
};

await writeFile(outputUrl, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Notícias automáticas: ${payload.items.length} itens, ${errors.length} feed(s) indisponível(is).`);
