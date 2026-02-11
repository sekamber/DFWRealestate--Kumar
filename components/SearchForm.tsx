
import React, { useState } from 'react';
import { UserFormData, PropertyType, ReportPurpose } from '../types';

interface SearchFormProps {
  onSearch: (data: UserFormData) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [formData, setFormData] = useState<UserFormData>({
    location: '',
    propertyType: PropertyType.SFH,
    budget: '',
    purpose: ReportPurpose.BUY,
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.email) {
      alert("Please fill in at least location and email.");
      return;
    }
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Zip Code, Neighborhood, or Landmark</label>
          <div className="relative">
            <i className="fas fa-map-marker-alt absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text"
              placeholder="e.g. 75201, Frisco, AT&T Stadium..."
              className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Property Type</label>
          <select 
            className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none bg-white"
            value={formData.propertyType}
            onChange={(e) => setFormData({...formData, propertyType: e.target.value as PropertyType})}
          >
            {Object.values(PropertyType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Your Goal</label>
          <select 
            className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none bg-white"
            value={formData.purpose}
            onChange={(e) => setFormData({...formData, purpose: e.target.value as ReportPurpose})}
          >
            {Object.values(ReportPurpose).map(purpose => (
              <option key={purpose} value={purpose}>{purpose}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Budget Range</label>
          <input 
            type="text"
            placeholder="e.g. $400k - $600k"
            className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email for Detailed PDF</label>
          <input 
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
      </div>

      <button 
        type="submit"
        className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center space-x-2"
      >
        <span>Analyze Market</span>
        <i className="fas fa-search"></i>
      </button>
      
      <p className="mt-4 text-center text-xs text-slate-400 uppercase tracking-widest font-semibold">
        Instant AI Analysis • Local DFW Data • No Login Required
      </p>
    </form>
  );
};

export default SearchForm;
