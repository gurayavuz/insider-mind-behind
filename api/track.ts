import { VercelRequest, VercelResponse } from '@vercel/node';
import { mockCargoData, ErrorResponse } from './types';

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
  console.log('🔍 [Track API] Cargo code received:', cargoCode || 'NONE');

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
  res.status(200).json(cargoInfo);
}

