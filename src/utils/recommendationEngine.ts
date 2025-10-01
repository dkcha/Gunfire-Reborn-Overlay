// src/utils/recommendationEngine.ts

import type {
  Scroll,
  Ascension,
  RunState,
  Recommendation,
  SynergyScore,
  BuildArchetype,
  BuildArchetypeDetection,
  SynergyTag,
} from "../types";
import { geminiInscriptions } from "../data/geminiInscriptions";
import { buildArchetypes } from "../data/buildArchetypes";
import {
  getWikiBuildById,
  isItemCoreToTemplate,
  isItemRecommendedForTemplate,
  getTemplateFitScore,
} from "../data/wikiBuildTemplates";

// ============================================================================
// CORE RECOMMENDATION FUNCTION
// ============================================================================

export function generateRecommendations(
  options: (Scroll | Ascension)[],
  runState: RunState
): Recommendation[] {
  const detectedBuild = detectBuildArchetype(runState);

  const recommendations = options.map((item) => {
    const score = scoreItem(item, runState, detectedBuild);
    const reasoning = generateReasoning(item, runState, detectedBuild, score);
    const tier = calculateTier(score.total);

    return {
      item,
      score: score.total,
      synergyBreakdown: score,
      reasoning,
      tier,
      confidence: detectedBuild.confidence,
    };
  });

  return recommendations.sort((a, b) => b.score - a.score);
}

// ============================================================================
// SCORING SYSTEM
// ============================================================================

function scoreItem(
  item: Scroll | Ascension,
  runState: RunState,
  detectedBuild: BuildArchetypeDetection
): SynergyScore {
  const basePower = (("power" in item ? item.power : 5) || 5) * 10;

  const directSynergies = calculateDirectSynergies(item, runState);
  const tagOverlap = calculateTagOverlap(item, runState);
  const geminiBonus = calculateGeminiBonus(item, runState);
  const weaponFit = calculateWeaponFit(item, runState);
  const archetypeFit = calculateArchetypeFit(item, detectedBuild);
  const chainDepth = calculateChainDepth(item, runState);
  const antiSynergyPenalty = calculateAntiSynergyPenalty(item, runState);
  const templateBonus = calculateTemplateBonus(item, runState); // ADD THIS LINE

  let total = basePower;
  total += directSynergies * 25;
  total += tagOverlap * 10;
  total *= 1 + geminiBonus;
  total *= weaponFit;
  total *= archetypeFit;
  total *= 1 + templateBonus; // ADD THIS LINE
  total *= 1 + chainDepth * 0.2;
  total -= antiSynergyPenalty * 50;

  return {
    directSynergies,
    tagOverlap,
    geminiBonus,
    weaponFit,
    archetypeFit,
    chainDepth,
    antiSynergyPenalty,
    total: Math.max(0, total),
  };
}

// ============================================================================
// SYNERGY CALCULATIONS
// ============================================================================

function calculateDirectSynergies(
  item: Scroll | Ascension,
  runState: RunState
): number {
  let count = 0;

  const allAcquiredIds = [
    ...runState.acquiredScrolls.map((s) => s.scroll.id),
    ...runState.acquiredAscensions.map((a) => a.ascension.id),
  ];

  allAcquiredIds.forEach((acquiredId) => {
    if (item.synergyWith.includes(acquiredId)) {
      count++;
    }
  });

  return count;
}

function calculateTagOverlap(
  item: Scroll | Ascension,
  runState: RunState
): number {
  let count = 0;

  const allAcquiredTags = new Set<SynergyTag>();
  runState.acquiredScrolls.forEach((s) => {
    s.scroll.tags.forEach((tag) => allAcquiredTags.add(tag));
  });
  runState.acquiredAscensions.forEach((a) => {
    a.ascension.tags.forEach((tag) => allAcquiredTags.add(tag));
  });

  item.tags.forEach((tag) => {
    if (allAcquiredTags.has(tag)) {
      count++;
    }
  });

  return count;
}

function calculateGeminiBonus(
  item: Scroll | Ascension,
  runState: RunState
): number {
  const primary = runState.weapons.primary;
  const secondary = runState.weapons.secondary;

  if (!primary || !secondary) return 0;
  if (!primary.geminiInscription || !secondary.geminiInscription) return 0;
  if (primary.geminiInscription !== secondary.geminiInscription) return 0;

  const gemini = primary.geminiInscription;
  const geminiData = geminiInscriptions[gemini];

  const matchingTags = item.tags.filter((tag) =>
    geminiData.synergyTags.includes(tag)
  );

  const antiTags = item.tags.filter((tag) =>
    geminiData.antiSynergyTags?.includes(tag)
  );

  let bonus = matchingTags.length * 0.5;
  bonus -= antiTags.length * 1.0;

  if (gemini === "magazine_share") {
    if (item.tags.includes("no_reload")) bonus += 2.0;
    if (item.tags.includes("ammo_capacity")) bonus += 1.5;

    if (
      primary.baseStats.magazine === 1 ||
      secondary.baseStats.magazine === 1
    ) {
      if (item.tags.includes("rate_of_fire")) bonus += 2.5;
      if (item.tags.includes("magazine_stacking")) bonus += 3.0;
    }
  }

  if (gemini === "element_share") {
    if (item.tags.includes("elemental_damage")) bonus += 1.0;
    const elementCount = item.tags.filter(
      (t) =>
        t === "fire_damage" ||
        t === "lightning_damage" ||
        t === "corrosion_damage"
    ).length;
    bonus += elementCount * 0.8;
  }

  if (gemini === "critx_share") {
    if (item.tags.includes("critical_hit")) bonus += 2.0;
    if (item.tags.includes("weakspot_damage")) bonus += 1.0;
    if (item.tags.includes("lucky_shot")) bonus -= 2.0;
  }

  return Math.max(-2.0, Math.min(4.0, bonus));
}

function calculateWeaponFit(
  item: Scroll | Ascension,
  runState: RunState
): number {
  const primary = runState.weapons.primary;
  const secondary = runState.weapons.secondary;

  if (!primary && !secondary) return 1.0;

  let fit = 1.0;

  [primary, secondary].forEach((weapon) => {
    if (!weapon) return;

    const matchingTags = item.tags.filter((tag) => weapon.tags.includes(tag));
    fit += matchingTags.length * 0.1;

    if (weapon.type === "sniper" && item.tags.includes("critical_hit")) {
      fit += 0.3;
    }
    if (
      weapon.type === "submachine_gun" &&
      item.tags.includes("rate_of_fire")
    ) {
      fit += 0.2;
    }
    if (weapon.elementalType && item.tags.includes("elemental_damage")) {
      fit += 0.25;
    }
  });

  return Math.min(2.0, fit);
}

function calculateArchetypeFit(
  item: Scroll | Ascension,
  detectedBuild: BuildArchetypeDetection
): number {
  if (!detectedBuild.archetype) return 1.0;

  const fits = item.buildArchetypes.includes(detectedBuild.archetype.id);

  if (!fits) return 1.0;

  const confidenceBonus = detectedBuild.confidence / 100;
  return 1.0 + 0.5 * confidenceBonus;
}

function calculateChainDepth(
  item: Scroll | Ascension,
  runState: RunState
): number {
  let depth = 0;

  runState.acquiredScrolls.forEach((s) => {
    if (s.scroll.synergyWith.includes(item.id)) depth++;
    if (item.synergyWith.includes(s.scroll.id)) depth++;
  });

  runState.acquiredAscensions.forEach((a) => {
    if (a.ascension.synergyWith.includes(item.id)) depth++;
    if (item.synergyWith.includes(a.ascension.id)) depth++;
  });

  return depth;
}

function calculateAntiSynergyPenalty(
  item: Scroll | Ascension,
  runState: RunState
): number {
  let count = 0;

  const allAcquiredIds = [
    ...runState.acquiredScrolls.map((s) => s.scroll.id),
    ...runState.acquiredAscensions.map((a) => a.ascension.id),
  ];

  if (item.antiSynergyWith) {
    allAcquiredIds.forEach((id) => {
      if (item.antiSynergyWith!.includes(id)) count++;
    });
  }

  return count;
}

// ============================================================================
// TEMPLATE BONUS CALCULATION (NEW)
// ============================================================================

function calculateTemplateBonus(
  item: Scroll | Ascension,
  runState: RunState
): number {
  if (!runState.selectedTemplate) return 0;

  const template = getWikiBuildById(runState.selectedTemplate);
  if (!template) return 0;

  // CORE items - MASSIVE bonus
  if (isItemCoreToTemplate(item.id, template)) {
    return 4.0; // 400% bonus = 5x total multiplier
  }

  // Recommended items
  if (isItemRecommendedForTemplate(item.id, template)) {
    return 1.5; // 150% bonus = 2.5x
  }

  // Good fit
  const fitScore = getTemplateFitScore(item.tags, template);
  if (fitScore >= 3) {
    return 1.0; // 100% bonus = 2x
  } else if (fitScore >= 2) {
    return 0.6; // 60% bonus
  } else if (fitScore >= 1) {
    return 0.3; // 30% bonus
  }

  return 0;
}

// ============================================================================
// BUILD ARCHETYPE DETECTION
// ============================================================================

export function detectBuildArchetype(
  runState: RunState
): BuildArchetypeDetection {
  const geminiArchetype = detectGeminiArchetype(runState);
  if (geminiArchetype) return geminiArchetype;

  const enablerArchetype = detectEnablerArchetype(runState);
  if (enablerArchetype) return enablerArchetype;

  return detectTagBasedArchetype(runState);
}

function detectGeminiArchetype(
  runState: RunState
): BuildArchetypeDetection | null {
  const primary = runState.weapons.primary;
  const secondary = runState.weapons.secondary;

  if (!primary || !secondary) return null;
  if (!primary.geminiInscription || !secondary.geminiInscription) return null;
  if (primary.geminiInscription !== secondary.geminiInscription) return null;

  const gemini = primary.geminiInscription;

  if (gemini === "magazine_share") {
    const archetype = buildArchetypes.find((a) => a.id === "magazine_stacking");
    if (archetype) {
      return {
        archetype,
        confidence: 95,
        matchingTags: ["magazine_stacking", "ammo_capacity", "rate_of_fire"],
        missingElements: [],
      };
    }
  }

  if (gemini === "element_share") {
    const archetype = buildArchetypes.find((a) => a.id === "dual_element");
    if (archetype) {
      return {
        archetype,
        confidence: 90,
        matchingTags: ["dual_element", "elemental_damage"],
        missingElements: [],
      };
    }
  }

  if (gemini === "critx_share") {
    const archetype = buildArchetypes.find((a) => a.id === "critical_hit");
    if (archetype) {
      return {
        archetype,
        confidence: 90,
        matchingTags: ["critical_hit", "crit_scaling"],
        missingElements: [],
      };
    }
  }

  return null;
}

function detectEnablerArchetype(
  runState: RunState
): BuildArchetypeDetection | null {
  const scrollIds = runState.acquiredScrolls.map((s) => s.scroll.id);

  if (scrollIds.includes("scroll_merciless_combo")) {
    const archetype = buildArchetypes.find((a) => a.id === "no_reload");
    if (archetype) {
      const hasDepot = scrollIds.includes("scroll_advanced_depot");
      const hasFlow = scrollIds.includes("scroll_against_the_flow");

      return {
        archetype,
        confidence: 75,
        matchingTags: ["no_reload", "ammo_capacity"],
        missingElements: [
          ...(!hasDepot ? ["Advanced Depot"] : []),
          ...(!hasFlow ? ["Against the Flow"] : []),
        ],
      };
    }
  }

  if (scrollIds.includes("scroll_glass_cannon")) {
    const archetype = buildArchetypes.find((a) => a.id === "glass_cannon");
    if (archetype) {
      return {
        archetype,
        confidence: 80,
        matchingTags: ["weapon_damage", "damage_amplification"],
        missingElements: [],
      };
    }
  }

  return null;
}

function detectTagBasedArchetype(runState: RunState): BuildArchetypeDetection {
  const tagFrequency = new Map<SynergyTag, number>();

  runState.acquiredScrolls.forEach((s) => {
    s.scroll.tags.forEach((tag) => {
      tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1);
    });
  });

  runState.acquiredAscensions.forEach((a) => {
    a.ascension.tags.forEach((tag) => {
      tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1);
    });
  });

  // Use regular for loop instead of forEach
  let bestArchetype: BuildArchetype | null = null;
  let bestScore = 0;

  for (const archetype of buildArchetypes) {
    let score = 0;
    for (const tag of archetype.coreTags) {
      score += tagFrequency.get(tag) || 0;
    }

    if (score > bestScore) {
      bestScore = score;
      bestArchetype = archetype;
    }
  }

  if (bestArchetype && bestScore >= 3) {
    const confidence = Math.min(
      100,
      (bestScore / bestArchetype.coreTags.length) * 100
    );

    return {
      archetype: bestArchetype,
      confidence,
      matchingTags: bestArchetype.coreTags.filter((tag: SynergyTag) =>
        tagFrequency.has(tag)
      ),
      missingElements: [],
    };
  }

  // Safe fallback
  return {
    archetype: buildArchetypes[0],
    confidence: 0,
    matchingTags: [],
    missingElements: [],
  };
}

// ============================================================================
// REASONING GENERATION
// ============================================================================

function generateReasoning(
  item: Scroll | Ascension,
  runState: RunState,
  detectedBuild: BuildArchetypeDetection,
  score: SynergyScore
): string[] {
  const reasons: string[] = [];

  // NEW: Template-specific reasoning (highest priority)
  if (runState.selectedTemplate) {
    const template = getWikiBuildById(runState.selectedTemplate);
    if (template) {
      if (isItemCoreToTemplate(item.id, template)) {
        reasons.push(`🎯 CORE ITEM for ${template.name} build (MUST TAKE)`);
      } else if (isItemRecommendedForTemplate(item.id, template)) {
        reasons.push(`✓ Recommended for ${template.name} build`);
      } else {
        const fitScore = getTemplateFitScore(item.tags, template);
        if (fitScore >= 3) {
          reasons.push(`✓ Strong synergy with ${template.name} build`);
        } else if (fitScore >= 2) {
          reasons.push(`✓ Good fit for ${template.name} build`);
        }
      }
    }
  }

  if (score.geminiBonus > 1.0) {
    const gemini = runState.weapons.primary?.geminiInscription;
    if (gemini) {
      const geminiName = geminiInscriptions[gemini].name;
      reasons.push(
        `⭐ PERFECT FIT for ${geminiName} build (+${Math.round(
          score.geminiBonus * 100
        )}% bonus)`
      );
    }
  }

  if (score.directSynergies > 0) {
    reasons.push(
      `✓ Synergizes with ${score.directSynergies} item${
        score.directSynergies > 1 ? "s" : ""
      } in your build`
    );
  }

  if (score.archetypeFit > 1.1 && detectedBuild.confidence > 50) {
    reasons.push(`✓ Strengthens your ${detectedBuild.archetype.name} build`);
  }

  if (score.chainDepth >= 3) {
    reasons.push(`✓ Creates ${score.chainDepth}-item synergy chain`);
  }

  if (score.antiSynergyPenalty > 0) {
    reasons.push(
      `⚠ Conflicts with ${score.antiSynergyPenalty} item${
        score.antiSynergyPenalty > 1 ? "s" : ""
      } - not recommended`
    );
  }

  if (score.weaponFit > 1.3) {
    reasons.push(`✓ Excellent synergy with your weapons`);
  }

  if (reasons.length === 0) {
    const power = ("power" in item ? item.power : 5) || 5;
    if (power >= 8) {
      reasons.push(`Strong standalone scroll (${power}/10 power)`);
    } else {
      reasons.push(`Decent option, no major synergies detected`);
    }
  }

  return reasons;
}

// ============================================================================
// TIER CALCULATION
// ============================================================================

function calculateTier(score: number): "S" | "A" | "B" | "C" | "D" {
  if (score >= 500) return "S";
  if (score >= 300) return "A";
  if (score >= 150) return "B";
  if (score >= 75) return "C";
  return "D";
}
