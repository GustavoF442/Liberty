# Liberty — Sistema Imobiliário

Sistema profissional de gestão e vitrine de imóveis, construído com **Next.js 14**, **TypeScript**, **TailwindCSS** e **Supabase**.

## Instalação

```bash
npm install
cp .env.local.example .env.local   # preencha as variáveis
npm run dev
```

## Variáveis de Ambiente

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

## Estrutura de Rotas

| Rota | Descrição |
|---|---|
| `/` | Home — Hero, corretores, destaques |
| `/imoveis` | Listagem com filtros (tipo, finalidade, bairro, preço) |
| `/imovel/[id]` | Detalhes do imóvel com galeria, custos, corretor, WhatsApp e formulário de contato |
| `/sobre` | Página institucional |
| `/login` | Autenticação administrativa |
| `/admin` | Dashboard — listagem, links de edição e exclusão |
| `/admin/novo` | Cadastro de imóvel (formulário reutilizável) |
| `/admin/editar/[id]` | Edição de imóvel (mesmo formulário, modo edição) |

## Componentes Principais

| Componente | Função |
|---|---|
| `FormularioImovel` | Formulário reutilizável de 7 seções (cadastro e edição) |
| `UploadImagens` | Upload múltiplo com preview, reordenação drag-and-drop, remoção e fallback |
| `ImovelCard` | Card de imóvel com badges, ícones e formatação monetária |
| `Filtro` | Filtros de tipo, finalidade, bairro e faixa de preço |
| `Destaques` | Grid de imóveis destacados para a home |
| `Hero` | Banner principal |
| `Navbar` | Navegação fixa com menu mobile |
| `Footer` | Rodapé com links e contato |
| `CorretorCard` | Card de corretor com foto, CRECI e WhatsApp |

## Schema do Banco — Tabela `imoveis`

```sql
CREATE TABLE imoveis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Informações Básicas
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL,
  finalidade TEXT NOT NULL,          -- 'Venda', 'Locação', 'Temporada'
  preco NUMERIC NOT NULL,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL,
  logradouro TEXT NOT NULL,
  numero TEXT NOT NULL,
  proximidades TEXT DEFAULT '',
  codigo_referencia TEXT DEFAULT '',

  -- Características Físicas
  area_util NUMERIC DEFAULT 0,
  area_total NUMERIC DEFAULT 0,
  dormitorios INTEGER DEFAULT 0,
  suites INTEGER DEFAULT 0,
  banheiros INTEGER DEFAULT 0,
  vagas INTEGER DEFAULT 0,
  diferenciais_internos TEXT DEFAULT '',

  -- Custos Fixos
  valor_condominio NUMERIC DEFAULT 0,
  incluso_condominio TEXT DEFAULT '',
  valor_iptu NUMERIC DEFAULT 0,
  taxas_extras TEXT DEFAULT '',

  -- Estrutura do Condomínio e Lazer
  seguranca TEXT DEFAULT '',
  lazer TEXT DEFAULT '',
  comodidades TEXT DEFAULT '',

  -- Conteúdo Visual e Descritivo
  fotos TEXT[] DEFAULT '{}',
  video_url TEXT DEFAULT '',
  descricao TEXT NOT NULL,

  -- Documentação e Status
  aceita_financiamento BOOLEAN DEFAULT false,
  aceita_fgts BOOLEAN DEFAULT false,
  aceita_permuta BOOLEAN DEFAULT false,
  disponivel BOOLEAN DEFAULT true,
  destaque BOOLEAN DEFAULT false,

  -- Corretor
  corretor_id UUID REFERENCES corretores(id)
);
```

## Schema do Banco — Tabela `corretores`

```sql
CREATE TABLE corretores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  creci TEXT NOT NULL,
  telefone TEXT NOT NULL,
  foto TEXT DEFAULT '',
  ativo BOOLEAN DEFAULT true
);
```

## Supabase Storage

- **Bucket:** `fotos-imoveis` (público)
- Upload via `supabase.storage.from("fotos-imoveis").upload()`
- URL pública via `supabase.storage.from("fotos-imoveis").getPublicUrl()`
- As URLs públicas são salvas diretamente no campo `fotos` do banco

## Formulário de Imóvel (7 Seções)

1. **Informações Básicas** — título, tipo, finalidade, preço (máscara BRL), logradouro, número, bairro, cidade, proximidades, código de referência, destaque, disponível
2. **Características Físicas** — área útil, área total, dormitórios, suítes, banheiros, vagas, diferenciais internos
3. **Custos Fixos** — condomínio (máscara BRL), incluso, IPTU (máscara BRL), taxas extras
4. **Estrutura do Condomínio e Lazer** — segurança, lazer, comodidades
5. **Conteúdo Visual e Descritivo** — upload de fotos, URL de vídeo/tour, descrição detalhada
6. **Documentação e Status** — aceita financiamento, FGTS, permuta
7. **Corretor Responsável** — select dinâmico de corretores ativos

Todos os valores monetários usam máscara brasileira na digitação e são convertidos para `numeric` antes do envio ao banco.
