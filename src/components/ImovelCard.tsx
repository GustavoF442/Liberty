"use client";

import { useState } from "react";
import Link from "next/link";
import { Imovel } from "@/types/Imovel";

interface ImovelCardProps {
  imovel: Imovel;
}

const formatPreco = (valor: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

export default function ImovelCard({ imovel }: ImovelCardProps) {
  const foto = imovel.fotos && imovel.fotos.length > 0 ? imovel.fotos[0] : null;
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <Link href={`/imovel/${imovel.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-areia-200 h-full flex flex-col">
        {/* Imagem com aspect ratio 4:3 */}
        <div className="relative aspect-[4/3] w-full bg-areia-100 overflow-hidden">
          {foto && !imgFailed ? (
            <img
              src={foto}
              alt={imovel.titulo}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-areia-300">
              <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges superiores */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {imovel.destaque && (
              <span className="bg-terracota text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                Destaque
              </span>
            )}
            {!imovel.disponivel && (
              <span className="bg-red-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                Indisponível
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            {imovel.finalidade && (
              <span className="bg-verde/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                {imovel.finalidade}
              </span>
            )}
          </div>

          {/* Preço sobre a imagem */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-verde/95 backdrop-blur-sm text-white text-lg font-bold px-3 py-1 rounded-lg shadow-md">
              {formatPreco(imovel.preco)}
            </span>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-heading text-base font-semibold text-cinza-700 line-clamp-1">
              {imovel.titulo}
            </h3>
            <span className="text-[11px] font-medium text-verde bg-verde/10 px-2 py-0.5 rounded-full flex-shrink-0">
              {imovel.tipo}
            </span>
          </div>

          <p className="text-xs text-cinza-400 mb-3">
            {[imovel.bairro, imovel.cidade].filter(Boolean).join(" — ")}
          </p>

          {/* Características */}
          <div className="mt-auto flex items-center gap-3 text-xs text-cinza-500 border-t border-areia-100 pt-3">
            {imovel.dormitorios > 0 && (
              <span className="inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                </svg>
                {imovel.dormitorios} {imovel.dormitorios === 1 ? "quarto" : "quartos"}
              </span>
            )}
            {imovel.banheiros > 0 && (
              <span className="inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 16h16M4 16V8a4 4 0 014-4h1" />
                </svg>
                {imovel.banheiros}
              </span>
            )}
            {imovel.vagas > 0 && (
              <span className="inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10" />
                </svg>
                {imovel.vagas}
              </span>
            )}
            {imovel.area_total > 0 && (
              <span className="inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
                {imovel.area_total} m²
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
