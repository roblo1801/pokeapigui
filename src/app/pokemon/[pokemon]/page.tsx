import React from "react";
import Pokedex from "pokedex-promise-v2";
import Image from "next/image";
import PokemonType from "@/components/custom/pokemontype";
import { IconComet, IconHandGrab, IconLayoutGrid } from "@tabler/icons-react";
import Attributes from "@/components/custom/attributes";
import PokemonEvolve from "@/components/custom/pokemonevolve";

function decimetersToFeetAndInches(n: number): {
  foot: number;
  inch: number;
} {
  const inches = n * 3.93701;
  const foot = Math.floor(inches / 12);
  const inch = Math.floor(inches % 12);
  return { foot, inch };
}

function hectogramsToLbs(n: number): number {
  const conversionFactor = 2.20462262;
  return Math.floor(n * conversionFactor) / 10;
}

const P = new Pokedex();

async function PokemonInfo({ params }: { params: { pokemon: string } }) {
  const { pokemon } = params;
  const pokemonData = await P.getPokemonByName(pokemon);
  const pokemonSpeciesData = await P.getPokemonSpeciesByName(pokemon);

  const pokemonEvolutionChainData = pokemonSpeciesData.evolution_chain
    ? await P.getResource(pokemonSpeciesData.evolution_chain.url)
    : null;

  //   console.log(pokemonEvolutionChainData.chain.evolves_to.species);

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 font-bold text-2xl">
        #{pokemonData.id}
      </div>
      <h2>
        {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
      </h2>
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

      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-row gap-1">
          {pokemonData.types.map((type: { type: { name: string } }) => (
            <PokemonType key={type.type.name} type={type.type.name} />
          ))}
        </div>
        <div className="text-2xl">
          {decimetersToFeetAndInches(pokemonData.height).foot}&apos;
          {decimetersToFeetAndInches(pokemonData.height).inch}&quot;
        </div>
        <div className="text-2xl">
          {hectogramsToLbs(pokemonData.weight)} lbs
        </div>
      </div>
      <Attributes
        items={[
          {
            key: "Abilities",
            label: "Abilities",
            extra: <IconComet />,
            children: pokemonData.abilities.map(
              (ability: { ability: { name: string } }) => (
                <div key={ability.ability.name} className="text-2xl">
                  {ability.ability.name}
                </div>
              )
            ),
          },
          {
            key: "Held Items",
            label: "Held Items",
            extra: <IconHandGrab />,
            children: pokemonData.held_items.map(
              (heldItem: { item: { name: string } }) => (
                <div key={heldItem.item.name} className="text-2xl">
                  {heldItem.item.name}
                </div>
              )
            ),
          },
          {
            key: "Moves",
            label: "Moves",
            extra: <IconLayoutGrid />,
            children: pokemonData.moves.map(
              (move: { move: { name: string } }) => (
                <div key={move.move.name} className="text-2xl">
                  {move.move.name}
                </div>
              )
            ),
          },
          {
            key: "Stats",
            label: "Stats",
          },
        ]}
      ></Attributes>
      {pokemonEvolutionChainData.chain.evolves_to ? (
        <div>
          {pokemonEvolutionChainData.chain.evolves_to.map(
            (evolution: { species: { name: string } }) => (
              <PokemonEvolve
                name={evolution.species.name}
                key={evolution.species.name}
              />
            )
          )}
        </div>
      ) : null}
    </div>
  );
}

export default PokemonInfo;
