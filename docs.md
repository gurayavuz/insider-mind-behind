# Cargo Tracking API Documentation

## Overview
A simple REST API for tracking cargo shipments. This API allows you to query cargo information by providing a cargo code and returns detailed tracking information including status, location, and tracking history.

## Base URL

**Local Development:**
```
http://localhost:3000
```

**Production (Vercel):**
```
https://your-project-name.vercel.app
```

> See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

## Endpoints

### 1. Root Endpoint
**GET /** 

Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Cargo Tracking API",
  "version": "1.0.0",
  "endpoints": {
    "track": "GET /api/track?code=CARGO_CODE"
  }
}
```

---

### 2. Track Cargo
**GET /api/track**

Retrieves tracking information for a specific cargo code.

#### Query Parameters
| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| code      | string | Yes      | The cargo tracking code |
| format    | string | No       | Response format: 'integration' for assistant platforms, omit for standard JSON |

#### Success Response (200 OK) - Standard Format
When called without `format` parameter or with `format=standard`:
```json
{
  "cargoCode": "CARGO123",
  "status": "In Transit",
  "description": "Electronics Package",
  "origin": "Istanbul, Turkey",
  "destination": "Berlin, Germany",
  "currentLocation": "Sofia, Bulgaria",
  "estimatedDelivery": "2025-10-25",
  "weight": "25.5 kg",
  "trackingHistory": [
    {
      "timestamp": "2025-10-20 09:00",
      "location": "Sofia, Bulgaria",
      "status": "In Transit",
      "description": "Package arrived at sorting facility"
    },
    {
      "timestamp": "2025-10-19 14:30",
      "location": "Istanbul, Turkey",
      "status": "Departed",
      "description": "Package departed from origin"
    }
  ]
}
```

#### Success Response (200 OK) - Integration Format
When called with `format=integration`:
```json
{
  "content": {
    "params": {
      "cargoCode": "CARGO123",
      "status": "In Transit",
      "currentLocation": "Sofia, Bulgaria",
      "estimatedDelivery": "2025-10-25"
    },
    "modules": [
      {
        "type": "MESSAGE",
        "messageType": "TEXT",
        "payloads": [
          "📦 Cargo Code: CARGO123\n📊 Status: In Transit\n📝 Description: Electronics Package\n🏭 Origin: Istanbul, Turkey\n🎯 Destination: Berlin, Germany\n📍 Current Location: Sofia, Bulgaria\n📅 Estimated Delivery: 2025-10-25\n⚖️ Weight: 25.5 kg"
        ]
      },
      {
        "type": "MESSAGE",
        "messageType": "TEXT",
        "payloads": ["📜 Tracking History:"]
      },
      {
        "type": "MESSAGE",
        "messageType": "TEXT",
        "payloads": [
          "⏰ 2025-10-20 09:00\n📍 Location: Sofia, Bulgaria\n📊 Status: In Transit\n💬 Package arrived at sorting facility"
        ]
      }
    ],
    "fallback": false
  }
}
```

#### Error Response (400 Bad Request)
When cargo code is missing:
```json
{
  "error": "Missing Parameter",
  "message": "Cargo code is required. Use ?code=CARGO_CODE"
}
```

#### Error Response (404 Not Found)
When cargo code doesn't exist:
```json
{
  "error": "Not Found",
  "message": "Cargo with code 'INVALID123' not found"
}
```

---

### 3. Health Check
**GET /health**

Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-20T10:30:00.000Z"
}
```

---

## Test Cargo Codes

For testing purposes, the following cargo codes are available:

| Cargo Code | Status      | Description |
|------------|-------------|-------------|
| CARGO123   | In Transit  | Electronics Package from Istanbul to Berlin |
| CARGO456   | Delivered   | Clothing Items from Paris to London |
| CARGO789   | Pending     | Documents from Amsterdam to Madrid |

---

## Example Requests

### Using cURL
```bash
# Track a cargo (standard format)
curl "http://localhost:3000/api/track?code=CARGO123"

# Track a cargo (integration format)
curl "http://localhost:3000/api/track?code=CARGO123&format=integration"

# Health check
curl "http://localhost:3000/health"
```

### Using JavaScript (Fetch API)
```javascript
// Track cargo (standard format)
fetch('http://localhost:3000/api/track?code=CARGO123')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Track cargo (integration format)
fetch('http://localhost:3000/api/track?code=CARGO123&format=integration')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Using Integration Action (Make.com / Integromat / Assistant Platforms)
The API now natively supports integration response format! Simply add `&format=integration` to your query.

#### Setup Instructions:

1. **Integration Action Name**: Cargo Tracking
2. **URL**: `http://localhost:3000/api/track`
3. **Method**: GET
4. **Query Params**:
   - Key: `code`, Value: `CARGO123` (or your dynamic variable)
   - Key: `format`, Value: `integration`
5. **Timeout**: 30 seconds (recommended)

#### Integration Response Format
The API automatically returns responses in the following format when `format=integration`:

```javascript
{
  content: {
    params: {
      cargoCode: "CARGO123",
      status: "In Transit",
      currentLocation: "Sofia, Bulgaria",
      estimatedDelivery: "2025-10-25"
    },
    modules: [
      {
        type: 'MESSAGE',
        messageType: 'TEXT',
        payloads: [ /* formatted cargo information */ ]
      }
      // ... additional tracking history messages
    ],
    fallback: false
  }
}
```

**Response Structure:**
- `params`: Key-value pairs stored in assistant state (cargoCode, status, currentLocation, estimatedDelivery)
- `modules`: Array of formatted message objects ready to display to users
  - `type`: Module type ('MESSAGE')
  - `messageType`: Type of message ('TEXT', 'IMAGE', 'CARD')
  - `payloads`: Array containing the formatted message content
- `fallback`: Boolean to force fallback behavior (always false for successful responses)

**Benefits:**
- ✅ No custom formatting needed - the API does it automatically
- ✅ Rich formatted messages with emojis for better readability
- ✅ Separate messages for summary and each tracking event
- ✅ Assistant state populated with key tracking information

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Build the TypeScript code
npm run build

# Run in development mode
npm run dev

# Run in production mode
npm start
```

### Environment Variables
You can set a custom port using the `PORT` environment variable:
```bash
PORT=8080 npm start
```

---

## Response Fields

### CargoInfo Object
| Field              | Type     | Description |
|--------------------|----------|-------------|
| cargoCode          | string   | Unique cargo identifier |
| status             | string   | Current status (e.g., "In Transit", "Delivered", "Pending") |
| description        | string   | Brief description of the cargo contents |
| origin             | string   | Starting location |
| destination        | string   | Final destination |
| currentLocation    | string   | Current location of the cargo |
| estimatedDelivery  | string   | Expected delivery date (YYYY-MM-DD) |
| weight             | string   | Weight of the cargo |
| trackingHistory    | array    | Array of tracking events |

### TrackingEvent Object
| Field       | Type   | Description |
|-------------|--------|-------------|
| timestamp   | string | Date and time of the event |
| location    | string | Location where event occurred |
| status      | string | Status at that point |
| description | string | Detailed description of the event |

---

## Status Codes

| Code | Description |
|------|-------------|
| 200  | Success - Cargo found and returned |
| 400  | Bad Request - Missing cargo code parameter |
| 404  | Not Found - Cargo code doesn't exist |
| 500  | Internal Server Error |

---

## CORS

CORS is enabled by default, allowing requests from any origin. This is suitable for testing purposes.

---

## Notes

- This is a simple mock API for testing purposes
- All data is stored in memory and will reset when the server restarts
- For production use, connect to a real database
- Add authentication and rate limiting for production environments

---

## Support

For issues or questions, please refer to the source code in the `src/` directory.

**Version**: 1.0.0  
**Last Updated**: October 20, 2025

