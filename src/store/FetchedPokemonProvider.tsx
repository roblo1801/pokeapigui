"use client";
import { ReactNode, createContext } from "react";

type Pokemon = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  id: number;
  height: number;
  weight: number;
  base_experience: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
  species: { name: string };
  game_indices: { game_index: number; version: { name: string } }[];
  held_items: { item: { name: string } }[];
  location_area_encounters: string;
  is_default: boolean;
  forms: { name: string }[];
};

type Props = {
  children: ReactNode;
  pokemon: Pokemon[];
};

type FectchedPokemon = {
  pokemon: Pokemon[];
};

export const FetchedPokemonContext = createContext<FectchedPokemon>({
  pokemon: [],
});

export function FetchedPokemonProvider({ children, pokemon }: Props) {
  return (
    <FetchedPokemonContext.Provider value={{ pokemon }}>
      {children}
    </FetchedPokemonContext.Provider>
  );
}
