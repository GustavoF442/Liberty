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
    "text-areia-100 hover:text-white transition-colors font-medium text-[15px] tracking-widest uppercase";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-verde/95 backdrop-blur-md shadow-lg" : "bg-verde"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20 lg:h-[100px]">
          {/* Links à esquerda */}
          <nav className="hidden lg:flex items-center gap-8 mr-10">
            <Link href="/sobre" className={linkClass}>História</Link>
            <Link href="/imoveis" className={linkClass}>Imóveis</Link>
          </nav>

          {/* Logo — centralizada */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo/liberty-logo.png"
              alt="Liberty Imóveis"
              width={260}
              height={80}
              className="h-16 lg:h-[72px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Links à direita */}
          <nav className="hidden lg:flex items-center gap-8 ml-10">
            <Link href="/venda-seu-imovel" className={linkClass}>Venda seu Imóvel</Link>
            <Link href="/contato" className={linkClass}>Contato</Link>
          </nav>

          {/* Spacer para mobile (empurra hamburger pra direita) */}
          <div className="flex-1 lg:hidden" />

          {/* Botão mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg text-areia-200 hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="lg:hidden bg-verde/95 backdrop-blur-md shadow-xl border-t border-white/5">
          <nav className="flex flex-col px-4 py-3 gap-0.5">
            <Link href="/sobre" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-areia-100 hover:bg-white/10 hover:text-white transition-colors font-medium text-sm">
              História
            </Link>
            <Link href="/imoveis" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-areia-100 hover:bg-white/10 hover:text-white transition-colors font-medium text-sm">
              Imóveis
            </Link>
            <Link href="/venda-seu-imovel" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-areia-100 hover:bg-white/10 hover:text-white transition-colors font-medium text-sm">
              Venda seu Imóvel
            </Link>
            <Link href="/contato" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-areia-100 hover:bg-white/10 hover:text-white transition-colors font-medium text-sm">
              Contato
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
