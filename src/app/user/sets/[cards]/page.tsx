import React from "react";
import CardsClient from "./CardsClient";

type Props = {
  params: {
    cards: string;
  };
};

async function PokemonCollection({ params }: Props) {
  // Import local TCG data utilities
  const { getTCGCardsFromSet } = await import('@/utils/tcgDataLoader');
  const allPoke = await getTCGCardsFromSet(params.cards);

  return (
    <>
      <div className="pokefont text-center my-2">Cards Collection</div>
      <CardsClient allPoke={allPoke.data} />
    </>
  );
}

export default PokemonCollection;
