import type { Metadata } from "next";
import { Zen_Kaku_Gothic_Antique, Inter } from "next/font/google";
import Script from "next/script";
import FloatingButtons from "@/components/FloatingButtons";
import RecaptchaProvider from "@/components/RecaptchaProvider";
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
    <html lang="ja" className={`${zenKaku.variable} ${inter.variable}`} suppressHydrationWarning>
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
        <RecaptchaProvider>
          {children}
        </RecaptchaProvider>
        <FloatingButtons />
      </body>
    </html>
  );
}
