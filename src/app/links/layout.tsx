import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links — Liberty Imóveis",
  robots: { index: false, follow: false },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header, footer, .fixed.bottom-6.right-6 { display: none !important; }
            main { padding-top: 0 !important; }
          `,
        }}
      />
      {children}
    </>
  );
}
