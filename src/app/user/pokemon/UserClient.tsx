"use client";

import PokemonCards from "@/components/custom/PokemonCard";
import RemoveFromPokemonButton from "@/components/custom/RemoveFromPokemonButton";
import { getData } from "@/supabaseRequests";
import { Pokemon } from "@/types/PokemonType";
import { useAuth } from "@clerk/nextjs";
import { Center, Indicator, Loader, SimpleGrid } from "@mantine/core";
import React from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

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
    return (
      <div className="flex flex-col items-center">
        <div className="text-center">No Cards Found</div>
        <div>Add Pokemon to start a Collection</div>
        <Link href={`/pokemon`}>
          <Image
            width={183}
            height={256}
            src="/pokemonlogo.svg"
            alt="Pokemon Logo"
          />
        </Link>
      </div>
    );

  return (
    <div className="flex justify-center">
      <SimpleGrid cols={{ base: 4, sm: 10, lg: 14 }}>
        {data
          .sort((a, b) => a.id - b.id)
          .map((poke: Pokemon, index: number) => (
            <div key={index}>
              <Indicator
                label={<RemoveFromPokemonButton pokemon={poke} />}
                position="bottom-center"
                color="transparent"
              >
                <PokemonCards pokemon={poke} />
              </Indicator>
            </div>
          ))}
      </SimpleGrid>
    </div>
  );
}

export default UserClient;
