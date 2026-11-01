import { NextRequest, NextResponse } from "next/server";
import { isServerAdminAuthenticated } from "@/lib/auth";


export async function GET(req: NextRequest) {
  try {
    const authenticated = await isServerAdminAuthenticated(req);
    return NextResponse.json({ authenticated }, { status: 200 });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      typeof (error as { digest: string }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_")
    ) {
      throw error;
    }
    console.error("Admin session check error:", error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
