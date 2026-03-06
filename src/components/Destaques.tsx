"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Imovel } from "@/types/Imovel";
import ImovelCard from "@/components/ImovelCard";

export default function Destaques() {
  const [destaques, setDestaques] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestaques() {
      const { data, error } = await supabase
        .from("imoveis")
        .select("*")
        .eq("disponivel", true)
        .eq("destaque", true)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        void error.message;
        setLoading(false);
        return;
      }

      setDestaques((data as Imovel[]) || []);
      setLoading(false);
    }

    fetchDestaques();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-areia-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde mx-auto" />
        </div>
      </section>
    );
  }

  if (destaques.length === 0) return null;

  return (
    <section className="py-20 bg-areia-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-verde">
            Imóveis em destaque
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destaques.map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/imoveis"
            className="inline-block border-2 border-verde text-verde hover:bg-verde hover:text-white font-semibold text-sm px-8 py-3 transition-all duration-300 tracking-wide"
          >
            Ver todos os imóveis
          </Link>
        </div>
      </div>
    </section>
  );
}
