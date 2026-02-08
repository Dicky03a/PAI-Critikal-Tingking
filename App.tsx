
import React, { useState, useEffect } from 'react';
import { Screen, UserActivity } from './types';
import Dashboard from './components/Dashboard';
import Guide from './components/Guide';
import Competency from './components/Competency';
import Definition from './components/Definition';
import Analysis from './components/Analysis';
import Design from './components/Design';
import Implementation from './components/Implementation';
import Evaluation from './components/Evaluation';
import Success from './components/Success';
import { saveActivity } from './supabase';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('DASHBOARD');
  const [activityData, setActivityData] = useState<UserActivity>({});
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const handleSaveStep = async (step: keyof UserActivity, data: any, nextScreen: Screen) => {
    setIsLoading(true);
    setActivityData(prev => ({ ...prev, [step]: data }));
    
    // Persist to Supabase
    await saveActivity(step, data);
    
    setIsLoading(false);
    navigateTo(nextScreen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'DASHBOARD':
        return <Dashboard onStart={() => navigateTo('GUIDE')} onMenu={(s) => navigateTo(s)} />;
      case 'GUIDE':
        return <Guide onNext={() => navigateTo('COMPETENCY')} onBack={() => navigateTo('DASHBOARD')} />;
      case 'COMPETENCY':
        return <Competency onNext={() => navigateTo('DEFINITION')} onBack={() => navigateTo('GUIDE')} />;
      case 'DEFINITION':
        return <Definition onNext={() => navigateTo('ANALYSIS')} onBack={() => navigateTo('COMPETENCY')} />;
      case 'ANALYSIS':
        return (
          <Analysis 
            onNext={(data) => handleSaveStep('analysis', data, 'DESIGN')} 
            onBack={() => navigateTo('DEFINITION')} 
            loading={isLoading}
          />
        );
      case 'DESIGN':
        return (
          <Design 
            onNext={(data) => handleSaveStep('design', data, 'IMPLEMENTATION')} 
            onBack={() => navigateTo('ANALYSIS')}
            loading={isLoading}
          />
        );
      case 'IMPLEMENTATION':
        return (
          <Implementation 
            onNext={(data) => handleSaveStep('implementation', data, 'EVALUATION')} 
            onBack={() => navigateTo('DESIGN')}
            loading={isLoading}
          />
        );
      case 'EVALUATION':
        return (
          <Evaluation 
            onNext={(data) => handleSaveStep('evaluation', data, 'SUCCESS')} 
            onBack={() => navigateTo('IMPLEMENTATION')}
            loading={isLoading}
          />
        );
      case 'SUCCESS':
        return <Success onDashboard={() => navigateTo('DASHBOARD')} />;
      default:
        return <Dashboard onStart={() => navigateTo('GUIDE')} onMenu={(s) => navigateTo(s)} />;
    }
  };

  return (
    <div className="max-w-[430px] mx-auto min-h-screen shadow-2xl bg-white dark:bg-background-dark overflow-x-hidden relative">
      {renderScreen()}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-primary">Menyimpan Aktivitas...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
