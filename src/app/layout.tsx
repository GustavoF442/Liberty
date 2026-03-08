import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://libertyimoveissc.com.br";

export const metadata: Metadata = {
  title: {
    default: "Liberty Imóveis — Imobiliária em São João Batista SC",
    template: "%s | Liberty Imóveis",
  },
  description:
    "Encontre casas, apartamentos e terrenos em São João Batista e região. Atendimento personalizado, equipe certificada e os melhores imóveis para compra e locação.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Liberty Imóveis",
              url: SITE_URL,
              logo: `${SITE_URL}/images/logo/liberty-logo.png`,
              image: `${SITE_URL}/images/logo/liberty-logo.png`,
              description:
                "Imobiliária em São João Batista SC. Casas, apartamentos e terrenos para compra e locação com atendimento personalizado.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "São João Batista",
                addressRegion: "SC",
                addressCountry: "BR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -27.2767,
                longitude: -48.8492,
              },
              telephone: "+55-48-99860-4988",
              areaServed: {
                "@type": "City",
                name: "São João Batista",
                addressRegion: "SC",
                addressCountry: "BR",
              },
              sameAs: [
                "https://instagram.com/libertyimoveis",
                "https://wa.me/5548998604988",
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "08:00",
                closes: "18:00",
              },
            }),
          }}
        />
        <Navbar />
        <main className="min-h-screen pt-20 lg:pt-[100px]">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
