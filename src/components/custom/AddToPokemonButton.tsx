"use client";
import { Pokemon } from "@/types/PokemonType";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@mantine/core";
import { addToPokemon } from "@/supabaseRequests";
import React from "react";

type Props = {
  pokemon: Pokemon;
};

function AddToPokemonButton({ pokemon }: Props) {
  const { userId, getToken } = useAuth();

  const addToCollection = async (data: any) => {
    const token = await getToken({ template: "supabase" });
    const collection = await addToPokemon({ token, userId, data });
    if (collection) return "Success";
    return "Failed";
  };

  return (
    <div className="flex justify-center my-4 w-full">
      <Button
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        onClick={() => addToCollection(pokemon)}
        style={{ border: "1px solid black", boxShadow: "2px 2px 2px grey" }}
      >
        Add To Collection
      </Button>
    </div>
  );
}

export default AddToPokemonButton;
