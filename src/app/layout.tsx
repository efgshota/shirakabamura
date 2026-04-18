import type { Metadata } from "next";
import { Zen_Kaku_Gothic_Antique, Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import FloatingButtons from "@/components/FloatingButtons";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_Antique({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zen-kaku",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const siteUrl = "https://shirakabamura.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "白樺村｜白樺湖周辺での移住・開業・くらしをサポート",
    template: "%s｜白樺村",
  },
  description:
    "「50年先も続くレイクリゾート」をめざす白樺村。白樺湖周辺での移住・開業・不動産物件・ロケーションレンタルまで、地域での新たなくらしを幅広くサポートします。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "白樺村",
    title: "白樺村｜白樺湖周辺での移住・開業・くらしをサポート",
    description:
      "「50年先も続くレイクリゾート」をめざす白樺村。白樺湖周辺での移住・開業・不動産物件・ロケーションレンタルまで、地域での新たなくらしを幅広くサポートします。",
  },
  twitter: {
    card: "summary_large_image",
    title: "白樺村｜白樺湖周辺での移住・開業・くらしをサポート",
    description:
      "「50年先も続くレイクリゾート」をめざす白樺村。白樺湖周辺での移住・開業・不動産物件・ロケーションレンタルまで、地域での新たなくらしを幅広くサポートします。",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zenKaku.variable} ${inter.variable} ${notoSansJP.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8SE19JC0CG"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8SE19JC0CG');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "白樺村",
          url: siteUrl,
          description: "白樺湖周辺での移住・開業・くらしをサポート",
        }} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "白樺村",
          url: siteUrl,
          logo: `${siteUrl}/images/common/logo.svg`,
        }} />
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}
