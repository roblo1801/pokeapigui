import { Pokemon } from "@/types/PokemonType";
import React from "react";
import Image from "next/image";

type Props = {
  pokemonData: Pokemon;
};

function PokemonImage({ pokemonData }: Props) {
  return (
    <div className="flex justify-center">
      {pokemonData.sprites.other["official-artwork"].front_default ? (
        <Image
          src={pokemonData.sprites.other["official-artwork"].front_default}
          alt={pokemonData.name}
          width={300}
          height={300}
        />
      ) : (
        <div>No Image Found</div>
      )}
    </div>
  );
}

export default PokemonImage;
