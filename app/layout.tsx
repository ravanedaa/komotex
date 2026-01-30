import SmoothScroll from "@/components/SmoothScroll";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KomoTex | Uniformes Corporativos Premium",
  description: "Vista sua marca com qualidade. Uniformes corporativos que fortalecem a identidade da sua empresa e transmitem profissionalismo.",
  keywords: "uniformes corporativos, uniformes personalizados, roupa para empresas, branding visual, moda corporativa",
  openGraph: {
    title: "KomoTex | Uniformes Corporativos Premium",
    description: "Uniformes que fortalecem a identidade da sua marca.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "KomoTex - Vesta sua marca",
    description: "Uniformes corporativos de alta qualidade para sua empresa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className="antialiased text-black bg-white"
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
