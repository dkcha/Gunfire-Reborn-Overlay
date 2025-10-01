// src/components/HeroSelection.tsx - FIXED

import { useState } from "react";
import { allHeroes } from "../data";
import { useRunStore } from "../stores/runStore";
import type { Hero } from "../types";

export default function HeroSelection() {
  const { selectHero } = useRunStore();
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  const handleSelectHero = (hero: Hero) => {
    setSelectedHero(hero);
  };

  const handleConfirm = () => {
    if (selectedHero) {
      selectHero(selectedHero);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Select Your Hero
          </h1>
          <p className="text-slate-400 text-lg">
            Choose your character to begin your run
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {allHeroes.map((hero) => (
            <button
              key={hero.id}
              onClick={() => handleSelectHero(hero)}
              className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                selectedHero?.id === hero.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {hero.name}
                  </h3>
                  <p className="text-slate-400 text-sm">{hero.description}</p>
                </div>
                {selectedHero?.id === hero.id && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Health</div>
                  <div className="text-lg font-bold text-red-400">
                    {hero.baseStats.health}
                  </div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Shield</div>
                  <div className="text-lg font-bold text-blue-400">
                    {hero.baseStats.shield}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {hero.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase">
                  Skills
                </div>
                {hero.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-2 bg-slate-900/30 rounded text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        {skill.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {skill.cooldown}s CD
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="text-xs text-slate-400 mb-2">
                  Recommended Builds:
                </div>
                <div className="flex flex-wrap gap-1">
                  {hero.recommendedBuilds.slice(0, 2).map((build) => (
                    <span
                      key={build}
                      className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300"
                    >
                      {build.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedHero && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={handleConfirm}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              Confirm {selectedHero.name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
