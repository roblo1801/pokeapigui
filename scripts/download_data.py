#!/usr/bin/env python3
"""
Script to download Pokemon and TCG data from external APIs and save locally.
This allows the application to work with local data instead of making external API calls.
"""

import json
import os
import sys
import time
from pathlib import Path
from typing import Any, Dict, List
import urllib.request
import urllib.error

# Base URLs for APIs
POKEAPI_BASE = "https://pokeapi.co/api/v2"
POKEMON_TCG_BASE = "https://api.pokemontcg.io/v2"
POKEMON_TCG_API_KEY = "35688f31-3b82-46e8-88e9-c0775c640cd8"

# Directory setup
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_DIR = PROJECT_ROOT / "src" / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)


def fetch_json(url: str, headers: Dict[str, str] = None) -> Any:
    """Fetch JSON data from a URL with error handling."""
    try:
        req = urllib.request.Request(url, headers=headers or {})
        with urllib.request.urlopen(req, timeout=30) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code} for URL: {url}")
        return None
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None


def download_pokemon_data():
    """Download all Pokemon data from PokeAPI."""
    print("Downloading Pokemon data...")
    
    # Get total count of Pokemon
    initial_data = fetch_json(f"{POKEAPI_BASE}/pokemon?limit=1")
    if not initial_data:
        print("Failed to fetch initial Pokemon data")
        return
    
    total_count = initial_data.get("count", 1025)
    print(f"Total Pokemon to download: {total_count}")
    
    # Fetch all Pokemon basic info
    all_pokemon_list = fetch_json(f"{POKEAPI_BASE}/pokemon?limit={total_count}&offset=0")
    if not all_pokemon_list:
        print("Failed to fetch Pokemon list")
        return
    
    pokemon_data = []
    pokemon_species_data = {}
    evolution_chains = {}
    
    results = all_pokemon_list.get("results", [])
    print(f"Downloading details for {len(results)} Pokemon...")
    
    for i, pokemon_entry in enumerate(results):
        if (i + 1) % 50 == 0:
            print(f"Progress: {i + 1}/{len(results)}")
            time.sleep(1)  # Rate limiting
        
        # Fetch detailed Pokemon data
        pokemon = fetch_json(pokemon_entry["url"])
        if not pokemon:
            continue
            
        pokemon_data.append(pokemon)
        
        # Fetch species data
        if pokemon.get("species"):
            species_url = pokemon["species"]["url"]
            species = fetch_json(species_url)
            if species:
                pokemon_species_data[pokemon["name"]] = species
                
                # Fetch evolution chain
                if species.get("evolution_chain"):
                    evo_url = species["evolution_chain"]["url"]
                    if evo_url not in evolution_chains:
                        evo_chain = fetch_json(evo_url)
                        if evo_chain:
                            evolution_chains[evo_url] = evo_chain
        
        # Small delay to be nice to the API
        time.sleep(0.1)
    
    # Save all data
    print("Saving Pokemon data...")
    
    with open(DATA_DIR / "pokemon_full.json", "w") as f:
        json.dump(pokemon_data, f, indent=2)
    print(f"Saved {len(pokemon_data)} Pokemon to pokemon_full.json")
    
    with open(DATA_DIR / "pokemon_species.json", "w") as f:
        json.dump(pokemon_species_data, f, indent=2)
    print(f"Saved {len(pokemon_species_data)} species data to pokemon_species.json")
    
    with open(DATA_DIR / "evolution_chains.json", "w") as f:
        json.dump(evolution_chains, f, indent=2)
    print(f"Saved {len(evolution_chains)} evolution chains to evolution_chains.json")


def download_pokemon_tcg_data():
    """Download Pokemon TCG data."""
    print("\nDownloading Pokemon TCG data...")
    
    headers = {
        "X-Api-Key": POKEMON_TCG_API_KEY
    }
    
    # Download sets
    print("Downloading TCG sets...")
    sets_data = fetch_json(f"{POKEMON_TCG_BASE}/sets?orderBy=releaseDate", headers)
    if sets_data:
        with open(DATA_DIR / "tcg_sets.json", "w") as f:
            json.dump(sets_data, f, indent=2)
        print(f"Saved {len(sets_data.get('data', []))} TCG sets to tcg_sets.json")
        
        # Download cards for each set
        all_cards = []
        sets = sets_data.get("data", [])
        print(f"Downloading cards from {len(sets)} sets...")
        
        for i, tcg_set in enumerate(sets):
            set_id = tcg_set["id"]
            print(f"Downloading cards from set {set_id} ({i+1}/{len(sets)})")
            
            page = 1
            while True:
                cards_url = f"{POKEMON_TCG_BASE}/cards?q=set.id:{set_id}&page={page}&pageSize=250"
                cards_data = fetch_json(cards_url, headers)
                
                if not cards_data or not cards_data.get("data"):
                    break
                
                all_cards.extend(cards_data["data"])
                
                # Check if there are more pages
                total_count = cards_data.get("totalCount", 0)
                if page * 250 >= total_count:
                    break
                    
                page += 1
                time.sleep(0.5)  # Rate limiting
        
        with open(DATA_DIR / "tcg_cards.json", "w") as f:
            json.dump(all_cards, f, indent=2)
        print(f"Saved {len(all_cards)} TCG cards to tcg_cards.json")
    else:
        print("Failed to fetch TCG sets")


def main():
    """Main function to download all data."""
    print("=" * 60)
    print("Pokemon Data Download Script")
    print("=" * 60)
    print()
    
    # Check if we should download specific data types
    args = sys.argv[1:] if len(sys.argv) > 1 else ["all"]
    
    if "all" in args or "pokemon" in args:
        download_pokemon_data()
    
    if "all" in args or "tcg" in args:
        download_pokemon_tcg_data()
    
    print("\n" + "=" * 60)
    print("Download complete!")
    print("=" * 60)


if __name__ == "__main__":
    main()
