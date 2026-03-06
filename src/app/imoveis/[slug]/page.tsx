import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import ImovelDetalhe from "@/components/ImovelDetalhe";
import { Imovel, Corretor } from "@/types/Imovel";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://libertyimoveis.com.br";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}

async function getImovel(slug: string) {
  const supabase = getSupabase();

  // Try by slug first, then fall back to id
  let { data } = await supabase
    .from("imoveis")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) {
    const { data: byId } = await supabase
      .from("imoveis")
      .select("*")
      .eq("id", slug)
      .single();
    data = byId;
  }

  return data as Imovel | null;
}

async function getCorretor(id: string) {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("corretores")
    .select("*")
    .eq("id", id)
    .single();
  return data as Corretor | null;
}

const fmt = (valor: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const imovel = await getImovel(params.slug);

  if (!imovel) {
    return { title: "Imóvel não encontrado" };
  }

  const title = `${imovel.titulo} — ${fmt(imovel.preco)}`;
  const descParts = [
    imovel.tipo,
    imovel.finalidade,
    imovel.bairro && imovel.cidade
      ? `em ${imovel.bairro}, ${imovel.cidade}`
      : "",
    imovel.dormitorios > 0 ? `${imovel.dormitorios} dorm.` : "",
    imovel.area_util > 0 ? `${imovel.area_util}m²` : "",
  ]
    .filter(Boolean)
    .join(" | ");
  const description = descParts.substring(0, 160);

  const canonical = imovel.slug
    ? `${SITE_URL}/imoveis/${imovel.slug}`
    : `${SITE_URL}/imovel/${imovel.id}`;

  const image = imovel.fotos?.[0] || undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
      type: "website",
      locale: "pt_BR",
      siteName: "Liberty Imóveis",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

function buildJsonLd(imovel: Imovel) {
  const canonical = imovel.slug
    ? `${SITE_URL}/imoveis/${imovel.slug}`
    : `${SITE_URL}/imovel/${imovel.id}`;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: imovel.titulo,
    description: imovel.descricao?.substring(0, 300) || "",
    url: canonical,
    image: imovel.fotos?.[0] || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: imovel.logradouro
        ? `${imovel.logradouro}, ${imovel.numero}`
        : undefined,
      addressLocality: imovel.cidade,
      addressRegion: imovel.estado,
      addressCountry: "BR",
      neighborhood: imovel.bairro,
    },
    offers: {
      "@type": "Offer",
      price: imovel.preco,
      priceCurrency: "BRL",
      availability: imovel.disponivel
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
    floorSize: imovel.area_util
      ? {
          "@type": "QuantitativeValue",
          value: imovel.area_util,
          unitCode: "MTK",
        }
      : undefined,
    numberOfRooms: imovel.dormitorios || undefined,
    numberOfBathroomsTotal: imovel.banheiros || undefined,
  };
}

export default async function ImovelSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const imovel = await getImovel(params.slug);

  if (!imovel) {
    notFound();
  }

  let corretor: Corretor | null = null;
  if (imovel.corretor_id) {
    corretor = await getCorretor(imovel.corretor_id);
  }

  const jsonLd = buildJsonLd(imovel);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImovelDetalhe imovel={imovel} corretor={corretor} />
    </>
  );
}
