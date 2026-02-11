
import React from 'react';

interface ScoreCardProps {
  label: string;
  value: string;
  trend?: string;
  icon?: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ label, value, trend, icon }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center text-slate-500 text-sm font-medium mb-1">
        {icon && <i className={`fas ${icon} mr-2 opacity-50`}></i>}
        <span>{label}</span>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {trend && (
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
