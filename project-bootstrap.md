# Gunfire Reborn Build Assistant - Project Bootstrap

## Project Overview

A real-time build recommendation overlay for the game Gunfire Reborn that helps players make optimal choices for scrolls and ascensions based on synergies and build archetypes.

**Repository:** https://github.com/dkcha/Gunfire-Reborn-Overlay  
**Local Path:** `D:\Projects\GunfireOverlay`

---

## Current Status

### ✅ Completed
- [x] Project initialized with Vite + React + TypeScript
- [x] Tailwind CSS v3.4.0 configured
- [x] Git repository initialized and connected to GitHub
- [x] Base dependencies installed (zustand, lucide-react, clsx, tailwind-merge)
- [x] Project structure created (components, data, hooks, stores, types, utils)
- [x] Initial type definitions created (`src/types/index.ts`)
- [x] VS Code configured with recommended settings
- [x] Initial commit pushed to GitHub
- [x] **Complete type system with 15+ interfaces**
- [x] **2 heroes with full ascension data (Crown Prince, Lei Luo)**
- [x] **46 scrolls with synergies (25 Normal, 11 Rare, 10 Legendary)**
- [x] **10 build archetypes fully defined**
- [x] **Synergy detection engine implemented**
- [x] **Data query utilities created**
- [x] **Test component to verify data loading**

### 🔄 In Progress
- [x] Complete type system (DONE)
- [x] Initial data schema (DONE - 2 heroes, 46 scrolls, 10 archetypes)
- [ ] Complete remaining hero data (10 more heroes)
- [ ] Complete remaining scroll data (~165 more scrolls)
- [ ] Add cursed scrolls (25 total)

### 📋 Next Steps (Priority Order)

1. **Phase 1A: Test Current Data** ⬅️ YOU ARE HERE
   - [ ] Replace App.tsx with DataTest component
   - [ ] Run `npm run dev` and verify data loads
   - [ ] Check console for any errors
   - [ ] Review hero and scroll displays
   - [ ] Test synergy detection

2. **Phase 1B: Expand Data (Optional - or move to Phase 2)**
   - [ ] Add 3-4 more popular heroes (Tao, Qing Yan, Ao Bai, Qian Sui)
   - [ ] Add ~30 more high-priority scrolls
   - [ ] Refine synergy relationships based on wiki/guides

3. **Phase 2: State Management**
   - [ ] Set up Zustand store for application state
   - [ ] Create store for current run tracking (selected hero, acquired scrolls/ascensions)
   - [ ] Implement state persistence (localStorage)

4. **Phase 3: Basic UI**
   - [ ] Create hero selection component
   - [ ] Create current build display component
   - [ ] Create scroll/ascension input interface (manual tracking)
   - [ ] Implement basic layout and navigation

5. **Phase 4: Recommendation Engine**
   - [ ] Build synergy detection algorithm
   - [ ] Implement build archetype recognition
   - [ ] Create scoring system for recommendations
   - [ ] Add anti-synergy detection

6. **Phase 5: MVP Testing & Refinement**
   - [ ] Test with real gameplay scenarios
   - [ ] Gather user feedback
   - [ ] Refine recommendation algorithm
   - [ ] Polish UI/UX

7. **Phase 6: Advanced Features (Future)**
   - [ ] Build archetype library
   - [ ] Community builds import/export
   - [ ] Run statistics tracking
   - [ ] Weapon recommendations
   - [ ] OCR for automatic detection
   - [ ] Migration to Electron for true overlay

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
│   ├── components/       # React components
│   │   └── DataTest.tsx  # Test component
│   ├── data/            # Game data (heroes, scrolls, etc.)
│   │   ├── heroes/
│   │   │   ├── crownPrince.ts
│   │   │   └── leiLuo.ts
│   │   ├── scrolls/
│   │   │   ├── normal.ts
│   │   │   └── rareAndLegendary.ts
│   │   ├── buildArchetypes.ts
│   │   └── index.ts     # Data aggregation & utilities
│   ├── hooks/           # Custom React hooks
│   ├── stores/          # Zustand state stores
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts     # Complete type system
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
├── .vscode/             # VS Code settings
├── node_modules/        # Dependencies (gitignored)
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── PROJECT_BOOTSTRAP.md      # This file
├── DATA_SCHEMA_SUMMARY.md    # Data implementation details
└── QUICK_START.md            # Quick start for next session
```

---

## Development Workflow

### Starting Development
```bash
cd D:\Projects\GunfireOverlay
npm run dev
# Open http://localhost:5173/
```

### Installing New Packages
```bash
# Stop dev server (Ctrl+C)
npm install package-name
# Restart dev server
npm run dev
```

### Git Workflow
```bash
git status                    # Check changes
git add .                     # Stage all changes
git commit -m "Description"   # Commit with message
git push                      # Push to GitHub
```

### Building for Production
```bash
npm run build
npm run preview  # Preview production build
```

---

## Lessons Learned & Best Practices

### Development Approach
1. **Think Before Coding**: Plan data structures and component architecture thoroughly before writing code
2. **Type Safety First**: Define TypeScript types before implementing features
3. **Incremental Development**: Build and test small pieces, don't create large features all at once
4. **Test with Real Data**: Use actual game data for testing, not placeholder data
5. **User-Centric Design**: Always consider how players will actually use this during gameplay

### Technical Decisions
1. **Why Tailwind v3 not v4**: v4 had PostCSS plugin issues; v3 is stable and well-documented
2. **Why Zustand over Redux**: Simpler API, less boilerplate, perfect for this project size
3. **Why Vite over CRA**: Faster development server, better DX, modern tooling
4. **Web App First**: Prototype as web app before adding Electron overlay complexity

### Common Pitfalls to Avoid
1. ❌ Don't run npm commands while dev server is running
2. ❌ Don't forget to stop and restart dev server after config changes
3. ❌ Don't mix Tailwind CSS versions
4. ❌ Don't over-engineer early - start simple, add complexity when needed
5. ❌ Don't hardcode data - use JSON files that can be easily updated

---

## Game Data Reference

### Key Game Mechanics
- **Ascensions**: Hero-specific passive upgrades from Golden Goblets (reset each run)
- **Occult Scrolls**: Passive effects from various sources (203 total across 4 rarities)
- **Build Archetypes**: Common synergy patterns (Elemental, No-Reload, Crit, Skill Damage, etc.)
- **Enhanced Scrolls**: Available in Reincarnation difficulty with improved effects
- **Synergies**: Scrolls/ascensions that work well together
- **Anti-Synergies**: Combinations that conflict or reduce effectiveness

### Data Sources
- **Primary**: Gunfire Reborn Wiki (https://gunfirereborn.fandom.com/)
- **Secondary**: Community guides, speedrun strategies, tier lists
- **Build Examples**: Speedrun.com guides for each hero

### Heroes (12 Total)
Crown Prince, Ao Bai, Qing Yan, Lei Luo, Tao, Qian Sui, Xing Zhe, Li, Nona, Zi Xiao, Lyn, Momo

---

## Key Features for MVP

### Must Have (Phase 1)
- Hero selection
- Manual scroll/ascension tracking
- Basic synergy highlighting
- Simple recommendation system
- Current build summary display

### Nice to Have (Phase 2)
- Build archetype detection
- Advanced synergy scoring
- Weapon recommendations
- Save/load builds
- Dark/light theme toggle

### Future Enhancements (Phase 3+)
- OCR for automatic tracking
- Electron overlay
- Community builds database
- Machine learning recommendations
- Integration with game files (if possible)

---

## Architecture Decisions

### State Management Strategy
```typescript
// Zustand store structure
interface AppStore {
  // Run State
  currentHero: Hero | null;
  acquiredScrolls: Scroll[];
  acquiredAscensions: Ascension[];
  
  // UI State
  showRecommendations: boolean;
  compactMode: boolean;
  
  // Actions
  selectHero: (hero: Hero) => void;
  addScroll: (scroll: Scroll) => void;
  addAscension: (ascension: Ascension) => void;
  resetRun: () => void;
}
```

### Recommendation Algorithm (Planned)
1. Analyze current scrolls/ascensions for tags
2. Detect emerging build archetypes based on tag frequency
3. Score potential picks based on:
   - Synergy with existing items (high weight)
   - Fit with detected archetype (medium weight)
   - General power level (low weight)
   - Anti-synergy penalties (negative weight)
4. Return top 3-5 recommendations with reasoning

### Data Schema (Implemented)
```typescript
// Scroll with synergy metadata
interface Scroll {
  id: string;
  name: string;
  rarity: 'normal' | 'rare' | 'legendary' | 'cursed';
  effect: string;
  tags: SynergyTag[];                // ["fire", "elemental", "damage"]
  synergyWith: string[];            // IDs or tags
  antiSynergyWith: string[];        // IDs or tags
  buildArchetypes: BuildArchetype[];// ["elemental_fire", "skill_damage"]
  power: number;                     // 1-10 general power rating
}
```

---

## Current Type Definitions

Located in `src/types/index.ts`:

### Core Types (15+ interfaces)
- `Hero` - Playable character
- `Ascension` - Hero upgrades
- `Scroll` - Occult scrolls
- `BuildArchetype` - Build patterns
- `RunState` - Current run tracking
- `Recommendation` - AI suggestions
- `Choice` - Selection options
- `SynergyTag` - Tag system (30+ tags)
- And more...

**See**: `DATA_SCHEMA_SUMMARY.md` for complete details

---

## Current Data Coverage

### Heroes (2/12)
- ✅ Crown Prince (Elemental specialist)
- ✅ Lei Luo (Speed/lightning specialist)
- ⏳ 10 more to add

### Scrolls (46/203)
- ✅ Normal: 25/73 (34%)
- ✅ Rare: 11/66 (17%)
- ✅ Legendary: 10/39 (26%)
- ⏳ Cursed: 0/25 (0%)

### Build Archetypes (10/10)
- ✅ No-Reload
- ✅ Fire Elemental
- ✅ Lightning Elemental
- ✅ Corrosion Elemental
- ✅ Skill Damage
- ✅ Critical Hit
- ✅ Lucky Shot
- ✅ Movement Speed
- ✅ Weapon Damage
- ✅ Tanky Sustain

---

## Questions to Address

### Data Structure
- How to model synergies efficiently? (✅ Solved: tag-based system)
- How to handle conditional synergies? (✅ Solved: conditionalSynergies array)
- How to version data as game updates? (⏳ TBD)

### User Experience
- How much information to show without overwhelming? (⏳ TBD)
- When to show recommendations (always vs on-demand)? (⏳ TBD)
- How to handle build pivots mid-run? (⏳ TBD)

### Technical
- Client-side only or need backend for community features? (⏳ TBD)
- How to handle data updates (game patches)? (⏳ TBD)
- Performance considerations for real-time recommendations? (⏳ TBD)

---

## Resources & References

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

## Contact & Collaboration

**Developer**: dkcha  
**GitHub**: https://github.com/dkcha/Gunfire-Reborn-Overlay  
**Project Start**: September 29, 2025

---

## Version History

- **v0.1.0** (2025-09-29): Initial project setup, repository created, basic structure established
- **v0.2.0** (2025-09-29): Complete type system, 2 heroes, 46 scrolls, 10 archetypes, synergy engine

---

## How to Use This Document

### For Continuing Work
1. Review "Current Status" to see what's done
2. Check "Next Steps" for what to work on next
3. Review "Lessons Learned" before starting new features
4. Update sections as you make progress

### For New Chat Sessions
1. Start by sharing this entire document for context
2. Also share `DATA_SCHEMA_SUMMARY.md` for data details
3. Reference specific sections as needed
4. Update after significant milestones
5. Keep the "Current Status" section up to date

### For Collaboration
1. Share with other developers joining the project
2. Link in README.md for easy access
3. Keep architecture decisions documented
4. Add new sections as project evolves

---

## Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Git
git add .
git commit -m "message"
git push

# Package management
npm install package-name
npm uninstall package-name
```

---

*Last Updated: September 29, 2025*  
*Version: 0.2.0*