"use client";
import { ShinyContext, ShinyContextType } from "@/store/ShinyContext";
import { Button } from "@mantine/core";
import { useContext } from "react";

type Props = {};

function ShinyButton({}: Props) {
  const { shiny, toggleShiny } = useContext(ShinyContext) as ShinyContextType;

  return (
    <Button
      onClick={() => {
        toggleShiny(shiny);
      }}
      style={{
        background: shiny
          ? "white"
          : "linear-gradient(30deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
        color: "rgb(0, 0, 0)",
        borderColor: "rgb(0, 0, 0)",
        borderRadius: "5px",
        fontWeight: "bold",
        fontSize: "1.2rem",
        padding: "0.5rem 1rem",
        width: "fit-content",
        boxShadow: "0 0 0 1px rgb(0 0 0 / 5%), 0 0 0 rgb(0 0 0 / 5%)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "rgb(0, 0, 0)",
          color: "rgb(255, 255, 255)",
          borderColor: "rgb(255, 255, 255)",
          boxShadow:
            "0 0 0 1px rgb(255 255 255 / 5%), 0 0 0 rgb(255 255 255 / 5%)",
        },
      }}
    >
      {shiny ? "Normal" : "Shiny"}
    </Button>
  );
}

export default ShinyButton;
