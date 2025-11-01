import React from 'react';
import { Volume2 } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = ['Home', 'How It Works', 'Use Cases', 'Dataset', 'Demo'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Volume2 className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">ALM</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase().replace(' ', '-'))}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.toLowerCase().replace(' ', '-')
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;