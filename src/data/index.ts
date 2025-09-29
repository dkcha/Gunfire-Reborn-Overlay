/**
 * Central data export point
 * Import all game data here and export for use throughout the app
 */

import type {
  Hero,
  Scroll,
  BuildArchetypeDefinition,
  SynergyTag,
  BuildArchetype,
  Ascension,
} from "../types";

type SynergisticItem = Scroll | Ascension;

// Heroes
import { crownPrince } from "./heroes/crownPrince";
import { leiLuo } from "./heroes/leiLuo";

// Scrolls
import normalScrolls from "./scrolls/normal";
import { rareScrolls, legendaryScrolls } from "./scrolls/rareAndLegendary";

// Build Archetypes
import buildArchetypes from "./buildArchetypes";

// ============================================================================
// HEROES
// ============================================================================

export const allHeroes: Hero[] = [
  crownPrince,
  leiLuo,
  // TODO: Add remaining heroes
  // aoB ai, qingYan, tao, qianSui, xingZhe, li, nona, ziXiao, lyn, momo
];

export const getHeroById = (id: string): Hero | undefined => {
  return allHeroes.find((hero) => hero.id === id);
};

export const getHeroByName = (name: string): Hero | undefined => {
  return allHeroes.find(
    (hero) => hero.name.toLowerCase() === name.toLowerCase()
  );
};

// ============================================================================
// SCROLLS
// ============================================================================

export const allScrolls: Scroll[] = [
  ...normalScrolls,
  ...rareScrolls,
  ...legendaryScrolls,
  // TODO: Add remaining scrolls and cursed scrolls
];

export const getScrollById = (id: string): Scroll | undefined => {
  return allScrolls.find((scroll) => scroll.id === id);
};

export const getScrollsByRarity = (rarity: Scroll["rarity"]): Scroll[] => {
  return allScrolls.filter((scroll) => scroll.rarity === rarity);
};

export const getScrollsByTag = (tag: SynergyTag): Scroll[] => {
  return allScrolls.filter((scroll) => scroll.tags.includes(tag));
};

export const getScrollsByArchetype = (archetype: BuildArchetype): Scroll[] => {
  return allScrolls.filter((scroll) =>
    scroll.buildArchetypes.includes(archetype)
  );
};

// ============================================================================
// BUILD ARCHETYPES
// ============================================================================

export { buildArchetypes };

export const getArchetypeById = (
  id: string
): BuildArchetypeDefinition | undefined => {
  return buildArchetypes.find((archetype) => archetype.id === id);
};

// ============================================================================
// STATISTICS
// ============================================================================

export const dataStats = {
  totalHeroes: allHeroes.length,
  totalScrolls: allScrolls.length,
  normalScrolls: normalScrolls.length,
  rareScrolls: rareScrolls.length,
  legendaryScrolls: legendaryScrolls.length,
  cursedScrolls: 0, // TODO
  totalArchetypes: buildArchetypes.length,
};

// ============================================================================
// SYNERGY UTILITIES
// ============================================================================

/**
 * Check if two items have synergy
 */
export const checkSynergy = (
  itemA: SynergisticItem,
  itemB: SynergisticItem
): boolean => {
  if (!itemA || !itemB) return false;

  // Check if itemA lists itemB as synergy
  if (itemA.synergyWith?.includes(itemB.id)) return true;

  // Check if itemB lists itemA as synergy
  if (itemB.synergyWith?.includes(itemA.id)) return true;

  // Check tag overlap
  const sharedTags =
    itemA.tags?.filter((tag) => itemB.tags?.includes(tag)) || [];
  return sharedTags.length >= 2;
};

/**
 * Check if two items have anti-synergy
 */
export const checkAntiSynergy = (
  itemA: SynergisticItem,
  itemB: SynergisticItem
): boolean => {
  if (!itemA || !itemB) return false;

  if (itemA.antiSynergyWith?.includes(itemB.id)) return true;
  if (itemB.antiSynergyWith?.includes(itemA.id)) return true;

  return false;
};

/**
 * Get all items that synergize with the given item
 */
export const getSynergisticItems = (
  item: SynergisticItem
): SynergisticItem[] => {
  if (!item) return [];

  return allScrolls.filter((scroll) => checkSynergy(item, scroll));
};

/**
 * Calculate synergy score between an item and a list of acquired items
 */
export const calculateSynergyScore = (
  item: SynergisticItem,
  acquiredItems: SynergisticItem[]
): number => {
  let score = 0;

  for (const acquired of acquiredItems) {
    if (checkSynergy(item, acquired)) {
      score += 10;
    }
    if (checkAntiSynergy(item, acquired)) {
      score -= 15;
    }
  }

  return score;
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  heroes: allHeroes,
  scrolls: allScrolls,
  buildArchetypes,
  stats: dataStats,

  // Utility functions
  getHeroById,
  getHeroByName,
  getScrollById,
  getScrollsByRarity,
  getScrollsByTag,
  getScrollsByArchetype,
  getArchetypeById,
  checkSynergy,
  checkAntiSynergy,
  getSynergisticItems,
  calculateSynergyScore,
};
