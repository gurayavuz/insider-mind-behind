# 📊 API Logging Guide

Complete guide to viewing and monitoring your API logs.

---

## Viewing Logs on Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Select**: Your project (trackorder-api or similar)
3. **Click**: "Logs" tab at the top
4. **View**: Real-time logs of all requests

**What you'll see:**
- ⏰ Timestamp
- 🌐 HTTP Method (GET)
- 📊 Status Code (200, 404, 400, etc.)
- ⚡ Response Time (ms)
- 🔗 Full URL with parameters
- 💬 Console.log messages

---

### Method 2: Vercel CLI

**Install Vercel CLI** (if not already):
```bash
npm install -g vercel
```

**View logs in real-time:**
```bash
vercel logs
```

**Follow logs (continuous stream):**
```bash
vercel logs --follow
```

**View logs for specific deployment:**
```bash
vercel logs your-project-name
```

**View logs with limit:**
```bash
vercel logs --limit 100
```

---

## What Gets Logged

Your API now logs the following information:

### 1. Track Endpoint (`/api/track`)

**Successful Request (200):**
```
📦 [Track API] Incoming request: { method: 'GET', url: '/api/track?code=CARGO123', timestamp: '2025-10-20T10:30:00.000Z' }
🔍 [Track API] Cargo code received: CARGO123
✅ [Track API] Success - Cargo found: CARGO123 Status: In Transit
```

**Missing Code (400):**
```
📦 [Track API] Incoming request: { method: 'GET', url: '/api/track', timestamp: '2025-10-20T10:30:00.000Z' }
🔍 [Track API] Cargo code received: NONE
❌ [Track API] Missing cargo code parameter
```

**Invalid Code (404):**
```
📦 [Track API] Incoming request: { method: 'GET', url: '/api/track?code=INVALID999', timestamp: '2025-10-20T10:30:00.000Z' }
🔍 [Track API] Cargo code received: INVALID999
❌ [Track API] Cargo not found: INVALID999
```

---

### 2. Root Endpoint (`/`)

```
🏠 [Root API] Request received: { method: 'GET', timestamp: '2025-10-20T10:30:00.000Z' }
✅ [Root API] Sending API info
```

---

### 3. Health Endpoint (`/health`)

```
❤️ [Health Check] Request received
✅ [Health Check] API is healthy
```

---

## Example Log Output

When someone makes a request to track CARGO123:

```
2025-10-20 10:30:15  INFO   📦 [Track API] Incoming request: {
                             method: 'GET',
                             url: '/api/track?code=CARGO123',
                             timestamp: '2025-10-20T10:30:15.123Z'
                            }

2025-10-20 10:30:15  INFO   🔍 [Track API] Cargo code received: CARGO123

2025-10-20 10:30:15  INFO   ✅ [Track API] Success - Cargo found: CARGO123 Status: In Transit

2025-10-20 10:30:15  200 GET  /api/track?code=CARGO123  125ms
```

---

## Monitoring Your API

### Real-Time Monitoring

**Dashboard View:**
- Open Vercel Dashboard
- Keep "Logs" tab open
- Make test requests
- Watch logs appear in real-time

**CLI View:**
```bash
vercel logs --follow
```
Then in another terminal:
```bash
curl "https://your-project.vercel.app/api/track?code=CARGO123"
```

---

### Log Analysis

#### Check for Errors

Look for these patterns in logs:

**❌ Error Patterns:**
- `Missing cargo code parameter` → Users not providing code
- `Cargo not found: XXX` → Invalid codes being used
- `500` status → API errors

**✅ Success Patterns:**
- `Success - Cargo found` → Working correctly
- `200 GET` → Successful requests

---

### Performance Monitoring

**Response Times:**
- ✅ Good: < 200ms
- ⚠️ Acceptable: 200-500ms
- ❌ Slow: > 500ms

Check logs for timing:
```
200 GET /api/track?code=CARGO123  125ms  ← Fast!
200 GET /api/track?code=CARGO456  850ms  ← Slow!
```

---

## Filtering Logs

### In Vercel Dashboard

Use the search box to filter:

**Search by cargo code:**
```
CARGO123
```

**Search by status:**
```
Success
Error
404
```

**Search by endpoint:**
```
/api/track
/health
```

---

### In CLI

**Search logs:**
```bash
vercel logs | grep "CARGO123"
```

**Filter errors:**
```bash
vercel logs | grep "❌"
```

**Filter successful requests:**
```bash
vercel logs | grep "✅"
```

---

## Common Log Patterns

### Pattern 1: Successful Tracking

```
📦 Incoming request
🔍 Cargo code received: CARGO123
✅ Success - Cargo found: CARGO123 Status: In Transit
```

**Meaning:** Everything working perfectly!

---

### Pattern 2: User Error (Invalid Code)

```
📦 Incoming request
🔍 Cargo code received: INVALID999
❌ Cargo not found: INVALID999
```

**Meaning:** User entered wrong code. Common and expected.

---

### Pattern 3: Integration Error (Missing Code)

```
📦 Incoming request
🔍 Cargo code received: NONE
❌ Missing cargo code parameter
```

**Meaning:** Integration not configured correctly. Variable not passed.

---

### Pattern 4: High Traffic

```
📦 Incoming request (CARGO123) 10:30:15
📦 Incoming request (CARGO456) 10:30:16
📦 Incoming request (CARGO789) 10:30:17
```

**Meaning:** Multiple requests happening. Monitor for performance.

---

## Log Retention

### Vercel Log Retention

**Free Plan:**
- Logs kept for 1 day
- Limited log history

**Pro Plan:**
- Logs kept for 7+ days
- Extended history

**Tip:** Download or export important logs regularly.

---

## Exporting Logs

### Export from Dashboard

1. Go to Vercel Dashboard → Logs
2. Copy logs you need
3. Save to local file

### Export via CLI

```bash
# Save logs to file
vercel logs > logs.txt

# Save with timestamp
vercel logs > logs-$(date +%Y%m%d-%H%M%S).txt

# Save last 500 lines
vercel logs --limit 500 > logs.txt
```

---

## Advanced Logging

### Adding Custom Logs

If you want to log additional information, edit the API files:

**Example - Log request headers:**
```typescript
console.log('📦 [Track API] Headers:', req.headers);
```

**Example - Log query parameters:**
```typescript
console.log('📦 [Track API] All params:', req.query);
```

**Example - Log response data:**
```typescript
console.log('📦 [Track API] Sending response:', JSON.stringify(cargoInfo));
```

---

## Monitoring Alerts

### Set Up Alerts in Vercel

1. Go to Project Settings
2. Navigate to "Notifications"
3. Enable:
   - Error alerts
   - Performance alerts
   - Deployment alerts

---

## Log Best Practices

### ✅ Do:
- Keep logs concise
- Use emojis for quick scanning (📦 ✅ ❌)
- Log important events (requests, errors, success)
- Include timestamps
- Log cargo codes for debugging

### ❌ Don't:
- Log sensitive information (API keys, passwords)
- Log large data structures (slows down)
- Over-log (every tiny operation)
- Log user personal information

---

## Troubleshooting with Logs

### Issue: No logs appearing

**Check:**
1. ✅ Is your deployment successful?
2. ✅ Are you looking at the right project?
3. ✅ Are you making requests to the API?

**Solution:**
```bash
# Redeploy with logs
vercel --prod

# Test immediately
curl "https://your-project.vercel.app/api/track?code=CARGO123"

# Check logs
vercel logs
```

---

### Issue: Logs show errors

**If you see:** `❌ Missing cargo code parameter`
**Solution:** Check Integration Action configuration - ensure `code` parameter is being sent

**If you see:** `❌ Cargo not found`
**Solution:** Use valid test codes: CARGO123, CARGO456, CARGO789

**If you see:** `500` errors
**Solution:** Check Vercel deployment, view full error in logs

---

## Example Log Session

Here's what a complete test session looks like:

```bash
# Terminal 1: Watch logs
$ vercel logs --follow

# Terminal 2: Make requests
$ curl "https://your-project.vercel.app/"
$ curl "https://your-project.vercel.app/api/track?code=CARGO123"
$ curl "https://your-project.vercel.app/api/track?code=INVALID"
$ curl "https://your-project.vercel.app/health"

# Terminal 1 will show:
🏠 [Root API] Request received
✅ [Root API] Sending API info

📦 [Track API] Incoming request
🔍 [Track API] Cargo code received: CARGO123
✅ [Track API] Success - Cargo found: CARGO123 Status: In Transit

📦 [Track API] Incoming request
🔍 [Track API] Cargo code received: INVALID
❌ [Track API] Cargo not found: INVALID

❤️ [Health Check] Request received
✅ [Health Check] API is healthy
```

---

## Production Monitoring

### Daily Checks

1. **Morning:** Check logs for overnight errors
2. **Monitor:** Response times throughout day
3. **Review:** Popular cargo codes being tracked
4. **Check:** Error rate (should be < 5%)

### Weekly Review

- Total requests
- Most common errors
- Average response time
- Peak usage times

---

## Integration with MindBehind

### Viewing Integration Logs

When your MindBehind assistant makes API calls:

**In Vercel Logs:**
```
📦 [Track API] Incoming request: { ... }
🔍 [Track API] Cargo code received: CARGO123
✅ [Track API] Success - Cargo found: CARGO123 Status: In Transit
```

**In MindBehind:**
- Check integration action logs
- View API response
- Monitor success/failure rate

---

## Quick Reference Commands

```bash
# View logs
vercel logs

# Follow logs in real-time
vercel logs --follow

# Last 100 entries
vercel logs --limit 100

# Save to file
vercel logs > logs.txt

# Filter by term
vercel logs | grep "CARGO123"

# Filter errors only
vercel logs | grep "❌"

# Filter success only
vercel logs | grep "✅"
```

---

## Support

**View Logs:**
- Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- CLI: `vercel logs --follow`

**Test API:**
```
https://your-project.vercel.app/api/track?code=CARGO123
```

**Watch Logs While Testing:**
1. Terminal 1: `vercel logs --follow`
2. Terminal 2: Make API requests
3. See logs in real-time!

---

**Happy Monitoring! 📊**

Your API logs everything you need to track and debug issues.

