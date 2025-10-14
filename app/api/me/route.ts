import { getAccessToken, getUserId } from "@/authentication/actions/session";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const userId = await getUserId();
  const token = await getAccessToken();
  const data = { user: userId ? userId : 0, accessToken: token };

  return NextResponse.json(data, { status: 200 });
}

export const PATCH = async (request: NextRequest) => {
  return GET(request);
};

export const OPTIONS = async (request: NextRequest) => {
  return GET(request);
};
