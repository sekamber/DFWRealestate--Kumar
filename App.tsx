
import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import MarketReport from './components/MarketReport';
import LoadingOverlay from './components/LoadingOverlay';
import { UserFormData, MarketAnalysisResponse } from './types';
import { generateMarketReport } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<MarketAnalysisResponse | null>(null);
  const [lastSearch, setLastSearch] = useState<UserFormData | null>(null);

  const handleSearch = async (formData: UserFormData) => {
    setLoading(true);
    setLastSearch(formData);
    try {
      const result = await generateMarketReport(formData);
      setReport(result);
    } catch (error) {
      alert("Failed to generate market report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setReport(null);
    setLastSearch(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLogoClick={resetSearch} />
      
      <main className="flex-grow">
        {!report ? (
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-24">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Dallas Real Estate <span className="text-blue-600">Market Intelligence</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                Enter any DFW zip code, neighborhood, or landmark to get a comprehensive property analysis report powered by Gemini AI.
              </p>
            </div>
            
            <SearchForm onSearch={handleSearch} />
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-xl"></i>
                </div>
                <h3 className="font-bold text-lg mb-2">Real-Time Trends</h3>
                <p className="text-slate-500 text-sm">Latest median prices and inventory shifts across DFW metroplex.</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-calculator text-xl"></i>
                </div>
                <h3 className="font-bold text-lg mb-2">Investor Analysis</h3>
                <p className="text-slate-500 text-sm">Cap rates, rent estimates, and cash flow projections in seconds.</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-school text-xl"></i>
                </div>
                <h3 className="font-bold text-lg mb-2">Hyper-Local Data</h3>
                <p className="text-slate-500 text-sm">School ratings, crime indices, and commute heatmaps for every zip.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <button 
              onClick={resetSearch}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i> New Search
            </button>
            <MarketReport report={report} formData={lastSearch!} />
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <i className="fas fa-city text-blue-400 text-2xl mr-2"></i>
            <span className="font-bold text-xl tracking-tight">DFWRealtor.ai</span>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Helping Dallas-Fort Worth residents make smarter real estate decisions through AI.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:ekambar@gmail.com" className="hover:text-blue-400"><i className="fas fa-envelope"></i></a>
            <a href="#" className="hover:text-blue-400"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-slate-500 text-xs">
            &copy; 2024 DFWRealtor.ai. All rights reserved. Not financial advice.
          </div>
        </div>
      </footer>

      {loading && <LoadingOverlay />}
    </div>
  );
};

export default App;
