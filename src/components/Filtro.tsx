"use client";

function formatarMoeda(valor: string): string {
  const nums = valor.replace(/\D/g, "");
  if (!nums) return "";
  const centavos = parseInt(nums, 10);
  const reais = centavos / 100;
  return reais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function parseMoeda(valor: string): number {
  const nums = valor.replace(/\D/g, "");
  if (!nums) return 0;
  return parseInt(nums, 10) / 100;
}

interface FiltroProps {
  tipos: string[];
  cidades: string[];
  tipoSelecionado: string;
  cidadeSelecionada: string;
  finalidadeSelecionada: string;
  precoMin: string;
  precoMax: string;
  onTipoChange: (valor: string) => void;
  onCidadeChange: (valor: string) => void;
  onFinalidadeChange: (valor: string) => void;
  onPrecoMinChange: (valor: string) => void;
  onPrecoMaxChange: (valor: string) => void;
}

export default function Filtro({
  tipos,
  cidades,
  tipoSelecionado,
  cidadeSelecionada,
  finalidadeSelecionada,
  precoMin,
  precoMax,
  onTipoChange,
  onCidadeChange,
  onFinalidadeChange,
  onPrecoMinChange,
  onPrecoMaxChange,
}: FiltroProps) {
  const inputBase = "w-full border border-areia-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none bg-white";

  function handlePrecoMin(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatarMoeda(e.target.value);
    onPrecoMinChange(formatted);
  }

  function handlePrecoMax(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatarMoeda(e.target.value);
    onPrecoMaxChange(formatted);
  }

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
            className={inputBase}
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
            className={inputBase}
          >
            <option value="">Todas</option>
            <option value="Venda">Venda</option>
            <option value="Locação">Locação</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cinza-500 mb-1">
            Cidade
          </label>
          <select
            value={cidadeSelecionada}
            onChange={(e) => onCidadeChange(e.target.value)}
            className={inputBase}
          >
            <option value="">Todas</option>
            {cidades.map((cidade) => (
              <option key={cidade} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cinza-500 mb-1">
            Preço mínimo
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="R$ 0,00"
            value={precoMin}
            onChange={handlePrecoMin}
            className={inputBase}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-cinza-500 mb-1">
            Preço máximo
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="R$ 999.999,00"
            value={precoMax}
            onChange={handlePrecoMax}
            className={inputBase}
          />
        </div>
      </div>
    </div>
  );
}
