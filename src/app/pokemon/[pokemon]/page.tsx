import React from "react";
import Image from "next/image";
import PokemonType from "@/components/custom/pokemontype";
import { IconComet, IconHandGrab, IconLayoutGrid } from "@tabler/icons-react";
import Attributes from "@/components/custom/attributes";
import PokemonEvolve from "@/components/custom/pokemonevolve";
import { Badge, Center } from "@mantine/core";

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

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function PokemonInfo({ params }: { params: { pokemon: string } }) {
  const { pokemon } = params;
  const pokemonData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  ).then(async (res) => {
    if (res.status === 404) {
      return null;
    }

    const data = await res.json();

    return data;
  });

  if (!pokemonData) return <Center>No Pokemon Found</Center>;

  const pokemonSpeciesData = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.species.name}`
  ).then(async (res) => {
    const data = await res.json();
    return data;
  });

  const pokemonEvolutionChainData = await fetch(
    pokemonSpeciesData.evolution_chain.url
  ).then(async (res) => {
    const data = await res.json();
    return data;
  });

  // const pokemonData = await P.getPokemonByName(pokemon);
  // const pokemonSpeciesData = await P.getPokemonSpeciesByName(pokemon);

  // const pokemonEvolutionChainData = pokemonSpeciesData.evolution_chain
  //   ? await P.getResource(pokemonSpeciesData.evolution_chain.url)
  //   : null;

  //   console.log(pokemonEvolutionChainData.chain.evolves_to.species);

  return (
    <div className="relative p-2.5 pb-10">
      <div className="absolute top-2.5 right-2.5 font-bold text-2xl">
        #{pokemonData.id}
      </div>
      <h2 className="font-bold text-3xl">
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
            children: (
              <div className="flex gap-2">
                {pokemonData.abilities.map(
                  (ability: { ability: { name: string } }) => (
                    <div key={ability.ability.name} className="text-2xl">
                      {capitalize(ability.ability.name)}
                    </div>
                  )
                )}
              </div>
            ),
          },
          {
            key: "Held Items",
            label: "Held Items",
            extra: <IconHandGrab />,
            children: pokemonData.held_items.map(
              (heldItem: { item: { name: string } }) => (
                <div key={heldItem.item.name} className="text-2xl">
                  {capitalize(heldItem.item.name)}
                </div>
              )
            ),
          },
          {
            key: "Moves",
            label: "Moves",
            extra: <IconLayoutGrid />,
            children: pokemonData.moves.map(
              (move: {
                version_group_details: {
                  level_learned_at: number;
                  move_learn_method: { name: string; url: string };
                  version_group: { name: string; url: string };
                }[];
                move: { name: string };
              }) => (
                <div key={move.move.name} className="flex gap-1 text-2xl">
                  {capitalize(move.move.name)}{" "}
                  {move.version_group_details.find(
                    (e) =>
                      e.version_group.name ===
                        "brilliant-diamond-and-shining-pearl" &&
                      e.move_learn_method
                  ) ? (
                    move.version_group_details.find(
                      (e) =>
                        e.version_group.name ===
                        "brilliant-diamond-and-shining-pearl"
                    )?.move_learn_method.name === "level-up" ? (
                      <Badge variant="" radius="sm">
                        Lv{" "}
                        {
                          move.version_group_details.find(
                            (e) =>
                              e.version_group.name ===
                              "brilliant-diamond-and-shining-pearl"
                          )?.level_learned_at
                        }
                      </Badge>
                    ) : null
                  ) : null}
                </div>
              )
            ),
          },
        ]}
      ></Attributes>

      {pokemonEvolutionChainData.chain.evolves_to.length > 0 ? (
        <>
          <h2>Evolution Chain</h2>
          <div className="flex flex-wrap items-center justify-center">
            <PokemonEvolve
              name={
                pokemonEvolutionChainData.chain.species.name !==
                pokemonData.name
                  ? pokemonEvolutionChainData.chain.species.name
                  : pokemonData.name
              }
            />
            <div className="flex flex-col">
              {pokemonEvolutionChainData.chain.evolves_to.map(
                (evolution: {
                  evolves_to: { species: { name: string } }[];
                  species: { name: string };
                }) => (
                  <div
                    key={evolution.species.name}
                    className="flex flex-wrap items-center justify-center"
                  >
                    <PokemonEvolve name={evolution.species.name} />
                    {evolution.evolves_to.length > 0 ? (
                      <div className="flex flex-col">
                        {evolution.evolves_to.map(
                          (e: { species: { name: string } }) => (
                            <PokemonEvolve
                              name={e.species.name}
                              key={e.species.name}
                            />
                          )
                        )}
                      </div>
                    ) : null}
                  </div>
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <Center>Does Not Evolve</Center>
      )}
    </div>
  );
}

export default PokemonInfo;
