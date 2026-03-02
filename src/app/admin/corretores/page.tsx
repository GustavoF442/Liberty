"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Corretor } from "@/types/Imovel";

/* ══════════════════════════════════════
   Helpers
   ══════════════════════════════════════ */
function formatarTelefone(valor: string): string {
  const nums = valor.replace(/\D/g, "").slice(0, 11);
  if (nums.length <= 2) return nums;
  if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
  return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
}

/* ══════════════════════════════════════
   Form state
   ══════════════════════════════════════ */
interface FormState {
  nome: string;
  creci: string;
  telefone: string;
  email: string;
  especialidade: string;
  descricao_publica: string;
  observacoes_internas: string;
  ativo: boolean;
}

const emptyForm: FormState = {
  nome: "",
  creci: "",
  telefone: "",
  email: "",
  especialidade: "",
  descricao_publica: "",
  observacoes_internas: "",
  ativo: true,
};

/* ══════════════════════════════════════
   Component
   ══════════════════════════════════════ */
export default function AdminCorretoresPage() {
  const router = useRouter();
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [loading, setLoading] = useState(true);
  const [erroGeral, setErroGeral] = useState("");
  const [sucesso, setSucesso] = useState("");

  /* ── Modal / Formulário ── */
  const [modalOpen, setModalOpen] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  /* ── Upload foto ── */
  const [fotoUrl, setFotoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Auth + fetch ── */
  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }
      fetchCorretores();
    }
    init();
  }, [router]);

  async function fetchCorretores() {
    const { data, error } = await supabase
      .from("corretores")
      .select("*")
      .order("nome");

    if (error) {
      console.error("Erro ao buscar corretores:", error.message);
      setErroGeral("Não foi possível carregar os corretores.");
    }
    setCorretores((data as Corretor[]) || []);
    setLoading(false);
  }

  /* ── Handlers ── */
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === "telefone") {
      setForm((prev) => ({ ...prev, telefone: formatarTelefone(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!form.nome?.trim()) errs.nome = "Nome é obrigatório";
    if (!form.creci?.trim()) errs.creci = "CRECI é obrigatório";
    if (!form.telefone?.trim() || form.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone válido é obrigatório";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }

  /* ── Upload foto ── */
  async function handleFotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `corretores/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("fotos-imoveis")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Erro upload:", uploadError.message);
      setErroGeral("Falha ao enviar a foto. Tente novamente.");
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("fotos-imoveis")
      .getPublicUrl(fileName);

    if (publicUrlData?.publicUrl) {
      setFotoUrl(publicUrlData.publicUrl);
    }
    setUploading(false);
    if (e.target) e.target.value = "";
  }

  /* ── Open modal ── */
  function openNew() {
    setEditandoId(null);
    setForm(emptyForm);
    setFotoUrl("");
    setFormErrors({});
    setModalOpen(true);
  }

  function openEdit(c: Corretor) {
    setEditandoId(c.id);
    setForm({
      nome: c.nome || "",
      creci: c.creci || "",
      telefone: c.telefone || "",
      email: c.email || "",
      especialidade: c.especialidade || "",
      descricao_publica: c.descricao_publica || "",
      observacoes_internas: c.observacoes_internas || "",
      ativo: c.ativo ?? true,
    });
    setFotoUrl(c.foto || "");
    setFormErrors({});
    setModalOpen(true);
  }

  /* ── Save ── */
  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    setErroGeral("");

    const payload = {
      nome: (form.nome ?? "").trim(),
      creci: (form.creci ?? "").trim(),
      telefone: (form.telefone ?? "").trim(),
      email: (form.email ?? "").trim() || null,
      especialidade: (form.especialidade ?? "").trim() || null,
      descricao_publica: (form.descricao_publica ?? "").trim() || null,
      observacoes_internas: (form.observacoes_internas ?? "").trim() || null,
      ativo: form.ativo,
      foto: fotoUrl || null,
    };

    let error;

    if (editandoId) {
      ({ error } = await supabase.from("corretores").update(payload).eq("id", editandoId));
    } else {
      ({ error } = await supabase.from("corretores").insert([payload]));
    }

    if (error) {
      console.error("Erro Supabase:", error.message);
      setErroGeral(editandoId ? "Erro ao atualizar corretor." : "Erro ao cadastrar corretor.");
      setSaving(false);
      return;
    }

    setSucesso(editandoId ? "Corretor atualizado!" : "Corretor cadastrado!");
    setModalOpen(false);
    setSaving(false);
    fetchCorretores();
    setTimeout(() => setSucesso(""), 3000);
  }

  /* ── Delete ── */
  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este corretor?")) return;
    const { error } = await supabase.from("corretores").delete().eq("id", id);
    if (error) {
      setErroGeral("Erro ao excluir corretor.");
      return;
    }
    setCorretores((prev) => prev.filter((c) => c.id !== id));
    setSucesso("Corretor excluído!");
    setTimeout(() => setSucesso(""), 3000);
  }

  /* ── Toggle ativo ── */
  async function handleToggleAtivo(c: Corretor) {
    const { error } = await supabase.from("corretores").update({ ativo: !c.ativo }).eq("id", c.id);
    if (error) {
      setErroGeral("Erro ao alterar status.");
      return;
    }
    setCorretores((prev) => prev.map((x) => (x.id === c.id ? { ...x, ativo: !x.ativo } : x)));
  }

  /* ── Styles ── */
  const inputBase = "w-full border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none transition-colors bg-white";
  function cx(field: string) {
    return `${inputBase} ${formErrors[field] ? "border-red-400 bg-red-50" : "border-areia-300"}`;
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/admin" className="text-verde hover:text-verde/80 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <h1 className="font-heading text-3xl font-bold text-verde">Corretores</h1>
          </div>
          <p className="text-cinza-400 ml-8">{corretores.length} corretor{corretores.length !== 1 ? "es" : ""} cadastrado{corretores.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-verde hover:bg-verde/80 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Novo Corretor
        </button>
      </div>

      {erroGeral && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">{erroGeral}</div>
      )}
      {sucesso && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 text-sm">{sucesso}</div>
      )}

      {/* Lista */}
      {corretores.length === 0 ? (
        <div className="text-center py-20 bg-areia-50 rounded-2xl shadow-md border border-areia-200">
          <p className="text-cinza-400 text-lg">Nenhum corretor cadastrado.</p>
          <button onClick={openNew} className="text-verde hover:underline mt-2 inline-block">Cadastrar primeiro corretor</button>
        </div>
      ) : (
        <div className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-verde/5 border-b border-areia-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Corretor</th>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">CRECI</th>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Telefone</th>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Especialidade</th>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-cinza-500">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-areia-200">
                {corretores.map((c) => (
                  <tr key={c.id} className="hover:bg-areia-100 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-areia-200 overflow-hidden flex-shrink-0">
                          {c.foto ? (
                            <img src={c.foto} alt={c.nome} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-verde font-bold text-sm bg-verde/10">
                              {c.nome.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-cinza-700">{c.nome}</span>
                          {c.email && <p className="text-xs text-cinza-400">{c.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-cinza-500">{c.creci}</td>
                    <td className="py-3 px-4 text-cinza-500">{c.telefone}</td>
                    <td className="py-3 px-4 text-cinza-500">{c.especialidade || "—"}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleAtivo(c)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          c.ativo ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {c.ativo ? "Ativo" : "Inativo"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(c)} className="text-verde hover:text-verde/80 font-medium text-sm">Editar</button>
                        <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-800 font-medium text-sm">Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
         Modal de Cadastro / Edição
         ══════════════════════════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-areia-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="font-heading text-xl font-bold text-verde">
                {editandoId ? "Editar Corretor" : "Novo Corretor"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-cinza-400 hover:text-cinza-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Foto */}
              <div>
                <label className="block text-sm font-medium text-cinza-500 mb-2">Foto do corretor</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-areia-200 overflow-hidden flex-shrink-0">
                    {fotoUrl ? (
                      <img src={fotoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-verde/30">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="cursor-pointer inline-flex items-center gap-2 bg-verde text-white px-4 py-2 rounded-lg hover:bg-verde/80 transition-colors text-sm font-medium">
                      {uploading ? "Enviando..." : "Selecionar foto"}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFotoUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    {fotoUrl && (
                      <button onClick={() => setFotoUrl("")} className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium">
                        Remover
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Informações Básicas */}
              <div>
                <h3 className="text-sm font-semibold text-cinza-600 uppercase tracking-wide mb-3">Informações Básicas</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-cinza-500 mb-1">Nome completo <span className="text-red-500">*</span></label>
                    <input id="nome" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do corretor" className={cx("nome")} />
                    {formErrors.nome && <p className="text-xs text-red-500 mt-1">{formErrors.nome}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="creci" className="block text-sm font-medium text-cinza-500 mb-1">CRECI <span className="text-red-500">*</span></label>
                      <input id="creci" name="creci" value={form.creci} onChange={handleChange} placeholder="123456-F" className={cx("creci")} />
                      {formErrors.creci && <p className="text-xs text-red-500 mt-1">{formErrors.creci}</p>}
                    </div>
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-cinza-500 mb-1">Telefone <span className="text-red-500">*</span></label>
                      <input id="telefone" name="telefone" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" className={cx("telefone")} />
                      {formErrors.telefone && <p className="text-xs text-red-500 mt-1">{formErrors.telefone}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-cinza-500 mb-1">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="corretor@email.com" className={inputBase + " border-areia-300"} />
                  </div>
                </div>
              </div>

              {/* Profissional */}
              <div>
                <h3 className="text-sm font-semibold text-cinza-600 uppercase tracking-wide mb-3">Profissional</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="especialidade" className="block text-sm font-medium text-cinza-500 mb-1">Especialidade</label>
                    <input id="especialidade" name="especialidade" value={form.especialidade} onChange={handleChange} placeholder="Ex: Alto Padrão, Imóveis Comerciais, Locação" className={inputBase + " border-areia-300"} />
                  </div>
                  <div>
                    <label htmlFor="descricao_publica" className="block text-sm font-medium text-cinza-500 mb-1">Descrição pública (mini bio)</label>
                    <textarea id="descricao_publica" name="descricao_publica" rows={3} value={form.descricao_publica} onChange={handleChange} placeholder="Breve descrição exibida no site público..." className={inputBase + " border-areia-300 resize-y"} />
                  </div>
                  <div>
                    <label htmlFor="observacoes_internas" className="block text-sm font-medium text-cinza-500 mb-1">
                      Observações internas <span className="text-xs text-cinza-300">(não exibidas no site)</span>
                    </label>
                    <textarea id="observacoes_internas" name="observacoes_internas" rows={2} value={form.observacoes_internas} onChange={handleChange} placeholder="Notas internas sobre o corretor..." className={inputBase + " border-areia-300 resize-y"} />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-sm font-semibold text-cinza-600 uppercase tracking-wide mb-3">Status</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="ativo" checked={form.ativo} onChange={handleChange} className="w-4 h-4 rounded border-areia-300 text-verde accent-verde focus:ring-verde-light" />
                  <span className="text-sm text-cinza-600">Ativo (visível no site público)</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-white border-t border-areia-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-cinza-600 bg-areia-200 hover:bg-areia-300 rounded-lg transition-colors">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 text-sm font-semibold text-white bg-verde hover:bg-verde/80 disabled:bg-verde/40 disabled:cursor-not-allowed rounded-lg transition-colors">
                {saving ? "Salvando..." : editandoId ? "Salvar Alterações" : "Cadastrar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
