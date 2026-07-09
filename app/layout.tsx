import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Vinted Profit Tracker", description: "Produse, listări și profit într-un singur loc" };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ro"><body>{children}</body></html>;
}
