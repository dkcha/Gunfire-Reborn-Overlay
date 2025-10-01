# Next Session Quick Start Guide

## What We Accomplished Today ✅

We successfully implemented the **Gemini Inscription system** and **Recommendation Engine** - the core intelligence of the build assistant!

### Key Achievements:
1. ✅ Added Gemini Inscription types (Magazine Share, Element Share, CritX Share)
2. ✅ Created Weapon system with 9 sample weapons
3. ✅ Built recommendation engine with Gemini awareness
4. ✅ Updated build archetypes (13 total, 3 Gemini-specific)
5. ✅ Created test component to verify everything works
6. ✅ Updated run store to track weapons

---

## How to Resume Next Session

### Step 1: Load Context
Share these files with Claude:
- `project-bootstrap.md` - Overall project context
- `gemini_implementation_guide.md` - What we built today
- This file - Next steps

### Step 2: Test Current Build
```bash
cd D:\Projects\GunfireOverlay
npm run dev
```

Update `src/App.tsx`:
```tsx
import RecommendationTest from './components/RecommendationTest';

function App() {
  return <RecommendationTest />;
}

export default App;
```

Visit http://localhost:5173 and test the recommendation engine:
1. Click "Magazine Share Build" scenario
2. Add scrolls one by one
3. Watch recommendations update with scores
4. Verify S-tier recommendations appear

### Step 3: Choose Your Path

---

## Three Paths Forward

### Option A: Expand Dataset ⭐ RECOMMENDED
**Goal:** Add more weapons and scrolls to make recommendations more robust

**Tasks:**
1. Add 10-15 more weapons across all types
   - More 1-bullet weapons (magazine share)
   - More elemental weapons (element share)
   - More high-crit weapons (critx share)
   - Variety of magazine sizes and firing patterns

2. Add weapon-specific synergies to existing scrolls
   - Tag scrolls that work well with specific weapon types
   - Add Gemini-aware tags to scrolls

3. Add 20-30 more popular scrolls
   - Focus on meta scrolls
   - Ensure good coverage of all build archetypes
   - Tag properly for Gemini synergies

**Why This Path:**
- Recommendations need diverse data to be useful
- More weapons = better testing
- More scrolls = more realistic scenarios
- Foundation is ready, just needs content

**Time Estimate:** 2-3 hours

---

### Option B: Integrate Into Main UI
**Goal:** Replace test component with proper RunTracker integration

**Tasks:**
1. Add weapon selection to RunTracker
   - Dropdown for primary/secondary weapon
   - Gemini status display
   - Visual weapon cards

2. Create recommendation panel
   - Show top 3-5 recommendations
   - Display scoring breakdown
   - Show reasoning bullets
   - Color-coded by tier

3. Improve build detection display
   - Show detected archetype with confidence
   - Tag frequency visualization
   - Missing elements indicators

4. Add "choice simulator"
   - Mock goblet choices
   - Show how recommendations change
   - Test different scenarios

**Why This Path:**
- See the system in action
- Better UX testing
- Motivating visual progress
- Can use mock data for now

**Time Estimate:** 2-3 hours

---

### Option C: Add Hero-Weapon Synergies
**Goal:** Make heroes prefer certain weapons and Geminis

**Tasks:**
1. Add `preferredWeapons` to hero data
   - Crown Prince → Elemental weapons
   - Lei Luo → Fast-firing SMGs
   - Zi Xiao → 1-bullet weapons

2. Add hero-specific Gemini bonuses
   - Zi Xiao + Magazine Share = extra bonus
   - Crown Prince + Element Share = extra bonus
   - Lei Luo + CritX Share on fast weapons

3. Update scoring to include hero bonuses
   - +20% for preferred weapon types
   - +30% for optimal Gemini match

4. Create hero-weapon matchup matrix
   - Show which weapons work best with each hero
   - Guide weapon selection

**Why This Path:**
- Makes hero choice meaningful
- Adds another layer of strategy
- More personalized recommendations
- Deepens the system

**Time Estimate:** 2 hours

---

## My Recommendation: **Option A (Expand Dataset)**

Here's why:

1. **Recommendation engine needs data** - With only 9 weapons and 3 test scrolls, we can't fully test the system
2. **Quick wins** - Adding weapons/scrolls is straightforward copy-paste work
3. **Validates the system** - More data = better testing = find edge cases
4. **Foundation for other options** - Options B and C both need more data anyway

After Option A, we can do B or C with confidence.

---

## If You Choose Option A: Adding More Data

### Weapons to Add (Priority Order)

**High Priority (Magazine Share):**
1. Illusion (1-mag pistol) - Auto-refills
2. Prism (1-mag pistol) - Reflects bullets
3. Concealed Ammo variants - Different magazine sizes

**High Priority (Element Share):**
4. Crimson Firescale (fire sniper)
5. Lightning Blast variants
6. Poisonous Ghost (corrosion)
7. Aura of Venom (corrosion SMG)

**High Priority (CritX Share):**
8. Wild Hunt (high-crit rifle)
9. Scalpel (crit-focused pistol)
10. Any scoped snipers with good CritX

**Medium Priority (No-Reload):**
11. Argus variants with large magazines
12. Scorching Rounds (huge magazine)
13. Any 50+ magazine weapons

**Low Priority (Utility):**
14. Launchers (Justice, Tiger Cannon)
15. Bows (Golden Bow)
16. Melee weapons

### Scrolls to Add (Priority Order)

**No-Reload Build:**
- Quick Hands
- Elemental Magazine
- Stationary Aim
- More ammo-focused scrolls

**Elemental Builds:**
- More fire scrolls (combustion synergies)
- More lightning scrolls (chain effects)
- More corrosion scrolls (decay stacking)
- Fusion scrolls

**Crit Build:**
- Headshot bonuses
- Accuracy scrolls
- Weakspot multipliers

**Skill Build:**
- More cooldown reduction
- Skill capacity increases
- Skill damage multipliers

### Template for Adding Weapons

```typescript
{
  id: 'weapon_name',
  name: 'Display Name',
  type: 'weapon_type',
  baseStats: {
    damage: 0,
    magazine: 0,
    critX: 0.0,
    elementalEffectChance: 0, // if elemental
    rateOfFire: 0.0,
    reloadTime: 0.0,
  },
  elementalType: 'fire' | 'lightning' | 'corrosion' | null,
  tags: ['tag1', 'tag2', 'tag3'],
  description: 'Short description highlighting key features',
}
```

### Template for Tagging Scrolls for Gemini

```typescript
// Example: A reload-speed scroll
{
  // ... existing scroll data
  tags: [
    'reload_speed',        // Keep existing
    'weapon_damage',       // Keep existing
    // Add Gemini-awareness:
    // (NO magazine_stacking - anti-synergy with no-reload!)
  ],
  antiSynergyWith: [
    'scroll_merciless_combo',  // Conflicts with no-reload
  ],
}
```

---

## If You Choose Option B: UI Integration

### Component Structure

```
RunTracker/
├── WeaponSelector.tsx       // Weapon dropdowns + Gemini display
├── BuildSummary.tsx         // Current build overview
├── RecommendationPanel.tsx  // Top recommendations
└── ChoiceSimulator.tsx      // Mock goblet choices
```

### Key Features to Build

1. **Weapon Selector**
   - Two dropdowns (primary/secondary)
   - Show weapon stats on hover
   - Highlight when Gemini matches
   - Show calculated bonuses (shared magazine, CritX, etc.)

2. **Recommendation Panel**
   - Always show top 3 recommendations
   - Expand/collapse for more details
   - Color-coded by tier
   - Click to add to build

3. **Build Summary**
   - Show detected archetype
   - Confidence meter
   - Tag frequency bars
   - Missing key items

---

## If You Choose Option C: Hero-Weapon Synergies

### Hero Matchups to Define

**Zi Xiao:**
- ⭐⭐⭐ Perfect: 1-bullet weapons + Magazine Share
- ⭐⭐ Good: High fire-rate weapons
- ⭐ OK: Any weapon
- Focus: Spam cards, fast attacks

**Crown Prince:**
- ⭐⭐⭐ Perfect: Elemental weapons + Element Share
- ⭐⭐ Good: Any elemental weapon
- ⭐ OK: Physical weapons
- Focus: Elemental combos, skill damage

**Lei Luo:**
- ⭐⭐⭐ Perfect: Fast SMGs + CritX Share
- ⭐⭐ Good: Any SMG or rapid-fire weapon
- ⭐ OK: Slow weapons
- Focus: Speed, lightning, mobility

---

## Testing Checklist for Next Session

Before moving forward, verify:

### Must Test:
- [ ] Magazine Share build scores correctly (800+ for perfect synergy)
- [ ] Element Share build recommends elemental scrolls
- [ ] CritX Share build penalizes lucky shot
- [ ] Anti-synergies drop scores significantly
- [ ] Build detection shows correct archetype

### Nice to Test:
- [ ] All 9 weapons load without errors
- [ ] All 3 Gemini inscriptions display correctly
- [ ] Tier calculation makes sense (S/A/B/C/D)
- [ ] Reasoning text is helpful
- [ ] Quick scenarios work properly

---

## Common Issues & Solutions

### Issue: Recommendations all show low scores
**Solution:** Make sure weapons have matching Gemini inscriptions

### Issue: Gemini bonus is 0
**Solution:** Check that primary and secondary weapons have the SAME Gemini

### Issue: TypeScript errors
**Solution:** Make sure all imports use the updated paths:
- `import { Weapon } from '../types'`
- `import { sampleWeapons } from '../data/geminiInscriptions'`

### Issue: Component doesn't render
**Solution:** Verify `RecommendationTest` is imported correctly in App.tsx

---

## Session Goals

By end of next session, aim to have:

**Minimum (Option A):**
- 15+ total weapons
- 60+ total scrolls
- All major weapon types represented
- Good coverage of all Gemini builds

**Good (Option B):**
- Weapon selector in RunTracker
- Recommendation panel working
- Build summary with archetype detection
- Smooth user experience

**Excellent (Option C):**
- Hero-weapon matchup matrix
- Hero-specific Gemini bonuses
- Personalized recommendations based on hero
- Deeper strategic layer

---

## Files to Reference

**Core Files:**
- `src/types/index.ts` - All type definitions
- `src/data/geminiInscriptions.ts` - Weapons and Gemini data
- `src/utils/recommendationEngine.ts` - Scoring logic
- `src/data/buildArchetypes.ts` - Build definitions
- `src/stores/runStore.ts` - State management

**Documentation:**
- `gemini_implementation_guide.md` - Detailed explanation
- `project-bootstrap.md` - Overall project status
- This file - Next steps

---

## Quick Reference: Key Functions

```typescript
// Generate recommendations
const recommendations = generateRecommendations(options, runState);

// Detect build
const detected = detectBuildArchetype(runState);

// Calculate Gemini bonus
const bonus = calculateGeminiBonus(item, runState);

// Get weapon by ID
const weapon = getWeaponById('weapon_rainbow');

// Set weapons in store
setPrimaryWeapon(weapon);
setSecondaryWeapon(weapon);
```

---

## Success Criteria

Next session is successful if:

1. ✅ More weapons/scrolls added OR UI integrated OR hero synergies working
2. ✅ Recommendation engine still works correctly
3. ✅ No breaking bugs introduced
4. ✅ System feels more complete and useful

---

**Ready to go!** Pick your path and let's build something awesome!

*Prepared: September 30, 2025*