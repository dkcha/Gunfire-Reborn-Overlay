# Gunfire Reborn Build Assistant - Project Bootstrap

## Project Overview

A real-time build recommendation overlay for the game Gunfire Reborn that helps players make optimal choices for scrolls and ascensions based on synergies and build archetypes.

**Repository:** https://github.com/dkcha/Gunfire-Reborn-Overlay  
**Local Path:** `D:\Projects\GunfireOverlay`

---

## Current Status

### ✅ Completed (Updated: September 29, 2025)
- [x] Project initialized with Vite + React + TypeScript
- [x] Tailwind CSS v3.4.0 configured
- [x] Git repository initialized and connected to GitHub
- [x] Base dependencies installed (zustand, lucide-react, clsx, tailwind-merge)
- [x] Project structure created (components, data, hooks, stores, types, utils)
- [x] **Complete type system with 15+ interfaces**
- [x] **2 heroes with FULL 18 ascensions each (Crown Prince, Lei Luo)**
  - Each hero has 3 categories with 6 ascensions per category
  - All ascensions have 1-3 levels with proper effects
  - Categorized as: Elemental/Orb/Grenade (Crown Prince), Combat/Survival/Skill (Lei Luo)
- [x] **46 scrolls with synergies (25 Normal, 11 Rare, 10 Legendary)**
- [x] **10 build archetypes fully defined**
- [x] **Synergy detection engine implemented**
- [x] **Data query utilities created**
- [x] **Working Hero Selection UI**
- [x] **Working Run Tracker UI with categorized ascension modal**
- [x] **Zustand state management with proper ascension leveling**
- [x] **Ascension leveling system (1→2→3)**
- [x] **Build detection showing detected archetypes**
- [x] **Tag frequency visualization**

### 🔧 Fixed Today
- [x] Type system alignment (Hero interface now uses `skills` array and `baseStats`)
- [x] Ascension leveling bug (now properly levels up 1→2→3)
- [x] Added missing SynergyTags (area_damage, conditional_damage, fusion, etc.)
- [x] Fixed AcquiredAscension interface (currentLevel as number, acquiredAt as timestamp)
- [x] Updated all components to use `hero.skills` instead of primarySkill/secondarySkill
- [x] Proper type annotations throughout codebase

### 📋 Next Steps (Priority Order)

**Session Goal for Next Time:** Continue with one of these paths:

#### Option A: Add More Hero Data (Expand Dataset)
- [ ] Add Tao with 18 ascensions
- [ ] Add Qing Yan with 18 ascensions  
- [ ] Add Ao Bai with 18 ascensions
- [ ] Add 20-30 more popular scrolls
- [ ] Validate and expand synergy relationships

**Pros:** Better testing of recommendation engine, more complete data
**Cons:** Can be tedious, less visually exciting

#### Option B: Build Recommendation Engine (Core Feature)
- [ ] Implement build archetype detection algorithm
- [ ] Create scoring system for recommendations
- [ ] Generate reasoning for each recommendation
- [ ] Add recommendation display panel to UI
- [ ] Test with current 2 heroes + 46 scrolls

**Pros:** Core feature complete, exciting algorithmic work
**Cons:** Limited by current dataset (only 2 heroes)

#### Option C: Polish UI/UX (Visual Improvements)
- [ ] Add hero stat display
- [ ] Improve ascension modal styling
- [ ] Add scroll selection modal
- [ ] Better visual feedback for synergies
- [ ] Add compact/expanded toggle animations

**Pros:** App looks more polished and professional
**Cons:** Doesn't add core functionality

**Recommended:** Option B (Recommendation Engine) - It's the most important feature and you have enough data to test it properly now.

---

## Tech Stack

### Core
- **React 18** with TypeScript
- **Vite** - Build tool
- **Tailwind CSS v3.4.0** - Styling
- **Zustand** - State management
- **Lucide React** - Icons

### Development
- Node.js v18+
- Git
- VS Code with extensions:
  - ES7+ React/Redux snippets
  - Tailwind CSS IntelliSense
  - Prettier
  - ESLint
  - GitLens

---

## Project Structure

```
GunfireOverlay/
├── src/
│   ├── components/
│   │   ├── DataTest.tsx
│   │   ├── HeroSelection.tsx
│   │   └── RunTracker.tsx
│   ├── data/
│   │   ├── heroes/
│   │   │   ├── crownPrince.ts      # 18 ascensions complete
│   │   │   └── leiLuo.ts           # 18 ascensions complete
│   │   ├── scrolls/
│   │   │   ├── normal.ts
│   │   │   └── rareAndLegendary.ts
│   │   ├── buildArchetypes.ts
│   │   └── index.ts                # Data aggregation & utilities
│   ├── hooks/
│   ├── stores/
│   │   └── runStore.ts             # Zustand state with ascension leveling
│   ├── types/
│   │   └── index.ts                # Complete type system
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── .vscode/
├── node_modules/
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── PROJECT_BOOTSTRAP.md            # This file
├── DATA_SCHEMA_SUMMARY.md
└── QUICK_START.md
```

---

## Key Features Implemented

### 1. Hero Data Structure
```typescript
interface Hero {
  id: string;
  name: string;
  description: string;
  baseStats: { health, shield, armor, movementSpeed };
  skills: HeroSkill[];              // Array of skills with id, name, cooldown
  ascensions: Ascension[];          // 18 ascensions in 3 categories
  tags: SynergyTag[];
  recommendedBuilds: BuildArchetype[];
}
```

### 2. Ascension Categorization
Each hero has **18 ascensions** organized into **3 categories** with **6 ascensions each**:

**Crown Prince:**
- Elemental (6): Pyrodominance, Electrodominance, Acidominance, Elemental Rage, Wildfire, Hex Smoke
- Orb (6): Energy Blade, Energy Echo, Energy Bolt, Chained Duration, Blinding Sphere, Power Source
- Grenade (6): Smoke Genius, Toxic Smoke, Acidic Explosion, Elemental Shield, Advanced Shield, Backpack Expansion

**Lei Luo:**
- Combat (6): Thunder Turbo, Fulminous Zap, High-Powered Arc, Lightning Messenger, Gradual Improvement, Deadly Counter
- Survival (6): Voltaic Aegis, Overconsumption, Copper Miner, Wait For Good, Bullet Shell Refining, Energy Storage
- Skill (6): Hyper Current, Skill Freak, Tesla Coil, Endless Assault, Secondary Capacity, Chain Link

### 3. Ascension Leveling System
```typescript
// User clicks ascension once → Level 1
// User clicks same ascension → Level 2
// User clicks again → Level 3
// Try to click at Level 3 → Nothing happens (maxed)

addAscension: (ascension: Ascension) => {
  // Check if exists
  // If exists and < maxLevel: level up
  // If new: add at level 1
  // If maxed: ignore
}
```

### 4. State Management (Zustand)
```typescript
interface RunStore {
  currentHero: Hero | null;
  acquiredScrolls: AcquiredScroll[];
  acquiredAscensions: AcquiredAscension[];  // Tracks current level
  detectedBuild: string | null;
  
  selectHero: (hero: Hero) => void;
  addScroll: (scroll: Scroll) => void;
  addAscension: (ascension: Ascension) => void;  // Smart leveling
  removeScroll/removeAscension: (id: string) => void;
  resetRun: () => void;
}
```

### 5. Synergy Tag System
Over 30 tags for automatic synergy detection:
- Damage: weapon_damage, skill_damage, elemental_damage, area_damage, conditional_damage
- Elements: fire_damage, lightning_damage, corrosion_damage, fusion
- Status: burning, shock, decay, frozen
- Combat: critical_hit, lucky_shot, rate_of_fire, no_reload, ammo_capacity
- Skills: cooldown_reduction, skill_capacity
- Defense: shields, survivability, damage_reduction, crowd_control
- Utility: movement_speed, damage_amplification, economy, etc.

---

## Development Workflow

### Starting Development
```bash
cd D:\Projects\GunfireOverlay
npm run dev
# Open http://localhost:5173/
```

### Current App Flow
1. User sees Hero Selection screen
2. Click a hero → Shows Run Tracker
3. Click "Add Ascension" → Modal with 3 categories (6 items each)
4. Click ascension → Adds at Level 1
5. Click same ascension again → Levels up to 2
6. Click again → Levels up to 3
7. Try clicking maxed ascension → Nothing happens
8. Build detection shows when 2+ items match an archetype

### Git Workflow
```bash
git status
git add .
git commit -m "Description"
git push
```

---

## Important Type Definitions

### Ascension
```typescript
interface Ascension {
  id: string;
  name: string;
  heroId?: string;                    // Optional
  description: string;
  category?: string;                  // "elemental", "orb", "grenade", etc.
  levels: AscensionLevel[];           // 1-3 levels
  tags: SynergyTag[];
  synergyWith: string[];
  antiSynergyWith?: string[];         // Optional
  buildArchetypes: BuildArchetype[];
  priority?: "high" | "medium" | "low";  // Optional
  power?: number;                     // Optional 1-10 rating
}
```

### AcquiredAscension
```typescript
interface AcquiredAscension {
  ascension: Ascension;               // Full ascension object
  currentLevel: number;               // 1, 2, or 3
  acquiredAt: number;                 // Unix timestamp
}
```

---

## Data Statistics

### Current Coverage (Updated)
- **Heroes**: 2/12 (17%) - **BUT both have complete 18 ascensions!**
- **Ascensions**: 36 total (18 per hero, organized in 3 categories)
- **Scrolls**: 46/203 (23%)
  - Normal: 25/73 (34%)
  - Rare: 11/66 (17%)
  - Legendary: 10/39 (26%)
  - Cursed: 0/25 (0%)
- **Build Archetypes**: 10/10 (100%)
- **Synergy Tags**: 35+ defined

---

## Key Learnings & Best Practices

### Today's Session Learnings

1. **Type Alignment is Critical**
   - Interface definitions must match actual implementation
   - Optional fields (`?`) provide flexibility
   - Document breaking changes when updating interfaces

2. **Nested Data Structures**
   - `AcquiredAscension` wraps `Ascension` for tracking state
   - Always access through `.ascension` property
   - Keep raw data separate from runtime state

3. **Component Type Safety**
   - Add explicit type annotations to arrow functions: `(asc: Ascension) =>`
   - Remove unused imports to keep code clean
   - Use optional chaining (`?.`) for safe property access

4. **State Management Patterns**
   - Immutability: Always create new arrays/objects
   - Smart logic in store: Leveling, validation, etc.
   - Return unchanged state when nothing changes

5. **Data Organization**
   - Categorizing ascensions improves UX (3 tabs of 6 items > 18 items in one list)
   - Consistent patterns make data entry easier
   - Tags enable flexible synergy detection

---

## Next Session Preparation

### To Start Next Session

1. **Share Context**: Provide this file + DATA_SCHEMA_SUMMARY.md
2. **Run App**: `npm run dev` and verify everything works
3. **Choose Path**: Decide between Options A/B/C above
4. **Set Goal**: Clear objective for the session

### If Building Recommendation Engine (Option B)

**Algorithm Components Needed:**
1. **Tag Frequency Counter** - Count tags in acquired items
2. **Archetype Matcher** - Match frequencies to build patterns
3. **Synergy Calculator** - Score potential picks
4. **Recommendation Generator** - Create top 3-5 suggestions with reasoning

**Test Data:**
- 2 complete heroes with 36 ascensions
- 46 scrolls across all rarities
- 10 build archetypes for matching

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Git
git status
git add .
git commit -m "message"
git push

# Package management
npm install package-name
npm uninstall package-name
```

---

## Resources

### Official
- [Gunfire Reborn Wiki](https://gunfirereborn.fandom.com/)
- [Official Discord](https://discord.com/invite/gunfire-reborn)

### Community
- [Speedrun Guides](https://www.speedrun.com/gunfire_reborn/guides)
- [Reddit Community](https://www.reddit.com/r/GunfireReborn/)

### Development
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)

---

## Version History

- **v0.1.0** (2025-09-29): Initial project setup, repository created, basic structure
- **v0.2.0** (2025-09-29): Complete type system, 2 heroes with partial ascensions, synergy engine
- **v0.3.0** (2025-09-29): **MAJOR UPDATE**
  - Both heroes now have complete 18 ascensions (3 categories, 6 each)
  - Working ascension leveling system (1→2→3)
  - Fixed all type mismatches and component errors
  - Full Hero Selection + Run Tracker UI
  - Build detection and tag visualization
  - Production-ready data structure

---

## Contact & Collaboration

**Developer**: dkcha  
**GitHub**: https://github.com/dkcha/Gunfire-Reborn-Overlay  
**Project Start**: September 29, 2025

---

*Last Updated: September 29, 2025 (v0.3.0)*  
*Next Session Goal: Choose between expanding data, building recommendation engine, or polishing UI*
