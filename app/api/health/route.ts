import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(req: NextRequest) {
  const checks: Record<string, any> = {};
  const start = Date.now();

  // 1. Supabase ping
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/pep_leads?limit=1`, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` },
    });
    checks.supabase = { ok: res.ok, status: res.status };
  } catch (e: any) {
    checks.supabase = { ok: false, error: e.message };
  }

  // 2. Check lead count
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/pep_leads?select=id&status=eq.new`, {
      headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Prefer": "count=exact" },
    });
    const count = res.headers.get("content-range")?.split("/")[1] || "?";
    checks.new_leads = { count };
  } catch {}

  const elapsed = Date.now() - start;
  const allOk = Object.values(checks).every((c: any) => c.ok !== false);

  // Log to pep_system_health
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/pep_system_health`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        check_name: "api_health",
        status: allOk ? "healthy" : "degraded",
        response_ms: elapsed,
        details: checks,
      }),
    });
  } catch {}

  return NextResponse.json({
    status: allOk ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    response_ms: elapsed,
    checks,
  }, { status: allOk ? 200 : 207 });
}
