"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Corretor } from "@/types/Imovel";

export default function CorretoresPage() {
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCorretores() {
      const { data, error } = await supabase
        .from("corretores")
        .select("*")
        .eq("ativo", true)
        .order("nome");

      if (error) {
        console.error("Erro ao buscar corretores:", error.message);
      }

      setCorretores((data as Corretor[]) || []);
      setLoading(false);
    }

    fetchCorretores();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Título Institucional */}
      <div className="text-center mb-14">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-verde">
          Nossos Corretores
        </h1>
        <p className="mt-4 text-lg text-cinza-400 max-w-2xl mx-auto leading-relaxed">
          Nossa equipe é formada por profissionais certificados e especializados,
          prontos para oferecer o melhor atendimento e encontrar o imóvel perfeito para você.
        </p>
      </div>

      {corretores.length === 0 ? (
        <div className="text-center py-20 bg-areia-50 rounded-2xl shadow-md border border-areia-200">
          <p className="text-cinza-400 text-lg">Nenhum corretor disponível no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {corretores.map((c) => (
            <div
              key={c.id}
              className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              {/* Foto */}
              <div className="relative w-full h-72 bg-areia-200 overflow-hidden">
                {c.foto ? (
                  <img
                    src={c.foto}
                    alt={c.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center");
                      const fallback = document.createElement("div");
                      fallback.className = "text-verde/30";
                      fallback.innerHTML = '<svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>';
                      (e.target as HTMLImageElement).parentElement!.appendChild(fallback);
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-verde/30">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="font-heading text-xl font-bold text-verde">{c.nome}</h3>
                <p className="text-sm text-cinza-400 mt-1">CRECI: {c.creci}</p>

                {c.especialidade && (
                  <span className="inline-block mt-2 bg-terracota/10 text-terracota text-xs font-semibold px-3 py-1 rounded-full">
                    {c.especialidade}
                  </span>
                )}

                {c.descricao_publica && (
                  <p className="text-sm text-cinza-500 mt-3 leading-relaxed line-clamp-3">
                    {c.descricao_publica}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
                  <a
                    href={`https://wa.me/${c.telefone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                  <Link
                    href={`/imoveis?corretor=${c.id}`}
                    className="inline-flex items-center gap-2 bg-verde hover:bg-verde/80 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                    </svg>
                    Ver Imóveis
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
