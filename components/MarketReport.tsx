
import React, { useState } from 'react';
import { MarketAnalysisResponse, UserFormData, PropertyListing, ReportPurpose } from '../types';
import PropertyGrid from './PropertyGrid';
import ScoreCard from './ScoreCard';
import LeadCapture from './LeadCapture';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface MarketReportProps {
  report: MarketAnalysisResponse;
  formData: UserFormData;
}

const MarketReport: React.FC<MarketReportProps> = ({ report, formData }) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('DFWRealtor.ai Market Report', 20, 25);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(`Analysis for: ${formData.location}`, 20, 55);
    doc.setFontSize(10);
    doc.text(`Generated for: ${formData.email}`, 20, 62);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 67);

    // Market Stats
    doc.setFontSize(14);
    doc.text('Key Market Indicators', 20, 80);
    
    const statsData = [
      ['Metric', 'Value'],
      ['Median Home Price', report.stats.medianPrice],
      ['Price Trend (12m)', report.stats.priceTrend],
      ['Days on Market', report.stats.daysOnMarket.toString()],
      ['Inventory Level', report.stats.inventoryLevel],
      ['School Rating', `${report.stats.schoolRating}/10`],
      ['Commute Score', `${report.stats.commuteScore}/100`],
      ['Rent Estimate', report.stats.rentEstimate],
      ['Cap Rate', report.stats.capRate],
      ['Appreciation Trend', report.stats.appreciationTrend]
    ];

    autoTable(doc, {
      startY: 85,
      head: [statsData[0]],
      body: statsData.slice(1),
      theme: 'striped',
      headStyles: { fillStyle: 'DF', fillColor: [37, 99, 235] }
    });

    // Narrative
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(14);
    doc.text('Market Analysis Executive Summary', 20, finalY + 15);
    doc.setFontSize(10);
    const splitText = doc.splitTextToSize(report.narrative, 170);
    doc.text(splitText, 20, finalY + 25);

    // Featured Properties
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Featured Investment Opportunities', 20, 20);
    
    const propData = report.properties.map(p => [
      p.address,
      p.price,
      `${p.beds}b/${p.baths}ba`,
      `${p.sqft} sqft`,
      p.description
    ]);

    autoTable(doc, {
      startY: 25,
      head: [['Address', 'Price', 'Config', 'Size', 'Detail']],
      body: propData,
      theme: 'grid',
      styles: { fontSize: 8 }
    });

    doc.save(`DFWRealtor_Report_${formData.location.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Stats */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 px-8 py-6 flex flex-col md:flex-row justify-between items-center text-white">
          <div>
            <h2 className="text-2xl font-bold mb-1">{formData.location} Market Intelligence</h2>
            <p className="opacity-80 text-sm">Real-time analysis for {formData.propertyType} • Goal: {formData.purpose}</p>
          </div>
          <button 
            onClick={downloadPDF}
            className="mt-4 md:mt-0 flex items-center bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-medium transition-all"
          >
            <i className="fas fa-file-pdf mr-2"></i> Download Full PDF
          </button>
        </div>
        
        <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <ScoreCard label="Median Price" value={report.stats.medianPrice} trend={report.stats.priceTrend} />
          <ScoreCard label="Days on Market" value={report.stats.daysOnMarket.toString()} icon="fa-clock" />
          <ScoreCard label="Inventory" value={report.stats.inventoryLevel} icon="fa-home" />
          <ScoreCard label="School Rating" value={`${report.stats.schoolRating}/10`} icon="fa-graduation-cap" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Analysis Narrative */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-newspaper text-blue-600 mr-3"></i> Executive Summary
            </h3>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {report.narrative}
            </div>
          </div>

          {/* Properties Grid */}
          <div id="properties-section">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Featured Opportunities</h3>
                <p className="text-slate-500">Curated list of 15 current listings in {formData.location}</p>
              </div>
            </div>
            <PropertyGrid 
              properties={report.properties} 
              onViewDetails={setSelectedProperty} 
            />
          </div>
        </div>

        <div className="space-y-8">
          {/* Specific Views */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Analysis Breakdown</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Buyer Advantage</p>
                <div className="flex items-center">
                  <div className="flex-grow bg-blue-200 h-2 rounded-full overflow-hidden mr-3">
                    <div className="bg-blue-600 h-full" style={{ width: `${report.stats.buyerDemand * 10}%` }}></div>
                  </div>
                  <span className="font-bold text-blue-900">{report.stats.buyerDemand}/10</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-2xl">
                <p className="text-xs font-bold text-green-600 uppercase mb-1">Seller Advantage</p>
                <div className="flex items-center">
                  <div className="flex-grow bg-green-200 h-2 rounded-full overflow-hidden mr-3">
                    <div className="bg-green-600 h-full" style={{ width: `${report.stats.sellerAdvantage * 10}%` }}></div>
                  </div>
                  <span className="font-bold text-green-900">{report.stats.sellerAdvantage}/10</span>
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-2xl">
                <p className="text-xs font-bold text-orange-600 uppercase mb-1">Risk Profile</p>
                <div className="flex items-center">
                  <div className="flex-grow bg-orange-200 h-2 rounded-full overflow-hidden mr-3">
                    <div className="bg-orange-600 h-full" style={{ width: `${report.stats.riskScore * 10}%` }}></div>
                  </div>
                  <span className="font-bold text-orange-900">{report.stats.riskScore}/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investor Specifics */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <i className="fas fa-coins text-yellow-500 mr-2"></i> Investor View
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-slate-400 text-sm">Est. Rent</span>
                <span className="font-bold">{report.stats.rentEstimate}/mo</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-slate-400 text-sm">Cap Rate</span>
                <span className="font-bold text-green-400">{report.stats.capRate}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-slate-400 text-sm">Appreciation</span>
                <span className="font-bold text-blue-400">{report.stats.appreciationTrend}</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/5 rounded-2xl text-xs text-slate-300">
              <p className="font-bold text-white mb-2 underline">Analyst Suggestion:</p>
              {report.recommendation}
            </div>
          </div>

          {/* Sources Grounding */}
          {report.sources && report.sources.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-sm text-slate-500 uppercase tracking-widest mb-4">Data Sources</h3>
              <ul className="space-y-2">
                {report.sources.map((source, i) => (
                  <li key={i}>
                    <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-start">
                      <i className="fas fa-external-link-alt mt-0.5 mr-2 opacity-50"></i>
                      <span>{source.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <LeadCapture />
        </div>
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedProperty(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <img src={selectedProperty.imageUrl} className="w-full h-64 object-cover" alt={selectedProperty.address} />
            <button 
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center transition-all"
              onClick={() => setSelectedProperty(null)}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedProperty.address}</h2>
                  <p className="text-slate-500">Dallas-Fort Worth Metropolitan Area</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-blue-600">{selectedProperty.price}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">List Price</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <div className="text-lg font-bold">{selectedProperty.beds}</div>
                  <div className="text-xs text-slate-500 uppercase">Beds</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <div className="text-lg font-bold">{selectedProperty.baths}</div>
                  <div className="text-xs text-slate-500 uppercase">Baths</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl text-center">
                  <div className="text-lg font-bold">{selectedProperty.sqft.toLocaleString()}</div>
                  <div className="text-xs text-slate-500 uppercase">Sq Ft</div>
                </div>
              </div>
              <h3 className="font-bold mb-2">Listing Highlights</h3>
              <p className="text-slate-600 mb-8">{selectedProperty.description}</p>
              
              <div className="flex space-x-4">
                <a 
                  href={selectedProperty.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-grow bg-blue-600 text-white py-4 rounded-xl font-bold text-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  View on Marketplace
                </a>
                <a 
                  href="mailto:ekambar@gmail.com" 
                  className="bg-slate-100 text-slate-900 px-6 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Ask Agent
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketReport;
