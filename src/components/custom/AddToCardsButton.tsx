"use client";
import { Pokemon } from "@/types/PokemonType";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@mantine/core";
import { addToCards, addToPokemon } from "@/supabaseRequests";
import React from "react";
import { TCGCard } from "@/types/TCGTypes";

type Props = {
  card: TCGCard;
};

function AddToCardsButton({ card }: Props) {
  const { userId, getToken } = useAuth();

  const addToCollection = async (data: TCGCard) => {
    const token = await getToken({ template: "supabase" });
    const collection = await addToCards({ token, userId, data });
    if (collection) return "Success";
    return "Failed";
  };

  return (
    <div className="flex justify-center my-4 w-full">
      <Button
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        onClick={() => addToCollection(card)}
        style={{ border: "1px solid black", boxShadow: "2px 2px 2px grey" }}
      >
        Add To Collection
      </Button>
    </div>
  );
}

export default AddToCardsButton;
