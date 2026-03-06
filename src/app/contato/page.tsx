import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Liberty Imóveis. Atendimento por WhatsApp, telefone e e-mail.",
};

export default function ContatoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-14">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-verde leading-tight">
          Contato
        </h1>
        <p className="mt-4 text-lg text-cinza-400 max-w-2xl mx-auto">
          Estamos prontos para atendê-lo. Escolha a forma de contato que preferir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp */}
        <a
          href="https://wa.me/5548998604988"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl shadow-md border border-areia-200 p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="w-14 h-14 mx-auto rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
            <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-bold text-cinza-700 mb-1">WhatsApp</h3>
          <p className="text-sm text-cinza-400">(48) 99860-4988</p>
        </a>

        {/* Telefone */}
        <a
          href="tel:+5548998604988"
          className="bg-white rounded-2xl shadow-md border border-areia-200 p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="w-14 h-14 mx-auto rounded-xl bg-verde/10 flex items-center justify-center mb-4 group-hover:bg-verde/20 transition-colors">
            <svg className="w-7 h-7 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-bold text-cinza-700 mb-1">Telefone</h3>
          <p className="text-sm text-cinza-400">(48) 99860-4988</p>
        </a>

        {/* Email */}
        <a
          href="mailto:libertyimoveis3@gmail.com"
          className="bg-white rounded-2xl shadow-md border border-areia-200 p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="w-14 h-14 mx-auto rounded-xl bg-verde/10 flex items-center justify-center mb-4 group-hover:bg-verde/20 transition-colors">
            <svg className="w-7 h-7 text-verde" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-bold text-cinza-700 mb-1">E-mail</h3>
          <p className="text-sm text-cinza-400">libertyimoveis3@gmail.com</p>
        </a>
      </div>

      {/* Endereço e horário */}
      <div className="mt-12 bg-white rounded-2xl shadow-md border border-areia-200 p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-cinza-700 mb-4">Nosso Endereço</h2>
        <p className="text-cinza-600">Rua Otaviano Dadam, 7 — Centro</p>
        <p className="text-cinza-500">São João Batista — SC, 88240-000</p>
        <p className="text-xs text-cinza-400 mt-3">Seg à Sex: 9h — 18h | Sáb: 9h — 12h</p>

        <div className="mt-6 rounded-xl overflow-hidden border border-areia-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.8!2d-48.8474!3d-27.2733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua+Otaviano+Dadam%2C+7+-+Centro%2C+S%C3%A3o+Jo%C3%A3o+Batista+-+SC!5e0!3m2!1spt-BR!2sbr!4v1"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Liberty Imóveis"
          />
        </div>
      </div>
    </div>
  );
}
