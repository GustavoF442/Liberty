import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imóveis à Venda e Locação",
  description:
    "Explore casas, apartamentos, terrenos e salas comerciais disponíveis em São João Batista e região. Filtros por tipo, bairro, preço e mais.",
  alternates: { canonical: "https://libertyimoveissc.com.br/imoveis" },
  openGraph: {
    title: "Imóveis à Venda e Locação | Liberty Imóveis",
    description:
      "Explore casas, apartamentos, terrenos e salas comerciais disponíveis em São João Batista e região.",
    url: "https://libertyimoveissc.com.br/imoveis",
  },
};

export default function ImoveisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
