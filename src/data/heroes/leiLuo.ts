import type { Hero, Ascension } from "../../types";

/**
 * Lei Luo - Fast movement with lightning skills
 * Focus: Speed, skill damage, lightning chains, and fatal current
 */

const leiLuoAscensions: Ascension[] = [
  {
    id: "ll_lightning_governor",
    name: "Lightning Governor",
    heroId: "lei_luo",
    description: "Chain Lightning improvements",
    levels: [
      {
        level: 1,
        effect: "Chain Lightning can hit 2 additional targets",
        numericValues: { chain_targets: 2 },
      },
      {
        level: 2,
        effect: "Chain Lightning can hit 4 additional targets",
        numericValues: { chain_targets: 4 },
      },
      {
        level: 3,
        effect: "Chain Lightning can hit 6 additional targets, +50% DMG",
        numericValues: { chain_targets: 6, damage: 50 },
      },
    ],
    tags: ["lightning_damage", "skill_damage", "secondary_skill"],
    synergyWith: ["skill_damage_scrolls", "lightning_scrolls"],
    antiSynergyWith: [],
    buildArchetypes: ["elemental_lightning", "skill_damage"],
    priority: "high",
  },
  {
    id: "ll_magical_supply",
    name: "Magical Supply",
    heroId: "lei_luo",
    description: "Regain ammo on Fatal Current kills and chain attacks",
    levels: [
      {
        level: 1,
        effect:
          "Regain ammo spent if Fatal Current kills enemy. Can chain Fatal Current on kill but duration reduces each chain.",
      },
    ],
    tags: ["primary_skill", "ammo", "skill_damage"],
    synergyWith: ["skill_damage_scrolls", "primary_skill"],
    antiSynergyWith: [],
    buildArchetypes: ["skill_damage"],
    priority: "high",
  },
  {
    id: "ll_thunderstrike",
    name: "Thunderstrike",
    heroId: "lei_luo",
    description: "Fatal Current damage boost",
    levels: [
      {
        level: 1,
        effect: "+30% Fatal Current DMG",
        numericValues: { skill_damage: 30 },
      },
      {
        level: 2,
        effect: "+60% Fatal Current DMG",
        numericValues: { skill_damage: 60 },
      },
      {
        level: 3,
        effect: "+100% Fatal Current DMG",
        numericValues: { skill_damage: 100 },
      },
    ],
    tags: ["primary_skill", "skill_damage", "lightning_damage"],
    synergyWith: ["skill_damage_scrolls", "ll_magical_supply"],
    antiSynergyWith: [],
    buildArchetypes: ["skill_damage", "elemental_lightning"],
    priority: "high",
  },
  {
    id: "ll_chain_reaction",
    name: "Chain Reaction",
    heroId: "lei_luo",
    description: "Chain Lightning damage boost",
    levels: [
      {
        level: 1,
        effect: "+30% Chain Lightning DMG",
        numericValues: { skill_damage: 30 },
      },
      {
        level: 2,
        effect: "+60% Chain Lightning DMG",
        numericValues: { skill_damage: 60 },
      },
      {
        level: 3,
        effect: "+100% Chain Lightning DMG",
        numericValues: { skill_damage: 100 },
      },
    ],
    tags: ["secondary_skill", "skill_damage", "lightning_damage"],
    synergyWith: ["skill_damage_scrolls", "ll_lightning_governor"],
    antiSynergyWith: [],
    buildArchetypes: ["skill_damage", "elemental_lightning"],
    priority: "high",
  },
  {
    id: "ll_weapon_mastery",
    name: "Weapon Mastery",
    heroId: "lei_luo",
    description: "Weapon damage boost",
    levels: [
      {
        level: 1,
        effect: "+15% Weapon DMG",
        numericValues: { weapon_damage: 15 },
      },
      {
        level: 2,
        effect: "+30% Weapon DMG",
        numericValues: { weapon_damage: 30 },
      },
      {
        level: 3,
        effect: "+50% Weapon DMG",
        numericValues: { weapon_damage: 50 },
      },
    ],
    tags: ["weapon_damage"],
    synergyWith: ["weapon_damage_scrolls"],
    antiSynergyWith: [],
    buildArchetypes: ["weapon_damage"],
    priority: "medium",
  },
  {
    id: "ll_critical_mastery",
    name: "Critical Mastery",
    heroId: "lei_luo",
    description: "Critical hit improvements",
    levels: [
      { level: 1, effect: "+30% Crit DMG", numericValues: { crit_damage: 30 } },
      {
        level: 2,
        effect: "+60% Crit DMG, +10% Crit Chance",
        numericValues: { crit_damage: 60, crit_chance: 10 },
      },
      {
        level: 3,
        effect: "+100% Crit DMG, +20% Crit Chance",
        numericValues: { crit_damage: 100, crit_chance: 20 },
      },
    ],
    tags: ["critical_hit", "weapon_damage"],
    synergyWith: ["crit_scrolls", "sniper_weapons"],
    antiSynergyWith: ["lucky_shot"],
    buildArchetypes: ["critical_hit"],
    priority: "high",
  },
  {
    id: "ll_swift_movement",
    name: "Swift Movement",
    heroId: "lei_luo",
    description: "Movement speed bonus during Fatal Current",
    levels: [
      {
        level: 1,
        effect: "+30% Movement Speed during Fatal Current",
        numericValues: { movement_speed: 30 },
      },
      {
        level: 2,
        effect: "+60% Movement Speed during Fatal Current",
        numericValues: { movement_speed: 60 },
      },
    ],
    tags: ["movement_speed", "primary_skill"],
    synergyWith: ["movement_scrolls"],
    antiSynergyWith: [],
    buildArchetypes: ["movement_speed", "skill_damage"],
    priority: "medium",
  },
  {
    id: "ll_shield_recovery",
    name: "Shield Recovery",
    heroId: "lei_luo",
    description: "Faster shield recovery during Fatal Current",
    levels: [
      {
        level: 1,
        effect: "+100% Shield Recovery Rate during Fatal Current",
        numericValues: { shield_recovery: 100 },
      },
      {
        level: 2,
        effect: "+200% Shield Recovery Rate during Fatal Current",
        numericValues: { shield_recovery: 200 },
      },
    ],
    tags: ["shields", "survivability", "primary_skill"],
    synergyWith: ["shield_scrolls"],
    antiSynergyWith: [],
    buildArchetypes: ["tanky_sustain"],
    priority: "low",
  },
  {
    id: "ll_damage_resistance",
    name: "Damage Resistance",
    heroId: "lei_luo",
    description: "Reduce damage taken",
    levels: [
      {
        level: 1,
        effect: "+10% DMG Resistance",
        numericValues: { damage_resistance: 10 },
      },
      {
        level: 2,
        effect: "+20% DMG Resistance",
        numericValues: { damage_resistance: 20 },
      },
    ],
    tags: ["damage_resistance", "survivability"],
    synergyWith: ["survivability_scrolls"],
    antiSynergyWith: [],
    buildArchetypes: ["tanky_sustain"],
    priority: "low",
  },
];

export const leiLuo: Hero = {
  id: "lei_luo",
  name: "Lei Luo",
  description:
    "Fastest hero with lightning-based abilities. Fatal Current grants speed and shield recovery. Chain Lightning hits multiple enemies. Low HP but high mobility.",

  primarySkill: {
    name: "Fatal Current",
    description:
      "Dash forward with lightning speed, gaining movement speed and shield recovery",
    type: "primary",
  },

  secondarySkill: {
    name: "Chain Lightning",
    description: "Strike an enemy with lightning that chains to nearby targets",
    type: "secondary",
  },

  ascensions: leiLuoAscensions,

  tags: ["lightning_damage", "skill_damage", "movement_speed", "critical_hit"],

  recommendedBuilds: [
    "elemental_lightning",
    "skill_damage",
    "critical_hit",
    "movement_speed",
  ],
};
