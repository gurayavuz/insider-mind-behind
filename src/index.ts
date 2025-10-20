import express, { Request, Response } from 'express';
import cors from 'cors';
import { CargoInfo, ErrorResponse } from './types';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for testing
const mockCargoData: Record<string, CargoInfo> = {
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

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Cargo Tracking API',
    version: '1.0.0',
    endpoints: {
      track: 'GET /api/track?code=CARGO_CODE'
    }
  });
});

// Track cargo endpoint
app.get('/api/track', (req: Request, res: Response) => {
  const cargoCode = req.query.code as string;

  if (!cargoCode) {
    const errorResponse: ErrorResponse = {
      error: 'Missing Parameter',
      message: 'Cargo code is required. Use ?code=CARGO_CODE'
    };
    return res.status(400).json(errorResponse);
  }

  const cargoInfo = mockCargoData[cargoCode];

  if (!cargoInfo) {
    const errorResponse: ErrorResponse = {
      error: 'Not Found',
      message: `Cargo with code '${cargoCode}' not found`
    };
    return res.status(404).json(errorResponse);
  }

  res.json(cargoInfo);
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Cargo Tracking API running on http://localhost:${PORT}`);
  console.log(`📦 Try: http://localhost:${PORT}/api/track?code=CARGO123`);
});

