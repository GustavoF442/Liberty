"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("Email ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-areia-50 rounded-2xl shadow-lg border border-areia-200 p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-verde">Área Administrativa</h1>
            <p className="text-cinza-400 mt-2">Faça login para acessar o painel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-cinza-500 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@exemplo.com"
                className="w-full border border-areia-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none transition-colors bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-cinza-500 mb-1"
              >
                Senha
              </label>
              <input
                id="senha"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-areia-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-verde-light focus:border-verde-light outline-none transition-colors bg-white"
              />
            </div>

            {erro && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-verde hover:bg-verde/80 disabled:bg-verde/40 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
