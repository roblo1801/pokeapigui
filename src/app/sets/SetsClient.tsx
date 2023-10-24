"use client";

import { TCGSet } from "@/types/TCGTypes";
import { Card, SimpleGrid, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  setData: TCGSet[];
};

function SetsClient({ setData }: Props) {
  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }}>
        {setData.map((set) => (
          <Link
            className="items-center flex justify-center flex-col"
            href={`/sets/${set.id}`}
            key={set.id}
          >
            <Image
              width={200}
              height={200}
              src={set.images.logo}
              alt={set.name}
            />
            <Text tt="uppercase" fw="bold" ta="center">
              {set.series} - {set.name}
            </Text>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
}

export default SetsClient;
