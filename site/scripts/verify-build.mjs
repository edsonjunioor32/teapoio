import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const required = [
  'Um próximo passo',
  'TEAPOIO',
  'Comece por aqui',
  'Apoio na região',
  'NOTÍCIAS SEM COMPLICAÇÃO',
  'Informação clara. Apoio perto.',
];

for (const fragment of required) {
  if (!html.includes(fragment)) {
    throw new Error(`Missing landing fragment: ${fragment}`);
  }
}
