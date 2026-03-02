"use client";

interface FiltroProps {
  tipos: string[];
  bairros: string[];
  tipoSelecionado: string;
  bairroSelecionado: string;
  finalidadeSelecionada: string;
  precoMin: string;
  precoMax: string;
  onTipoChange: (valor: string) => void;
  onBairroChange: (valor: string) => void;
  onFinalidadeChange: (valor: string) => void;
  onPrecoMinChange: (valor: string) => void;
  onPrecoMaxChange: (valor: string) => void;
}

export default function Filtro({
  tipos,
  bairros,
  tipoSelecionado,
  bairroSelecionado,
  finalidadeSelecionada,
  precoMin,
  precoMax,
  onTipoChange,
  onBairroChange,
  onFinalidadeChange,
  onPrecoMinChange,
  onPrecoMaxChange,
}: FiltroProps) {
  return (
    <div className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6 mb-8">
      <h2 className="font-heading text-lg font-semibold text-verde mb-4">Filtrar imóveis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-cinza-500 mb-1">
            Tipo
          </label>
          <select
            value={tipoSelecionado}
            onChange={(e) => onTipoChange(e.target.value)}
            className="w-full border border-areia-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none bg-white"
          >
            <option value="">Todos</option>
            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cinza-500 mb-1">
            Finalidade
          </label>
          <select
            value={finalidadeSelecionada}
            onChange={(e) => onFinalidadeChange(e.target.value)}
            className="w-full border border-areia-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none bg-white"
          >
            <option value="">Todas</option>
            <option value="Venda">Venda</option>
            <option value="Locação">Locação</option>
            <option value="Temporada">Temporada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cinza-500 mb-1">
            Bairro
          </label>
          <select
            value={bairroSelecionado}
            onChange={(e) => onBairroChange(e.target.value)}
            className="w-full border border-areia-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none bg-white"
          >
            <option value="">Todos</option>
            {bairros.map((bairro) => (
              <option key={bairro} value={bairro}>
                {bairro}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cinza-500 mb-1">
            Preço mínimo
          </label>
          <input
            type="number"
            placeholder="R$ 0"
            value={precoMin}
            onChange={(e) => onPrecoMinChange(e.target.value)}
            className="w-full border border-areia-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cinza-500 mb-1">
            Preço máximo
          </label>
          <input
            type="number"
            placeholder="R$ 999.999"
            value={precoMax}
            onChange={(e) => onPrecoMaxChange(e.target.value)}
            className="w-full border border-areia-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none bg-white"
          />
        </div>
      </div>
    </div>
  );
}
