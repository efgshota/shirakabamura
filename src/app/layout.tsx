import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

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
    images: [
      {
        url: "/images/top/mv.jpg",
        width: 1280,
        height: 800,
        alt: "白樺湖のほとり、白樺村",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "白樺村｜白樺湖周辺での移住・開業・くらしをサポート",
    description:
      "「50年先も続くレイクリゾート」をめざす白樺村。白樺湖周辺での移住・開業・不動産物件・ロケーションレンタルまで、地域での新たなくらしを幅広くサポートします。",
    images: ["/images/top/mv.jpg"],
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
    <html lang="ja" suppressHydrationWarning>
      <head>
        <Script
          src="https://use.typekit.net/bvi2lkh.js"
          strategy="beforeInteractive"
        />
        <Script id="typekit-load" strategy="beforeInteractive">
          {`try{Typekit.load({async:true});}catch(e){}`}
        </Script>
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
