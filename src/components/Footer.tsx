"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-verde text-areia-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo e descrição */}
          <div className="md:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo/liberty-logo.png"
              alt="Liberty Imóveis"
              width={140}
              height={44}
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-sm leading-relaxed text-areia-300/80 max-w-xs">
              Encontre o imóvel dos seus sonhos com segurança e confiança.
              A Liberty Imóveis está aqui para ajudá-lo em cada etapa.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-heading text-areia-100 font-semibold text-sm uppercase tracking-wide mb-4">
              Navegação
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link href="/" className="text-sm text-areia-300/80 hover:text-terracota-200 transition-colors">
                Início
              </Link>
              <Link href="/imoveis" className="text-sm text-areia-300/80 hover:text-terracota-200 transition-colors">
                Imóveis
              </Link>
              <Link href="/corretores" className="text-sm text-areia-300/80 hover:text-terracota-200 transition-colors">
                Corretores
              </Link>
              <Link href="/sobre" className="text-sm text-areia-300/80 hover:text-terracota-200 transition-colors">
                Sobre
              </Link>
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-heading text-areia-100 font-semibold text-sm uppercase tracking-wide mb-4">
              Contato
            </h4>
            <div className="flex flex-col gap-3 text-sm text-areia-300/80">
              <a href="tel:+5548998604988" className="inline-flex items-center gap-2 hover:text-terracota-200 transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (48) 99860-4988
              </a>
              <a href="mailto:libertyimoveis3@gmail.com" className="inline-flex items-center gap-2 hover:text-terracota-200 transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                libertyimoveis3@gmail.com
              </a>
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Rua Otaviano Dadam, 7 — Centro, São João Batista — SC
              </span>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="font-heading text-areia-100 font-semibold text-sm uppercase tracking-wide mb-4">
              Fale Conosco
            </h4>
            <p className="text-sm text-areia-300/80 mb-4">
              Atendimento rápido e personalizado via WhatsApp.
            </p>
            <a
              href="https://wa.me/5548998604988"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-areia-400/60">
          <p>&copy; {new Date().getFullYear()} Liberty Imóveis. Todos os direitos reservados.</p>
          <p>Desenvolvido por Gustavo Fraga</p>
        </div>
      </div>
    </footer>
  );
}
