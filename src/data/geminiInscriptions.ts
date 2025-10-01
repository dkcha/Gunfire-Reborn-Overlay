// src/data/geminiInscriptions.ts

import type {
  GeminiInscriptionData,
  GeminiInscription,
  SynergyTag,
} from "../types";

export const geminiInscriptions: Record<
  GeminiInscription,
  GeminiInscriptionData
> = {
  magazine_share: {
    id: "magazine_share",
    name: "Magazine Share",
    description: "Weapon 1 & 2 share magazine capacity",
    effect:
      "Gain 10 stacks every second while firing, and 5 stacks on hitting enemies. Each stack lasts for 10s. The maximum number of stacks is equal to the shared magazine capacity. Each stack +0.75% weapon damage.",
    synergyTags: [
      "magazine_stacking",
      "ammo_capacity",
      "no_reload",
      "rate_of_fire",
      "weapon_damage",
    ],
    antiSynergyTags: ["reload_speed"],
    buildArchetypes: ["magazine_stacking", "no_reload"],
  },

  element_share: {
    id: "element_share",
    name: "Element Share",
    description: "Weapon 1 & 2 share elemental damage types",
    effect:
      "Both weapons can inflict both elemental effects. Elemental effect chance is based on the weapon that the effect comes from. When dealing damage, the highest damage bonus is chosen.",
    synergyTags: [
      "dual_element",
      "elemental_damage",
      "fire_damage",
      "lightning_damage",
      "corrosion_damage",
      "burning",
      "shock",
      "decay",
    ],
    buildArchetypes: [
      "elemental_fire",
      "elemental_lightning",
      "elemental_corrosion",
      "dual_element",
    ],
  },

  critx_share: {
    id: "critx_share",
    name: "CritX Share",
    description: "Weapon 1 & 2 share a CritX bonus",
    effect:
      "The CritX of both weapons are combined, then reduced by 2. Example: a pair with 2.5x and 4.2x will combine to get 2.5x + 4.2x - 2.0x = 4.7x. However, weapons have 50% stability.",
    synergyTags: [
      "crit_scaling",
      "critical_hit",
      "weakspot_damage",
      "accuracy",
    ],
    antiSynergyTags: ["lucky_shot"],
    buildArchetypes: ["critical_hit"],
  },
};

// ============================================================================
// SAMPLE WEAPONS
// ============================================================================

import type { Weapon } from "../types";

export const sampleWeapons: Weapon[] = [
  // PISTOLS
  {
    id: "weapon_rainbow",
    name: "Rainbow",
    type: "pistol",
    baseStats: {
      damage: 50,
      magazine: 1,
      critX: 2.0,
      rateOfFire: 1.5,
      reloadTime: 0, // Auto-refills instantly
    },
    tags: ["weapon_damage", "magazine_efficiency"],
    description:
      "1 magazine capacity that refills instantly. Perfect for Magazine Share builds.",
  },

  {
    id: "weapon_pupil",
    name: "Pupil",
    type: "pistol",
    baseStats: {
      damage: 45,
      magazine: 1,
      critX: 2.2,
      rateOfFire: 2.0,
      reloadTime: 0,
    },
    tags: ["weapon_damage", "magazine_efficiency", "lucky_shot"],
    description: "1 magazine capacity. High rate of fire.",
  },

  // ELEMENTAL WEAPONS
  {
    id: "weapon_fire_dragon",
    name: "Fire Dragon",
    type: "rifle",
    elementalType: "fire",
    baseStats: {
      damage: 80,
      magazine: 30,
      critX: 1.5,
      elementalEffectChance: 25,
      rateOfFire: 5.0,
      reloadTime: 2.0,
    },
    tags: ["weapon_damage", "fire_damage", "elemental_damage", "burning"],
    description: "Fire element rifle with high burning chance.",
  },

  {
    id: "weapon_lightning_blast",
    name: "Lightning Blast",
    type: "submachine_gun",
    elementalType: "lightning",
    baseStats: {
      damage: 40,
      magazine: 50,
      critX: 1.3,
      elementalEffectChance: 20,
      rateOfFire: 10.0,
      reloadTime: 1.8,
    },
    tags: [
      "weapon_damage",
      "lightning_damage",
      "elemental_damage",
      "shock",
      "rate_of_fire",
    ],
    description: "Lightning SMG with very high rate of fire.",
  },

  // CRIT WEAPONS
  {
    id: "weapon_goshawk",
    name: "Goshawk",
    type: "sniper",
    baseStats: {
      damage: 500,
      magazine: 5,
      critX: 4.5,
      rateOfFire: 0.8,
      reloadTime: 2.5,
    },
    tags: ["weapon_damage", "critical_hit", "weakspot_damage", "accuracy"],
    description: "High damage sniper with excellent CritX.",
  },

  {
    id: "weapon_woodpecker",
    name: "Woodpecker",
    type: "sniper",
    baseStats: {
      damage: 400,
      magazine: 8,
      critX: 3.8,
      rateOfFire: 1.2,
      reloadTime: 2.2,
    },
    tags: ["weapon_damage", "critical_hit", "weakspot_damage"],
    description: "Fast-firing sniper with good CritX.",
  },

  // NO-RELOAD WEAPONS
  {
    id: "weapon_argus",
    name: "Argus",
    type: "submachine_gun",
    baseStats: {
      damage: 35,
      magazine: 75,
      critX: 1.4,
      rateOfFire: 12.0,
      reloadTime: 2.5,
    },
    tags: ["weapon_damage", "ammo_capacity", "rate_of_fire"],
    description: "Very large magazine SMG. Great for no-reload builds.",
  },

  {
    id: "weapon_concealed_ammo",
    name: "Concealed Ammo",
    type: "pistol",
    baseStats: {
      damage: 60,
      magazine: 20,
      critX: 2.0,
      rateOfFire: 4.0,
      reloadTime: 1.5,
    },
    tags: ["weapon_damage", "ammo_capacity"],
    description: "Pistol with good magazine size.",
  },

  // SKILL WEAPONS
  {
    id: "weapon_justice",
    name: "Justice",
    type: "launcher",
    baseStats: {
      damage: 300,
      magazine: 4,
      critX: 2.0,
      rateOfFire: 0.5,
      reloadTime: 3.0,
    },
    tags: ["weapon_damage", "skill_damage", "area_damage"],
    description: "Launcher that deals AoE damage.",
  },
];

// ============================================================================
// WEAPON UTILITY FUNCTIONS
// ============================================================================

export function getWeaponById(id: string): Weapon | undefined {
  return sampleWeapons.find((w) => w.id === id);
}

export function getWeaponsByType(type: string): Weapon[] {
  return sampleWeapons.filter((w) => w.type === type);
}

export function getWeaponsWithGemini(gemini: GeminiInscription): Weapon[] {
  return sampleWeapons.filter((w) => w.geminiInscription === gemini);
}

export function canHaveGemini(
  weapon: Weapon,
  gemini: GeminiInscription
): boolean {
  // Magazine Share restrictions
  if (gemini === "magazine_share") {
    // Cannot appear on automatic weapons or weapons without reload
    if (weapon.baseStats.reloadTime === 0) return false;
    if (weapon.baseStats.rateOfFire > 8) return false;
  }

  // CritX Share restrictions
  if (gemini === "critx_share") {
    // Cannot appear on launchers
    if (weapon.type === "launcher") return false;
  }

  return true;
}

export function calculateSharedCritX(
  weapon1CritX: number,
  weapon2CritX: number
): number {
  return weapon1CritX + weapon2CritX - 2.0;
}

export function calculateSharedMagazine(
  weapon1Mag: number,
  weapon2Mag: number
): number {
  return weapon1Mag + weapon2Mag;
}

// ============================================================================
// GEMINI SYNERGY DETECTION
// ============================================================================

export function detectGeminiSynergy(
  gemini: GeminiInscription | undefined,
  item: { tags: SynergyTag[] }
): number {
  if (!gemini) return 0;

  const geminiData = geminiInscriptions[gemini];
  const matchingTags = item.tags.filter((tag) =>
    geminiData.synergyTags.includes(tag)
  );

  const antiSynergyTags = item.tags.filter((tag) =>
    geminiData.antiSynergyTags?.includes(tag)
  );

  let bonus = matchingTags.length * 0.5; // +50% per matching tag

  // Heavy penalty for anti-synergies
  bonus -= antiSynergyTags.length * 1.0; // -100% per anti-synergy

  // Cap bonus
  return Math.max(-2.0, Math.min(3.0, bonus));
}
