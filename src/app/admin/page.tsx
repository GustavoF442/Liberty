"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Imovel } from "@/types/Imovel";

const formatPreco = (valor: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

export default function AdminDashboardPage() {
  const router = useRouter();
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [erroGeral, setErroGeral] = useState("");

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      fetchImoveis();
    }

    checkAuth();
  }, [router]);

  async function fetchImoveis() {
    const { data, error } = await supabase
      .from("imoveis")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      void error.message;
      setErroGeral("Não foi possível carregar os imóveis. Tente novamente.");
    }

    setImoveis((data as Imovel[]) || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este imóvel?")) return;

    const { error } = await supabase.from("imoveis").delete().eq("id", id);

    if (error) {
      void error.message;
      setErroGeral("Não foi possível excluir o imóvel. Tente novamente.");
      return;
    }

    setImoveis((prev) => prev.filter((i) => i.id !== id));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
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
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-verde">Painel Administrativo</h1>
          <p className="text-cinza-400 mt-1">
            {imoveis.length} imóve{imoveis.length !== 1 ? "is" : "l"} cadastrado
            {imoveis.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/admin/corretores"
            className="inline-flex items-center gap-2 bg-terracota hover:bg-terracota-500 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Corretores
          </Link>
          <Link
            href="/admin/novo"
            className="inline-flex items-center gap-2 bg-verde hover:bg-verde/80 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Imóvel
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-areia-200 hover:bg-areia-300 text-cinza-600 font-medium py-2.5 px-5 rounded-lg transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      {erroGeral && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
          {erroGeral}
        </div>
      )}

      {imoveis.length === 0 ? (
        <div className="text-center py-20 bg-areia-50 rounded-2xl shadow-md border border-areia-200">
          <p className="text-cinza-400 text-lg">Nenhum imóvel cadastrado.</p>
          <Link
            href="/admin/novo"
            className="text-verde hover:underline mt-2 inline-block"
          >
            Cadastrar primeiro imóvel
          </Link>
        </div>
      ) : (
        <div className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-verde/5 border-b border-areia-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Imóvel</th>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Cód.</th>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Tipo</th>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Finalidade</th>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Bairro</th>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Preço</th>
                  <th className="text-left py-3 px-4 font-semibold text-cinza-500">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-cinza-500">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-areia-200">
                {imoveis.map((imovel) => (
                  <tr key={imovel.id} className="hover:bg-areia-100 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-areia-200 overflow-hidden flex-shrink-0">
                          {imovel.fotos && imovel.fotos.length > 0 ? (
                            <img
                              src={imovel.fotos[0]}
                              alt={imovel.titulo}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                                (e.target as HTMLImageElement).parentElement!.innerHTML =
                                  '<div class="w-full h-full flex items-center justify-center text-areia-400"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg></div>';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-areia-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="font-medium text-cinza-700 truncate block max-w-[200px]">
                            {imovel.titulo}
                          </span>
                          <div className="flex items-center gap-2">
                            {imovel.destaque && (
                              <span className="text-xs text-terracota font-medium">Destaque</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-cinza-400 font-mono">
                        {imovel.codigo_referencia || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-cinza-500">{imovel.tipo}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-cinza-500">{imovel.finalidade || "—"}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-cinza-500">{imovel.bairro}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-verde">
                        {formatPreco(imovel.preco)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          imovel.disponivel
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {imovel.disponivel ? "Disponível" : "Indisponível"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/editar/${imovel.id}`}
                          className="text-verde hover:text-verde/80 font-medium text-sm"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(imovel.id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
