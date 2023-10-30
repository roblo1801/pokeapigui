"use client";

import { TCGCard } from "@/types/TCGTypes";
import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import dynamic from "next/dynamic";

type Props = {
  cardData: TCGCard;
  nextCardData: TCGCard;
  prevCardData: TCGCard;
};

const DynamicCard = dynamic(() => import("./Card"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

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
    <DynamicCard
      isMobile={isMobile}
      rating={rating}
      cardData={cardData}
      nextCardData={nextCardData}
      prevCardData={prevCardData}
    />
  );
}

export default SetsClient;
