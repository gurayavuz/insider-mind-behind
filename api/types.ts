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

export const mockCargoData: Record<string, CargoInfo> = {
  'CARGO123': {
    cargoCode: 'CARGO123',
    status: 'In Transit',
    description: 'Electronics Package',
    origin: 'Istanbul, Turkey',
    destination: 'Berlin, Germany',
    currentLocation: 'Sofia, Bulgaria',
    estimatedDelivery: '2025-10-25',
    weight: '25.5 kg',
    trackingHistory: [
      {
        timestamp: '2025-10-20 09:00',
        location: 'Sofia, Bulgaria',
        status: 'In Transit',
        description: 'Package arrived at sorting facility'
      },
      {
        timestamp: '2025-10-19 14:30',
        location: 'Istanbul, Turkey',
        status: 'Departed',
        description: 'Package departed from origin'
      },
      {
        timestamp: '2025-10-19 10:00',
        location: 'Istanbul, Turkey',
        status: 'Picked Up',
        description: 'Package picked up from sender'
      }
    ]
  },
  'CARGO456': {
    cargoCode: 'CARGO456',
    status: 'Delivered',
    description: 'Clothing Items',
    origin: 'Paris, France',
    destination: 'London, UK',
    currentLocation: 'London, UK',
    estimatedDelivery: '2025-10-18',
    weight: '10.2 kg',
    trackingHistory: [
      {
        timestamp: '2025-10-18 11:45',
        location: 'London, UK',
        status: 'Delivered',
        description: 'Package delivered successfully'
      },
      {
        timestamp: '2025-10-18 08:00',
        location: 'London, UK',
        status: 'Out for Delivery',
        description: 'Package out for delivery'
      },
      {
        timestamp: '2025-10-17 15:00',
        location: 'Paris, France',
        status: 'Departed',
        description: 'Package departed from origin'
      }
    ]
  },
  'CARGO789': {
    cargoCode: 'CARGO789',
    status: 'Pending',
    description: 'Documents',
    origin: 'Amsterdam, Netherlands',
    destination: 'Madrid, Spain',
    currentLocation: 'Amsterdam, Netherlands',
    estimatedDelivery: '2025-10-23',
    weight: '0.5 kg',
    trackingHistory: [
      {
        timestamp: '2025-10-20 07:00',
        location: 'Amsterdam, Netherlands',
        status: 'Pending',
        description: 'Package awaiting pickup'
      }
    ]
  }
};

