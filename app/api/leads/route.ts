import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const TWILIO_SID   = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_SECRET= process.env.TWILIO_API_SECRET!;   // ← API Secret (not auth token)
const WA_FROM      = process.env.TWILIO_WHATSAPP_FROM!;
const HUBSPOT_TOKEN= process.env.HUBSPOT_API_TOKEN!;

// ── Supabase ──────────────────────────────────────────────────────────────────
async function saveLead(data: any) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/pep_leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Prefer": "return=representation",
    },
    body: JSON.stringify({
      full_name:          data.name,
      email:              data.email,
      phone:              data.phone,
      address:            data.address || "",
      square_footage:     data.sqft ? parseInt(data.sqft) : null,
      project_type:       data.floorType || data.floor || "garage",
      desired_finish:     data.system || "TBD",
      preferred_timeline: data.timeline || "flexible",
      notes:              data.notes || "",
      source_page:        data.source || "web",
      whatsapp_number:    data.phone,
      whatsapp_consent:   true,
      status:             "new",
      ai_score:           80,
      lead_score:         80,
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Supabase ${res.status}: ${txt.slice(0, 120)}`);
  }
  const rows = await res.json();
  return rows[0] || {};
}

// ── Twilio WhatsApp ───────────────────────────────────────────────────────────
async function sendWA(to: string, body: string) {
  const params = new URLSearchParams({ From: WA_FROM, To: to, Body: body });
  const authHeader = `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_SECRET}`).toString("base64")}`;
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": authHeader },
      body: params.toString(),
    }
  );
  const json = await res.json();
  if (json.status >= 400) throw new Error(json.message || "Twilio error");
  return json.sid as string;
}

async function notifyOps(lead: any) {
  const msg = [
    `🔥 NEW LEAD — Epoxy Nation Pro`,
    ``,
    `👤 ${lead.full_name}`,
    `📱 ${lead.phone}`,
    `📧 ${lead.email}`,
    `🏠 ${lead.project_type || "Garage"} | ${lead.square_footage || "??"} sqft`,
    `🎨 ${lead.desired_finish || "TBD"}`,
    `⏱ ${lead.preferred_timeline || "flexible"}`,
    `💰 Score: ${lead.lead_score || 80}/100`,
    ``,
    `📋 Lead ID: ${lead.id?.slice(0, 8) || "new"}`,
    `Reply to claim →`,
  ].join("\n");
  return sendWA(`whatsapp:+15559730487`, msg);
}

async function confirmLead(phone: string, name: string) {
  const first = name.split(" ")[0];
  const msg = [
    `Hey ${first}! 👋`,
    ``,
    `This is Epoxy Nation Pro — Powered by Xtreme Polishing Systems.`,
    ``,
    `✅ We got your bid request! Our estimator will review within 24 hours.`,
    ``,
    `🎁 You qualify for 15% OFF for using our digital bid system.`,
    ``,
    `Send photos of your floor here and we'll get you an even faster quote!`,
  ].join("\n");
  return sendWA(`whatsapp:${phone}`, msg);
}

// ── HubSpot ───────────────────────────────────────────────────────────────────
async function syncHubSpot(data: any) {
  const [first, ...rest] = (data.name || "").split(" ");
  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${HUBSPOT_TOKEN}`,
    },
    body: JSON.stringify({
      properties: {
        firstname: first,
        lastname: rest.join(" "),
        email: data.email,
        phone: data.phone,
        hs_lead_status: "NEW",
        lifecyclestage: "lead",
        jobtitle: `Epoxy Lead — ${data.floorType || "Garage"} — Phoenix`,
      },
    }),
  });
  const json = await res.json();
  return json.id || json.message?.slice(0, 80);
}

// ── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: any = {};
  try { body = await req.json(); } catch { return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 }); }

  console.log("[ENP Lead]", body.name, body.source);

  const results: Record<string, any> = {};

  // 1. Supabase
  let savedLead: any = {};
  try { savedLead = await saveLead(body); results.supabase = "ok"; }
  catch (e: any) { results.supabase = `err: ${e.message?.slice(0, 60)}`; console.error("Supabase:", e); }

  // 2. Notify ops via WhatsApp
  try { results.wa_ops = await notifyOps({ ...body, ...savedLead }); }
  catch (e: any) { results.wa_ops = `err: ${e.message?.slice(0, 60)}`; console.error("WA ops:", e); }

  // 3. Confirm to lead
  if (body.phone) {
    try { results.wa_lead = await confirmLead(body.phone, body.name || "there"); }
    catch (e: any) { results.wa_lead = `err: ${e.message?.slice(0, 60)}`; console.error("WA lead:", e); }
  }

  // 4. HubSpot
  try { results.hubspot = await syncHubSpot(body); }
  catch (e: any) { results.hubspot = `err: ${e.message?.slice(0, 60)}`; console.error("HubSpot:", e); }

  return NextResponse.json({
    success: !!savedLead.id,
    lead_id: savedLead?.id,
    results,
    message: "Lead processed.",
  });
}

export async function GET() {
  return NextResponse.json({ status: "Epoxy Nation Pro Lead API v2.1 — Live" });
}
