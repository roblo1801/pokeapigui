import React from "react";

function PokemonType({ type }: { type: string }) {
  return (
    <div className={`${type} type`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </div>
  );
}

export default PokemonType;
