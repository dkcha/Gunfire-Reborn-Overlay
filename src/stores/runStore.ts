// src/stores/runStore.ts

import { create } from "zustand";
import type { Hero, Weapon, Scroll, Ascension, RunState } from "../types";

interface RunStore extends RunState {
  // Actions
  selectHero: (hero: Hero) => void;

  // Template selection
  selectTemplate: (templateId: string | null) => void;

  // Weapon actions
  setPrimaryWeapon: (weapon: Weapon | null) => void;
  setSecondaryWeapon: (weapon: Weapon | null) => void;

  // Scroll actions
  addScroll: (scroll: Scroll) => void;
  removeScroll: (scrollId: string) => void;

  // Ascension actions
  addAscension: (ascension: Ascension) => void;
  removeAscension: (ascensionId: string) => void;

  // Build detection
  updateDetectedBuild: (buildId: string | null, confidence: number) => void;

  // Reset
  resetRun: () => void;
}

export const useRunStore = create<RunStore>((set) => ({
  // Initial state
  currentHero: null,
  weapons: {
    primary: null,
    secondary: null,
  },
  acquiredScrolls: [],
  acquiredAscensions: [],
  detectedBuild: null,
  buildConfidence: 0,
  selectedTemplate: null,

  // Hero selection
  selectHero: (hero: Hero) =>
    set({
      currentHero: hero,
      weapons: { primary: null, secondary: null },
      acquiredScrolls: [],
      acquiredAscensions: [],
      detectedBuild: null,
      buildConfidence: 0,
      selectedTemplate: null,
    }),

  // Template selection
  selectTemplate: (templateId: string | null) =>
    set({
      selectedTemplate: templateId,
    }),

  // Weapon management
  setPrimaryWeapon: (weapon: Weapon | null) =>
    set((state) => ({
      weapons: {
        ...state.weapons,
        primary: weapon,
      },
    })),

  setSecondaryWeapon: (weapon: Weapon | null) =>
    set((state) => ({
      weapons: {
        ...state.weapons,
        secondary: weapon,
      },
    })),

  // Scroll management
  addScroll: (scroll: Scroll) =>
    set((state) => ({
      acquiredScrolls: [
        ...state.acquiredScrolls,
        {
          scroll,
          acquiredAt: Date.now(),
          enhanced: scroll.enhanced || false,
        },
      ],
    })),

  removeScroll: (scrollId: string) =>
    set((state) => ({
      acquiredScrolls: state.acquiredScrolls.filter(
        (s) => s.scroll.id !== scrollId
      ),
    })),

  // Ascension management (with leveling)
  addAscension: (ascension: Ascension) =>
    set((state) => {
      const existing = state.acquiredAscensions.find(
        (a) => a.ascension.id === ascension.id
      );

      if (existing) {
        // Level up existing ascension
        if (existing.currentLevel < ascension.maxLevel) {
          return {
            acquiredAscensions: state.acquiredAscensions.map((a) =>
              a.ascension.id === ascension.id
                ? { ...a, currentLevel: a.currentLevel + 1 }
                : a
            ),
          };
        }
        // Already at max level, do nothing
        return state;
      }

      // Add new ascension at level 1
      return {
        acquiredAscensions: [
          ...state.acquiredAscensions,
          {
            ascension,
            currentLevel: 1,
            acquiredAt: Date.now(),
          },
        ],
      };
    }),

  removeAscension: (ascensionId: string) =>
    set((state) => ({
      acquiredAscensions: state.acquiredAscensions.filter(
        (a) => a.ascension.id !== ascensionId
      ),
    })),

  // Build detection
  updateDetectedBuild: (buildId: string | null, confidence: number) =>
    set({
      detectedBuild: buildId,
      buildConfidence: confidence,
    }),

  // Reset everything
  resetRun: () =>
    set({
      currentHero: null,
      weapons: { primary: null, secondary: null },
      acquiredScrolls: [],
      acquiredAscensions: [],
      detectedBuild: null,
      buildConfidence: 0,
      selectedTemplate: null,
    }),
}));
