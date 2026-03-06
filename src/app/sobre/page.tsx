import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a Liberty Imóveis: história, missão, valores e compromisso com o mercado imobiliário em São João Batista e região.",
};

export default function SobrePage() {
  return (
    <div>
      {/* Hero institucional */}
      <section className="relative bg-verde overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-verde via-verde to-verde-700 opacity-90" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="text-terracota-200 text-sm font-semibold uppercase tracking-widest mb-4">Sobre nós</p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Liberty Imóveis
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-areia-200/90 max-w-2xl mx-auto leading-relaxed">
            Conectando pessoas aos lugares onde novas histórias podem começar.
          </p>
        </div>
      </section>

      {/* Quem somos */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-80 lg:h-[480px] rounded-2xl overflow-hidden bg-areia-200 shadow-xl">
              <Image
                src="/images/institucional/escritorio.jpg"
                alt="Equipe Liberty Imóveis"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-terracota text-sm font-semibold uppercase tracking-widest mb-2">Nossa história</p>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-verde leading-tight">
                  Quem somos
                </h2>
              </div>
              <p className="text-cinza-600 text-base lg:text-lg leading-relaxed">
                A Liberty Imóveis nasceu com o propósito de conectar pessoas aos lugares onde
                novas histórias podem começar. Nosso símbolo, o pássaro, representa liberdade,
                confiança e a certeza de que sempre é possível alcançar voos mais altos.
              </p>
              <p className="text-cinza-600 text-base lg:text-lg leading-relaxed">
                Contamos com uma equipe especializada em diferentes áreas do mercado imobiliário,
                com atuação em imóveis no litoral, urbanos e rurais. Também oferecemos suporte
                em regularização e avaliação imobiliária, garantindo segurança, transparência
                e clareza em cada etapa do processo.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <p className="font-heading text-3xl font-bold text-verde">100+</p>
                  <p className="text-xs text-cinza-400 mt-1">Imóveis negociados</p>
                </div>
                <div className="w-px h-12 bg-areia-300" />
                <div className="text-center">
                  <p className="font-heading text-3xl font-bold text-verde">3+</p>
                  <p className="text-xs text-cinza-400 mt-1">Regiões atendidas</p>
                </div>
                <div className="w-px h-12 bg-areia-300" />
                <div className="text-center">
                  <p className="font-heading text-3xl font-bold text-verde">100%</p>
                  <p className="text-xs text-cinza-400 mt-1">Compromisso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-20 bg-areia-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-terracota text-sm font-semibold uppercase tracking-widest mb-2">Nosso propósito</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-verde">
              Missão, Visão e Valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <div className="bg-white rounded-2xl shadow-md border border-areia-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-verde/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-cinza-700 mb-3">Missão</h3>
              <p className="text-cinza-500 text-sm leading-relaxed">
                Facilitar a realização de sonhos por meio de soluções imobiliárias éticas, ágeis
                e personalizadas, conectando pessoas aos imóveis ideais com segurança e transparência.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-white rounded-2xl shadow-md border border-areia-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-verde/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-cinza-700 mb-3">Visão</h3>
              <p className="text-cinza-500 text-sm leading-relaxed">
                Ser referência no mercado imobiliário regional, reconhecida pela excelência
                no atendimento, inovação nos processos e compromisso com o desenvolvimento
                sustentável das comunidades que atendemos.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white rounded-2xl shadow-md border border-areia-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-verde/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-cinza-700 mb-3">Valores</h3>
              <ul className="text-cinza-500 text-sm leading-relaxed space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-verde rounded-full mt-1.5 flex-shrink-0" />
                  Transparência em cada negociação
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-verde rounded-full mt-1.5 flex-shrink-0" />
                  Dedicação ao cliente do início ao fim
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-verde rounded-full mt-1.5 flex-shrink-0" />
                  Ética e responsabilidade profissional
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-verde rounded-full mt-1.5 flex-shrink-0" />
                  Respeito ao meio ambiente e à comunidade
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compromisso com a natureza */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-verde/5 via-verde/10 to-verde/5 rounded-3xl p-10 lg:p-16 border border-verde/10">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 items-center">
              <div className="w-20 h-20 bg-verde/10 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto lg:mx-0">
                <svg className="w-10 h-10 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-verde mb-4 text-center lg:text-left">
                  Compromisso com a Natureza
                </h2>
                <p className="text-cinza-600 leading-relaxed text-base text-center lg:text-left">
                  Acreditamos que o mercado imobiliário pode crescer em harmonia com o meio ambiente.
                  Por isso, incentivamos práticas sustentáveis, valorizamos áreas de preservação e
                  promovemos uma cultura de respeito à natureza em todos os nossos projetos e parcerias.
                  O pássaro que nos representa é também um lembrete do nosso compromisso com um futuro
                  mais verde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-verde">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto para encontrar seu imóvel?
          </h2>
          <p className="text-areia-200/80 text-lg mb-10 max-w-xl mx-auto">
            Entre em contato conosco ou navegue por nossos imóveis disponíveis.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/imoveis"
              className="bg-terracota hover:bg-terracota/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg"
            >
              Ver imóveis
            </Link>
            <a
              href="https://wa.me/5548998604988"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
