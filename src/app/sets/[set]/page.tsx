import { TCGCard } from "@/types/TCGTypes";
import SetsClient from "./CardsClient";
import Image from "next/image";

type Props = {
  params: {
    set: string;
  };
};

export default async function Home({ params }: Props) {
  const cardData = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=!set.id:${params.set}`,
    {
      headers: {
        "X-Api-Key": "35688f31-3b82-46e8-88e9-c0775c640cd8",
      },
      cache: "force-cache",
    }
  ).then(async (res) => await res.json());

  return (
    <>
      <Image
        src={cardData.data[0].set.images.logo}
        alt="Pokeball"
        width={200}
        height={200}
        className="mx-auto"
      />
      <h1 className="text-center text-2xl">
        {cardData.data[0].set.series} - {cardData.data[0].set.name}
      </h1>
      <SetsClient
        cardData={cardData.data.sort(
          (a: TCGCard, b: TCGCard) => parseInt(a.number) - parseInt(b.number)
        )}
      />
    </>
  );
}
