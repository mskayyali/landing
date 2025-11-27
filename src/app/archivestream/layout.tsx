import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive Stream: Vintage Radio Player",
  description: "A neo-brutalist audio player for the Internet Archive's vintage radio collection.",
};

export default function ArchiveStreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

