# Pokedex GUI

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- Browse Pokemon data from PokeAPI
- View Pokemon TCG cards
- Local data support: Download and use data locally instead of making API calls
- User authentication and collections

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Using Local Data

By default, the application fetches data from external APIs (PokeAPI and Pokemon TCG API). You can download the data locally to improve performance and reduce API calls.

### Download Data

Run the Python script to download all Pokemon and TCG data:

```bash
# Download all data (Pokemon + TCG)
python3 scripts/download_data.py

# Download only Pokemon data
python3 scripts/download_data.py pokemon

# Download only TCG data
python3 scripts/download_data.py tcg
```

The script will create the following files in `src/data/`:
- `pokemon_full.json` - Complete Pokemon data
- `pokemon_species.json` - Species information
- `evolution_chains.json` - Evolution chain data
- `tcg_sets.json` - Pokemon TCG card sets
- `tcg_cards.json` - Pokemon TCG cards

**Note:** The full download can take 20-30 minutes depending on your internet connection.

### How It Works

- The application automatically detects if local data files exist
- If local data is available, it uses that instead of making API calls
- If local data is not available, it falls back to the external APIs
- This provides flexibility and improves performance when local data is present

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
