import React from "react";

import Image from "next/image";
import Link from "next/link";
import { capitalize } from "@/utils/functions/capitalize";

async function PokemonEvolve({ name }: { name: string }) {
  // Import local data utilities
  const { getPokemon } = await import('@/utils/dataLoader');
  const evolve = await getPokemon(name);

  return evolve ? (
    <Link
      href={`/pokemon/${evolve.name}`}
      className="flex flex-col items-center gap-0 justify-center"
    >
      {evolve.sprites.front_default ? (
        <Image
          src={evolve.sprites.front_default}
          alt={evolve.name}
          width={100}
          height={100}
        />
      ) : null}
      <p>{capitalize(evolve.name)}</p>
    </Link>
  ) : null;
}

export default PokemonEvolve;
