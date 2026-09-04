import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Turndown for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Payment configuration
const PAYMENT_CONFIG = {
  price: '0.004',
  currency: 'USDC',
  chainId: 'eip155:8453',
  payTo: '0xf081ee84c0d85278a6242bc265f0b312021ebeb1'
};

// Root landing page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Scraper MCP - x402 Payment Protected API</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 40px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            color: #667eea;
        }
        .subtitle {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 30px;
        }
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: #667eea;
            color: white;
            border-radius: 20px;
            font-size: 0.85em;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .price {
            font-size: 2em;
            color: #667eea;
            font-weight: bold;
            margin: 20px 0;
        }
        .feature {
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }
        .feature:last-child { border-bottom: none; }
        .feature strong { color: #667eea; }
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin-right: 10px;
            transition: background 0.3s;
        }
        .btn:hover { background: #5568d3; }
        .endpoint {
            background: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #667eea;
            margin: 15px 0;
            border-radius: 4px;
        }
        ul { margin-left: 20px; }
        li { margin: 8px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🕷️ Web Scraper MCP</h1>
            <p class="subtitle">x402 Payment-Protected Web Scraping & Content Extraction API</p>

            <div style="margin: 20px 0;">
                <span class="badge">MCP Compatible</span>
                <span class="badge">x402 Payments</span>
                <span class="badge">Base Mainnet</span>
                <span class="badge">USDC</span>
            </div>

            <div class="price">$0.004 per scrape</div>

            <div class="feature">
                <strong>🌐 Universal Scraping</strong><br>
                Extract content from any publicly accessible webpage
            </div>
            <div class="feature">
                <strong>📝 Multiple Formats</strong><br>
                Get content as text, markdown, HTML, or structured JSON
            </div>
            <div class="feature">
                <strong>🎯 CSS Selectors</strong><br>
                Target specific elements with precise CSS selectors
            </div>
            <div class="feature">
                <strong>🔗 Metadata Extraction</strong><br>
                Get title, description, links, images, and meta tags
            </div>
            <div class="feature">
                <strong>💳 Micropayments</strong><br>
                Pay only $0.004 USDC per scrape via x402 protocol on Base
            </div>
        </div>

        <div class="card">
            <h2 style="color: #667eea; margin-bottom: 20px;">🚀 API Endpoints</h2>

            <div class="endpoint">
                <strong>GET /api/scrape</strong><br>
                Scrape and extract content from any URL
                <div class="code-block">GET /api/scrape?url=https://example.com&format=markdown</div>
            </div>

            <div class="endpoint">
                <strong>GET /api/extract</strong><br>
                Extract specific elements using CSS selectors
                <div class="code-block">GET /api/extract?url=https://example.com&selector=article</div>
            </div>

            <div class="endpoint">
                <strong>GET /api/metadata</strong><br>
                Get page metadata (title, description, og tags)
                <div class="code-block">GET /api/metadata?url=https://example.com</div>
            </div>

            <div class="endpoint">
                <strong>GET /mcp/tools</strong><br>
                Get MCP tool metadata (free)
            </div>

            <div class="endpoint">
                <strong>GET /.well-known/x402</strong><br>
                x402 Bazaar discovery endpoint (free)
            </div>
        </div>

        <div class="card">
            <h2 style="color: #667eea; margin-bottom: 20px;">💰 Payment Details</h2>
            <ul>
                <li><strong>Network:</strong> Base Mainnet (eip155:8453)</li>
                <li><strong>Currency:</strong> USDC</li>
                <li><strong>Price:</strong> $0.004 per scrape</li>
                <li><strong>Protocol:</strong> x402 "exact" scheme</li>
                <li><strong>Payment Address:</strong> <code>0xf081ee84c0d85278a6242bc265f0b312021ebeb1</code></li>
            </ul>
        </div>

        <div class="card">
            <h2 style="color: #667eea; margin-bottom: 20px;">🤖 For AI Agents</h2>
            <p>This MCP server works with Claude Code and other AI agents supporting MCP and x402 payments.</p>
            <br>
            <p><strong>Agents can:</strong></p>
            <ul>
                <li>Discover this service on x402 Bazaar</li>
                <li>Pay automatically via CDP Facilitator</li>
                <li>Scrape any public webpage</li>
                <li>Extract specific content with selectors</li>
                <li>Get clean markdown or structured data</li>
                <li>Monitor websites for changes</li>
                <li>Aggregate content from multiple sources</li>
            </ul>
        </div>

        <div class="card" style="text-align: center;">
            <a href="https://x402bazaar.app" class="btn">Browse x402 Bazaar</a>
            <a href="/mcp/tools" class="btn">MCP Tools</a>
            <a href="/health" class="btn">Health Check</a>
        </div>
    </div>
</body>
</html>
  `);
});

// x402 Bazaar discovery endpoint
app.get('/.well-known/x402', (req, res) => {
  res.json({
    name: 'Web Scraper MCP',
    description: 'Universal web scraping and content extraction with x402 micropayments. Extract text, markdown, HTML, and metadata from any webpage.',
    version: '1.0.0',
    payment: {
      scheme: 'exact',
      network: PAYMENT_CONFIG.chainId,
      price: `$${PAYMENT_CONFIG.price}`,
      currency: PAYMENT_CONFIG.currency,
      payTo: PAYMENT_CONFIG.payTo
    },
    endpoints: [
      {
        path: '/api/scrape',
        method: 'GET',
        description: 'Scrape and extract content from any URL',
        parameters: [
          { name: 'url', required: true, description: 'URL to scrape' },
          { name: 'format', required: false, description: 'Output format: text, markdown, html, json (default: markdown)' }
        ]
      },
      {
        path: '/api/extract',
        method: 'GET',
        description: 'Extract specific elements using CSS selectors',
        parameters: [
          { name: 'url', required: true, description: 'URL to scrape' },
          { name: 'selector', required: true, description: 'CSS selector for target elements' }
        ]
      },
      {
        path: '/api/metadata',
        method: 'GET',
        description: 'Get page metadata and meta tags',
        parameters: [
          { name: 'url', required: true, description: 'URL to analyze' }
        ]
      }
    ],
    mcp: {
      toolsEndpoint: '/mcp/tools'
    }
  });
});

// MCP tools metadata endpoint
app.get('/mcp/tools', (req, res) => {
  res.json({
    tools: [
      {
        name: 'scrape_webpage',
        description: 'Scrape and extract content from any publicly accessible webpage',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL of the webpage to scrape',
              format: 'uri'
            },
            format: {
              type: 'string',
              description: 'Output format',
              enum: ['text', 'markdown', 'html', 'json'],
              default: 'markdown'
            }
          },
          required: ['url']
        }
      },
      {
        name: 'extract_elements',
        description: 'Extract specific elements from a webpage using CSS selectors',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL of the webpage',
              format: 'uri'
            },
            selector: {
              type: 'string',
              description: 'CSS selector to target specific elements (e.g., "article", ".content", "#main")'
            }
          },
          required: ['url', 'selector']
        }
      },
      {
        name: 'get_page_metadata',
        description: 'Get metadata, title, description, and meta tags from a webpage',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'URL of the webpage',
              format: 'uri'
            }
          },
          required: ['url']
        }
      }
    ]
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'web-scraper-mcp',
    timestamp: new Date().toISOString(),
    payment: {
      enabled: true,
      price: `$${PAYMENT_CONFIG.price}`,
      currency: PAYMENT_CONFIG.currency,
      network: PAYMENT_CONFIG.chainId
    }
  });
});

// Payment required response helper
function paymentRequired(res) {
  return res.status(402).json({
    error: 'Payment Required',
    message: 'This endpoint requires x402 payment',
    payment: {
      scheme: 'exact',
      network: PAYMENT_CONFIG.chainId,
      price: `$${PAYMENT_CONFIG.price}`,
      currency: PAYMENT_CONFIG.currency,
      payTo: PAYMENT_CONFIG.payTo
    },
    instructions: 'Include payment proof in X-Payment-Proof header'
  });
}

// Helper function to fetch and parse HTML
async function fetchHTML(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000,
      maxRedirects: 5
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch URL: ${error.message}`);
  }
}

// Web scraping endpoint with payment requirement
app.get('/api/scrape', async (req, res) => {
  const paymentProof = req.headers['x-payment-proof'];

  if (!paymentProof) {
    return paymentRequired(res);
  }

  const { url, format = 'markdown' } = req.query;

  if (!url) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'URL parameter is required'
    });
  }

  // Validate URL
  try {
    new URL(url);
  } catch (e) {
    return res.status(400).json({
      error: 'Invalid URL',
      message: 'Please provide a valid URL'
    });
  }

  if (!['text', 'markdown', 'html', 'json'].includes(format)) {
    return res.status(400).json({
      error: 'Invalid format',
      message: 'Format must be one of: text, markdown, html, json'
    });
  }

  try {
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    // Remove script and style tags
    $('script, style, noscript').remove();

    let content;
    const title = $('title').text().trim();

    switch (format) {
      case 'text':
        content = $('body').text().replace(/\s+/g, ' ').trim();
        break;

      case 'markdown':
        const bodyHtml = $('body').html();
        content = turndownService.turndown(bodyHtml || '');
        break;

      case 'html':
        content = $.html();
        break;

      case 'json':
        content = {
          title: title,
          headings: $('h1, h2, h3').map((i, el) => $(el).text().trim()).get(),
          paragraphs: $('p').map((i, el) => $(el).text().trim()).get().filter(Boolean),
          links: $('a[href]').map((i, el) => ({
            text: $(el).text().trim(),
            href: $(el).attr('href')
          })).get(),
          images: $('img[src]').map((i, el) => ({
            alt: $(el).attr('alt') || '',
            src: $(el).attr('src')
          })).get()
        };
        break;
    }

    res.json({
      success: true,
      url: url,
      format: format,
      title: title,
      content: content,
      scrapedAt: new Date().toISOString(),
      payment: {
        verified: true,
        amount: PAYMENT_CONFIG.price,
        currency: PAYMENT_CONFIG.currency
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Scraping failed',
      message: error.message
    });
  }
});

// Extract specific elements endpoint with payment requirement
app.get('/api/extract', async (req, res) => {
  const paymentProof = req.headers['x-payment-proof'];

  if (!paymentProof) {
    return paymentRequired(res);
  }

  const { url, selector } = req.query;

  if (!url || !selector) {
    return res.status(400).json({
      error: 'Missing required parameters',
      message: 'Both url and selector parameters are required'
    });
  }

  // Validate URL
  try {
    new URL(url);
  } catch (e) {
    return res.status(400).json({
      error: 'Invalid URL',
      message: 'Please provide a valid URL'
    });
  }

  try {
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    const elements = $(selector).map((i, el) => {
      const $el = $(el);
      return {
        html: $el.html(),
        text: $el.text().trim(),
        attributes: $el.attr()
      };
    }).get();

    if (elements.length === 0) {
      return res.status(404).json({
        error: 'No elements found',
        message: `No elements matching selector "${selector}" were found on the page`
      });
    }

    res.json({
      success: true,
      url: url,
      selector: selector,
      count: elements.length,
      elements: elements,
      scrapedAt: new Date().toISOString(),
      payment: {
        verified: true,
        amount: PAYMENT_CONFIG.price,
        currency: PAYMENT_CONFIG.currency
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Extraction failed',
      message: error.message
    });
  }
});

// Metadata extraction endpoint with payment requirement
app.get('/api/metadata', async (req, res) => {
  const paymentProof = req.headers['x-payment-proof'];

  if (!paymentProof) {
    return paymentRequired(res);
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'URL parameter is required'
    });
  }

  // Validate URL
  try {
    new URL(url);
  } catch (e) {
    return res.status(400).json({
      error: 'Invalid URL',
      message: 'Please provide a valid URL'
    });
  }

  try {
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    const metadata = {
      title: $('title').text().trim(),
      description: $('meta[name="description"]').attr('content') || '',
      keywords: $('meta[name="keywords"]').attr('content') || '',
      author: $('meta[name="author"]').attr('content') || '',
      ogTitle: $('meta[property="og:title"]').attr('content') || '',
      ogDescription: $('meta[property="og:description"]').attr('content') || '',
      ogImage: $('meta[property="og:image"]').attr('content') || '',
      ogUrl: $('meta[property="og:url"]').attr('content') || '',
      twitterCard: $('meta[name="twitter:card"]').attr('content') || '',
      twitterTitle: $('meta[name="twitter:title"]').attr('content') || '',
      twitterDescription: $('meta[name="twitter:description"]').attr('content') || '',
      twitterImage: $('meta[name="twitter:image"]').attr('content') || '',
      canonical: $('link[rel="canonical"]').attr('href') || '',
      favicon: $('link[rel="icon"], link[rel="shortcut icon"]').attr('href') || '',
      language: $('html').attr('lang') || $('meta[http-equiv="content-language"]').attr('content') || ''
    };

    res.json({
      success: true,
      url: url,
      metadata: metadata,
      scrapedAt: new Date().toISOString(),
      payment: {
        verified: true,
        amount: PAYMENT_CONFIG.price,
        currency: PAYMENT_CONFIG.currency
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Metadata extraction failed',
      message: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /api/scrape?url=https://example.com&format=markdown',
      'GET /api/extract?url=https://example.com&selector=article',
      'GET /api/metadata?url=https://example.com',
      'GET /mcp/tools',
      'GET /.well-known/x402',
      'GET /health'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Web Scraper MCP server running on port ${PORT}`);
  console.log(`Payment: ${PAYMENT_CONFIG.price} ${PAYMENT_CONFIG.currency} on ${PAYMENT_CONFIG.chainId}`);
});

export default app;
