import SetsClient from "./SetsClient";

export default async function Home() {
  // Import local TCG data utilities
  const { getTCGSets } = await import('@/utils/tcgDataLoader');
  const setData = await getTCGSets();

  return (
    <>
      <h1 className="text-center pokefont">Card Collection</h1>
      <SetsClient setData={setData.data.reverse()} />
    </>
  );
}
