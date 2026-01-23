import SetsClient from "./CardClient";

type Props = {
  params: {
    card: string;
  };
};

export default async function Home({ params }: Props) {
  // Import local TCG data utilities
  const { getTCGCard, getTCGCardsFromSet } = await import('@/utils/tcgDataLoader');
  const cardData = await getTCGCard(params.card);

  if (!cardData || !cardData.data) return <button>Go Back</button>;

  // Get all cards from the same set to find next/prev
  const allCardsInSet = await getTCGCardsFromSet(cardData.data.set.id);
  const sortedCards = allCardsInSet.data.sort((a: any, b: any) => parseInt(a.number) - parseInt(b.number));
  
  const currentIndex = sortedCards.findIndex((card: any) => card.id === params.card);
  const nextCardData = currentIndex < sortedCards.length - 1 ? sortedCards[currentIndex + 1] : null;
  const prevCardData = currentIndex > 0 ? sortedCards[currentIndex - 1] : null;

  return (
    <>
      <SetsClient
        prevCardData={prevCardData}
        cardData={cardData.data}
        nextCardData={nextCardData}
      />
    </>
  );
}
