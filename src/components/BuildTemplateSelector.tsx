import type { WikiBuildTemplate } from '../data/wikiBuildTemplates';
import { getWikiBuildsByHero } from '../data';
import { useRunStore } from '../stores/runStore';
import { X, Target, TrendingUp, AlertCircle } from 'lucide-react';

interface BuildTemplateSelectorProps {
  heroId: string;
  onClose: () => void;
}

export default function BuildTemplateSelector({ heroId, onClose }: BuildTemplateSelectorProps) {
  const { selectedTemplate, selectTemplate } = useRunStore();
  const templates = getWikiBuildsByHero(heroId);

  const handleSelectTemplate = (templateId: string) => {
    if (selectedTemplate === templateId) {
      selectTemplate(null); // Deselect if clicking same template
    } else {
      selectTemplate(templateId);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10 border-green-400';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400';
      case 'hard': return 'text-red-400 bg-red-400/10 border-red-400';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Select Build Template
            </h2>
            <p className="text-slate-400 text-sm">
              Choose a proven build from the community, or skip to freestyle
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          {templates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">
                No wiki builds available for this hero yet.
              </p>
              <button
                onClick={() => {
                  selectTemplate(null);
                  onClose();
                }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Continue Without Template
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleSelectTemplate(template.id)}
                    className={`p-5 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {template.name}
                        </h3>
                        <div className="flex gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold border ${getDifficultyColor(template.difficulty_rating)}`}>
                            {template.difficulty_rating.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 bg-slate-600 rounded text-xs text-slate-300">
                            {template.difficulty}
                          </span>
                        </div>
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-slate-300 mb-4">
                      {template.description}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
                          Playstyle
                        </div>
                        <p className="text-xs text-slate-400">
                          {template.playstyle}
                        </p>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-slate-400 uppercase mb-1 flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          Core Items ({template.coreScrolls.length + template.coreAscensions.length})
                        </div>
                        <p className="text-xs text-slate-500">
                          Must-have items for this build
                        </p>
                      </div>

                      <div>
                        <div className="text-xs font-semibold text-green-400 uppercase mb-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Strengths
                        </div>
                        <ul className="text-xs text-slate-400 space-y-1">
                          {template.keyStrengths.slice(0, 2).map((strength, i) => (
                            <li key={i}>• {strength}</li>
                          ))}
                        </ul>
                      </div>

                      {template.keyWeaknesses.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold text-red-400 uppercase mb-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Weaknesses
                          </div>
                          <ul className="text-xs text-slate-400 space-y-1">
                            {template.keyWeaknesses.slice(0, 2).map((weakness, i) => (
                              <li key={i}>• {weakness}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                <div className="flex items-start gap-3">
                  <div className="text-blue-400 mt-1">ℹ️</div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 mb-2">
                      <strong>How templates work:</strong>
                    </p>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• Core items will be marked as MUST TAKE</li>
                      <li>• Recommended items get priority in suggestions</li>
                      <li>• Other synergistic items will still be suggested</li>
                      <li>• You can skip the template for freestyle mode</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-slate-700 flex gap-3">
          <button
            onClick={() => {
              selectTemplate(null);
              onClose();
            }}
            className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Skip Template (Freestyle)
          </button>
          {selectedTemplate && (
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-lg transition-all"
            >
              Confirm Selection
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
