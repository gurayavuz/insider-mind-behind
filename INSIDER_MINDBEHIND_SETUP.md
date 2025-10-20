# 🤖 Insider MindBehind Integration Guide

Complete guide to integrate your Cargo Tracking API with Insider's MindBehind platform.

---

## Overview

This guide shows you how to connect your deployed Vercel API to your MindBehind assistant so users can track cargo shipments through your chatbot.

---

## Step 1: Access Integration Action

1. **Open your MindBehind Assistant** in the design canvas
2. **Add an Integration Action** node to your conversation flow
3. **Click on the Integration Action** to open the settings panel

---

## Step 2: Request Tab Configuration

### Integration Action Name
```
Cargo Tracking
```
*Or: "EN - Order Control" (as shown in your screenshot)*

---

### URL
```
https://your-project-name.vercel.app/api/track?code={{cargoCode}}
```

**Important:** Replace `your-project-name` with your actual Vercel deployment URL.

**Variable Options:**
- `{{cargoCode}}` - If you're capturing cargo code from user
- `{{1.code}}` - If coming from previous node
- Or use full URL with query param separately (see Params tab)

**Example:**
```
https://insider-mind-behind-cargo-kl4ajl2u7.vercel.app/api/track?code={{cargoCode}}
```

---

### Method
```
GET
```

---

### Params Tab

If you prefer to add query params separately:

**Query Params:**
| Key    | Value           |
|--------|-----------------|
| `code` | `{{cargoCode}}` |

**Note:** You can either:
- Include `?code={{cargoCode}}` in the URL directly, OR
- Add it in the Params tab separately

Both methods work!

---

### Authorization Tab

**Type:** `No Auth`

Since this is a public API for testing, no authentication is required.

**Future Enhancement:**
If you add API key authentication later, you would select:
- Type: `API Key`
- Key: `X-API-Key`
- Value: Your API key
- Add to: `Header`

---

### Headers Tab

**Leave empty** - No custom headers needed.

The API automatically handles all required headers.

---

### Body Tab

**Leave empty** - GET requests don't use body data.

---

## Step 3: Response Tab Configuration

### Receive
```
Automatically
```

The response will be received and processed automatically.

---

### Type
```
Internal
```

The response is used internally within your MindBehind flow.

---

### Connection
```
Message Action | 40
```
*Or keep default connection as shown in your screenshot*

---

### Comment
```
Fetches cargo tracking information including status, location, and delivery date
```

---

### Fallback Configuration (Recommended)

Click **"ADD FALLBACK"** to handle errors gracefully.

**If integration is invalid:**

Create a fallback message like:
```
Sorry, I couldn't retrieve the tracking information for cargo code {{cargoCode}}. 
Please check the code and try again.
```

This ensures your chatbot doesn't break if the API fails.

---

### Notes
```
API returns: status, currentLocation, estimatedDelivery, origin, destination, weight, trackingHistory
Test codes: CARGO123, CARGO456, CARGO789
```

---

## Step 4: Mapping Response to MindBehind Variables

After the API responds, you need to map the response data to variables you can use in your chatbot.

### Response Structure
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
  "trackingHistory": [...]
}
```

### Create Variables

In your MindBehind flow, create these parameters to store the response:

| Variable Name | Mapped From Response | Type |
|---------------|---------------------|------|
| `cargoStatus` | `response.status` | String |
| `cargoLocation` | `response.currentLocation` | String |
| `cargoDelivery` | `response.estimatedDelivery` | String |
| `cargoOrigin` | `response.origin` | String |
| `cargoDestination` | `response.destination` | String |
| `cargoWeight` | `response.weight` | String |

---

## Step 5: Use Response in Messages

After the Integration Action, add a **Message Action** to display the results:

### Example Message 1: Simple Status
```
✅ Cargo Status: {{cargoStatus}}
📍 Current Location: {{cargoLocation}}
📅 Estimated Delivery: {{cargoDelivery}}
```

### Example Message 2: Detailed Info
```
📦 Tracking Information for {{cargoCode}}

Status: {{cargoStatus}}
From: {{cargoOrigin}}
To: {{cargoDestination}}
Current Location: {{cargoLocation}}
Estimated Delivery: {{cargoDelivery}}
Weight: {{cargoWeight}}

Your package is on its way! 🚚
```

### Example Message 3: Conditional Response

Use **Conditions** to show different messages based on status:

**If** `cargoStatus == "Delivered"`:
```
🎉 Great news! Your package has been delivered!
Delivered to: {{cargoDestination}}
```

**Else If** `cargoStatus == "In Transit"`:
```
🚚 Your package is on the way!
Current Location: {{cargoLocation}}
Expected: {{cargoDelivery}}
```

**Else If** `cargoStatus == "Pending"`:
```
⏳ Your package is being prepared for shipment.
From: {{cargoOrigin}}
To: {{cargoDestination}}
```

---

## Step 6: Complete Flow Example

Here's a recommended conversation flow:

```
1. [Welcome Message]
   "Hello! I can help you track your cargo. Please provide your cargo code."

2. [User Input] → Capture to variable: cargoCode
   User types: CARGO123

3. [Integration Action] → Cargo Tracking
   API Call: GET /api/track?code={{cargoCode}}

4. [Condition Check]
   - If API success → Continue to step 5
   - If API error → Show fallback message

5. [Message Action] → Display Results
   "📦 Your cargo {{cargoCode}} is {{cargoStatus}}..."

6. [Follow-up Options]
   "Would you like to:
   - Track another package
   - Get more details
   - Contact support"
```

---

## Testing in MindBehind

### Test 1: Valid Cargo Code

**User says:** "Track CARGO123"
**Expected response:**
```
📦 Your cargo CARGO123 is In Transit
📍 Currently in: Sofia, Bulgaria
📅 Estimated Delivery: 2025-10-25
```

### Test 2: Different Status

**User says:** "CARGO456"
**Expected response:**
```
🎉 Your cargo CARGO456 has been Delivered!
📍 Location: London, UK
```

### Test 3: Invalid Code

**User says:** "INVALID999"
**Expected response:**
```
❌ Sorry, I couldn't find cargo code INVALID999.
Please check the code and try again.
```

---

## Available Test Codes

Use these for testing your MindBehind integration:

| Code | Status | Location | Best For Testing |
|------|--------|----------|------------------|
| `CARGO123` | In Transit | Sofia, Bulgaria | Active shipment |
| `CARGO456` | Delivered | London, UK | Completed delivery |
| `CARGO789` | Pending | Amsterdam, Netherlands | Not yet shipped |

---

## Advanced Features

### 1. Multiple Languages

If you support multiple languages, create variants:

**English:** "EN - Order Control"
**Turkish:** "TR - Sipariş Takibi"

Keep the same API call, just translate the messages.

---

### 2. Tracking History

To show tracking history, you can iterate through `trackingHistory` array:

```
📍 Tracking History:

{{#each trackingHistory}}
• {{timestamp}} - {{location}}
  {{description}}
{{/each}}
```

---

### 3. Proactive Notifications

You can use this API to:
- Send proactive messages when status changes
- Schedule checks for delivery updates
- Alert users when packages are delivered

---

### 4. Integration with CRM

Connect MindBehind to your CRM:
- Store tracking requests
- Link cargo codes to customer profiles
- Track popular routes

---

## Troubleshooting

### Issue: "Integration is invalid"

**Check:**
1. ✅ URL is correct (test in browser first)
2. ✅ Method is GET
3. ✅ Variable name is correct ({{cargoCode}})
4. ✅ Vercel deployment is active

**Solution:**
Test the API directly: `https://your-url.vercel.app/api/track?code=CARGO123`

---

### Issue: Variables not showing in messages

**Check:**
1. ✅ Response mapping is configured
2. ✅ Variable names match exactly
3. ✅ Integration Action completed successfully

**Solution:**
Use MindBehind's debug mode to see actual API response.

---

### Issue: Timeout errors

**Check:**
1. ✅ Timeout is set to 30+ seconds
2. ✅ Vercel function is responding quickly
3. ✅ No network issues

**Solution:**
- Increase timeout to 60 seconds
- Check Vercel logs: `vercel logs`

---

### Issue: CORS errors

**Solution:**
CORS is already enabled in your API. This shouldn't be an issue with server-to-server calls in MindBehind.

---

## Security Best Practices

### 1. Rate Limiting

Add rate limiting to prevent abuse:
- Limit requests per user
- Implement cooldown periods
- Track API usage

### 2. Input Validation

In MindBehind, validate cargo codes:
- Check format (e.g., must start with "CARGO")
- Maximum length check
- Only allow alphanumeric characters

### 3. Error Handling

Always provide fallback messages:
- API down
- Invalid code
- Network timeout
- Unexpected errors

---

## Going Live Checklist

Before deploying to production:

- [ ] Test all cargo codes (CARGO123, CARGO456, CARGO789)
- [ ] Test invalid codes
- [ ] Test timeout scenario
- [ ] Configure fallback messages
- [ ] Add error handling
- [ ] Test in different languages (if applicable)
- [ ] Verify response mapping
- [ ] Test complete conversation flow
- [ ] Check mobile experience
- [ ] Monitor Vercel logs
- [ ] Set up alerts for API errors

---

## Example Conversation Flow

**Complete example of how it works:**

```
Bot: 👋 Hello! I'm your cargo tracking assistant. 
     May I have your cargo tracking code?

User: CARGO123

Bot: 🔍 Let me check that for you...

[Integration Action executes]

Bot: 📦 Tracking Information for CARGO123

     ✅ Status: In Transit
     📍 Current Location: Sofia, Bulgaria
     🏭 Origin: Istanbul, Turkey
     🎯 Destination: Berlin, Germany
     📅 Estimated Delivery: October 25, 2025
     ⚖️ Weight: 25.5 kg

     📍 Recent Updates:
     • Oct 20, 09:00 - Sofia, Bulgaria
       Package arrived at sorting facility
     • Oct 19, 14:30 - Istanbul, Turkey
       Package departed from origin

     Your package is on its way! 🚚

Bot: Would you like to:
     1️⃣ Track another package
     2️⃣ Set delivery notification
     3️⃣ Contact support

User: 1

Bot: Sure! Please provide the cargo code.
```

---

## Next Steps

1. ✅ Configure Integration Action with your Vercel URL
2. ✅ Test with CARGO123
3. ✅ Map response to variables
4. ✅ Create message templates
5. ✅ Add error handling
6. ✅ Test complete flow
7. ✅ Deploy to production

---

## Resources

- **API Documentation**: See `docs.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Testing Guide**: See `TESTING_GUIDE.md`
- **Insider Academy**: https://academy.useinsider.com/docs/mindbehind-integration-action

---

## Support

**Your Vercel API URL:**
```
https://your-project-name.vercel.app
```

**API Endpoints:**
- Root: `/`
- Track: `/api/track?code=CARGO123`
- Health: `/health`

**Test in Browser:**
```
https://your-project-name.vercel.app/api/track?code=CARGO123
```

---

**Happy Building! 🚀**

Your MindBehind assistant is now ready to track cargo shipments!

