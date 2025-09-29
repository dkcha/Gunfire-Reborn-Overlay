import type { BuildArchetypeDefinition } from "../types";

/**
 * Build archetypes - common synergy patterns that define playstyles
 * These help the recommendation engine detect what build the player is going for
 */

export const buildArchetypes: BuildArchetypeDefinition[] = [
  {
    id: "no_reload",
    name: "No-Reload Build",
    description:
      "Never reload - maintain continuous fire with ammo sustain and stacking damage",

    coreTags: ["no_reload", "ammo", "magazine"],
    supportingTags: ["weapon_damage", "rate_of_fire"],

    coreScrolls: [
      "scroll_advanced_depot",
      "scroll_against_the_flow",
      "scroll_merciless_combo",
    ],
    coreAscensions: [],

    synergyMultiplier: 2.0,
    bestHeroes: ["ao_bai", "tao", "lei_luo"],
  },

  {
    id: "elemental_fire",
    name: "Fire Elemental Build",
    description:
      "Maximize fire damage and burning effects for sustained area damage",

    coreTags: ["fire_damage", "burning", "elemental_damage"],
    supportingTags: ["skill_damage", "elemental_damage"],

    coreScrolls: [
      "scroll_blazing_hoop",
      "scroll_burning_transfer",
      "scroll_elemental_catalyst",
    ],
    coreAscensions: ["cp_flame_enthusiasm", "cp_combustion"],

    synergyMultiplier: 1.8,
    bestHeroes: ["crown_prince", "li"],
  },

  {
    id: "elemental_lightning",
    name: "Lightning Elemental Build",
    description: "Focus on lightning damage and shock effects for chain damage",

    coreTags: ["lightning_damage", "shock", "elemental_damage"],
    supportingTags: ["skill_damage", "cooldown_reduction"],

    coreScrolls: [
      "scroll_magnetic_coil",
      "scroll_shock_transfer",
      "scroll_elemental_catalyst",
    ],
    coreAscensions: ["cp_shocking_strike"],

    synergyMultiplier: 1.8,
    bestHeroes: ["crown_prince", "lei_luo"],
  },

  {
    id: "elemental_corrosion",
    name: "Corrosion Elemental Build",
    description: "Spread decay and corrosion damage for crowd control",

    coreTags: ["corrosion_damage", "decay", "elemental_damage"],
    supportingTags: ["skill_damage", "movement_speed"],

    coreScrolls: [
      "scroll_realm_of_corrosion",
      "scroll_decay_transfer",
      "scroll_elemental_catalyst",
    ],
    coreAscensions: ["cp_acidic_explosion"],

    synergyMultiplier: 1.8,
    bestHeroes: ["crown_prince"],
  },

  {
    id: "skill_damage",
    name: "Skill Damage Build",
    description:
      "Maximize skill damage and reduce cooldowns for ability-focused gameplay",

    coreTags: ["skill_damage", "cooldown_reduction"],
    supportingTags: ["primary_skill", "secondary_skill", "elemental_damage"],

    coreScrolls: [
      "scroll_skill_bible",
      "scroll_brutal_gloves",
      "scroll_magic_watch",
      "scroll_secondary_capacity",
    ],
    coreAscensions: [],

    synergyMultiplier: 1.7,
    bestHeroes: ["crown_prince", "lei_luo", "tao", "li"],
  },

  {
    id: "critical_hit",
    name: "Critical Hit Build",
    description: "Stack critical chance and damage for massive burst damage",

    coreTags: ["critical_hit"],
    supportingTags: ["weapon_damage"],

    coreScrolls: ["scroll_concentrated_strike"],
    coreAscensions: [],

    synergyMultiplier: 1.6,
    bestHeroes: ["lyn", "lei_luo", "zi_xiao"],
  },

  {
    id: "lucky_shot",
    name: "Lucky Shot Build",
    description: "Maximize lucky shot chance for consistent damage spikes",

    coreTags: ["lucky_shot"],
    supportingTags: ["weapon_damage"],

    coreScrolls: ["scroll_ultimate_gambler", "scroll_lucky_shot"],
    coreAscensions: [],

    synergyMultiplier: 1.5,
    bestHeroes: ["xing_zhe", "zi_xiao", "nona"],
  },

  {
    id: "movement_speed",
    name: "Movement Speed Build",
    description: "High mobility with damage scaling from movement",

    coreTags: ["movement_speed", "dash"],
    supportingTags: ["weapon_damage", "skill_damage"],

    coreScrolls: [
      "scroll_swift_reload",
      "scroll_unlimited_dash",
      "scroll_ammo_for_distance",
    ],
    coreAscensions: [],

    synergyMultiplier: 1.4,
    bestHeroes: ["qian_sui", "lei_luo"],
  },

  {
    id: "weapon_damage",
    name: "Weapon Damage Build",
    description: "Pure weapon damage focus - works with any hero",

    coreTags: ["weapon_damage"],
    supportingTags: ["rate_of_fire", "ammo", "reload"],

    coreScrolls: [
      "scroll_glass_cannon",
      "scroll_merciless_combo",
      "scroll_capacity_overdraft",
    ],
    coreAscensions: [],

    synergyMultiplier: 1.3,
    bestHeroes: [], // All heroes
  },

  {
    id: "tanky_sustain",
    name: "Tanky Sustain Build",
    description: "High survivability with health and shield sustain",

    coreTags: ["health", "shields", "survivability", "damage_resistance"],
    supportingTags: ["armor"],

    coreScrolls: [
      "scroll_flesh_and_bone",
      "scroll_shimmering_prism",
      "scroll_lightless_shield",
      "scroll_damage_cap",
    ],
    coreAscensions: [],

    synergyMultiplier: 1.4,
    bestHeroes: ["qing_yan", "ao_bai", "qian_sui"],
  },
];

export default buildArchetypes;
