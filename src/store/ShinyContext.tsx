"use client";
import { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export type ShinyContextType = {
  shiny: boolean;
  toggleShiny: (shiny: boolean) => void;
};

export const ShinyContext = createContext<ShinyContextType | null>(null);

export const ShinyProvider = ({ children }: Props) => {
  const [shiny, setShiny] = useState(false);

  const toggleShiny = (shiny: boolean) => {
    setShiny(!shiny);
  };

  return (
    <ShinyContext.Provider value={{ shiny, toggleShiny }}>
      {children}
    </ShinyContext.Provider>
  );
};
