import AddToCardsButton from "@/components/custom/AddToCardsButton";
import { SignedIn } from "@clerk/nextjs";
import { Stack, Rating } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { TCGCard } from "@/types/TCGTypes";
import Sparkle from "react-sparkle";

type Props = {
  cardData: TCGCard;
  nextCardData: TCGCard;
  prevCardData: TCGCard;
  rating: number;
  isMobile: boolean | undefined;
};

function Card({
  cardData,
  prevCardData,
  nextCardData,
  isMobile,
  rating,
}: Props) {
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
        <div className="relative">
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
        </div>
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
      <SignedIn>
        <AddToCardsButton card={cardData} />
      </SignedIn>
      <Link href={`/sets/${cardData.set.id}`}>
        <Image
          alt={cardData.set.name}
          width={200}
          height={200}
          src={cardData.set.images.logo}
        />
      </Link>

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
      <div>{cardData.rarity}</div>
      {cardData.tcgplayer ? (
        <Link href={cardData.tcgplayer.url}>TCGPlayer Prices</Link>
      ) : null}
    </Stack>
  );
}

export default Card;
