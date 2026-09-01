import { directoryEntries } from './directory';

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  keywords: string;
};

const pageItems: SearchItem[] = [
  {
    id: 'primeiros-passos',
    title: 'Primeiros passos',
    description: 'Um roteiro curto para organizar observações, buscar orientação e decidir a primeira ação.',
    category: 'Comece aqui',
    href: '/comece-aqui/',
    keywords: 'começar comecar suspeita sinais avaliação avaliacao diagnóstico diagnostico laudo médico medico pediatra onde ir',
  },
  {
    id: 'entenda-tea',
    title: 'Entenda o TEA',
    description: 'Informação introdutória, mitos comuns e fontes oficiais para aprofundar a leitura.',
    category: 'Informação',
    href: '/entenda-o-tea/',
    keywords: 'autismo tea transtorno espectro sinais neurodesenvolvimento comportamento comunicação comunicacao',
  },
  {
    id: 'direitos-documentos',
    title: 'Direitos e documentos',
    description: 'Caminhos para CIPTEA, Passe Livre, inclusão escolar e BPC.',
    category: 'Direitos',
    href: '/direitos/',
    keywords: 'direitos documentos ciptea passe livre escola inclusão inclusao bpc loas benefício beneficio inss cras cadunico',
  },
  {
    id: 'orientacao-juridica',
    title: 'Advogados e orientação jurídica',
    description: 'Canais oficiais para orientação sobre direitos, saúde e inclusão, sem indicação de profissionais particulares.',
    category: 'Direitos',
    href: '/direitos/#orientacao-juridica',
    keywords: 'advogado advogada advogados advocacia jurídico juridico justiça justica defensoria pública publica oab denúncia denuncia processo ação acao direito negado escola plano saúde saude',
  },
  {
    id: 'duvidas-frequentes',
    title: 'Dúvidas frequentes',
    description: 'Respostas diretas sobre diagnóstico, atendimento, escola, benefícios e medicamentos.',
    category: 'Orientação',
    href: '/faq/',
    keywords: 'dúvidas duvidas perguntas respostas terapia sus escola medicamento remédio remedio ciptea bpc',
  },
  {
    id: 'noticias',
    title: 'Notícias sobre autismo',
    description: 'Publicações nacionais, da Paraíba e de João Pessoa com acesso à fonte original.',
    category: 'Notícias',
    href: '/noticias/',
    keywords: 'notícias noticias novidade agenda evento pesquisa brasil paraíba paraiba joão pessoa joao pessoa',
  },
];

const directoryItems: SearchItem[] = directoryEntries.map((entry) => ({
  id: `diretorio-${entry.id}`,
  title: entry.name,
  description: entry.description,
  category: entry.category,
  href: `/apoio/#${entry.id}`,
  keywords: `${entry.tags} ${entry.location} ${entry.access} ${entry.verificationLabel}`,
}));

export const searchItems: SearchItem[] = [...pageItems, ...directoryItems];
