// Vercel serverless function: receives chat messages from the browser,
// forwards them to the Anthropic API using the secret API key (kept on the
// server), and returns the response. The browser never sees the key.
//
// Lives at: /api/claude (Vercel auto-routes files in the /api folder)
// Required env var: ANTHROPIC_API_KEY (set in Vercel Project Settings)

export default async function handler(req, res) {
  // Only allow POST requests (this is an action, not a page).
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Make sure the key is configured.
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set in Vercel environment variables' });
  }

  try {
    // Read the body sent by the browser. Vercel auto-parses JSON bodies.
    const { model, max_tokens, messages } = req.body || {};

    // Sensible defaults so the browser doesn't have to send everything.
    const payload = {
      model: model || 'claude-sonnet-4-20250514',
      max_tokens: max_tokens || 4000,
      messages: messages || []
    };

    // Call Anthropic. The key only lives on the server.
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });

    const data = await upstream.json();

    // Forward Anthropic's status code and body back to the browser as-is.
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy error: ' + (err && err.message ? err.message : String(err)) });
  }
}
