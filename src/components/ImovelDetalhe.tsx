"use client";

import { useState } from "react";
import Link from "next/link";
import { Imovel, Corretor } from "@/types/Imovel";

const fmt = (valor: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

interface Props {
  imovel: Imovel;
  corretor: Corretor | null;
}

export default function ImovelDetalhe({ imovel, corretor }: Props) {
  const [fotoAtual, setFotoAtual] = useState(0);
  const [mainImgFailed, setMainImgFailed] = useState(false);

  const [contatoNome, setContatoNome] = useState("");
  const [contatoEmail, setContatoEmail] = useState("");
  const [contatoMsg, setContatoMsg] = useState("");
  const [contatoEnviado, setContatoEnviado] = useState(false);

  const whatsappNumber = corretor?.telefone?.replace(/\D/g, "") || "5548998604988";
  const whatsappMessage = encodeURIComponent(
    `Olá${corretor ? `, ${corretor.nome}` : ""}! Tenho interesse no imóvel "${imovel.titulo}"${imovel.codigo_referencia ? ` (Ref: ${imovel.codigo_referencia})` : ""} — ${fmt(imovel.preco)}. Poderia me dar mais informações?`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const hasExtras = !!(imovel.diferenciais_internos || imovel.seguranca || imovel.lazer || imovel.comodidades);
  const hasCustos = !!(imovel.valor_condominio || imovel.valor_iptu);
  const hasDocFlags = imovel.aceita_financiamento || imovel.aceita_fgts || imovel.aceita_permuta;

  function handleContatoSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá${corretor ? `, ${corretor.nome}` : ""}!\n\nMe chamo *${contatoNome}* (${contatoEmail}).\n\nTenho interesse no imóvel "*${imovel.titulo}*"${imovel.codigo_referencia ? ` (Ref: ${imovel.codigo_referencia})` : ""} — ${fmt(imovel.preco)}.\n\n${contatoMsg}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
    setContatoEnviado(true);
  }

  const fotos = imovel.fotos && imovel.fotos.length > 0 ? imovel.fotos : [];

  const enderecoCompleto = [
    imovel.logradouro && `${imovel.logradouro}, ${imovel.numero}`,
    imovel.bairro,
    imovel.cidade,
    imovel.estado,
  ].filter(Boolean).join(" — ");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/imoveis" className="inline-flex items-center gap-2 text-verde hover:text-verde/80 mb-6 font-medium">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para imóveis
      </Link>

      {/* Galeria */}
      {fotos.length > 0 ? (
        <div className="mb-10">
          <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden bg-areia-200 shadow-lg">
            {mainImgFailed ? (
              <div className="w-full h-full flex items-center justify-center text-areia-400">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            ) : (
              <img
                src={fotos[fotoAtual]}
                alt={`${imovel.titulo} - Foto ${fotoAtual + 1}`}
                className="w-full h-full object-cover"
                onError={() => setMainImgFailed(true)}
              />
            )}
            {fotos.length > 1 && (
              <>
                <button onClick={() => { setMainImgFailed(false); setFotoAtual((p) => (p === 0 ? fotos.length - 1 : p - 1)); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={() => { setMainImgFailed(false); setFotoAtual((p) => (p === fotos.length - 1 ? 0 : p + 1)); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {fotoAtual + 1} / {fotos.length}
            </div>
          </div>
          {fotos.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {fotos.map((foto, i) => (
                <button key={i} onClick={() => { setMainImgFailed(false); setFotoAtual(i); }} className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${i === fotoAtual ? "border-verde" : "border-transparent hover:border-areia-300"}`}>
                  <img src={foto} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mb-10 w-full h-48 rounded-2xl bg-areia-100 flex items-center justify-center text-areia-400">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
        </div>
      )}

      {/* Faixa de preço e badges */}
      <div className="bg-verde rounded-2xl p-6 mb-10 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-4xl font-bold text-white">{fmt(imovel.preco)}</p>
          {imovel.finalidade && <p className="text-verde-100 mt-1 text-sm">{imovel.finalidade}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full">{imovel.tipo}</span>
          {imovel.destaque && <span className="bg-terracota text-white text-sm font-semibold px-4 py-1.5 rounded-full">Destaque</span>}
          {!imovel.disponivel && <span className="bg-red-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">Indisponível</span>}
          {imovel.codigo_referencia && <span className="bg-white/15 text-white/90 text-xs font-mono px-3 py-1.5 rounded-full">Ref: {imovel.codigo_referencia}</span>}
          {hasDocFlags && (
            <>
              {imovel.aceita_financiamento && <span className="bg-green-500/20 text-green-200 text-xs font-medium px-3 py-1.5 rounded-full border border-green-400/30">Aceita Financiamento</span>}
              {imovel.aceita_fgts && <span className="bg-green-500/20 text-green-200 text-xs font-medium px-3 py-1.5 rounded-full border border-green-400/30">Aceita FGTS</span>}
              {imovel.aceita_permuta && <span className="bg-green-500/20 text-green-200 text-xs font-medium px-3 py-1.5 rounded-full border border-green-400/30">Aceita Permuta</span>}
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-cinza-700 mb-2">{imovel.titulo}</h1>
            <div className="flex items-center gap-2 text-cinza-400">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-base">{enderecoCompleto}</p>
            </div>
            {imovel.proximidades && (
              <p className="text-sm text-cinza-300 mt-2 ml-7">{imovel.proximidades}</p>
            )}
          </div>

          {/* Características */}
          <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6">
            <h2 className="font-heading text-xl font-semibold text-verde mb-5">Características</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {imovel.dormitorios > 0 && <StatCard icon="bed" label={`Dormitório${imovel.dormitorios > 1 ? "s" : ""}`} value={imovel.dormitorios} />}
              {imovel.suites > 0 && <StatCard icon="star" label={`Suíte${imovel.suites > 1 ? "s" : ""}`} value={imovel.suites} />}
              {imovel.banheiros > 0 && <StatCard icon="bath" label={`Banheiro${imovel.banheiros > 1 ? "s" : ""}`} value={imovel.banheiros} />}
              {imovel.vagas > 0 && <StatCard icon="car" label={`Vaga${imovel.vagas > 1 ? "s" : ""}`} value={imovel.vagas} />}
              {imovel.area_util > 0 && <StatCard icon="area" label="Área útil" value={`${imovel.area_util} m²`} />}
              {imovel.area_total > 0 && <StatCard icon="area" label="Área total" value={`${imovel.area_total} m²`} />}
            </div>
          </section>

          {/* Custos fixos */}
          {hasCustos && (
            <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6">
              <h2 className="font-heading text-xl font-semibold text-verde mb-5">Custos Fixos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                {imovel.valor_condominio > 0 && (
                  <div className="bg-areia-100 rounded-xl p-4">
                    <p className="text-cinza-400 text-xs uppercase tracking-wide mb-1">Condomínio</p>
                    <p className="text-lg font-bold text-cinza-700">{fmt(imovel.valor_condominio)}</p>
                    {imovel.condominio_incluso && <p className="text-xs text-cinza-400 mt-1">Inclui: {imovel.condominio_incluso}</p>}
                  </div>
                )}
                {imovel.valor_iptu > 0 && (
                  <div className="bg-areia-100 rounded-xl p-4">
                    <p className="text-cinza-400 text-xs uppercase tracking-wide mb-1">IPTU (anual)</p>
                    <p className="text-lg font-bold text-cinza-700">{fmt(imovel.valor_iptu)}</p>
                  </div>
                )}
                {imovel.taxas_extras && (
                  <div className="sm:col-span-2 bg-areia-100 rounded-xl p-4">
                    <p className="text-cinza-400 text-xs uppercase tracking-wide mb-1">Taxas extras</p>
                    <p className="text-cinza-600">{imovel.taxas_extras}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Diferenciais */}
          {hasExtras && (
            <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6">
              <h2 className="font-heading text-xl font-semibold text-verde mb-5">Diferenciais e Infraestrutura</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {imovel.diferenciais_internos && <InfoBlock title="Diferenciais internos" text={imovel.diferenciais_internos} />}
                {imovel.seguranca && <InfoBlock title="Segurança" text={imovel.seguranca} />}
                {imovel.lazer && <InfoBlock title="Lazer" text={imovel.lazer} />}
                {imovel.comodidades && <InfoBlock title="Comodidades" text={imovel.comodidades} />}
              </div>
            </section>
          )}

          {/* Descrição */}
          <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6">
            <h2 className="font-heading text-xl font-semibold text-verde mb-4">Descrição</h2>
            <div className="text-cinza-600 leading-relaxed whitespace-pre-line text-base">{imovel.descricao}</div>
          </section>

          {/* Vídeo */}
          {imovel.video_url && (
            <section className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6">
              <h2 className="font-heading text-xl font-semibold text-verde mb-3">Tour Virtual / Vídeo</h2>
              <a href={imovel.video_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-terracota hover:text-terracota-500 font-medium">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Assistir vídeo / tour virtual
              </a>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-6 sticky top-24 space-y-5">
            <div>
              <p className="text-3xl font-bold text-verde">{fmt(imovel.preco)}</p>
              {imovel.finalidade && <p className="text-sm text-cinza-400 mt-1">{imovel.finalidade}</p>}
            </div>

            {/* Corretor card */}
            {corretor && (
              <div className="flex items-center gap-3 bg-areia-100 rounded-xl p-4">
                {corretor.foto ? (
                  <img src={corretor.foto} alt={corretor.nome} className="w-14 h-14 rounded-full object-cover border-2 border-verde/20" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-verde/10 flex items-center justify-center text-verde font-bold text-xl">
                    {corretor.nome.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-cinza-700">{corretor.nome}</p>
                  <p className="text-xs text-cinza-400">CRECI {corretor.creci}</p>
                  {corretor.especialidade && <p className="text-xs text-verde mt-0.5">{corretor.especialidade}</p>}
                </div>
              </div>
            )}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors text-lg shadow-md hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {corretor ? `Falar com ${corretor.nome.split(" ")[0]}` : "Contato via WhatsApp"}
            </a>

            {/* Formulário */}
            <div className="border-t border-areia-200 pt-5">
              <h3 className="text-sm font-semibold text-cinza-700 mb-3">Ou envie uma mensagem</h3>
              {contatoEnviado ? (
                <p className="text-sm text-green-600 font-medium">Mensagem enviada! Entraremos em contato em breve.</p>
              ) : (
                <form onSubmit={handleContatoSubmit} className="space-y-3">
                  <input required type="text" placeholder="Seu nome" value={contatoNome} onChange={(e) => setContatoNome(e.target.value)} className="w-full border border-areia-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none bg-white" />
                  <input required type="email" placeholder="Seu e-mail" value={contatoEmail} onChange={(e) => setContatoEmail(e.target.value)} className="w-full border border-areia-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none bg-white" />
                  <textarea required rows={3} placeholder={`Olá, tenho interesse no imóvel "${imovel.titulo}".`} value={contatoMsg} onChange={(e) => setContatoMsg(e.target.value)} className="w-full border border-areia-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none bg-white resize-y" />
                  <button type="submit" className="w-full bg-verde hover:bg-verde/80 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
                    Enviar mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Sub-components */
const icons: Record<string, JSX.Element> = {
  bed: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>,
  star: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  bath: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 16h16M4 16V8a4 4 0 014-4h1" /></svg>,
  car: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10" /></svg>,
  area: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>,
};

function StatCard({ label, value, icon }: { label: string; value: string | number; icon?: string }) {
  return (
    <div className="bg-areia-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
      {icon && icons[icon] && <div className="flex justify-center text-verde mb-1.5">{icons[icon]}</div>}
      <p className="text-xl font-bold text-cinza-700">{value}</p>
      <p className="text-xs text-cinza-400 mt-0.5">{label}</p>
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-areia-100 rounded-xl p-4">
      <p className="font-semibold text-verde text-sm mb-1.5">{title}</p>
      <p className="text-cinza-500 text-sm whitespace-pre-line leading-relaxed">{text}</p>
    </div>
  );
}
