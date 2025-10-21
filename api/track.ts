import { VercelRequest, VercelResponse } from '@vercel/node';
import { mockCargoData, ErrorResponse, CargoInfo, IntegrationResponse } from './types';

/**
 * Convert cargo info to integration response format
 */
function formatAsIntegrationResponse(cargoInfo: CargoInfo): IntegrationResponse {
  const integrationResponse: IntegrationResponse = {
    content: {
      params: {
        cargoCode: cargoInfo.cargoCode,
        status: cargoInfo.status,
        currentLocation: cargoInfo.currentLocation,
        estimatedDelivery: cargoInfo.estimatedDelivery
      },
      modules: [],
      fallback: false
    }
  };

  // Add summary message
  integrationResponse.content.modules.push({
    type: 'MESSAGE',
    messageType: 'TEXT',
    payloads: [
      `📦 Cargo Code: ${cargoInfo.cargoCode}\n` +
      `📊 Status: ${cargoInfo.status}\n` +
      `📝 Description: ${cargoInfo.description}\n` +
      `🏭 Origin: ${cargoInfo.origin}\n` +
      `🎯 Destination: ${cargoInfo.destination}\n` +
      `📍 Current Location: ${cargoInfo.currentLocation}\n` +
      `📅 Estimated Delivery: ${cargoInfo.estimatedDelivery}\n` +
      `⚖️ Weight: ${cargoInfo.weight}`
    ]
  });

  // Add tracking history messages
  if (cargoInfo.trackingHistory && cargoInfo.trackingHistory.length > 0) {
    integrationResponse.content.modules.push({
      type: 'MESSAGE',
      messageType: 'TEXT',
      payloads: ['📜 Tracking History:']
    });

    cargoInfo.trackingHistory.forEach((event) => {
      integrationResponse.content.modules.push({
        type: 'MESSAGE',
        messageType: 'TEXT',
        payloads: [
          `⏰ ${event.timestamp}\n` +
          `📍 Location: ${event.location}\n` +
          `📊 Status: ${event.status}\n` +
          `💬 ${event.description}`
        ]
      });
    });
  }

  return integrationResponse;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Log incoming request
  console.log('📦 [Track API] Incoming request:', {
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('✓ [Track API] OPTIONS request handled');
    return res.status(200).end();
  }

  const cargoCode = req.query.code as string;
  const format = req.query.format as string; // 'integration' or undefined for standard
  console.log('🔍 [Track API] Cargo code received:', cargoCode || 'NONE', 'Format:', format || 'standard');

  if (!cargoCode) {
    console.log('❌ [Track API] Missing cargo code parameter');
    const errorResponse: ErrorResponse = {
      error: 'Missing Parameter',
      message: 'Cargo code is required. Use ?code=CARGO_CODE'
    };
    return res.status(400).json(errorResponse);
  }

  const cargoInfo = mockCargoData[cargoCode];

  if (!cargoInfo) {
    console.log('❌ [Track API] Cargo not found:', cargoCode);
    const errorResponse: ErrorResponse = {
      error: 'Not Found',
      message: `Cargo with code '${cargoCode}' not found`
    };
    return res.status(404).json(errorResponse);
  }

  console.log('✅ [Track API] Success - Cargo found:', cargoCode, 'Status:', cargoInfo.status);
  
  // Return integration format if requested
  if (format === 'integration') {
    console.log('📤 [Track API] Returning integration format response');
    const integrationResponse = formatAsIntegrationResponse(cargoInfo);
    return res.status(200).json(integrationResponse);
  }
  
  // Return standard format by default
  res.status(200).json(cargoInfo);
}

