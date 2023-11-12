import { capitalize } from "@/utils/functions/capitalize";
import type { Metadata } from "next";

type Props = {
  params: { set: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const setData = await fetch(
    `https://api.pokemontcg.io/v2/sets/${params.set}`,
    {
      headers: {
        "X-Api-Key": "35688f31-3b82-46e8-88e9-c0775c640cd8",
      },
      cache: "force-cache",
    }
  ).then(async (res) => await res.json());

  console.log(setData);

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
