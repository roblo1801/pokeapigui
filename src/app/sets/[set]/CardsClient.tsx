"use client";

import { TCGCard } from "@/types/TCGTypes";
import { Loader, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = { cardData: TCGCard[] };

const DynamicCards = dynamic(() => import("./Cards"), {
  ssr: false,
  loading: () => (
    <div>
      <Loader />
    </div>
  ),
});

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
      <DynamicCards cardData={cardData} query={query} pathName={pathName} />
    </>
  );
}

export default SetsClient;
