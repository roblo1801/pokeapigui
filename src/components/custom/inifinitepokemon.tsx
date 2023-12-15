"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import DomPurify from "isomorphic-dompurify";
// import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroll from "react-infinite-scroller";

import {
  Accordion,
  ActionIcon,
  Button,
  Card,
  Center,
  Checkbox,
  Drawer,
  Group,
  Input,
  Loader,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import PokemonType from "./pokemontype";
import Image from "next/image";
import { useState } from "react";
import { Pokemon } from "@/types/PokemonType";
import { useDisclosure } from "@mantine/hooks";
import { capitalize } from "@/utils/functions/capitalize";
import {
  IconSortAscending,
  IconSortDescending,
  IconStar,
} from "@tabler/icons-react";
import SortMenu from "./SortMenu";

interface FiltersState {
  type: string[];
  generation: string[];
  legendary: boolean;
  hasEvolve: boolean;
}

const legendaryPokemonIds = [
  144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 377, 378, 379, 380,
  381, 382, 383, 384, 385, 386, 480, 481, 482, 483, 484, 485, 486, 487, 488,
  489, 490, 491, 492, 493, 494, 638, 639, 640, 641, 642, 643, 644, 645, 646,
  647, 648, 649, 716, 717, 718, 719, 720, 721, 785, 786, 787, 788, 789, 790,
  791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805,
  806, 807, 808, 809, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898,
  905, 1001, 1002, 1003, 1004, 1007, 1008, 1014, 1015, 1016, 1017,
];

const generations = [
  "Gen I",
  "Gen II",
  "Gen III",
  "Gen IV",
  "Gen V",
  "Gen VI",
  "Gen VII",
  "Gen VIII",
  "Gen IX",
];

const types = [
  "grass",
  "poison",
  "fire",
  "flying",
  "water",
  "bug",
  "normal",
  "electric",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "steel",
  "ice",
  "ghost",
  "dragon",
  "dark",
];

const fetchPokemons = async (offset: number, limit: number) => {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${
      offset > 900 ? 17 : limit
    }&offset=${offset}`
  )
    .then(async (res) => await res.json())
    .then((res: { results: { name: string; url: string }[] }) =>
      Promise.all(
        res.results.map(
          async (e) => await fetch(e.url).then(async (res) => await res.json())
        )
      )
    );
  return data;
};

const pageSize = 100;

const InfinitePokemon = () => {
  const [query, setQuery] = useState("");
  const [sortStat, setSortStat] = useState("");
  const [sortDesc, setSortDesc] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    type: [],
    generation: [],
    legendary: false,
    hasEvolve: false,
  });

  const [opened, toggle] = useDisclosure(false);

  // const slicePokemon = (start: number, end: number) =>
  //   pokemon.slice(start, end);

  const { data, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam = 0 }) => fetchPokemons(pageParam, pageSize),
    // queryFn: ({ pageParam = 0 }) =>
    //   slicePokemon(pageParam, pageSize + pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length < pageSize || pages.length > 10) {
        return;
      }
      return pages.length * pageSize;
    },
  });

  const filteredData: Pokemon[][] | undefined = data?.pages.map(
    (page: Pokemon[]) =>
      page
        .filter((pokemon: Pokemon) =>
          pokemon.name.includes(query.toLowerCase() || "")
        )
        .filter((pokemon) => {
          const types: string[] = pokemon.types.map(
            (type: { type: { name: string } }) => type.type.name
          );
          console.log(filters.type.length);
          if (filters.type.length === 0) return true;

          if (filters.type.length > 0) {
            return types.some((item: string) => filters.type.includes(item));
          }
        })
        .filter((pokemon) => {
          const gens: number[][] = [
            [1, 151],
            [152, 251],
            [252, 386],
            [387, 493],
            [494, 649],
            [650, 721],
            [722, 809],
            [810, 905],
            [906, 1017],
          ];

          if (filters.generation.length === 0) return true;

          if (filters.generation.length > 0) {
            if (
              generations.some((item: string) =>
                filters.generation.includes(item)
              )
            ) {
              if (filters.generation.includes("Gen I"))
                return gens[0][0] <= pokemon.id && pokemon.id <= gens[0][1];
              if (filters.generation.includes("Gen II"))
                return gens[1][0] <= pokemon.id && pokemon.id <= gens[1][1];
              if (filters.generation.includes("Gen III"))
                return gens[2][0] <= pokemon.id && pokemon.id <= gens[2][1];
              if (filters.generation.includes("Gen IV"))
                return gens[3][0] <= pokemon.id && pokemon.id <= gens[3][1];
              if (filters.generation.includes("Gen V"))
                return gens[4][0] <= pokemon.id && pokemon.id <= gens[4][1];
              if (filters.generation.includes("Gen VI"))
                return gens[5][0] <= pokemon.id && pokemon.id <= gens[5][1];
              if (filters.generation.includes("Gen VII"))
                return gens[6][0] <= pokemon.id && pokemon.id <= gens[6][1];
              if (filters.generation.includes("Gen VIII"))
                return gens[7][0] <= pokemon.id && pokemon.id <= gens[7][1];
              if (filters.generation.includes("Gen IX"))
                return gens[8][0] <= pokemon.id && pokemon.id <= gens[8][1];
            }
          }
        })
        .filter((pokemon) => {
          if (filters.legendary) {
            return legendaryPokemonIds.includes(pokemon.id);
          }
          return true;
        })
  );

  if (!data || !filteredData) {
    return (
      <Center>
        <Stack align="center">
          <Loader />
          <div>Loading</div>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  function toggleLegendary() {
    setFilters((prevFilters) => ({
      ...prevFilters,
      legendary: !prevFilters.legendary,
    }));
  }

  return (
    <div className="flex flex-col mx-2 gap-4">
      <Group gap={10}>
        <Input
          placeholder="Search for Pokemon"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(DomPurify.sanitize(e.target.value))
          }
          style={{ flex: "2" }}
        />
        <SortMenu setSortStat={setSortStat}>
          <Button
            style={{
              background: "lightblue",
              border: "1px solid black",
              color: "black",
            }}
          >
            Sort
          </Button>
        </SortMenu>
        <ActionIcon
          size="lg"
          style={{
            background: sortDesc ? "green" : "red",
            border: "1px solid black",
          }}
          onClick={() => setSortDesc(!sortDesc)}
        >
          {sortDesc ? <IconSortAscending /> : <IconSortDescending />}
        </ActionIcon>
      </Group>
      <Group gap={10}>
        <Button
          style={{
            background: !filters.legendary
              ? "purple"
              : `
            repeating-linear-gradient(
              45deg,
              #000,
              #000 10px,
              #fff 10px,
              #fff 20px
            )
          `,

            border: "1px solid black",
          }}
          onClick={toggleLegendary}
        >
          Legendary{" "}
          <IconStar
            style={{
              fill: "gold",
            }}
          />
        </Button>
        <Button
          style={{
            background: "black",
          }}
          onClick={toggle.toggle}
        >
          Filter
        </Button>
      </Group>
      <Drawer
        position="bottom"
        opened={opened}
        onClose={toggle.close}
        title="Filter"
      >
        <Group>
          <Accordion w="full">
            <Accordion.Item key={"types"} value="types">
              <Accordion.Control>Types</Accordion.Control>
              <Accordion.Panel>
                <Group>
                  {types.map((type) => (
                    <Group key={type} pr={10} gap={4}>
                      <Checkbox
                        checked={filters.type.includes(type)}
                        onChange={(event) => {
                          console.log(filters);

                          if (event.currentTarget.checked) {
                            return setFilters((prevFilters) => ({
                              ...prevFilters,
                              type: prevFilters.type.concat(type),
                            }));
                          } else if (filters.type.length === 1) {
                            setFilters((prevFilters) => ({
                              ...prevFilters,
                              type: [],
                            }));
                          }
                          return setFilters((prevFilters) => ({
                            ...prevFilters,
                            type: prevFilters.type.splice(
                              prevFilters.type.indexOf(type),
                              1
                            ),
                          }));
                        }}
                      />
                      <div className={type.concat(" type")}>
                        {capitalize(type)}
                      </div>
                    </Group>
                  ))}
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item key={"generations"} value="generations">
              <Accordion.Control>Generations</Accordion.Control>
              <Accordion.Panel>
                <Group>
                  {generations.map((gen) => (
                    <Group key={gen} pr={10} gap={4}>
                      <Checkbox
                        checked={filters.generation.includes(gen)}
                        onChange={(event) => {
                          if (event.currentTarget.checked) {
                            return setFilters((prevFilters) => ({
                              ...prevFilters,
                              generation: prevFilters.generation.concat(gen),
                            }));
                          } else if (filters.generation.length === 1) {
                            setFilters((prevFilters) => ({
                              ...prevFilters,
                              generation: [],
                            }));
                          }
                          return setFilters((prevFilters) => ({
                            ...prevFilters,
                            generation: prevFilters.generation.splice(
                              prevFilters.generation.indexOf(gen),
                              1
                            ),
                          }));
                        }}
                      />
                      <div>{gen}</div>
                    </Group>
                  ))}
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Group>
      </Drawer>
      <div className="py-2.5">
        <InfiniteScroll
          //   next={fetchNextPage}
          pageStart={0}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage || false}
          loader={
            <Center mb={10}>
              <Stack align="center" p={10}>
                <Loader />
                <div>Loading Please Wait...</div>
              </Stack>
            </Center>
          }
          //   dataLength={
          //     data?.pages.reduce((total, page) => total + page.length, 0) || 0
          //   }
        >
          <div className="flex justify-center w-full">
            <div className="grid  mb-10 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
              {filteredData
                .flat(1)
                .sort((a, b) => {
                  const statA =
                    a.stats.find((stat) => stat.stat.name === sortStat)
                      ?.base_stat || 0;
                  const statB =
                    b.stats.find((stat) => stat.stat.name === sortStat)
                      ?.base_stat || 0;

                  if (sortDesc) return statB - statA;

                  return statA - statB;
                })
                .map((pokemon: Pokemon, index) => (
                  <PokemonCards pokemon={pokemon} key={pokemon.name + index} />
                ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

function PokemonCards({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <Card className={`${pokemon.types[0].type.name}`} withBorder>
        {pokemon.sprites.other["official-artwork"].front_default ? (
          <div className="flex flex-row justify-center">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
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

export default InfinitePokemon;
