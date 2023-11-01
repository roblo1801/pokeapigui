"use client";

import AddToCardsMiniButton from "@/components/custom/AddToCardsMiniButton";
import RemoveFromCardsButton from "@/components/custom/RemoveFromCardsButton";
import { getData } from "@/supabaseRequests";
import { TCGCard } from "@/types/TCGTypes";
import { useAuth } from "@clerk/nextjs";
import { Indicator, Loader, SimpleGrid } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

type Props = {
  allPoke: TCGCard[];
};

export default function CardsClient({ allPoke }: Props) {
  const { getToken, userId } = useAuth();

  const fetcher = async () => {
    const token = await getToken({ template: "supabase" });
    const data = await getData({
      token,
      userId,
    });
    if (!data || !data[0].cards) return [];

    return data[0].cards;
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
    return (
      <div className="flex flex-col items-center">
        <div className="text-center">No Cards Found</div>
        <div>Add Cards to Start a Collection</div>
        <Link href={`/sets/${allPoke[0].set.id}`}>
          <Image
            width={183}
            height={256}
            src={allPoke[0].set.images.logo}
            alt={allPoke[0].set.name}
          />
        </Link>
      </div>
    );

  const filteredCards = allPoke.filter((card) => data.includes(card.id));
  const estimateTwo = filteredCards
    .filter((a) => a.cardmarket.prices.averageSellPrice)
    .map((a) => a.cardmarket.prices.averageSellPrice);

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="flex gap-2 justify-center">
        <div>
          {Math.round((filteredCards.length / allPoke.length) * 100)}% Collected
          {`(${filteredCards.length}/${allPoke.length})`}
        </div>
        {estimateTwo.length > 0 ? (
          <div>
            Est. Value ${estimateTwo.reduce((a: number, b: number) => a + b)}
          </div>
        ) : null}
      </div>
      <SimpleGrid cols={{ base: 4, sm: 8, lg: 15 }}>
        {allPoke
          .sort((a, b) => parseInt(a.number) - parseInt(b.number))
          .map((card: TCGCard, index: number) => (
            <Indicator
              key={index}
              color="transparent"
              // disabled={!data.includes(card.id)}
              label={
                data.includes(card.id) ? (
                  <RemoveFromCardsButton card={card} />
                ) : (
                  <AddToCardsMiniButton card={card} />
                )
              }
              position={
                data.includes(card.id) ? "bottom-start" : "middle-center"
              }
            >
              <Link href={`/sets/${card.set.id}/${card.id}`}>
                <Image
                  style={{
                    boxShadow: "4px 4px 4px gray",
                    borderRadius: "5px",
                    filter: data.includes(card.id) ? "" : "grayscale(100%)",
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
