export type TCGSet = {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: {
      unlimited?: string;
      expanded?: string;
      standard?: string;
    };
    ptcgoCode: string;
    releaseDate: string;
    updatedAt: string;
    images: {
      symbol: string;
      logo: string;
    };
  }

  export type TCGCard = {
      id: string;
      name: string;
      supertype: string;
      subtypes: string[];
      level: string;
      hp: string;
      types: string[];
      evolvesFrom: string;
      evolvesTo: string[];
      rules: string[];
      ancientTrait: {
        name: string;
        text: string;
      };
      abilities: {
        name: string;
        text: string;
        type: string;
      }[];
      attacks: string[];
      weaknesses: string[];
      resistances: string[];
      retreatCost: string[];
      convertedRetreatCost: number;
      set: TCGSet;
      number: string;
      artist: string;
      rarity: string;
      flavorText: string;
      nationalPokedexNumbers: number[];
      legalities: string;
      regulationMark: string;
      images: {
        small: string;
        large: string;
      };
      tcgplayer: {
        url: string;
        updatedAt: string;
        prices: {
            normal: {
                low: number;
                high: number;
                market: number;
                directLow: number | null;
            }
            reverseHolofoil: {
                low: number;
                high: number;
                market: number;
                directLow: number | null;
      }
    }};
      cardmarket: {
        url: string;
        updatedAt: string;
        prices: {
            averageSellPrice: number
            lowPrice: number
            trendPrice: number
            germanProLow: number
            suggestedPrice: number
            reverseHoloSell: number
            reverseHoloLow: number
            reverseHoloTrend: number
            lowPriceExPlus: number
            avg1: number
            avg7: number
            avg30: number
            reverseHoloAvg1: number
            reverseHoloAvg7: number
            reverseHoloAvg30: number
    }}}