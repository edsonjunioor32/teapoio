import { directoryEntries } from './directory';

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  keywords: string;
  topics: string[];
  regions: string[];
};

const pageItems: SearchItem[] = [
  {
    id: 'primeiros-passos',
    title: 'Primeiros passos',
    description: 'Um roteiro curto para organizar observações, buscar orientação e decidir a primeira ação.',
    category: 'Comece aqui',
    href: '/comece-aqui/',
    keywords: 'começar comecar suspeita sinais avaliação avaliacao diagnóstico diagnostico laudo médico medico pediatra onde ir',
    topics: ['primeiros-passos'],
    regions: ['todos'],
  },
  {
    id: 'entenda-tea',
    title: 'Entenda o TEA',
    description: 'Informação introdutória, mitos comuns e fontes oficiais para aprofundar a leitura.',
    category: 'Informação',
    href: '/entenda-o-tea/',
    keywords: 'autismo tea transtorno espectro sinais neurodesenvolvimento comportamento comunicação comunicacao',
    topics: ['primeiros-passos'],
    regions: ['todos'],
  },
  {
    id: 'direitos-documentos',
    title: 'Direitos e documentos',
    description: 'Caminhos para CIPTEA, Passe Livre, inclusão escolar e BPC.',
    category: 'Direitos',
    href: '/direitos/',
    keywords: 'direitos documentos ciptea passe livre escola inclusão inclusao bpc loas benefício beneficio inss cras cadunico',
    topics: ['direitos'],
    regions: ['todos'],
  },
  {
    id: 'orientacao-juridica',
    title: 'Advogados e orientação jurídica',
    description: 'Canais oficiais para orientação sobre direitos, saúde e inclusão, sem indicação de profissionais particulares.',
    category: 'Direitos',
    href: '/direitos/#orientacao-juridica',
    keywords: 'advogado advogada advogados advocacia jurídico juridico justiça justica defensoria pública publica oab denúncia denuncia processo ação acao direito negado escola plano saúde saude',
    topics: ['direitos'],
    regions: ['paraiba'],
  },
  {
    id: 'duvidas-frequentes',
    title: 'Dúvidas frequentes',
    description: 'Respostas diretas sobre diagnóstico, atendimento, escola, benefícios e medicamentos.',
    category: 'Orientação',
    href: '/faq/',
    keywords: 'dúvidas duvidas perguntas respostas terapia sus escola medicamento remédio remedio ciptea bpc',
    topics: ['primeiros-passos', 'servicos', 'direitos'],
    regions: ['todos'],
  },
  {
    id: 'noticias',
    title: 'Notícias sobre autismo',
    description: 'Publicações nacionais, da Paraíba e de João Pessoa com acesso à fonte original.',
    category: 'Notícias',
    href: '/noticias/',
    keywords: 'notícias noticias novidade agenda evento pesquisa brasil paraíba paraiba joão pessoa joao pessoa',
    topics: ['noticias'],
    regions: ['todos'],
  },
];

const normalize = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

const directoryItems: SearchItem[] = directoryEntries.map((entry) => {
  const text = normalize(`${entry.category} ${entry.tags}`);
  const location = normalize(`${entry.location} ${entry.access}`);
  const topics = text.includes('beneficio') || text.includes('document') || text.includes('ciptea') || text.includes('passe livre')
    ? ['direitos']
    : text.includes('informacao') || text.includes('linha cuidado')
      ? ['primeiros-passos', 'servicos']
      : ['servicos'];
  const regions = new Set<string>();

  if (location.includes('joao pessoa')) regions.add('joao-pessoa');
  if (location.includes('bayeux')) regions.add('bayeux');
  if (location.includes('santa rita')) regions.add('santa-rita');
  if (location.includes('cabedelo')) regions.add('cabedelo');
  if (location.includes('grande joao pessoa') || ['joao pessoa', 'bayeux', 'santa rita', 'cabedelo'].some((city) => location.includes(city))) regions.add('grande-joao-pessoa');
  if (location.includes('paraiba') || ['joao pessoa', 'bayeux', 'santa rita', 'cabedelo'].some((city) => location.includes(city))) regions.add('paraiba');
  if (location.includes('online') || location.includes('consulta online') || location.includes('meu inss')) regions.add('online');
  if (regions.size === 0) regions.add('todos');

  return {
    id: `diretorio-${entry.id}`,
    title: entry.name,
    description: entry.description,
    category: entry.category,
    href: `/apoio/#${entry.id}`,
    keywords: `${entry.tags} ${entry.location} ${entry.access} ${entry.verificationLabel}`,
    topics,
    regions: [...regions],
  };
});

export const searchItems: SearchItem[] = [...pageItems, ...directoryItems];
