"use client";
import { Pokemon } from "@/types/PokemonType";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@mantine/core";
import { removeFromCards, removeFromPokemon } from "@/supabaseRequests";
import React from "react";
import { mutate } from "swr";
import { TCGCard } from "@/types/TCGTypes";

type Props = {
  card: TCGCard;
};

export default function RemoveFromCardsButton({ card }: Props) {
  const { userId, getToken } = useAuth();

  const removeFromCollection = async (data: any) => {
    const token = await getToken({ template: "supabase" });
    const collection = await removeFromCards({ token, userId, data });

    if (collection) return mutate("cardData");
    return "Failed";
  };

  return (
    <div className="flex justify-center my-2 w-full">
      <Button
        variant="gradient"
        gradient={{ from: "red.5", to: "red.9" }}
        onClick={() => removeFromCollection(card)}
        style={{ border: "1px solid black", boxShadow: "2px 2px 2px grey" }}
      >
        Remove
      </Button>
    </div>
  );
}
