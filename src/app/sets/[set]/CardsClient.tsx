"use client";

import { TCGCard } from "@/types/TCGTypes";
import { Card, SimpleGrid, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = { cardData: TCGCard[] };

function SetsClient({ cardData }: Props) {
  const pathName = usePathname();
  const [query, setQuery] = useState("");

  return (
    <>
      <TextInput
        leftSection={<IconSearch />}
        placeholder="Search for a card"
        m={20}
        size="sm"
        radius="md"
        variant="filled"
        onChange={(e) =>
          setQuery(DOMPurify.sanitize(e.target.value).toLowerCase())
        }
      />
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
    </>
  );
}

export default SetsClient;
