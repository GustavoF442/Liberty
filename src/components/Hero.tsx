"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* YouTube video background */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/t7k2Wyf8beY?autoplay=1&mute=1&loop=1&playlist=t7k2Wyf8beY&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
          title="Liberty Imóveis"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] sm:w-[200%] sm:h-[200%] min-w-full min-h-full"
          style={{ border: 0 }}
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-verde/50 via-black/40 to-black/60 pointer-events-none" />

      {/* Conteúdo */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
          Em cada imóvel, uma nova oportunidade de voar.
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-areia-200/90 font-medium drop-shadow-md">
          Um novo horizonte espera por você.
        </p>
        <Link
          href="/imoveis"
          className="inline-block mt-10 border-2 border-white text-white hover:bg-white hover:text-verde font-semibold text-lg px-10 py-4 rounded-none transition-all duration-300 tracking-wide"
        >
          Conhecer imóveis
        </Link>
      </div>
    </section>
  );
}
