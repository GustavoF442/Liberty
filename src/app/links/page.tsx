"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Corretor } from "@/types/Imovel";

export default function LinktreePage() {
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("corretores")
        .select("*")
        .eq("ativo", true)
        .order("nome");

      if (data) {
        const list = data as Corretor[];
        const victorIndex = list.findIndex((c) => c.nome.toLowerCase().includes("victor hugo"));
        if (victorIndex > 0) {
          const [victor] = list.splice(victorIndex, 1);
          list.unshift(victor);
        }
        setCorretores(list);
      }
      setLoading(false);
    }
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-verde flex flex-col items-center -mt-20 lg:-mt-[100px]">
      {/* Header */}
      <div className="w-full bg-verde pt-28 pb-10 px-4 text-center">
        <Image
          src="/images/logo/liberty-logo.png"
          alt="Liberty Imóveis"
          width={180}
          height={56}
          className="h-12 w-auto object-contain mx-auto mb-2"
          priority
        />
        <p className="text-areia-300/60 text-xs tracking-[0.2em] uppercase mt-3">
          Imobiliária
        </p>
      </div>

      {/* Conteúdo */}
      <div className="w-full max-w-sm px-5 pb-16 space-y-3">
        {/* Site */}
        <a
          href="https://libertyimoveis.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3.5 rounded-full bg-terracota text-white font-semibold text-sm tracking-wide hover:bg-terracota-500 transition-colors shadow-md"
        >
          Nosso Site
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/5548998604988"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3.5 rounded-full bg-transparent border border-areia-300/40 text-areia-200 font-medium text-sm tracking-wide hover:bg-white/10 transition-colors"
        >
          WhatsApp — (48) 99860-4988
        </a>

        {/* Imóveis */}
        <a
          href="https://libertyimoveis.com.br/imoveis"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3.5 rounded-full bg-transparent border border-areia-300/40 text-areia-200 font-medium text-sm tracking-wide hover:bg-white/10 transition-colors"
        >
          Ver Imóveis
        </a>

        {/* Separador */}
        {!loading && corretores.length > 0 && (
          <>
            <div className="pt-6 pb-2">
              <p className="text-center text-[11px] text-areia-400/50 tracking-[0.25em] uppercase font-medium">
                Nossa Equipe
              </p>
            </div>

            {corretores.map((c) => {
              const phone = (c.telefone ?? "").replace(/\D/g, "");
              const igHandle = c.instagram?.replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "") || "";

              return (
                <div key={c.id} className="rounded-2xl bg-white/[0.07] backdrop-blur-sm border border-white/10 p-5">
                  {/* Corretor info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-areia-200/20 flex-shrink-0 ring-2 ring-terracota/40 ring-offset-2 ring-offset-verde">
                      {c.foto ? (
                        <img
                          src={c.foto}
                          alt={c.nome}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: c.foto_posicao || "center top" }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-areia-200/50 text-lg font-bold">
                          {c.nome.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-[15px] leading-tight">{c.nome}</h3>
                      <p className="text-areia-300/50 text-xs mt-0.5">
                        Corretor de Imóveis{c.especialidade ? ` · ${c.especialidade}` : ""}
                      </p>
                      <p className="text-areia-400/40 text-[11px] mt-0.5">CRECI {c.creci}</p>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    {phone && (
                      <a
                        href={`https://wa.me/${phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors text-xs font-semibold"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </a>
                    )}
                    {phone && (
                      <a
                        href={`tel:+${phone}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-areia-200 hover:bg-white/15 transition-colors text-xs font-semibold"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Ligar
                      </a>
                    )}
                    {igHandle && (
                      <a
                        href={`https://instagram.com/${igHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-pink-300 hover:from-purple-500/30 hover:to-pink-500/30 transition-colors text-xs font-semibold"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        Insta
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-areia-200" />
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="pb-8">
        <p className="text-areia-400/30 text-[10px] tracking-widest uppercase text-center">
          Liberty Imóveis LTDA
        </p>
      </div>
    </div>
  );
}
