"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Imovel } from "@/types/Imovel";
import ImovelCard from "@/components/ImovelCard";
import Filtro from "@/components/Filtro";

export default function ImoveisPage() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [filtrados, setFiltrados] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [tipos, setTipos] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);

  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [finalidadeSelecionada, setFinalidadeSelecionada] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  useEffect(() => {
    async function fetchImoveis() {
      const { data, error } = await supabase
        .from("imoveis")
        .select("*")
        .eq("disponivel", true)
        .order("created_at", { ascending: false });

      if (error) {
        void error.message;
        setErro("Não foi possível carregar os imóveis. Tente novamente.");
        setLoading(false);
        return;
      }

      const lista = (data as Imovel[]) || [];
      setImoveis(lista);
      setFiltrados(lista);

      const tiposUnicos = Array.from(new Set(lista.map((i) => i.tipo).filter(Boolean)));
      const cidadesUnicas = Array.from(new Set(lista.map((i) => i.cidade).filter(Boolean)));
      setTipos(tiposUnicos);
      setCidades(cidadesUnicas);
      setLoading(false);
    }

    fetchImoveis();
  }, []);

  useEffect(() => {
    let resultado = [...imoveis];

    if (tipoSelecionado) {
      resultado = resultado.filter((i) => i.tipo === tipoSelecionado);
    }
    if (cidadeSelecionada) {
      resultado = resultado.filter((i) => i.cidade === cidadeSelecionada);
    }
    if (finalidadeSelecionada) {
      resultado = resultado.filter((i) => i.finalidade === finalidadeSelecionada);
    }
    if (precoMin) {
      const min = parseInt(precoMin.replace(/\D/g, ""), 10) / 100;
      if (min > 0) resultado = resultado.filter((i) => i.preco >= min);
    }
    if (precoMax) {
      const max = parseInt(precoMax.replace(/\D/g, ""), 10) / 100;
      if (max > 0) resultado = resultado.filter((i) => i.preco <= max);
    }

    setFiltrados(resultado);
  }, [tipoSelecionado, cidadeSelecionada, finalidadeSelecionada, precoMin, precoMax, imoveis]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold text-verde">Imóveis Disponíveis</h1>
        <p className="mt-3 text-lg text-cinza-400">
          Navegue pelos imóveis e encontre o ideal para você
        </p>
      </div>

      {erro && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
          {erro}
        </div>
      )}

      <Filtro
        tipos={tipos}
        cidades={cidades}
        tipoSelecionado={tipoSelecionado}
        cidadeSelecionada={cidadeSelecionada}
        finalidadeSelecionada={finalidadeSelecionada}
        precoMin={precoMin}
        precoMax={precoMax}
        onTipoChange={setTipoSelecionado}
        onCidadeChange={setCidadeSelecionada}
        onFinalidadeChange={setFinalidadeSelecionada}
        onPrecoMinChange={setPrecoMin}
        onPrecoMaxChange={setPrecoMax}
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde" />
        </div>
      ) : filtrados.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-cinza-400 text-lg">Nenhum imóvel encontrado.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-cinza-400 mb-6">
            {filtrados.length} imóve{filtrados.length !== 1 ? "is" : "l"} encontrado
            {filtrados.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrados.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
