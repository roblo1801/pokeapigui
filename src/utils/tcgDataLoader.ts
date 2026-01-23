/**
 * Data loading utilities for local TCG data
 * These functions load data from local JSON files instead of making API calls
 */

// For now, this will still use the API since we don't have local TCG data yet
// When scripts/download_data.py is run, it will create tcg_sets.json and tcg_cards.json
// which can be imported here

const POKEMON_TCG_API_KEY = "35688f31-3b82-46e8-88e9-c0775c640cd8";

// Try to load local data if available
let localSetsData: any = null;
let localCardsData: any = null;

try {
  // Dynamic import to avoid build errors if files don't exist
  localSetsData = require('@/data/tcg_sets.json');
} catch (e) {
  // File doesn't exist yet, will use API
}

try {
  localCardsData = require('@/data/tcg_cards.json');
} catch (e) {
  // File doesn't exist yet, will use API
}

/**
 * Check if local TCG data is available
 */
export function hasLocalTCGData(): boolean {
  return localSetsData !== null && localCardsData !== null;
}

/**
 * Get all TCG sets
 */
export async function getTCGSets(): Promise<any> {
  // If we have local data, use it
  if (localSetsData) {
    return localSetsData;
  }
  
  // Otherwise, fall back to API
  const response = await fetch(
    'https://api.pokemontcg.io/v2/sets?orderBy=releaseDate',
    {
      headers: {
        'X-Api-Key': POKEMON_TCG_API_KEY,
      },
      cache: 'force-cache',
    }
  );
  
  return response.json();
}

/**
 * Get a specific TCG set by ID
 */
export async function getTCGSet(setId: string): Promise<any> {
  // If we have local data, find the set
  if (localSetsData) {
    const set = localSetsData.data.find((s: any) => s.id === setId);
    return { data: set };
  }
  
  // Otherwise, fall back to API
  const response = await fetch(
    `https://api.pokemontcg.io/v2/sets/${setId}`,
    {
      headers: {
        'X-Api-Key': POKEMON_TCG_API_KEY,
      },
      cache: 'force-cache',
    }
  );
  
  return response.json();
}

/**
 * Get cards from a specific set
 */
export async function getTCGCardsFromSet(setId: string): Promise<any> {
  // If we have local data, filter cards
  if (localCardsData) {
    const cards = localCardsData.filter((card: any) => card.set.id === setId);
    return { data: cards };
  }
  
  // Otherwise, fall back to API
  const response = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=!set.id:${setId}`,
    {
      headers: {
        'X-Api-Key': POKEMON_TCG_API_KEY,
      },
      cache: 'force-cache',
    }
  );
  
  return response.json();
}

/**
 * Get a specific card by ID
 */
export async function getTCGCard(cardId: string): Promise<any> {
  // If we have local data, find the card
  if (localCardsData) {
    const card = localCardsData.find((c: any) => c.id === cardId);
    return { data: card };
  }
  
  // Otherwise, fall back to API
  const response = await fetch(
    `https://api.pokemontcg.io/v2/cards/${cardId}`,
    {
      headers: {
        'X-Api-Key': POKEMON_TCG_API_KEY,
      },
      cache: 'force-cache',
    }
  );
  
  return response.json();
}
