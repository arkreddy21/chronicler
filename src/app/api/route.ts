import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";


export async function POST(request: Request) {
  const { desc, title, uid } = await request.json();

  const supabase = createRouteHandlerClient<DB>({ cookies });
  const { data } = await supabase.from("journals").insert({
    description: desc,
    title: title,
    user_id: uid,
    id: uuidv4(),
  });
  return NextResponse.json(data);
}