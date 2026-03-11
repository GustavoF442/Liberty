import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Venda seu Imóvel",
  description:
    "Anuncie seu imóvel com a Liberty Imóveis. Equipe especializada para avaliar e vender seu patrimônio com segurança e transparência.",
  alternates: { canonical: "https://libertyimoveissc.com.br/venda-seu-imovel" },
  openGraph: {
    title: "Venda seu Imóvel | Liberty Imóveis",
    description:
      "Anuncie seu imóvel com a Liberty Imóveis. Equipe especializada para avaliar e vender seu patrimônio com segurança e transparência.",
    url: "https://libertyimoveissc.com.br/venda-seu-imovel",
  },
};

export default function VendaSeuImovelPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-14">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-verde leading-tight">
          Venda seu Imóvel
        </h1>
        <p className="mt-4 text-lg text-cinza-400 max-w-2xl mx-auto">
          Conte com a Liberty Imóveis para avaliar e vender seu patrimônio com segurança e agilidade.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-areia-200 p-8 sm:p-12 space-y-8">
        <div>
          <h2 className="font-heading text-2xl font-bold text-cinza-700 mb-4">
            Por que anunciar com a Liberty?
          </h2>
          <ul className="space-y-3 text-cinza-600">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-verde flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Avaliação profissional do seu imóvel</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-verde flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Divulgação ampla nos principais canais</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-verde flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Suporte jurídico e documental completo</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-verde flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span>Equipe dedicada para acompanhar todo o processo</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-areia-200 pt-8 text-center">
          <p className="text-cinza-600 mb-6">
            Entre em contato conosco para agendar uma avaliação gratuita do seu imóvel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/5548998604988?text=Ol%C3%A1%2C%20gostaria%20de%20anunciar%20meu%20im%C3%B3vel%20com%20a%20Liberty."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar pelo WhatsApp
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 border-2 border-verde text-verde hover:bg-verde hover:text-white font-semibold px-8 py-3 rounded-xl transition-all"
            >
              Outras formas de contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
