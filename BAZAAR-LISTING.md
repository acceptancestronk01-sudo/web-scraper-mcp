# Getting Listed on x402 Bazaar

## Overview

Your Web Scraper MCP will automatically appear on **https://x402bazaar.app** after your first paid call settles through the CDP Facilitator. No registration form needed!

## Current Status

✅ **Implementation Complete**: Web scraper with cheerio and turndown
✅ **x402 Discovery**: `/.well-known/x402` endpoint ready
✅ **MCP Compatible**: `/mcp/tools` endpoint configured
⏳ **Deployment**: Ready to deploy to Vercel

## How to Get Listed

### Step 1: Deploy to Vercel ✅ IN PROGRESS

Once deployed, validate your endpoint:

```bash
curl -i https://web-scraper-mcp.vercel.app/api/scrape?url=https://example.com
```

Should return:
```
HTTP/1.1 402 Payment Required
```

### Step 2: Wait for First Paid Call

Once a user or AI agent completes a paid call through the CDP Facilitator:
1. Payment settles on Base Mainnet
2. CDP automatically catalogs your endpoint
3. Your service appears on x402bazaar.app within minutes

### Step 3: Optional - Manual Testing

You can test with CDP's x402 tooling or wait for organic discovery.

## Discovery Confirmation

After a paid call, check the `EXTENSION-RESPONSES` header in the settle response (base64-encoded JSON):

- `"success"` - Metadata cataloged ✅
- `"processing"` - Being cataloged asynchronously ⏳
- `"rejected"` - Check `rejectedReason` for validation errors ❌

## Requirements for Listing

### Required:
- ✅ Public HTTPS URL
- ✅ Returns `402 Payment Required`
- ✅ Valid x402 discovery endpoint
- ✅ Accepts payments through CDP Facilitator
- ✅ Base/USDC only

### For Featured/Curated Tier:
- Live mainnet payments
- ≥99% availability (30-day window)
- Complete input schemas and examples
- Clear agent-focused description
- Passes platform health probes

## Your Endpoint Details

**Base URL**: `https://web-scraper-mcp.vercel.app` (to be deployed)
**Method**: `GET`  
**Price**: $0.004 USDC  
**Network**: Base Mainnet (eip155:8453)  
**Payment Address**: `0xf081ee84c0d85278a6242bc265f0b312021ebeb1`

**Primary Endpoints**:
1. `/api/scrape?url=https://example.com&format=markdown` - Scrape webpage
2. `/api/extract?url=https://example.com&selector=article` - Extract elements
3. `/api/metadata?url=https://example.com` - Get metadata

**Example Request**:
```bash
GET /api/scrape?url=https://example.com&format=markdown
```

**Example Response**:
```json
{
  "success": true,
  "url": "https://example.com",
  "format": "markdown",
  "title": "Example Domain",
  "content": "# Example Domain\n\nThis domain is for use...",
  "scrapedAt": "2026-09-04T20:00:00.000Z"
}
```

## Maintenance

To stay listed:
- Complete at least 1 paid call every 30 days
- Maintain ≥99% uptime
- Continue returning 402 for unpaid requests
- Respond to health probes

**Auto-removal happens when**:
- No settlements for 30+ days
- Health probes fail consistently
- Endpoint stops returning 402

## Tracking Your Listing

Once listed, find your endpoint on:
- **Browse**: https://x402bazaar.app
- **Search by tags**: scraper, web-scraping, content-extraction, html, parser, mcp
- **Your payment address**: Search by `0xf081ee84c0d85278a6242bc265f0b312021ebeb1`

## Use Cases for AI Agents

Your Web Scraper MCP is perfect for:
- **Content Aggregation** - Collect articles, news, blog posts from multiple sources
- **Price Monitoring** - Track product prices across e-commerce sites
- **Research & Analysis** - Extract data for reports and insights
- **SEO Audits** - Analyze meta tags, headings, and page structure
- **Competitor Monitoring** - Track changes on competitor websites
- **Data Mining** - Extract structured data from web pages
- **News Monitoring** - Track breaking news and headlines
- **Market Research** - Collect public information for analysis

## Metadata Quality

**Description**: 
"Universal web scraper for AI agents. Extract content from any public webpage as text, markdown, HTML, or JSON. Use CSS selectors to target specific elements. Get metadata, links, images, and structured data. Perfect for content aggregation, research, monitoring, and data extraction."

**Tags**:
- scraper
- web-scraping
- content-extraction
- html-parser
- cheerio
- markdown
- css-selectors
- mcp
- data-extraction
- monitoring

## Support

- **x402 Docs**: https://docs.cdp.coinbase.com/x402
- **GitHub**: https://github.com/coinbase/x402
- **Bazaar**: https://x402bazaar.app
- **Live API**: https://web-scraper-mcp.vercel.app (to be deployed)

## Next Steps

⏳ Deploying to Vercel
⏳ Creating GitHub repository
⏳ Validating all endpoints
⏳ Waiting for first paid call to auto-list on Bazaar

Your MCP is ready for deployment!

---

**Coming soon!** After deployment, your first paid call will automatically list you on x402bazaar.app! 🚀
