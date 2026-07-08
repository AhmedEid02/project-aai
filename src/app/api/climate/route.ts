import { NextResponse } from "next/server";
import { getClimateContext } from "@/lib/climate-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const district =
    (searchParams.get("district") as
      | "Gabiley"
      | "Hargeisa"
      | "Borama"
      | "Burao"
      | "Berbera") || "Gabiley";

  try {
    const climate = await getClimateContext(district);

    return NextResponse.json(climate);
  } catch {
    return NextResponse.json(
      {
        error: "Unable to retrieve climate data.",
      },
      { status: 500 }
    );
  }
}