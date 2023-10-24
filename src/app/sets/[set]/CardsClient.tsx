"use client";

import { TCGCard } from "@/types/TCGTypes";
import { Card, SimpleGrid, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = { cardData: TCGCard[] };

function SetsClient({ cardData }: Props) {
  const pathName = usePathname();

  return (
    <>
      <SimpleGrid m="lg" cols={{ base: 4, sm: 8, lg: 15 }}>
        {cardData.map((card) => (
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
    </>
  );
}

export default SetsClient;
