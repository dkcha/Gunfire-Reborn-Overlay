import { useState } from "react";
import { X, Search, Target } from "lucide-react";
import type { Scroll, ScrollRarity } from "../types";
import { allScrolls } from "../data";
import { useRunStore } from "../stores/runStore";
import { getWikiBuildById } from "../data/wikiBuildTemplates";

interface ScrollSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScrollSelectionModal({
  isOpen,
  onClose,
}: ScrollSelectionModalProps) {
  const [selectedRarity, setSelectedRarity] = useState<ScrollRarity | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { addScroll, acquiredScrolls, selectedTemplate } = useRunStore();

  if (!isOpen) return null;

  const acquiredScrollIds = acquiredScrolls.map((s) => s.scroll.id);

  const template = selectedTemplate ? getWikiBuildById(selectedTemplate) : null;
  const coreScrollIds = template?.coreScrolls || [];

  const filteredScrolls = allScrolls.filter((scroll) => {
    if (acquiredScrollIds.includes(scroll.id)) return false;

    if (selectedRarity !== "all" && scroll.rarity !== selectedRarity)
      return false;

    if (
      searchQuery &&
      !scroll.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleAddScroll = (scroll: Scroll) => {
    addScroll(scroll);
  };

  const getRarityColor = (rarity: ScrollRarity): string => {
    switch (rarity) {
      case "normal":
        return "bg-gray-500";
      case "rare":
        return "bg-blue-500";
      case "legendary":
        return "bg-purple-500";
      case "cursed":
        return "bg-red-500";
    }
  };

  const getTagColor = (tag: string): string => {
    if (tag.includes("fire"))
      return "bg-orange-600/20 text-orange-400 border-orange-500/30";
    if (tag.includes("lightning"))
      return "bg-blue-600/20 text-blue-400 border-blue-500/30";
    if (tag.includes("corrosion"))
      return "bg-green-600/20 text-green-400 border-green-500/30";
    if (tag.includes("critical"))
      return "bg-red-600/20 text-red-400 border-red-500/30";
    return "bg-slate-600/20 text-slate-400 border-slate-500/30";
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Select Scroll</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 border-b border-slate-700 space-y-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search scrolls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex gap-2">
            {(["all", "normal", "rare", "legendary", "cursed"] as const).map(
              (rarity) => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedRarity === rarity
                      ? "bg-purple-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScrolls.map((scroll) => {
              const isCoreItem = coreScrollIds.includes(scroll.id);

              return (
                <div
                  key={scroll.id}
                  className={`bg-slate-700 rounded-lg p-4 border-2 transition-all ${
                    isCoreItem
                      ? "border-purple-500 shadow-lg shadow-purple-500/20"
                      : "border-slate-600 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {isCoreItem && (
                          <Target size={16} className="text-purple-400" />
                        )}
                        <h3 className="font-semibold text-white">
                          {scroll.name}
                        </h3>
                      </div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium text-white ${getRarityColor(
                          scroll.rarity
                        )}`}
                      >
                        {scroll.rarity}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mb-3 line-clamp-3">
                    {scroll.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {scroll.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded text-xs border ${getTagColor(
                          tag
                        )}`}
                      >
                        {tag.replace(/_/g, " ")}
                      </span>
                    ))}
                    {scroll.tags.length > 4 && (
                      <span className="px-2 py-0.5 rounded text-xs bg-slate-600/20 text-slate-400 border border-slate-500/30">
                        +{scroll.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddScroll(scroll)}
                    className={`w-full py-2 rounded-lg font-medium transition-colors ${
                      isCoreItem
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-slate-600 hover:bg-slate-500 text-white"
                    }`}
                  >
                    {isCoreItem ? "Add Core Item" : "Add Scroll"}
                  </button>
                </div>
              );
            })}
          </div>

          {filteredScrolls.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No scrolls found</p>
              <p className="text-slate-500 text-sm mt-2">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              {filteredScrolls.length} scrolls available
            </span>
            {template && (
              <div className="flex items-center gap-2 text-purple-400">
                <Target size={16} />
                <span>Core items highlighted</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
