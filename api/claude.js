// Vercel serverless function: receives chat messages from the browser,
// forwards them to the Anthropic API using the secret API key (kept on the
// server), and returns the response. The browser never sees the key.
//
// Lives at: /api/claude (Vercel auto-routes files in the /api folder)
// Required env var: ANTHROPIC_API_KEY (set in Vercel Project Settings)
// Optional extra accounts: ANTHROPIC_API_KEY_2, ANTHROPIC_API_KEY_3 (picked with `account`: 1-3)

export default async function handler(req, res) {
  // Only allow POST requests (this is an action, not a page).
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Pick the account's key (1 = ANTHROPIC_API_KEY, 2/3 = ANTHROPIC_API_KEY_2/_3).
  const acct = [1, 2, 3].includes(Number(req.body && req.body.account)) ? Number(req.body.account) : 1;
  const keyName = acct === 1 ? 'ANTHROPIC_API_KEY' : 'ANTHROPIC_API_KEY_' + acct;
  const apiKey = process.env[keyName];
  if (!apiKey) {
    return res.status(500).json({ error: keyName + ' is not set in Vercel environment variables' });
  }

  try {
    // Read the body sent by the browser. Vercel auto-parses JSON bodies.
    const { model, max_tokens, messages, system } = req.body || {};

    // Size caps so a stranger hitting this URL can't run up a big bill.
    const msgs = Array.isArray(messages) ? messages : [];
    const chars = JSON.stringify(msgs).length + (typeof system === 'string' ? system.length : 0);
    if (msgs.length > 40 || chars > 80000) {
      return res.status(400).json({ error: 'Request too large' });
    }

    // Sensible defaults so the browser doesn't have to send everything.
    const payload = {
      model: model || 'claude-sonnet-4-6',
      max_tokens: Math.min(Number(max_tokens) || 4000, 4000),
      messages: msgs
    };
    if (typeof system === 'string' && system) payload.system = system.slice(0, 8000);

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
