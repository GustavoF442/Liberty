import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default async function ImovelRedirectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  const { data } = await supabase
    .from("imoveis")
    .select("slug")
    .eq("id", params.id)
    .single();

  if (data?.slug) {
    redirect(`/imoveis/${data.slug}`);
  }

  // Fallback: render via the slug page using the id
  redirect(`/imoveis/${params.id}`);
}
