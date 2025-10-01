import React, { useState } from 'react';
import { useRunStore } from '../stores/runStore';
import { generateRecommendations } from '../utils/recommendationEngine';
import { sampleWeapons, geminiInscriptions } from '../data/geminiInscriptions';
import { allScrolls } from '../data';
import { Flame, Zap, Droplet, Target, TrendingUp, Shield } from 'lucide-react';

export default function RecommendationTest() {
  const { 
    weapons, 
    setPrimaryWeapon, 
    setSecondaryWeapon,
    acquiredScrolls,
    addScroll,
    removeScroll,
  } = useRunStore();

  const [testScrolls, setTestScrolls] = useState([
    allScrolls.find(s => s.id === 'scroll_advanced_depot'),
    allScrolls.find(s => s.id === 'scroll_against_the_flow'),
    allScrolls.find(s => s.id === 'scroll_merciless_combo'),
  ].filter(Boolean));

  const recommendations = generateRecommendations(
    testScrolls.filter(s => !acquiredScrolls.find(a => a.scroll.id === s?.id)),
    useRunStore.getState()
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400';
      case 'A': return 'text-green-400 bg-green-400/10 border-green-400';
      case 'B': return 'text-blue-400 bg-blue-400/10 border-blue-400';
      case 'C': return 'text-gray-400 bg-gray-400/10 border-gray-400';
      case 'D': return 'text-red-400 bg-red-400/10 border-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Recommendation Engine Test
          </h1>
          <p className="text-slate-400">
            Test the Gemini-aware recommendation system
          </p>
        </div>

        {/* Weapon Selection */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">1. Select Weapons</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Primary Weapon */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Primary Weapon
              </label>
              <select
                value={weapons.primary?.id || ''}
                onChange={(e) => {
                  const weapon = sampleWeapons.find(w => w.id === e.target.value);
                  setPrimaryWeapon(weapon || null);
                }}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
              >
                <option value="">None</option>
                {sampleWeapons.map(weapon => (
                  <option key={weapon.id} value={weapon.id}>
                    {weapon.name} ({weapon.type})
                  </option>
                ))}
              </select>
              {weapons.primary && (
                <div className="mt-2 p-3 bg-slate-700/50 rounded-lg text-sm">
                  <p className="text-slate-300">{weapons.primary.description}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-slate-600 rounded text-xs text-slate-300">
                      Mag: {weapons.primary.baseStats.magazine}
                    </span>
                    <span className="px-2 py-1 bg-slate-600 rounded text-xs text-slate-300">
                      CritX: {weapons.primary.baseStats.critX}x
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Weapon */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Secondary Weapon
              </label>
              <select
                value={weapons.secondary?.id || ''}
                onChange={(e) => {
                  const weapon = sampleWeapons.find(w => w.id === e.target.value);
                  setSecondaryWeapon(weapon || null);
                }}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
              >
                <option value="">None</option>
                {sampleWeapons.map(weapon => (
                  <option key={weapon.id} value={weapon.id}>
                    {weapon.name} ({weapon.type})
                  </option>
                ))}
              </select>
              {weapons.secondary && (
                <div className="mt-2 p-3 bg-slate-700/50 rounded-lg text-sm">
                  <p className="text-slate-300">{weapons.secondary.description}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-slate-600 rounded text-xs text-slate-300">
                      Mag: {weapons.secondary.baseStats.magazine}
                    </span>
                    <span className="px-2 py-1 bg-slate-600 rounded text-xs text-slate-300">
                      CritX: {weapons.secondary.baseStats.critX}x
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Gemini Status */}
          {weapons.primary && weapons.secondary && (
            <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              {weapons.primary.geminiInscription === weapons.secondary.geminiInscription && weapons.primary.geminiInscription ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                    <span className="text-yellow-400 font-bold">GEMINI ACTIVE</span>
                  </div>
                  <p className="text-white font-semibold">
                    {geminiInscriptions[weapons.primary.geminiInscription].name}
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    {geminiInscriptions[weapons.primary.geminiInscription].effect}
                  </p>
                </div>
              ) : (
                <div className="text-slate-400">
                  <span className="text-slate-500">No matching Gemini inscriptions</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Current Build */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">2. Current Build</h2>
          {acquiredScrolls.length === 0 ? (
            <p className="text-slate-400">No scrolls acquired yet</p>
          ) : (
            <div className="space-y-2">
              {acquiredScrolls.map(({ scroll }) => (
                <div 
                  key={scroll.id}
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                >
                  <div>
                    <span className="text-white font-medium">{scroll.name}</span>
                    <div className="flex gap-1 mt-1">
                      {scroll.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 bg-slate-600 rounded text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => removeScroll(scroll.id)}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">3. Recommendations</h2>
          
          {recommendations.length === 0 ? (
            <p className="text-slate-400">All test scrolls have been acquired!</p>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec, index) => {
                const scroll = rec.item;
                
                return (
                  <div
                    key={scroll.id}
                    className={`p-4 rounded-xl border-2 ${getTierColor(rec.tier)} transition-all hover:scale-[1.02]`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`text-2xl font-bold ${getTierColor(rec.tier).split(' ')[0]}`}>
                            #{index + 1}
                          </span>
                          <h3 className="text-xl font-bold text-white">
                            {scroll.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getTierColor(rec.tier)}`}>
                            {rec.tier} TIER
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm">{scroll.effect}</p>
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                      <div className="p-2 bg-slate-900/50 rounded">
                        <div className="text-xs text-slate-400">Total Score</div>
                        <div className="text-lg font-bold text-white">
                          {Math.round(rec.score)}
                        </div>
                      </div>
                      <div className="p-2 bg-slate-900/50 rounded">
                        <div className="text-xs text-slate-400">Gemini Bonus</div>
                        <div className="text-lg font-bold text-yellow-400">
                          {rec.synergyBreakdown.geminiBonus > 0 ? '+' : ''}{(rec.synergyBreakdown.geminiBonus * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div className="p-2 bg-slate-900/50 rounded">
                        <div className="text-xs text-slate-400">Synergies</div>
                        <div className="text-lg font-bold text-green-400">
                          {rec.synergyBreakdown.directSynergies + rec.synergyBreakdown.tagOverlap}
                        </div>
                      </div>
                      <div className="p-2 bg-slate-900/50 rounded">
                        <div className="text-xs text-slate-400">Weapon Fit</div>
                        <div className="text-lg font-bold text-blue-400">
                          {rec.synergyBreakdown.weaponFit.toFixed(2)}x
                        </div>
                      </div>
                    </div>

                    {/* Reasoning */}
                    <div className="space-y-1 mb-3">
                      {rec.reasoning.map((reason, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          {reason.includes('⭐') && <span className="text-yellow-400">⭐</span>}
                          {reason.includes('✓') && <span className="text-green-400">✓</span>}
                          {reason.includes('⚠') && <span className="text-red-400">⚠</span>}
                          <span className="text-slate-300">{reason.replace(/[⭐✓⚠]/g, '')}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {scroll.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={() => addScroll(scroll)}
                      className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all"
                    >
                      Add to Build
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Test Scenarios */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Test Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Scenario 1: Magazine Share */}
            <button
              onClick={() => {
                const rainbow = sampleWeapons.find(w => w.id === 'weapon_rainbow');
                const pupil = sampleWeapons.find(w => w.id === 'weapon_pupil');
                if (rainbow && pupil) {
                  // Add Magazine Share Gemini to both
                  setPrimaryWeapon({ ...rainbow, geminiInscription: 'magazine_share' });
                  setSecondaryWeapon({ ...pupil, geminiInscription: 'magazine_share' });
                }
              }}
              className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl hover:scale-105 transition-transform"
            >
              <div className="text-yellow-400 font-bold mb-2">Magazine Share Build</div>
              <div className="text-sm text-slate-300">
                Rainbow + Pupil with Magazine Share Gemini
              </div>
            </button>

            {/* Scenario 2: Element Share */}
            <button
              onClick={() => {
                const fireDragon = sampleWeapons.find(w => w.id === 'weapon_fire_dragon');
                const lightningBlast = sampleWeapons.find(w => w.id === 'weapon_lightning_blast');
                if (fireDragon && lightningBlast) {
                  setPrimaryWeapon({ ...fireDragon, geminiInscription: 'element_share' });
                  setSecondaryWeapon({ ...lightningBlast, geminiInscription: 'element_share' });
                }
              }}
              className="p-4 bg-gradient-to-br from-red-500/20 to-blue-500/20 border-2 border-purple-500/50 rounded-xl hover:scale-105 transition-transform"
            >
              <div className="text-purple-400 font-bold mb-2">Element Share Build</div>
              <div className="text-sm text-slate-300">
                Fire Dragon + Lightning Blast with Element Share
              </div>
            </button>

            {/* Scenario 3: CritX Share */}
            <button
              onClick={() => {
                const goshawk = sampleWeapons.find(w => w.id === 'weapon_goshawk');
                const woodpecker = sampleWeapons.find(w => w.id === 'weapon_woodpecker');
                if (goshawk && woodpecker) {
                  setPrimaryWeapon({ ...goshawk, geminiInscription: 'critx_share' });
                  setSecondaryWeapon({ ...woodpecker, geminiInscription: 'critx_share' });
                }
              }}
              className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl hover:scale-105 transition-transform"
            >
              <div className="text-green-400 font-bold mb-2">CritX Share Build</div>
              <div className="text-sm text-slate-300">
                Goshawk + Woodpecker with CritX Share
              </div>
            </button>
          </div>
        </div>

        {/* Debug Info */}
        <details className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <summary className="text-xl font-bold text-white cursor-pointer">
            Debug Info
          </summary>
          <pre className="mt-4 p-4 bg-slate-900 rounded text-xs text-slate-300 overflow-auto">
            {JSON.stringify(useRunStore.getState(), null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}