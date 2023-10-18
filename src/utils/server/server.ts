"use server"
import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();


export type Pokemon = {
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
  }


export const fetchPokemons = async ( offset: number, limit: number) => {
   
// 

const data = await fetch(
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
)
  .then(async (res) => await res.json())
  .then((res: { results: { name: string; url: string }[] }) =>
    Promise.all(
      res.results.map(
        async (e) => await fetch(e.url).then(async (res) => await res.json())
      )
    )
  );
console.log(data[0].id);
  return data
}

// const interval = {
//     offset,
//     limit
// }

    // const data = await P.getPokemonsList(interval).then((data: any) => {
    //     console.log(data.results[0]);

   
        
//         const pokemonsData = data.results.map(async (pokemon: { name: string; url: string }) => {
//       const pokemonsData = await P.getResource(pokemon.url);
// const data = pokemonsData
//       return data;
//     })
//     return Promise.all(pokemonsData);
//     })

//     return data;
//   };

