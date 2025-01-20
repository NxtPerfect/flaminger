import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Flaminger - supercharged job search",
  description: "Search jobs with our revolutionary and supercharged pro-employee system. Never again wonder why you got rejected, it's all in black and white!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Header />
        <main className="flex flex-col items-center px-24 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
