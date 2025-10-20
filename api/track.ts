import { VercelRequest, VercelResponse } from '@vercel/node';
import { mockCargoData, ErrorResponse } from './types';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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

  res.status(200).json(cargoInfo);
}

