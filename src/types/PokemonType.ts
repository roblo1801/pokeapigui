export type Pokemon = {
    name: string;
    sprites: {
        other: {
            dream_world: { front_default: string 
                }
                 home: { front_default: string
                    };
                      "official-artwork": { front_default: string
        ;}}
         front_default: string 
};
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