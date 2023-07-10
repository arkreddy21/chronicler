import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function Middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<DB>({ req, res });
  await supabase.auth.getSession();

  return res;
}
