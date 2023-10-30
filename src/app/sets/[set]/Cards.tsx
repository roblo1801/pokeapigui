import { SimpleGrid } from "@mantine/core";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import { TCGCard } from "@/types/TCGTypes";

type Props = {
  cardData: TCGCard[];
  query: string;
  pathName: string;
};

function Cards({ cardData, query, pathName }: Props) {
  return (
    <SimpleGrid m="lg" cols={{ base: 4, sm: 8, lg: 15 }}>
      {cardData
        .filter(
          (card) =>
            card.name.toLowerCase().includes(query) ||
            card.id.toLowerCase().includes(query) ||
            card.number.toLowerCase().includes(query) ||
            (card.abilities &&
              card.abilities.some((ability) =>
                ability.name.toLowerCase().includes(query)
              ))
        )
        .map((card) => (
          <Link key={card.id} href={pathName.concat(`/${card.id}`)}>
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
        ))}
    </SimpleGrid>
  );
}

export default Cards;
