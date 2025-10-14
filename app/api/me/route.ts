import { getUserId } from "@/lib/auth/session";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const userId = await getUserId();

  return NextResponse.json(userId ? userId : 0, { status: 200 });
}

export const PATCH = async (request: NextRequest) => {
  return GET(request);
};

export const OPTIONS = async (request: NextRequest) => {
  return GET(request);
};
