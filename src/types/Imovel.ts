export interface Imovel {
  id: string;
  created_at: string;

  /* ── Informações Básicas ── */
  titulo: string;
  tipo: string;
  finalidade: "Venda" | "Locação" | "Temporada";
  preco: number;
  bairro: string;
  cidade: string;
  estado: string;
  logradouro: string;
  numero: string;
  proximidades: string;
  codigo_referencia: string;

  /* ── Características Físicas ── */
  area_util: number;
  area_total: number;
  dormitorios: number;
  suites: number;
  banheiros: number;
  vagas: number;
  diferenciais_internos: string;

  /* ── Custos Fixos ── */
  valor_condominio: number;
  condominio_incluso: string;
  valor_iptu: number;
  taxas_extras: string;

  /* ── Estrutura do Condomínio e Lazer ── */
  seguranca: string;
  lazer: string;
  comodidades: string;

  /* ── Conteúdo Visual e Descritivo ── */
  fotos: string[];
  video_url: string;
  descricao: string;

  /* ── Documentação e Status ── */
  aceita_financiamento: boolean;
  aceita_fgts: boolean;
  aceita_permuta: boolean;
  disponivel: boolean;
  destaque: boolean;

  /* ── SEO ── */
  slug?: string;
  updated_at?: string;

  /* ── Corretor ── */
  corretor_id: string | null;
}

export interface Corretor {
  id: string;
  created_at?: string;
  nome: string;
  creci: string;
  telefone: string;
  email?: string;
  instagram?: string;
  especialidade?: string;
  descricao_publica?: string;
  observacoes_internas?: string;
  foto: string;
  foto_posicao?: string;
  ativo: boolean;
}
