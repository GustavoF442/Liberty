"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Imovel } from "@/types/Imovel";
import FormularioImovel from "@/components/FormularioImovel";

export default function EditarImovelPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [imovel, setImovel] = useState<Imovel | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("imoveis")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Erro ao buscar imóvel:", error?.message);
        setErro("Imóvel não encontrado.");
        setLoading(false);
        return;
      }

      setImovel(data as Imovel);
      setLoading(false);
    }

    init();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde" />
      </div>
    );
  }

  if (erro || !imovel) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold text-cinza-700">{erro || "Imóvel não encontrado"}</h1>
        <button
          onClick={() => router.push("/admin")}
          className="text-verde hover:underline mt-4 inline-block"
        >
          Voltar ao painel
        </button>
      </div>
    );
  }

  return <FormularioImovel imovel={imovel} />;
}
