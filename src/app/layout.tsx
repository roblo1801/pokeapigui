import "./globals.css";
import type { Metadata } from "next";
import {
  IconCherry,
  IconMapPinShare,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import Hamburger from "@/components/custom/hamburger";
import Link from "next/link";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "PokeApi Explorer",
  description: "PokeApi Explorer built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{ minHeight: "100dvh" }}
          className="flex flex-col p-0 bg-gray-300"
        >
          <header className="w-screen flex flex-row justify-between px-4 bg-red-500">
            <h1>
              <Link href="/">PokeApi Explorer</Link>
            </h1>
            <Hamburger />
            <nav className="sm:flex flex-wrap items-center text-base justify-center hidden">
              <a>
                <IconMapPinShare size="2rem" />
                <div>Endpoints</div>
              </a>
              <a className="hide">
                <IconCherry size="2rem" />
                <div>Berries</div>
              </a>
              <a className="hide">
                <IconCherry size="2rem" />
                <div>Berries</div>
              </a>
              <a className="hide">
                <IconCherry size="2rem" />
                <div>Berries</div>
              </a>
            </nav>
          </header>
          <main className="h-full flex flex-col min-h-screen p-0">
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}
