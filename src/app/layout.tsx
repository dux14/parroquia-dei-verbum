import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parroquia Dei Verbum",
  description:
    "Parroquia Dei Verbum — Arquidiócesis de Bogotá. Calle 106 A No. 59-26.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
