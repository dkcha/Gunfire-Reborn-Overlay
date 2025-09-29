import type { Hero, Ascension } from "../../types";

/**
 * Crown Prince - Elemental specialist with crowd control
 * Focus: Elemental damage, status effects, and fusion damage
 */

const crownPrinceAscensions: Ascension[] = [
  {
    id: "cp_elemental_mastery",
    name: "Elemental Mastery",
    heroId: "crown_prince",
    description: "Increases elemental damage",
    levels: [
      {
        level: 1,
        effect: "+10% Elemental DMG",
        numericValues: { elemental_damage: 10 },
      },
      {
        level: 2,
        effect: "+20% Elemental DMG",
        numericValues: { elemental_damage: 20 },
      },
      {
        level: 3,
        effect: "+35% Elemental DMG",
        numericValues: { elemental_damage: 35 },
      },
    ],
    tags: [
      "elemental_damage",
      "fire_damage",
      "lightning_damage",
      "corrosion_damage",
    ],
    synergyWith: ["elemental_scrolls", "elemental_weapons"],
    antiSynergyWith: [],
    buildArchetypes: [
      "elemental_fire",
      "elemental_lightning",
      "elemental_corrosion",
    ],
    priority: "high",
  },
  {
    id: "cp_flame_enthusiasm",
    name: "Flame Enthusiasm",
    heroId: "crown_prince",
    description: "Fire damage and burning effect bonuses",
    levels: [
      { level: 1, effect: "+25% Fire DMG", numericValues: { fire_damage: 25 } },
      {
        level: 2,
        effect: "+50% Fire DMG, Burning lasts 1s longer",
        numericValues: { fire_damage: 50, burning_duration: 1 },
      },
      {
        level: 3,
        effect: "+100% Fire DMG, Burning lasts 2s longer",
        numericValues: { fire_damage: 100, burning_duration: 2 },
      },
    ],
    tags: ["fire_damage", "burning", "elemental_damage"],
    synergyWith: ["blazing_hoop", "fire_tower", "fire_weapons"],
    antiSynergyWith: [],
    buildArchetypes: ["elemental_fire"],
    priority: "high",
  },
  {
    id: "cp_shocking_strike",
    name: "Shocking Strike",
    heroId: "crown_prince",
    description: "Lightning damage and shock effect bonuses",
    levels: [
      {
        level: 1,
        effect: "+25% Lightning DMG",
        numericValues: { lightning_damage: 25 },
      },
      {
        level: 2,
        effect: "+50% Lightning DMG, +20% Shock Chance",
        numericValues: { lightning_damage: 50, shock_chance: 20 },
      },
      {
        level: 3,
        effect: "+100% Lightning DMG, +40% Shock Chance",
        numericValues: { lightning_damage: 100, shock_chance: 40 },
      },
    ],
    tags: ["lightning_damage", "shock", "elemental_damage"],
    synergyWith: ["magnetic_coil", "lightning_weapons"],
    antiSynergyWith: [],
    buildArchetypes: ["elemental_lightning"],
    priority: "high",
  },
  {
    id: "cp_acidic_explosion",
    name: "Acidic Explosion",
    heroId: "crown_prince",
    description: "Smoke Grenade deals corrosion damage and creates explosions",
    levels: [
      {
        level: 1,
        effect: "Smoke Grenade explodes on impact, dealing Corrosion DMG",
      },
      {
        level: 2,
        effect: "Explosion range +50%, DMG +100%",
        numericValues: { range: 50, damage: 100 },
      },
      {
        level: 3,
        effect: "Explosion range +100%, DMG +200%",
        numericValues: { range: 100, damage: 200 },
      },
    ],
    tags: ["corrosion_damage", "explosion_damage", "skill_damage"],
    synergyWith: ["realm_of_corrosion", "skill_damage_scrolls"],
    antiSynergyWith: [],
    buildArchetypes: ["elemental_corrosion", "skill_damage"],
    priority: "high",
  },
  {
    id: "cp_combustion",
    name: "Combustion",
    heroId: "crown_prince",
    description: "Enemies in Smoke Grenade who are burning take massive damage",
    levels: [
      {
        level: 1,
        effect: "Enemies in Smoke while Burning take +100% Fire DMG",
        numericValues: { fire_damage_mult: 100 },
      },
    ],
    tags: ["fire_damage", "burning", "skill_damage"],
    synergyWith: ["cp_flame_enthusiasm", "cp_acidic_explosion", "blazing_hoop"],
    antiSynergyWith: [],
    buildArchetypes: ["elemental_fire", "skill_damage"],
    priority: "high",
  },
  {
    id: "cp_energy_overflow",
    name: "Energy Overflow",
    heroId: "crown_prince",
    description: "Increases max energy and recovery",
    levels: [
      {
        level: 1,
        effect: "+60 Max Energy, +50% Energy Recovery Speed",
        numericValues: { max_energy: 60, recovery_speed: 50 },
      },
      {
        level: 2,
        effect: "+120 Max Energy, +100% Energy Recovery Speed",
        numericValues: { max_energy: 120, recovery_speed: 100 },
      },
    ],
    tags: ["skill_cooldown", "primary_skill"],
    synergyWith: ["skill_damage_scrolls", "cooldown_scrolls"],
    antiSynergyWith: [],
    buildArchetypes: ["skill_damage"],
    priority: "medium",
  },
  {
    id: "cp_fusion_damage",
    name: "Fusion Damage",
    heroId: "crown_prince",
    description: "Bonus damage when hitting enemies with multiple elements",
    levels: [
      {
        level: 1,
        effect: "+30% DMG to enemies with 2+ Elemental Effects",
        numericValues: { damage_bonus: 30 },
      },
      {
        level: 2,
        effect: "+60% DMG to enemies with 2+ Elemental Effects",
        numericValues: { damage_bonus: 60 },
      },
    ],
    tags: ["elemental_damage", "weapon_damage"],
    synergyWith: ["cp_elemental_mastery", "elemental_scrolls"],
    antiSynergyWith: [],
    buildArchetypes: [
      "elemental_fire",
      "elemental_lightning",
      "elemental_corrosion",
    ],
    priority: "medium",
  },
  {
    id: "cp_shield_recharge",
    name: "Shield Recharge",
    heroId: "crown_prince",
    description: "Reduce shield recharge delay",
    levels: [
      {
        level: 1,
        effect: "-30% Shield Recharge Delay",
        numericValues: { recharge_delay: -30 },
      },
      {
        level: 2,
        effect: "-50% Shield Recharge Delay",
        numericValues: { recharge_delay: -50 },
      },
    ],
    tags: ["shields", "survivability"],
    synergyWith: ["shield_scrolls"],
    antiSynergyWith: [],
    buildArchetypes: ["tanky_sustain"],
    priority: "low",
  },
  {
    id: "cp_enhanced_orb",
    name: "Enhanced Orb",
    heroId: "crown_prince",
    description: "Energy Orb improvements",
    levels: [
      { level: 1, effect: "Energy Orb freezes enemies 1s longer" },
      { level: 2, effect: "Energy Orb freezes enemies 2s longer, +50% DMG" },
    ],
    tags: ["primary_skill", "skill_damage"],
    synergyWith: ["skill_damage_scrolls"],
    antiSynergyWith: [],
    buildArchetypes: ["skill_damage"],
    priority: "medium",
  },
];

export const crownPrince: Hero = {
  id: "crown_prince",
  name: "Crown Prince",
  description:
    "Elemental specialist who excels at dealing elemental damage and applying status effects. Uses Energy Orb to freeze enemies and Smoke Grenade for area denial.",

  primarySkill: {
    name: "Energy Orb",
    description: "Fire an orb that freezes enemies in place",
    type: "primary",
  },

  secondarySkill: {
    name: "Smoke Grenade",
    description:
      "Throw a grenade that creates corrosive smoke, dealing damage over time",
    type: "secondary",
  },

  ascensions: crownPrinceAscensions,

  tags: [
    "elemental_damage",
    "fire_damage",
    "lightning_damage",
    "corrosion_damage",
    "skill_damage",
  ],

  recommendedBuilds: [
    "elemental_fire",
    "elemental_lightning",
    "elemental_corrosion",
    "skill_damage",
  ],
};
