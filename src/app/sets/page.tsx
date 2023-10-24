import { TCGSet } from "@/types/TCGTypes";
import SetsClient from "./SetsClient";

export default async function Home() {
  const setData = await fetch(
    `https://api.pokemontcg.io/v2/sets?orderBy=releaseDate`,
    {
      headers: {
        "X-Api-Key": "35688f31-3b82-46e8-88e9-c0775c640cd8",
      },
      cache: "force-cache",
    }
  ).then(async (res) => await res.json());

  return (
    <>
      <h1 className="text-center text-3xl">Sets</h1>
      <SetsClient setData={setData.data.reverse()} />
    </>
  );
}
