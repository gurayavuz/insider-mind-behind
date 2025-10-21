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
- **Track Cargo (Standard)**: http://localhost:3000/api/track?code=CARGO123
- **Track Cargo (Integration Format)**: http://localhost:3000/api/track?code=CARGO123&format=integration
- **Health Check**: http://localhost:3000/health

## Test Cargo Codes

- `CARGO123` - In Transit (Istanbul → Berlin)
- `CARGO456` - Delivered (Paris → London)
- `CARGO789` - Pending (Amsterdam → Madrid)

## Features

✨ **Dual Response Formats**
- Standard JSON format for traditional API usage
- Integration format for chatbots and assistant platforms
- Automatically formatted messages with emojis
- State management support for conversational interfaces

## Documentation

- [docs.md](./docs.md) - Complete API documentation
- [INTEGRATION_EXAMPLES.md](./INTEGRATION_EXAMPLES.md) - Integration platform examples (Make.com, Zapier, Slack, Discord, etc.)
- [INTEGRATION_SETUP.md](./INTEGRATION_SETUP.md) - Step-by-step integration setup guide

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

