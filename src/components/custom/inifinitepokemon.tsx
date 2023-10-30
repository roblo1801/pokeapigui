"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import DomPurify from "isomorphic-dompurify";
// import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroll from "react-infinite-scroller";

import {
  Accordion,
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
import { useContext, useMemo, useState } from "react";
import { FetchedPokemonContext } from "@/store/FetchedPokemonProvider";
import { Pokemon } from "@/types/PokemonType";
import { useDisclosure } from "@mantine/hooks";
import { capitalize } from "@/utils/functions/capitalize";

const fetchPokemons = async (offset: number, limit: number) => {
  console.log(`getting pokemons ${offset} - ${limit}`);

  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${
      offset > 900 ? 8 : limit
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
  console.log(data[0].id);
  return data;
};

const pageSize = 100;

const InfinitePokemon = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    type: [],
    generation: [],
    legendary: [],
    hasEvolve: [],
  });

  const [opened, toggle] = useDisclosure(false);
  const { pokemon } = useContext(FetchedPokemonContext);

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

  const filteredData: Pokemon[][] | undefined = useMemo(
    () =>
      data?.pages.map((page: Pokemon[]) =>
        page.filter((pokemon: Pokemon) =>
          pokemon.name.includes(query.toLowerCase() || "")
        )
      ),
    [data, query]
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

  const types = [
    ...new Set(
      filteredData
        .map((page: Pokemon[]) =>
          page.map((pokemon: Pokemon) =>
            pokemon.types.map(
              (type: { type: { name: string } }) => type.type.name
            )
          )
        )
        .flat(2)
    ),
  ];

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
        <Button onClick={toggle.toggle}>Filter</Button>
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
                  {types.map((type, index) => (
                    <Group key="type">
                      <Checkbox />
                      <div className={type.concat(" type")}>
                        {capitalize(type)}
                      </div>
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
              {filteredData.map((page: Pokemon[]) =>
                page.map((pokemon: Pokemon, index) => (
                  <PokemonCards pokemon={pokemon} key={pokemon.name + index} />
                ))
              )}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

function PokemonCards({ pokemon }: { pokemon: Pokemon }) {
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

export default InfinitePokemon;
