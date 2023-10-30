import React from "react";

import Image from "next/image";
import Link from "next/link";
import { capitalize } from "@/utils/functions/capitalize";

async function PokemonEvolve({ name }: { name: string }) {
  const evolve = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
    async (res) => {
      if (res.status === 404) {
        return null;
      }

      return await res.json();
    }
  );

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
