export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 export function decimetersToFeetAndInches(n: number): {
    foot: number;
    inch: number;
  } {
    const inches = n * 3.93701;
    const foot = Math.floor(inches / 12);
    const inch = Math.floor(inches % 12);
    return { foot, inch };
  }
  
 export function hectogramsToLbs(n: number): number {
    const conversionFactor = 2.20462262;
    return Math.floor(n * conversionFactor) / 10;
  } 