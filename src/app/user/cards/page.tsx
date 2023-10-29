import React from "react";
import CardsClient from "./CardsClient";

type Props = {};

async function PokemonCollection({}: Props) {
  return (
    <>
      <div className="pokefont text-center my-2">Cards Collection</div>
      <CardsClient />
    </>
  );
}

export default PokemonCollection;
