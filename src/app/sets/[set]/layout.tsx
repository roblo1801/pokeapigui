import { capitalize } from "@/utils/functions/capitalize";
import type { Metadata } from "next";

type Props = {
  params: { set: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Import local TCG data utilities
  const { getTCGSet } = await import('@/utils/tcgDataLoader');
  const setData = await getTCGSet(params.set);

  return {
    title: setData.data.series + " " + setData.data.name + " | Pokedex Replica",
  };
}

export default async function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
