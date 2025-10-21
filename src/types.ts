export interface CargoInfo {
  cargoCode: string;
  status: string;
  description: string;
  origin: string;
  destination: string;
  currentLocation: string;
  estimatedDelivery: string;
  weight: string;
  trackingHistory: TrackingEvent[];
}

export interface TrackingEvent {
  timestamp: string;
  location: string;
  status: string;
  description: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

// Integration Response Types
export interface IntegrationMessage {
  type: 'MESSAGE';
  messageType: 'TEXT' | 'IMAGE' | 'CARD';
  payloads: string[];
}

export interface IntegrationContent {
  params: Record<string, any>;
  modules: IntegrationMessage[];
  fallback: boolean;
}

export interface IntegrationResponse {
  content: IntegrationContent;
}

