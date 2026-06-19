// app/api/proxy/route.js — Next.js API Route → OpenRouter
// Secured: input validation, rate limiting, restricted CORS, safe errors
export const runtime = 'nodejs';

const ALLOWED_ORIGIN = 'https://www.bizanalyzer.nl';
const MAX_TOKENS_LIMIT = 4096;
const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 6000;

// Simple in-memory rate limiter (resets on cold start — acceptable for this scale)
const requestLog = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20;  // per IP per minute

function isRateLimited(ip) {
  const now = Date.now();
  const entry = requestLog.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    requestLog.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) return true;
  return false;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function validateBody(body) {
  if (!body || typeof body !== 'object') return 'Invalid request body';
  if (!Array.isArray(body.messages)) return 'messages must be an array';
  if (body.messages.length === 0 || body.messages.length > MAX_MESSAGES) {
    return `messages must contain 1-${MAX_MESSAGES} items`;
  }
  for (const m of body.messages) {
    if (!m || typeof m.content !== 'string') return 'Each message must have string content';
    if (m.content.length > MAX_MESSAGE_LENGTH) {
      return `Message content exceeds ${MAX_MESSAGE_LENGTH} characters`;
    }
    if (m.role && !['user', 'system', 'assistant'].includes(m.role)) {
      return 'Invalid message role';
    }
  }
  if (body.max_tokens !== undefined) {
    if (typeof body.max_tokens !== 'number' || body.max_tokens < 1 || body.max_tokens > MAX_TOKENS_LIMIT) {
      return `max_tokens must be between 1 and ${MAX_TOKENS_LIMIT}`;
    }
  }
  return null;
}

export async function POST(request) {
  const headers = corsHeaders();

  const OR_KEY = process.env.OR_KEY;
  if (!OR_KEY) {
    return Response.json({ error: { message: 'Service temporarily unavailable' } }, { status: 503, headers });
  }

  // Rate limiting by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
          || request.headers.get('x-real-ip')
          || 'unknown';
  if (isRateLimited(ip)) {
    return Response.json(
      { error: { message: 'Too many requests. Please wait a moment and try again.' } },
      { status: 429, headers }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: { message: 'Invalid JSON body' } }, { status: 400, headers });
  }

  const validationError = validateBody(body);
  if (validationError) {
    return Response.json({ error: { message: validationError } }, { status: 400, headers });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OR_KEY}`,
        'HTTP-Referer': ALLOWED_ORIGIN,
        'X-Title': 'BizAnalyzer.nl',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        max_tokens: Math.min(body.max_tokens || 1000, MAX_TOKENS_LIMIT),
        messages: body.messages,
      }),
    });

    const data = await response.json();

    if (data.error) {
      // Don't leak upstream error internals to the client
      return Response.json(
        { error: { message: 'The analysis service returned an error. Please try again.' } },
        { status: 502, headers }
      );
    }

    return Response.json(data, { headers });

  } catch (err) {
    // Never expose raw error messages (stack traces, internal paths) to the client
    return Response.json(
      { error: { message: 'Request failed. Please try again.' } },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders() });
}
