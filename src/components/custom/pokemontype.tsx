import React from "react";

function PokemonType({ type }: { type: string }) {
  return <div className={`${type} type`}></div>;
}

export default PokemonType;
