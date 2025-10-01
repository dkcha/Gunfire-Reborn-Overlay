// src/data/wikiBuildTemplates.ts

import type { SynergyTag, GeminiInscription } from "../types";

export interface WikiBuildTemplate {
  id: string;
  name: string;
  heroId: string;
  difficulty: "normal" | "elite" | "reincarnation";
  description: string;
  source: string; // Wiki URL

  // Core items (must-have for build to work)
  coreScrolls: string[];
  coreAscensions: string[];

  // Recommended but not required
  recommendedScrolls?: string[];
  recommendedAscensions?: string[];

  // Weapon preferences
  recommendedWeaponTypes?: string[];
  recommendedGemini?: GeminiInscription;

  // For detection and scoring
  primaryTags: SynergyTag[]; // Main build focus
  secondaryTags: SynergyTag[]; // Supporting elements

  // Playstyle notes
  playstyle: string;
  difficulty_rating: "easy" | "medium" | "hard";

  // What makes this build work
  keyStrengths: string[];
  keyWeaknesses: string[];
}

// ============================================================================
// CROWN PRINCE BUILDS
// ============================================================================

export const crownPrinceFireBuild: WikiBuildTemplate = {
  id: "cp_fire_elemental",
  name: "Fire Elemental Spam",
  heroId: "crown_prince",
  difficulty: "reincarnation",
  description:
    "Stack burning damage and elemental effects for massive AoE clear",
  source: "https://gunfirereborn.fandom.com/wiki/Crown_Prince",

  coreScrolls: ["scroll_blazing_hoop", "scroll_elemental_catalyst"],

  coreAscensions: [
    "asc_flame_enthusiasm", // Fire damage boost
    "asc_combustion", // Burning synergy
  ],

  recommendedScrolls: ["scroll_elemental_weave"],

  recommendedWeaponTypes: ["rifle", "submachine_gun"],
  recommendedGemini: "element_share",

  primaryTags: ["fire_damage", "elemental_damage", "burning"],
  secondaryTags: ["area_damage", "skill_damage"],

  playstyle:
    "Focus on spreading burning status effects. Use smoke grenade with Combustion for massive burning damage. Stack fire damage and elemental effect chance.",
  difficulty_rating: "easy",

  keyStrengths: [
    "Excellent AoE clear",
    "Strong against grouped enemies",
    "Scales well into late game",
  ],

  keyWeaknesses: [
    "Weaker single-target damage",
    "Requires specific ascensions",
    "Less effective against fire-resistant enemies",
  ],
};

export const crownPrinceLightningBuild: WikiBuildTemplate = {
  id: "cp_lightning_chain",
  name: "Lightning Chain",
  heroId: "crown_prince",
  difficulty: "reincarnation",
  description: "Chain lightning damage across multiple enemies",
  source: "https://gunfirereborn.fandom.com/wiki/Crown_Prince",

  coreScrolls: ["scroll_elemental_catalyst"],

  coreAscensions: [
    "asc_electrodominance", // Lightning damage
  ],

  recommendedScrolls: ["scroll_elemental_weave"],

  recommendedWeaponTypes: ["submachine_gun"],
  recommendedGemini: "element_share",

  primaryTags: ["lightning_damage", "elemental_damage", "shock"],
  secondaryTags: ["area_damage", "rate_of_fire"],

  playstyle:
    "Stack lightning damage and shock chance. Lightning chains to nearby enemies for excellent crowd control.",
  difficulty_rating: "medium",

  keyStrengths: [
    "Great crowd control",
    "Fast clear speed",
    "Good against shielded enemies",
  ],

  keyWeaknesses: ["Less effective in open areas", "Requires enemy grouping"],
};

// ============================================================================
// LEI LUO BUILDS
// ============================================================================

export const leiLuoSpeedBuild: WikiBuildTemplate = {
  id: "ll_lightning_speed",
  name: "Lightning Speed",
  heroId: "lei_luo",
  difficulty: "reincarnation",
  description: "High mobility lightning build with fast clear",
  source: "https://gunfirereborn.fandom.com/wiki/Lei_Luo",

  coreScrolls: [],

  coreAscensions: [
    "asc_thunder_turbo", // Lightning on crit
    "asc_fulminous_zap", // Lightning damage
  ],

  recommendedScrolls: ["scroll_elemental_catalyst"],

  recommendedWeaponTypes: ["submachine_gun", "pistol"],
  recommendedGemini: "critx_share",

  primaryTags: ["lightning_damage", "movement_speed", "critical_hit"],
  secondaryTags: ["rate_of_fire", "skill_damage"],

  playstyle:
    "Move fast, crit often, spread lightning. Lei Luo excels at hit-and-run tactics with high mobility.",
  difficulty_rating: "medium",

  keyStrengths: ["Very high mobility", "Safe playstyle", "Good scaling"],

  keyWeaknesses: ["Lower HP pool", "Requires accuracy", "Skill-dependent"],
};

export const leiLuoNoReloadBuild: WikiBuildTemplate = {
  id: "ll_no_reload",
  name: "No-Reload DPS",
  heroId: "lei_luo",
  difficulty: "reincarnation",
  description: "Never reload, stack infinite damage with Merciless Combo",
  source: "https://gunfirereborn.fandom.com/wiki/Lei_Luo",

  coreScrolls: [
    "scroll_merciless_combo",
    "scroll_advanced_depot",
    "scroll_against_the_flow",
  ],

  coreAscensions: [],

  recommendedWeaponTypes: ["submachine_gun", "rifle"],
  recommendedGemini: "magazine_share",

  primaryTags: ["no_reload", "ammo_capacity", "weapon_damage"],
  secondaryTags: ["rate_of_fire", "magazine_stacking"],

  playstyle:
    "Never reload. Damage stacks infinitely with Merciless Combo. Use large magazine weapons and never stop firing.",
  difficulty_rating: "medium",

  keyStrengths: [
    "Infinite damage scaling",
    "Simple execution",
    "Very strong late game",
  ],

  keyWeaknesses: [
    "Requires specific scrolls",
    "Vulnerable while stacking",
    "Poor early game",
  ],
};

// ============================================================================
// AGGREGATED TEMPLATES
// ============================================================================

export const allWikiBuilds: WikiBuildTemplate[] = [
  crownPrinceFireBuild,
  crownPrinceLightningBuild,
  leiLuoSpeedBuild,
  leiLuoNoReloadBuild,
];

// ============================================================================
// QUERY FUNCTIONS
// ============================================================================

export function getWikiBuildsByHero(heroId: string): WikiBuildTemplate[] {
  return allWikiBuilds.filter((b) => b.heroId === heroId);
}

export function getWikiBuildById(id: string): WikiBuildTemplate | undefined {
  return allWikiBuilds.find((b) => b.id === id);
}

export function getWikiBuildsByDifficulty(
  difficulty: string
): WikiBuildTemplate[] {
  return allWikiBuilds.filter((b) => b.difficulty === difficulty);
}

export function isItemCoreToTemplate(
  itemId: string,
  template: WikiBuildTemplate
): boolean {
  return (
    template.coreScrolls.includes(itemId) ||
    template.coreAscensions.includes(itemId)
  );
}

export function isItemRecommendedForTemplate(
  itemId: string,
  template: WikiBuildTemplate
): boolean {
  return (
    template.recommendedScrolls?.includes(itemId) ||
    template.recommendedAscensions?.includes(itemId) ||
    false
  );
}

export function getTemplateFitScore(
  itemTags: SynergyTag[],
  template: WikiBuildTemplate
): number {
  let score = 0;

  // Primary tags are worth more
  itemTags.forEach((tag) => {
    if (template.primaryTags.includes(tag)) {
      score += 3;
    } else if (template.secondaryTags.includes(tag)) {
      score += 1;
    }
  });

  return score;
}
