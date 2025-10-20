# 📑 Request Tabs Quick Reference

Complete reference for all Request tab sections in your Integration Action.

---

## Tab 1: Params ✅ CONFIGURE THIS

**What to do:** Add query parameter

### Query Params

| Field | Value | Required |
|-------|-------|----------|
| Key | `code` | ✅ Yes |
| Value | `CARGO123` or `{{1.code}}` | ✅ Yes |

**Configuration:**
```
Key:   code
Value: CARGO123    (for testing)
  or   {{1.code}}  (for dynamic workflow)
```

**Purpose:**
- Sends the cargo code to the API
- API reads this to know which cargo to track

---

## Tab 2: Authorization ✅ CONFIGURE THIS

**What to do:** Select "No Auth"

### Type
```
No Auth
```

**Why:**
- API is public (for testing)
- No authentication required
- No API keys needed

**Alternative Options (Not Needed Now):**
- ❌ Basic Auth - Not needed
- ❌ API Key - Not needed
- ❌ Bearer Token - Not needed
- ❌ OAuth - Not needed

**Keep it simple: Use "No Auth"**

---

## Tab 3: Headers ⚪ LEAVE EMPTY

**What to do:** Leave empty (no custom headers needed)

### Custom Headers
```
(empty - don't add anything)
```

**Why:**
- API sets headers automatically
- `Content-Type: application/json` is automatic
- CORS is configured server-side

**When to add headers:**
- Only if API specifically requires them
- For custom authentication (future)
- For special API requirements

**For now: Leave this tab completely empty**

---

## Tab 4: Body ⚪ LEAVE EMPTY

**What to do:** Leave empty (GET requests don't use body)

### Send
```
Automatically (default)
```

### Body Content
```
(empty - don't add anything)
```

**Why:**
- GET requests use URL parameters, not body
- Only POST/PUT/PATCH use body data
- Query params (Tab 1) contain all needed data

**GET vs POST:**
- ✅ GET: Uses query params (`?code=CARGO123`)
- ❌ POST: Uses body data (not applicable here)

**For now: Leave this tab completely empty**

---

## Complete Configuration Summary

Here's what each tab should look like:

### ✅ Tab 1: Params (REQUIRED)
```
Query Params:
  Key: code
  Value: CARGO123
```

### ✅ Tab 2: Authorization (REQUIRED)
```
Type: No Auth
```

### ⚪ Tab 3: Headers (EMPTY)
```
(no custom headers)
```

### ⚪ Tab 4: Body (EMPTY)
```
Send: Automatically
(no body content)
```

---

## Visual Quick Guide

```
┌──────────────────────────────────────────┐
│ [Params] Authorization Headers Body      │
├──────────────────────────────────────────┤
│                                          │
│ Query Params                             │
│  Key    │ Value      │                   │
│  code   │ CARGO123   │    [Add]         │
│                                          │
│ ✅ CONFIGURED                            │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Params [Authorization] Headers Body      │
├──────────────────────────────────────────┤
│                                          │
│ Type                                     │
│ [No Auth                              ▼] │
│                                          │
│ ✅ CONFIGURED                            │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Params Authorization [Headers] Body      │
├──────────────────────────────────────────┤
│                                          │
│ (empty - no custom headers)              │
│                                          │
│ ⚪ LEAVE EMPTY                           │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Params Authorization Headers [Body]      │
├──────────────────────────────────────────┤
│                                          │
│ Send                                     │
│ [Automatically                        ▼] │
│                                          │
│ (empty - no body content)                │
│                                          │
│ ⚪ LEAVE EMPTY                           │
└──────────────────────────────────────────┘
```

---

## Testing Checklist

Before running your test:

- [ ] **Params Tab**: Added `code` query param with value `CARGO123`
- [ ] **Authorization Tab**: Selected "No Auth"
- [ ] **Headers Tab**: Left empty (no custom headers)
- [ ] **Body Tab**: Left empty (default settings)
- [ ] **URL field**: Set to `https://your-project.vercel.app/api/track`
- [ ] **Method**: Set to `GET`
- [ ] **Timeout**: Set to `30` seconds

**All checked?** → Ready to test! 🚀

---

## Common Mistakes to Avoid

### ❌ Don't add code to Body
```
Wrong: Adding code in Body tab
Right: Add code in Params tab (Query Params)
```

### ❌ Don't forget the query param
```
Wrong: Empty Params tab
Right: Key=code, Value=CARGO123
```

### ❌ Don't select complex auth
```
Wrong: API Key, Bearer Token, OAuth
Right: No Auth
```

### ❌ Don't add unnecessary headers
```
Wrong: Adding Content-Type or other headers
Right: Leave Headers tab empty
```

---

## Platform-Specific Notes

### Make.com / Integromat
- Use **HTTP** → **Make a Request** module
- Params tab is called "Query String"
- Authorization has "No authentication" option

### Zapier
- Use **Webhooks** → **GET** action
- Add query params in URL or separate field
- No Auth is default

### n8n
- Use **HTTP Request** node
- Query parameters section
- Authentication: None

### Power Automate
- Use **HTTP** action
- Method: GET
- No authentication

---

## Need More Control?

If you need advanced features later:

### Add Authentication
1. Generate API key (would need to update API)
2. Authorization Tab → API Key
3. Add key in header or query param

### Add Custom Headers
1. Headers Tab → Add
2. Example: `X-Custom-Header: value`

### Rate Limiting
1. Add delays between requests
2. Use platform's rate limiting features

**But for now, keep it simple!**

---

## Quick Reference Card

**Copy this for quick access:**

```
URL:        https://YOUR-PROJECT.vercel.app/api/track
Method:     GET
Params:     code = CARGO123
Auth:       No Auth
Headers:    (empty)
Body:       (empty)
Timeout:    30 seconds

Test Codes: CARGO123, CARGO456, CARGO789
```

---

**Done configuring? Test it now!** → [See TESTING_GUIDE.md](./TESTING_GUIDE.md)

