"use client";

import React from "react";
import Card from "antd/es/card/Card";

function PokemonCard({ children }: { children: React.ReactNode }) {
  return <Card>{children}</Card>;
}

export default PokemonCard;
