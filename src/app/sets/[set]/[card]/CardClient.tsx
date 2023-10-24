"use client";

import { TCGCard } from "@/types/TCGTypes";
import { Card, SimpleGrid, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = { cardData: TCGCard };

function SetsClient({ cardData }: Props) {
  return (
    <Stack align="center" mt={20}>
      <Image
        width={183 * 2}
        height={256 * 2}
        src={cardData.images.large}
        alt={cardData.name}
        style={{
          boxShadow: "4px 4px 4px gray",
          borderRadius: "19px",
        }}
      />
      <Image
        alt={cardData.set.name}
        width={200}
        height={200}
        src={cardData.set.images.logo}
      />

      <Text>{cardData.rarity}</Text>
      <Text component={Link} href={cardData.tcgplayer.url}>
        TCGPlayer Prices
      </Text>
    </Stack>
  );
}

export default SetsClient;
