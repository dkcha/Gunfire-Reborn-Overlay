// src/data/buildArchetypes.ts - UPDATED

import type { BuildArchetype } from "../types";

export const buildArchetypes: BuildArchetype[] = [
  // ============================================================================
  // GEMINI-SPECIFIC BUILDS (Highest Priority)
  // ============================================================================

  {
    id: "magazine_stacking",
    name: "Magazine Stacking (1-Bullet Build)",
    description:
      "Uses Magazine Share Gemini with 1-magazine weapons to stack infinite damage",
    coreScrolls: ["scroll_advanced_depot", "scroll_against_the_flow"],
    coreTags: [
      "magazine_stacking",
      "ammo_capacity",
      "rate_of_fire",
      "weapon_damage",
    ],
    requiredGemini: "magazine_share",
    powerLevel: 10,
    difficulty: "hard",
  },

  {
    id: "dual_element",
    name: "Dual Element Fusion",
    description:
      "Uses Element Share Gemini to apply multiple elemental effects simultaneously",
    coreScrolls: ["scroll_elemental_weave", "scroll_elemental_catalyst"],
    coreTags: [
      "dual_element",
      "elemental_damage",
      "fire_damage",
      "lightning_damage",
      "corrosion_damage",
      "burning",
      "shock",
      "decay",
    ],
    requiredGemini: "element_share",
    powerLevel: 9,
    difficulty: "medium",
  },

  {
    id: "crit_multiplier",
    name: "Crit Multiplier (CritX Share)",
    description:
      "Uses CritX Share Gemini to combine weapon crit multipliers for massive damage",
    coreScrolls: ["scroll_concentrated_strike"],
    coreTags: [
      "crit_scaling",
      "critical_hit",
      "weakspot_damage",
      "accuracy",
      "weapon_damage",
    ],
    requiredGemini: "critx_share",
    powerLevel: 9,
    difficulty: "medium",
  },

  // ============================================================================
  // TRADITIONAL BUILDS (From Original)
  // ============================================================================

  {
    id: "no_reload",
    name: "No-Reload Build",
    description: "Never reload, stack damage infinitely with continuous fire",
    coreScrolls: [
      "scroll_merciless_combo",
      "scroll_advanced_depot",
      "scroll_against_the_flow",
    ],
    coreTags: ["no_reload", "ammo_capacity", "rate_of_fire", "weapon_damage"],
    recommendedAscensions: [],
    powerLevel: 9,
    difficulty: "medium",
  },

  {
    id: "elemental_fire",
    name: "Fire Elemental",
    description: "Maximize burning damage and fire-based combos",
    coreScrolls: ["scroll_blazing_hoop", "scroll_elemental_catalyst"],
    coreTags: ["fire_damage", "elemental_damage", "burning", "area_damage"],
    recommendedAscensions: ["asc_flame_enthusiasm", "asc_combustion"],
    powerLevel: 8,
    difficulty: "easy",
  },

  {
    id: "elemental_lightning",
    name: "Lightning Elemental",
    description: "Chain lightning and shock enemies for AoE damage",
    coreScrolls: ["scroll_elemental_catalyst"],
    coreTags: ["lightning_damage", "elemental_damage", "shock", "area_damage"],
    recommendedAscensions: [],
    powerLevel: 8,
    difficulty: "easy",
  },

  {
    id: "elemental_corrosion",
    name: "Corrosion Elemental",
    description: "Decay and area control through corrosive damage",
    coreScrolls: ["scroll_elemental_catalyst"],
    coreTags: ["corrosion_damage", "elemental_damage", "decay", "area_damage"],
    recommendedAscensions: [],
    powerLevel: 7,
    difficulty: "medium",
  },

  {
    id: "skill_damage",
    name: "Skill Damage",
    description:
      "Focus on abilities with cooldown reduction and skill enhancement",
    coreScrolls: ["scroll_skill_bible", "scroll_magic_watch"],
    coreTags: [
      "skill_damage",
      "cooldown_reduction",
      "skill_capacity",
      "skill_enhancement",
    ],
    recommendedAscensions: [],
    powerLevel: 8,
    difficulty: "easy",
  },

  {
    id: "critical_hit",
    name: "Critical Hit Build",
    description: "Maximize critical damage for burst potential",
    coreScrolls: ["scroll_concentrated_strike"],
    coreTags: ["critical_hit", "weakspot_damage", "accuracy", "weapon_damage"],
    recommendedAscensions: [],
    powerLevel: 8,
    difficulty: "medium",
  },

  {
    id: "lucky_shot",
    name: "Lucky Shot Build",
    description: "Consistent damage spikes through lucky shot procs",
    coreScrolls: ["scroll_lucky_shot"],
    coreTags: ["lucky_shot", "weapon_damage", "rate_of_fire"],
    recommendedAscensions: [],
    powerLevel: 7,
    difficulty: "easy",
  },

  {
    id: "movement_speed",
    name: "Movement Speed",
    description: "High mobility with speed-scaling damage",
    coreScrolls: [],
    coreTags: ["movement_speed", "weapon_damage"],
    recommendedAscensions: [],
    powerLevel: 6,
    difficulty: "hard",
  },

  {
    id: "weapon_damage",
    name: "Pure Weapon Damage",
    description: "Raw gun damage scaling without specific mechanics",
    coreScrolls: [],
    coreTags: ["weapon_damage", "damage_amplification"],
    recommendedAscensions: [],
    powerLevel: 7,
    difficulty: "easy",
  },

  {
    id: "tanky_sustain",
    name: "Tanky Sustain",
    description: "Survivability through shields, HP, and damage reduction",
    coreScrolls: [],
    coreTags: ["shields", "survivability", "damage_reduction", "healing"],
    recommendedAscensions: [],
    powerLevel: 6,
    difficulty: "easy",
  },

  {
    id: "glass_cannon",
    name: "Glass Cannon",
    description: "Maximum damage at the cost of survivability",
    coreScrolls: ["scroll_glass_cannon"],
    coreTags: ["weapon_damage", "damage_amplification"],
    recommendedAscensions: [],
    powerLevel: 9,
    difficulty: "hard",
  },
];

// Helper function to get archetype by ID
export function getArchetypeById(id: string): BuildArchetype | undefined {
  return buildArchetypes.find((a) => a.id === id);
}

// Helper to get archetypes that require specific Gemini
export function getArchetypesByGemini(gemini: string): BuildArchetype[] {
  return buildArchetypes.filter((a) => a.requiredGemini === gemini);
}

// Helper to get archetypes by difficulty
export function getArchetypesByDifficulty(
  difficulty: "easy" | "medium" | "hard"
): BuildArchetype[] {
  return buildArchetypes.filter((a) => a.difficulty === difficulty);
}
