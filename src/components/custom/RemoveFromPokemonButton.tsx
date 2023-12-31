"use client";
import { Pokemon } from "@/types/PokemonType";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@mantine/core";
import { removeFromPokemon } from "@/supabaseRequests";
import React from "react";
import { mutate } from "swr";
import { IconMinus } from "@tabler/icons-react";

type Props = {
  pokemon: Pokemon;
};

function RemoveFromPokemonButton({ pokemon }: Props) {
  const { userId, getToken } = useAuth();

  const removeFromCollection = async (data: any) => {
    const token = await getToken({ template: "supabase" });
    const collection = await removeFromPokemon({ token, userId, data });

    if (collection) return mutate("userData");
    return "Failed";
  };

  return (
    <div className="flex justify-center my-2 w-full">
      <Button
        onClick={() => removeFromCollection(pokemon)}
        style={{
          border: "1px solid black",
          boxShadow: "2px 2px 2px grey",
          borderRadius: "50%",
          padding: "0px",
          width: "20px",
          height: "20px",
          background: "linear-gradient(90deg, #ff0000, #660000 90%)",
        }}
      >
        <IconMinus />
      </Button>
    </div>
  );
}

export default RemoveFromPokemonButton;
