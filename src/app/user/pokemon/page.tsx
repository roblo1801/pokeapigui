import React from "react";
import UserClient from "./UserClient";

type Props = {};

async function PokemonCollection({}: Props) {
  return (
    <>
      <div className="pokefont text-center my-2">Pokemon Collection</div>
      <UserClient />
    </>
  );
}

export default PokemonCollection;
