import { TCGCard } from "@/types/TCGTypes";
import SetsClient from "./CardClient";

type Props = {
  params: {
    card: string;
  };
};

export default async function Home({ params }: Props) {
  const cardData = await fetch(
    `https://api.pokemontcg.io/v2/cards/${params.card}`,
    {
      headers: {
        "X-Api-Key": "35688f31-3b82-46e8-88e9-c0775c640cd8",
      },
      cache: "force-cache",
    }
  ).then(async (res) => await res.json());

  const nextCardData = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=set.id:${
      cardData.data.set.id
    } number:${parseInt(cardData.data.number) + 1}`,
    {
      headers: {
        "X-Api-Key": "35688f31-3b82-46e8-88e9-c0775c640cd8",
      },
      cache: "force-cache",
    }
  ).then(async (res) => await res.json());

  const prevCardData = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=set.id:${
      cardData.data.set.id
    } number:${parseInt(cardData.data.number) - 1}`,
    {
      headers: {
        "X-Api-Key": "35688f31-3b82-46e8-88e9-c0775c640cd8",
      },
      cache: "force-cache",
    }
  ).then(async (res) => await res.json());

  return (
    <>
      <SetsClient
        prevCardData={prevCardData.data[0]}
        cardData={cardData.data}
        nextCardData={nextCardData.data[0]}
      />
    </>
  );
}