import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Note to Self Memos - Private Voice Notes with Offline AI",
  description: "Transform your voice into organized, searchable notes with complete privacy. Offline AI transcription and smart organization - no data ever leaves your device.",
  keywords: ["voice notes", "AI transcription", "offline app", "privacy", "note taking", "speech to text"],
  openGraph: {
    title: "Note to Self Memos - Private Voice Notes",
    description: "Transform your voice into organized, searchable notes with complete privacy. Offline AI transcription and smart organization.",
    type: "website",
  },
};

export default function NotesToSelfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 