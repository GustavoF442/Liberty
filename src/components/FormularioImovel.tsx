"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Imovel, Corretor } from "@/types/Imovel";
import UploadImagens from "@/components/UploadImagens";

/* ══════════════════════════════════════
   Helpers de máscara
   ══════════════════════════════════════ */
function formatarMoeda(valor: string): string {
  const numeros = valor.replace(/\D/g, "");
  if (!numeros) return "";
  const centavos = parseInt(numeros, 10);
  const reais = centavos / 100;
  return reais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function parseMoeda(valor: string): number {
  const limpo = valor.replace(/[R$\s.]/g, "").replace(",", ".");
  const num = parseFloat(limpo);
  return isNaN(num) ? 0 : num;
}

function formatarDecimal(valor: string): string {
  return valor.replace(/[^0-9.,]/g, "");
}

function parseDecimal(valor: string): number {
  const limpo = valor.replace(",", ".");
  const num = parseFloat(limpo);
  return isNaN(num) ? 0 : num;
}

function moedaFromNumber(val: number): string {
  if (!val || val <= 0) return "";
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function decimalFromNumber(val: number): string {
  if (!val || val <= 0) return "";
  return val.toString().replace(".", ",");
}

/* ══════════════════════════════════════
   Form state type
   ══════════════════════════════════════ */
interface FormState {
  titulo: string;
  tipo: string;
  finalidade: string;
  preco: string;
  bairro: string;
  cidade: string;
  estado: string;
  logradouro: string;
  numero: string;
  proximidades: string;
  codigo_referencia: string;
  area_util: string;
  area_total: string;
  dormitorios: string;
  suites: string;
  banheiros: string;
  vagas: string;
  diferenciais_internos: string;
  valor_condominio: string;
  condominio_incluso: string;
  valor_iptu: string;
  taxas_extras: string;
  seguranca: string;
  lazer: string;
  comodidades: string;
  video_url: string;
  descricao: string;
  aceita_financiamento: boolean;
  aceita_fgts: boolean;
  aceita_permuta: boolean;
  disponivel: boolean;
  destaque: boolean;
  corretor_id: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

/* ══════════════════════════════════════
   Props
   ══════════════════════════════════════ */
interface FormularioImovelProps {
  imovel?: Imovel;
}

/* ══════════════════════════════════════
   Component
   ══════════════════════════════════════ */
export default function FormularioImovel({ imovel }: FormularioImovelProps) {
  const router = useRouter();
  const isEdicao = !!imovel;

  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erroGeral, setErroGeral] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [fotosUrls, setFotosUrls] = useState<string[]>(imovel?.fotos || []);

  const [form, setForm] = useState<FormState>(() => {
    if (imovel) {
      return {
        titulo: imovel.titulo || "",
        tipo: imovel.tipo || "",
        finalidade: imovel.finalidade || "",
        preco: moedaFromNumber(imovel.preco),
        bairro: imovel.bairro || "",
        cidade: imovel.cidade || "",
        estado: imovel.estado || "",
        logradouro: imovel.logradouro || "",
        numero: imovel.numero || "",
        proximidades: imovel.proximidades || "",
        codigo_referencia: imovel.codigo_referencia || "",
        area_util: decimalFromNumber(imovel.area_util),
        area_total: decimalFromNumber(imovel.area_total),
        dormitorios: (imovel.dormitorios ?? 0).toString(),
        suites: (imovel.suites ?? 0).toString(),
        banheiros: (imovel.banheiros ?? 0).toString(),
        vagas: (imovel.vagas ?? 0).toString(),
        diferenciais_internos: imovel.diferenciais_internos || "",
        valor_condominio: moedaFromNumber(imovel.valor_condominio),
        condominio_incluso: imovel.condominio_incluso || "",
        valor_iptu: moedaFromNumber(imovel.valor_iptu),
        taxas_extras: imovel.taxas_extras || "",
        seguranca: imovel.seguranca || "",
        lazer: imovel.lazer || "",
        comodidades: imovel.comodidades || "",
        video_url: imovel.video_url || "",
        descricao: imovel.descricao || "",
        aceita_financiamento: imovel.aceita_financiamento ?? false,
        aceita_fgts: imovel.aceita_fgts ?? false,
        aceita_permuta: imovel.aceita_permuta ?? false,
        disponivel: imovel.disponivel ?? true,
        destaque: imovel.destaque ?? false,
        corretor_id: imovel.corretor_id || "",
      };
    }
    return {
      titulo: "",
      tipo: "",
      finalidade: "",
      preco: "",
      bairro: "",
      cidade: "",
      estado: "",
      logradouro: "",
      numero: "",
      proximidades: "",
      codigo_referencia: "",
      area_util: "",
      area_total: "",
      dormitorios: "0",
      suites: "0",
      banheiros: "0",
      vagas: "0",
      diferenciais_internos: "",
      valor_condominio: "",
      condominio_incluso: "",
      valor_iptu: "",
      taxas_extras: "",
      seguranca: "",
      lazer: "",
      comodidades: "",
      video_url: "",
      descricao: "",
      aceita_financiamento: false,
      aceita_fgts: false,
      aceita_permuta: false,
      disponivel: true,
      destaque: false,
      corretor_id: "",
    };
  });

  useEffect(() => {
    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      const { data } = await supabase
        .from("corretores")
        .select("*")
        .eq("ativo", true)
        .order("nome");
      if (data) setCorretores(data as Corretor[]);
    }
    init();
  }, [router]);

  /* ── Handlers ── */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleMoedaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;
    const formatted = formatarMoeda(e.target.value);
    setForm((prev) => ({ ...prev, [name]: formatted }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleDecimalChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target;
    const formatted = formatarDecimal(e.target.value);
    setForm((prev) => ({ ...prev, [name]: formatted }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleIntChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const onlyDigits = value.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, [name]: onlyDigits }));
  }

  /* ── Validação ── */
  function validate(): boolean {
    const errs: FormErrors = {};

    const titulo = (form.titulo ?? "").trim();
    if (!titulo) errs.titulo = "Título é obrigatório";
    else if (titulo.length > 120) errs.titulo = "Título deve ter no máximo 120 caracteres";

    if (!form.tipo) errs.tipo = "Selecione o tipo do imóvel";
    if (!form.finalidade) errs.finalidade = "Selecione a finalidade";

    const preco = parseMoeda(form.preco);
    if (!form.preco || preco <= 0) errs.preco = "Informe um preço válido";
    else if (preco > 100_000_000) errs.preco = "Preço excede o limite permitido";

    if (!form.bairro?.trim()) errs.bairro = "Bairro é obrigatório";
    if (!form.cidade?.trim()) errs.cidade = "Cidade é obrigatória";
    if (!form.estado) errs.estado = "Selecione o estado";
    // logradouro e numero são opcionais

    const descricao = (form.descricao ?? "").trim();
    if (!descricao) errs.descricao = "Descrição é obrigatória";
    else if (descricao.length > 5000) errs.descricao = "Descrição deve ter no máximo 5000 caracteres";

    if (fotosUrls.length === 0) errs.fotos = "Envie pelo menos uma foto";

    const areaUtil = parseDecimal(form.area_util);
    const areaTotal = parseDecimal(form.area_total);
    if (areaUtil < 0) errs.area_util = "Área não pode ser negativa";
    if (areaTotal < 0) errs.area_total = "Área não pode ser negativa";

    const condVal = parseMoeda(form.valor_condominio);
    const iptuVal = parseMoeda(form.valor_iptu);
    if (condVal < 0) errs.valor_condominio = "Valor não pode ser negativo";
    if (iptuVal < 0) errs.valor_iptu = "Valor não pode ser negativo";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  /* ── Submit ── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErroGeral("");
    setSucesso(false);

    if (!validate()) {
      setErroGeral("Corrija os campos destacados antes de salvar.");
      return;
    }

    setLoading(true);

    const payload = {
      titulo: (form.titulo ?? "").trim(),
      tipo: form.tipo,
      finalidade: form.finalidade,
      preco: parseMoeda(form.preco),
      bairro: (form.bairro ?? "").trim(),
      cidade: (form.cidade ?? "").trim(),
      estado: form.estado,
      logradouro: (form.logradouro ?? "").trim(),
      numero: (form.numero ?? "").trim(),
      proximidades: (form.proximidades ?? "").trim(),
      codigo_referencia: (form.codigo_referencia ?? "").trim(),
      area_util: parseDecimal(form.area_util),
      area_total: parseDecimal(form.area_total),
      dormitorios: parseInt(form.dormitorios, 10) || 0,
      suites: parseInt(form.suites, 10) || 0,
      banheiros: parseInt(form.banheiros, 10) || 0,
      vagas: parseInt(form.vagas, 10) || 0,
      diferenciais_internos: (form.diferenciais_internos ?? "").trim(),
      valor_condominio: parseMoeda(form.valor_condominio),
      condominio_incluso: (form.condominio_incluso ?? "").trim(),
      valor_iptu: parseMoeda(form.valor_iptu),
      taxas_extras: (form.taxas_extras ?? "").trim(),
      seguranca: (form.seguranca ?? "").trim(),
      lazer: (form.lazer ?? "").trim(),
      comodidades: (form.comodidades ?? "").trim(),
      video_url: (form.video_url ?? "").trim(),
      descricao: (form.descricao ?? "").trim(),
      aceita_financiamento: form.aceita_financiamento,
      aceita_fgts: form.aceita_fgts,
      aceita_permuta: form.aceita_permuta,
      disponivel: form.disponivel,
      destaque: form.destaque,
      corretor_id: form.corretor_id || null,
      fotos: fotosUrls,
    };

    let error;

    if (isEdicao) {
      ({ error } = await supabase
        .from("imoveis")
        .update(payload)
        .eq("id", imovel!.id));
    } else {
      ({ error } = await supabase.from("imoveis").insert([payload]));
    }

    if (error) {
      void error.message;
      setErroGeral(
        isEdicao
          ? "Não foi possível atualizar o imóvel. Verifique os dados e tente novamente."
          : "Não foi possível cadastrar o imóvel. Verifique os dados e tente novamente."
      );
      setLoading(false);
      return;
    }

    setSucesso(true);
    setTimeout(() => router.push("/admin"), 1500);
  }

  /* ── Estilo helpers ── */
  const inputBase =
    "w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none transition-colors bg-white";

  function cx(field: string) {
    return `${inputBase} ${errors[field] ? "border-red-400 bg-red-50" : "border-areia-300"}`;
  }

  function fieldError(field: string) {
    return errors[field] ? (
      <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
    ) : null;
  }

  const sectionTitle = (title: string, subtitle?: string) => (
    <div className="mb-5 border-b border-areia-200 pb-3">
      <h2 className="font-heading text-lg font-bold text-verde">{title}</h2>
      {subtitle && <p className="text-xs text-cinza-300 mt-0.5">{subtitle}</p>}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-verde hover:text-verde/80 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </Link>
        <h1 className="font-heading text-3xl font-bold text-verde">
          {isEdicao ? "Editar Imóvel" : "Novo Imóvel"}
        </h1>
      </div>

      {erroGeral && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
          {erroGeral}
        </div>
      )}

      {sucesso && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 text-sm">
          {isEdicao ? "Imóvel atualizado" : "Imóvel cadastrado"} com sucesso! Redirecionando...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>

        {/* ═══ SEÇÃO 1 – Informações Básicas (O Gancho) ═══ */}
        <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6 sm:p-8">
          {sectionTitle("Informações Básicas", "O gancho — título e localização que atraem o cliente")}
          <div className="space-y-4">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-cinza-500 mb-1">
                Título chamativo <span className="text-red-500">*</span>
              </label>
              <input
                id="titulo"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                placeholder="Ex: Cobertura Duplex com Vista para o Mar — 4 suítes"
                className={cx("titulo")}
              />
              {fieldError("titulo")}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-cinza-500 mb-1">
                  Tipo <span className="text-red-500">*</span>
                </label>
                <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange} className={cx("tipo")}>
                  <option value="">Selecione</option>
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Terreno">Terreno</option>
                  <option value="Cobertura">Cobertura</option>
                  <option value="Sala Comercial">Sala Comercial</option>
                </select>
                {fieldError("tipo")}
              </div>
              <div>
                <label htmlFor="finalidade" className="block text-sm font-medium text-cinza-500 mb-1">
                  Finalidade <span className="text-red-500">*</span>
                </label>
                <select id="finalidade" name="finalidade" value={form.finalidade} onChange={handleChange} className={cx("finalidade")}>
                  <option value="">Selecione</option>
                  <option value="Venda">Venda</option>
                  <option value="Locação">Locação</option>
                  <option value="Temporada">Temporada</option>
                </select>
                {fieldError("finalidade")}
              </div>
              <div>
                <label htmlFor="preco" className="block text-sm font-medium text-cinza-500 mb-1">
                  Preço <span className="text-red-500">*</span>
                </label>
                <input
                  id="preco"
                  name="preco"
                  inputMode="numeric"
                  value={form.preco}
                  onChange={handleMoedaChange}
                  placeholder="R$ 0,00"
                  className={cx("preco")}
                />
                {fieldError("preco")}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="logradouro" className="block text-sm font-medium text-cinza-500 mb-1">
                  Logradouro <span className="text-red-500">*</span>
                </label>
                <input
                  id="logradouro"
                  name="logradouro"
                  value={form.logradouro}
                  onChange={handleChange}
                  placeholder="Rua, Avenida, Travessa..."
                  className={cx("logradouro")}
                />
                {fieldError("logradouro")}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="numero" className="block text-sm font-medium text-cinza-500 mb-1">
                    Número <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="numero"
                    name="numero"
                    value={form.numero}
                    onChange={handleChange}
                    placeholder="123"
                    className={cx("numero")}
                  />
                  {fieldError("numero")}
                </div>
                <div>
                  <label htmlFor="codigo_referencia" className="block text-sm font-medium text-cinza-500 mb-1">
                    Cód. Referência
                  </label>
                  <input
                    id="codigo_referencia"
                    name="codigo_referencia"
                    value={form.codigo_referencia}
                    onChange={handleChange}
                    placeholder="LIB-001"
                    className={inputBase + " border-areia-300"}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="bairro" className="block text-sm font-medium text-cinza-500 mb-1">
                  Bairro <span className="text-red-500">*</span>
                </label>
                <input id="bairro" name="bairro" value={form.bairro} onChange={handleChange} placeholder="Ex: Centro" className={cx("bairro")} />
                {fieldError("bairro")}
              </div>
              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-cinza-500 mb-1">
                  Cidade <span className="text-red-500">*</span>
                </label>
                <input id="cidade" name="cidade" value={form.cidade} onChange={handleChange} className={cx("cidade")} />
                {fieldError("cidade")}
              </div>
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-cinza-500 mb-1">
                  Estado <span className="text-red-500">*</span>
                </label>
                <select id="estado" name="estado" value={form.estado} onChange={handleChange} className={cx("estado")}>
                  <option value="">UF</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
                {fieldError("estado")}
              </div>
            </div>

            <div>
              <label htmlFor="proximidades" className="block text-sm font-medium text-cinza-500 mb-1">
                Proximidades
              </label>
              <textarea
                id="proximidades"
                name="proximidades"
                rows={2}
                value={form.proximidades}
                onChange={handleChange}
                placeholder="Próximo a escolas, supermercados, 5 min do metrô..."
                className={inputBase + " border-areia-300 resize-y"}
              />
            </div>

            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="destaque" checked={form.destaque} onChange={handleChange} className="w-4 h-4 rounded border-areia-300 text-verde accent-verde focus:ring-verde-light" />
                <span className="text-sm text-cinza-600">Destaque na home</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="disponivel" checked={form.disponivel} onChange={handleChange} className="w-4 h-4 rounded border-areia-300 text-verde accent-verde focus:ring-verde-light" />
                <span className="text-sm text-cinza-600">Disponível</span>
              </label>
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO 2 – Características Físicas (O Corpo) ═══ */}
        <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6 sm:p-8">
          {sectionTitle("Características Físicas", "O corpo — números e diferenciais que vendem")}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="area_util" className="block text-sm font-medium text-cinza-500 mb-1">Área útil (m²)</label>
                <input id="area_util" name="area_util" inputMode="decimal" value={form.area_util} onChange={handleDecimalChange} placeholder="85,00" className={inputBase + " border-areia-300"} />
              </div>
              <div>
                <label htmlFor="area_total" className="block text-sm font-medium text-cinza-500 mb-1">Área total (m²)</label>
                <input id="area_total" name="area_total" inputMode="decimal" value={form.area_total} onChange={handleDecimalChange} placeholder="120,00" className={inputBase + " border-areia-300"} />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label htmlFor="dormitorios" className="block text-sm font-medium text-cinza-500 mb-1">Dormitórios</label>
                <input id="dormitorios" name="dormitorios" inputMode="numeric" value={form.dormitorios} onChange={handleIntChange} className={inputBase + " border-areia-300"} />
              </div>
              <div>
                <label htmlFor="suites" className="block text-sm font-medium text-cinza-500 mb-1">Suítes</label>
                <input id="suites" name="suites" inputMode="numeric" value={form.suites} onChange={handleIntChange} className={inputBase + " border-areia-300"} />
              </div>
              <div>
                <label htmlFor="banheiros" className="block text-sm font-medium text-cinza-500 mb-1">Banheiros</label>
                <input id="banheiros" name="banheiros" inputMode="numeric" value={form.banheiros} onChange={handleIntChange} className={inputBase + " border-areia-300"} />
              </div>
              <div>
                <label htmlFor="vagas" className="block text-sm font-medium text-cinza-500 mb-1">Vagas</label>
                <input id="vagas" name="vagas" inputMode="numeric" value={form.vagas} onChange={handleIntChange} className={inputBase + " border-areia-300"} />
              </div>
            </div>

            <div>
              <label htmlFor="diferenciais_internos" className="block text-sm font-medium text-cinza-500 mb-1">
                Diferenciais internos
              </label>
              <textarea
                id="diferenciais_internos"
                name="diferenciais_internos"
                rows={3}
                value={form.diferenciais_internos}
                onChange={handleChange}
                placeholder="Sacada gourmet, churrasqueira, móveis planejados, ar-condicionado split, piso porcelanato, sol da manhã..."
                className={inputBase + " border-areia-300 resize-y"}
              />
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO 3 – Custos Fixos (Transparência) ═══ */}
        <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6 sm:p-8">
          {sectionTitle("Custos Fixos", "Transparência — valores que o cliente precisa saber")}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="valor_condominio" className="block text-sm font-medium text-cinza-500 mb-1">Valor do condomínio</label>
                <input id="valor_condominio" name="valor_condominio" inputMode="numeric" value={form.valor_condominio} onChange={handleMoedaChange} placeholder="R$ 0,00" className={inputBase + " border-areia-300"} />
              </div>
              <div>
                <label htmlFor="condominio_incluso" className="block text-sm font-medium text-cinza-500 mb-1">O que inclui</label>
                <input id="condominio_incluso" name="condominio_incluso" value={form.condominio_incluso} onChange={handleChange} placeholder="Água, gás, seguro incêndio..." className={inputBase + " border-areia-300"} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="valor_iptu" className="block text-sm font-medium text-cinza-500 mb-1">IPTU (anual)</label>
                <input id="valor_iptu" name="valor_iptu" inputMode="numeric" value={form.valor_iptu} onChange={handleMoedaChange} placeholder="R$ 0,00" className={inputBase + " border-areia-300"} />
              </div>
              <div>
                <label htmlFor="taxas_extras" className="block text-sm font-medium text-cinza-500 mb-1">Taxas extras</label>
                <input id="taxas_extras" name="taxas_extras" value={form.taxas_extras} onChange={handleChange} placeholder="Taxa de limpeza, fundo de reserva..." className={inputBase + " border-areia-300"} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO 4 – Estrutura do Condomínio e Lazer ═══ */}
        <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6 sm:p-8">
          {sectionTitle("Estrutura do Condomínio e Lazer")}
          <div className="space-y-4">
            <div>
              <label htmlFor="seguranca" className="block text-sm font-medium text-cinza-500 mb-1">Segurança</label>
              <textarea id="seguranca" name="seguranca" rows={2} value={form.seguranca} onChange={handleChange} placeholder="Portaria 24h, câmeras de monitoramento, cerca elétrica..." className={inputBase + " border-areia-300 resize-y"} />
            </div>
            <div>
              <label htmlFor="lazer" className="block text-sm font-medium text-cinza-500 mb-1">Lazer</label>
              <textarea id="lazer" name="lazer" rows={2} value={form.lazer} onChange={handleChange} placeholder="Piscina, academia, salão de festas, playground, quadra poliesportiva..." className={inputBase + " border-areia-300 resize-y"} />
            </div>
            <div>
              <label htmlFor="comodidades" className="block text-sm font-medium text-cinza-500 mb-1">Comodidades</label>
              <textarea id="comodidades" name="comodidades" rows={2} value={form.comodidades} onChange={handleChange} placeholder="Elevador, gerador, acessibilidade PCD, bicicletário..." className={inputBase + " border-areia-300 resize-y"} />
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO 5 – Conteúdo Visual e Descritivo ═══ */}
        <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6 sm:p-8">
          {sectionTitle("Conteúdo Visual e Descritivo", "Imagens, vídeo e texto que convencem")}
          <div className="space-y-5">
            <UploadImagens urls={fotosUrls} onUrlsChange={setFotosUrls} />
            {fieldError("fotos")}

            <div>
              <label htmlFor="video_url" className="block text-sm font-medium text-cinza-500 mb-1">URL de vídeo ou tour virtual</label>
              <input id="video_url" name="video_url" value={form.video_url} onChange={handleChange} placeholder="https://youtube.com/watch?v=... ou link do Matterport" className={inputBase + " border-areia-300"} />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-cinza-500 mb-1">
                Descrição detalhada <span className="text-red-500">*</span>
              </label>
              <textarea
                id="descricao"
                name="descricao"
                rows={7}
                value={form.descricao}
                onChange={handleChange}
                placeholder={"Escreva um texto humanizado, não apenas uma lista técnica.\n\nExemplo:\nImagine acordar com vista para o mar todos os dias. Esta cobertura duplex no coração da cidade oferece 4 suítes espaçosas, sala com pé-direito duplo e uma varanda gourmet perfeita para receber amigos.\n\nLocalizada a poucos passos da praia e do melhor da gastronomia local, combina conforto, sofisticação e praticidade."}
                className={cx("descricao") + " resize-y min-h-[180px]"}
              />
              {fieldError("descricao")}
            </div>
          </div>
        </section>

        {/* ═══ SEÇÃO 6 – Documentação e Status ═══ */}
        <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6 sm:p-8">
          {sectionTitle("Documentação e Status")}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="aceita_financiamento" checked={form.aceita_financiamento} onChange={handleChange} className="w-4 h-4 rounded border-areia-300 text-verde accent-verde focus:ring-verde-light" />
              <span className="text-sm text-cinza-600">Aceita financiamento</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="aceita_fgts" checked={form.aceita_fgts} onChange={handleChange} className="w-4 h-4 rounded border-areia-300 text-verde accent-verde focus:ring-verde-light" />
              <span className="text-sm text-cinza-600">Aceita FGTS</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="aceita_permuta" checked={form.aceita_permuta} onChange={handleChange} className="w-4 h-4 rounded border-areia-300 text-verde accent-verde focus:ring-verde-light" />
              <span className="text-sm text-cinza-600">Aceita permuta</span>
            </label>
          </div>
        </section>

        {/* ═══ SEÇÃO 7 – Corretor Responsável ═══ */}
        <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6 sm:p-8">
          {sectionTitle("Corretor Responsável", "Selecione o corretor que aparecerá na página do imóvel")}
          <div>
            <label htmlFor="corretor_id" className="block text-sm font-medium text-cinza-500 mb-1">Corretor</label>
            <select id="corretor_id" name="corretor_id" value={form.corretor_id} onChange={handleChange} className={inputBase + " border-areia-300"}>
              <option value="">Nenhum (sem corretor vinculado)</option>
              {corretores.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} — CRECI {c.creci}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* ═══ Ações ═══ */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <Link
            href="/admin"
            className="px-6 py-2.5 text-sm font-medium text-cinza-600 bg-areia-200 hover:bg-areia-300 rounded-lg transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 text-sm font-semibold text-white bg-verde hover:bg-verde/80 disabled:bg-verde/40 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            {loading
              ? isEdicao
                ? "Salvando..."
                : "Cadastrando..."
              : isEdicao
              ? "Salvar Alterações"
              : "Cadastrar Imóvel"}
          </button>
        </div>
      </form>
    </div>
  );
}
