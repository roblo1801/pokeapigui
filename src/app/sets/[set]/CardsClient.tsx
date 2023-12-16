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
  rarities: string[];
  regulationMark: string[];
  attackCost: number[];
};

function SetsClient({ cardData }: Props) {
  const pathName = usePathname();
  const [query, setQuery] = useState("");
  const [opened, toggle] = useDisclosure(false);
  const [filters, setFilters] = useState<Filters>({
    supertype: [],
    subtype: [],
    attackCost: [],
    hpLow: null,
    hpHigh: null,
    types: [],
    rarities: [],
    regulationMark: [],
  });

  const supertypes = ["Pokémon", "Trainer", "Energy"];

  const subtypes = [
    "ACE SPEC",
    "Ancient",
    "BREAK",
    "Baby",
    "Basic",
    "EX",
    "Eternamax",
    "Fusion Strike",
    "Future",
    "GX",
    "Goldenrod Game Corner",
    "Item",
    "LEtypesD",
    "Level-Up",
    "MEGA",
    "Pokémon Tool",
    "Pokémon Tool F",
    "Prime",
    "Prism Star",
    "Radiant",
    "Rapid Strike",
    "Restored",
    "Rocket's Secret Machine",
    "SP",
    "Single Strike",
    "Special",
    "Stadium",
    "Stage 1",
    "Stage 2",
    "Star",
    "Supporter",
    "TAG TEAM",
    "Team Plasma",
    "Technical Machine",
    "Tera",
    "Ultra Beast",
    "V",
    "V-UNION",
    "VMAX",
    "VSTAR",
    "ex",
  ];

  const rarities = [
    "Amazing Rare",
    "Classic Collection",
    "Common",
    "Double Rare",
    "Hyper Rare",
    "Illustration Rare",
    "LEtypesD",
    "Promo",
    "Radiant Rare",
    "Rare",
    "Rare ACE",
    "Rare BREAK",
    "Rare Holo",
    "Rare Holo EX",
    "Rare Holo GX",
    "Rare Holo LV.X",
    "Rare Holo Star",
    "Rare Holo V",
    "Rare Holo VMAX",
    "Rare Holo VSTAR",
    "Rare Prime",
    "Rare Prism Star",
    "Rare Rainbow",
    "Rare Secret",
    "Rare Shining",
    "Rare Shiny",
    "Rare Shiny GX",
    "Rare Ultra",
    "Special Illustration Rare",
    "Trainer Gallery Rare Holo",
    "Ultra Rare",
    "Uncommon",
  ];

  const types = [
    "Colorless",
    "Darkness",
    "Dragon",
    "Fairy",
    "Fighting",
    "Fire",
    "Grass",
    "Lightning",
    "Metal",
    "Psychic",
    "Water",
  ];

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
        <Button
          style={{
            background: "#000",
          }}
          onClick={toggle.toggle}
        >
          Filter
        </Button>
      </Group>
      <Drawer
        // bg={'url("background/pokebg1.jpg") no-repeat center center'}
        styles={{
          header: {
            background: "#000",
            color: "white",
            margin: "auto",
          },
          title: {
            display: "flex",

            margin: "auto",
            fontSize: "1.5rem",
            fontWeight: "bold",
          },

          content: {
            background:
              "url(../background/pokebg2.jpg) no-repeat center center",
            backgroundSize: "cover",
          },
        }}
        position="bottom"
        opened={opened}
        onClose={toggle.close}
        title="Filters"
      >
        <Accordion
          w="full"
          styles={{
            root: {
              background:
                "rgba(255, 255, 255, 0.2)" /* Adjust the alpha (last) value for transparency */,
              borderRadius: "10px",
              backdropFilter: "blur(5px)" /* Adjust the blur value as needed */,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "20px",
              width: "300px" /* Adjust the width as needed */,
              margin: "20px",
            },
            item: {
              background: "transparent",
              border: "none",
              padding: "5px",
            },
            control: {
              background: "transparent",
              border: "none",
              padding: "5px",
              textTransform: "uppercase",
              fontSize: "1.2rem",
            },
          }}
        >
          <Accordion.Item key={"supertype"} value="supertype" c="light">
            <Accordion.Control>Supertype</Accordion.Control>
            <Accordion.Panel>
              <Group>
                {supertypes.map((supertype) => (
                  <Group gap={2} key={supertype}>
                    <Checkbox
                      checked={filters.supertype.includes(supertype)}
                      onChange={(event) => {
                        if (event.currentTarget.checked) {
                          return setFilters((prevFilters) => ({
                            ...prevFilters,
                            supertype: prevFilters.supertype
                              ? prevFilters.supertype.concat(supertype)
                              : [supertype],
                          }));
                        }
                        if (filters.supertype?.includes(supertype)) {
                          const indexOfsupertype =
                            filters.supertype.indexOf(supertype);
                          filters.supertype.splice(indexOfsupertype, 1);
                          return setFilters((prevFilters) => ({
                            ...prevFilters,
                            supertype: filters.supertype,
                          }));
                        }
                      }}
                    />
                    <div>{capitalize(supertype)}</div>
                  </Group>
                ))}
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item key={"subtype"} value="subtype">
            <Accordion.Control>Subtype</Accordion.Control>
            <Accordion.Panel>
              <Group>
                {subtypes
                  .filter((subtype) =>
                    cardData.some((card) => card.subtypes.includes(subtype))
                  )
                  .map((subtype) => (
                    <Group gap={2} key={subtype}>
                      <Checkbox
                        checked={filters.subtype.includes(subtype)}
                        onChange={(event) => {
                          if (event.currentTarget.checked) {
                            return setFilters((prevFilters) => ({
                              ...prevFilters,
                              subtype: prevFilters.subtype
                                ? prevFilters.subtype.concat(subtype)
                                : [subtype],
                            }));
                          }
                          if (filters.subtype?.includes(subtype)) {
                            const indexOfsubtype =
                              filters.subtype.indexOf(subtype);
                            filters.subtype.splice(indexOfsubtype, 1);
                            return setFilters((prevFilters) => ({
                              ...prevFilters,
                              subtype: filters.subtype,
                            }));
                          }
                        }}
                      />
                      <div>{subtype}</div>
                    </Group>
                  ))}
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item key={"types"} value="types">
            <Accordion.Control>Types</Accordion.Control>
            <Accordion.Panel>
              <Group>
                {types
                  .filter((type) =>
                    cardData.some((card) => {
                      if (card.types) {
                        return card.types.includes(type);
                      }
                    })
                  )
                  .map((types) => (
                    <Group gap={2} key={types}>
                      <Checkbox
                        checked={filters.types.includes(types)}
                        onChange={(event) => {
                          if (event.currentTarget.checked) {
                            return setFilters((prevFilters) => ({
                              ...prevFilters,
                              types: prevFilters.types
                                ? prevFilters.types.concat(types)
                                : [types],
                            }));
                          }
                          if (filters.types?.includes(types)) {
                            const indexOftypes = filters.types.indexOf(types);
                            filters.types.splice(indexOftypes, 1);
                            return setFilters((prevFilters) => ({
                              ...prevFilters,
                              types: filters.types,
                            }));
                          }
                        }}
                      />
                      <div>{types}</div>
                    </Group>
                  ))}
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item key={"rarities"} value="rarities">
            <Accordion.Control>Rarity</Accordion.Control>
            <Accordion.Panel>
              <Group>
                {rarities
                  .filter((rarity) =>
                    cardData.some((card) => card.rarity === rarity)
                  )
                  .map((rarities) => (
                    <Group gap={2} key={rarities}>
                      <Checkbox
                        checked={filters.rarities.includes(rarities)}
                        onChange={(event) => {
                          if (event.currentTarget.checked) {
                            return setFilters((prevFilters) => ({
                              ...prevFilters,
                              rarities: prevFilters.rarities
                                ? prevFilters.rarities.concat(rarities)
                                : [rarities],
                            }));
                          }
                          if (filters.rarities?.includes(rarities)) {
                            const indexOfrarities =
                              filters.rarities.indexOf(rarities);
                            filters.rarities.splice(indexOfrarities, 1);
                            return setFilters((prevFilters) => ({
                              ...prevFilters,
                              rarities: filters.rarities,
                            }));
                          }
                        }}
                      />
                      <div>{rarities}</div>
                    </Group>
                  ))}
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item key={"attackCost"} value="attackCost">
            <Accordion.Control>Attack Cost</Accordion.Control>
            <Accordion.Panel>
              <Group>
                {[1, 2, 3, 4, 5, 6].map((attackCost) => (
                  <Group gap={2} key={attackCost + "attackCost"}>
                    <Checkbox
                      checked={filters.attackCost.includes(attackCost)}
                      onChange={(event) => {
                        if (event.currentTarget.checked) {
                          return setFilters((prevFilters) => ({
                            ...prevFilters,
                            attackCost: prevFilters.attackCost
                              ? prevFilters.attackCost.concat(attackCost)
                              : [attackCost],
                          }));
                        }
                        if (filters.attackCost?.includes(attackCost)) {
                          const indexOfattackCost =
                            filters.attackCost.indexOf(attackCost);
                          filters.attackCost.splice(indexOfattackCost, 1);
                          return setFilters((prevFilters) => ({
                            ...prevFilters,
                            attackCost: filters.attackCost,
                          }));
                        }
                      }}
                    />
                    <div>{attackCost}</div>
                  </Group>
                ))}
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Drawer>
      <DynamicCards
        cardData={cardData
          .filter((card) => {
            if (filters.supertype.length > 0)
              return filters.supertype.some(
                (filter) => card.supertype === filter
              );
            return true;
          })
          .filter((card) => {
            if (filters.subtype.length > 0)
              return filters.subtype.some((filter) =>
                card.subtypes.includes(filter)
              );
            return true;
          })
          .filter((card) => {
            if (filters.types.length > 0)
              return filters.types.some((filter) => {
                if (card.types) {
                  return card.types.includes(filter);
                }
                return false;
              });
            return true;
          })
          .filter((card) => {
            if (filters.rarities.length > 0)
              return filters.rarities.some((filter) => card.rarity === filter);
            return true;
          })
          .filter((card) => {
            if (filters.attackCost.length > 0)
              return filters.attackCost.some((filter) => {
                if (card.attacks) {
                  return card.attacks
                    .map((attack) => attack.convertedEnergyCost)
                    .includes(filter);
                }
                return false;
              });
            return true;
          })}
        query={query}
        pathName={pathName}
      />
    </>
  );
}

export default SetsClient;
