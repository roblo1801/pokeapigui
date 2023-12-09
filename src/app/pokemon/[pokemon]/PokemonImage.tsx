"use client";
import { Pokemon } from "@/types/PokemonType";
import { useContext } from "react";
import Image from "next/image";
import {
  ShinyContext,
  ShinyContextType,
  ShinyProvider,
} from "@/store/ShinyContext";

type Props = {
  pokemonData: Pokemon;
};

function PokemonImage({ pokemonData }: Props) {
  const { shiny } = useContext(ShinyContext) as ShinyContextType;

  return (
    <div className="flex justify-center">
      {shiny ? (
        pokemonData.sprites.other["official-artwork"].front_shiny ? (
          <Image
            src={pokemonData.sprites.other["official-artwork"].front_shiny}
            alt={pokemonData.name}
            width={300}
            height={300}
          />
        ) : (
          <div>No Image Found</div>
        )
      ) : pokemonData.sprites.other["official-artwork"].front_default ? (
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
