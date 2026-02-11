
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Aggregating latest DFW sales data...",
  "Pulling school district ratings...",
  "Calculating neighborhood appreciation rates...",
  "Scanning current MLS listings...",
  "Estimating potential rental cash flow...",
  "Analyzing local commute heatmaps...",
  "Generating your professional market report..."
];

const LoadingOverlay: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50/90 backdrop-blur-md">
      <div className="text-center max-w-sm px-4">
        <div className="relative inline-block mb-8">
          <div className="w-20 h-20 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-city text-blue-600 text-xl animate-pulse"></i>
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Analyzing the Market</h2>
        <p className="text-slate-500 font-medium h-12 flex items-center justify-center">
          {MESSAGES[msgIdx]}
        </p>
        <div className="mt-12 w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full animate-[loading_10s_ease-in-out_infinite]"></div>
        </div>
        <style>{`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingOverlay;
