// lib/api.js — API helper functions
export async function apiFetch(body) {
  const res = await fetch("/api/proxy", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({
      max_tokens: body.max_tokens || 1000,
      messages:   body.messages   || [],
    }),
  });
  if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
  const d = await res.json();
  if (d.error) throw new Error(d.error.message || "API error");
  return (d.choices?.[0]?.message?.content || "").trim();
}

export function cleanText(raw) {
  if (!raw) return "";
  return raw
    .replace(/#{1,6}\s*/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .trim();
}

export function extractJSON(raw) {
  if (!raw) return null;
  const s = raw.indexOf("{"), e = raw.lastIndexOf("}");
  if (s === -1 || e === -1 || e <= s) return null;
  try {
    const p = JSON.parse(raw.slice(s, e + 1));
    if (typeof p.successRate === "number") return p;
  } catch (_) {}
  try {
    const p = JSON.parse(raw.slice(s, e + 1).replace(/,(\s*[}\]])/g, "$1"));
    if (typeof p.successRate === "number") return p;
  } catch (_) {}
  return null;
}
