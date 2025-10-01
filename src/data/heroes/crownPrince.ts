// src/data/heroes/crownPrince.ts

import type { Hero } from "../../types";

export const crownPrince: Hero = {
  id: "crown_prince",
  name: "Crown Prince",
  description:
    "Alchemist proficient in elemental arts, combining fire, lightning, and corrosion",
  baseStats: {
    health: 200,
    shield: 100,
    armor: 0,
    movementSpeed: 5.5,
  },
  skills: [
    {
      id: "energy_orb",
      name: "Energy Orb",
      type: "primary",
      description: "Launches an energy orb that freezes enemies on contact",
      cooldown: 12,
    },
    {
      id: "smoke_grenade",
      name: "Smoke Grenade",
      type: "secondary",
      description:
        "Throws a smoke grenade that inflicts Decay with 100% chance",
      cooldown: 10,
    },
  ],
  ascensions: [
    // ===================================================================
    // CATEGORY 1: ELEMENT (ENHANCE ELEMENTAL DMG) - 6 ASCENSIONS
    // ===================================================================
    {
      id: "asc_wildfire",
      name: "Wildfire",
      heroId: "crown_prince",
      description:
        "Increased fire rate after killing/hitting enemies with elemental effects",
      category: "element",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "After killing enemy affected by Elemental Effect: +40% RoF for 6s",
        },
        {
          level: 2,
          effect:
            "After killing enemy affected by Elemental Effect: +50% RoF for 6s",
        },
        {
          level: 3,
          effect:
            "After hitting enemy affected by Elemental Effect: +60% RoF for 6s",
        },
      ],
      tags: ["rate_of_fire", "elemental_damage", "conditional_damage"],
      synergyWith: ["asc_pyrodominance", "asc_elemental_rage"],
      buildArchetypes: ["cp_fire_elemental"],
      priority: "high",
      power: 8,
    },
    {
      id: "asc_elemental_rage",
      name: "Elemental Rage",
      heroId: "crown_prince",
      description: "Massive damage bonus to enemies with elemental effects",
      category: "element",
      maxLevel: 3,
      levels: [
        { level: 1, effect: "+30% DMG to enemies under any Elemental Effect" },
        { level: 2, effect: "+60% DMG to enemies under any Elemental Effect" },
        { level: 3, effect: "+120% DMG to enemies under any Elemental Effect" },
      ],
      tags: ["elemental_damage", "conditional_damage"],
      synergyWith: [
        "asc_pyrodominance",
        "asc_electrodominance",
        "asc_acidominance",
      ],
      buildArchetypes: ["cp_fire_elemental", "cp_lightning_chain"],
      priority: "high",
      power: 9,
    },
    {
      id: "asc_energy_echo",
      name: "Energy Echo",
      heroId: "crown_prince",
      description: "Energy Orb applies weapon elemental effects",
      category: "element",
      maxLevel: 1,
      levels: [
        {
          level: 1,
          effect:
            "Energy Orb applies same Elemental Effect as your weapon to all enemies it hits at 100% chance",
        },
      ],
      tags: ["skill_damage", "elemental_damage"],
      synergyWith: ["asc_energy_bolt", "asc_blinding_sphere"],
      buildArchetypes: ["cp_fire_elemental", "cp_lightning_chain"],
      priority: "high",
      power: 8,
    },
    {
      id: "asc_pyrodominance",
      name: "Pyrodominance",
      heroId: "crown_prince",
      description: "Increases Fire damage and doubles Combustion damage",
      category: "element",
      maxLevel: 3,
      levels: [
        { level: 1, effect: "+40% Fire DMG" },
        { level: 2, effect: "+80% Fire DMG" },
        {
          level: 3,
          effect:
            "+120% Fire DMG, double Burning Effect and Combustion Effect DMG",
        },
      ],
      tags: ["fire_damage", "elemental_damage", "burning"],
      synergyWith: ["asc_elemental_rage", "scroll_blazing_hoop"],
      buildArchetypes: ["cp_fire_elemental"],
      priority: "high",
      power: 10,
    },
    {
      id: "asc_electrodominance",
      name: "Electrodominance",
      heroId: "crown_prince",
      description: "Increases Lightning damage with bonus to shocked enemies",
      category: "element",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "+40% Lightning DMG, +120% Weapon DMG against enemies under Shock Effect",
        },
        {
          level: 2,
          effect:
            "+80% Lightning DMG, +120% Weapon DMG against enemies under Shock Effect",
        },
        {
          level: 3,
          effect:
            "+120% Lightning DMG, +120% Weapon DMG against enemies under Shock Effect",
        },
      ],
      tags: ["lightning_damage", "elemental_damage", "shock", "weapon_damage"],
      synergyWith: ["asc_elemental_rage", "scroll_elemental_catalyst"],
      buildArchetypes: ["cp_lightning_chain"],
      priority: "high",
      power: 9,
    },
    {
      id: "asc_acidominance",
      name: "Acidominance",
      heroId: "crown_prince",
      description: "Increases Corrosion damage, crits create toxic clouds",
      category: "element",
      maxLevel: 3,
      levels: [
        { level: 1, effect: "+40% Corrosion DMG" },
        { level: 2, effect: "+80% Corrosion DMG" },
        {
          level: 3,
          effect:
            "+120% Corrosion DMG. Crits create toxic cloud equivalent to detonated smoke grenade (max once per 3s)",
        },
      ],
      tags: ["corrosion_damage", "elemental_damage", "decay", "critical_hit"],
      synergyWith: ["asc_toxic_smoke", "asc_smoke_genius"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },

    // ===================================================================
    // CATEGORY 2: SMOKE (ENHANCE SMOKE GRENADE) - 6 ASCENSIONS
    // ===================================================================
    {
      id: "asc_backpack_expansion",
      name: "Backpack Expansion",
      heroId: "crown_prince",
      description: "Additional Smoke Grenade capacity with partial refund",
      category: "smoke",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "+4 Smoke Grenade capacity. Recover 1 grenade for every 2 thrown",
        },
        {
          level: 2,
          effect:
            "+8 Smoke Grenade capacity. Recover 1 grenade for every 2 thrown",
        },
        {
          level: 3,
          effect:
            "+12 Smoke Grenade capacity. Recover 1 grenade for every 2 thrown",
        },
      ],
      tags: ["skill_capacity"],
      synergyWith: ["asc_smoke_genius"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_hex_smoke",
      name: "Hex Smoke",
      heroId: "crown_prince",
      description: "Enemies hit by smoke deal less damage and take more damage",
      category: "smoke",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Enemies hit by Smoke: deal -40% damage, take +20% damage for 6s",
        },
        {
          level: 2,
          effect:
            "Enemies hit by Smoke: deal -50% damage, take +40% damage for 6s",
        },
        {
          level: 3,
          effect:
            "Enemies hit by Smoke: deal -60% damage, take +60% damage for 20s",
        },
      ],
      tags: ["skill_damage", "damage_reduction", "damage_amplification"],
      synergyWith: ["asc_smoke_genius", "asc_toxic_smoke"],
      buildArchetypes: [],
      priority: "high",
      power: 8,
    },
    {
      id: "asc_elemental_shield",
      name: "Elemental Shield",
      heroId: "crown_prince",
      description: "Smoke Grenade grants shield and elemental immunity",
      category: "smoke",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "After using Smoke Grenade: +30 max shield, immunity to Elemental Effects for 6s",
        },
        {
          level: 2,
          effect:
            "After using Smoke Grenade: +60 max shield, immunity to Elemental Effects for 6s",
        },
        {
          level: 3,
          effect:
            "After using Smoke Grenade: +90 max shield, immunity to Elemental Effects for 20s",
        },
      ],
      tags: ["shields", "survivability"],
      synergyWith: ["asc_smoke_genius"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_toxic_smoke",
      name: "Toxic Smoke",
      heroId: "crown_prince",
      description: "Smoke Grenades deal scaling damage over time",
      category: "smoke",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Smoke: +300% base DMG, +100% base DMG per second after detonation",
        },
        {
          level: 2,
          effect:
            "Smoke: +400% base DMG, +100% base DMG per second after detonation",
        },
        {
          level: 3,
          effect:
            "Smoke: +500% base DMG, +100% base DMG per second after detonation",
        },
      ],
      tags: ["skill_damage", "corrosion_damage", "decay"],
      synergyWith: ["asc_smoke_genius", "asc_hex_smoke"],
      buildArchetypes: [],
      priority: "high",
      power: 8,
    },
    {
      id: "asc_acidic_explosion",
      name: "Acidic Explosion",
      heroId: "crown_prince",
      description: "Enemies affected by grenades explode on death",
      category: "smoke",
      maxLevel: 1,
      levels: [
        {
          level: 1,
          effect:
            "Enemies affected by your grenades become volatile and explode after being defeated",
        },
      ],
      tags: ["skill_damage", "area_damage", "corrosion_damage"],
      synergyWith: ["asc_smoke_genius", "asc_toxic_smoke"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_smoke_genius",
      name: "Smoke Genius",
      heroId: "crown_prince",
      description: "Extended Smoke Grenade duration with faster tick rate",
      category: "smoke",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect: "Smoke lasts 1 more second, damage interval decreased by 20%",
        },
        {
          level: 2,
          effect:
            "Smoke lasts 2 more seconds, damage interval decreased by 30%",
        },
        {
          level: 3,
          effect:
            "Smoke lasts 3 more seconds, damage interval decreased by 50%",
        },
      ],
      tags: ["skill_damage", "corrosion_damage"],
      synergyWith: [
        "asc_hex_smoke",
        "asc_toxic_smoke",
        "asc_backpack_expansion",
      ],
      buildArchetypes: [],
      priority: "high",
      power: 9,
    },

    // ===================================================================
    // CATEGORY 3: ORB (ENHANCE ENERGY ORB) - 6 ASCENSIONS
    // ===================================================================
    {
      id: "asc_chained_duration",
      name: "Chained Duration",
      heroId: "crown_prince",
      description: "Extended freeze duration with cooldown reduction",
      category: "orb",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Energy Orb freezes enemies for 2 more seconds, -30% cooldown",
        },
        {
          level: 2,
          effect:
            "Energy Orb freezes enemies for 4 more seconds, -30% cooldown",
        },
        {
          level: 3,
          effect:
            "Energy Orb freezes enemies for 6 more seconds, -30% cooldown",
        },
      ],
      tags: ["skill_damage", "crowd_control", "cooldown_reduction"],
      synergyWith: ["asc_power_source", "asc_blinding_sphere"],
      buildArchetypes: [],
      priority: "high",
      power: 9,
    },
    {
      id: "asc_blinding_sphere",
      name: "Blinding Sphere",
      heroId: "crown_prince",
      description: "Increased explosion radius with damage scaling per target",
      category: "orb",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Energy Orb explosion radius +2m, freeze/DMG bypass barriers. +50% Skill DMG per target hit",
        },
        {
          level: 2,
          effect:
            "Energy Orb explosion radius +4m, freeze/DMG bypass barriers. +50% Skill DMG per target hit",
        },
        {
          level: 3,
          effect:
            "Energy Orb explosion radius +6m, freeze/DMG bypass barriers. +50% Skill DMG per target hit",
        },
      ],
      tags: ["skill_damage", "area_damage"],
      synergyWith: ["asc_chained_duration", "asc_energy_bolt"],
      buildArchetypes: [],
      priority: "high",
      power: 8,
    },
    {
      id: "asc_power_source",
      name: "Power Source",
      heroId: "crown_prince",
      description: "Energy Orb gains additional charges",
      category: "orb",
      maxLevel: 3,
      levels: [
        { level: 1, effect: "+1 Energy Orb charge" },
        { level: 2, effect: "+2 Energy Orb charges" },
        { level: 3, effect: "+5 Energy Orb charges" },
      ],
      tags: ["skill_capacity"],
      synergyWith: ["asc_chained_duration"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_energy_bolt",
      name: "Energy Bolt",
      heroId: "crown_prince",
      description:
        "Energy Orb deals increased damage with multi-explosion chance",
      category: "orb",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Energy Orb: +200% damage. 50% chance explode twice. 20% chance explode 3 times. 15% chance explode 4 times",
        },
        {
          level: 2,
          effect:
            "Energy Orb: +400% damage. 50% chance explode twice. 35% chance explode 3 times. 15% chance explode 4 times",
        },
        {
          level: 3,
          effect:
            "Energy Orb: +600% damage. 50% chance explode twice. 35% chance explode 3 times. 15% chance explode 4 times",
        },
      ],
      tags: ["skill_damage", "area_damage"],
      synergyWith: ["asc_blinding_sphere", "asc_energy_echo"],
      buildArchetypes: [],
      priority: "high",
      power: 9,
    },
    {
      id: "asc_energy_blade",
      name: "Energy Blade",
      heroId: "crown_prince",
      description: "Energy Orb grants massive weapon damage bonus with splash",
      category: "orb",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "After casting Energy Orb: +300% weapon DMG on next hit, +50% DMG to adjacent enemies",
        },
        {
          level: 2,
          effect:
            "After casting Energy Orb: +400% weapon DMG on next hit, +75% DMG to adjacent enemies",
        },
        {
          level: 3,
          effect:
            "After casting Energy Orb: +500% weapon DMG on next hit, +100% DMG to adjacent enemies",
        },
      ],
      tags: ["weapon_damage", "area_damage"],
      synergyWith: ["asc_chained_duration"],
      buildArchetypes: [],
      priority: "high",
      power: 10,
    },
    {
      id: "asc_advanced_shield",
      name: "Advanced Shield",
      heroId: "crown_prince",
      description: "Energy Orb grants shield regeneration bonuses",
      category: "orb",
      maxLevel: 1,
      levels: [
        {
          level: 1,
          effect:
            "After casting Energy Orb: 60% Shield recharge speed, -60% Shield recharge delay, Shield recovery uninterrupted for 6s",
        },
      ],
      tags: ["shields", "survivability"],
      synergyWith: ["asc_power_source"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
  ],
  tags: [
    "elemental_damage",
    "fire_damage",
    "lightning_damage",
    "corrosion_damage",
    "skill_damage",
  ],
  recommendedBuilds: ["cp_fire_elemental", "cp_lightning_chain"],
  preferredWeapons: ["rifle", "submachine_gun", "pistol"],
};
