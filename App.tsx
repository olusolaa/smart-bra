import React, { useState } from 'react';
import { ViewState } from './types';
import { TopBar, BottomNav } from './components/Layout';
import { Onboarding } from './views/Onboarding';
import { Home } from './views/Home';
import { Scan } from './views/Scan';
import { History } from './views/History';
import { Experts, Community } from './views/Care';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.ONBOARDING);

  // Helper to render current view
  const renderView = () => {
    switch (view) {
      case ViewState.ONBOARDING:
        return <Onboarding onComplete={() => setView(ViewState.DASHBOARD)} />;
      case ViewState.DASHBOARD:
        return <Home onChangeView={setView} />;
      case ViewState.SCAN:
        return <Scan />;
      case ViewState.HISTORY:
        return <History />;
      case ViewState.EXPERTS:
        return <Experts />;
      case ViewState.COMMUNITY:
        return <Community />;
      default:
        return <Home onChangeView={setView} />;
    }
  };

  const getTitle = () => {
    switch (view) {
      case ViewState.DASHBOARD: return 'Dashboard';
      case ViewState.SCAN: return 'Sensor Scan';
      case ViewState.HISTORY: return 'Analysis';
      case ViewState.EXPERTS: return 'Consultation';
      case ViewState.COMMUNITY: return 'Community';
      default: return '';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen relative max-w-md mx-auto shadow-2xl overflow-hidden flex flex-col">
      {/* Hide TopBar on Onboarding */}
      {view !== ViewState.ONBOARDING && (
        <TopBar 
          title={getTitle()} 
          showBack={view !== ViewState.DASHBOARD} 
          onBack={() => setView(ViewState.DASHBOARD)} 
        />
      )}

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto no-scrollbar bg-white">
        {renderView()}
      </main>

      {/* Hide BottomNav on Onboarding */}
      {view !== ViewState.ONBOARDING && (
        <BottomNav currentView={view} onChangeView={setView} />
      )}
    </div>
  );
};

export default App;