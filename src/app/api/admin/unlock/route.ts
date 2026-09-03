import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  const submittedPassword = typeof password === "string" ? password.trim() : "";
  const expectedPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!expectedPassword || submittedPassword !== expectedPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
