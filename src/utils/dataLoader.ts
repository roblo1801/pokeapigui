/**
 * Data loading utilities for local Pokemon data
 * These functions load data from local JSON files instead of making API calls
 */

import pokemonFullData from '@/data/pokemon.json';

// Type definitions
export interface PokemonData {
  name: string;
  sprites: string;
  id: number;
  types: string[];
  height: number;
  weight: number;
  stats: number[];
  abilities: string[];
}

// Cache for loaded data
let pokemonCache: Map<string, any> | null = null;
let pokemonByIdCache: Map<number, any> | null = null;

/**
 * Initialize pokemon caches
 */
function initializePokemonCache() {
  if (!pokemonCache) {
    pokemonCache = new Map();
    pokemonByIdCache = new Map();
    
    const pokemonArray = pokemonFullData as PokemonData[];
    pokemonArray.forEach((pokemon: PokemonData) => {
      // Convert simplified format to full PokeAPI format
      const fullPokemon = convertToFullFormat(pokemon);
      pokemonCache!.set(pokemon.name.toLowerCase(), fullPokemon);
      pokemonByIdCache!.set(pokemon.id, fullPokemon);
    });
  }
}

/**
 * Convert simplified pokemon data to full PokeAPI format
 */
function convertToFullFormat(simplified: PokemonData): any {
  return {
    id: simplified.id,
    name: simplified.name,
    height: simplified.height,
    weight: simplified.weight,
    abilities: simplified.abilities.map((ability: string) => ({
      ability: { name: ability, url: `` },
      is_hidden: false,
      slot: 1,
    })),
    sprites: {
      front_default: simplified.sprites,
      other: {
        'official-artwork': {
          front_default: simplified.sprites,
        },
      },
    },
    stats: [
      { base_stat: simplified.stats[0], stat: { name: 'hp' } },
      { base_stat: simplified.stats[1], stat: { name: 'attack' } },
      { base_stat: simplified.stats[2], stat: { name: 'defense' } },
      { base_stat: simplified.stats[3], stat: { name: 'special-attack' } },
      { base_stat: simplified.stats[4], stat: { name: 'special-defense' } },
      { base_stat: simplified.stats[5], stat: { name: 'speed' } },
    ],
    types: simplified.types.map((type: string, index: number) => ({
      slot: index + 1,
      type: { name: type, url: `` },
    })),
    species: {
      name: simplified.name,
      url: ``,
    },
    moves: [],
    held_items: [],
  };
}

/**
 * Get a single Pokemon by name or ID
 */
export async function getPokemon(nameOrId: string | number): Promise<any> {
  initializePokemonCache();
  
  if (typeof nameOrId === 'number') {
    return pokemonByIdCache!.get(nameOrId) || null;
  }
  
  return pokemonCache!.get(nameOrId.toLowerCase()) || null;
}

/**
 * Get paginated list of Pokemon
 */
export async function getPokemonList(
  limit: number = 100,
  offset: number = 0
): Promise<any[]> {
  initializePokemonCache();
  
  const allPokemon = Array.from(pokemonByIdCache!.values()) as any[];
  return allPokemon.slice(offset, offset + limit);
}

/**
 * Get all Pokemon (for infinite scroll)
 */
export async function getAllPokemon(): Promise<any[]> {
  initializePokemonCache();
  return Array.from(pokemonByIdCache!.values()) as any[];
}

/**
 * Get Pokemon species data (mock for now)
 */
export async function getPokemonSpecies(name: string): Promise<any> {
  // For now, return mock data with evolution chain
  return {
    name: name,
    evolution_chain: {
      url: ``,
    },
    genera: [],
    flavor_text_entries: [],
  };
}

/**
 * Get Pokemon encounters (mock for now)
 */
export async function getPokemonEncounters(id: number): Promise<any[]> {
  // Return empty array for now
  return [];
}

/**
 * Get evolution chain (mock for now)
 */
export async function getEvolutionChain(url: string): Promise<any> {
  // Return mock evolution chain
  return {
    chain: {
      species: { name: '' },
      evolves_to: [],
    },
  };
}
