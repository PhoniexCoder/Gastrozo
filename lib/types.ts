export interface StoolAnalysis {
  color: string;
  consistency: string;
  shape: string;
  health_score: number;
  concerns: string[];
  recommendations: string[];
}

export interface AnalysisResponse {
  analysis: StoolAnalysis;
}

export interface HistoryEntry {
  id: string;
  date: string;
  analysis: StoolAnalysis;
}
