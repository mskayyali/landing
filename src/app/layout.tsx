import type { Metadata } from "next";
import { Geist_Mono } from 'next/font/google';
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

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
    <html lang="en" className={geistMono.variable}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
