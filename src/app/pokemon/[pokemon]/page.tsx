import {
  IconComet,
  IconHandGrab,
  IconLayoutGrid,
  IconMap,
} from "@tabler/icons-react";
import {
  capitalize,
  decimetersToFeetAndInches,
  hectogramsToLbs,
} from "@/utils/functions/capitalize";
import dynamic from "next/dynamic";
import { Stack, Table } from "@mantine/core";

import ShinyButton from "@/components/custom/ShinyButton";
import Stats from "@/components/custom/Stats";
import { Pokemon, PokemonMove, VersionGroupDetails } from "@/types/PokemonType";
import LearnedMoves from "@/components/custom/LearnedMoves";

const DynamicPokemonType = dynamic(
  () => import("@/components/custom/pokemontype"),
  {
    ssr: false,
  }
);

const DynamicAddToPokemonButton = dynamic(
  () => import("@/components/custom/AddToPokemonButton"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const DynamicAttributes = dynamic(
  () => import("@/components/custom/attributes"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const DynamicPokemonEvolve = dynamic(
  () => import("@/components/custom/pokemonevolve"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

const DynamicBadge = dynamic(() => import("./Badged"), { ssr: false });

const DynamicImage = dynamic(() => import("./PokemonImage"), { ssr: false });

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

  if (!pokemonData)
    return <div className="flex items-center">No Pokemon Found</div>;

  const pokemonSpeciesData = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.species.name}`
  ).then(async (res) => {
    const data = await res.json();
    return data;
  });

  const pokemonLocationData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonData.id}/encounters`
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

  return (
    <div className="relative p-2.5 pb-10">
      <div className="absolute top-2.5 right-2.5 font-bold text-2xl">
        #{pokemonData.id}
      </div>

      <Stack align="flex-start">
        <h2 className="font-bold text-3xl">{capitalize(pokemonData.name)}</h2>
        <ShinyButton />
      </Stack>
      <DynamicImage pokemonData={pokemonData} />

      <DynamicAddToPokemonButton pokemon={pokemonData} />

      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-row gap-1">
          {pokemonData.types.map((type: { type: { name: string } }) => (
            <DynamicPokemonType key={type.type.name} type={type.type.name} />
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
      <DynamicAttributes
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
            key: "Locations",
            label: "Locations",
            extra: <IconMap />,
            children: pokemonLocationData.map(
              (location: {
                location_area: { name: string; url: string };
                version_details: {
                  encounter_details: {
                    chance: number;
                    condition_values: { name: string; url: string }[];
                  };
                  max_chance: number;
                  version: { name: string; url: string };
                }[];
              }) => (
                <div
                  key={location.location_area.name}
                  className="flex gap-1 text-2xl"
                >
                  {location.location_area.name
                    .split("-")
                    .map((x) => capitalize(x))
                    .join(" ")}{" "}
                  -{" "}
                  {location.version_details
                    .map((version) => capitalize(version.version.name))
                    .join("/")}
                </div>
              )
            ),
          },
          {
            key: "Learned Moves",
            label: "Learned Moves",
            extra: <IconLayoutGrid />,
            children: (
              <LearnedMoves
                moves={pokemonData.moves
                  .filter((move: PokemonMove) =>
                    move.version_group_details.some((e) => e.level_learned_at)
                  )
                  .filter((move: PokemonMove) => {
                    if (move.version_group_details[0].level_learned_at)
                      return move.version_group_details[0].level_learned_at > 0;
                  })
                  .sort((a: PokemonMove, b: PokemonMove) => {
                    const aLevelLearnt =
                      a.version_group_details[0].level_learned_at || 0;
                    const bLevelLearnt =
                      b.version_group_details[0].level_learned_at || 0;

                    return aLevelLearnt - bLevelLearnt;
                  })}
              />
            ),
          },
          {
            key: "Teachable Moves",
            label: "Teachable Moves",
            extra: <IconLayoutGrid />,
            children: pokemonData.moves
              .filter((move: PokemonMove) =>
                move.version_group_details.some(
                  (e) => e.move_learn_method.name === "machine"
                )
              )
              .map((move: PokemonMove) => (
                <div key={move.move.name} className="flex gap-1 text-2xl">
                  {move.move.name
                    .split("-")
                    .map((e) => capitalize(e))
                    .join(" ")}
                </div>
              )),
          },
        ]}
      />
      <Stats
        stats={pokemonData.stats.map(
          (stat: { stat: { name: string }; base_stat: number }) => {
            return {
              name: stat.stat.name,
              value: stat.base_stat,
            };
          }
        )}
      />
      {pokemonEvolutionChainData.chain.evolves_to.length > 0 ? (
        <>
          <h2>Evolution Chain</h2>
          <div className="flex flex-wrap items-center justify-center">
            <DynamicPokemonEvolve
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
                    <DynamicPokemonEvolve name={evolution.species.name} />
                    {evolution.evolves_to.length > 0 ? (
                      <div className="flex flex-col">
                        {evolution.evolves_to.map(
                          (e: { species: { name: string } }) => (
                            <DynamicPokemonEvolve
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
        <div className="flex items-center">Does Not Evolve</div>
      )}
    </div>
  );
}

export default PokemonInfo;
