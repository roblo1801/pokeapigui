"use client";

import PokemonCards from "@/components/custom/PokemonCard";
import RemoveFromPokemonButton from "@/components/custom/RemoveFromPokemonButton";
import { getData } from "@/supabaseRequests";
import { Pokemon } from "@/types/PokemonType";
import { useAuth } from "@clerk/nextjs";
import { Center, Loader, SimpleGrid } from "@mantine/core";
import React from "react";
import useSWR from "swr";

type Props = {};

function UserClient({}: Props) {
  const { getToken, userId } = useAuth();

  const fetcher = async () => {
    const token = await getToken({ template: "supabase" });
    const data = await getData({
      token,
      userId,
    });
    if (!data || !data[0].pokemon) return [];

    const allPoke = await Promise.all(
      data[0].pokemon.map(
        async (e: string) =>
          await fetch(`https://pokeapi.co/api/v2/pokemon/${e}`).then(
            async (res) => await res.json()
          )
      )
    );

    return allPoke;
  };

  const { data, error, isLoading } = useSWR("userData", fetcher);

  if (error) return <div>Error</div>;

  if (isLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (!data || data.length < 1)
    return <div className="text-center">No Pokemon Found</div>;

  return (
    <div className="flex justify-center">
      <SimpleGrid cols={{ base: 2, sm: 4, lg: 6 }}>
        {data.map((poke: Pokemon, index: number) => (
          <div key={index} className="flex flex-col">
            <PokemonCards pokemon={poke} />
            <RemoveFromPokemonButton pokemon={poke} />
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
}

export default UserClient;
