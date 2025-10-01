// src/data/index.ts - UPDATED

// Export all heroes
export { crownPrince } from "./heroes/crownPrince";
export { leiLuo } from "./heroes/leiLuo";

// Export all scrolls
export { normalScrolls } from "./scrolls/normal";
export { rareScrolls, legendaryScrolls } from "./scrolls/rareAndLegendary";

// Export build archetypes
export {
  buildArchetypes,
  getArchetypeById,
  getArchetypesByGemini,
  getArchetypesByDifficulty,
} from "./buildArchetypes";

// Export wiki build templates
export {
  allWikiBuilds,
  getWikiBuildsByHero,
  getWikiBuildById,
  getWikiBuildsByDifficulty,
  isItemCoreToTemplate,
  isItemRecommendedForTemplate,
  getTemplateFitScore,
} from "./wikiBuildTemplates";
export type { WikiBuildTemplate } from "./wikiBuildTemplates";

// Export weapons and Gemini
export {
  sampleWeapons,
  geminiInscriptions,
  getWeaponById,
  getWeaponsByType,
  getWeaponsWithGemini,
  canHaveGemini,
  calculateSharedCritX,
  calculateSharedMagazine,
  detectGeminiSynergy,
} from "./geminiInscriptions";

// Export recommendation engine
export {
  generateRecommendations,
  detectBuildArchetype,
} from "../utils/recommendationEngine";

import { crownPrince } from "./heroes/crownPrince";
import { leiLuo } from "./heroes/leiLuo";
import { normalScrolls } from "./scrolls/normal";
import { rareScrolls, legendaryScrolls } from "./scrolls/rareAndLegendary";
import { buildArchetypes } from "./buildArchetypes";
import type { Hero, Scroll, SynergyTag, BuildArchetype } from "../types";

// ============================================================================
// AGGREGATED DATA
// ============================================================================

export const allHeroes: Hero[] = [crownPrince, leiLuo];

export const allScrolls: Scroll[] = [
  ...normalScrolls,
  ...rareScrolls,
  ...legendaryScrolls,
];

// ============================================================================
// QUERY FUNCTIONS
// ============================================================================

export function getHeroById(id: string): Hero | undefined {
  return allHeroes.find((h) => h.id === id);
}

export function getHeroByName(name: string): Hero | undefined {
  return allHeroes.find((h) => h.name.toLowerCase() === name.toLowerCase());
}

export function getScrollById(id: string): Scroll | undefined {
  return allScrolls.find((s) => s.id === id);
}

export function getScrollsByRarity(rarity: string): Scroll[] {
  return allScrolls.filter((s) => s.rarity === rarity);
}

export function getScrollsByTag(tag: SynergyTag): Scroll[] {
  return allScrolls.filter((s) => s.tags.includes(tag));
}

export function getScrollsByArchetype(archetype: string): Scroll[] {
  return allScrolls.filter((s) => s.buildArchetypes.includes(archetype));
}

// ============================================================================
// SYNERGY ENGINE
// ============================================================================

export function checkSynergy(
  itemA: { id: string; synergyWith: string[] },
  itemB: { id: string }
): boolean {
  return itemA.synergyWith.includes(itemB.id);
}

export function checkAntiSynergy(
  itemA: { id: string; antiSynergyWith?: string[] },
  itemB: { id: string }
): boolean {
  return itemA.antiSynergyWith?.includes(itemB.id) || false;
}

export function getSynergisticItems(item: Scroll): Scroll[] {
  return allScrolls.filter(
    (s) => item.synergyWith.includes(s.id) || s.synergyWith.includes(item.id)
  );
}

export function calculateSynergyScore(
  item: Scroll,
  acquiredItems: Scroll[]
): number {
  let score = 0;

  acquiredItems.forEach((acquired) => {
    // Direct synergy
    if (checkSynergy(item, acquired) || checkSynergy(acquired, item)) {
      score += 10;
    }

    // Tag overlap
    const commonTags = item.tags.filter((tag) => acquired.tags.includes(tag));
    score += commonTags.length * 2;

    // Anti-synergy penalty
    if (checkAntiSynergy(item, acquired) || checkAntiSynergy(acquired, item)) {
      score -= 20;
    }
  });

  return score;
}

// ============================================================================
// STATISTICS
// ============================================================================

export function getDataStats() {
  return {
    heroes: {
      total: allHeroes.length,
      complete: allHeroes.length,
    },
    scrolls: {
      total: allScrolls.length,
      byRarity: {
        normal: getScrollsByRarity("normal").length,
        rare: getScrollsByRarity("rare").length,
        legendary: getScrollsByRarity("legendary").length,
        cursed: getScrollsByRarity("cursed").length,
      },
    },
    weapons: {
      total: 9,
    },
    archetypes: {
      total: buildArchetypes.length,
      geminiRequired: buildArchetypes.filter(
        (a: BuildArchetype) => a.requiredGemini
      ).length,
    },
  };
}
