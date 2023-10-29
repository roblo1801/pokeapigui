import { Pokemon } from "@/types/PokemonType";
import { Card } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import PokemonType from "./pokemontype";

export default function PokemonCards({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Link href={`/pokemon/${pokemon.name}`} className="w-48">
      <Card className={`${pokemon.types[0].type.name}`} withBorder>
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
        <div
          style={{
            textShadow: "0px 0px 5px white",
          }}
          className="flex flex-row justify-center text-2xl font-bold"
        >
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
