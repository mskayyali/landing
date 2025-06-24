import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import Script from 'next/script';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover'
};

export const metadata: Metadata = {
  title: "Saleh Kayyali - Product & UX Designer",
  description: "London-based designer and developer with 12+ years of experience in software design. Currently working in financial software design.",
  keywords: ["Product Design", "UX Design", "Software Design", "Financial Software", "UI/UX", "Design Systems"],
  authors: [{ name: "Saleh Kayyali" }],
  creator: "Saleh Kayyali",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://mskayyali.com",
    title: "Saleh Kayyali - Product & UX Designer",
    description: "London-based designer and developer with 12+ years of experience in software design.",
    siteName: "Saleh Kayyali",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saleh Kayyali - Product & UX Designer",
    description: "London-based designer and developer with 12+ years of experience in software design.",
    creator: "@mskayyali",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://mskayyali.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetBrainsMono.variable}>
      <body suppressHydrationWarning>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "hr47ief3ei");
            `
          }}
        />
        {children}
      </body>
    </html>
  );
}
