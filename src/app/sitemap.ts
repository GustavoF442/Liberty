import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://libertyimoveis.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/imoveis`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/corretores`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: imoveis } = await supabase
      .from("imoveis")
      .select("id, slug, created_at, updated_at")
      .eq("disponivel", true)
      .order("created_at", { ascending: false });

    if (imoveis) {
      for (const im of imoveis) {
        const path = im.slug ? `/imoveis/${im.slug}` : `/imovel/${im.id}`;
        entries.push({
          url: `${SITE_URL}${path}`,
          lastModified: new Date(im.updated_at || im.created_at),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  } catch {
    // sitemap generation should not crash the build
  }

  return entries;
}
