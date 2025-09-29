// Type definitions will go here
export interface Hero {
  id: string;
  name: string;
  description: string;
}

export interface Scroll {
  id: string;
  name: string;
  rarity: "normal" | "rare" | "legendary" | "cursed";
  effect: string;
}

export interface Ascension {
  id: string;
  name: string;
  heroId: string;
  levels: AscensionLevel[];
}

export interface AscensionLevel {
  level: number;
  effect: string;
}
