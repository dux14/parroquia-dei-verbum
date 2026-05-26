import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Parroquia Dei Verbum",
    template: "%s | Parroquia Dei Verbum",
  },
  description:
    "Parroquia Dei Verbum — Arquidiócesis de Bogotá. Comunidad de fe, servicio y amor. Calle 106 A No. 59-26, Bogotá.",
  metadataBase: new URL("https://dei-verbum-web.vercel.app"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Parroquia Dei Verbum",
    description:
      "Comunidad de fe, servicio y amor en la Arquidiócesis de Bogotá.",
    siteName: "Parroquia Dei Verbum",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
