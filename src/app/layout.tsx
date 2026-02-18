import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "白樺村｜移住・開業など、白樺湖周辺地域でのくらしを幅広くサポート",
  description:
    "白樺湖周辺地域での移住・開業をサポート。物件情報やお役立ち情報をお届けします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
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
      <body>{children}</body>
    </html>
  );
}
