import { Pokemon } from "@/types/PokemonType";
import { Card } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
// import PokemonType from "./pokemontype";

const pokemonTypesAndColors: { type: string; color: string }[] = [
  { type: "normal", color: "#a8a878" },
  { type: "fire", color: "#f08030" },
  { type: "water", color: "#6890f0" },
  { type: "electric", color: "#ffff00" },
  { type: "grass", color: "#78c850" },
  { type: "ice", color: "#00ffff" },
  { type: "fighting", color: "#a52a2a" },
  { type: "poison", color: "#a040a0" },
  { type: "ground", color: "#d2b074" },
  { type: "flying", color: "#a890f0" },
  { type: "psychic", color: "#f85888" },
  { type: "bug", color: "#b8c145" },
  { type: "rock", color: "#a9a9a9" },
  { type: "ghost", color: "#ffffff" },
  { type: "dragon", color: "#7ac749" },
  { type: "dark", color: "#000000" },
  { type: "steel", color: "#b8b8d0" },
  { type: "fairy", color: "#ee99ac" },
];

export default function PokemonCards({ pokemon }: { pokemon: Pokemon }) {
  const types = pokemon.types.map(
    (type: { type: { name: string } }) => type.type.name
  );

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      {/* <Card className={`${pokemon.types[0].type.name}`} withBorder>
       */}
      <Card
        style={{
          background:
            types.length > 1
              ? `linear-gradient(129deg, ${
                  pokemonTypesAndColors.find((type) => type.type === types[0])
                    ?.color
                }, ${
                  pokemonTypesAndColors.find((type) => type.type === types[1])
                    ?.color
                })`
              : pokemonTypesAndColors.find((type) => type.type === types[0])
                  ?.color || "",
          backdropFilter: "blur(10px)",
        }}
        withBorder
      >
        {pokemon.sprites.other["official-artwork"].front_default ? (
          <div className="flex flex-row justify-center">
            <Image
              src={pokemon.sprites.other[
                "official-artwork"
              ].front_default.substring(
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/"
                  .length
              )}
              width={50}
              height={50}
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
          {/* {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} */}
        </div>
        {/* <div className="flex flex-row flex-wrap justify-evenly gap-1">
          {pokemon.types.map((type: { type: { name: string } }) => (
            <PokemonType key={type.type.name} type={type.type.name} />
          ))}
        </div> */}
      </Card>
    </Link>
  );
}
