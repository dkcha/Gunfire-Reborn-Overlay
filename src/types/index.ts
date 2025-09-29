// ============================================================================
// CORE GAME ENTITIES
// ============================================================================

/**
 * Rarity levels for scrolls
 */
export type ScrollRarity = 'normal' | 'rare' | 'legendary' | 'cursed';

/**
 * Element types in the game
 */
export type ElementType = 'fire' | 'lightning' | 'corrosion';

/**
 * Weapon categories
 */
export type WeaponType = 'rifle' | 'submachine_gun' | 'pistol' | 'shotgun' | 'sniper' | 'launcher' | 'injector' | 'melee';

/**
 * Build archetype categories
 */
export type BuildArchetype = 
  | 'elemental_fire'
  | 'elemental_lightning'
  | 'elemental_corrosion'
  | 'no_reload'
  | 'critical_hit'
  | 'skill_damage'
  | 'movement_speed'
  | 'weapon_damage'
  | 'tanky_sustain'
  | 'lucky_shot';

/**
 * Tag system for synergy detection
 */
export type SynergyTag = 
  // Damage Types
  | 'weapon_damage'
  | 'skill_damage'
  | 'elemental_damage'
  | 'fire_damage'
  | 'lightning_damage'
  | 'corrosion_damage'
  | 'explosion_damage'
  
  // Effects
  | 'burning'
  | 'shock'
  | 'decay'
  | 'critical_hit'
  | 'lucky_shot'
  
  // Mechanics
  | 'rate_of_fire'
  | 'reload'
  | 'no_reload'
  | 'ammo'
  | 'magazine'
  | 'movement_speed'
  | 'dash'
  | 'cooldown_reduction'
  
  // Defense
  | 'shields'
  | 'armor'
  | 'health'
  | 'damage_resistance'
  | 'survivability'
  
  // Skills
  | 'primary_skill'
  | 'secondary_skill'
  | 'skill_cooldown';

// ============================================================================
// HERO SYSTEM
// ============================================================================

/**
 * Playable hero/character
 */
export interface Hero {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  
  // Abilities
  primarySkill: HeroSkill;
  secondarySkill: HeroSkill;
  passive?: HeroSkill;
  
  // Ascension pool for this hero
  ascensions: Ascension[];
  
  // Playstyle tags
  tags: SynergyTag[];
  
  // Recommended build archetypes
  recommendedBuilds: BuildArchetype[];
}

/**
 * Hero skill/ability
 */
export interface HeroSkill {
  name: string;
  description: string;
  type: 'primary' | 'secondary' | 'passive';
}

// ============================================================================
// ASCENSION SYSTEM
// ============================================================================

/**
 * Hero-specific upgrade from Golden Goblets
 */
export interface Ascension {
  id: string;
  name: string;
  heroId: string; // Which hero this belongs to
  description: string;
  iconUrl?: string;
  
  // Multiple levels (some have 1, some have 3)
  levels: AscensionLevel[];
  
  // Synergy metadata
  tags: SynergyTag[];
  synergyWith: string[]; // Scroll IDs, ascension IDs, or tags
  antiSynergyWith: string[];
  
  // Build recommendations
  buildArchetypes: BuildArchetype[];
  priority: 'high' | 'medium' | 'low'; // General power level
}

/**
 * Individual level of an ascension
 */
export interface AscensionLevel {
  level: 1 | 2 | 3;
  effect: string;
  numericValues?: {
    [key: string]: number; // e.g., "damage_boost": 20
  };
}

// ============================================================================
// SCROLL SYSTEM
// ============================================================================

/**
 * Occult Scroll - passive effect item
 */
export interface Scroll {
  id: string;
  name: string;
  rarity: ScrollRarity;
  description: string;
  effect: string;
  iconUrl?: string;
  
  // Enhanced version (Reincarnation difficulty)
  hasEnhanced: boolean;
  enhancedEffect?: string;
  
  // Can this scroll be discarded?
  discardable: boolean;
  
  // Synergy metadata
  tags: SynergyTag[];
  synergyWith: string[]; // IDs or tags that synergize
  antiSynergyWith: string[];
  
  // Build recommendations
  buildArchetypes: BuildArchetype[];
  
  // Conditional synergies (e.g., "good with fire weapons")
  conditionalSynergies?: ConditionalSynergy[];
  
  // Power rating (1-10)
  power: number;
  
  // Unlock requirement
  unlockRequirement?: string;
}

/**
 * Conditional synergy rule
 */
export interface ConditionalSynergy {
  condition: string; // Human-readable
  synergyWith: string[];
  bonus: number; // Multiplier for synergy score
}

// ============================================================================
// BUILD TRACKING
// ============================================================================

/**
 * Current run state
 */
export interface RunState {
  id: string;
  startTime: Date;
  
  // Hero selection
  selectedHero: Hero | null;
  
  // Acquired items
  acquiredScrolls: AcquiredScroll[];
  acquiredAscensions: AcquiredAscension[];
  
  // Build analysis
  detectedArchetypes: BuildArchetypeDetection[];
  currentTags: Map<SynergyTag, number>; // Tag frequency
  
  // Metadata
  difficulty?: string;
  stage?: number;
}

/**
 * Scroll acquired during a run
 */
export interface AcquiredScroll {
  scroll: Scroll;
  acquiredAt: Date;
  enhanced: boolean;
  stage?: number;
}

/**
 * Ascension acquired during a run
 */
export interface AcquiredAscension {
  ascension: Ascension;
  currentLevel: 1 | 2 | 3;
  acquiredAt: Date;
  stage?: number;
}

/**
 * Detected build archetype with confidence
 */
export interface BuildArchetypeDetection {
  archetype: BuildArchetype;
  confidence: number; // 0-1
  supportingItems: string[]; // IDs of scrolls/ascensions supporting this
}

// ============================================================================
// RECOMMENDATION SYSTEM
// ============================================================================

/**
 * Recommendation for a scroll or ascension choice
 */
export interface Recommendation {
  item: Scroll | Ascension;
  score: number; // 0-100
  reasoning: RecommendationReason[];
  rank: number; // 1, 2, 3, etc.
}

/**
 * Why this item was recommended
 */
export interface RecommendationReason {
  type: 'synergy' | 'archetype' | 'power' | 'anti_synergy';
  message: string;
  impact: number; // How much this affected the score
  relatedItems?: string[]; // IDs of items this synergizes with
}

/**
 * Options presented to the player (e.g., 3 ascensions from a goblet)
 */
export interface Choice {
  id: string;
  type: 'ascension' | 'scroll';
  options: (Scroll | Ascension)[];
  recommendations: Recommendation[];
  timestamp: Date;
}

// ============================================================================
// BUILD ARCHETYPE DEFINITIONS
// ============================================================================

/**
 * Build archetype template
 */
export interface BuildArchetypeDefinition {
  id: BuildArchetype;
  name: string;
  description: string;
  
  // What makes this build work
  coreTags: SynergyTag[]; // Must have these
  supportingTags: SynergyTag[]; // Nice to have
  
  // Key items
  coreScrolls: string[]; // Scroll IDs that define this build
  coreAscensions: string[]; // Hero-agnostic ascension patterns
  
  // Synergy bonuses
  synergyMultiplier: number; // How much to boost synergistic picks
  
  // Heroes that excel at this
  bestHeroes: string[]; // Hero IDs
}

// ============================================================================
// WEAPON RECOMMENDATIONS (Future)
// ============================================================================

/**
 * Weapon information
 */
export interface Weapon {
  id: string;
  name: string;
  type: WeaponType;
  element?: ElementType;
  description: string;
  
  // Synergy
  tags: SynergyTag[];
  synergyWith: string[];
  
  // Stats
  damageType: 'projectile' | 'hitscan';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// ============================================================================
// USER PREFERENCES
// ============================================================================

/**
 * User settings and preferences
 */
export interface UserPreferences {
  // UI
  theme: 'dark' | 'light';
  compactMode: boolean;
  showPowerRatings: boolean;
  
  // Recommendations
  recommendationDepth: 'simple' | 'detailed';
  autoDetectArchetype: boolean;
  showAntiSynergies: boolean;
  
  // Overlay (future)
  overlayOpacity: number;
  overlayPosition: { x: number; y: number };
  overlayHotkey?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Synergy relationship between two items
 */
export interface SynergyRelation {
  itemA: string;
  itemB: string;
  strength: number; // 0-1
  reason: string;
  tags: SynergyTag[];
}

/**
 * Statistics for a completed run
 */
export interface RunStatistics {
  runId: string;
  hero: string;
  difficulty: string;
  completed: boolean;
  duration: number; // seconds
  scrollsAcquired: number;
  ascensionsAcquired: number;
  finalArchetype?: BuildArchetype;
  endTime: Date;
}
