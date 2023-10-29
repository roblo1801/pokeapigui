"use client";

import AddToCardsButton from "@/components/custom/AddToCardsButton";
import { TCGCard } from "@/types/TCGTypes";
import { Rating, Stack, Text, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Sparkle from "react-sparkle";

type Props = {
  cardData: TCGCard;
  nextCardData: TCGCard;
  prevCardData: TCGCard;
};

function SetsClient({ cardData, nextCardData, prevCardData }: Props) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const getRating = () => {
    switch (cardData.rarity) {
      case "Common":
        return 0;
      case "Uncommon":
        return 0.5;
      case "Rare":
        return 1;
      case "Rare Holo":
        return 1.5;
      case "Rare ACE":
        return 2;
      case "Rare BREAK":
        return 2;
      case "Rare Holo GX":
        return 2;
      case "Rare Holo LV.X":
        return 2;
      case "Rare Holo Star":
        return 2;
      case "Rare Holo V":
        return 2;
      case "Rare Holo VMAX":
        return 2;
      case "Double Rare":
        return 2;
      case "Rare Holo EX":
        return 2;
      case "Illustration Rare":
        return 3;
      case "Rare Prime":
        return 3;
      case "Rare Prism Star":
        return 3;
      case "Rare Rainbow":
        return 3;
      case "Rare Shining":
        return 3;
      case "Rare Shiny GX":
        return 3;
      case "Rare Shiny":
        return 3;
      case "Rare Secret":
        return 4;
      case "Ultra Rare":
        return 4;
      case "Special Illustration Rare":
        return 4.5;
      case "Hyper Rare":
        return 5;
      default:
        return 0;
    }
  };

  const rating = getRating();

  return (
    <Stack align="center" mt={20}>
      <div className="flex w-full items-center justify-evenly">
        {prevCardData ? (
          <Link href={`/sets/${prevCardData.set.id}/${prevCardData.id}`}>
            {isMobile ? (
              <IconArrowLeft />
            ) : (
              <Image
                width={183 * 1.1}
                height={256 * 1.1}
                src={prevCardData.images.small}
                alt={prevCardData.name}
                style={{
                  filter: "blur(1px)",
                  boxShadow: "4px 4px 4px gray",
                  borderRadius: "10px",
                }}
              />
            )}
          </Link>
        ) : !isMobile ? (
          <div style={{ width: 183 * 1.1, height: 256 * 1.1 }} />
        ) : (
          <IconArrowLeft className="invisible" />
        )}
        <motion.div className="relative">
          {rating > 2 ? (
            <Sparkle
              color="random"
              maxSize={20}
              flickerSpeed="slowest"
              fadeOutSpeed={25}
            />
          ) : null}

          <Image
            width={183 * 1.5}
            height={256 * 1.5}
            priority
            src={cardData.images.large}
            alt={cardData.name}
            placeholder="blur"
            blurDataURL="/pokemonlogo.svg"
            style={{
              boxShadow: "4px 4px 4px gray",
              borderRadius: "14px",
            }}
          />
        </motion.div>
        {nextCardData ? (
          <Link href={`/sets/${nextCardData.set.id}/${nextCardData.id}`}>
            {!isMobile ? (
              <Image
                width={183 * 1.1}
                height={256 * 1.1}
                src={nextCardData.images.small}
                alt={nextCardData.name}
                style={{
                  filter: "blur(1px)",
                  boxShadow: "4px 4px 4px gray",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <IconArrowRight />
            )}
          </Link>
        ) : !isMobile ? (
          <div style={{ width: 183 * 1.1, height: 256 * 1.1 }} />
        ) : (
          <IconArrowRight className="invisible" />
        )}
      </div>
      <Link href={`/sets/${cardData.set.id}`}>
        <Image
          alt={cardData.set.name}
          width={200}
          height={200}
          src={cardData.set.images.logo}
        />
      </Link>
      <AddToCardsButton card={cardData} />
      <div style={{ position: "relative" }}>
        <Rating
          color={rating === 5 ? "purple" : "yellow"}
          readOnly
          size="lg"
          fractions={2}
          value={rating}
        ></Rating>
        {rating > 2 ? <Sparkle fadeOutSpeed={25} overflowPx={5} /> : null}
      </div>
      <Text>{cardData.rarity}</Text>
      {cardData.tcgplayer ? (
        <Text component={Link} href={cardData.tcgplayer.url}>
          TCGPlayer Prices
        </Text>
      ) : null}
    </Stack>
  );
}

export default SetsClient;
