import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comma Reader: Book reader with Apple Intelligence powers",
  description: "A privacy-first EPUB and PDF reader for iOS with Apple Intelligence features. Read, highlight, and organize your books with complete privacy - all processing happens on your device.",
};

export default function CommaReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
