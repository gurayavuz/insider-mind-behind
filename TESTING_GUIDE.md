# 🧪 Testing Guide

Complete guide to test your Cargo Tracking API integration.

---

## Step 1: Test API Directly in Browser

Before testing in the integration platform, verify your API is working.

### Open in Browser

Replace `your-project-name` with your actual Vercel project URL:

```
https://your-project-name.vercel.app/api/track?code=CARGO123
```

### Expected Result

You should see JSON response:

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
    },
    {
      "timestamp": "2025-10-19 10:00",
      "location": "Istanbul, Turkey",
      "status": "Picked Up",
      "description": "Package picked up from sender"
    }
  ]
}
```

✅ **If you see this**, your API is working perfectly!

❌ **If you see an error**, check:
- Is your Vercel deployment successful?
- Is the URL correct?
- Try accessing the root: `https://your-project-name.vercel.app/`

---

## Step 2: Test in Integration Platform

Now let's test within your Integration Action.

### 2.1 Save Your Configuration

Make sure you've saved:

**Request Tab:**
- ✅ Integration Action Name: `Cargo Tracking`
- ✅ URL: `https://your-project-name.vercel.app/api/track`
- ✅ Method: `GET`
- ✅ Query Param: Key=`code`, Value=`CARGO123`
- ✅ Timeout: `30`

**Response Tab:**
- ✅ Receive: `Automatically`
- ✅ Type: `Internal`

### 2.2 Run Test

1. **Click the "Test" or "Run Once" button** (usually at the bottom of the form)

2. **Wait for response** (should take 1-3 seconds)

3. **Check the output panel** - you should see:

```
✓ Success
Status: 200 OK
Response received
```

### 2.3 View Response Data

Expand the response to see all fields:

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

✅ **Success!** Your integration is working.

---

## Step 3: Test All Cargo Codes

Test with different cargo codes to ensure everything works:

### Test Code 1: CARGO123 (In Transit)
```
Query Param Value: CARGO123
Expected Status: In Transit
Expected Location: Sofia, Bulgaria
```

### Test Code 2: CARGO456 (Delivered)
```
Query Param Value: CARGO456
Expected Status: Delivered
Expected Location: London, UK
```

### Test Code 3: CARGO789 (Pending)
```
Query Param Value: CARGO789
Expected Status: Pending
Expected Location: Amsterdam, Netherlands
```

---

## Step 4: Test Error Handling

### Test 4.1: Missing Code

**Setup:**
- Remove the `code` query parameter
- Run test

**Expected Response:**
```json
{
  "error": "Missing Parameter",
  "message": "Cargo code is required. Use ?code=CARGO_CODE"
}
```

**Status:** 400 Bad Request

### Test 4.2: Invalid Code

**Setup:**
- Set code value to: `INVALID999`
- Run test

**Expected Response:**
```json
{
  "error": "Not Found",
  "message": "Cargo with code 'INVALID999' not found"
}
```

**Status:** 404 Not Found

---

## Step 5: Test with Dynamic Variables

If you're using this in a real workflow:

### 5.1 Setup Test Scenario

1. Add a module before your Integration Action that provides a cargo code
   - Example: Webhook trigger, Form input, Database query, etc.

2. In your Integration Action Query Param value, use:
   ```
   {{1.cargoCode}}
   ```
   *Replace `1.cargoCode` with your actual variable path*

3. Run the complete scenario

### 5.2 Verify Variable Mapping

Check that the variable is correctly passed:
- View the integration logs
- Confirm the actual API call used the correct cargo code

---

## Step 6: Use Response Data in Next Steps

After successful test, use the response in subsequent modules:

### Available Variables

After your Integration Action runs, you can access:

```
{{module.cargoCode}}        → "CARGO123"
{{module.status}}           → "In Transit"
{{module.description}}      → "Electronics Package"
{{module.origin}}           → "Istanbul, Turkey"
{{module.destination}}      → "Berlin, Germany"
{{module.currentLocation}}  → "Sofia, Bulgaria"
{{module.estimatedDelivery}} → "2025-10-25"
{{module.weight}}           → "25.5 kg"
{{module.trackingHistory}}  → [array of events]
```

*Note: Replace `module` with your actual module reference (e.g., `2`, `3`, etc.)*

### Example Usage

**Send Email with Tracking Info:**
```
Subject: Your Package {{module.cargoCode}} Status Update

Hello,

Your package is currently: {{module.status}}
Current Location: {{module.currentLocation}}
Estimated Delivery: {{module.estimatedDelivery}}

Track your shipment for more details.
```

**Conditional Logic:**
```
IF {{module.status}} = "Delivered"
  THEN send "Package delivered" notification
ELSE IF {{module.status}} = "In Transit"
  THEN send "Package on the way" notification
ELSE
  THEN send "Package pending" alert
```

---

## Testing Checklist

Use this checklist to ensure complete testing:

- [ ] API works in browser
- [ ] Root endpoint (`/`) returns API info
- [ ] Track endpoint (`/api/track?code=CARGO123`) returns cargo data
- [ ] Health endpoint (`/health`) returns OK status
- [ ] Integration Action saves without errors
- [ ] Test with CARGO123 succeeds
- [ ] Test with CARGO456 succeeds
- [ ] Test with CARGO789 succeeds
- [ ] Missing code parameter returns 400 error
- [ ] Invalid code returns 404 error
- [ ] Response data is accessible in next steps
- [ ] Dynamic variables work correctly
- [ ] Timeout is sufficient (30 seconds)
- [ ] Fallback is configured (optional)

---

## Common Test Issues & Solutions

### Issue 1: "Connection Timeout"

**Symptoms:**
- Request takes too long
- Times out after 30 seconds

**Solutions:**
✅ Check Vercel deployment is active
✅ Test API in browser first
✅ Increase timeout to 60 seconds
✅ Check Vercel logs: `vercel logs`

---

### Issue 2: "404 Not Found"

**Symptoms:**
- API returns 404 for the endpoint itself

**Solutions:**
✅ Verify URL ends with `/api/track` (not just `/track`)
✅ Check Vercel deployment URL is correct
✅ Ensure no typos in the URL
✅ Test in browser: `https://your-project.vercel.app/api/track?code=CARGO123`

---

### Issue 3: "CORS Error"

**Symptoms:**
- Browser console shows CORS error
- Request blocked

**Solutions:**
✅ CORS is already enabled in the API
✅ This shouldn't happen with server-to-server calls
✅ If using from browser, check the API logs

---

### Issue 4: "Invalid JSON Response"

**Symptoms:**
- Response is not parsed as JSON
- Shows raw text instead

**Solutions:**
✅ Test API in browser to verify JSON format
✅ Check Content-Type header is `application/json`
✅ Verify no HTML error pages are being returned

---

### Issue 5: "Variables Not Working"

**Symptoms:**
- Dynamic variables show as literal text
- `{{1.code}}` appears in request instead of actual value

**Solutions:**
✅ Ensure previous module provides the variable
✅ Check variable path is correct
✅ Test with static value first, then switch to variable
✅ Review platform-specific variable syntax

---

## Testing with cURL

For advanced testing, use cURL from terminal:

### Basic Test
```bash
curl "https://your-project-name.vercel.app/api/track?code=CARGO123"
```

### Verbose Output
```bash
curl -v "https://your-project-name.vercel.app/api/track?code=CARGO123"
```

### Pretty JSON
```bash
curl "https://your-project-name.vercel.app/api/track?code=CARGO123" | json_pp
```

### Test All Endpoints
```bash
# Root
curl "https://your-project-name.vercel.app/"

# Track
curl "https://your-project-name.vercel.app/api/track?code=CARGO123"

# Health
curl "https://your-project-name.vercel.app/health"
```

---

## Testing with Postman

1. Open Postman
2. Create new GET request
3. Enter URL: `https://your-project-name.vercel.app/api/track`
4. Add Query Param: `code` = `CARGO123`
5. Click **Send**
6. Verify 200 OK response with JSON data

---

## Performance Testing

### Response Time
- Expected: < 500ms
- Acceptable: < 2 seconds
- If slower, check Vercel logs

### Concurrent Requests
- Vercel handles multiple requests automatically
- Test with multiple simultaneous calls if needed

---

## Next Steps After Testing

Once all tests pass:

1. ✅ Configure your full workflow
2. ✅ Add error handling
3. ✅ Set up notifications
4. ✅ Map response data to actions
5. ✅ Deploy your automation
6. ✅ Monitor for issues

---

## Need Help?

If tests fail:

1. **Check browser test first** - simplest way to verify API
2. **Check Vercel logs** - `vercel logs` or dashboard
3. **Verify URL** - most common issue
4. **Test with CARGO123** - guaranteed to work
5. **Check platform documentation** - for variable syntax

---

**Happy Testing! 🚀**

If you see all green checkmarks, you're ready to go live!

