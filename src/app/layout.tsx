import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chef Claude’s Old-School Recipe Book",
  description: "A nostalgic, handwritten recipe app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Fira+Code&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[var(--color-bg-paper)] bg-cover bg-center"
        style={{
          backgroundImage: `url('/aged-paper-texture.jpg')`,
        }}
      >
        <nav className="p-4 relative bg-[var(--color-bg-torn)] border-b-4 border-[var(--color-border-torn)] shadow-sm">
          <div className="absolute top-0 left-0 w-full h-2 border-b-2 border-dashed border-[var(--color-doodle)]" />
          <div className="flex items-center justify-center gap-2">
            <img
              src="/chef-claude-icon.png"
              alt="Chef Claude"
              className="w-9 h-11 sepia"
            />
            <h1 className="text-3xl sm:text-4xl font-semibold italic pt-6 pr-4 pb-6 pl-4 font-[var(--font-handwritten)] text-[var(--color-text-primary)]">
              Chef Mistral’s 📖
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-2 border-t-2 border-dashed border-[var(--color-doodle)]" />
        </nav>
        <main className="flex-grow p-6">{children}</main>
      </body>
    </html>
  );
}
