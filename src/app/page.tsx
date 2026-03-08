"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import Destaques from "@/components/Destaques";
import { supabase } from "@/lib/supabaseClient";
import { Corretor } from "@/types/Imovel";

export default function HomePage() {
  const [corretores, setCorretores] = useState<Corretor[]>([]);

  useEffect(() => {
    async function fetchCorretores() {
      const { data } = await supabase
        .from("corretores")
        .select("*")
        .eq("ativo", true)
        .order("nome")
        .limit(4);
      if (data) setCorretores(data as Corretor[]);
    }
    fetchCorretores();
  }, []);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Liberty Imóveis LTDA",
    url: "https://libertyimoveissc.com.br",
    logo: "https://libertyimoveissc.com.br/images/logo/liberty-logo.png",
    telephone: "+55-48-99860-4988",
    email: "libertyimoveis3@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Otaviano Dadam, 7",
      addressLocality: "São João Batista",
      addressRegion: "SC",
      postalCode: "88240-000",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "12:00",
      },
    ],
  };

  return (
    <div className="-mt-20 lg:-mt-[100px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* ── Seção 1 – Hero ── */}
      <Hero />

      {/* ── Seção 2 – Categorias ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-0">
            {/* Litoral */}
            <Link href="/imoveis?categoria=litoral" className="group relative overflow-hidden flex-1 aspect-[3/4] md:aspect-auto md:min-h-[480px] bg-areia-200">
              <img
                src="/images/categorias/litoral.jpg"
                alt="Imóveis no litoral"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-2xl font-bold text-white">
                  Imóveis no litoral
                </h3>
              </div>
            </Link>

            {/* Divisor vertical */}
            <div className="hidden md:block w-px bg-white/80 flex-shrink-0" />
            <div className="md:hidden h-px bg-white/80 flex-shrink-0" />

            {/* Urbanos */}
            <Link href="/imoveis?categoria=urbano" className="group relative overflow-hidden flex-1 aspect-[3/4] md:aspect-auto md:min-h-[480px] bg-areia-200">
              <img
                src="/images/categorias/urbano.jpg"
                alt="Imóveis Urbanos"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-2xl font-bold text-white">
                  Imóveis Urbanos
                </h3>
              </div>
            </Link>

            {/* Divisor vertical */}
            <div className="hidden md:block w-px bg-white/80 flex-shrink-0" />
            <div className="md:hidden h-px bg-white/80 flex-shrink-0" />

            {/* Rurais */}
            <Link href="/imoveis?categoria=rural" className="group relative overflow-hidden flex-1 aspect-[3/4] md:aspect-auto md:min-h-[480px] bg-areia-200">
              <img
                src="/images/categorias/rural.jpg"
                alt="Imóveis Rurais"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-heading text-2xl font-bold text-white">
                  Imóveis Rurais
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Seção 3 – Imóveis em Destaque ── */}
      <Destaques />

      {/* ── Seção 4 – Equipe Liberty ── */}
      {corretores.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-verde">
                Equipe Liberty
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {corretores.map((c) => (
                <Link
                  key={c.id}
                  href="/corretores"
                  className="group flex flex-col items-center text-center hover:opacity-90 transition-opacity"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-areia-200 border-2 border-verde/20 shadow-md group-hover:shadow-lg transition-shadow">
                    {c.foto ? (
                      <img
                        src={c.foto}
                        alt={c.nome}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: c.foto_posicao || "center top" }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-verde/30">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-base font-bold text-cinza-700 mt-4">{c.nome}</h3>
                  <p className="text-sm text-cinza-500 mt-1">Corretor de Imóveis</p>
                  {c.especialidade && <p className="text-xs text-cinza-400">{c.especialidade}</p>}
                  <p className="text-xs text-cinza-400 mt-1 font-medium">CRECI: {c.creci}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Seção 5 – Quem somos ── */}
      <section className="py-20 bg-areia-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Vídeo / Imagem placeholder */}
            <div className="relative aspect-video bg-verde/10 rounded-2xl overflow-hidden border border-areia-200">
              <video
                className="w-full h-full object-cover"
                poster="/images/wallpapers/video-poster.jpg"
                controls
                preload="none"
              >
                <source src="/videos/liberty-cidades.mp4" type="video/mp4" />
              </video>
              {/* Fallback se não houver vídeo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-cinza-400">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Texto institucional */}
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-verde mb-6">
                Quem somos
              </h2>
              <p className="text-cinza-600 text-base lg:text-lg leading-relaxed mb-4">
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
              <Link href="/sobre" className="inline-flex items-center gap-2 text-verde hover:text-verde/80 font-semibold mt-6 transition-colors">
                Saiba mais sobre a Liberty
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Seção 6 – Localização ── */}
      <section className="py-20 bg-areia-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-verde">
              Venha conhecer a Liberty Imóveis
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md border border-areia-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.8!2d-48.8474!3d-27.2733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua+Otaviano+Dadam%2C+7+-+Centro%2C+S%C3%A3o+Jo%C3%A3o+Batista+-+SC!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Liberty Imóveis"
            />
          </div>

          <div className="text-center mt-8 space-y-1">
            <p className="text-cinza-600 font-medium">Rua Otaviano Dadam, 7 — Centro</p>
            <p className="text-cinza-500">São João Batista — SC, 88240-000</p>
            <a
              href="https://www.google.com.br/maps/search/Rua%20Otaviano%20Dadam%207%20Centro%20S%C3%A3o%20Jo%C3%A3o%20Batista%20SC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-verde hover:text-verde/80 text-sm font-medium mt-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
