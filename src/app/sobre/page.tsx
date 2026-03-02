"use client";

import Image from "next/image";

export default function SobrePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl font-bold text-verde">Sobre a Liberty Imóveis</h1>
        <p className="mt-4 text-lg text-cinza-400 max-w-3xl mx-auto">
          Há anos conectando pessoas aos melhores imóveis da região, com confiança,
          transparência e dedicação.
        </p>
      </div>

      {/* Seção institucional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative h-80 lg:h-[400px] rounded-2xl overflow-hidden bg-areia-200">
          <Image
            src="/images/institucional/escritorio.jpg"
            alt="Escritório Liberty Imóveis"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-verde mb-4">Quem somos</h2>
          <p className="text-cinza-600 leading-relaxed mb-4">
            A Liberty Imóveis nasceu com o propósito de transformar a experiência de compra,
            venda e aluguel de imóveis. Nossa equipe é composta por profissionais experientes
            e comprometidos em oferecer o melhor atendimento do mercado.
          </p>
          <p className="text-cinza-600 leading-relaxed mb-4">
            Trabalhamos com uma carteira diversificada de imóveis residenciais e comerciais,
            sempre priorizando a segurança jurídica e a satisfação dos nossos clientes.
          </p>
          <p className="text-cinza-600 leading-relaxed">
            Nosso compromisso é tornar o processo imobiliário simples, ágil e seguro para
            todas as partes envolvidas.
          </p>
        </div>
      </div>

      {/* Valores */}
      <div className="mb-20">
        <h2 className="font-heading text-3xl font-bold text-verde text-center mb-12">Nossos Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-8 text-center">
            <div className="w-16 h-16 bg-verde-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-bold text-cinza-700 mb-2">Confiança</h3>
            <p className="text-cinza-400 text-sm">
              Relações construídas com base na transparência e honestidade em cada negociação.
            </p>
          </div>

          <div className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-8 text-center">
            <div className="w-16 h-16 bg-verde-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-bold text-cinza-700 mb-2">Compromisso</h3>
            <p className="text-cinza-400 text-sm">
              Dedicação total ao cliente, do primeiro contato até a entrega das chaves.
            </p>
          </div>

          <div className="bg-areia-50 rounded-2xl shadow-md border border-areia-200 p-8 text-center">
            <div className="w-16 h-16 bg-verde-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-bold text-cinza-700 mb-2">Agilidade</h3>
            <p className="text-cinza-400 text-sm">
              Processos otimizados para que você encontre o imóvel ideal no menor tempo possível.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-verde rounded-2xl p-12 text-center text-white">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
          Pronto para encontrar seu imóvel?
        </h2>
        <p className="text-areia-200/80 mb-8 max-w-xl mx-auto">
          Entre em contato conosco ou navegue por nossos imóveis disponíveis.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/imoveis"
            className="bg-terracota text-white font-semibold px-8 py-3 rounded-xl hover:bg-terracota-500 transition-colors"
          >
            Ver imóveis
          </a>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-areia-200 text-areia-200 font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            Fale conosco
          </a>
        </div>
      </div>
    </div>
  );
}
