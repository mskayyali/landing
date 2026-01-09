import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interface Studies | Saleh Kayyali",
  description: "Explore human interfaces, software, and digital culture—past, present, and future—one video at a time.",
};

export default function InterfaceStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}