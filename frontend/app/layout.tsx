import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Hospital Price & Facilities Comparison",
  description: "Compare nearby hospitals by facilities, estimated prices, specialties, emergency support, and official links."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
