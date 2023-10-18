import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import type { Metadata } from "next";
import { IconCherry, IconMapPinShare } from "@tabler/icons-react";
import Hamburger from "@/components/custom/hamburger";
import Link from "next/link";
import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { FetchedPokemonProvider } from "@/store/FetchedPokemonProvider";
import { AuroraBackgroundProvider } from "@nauverse/react-aurora-background";

export const metadata: Metadata = {
  title: "PokeApi Explorer",
  description: "PokeApi Explorer built with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pokemonData = await fetch(
  //   `https://pokeapi.co/api/v2/pokemon?limit=${1008}&offset=${0}`,
  //   {
  //     cache: "force-cache",
  //   }
  // )
  //   .then(async (res) => await res.json())
  //   .then((res: { results: { name: string; url: string }[] }) =>
  //     Promise.all(
  //       res.results.map(
  //         async (e) =>
  //           await fetch(e.url, { cache: "force-cache" }).then(
  //             async (res) => await res.json()
  //           )
  //       )
  //     )
  //   );

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>

      <body className="flex flex-col p-0 m-0 bg-gray-300">
        <MantineProvider
          forceColorScheme="light"
          theme={{
            shadows: {
              lg: "4px 4px 4px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          <header className="w-full flex flex-row justify-between px-4 bg-red-500">
            <h1>
              <Link href="/">PokeApi Explorer</Link>
            </h1>
          </header>

          <main className="flex flex-col min-h-content p-0">{children}</main>

          <ScrollToTopButton />
          <footer className="text-center items-center self-center fixed bottom-0 text-white bg-black w-full">
            <Footer />
          </footer>
        </MantineProvider>
      </body>
    </html>
  );
}
