import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossos Corretores",
  description:
    "Conheça a equipe de corretores certificados da Liberty Imóveis. Profissionais especializados no mercado imobiliário de São João Batista e região.",
  openGraph: {
    title: "Nossos Corretores | Liberty Imóveis",
    description:
      "Conheça a equipe de corretores certificados da Liberty Imóveis em São João Batista.",
  },
};

export default function CorretoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
