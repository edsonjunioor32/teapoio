export type DirectoryEntry = {
  id: string;
  name: string;
  category: string;
  location: string;
  access: string;
  description: string;
  tags: string;
  verification: 'official' | 'community';
  verificationLabel: string;
  source?: string;
  sourceLabel: string;
};

/**
 * O diretório separa fontes oficiais de referências recebidas pela comunidade.
 * Nenhum contato pessoal é publicado sem autorização explícita da instituição.
 */
export const directoryEntries: DirectoryEntry[] = [
  {
    id: 'funad-ciptea',
    name: 'FUNAD — CIPTEA e Passe Livre',
    category: 'Documentação e transporte',
    location: 'Paraíba · atendimento em João Pessoa',
    access: 'Online e presencial',
    description: 'A página oficial reúne requerimento, documentos, acompanhamento, renovação e segunda via da CIPTEA e do Passe Livre.',
    tags: 'funad ciptea carteira passe livre transporte documento joao pessoa paraiba segunda via renovacao',
    verification: 'official',
    verificationLabel: 'Fonte oficial',
    source: 'https://funad.pb.gov.br/passe-livre',
    sourceLabel: 'Consultar orientações da FUNAD',
  },
  {
    id: 'cer-iv-espaco-acolher',
    name: 'CER IV — Espaço Acolher',
    category: 'Reabilitação e cuidado especializado',
    location: 'Bancários · João Pessoa',
    access: 'Rede municipal de saúde',
    description: 'Centro municipal de reabilitação com equipe multiprofissional e estrutura para diferentes necessidades de cuidado.',
    tags: 'cer iv espaço acolher bancarios terapias reabilitacao saude joao pessoa psicologia fonoaudiologia fisioterapia terapia ocupacional',
    verification: 'official',
    verificationLabel: 'Fonte oficial',
    source: 'https://www.joaopessoa.pb.gov.br/noticias/prefeitura-entrega-novo-centro-especializado-em-reabilitacao-o-cer-iv-nesta-quarta-feira/',
    sourceLabel: 'Ver notícia da Prefeitura',
  },
  {
    id: 'bpc-loas',
    name: 'BPC/LOAS — pessoa com deficiência',
    category: 'Benefícios e assistência',
    location: 'Brasil · Meu INSS e telefone 135',
    access: 'Online ou telefone',
    description: 'Serviço oficial do INSS para solicitar o benefício assistencial, acompanhar o pedido e consultar a documentação necessária.',
    tags: 'bpc loas beneficio inss cras cadunico renda assistência social meu inss 135',
    verification: 'official',
    verificationLabel: 'Fonte oficial',
    source: 'https://www.gov.br/pt-br/servicos/solicitar-beneficio-assistencial-a-pessoa-com-deficiencia',
    sourceLabel: 'Abrir serviço no Gov.br',
  },
  {
    id: 'linha-cuidado-tea',
    name: 'Linha de cuidado para TEA',
    category: 'Informação e cuidado',
    location: 'Brasil · consulta online',
    access: 'Acesso gratuito',
    description: 'Referência do Ministério da Saúde para compreender o cuidado integral e a articulação da rede de atenção.',
    tags: 'linha cuidado tea sus saude orientacao familia profissionais',
    verification: 'official',
    verificationLabel: 'Fonte oficial',
    source: 'https://linhasdecuidado.saude.gov.br/portal/transtorno-do-espectro-autista/',
    sourceLabel: 'Ler linha de cuidado',
  },
  {
    id: 'viver-kids',
    name: 'Viver Kids',
    category: 'Clínica e terapias',
    location: 'João Pessoa · localização a confirmar',
    access: 'Relato da comunidade',
    description: 'O cartão compartilhado no grupo menciona psicologia, fonoaudiologia, psicopedagogia, fisioterapia, psicomotricidade, análise do comportamento e terapia ocupacional.',
    tags: 'viver kids psicologia fonoaudiologia psicopedagogia fisioterapia psicomotricidade terapia ocupacional neurologista joao pessoa',
    verification: 'community',
    verificationLabel: 'Relato da comunidade',
    sourceLabel: 'Confirmar serviços, convênios e agenda',
  },
  {
    id: 'espaco-recriare',
    name: 'Espaço Recriare',
    category: 'Clínica e terapias',
    location: 'Grande João Pessoa · localização a confirmar',
    access: 'Relato da comunidade',
    description: 'Foi mencionado por famílias como um espaço acolhedor. O cadastro ainda precisa confirmar endereço, especialidades, convênios e disponibilidade.',
    tags: 'recriare clinica terapias acolhimento grande joao pessoa',
    verification: 'community',
    verificationLabel: 'Relato da comunidade',
    sourceLabel: 'Confirmar dados antes de divulgar',
  },
  {
    id: 'clinica-cuidar-saude',
    name: 'Clínica Cuidar Saúde',
    category: 'Clínica e especialistas',
    location: 'João Pessoa · endereço a confirmar',
    access: 'Relato da comunidade',
    description: 'A conversa relaciona a clínica a atendimentos por plano de saúde. É necessário confirmar especialidades, convênios e formas de marcação.',
    tags: 'cuidar saude clinica hapvida neuropediatra especialistas plano joao pessoa',
    verification: 'community',
    verificationLabel: 'Relato da comunidade',
    sourceLabel: 'Confirmar convênio e atendimento',
  },
  {
    id: 'prevmed-pb',
    name: 'PrevMed PB',
    category: 'Acesso a terapias',
    location: 'Paraíba · regras a confirmar',
    access: 'Relato da comunidade',
    description: 'Famílias relataram uso para acesso a terapias e clínicas parceiras. Valores, rede credenciada e regras podem mudar e não são publicados como promessa.',
    tags: 'prevmed pb plano assistencia terapias clinicas parceiras joao pessoa',
    verification: 'community',
    verificationLabel: 'Relato da comunidade',
    sourceLabel: 'Confirmar condições diretamente',
  },
];
