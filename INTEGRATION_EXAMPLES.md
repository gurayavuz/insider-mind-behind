# Integration Examples

This document provides practical examples of how to use the Cargo Tracking API with various integration platforms and assistant services.

## Overview

The API supports two response formats:
- **Standard Format**: Regular JSON response (default)
- **Integration Format**: Structured response for assistant platforms (use `format=integration`)

---

## Quick Start

### Standard Request
```bash
GET /api/track?code=CARGO123
```

### Integration Request
```bash
GET /api/track?code=CARGO123&format=integration
```

---

## Integration Platform Examples

### 1. Make.com (Integromat)

#### Action Configuration
```
Action Name: Track Cargo
URL: https://your-api.vercel.app/api/track
Method: GET
Query Parameters:
  - code: {{cargoCode}}
  - format: integration
```

#### Sample Response Handler
```javascript
// The response is already formatted for you!
// Just pass it through to your assistant
return response.content;
```

---

### 2. Zapier Integration

#### Webhook Setup
```
URL: https://your-api.vercel.app/api/track
Query Parameters:
  - code: {{input_cargo_code}}
  - format: integration
Method: GET
```

#### Processing the Response
```javascript
// Access params for state management
const cargoStatus = response.content.params.status;
const location = response.content.params.currentLocation;

// Access modules for user messages
const messages = response.content.modules.map(m => m.payloads[0]);
```

---

### 3. Custom Chatbot Integration

#### Node.js Example
```javascript
const axios = require('axios');

async function trackCargo(cargoCode) {
  try {
    const response = await axios.get('http://localhost:3000/api/track', {
      params: {
        code: cargoCode,
        format: 'integration'
      }
    });

    const { params, modules } = response.data.content;

    // Store in bot state
    botState.cargoCode = params.cargoCode;
    botState.status = params.status;
    botState.location = params.currentLocation;
    botState.estimatedDelivery = params.estimatedDelivery;

    // Send messages to user
    for (const module of modules) {
      if (module.type === 'MESSAGE' && module.messageType === 'TEXT') {
        await sendMessageToUser(module.payloads[0]);
      }
    }

  } catch (error) {
    console.error('Tracking error:', error);
  }
}

// Usage
trackCargo('CARGO123');
```

---

### 4. Python Integration (Flask/FastAPI)

```python
import requests

def track_cargo(cargo_code):
    response = requests.get(
        'http://localhost:3000/api/track',
        params={
            'code': cargo_code,
            'format': 'integration'
        }
    )
    
    if response.status_code == 200:
        data = response.json()
        content = data['content']
        
        # Store parameters
        params = content['params']
        print(f"Status: {params['status']}")
        print(f"Location: {params['currentLocation']}")
        
        # Process messages
        for module in content['modules']:
            if module['type'] == 'MESSAGE':
                for payload in module['payloads']:
                    print(payload)
                    print('-' * 50)
    
    return response.json()

# Usage
track_cargo('CARGO123')
```

---

### 5. Slack Bot Integration

```javascript
const { WebClient } = require('@slack/web-api');
const axios = require('axios');

const slackClient = new WebClient(process.env.SLACK_TOKEN);

async function handleTrackCommand(channel, cargoCode) {
  try {
    // Fetch tracking info in integration format
    const response = await axios.get('http://localhost:3000/api/track', {
      params: {
        code: cargoCode,
        format: 'integration'
      }
    });

    const { modules } = response.data.content;

    // Send each module as a separate Slack message
    for (const module of modules) {
      if (module.type === 'MESSAGE' && module.messageType === 'TEXT') {
        await slackClient.chat.postMessage({
          channel: channel,
          text: module.payloads[0]
        });
      }
    }

  } catch (error) {
    await slackClient.chat.postMessage({
      channel: channel,
      text: `❌ Error tracking cargo: ${error.message}`
    });
  }
}
```

---

### 6. Discord Bot Integration

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!track ')) {
    const cargoCode = message.content.split(' ')[1];

    try {
      const response = await axios.get('http://localhost:3000/api/track', {
        params: {
          code: cargoCode,
          format: 'integration'
        }
      });

      const { modules } = response.data.content;

      // Send each message module
      for (const module of modules) {
        if (module.type === 'MESSAGE' && module.messageType === 'TEXT') {
          await message.channel.send(module.payloads[0]);
        }
      }

    } catch (error) {
      await message.channel.send('❌ Failed to track cargo');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
```

---

### 7. WhatsApp Business API

```javascript
const axios = require('axios');

async function sendTrackingToWhatsApp(phoneNumber, cargoCode) {
  // Get tracking info
  const trackingResponse = await axios.get('http://localhost:3000/api/track', {
    params: {
      code: cargoCode,
      format: 'integration'
    }
  });

  const { modules } = trackingResponse.data.content;

  // Send via WhatsApp Business API
  for (const module of modules) {
    if (module.type === 'MESSAGE' && module.messageType === 'TEXT') {
      await axios.post('https://graph.facebook.com/v17.0/YOUR_PHONE_ID/messages', {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: module.payloads[0]
        }
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
    }
  }
}
```

---

## Response Structure Reference

### Integration Response Format

```typescript
interface IntegrationResponse {
  content: {
    params: {
      cargoCode: string;
      status: string;
      currentLocation: string;
      estimatedDelivery: string;
    };
    modules: Array<{
      type: 'MESSAGE';
      messageType: 'TEXT' | 'IMAGE' | 'CARD';
      payloads: string[];
    }>;
    fallback: boolean;
  };
}
```

### Module Types

- **MESSAGE**: A message to display to the user
  - `TEXT`: Plain text message (currently supported)
  - `IMAGE`: Image message (future enhancement)
  - `CARD`: Rich card message (future enhancement)

---

## Use Cases

### Use Case 1: Customer Service Bot

A customer service bot that automatically tracks packages when customers ask:

```javascript
// Customer asks: "Where is my package CARGO123?"
const response = await trackCargo('CARGO123', 'integration');

// Bot stores state
saveToSession('lastTrackedCargo', response.content.params);

// Bot responds with formatted messages
sendMessagesToUser(response.content.modules);
```

### Use Case 2: Automated Notifications

Send tracking updates to customers via email/SMS:

```javascript
async function sendTrackingUpdate(email, cargoCode) {
  const tracking = await fetchTracking(cargoCode, 'integration');
  
  const emailBody = tracking.content.modules
    .map(m => m.payloads.join('\n'))
    .join('\n\n');
  
  await sendEmail(email, 'Cargo Tracking Update', emailBody);
}
```

### Use Case 3: Dashboard Widget

Display tracking info in a web dashboard:

```javascript
async function updateDashboard(cargoCode) {
  const data = await fetchTracking(cargoCode, 'integration');
  
  // Update status indicator
  document.getElementById('status').textContent = data.content.params.status;
  
  // Update timeline
  const timeline = document.getElementById('timeline');
  data.content.modules.forEach(module => {
    const div = document.createElement('div');
    div.textContent = module.payloads[0];
    timeline.appendChild(div);
  });
}
```

---

## Error Handling

### Handling Missing Cargo Codes

```javascript
try {
  const response = await axios.get('http://localhost:3000/api/track', {
    params: { code: cargoCode, format: 'integration' }
  });
  
  if (response.data.content) {
    // Success - process integration response
    processResponse(response.data.content);
  }
  
} catch (error) {
  if (error.response?.status === 400) {
    console.error('Missing cargo code');
  } else if (error.response?.status === 404) {
    console.error('Cargo not found');
  } else {
    console.error('Server error');
  }
}
```

---

## Testing

### Test with cURL

```bash
# Test CARGO123
curl "http://localhost:3000/api/track?code=CARGO123&format=integration"

# Test CARGO456 (Delivered)
curl "http://localhost:3000/api/track?code=CARGO456&format=integration"

# Test CARGO789 (Pending)
curl "http://localhost:3000/api/track?code=CARGO789&format=integration"

# Test invalid code
curl "http://localhost:3000/api/track?code=INVALID&format=integration"
```

### Test with Postman

1. Create a new GET request
2. URL: `http://localhost:3000/api/track`
3. Add query params:
   - `code`: `CARGO123`
   - `format`: `integration`
4. Send request
5. Verify response structure matches `IntegrationResponse` interface

---

## Production Deployment

When deploying to production with Vercel:

1. Update URLs in your integration platform:
   ```
   https://your-project.vercel.app/api/track?code={{code}}&format=integration
   ```

2. Add environment variables if needed:
   ```bash
   vercel env add API_KEY production
   ```

3. Test the production endpoint:
   ```bash
   curl "https://your-project.vercel.app/api/track?code=CARGO123&format=integration"
   ```

---

## Support

For more information:
- See [docs.md](./docs.md) for full API documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for testing guidelines

**Version**: 1.0.0  
**Last Updated**: October 21, 2025

