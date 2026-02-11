
import { GoogleGenAI, Type } from "@google/genai";
import { UserFormData, MarketAnalysisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMarketReport(data: UserFormData): Promise<MarketAnalysisResponse> {
  const prompt = `
    You are a Dallas-Fort Worth real estate market analyst. 
    Analyze the following market request for "${data.location}" (${data.propertyType}) for the purpose of "${data.purpose}" with a budget of "${data.budget}".
    
    Use Google Search to find current, real-time market data for the Dallas/DFW area specifically for this location.
    
    Generate a professional, data-driven report.
    
    Return the response strictly in JSON format with the following structure:
    {
      "narrative": "A professional 3-paragraph summary of the area's current market condition.",
      "stats": {
        "medianPrice": "Current median home price in $",
        "priceTrend": "Percentage change over last 12 months",
        "daysOnMarket": Average number of days on market (number),
        "inventoryLevel": "Low", "Medium", or "High",
        "schoolRating": 1-10 rating,
        "commuteScore": 1-100 rating based on proximity to major highways/DART,
        "rentEstimate": "Estimated monthly rent in $",
        "capRate": "Estimated Cap Rate percentage",
        "appreciationTrend": "Projected appreciation for next 12 months in %",
        "riskScore": 1-10 rating (1 being lowest risk),
        "buyerDemand": 1-10,
        "sellerAdvantage": 1-10
      },
      "properties": [
        {
          "address": "Full street address in DFW",
          "price": "Price in $",
          "beds": number,
          "baths": number,
          "sqft": number,
          "description": "Brief selling point",
          "imageUrl": "placeholder image url like https://picsum.photos/400/300?random=1",
          "link": "Zillow or Realtor.com URL",
          "score": 1-10 matching user criteria
        }
      ], // Return exactly 15 highly relevant properties found in search
      "recommendation": "Detailed recommendation on which property is best and why based on user goal."
    }

    Note: The "properties" list should contain real or highly realistic current listings from the area.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}") as MarketAnalysisResponse;
    
    // Extract sources from grounding metadata if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '#'
    })).filter((s: any) => s.uri !== '#') || [];

    return { ...result, sources };
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
}
