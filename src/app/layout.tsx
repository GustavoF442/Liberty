import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://libertyimoveis.com.br";

export const metadata: Metadata = {
  title: {
    default: "Liberty Imóveis — Imobiliária em São João Batista SC",
    template: "%s | Liberty Imóveis",
  },
  description:
    "Encontre casas, apartamentos e terrenos em São João Batista e região. Atendimento personalizado, equipe certificada e os melhores imóveis para compra e locação.",
  icons: {
    icon: "/images/logo/favicon.png",
    shortcut: "/images/logo/favicon.png",
    apple: "/images/logo/favicon.png",
  },
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Liberty Imóveis",
    locale: "pt_BR",
    type: "website",
    url: SITE_URL,
    title: "Liberty Imóveis — Imobiliária em São João Batista SC",
    description:
      "Encontre casas, apartamentos e terrenos em São João Batista e região.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liberty Imóveis",
    description:
      "Encontre casas, apartamentos e terrenos em São João Batista e região.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-body">
        <Navbar />
        <main className="min-h-screen pt-20 lg:pt-[100px]">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
