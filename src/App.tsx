// src/App.tsx - UPDATED WITH TEMPLATE FLOW

import { useRunStore } from "./stores/runStore";
import HeroSelection from "./components/HeroSelection";
import RunTracker from "./components/RunTracker";

function App() {
  const { currentHero } = useRunStore();

  // Show hero selection until hero is chosen
  if (!currentHero) {
    return <HeroSelection />;
  }

  // After hero + template selected, show run tracker
  return <RunTracker />;
}

export default App;
