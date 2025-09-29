import React from 'react';
import gameData from '../data';

/**
 * Test component to verify data is loading correctly
 * Replace App.tsx content with this temporarily to test
 */

const DataTest: React.FC = () => {
  const { heroes, scrolls, buildArchetypes, stats } = gameData;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Gunfire Reborn Data Test
        </h1>

        {/* Statistics */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-3xl font-bold text-blue-400">{stats.totalHeroes}</div>
              <div className="text-sm text-gray-400">Heroes</div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-3xl font-bold text-green-400">{stats.totalScrolls}</div>
              <div className="text-sm text-gray-400">Total Scrolls</div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-3xl font-bold text-cyan-400">{stats.normalScrolls}</div>
              <div className="text-sm text-gray-400">Normal</div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-3xl font-bold text-purple-400">{stats.rareScrolls}</div>
              <div className="text-sm text-gray-400">Rare</div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-3xl font-bold text-orange-400">{stats.legendaryScrolls}</div>
              <div className="text-sm text-gray-400">Legendary</div>
            </div>
            <div className="bg-gray-700 p-4 rounded">
              <div className="text-3xl font-bold text-yellow-400">{stats.totalArchetypes}</div>
              <div className="text-sm text-gray-400">Build Archetypes</div>
            </div>
          </div>
        </div>

        {/* Heroes */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Heroes ({heroes.length})</h2>
          <div className="space-y-4">
            {heroes.map(hero => (
              <div key={hero.id} className="bg-gray-700 p-4 rounded">
                <h3 className="text-xl font-bold text-blue-400">{hero.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{hero.description}</p>
                <div className="flex gap-2 mb-2">
                  <span className="text-xs bg-green-900 text-green-200 px-2 py-1 rounded">
                    {hero.primarySkill.name}
                  </span>
                  <span className="text-xs bg-purple-900 text-purple-200 px-2 py-1 rounded">
                    {hero.secondarySkill.name}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  {hero.ascensions.length} Ascensions
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Scrolls by Rarity */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sample Scrolls</h2>
          
          {/* Normal */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Normal (First 3)</h3>
            <div className="space-y-2">
              {scrolls.filter(s => s.rarity === 'normal').slice(0, 3).map(scroll => (
                <div key={scroll.id} className="bg-gray-700 p-3 rounded border-l-4 border-cyan-500">
                  <div className="font-bold">{scroll.name}</div>
                  <div className="text-sm text-gray-300">{scroll.effect}</div>
                  <div className="flex gap-1 mt-1">
                    {scroll.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-600 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rare */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Rare (First 3)</h3>
            <div className="space-y-2">
              {scrolls.filter(s => s.rarity === 'rare').slice(0, 3).map(scroll => (
                <div key={scroll.id} className="bg-gray-700 p-3 rounded border-l-4 border-purple-500">
                  <div className="font-bold">{scroll.name}</div>
                  <div className="text-sm text-gray-300">{scroll.effect}</div>
                  <div className="flex gap-1 mt-1">
                    {scroll.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-600 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legendary */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-orange-400 mb-2">Legendary (First 3)</h3>
            <div className="space-y-2">
              {scrolls.filter(s => s.rarity === 'legendary').slice(0, 3).map(scroll => (
                <div key={scroll.id} className="bg-gray-700 p-3 rounded border-l-4 border-orange-500">
                  <div className="font-bold">{scroll.name}</div>
                  <div className="text-sm text-gray-300">{scroll.effect}</div>
                  <div className="flex gap-1 mt-1">
                    {scroll.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-600 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Build Archetypes */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Build Archetypes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buildArchetypes.map(archetype => (
              <div key={archetype.id} className="bg-gray-700 p-4 rounded">
                <h3 className="text-lg font-bold text-yellow-400">{archetype.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{archetype.description}</p>
                <div className="text-xs text-gray-400">
                  <div>Core Tags: {archetype.coreTags.join(', ')}</div>
                  <div>Synergy: {archetype.synergyMultiplier}x</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Synergy Test */}
        <div className="bg-gray-800 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Synergy Test</h2>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm mb-2">
              Testing synergy between "Advanced Depot" and "Merciless Combo":
            </p>
            <div className="text-green-400 font-bold">
              {gameData.checkSynergy(
                gameData.getScrollById('scroll_advanced_depot'),
                gameData.getScrollById('scroll_merciless_combo')
              ) ? '✓ Synergy Detected!' : '✗ No Synergy'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTest;