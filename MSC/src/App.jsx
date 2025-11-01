import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import UseCasesPage from './pages/UseCasesPage';
import DatasetPage from './pages/DatasetPage';
import DemoPage from './pages/DemoPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'use-cases':
        return <UseCasesPage />;
      case 'dataset':
        return <DatasetPage />;
      case 'demo':
        return <DemoPage />;
      
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default App;