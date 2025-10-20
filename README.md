# 📦 Cargo Tracking API

A simple TypeScript REST API for tracking cargo shipments.

## Quick Start

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## Test the API

Once running, try these URLs in your browser:

- **API Info**: http://localhost:3000
- **Track Cargo**: http://localhost:3000/api/track?code=CARGO123
- **Health Check**: http://localhost:3000/health

## Test Cargo Codes

- `CARGO123` - In Transit (Istanbul → Berlin)
- `CARGO456` - Delivered (Paris → London)
- `CARGO789` - Pending (Amsterdam → Madrid)

## Documentation

See [docs.md](./docs.md) for complete API documentation.

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Tech Stack

- TypeScript
- Express.js (local development)
- Vercel Serverless Functions (production)
- CORS enabled

