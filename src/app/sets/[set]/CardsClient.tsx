"use client";

import { TCGCard } from "@/types/TCGTypes";
import { capitalize } from "@/utils/functions/capitalize";
import {
  Accordion,
  Button,
  Checkbox,
  Drawer,
  Group,
  Loader,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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

type Filters = {
  supertype: string[];
  subtype: string[];
  hpLow: number | null;
  hpHigh: number | null;
  types: string[];
  regulationMark: string[];
};

function SetsClient({ cardData }: Props) {
  const pathName = usePathname();
  const [query, setQuery] = useState("");
  const [opened, toggle] = useDisclosure(false);
  const [filters, setFilters] = useState<Filters>({
    supertype: [],
    subtype: [],
    hpLow: null,
    hpHigh: null,
    types: [],
    regulationMark: [],
  });

  const supertypes = ["Pokémon", "Trainer", "Energy"];

  return (
    <>
      <Group gap={10} mx="auto">
        <TextInput
          leftSection={<IconSearch />}
          placeholder="Search for a card"
          size="sm"
          radius="md"
          variant="filled"
          onChange={(e) =>
            setQuery(DOMPurify.sanitize(e.target.value).toLowerCase())
          }
        />
        <Button onClick={toggle.toggle}>Filter</Button>
      </Group>
      <Drawer
        position="bottom"
        opened={opened}
        onClose={toggle.close}
        title="Filter"
      >
        <Group>
          <Accordion w="full">
            <Accordion.Item key={"supertype"} value="supertype">
              <Accordion.Control>Supertype</Accordion.Control>
              <Accordion.Panel>
                <Group>
                  {supertypes.map((supertype) => (
                    <Group key={supertype}>
                      <Checkbox
                        checked={filters.supertype.includes(supertype)}
                        onChange={(event) => {
                          if (event.currentTarget.checked) {
                            return setFilters((prevFilters) => ({
                              ...prevFilters,
                              supertype:
                                prevFilters.supertype.concat(supertype),
                            }));
                          } else if (filters.supertype.length === 1) {
                            setFilters((prevFilters) => ({
                              ...prevFilters,
                              supertype: [],
                            }));
                          }
                          return setFilters((prevFilters) => ({
                            ...prevFilters,
                            type: prevFilters.supertype.splice(
                              prevFilters.supertype.indexOf(supertype),
                              1
                            ),
                          }));
                        }}
                      />
                      <div>{capitalize(supertype)}</div>
                    </Group>
                  ))}
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Group>
      </Drawer>
      <DynamicCards
        cardData={cardData.filter((card) => {
          if (filters.supertype.length > 0)
            return filters.supertype.some(
              (filter) => card.supertype === filter
            );
          return true;
        })}
        query={query}
        pathName={pathName}
      />
    </>
  );
}

export default SetsClient;
