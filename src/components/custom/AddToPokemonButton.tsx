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
  const { userId, getToken, isSignedIn } = useAuth();

  const addToCollection = async (data: any) => {
    const token = await getToken({ template: "supabase" });
    const collection = await addToPokemon({ token, userId, data });
    if (collection) return "Success";
    return "Failed";
  };

  return isSignedIn ? (
    <div className="flex justify-center my-4 w-full">
      <Button
        onClick={() => addToCollection(pokemon)}
        style={{
          border: "1px solid black",
          boxShadow: "2px 2px 2px grey",
          background: "linear-gradient(90deg, indigo, cyan 90%)",
        }}
      >
        Add To Collection
      </Button>
    </div>
  ) : null;
}

export default AddToPokemonButton;
