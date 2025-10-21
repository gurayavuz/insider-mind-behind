# 🔗 Integration Action Setup Guide

This guide shows you how to configure the Integration Action (Make.com/Integromat or similar platforms) with your deployed Vercel API.

## Step-by-Step Configuration

### 1. Integration Action Name
```
Cargo Tracking
```
*Or any name you prefer*

---

### 2. URL
```
https://your-project-name.vercel.app/api/track
```

**Important:** Replace `your-project-name` with your actual Vercel project URL.

To find your Vercel URL:
- Go to your [Vercel Dashboard](https://vercel.com/dashboard)
- Click on your project
- Copy the URL shown (e.g., `https://trackorder-api.vercel.app`)
- Add `/api/track` at the end

**Example:**
```
https://trackorder-api-abc123.vercel.app/api/track
```

---

### 3. Method
Select: **GET**

---

### 4. Params Tab

Click on the **"Params"** tab and configure Query Params:

#### Query Params
Click the **"Add"** button and enter:

| Key      | Value           |
|----------|-----------------|
| `code`   | `{{1.code}}`    |
| `format` | `integration`   |

**Explanation:**
- **Key:** `code` (the parameter name your API expects)
  - **Value:** This can be:
    - A dynamic variable from previous steps (e.g., `{{1.code}}`)
    - A static test value (e.g., `CARGO123`)
    - Any variable from your workflow
- **Key:** `format` (the response format)
  - **Value:** `integration` for assistant platforms, or omit for standard JSON

**Response Formats:**
- **Standard Format** (omit `format` parameter): Returns traditional JSON
- **Integration Format** (`format=integration`): Returns structured messages for chatbots/assistants

**For Testing:**
You can temporarily use a static value like `CARGO123` for code to test the connection.

---

### 5. Authorization Tab

Click on the **"Authorization"** tab:

#### Type
Select: **No Auth**

**Why?**
- The API is public and doesn't require authentication
- Perfect for testing purposes
- No API keys or tokens needed

**Note:** If you want to add security later, you can implement API key authentication. For now, keep it simple with No Auth.

---

### 6. Headers Tab

Click on the **"Headers"** tab:

#### Custom Headers
**Leave empty** - No custom headers required.

**Why?**
- The API automatically sets `Content-Type: application/json`
- CORS headers are configured on the server side
- No additional headers needed for basic functionality

**Optional Headers (Advanced):**
If you need custom headers in the future, you can add:
- `X-API-Key` → For authentication
- `User-Agent` → Custom user agent
- `Accept` → `application/json` (usually automatic)

But for now, **leave this section empty**.

---

### 7. Body Tab

Click on the **"Body"** tab:

#### Send
Select: **Automatically** (default)

#### Body Content
**Leave empty** - GET requests don't use body parameters.

**Why?**
- GET requests send data via URL parameters (query params)
- Only POST, PUT, PATCH requests use body data
- Your API uses query parameters, not body

**Note:** If your platform shows body options, just ignore them or keep defaults.

---

### 8. Timeout Settings
```
30
```
*(30 seconds is recommended)*

---

### 9. Connection
**Leave as default** or select your preferred connection module if required by your platform.

---

### 10. Comment *(Optional)*
```
Fetches cargo tracking information from Vercel API using cargo code
```

---

## Complete Configuration Example

Here's what your screen should look like:

```
┌─────────────────────────────────────────────────────┐
│ INTEGRATION ACTION                              [×] │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Integration Action Name                             │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Cargo Tracking                                  │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ [Request] Response                                  │
│                                                     │
│ URL                                                 │
│ ┌─────────────────────────────────────────────────┐ │
│ │ https://your-project.vercel.app/api/track      │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ Method                                              │
│ ┌─────────────────────────────────────────────────┐ │
│ │ GET                                          ▼  │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ Params  Authorization  Headers  Body                │
│                                                     │
│ Query Params                                        │
│ ┌──────────┬──────────────┬──────────────────────┐ │
│ │ Key      │ Value        │                      │ │
│ ├──────────┼──────────────┼──────────────────────┤ │
│ │ code     │ {{1.code}}   │        [Add]         │ │
│ └──────────┴──────────────┴──────────────────────┘ │
│                                                     │
│ Timeout settings: ⓘ                                │
│ ┌─────────────────────────────────────────────────┐ │
│ │ 30                                              │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ Connection                                          │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Search Modules ...                           ▼  │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ Comment                                             │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Fetches cargo tracking info from API            │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Response Tab Configuration

After configuring the Request tab, switch to the **Response** tab and configure:

### 1. Receive
```
Automatically
```
*The response will be received automatically when the API responds*

---

### 2. Type
```
Internal
```
*For internal processing within your workflow*

**Options explained:**
- **Internal**: Response is used within the automation only
- **External**: If you need to expose this to external systems

---

### 3. Connection
```
Leave as default (Search Modules...)
```
*Or select a specific connection if your platform requires it*

---

### 4. Comment *(Optional)*
```
Processes cargo tracking response with status, location, and delivery info
```

---

### 5. If integration is invalid
Click **"ADD FALLBACK"** to add error handling (optional but recommended)

**Fallback Configuration:**
- **On Error**: Return a default message
- **Default Response**: 
```json
{
  "error": true,
  "message": "Unable to fetch cargo information",
  "cargoCode": "UNKNOWN",
  "status": "Error"
}
```

This ensures your workflow doesn't break if the API fails.

---

### 6. Notes *(Optional)*
```
API returns cargo status, tracking history, origin, destination, and estimated delivery date.
Available test codes: CARGO123, CARGO456, CARGO789
```

---

## Complete Response Tab Example

```
┌─────────────────────────────────────────────┐
│ [Request] [Response]                        │
├─────────────────────────────────────────────┤
│                                             │
│ Receive                                     │
│ [Automatically                           ▼] │
│                                             │
│ Type                                        │
│ [Internal                                ▼] │
│                                             │
│ Connection                                  │
│ [Search Modules ...                      ▼] │
│                                             │
│ Comment                                     │
│ ┌─────────────────────────────────────────┐ │
│ │ Processes cargo tracking response       │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ If integration is invalid:                  │
│                        [ADD FALLBACK]       │
│                                             │
│ Notes:                                      │
│ Returns status, location, delivery info     │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Testing the Integration

### Test with Static Value

1. In the **Query Params** value field, enter: `CARGO123`
2. Click **"Test"** or **"Run Once"**
3. You should receive:

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

### Test with Dynamic Variable

1. Ensure a previous module provides a `code` variable
2. In the **Query Params** value field, use: `{{1.code}}` (or appropriate variable)
3. Run your scenario

---

## Available Test Codes

Use these codes for testing:

| Code       | Status      | Description |
|------------|-------------|-------------|
| CARGO123   | In Transit  | Electronics from Istanbul to Berlin |
| CARGO456   | Delivered   | Clothing from Paris to London |
| CARGO789   | Pending     | Documents from Amsterdam to Madrid |

---

## Response Structure

### Standard Format (No `format` parameter)

The API returns a JSON object with these fields:

```json
{
  "cargoCode": "string",
  "status": "string",
  "description": "string",
  "origin": "string",
  "destination": "string",
  "currentLocation": "string",
  "estimatedDelivery": "string",
  "weight": "string",
  "trackingHistory": [
    {
      "timestamp": "string",
      "location": "string",
      "status": "string",
      "description": "string"
    }
  ]
}
```

### Integration Format (`format=integration`)

When using `format=integration`, the API returns a structured response for chatbot/assistant platforms:

```json
{
  "content": {
    "params": {
      "cargoCode": "string",
      "status": "string",
      "currentLocation": "string",
      "estimatedDelivery": "string"
    },
    "modules": [
      {
        "type": "MESSAGE",
        "messageType": "TEXT",
        "payloads": ["formatted message with emoji"]
      }
    ],
    "fallback": false
  }
}
```

**Benefits of Integration Format:**
- ✅ Pre-formatted messages ready to display
- ✅ State parameters for conversation management
- ✅ Multiple message modules for better UX
- ✅ Emoji-enriched formatting for readability

You can map these fields to subsequent modules in your workflow.

---

## Mapping Response Data

### Standard Format Variables

After receiving the response, you can use these variables in next steps:

- `{{response.cargoCode}}` - The cargo code
- `{{response.status}}` - Current status
- `{{response.description}}` - Package description
- `{{response.origin}}` - Origin location
- `{{response.destination}}` - Destination location
- `{{response.currentLocation}}` - Current location
- `{{response.estimatedDelivery}}` - Delivery date
- `{{response.weight}}` - Package weight
- `{{response.trackingHistory}}` - Array of tracking events

### Integration Format Variables

When using `format=integration`:

**State Parameters:**
- `{{response.content.params.cargoCode}}` - The cargo code
- `{{response.content.params.status}}` - Current status
- `{{response.content.params.currentLocation}}` - Current location
- `{{response.content.params.estimatedDelivery}}` - Delivery date

**Message Modules:**
- `{{response.content.modules}}` - Array of formatted messages
- `{{response.content.modules[0].payloads[0]}}` - First message (summary)
- `{{response.content.fallback}}` - Fallback flag (boolean)

---

## Error Handling

### Missing Code (400 Error)
If the `code` parameter is missing:
```json
{
  "error": "Missing Parameter",
  "message": "Cargo code is required. Use ?code=CARGO_CODE"
}
```

### Invalid Code (404 Error)
If the cargo code doesn't exist:
```json
{
  "error": "Not Found",
  "message": "Cargo with code 'INVALID123' not found"
}
```

**Tip:** Add error handling in your scenario to catch these responses.

---

## Advanced Usage

### Multiple Cargo Tracking

If you need to track multiple cargos:

1. Use an **Iterator** module
2. Feed it an array of cargo codes
3. Connect it to your Integration Action
4. Each cargo will be tracked in sequence

### Conditional Logic

Use a **Router** or **Filter** based on the status:

- If `status = "Delivered"` → Send confirmation email
- If `status = "In Transit"` → Update tracking dashboard
- If `status = "Pending"` → Send alert to warehouse

---

## Troubleshooting

### Issue: "Connection Timeout"
- Increase timeout to 60 seconds
- Check your Vercel deployment is active

### Issue: "404 Not Found"
- Verify the URL ends with `/api/track`
- Ensure your Vercel deployment is successful

### Issue: "CORS Error"
- CORS is enabled by default in the API
- This shouldn't be an issue

### Issue: "Invalid Response"
- Check that you're using a valid test code (CARGO123, CARGO456, or CARGO789)
- Verify the `code` query parameter is being sent

---

## Platform-Specific Notes

### Make.com (Integromat)
- Use the **HTTP** → **Make a Request** module
- Set method to GET
- Add query parameter `code`

### Zapier
- Use the **Webhooks** → **GET** action
- URL: `https://your-project.vercel.app/api/track?code={{code}}`

### n8n
- Use the **HTTP Request** node
- Method: GET
- Add query parameter

### Power Automate
- Use the **HTTP** action
- Method: GET
- URI: Include full URL with query parameter

---

## Next Steps

1. ✅ Configure the Integration Action as shown above
2. ✅ Test with `CARGO123`
3. ✅ Verify the response
4. ✅ Map response data to your workflow
5. ✅ Add error handling
6. ✅ Deploy your automation

---

## Support

If you encounter any issues:
1. Test the API directly in browser: `https://your-project.vercel.app/api/track?code=CARGO123`
2. Check Vercel logs: `vercel logs`
3. Verify the deployment is active in Vercel Dashboard

---

**Happy Automating! 🎉**

