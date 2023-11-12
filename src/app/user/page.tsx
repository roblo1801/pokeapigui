import Collection from "@/components/custom/collections";
import React from "react";

type Props = {};

const collections = [
  {
    name: "Pokemon",
    link: "user/pokemon",
    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  },
  {
    name: "Cards",
    link: "user/sets",
    url: "https://images.pokemontcg.io/sv3pt5/4.png",
  },
];

async function User({}: Props) {
  return (
    <>
      <div className="text-center pokefont">Collections</div>
      <div className="flex justify-evenly">
        {collections.map((collection) => (
          <Collection endpoint={collection} key={collection.name} />
        ))}
      </div>
    </>
  );
}

export default User;
