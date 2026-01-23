import { capitalize } from "@/utils/functions/capitalize";
import type { Metadata } from "next";

type Props = {
  params: { card: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Import local TCG data utilities
  const { getTCGCard } = await import('@/utils/tcgDataLoader');
  const cardData = await getTCGCard(params.card);

  if (!cardData || !cardData.data) {
    return {
      title: "Card Not Found | Pokedex Replica",
    };
  }

  return {
    title:
      cardData.data.name +
      " - " +
      cardData.data.set.name +
      " | Pokedex Replica",
  };
}

export default async function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
