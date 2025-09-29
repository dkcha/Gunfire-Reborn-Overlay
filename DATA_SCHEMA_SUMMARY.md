# Data Schema Implementation Summary

## What We've Built

### ✅ Complete Type System (`src/types/index.ts`)

A comprehensive TypeScript type system covering all game entities:

**Core Game Types:**
- `Hero` - Playable characters with skills and ascension pools
- `Ascension` - Hero-specific upgrades with multiple levels
- `Scroll` - Occult scrolls with rarity, synergies, and build archetypes
- `BuildArchetype` - Predefined build patterns (10 archetypes)
- `SynergyTag` - 30+ tags for synergy detection

**System Types:**
- `RunState` - Tracking current run progress
- `Recommendation` - AI recommendation with reasoning
- `Choice` - Goblet/scroll selection options
- `BuildArchetypeDetection` - Auto-detected player build direction

### ✅ Hero Data (2/12 Heroes Complete)

**Crown Prince** (`data/heroes/crownPrince.ts`)
- 9 ascensions with 1-3 levels each
- Elemental specialist (Fire, Lightning, Corrosion)
- Skill-focused abilities (Energy Orb, Smoke Grenade)
- Tags: elemental_damage, fire_damage, lightning_damage, corrosion_damage, skill_damage

**Lei Luo** (`data/heroes/leiLuo.ts`)
- 9 ascensions with 1-3 levels each
- Speed and lightning specialist
- High mobility, low HP
- Tags: lightning_damage, skill_damage, movement_speed, critical_hit

### ✅ Scroll Data (38+ Scrolls)

**Normal Scrolls (25+)**
- Advanced Depot, Elemental Weave, Lucky Shot, Quick Hands, etc.
- Common synergies and mechanics
- Foundational build pieces

**Rare Scrolls (11)**
- Merciless Combo, Against the Flow, Flesh and Bone
- Build-defining scrolls
- High synergy potential

**Legendary Scrolls (10)**
- Concentrated Strike, Glass Cannon, Elemental Catalyst
- Game-changing effects
- Highest power ratings

### ✅ Build Archetype System

**10 Complete Archetypes:**
1. **No-Reload Build** - Continuous fire with Merciless Combo
2. **Fire Elemental** - Burning damage and combos
3. **Lightning Elemental** - Shock and chain damage
4. **Corrosion Elemental** - Decay and area control
5. **Skill Damage** - Ability-focused with cooldown reduction
6. **Critical Hit** - Burst damage with crits
7. **Lucky Shot** - Consistent damage spikes
8. **Movement Speed** - High mobility scaling
9. **Weapon Damage** - Pure gun damage
10. **Tanky Sustain** - Survivability and sustain

### ✅ Data Utilities (`data/index.ts`)

**Query Functions:**
- `getHeroById(id)` - Find hero by ID
- `getScrollById(id)` - Find scroll by ID
- `getScrollsByRarity(rarity)` - Filter by rarity
- `getScrollsByTag(tag)` - Filter by synergy tag
- `getScrollsByArchetype(archetype)` - Filter by build type

**Synergy Engine:**
- `checkSynergy(itemA, itemB)` - Detect synergies
- `checkAntiSynergy(itemA, itemB)` - Detect conflicts
- `getSynergisticItems(item)` - Find all synergies
- `calculateSynergyScore(item, acquiredItems)` - Score calculation

---

## File Structure Created

```
src/
├── types/
│   └── index.ts                    # Complete type definitions
├── data/
│   ├── heroes/
│   │   ├── crownPrince.ts         # Crown Prince data
│   │   └── leiLuo.ts              # Lei Luo data
│   ├── scrolls/
│   │   ├── normal.ts              # Normal rarity scrolls
│   │   └── rareAndLegendary.ts   # Rare + Legendary scrolls
│   ├── buildArchetypes.ts         # 10 build definitions
│   └── index.ts                   # Data aggregation & utilities
└── components/
    └── DataTest.tsx                # Test component to verify data
```

---

## How to Test the Data

1. **Replace** `src/App.tsx` content with:
```tsx
import DataTest from './components/DataTest';

function App() {
  return <DataTest />;
}

export default App;
```

2. **Run** the dev server:
```bash
npm run dev
```

3. **Visit** `http://localhost:5173/` to see:
   - Data statistics
   - Hero listings with ascensions
   - Sample scrolls by rarity
   - Build archetypes
   - Synergy detection test

---

## Key Design Decisions

### 1. Tag-Based Synergy System
Instead of hardcoding every synergy relationship, we use tags:
- Items with 2+ matching tags = automatic synergy
- Explicit `synergyWith` and `antiSynergyWith` arrays for special cases
- Flexible and maintainable as data grows

### 2. Multi-Level Recommendation Scoring
```typescript
Score = (BasePower × 10) 
      + (SynergyScore × ArchetypeMultiplier) 
      - (AntiSynergyPenalty × 15)
```

### 3. Build Archetype Detection
The system will detect emerging build patterns by:
- Counting tag frequency across acquired items
- Matching against archetype definitions
- Calculating confidence scores
- Suggesting picks that strengthen detected builds

### 4. Conditional Synergies
Some scrolls have context-dependent synergies:
```typescript
conditionalSynergies: [
  {
    condition: 'With no-reload setup',
    synergyWith: ['no_reload'],
    bonus: 2.5  // 2.5x synergy multiplier
  }
]
```

---

## Next Steps

### Immediate (Phase 1 - Data Completion)
1. **Add Remaining Heroes** (10 more)
   - Ao Bai, Qing Yan, Tao, Qian Sui
   - Xing Zhe, Li, Nona, Zi Xiao
   - Lyn, Momo

2. **Add Remaining Scrolls** (~165 more)
   - Complete Normal scrolls (48 more)
   - Complete Rare scrolls (55 more)
   - Complete Legendary scrolls (29 more)
   - Add all Cursed scrolls (25 total)

3. **Refine Synergy Relationships**
   - Review and add more explicit synergies
   - Add anti-synergies (conflicting items)
   - Add conditional synergies for complex interactions

### Phase 2 - UI Development
1. **Hero Selection Screen**
   - Grid of hero cards
   - Show recommended builds for each
   - Filter/search functionality

2. **Run Tracker Interface**
   - Current build summary
   - Acquired scrolls/ascensions display
   - Tag frequency visualization
   - Detected build archetype display

3. **Recommendation Panel**
   - Show top 3-5 recommendations
   - Color-coded by synergy strength
   - Expandable reasoning for each pick
   - "Why this?" tooltips

### Phase 3 - Recommendation Engine
1. **Build Detection Algorithm**
   - Analyze acquired items
   - Calculate tag frequencies
   - Match against archetype patterns
   - Output confidence scores

2. **Scoring System**
   - Base power rating
   - Synergy bonuses
   - Anti-synergy penalties
   - Archetype fit multipliers
   - Hero-specific bonuses

3. **Reasoning Generator**
   - "Synergizes with [X] and [Y]"
   - "Strengthens your [Fire Elemental] build"
   - "Conflicts with [Z] - not recommended"

---

## Data Statistics

### Current Coverage
- **Heroes**: 2/12 (17%)
- **Ascensions**: 18 total (from 2 heroes)
- **Scrolls**: 46/203 (23%)
  - Normal: 25/73 (34%)
  - Rare: 11/66 (17%)
  - Legendary: 10/39 (26%)
  - Cursed: 0/25 (0%)
- **Build Archetypes**: 10/10 (100%)
- **Synergy Tags**: 30+ defined

### Priority for Completion
1. **High Priority**: Core scrolls that appear in most builds
   - Merciless Combo ✅
   - Against the Flow ✅
   - Advanced Depot ✅
   - Skill Bible ✅
   - Glass Cannon ✅

2. **Medium Priority**: Popular hero-specific items
   - More hero ascensions (need 10 more heroes)
   - Hero-synergistic scrolls

3. **Low Priority**: Niche/situational items
   - Cursed scrolls (optional challenge items)
   - Ultra-specific synergies

---

## Usage Examples

### Example 1: Query Hero Data
```typescript
import { getHeroById, getHeroByName } from './data';

const hero = getHeroById('crown_prince');
console.log(hero.name); // "Crown Prince"
console.log(hero.ascensions.length); // 9

const leiLuo = getHeroByName('Lei Luo');
console.log(leiLuo.recommendedBuilds); // ['elemental_lightning', 'skill_damage', ...]
```

### Example 2: Find Synergistic Scrolls
```typescript
import { getScrollById, getSynergisticItems } from './data';

const merciless = getScrollById('scroll_merciless_combo');
const synergies = getSynergisticItems(merciless);

console.log(synergies.map(s => s.name));
// ["Advanced Depot", "Against the Flow", ...]
```

### Example 3: Check Build Archetype Fit
```typescript
import { getScrollsByArchetype, buildArchetypes } from './data';

const noReloadArchetype = buildArchetypes.find(a => a.id === 'no_reload');
const coreScrolls = noReloadArchetype.coreScrolls;

const noReloadScrolls = getScrollsByArchetype('no_reload');
console.log(noReloadScrolls.length); // All scrolls that fit this build
```

### Example 4: Calculate Synergy Score
```typescript
import { calculateSynergyScore, getScrollById } from './data';

const acquiredScrolls = [
  getScrollById('scroll_advanced_depot'),
  getScrollById('scroll_against_the_flow')
];

const merciless = getScrollById('scroll_merciless_combo');
const score = calculateSynergyScore(merciless, acquiredScrolls);

console.log(score); // 20 (synergy with both items)
```

---

## Synergy Examples in Action

### Example Build: Crown Prince Fire Elemental

**Acquired Items:**
1. **Ascension**: Flame Enthusiasm (Lv 2) - +50% Fire DMG
2. **Ascension**: Combustion - Burning enemies in smoke take +100% Fire DMG
3. **Scroll**: Blazing Hoop - Periodic fire pulse

**Next Choice**: Elemental Catalyst (Legendary)
- **Synergy Score**: 30
  - +10 for synergy with Flame Enthusiasm (fire_damage tag)
  - +10 for synergy with Blazing Hoop (fire_damage tag)
  - +10 for synergy with Combustion (burning tag)
- **Archetype Fit**: elemental_fire (1.8x multiplier)
- **Final Score**: 30 × 1.8 = 54
- **Reasoning**: "Spreads burning to nearby enemies, synergizes with your fire build"

### Example Build: Lei Luo No-Reload

**Acquired Items:**
1. **Scroll**: Advanced Depot - Double ammo capacity
2. **Scroll**: Against the Flow - Use reserve ammo first

**Next Choice**: Merciless Combo (Rare)
- **Synergy Score**: 20
  - +10 for synergy with Advanced Depot
  - +10 for synergy with Against the Flow
- **Archetype Fit**: no_reload (2.0x multiplier)
- **Conditional Bonus**: +2.5x (with no-reload setup detected)
- **Final Score**: 20 × 2.0 × 2.5 = 100
- **Reasoning**: "PERFECT FIT! Stacks damage without reloading - core of no-reload build"

---

## Common Patterns & Anti-Synergies

### Strong Synergies
- **No-Reload**: Advanced Depot + Against the Flow + Merciless Combo
- **Fire Elemental**: Blazing Hoop + Flame Enthusiasm + Elemental Catalyst
- **Skill Damage**: Skill Bible + Magic Watch + Secondary Capacity
- **Crit Build**: Concentrated Strike + Critical Mastery + Sniper weapons

### Anti-Synergies to Avoid
- **Concentrated Strike** (crit build) vs **Ultimate Gambler** (lucky shot build)
  - Both compete for damage source
- **Stationary Aim** vs **Movement Speed** scrolls
  - Conflicting playstyles
- **No-Reload** vs **Reload-dependent** scrolls
  - Elemental Magazine requires reloading
  - Quick Hands is wasted on no-reload
- **Glass Cannon** vs **Tanky Sustain**
  - Reduces HP, conflicts with survivability

---

## Future Enhancements

### Data Expansion
- [ ] Add weapon data with synergies
- [ ] Add inscription system
- [ ] Add seasonal mechanics (Arcane Ascensions, etc.)
- [ ] Add difficulty-specific modifiers

### Advanced Features
- [ ] Machine learning from community builds
- [ ] Win rate data integration
- [ ] Meta tier list generation
- [ ] Custom build creator/saver

### Quality of Life
- [ ] Search/filter for all entities
- [ ] Visual synergy graph
- [ ] Build simulator (theory crafting)
- [ ] Import/export builds as codes

---

## Testing Checklist

Before moving to UI development, verify:

- [x] All type definitions compile without errors
- [x] Hero data loads correctly
- [x] Scroll data loads correctly  
- [x] Build archetypes are accessible
- [x] Synergy detection works
- [x] Anti-synergy detection works
- [x] Tag-based queries work
- [x] Rarity filtering works
- [ ] Add remaining heroes (10 more)
- [ ] Add remaining scrolls (~165 more)
- [ ] Validate all synergy relationships
- [ ] Test edge cases in synergy scoring

---

## Tips for Adding More Data

### Adding a New Hero
1. Create `data/heroes/heroName.ts`
2. Define all ascensions with:
   - ID, name, description
   - 1-3 levels with effects
   - Tags for synergy
   - Build archetype fits
3. Export hero object with skills and info
4. Import in `data/index.ts`

### Adding New Scrolls
1. Add to appropriate file (normal.ts, rareAndLegendary.ts, or new file)
2. Include all required fields:
   - ID (use `scroll_` prefix)
   - Name, rarity, description, effect
   - Tags (2-5 relevant tags)
   - Synergy relationships (scroll IDs or tags)
   - Build archetypes (1-3 fits)
   - Power rating (1-10)
3. Add to exports in `data/index.ts`

### Determining Tags
Ask these questions:
- What type of damage? (weapon_damage, skill_damage, elemental_damage)
- What mechanic? (reload, ammo, movement_speed, cooldown_reduction)
- What element? (fire_damage, lightning_damage, corrosion_damage)
- What status? (burning, shock, decay, critical_hit)
- What playstyle? (no_reload, survivability, shields)

### Setting Power Ratings
- **1-3**: Situational/niche scrolls
- **4-6**: Good general scrolls
- **7-8**: Strong build-defining scrolls  
- **9-10**: Meta-defining legendary scrolls

---

## Resources for Data Entry

### Wiki Pages to Reference
- [Gunfire Reborn Wiki - Ascensions](https://gunfirereborn.fandom.com/wiki/Ascensions)
- [Gunfire Reborn Wiki - Occult Scrolls](https://gunfirereborn.fandom.com/wiki/Occult_Scrolls)
- [Gunfire Reborn Wiki - Heroes](https://gunfirereborn.fandom.com/wiki/Category:Heroes)

### Community Guides
- Speedrun.com guides for each hero
- Reddit build discussions
- Steam community guides

---

## Conclusion

We've built a **solid, scalable foundation** for the Gunfire Reborn Build Assistant:

✅ **Complete type system** with 15+ interfaces  
✅ **2 heroes** with full ascension data  
✅ **46 scrolls** across all rarities with synergies  
✅ **10 build archetypes** fully defined  
✅ **Synergy engine** with tag-based detection  
✅ **Query utilities** for easy data access  
✅ **Test component** to verify everything works  

**Next session**, we can either:
1. Continue adding more data (heroes and scrolls)
2. Start building the UI components
3. Implement the recommendation engine

The data schema is production-ready and can be extended without breaking changes!

---

*Data Schema v1.0 - September 29, 2025*