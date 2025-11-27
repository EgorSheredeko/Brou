// src/app/layout.js
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeartsPortal from "@/components/HeartsPortal";

export const metadata = {
  title: "Мой милый бро",
  description: "Smooth scroll site with animations and cute hearts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
        <HeartsPortal />
      </body>
    </html>
  );
}
