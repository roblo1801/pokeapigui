import React from "react";
import CardsClient from "./CardsClient";

type Props = {
  params: {
    cards: string;
  };
};

async function PokemonCollection({ params }: Props) {
  const allPoke = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=!set.id:${params.cards}`,
    {
      headers: {
        "X-Api-Key": "35688f31-3b82-46e8-88e9-c0775c640cd8",
      },
      cache: "force-cache",
    }
  ).then(async (res) => await res.json());

  return (
    <>
      <div className="pokefont text-center my-2">Cards Collection</div>
      <CardsClient allPoke={allPoke.data} />
    </>
  );
}

export default PokemonCollection;
