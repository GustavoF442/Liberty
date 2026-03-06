"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { validateImageFile, sanitizeFileName } from "@/lib/upload";

interface UploadImagensProps {
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
  storageBucket?: string;
  storagePath?: string;
}

export default function UploadImagens({
  urls,
  onUrlsChange,
  storageBucket = "fotos-imoveis",
  storagePath = "imoveis",
}: UploadImagensProps) {
  const [uploading, setUploading] = useState(false);
  const [erro, setErro] = useState("");
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setErro("");
    const novasUrls: string[] = [];
    const errors: string[] = [];

    for (const file of Array.from(files)) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        errors.push(`${file.name}: ${validation.error}`);
        continue;
      }

      const fileName = sanitizeFileName(file.name);
      const filePath = `${storagePath}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(storageBucket)
        .upload(filePath, file);

      if (uploadError) {
        errors.push(`${file.name}: Falha no envio.`);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from(storageBucket)
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        novasUrls.push(publicUrlData.publicUrl);
      }
    }

    if (errors.length > 0) {
      setErro(errors.join(" | "));
    }

    onUrlsChange([...urls, ...novasUrls]);
    setUploading(false);

    if (e.target) {
      e.target.value = "";
    }
  };

  function handleRemove(index: number) {
    const novas = urls.filter((_, i) => i !== index);
    onUrlsChange(novas);
  }

  function handleImageError(url: string) {
    setFailedUrls((prev) => new Set(prev).add(url));
  }

  /* ── Drag & drop reorder ── */
  function handleDragStart(index: number) {
    dragItem.current = index;
  }

  function handleDragEnter(index: number) {
    dragOverItem.current = index;
  }

  function handleDragEnd() {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) return;

    const reordered = [...urls];
    const [removed] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, removed);

    dragItem.current = null;
    dragOverItem.current = null;
    onUrlsChange(reordered);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-cinza-500 mb-1">
        Fotos do imóvel <span className="text-red-500">*</span>
      </label>
      <p className="text-xs text-cinza-300 mb-3">
        Envie pelo menos uma imagem. Arraste para reordenar. Passe o mouse para remover.
      </p>

      <div className="flex items-center gap-4">
        <label className="cursor-pointer inline-flex items-center gap-2 bg-verde text-white px-4 py-2.5 rounded-lg hover:bg-verde/80 transition-colors text-sm font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {uploading ? "Enviando..." : "Selecionar imagens"}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {uploading && (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-verde" />
        )}
      </div>

      {erro && <p className="text-sm text-red-500 mt-2">{erro}</p>}

      {urls.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
          {urls.map((url, index) => (
            <div
              key={`${url}-${index}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className="relative group aspect-square rounded-lg overflow-hidden bg-areia-200 cursor-grab active:cursor-grabbing border-2 border-transparent hover:border-verde-light transition-colors"
            >
              {failedUrls.has(url) ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-areia-400 text-xs p-2 text-center">
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Imagem indisponível
                </div>
              ) : (
                <img
                  src={url}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(url)}
                />
              )}
              {index === 0 && (
                <span className="absolute bottom-1.5 left-1.5 bg-verde text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  CAPA
                </span>
              )}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow"
                title="Remover imagem"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {urls.length > 0 && (
        <p className="text-sm text-green-600 font-medium mt-2">
          {urls.length} foto{urls.length > 1 ? "s" : ""} carregada{urls.length > 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
