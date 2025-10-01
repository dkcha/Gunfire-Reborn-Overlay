// src/data/heroes/leiLuo.ts

import type { Hero } from "../../types";

export const leiLuo: Hero = {
  id: "lei_luo",
  name: "Lei Luo",
  description:
    "Thunder sniper specializing in high single-target burst damage and critical hits",
  baseStats: {
    health: 180,
    shield: 120,
    armor: 0,
    movementSpeed: 6.5,
  },
  skills: [
    {
      id: "fatal_current",
      name: "Fatal Current",
      type: "primary",
      description:
        "Grants 30% movement speed and 50% skill damage. First shot deals 100% bonus damage with a lightning bolt and ends the buff.",
      cooldown: 18,
    },
    {
      id: "chain_lightning",
      name: "Chain Lightning",
      type: "secondary",
      description: "Summons a lightning bolt that bounces between 3 enemies",
      cooldown: 12,
    },
  ],
  ascensions: [
    // ===================================================================
    // CATEGORY 1: WEAPON BOOST (ENHANCE SHOOTING SKILL) - 6 ASCENSIONS
    // ===================================================================
    {
      id: "asc_magical_supply",
      name: "Magical Supply",
      heroId: "lei_luo",
      description:
        "If first shot during Fatal Current kills target, recover ammo and relaunch Fatal Current",
      category: "weapon_boost",
      maxLevel: 1,
      levels: [
        {
          level: 1,
          effect:
            "If first shot during Fatal Current kills target, recover ammo consumed and relaunch Fatal Current with -30% duration",
        },
      ],
      tags: ["weapon_damage", "skill_damage", "ammo_capacity"],
      synergyWith: ["asc_thunder_turbo", "scroll_magic_watch"],
      buildArchetypes: ["ll_no_reload", "ll_lightning_speed"],
      priority: "high",
      power: 9,
    },
    {
      id: "asc_thunder_turbo",
      name: "Thunder Turbo",
      heroId: "lei_luo",
      description: "Stack weapon and skill damage on crit kills",
      category: "weapon_boost",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "+1 stack per crit kill (+2 during Fatal Current). +5% weapon/skill DMG, +5% Total Crit DMG per stack (max 8). Lose all stacks on shield break",
        },
        {
          level: 2,
          effect:
            "+1 stack per crit kill (+2 during Fatal Current). +10% weapon/skill DMG, +5% Total Crit DMG per stack (max 8). Lose all stacks on shield break",
        },
        {
          level: 3,
          effect:
            "+1 stack per crit kill (+2 during Fatal Current). +15% weapon/skill DMG, +5% Total Crit DMG per stack (max 8). Lose 50% of stacks on shield break",
        },
      ],
      tags: ["weapon_damage", "skill_damage", "critical_hit"],
      synergyWith: ["asc_magical_supply", "asc_voltage_surge"],
      buildArchetypes: ["ll_lightning_speed"],
      priority: "high",
      power: 9,
    },
    {
      id: "asc_storm_blast",
      name: "Storm Blast",
      heroId: "lei_luo",
      description: "First shot during Fatal Current deals massive extra damage",
      category: "weapon_boost",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "+150% extra DMG for first shot that hits enemy during Fatal Current",
        },
        {
          level: 2,
          effect:
            "+225% extra DMG for first shot that hits enemy during Fatal Current",
        },
        {
          level: 3,
          effect:
            "+300% extra DMG for first shot that hits enemy during Fatal Current",
        },
      ],
      tags: ["weapon_damage", "conditional_damage"],
      synergyWith: ["asc_magical_supply"],
      buildArchetypes: ["ll_lightning_speed"],
      priority: "high",
      power: 8,
    },
    {
      id: "asc_shadow_knight",
      name: "Shadow Knight",
      heroId: "lei_luo",
      description: "Increased damage when no enemies nearby",
      category: "weapon_boost",
      maxLevel: 3,
      levels: [
        { level: 1, effect: "+30% weapon/skill DMG if no enemy within 10m" },
        { level: 2, effect: "+60% weapon/skill DMG if no enemy within 10m" },
        { level: 3, effect: "+100% weapon/skill DMG if no enemy within 5m" },
      ],
      tags: ["weapon_damage", "skill_damage", "conditional_damage"],
      synergyWith: [],
      buildArchetypes: ["ll_lightning_speed"],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_voltage_surge",
      name: "Voltage Surge",
      heroId: "lei_luo",
      description: "Enemies take increased crit damage after being crit",
      category: "weapon_boost",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Crit makes enemy take +10% Total Crit DMG for 3s. If CritX > 4x: +20% Total Crit DMG",
        },
        {
          level: 2,
          effect:
            "Crit makes enemy take +15% Total Crit DMG for 4s. If CritX > 4x: +30% Total Crit DMG",
        },
        {
          level: 3,
          effect:
            "Crit makes enemy take +40% Total Crit DMG for 5s. If CritX > 4x: +40% Total Crit DMG",
        },
      ],
      tags: ["critical_hit", "weapon_damage", "conditional_damage"],
      synergyWith: ["asc_thunder_turbo"],
      buildArchetypes: ["ll_lightning_speed"],
      priority: "high",
      power: 8,
    },
    {
      id: "asc_eye_of_storm",
      name: "Eye of the Storm",
      heroId: "lei_luo",
      description:
        "Consecutive hits on same target with sniper deal more damage",
      category: "weapon_boost",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Hit enemy with sniper: each follow-up shot to same target +15% Total Weapon DMG (max +60%)",
        },
        {
          level: 2,
          effect:
            "Hit enemy with sniper: each follow-up shot to same target +25% Total Weapon DMG (max +100%)",
        },
        {
          level: 3,
          effect:
            "Hit enemy with sniper: each follow-up shot to same target +50% Total Weapon DMG (max +150%)",
        },
      ],
      tags: ["weapon_damage", "conditional_damage"],
      synergyWith: [],
      buildArchetypes: ["ll_lightning_speed"],
      priority: "medium",
      power: 7,
    },

    // ===================================================================
    // CATEGORY 2: THUNDER ROAR (ENHANCE FATAL CURRENT) - 6 ASCENSIONS
    // ===================================================================
    {
      id: "asc_fulminous_zap",
      name: "Fulminous Zap",
      heroId: "lei_luo",
      description: "Massive thunderbolt damage and shock synergy",
      category: "thunder_roar",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "+200% thunderbolt DMG from Fatal Current. Shocked enemies take +50% Total DMG. Thunderbolt slows -80% for 0.4s",
        },
        {
          level: 2,
          effect:
            "+300% thunderbolt DMG from Fatal Current. Shocked enemies take +50% Total DMG. Thunderbolt slows -80% for 0.6s",
        },
        {
          level: 3,
          effect:
            "+400% thunderbolt DMG from Fatal Current. Shocked enemies take +50% Total DMG. Thunderbolt slows -80% for 1s",
        },
      ],
      tags: ["skill_damage", "lightning_damage", "shock", "crowd_control"],
      synergyWith: ["asc_thunder_nemesis"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_thunder_nemesis",
      name: "Thunder Nemesis",
      heroId: "lei_luo",
      description: "Summon thunderbolts when casting/ending Fatal Current",
      category: "thunder_roar",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "When casting/ending Fatal Current, summon thunderbolts on 3 random enemies within 20m. Summon thunderbolt on 1 enemy every 1.5s",
        },
        {
          level: 2,
          effect:
            "When casting/ending Fatal Current, summon thunderbolts on 5 random enemies within 25m. Summon thunderbolt on 1 enemy every 1.5s",
        },
        {
          level: 3,
          effect:
            "When casting/ending Fatal Current, summon thunderbolts on 7 random enemies within 25m. Summon thunderbolt on 1 enemy every 1.5s",
        },
      ],
      tags: ["skill_damage", "lightning_damage"],
      synergyWith: ["asc_fulminous_zap"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_voltaic_aegis",
      name: "Voltaic Aegis",
      heroId: "lei_luo",
      description: "Gain shield stacks for damage resistance",
      category: "thunder_roar",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Gain 1 stack every 4s (1s during Fatal Current). Each stack: +5 max shield, +10% DMG Resistance. Max 3 stacks, lose 1 per hit",
        },
        {
          level: 2,
          effect:
            "Gain 1 stack every 3s (1s during Fatal Current). Each stack: +10 max shield, +15% DMG Resistance. Max 3 stacks, lose 1 per hit",
        },
        {
          level: 3,
          effect:
            "Gain 1 stack every 3s (0.6s during Fatal Current). Each stack: +20 max shield, +20% DMG Resistance. Max 5 stacks, lose 1 per hit",
        },
      ],
      tags: ["shields", "damage_reduction", "survivability"],
      synergyWith: [],
      buildArchetypes: [],
      priority: "high",
      power: 10,
    },
    {
      id: "asc_heart_of_battle",
      name: "Heart of Battle",
      heroId: "lei_luo",
      description: "Reduce Fatal Current cooldown on kills",
      category: "thunder_roar",
      maxLevel: 3,
      levels: [
        { level: 1, effect: "-0.5s Fatal Current cooldown per kill" },
        { level: 2, effect: "-1s Fatal Current cooldown per kill" },
        { level: 3, effect: "-1.5s Fatal Current cooldown per kill" },
      ],
      tags: ["cooldown_reduction", "skill_damage"],
      synergyWith: ["asc_magical_supply"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_lightning_governor",
      name: "Lightning Governor",
      heroId: "lei_luo",
      description: "Auto-cast Chain Lightning during Fatal Current",
      category: "thunder_roar",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "During Fatal Current, auto-cast Chain Lightning (-2 bounces) every 1s on random enemy within 20m. +1s Fatal Current per kill",
        },
        {
          level: 2,
          effect:
            "During Fatal Current, auto-cast Chain Lightning (-1 bounce) every 0.85s on random enemy within 20m. +1s Fatal Current per kill",
        },
        {
          level: 3,
          effect:
            "During Fatal Current, auto-cast Chain Lightning every 0.7s on random enemy within 20m. +1s Fatal Current per kill",
        },
      ],
      tags: ["skill_damage", "lightning_damage"],
      synergyWith: ["asc_tesla_coil"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_bolt_from_blue",
      name: "Bolt From the Blue",
      heroId: "lei_luo",
      description: "Extended Fatal Current with thunderbolt on shock",
      category: "thunder_roar",
      maxLevel: 1,
      levels: [
        {
          level: 1,
          effect:
            "+3s Fatal Current duration, +50% skill DMG. During Fatal Current, trigger Shock effect summons thunderbolt on affected enemy",
        },
      ],
      tags: ["skill_damage", "lightning_damage", "shock"],
      synergyWith: ["asc_fulminous_zap"],
      buildArchetypes: [],
      priority: "medium",
      power: 8,
    },

    // ===================================================================
    // CATEGORY 3: CHAIN LIGHTNING - 6 ASCENSIONS
    // ===================================================================
    {
      id: "asc_lightning_from_void",
      name: "Lightning From Void",
      heroId: "lei_luo",
      description: "Crits have chance to trigger Chain Lightning",
      category: "lightning_strike",
      maxLevel: 1,
      levels: [
        {
          level: 1,
          effect:
            "Every Crit has chance to trigger Chain Lightning (higher CritX = higher chance, max 1 trigger per second)",
        },
      ],
      tags: ["critical_hit", "skill_damage", "lightning_damage"],
      synergyWith: ["asc_tesla_coil", "asc_hyper_current"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_hyper_current",
      name: "Hyper Current",
      heroId: "lei_luo",
      description:
        "Chain Lightning deals bonus damage and returns to initial target",
      category: "lightning_strike",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "+100% Chain Lightning base DMG. After bouncing ends, deal extra 20% DMG to initial target per enemy hit",
        },
        {
          level: 2,
          effect:
            "+200% Chain Lightning base DMG. After bouncing ends, deal extra 20% DMG to initial target per enemy hit",
        },
        {
          level: 3,
          effect:
            "+300% Chain Lightning base DMG. After bouncing ends, deal extra 20% DMG to initial target per enemy hit",
        },
      ],
      tags: ["skill_damage", "lightning_damage"],
      synergyWith: ["asc_tesla_coil"],
      buildArchetypes: [],
      priority: "high",
      power: 8,
    },
    {
      id: "asc_electric_circuit",
      name: "Electric Circuit",
      heroId: "lei_luo",
      description: "Chain Lightning connects targets for shared damage",
      category: "lightning_strike",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Chain Lightning connects targets. Hit connected target: 40% DMG transmitted to all connected",
        },
        {
          level: 2,
          effect:
            "Chain Lightning connects targets. Hit connected target: 70% DMG transmitted to all connected",
        },
        {
          level: 3,
          effect:
            "Chain Lightning connects targets. Hit connected target: 100% DMG transmitted to all connected. Connections persist after recasting",
        },
      ],
      tags: ["skill_damage", "area_damage", "lightning_damage"],
      synergyWith: ["asc_tesla_coil"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_thunderbolt_converter",
      name: "Thunderbolt Converter",
      heroId: "lei_luo",
      description: "Chain Lightning damage boosts next shot or skill",
      category: "lightning_strike",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Chain Lightning inflicts damage: +20% Total DMG on next shot/skill (max +60%)",
        },
        {
          level: 2,
          effect:
            "Chain Lightning inflicts damage: +30% Total DMG on next shot/skill (max +90%)",
        },
        {
          level: 3,
          effect:
            "Chain Lightning inflicts damage: +40% Total DMG on next shot/skill (max +200%)",
        },
      ],
      tags: ["weapon_damage", "skill_damage", "conditional_damage"],
      synergyWith: ["asc_tesla_coil"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
    {
      id: "asc_tesla_coil",
      name: "Tesla Coil",
      heroId: "lei_luo",
      description:
        "Chain Lightning bounces more and gains extra charges on shock",
      category: "lightning_strike",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "+2 bounces, +2 max capacity for Chain Lightning. Shock effect: get 1 more usage immediately",
        },
        {
          level: 2,
          effect:
            "+3 bounces, +4 max capacity for Chain Lightning. Shock effect: get 1 more usage immediately",
        },
        {
          level: 3,
          effect:
            "+4 bounces, +6 max capacity for Chain Lightning. Shock effect: get 1 more usage immediately",
        },
      ],
      tags: ["skill_damage", "lightning_damage", "shock", "skill_capacity"],
      synergyWith: ["asc_hyper_current", "asc_electric_circuit"],
      buildArchetypes: [],
      priority: "high",
      power: 9,
    },
    {
      id: "asc_super_charge",
      name: "Super Charge",
      heroId: "lei_luo",
      description:
        "Chain Lightning grants temporary max shield and recharges shield",
      category: "lightning_strike",
      maxLevel: 3,
      levels: [
        {
          level: 1,
          effect:
            "Chain Lightning inflicts damage: +20 max shield for 5s, recharge 6 shield per hit",
        },
        {
          level: 2,
          effect:
            "Chain Lightning inflicts damage: +30 max shield for 6s, recharge 8 shield per hit",
        },
        {
          level: 3,
          effect:
            "Chain Lightning inflicts damage: +40 max shield for 8s, recharge 10 shield per hit",
        },
      ],
      tags: ["shields", "survivability"],
      synergyWith: ["asc_voltaic_aegis", "asc_tesla_coil"],
      buildArchetypes: [],
      priority: "medium",
      power: 7,
    },
  ],
  tags: [
    "lightning_damage",
    "critical_hit",
    "skill_damage",
    "movement_speed",
    "weapon_damage",
  ],
  recommendedBuilds: ["ll_lightning_speed", "ll_no_reload"],
  preferredWeapons: ["sniper", "rifle", "pistol"],
};
