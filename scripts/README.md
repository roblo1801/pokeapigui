# Data Download Scripts

This directory contains scripts to download Pokemon and TCG data from external APIs.

## download_data.py

Downloads data from PokeAPI and Pokemon TCG API and saves it locally to the `src/data` directory.

### Usage

```bash
# Download all data (Pokemon + TCG)
python3 scripts/download_data.py

# Download only Pokemon data
python3 scripts/download_data.py pokemon

# Download only TCG data
python3 scripts/download_data.py tcg
```

### What it downloads

**Pokemon Data:**
- `pokemon_full.json` - Complete details for all Pokemon (abilities, stats, moves, sprites, etc.)
- `pokemon_species.json` - Species information for all Pokemon
- `evolution_chains.json` - Evolution chain data

**TCG Data:**
- `tcg_sets.json` - All Pokemon TCG card sets
- `tcg_cards.json` - All Pokemon TCG cards

### Requirements

- Python 3.6 or higher
- Internet connection
- No external dependencies (uses only Python standard library)

### Notes

- The script includes rate limiting to be respectful to the APIs
- Full download can take 20-30 minutes depending on your connection
- Data files are stored in `src/data/`
- Some large files may be excluded from git (see .gitignore)
