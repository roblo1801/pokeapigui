"use client";

import RemoveFromCardsButton from "@/components/custom/RemoveFromCardsButton";
import { getData } from "@/supabaseRequests";
import { TCGCard } from "@/types/TCGTypes";
import { useAuth } from "@clerk/nextjs";
import { Indicator, Loader, SimpleGrid } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
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
      <div className="flex items-center">
        <Loader />
      </div>
    );

  if (!data || data.length < 1)
    return <div className="text-center">No Cards Found</div>;

  console.log(data, "data");

  return (
    <div className="flex justify-center p-2">
      <SimpleGrid cols={{ base: 4, sm: 8, lg: 15 }}>
        {data.map((card: TCGCard, index: number) => (
          <Indicator
            key={index}
            color="transparent"
            label={<RemoveFromCardsButton card={card} />}
          >
            <Link href={`/sets/${card.set.id}/${card.id}`}>
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
            </Link>
          </Indicator>
        ))}
      </SimpleGrid>
    </div>
  );
}
