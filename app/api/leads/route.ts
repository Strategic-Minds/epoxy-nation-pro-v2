import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const TWILIO_SID   = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const WA_FROM      = process.env.TWILIO_WHATSAPP_FROM!; // whatsapp:+15559730487
const HUBSPOT_TOKEN= process.env.HUBSPOT_API_TOKEN!;

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
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address || "",
      square_footage: data.sqft || null,
      project_type: data.floorType || data.floor || "garage",
      desired_finish: data.system || "TBD",
      preferred_timeline: data.timeline || "flexible",
      notes: data.notes || "",
      source_page: data.source || "web",
      whatsapp_number: data.phone,
      whatsapp_consent: true,
      status: "new",
      ai_score: 75,
      lead_score: 75,
    }),
  });
  if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
  const rows = await res.json();
  return rows[0];
}

async function sendWhatsApp(lead: any) {
  const msg = `🔥 NEW LEAD — Epoxy Nation Pro\n\n👤 ${lead.full_name}\n📱 ${lead.phone}\n📧 ${lead.email}\n🏠 ${lead.project_type || "Garage"}\n📐 ${lead.square_footage || "TBD"} sqft\n⏱ ${lead.preferred_timeline || "flexible"}\n\n💬 Reply to claim this lead`;
  const params = new URLSearchParams({
    From: WA_FROM,
    To: `whatsapp:+15559730487`,
    Body: msg,
  });
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64")}`,
    },
    body: params.toString(),
  });
  const result = await res.json();
  return result.sid || result.message;
}

async function confirmToLead(phone: string, name: string) {
  const firstName = name.split(" ")[0];
  const msg = `Hey ${firstName}! 👋 This is Epoxy Nation Pro — Powered by Xtreme Polishing Systems.\n\nWe received your bid request and our estimator will review your project within the next 24 hours.\n\n✅ You get 15% OFF for using our digital bid system.\n\nReply to this message with any questions or photos of your floor. Talk soon! 🏗️`;
  const params = new URLSearchParams({
    From: WA_FROM,
    To: `whatsapp:${phone}`,
    Body: msg,
  });
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64")}`,
    },
    body: params.toString(),
  });
  return (await res.json()).sid;
}

async function syncHubSpot(lead: any) {
  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${HUBSPOT_TOKEN}`,
    },
    body: JSON.stringify({
      properties: {
        firstname: lead.full_name?.split(" ")[0] || lead.full_name,
        lastname: lead.full_name?.split(" ").slice(1).join(" ") || "",
        email: lead.email,
        phone: lead.phone,
        hs_lead_status: "NEW",
        lifecyclestage: "lead",
        lead_source: "Epoxy Nation Pro — Digital Bid",
      },
    }),
  });
  const result = await res.json();
  return result.id || result.message;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[ENP Lead]", body.name, body.source);

    // 1. Save to Supabase pep_leads
    let savedLead: any = {};
    try { savedLead = await saveLead(body); } catch (e) { console.error("Supabase:", e); }

    // 2. Fire Twilio WA to ops (Jeremy)
    let waSid = "";
    try { waSid = await sendWhatsApp({ ...body, ...savedLead }); } catch (e) { console.error("Twilio ops:", e); }

    // 3. Confirm to lead via WhatsApp
    if (body.phone) {
      try { await confirmToLead(body.phone, body.name || "there"); } catch (e) { console.error("Twilio confirm:", e); }
    }

    // 4. HubSpot sync
    let hsId = "";
    try { hsId = await syncHubSpot({ ...body, ...savedLead }); } catch (e) { console.error("HubSpot:", e); }

    return NextResponse.json({
      success: true,
      lead_id: savedLead?.id,
      wa_sid: waSid,
      hs_id: hsId,
      message: "Lead saved. WhatsApp sent. HubSpot synced.",
    });
  } catch (err: any) {
    console.error("[ENP Lead] Fatal:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Epoxy Nation Pro Lead API v2 — Live" });
}