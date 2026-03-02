"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/wallpapers/hero-bg.png')" }}
      />
      {/* Overlay com tom verde suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-verde/60 via-verde/40 to-black/50" />

      {/* Conteúdo */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
          Seu novo lar começa aqui.
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-areia-200/90 max-w-2xl mx-auto">
          Encontre o imóvel perfeito com a Liberty Imóveis
        </p>
        <Link
          href="/imoveis"
          className="inline-block mt-8 bg-terracota hover:bg-terracota-500 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
        >
          Ver imóveis
        </Link>
      </div>
    </section>
  );
}
