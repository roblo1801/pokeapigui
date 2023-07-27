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
        <main className="w-full p-2 bg-gray-300">{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
