import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    message: 'Cargo Tracking API',
    version: '1.0.0',
    endpoints: {
      track: 'GET /api/track?code=CARGO_CODE',
      health: 'GET /health'
    },
    documentation: 'See docs.md for complete API documentation'
  });
}

