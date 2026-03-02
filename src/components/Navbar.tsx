"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "text-areia-100 hover:text-terracota-200 transition-colors font-medium text-sm uppercase tracking-wider";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-verde/95 backdrop-blur-md shadow-lg" : "bg-verde shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Links à esquerda */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/" className={linkClass}>Início</Link>
            <Link href="/imoveis" className={linkClass}>Imóveis</Link>
            <Link href="/corretores" className={linkClass}>Corretores</Link>
            <Link href="/sobre" className={linkClass}>Sobre</Link>
          </nav>

          {/* Logo centralizada */}
          <Link href="/" className="flex-shrink-0 absolute left-1/2 -translate-x-1/2 lg:relative lg:left-auto lg:translate-x-0">
            <Image
              src="/images/logo/liberty-logo.png"
              alt="Liberty Imóveis"
              width={160}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Links à direita */}
          <nav className="hidden lg:flex items-center gap-7">
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-areia-100 hover:text-green-300 transition-colors font-medium text-sm uppercase tracking-wider"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contato
            </a>
            <Link
              href="/login"
              className="bg-terracota hover:bg-terracota-500 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors"
            >
              Área Admin
            </Link>
          </nav>

          {/* Botão mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-areia-200 hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="lg:hidden bg-verde border-t border-white/10 shadow-xl">
          <nav className="flex flex-col px-4 py-3 gap-0.5">
            <Link href="/" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-areia-100 hover:bg-white/10 hover:text-terracota-200 transition-colors font-medium">
              Início
            </Link>
            <Link href="/imoveis" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-areia-100 hover:bg-white/10 hover:text-terracota-200 transition-colors font-medium">
              Imóveis
            </Link>
            <Link href="/corretores" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-areia-100 hover:bg-white/10 hover:text-terracota-200 transition-colors font-medium">
              Corretores
            </Link>
            <Link href="/sobre" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-areia-100 hover:bg-white/10 hover:text-terracota-200 transition-colors font-medium">
              Sobre
            </Link>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-areia-100 hover:bg-white/10 hover:text-terracota-200 transition-colors font-medium inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contato
            </a>
            <div className="border-t border-white/10 mt-2 pt-2">
              <Link href="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-terracota-200 hover:bg-white/10 transition-colors font-semibold inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Área Admin
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
