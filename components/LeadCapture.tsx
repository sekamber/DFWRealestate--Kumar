
import React from 'react';

const LeadCapture: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <i className="fas fa-home text-9xl"></i>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-4 leading-tight">Ready to take the next step in Dallas?</h3>
        <p className="text-blue-100 text-sm mb-8 leading-relaxed">
          Would you like personalized properties or custom mortgage scenarios for this specific area?
        </p>
        
        <div className="space-y-3">
          <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center">
            <i className="fas fa-calendar-alt mr-2"></i> Book Market Strategy Call
          </button>
          <a 
            href="mailto:ekambar@gmail.com" 
            className="w-full bg-blue-500/30 text-white border border-white/20 py-3 rounded-xl font-bold hover:bg-blue-500/40 transition-all flex items-center justify-center"
          >
            <i className="fas fa-envelope mr-2"></i> Email ekambar@gmail.com
          </a>
        </div>
        
        <p className="mt-6 text-[10px] text-blue-200 uppercase tracking-widest text-center font-bold opacity-60">
          Professional Realty Services • DFW Expert
        </p>
      </div>
    </div>
  );
};

export default LeadCapture;
