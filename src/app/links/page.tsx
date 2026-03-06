"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Corretor } from "@/types/Imovel";

const WHATSAPP_SVG = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
);
const INSTAGRAM_SVG = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
);

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
    <div className="min-h-screen bg-areia flex flex-col items-center">
      {/* ── Header ── */}
      <div className="w-full bg-verde pt-16 pb-12 flex flex-col items-center">
        <Image
          src="/images/logo/liberty-logo.png"
          alt="Liberty Imóveis"
          width={180}
          height={56}
          className="h-14 w-auto object-contain mb-3"
          priority
        />
        <p className="text-areia-300/60 text-[11px] tracking-[0.2em] uppercase">
          Imobiliária
        </p>

        {/* Ícones sociais globais */}
        <div className="flex items-center gap-4 mt-5">
          <a href="https://wa.me/5548998604988" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white/80 hover:bg-white/25 hover:text-white transition-all">
            {WHATSAPP_SVG}
          </a>
          <a href="https://instagram.com/libertyimoveis" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white/80 hover:bg-white/25 hover:text-white transition-all">
            {INSTAGRAM_SVG}
          </a>
        </div>
      </div>

      {/* ── Conteúdo ── */}
      <div className="w-full max-w-md px-5 -mt-6 pb-12">
        {/* Botões principais */}
        <div className="space-y-3 mb-10">
          <a
            href="https://libertyimoveis.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-4 rounded-2xl bg-verde text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Nosso Site
          </a>
          <a
            href="https://libertyimoveis.com.br/imoveis"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-4 rounded-2xl bg-terracota text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Ver Imóveis
          </a>
        </div>

        {/* Corretores */}
        {!loading && corretores.length > 0 && (
          <>
            <p className="text-center text-[11px] text-cinza-400 tracking-[0.2em] uppercase font-semibold mb-5">
              Nossa Equipe
            </p>

            <div className="grid grid-cols-2 gap-3">
              {corretores.slice(0, 4).map((c) => {
                const phone = (c.telefone ?? "").replace(/\D/g, "");
                const igHandle = c.instagram?.replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "") || "";

                return (
                  <div key={c.id} className="bg-white rounded-2xl shadow-md border border-areia-200 p-4 flex flex-col items-center text-center">
                    {/* Foto */}
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-areia-200 border-2 border-verde/20 mb-3">
                      {c.foto ? (
                        <img
                          src={c.foto}
                          alt={c.nome}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: c.foto_posicao || "center top" }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-verde/30 text-xl font-bold">
                          {c.nome.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Nome */}
                    <h3 className="text-verde font-bold text-sm leading-tight mb-0.5">{c.nome}</h3>
                    <p className="text-cinza-400 text-[10px] mb-3">CRECI {c.creci}</p>

                    {/* Ícones de ação */}
                    <div className="flex items-center gap-2">
                      {phone && (
                        <a
                          href={`https://wa.me/${phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-sm"
                          title="WhatsApp"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        </a>
                      )}
                      {igHandle && (
                        <a
                          href={`https://instagram.com/${igHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm"
                          title={`@${igHandle}`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-verde" />
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="mt-auto pb-6">
        <p className="text-cinza-300 text-[10px] tracking-widest uppercase text-center">
          Liberty Imóveis LTDA
        </p>
      </div>
    </div>
  );
}
