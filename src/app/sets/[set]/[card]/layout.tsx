import { capitalize } from "@/utils/functions/capitalize";
import type { Metadata } from "next";

type Props = {
  params: { card: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cardData = await fetch(
    `https://api.pokemontcg.io/v2/cards/${params.card}`,
    {
      headers: {
        "X-Api-Key": "35688f31-3b82-46e8-88e9-c0775c640cd8",
      },
    }
  ).then(async (res) => {
    if (res.status !== 200) {
      console.log(res.statusText);
      return "Request Failed";
    }
    return await res.json();
  });

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
