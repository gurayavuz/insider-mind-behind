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

