"use client";

import RemoveFromCardsButton from "@/components/custom/RemoveFromCardsButton";
import { getData } from "@/supabaseRequests";
import { TCGCard } from "@/types/TCGTypes";
import { useAuth } from "@clerk/nextjs";
import { Center, Loader, SimpleGrid } from "@mantine/core";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

type Props = {};

export default function CardsClient({}: Props) {
  const { getToken, userId } = useAuth();

  const fetcher = async () => {
    const token = await getToken({ template: "supabase" });
    const data = await getData({
      token,
      userId,
    });
    if (!data || !data[0].cards) return [];

    const allPoke = await Promise.all(
      data[0].cards.map(
        async (e: string) =>
          await fetch(`https://api.pokemontcg.io/v2/cards/${e}`)
            .then(async (res) => await res.json())
            .then((res) => res.data)
      )
    );

    return allPoke;
  };

  const { data, error, isLoading } = useSWR("cardData", fetcher);

  if (error) {
    console.log(error, "error");
    return <div>Error</div>;
  }

  if (isLoading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  if (!data || data.length < 1)
    return <div className="text-center">No Cards Found</div>;

  console.log(data, "data");

  return (
    <div className="flex justify-center">
      <SimpleGrid cols={{ base: 2, sm: 4, lg: 6 }}>
        {data.map((card: TCGCard, index: number) => (
          <div key={index}>
            <Image
              style={{
                boxShadow: "4px 4px 4px gray",
                borderRadius: "5px",
              }}
              width={183}
              height={256}
              src={card.images.small}
              alt={card.name}
            />
            <RemoveFromCardsButton card={card} />
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
}
