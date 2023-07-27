"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Pokemon, fetchPokemons } from "../../utils/server/server";
// import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroll from "react-infinite-scroller";
import { Card, Input } from "antd";
import Spin from "antd/es/spin/index";
import Link from "next/link";
import PokemonType from "./pokemontype";
import Image from "next/image";
import { useState } from "react";

// interface Pokemon {
//   name: string | null;
//   url: string | null;
// }

const pageSize = 100;

const InfinitePokemon = () => {
  const [query, setQuery] = useState("");

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam = 0 }) => fetchPokemons(pageParam, pageSize),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length < pageSize) {
        console.log("stopped");
        return;
      }
      console.log("getting next page");
      console.log(lastPage);
      console.log(pages.length * pageSize);
      return pages.length * pageSize;
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Search for Pokemon"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div style={{ minHeight: "100vh" }}>
        <Spin
          spinning={!data}
          style={{ alignSelf: "center", justifySelf: "center" }}
          tip="Loading..."
        >
          <InfiniteScroll
            //   next={fetchNextPage}
            pageStart={0}
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage || false}
            loader={<div>Loading...</div>}
            //   useWindow={false}
            threshold={1000}
            //   dataLength={
            //     data?.pages.reduce((total, page) => total + page.length, 0) || 0
            //   }
          >
            <div className="flex flex-row w-full h-full justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {data?.pages.map((page) =>
                  page
                    .filter((pokemon: Pokemon) =>
                      pokemon.name.includes(query.toLowerCase() || "")
                    )
                    .map((pokemon: Pokemon) => (
                      <PokemonCards pokemon={pokemon} key={pokemon.name} />
                    ))
                )}
              </div>
            </div>
          </InfiniteScroll>
        </Spin>
      </div>
    </div>
  );
};

function PokemonCards({ pokemon }: { pokemon: Pokemon }) {
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

export default InfinitePokemon;
