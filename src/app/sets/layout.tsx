import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search for Pokemon Cards | Pokedex Replica",
  description: "Search for Pokemon Cards",
};

export default async function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
