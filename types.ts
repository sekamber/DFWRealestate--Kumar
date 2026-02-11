
export enum PropertyType {
  SFH = 'Single Family Home',
  CONDO = 'Condo/Townhome',
  MULTI = 'Multi-Family',
  COMMERCIAL = 'Commercial'
}

export enum ReportPurpose {
  BUY = 'Buy',
  SELL = 'Sell',
  INVEST = 'Invest'
}

export interface UserFormData {
  location: string;
  propertyType: PropertyType;
  budget: string;
  purpose: ReportPurpose;
  email: string;
}

export interface PropertyListing {
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  imageUrl: string;
  link: string;
  score: number;
}

export interface MarketStats {
  medianPrice: string;
  priceTrend: string;
  daysOnMarket: number;
  inventoryLevel: 'Low' | 'Medium' | 'High';
  schoolRating: number;
  commuteScore: number;
  rentEstimate: string;
  capRate: string;
  appreciationTrend: string;
  riskScore: number;
  buyerDemand: number;
  sellerAdvantage: number;
}

export interface MarketAnalysisResponse {
  narrative: string;
  stats: MarketStats;
  properties: PropertyListing[];
  recommendation: string;
  sources: { title: string; uri: string }[];
}
