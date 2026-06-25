import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const form = await req.formData();
  console.log("[WA Status]", form.get("MessageSid"), form.get("MessageStatus"));
  return NextResponse.json({ received: true });
}
export async function GET() { return NextResponse.json({ status: "WA status webhook live" }); }
