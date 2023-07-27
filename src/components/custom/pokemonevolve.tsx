import React from "react";
import Pokedex from "pokedex-promise-v2";

import Image from "next/image";
const P = new Pokedex();

async function PokemonEvolve({ name }: { name: string }) {
  const evolve = await P.getPokemonByName(name);

  return evolve ? (
    <div>
      {evolve.sprites.front_default ? (
        <Image
          src={evolve.sprites.front_default}
          alt={evolve.name}
          width={100}
          height={100}
        />
      ) : null}
      <p>{evolve.name}</p>
    </div>
  ) : null;
}

export default PokemonEvolve;
