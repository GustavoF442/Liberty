function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Variável de ambiente ${name} não está definida. Configure-a no .env.local`
    );
  }
  return value;
}

export const env = {
  SUPABASE_URL: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
  SUPABASE_ANON_KEY: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL || "https://libertyimoveis.com.br",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
} as const;
