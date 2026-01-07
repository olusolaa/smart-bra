export enum ViewState {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  SCAN = 'SCAN',
  HISTORY = 'HISTORY',
  EXPERTS = 'EXPERTS',
  COMMUNITY = 'COMMUNITY',
  PROFILE = 'PROFILE'
}

export enum ScanStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  CALIBRATING = 'CALIBRATING',
  SCANNING = 'SCANNING',
  ANALYZING = 'ANALYZING',
  COMPLETE = 'COMPLETE'
}

export interface ScanResult {
  id: string;
  date: string;
  temperatureAvg: number;
  temperatureMax: number;
  impedance: number; // Ohms
  densityScore: number; // 0-100
  anomalies: boolean;
  notes?: string;
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  cycleDay: number; // Day of menstrual cycle
  history: string;
}

export const MOCK_HISTORY: ScanResult[] = [
  { id: '1', date: '2023-10-01', temperatureAvg: 36.5, temperatureMax: 36.7, impedance: 450, densityScore: 12, anomalies: false },
  { id: '2', date: '2023-10-08', temperatureAvg: 36.6, temperatureMax: 36.8, impedance: 448, densityScore: 14, anomalies: false },
  { id: '3', date: '2023-10-15', temperatureAvg: 36.5, temperatureMax: 36.6, impedance: 452, densityScore: 11, anomalies: false },
  { id: '4', date: '2023-10-22', temperatureAvg: 36.7, temperatureMax: 37.1, impedance: 440, densityScore: 18, anomalies: true, notes: 'Slight localized heat elevation.' },
  { id: '5', date: '2023-10-29', temperatureAvg: 36.6, temperatureMax: 36.8, impedance: 450, densityScore: 13, anomalies: false },
];