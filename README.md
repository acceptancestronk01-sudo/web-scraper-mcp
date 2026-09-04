# Web Scraper MCP

**x402 Payment-Protected Web Scraping & Content Extraction API**

Universal web scraper for AI agents to extract content, parse HTML, and get structured data from any publicly accessible webpage.

## 🚀 Features

- **🌐 Universal Scraping** - Extract content from any public webpage
- **📝 Multiple Formats** - Output as text, markdown, HTML, or JSON
- **🎯 CSS Selectors** - Target specific elements with precision
- **🔗 Metadata Extraction** - Get title, description, OG tags, and more
- **📊 Structured Data** - Extract links, images, headings in JSON format
- **💳 x402 Micropayments** - Pay $0.004 USDC per scrape on Base Mainnet
- **🤖 MCP Compatible** - Works with Claude and other AI agents

## 📡 Live Endpoint

**Base URL**: `https://web-scraper-mcp.vercel.app` (will be updated after deployment)

### Scrape Webpage

```bash
GET /api/scrape?url={URL}&format={FORMAT}
```

**Parameters:**
- `url` (required): URL of the webpage to scrape
- `format` (optional): Output format - `text`, `markdown`, `html`, `json` (default: markdown)

**Example:**
```bash
curl "https://web-scraper-mcp.vercel.app/api/scrape?url=https://example.com&format=markdown"
```

### Extract Elements

```bash
GET /api/extract?url={URL}&selector={SELECTOR}
```

**Parameters:**
- `url` (required): URL of the webpage
- `selector` (required): CSS selector (e.g., `article`, `.content`, `#main`)

**Example:**
```bash
curl "https://web-scraper-mcp.vercel.app/api/extract?url=https://example.com&selector=article"
```

### Get Metadata

```bash
GET /api/metadata?url={URL}
```

**Parameters:**
- `url` (required): URL to analyze

**Example:**
```bash
curl "https://web-scraper-mcp.vercel.app/api/metadata?url=https://example.com"
```

**Response (402 Payment Required):**
```json
{
  "error": "Payment Required",
  "message": "This endpoint requires x402 payment",
  "payment": {
    "scheme": "exact",
    "network": "eip155:8453",
    "price": "$0.004",
    "currency": "USDC",
    "payTo": "0xf081ee84c0d85278a6242bc265f0b312021ebeb1"
  },
  "instructions": "Include payment proof in X-Payment-Proof header"
}
```

## 🔍 Discovery Endpoints

- **Bazaar Discovery**: `/.well-known/x402`
- **MCP Metadata**: `/mcp/tools`
- **Health Check**: `/health`

## 💰 Payment Details

- **Network**: Base Mainnet (Chain ID: eip155:8453)
- **Currency**: USDC
- **Price**: $0.004 per scrape
- **Protocol**: x402 "exact" scheme
- **Payment Address**: `0xf081ee84c0d85278a6242bc265f0b312021ebeb1`

## 🤖 Use with AI Agents

This MCP server is designed to work with Claude Code and other AI agents that support the Model Context Protocol (MCP) and x402 payments.

AI agents can:
1. Discover the service on x402 Bazaar
2. Pay via CDP Facilitator
3. Scrape any public webpage
4. Extract specific content with CSS selectors
5. Get clean markdown or structured JSON
6. Monitor websites for changes
7. Aggregate content from multiple sources

## 📦 Response Format

### Scrape Response (Markdown)
```json
{
  "success": true,
  "url": "https://example.com",
  "format": "markdown",
  "title": "Example Domain",
  "content": "# Example Domain\n\nThis domain is for use in illustrative examples...",
  "scrapedAt": "2026-09-04T20:00:00.000Z",
  "payment": {
    "verified": true,
    "amount": "0.004",
    "currency": "USDC"
  }
}
```

### Scrape Response (JSON)
```json
{
  "success": true,
  "url": "https://example.com",
  "format": "json",
  "title": "Example Domain",
  "content": {
    "title": "Example Domain",
    "headings": ["Example Domain", "More Information"],
    "paragraphs": [
      "This domain is for use in illustrative examples in documents.",
      "You may use this domain in literature without prior coordination."
    ],
    "links": [
      {
        "text": "More information...",
        "href": "https://www.iana.org/domains/example"
      }
    ],
    "images": []
  },
  "scrapedAt": "2026-09-04T20:00:00.000Z"
}
```

### Extract Response
```json
{
  "success": true,
  "url": "https://example.com",
  "selector": "article",
  "count": 2,
  "elements": [
    {
      "html": "<article><h2>Title</h2><p>Content...</p></article>",
      "text": "Title Content...",
      "attributes": {
        "class": "post",
        "id": "post-123"
      }
    }
  ],
  "scrapedAt": "2026-09-04T20:00:00.000Z"
}
```

### Metadata Response
```json
{
  "success": true,
  "url": "https://example.com",
  "metadata": {
    "title": "Example Domain",
    "description": "Example domain for illustrative purposes",
    "keywords": "example, domain, documentation",
    "author": "IANA",
    "ogTitle": "Example Domain",
    "ogDescription": "Example domain for illustrative purposes",
    "ogImage": "https://example.com/image.jpg",
    "ogUrl": "https://example.com",
    "twitterCard": "summary_large_image",
    "canonical": "https://example.com",
    "favicon": "/favicon.ico",
    "language": "en"
  },
  "scrapedAt": "2026-09-04T20:00:00.000Z"
}
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Run locally
npm start

# Development mode with auto-reload
npm run dev
```

Server will start on `http://localhost:3000`

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

The `vercel.json` configuration is already set up for Express.

## 🎯 Output Formats

### Text Format
Clean text content with whitespace normalized:
```
Example Domain This domain is for use in illustrative examples...
```

### Markdown Format
HTML converted to clean markdown:
```markdown
# Example Domain

This domain is for use in illustrative examples in documents.

[More information...](https://www.iana.org/domains/example)
```

### HTML Format
Full HTML source code:
```html
<!DOCTYPE html>
<html>
<head><title>Example Domain</title></head>
<body>...</body>
</html>
```

### JSON Format
Structured data with headings, paragraphs, links, and images:
```json
{
  "title": "Example Domain",
  "headings": ["Example Domain"],
  "paragraphs": ["This domain is..."],
  "links": [{"text": "More info", "href": "..."}],
  "images": [{"alt": "Logo", "src": "..."}]
}
```

## 🎯 CSS Selector Examples

Extract specific content using CSS selectors:

- **Article content**: `article`, `article.post`, `.article-content`
- **Main content**: `main`, `#main`, `.main-content`
- **Headings**: `h1`, `h2`, `h3, h4, h5, h6`
- **Paragraphs**: `p`, `.content p`
- **Lists**: `ul`, `ol`, `li`
- **Links**: `a[href]`, `.nav a`
- **Images**: `img[src]`, `.gallery img`
- **Tables**: `table`, `tbody tr`, `td`
- **Specific IDs**: `#header`, `#footer`
- **Specific classes**: `.post`, `.comment`, `.author`

## 📊 Use Cases

- **Content Aggregation** - Collect articles, blog posts, news from multiple sites
- **Price Monitoring** - Track product prices across e-commerce sites
- **Research** - Extract data for analysis and reports
- **SEO Analysis** - Get meta tags, headings, and structured data
- **Competitor Monitoring** - Track changes on competitor websites
- **Data Mining** - Extract structured data from web pages
- **News Monitoring** - Track headlines and articles
- **Social Media** - Scrape public posts and profiles
- **Real Estate** - Collect property listings
- **Job Boards** - Aggregate job postings

## ⚠️ Important Notes

### Limitations
- Only works with publicly accessible webpages
- Does not execute JavaScript (static HTML scraping only)
- Respects robots.txt and rate limiting
- Maximum response time: 10 seconds per request

### Best Practices
- Always check if a site offers an official API first
- Respect website terms of service
- Don't scrape personal or sensitive data
- Use appropriate rate limiting
- Cache results when possible

### Legal & Ethical Considerations
- Only scrape publicly accessible information
- Respect copyright and intellectual property
- Follow robots.txt guidelines
- Don't overload servers with requests
- Use data responsibly

## 🔗 Integration Example

### With Claude Code

```javascript
// AI agent automatically handles x402 payment
const response = await fetch('https://web-scraper-mcp.vercel.app/api/scrape?url=https://example.com&format=markdown', {
  headers: {
    'X-Payment-Proof': '<payment_proof>'
  }
});

const data = await response.json();
console.log(data.content); // Markdown content
```

### MCP Tool Schema

```json
{
  "name": "scrape_webpage",
  "description": "Scrape and extract content from any publicly accessible webpage",
  "inputSchema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "URL of the webpage to scrape",
        "format": "uri"
      },
      "format": {
        "type": "string",
        "description": "Output format",
        "enum": ["text", "markdown", "html", "json"],
        "default": "markdown"
      }
    },
    "required": ["url"]
  }
}
```

## 🔐 Security

- All payments via x402 protocol on Base Mainnet
- No user data stored
- Payment verification on every request
- Rate limiting and validation built-in
- Secure HTTP requests with proper headers

## 📝 License

MIT

## 🔗 Links

- **Live API**: https://web-scraper-mcp.vercel.app (will be updated)
- **x402 Bazaar**: https://x402bazaar.app
- **MCP Protocol**: https://modelcontextprotocol.io
- **Base Network**: https://base.org
- **GitHub**: https://github.com/acceptancestronk01-sudo/web-scraper-mcp

---

Built with ❤️ for the AI agent ecosystem
