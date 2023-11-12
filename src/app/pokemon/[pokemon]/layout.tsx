import { capitalize } from "@/utils/functions/capitalize";
import type { Metadata } from "next";

type Props = {
  params: { pokemon: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: capitalize(params.pokemon) + " | Pokedex Replica",
  };
}

export default async function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
