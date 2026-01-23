import { TCGCard } from "@/types/TCGTypes";
import SetsClient from "./CardsClient";
import Image from "next/image";

type Props = {
  params: {
    set: string;
  };
};

export default async function Home({ params }: Props) {
  // Import local TCG data utilities
  const { getTCGCardsFromSet } = await import('@/utils/tcgDataLoader');
  const cardData = await getTCGCardsFromSet(params.set);

  return (
    <>
      {cardData.data[0].set ? (
        <Image
          src={cardData.data[0].set.images.logo}
          alt="Set Logo"
          width={200}
          height={200}
          className="mx-auto"
        />
      ) : null}
      <h1 className="text-center text-2xl">
        {cardData.data[0].set.series} - {cardData.data[0].set.name}
      </h1>
      <SetsClient
        cardData={cardData.data.sort(
          (a: TCGCard, b: TCGCard) => parseInt(a.number) - parseInt(b.number)
        )}
      />
    </>
  );
}
