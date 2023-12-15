export type VersionGroupDetails =  {
       
  level_learned_at?: number;
  move_learn_method: { name: string; url: string };
  version_group: { name: string; url: string };
}[]

export type PokemonMove = {
   version_group_details: VersionGroupDetails;
move: { name: string };
}

export type Pokemon = {
    name: string;
    sprites: {
        other: {
            dream_world: { front_default: string 
                }
                 home: { front_default: string
                    };
                      "official-artwork": {
                        front_shiny: string; front_default: string
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
    moves: PokemonMove[];
    species: { name: string };
    game_indices: { game_index: number; version: { name: string } }[];
    held_items: { item: { name: string } }[];
    location_area_encounters: string;
    is_default: boolean;
    forms: { name: string }[];
  }

 