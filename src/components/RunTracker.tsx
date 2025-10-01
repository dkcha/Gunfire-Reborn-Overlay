import { useState } from "react";
import {
  Scroll,
  Shield,
  TrendingUp,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRunStore } from "../stores/runStore";
import type { Ascension, AcquiredAscension } from "../types";
import { allScrolls } from "../data";
import { getWikiBuildById } from "../data/wikiBuildTemplates";
import ScrollSelectionModal from "./ScrollSelectionModal";

export default function RunTracker() {
  const {
    currentHero,
    acquiredScrolls,
    acquiredAscensions,
    selectedTemplate,
    addAscension,
    removeScroll,
    removeAscension,
    resetRun,
  } = useRunStore();

  const [showAscensionModal, setShowAscensionModal] = useState(false);
  const [showScrollModal, setShowScrollModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showScrolls, setShowScrolls] = useState(true);
  const [showAscensions, setShowAscensions] = useState(true);

  if (!currentHero) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-slate-400 text-xl">No hero selected</p>
          <button
            onClick={resetRun}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Select Hero
          </button>
        </div>
      </div>
    );
  }

  const categories = [
    ...new Set(
      currentHero.ascensions
        .map((a) => a.category)
        .filter((c): c is string => c !== undefined)
    ),
  ];

  const handleAddAscension = (ascension: Ascension) => {
    addAscension(ascension);
  };

  const getTemplateProgress = () => {
    if (!selectedTemplate) return null;

    const template = getWikiBuildById(selectedTemplate);
    if (!template) return null;

    const acquiredScrollIds = acquiredScrolls.map((s) => s.scroll.id);
    const acquiredAscensionIds = acquiredAscensions.map((a) => a.ascension.id);

    const coreItemsAcquired = [
      ...template.coreScrolls.filter((id: string) =>
        acquiredScrollIds.includes(id)
      ),
      ...template.coreAscensions.filter((id: string) =>
        acquiredAscensionIds.includes(id)
      ),
    ];

    const totalCoreItems =
      template.coreScrolls.length + template.coreAscensions.length;
    const percentage =
      totalCoreItems > 0
        ? (coreItemsAcquired.length / totalCoreItems) * 100
        : 0;

    const missingCoreScrolls = template.coreScrolls.filter(
      (id: string) => !acquiredScrollIds.includes(id)
    );
    const missingCoreAscensions = template.coreAscensions.filter(
      (id: string) => !acquiredAscensionIds.includes(id)
    );

    const missingScrollNames = missingCoreScrolls
      .map((id: string) => allScrolls.find((s) => s.id === id)?.name)
      .filter((name): name is string => name !== undefined);

    const missingAscensionNames = missingCoreAscensions
      .map(
        (id: string) => currentHero.ascensions.find((a) => a.id === id)?.name
      )
      .filter((name): name is string => name !== undefined);

    return {
      template,
      acquired: coreItemsAcquired.length,
      total: totalCoreItems,
      percentage,
      isComplete:
        coreItemsAcquired.length === totalCoreItems && totalCoreItems > 0,
      missingScrolls: missingScrollNames,
      missingAscensions: missingAscensionNames,
    };
  };

  const templateProgress = getTemplateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Run Tracker</h1>
            <p className="text-slate-300">
              Playing as{" "}
              <span className="font-semibold text-purple-400">
                {currentHero.name}
              </span>
            </p>
          </div>
          <button
            onClick={resetRun}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            New Run
          </button>
        </div>

        {templateProgress && (
          <div className="bg-slate-800 border-2 border-purple-500 rounded-lg p-6 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp size={24} className="text-purple-400" />
                  {templateProgress.template.name}
                </h3>
                <p className="text-slate-400 mt-1">
                  {templateProgress.template.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {templateProgress.acquired}/{templateProgress.total}
                </div>
                <div className="text-sm text-slate-400">Core Items</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 ease-out"
                  style={{ width: `${templateProgress.percentage}%` }}
                />
              </div>
              <div className="text-right text-sm text-slate-400 mt-1">
                {Math.round(templateProgress.percentage)}%
              </div>
            </div>

            {templateProgress.isComplete ? (
              <div className="bg-green-900/30 border border-green-500 rounded-lg p-4">
                <p className="text-green-400 font-medium">
                  Build Complete! All core items acquired.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-4">
                <p className="text-yellow-400 font-medium mb-2">
                  Still need these core items:
                </p>
                <ul className="space-y-1">
                  {templateProgress.missingScrolls.map((name: string) => (
                    <li key={name} className="text-yellow-300 text-sm">
                      • {name}
                    </li>
                  ))}
                  {templateProgress.missingAscensions.map((name: string) => (
                    <li key={name} className="text-yellow-300 text-sm">
                      • {name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowScrolls(!showScrolls)}
                className="flex items-center gap-2 text-2xl font-bold text-white hover:text-purple-400 transition-colors"
              >
                <Scroll size={28} />
                Acquired Scrolls ({acquiredScrolls.length})
                {showScrolls ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              <button
                onClick={() => setShowScrollModal(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
              >
                Add Scroll
              </button>
            </div>

            {showScrolls && (
              <div className="space-y-3">
                {acquiredScrolls.length === 0 ? (
                  <div className="bg-slate-800 rounded-lg p-6 text-center">
                    <p className="text-slate-400">No scrolls acquired yet</p>
                  </div>
                ) : (
                  acquiredScrolls.map((item) => (
                    <div
                      key={item.scroll.id}
                      className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">
                            {item.scroll.name}
                          </h4>
                          <p className="text-sm text-slate-400 mb-2">
                            {item.scroll.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.scroll.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300"
                              >
                                {tag.replace(/_/g, " ")}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => removeScroll(item.scroll.id)}
                          className="text-slate-400 hover:text-red-400 transition-colors ml-4"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowAscensions(!showAscensions)}
                className="flex items-center gap-2 text-2xl font-bold text-white hover:text-purple-400 transition-colors"
              >
                <Shield size={28} />
                Ascensions ({acquiredAscensions.length})
                {showAscensions ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              <button
                onClick={() => setShowAscensionModal(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
              >
                Add Ascension
              </button>
            </div>

            {showAscensions && (
              <div className="space-y-3">
                {acquiredAscensions.length === 0 ? (
                  <div className="bg-slate-800 rounded-lg p-6 text-center">
                    <p className="text-slate-400">No ascensions acquired yet</p>
                  </div>
                ) : (
                  acquiredAscensions.map((item: AcquiredAscension) => {
                    const currentLevelData = item.ascension.levels.find(
                      (l) => l.level === item.currentLevel
                    );

                    return (
                      <div
                        key={item.ascension.id}
                        className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-white">
                                {item.ascension.name}
                              </h4>
                              <span className="px-2 py-0.5 bg-purple-600 rounded text-xs font-medium text-white">
                                Lv {item.currentLevel}
                              </span>
                            </div>
                            {currentLevelData && (
                              <p className="text-sm text-slate-400 mb-2">
                                {currentLevelData.effect}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-1">
                              {item.ascension.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300"
                                >
                                  {tag.replace(/_/g, " ")}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => removeAscension(item.ascension.id)}
                            className="text-slate-400 hover:text-red-400 transition-colors ml-4"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showAscensionModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">
                Select Ascension
              </h2>
              <button
                onClick={() => {
                  setShowAscensionModal(false);
                  setSelectedCategory(null);
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {!selectedCategory ? (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categories.map((category) => {
                    const categoryAscensions = currentHero.ascensions.filter(
                      (a) => a.category === category
                    );
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className="bg-slate-700 hover:bg-slate-600 rounded-lg p-6 text-left transition-colors border-2 border-slate-600 hover:border-purple-500"
                      >
                        <h3 className="text-xl font-bold text-white mb-2 capitalize">
                          {category}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          {categoryAscensions.length} ascensions
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mb-4 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  ← Back to categories
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentHero.ascensions
                    .filter((a) => a.category === selectedCategory)
                    .map((ascension) => {
                      const acquired = acquiredAscensions.find(
                        (a) => a.ascension.id === ascension.id
                      );
                      const currentLevel = acquired?.currentLevel || 0;
                      const maxLevel = ascension.levels.length;
                      const isMaxed = currentLevel >= maxLevel;

                      return (
                        <div
                          key={ascension.id}
                          className={`bg-slate-700 rounded-lg p-4 border-2 ${
                            isMaxed
                              ? "border-green-500 opacity-75"
                              : "border-slate-600 hover:border-slate-500"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-white">
                              {ascension.name}
                            </h3>
                            {acquired && (
                              <span className="px-2 py-0.5 bg-purple-600 rounded text-xs font-medium text-white">
                                Lv {currentLevel}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-300 mb-3">
                            {ascension.description}
                          </p>
                          <div className="space-y-2 mb-3">
                            {ascension.levels.map((lvl) => (
                              <div
                                key={lvl.level}
                                className={`text-xs p-2 rounded ${
                                  currentLevel >= lvl.level
                                    ? "bg-purple-900/50 text-purple-300"
                                    : "bg-slate-800 text-slate-400"
                                }`}
                              >
                                <span className="font-medium">
                                  Lv {lvl.level}:
                                </span>{" "}
                                {lvl.effect}
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => handleAddAscension(ascension)}
                            disabled={isMaxed}
                            className={`w-full py-2 rounded-lg font-medium transition-colors ${
                              isMaxed
                                ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-700 text-white"
                            }`}
                          >
                            {isMaxed
                              ? "Maxed"
                              : acquired
                              ? `Upgrade to Lv ${currentLevel + 1}`
                              : "Add Ascension"}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <ScrollSelectionModal
        isOpen={showScrollModal}
        onClose={() => setShowScrollModal(false)}
      />
    </div>
  );
}
