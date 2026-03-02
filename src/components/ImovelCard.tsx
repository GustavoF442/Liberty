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
    <Link href={`/imovel/${imovel.id}`} className="group">
      <div className="bg-areia-50 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-areia-200">
        <div className="relative h-56 w-full bg-areia-200">
          {foto && !imgFailed ? (
            <img
              src={foto}
              alt={imovel.titulo}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-areia-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </div>
          )}

          {/* Badges superiores */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {imovel.destaque && (
              <span className="bg-terracota text-white text-xs font-bold px-3 py-1 rounded-full">
                Destaque
              </span>
            )}
            {!imovel.disponivel && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Indisponível
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            <span className="bg-verde text-white text-xs font-semibold px-3 py-1 rounded-full">
              {imovel.tipo}
            </span>
            {imovel.finalidade && (
              <span className="bg-verde/70 text-white text-xs font-medium px-3 py-1 rounded-full">
                {imovel.finalidade}
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-heading text-lg font-semibold text-cinza-700 truncate">
            {imovel.titulo}
          </h3>
          <p className="text-sm text-cinza-400 mt-1">
            {imovel.bairro} — {imovel.cidade}
          </p>

          {/* Características com ícones */}
          <div className="flex items-center gap-4 mt-3 text-sm text-cinza-500">
            {imovel.dormitorios > 0 && (
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                </svg>
                {imovel.dormitorios}
              </span>
            )}
            {imovel.banheiros > 0 && (
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 16h16M4 16V8a4 4 0 014-4h1" />
                </svg>
                {imovel.banheiros}
              </span>
            )}
            {imovel.vagas > 0 && (
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10" />
                </svg>
                {imovel.vagas}
              </span>
            )}
            {imovel.area_total > 0 && (
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
                {imovel.area_total} m²
              </span>
            )}
          </div>

          <p className="mt-4 text-xl font-bold text-verde">
            {formatPreco(imovel.preco)}
          </p>
        </div>
      </div>
    </Link>
  );
}
