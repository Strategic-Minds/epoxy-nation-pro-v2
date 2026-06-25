import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const TWILIO_SID   = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const WA_FROM      = process.env.TWILIO_WHATSAPP_FROM!;

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const from  = form.get("From")?.toString() || "";
  const body  = form.get("Body")?.toString() || "";
  const numMedia = parseInt(form.get("NumMedia")?.toString() || "0");

  console.log("[WA Inbound]", from, body.slice(0, 80));

  // Store message in pep_messages
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/pep_messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        from_number: from.replace("whatsapp:", ""),
        direction: "inbound",
        num_media: numMedia,
        message_body: body,
      }),
    });
  } catch (e) { console.error("Store message:", e); }

  // Auto-reply logic
  const lower = body.toLowerCase();
  let reply = "";
  if (lower.includes("quote") || lower.includes("price") || lower.includes("estimate") || lower.includes("bid")) {
    reply = "Hey! Thanks for reaching out. The fastest way to get your quote is our digital bid form — takes 2 min and you get 15% OFF:\n\nhttps://epoxy-nation-pro-v2.vercel.app/digital-bid\n\nOr reply with your floor size (sq ft) and we will ballpark you right now!";
  } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    reply = "Hey! This is Epoxy Nation Pro — Phoenix's most advanced epoxy floor system.\n\nWhat can we help with?\n\n1 - Get a quote\n2 - Check project status\n3 - Talk to someone";
  }

  if (reply) {
    const params = new URLSearchParams({ From: WA_FROM, To: from, Body: reply });
    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64")}`,
      },
      body: params.toString(),
    });
  }

  return new NextResponse("<Response></Response>", {
    headers: { "Content-Type": "text/xml" },
  });
}

export async function GET() {
  return NextResponse.json({ status: "WhatsApp webhook live" });
}
