import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "AAI chat route",
    message:
      "Chat endpoint is available. ARIE remains the reasoning engine; AIDA handles operational communication.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    return NextResponse.json({
      status: "ok",
      service: "AAI chat route",
      received: body,
      message:
        "This placeholder chat route is active. Full OpenAI integration can be added after demo-critical features are stable.",
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Unable to process chat request.",
      },
      { status: 400 },
    );
  }
}