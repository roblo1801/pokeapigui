"use client";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@mantine/core";
import { addToCards } from "@/supabaseRequests";
import React from "react";
import { TCGCard } from "@/types/TCGTypes";
import { IconPlus } from "@tabler/icons-react";
import { mutate } from "swr";

type Props = {
  card: TCGCard;
};

export default function AddToCardsMiniButton({ card }: Props) {
  const { userId, getToken } = useAuth();

  const addToCollection = async (data: TCGCard) => {
    const token = await getToken({ template: "supabase" });
    const collection = await addToCards({ token, userId, data });
    if (collection) return mutate("cardData");
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
        <IconPlus />
      </Button>
    </div>
  );
}
