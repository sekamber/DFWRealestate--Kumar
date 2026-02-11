
import React from 'react';
import { PropertyListing } from '../types';

interface PropertyGridProps {
  properties: PropertyListing[];
  onViewDetails: (p: PropertyListing) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((prop, idx) => (
        <div 
          key={idx} 
          className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer overflow-hidden"
          onClick={() => onViewDetails(prop)}
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={prop.imageUrl} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              alt={prop.address} 
            />
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-sm font-black text-blue-600">
              {prop.price}
            </div>
            {prop.score >= 9 && (
              <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-lg">
                High Match
              </div>
            )}
          </div>
          <div className="p-5">
            <h4 className="font-bold text-slate-900 mb-1 truncate">{prop.address}</h4>
            <div className="flex space-x-4 text-xs font-medium text-slate-500 mb-4">
              <span className="flex items-center"><i className="fas fa-bed mr-1.5 opacity-60"></i>{prop.beds} Beds</span>
              <span className="flex items-center"><i className="fas fa-bath mr-1.5 opacity-60"></i>{prop.baths} Baths</span>
              <span className="flex items-center"><i className="fas fa-ruler-combined mr-1.5 opacity-60"></i>{prop.sqft} sqft</span>
            </div>
            <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed h-10">
              {prop.description}
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-blue-600 font-bold text-sm">View Details</span>
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i className="fas fa-chevron-right text-xs"></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;
