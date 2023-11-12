import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search for Pokemon | Pokedex Replica",
  description: "Search for Pokemon",
};

export default async function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
