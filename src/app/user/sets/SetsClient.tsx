"use client";

import { TCGSet } from "@/types/TCGTypes";
import { SimpleGrid, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  setData: TCGSet[];
};

function SetsClient({ setData }: Props) {
  const [query, setQuery] = useState("");

  return (
    <>
      <TextInput
        leftSection={<IconSearch />}
        placeholder="Search for a set"
        m={20}
        size="sm"
        radius="md"
        variant="filled"
        onChange={(e) =>
          setQuery(DOMPurify.sanitize(e.target.value).toLowerCase())
        }
      />
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }}>
        {setData
          .filter(
            (set) =>
              set.name.toLowerCase().includes(query) ||
              set.series.toLowerCase().includes(query)
          )
          .map((set) => (
            <Link
              className="items-center flex justify-center flex-col"
              href={`/user/sets/${set.id}`}
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
