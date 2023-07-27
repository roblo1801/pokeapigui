"use client";

import { Pokemon } from "@/utils/server/server";
import Card from "antd/es/card/Card";
import Link from "next/link";
import PokemonType from "./pokemontype";
import Image from "next/image";

export default function PokemonCards(pokemon: Pokemon) {
  return (
    <Link href={`/pokemon/${pokemon.name}`} className="w-48">
      <Card>
        {pokemon.sprites.front_default ? (
          <div className="flex flex-row justify-center">
            <Image
              src={pokemon.sprites.front_default}
              width={100}
              height={100}
              alt="pokemon"
            />
          </div>
        ) : null}
        <div className="flex flex-row justify-center font-bold">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </div>
        <div className="flex flex-row flex-wrap justify-evenly gap-1">
          {pokemon.types.map((type: { type: { name: string } }) => (
            <PokemonType key={type.type.name} type={type.type.name} />
          ))}
        </div>
      </Card>
    </Link>
  );
}
