
import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={onLogoClick} className="flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
            <i className="fas fa-city text-white"></i>
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">DFWRealtor.ai</span>
        </button>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Markets</a>
          <a href="#" className="text-slate-600 hover:text-blue-600 text-sm font-medium">Resources</a>
          <a href="#" className="text-slate-600 hover:text-blue-600 text-sm font-medium">For Agents</a>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="mailto:ekambar@gmail.com" className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all">
            Contact Agent
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
