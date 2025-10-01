// src/types/index.ts - UPDATED VERSION

// ============================================================================
// GEMINI INSCRIPTIONS
// ============================================================================

export type GeminiInscription =
  | "magazine_share" // Share magazine capacity, gain stacks for damage
  | "element_share" // Share elemental damage types between weapons
  | "critx_share"; // Combine CritX values (combined - 2.0)

export interface GeminiInscriptionData {
  id: GeminiInscription;
  name: string;
  description: string;
  effect: string;
  synergyTags: SynergyTag[];
  antiSynergyTags?: SynergyTag[];
  buildArchetypes: string[];
}

// ============================================================================
// WEAPON SYSTEM
// ============================================================================

export type WeaponType =
  | "pistol"
  | "submachine_gun"
  | "rifle"
  | "sniper"
  | "shotgun"
  | "launcher"
  | "bow"
  | "melee"
  | "injector"
  | "staff";

export interface WeaponStats {
  damage: number;
  magazine: number;
  critX: number;
  elementalEffectChance?: number;
  rateOfFire: number;
  reloadTime: number;
}

export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  baseStats: WeaponStats;
  elementalType?: "fire" | "lightning" | "corrosion" | "fusion" | null;
  geminiInscription?: GeminiInscription;
  hasExclusiveInscription?: boolean;
  tags: SynergyTag[];
  description?: string;
}

// ============================================================================
// SYNERGY TAGS (EXPANDED)
// ============================================================================

export type SynergyTag =
  // Damage Types
  | "weapon_damage"
  | "skill_damage"
  | "elemental_damage"
  | "area_damage"
  | "conditional_damage"

  // Elements
  | "fire_damage"
  | "lightning_damage"
  | "corrosion_damage"
  | "fusion"

  // Elemental Status Effects
  | "burning"
  | "shock"
  | "decay"
  | "frozen"

  // Combat Mechanics
  | "critical_hit"
  | "lucky_shot"
  | "rate_of_fire"
  | "weakspot_damage"
  | "accuracy"

  // Magazine & Ammo
  | "no_reload"
  | "ammo_capacity"
  | "reload_speed"
  | "magazine_efficiency"

  // Skills
  | "cooldown_reduction"
  | "skill_capacity"
  | "skill_enhancement"

  // Defense
  | "shields"
  | "survivability"
  | "damage_reduction"
  | "crowd_control"

  // Utility
  | "movement_speed"
  | "damage_amplification"
  | "economy"
  | "healing"
  | "projectile_count"

  // Gemini-Specific
  | "magazine_stacking" // NEW: For Magazine Share builds
  | "dual_element" // NEW: For Element Share builds
  | "crit_scaling"; // NEW: For CritX Share builds

// ============================================================================
// HERO
// ============================================================================

export interface HeroSkill {
  id: string;
  name: string;
  description: string;
  cooldown: number;
  type: "primary" | "secondary";
}

export interface Hero {
  id: string;
  name: string;
  description: string;
  baseStats: {
    health: number;
    shield: number;
    armor: number;
    movementSpeed: number;
  };
  skills: HeroSkill[];
  ascensions: Ascension[];
  tags: SynergyTag[];
  recommendedBuilds: string[];
  preferredWeapons?: WeaponType[]; // NEW: Suggest weapon types
}

// ============================================================================
// ASCENSION
// ============================================================================

export interface AscensionLevel {
  level: 1 | 2 | 3;
  effect: string;
  values?: Record<string, number>;
}

export interface Ascension {
  id: string;
  name: string;
  heroId?: string;
  description: string;
  category?: string;
  levels: AscensionLevel[];
  maxLevel: number;
  tags: SynergyTag[];
  synergyWith: string[];
  antiSynergyWith?: string[];
  buildArchetypes: string[];
  priority?: "high" | "medium" | "low";
  power?: number;
}

export interface AcquiredAscension {
  ascension: Ascension;
  currentLevel: number;
  acquiredAt: number;
}

// ============================================================================
// SCROLL
// ============================================================================

export type ScrollRarity = "normal" | "rare" | "legendary" | "cursed";

export interface ConditionalSynergy {
  condition: string;
  synergyWith: string[];
  bonus: number;
}

export interface Scroll {
  id: string;
  name: string;
  rarity: ScrollRarity;
  description: string;
  effect: string;
  tags: SynergyTag[];
  synergyWith: string[];
  antiSynergyWith?: string[];
  conditionalSynergies?: ConditionalSynergy[];
  buildArchetypes: string[];
  power: number;
  enhanced?: boolean;
}

export interface AcquiredScroll {
  scroll: Scroll;
  acquiredAt: number;
  enhanced?: boolean;
}

// ============================================================================
// BUILD ARCHETYPES
// ============================================================================

export interface BuildArchetype {
  id: string;
  name: string;
  description: string;
  coreScrolls: string[];
  coreTags: SynergyTag[];
  recommendedAscensions?: string[];
  requiredGemini?: GeminiInscription; // NEW: Some builds NEED specific Gemini
  powerLevel: number;
  difficulty: "easy" | "medium" | "hard";
}

// ============================================================================
// RUN STATE (UPDATED)
// ============================================================================

export interface RunState {
  currentHero: Hero | null;
  weapons: {
    primary: Weapon | null;
    secondary: Weapon | null;
  };
  acquiredScrolls: AcquiredScroll[];
  acquiredAscensions: AcquiredAscension[];
  detectedBuild: string | null;
  buildConfidence: number;
  selectedTemplate: string | null; // NEW: Wiki build template ID
}

// ============================================================================
// RECOMMENDATION SYSTEM
// ============================================================================

export interface BuildArchetypeDetection {
  archetype: BuildArchetype;
  confidence: number;
  matchingTags: SynergyTag[];
  missingElements: string[];
}

export interface SynergyScore {
  directSynergies: number;
  tagOverlap: number;
  geminiBonus: number; // NEW
  weaponFit: number; // NEW
  archetypeFit: number;
  chainDepth: number;
  antiSynergyPenalty: number;
  total: number;
}

export interface Recommendation {
  item: Scroll | Ascension;
  score: number;
  synergyBreakdown: SynergyScore;
  reasoning: string[];
  tier: "S" | "A" | "B" | "C" | "D";
  confidence: number;
}

export interface Choice {
  options: (Scroll | Ascension)[];
  type: "scroll" | "ascension" | "goblet";
  recommendations: Recommendation[];
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

export function isScroll(item: Scroll | Ascension): item is Scroll {
  return "rarity" in item;
}

export function isAscension(item: Scroll | Ascension): item is Ascension {
  return "levels" in item;
}

export function isWeapon(item: Weapon): item is Weapon {
  return "baseStats" in item && "type" in item;
}
